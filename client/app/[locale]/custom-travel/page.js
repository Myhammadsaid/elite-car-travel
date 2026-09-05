import Background from '@/components/Background'
import ContactForm from '@/components/ContactForm'
import TagBadge from '@/components/TagBadge'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'CustomTravelPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
	}
}

export default async function CustomTravelPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return <CustomTravelContent />
}

function CustomTravelContent() {
	const t = useTranslations('CustomTravelPage')

	const steps = [
		{ title: t('step1Title'), desc: t('step1Desc') },
		{ title: t('step2Title'), desc: t('step2Desc') },
		{ title: t('step3Title'), desc: t('step3Desc') },
	]

	return (
		<>
			{/* 1. Header */}
			<section className='relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden'>
				<Background
					src='/bukhara/spot-in-bukhara_6.jpg'
					alt='Bukhara Silk Road Landscape'
				/>

				<div className='relative z-10 max-w-4xl mx-auto space-y-6 flex flex-col items-center'>
					<TagBadge tag={t('badge')} />

					<h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white max-w-4xl mx-auto leading-tight'>
						{t('title')}
					</h1>
					<p className='text-lg sm:text-xl font-serif italic text-white underline'>
						"{t('tagline')}"
					</p>
					<p className='text-white text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed'>
						{t('subtitle')}
					</p>
				</div>
			</section>

			{/* 2. 3-Step Process */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{steps.map((step, idx) => (
						<div
							key={idx}
							className='p-8 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border-light)] shadow-xs space-y-3 relative'
						>
							<span className='font-serif text-3xl font-bold text-[var(--color-brand-gold)]'>
								0{idx + 1}
							</span>
							<h3 className='font-serif text-xl font-bold text-[var(--color-brand-dark)]'>
								{step.title}
							</h3>
							<p className='text-neutral-600 text-xs sm:text-sm leading-relaxed'>
								{step.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* 3. Custom Itinerary Form */}
			<section className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
				<div className='text-center space-y-3'>
					<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
						{t('formHeading')}
					</h2>
					<p className='text-neutral-600 text-sm sm:text-base font-light max-w-xl mx-auto'>
						{t('formSubheading')}
					</p>
				</div>

				<ContactForm formType='custom' source='custom-travel-page' />
			</section>
		</>
	)
}
