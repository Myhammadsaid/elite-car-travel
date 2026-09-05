import Background from '@/components/Background'
import CtaBanner from '@/components/CtaBanner'
import TagBadge from '@/components/TagBadge'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const t = await getTranslations({
		locale,
		namespace: 'DiscoverUzbekistanPage',
	})

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
	}
}

export default async function DiscoverUzbekistanPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return <DiscoverUzbekistanContent />
}

function DiscoverUzbekistanContent() {
	const t = useTranslations('DiscoverUzbekistanPage')

	const destinations = [
		{
			num: '01',
			name: t('city1Name'),
			subtitle: t('city1Subtitle'),
			desc: t('city1Desc'),
		},
		{
			num: '02',
			name: t('city2Name'),
			subtitle: t('city2Subtitle'),
			desc: t('city2Desc'),
		},
		{
			num: '03',
			name: t('city3Name'),
			subtitle: t('city3Subtitle'),
			desc: t('city3Desc'),
		},
		{
			num: '04',
			name: t('city4Name'),
			subtitle: t('city4Subtitle'),
			desc: t('city4Desc'),
		},
		{
			num: '05',
			name: t('city5Name'),
			subtitle: t('city5Subtitle'),
			desc: t('city5Desc'),
		},
		{
			num: '06',
			name: t('city6Name'),
			subtitle: t('city6Subtitle'),
			desc: t('city6Desc'),
		},
	]

	const traditions = [
		{
			title: t('culturePlovTitle'),
			desc: t('culturePlovDesc'),
		},
		{
			title: t('cultureTeaTitle'),
			desc: t('cultureTeaDesc'),
		},
		{
			title: t('cultureCraftsTitle'),
			desc: t('cultureCraftsDesc'),
		},
	]

	return (
		<>
			{/* 1. Header */}
			<section className='relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden'>
				<Background
					src='/tashkent/spot-in-tashkent_5.jpg'
					alt='Tashkent Silk Road Landscape'
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

			{/* 2. Intro Showcase */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[var(--color-brand-surface)] p-8 sm:p-12 lg:p-16 rounded-2xl border border-[var(--color-brand-border)] shadow-xs'>
					<div className='lg:col-span-5 space-y-4'>
						<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
							Central Asia Destination
						</span>
						<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)] leading-tight'>
							{t('introTitle')}
						</h2>
						<div className='w-16 h-0.5 bg-[var(--color-brand-gold)]' />
					</div>

					<div className='lg:col-span-7 space-y-6 text-neutral-600 text-sm sm:text-base leading-relaxed'>
						<p>{t('introText1')}</p>
						<p>{t('introText2')}</p>
					</div>
				</div>
			</section>

			{/* 3. Cities & Regions Grid */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
				<div className='text-center max-w-2xl mx-auto space-y-3'>
					<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
						{t('citiesBadge')}
					</span>
					<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
						Silk Road Highlights
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{destinations.map(city => (
						<div
							key={city.num}
							className='p-8 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border-light)] hover:border-[var(--color-brand-gold)] shadow-2xs hover:shadow-md transition duration-300 space-y-4 flex flex-col justify-between'
						>
							<div className='space-y-3'>
								<div className='flex items-center justify-between'>
									<span className='font-serif text-2xl font-bold text-[var(--color-brand-gold)]'>
										{city.num}
									</span>
									<span className='text-[10px] uppercase tracking-widest text-neutral-400 font-mono'>
										Uzbekistan
									</span>
								</div>
								<h3 className='font-serif text-2xl font-bold text-[var(--color-brand-dark)]'>
									{city.name}
								</h3>
								<p className='text-xs uppercase tracking-wider text-[var(--color-brand-gold-dark)] font-medium'>
									{city.subtitle}
								</p>
								<p className='text-neutral-600 text-xs sm:text-sm leading-relaxed pt-2'>
									{city.desc}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* 4. Traditions & Gastronomy */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='p-8 sm:p-12 lg:p-16 rounded-2xl bg-neutral-900 text-white space-y-10'>
					<div className='text-center max-w-2xl mx-auto space-y-3'>
						<span className='text-xs uppercase tracking-[0.25em] font-semibold text-[var(--color-brand-gold-light)]'>
							{t('cultureBadge')}
						</span>
						<h2 className='font-serif text-3xl sm:text-4xl font-bold'>
							{t('cultureTitle')}
						</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 pt-4'>
						{traditions.map((item, idx) => (
							<div
								key={idx}
								className='p-6 rounded-xl bg-neutral-800/70 border border-neutral-700/80 space-y-3'
							>
								<h3 className='font-serif text-xl font-bold text-[var(--color-brand-gold-light)]'>
									{item.title}
								</h3>
								<p className='text-neutral-300 text-xs sm:text-sm leading-relaxed font-light'>
									{item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 5. Bottom CTA Banner */}
			<CtaBanner />
		</>
	)
}
