import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { I18nProvider } from '@/providers/I18nProvider.tsx'
import { QueryProvider } from '@/providers/QueryProvider.tsx'
import { ThemeProvider } from '@/providers/ThemeProvider.tsx'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<I18nProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</I18nProvider>
		</QueryProvider>
	</StrictMode>
)
