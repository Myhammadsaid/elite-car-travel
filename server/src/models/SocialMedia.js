import mongoose from 'mongoose'

const socialMediaSchema = new mongoose.Schema(
	{
		platform: {
			type: String,
			required: [true, 'Platform is required'],
			enum: [
				'instagram',
				'facebook',
				'telegram',
				'whatsapp',
				'youtube',
				'tiktok',
				'linkedin',
				'twitter',
				'other',
			],
		},
		label: {
			type: String,
			required: [true, 'Display label is required'],
			trim: true,
		},
		url: {
			type: String,
			required: [true, 'URL is required'],
			trim: true,
		},
		handle: {
			type: String,
			default: '',
			trim: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		order: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
)

export default mongoose.model('SocialMedia', socialMediaSchema)
