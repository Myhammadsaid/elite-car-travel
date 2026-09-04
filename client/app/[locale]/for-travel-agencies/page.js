import Background from '@/components/Background'
import ContactForm from '@/components/ContactForm'
import CtaBanner from '@/components/CtaBanner'
import PressFeature from '@/components/PressFeature'
import TagBadge from '@/components/TagBadge'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export default async function ForTravelAgenciesPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return <TravelAgenciesContent />
}

function TravelAgenciesContent() {
	const t = useTranslations('TravelAgenciesPage')

	const benefits = [
		{ num: '01', title: t('benefit1Title'), desc: t('benefit1Desc') },
		{ num: '02', title: t('benefit2Title'), desc: t('benefit2Desc') },
		{ num: '03', title: t('benefit3Title'), desc: t('benefit3Desc') },
		{ num: '04', title: t('benefit4Title'), desc: t('benefit4Desc') },
	]

	const services = [
		t('service1'),
		t('service2'),
		t('service3'),
		t('service4'),
		t('service5'),
		t('service6'),
		t('service7'),
		t('service8'),
	]

	return (
		<>
			{/* 1. Header & Tagline */}
			<section className='max-w-7xl mx-auto pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 text-center space-y-6'>
				<Background
					src='/spot-in-uzbekistan.webp'
					alt='Uzbekistan Silk Road Landscape'
				/>
				<TagBadge tag={t('badge')} />

				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-brand-dark)] max-w-4xl mx-auto leading-tight'>
					{t('title')}
				</h1>
				<p className='text-lg sm:text-xl font-serif italic text-[var(--color-brand-gold-dark)] max-w-2xl mx-auto'>
					"{t('tagline')}"
				</p>
				<p className='text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed'>
					{t('subtitle')}
				</p>
				<div className='gold-divider max-w-xs mx-auto pt-4' />
			</section>

			{/* 2. B2B Advantages Grid */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
				<div className='text-center max-w-2xl mx-auto space-y-3'>
					<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
						{t('b2bBadge')}
					</span>
					<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
						{t('b2bTitle')}
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{benefits.map(b => (
						<div
							key={b.num}
							className='p-8 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border-light)] hover:border-[var(--color-brand-gold)] transition duration-300 shadow-2xs space-y-4'
						>
							<span className='font-serif text-2xl font-bold text-[var(--color-brand-gold)]'>
								{b.num}
							</span>
							<h3 className='font-serif text-xl font-bold text-[var(--color-brand-dark)]'>
								{b.title}
							</h3>
							<p className='text-neutral-600 text-xs sm:text-sm leading-relaxed'>
								{b.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* 3. Press Feature: Japanese Guidebook Partnership */}
			<PressFeature />

			{/* 4. Comprehensive Scope Checklist */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='p-8 sm:p-12 lg:p-16 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-xs space-y-8'>
					<div className='text-center max-w-2xl mx-auto space-y-3'>
						<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
							{t('servicesTitle')}
						</h2>
						<div className='w-12 h-0.5 bg-[var(--color-brand-gold)] mx-auto' />
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4'>
						{services.map((item, idx) => (
							<div
								key={idx}
								className='flex items-start gap-3.5 p-4 rounded-lg bg-[var(--color-brand-cream)]/60 border border-[var(--color-brand-border-light)]'
							>
								<span className='text-[var(--color-brand-gold)] font-bold text-base'>
									✓
								</span>
								<span className='text-sm font-medium text-neutral-800 leading-snug'>
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 5. Inquiry Form Section */}
			<section className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
				<div className='text-center space-y-3'>
					<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
						{t('formTitle')}
					</h2>
					<p className='text-neutral-600 text-sm sm:text-base font-light max-w-xl mx-auto'>
						{t('formSubtitle')}
					</p>
				</div>

				<ContactForm formType='general' source='travel-agencies' />
			</section>

			{/* 6. Bottom Banner */}
			<CtaBanner />
		</>
	)
}
