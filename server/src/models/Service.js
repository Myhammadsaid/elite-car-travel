import mongoose from 'mongoose'

const LocalizedString = {
	en: { type: String, default: '' },
	ru: { type: String, default: '' },
	ja: { type: String, default: '' },
}

const ServiceSchema = new mongoose.Schema(
	{
		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		order: {
			type: Number,
			default: 0,
		},
		badge: LocalizedString,
		title: {
			en: { type: String, required: true },
			ru: { type: String, default: '' },
			ja: { type: String, default: '' },
		},
		desc: LocalizedString,
		features: [LocalizedString],
	},
	{ timestamps: true },
)

export default mongoose.models.Service ||
	mongoose.model('Service', ServiceSchema)
