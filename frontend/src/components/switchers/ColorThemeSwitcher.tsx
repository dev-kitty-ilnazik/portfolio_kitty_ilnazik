import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
	colorSwatchStyles,
	dropdownChevronStyles,
	dropdownContentStyles,
	dropdownTriggerStyles,
} from '@/lib/styles/switchers'

import { useColorTheme } from '@/providers/ColorThemeProvider'

interface ColorThemeSwitcherProps {
	variant?: 'desktop' | 'mobile'
}

const ColorThemeSwitcher: React.FC<ColorThemeSwitcherProps> = ({
	variant = 'desktop',
}) => {
	const { theme, setColorTheme, supported } = useColorTheme()
	const currentColor = supported.find(c => c.value === theme)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='default'
					className={dropdownTriggerStyles}
				>
					<div
						className={colorSwatchStyles}
						style={{ backgroundColor: currentColor?.color }}
					/>
					<span className='text-sm'>{currentColor?.name}</span>
					<ChevronDown className={dropdownChevronStyles(variant)} />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='end'
				className={dropdownContentStyles(variant)}
			>
				{supported.map(color => (
					<DropdownMenuItem
						key={color.value}
						onClick={() => setColorTheme(color.value)}
						className='gap-2'
					>
						<div
							className={colorSwatchStyles}
							style={{ backgroundColor: color.color }}
						/>
						<span>{color.name}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ColorThemeSwitcher
