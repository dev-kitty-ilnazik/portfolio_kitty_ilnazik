import type { ReactNode } from 'react'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { useColorThemes } from '@/hooks/useColorThemes'

export interface ColorThemeItem {
	name: string
	value: string
	color: string
}

export interface ColorThemeContextProps {
	theme: string
	setColorTheme: (value: string) => void
	supported: ColorThemeItem[]
}

const COLOR_HOOK_KEY = 'app-color-theme'
const DEFAULT_COLOR = 'pink'

const ColorThemeContext = createContext<ColorThemeContextProps>({
	theme: DEFAULT_COLOR,
	setColorTheme: () => {},
	supported: [],
})

export const ColorThemeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const colorTheme = useColorThemes()
	const [theme, setTheme] = useState<string>(DEFAULT_COLOR)

	const applyTheme = (value: string) => {
		const selected = colorTheme.find((c: ColorThemeItem) => c.value === value)
		if (!selected) return

		const root = document.documentElement
		root.style.setProperty('--primary', selected.color)
		root.style.setProperty('--sidebar-primary', selected.color + '99')
		root.style.setProperty('--primary-foreground', '#ffffff')
		root.style.setProperty('--sidebar-primary-foreground', '#ffffff')
	}

	const setColorTheme = (newTheme: string) => {
		setTheme(newTheme)
		localStorage.setItem(COLOR_HOOK_KEY, newTheme)
		applyTheme(newTheme)
	}

	useEffect(() => {
		const saved =
			(localStorage.getItem(COLOR_HOOK_KEY) as string) || DEFAULT_COLOR
		setTheme(saved)
		applyTheme(saved)
	}, [])

	return (
		<ColorThemeContext.Provider
			value={{ theme, setColorTheme, supported: colorTheme }}
		>
			{children}
		</ColorThemeContext.Provider>
	)
}

export const useColorTheme = (): ColorThemeContextProps =>
	useContext(ColorThemeContext)
