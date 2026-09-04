import Background from '@/components/Background'
import ContactForm from '@/components/ContactForm'
import TagBadge from '@/components/TagBadge'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export default async function ContactPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return <ContactContent />
}

function ContactContent() {
	const t = useTranslations('ContactPage')

	const contactDetails = [
		{
			icon: '📍',
			label: t('addressLabel'),
			value: t('addressValue'),
			href: null,
		},
		{
			icon: '📞',
			label: t('phoneLabel'),
			value: t('phoneValue'),
			href: 'tel:+998998040800',
		},
		{
			icon: '✉️',
			label: t('emailLabel'),
			value: t('emailValue'),
			href: 'mailto:elitecars.uz@gmail.com',
		},
		{
			icon: '⏱️',
			label: t('hoursLabel'),
			value: t('hoursValue'),
			href: null,
		},
	]

	return (
		<>
			{/* 1. Header */}
			<section className='max-w-7xl mx-auto pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 text-center space-y-6'>
				<Background src='/fergana.jpg' alt='Fergana Silk Road Landscape' />
				<TagBadge tag={t('badge')} />

				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-brand-dark)] max-w-4xl mx-auto leading-tight'>
					{t('title')}
				</h1>
				<p className='text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed'>
					{t('subtitle')}
				</p>
				<div className='gold-divider max-w-xs mx-auto pt-4' />
			</section>

			{/* 2. Contact Grid: Info Cards + Inquiry Form */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
					{/* Left Column: Direct Contact Info */}
					<div className='lg:col-span-5 space-y-8'>
						<div className='space-y-3'>
							<h2 className='font-serif text-3xl font-bold text-[var(--color-brand-dark)]'>
								{t('infoHeading')}
							</h2>
							<div className='w-12 h-0.5 bg-[var(--color-brand-gold)]' />
						</div>

						<div className='space-y-4'>
							{contactDetails.map((item, idx) => (
								<div
									key={idx}
									className='p-6 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border-light)] shadow-2xs space-y-1.5'
								>
									<div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500'>
										<span>{item.icon}</span>
										<span>{item.label}</span>
									</div>
									{item.href ? (
										<a
											href={item.href}
											className='block text-base sm:text-lg font-medium text-[var(--color-brand-dark)] hover:text-[var(--color-brand-gold-dark)] transition-colors'
										>
											{item.value}
										</a>
									) : (
										<p className='text-base sm:text-lg font-medium text-[var(--color-brand-dark)]'>
											{item.value}
										</p>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Right Column: Inquiry Form */}
					<div className='lg:col-span-7 space-y-6'>
						<div className='space-y-2'>
							<h2 className='font-serif text-3xl font-bold text-[var(--color-brand-dark)]'>
								{t('formHeading')}
							</h2>
							<p className='text-neutral-600 text-sm font-light'>
								{t('formSubheading')}
							</p>
						</div>

						<ContactForm formType='general' source='contact-page' />
					</div>
				</div>
			</section>
		</>
	)
}
