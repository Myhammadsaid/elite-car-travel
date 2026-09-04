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
				headers: { Authorization: `Bearer ${token}` },
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

	useEffect(() => {
		fetchLeads()
	}, [fetchLeads])

	const handleStatusChange = async (leadId, newStatus) => {
		try {
			const res = await fetch(`${API_BASE}/api/admin/leads/${leadId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
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
				headers: { Authorization: `Bearer ${token}` },
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

			{filteredLeads.length === 0 ? (
				<div className='p-12 text-center rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] text-neutral-500'>
					Заявок с данным статусом не найдено.
				</div>
			) : (
				<div className='grid grid-cols-1 gap-6'>
					{filteredLeads.map(lead => (
						<div
							key={lead._id}
							className='p-6 sm:p-8 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-2xs space-y-4 hover:border-[var(--color-brand-gold)] transition duration-200'
						>
							<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4'>
								<div>
									<div className='flex items-center gap-3'>
										<h2 className='font-serif text-2xl font-bold text-[var(--color-brand-dark)]'>
											{lead.name}
										</h2>
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
										Дата: {new Date(lead.createdAt).toLocaleString('ru-RU')} ·
										Источник: <span className='font-mono'>{lead.source}</span> (
										Язык: {lead.locale ? lead.locale.toUpperCase() : 'RU'})
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

							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs'>
								<div className='p-3 rounded-lg bg-[var(--color-brand-cream)]/60'>
									<span className='font-semibold text-neutral-500 uppercase tracking-wider block mb-1'>
										Контакты
									</span>
									<span className='text-sm font-medium text-neutral-900 break-all select-all'>
										{lead.contact}
									</span>
								</div>

								<div className='p-3 rounded-lg bg-[var(--color-brand-cream)]/60'>
									<span className='font-semibold text-neutral-500 uppercase tracking-wider block mb-1'>
										Услуга / Направление
									</span>
									<span className='text-sm font-medium text-neutral-900'>
										{lead.serviceType}
									</span>
								</div>

								{(lead.destination || lead.duration) && (
									<div className='p-3 rounded-lg bg-[var(--color-brand-cream)]/60'>
										<span className='font-semibold text-neutral-500 uppercase tracking-wider block mb-1'>
											Маршрут / Длительность
										</span>
										<span className='text-sm font-medium text-neutral-900'>
											{lead.destination || 'Не указан'}{' '}
											{lead.duration ? `(${lead.duration})` : ''}
										</span>
									</div>
								)}
							</div>

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
