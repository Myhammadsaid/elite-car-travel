import express from 'express'
import jwt from 'jsonwebtoken'
import { authenticateAdmin } from '../middleware/auth.js'
import Lead from '../models/Lead.js'

const router = express.Router()

// 1. PUBLIC: Submit a new inquiry
router.post('/leads', async (req, res) => {
	try {
		const {
			name,
			contact,
			serviceType,
			destination,
			duration,
			message,
			formType,
			source,
			locale,
			hp,
		} = req.body

		// Honeypot check for bots
		if (hp) {
			return res.status(200).json({ success: true, message: 'Lead received' })
		}

		if (!name || !contact) {
			return res
				.status(400)
				.json({ error: 'Name and contact are required fields.' })
		}

		const newLead = await Lead.create({
			name,
			contact,
			serviceType:
				serviceType ||
				(formType === 'custom' ? 'Custom Itinerary' : 'General Inquiry'),
			destination: destination || '',
			duration: duration || '',
			message: message || '',
			formType: formType || 'general',
			source: source || 'website',
			locale: locale || 'ru',
		})

		return res.status(201).json({
			success: true,
			message: 'Lead submitted successfully',
			leadId: newLead._id,
		})
	} catch (error) {
		console.error('Error saving lead:', error)
		return res
			.status(500)
			.json({ error: 'Internal server error while saving lead.' })
	}
})

// 2. ADMIN AUTH: Log in with password to get token
router.post('/admin/login', (req, res) => {
	const { password } = req.body
	const adminPassword = process.env.ADMIN_PASSWORD || ''

	if (!password || password !== adminPassword) {
		return res.status(401).json({ error: 'Invalid admin credentials' })
	}

	const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || '', {
		expiresIn: '7d',
	})

	return res.status(200).json({ success: true, token })
})

// 3. ADMIN: Get all leads (sorted by newest first)
router.get('/admin/leads', authenticateAdmin, async (req, res) => {
	try {
		const leads = await Lead.find().sort({ createdAt: -1 })
		return res.status(200).json({ success: true, leads })
	} catch (error) {
		console.error('Error fetching leads:', error)
		return res.status(500).json({ error: 'Failed to retrieve leads' })
	}
})

// 4. ADMIN: Update lead status
router.patch('/admin/leads/:id', authenticateAdmin, async (req, res) => {
	try {
		const { status } = req.body
		const validStatuses = ['new', 'in-progress', 'completed', 'archived']

		if (!validStatuses.includes(status)) {
			return res.status(400).json({ error: 'Invalid status value' })
		}

		const updatedLead = await Lead.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true },
		)

		if (!updatedLead) {
			return res.status(404).json({ error: 'Lead not found' })
		}

		return res.status(200).json({ success: true, lead: updatedLead })
	} catch (error) {
		console.error('Error updating lead status:', error)
		return res.status(500).json({ error: 'Failed to update lead status' })
	}
})

// 5. ADMIN: Delete a lead
router.delete('/admin/leads/:id', authenticateAdmin, async (req, res) => {
	try {
		const deletedLead = await Lead.findByIdAndDelete(req.params.id)

		if (!deletedLead) {
			return res.status(404).json({ error: 'Lead not found' })
		}

		return res
			.status(200)
			.json({ success: true, message: 'Lead deleted successfully' })
	} catch (error) {
		console.error('Error deleting lead:', error)
		return res.status(500).json({ error: 'Failed to delete lead' })
	}
})

export default router
