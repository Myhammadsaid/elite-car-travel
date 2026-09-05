import Background from '@/components/Background'
import CtaBanner from '@/components/CtaBanner'
import TagBadge from '@/components/TagBadge'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'ServicesPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
	}
}

export default async function ServicesPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return <ServicesContent />
}

function ServicesContent() {
	const t = useTranslations('ServicesPage')

	const servicesList = [
		{
			id: 'transportation',
			badge: t('section1Badge'),
			title: t('section1Title'),
			desc: t('section1Desc'),
			features: [
				t('section1F1'),
				t('section1F2'),
				t('section1F3'),
				t('section1F4'),
				t('section1F5'),
			],
		},
		{
			id: 'inbound',
			badge: t('section2Badge'),
			title: t('section2Title'),
			desc: t('section2Desc'),
			features: [
				t('section2F1'),
				t('section2F2'),
				t('section2F3'),
				t('section2F4'),
				t('section2F5'),
			],
		},
		{
			id: 'tours',
			badge: t('section3Badge'),
			title: t('section3Title'),
			desc: t('section3Desc'),
			features: [
				t('section3F1'),
				t('section3F2'),
				t('section3F3'),
				t('section3F4'),
				t('section3F5'),
			],
		},
	]

	return (
		<>
			{/* 1. Header Section */}
			<section className='max-w-7xl mx-auto pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 text-center space-y-6'>
				<Background src='/samarkand.jpg' alt='Samarkand Silk Road Landscape' />
				<TagBadge tag={t('badge')} />

				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-brand-dark)] max-w-4xl mx-auto leading-tight'>
					{t('title')}
				</h1>
				<p className='text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed'>
					{t('subtitle')}
				</p>
				<div className='gold-divider max-w-xs mx-auto pt-4' />
			</section>

			{/* 2. Detailed Service Blocks */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
				{servicesList.map(svc => (
					<div
						key={svc.id}
						id={svc.id}
						className='p-8 sm:p-12 lg:p-16 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-xs scroll-mt-24'
					>
						<div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
							<div className='lg:col-span-5 space-y-4'>
								<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
									{svc.badge}
								</span>
								<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)] leading-tight'>
									{svc.title}
								</h2>
								<p className='text-neutral-600 text-sm sm:text-base leading-relaxed'>
									{svc.desc}
								</p>
								<div className='pt-4'>
									<Link
										href='/custom-travel'
										className='inline-block px-6 py-3 rounded-md bg-[var(--color-brand-gold)] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[var(--color-brand-gold-dark)] transition-colors shadow-2xs'
									>
										{t('ctaBook')}
									</Link>
								</div>
							</div>

							<div className='lg:col-span-7 bg-[var(--color-brand-cream)]/50 p-6 sm:p-8 rounded-xl border border-[var(--color-brand-border-light)]'>
								<h3 className='text-xs font-bold uppercase tracking-widest text-[var(--color-brand-dark)] mb-4'>
									Scope & Features
								</h3>
								<ul className='space-y-3.5'>
									{svc.features.map((feature, idx) => (
										<li
											key={idx}
											className='flex items-start gap-3 text-sm text-neutral-700'
										>
											<span className='text-[var(--color-brand-gold)] font-bold'>
												✓
											</span>
											<span className='leading-snug'>{feature}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				))}
			</section>

			{/* 3. CTA Banner */}
			<CtaBanner />
		</>
	)
}
