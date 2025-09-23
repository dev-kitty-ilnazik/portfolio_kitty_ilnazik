import { cn } from '@/lib/utils'

export const headerContainerStyles = (scrolled: boolean) =>
	cn(
		'fixed top-4 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-700 ease-in-out w-full px-0 border rounded-2xl',
		scrolled
			? 'max-w-5xl border-border bg-background/70 backdrop-blur-lg shadow-lg'
			: 'max-w-full border-transparent bg-transparent'
	)

export const mobileMenuStyles = (
	isMobileMenuOpen: boolean,
	scrolled: boolean
) =>
	cn(
		'fixed top-20 right-0 transition-all duration-300 ease-in-out z-40 rounded-2xl overflow-hidden w-full sm:w-80 md:w-96 border bg-background',
		isMobileMenuOpen
			? 'translate-x-0 opacity-100'
			: 'translate-x-full opacity-0 pointer-events-none',
		scrolled ? 'border-border shadow-lg' : 'border-transparent'
	)

export const navLinkStyles = (activeSection: string, id: string) =>
	cn(
		'block px-4 py-3 text-base font-medium transition-all duration-300 ease-in-out rounded-lg',
		'hover:scale-[1.02] hover:shadow-sm hover:bg-primary/20',
		activeSection === id
			? 'text-white bg-primary rounded-lg z-10'
			: 'text-foreground/80'
	)

export const mobileMenuContentStyles = 'max-h-[calc(95vh-5rem)] overflow-y-auto'
export const mobileNavStyles = 'py-6 px-6 space-y-3'
export const mobileSwitchersStyles =
	'sm:hidden border-t border-border pt-6 pb-6 px-6 space-y-4'
export const desktopSwitchersStyles = 'hidden md:flex items-center space-x-4'
