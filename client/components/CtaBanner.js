import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function CtaBanner({
	title,
	subtitle,
	buttonText,
	href = '/custom-travel',
}) {
	const t = useTranslations('CtaBanner')

	return (
		<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='relative overflow-hidden rounded-2xl bg-[var(--color-brand-dark)] text-white p-8 sm:p-12 lg:p-16 my-16 shadow-xl'>
				{/* Decorative accent element */}
				<div className='absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[var(--color-brand-gold)]/10 blur-3xl pointer-events-none' />
				<div className='absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-[var(--color-brand-gold)]/10 blur-3xl pointer-events-none' />

				<div className='relative z-10 max-w-3xl mx-auto text-center space-y-6'>
					<span className='text-xs uppercase tracking-[0.25em] text-[var(--color-brand-gold-light)] font-semibold'>
						Elite Car Group · Central Asia
					</span>
					<h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white'>
						{title || t('title')}
					</h2>
					<p className='text-neutral-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed'>
						{subtitle || t('subtitle')}
					</p>
					<div className='pt-2'>
						<Link
							href={href}
							className='inline-block px-8 py-4 rounded-md bg-[var(--color-brand-gold)] text-white font-medium text-sm tracking-wide uppercase hover:bg-[var(--color-brand-gold-light)] shadow-md hover:shadow-lg transition-all duration-200'
						>
							{buttonText || t('button')}
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
