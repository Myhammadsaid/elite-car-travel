import Image from 'next/image'

export default function Background({ src, alt }) {
	return (
		<>
			<div className='absolute inset-0 -z-20 pointer-events-none'>
				<Image
					src={src}
					alt={alt}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
					className='object-cover object-center transform-gpu'
					priority
					quality={100}
				/>
			</div>

			{/* Lightweight Pure CSS Gradient (Zero GPU Compositing Lag) */}
			<div
				className='absolute inset-0 -z-10 pointer-events-none'
				style={{
					background:
						'linear-gradient(180deg, rgba(250, 248, 243, 0.10) 0%, rgba(250, 248, 243, 0.92) 90%, rgba(250, 248, 243, 1) 100%)',
				}}
			/>
		</>
	)
}
