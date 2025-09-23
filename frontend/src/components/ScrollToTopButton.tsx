import { useEffect, useRef, useState } from 'react'

import { motion, useScroll } from 'framer-motion'

import { useTranslations } from '@/hooks/useTranslations'

const ScrollToTopButton: React.FC = () => {
	const t = useTranslations('app.common.button')

	const { scrollYProgress } = useScroll()

	const [isActive, setIsActive] = useState(false)
	const btnRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = () => setIsActive(window.scrollY > 0)
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = (e: React.MouseEvent) => {
		e.preventDefault()
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<motion.div
			ref={btnRef}
			className='bg-primary/20 fixed bottom-6 right-[30px] z-[1100] h-[100px] w-[2px] cursor-pointer'
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
			transition={{ duration: 0.4, ease: 'easeOut' }}
		>
			<a
				href='#top'
				onClick={scrollToTop}
				className='absolute left-0 bottom-[155px] rotate-90 origin-left text-[0.85rem] uppercase whitespace-nowrap text-primary/70 transition-colors duration-300 hover:text-primary'
			>
				{t('toTop')}
			</a>
			<motion.div
				className='absolute w-[2px] h-full bg-primary opacity-50'
				style={{
					scaleY: scrollYProgress,
					originY: 0,
				}}
			/>
		</motion.div>
	)
}

export default ScrollToTopButton
