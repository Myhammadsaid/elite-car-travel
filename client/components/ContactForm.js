'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export default function ContactForm({
	formType = 'general',
	source = 'website',
}) {
	const t = useTranslations('ContactForm')
	const locale = useLocale()

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		citizenship: '',
		serviceType: '',
		destination: '',
		travelDate: '',
		duration: '',
		participants: '',
		message: '',
		hp: '', // Honeypot field for bot mitigation
	})

	const [status, setStatus] = useState({
		loading: false,
		success: false,
		error: false,
		message: '',
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		// Silently reject bot submissions
		if (formData.hp) return

		setStatus({ loading: true, success: false, error: false, message: '' })

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
			const response = await fetch(`${apiUrl}/api/leads`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...formData,
					formType,
					source,
					locale,
				}),
			})

			if (!response.ok) {
				throw new Error('Submission failed')
			}

			setStatus({
				loading: false,
				success: true,
				error: false,
				message: t('successMessage'),
			})

			setFormData({
				name: '',
				phone: '',
				email: '',
				citizenship: '',
				serviceType: '',
				destination: '',
				travelDate: '',
				duration: '',
				participants: '',
				message: '',
				hp: '',
			})
		} catch {
			setStatus({
				loading: false,
				success: false,
				error: true,
				message: t('errorMessage'),
			})
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='w-full max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-md space-y-8'
		>
			{/* Honeypot hidden input */}
			<div className='hidden' aria-hidden='true'>
				<input
					type='text'
					name='hp'
					tabIndex='-1'
					autoComplete='off'
					value={formData.hp}
					onChange={handleChange}
				/>
			</div>

			{status.success && (
				<div className='p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2'>
					<span className='font-bold text-base'>✓</span>
					<span>{status.message}</span>
				</div>
			)}

			{status.error && (
				<div className='p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium flex items-center gap-2'>
					<span className='font-bold text-base'>✕</span>
					<span>{status.message}</span>
				</div>
			)}

			{/* Row 1: Full Name & Citizenship */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='space-y-1.5'>
					<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
						{t('name')}{' '}
						<span className='text-[var(--color-brand-gold-dark)]'>*</span>
					</label>
					<input
						type='text'
						name='name'
						required
						value={formData.name}
						onChange={handleChange}
						placeholder={t('namePlaceholder')}
						className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150'
					/>
				</div>

				<div className='space-y-1.5'>
					<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
						{t('citizenship')}
					</label>
					<input
						type='text'
						name='citizenship'
						value={formData.citizenship}
						onChange={handleChange}
						placeholder={t('citizenshipPlaceholder')}
						className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150'
					/>
				</div>
			</div>

			{/* Row 2: Phone & Email (Separated) */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='space-y-1.5'>
					<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
						{t('phone')}{' '}
						<span className='text-[var(--color-brand-gold-dark)]'>*</span>
					</label>
					<input
						type='tel'
						name='phone'
						required
						value={formData.phone}
						onChange={handleChange}
						placeholder={t('phonePlaceholder')}
						className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150'
					/>
				</div>

				<div className='space-y-1.5'>
					<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
						{t('email')}
					</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						placeholder={t('emailPlaceholder')}
						className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150'
					/>
				</div>
			</div>

			{/* Row 3: Travel Dates & Number of Travelers */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='space-y-1.5'>
					<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
						{t('travelDate')}
					</label>
					<input
						type='date'
						name='travelDate'
						value={formData.travelDate}
						onChange={handleChange}
						className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150 text-neutral-700'
					/>
				</div>

				<div className='space-y-1.5'>
					<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
						{t('participants')}
					</label>
					<input
						type='number'
						min='1'
						max='100'
						name='participants'
						value={formData.participants}
						onChange={handleChange}
						placeholder={t('participantsPlaceholder')}
						className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150'
					/>
				</div>
			</div>

			{/* Row 4: Service / Custom Route Fields */}
			{formType === 'custom' ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
					<div className='space-y-1.5'>
						<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
							{t('destination')}
						</label>
						<input
							type='text'
							name='destination'
							value={formData.destination}
							onChange={handleChange}
							placeholder={t('destinationPlaceholder')}
							className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150'
						/>
					</div>
					<div className='space-y-1.5'>
						<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
							{t('duration')}
						</label>
						<input
							type='text'
							name='duration'
							value={formData.duration}
							onChange={handleChange}
							placeholder={t('durationPlaceholder')}
							className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150'
						/>
					</div>
				</div>
			) : (
				<div className='space-y-1.5'>
					<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
						{t('serviceType')}
					</label>
					<select
						name='serviceType'
						value={formData.serviceType}
						onChange={handleChange}
						className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150'
					>
						<option value=''>{t('serviceSelect')}</option>
						<option value='Transportation'>{t('serviceTransfer')}</option>
						<option value='Inbound Travel'>{t('serviceInbound')}</option>
						<option value='Central Asia Tours'>{t('serviceTour')}</option>
						<option value='Corporate / Delegations'>
							{t('serviceCorporate')}
						</option>
						<option value='Custom Itinerary'>{t('serviceCustom')}</option>
					</select>
				</div>
			)}

			{/* Row 5: Message & Special Requests */}
			<div className='space-y-1.5'>
				<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
					{t('message')}
				</label>
				<textarea
					name='message'
					rows={4}
					value={formData.message}
					onChange={handleChange}
					placeholder={t('messagePlaceholder')}
					className='w-full px-4 py-3 rounded-lg bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition duration-150'
				/>
			</div>

			{/* Submit Action */}
			<button
				type='submit'
				disabled={status.loading}
				className='w-full py-4 rounded-xl bg-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold-dark)] text-white text-sm font-semibold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50'
			>
				{status.loading ? t('submitting') : t('submit')}
			</button>
		</form>
	)
}
