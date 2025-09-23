import { Monitor, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
	switcherButtonStyles,
	switcherContainerStyles,
} from '@/lib/styles/switchers'

import { useTheme } from '@/providers/ThemeProvider'

interface ThemeSwitcherProps {
	variant?: 'desktop' | 'mobile'
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
	variant = 'desktop',
}) => {
	const { theme, setTheme } = useTheme()

	return (
		<div className={switcherContainerStyles(variant)}>
			{['system', 'dark', 'light'].map(mode => {
				const Icon = mode === 'system' ? Monitor : mode === 'dark' ? Moon : Sun
				return (
					<Button
						key={mode}
						variant={theme === mode ? 'default' : 'ghost'}
						size='sm'
						onClick={() => setTheme(mode as any)}
						className={switcherButtonStyles(variant)}
					>
						<Icon className='w-4 h-4' />
					</Button>
				)
			})}
		</div>
	)
}

export default ThemeSwitcher
