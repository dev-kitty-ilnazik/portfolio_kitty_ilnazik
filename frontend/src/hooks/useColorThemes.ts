import type { ColorThemeItem } from '@/providers/ColorThemeProvider'

import { useTranslations } from './useTranslations'

export const useColorThemes = (): ColorThemeItem[] => {
	const t = useTranslations('app.color')

	return [
		{ name: t('pink'), value: 'pink', color: '#ff4da6' },
		{ name: t('blue'), value: 'blue', color: '#3b82f6' },
		{ name: t('green'), value: 'green', color: '#10b981' },
		{ name: t('purple'), value: 'purple', color: '#8b5cf6' },
		{ name: t('orange'), value: 'orange', color: '#f59e0b' },
	]
}
