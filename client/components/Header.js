// components/Header.js
'use client'

import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import SocialMedia from './SocialMedia'

export default function Header() {
	const pathname = usePathname()
	const t = useTranslations('Navigation')
	const [isOpen, setIsOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [mobileExpanded, setMobileExpanded] = useState({})

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 25)
		}

		handleScroll()
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const toggleMenu = () => setIsOpen(prev => !prev)
	const closeMenu = () => {
		setIsOpen(false)
		setMobileExpanded({})
	}

	const toggleMobileSubmenu = key => {
		setMobileExpanded(prev => ({
			...prev,
			[key]: !prev[key],
		}))
	}

	// 2 direct links (Home, Contact) + 2 dropdowns (About, Services)
	const navItems = [
		{
			label: t('home'),
			href: '/',
		},
		{
			label: t('about'),
			href: '/about',
			children: [
				{ label: t('about'), href: '/about' },
				{ label: t('whyUs'), href: '/why-us' },
				{ label: t('discoverUzbekistan'), href: '/discover-uzbekistan' },
			],
		},
		{
			label: t('services'),
			href: '/services',
			children: [
				{ label: t('services'), href: '/services' },
				{ label: t('travelAgencies'), href: '/for-travel-agencies' },
				{ label: t('corporate'), href: '/for-corporate-clients' },
				{ label: t('customTravel'), href: '/custom-travel' },
			],
		},
		{
			label: t('contact'),
			href: '/contact',
		},
	]

	// Hide header on admin pages without breaking hook order
	if (pathname === '/admin' || pathname.endsWith('/admin')) {
		return null
	}

	return (
		<header
			className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b border-[var(--color-brand-border)] ${
				isScrolled
					? 'bg-[var(--color-brand-cream)]/95 backdrop-blur-md shadow-sm'
					: 'bg-[var(--color-brand-cream)]'
			}`}
		>
			<div
				className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ease-in-out ${
					isScrolled ? 'h-16' : 'h-20 sm:h-22'
				}`}
			>
				{/* Left: Brand Logo */}
				<Link
					href='/'
					onClick={closeMenu}
					className={`relative flex-shrink-0 transition-all duration-300 ease-in-out hover:scale-105 ${
						isScrolled
							? 'w-12 h-12 sm:w-14 sm:h-14'
							: 'w-16 h-16 sm:w-20 sm:h-20'
					}`}
				>
					<Image
						src='/logo.png'
						alt='Elite Car Group Logo'
						fill
						sizes='80px'
						className='object-contain'
						priority
					/>
				</Link>

				{/* Center: Desktop Navigation */}
				<div className='hidden lg:flex items-center gap-8'>
					<nav className='flex items-center gap-6 text-sm font-medium text-neutral-800'>
						{navItems.map((item, idx) => {
							if (item.children) {
								const isChildActive = item.children.some(
									child => pathname === child.href,
								)

								return (
									<div
										key={idx}
										className={`relative group transition-all duration-300 ${
											isScrolled ? 'py-4' : 'py-6'
										}`}
									>
										<button
											className={`flex items-center gap-1.5 py-1 text-sm font-medium transition-colors duration-150 group-hover:text-[var(--color-brand-gold)] cursor-pointer ${
												isChildActive
													? 'text-[var(--color-brand-gold)] font-semibold'
													: ''
											}`}
										>
											<span>{item.label}</span>
											<svg
												className='w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70 group-hover:opacity-100'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 9l-7 7-7-7'
												/>
											</svg>
										</button>

										{/* Hover Dropdown Menu */}
										<div className='absolute left-0 top-full -mt-1 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50'>
											<div className='w-60 p-2 rounded-xl bg-[var(--color-brand-cream)] border border-[var(--color-brand-border)] shadow-xl backdrop-blur-md space-y-1'>
												{item.children.map((child, cIdx) => {
													const isActive = pathname === child.href
													return (
														<Link
															key={cIdx}
															href={child.href}
															className={`block px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
																isActive
																	? 'bg-[var(--color-brand-gold)] text-white shadow-xs'
																	: 'text-neutral-700 hover:bg-neutral-100/80 hover:text-[var(--color-brand-gold-dark)]'
															}`}
														>
															{child.label}
														</Link>
													)
												})}
											</div>
										</div>
									</div>
								)
							}

							const isActive = pathname === item.href
							return (
								<Link
									key={idx}
									href={item.href}
									className={`relative py-1 transition-colors duration-150 hover:text-[var(--color-brand-gold)] ${
										isActive
											? 'text-[var(--color-brand-gold)] font-semibold'
											: ''
									}`}
								>
									{item.label}
									{isActive && (
										<span className='absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-brand-gold)] rounded-full' />
									)}
								</Link>
							)
						})}
					</nav>

					{/* Actions: Social Media Dropdown + Language Switcher */}
					<div className='flex items-center gap-3 pl-2 border-l border-[var(--color-brand-border)]'>
						<SocialMedia mode='desktop' />
						<LanguageSwitcher />
					</div>
				</div>

				{/* Mobile Actions: Language Switcher + Hamburger */}
				<div className='flex items-center gap-3 lg:hidden'>
					<LanguageSwitcher className='scale-90' />
					<button
						onClick={toggleMenu}
						aria-label='Toggle navigation menu'
						className='p-2 rounded-lg text-[var(--color-brand-dark)] hover:bg-neutral-200/50 transition cursor-pointer focus:outline-hidden'
					>
						<svg
							className='w-6 h-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							{isOpen ? (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							) : (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* Smooth Animated Mobile Menu */}
			<div
				className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[var(--color-brand-cream)] border-b border-[var(--color-brand-border)] shadow-xl ${
					isOpen ? 'max-h-[700px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
				}`}
			>
				<div className='px-6 space-y-4'>
					{navItems.map((item, idx) => {
						if (item.children) {
							const isExpanded = !!mobileExpanded[idx]
							return (
								<div
									key={idx}
									className='border-b border-[var(--color-brand-border)]/50 pb-2'
								>
									<button
										onClick={() => toggleMobileSubmenu(idx)}
										className='w-full flex items-center justify-between py-2 text-sm font-medium text-neutral-800'
									>
										<span>{item.label}</span>
										<svg
											className={`w-4 h-4 transition-transform duration-200 ${
												isExpanded
													? 'rotate-180 text-[var(--color-brand-gold)]'
													: 'text-neutral-500'
											}`}
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 9l-7 7-7-7'
											/>
										</svg>
									</button>

									<div
										className={`overflow-hidden transition-all duration-200 space-y-1 pl-4 ${
											isExpanded ? 'max-h-48 py-2' : 'max-h-0'
										}`}
									>
										{item.children.map((child, cIdx) => (
											<Link
												key={cIdx}
												href={child.href}
												onClick={closeMenu}
												className='block py-1.5 text-sm text-neutral-600 hover:text-[var(--color-brand-gold-dark)] font-medium'
											>
												• {child.label}
											</Link>
										))}
									</div>
								</div>
							)
						}

						const isActive = pathname === item.href
						return (
							<Link
								key={idx}
								href={item.href}
								onClick={closeMenu}
								className={`block py-2 text-sm font-medium transition-colors border-b border-[var(--color-brand-border)]/50 ${
									isActive
										? 'text-[var(--color-brand-gold)] font-semibold'
										: 'text-neutral-800 hover:text-[var(--color-brand-gold)]'
								}`}
							>
								{item.label}
							</Link>
						)
					})}

					{/* Integrated Mobile Social Links */}
					<SocialMedia mode='mobile' />

					<div className='pt-2'>
						<Link
							href='/custom-travel'
							onClick={closeMenu}
							className='w-full block text-center py-3 rounded-md bg-[var(--color-brand-gold)] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[var(--color-brand-gold-dark)] shadow-xs transition-colors'
						>
							{t('requestQuote')}
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
