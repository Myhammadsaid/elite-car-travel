import Image from 'next/image'

export default function Background({ src, alt }) {
	return (
		<div className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'>
			<Image
				src={src}
				alt={alt}
				fill
				sizes='100vw'
				className='object-cover object-center transform-gpu'
				priority
				quality={90}
			/>
			{/* Dark overlay for contrast */}
			<div className='absolute inset-0 bg-black/55' />
		</div>
	)
}
