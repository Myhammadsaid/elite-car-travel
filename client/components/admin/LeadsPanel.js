// components/admin/LeadsPanel.js (or components/LeadsPanel.js)
'use client'

import { useCallback, useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export default function LeadsPanel({ token, onAuthError }) {
	const [leads, setLeads] = useState([])
	const [filterStatus, setFilterStatus] = useState('all')
	const [actionLoading, setActionLoading] = useState(false)

	const fetchLeads = useCallback(async () => {
		setActionLoading(true)
		try {
			const res = await fetch(`${API_BASE}/api/admin/leads`, {
				headers: { Authorization: `Bearer ${jwtToken(token)}` },
			})

			if (res.status === 401 || res.status === 403) {
				onAuthError()
				return
			}

			const data = await res.json()
			if (data.success) {
				setLeads(data.leads || [])
			}
		} catch (err) {
			console.error('Ошибка загрузки заявок:', err)
		} finally {
			setActionLoading(false)
		}
	}, [token, onAuthError])

	// Helper for bearer token
	function jwtToken(t) {
		return t ? t.replace('Bearer ', '') : ''
	}

	useEffect(() => {
		fetchLeads()
	}, [fetchLeads])

	const handleStatusChange = async (leadId, newStatus) => {
		try {
			const res = await fetch(`${API_BASE}/api/admin/leads/${leadId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwtToken(token)}`,
				},
				body: JSON.stringify({ status: newStatus }),
			})

			if (res.ok) {
				setLeads(prev =>
					prev.map(item =>
						item._id === leadId ? { ...item, status: newStatus } : item,
					),
				)
			}
		} catch (err) {
			console.error('Ошибка обновления статуса:', err)
		}
	}

	const handleDelete = async leadId => {
		if (
			!window.confirm('Вы уверены, что хотите навсегда удалить эту заявку?')
		) {
			return
		}

		try {
			const res = await fetch(`${API_BASE}/api/admin/leads/${leadId}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${jwtToken(token)}` },
			})

			if (res.ok) {
				setLeads(prev => prev.filter(item => item._id !== leadId))
			}
		} catch (err) {
			console.error('Ошибка удаления заявки:', err)
		}
	}

	const filteredLeads =
		filterStatus === 'all'
			? leads
			: leads.filter(item => item.status === filterStatus)

	const counts = {
		all: leads.length,
		new: leads.filter(l => l.status === 'new').length,
		'in-progress': leads.filter(l => l.status === 'in-progress').length,
		completed: leads.filter(l => l.status === 'completed').length,
		archived: leads.filter(l => l.status === 'archived').length,
	}

	const statusTranslations = {
		new: 'Новая',
		'in-progress': 'В обработке',
		completed: 'Завершена',
		archived: 'В архиве',
	}

	return (
		<div className='space-y-6'>
			{/* Top Filter and Refresh Controls */}
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div className='flex flex-wrap gap-2 text-xs font-semibold'>
					{[
						{ key: 'all', label: 'Все заявки' },
						{ key: 'new', label: 'Новые' },
						{ key: 'in-progress', label: 'В обработке' },
						{ key: 'completed', label: 'Завершенные' },
						{ key: 'archived', label: 'В архиве' },
					].map(tab => (
						<button
							key={tab.key}
							onClick={() => setFilterStatus(tab.key)}
							className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
								filterStatus === tab.key
									? 'bg-[var(--color-brand-gold)] text-white shadow-xs'
									: 'bg-white border border-[var(--color-brand-border)] text-neutral-600 hover:border-[var(--color-brand-gold)]'
							}`}
						>
							{tab.label} ({counts[tab.key] || 0})
						</button>
					))}
				</div>

				<button
					onClick={fetchLeads}
					disabled={actionLoading}
					className='px-4 py-2 rounded-md bg-white border border-[var(--color-brand-border)] text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:border-[var(--color-brand-gold)] transition cursor-pointer disabled:opacity-50'
				>
					{actionLoading ? 'Обновление...' : 'Обновить'}
				</button>
			</div>

			{/* Leads List */}
			{filteredLeads.length === 0 ? (
				<div className='p-12 text-center rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] text-neutral-500'>
					Заявок с данным статусом не найдено.
				</div>
			) : (
				<div className='grid grid-cols-1 gap-6'>
					{filteredLeads.map(lead => (
						<div
							key={lead._id}
							className='p-6 sm:p-8 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-2xs space-y-5 hover:border-[var(--color-brand-gold)] transition duration-200'
						>
							{/* Header: Name, Country Badge, Status Pill & Actions */}
							<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4'>
								<div>
									<div className='flex flex-wrap items-center gap-3'>
										<h2 className='font-serif text-2xl font-bold text-[var(--color-brand-dark)]'>
											{lead.name}
										</h2>

										{lead.citizenship && (
											<span className='inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-medium border border-neutral-200'>
												<span>🌍</span> {lead.citizenship}
											</span>
										)}

										<span
											className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
												lead.status === 'new'
													? 'bg-emerald-100 text-emerald-800'
													: lead.status === 'in-progress'
														? 'bg-amber-100 text-amber-800'
														: lead.status === 'completed'
															? 'bg-blue-100 text-blue-800'
															: 'bg-neutral-100 text-neutral-700'
											}`}
										>
											{statusTranslations[lead.status] || lead.status}
										</span>
									</div>

									<p className='text-xs text-neutral-500 mt-1'>
										Дата создания:{' '}
										{new Date(lead.createdAt).toLocaleString('ru-RU')} ·
										Источник:{' '}
										<span className='font-mono font-medium'>
											{lead.source || 'website'}
										</span>{' '}
										(Язык: {lead.locale ? lead.locale.toUpperCase() : 'RU'})
									</p>
								</div>

								<div className='flex items-center gap-3'>
									<select
										value={lead.status}
										onChange={e => handleStatusChange(lead._id, e.target.value)}
										className='text-xs font-semibold px-3 py-1.5 rounded-md bg-[var(--color-brand-cream)] border border-[var(--color-brand-border)] focus:outline-hidden cursor-pointer'
									>
										<option value='new'>Новая</option>
										<option value='in-progress'>В обработке</option>
										<option value='completed'>Завершена</option>
										<option value='archived'>В архив</option>
									</select>

									<button
										onClick={() => handleDelete(lead._id)}
										className='p-1.5 rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer'
										title='Удалить заявку'
									>
										🗑️
									</button>
								</div>
							</div>

							{/* Multi-Column Data Details */}
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs'>
								{/* 1. Contacts (Phone & Email with legacy fallback) */}
								<div className='p-3.5 rounded-lg bg-[var(--color-brand-cream)]/60 space-y-1'>
									<span className='font-semibold text-neutral-500 uppercase tracking-wider block'>
										Контакты
									</span>
									{lead.phone ? (
										<p className='font-medium text-neutral-900 select-all'>
											📞 {lead.phone}
										</p>
									) : null}
									{lead.email ? (
										<p
											className='font-medium text-neutral-700 select-all truncate'
											title={lead.email}
										>
											✉️ {lead.email}
										</p>
									) : null}
									{!lead.phone && !lead.email && lead.contact ? (
										<p className='font-medium text-neutral-900 select-all'>
											{lead.contact}
										</p>
									) : null}
								</div>

								{/* 2. Service Requested */}
								<div className='p-3.5 rounded-lg bg-[var(--color-brand-cream)]/60'>
									<span className='font-semibold text-neutral-500 uppercase tracking-wider block mb-1'>
										Услуга
									</span>
									<span className='text-sm font-medium text-neutral-900'>
										{lead.serviceType || 'General Inquiry'}
									</span>
								</div>

								{/* 3. Travel Date & Participants Count */}
								<div className='p-3.5 rounded-lg bg-[var(--color-brand-cream)]/60'>
									<span className='font-semibold text-neutral-500 uppercase tracking-wider block mb-1'>
										Дата и Гости
									</span>
									<p className='text-sm font-medium text-neutral-900'>
										{lead.travelDate
											? `📅 ${lead.travelDate}`
											: 'Дата не указана'}
									</p>
									{lead.participants && (
										<p className='text-xs text-neutral-600 mt-0.5'>
											👥 {lead.participants} чел.
										</p>
									)}
								</div>

								{/* 4. Destination & Duration */}
								<div className='p-3.5 rounded-lg bg-[var(--color-brand-cream)]/60'>
									<span className='font-semibold text-neutral-500 uppercase tracking-wider block mb-1'>
										Маршрут / Срок
									</span>
									<p className='text-sm font-medium text-neutral-900'>
										{lead.destination || 'Не указан'}
									</p>
									{lead.duration && (
										<p className='text-xs text-neutral-600 mt-0.5'>
											⏳ {lead.duration}
										</p>
									)}
								</div>
							</div>

							{/* Message Block */}
							{lead.message && (
								<div className='p-4 rounded-lg bg-neutral-50 border border-neutral-200/60 text-xs sm:text-sm text-neutral-700 leading-relaxed'>
									<span className='font-semibold block text-[11px] uppercase tracking-wider text-neutral-500 mb-1'>
										Пожелания клиента:
									</span>
									{lead.message}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
