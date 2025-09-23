import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'

import ImageWithSkeleton from '@/components/ImageWithSkeleton'
import TypewriterLoop from '@/components/TypewriterLoop'

import {
	fadeInLeft,
	fadeInRight,
	fadeInUp,
	staggerContainer,
} from '@/lib/animations/motionVariants'
import { outlineButtonStyles, primaryButtonStyles } from '@/lib/styles/buttons'
import { avatarBaseStyles } from '@/lib/styles/images'
import { nameTextStyles } from '@/lib/styles/texts'

const HeroSection = () => {
	const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false })

	const [showRealPhoto, setShowRealPhoto] = useState(false)
	const [showRealName, setShowRealName] = useState(false)

	return (
		<section
			ref={ref}
			id='home'
			className='min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center px-4 py-8 sm:py-12'
		>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					className='grid gap-8 lg:gap-12 lg:grid-cols-2 items-center'
					initial='hidden'
					animate={inView ? 'visible' : 'hidden'}
					variants={staggerContainer}
				>
					<motion.div
						className='space-y-6 sm:space-y-8 text-center lg:text-left'
						variants={fadeInLeft}
					>
						<div className='space-y-4 sm:space-y-6'>
							<TypewriterLoop
								phrases={[
									'Full Stack Middle Developer',
									'Flutter & React Enthusiast',
									'Discord & Telegram Bot Creator',
								]}
								className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold'
							/>
							<motion.div
								className='relative h-12 sm:h-16 overflow-hidden cursor-pointer mt-6 sm:mt-8'
								onMouseEnter={() => setShowRealName(true)}
								onMouseLeave={() => setShowRealName(false)}
								onClick={() => setShowRealName(prev => !prev)}
							>
								<motion.h1
									className={nameTextStyles}
									initial={{ y: 0, opacity: 1 }}
									animate={
										showRealName
											? { y: -50, opacity: 0, transition: { duration: 0.5 } }
											: { y: 0, opacity: 1, transition: { duration: 0.5 } }
									}
								>
									Я Dev kitty ilnazk
								</motion.h1>
								<motion.h1
									className={nameTextStyles}
									initial={{ y: 50, opacity: 0 }}
									animate={
										showRealName
											? { y: 0, opacity: 1, transition: { duration: 0.5 } }
											: { y: 50, opacity: 0, transition: { duration: 0.5 } }
									}
								>
									Я Ильназ Мингалеев
								</motion.h1>
							</motion.div>
						</div>
						<motion.div variants={fadeInUp}>
							<p className='text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0'>
								Full Stack разработчик с опытом более 4 лет. Создаю мобильные,
								десктопные приложения, чат-боты и веб-сайты.
							</p>
						</motion.div>
						<motion.div
							className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start'
							variants={fadeInUp}
						>
							<Button size='lg' className={primaryButtonStyles}>
								Написать мне
							</Button>
							<Button
								variant='outline'
								size='lg'
								className={outlineButtonStyles}
							>
								Мои проекты
							</Button>
						</motion.div>
					</motion.div>
					<motion.div
						className='flex justify-center lg:justify-end'
						variants={fadeInRight}
					>
						<div
							className='relative group cursor-pointer'
							onMouseEnter={() => setShowRealPhoto(true)}
							onMouseLeave={() => setShowRealPhoto(false)}
							onClick={() => setShowRealPhoto(prev => !prev)}
						>
							<motion.div
								className='absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg z-10'
								initial={{ opacity: 0, y: 10 }}
								animate={
									showRealPhoto ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
								}
								transition={{ duration: 0.3 }}
							>
								<p className='text-xs sm:text-sm text-foreground whitespace-nowrap'>
									Это моя реальная фотография
								</p>
								<div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border'></div>
							</motion.div>
							<div className='relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96'>
								<motion.div className={`${avatarBaseStyles} border-primary/30`}>
									<ImageWithSkeleton
										src='https://i.pinimg.com/736x/7f/83/fc/7f83fca1e60cc42f976fe9b18d911a05.jpg'
										className='object-cover'
									/>
								</motion.div>
								<motion.div
									className={`${avatarBaseStyles} border-primary`}
									initial={{ opacity: 0, scale: 1.05 }}
									animate={
										showRealPhoto
											? { opacity: 1, scale: 1 }
											: { opacity: 0, scale: 1.05 }
									}
									transition={{ duration: 0.5 }}
								>
									<ImageWithSkeleton
										src='/my-real-photo.png'
										className='object-cover'
									/>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}

export default HeroSection
