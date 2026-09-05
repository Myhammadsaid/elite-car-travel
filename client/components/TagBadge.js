export default function TagBadge({ tag }) {
	return (
		<div className='inline-flex items-center gap-2 px-2 py-1.5 rounded-full underline underline-offset-5 text-white'>
			<span className='w-1.5 h-1.5 rounded-full bg-white' />
			<span className='text-xs font-semibold tracking-wider text-white'>
				{tag}
			</span>
		</div>
	)
}
