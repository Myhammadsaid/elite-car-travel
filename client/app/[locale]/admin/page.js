'use client'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import LeadsPanel from '@/components/admin/LeadsPanel'
import SocialMediaPanel from '@/components/admin/SocialMediaPanel'
import { useCallback, useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export default function AdminPage() {
	const [token, setToken] = useState(null)
	const [password, setPassword] = useState('')
	const [authError, setAuthError] = useState('')
	const [loading, setLoading] = useState(false)
	const [activeTab, setActiveTab] = useState('leads')

	const handleLogout = useCallback(() => {
		sessionStorage.removeItem('ecg_admin_token')
		setToken(null)
	}, [])

	useEffect(() => {
		const savedToken = sessionStorage.getItem('ecg_admin_token')
		if (savedToken) {
			setToken(savedToken)
		}
	}, [])

	const handleLogin = async e => {
		e.preventDefault()
		setAuthError('')
		setLoading(true)

		try {
			const res = await fetch(`${API_BASE}/api/admin/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password }),
			})

			const data = await res.json()
			if (!res.ok || !data.token) {
				throw new Error(data.error || 'Неверный пароль администратора')
			}

			sessionStorage.setItem('ecg_admin_token', data.token)
			setToken(data.token)
		} catch (err) {
			setAuthError(err.message)
		} finally {
			setLoading(false)
		}
	}

	if (!token) {
		return (
			<div className='min-h-[70vh] flex items-center justify-center px-4 py-16'>
				<div className='w-full max-w-md space-y-6'>
					<div className='flex justify-center'>
						<LanguageSwitcher />
					</div>

					<div className='p-8 sm:p-10 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-md space-y-6'>
						<div className='text-center space-y-2'>
							<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
								Закрытый раздел
							</span>
							<h1 className='font-serif text-3xl font-bold text-[var(--color-brand-dark)]'>
								Вход в панель
							</h1>
							<p className='text-neutral-500 text-xs'>
								Панель управления Elite Car Travel
							</p>
						</div>

						{authError && (
							<div className='p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center'>
								{authError}
							</div>
						)}

						<form onSubmit={handleLogin} className='space-y-4'>
							<div className='space-y-1.5'>
								<label className='block text-xs font-semibold uppercase tracking-wider text-neutral-700'>
									Пароль администратора
								</label>
								<input
									type='password'
									required
									value={password}
									onChange={e => setPassword(e.target.value)}
									placeholder='Введите пароль'
									className='w-full px-4 py-3 rounded-md bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-border)] text-sm focus:outline-hidden focus:border-[var(--color-brand-gold)] focus:bg-white transition'
								/>
							</div>

							<button
								type='submit'
								disabled={loading}
								className='w-full py-3.5 rounded-md bg-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold-dark)] text-white text-xs font-semibold uppercase tracking-wider transition duration-200 cursor-pointer disabled:opacity-50'
							>
								{loading ? 'Проверка...' : 'Войти'}
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

	const tabs = [
		{ key: 'leads', label: 'Заявки' },
		{ key: 'social', label: 'Соцсети' },
	]

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-brand-border)] pb-6'>
				<div>
					<span className='text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-brand-gold-dark)]'>
						Панель администратора
					</span>
					<h1 className='font-serif text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]'>
						Elite Car Travel
					</h1>
				</div>

				<div className='flex items-center gap-3'>
					<LanguageSwitcher />
					<button
						onClick={handleLogout}
						className='px-4 py-2 rounded-md bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition cursor-pointer'
					>
						Выйти
					</button>
				</div>
			</div>

			{/* Top-level section tabs */}
			<div className='flex flex-wrap gap-2 text-sm font-semibold'>
				{tabs.map(tab => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={`px-5 py-2.5 rounded-lg transition-all cursor-pointer ${
							activeTab === tab.key
								? 'bg-[var(--color-brand-dark)] text-white shadow-xs'
								: 'bg-white border border-[var(--color-brand-border)] text-neutral-600 hover:border-[var(--color-brand-gold)]'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{activeTab === 'leads' && (
				<LeadsPanel token={token} onAuthError={handleLogout} />
			)}
			{activeTab === 'social' && (
				<SocialMediaPanel token={token} onAuthError={handleLogout} />
			)}
		</div>
	)
}
