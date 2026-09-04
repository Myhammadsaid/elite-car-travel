import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from 'next-intl/server'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'

const serifHeading = Cormorant_Garamond({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-serif-heading',
	display: 'swap',
})

const sansBody = Plus_Jakarta_Sans({
	subsets: ['latin', 'cyrillic-ext'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-sans-body',
	display: 'swap',
})

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
	const canonicalUrl = locale === 'ru' ? baseUrl : `${baseUrl}/${locale}`

	return {
		title: {
			default: t('title'),
			template: '%s | Elite Car Travel',
		},
		description: t('description'),
		keywords: t('keywords'),
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: baseUrl,
				en: `${baseUrl}/en`,
				ja: `${baseUrl}/ja`,
			},
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: canonicalUrl,
			siteName: 'Elite Car Travel',
			locale: locale === 'ja' ? 'ja_JP' : locale === 'ru' ? 'ru_RU' : 'en_US',
			type: 'website',
			images: [
				{
					url: '/logo.png',
					width: 800,
					height: 800,
					alt: 'Elite Car Travel Uzbekistan',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: ['/logo.png'],
		},
		icons: {
			icon: '/logo.png',
			apple: '/logo.png',
		},
	}
}

export default async function LocaleLayout({ children, params }) {
	const { locale } = await params

	if (!routing.locales.includes(locale)) {
		notFound()
	}

	setRequestLocale(locale)
	const messages = await getMessages()

	return (
		<html
			lang={locale}
			className={`${serifHeading.variable} ${sansBody.variable}`}
		>
			<body className='min-h-screen flex flex-col bg-[var(--color-brand-cream)] text-[var(--color-brand-dark)] antialiased selection:bg-[var(--color-brand-gold)] selection:text-white'>
				<NextIntlClientProvider messages={messages}>
					<Header />
					<main className='space-y-24 sm:space-y-32'>{children}</main>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
