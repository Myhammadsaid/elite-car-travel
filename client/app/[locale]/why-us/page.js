import Background from '@/components/Background'
import CtaBanner from '@/components/CtaBanner'
import TagBadge from '@/components/TagBadge'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'WhyUsPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
	}
}

export default async function WhyUsPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return <WhyUsContent />
}

function WhyUsContent() {
	const t = useTranslations('WhyUsPage')

	const pillars = [
		{
			num: '01',
			title: t('pillar1Title'),
			subtitle: t('pillar1Subtitle'),
			desc: t('pillar1Desc'),
		},
		{
			num: '02',
			title: t('pillar2Title'),
			subtitle: t('pillar2Subtitle'),
			desc: t('pillar2Desc'),
		},
		{
			num: '03',
			title: t('pillar3Title'),
			subtitle: t('pillar3Subtitle'),
			desc: t('pillar3Desc'),
		},
		{
			num: '04',
			title: t('pillar4Title'),
			subtitle: 'Direct local partnerships without markups',
			desc: t('pillar4Desc'),
		},
		{
			num: '05',
			title: t('pillar5Title'),
			subtitle: 'Dedicated multilingual dispatcher assigned to your trip',
			desc: t('pillar5Desc'),
		},
	]

	const standards = [t('std1'), t('std2'), t('std3'), t('std4')]

	return (
		<>
			{/* 1. Header */}
			<section className='relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden'>
				<Background
					src='/samarkand/spot-in-samarkand_2.jpg'
					alt='Samarkand Silk Road Landscape'
				/>
				<div className='relative z-10 max-w-4xl mx-auto space-y-6 flex flex-col items-center'>
					<TagBadge tag={t('badge')} />

					<h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white max-w-4xl mx-auto leading-tight'>
						{t('title')}
					</h1>
					<p className='text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed text-white'>
						{t('subtitle')}
					</p>
				</div>
			</section>

			{/* 2. 5 Pillars In-Depth */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
				{pillars.map(pillar => (
					<div
						key={pillar.num}
						className='p-8 sm:p-12 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-xs transition duration-300 hover:border-[var(--color-brand-gold)]'
					>
						<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
							<div className='lg:col-span-2 flex items-center lg:items-start gap-4'>
								<span className='font-serif text-4xl sm:text-5xl font-bold text-[var(--color-brand-gold)]'>
									{pillar.num}
								</span>
								<span className='lg:hidden w-8 h-[1px] bg-[var(--color-brand-gold)]/40' />
							</div>

							<div className='lg:col-span-10 space-y-3'>
								<p className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
									{pillar.subtitle}
								</p>
								<h2 className='font-serif text-2xl sm:text-3xl font-bold text-[var(--color-brand-dark)]'>
									{pillar.title}
								</h2>
								<p className='text-neutral-600 text-sm sm:text-base leading-relaxed pt-2'>
									{pillar.desc}
								</p>
							</div>
						</div>
					</div>
				))}
			</section>

			{/* 3. Standards & Guarantees */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='p-8 sm:p-12 lg:p-16 rounded-2xl bg-neutral-900 text-white space-y-8'>
					<div className='space-y-3 max-w-2xl'>
						<span className='text-xs uppercase tracking-[0.25em] font-semibold text-[var(--color-brand-gold-light)]'>
							{t('standardsBadge')}
						</span>
						<h2 className='font-serif text-3xl sm:text-4xl font-bold'>
							{t('standardsTitle')}
						</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-2'>
						{standards.map((item, idx) => (
							<div
								key={idx}
								className='p-5 rounded-lg bg-neutral-800/80 border border-neutral-700/80 flex items-start gap-3.5'
							>
								<span className='text-rose-400 font-bold text-base'>✕</span>
								<span className='text-sm text-neutral-300 leading-snug'>
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 4. Bottom CTA Banner */}
			<CtaBanner />
		</>
	)
}
