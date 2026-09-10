'use client'

import { useCallback, useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

const PLATFORMS = [
	{ value: 'instagram', label: 'Instagram', icon: '📷' },
	{ value: 'facebook', label: 'Facebook', icon: '👍' },
	{ value: 'telegram', label: 'Telegram', icon: '✈️' },
	{ value: 'whatsapp', label: 'WhatsApp', icon: '💬' },
	{ value: 'youtube', label: 'YouTube', icon: '▶️' },
	{ value: 'tiktok', label: 'TikTok', icon: '🎵' },
	{ value: 'linkedin', label: 'LinkedIn', icon: '💼' },
	{ value: 'twitter', label: 'Twitter / X', icon: '🐦' },
	{ value: 'other', label: 'Другое', icon: '🔗' },
]

const platformIcon = value =>
	PLATFORMS.find(p => p.value === value)?.icon || '🔗'

const EMPTY_FORM = {
	platform: 'instagram',
	label: '',
	url: '',
	handle: '',
	order: 0,
	isActive: true,
}

export default function SocialMediaPanel({ token, onAuthError }) {
	const [links, setLinks] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [creating, setCreating] = useState(false)
	const [form, setForm] = useState(EMPTY_FORM)
	const [editingId, setEditingId] = useState(null)
	const [editForm, setEditForm] = useState(EMPTY_FORM)

	const fetchLinks = useCallback(async () => {
		setLoading(true)
		try {
			const res = await fetch(`${API_BASE}/api/admin/social`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (res.status === 401 || res.status === 403) {
				onAuthError()
				return
			}

			const data = await res.json()
			if (data.success) {
				setLinks(data.links || [])
			}
		} catch (err) {
			console.error('Ошибка загрузки соцсетей:', err)
		} finally {
			setLoading(false)
		}
	}, [token, onAuthError])

	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])

	const handleCreate = async e => {
		e.preventDefault()
		setError('')
		setCreating(true)

		try {
			const res = await fetch(`${API_BASE}/api/admin/social`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ ...form, order: Number(form.order) || 0 }),
			})

			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.error || 'Не удалось добавить ссылку')
			}

			setLinks(prev => [...prev, data.link])
			setForm(EMPTY_FORM)
		} catch (err) {
			setError(err.message)
		} finally {
			setCreating(false)
		}
	}

	const startEdit = link => {
		setEditingId(link._id)
		setEditForm({
			platform: link.platform,
			label: link.label,
			url: link.url,
			handle: link.handle || '',
			order: link.order ?? 0,
			isActive: link.isActive,
		})
	}

	const cancelEdit = () => {
		setEditingId(null)
		setEditForm(EMPTY_FORM)
	}

	const handleUpdate = async (linkId, patch) => {
		try {
			const res = await fetch(`${API_BASE}/api/admin/social/${linkId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(patch),
			})

			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.error || 'Не удалось обновить ссылку')
			}

			setLinks(prev =>
				prev.map(item => (item._id === linkId ? data.link : item)),
			)
			return true
		} catch (err) {
			console.error('Ошибка обновления соцсети:', err)
			setError(err.message)
			return false
		}
	}

	const handleSaveEdit = async linkId => {
		const ok = await handleUpdate(linkId, {
			...editForm,
			order: Number(editForm.order) || 0,
		})
		if (ok) cancelEdit()
	}

	const handleToggleActive = link => {
		handleUpdate(link._id, { isActive: !link.isActive })
	}

	const handleDelete = async linkId => {
		if (!window.confirm('Удалить эту ссылку на соцсеть?')) return

		try {
			const res = await fetch(`${API_BASE}/api/admin/social/${linkId}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			})

			if (res.ok) {
				setLinks(prev => prev.filter(item => item._id !== linkId))
			}
		} catch (err) {
			console.error('Ошибка удаления соцсети:', err)
		}
	}

	const sortedLinks = [...links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

	return (
		<div className='space-y-8'>
			{/* Add new link form */}
			<form
				onSubmit={handleCreate}
				className='p-6 sm:p-8 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-2xs space-y-4'
			>
				<h2 className='font-serif text-xl font-bold text-[var(--color-brand-dark)]'>
					Добавить соцсеть
				</h2>

				{error && (
					<div className='p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium'>
						{error}
					</div>
				)}

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
					<select
						value={form.platform}
						onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
						className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] cursor-pointer'
					>
						{PLATFORMS.map(p => (
							<option key={p.value} value={p.value}>
								{p.icon} {p.label}
							</option>
						))}
					</select>

					<input
						type='text'
						required
						placeholder='Название (например, Instagram)'
						value={form.label}
						onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
						className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)]'
					/>

					<input
						type='url'
						required
						placeholder='https://instagram.com/elitecargroup'
						value={form.url}
						onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
						className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)]'
					/>

					<input
						type='text'
						placeholder='@handle (необязательно)'
						value={form.handle}
						onChange={e => setForm(f => ({ ...f, handle: e.target.value }))}
						className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)]'
					/>

					<input
						type='number'
						placeholder='Порядок'
						value={form.order}
						onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
						className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)]'
					/>
				</div>

				<div className='flex items-center justify-between gap-4'>
					<label className='flex items-center gap-2 text-xs font-semibold text-neutral-600 cursor-pointer select-none'>
						<input
							type='checkbox'
							checked={form.isActive}
							onChange={e =>
								setForm(f => ({ ...f, isActive: e.target.checked }))
							}
							className='cursor-pointer'
						/>
						Активна (отображать на сайте)
					</label>

					<button
						type='submit'
						disabled={creating}
						className='px-6 py-2.5 rounded-md bg-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold-dark)] text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer disabled:opacity-50'
					>
						{creating ? 'Добавление...' : 'Добавить'}
					</button>
				</div>
			</form>

			{/* Links list */}
			{loading ? (
				<div className='p-12 text-center rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] text-neutral-500'>
					Загрузка...
				</div>
			) : sortedLinks.length === 0 ? (
				<div className='p-12 text-center rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] text-neutral-500'>
					Соцсети ещё не добавлены.
				</div>
			) : (
				<div className='grid grid-cols-1 gap-4'>
					{sortedLinks.map(link => {
						const isEditing = editingId === link._id

						if (isEditing) {
							return (
								<div
									key={link._id}
									className='p-6 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-gold)] shadow-2xs space-y-4'
								>
									<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
										<select
											value={editForm.platform}
											onChange={e =>
												setEditForm(f => ({ ...f, platform: e.target.value }))
											}
											className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden cursor-pointer'
										>
											{PLATFORMS.map(p => (
												<option key={p.value} value={p.value}>
													{p.icon} {p.label}
												</option>
											))}
										</select>

										<input
											type='text'
											value={editForm.label}
											onChange={e =>
												setEditForm(f => ({ ...f, label: e.target.value }))
											}
											className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden'
										/>

										<input
											type='url'
											value={editForm.url}
											onChange={e =>
												setEditForm(f => ({ ...f, url: e.target.value }))
											}
											className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden'
										/>

										<input
											type='text'
											value={editForm.handle}
											onChange={e =>
												setEditForm(f => ({ ...f, handle: e.target.value }))
											}
											className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden'
										/>

										<input
											type='number'
											value={editForm.order}
											onChange={e =>
												setEditForm(f => ({ ...f, order: e.target.value }))
											}
											className='px-3 py-2.5 rounded-md bg-white border border-[var(--color-brand-border)] text-sm focus:outline-hidden'
										/>
									</div>

									<div className='flex items-center justify-between gap-4'>
										<label className='flex items-center gap-2 text-xs font-semibold text-neutral-600 cursor-pointer select-none'>
											<input
												type='checkbox'
												checked={editForm.isActive}
												onChange={e =>
													setEditForm(f => ({
														...f,
														isActive: e.target.checked,
													}))
												}
												className='cursor-pointer'
											/>
											Активна
										</label>

										<div className='flex gap-2'>
											<button
												onClick={cancelEdit}
												className='px-4 py-2 rounded-md bg-white border border-[var(--color-brand-border)] text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:border-neutral-400 transition cursor-pointer'
											>
												Отмена
											</button>
											<button
												onClick={() => handleSaveEdit(link._id)}
												className='px-4 py-2 rounded-md bg-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold-dark)] text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer'
											>
												Сохранить
											</button>
										</div>
									</div>
								</div>
							)
						}

						return (
							<div
								key={link._id}
								className='p-5 sm:p-6 rounded-xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[var(--color-brand-gold)] transition duration-200'
							>
								<div className='flex items-center gap-4'>
									<span className='text-2xl'>
										{platformIcon(link.platform)}
									</span>
									<div>
										<div className='flex items-center gap-2'>
											<h3 className='font-semibold text-[var(--color-brand-dark)]'>
												{link.label}
											</h3>
											<span
												className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
													link.isActive
														? 'bg-emerald-100 text-emerald-800'
														: 'bg-neutral-100 text-neutral-500'
												}`}
											>
												{link.isActive ? 'Активна' : 'Скрыта'}
											</span>
										</div>
										<a
											href={link.url}
											target='_blank'
											rel='noopener noreferrer'
											className='text-xs text-neutral-500 hover:text-[var(--color-brand-gold-dark)] break-all'
										>
											{link.url}
										</a>
										{link.handle && (
											<span className='block text-xs text-neutral-400'>
												{link.handle}
											</span>
										)}
									</div>
								</div>

								<div className='flex items-center gap-2 flex-shrink-0'>
									<button
										onClick={() => handleToggleActive(link)}
										className='px-3 py-1.5 rounded-md bg-white border border-[var(--color-brand-border)] text-xs font-semibold text-neutral-600 hover:border-[var(--color-brand-gold)] transition cursor-pointer'
									>
										{link.isActive ? 'Скрыть' : 'Показать'}
									</button>
									<button
										onClick={() => startEdit(link)}
										className='px-3 py-1.5 rounded-md bg-white border border-[var(--color-brand-border)] text-xs font-semibold text-neutral-600 hover:border-[var(--color-brand-gold)] transition cursor-pointer'
									>
										Изменить
									</button>
									<button
										onClick={() => handleDelete(link._id)}
										className='p-1.5 rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer'
										title='Удалить'
									>
										🗑️
									</button>
								</div>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
