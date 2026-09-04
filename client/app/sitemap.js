export default function sitemap() {
	const baseUrl =
		process.env.NEXT_PUBLIC_SITE_URL || 'https://elitecartravel.uz'

	const routes = [
		'',
		'/about',
		'/services',
		'/for-travel-agencies',
		'/for-corporate-clients',
		'/why-us',
		'/discover-uzbekistan',
		'/custom-travel',
		'/contact',
	]

	const locales = ['ru', 'en', 'ja']
	const sitemapEntries = []

	routes.forEach(route => {
		locales.forEach(locale => {
			const url =
				locale === 'ru' ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`

			sitemapEntries.push({
				url,
				lastModified: new Date().toISOString(),
				changeFrequency: route === '' ? 'weekly' : 'monthly',
				priority: route === '' ? 1.0 : 0.8,
				alternates: {
					languages: {
						ru: `${baseUrl}${route}`,
						en: `${baseUrl}/en${route}`,
						ja: `${baseUrl}/ja${route}`,
					},
				},
			})
		})
	})

	return sitemapEntries
}
