import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
	dropdownChevronStyles,
	dropdownContentStyles,
	dropdownTriggerStyles,
} from '@/lib/styles/switchers'

import { useI18n } from '@/providers/I18nProvider'

interface LanguageSwitcherProps {
	variant?: 'desktop' | 'mobile'
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
	variant = 'desktop',
}) => {
	const { lang, setLanguage, supported: supportedLanguages } = useI18n()
	const currentLanguage = supportedLanguages.find(l => l.code === lang)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='default'
					className={dropdownTriggerStyles}
				>
					<span className='text-lg'>{currentLanguage?.flag}</span>
					<span className='text-sm'>{currentLanguage?.name}</span>
					<ChevronDown className={dropdownChevronStyles(variant)} />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='end'
				className={dropdownContentStyles(variant)}
			>
				{supportedLanguages.map(lang => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => setLanguage(lang.code)}
						className='gap-2'
					>
						<span className='text-lg'>{lang.flag}</span>
						<span>{lang.name}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LanguageSwitcher
