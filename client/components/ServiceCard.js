import { Link } from '@/i18n/routing'

export default function ServiceCard({
	number,
	title,
	description,
	bullets = [],
	href = '/services',
	actionText = 'Learn More',
}) {
	return (
		<div className='group relative flex flex-col justify-between p-8 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border-light)] hover:border-[var(--color-brand-gold)] shadow-xs hover:shadow-lg transition-all duration-300'>
			<div>
				<div className='flex items-center justify-between mb-4'>
					<span className='font-serif text-2xl font-bold text-[var(--color-brand-gold)]'>
						{number}
					</span>
					<span className='w-8 h-[1px] bg-[var(--color-brand-gold)]/40 group-hover:w-12 transition-all duration-300'></span>
				</div>

				<h3 className='font-serif text-2xl font-bold text-[var(--color-brand-dark)] mb-3 group-hover:text-[var(--color-brand-gold-dark)] transition-colors'>
					{title}
				</h3>

				<p className='text-neutral-600 text-sm leading-relaxed mb-6 font-normal'>
					{description}
				</p>

				{bullets.length > 0 && (
					<ul className='space-y-2 mb-8 text-xs text-neutral-600 border-t border-neutral-100 pt-4'>
						{bullets.map((bullet, idx) => (
							<li key={idx} className='flex items-center gap-2'>
								<span className='w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)]' />
								<span>{bullet}</span>
							</li>
						))}
					</ul>
				)}
			</div>

			<Link
				href={href}
				className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-gold-dark)] group-hover:text-[var(--color-brand-dark)] transition-colors'
			>
				<span>{actionText}</span>
				<span className='transition-transform group-hover:translate-x-1'>
					→
				</span>
			</Link>
		</div>
	)
}
