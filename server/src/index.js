import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './config/db.js'
import leadRoutes from './routes/leads.js'
import socialRoutes from './routes/social.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const CLIENT_URL = process.env.CLIENT_URL

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({ origin: CLIENT_URL }))
app.use(express.json())

// Routes
app.use('/api', leadRoutes)
app.use('/api', socialRoutes)

// Health check
app.get('/api/health', (req, res) => {
	res.status(200).json({ status: 'ok', service: 'Elite Car Group API' })
})

app.listen(PORT, () => {
	console.log(`Backend server running on http://localhost:${PORT}`)
})
