import { Link } from '@/i18n/routing'

export default function NotFound() {
	return (
		<div className='min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-16'>
			<span className='text-7xl font-serif font-bold text-[var(--color-brand-gold)] mb-4'>
				404
			</span>
			<h1 className='text-3xl sm:text-4xl font-serif font-bold text-[var(--color-brand-dark)] mb-4'>
				Page Not Found
			</h1>
			<p className='text-neutral-600 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed'>
				The page you are looking for might have been removed, had its name
				changed, or is temporarily unavailable.
			</p>
			<Link
				href='/'
				className='px-6 py-3 rounded-md bg-[var(--color-brand-gold)] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[var(--color-brand-gold-dark)] transition-colors shadow-xs'
			>
				Return to Home
			</Link>
		</div>
	)
}
