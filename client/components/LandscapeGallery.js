'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function LandscapeGallery({ items, locale }) {
	const containerRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(0)

	// Track active slide index on scroll/swipe
	const handleScroll = () => {
		if (!containerRef.current) return
		const { scrollLeft, clientWidth } = containerRef.current
		const newIndex = Math.round(scrollLeft / clientWidth)
		if (newIndex !== activeIndex && newIndex >= 0 && newIndex < items.length) {
			setActiveIndex(newIndex)
		}
	}

	const scrollToIndex = index => {
		if (!containerRef.current) return
		const width = containerRef.current.clientWidth
		containerRef.current.scrollTo({
			left: width * index,
			behavior: 'smooth',
		})
	}

	const handleNext = () => {
		if (activeIndex < items.length - 1) scrollToIndex(activeIndex + 1)
	}

	const handlePrev = () => {
		if (activeIndex > 0) scrollToIndex(activeIndex - 1)
	}

	// Keyboard navigation support
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'ArrowRight') handleNext()
			if (e.key === 'ArrowLeft') handlePrev()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [activeIndex])

	return (
		<div className='relative w-full max-w-5xl mx-auto flex flex-col items-center select-none'>
			{/* 9:16 Container Frame */}
			<div className='relative w-full max-w-sm sm:max-w-md aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-brand-border)] bg-neutral-950'>
				{/* Swipeable Viewport */}
				<div
					ref={containerRef}
					onScroll={handleScroll}
					className='w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none touch-pan-x'
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				>
					{items.map((item, idx) => (
						<div
							key={idx}
							className='relative flex-shrink-0 w-full h-full snap-center overflow-hidden'
						>
							<Image
								src={item.src}
								alt={
									item.title?.[locale] ||
									item.title?.en ||
									`Landscape ${idx + 1}`
								}
								fill
								priority={idx === 0}
								className='object-cover object-center'
								sizes='(max-width: 768px) 100vw, 450px'
							/>

							{/* Bottom Gradient Info Overlay */}
							<div className='absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white space-y-1.5'>
								<span className='text-[10px] uppercase font-bold tracking-widest text-[var(--color-brand-gold)]'>
									{item.location?.[locale] || item.location?.en}
								</span>
								<h3 className='font-serif text-lg sm:text-xl font-bold leading-snug drop-shadow-md'>
									{item.title?.[locale] || item.title?.en}
								</h3>
								{item.desc && (
									<p className='text-xs text-neutral-300 font-light leading-relaxed line-clamp-2'>
										{item.desc?.[locale] || item.desc?.en}
									</p>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Previous / Next Arrow Controls */}
				{activeIndex > 0 && (
					<button
						type='button'
						onClick={handlePrev}
						aria-label='Previous slide'
						className='absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition border border-white/20 cursor-pointer z-20'
					>
						‹
					</button>
				)}

				{activeIndex < items.length - 1 && (
					<button
						type='button'
						onClick={handleNext}
						aria-label='Next slide'
						className='absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition border border-white/20 cursor-pointer z-20'
					>
						›
					</button>
				)}
			</div>

			{/* Slide Pagination Dots */}
			<div className='flex items-center justify-center gap-2 mt-6'>
				{items.map((_, idx) => (
					<button
						key={idx}
						type='button'
						onClick={() => scrollToIndex(idx)}
						className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
							activeIndex === idx
								? 'w-8 bg-[var(--color-brand-gold)]'
								: 'w-2 bg-neutral-300 hover:bg-neutral-400'
						}`}
					/>
				))}
			</div>

			{/* Mobile Swipe Hint */}
			<p className='text-xs text-neutral-500 mt-3 font-light sm:hidden'>
				← Смахните влево или вправо →
			</p>
		</div>
	)
}
