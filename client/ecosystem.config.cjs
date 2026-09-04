module.exports = {
	apps: [
		{
			name: 'ecg-frontend',
			cwd: './client',
			script: 'node_modules/next/dist/bin/next',
			args: 'start -p 3000',
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
				NEXT_PUBLIC_API_URL: 'https://elitecartravel.uz',
				NEXT_PUBLIC_SITE_URL: 'https://elitecartravel.uz',
			},
		},
		{
			name: 'ecg-backend',
			cwd: './server',
			script: 'src/index.js',
			env: {
				NODE_ENV: 'production',
				PORT: 5000,
				CLIENT_URL: 'https://elitecartravel.uz',
			},
		},
	],
}
