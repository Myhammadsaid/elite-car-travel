import Background from '@/components/Background'
import ContactForm from '@/components/ContactForm'
import CtaBanner from '@/components/CtaBanner'
import TagBadge from '@/components/TagBadge'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'CorporatePage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
	}
}

export default async function ForCorporateClientsPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return <CorporateContent />
}

function CorporateContent() {
	const t = useTranslations('CorporatePage')

	const features = [
		{ num: '01', title: t('feature1Title'), desc: t('feature1Desc') },
		{ num: '02', title: t('feature2Title'), desc: t('feature2Desc') },
		{ num: '03', title: t('feature3Title'), desc: t('feature3Desc') },
		{ num: '04', title: t('feature4Title'), desc: t('feature4Desc') },
	]

	const scopes = [
		t('scope1'),
		t('scope2'),
		t('scope3'),
		t('scope4'),
		t('scope5'),
	]

	return (
		<>
			{/* 1. Header */}
			<section className='relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden'>
				<Background
					src='/tashkent/spot-in-tashkent_4.jpg'
					alt='Uzbekistan Silk Road Landscape'
				/>

				<div className='relative z-10 max-w-4xl mx-auto space-y-6 flex flex-col items-center'>
					<TagBadge tag={t('badge')} />

					<h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white max-w-4xl mx-auto leading-tight'>
						{t('title')}
					</h1>
					<p className='text-white text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed'>
						{t('subtitle')}
					</p>
				</div>
			</section>

			{/* 2. Solutions Grid */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
				<div className='text-center max-w-2xl mx-auto space-y-3'>
					<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
						{t('solutionsBadge')}
					</span>
					<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
						{t('solutionsTitle')}
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{features.map(f => (
						<div
							key={f.num}
							className='p-8 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border-light)] hover:border-[var(--color-brand-gold)] transition duration-300 shadow-2xs space-y-4'
						>
							<span className='font-serif text-2xl font-bold text-[var(--color-brand-gold)]'>
								{f.num}
							</span>
							<h3 className='font-serif text-xl font-bold text-[var(--color-brand-dark)]'>
								{f.title}
							</h3>
							<p className='text-neutral-600 text-xs sm:text-sm leading-relaxed'>
								{f.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* 3. Service Scope Callout */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='p-8 sm:p-12 lg:p-16 rounded-2xl bg-neutral-900 text-white space-y-8'>
					<div className='space-y-3'>
						<span className='text-xs uppercase tracking-[0.25em] font-semibold text-[var(--color-brand-gold-light)]'>
							Enterprise Mobility
						</span>
						<h2 className='font-serif text-3xl sm:text-4xl font-bold'>
							{t('scopeTitle')}
						</h2>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2'>
						{scopes.map((scope, idx) => (
							<div
								key={idx}
								className='p-5 rounded-lg bg-neutral-800/80 border border-neutral-700/80 flex items-start gap-3'
							>
								<span className='text-[var(--color-brand-gold)] font-bold'>
									◆
								</span>
								<span className='text-sm text-neutral-200 leading-snug'>
									{scope}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 4. Corporate Request Form */}
			<section className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
				<div className='text-center space-y-3'>
					<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
						{t('formTitle')}
					</h2>
					<p className='text-neutral-600 text-sm sm:text-base font-light max-w-xl mx-auto'>
						{t('formSubtitle')}
					</p>
				</div>

				<ContactForm formType='general' source='corporate' />
			</section>

			{/* 5. Bottom Banner */}
			<CtaBanner />
		</>
	)
}
