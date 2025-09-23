import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ColorThemeProvider } from '@/providers/ColorThemeProvider.tsx'
import { I18nProvider } from '@/providers/I18nProvider.tsx'
import { MusicPlayerProvider } from '@/providers/MusicPlayerProvider.tsx'
import { QueryProvider } from '@/providers/QueryProvider.tsx'
import { ThemeProvider } from '@/providers/ThemeProvider.tsx'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<I18nProvider>
				<ThemeProvider>
					<ColorThemeProvider>
						<MusicPlayerProvider>
							<App />
						</MusicPlayerProvider>
					</ColorThemeProvider>
				</ThemeProvider>
			</I18nProvider>
		</QueryProvider>
	</StrictMode>
)
