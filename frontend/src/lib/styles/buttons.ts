import { cn } from '@/lib/utils'
import { hoverAnimations } from './animations'

export const buttonIconStyles = 'w-5 h-5'

export const primaryButtonStyles = cn(
	'bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-3 rounded-lg',
	hoverAnimations.button,
	hoverAnimations.buttonPrimary
)

export const outlineButtonStyles = cn(
	'border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 sm:px-8 py-3 rounded-lg bg-transparent',
	hoverAnimations.button
)
