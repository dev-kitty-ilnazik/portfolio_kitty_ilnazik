import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryProvider } from '@/providers/QueryProvider.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</QueryProvider>
	</StrictMode>
)
