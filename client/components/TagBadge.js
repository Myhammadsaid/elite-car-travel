export default function TagBadge({ tag }) {
	return (
		<div className='inline-flex items-center gap-2 px-2 py-1.5 rounded-full border border-[var(--color-brand-border)] bg-white/95 shadow-2xs'>
			<span className='w-2 h-2 rounded-full bg-[var(--color-brand-gold)]' />
			<span className='text-xs font-semibold tracking-wider text-[var(--color-brand-gold-dark)]'>
				{tag}
			</span>
		</div>
	)
}
