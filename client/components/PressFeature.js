import { useTranslations } from 'next-intl'
import Image from 'next/image'
import TagBadge from './TagBadge'

export default function PressFeature() {
	const t = useTranslations('TravelAgenciesPage')

	return (
		<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='rounded-2xl overflow-hidden border border-[var(--color-brand-border)] shadow-xs bg-[var(--color-brand-surface)]'>
				<div className='relative w-full aspect-[16/9] sm:aspect-[16/8]'>
					<Image
						src='/press-japan-guidebook.jpg'
						alt='Elite Car Group featured as a contributing partner in the Japanese travel guidebook "Uzbekistan for the First Time Travelers"'
						fill
						sizes='(max-width: 1280px) 100vw, 1280px'
						className=' object-center'
					/>
				</div>

				<div className='p-6 sm:p-8 text-center space-y-3'>
					<TagBadge tag={t('pressBadge')} />
					<p className='text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed'>
						{t('pressCaption')}
					</p>
				</div>
			</div>
		</section>
	)
}
