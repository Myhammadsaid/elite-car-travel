'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const DEFAULT_SOCIALS = [
	{
		_id: '1',
		label: 'Instagram',
		url: 'https://instagram.com',
		icon: 'instagram',
	},
	{ _id: '2', label: 'Telegram', url: 'https://t.me', icon: 'telegram' },
	{ _id: '3', label: 'WhatsApp', url: 'https://wa.me', icon: 'whatsapp' },
]

function getSocialIcon(type = '') {
	const normalized = type.toLowerCase()
	if (normalized.includes('insta')) {
		return (
			<svg
				className='w-4 h-4'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
				<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
				<line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
			</svg>
		)
	}
	if (normalized.includes('tele')) {
		return (
			<svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
				<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z' />
			</svg>
		)
	}
	if (normalized.includes('whats')) {
		return (
			<svg
				className='w-4 h-4'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
			</svg>
		)
	}
	return (
		<svg
			className='w-4 h-4'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<circle cx='12' cy='12' r='10' />
			<line x1='2' y1='12' x2='22' y2='12' />
			<path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
		</svg>
	)
}

export default function SocialMedia({ mode = 'desktop' }) {
	const t = useTranslations('SocialMedia')
	const [links, setLinks] = useState(DEFAULT_SOCIALS)

	useEffect(() => {
		try {
			const stored = localStorage.getItem('socialLinks')
			if (stored) {
				const parsed = JSON.parse(stored)
				if (Array.isArray(parsed) && parsed.length > 0) {
					setLinks(parsed)
				}
			}
		} catch {
			// Fallback to DEFAULT_SOCIALS
		}
	}, [])

	if (mode === 'mobile') {
		return (
			<div className='pt-2 pb-1 border-t border-[var(--color-brand-border)]/60'>
				<span className='text-[10px] uppercase font-semibold tracking-wider text-neutral-400 block mb-2 px-1'>
					{t('mobileHeader')}
				</span>
				<div className='flex flex-wrap gap-2'>
					{links.map(link => (
						<a
							key={link._id || link.label}
							href={link.url}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 border border-[var(--color-brand-border)] text-xs font-medium text-neutral-700 hover:text-[var(--color-brand-gold-dark)] hover:border-[var(--color-brand-gold)] transition-all'
						>
							<span className='text-[var(--color-brand-gold)]'>
								{getSocialIcon(link.icon || link.label)}
							</span>
							<span>{link.label}</span>
						</a>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className='relative group py-2'>
			{/* Trigger Button */}
			<button
				type='button'
				className='flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium text-neutral-700 bg-white/60 border border-[var(--color-brand-border)] hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold-dark)] transition-all duration-200 cursor-pointer shadow-2xs group-hover:bg-white'
			>
				<span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
				<span>{t('button')}</span>
				<svg
					className='w-3 h-3 text-neutral-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--color-brand-gold)]'
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

			{/* Floating Animated Dropdown Menu */}
			<div className='absolute right-0 top-full mt-1 invisible opacity-0 translate-y-2 scale-95 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 ease-out z-50 origin-top-right'>
				<div className='w-48 p-2 rounded-2xl bg-[var(--color-brand-cream)]/95 backdrop-blur-md border border-[var(--color-brand-border)] shadow-xl space-y-1 ring-1 ring-black/5'>
					<div className='px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-neutral-400 border-b border-[var(--color-brand-border)]/50 mb-1'>
						{t('dropdownHeader')}
					</div>
					{links.map(link => (
						<a
							key={link._id || link.label}
							href={link.url}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:text-[var(--color-brand-gold-dark)] hover:bg-white/80 border border-transparent hover:border-[var(--color-brand-border)]/80 transition-all duration-150 group/item'
						>
							<div className='flex items-center gap-2.5'>
								<span className='text-neutral-500 group-hover/item:text-[var(--color-brand-gold)] transition-colors'>
									{getSocialIcon(link.icon || link.label)}
								</span>
								<span>{link.label}</span>
							</div>
							<svg
								className='w-3 h-3 text-neutral-300 group-hover/item:text-[var(--color-brand-gold)] opacity-0 group-hover/item:opacity-100 transition-all -translate-x-1 group-hover/item:translate-x-0'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M14 5l7 7m0 0l-7 7m7-7H3'
								/>
							</svg>
						</a>
					))}
				</div>
			</div>
		</div>
	)
}
