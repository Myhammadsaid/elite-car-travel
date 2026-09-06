import express from 'express'
import Service from '../models/Service.js'

const router = express.Router()

// GET /api/services - Retrieve all services
router.get('/', async (req, res) => {
	try {
		const services = await Service.find().sort({ order: 1, createdAt: 1 })
		res.json(services)
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching services', error: error.message })
	}
})

// POST /api/services - Create new service
router.post('/', async (req, res) => {
	try {
		const newService = new Service(req.body)
		const saved = await newService.save()
		res.status(201).json(saved)
	} catch (error) {
		res
			.status(400)
			.json({ message: 'Error creating service', error: error.message })
	}
})

// PUT /api/services/:id - Update existing service
router.put('/:id', async (req, res) => {
	try {
		const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!updated) return res.status(404).json({ message: 'Service not found' })
		res.json(updated)
	} catch (error) {
		res
			.status(400)
			.json({ message: 'Error updating service', error: error.message })
	}
})

// DELETE /api/services/:id - Delete service
router.delete('/:id', async (req, res) => {
	try {
		const deleted = await Service.findByIdAndDelete(req.params.id)
		if (!deleted) return res.status(404).json({ message: 'Service not found' })
		res.json({ message: 'Service deleted successfully' })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error deleting service', error: error.message })
	}
})

export default router
