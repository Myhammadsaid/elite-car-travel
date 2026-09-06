'use client'

import { useEffect, useState } from 'react'

const initialLocalized = { en: '', ru: '', ja: '' }

const emptyForm = {
	slug: '',
	order: 0,
	badge: { ...initialLocalized },
	title: { ...initialLocalized },
	desc: { ...initialLocalized },
	features: [{ ...initialLocalized }],
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function ServicesPanel({ token, onAuthError }) {
	const [services, setServices] = useState([])
	const [activeTab, setActiveTab] = useState('ru') // 'ru' | 'en' | 'ja'
	const [formData, setFormData] = useState(emptyForm)
	const [editingId, setEditingId] = useState(null)
	const [loading, setLoading] = useState(false)

	const fetchServices = async () => {
		try {
			const res = await fetch(`${API_BASE}/api/services`)
			const data = await res.json()
			if (Array.isArray(data)) setServices(data)
		} catch (err) {
			console.error('Не удалось загрузить услуги:', err)
		}
	}

	useEffect(() => {
		fetchServices()
	}, [])

	const handleLocalizedFieldChange = (field, lang, value) => {
		setFormData(prev => ({
			...prev,
			[field]: { ...prev[field], [lang]: value },
		}))
	}

	const handleFeatureChange = (index, lang, value) => {
		const updated = [...formData.features]
		updated[index] = { ...updated[index], [lang]: value }
		setFormData(prev => ({ ...prev, features: updated }))
	}

	const addFeatureInput = () => {
		setFormData(prev => ({
			...prev,
			features: [...prev.features, { ...initialLocalized }],
		}))
	}

	const removeFeatureInput = index => {
		setFormData(prev => ({
			...prev,
			features: prev.features.filter((_, i) => i !== index),
		}))
	}

	const startEdit = service => {
		setEditingId(service._id)
		setFormData({
			slug: service.slug || '',
			order: service.order || 0,
			badge: { ...initialLocalized, ...service.badge },
			title: { ...initialLocalized, ...service.title },
			desc: { ...initialLocalized, ...service.desc },
			features: service.features?.length
				? service.features.map(f => ({ ...initialLocalized, ...f }))
				: [{ ...initialLocalized }],
		})
	}

	const resetForm = () => {
		setEditingId(null)
		setFormData(emptyForm)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		const method = editingId ? 'PUT' : 'POST'
		const endpoint = editingId
			? `${API_BASE}/api/services/${editingId}`
			: `${API_BASE}/api/services`

		try {
			const res = await fetch(endpoint, {
				method,
				headers: {
					'Content-Type': 'application/json',
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: JSON.stringify(formData),
			})

			if (res.status === 401 || res.status === 403) {
				onAuthError?.()
				return
			}

			if (res.ok) {
				resetForm()
				fetchServices()
			} else {
				const errorData = await res.json()
				alert(`Ошибка: ${errorData.message || 'Не удалось сохранить услугу'}`)
			}
		} catch (err) {
			console.error('Ошибка отправки формы:', err)
			alert('Ошибка сети при отправке данных.')
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async id => {
		if (!confirm('Вы уверены, что хотите удалить эту услугу?')) return
		try {
			const res = await fetch(`${API_BASE}/api/services/${id}`, {
				method: 'DELETE',
				headers: {
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
			})

			if (res.status === 401 || res.status === 403) {
				onAuthError?.()
				return
			}

			if (res.ok) fetchServices()
		} catch (err) {
			alert('Не удалось удалить услугу')
		}
	}

	const languageLabels = {
		ru: 'Русский',
		en: 'Английский',
		ja: 'Японский',
	}

	return (
		<div className='space-y-10'>
			{/* Карточка формы создания/редактирования */}
			<div className='p-6 bg-white rounded-xl border border-neutral-200 shadow-sm'>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-200'>
					<h2 className='text-xl font-bold text-neutral-800'>
						{editingId ? 'Редактировать услугу' : 'Добавить новую услугу'}
					</h2>

					{/* Вкладки переключения языков ввода */}
					<div className='inline-flex bg-neutral-100 p-1 rounded-lg border border-neutral-200'>
						{['ru', 'en', 'ja'].map(lang => (
							<button
								key={lang}
								type='button'
								onClick={() => setActiveTab(lang)}
								className={`px-3 py-1 rounded text-xs font-semibold uppercase transition-all cursor-pointer ${
									activeTab === lang
										? 'bg-white text-neutral-900 shadow-xs'
										: 'text-neutral-500 hover:text-neutral-800'
								}`}
							>
								{lang}
							</button>
						))}
					</div>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Общие параметры */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-xs font-semibold text-neutral-600 mb-1 uppercase tracking-wider'>
								Slug / Якорный ID (на латинице)
							</label>
							<input
								type='text'
								required
								value={formData.slug}
								onChange={e =>
									setFormData({ ...formData, slug: e.target.value })
								}
								placeholder='например: classic-silk-road'
								className='w-full p-2.5 border rounded-md text-sm border-neutral-300 focus:border-[var(--color-brand-gold)] focus:outline-none'
							/>
						</div>
						<div>
							<label className='block text-xs font-semibold text-neutral-600 mb-1 uppercase tracking-wider'>
								Порядок отображения
							</label>
							<input
								type='number'
								value={formData.order}
								onChange={e =>
									setFormData({ ...formData, order: Number(e.target.value) })
								}
								className='w-full p-2.5 border rounded-md text-sm border-neutral-300 focus:border-[var(--color-brand-gold)] focus:outline-none'
							/>
						</div>
					</div>

					{/* Мультиязычные поля */}
					<div className='p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-4'>
						<span className='text-xs font-bold uppercase tracking-wider text-[var(--color-brand-gold-dark)]'>
							Язык редактирования: {languageLabels[activeTab]} (
							{activeTab.toUpperCase()})
						</span>

						<div>
							<label className='block text-xs font-semibold text-neutral-600 mb-1'>
								Текст бейджа ({activeTab.toUpperCase()})
							</label>
							<input
								type='text'
								value={formData.badge[activeTab] || ''}
								onChange={e =>
									handleLocalizedFieldChange('badge', activeTab, e.target.value)
								}
								placeholder='например: Категория 01'
								className='w-full p-2.5 border rounded-md bg-white text-sm border-neutral-300 focus:border-[var(--color-brand-gold)] focus:outline-none'
							/>
						</div>

						<div>
							<label className='block text-xs font-semibold text-neutral-600 mb-1'>
								Название услуги ({activeTab.toUpperCase()})
							</label>
							<input
								type='text'
								required={activeTab === 'en'}
								value={formData.title[activeTab] || ''}
								onChange={e =>
									handleLocalizedFieldChange('title', activeTab, e.target.value)
								}
								placeholder='например: Классические туры по Шелковому пути'
								className='w-full p-2.5 border rounded-md bg-white text-sm border-neutral-300 focus:border-[var(--color-brand-gold)] focus:outline-none'
							/>
						</div>

						<div>
							<label className='block text-xs font-semibold text-neutral-600 mb-1'>
								Описание ({activeTab.toUpperCase()})
							</label>
							<textarea
								rows={3}
								value={formData.desc[activeTab] || ''}
								onChange={e =>
									handleLocalizedFieldChange('desc', activeTab, e.target.value)
								}
								placeholder='Краткое описание тура или услуги...'
								className='w-full p-2.5 border rounded-md bg-white text-sm border-neutral-300 focus:border-[var(--color-brand-gold)] focus:outline-none'
							/>
						</div>

						{/* Пункты преимуществ / Особенности */}
						<div className='space-y-3 pt-2'>
							<label className='block text-xs font-semibold text-neutral-600'>
								Список особенностей / включено в тур ({activeTab.toUpperCase()})
							</label>
							{formData.features.map((feature, idx) => (
								<div key={idx} className='flex items-center gap-2'>
									<input
										type='text'
										value={feature[activeTab] || ''}
										onChange={e =>
											handleFeatureChange(idx, activeTab, e.target.value)
										}
										placeholder={`Пункт #${idx + 1}`}
										className='flex-1 p-2 border rounded-md bg-white text-sm border-neutral-300 focus:border-[var(--color-brand-gold)] focus:outline-none'
									/>
									{formData.features.length > 1 && (
										<button
											type='button'
											onClick={() => removeFeatureInput(idx)}
											className='p-2 text-rose-500 hover:text-rose-700 text-sm cursor-pointer'
											title='Удалить пункт'
										>
											✕
										</button>
									)}
								</div>
							))}
							<button
								type='button'
								onClick={addFeatureInput}
								className='text-xs font-semibold text-[var(--color-brand-gold-dark)] hover:underline cursor-pointer'
							>
								+ Добавить пункт в список
							</button>
						</div>
					</div>

					{/* Кнопки действий */}
					<div className='flex items-center gap-3'>
						<button
							type='submit'
							disabled={loading}
							className='px-6 py-2.5 bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-800 disabled:opacity-50 cursor-pointer'
						>
							{loading
								? 'Сохранение...'
								: editingId
									? 'Обновить услугу'
									: 'Создать услугу'}
						</button>
						{editingId && (
							<button
								type='button'
								onClick={resetForm}
								className='px-4 py-2.5 border border-neutral-300 rounded-md text-sm text-neutral-600 hover:bg-neutral-100 cursor-pointer'
							>
								Отмена
							</button>
						)}
					</div>
				</form>
			</div>

			{/* Таблица существующих услуг */}
			<div className='bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm'>
				<table className='w-full text-left text-sm'>
					<thead className='bg-neutral-50 text-neutral-500 uppercase text-xs border-b border-neutral-200'>
						<tr>
							<th className='p-4'>Порядок</th>
							<th className='p-4'>Slug</th>
							<th className='p-4'>Название (RU / EN)</th>
							<th className='p-4'>Пунктов списка</th>
							<th className='p-4 text-right'>Действия</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-neutral-200'>
						{services.map(svc => (
							<tr key={svc._id} className='hover:bg-neutral-50'>
								<td className='p-4 font-mono text-xs'>{svc.order}</td>
								<td className='p-4 font-mono text-xs'>{svc.slug}</td>
								<td className='p-4 font-medium text-neutral-900'>
									{svc.title?.ru || svc.title?.en || '—'}
								</td>
								<td className='p-4 text-neutral-500'>
									{svc.features?.length || 0}
								</td>
								<td className='p-4 text-right space-x-3'>
									<button
										onClick={() => startEdit(svc)}
										className='text-blue-600 hover:underline text-xs font-semibold cursor-pointer'
									>
										Редактировать
									</button>
									<button
										onClick={() => handleDelete(svc._id)}
										className='text-rose-600 hover:underline text-xs font-semibold cursor-pointer'
									>
										Удалить
									</button>
								</td>
							</tr>
						))}
						{services.length === 0 && (
							<tr>
								<td colSpan={5} className='p-8 text-center text-neutral-400'>
									Услуги пока не добавлены.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
