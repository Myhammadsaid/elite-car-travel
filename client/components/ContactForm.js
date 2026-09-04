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
		contact: '',
		serviceType: '',
		destination: '',
		duration: '',
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
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
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
				contact: '',
				serviceType: '',
				destination: '',
				duration: '',
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
			className='p-8 sm:p-10 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-sm space-y-6'
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
				<div className='p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium'>
					✓ {status.message}
				</div>
			)}

			{status.error && (
				<div className='p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium'>
					✕ {status.message}
				</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				{/* Name */}
				<div className='space-y-1.5'>
					<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
						{t('name')} *
					</label>
					<input
						type='text'
						name='name'
						required
						value={formData.name}
						onChange={handleChange}
						placeholder={t('namePlaceholder')}
						className='w-full px-4 py-3 rounded-md bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition'
					/>
				</div>

				{/* Contact (Phone / Email) */}
				<div className='space-y-1.5'>
					<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
						{t('contact')} *
					</label>
					<input
						type='text'
						name='contact'
						required
						value={formData.contact}
						onChange={handleChange}
						placeholder={t('contactPlaceholder')}
						className='w-full px-4 py-3 rounded-md bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition'
					/>
				</div>
			</div>

			{/* Service / Custom Fields */}
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
							className='w-full px-4 py-3 rounded-md bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition'
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
							className='w-full px-4 py-3 rounded-md bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition'
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
						className='w-full px-4 py-3 rounded-md bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition'
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

			{/* Message */}
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
					className='w-full px-4 py-3 rounded-md bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition'
				/>
			</div>

			{/* Submit Button */}
			<button
				type='submit'
				disabled={status.loading}
				className='w-full py-4 rounded-md bg-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold-dark)] text-white text-sm font-semibold uppercase tracking-wider shadow-sm transition duration-200 cursor-pointer disabled:opacity-50'
			>
				{status.loading ? t('submitting') : t('submit')}
			</button>
		</form>
	)
}
