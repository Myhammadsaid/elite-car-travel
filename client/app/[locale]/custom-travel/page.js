import Background from '@/components/Background'
import ContactForm from '@/components/ContactForm'
import TagBadge from '@/components/TagBadge'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

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
			<section className='max-w-7xl mx-auto pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 text-center space-y-6'>
				<Background
					src='/spot-in-bukhara.jpg'
					alt='Bukhara Silk Road Landscape'
				/>
				<TagBadge tag={t('badge')} />

				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-brand-dark)] max-w-4xl mx-auto leading-tight'>
					{t('title')}
				</h1>
				<p className='text-lg sm:text-xl font-serif italic text-[var(--color-brand-gold-dark)]'>
					"{t('tagline')}"
				</p>
				<p className='text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed'>
					{t('subtitle')}
				</p>
				<div className='gold-divider max-w-xs mx-auto pt-4' />
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
