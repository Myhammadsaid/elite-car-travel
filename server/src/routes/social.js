import express from 'express'
import { authenticateAdmin } from '../middleware/auth.js'
import SocialMedia from '../models/SocialMedia.js'

const router = express.Router()

// 1. PUBLIC: Get active social links, sorted for display on the site
router.get('/social', async (req, res) => {
	try {
		const links = await SocialMedia.find({ isActive: true }).sort({
			order: 1,
			createdAt: 1,
		})
		return res.status(200).json({ success: true, links })
	} catch (error) {
		console.error('Error fetching social links:', error)
		return res.status(500).json({ error: 'Failed to retrieve social links' })
	}
})

// 2. ADMIN: Get all social links, including inactive ones
router.get('/admin/social', authenticateAdmin, async (req, res) => {
	try {
		const links = await SocialMedia.find().sort({ order: 1, createdAt: 1 })
		return res.status(200).json({ success: true, links })
	} catch (error) {
		console.error('Error fetching social links:', error)
		return res.status(500).json({ error: 'Failed to retrieve social links' })
	}
})

// 3. ADMIN: Create a new social link
router.post('/admin/social', authenticateAdmin, async (req, res) => {
	try {
		const { platform, label, url, handle, isActive, order } = req.body

		if (!platform || !label || !url) {
			return res
				.status(400)
				.json({ error: 'Platform, label, and URL are required fields.' })
		}

		const newLink = await SocialMedia.create({
			platform,
			label,
			url,
			handle: handle || '',
			isActive: isActive !== undefined ? isActive : true,
			order: order !== undefined ? order : 0,
		})

		return res.status(201).json({ success: true, link: newLink })
	} catch (error) {
		console.error('Error creating social link:', error)
		if (error.name === 'ValidationError') {
			return res.status(400).json({ error: error.message })
		}
		return res.status(500).json({ error: 'Failed to create social link' })
	}
})

// 4. ADMIN: Update an existing social link
router.patch('/admin/social/:id', authenticateAdmin, async (req, res) => {
	try {
		const { platform, label, url, handle, isActive, order } = req.body

		const updatedLink = await SocialMedia.findByIdAndUpdate(
			req.params.id,
			{
				...(platform !== undefined && { platform }),
				...(label !== undefined && { label }),
				...(url !== undefined && { url }),
				...(handle !== undefined && { handle }),
				...(isActive !== undefined && { isActive }),
				...(order !== undefined && { order }),
			},
			{ new: true, runValidators: true },
		)

		if (!updatedLink) {
			return res.status(404).json({ error: 'Social link not found' })
		}

		return res.status(200).json({ success: true, link: updatedLink })
	} catch (error) {
		console.error('Error updating social link:', error)
		if (error.name === 'ValidationError') {
			return res.status(400).json({ error: error.message })
		}
		return res.status(500).json({ error: 'Failed to update social link' })
	}
})

// 5. ADMIN: Delete a social link
router.delete('/admin/social/:id', authenticateAdmin, async (req, res) => {
	try {
		const deletedLink = await SocialMedia.findByIdAndDelete(req.params.id)

		if (!deletedLink) {
			return res.status(404).json({ error: 'Social link not found' })
		}

		return res
			.status(200)
			.json({ success: true, message: 'Social link deleted successfully' })
	} catch (error) {
		console.error('Error deleting social link:', error)
		return res.status(500).json({ error: 'Failed to delete social link' })
	}
})

export default router
