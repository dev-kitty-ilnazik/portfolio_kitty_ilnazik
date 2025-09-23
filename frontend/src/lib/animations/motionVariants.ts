import type { Variants } from 'framer-motion'

export const fadeInLeft: Variants = {
	hidden: { opacity: 0, x: -40 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export const fadeInRight: Variants = {
	hidden: { opacity: 0, x: 40 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

export const staggerContainer: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.2 } },
}
