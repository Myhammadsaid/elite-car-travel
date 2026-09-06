import Background from '@/components/Background'
import CtaBanner from '@/components/CtaBanner'
import TagBadge from '@/components/TagBadge'
import { Link } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'

async function getServices() {
	const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
	try {
		const res = await fetch(`${API_BASE}/api/services`, {
			next: { revalidate: 60 }, // Next.js ISR cache
		})
		if (!res.ok) return []
		return await res.json()
	} catch (error) {
		console.error('Failed to fetch services:', error)
		return []
	}
}

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

	const t = await getTranslations({ locale, namespace: 'ServicesPage' })
	const services = await getServices()

	return (
		<>
			{/* 1. Header Section */}
			<section className='relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden'>
				<Background
					src='/bukhara/spot-in-bukhara_10.jpg'
					alt='Bukhara Silk Road Landscape'
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

			{/* 2. Dynamic Service Blocks */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12'>
				{services.map(svc => {
					const badge = svc.badge?.[locale] || svc.badge?.en || ''
					const title = svc.title?.[locale] || svc.title?.en || ''
					const desc = svc.desc?.[locale] || svc.desc?.en || ''
					const features = (svc.features || []).map(f => f[locale] || f.en)

					return (
						<div
							key={svc._id || svc.slug}
							id={svc.slug}
							className='p-8 sm:p-12 lg:p-16 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-xs scroll-mt-24'
						>
							<div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
								<div className='lg:col-span-5 space-y-4'>
									{badge && (
										<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
											{badge}
										</span>
									)}
									<h2 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)] leading-tight'>
										{title}
									</h2>
									<p className='text-neutral-600 text-sm sm:text-base leading-relaxed'>
										{desc}
									</p>
									<h4 className='text-md font-serif font-bold text-[var(--color-brand-gold)] mt-2'>
										{svc.price > 0 && (
											<span>
												{t('priceLabel')}: {svc.price} USD
											</span>
										)}
									</h4>
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
										{features.map((feature, idx) => (
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
					)
				})}
			</section>

			{/* 3. CTA Banner */}
			<CtaBanner />
		</>
	)
}
