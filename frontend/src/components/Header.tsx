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

import { buttonIconStyles } from '@/lib/styles/buttons'
import { cn } from '@/lib/utils'

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
		<div
			className={cn(
				'fixed top-4 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-700 ease-in-out w-full px-0 border rounded-2xl',
				scrolled
					? 'max-w-5xl border-border bg-background/70 backdrop-blur-lg shadow-lg'
					: 'max-w-full border-transparent bg-transparent'
			)}
		>
			<header>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between h-16 w-full'>
						<a href={LINKS.routes.home} className='text-xl font-bold'>
							{PROJECT_CONFIG.name}
						</a>
						<div className='flex items-center space-x-4'>
							<div className='hidden md:flex items-center space-x-4'>
								<ThemeSwitcher variant='desktop' />
								<MusicPlayer variant='desktop' />
								<LanguageSwitcher variant='desktop' />
								<ColorThemeSwitcher variant='desktop' />
							</div>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className='bg-muted'
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
				<div
					className={cn(
						'fixed top-20 right-0 transition-all duration-300 ease-in-out z-40 rounded-2xl overflow-hidden w-full sm:w-80 md:w-96 border bg-background',
						isMobileMenuOpen
							? 'translate-x-0 opacity-100'
							: 'translate-x-full opacity-0 pointer-events-none',
						scrolled ? 'border-border shadow-lg' : 'border-transparent'
					)}
				>
					<div className='max-h-[calc(95vh-5rem)] overflow-y-auto'>
						<nav className='py-6 px-6 space-y-3'>
							{menuItems.map(([label, id], index) => (
								<a
									key={index}
									href={`#${id}`}
									className={cn(
										'block px-4 py-3 text-base font-medium transition-all duration-300 ease-in-out rounded-lg',
										'hover:scale-[1.02] hover:shadow-sm hover:bg-primary/20',
										activeSection === id
											? 'text-white bg-primary rounded-lg z-10'
											: 'text-foreground/80'
									)}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{label}
								</a>
							))}
						</nav>

						<div className='sm:hidden border-t border-border pt-6 pb-6 px-6 space-y-4'>
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
