'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'

const languages = [
	{ code: 'ru', label: 'RU', name: 'Русский' },
	{ code: 'en', label: 'EN', name: 'English' },
	{ code: 'ja', label: 'JA', name: '日本語' },
]

export default function LanguageSwitcher({ className = '' }) {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()

	const handleLanguageChange = nextLocale => {
		if (nextLocale === locale) return
		startTransition(() => {
			router.replace(pathname, { locale: nextLocale })
		})
	}

	return (
		<div
			className={`inline-flex items-center rounded-full border border-[var(--color-brand-border)] bg-[var(--color-brand-cream)] p-1 sm:p-1.5 shadow-xs ${className}`}
		>
			{languages.map(lang => {
				const isActive = locale === lang.code
				return (
					<button
						key={lang.code}
						onClick={() => handleLanguageChange(lang.code)}
						disabled={isPending}
						className={`cursor-pointer px-2.5 py-1 text-sm font-semibold tracking-wider rounded-full transition-all duration-200 ${
							isActive
								? 'bg-[var(--color-brand-gold)] text-white shadow-xs'
								: 'text-neutral-700 hover:text-[var(--color-brand-gold-dark)] hover:bg-[#EDE7D9]'
						}`}
						title={lang.name}
						aria-label={`Switch language to ${lang.name}`}
					>
						{lang.label}
					</button>
				)
			})}
		</div>
	)
}
