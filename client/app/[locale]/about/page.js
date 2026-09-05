import Background from '@/components/Background'
import CtaBanner from '@/components/CtaBanner'
import TagBadge from '@/components/TagBadge'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'AboutPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
	}
}

export default async function AboutPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return <AboutContent />
}

function AboutContent() {
	const t = useTranslations('AboutPage')

	const values = [
		{ num: '01', title: t('value1Title'), desc: t('value1Desc') },
		{ num: '02', title: t('value2Title'), desc: t('value2Desc') },
		{ num: '03', title: t('value3Title'), desc: t('value3Desc') },
	]

	return (
		<>
			{/* 1. Page Header */}
			<section className='max-w-7xl pt-16 md:pt-24 mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6'>
				<Background src='/bukhara.png' alt='Bukhara Silk Road Landscape' />
				<TagBadge tag={t('badge')} />

				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-brand-dark)] max-w-4xl mx-auto leading-tight'>
					{t('title')}
				</h1>
				<p className='text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed'>
					{t('subtitle')}
				</p>
				<div className='gold-divider max-w-xs mx-auto pt-4' />
			</section>

			{/* 2. Story Section */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[var(--color-brand-surface)] p-8 sm:p-12 lg:p-16 rounded-2xl border border-[var(--color-brand-border)] shadow-xs'>
					<div className='lg:col-span-5 space-y-4'>
						<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
							{t('storyBadge')}
						</span>
						<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)] leading-tight'>
							{t('storyTitle')}
						</h2>
						<div className='w-16 h-0.5 bg-[var(--color-brand-gold)]' />
					</div>

					<div className='lg:col-span-7 space-y-6 text-neutral-600 text-sm sm:text-base leading-relaxed'>
						<p>{t('storyP1')}</p>
						<p>{t('storyP2')}</p>
					</div>
				</div>
			</section>

			{/* 3. Core Values Grid */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
				<div className='text-center max-w-2xl mx-auto space-y-3'>
					<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
						{t('missionBadge')}
					</span>
					<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
						{t('missionTitle')}
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{values.map(v => (
						<div
							key={v.num}
							className='p-8 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border-light)] hover:border-[var(--color-brand-gold)] transition duration-300 shadow-2xs space-y-4'
						>
							<span className='font-serif text-3xl font-bold text-[var(--color-brand-gold)]'>
								{v.num}
							</span>
							<h3 className='font-serif text-2xl font-bold text-[var(--color-brand-dark)]'>
								{v.title}
							</h3>
							<p className='text-neutral-600 text-sm leading-relaxed'>
								{v.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* 4. Fleet & Capabilities Overview */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='p-8 sm:p-12 lg:p-16 rounded-2xl bg-neutral-900 text-white space-y-6'>
					<span className='text-xs uppercase tracking-[0.25em] font-semibold text-[var(--color-brand-gold-light)]'>
						{t('fleetBadge')}
					</span>
					<h2 className='font-serif text-3xl sm:text-4xl font-bold'>
						{t('fleetTitle')}
					</h2>
					<p className='text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl font-light'>
						{t('fleetDesc')}
					</p>
				</div>
			</section>

			{/* 5. CTA Banner */}
			<CtaBanner />
		</>
	)
}
