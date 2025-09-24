import { cn } from '@/lib/utils'
import { hoverAnimations } from './animations'

export const buttonIconStyles = 'w-5 h-5'

export const buttonStyles = {
	base: cn(
		'font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-300',
		hoverAnimations.button
	),
	variants: {
		primary: cn(
			'bg-primary hover:bg-primary/90 text-primary-foreground',
			hoverAnimations.buttonPrimary
		),
		outline:
			'border border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent',
		secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
		ghost: 'hover:bg-accent hover:text-accent-foreground',
	},
	sizes: {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg',
		icon: 'p-3',
	},
}

export const primaryButtonStyles = cn(
	buttonStyles.base,
	buttonStyles.variants.primary
)
export const outlineButtonStyles = cn(
	buttonStyles.base,
	buttonStyles.variants.outline
)
export const secondaryButtonStyles = cn(
	buttonStyles.base,
	buttonStyles.variants.secondary
)
export const ghostButtonStyles = cn(
	buttonStyles.base,
	buttonStyles.variants.ghost
)
