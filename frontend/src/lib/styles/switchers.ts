import { cn } from '@/lib/utils'

export const switcherContainerStyles = (variant: 'desktop' | 'mobile') =>
	cn(
		'flex items-center rounded-lg bg-muted p-1',
		variant === 'mobile' && 'w-full justify-center'
	)

export const switcherButtonStyles = (variant: 'desktop' | 'mobile') =>
	cn(variant === 'desktop' && 'w-8 h-8 p-0', variant === 'mobile' && 'flex-1')

export const dropdownTriggerStyles = 'w-full justify-start gap-2 bg-muted'

export const dropdownChevronStyles = (variant: 'desktop' | 'mobile') =>
	cn(
		'w-4 h-4',
		variant === 'desktop' && 'hidden lg:inline',
		variant === 'mobile' && 'ml-auto'
	)

export const dropdownContentStyles = (variant: 'desktop' | 'mobile') =>
	cn(
		'border bg-background/60 backdrop-blur-lg shadow-xl',
		variant === 'mobile' ? 'w-full' : 'w-40'
	)

export const colorSwatchStyles = 'w-4 h-4 rounded-full'
