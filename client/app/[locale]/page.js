import CtaBanner from '@/components/CtaBanner'
import ServiceCard from '@/components/ServiceCard'
import TagBadge from '@/components/TagBadge'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

export default async function HomePage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return <HomeContent />
}

function HomeContent() {
	const t = useTranslations('HomePage')
	const tCommon = useTranslations('Common')

	const services = [
		{
			number: '01',
			title: t('service1Title'),
			description: t('service1Desc'),
			bullets: [
				t('service1Bullet1'),
				t('service1Bullet2'),
				t('service1Bullet3'),
			],
			href: '/services#transportation',
		},
		{
			number: '02',
			title: t('service2Title'),
			description: t('service2Desc'),
			bullets: [
				t('service2Bullet1'),
				t('service2Bullet2'),
				t('service2Bullet3'),
			],
			href: '/services#inbound',
		},
		{
			number: '03',
			title: t('service3Title'),
			description: t('service3Desc'),
			bullets: [
				t('service3Bullet1'),
				t('service3Bullet2'),
				t('service3Bullet3'),
			],
			href: '/services#tours',
		},
	]

	const whyUsPoints = [
		{ num: '01', title: t('whyPoint1Title'), desc: t('whyPoint1Desc') },
		{ num: '02', title: t('whyPoint2Title'), desc: t('whyPoint2Desc') },
		{ num: '03', title: t('whyPoint3Title'), desc: t('whyPoint3Desc') },
		{ num: '04', title: t('whyPoint4Title'), desc: t('whyPoint4Desc') },
		{ num: '05', title: t('whyPoint5Title'), desc: t('whyPoint5Desc') },
	]

	const cities = [
		{ name: t('cityTashkent'), desc: t('cityTashkentDesc') },
		{ name: t('citySamarkand'), desc: t('citySamarkandDesc') },
		{ name: t('cityBukhara'), desc: t('cityBukharaDesc') },
		{ name: t('cityKhiva'), desc: t('cityKhivaDesc') },
	]

	return (
		<>
			{/* 1. OPTIMIZED HERO SECTION */}
			<section className='relative pt-16 md:pt-24 pb-24 md:pb-32 overflow-hidden transform-gpu'>
				{/* Hardware-Accelerated Background Image */}
				<div className='absolute inset-0 -z-20 pointer-events-none'>
					<Image
						src='/uzbekistan.webp'
						alt='Uzbekistan Silk Road Landscape'
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
						className='object-cover object-center transform-gpu'
						priority
						quality={60}
					/>
				</div>

				{/* Lightweight Pure CSS Gradient (Zero GPU Compositing Lag) */}
				<div
					className='absolute inset-0 -z-10 pointer-events-none'
					style={{
						background:
							'linear-gradient(180deg, rgba(250, 248, 243, 0.78) 0%, rgba(250, 248, 243, 0.92) 90%, rgba(250, 248, 243, 1) 100%)',
					}}
				/>

				{/* Hero Content */}
				<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-4xl mx-auto text-center space-y-8'>
						<TagBadge tag={t('badge')} />

						{/* Main Tagline */}
						<h1 className='text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[var(--color-brand-dark)] tracking-tight leading-[1.15]'>
							{t('title')}
						</h1>

						{/* Description */}
						<p className='text-base sm:text-xl text-neutral-700 font-normal leading-relaxed max-w-2xl mx-auto'>
							{t('description')}
						</p>

						{/* Call to action buttons */}
						<div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'>
							<Link
								href='/custom-travel'
								className='w-full sm:w-auto px-8 py-4 rounded-md bg-[var(--color-brand-gold)] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[var(--color-brand-gold-dark)] shadow-sm hover:shadow-md transition-colors duration-150 text-center'
							>
								{t('ctaPlanTrip')}
							</Link>
							<Link
								href='/services'
								className='w-full sm:w-auto px-8 py-4 rounded-md bg-white border border-[var(--color-brand-border)] text-[var(--color-brand-dark)] text-sm font-semibold uppercase tracking-wider hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold-dark)] transition-colors duration-150 text-center shadow-2xs'
							>
								{t('ctaServices')}
							</Link>
						</div>

						{/* Key Metrics Stats Bar */}
						<div className='pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--color-brand-border)]/80 mt-12'>
							<div className='text-center space-y-1'>
								<span className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
									8+
								</span>
								<p className='text-xs text-neutral-600 uppercase tracking-wider font-medium'>
									{t('statsExperience')}
								</p>
							</div>
							<div className='text-center space-y-1'>
								<span className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
									5
								</span>
								<p className='text-xs text-neutral-600 uppercase tracking-wider font-medium'>
									{t('statsCities')}
								</p>
							</div>
							<div className='text-center space-y-1'>
								<span className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
									24/7
								</span>
								<p className='text-xs text-neutral-600 uppercase tracking-wider font-medium'>
									{t('statsSupport')}
								</p>
							</div>
							<div className='text-center space-y-1'>
								<span className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
									100%
								</span>
								<p className='text-xs text-neutral-600 uppercase tracking-wider font-medium'>
									{t('statsClients')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 2. ABOUT PREVIEW SECTION */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[var(--color-brand-surface)] p-8 sm:p-12 lg:p-16 rounded-2xl border border-[var(--color-brand-border)] shadow-xs'>
					<div className='lg:col-span-5 space-y-4'>
						<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
							{t('aboutSectionBadge')}
						</span>
						<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)] leading-tight'>
							{t('aboutSectionTitle')}
						</h2>
						<div className='w-16 h-0.5 bg-[var(--color-brand-gold)]' />
					</div>

					<div className='lg:col-span-7 space-y-6 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal'>
						<p>{t('aboutSectionText1')}</p>
						<p>{t('aboutSectionText2')}</p>
						<div className='pt-2'>
							<Link
								href='/about'
								className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-gold-dark)] hover:text-[var(--color-brand-dark)] transition-colors duration-150'
							>
								<span>{t('aboutSectionCta')}</span>
								<span>→</span>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* 3. CORE SERVICES GRID */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
				<div className='text-center max-w-3xl mx-auto space-y-4'>
					<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
						{t('servicesBadge')}
					</span>
					<h2 className='font-serif text-3xl sm:text-5xl font-bold text-[var(--color-brand-dark)]'>
						{t('servicesTitle')}
					</h2>
					<p className='text-neutral-600 text-sm sm:text-base font-light'>
						{t('servicesSubtitle')}
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{services.map((svc, idx) => (
						<ServiceCard
							key={idx}
							number={svc.number}
							title={svc.title}
							description={svc.description}
							bullets={svc.bullets}
							href={svc.href}
							actionText={tCommon('learnMore')}
						/>
					))}
				</div>
			</section>

			{/* 4. WHY ELITE CAR GROUP (5 PILLARS) */}
			<section className='bg-neutral-900 text-white py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16'>
					<div className='text-center max-w-2xl mx-auto space-y-4'>
						<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-light)]'>
							{t('whyUsBadge')}
						</span>
						<h2 className='font-serif text-3xl sm:text-4xl font-bold text-white'>
							{t('whyUsTitle')}
						</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
						{whyUsPoints.map(point => (
							<div
								key={point.num}
								className='p-6 rounded-xl bg-neutral-800/60 border border-neutral-700/60 space-y-4 hover:border-[var(--color-brand-gold)] transition-colors duration-150'
							>
								<span className='font-serif text-2xl font-bold text-[var(--color-brand-gold)]'>
									{point.num}
								</span>
								<h3 className='font-serif text-lg font-semibold text-white leading-snug'>
									{point.title}
								</h3>
								<p className='text-neutral-400 text-xs leading-relaxed font-light'>
									{point.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 5. DISCOVER UZBEKISTAN TEASER */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[var(--color-brand-border)] pb-8'>
					<div className='space-y-3 max-w-2xl'>
						<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
							{t('silkRoadBadge')}
						</span>
						<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
							{t('silkRoadTitle')}
						</h2>
						<p className='text-neutral-600 text-sm sm:text-base font-light'>
							{t('silkRoadDesc')}
						</p>
					</div>
					<Link
						href='/discover-uzbekistan'
						className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-gold-dark)] hover:text-[var(--color-brand-dark)] transition-colors duration-150 flex-shrink-0'
					>
						<span>{tCommon('learnMore')}</span>
						<span>→</span>
					</Link>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{cities.map((city, idx) => (
						<div
							key={idx}
							className='p-6 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-2xs space-y-3 hover:border-[var(--color-brand-gold)] transition-colors duration-150'
						>
							<div className='flex items-center justify-between'>
								<h3 className='font-serif text-2xl font-bold text-[var(--color-brand-dark)]'>
									{city.name}
								</h3>
								<span className='text-xs text-[var(--color-brand-gold)] font-mono'>
									0{idx + 1}
								</span>
							</div>
							<p className='text-neutral-600 text-xs leading-relaxed'>
								{city.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* 6. B2B & CORPORATE CALLOUTS */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div className='p-8 sm:p-10 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] space-y-6 shadow-xs flex flex-col justify-between'>
						<div className='space-y-3'>
							<span className='text-xs uppercase tracking-widest text-[var(--color-brand-gold-dark)] font-semibold'>
								DMC & B2B
							</span>
							<h3 className='font-serif text-2xl sm:text-3xl font-bold text-[var(--color-brand-dark)]'>
								{t('partnerAgenciesTitle')}
							</h3>
							<p className='text-neutral-600 text-sm leading-relaxed'>
								{t('partnerAgenciesDesc')}
							</p>
						</div>
						<div>
							<Link
								href='/for-travel-agencies'
								className='inline-block px-6 py-3 rounded-md bg-[var(--color-brand-dark)] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[var(--color-brand-gold-dark)] transition-colors duration-150'
							>
								{tCommon('learnMore')}
							</Link>
						</div>
					</div>

					<div className='p-8 sm:p-10 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] space-y-6 shadow-xs flex flex-col justify-between'>
						<div className='space-y-3'>
							<span className='text-xs uppercase tracking-widest text-[var(--color-brand-gold-dark)] font-semibold'>
								Corporate & VIP
							</span>
							<h3 className='font-serif text-2xl sm:text-3xl font-bold text-[var(--color-brand-dark)]'>
								{t('partnerCorporateTitle')}
							</h3>
							<p className='text-neutral-600 text-sm leading-relaxed'>
								{t('partnerCorporateDesc')}
							</p>
						</div>
						<div>
							<Link
								href='/for-corporate-clients'
								className='inline-block px-6 py-3 rounded-md bg-[var(--color-brand-dark)] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[var(--color-brand-gold-dark)] transition-colors duration-150'
							>
								{tCommon('learnMore')}
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* 7. BOTTOM CTA BANNER */}
			<CtaBanner />
		</>
	)
}
