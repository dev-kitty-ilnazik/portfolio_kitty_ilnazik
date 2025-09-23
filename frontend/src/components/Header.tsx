import { useEffect, useState } from 'react'

import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import MusicPlayer from '@/components/media/MusicPlayer'

import ColorThemeSwitcher from '@/components/switchers/ColorThemeSwitcher'
import LanguageSwitcher from '@/components/switchers/LanguageSwitcher'
import ThemeSwitcher from '@/components/switchers/ThemeSwitcher'

import { LINKS } from '@/config/links'
import { PROJECT_CONFIG } from '@/config/project'

import { useMenuItems } from '@/hooks/useMenuItems'
import { buttonIconStyles, mobileMenuButtonStyles } from '@/lib/styles/buttons'
import {
	desktopSwitchersStyles,
	headerContainerStyles,
	mobileMenuContentStyles,
	mobileMenuStyles,
	mobileNavStyles,
	mobileSwitchersStyles,
	navLinkStyles,
} from '@/lib/styles/header'

const Header: React.FC = () => {
	const menuItems = useMenuItems()

	const [activeSection, setActiveSection] = useState('home')
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			let currentSection = activeSection
			menuItems.forEach(([_, id]) => {
				const section = document.getElementById(id)
				if (section) {
					const rect = section.getBoundingClientRect()
					if (rect.top <= 100 && rect.bottom >= 100) {
						currentSection = id
					}
				}
			})
			setActiveSection(currentSection)
			setScrolled(window.scrollY > 0)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [activeSection, menuItems])

	return (
		<div className={headerContainerStyles(scrolled)}>
			<header>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between h-16 w-full'>
						<a href={LINKS.routes.home} className='text-xl font-bold'>
							{PROJECT_CONFIG.name}
						</a>
						<div className='flex items-center space-x-4'>
							<div className={desktopSwitchersStyles}>
								<ThemeSwitcher variant='desktop' />
								<MusicPlayer variant='desktop' />
								<LanguageSwitcher variant='desktop' />
								<ColorThemeSwitcher variant='desktop' />
							</div>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className={mobileMenuButtonStyles}
							>
								{isMobileMenuOpen ? (
									<X className={buttonIconStyles} />
								) : (
									<Menu className={buttonIconStyles} />
								)}
							</Button>
						</div>
					</div>
				</div>
				<div className={mobileMenuStyles(isMobileMenuOpen, scrolled)}>
					<div className={mobileMenuContentStyles}>
						<nav className={mobileNavStyles}>
							{menuItems.map(([label, id], index) => (
								<a
									key={index}
									href={`#${id}`}
									className={navLinkStyles(activeSection, id)}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{label}
								</a>
							))}
						</nav>

						<div className={mobileSwitchersStyles}>
							<LanguageSwitcher variant='mobile' />
							<ThemeSwitcher variant='mobile' />
							<MusicPlayer variant='mobile' />
							<ColorThemeSwitcher variant='mobile' />
						</div>
					</div>
				</div>
			</header>
		</div>
	)
}

export default Header
