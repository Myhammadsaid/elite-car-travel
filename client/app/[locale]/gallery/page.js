import CtaBanner from '@/components/CtaBanner'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

const landscapePhotos = [
	{
		src: '/samarkand/spot-in-samarkand_4.jpg',
		alt: 'Landscape spot in Samarkand 4',
	},
	{
		src: '/samarkand/spot-in-samarkand_5.jpg',
		alt: 'Landscape spot in Samarkand 5',
	},
	{
		src: '/samarkand/spot-in-samarkand_6.jpg',
		alt: 'Landscape spot in Samarkand 6',
	},
	{
		src: '/samarkand/spot-in-samarkand_7.jpg',
		alt: 'Landscape spot in Samarkand 7',
	},
	{
		src: '/bukhara/spot-in-bukhara_1.jpg',
		alt: 'Landscape spot in Bukhara 1',
	},
	{
		src: '/bukhara/spot-in-bukhara_2.jpg',
		alt: 'Landscape spot in Bukhara 2',
	},
	{
		src: '/bukhara/spot-in-bukhara_9.jpg',
		alt: 'Landscape spot in Bukhara 9',
	},
]

export async function generateMetadata({ params }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'GalleryPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
	}
}

export default async function GalleryPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getTranslations({ locale, namespace: 'GalleryPage' })

	return (
		<>
			{/* 2. 9:16 Images Flex Wrap Gallery */}
			<section className='w-full pt-16 pb-8 md:pt-20 md:pb-12 px-4 text-center'>
				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-brand-dark)] leading-tight mb-8 '>
					{t('title')}
				</h1>
				<div className='flex flex-wrap items-center justify-center gap-6 sm:gap-8'>
					{landscapePhotos.map((photo, idx) => (
						<div
							key={idx}
							className='relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[var(--color-brand-border)] transition-all duration-300 group'
						>
							<Image
								src={photo.src}
								alt={photo.alt}
								fill
								sizes='(max-width: 640px) 280px, (max-width: 768px) 300px, 320px'
								className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
								priority={idx < 2}
							/>
						</div>
					))}
				</div>
			</section>

			{/* 3. CTA Banner */}
			<CtaBanner />
		</>
	)
}
