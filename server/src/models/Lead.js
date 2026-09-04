import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
		},
		phone: {
			type: String,
			required: [true, 'Phone number is required'],
			trim: true,
		},
		email: {
			type: String,
			default: '',
			trim: true,
		},
		citizenship: {
			type: String,
			default: '',
			trim: true,
		},
		travelDate: {
			type: String,
			default: '',
			trim: true,
		},
		participants: {
			type: String,
			default: '',
			trim: true,
		},
		serviceType: {
			type: String,
			default: 'General Inquiry',
			trim: true,
		},
		destination: {
			type: String,
			default: '',
			trim: true,
		},
		duration: {
			type: String,
			default: '',
			trim: true,
		},
		message: {
			type: String,
			default: '',
			trim: true,
		},
		formType: {
			type: String,
			enum: ['general', 'custom'],
			default: 'general',
		},
		source: {
			type: String,
			default: 'website',
		},
		locale: {
			type: String,
			enum: ['ru', 'en', 'ja'],
			default: 'ru',
		},
		status: {
			type: String,
			enum: ['new', 'in-progress', 'completed', 'archived'],
			default: 'new',
		},
	},
	{
		timestamps: true,
	},
)

export default mongoose.model('Lead', leadSchema)
