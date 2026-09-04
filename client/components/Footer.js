'use client'

import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'

export default function Footer() {
	const pathname = usePathname()
	const t = useTranslations('Footer')
	const tNav = useTranslations('Navigation')
	const currentYear = new Date().getFullYear()

	// Hide footer on admin pages without breaking hook order
	if (pathname === '/admin' || pathname.endsWith('/admin')) {
		return null
	}

	return (
		<footer className='bg-[var(--color-brand-dark)] text-neutral-300 border-t border-neutral-800 mt-16 md:mt-24'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
					{/* Col 1: Brand Info */}
					<div className='space-y-4'>
						<div className='flex items-center gap-3'>
							<div className='relative w-10 h-10 flex-shrink-0 bg-white/10 rounded-full p-1'>
								<Image
									src='/logo.png'
									alt='Elite Car Group'
									fill
									sizes='40px'
									className='object-contain p-1'
								/>
							</div>
							<span className='font-serif text-lg font-bold tracking-wider text-white'>
								ELITE CAR GROUP
							</span>
						</div>
						<p className='text-sm text-neutral-400 leading-relaxed'>
							{t('about')}
						</p>
						<div className='pt-2'>
							<LanguageSwitcher />
						</div>
					</div>

					{/* Col 2: Quick Links */}
					<div>
						<h3 className='text-sm font-semibold uppercase tracking-wider text-[var(--color-brand-gold-light)] mb-4'>
							{t('quickLinks')}
						</h3>
						<ul className='space-y-2.5 text-sm'>
							<li>
								<Link href='/' className='hover:text-white transition-colors'>
									{tNav('home')}
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='hover:text-white transition-colors'
								>
									{tNav('about')}
								</Link>
							</li>
							<li>
								<Link
									href='/why-us'
									className='hover:text-white transition-colors'
								>
									{tNav('whyUs')}
								</Link>
							</li>
							<li>
								<Link
									href='/discover-uzbekistan'
									className='hover:text-white transition-colors'
								>
									{tNav('discoverUzbekistan')}
								</Link>
							</li>
							<li>
								<Link
									href='/custom-travel'
									className='hover:text-white transition-colors'
								>
									{tNav('customTravel')}
								</Link>
							</li>
						</ul>
					</div>

					{/* Col 3: Services & Partnerships */}
					<div>
						<h3 className='text-sm font-semibold uppercase tracking-wider text-[var(--color-brand-gold-light)] mb-4'>
							{t('servicesTitle')}
						</h3>
						<ul className='space-y-2.5 text-sm'>
							<li>
								<Link
									href='/services'
									className='hover:text-white transition-colors'
								>
									{tNav('services')}
								</Link>
							</li>
							<li>
								<Link
									href='/for-travel-agencies'
									className='hover:text-white transition-colors'
								>
									{tNav('travelAgencies')}
								</Link>
							</li>
							<li>
								<Link
									href='/for-corporate-clients'
									className='hover:text-white transition-colors'
								>
									{tNav('corporate')}
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='hover:text-white transition-colors'
								>
									{tNav('contact')}
								</Link>
							</li>
						</ul>
					</div>

					{/* Col 4: Contact Info */}
					<div>
						<h3 className='text-sm font-semibold uppercase tracking-wider text-[var(--color-brand-gold-light)] mb-4'>
							{t('contactTitle')}
						</h3>
						<div className='space-y-3 text-sm text-neutral-400'>
							<p className='flex items-start gap-2.5'>
								<span className='text-[var(--color-brand-gold)]'>📍</span>
								<span>{t('address')}</span>
							</p>
							<p className='flex items-center gap-2.5'>
								<span className='text-[var(--color-brand-gold)]'>📞</span>
								<a
									href='tel:+998998040800'
									className='hover:text-white transition-colors'
								>
									+998 99 804 08 00
								</a>
							</p>
							<p className='flex items-center gap-2.5'>
								<span className='text-[var(--color-brand-gold)]'>✉️</span>
								<a
									href='mailto:elitecars.uz@gmail.com'
									className='hover:text-white transition-colors'
								>
									elitecars.uz@gmail.com
								</a>
							</p>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4'>
					<p>
						© {currentYear} Elite Car Group. {t('rights')}
					</p>
					<p className='text-[11px] tracking-widest uppercase text-neutral-400'>
						Tashkent · Samarkand · Bukhara · Khiva
					</p>
				</div>
			</div>
		</footer>
	)
}
