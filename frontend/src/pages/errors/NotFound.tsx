import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

import { ArrowLeft, Home } from 'lucide-react'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'

import TypewriterLoop from '@/components/TypewriterLoop'

import { LINKS } from '@/config/links'
import {
	fadeInLeft,
	fadeInRight,
	fadeInUp,
	staggerContainer,
} from '@/lib/animations/motionVariants'
import { outlineButtonStyles, primaryButtonStyles } from '@/lib/styles/buttons'

const NotFoundPage = () => {
	const navigate = useNavigate()
	const { ref, inView } = useInView({ threshold: 0.2 })
	const canGoBack = window.history.state?.idx > 0

	const phrases = ['Страница не найдена', 'Page not found']

	return (
		<div className='min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center px-4 py-8'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					ref={ref}
					className='grid gap-12 lg:grid-cols-2 items-center'
					initial='hidden'
					animate={inView ? 'visible' : 'hidden'}
					variants={staggerContainer}
				>
					<motion.div
						className='space-y-8 text-center lg:text-left'
						variants={fadeInLeft}
					>
						<div className='space-y-6'>
							<div className='relative'>
								<h1 className='text-8xl md:text-9xl font-bold text-gradient mb-4'>
									404
								</h1>
								<TypewriterLoop
									phrases={phrases}
									className='text-2xl md:text-3xl lg:text-4xl font-bold'
								/>
							</div>

							<motion.div variants={fadeInUp}>
								<p className='text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0'>
									Кажется, вы забрели не туда. Страница, которую вы ищете, могла
									быть перемещена, удалена или никогда не существовала.
								</p>
							</motion.div>
						</div>

						<motion.div
							className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
							variants={fadeInUp}
						>
							<Button
								size='lg'
								onClick={() => navigate(LINKS.routes.home)}
								className={primaryButtonStyles}
							>
								<Home className='mr-2 h-5 w-5' />
								На главную
							</Button>

							{canGoBack && (
								<Button
									variant='outline'
									size='lg'
									onClick={() => navigate(-1)}
									className={outlineButtonStyles}
								>
									<ArrowLeft className='mr-2 h-5 w-5' />
									Назад
								</Button>
							)}
						</motion.div>
					</motion.div>
					<motion.div
						className='flex justify-center lg:justify-end'
						variants={fadeInRight}
					>
						<div className='relative'>
							<div className='relative w-80 h-80 md:w-96 md:h-96'>
								<div className='absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/30 avatar-glow'></div>
								<motion.div
									className='absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 border border-primary/20'
									animate={{
										scale: [1, 1.2, 1],
										opacity: [0.5, 0.8, 0.5],
									}}
									transition={{
										duration: 4,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								/>
								<motion.div
									className='absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-primary/15 border border-primary/25'
									animate={{
										scale: [1.2, 1, 1.2],
										opacity: [0.3, 0.6, 0.3],
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: 'easeInOut',
										delay: 1,
									}}
								/>
								<motion.div
									className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-primary/5 border border-primary/15'
									animate={{
										scale: [1, 1.1, 1],
										opacity: [0.2, 0.4, 0.2],
									}}
									transition={{
										duration: 5,
										repeat: Infinity,
										ease: 'easeInOut',
										delay: 2,
									}}
								/>
								<div className='absolute inset-0 flex items-center justify-center'>
									<motion.div
										className='text-6xl md:text-7xl font-bold text-primary/30'
										animate={{
											rotate: [0, 5, -5, 0],
										}}
										transition={{
											duration: 6,
											repeat: Infinity,
											ease: 'easeInOut',
										}}
									>
										?
									</motion.div>
								</div>
							</div>
							<motion.div
								className='absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/20'
								animate={{
									y: [0, -20, 0],
									x: [0, 10, 0],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
							/>
							<motion.div
								className='absolute -bottom-6 -left-6 w-6 h-6 rounded-full bg-primary/25'
								animate={{
									y: [0, 15, 0],
									x: [0, -15, 0],
								}}
								transition={{
									duration: 5,
									repeat: Infinity,
									ease: 'easeInOut',
									delay: 1,
								}}
							/>
							<motion.div
								className='absolute top-10 -right-10 w-4 h-4 rounded-full bg-primary/30'
								animate={{
									y: [0, -30, 0],
									x: [0, 5, 0],
								}}
								transition={{
									duration: 6,
									repeat: Infinity,
									ease: 'easeInOut',
									delay: 2,
								}}
							/>
						</div>
					</motion.div>
				</motion.div>
				<motion.div className='mt-20 text-center' variants={fadeInUp}>
					<p className='text-muted-foreground text-sm'>
						Если вы считаете, что это ошибка, пожалуйста,{' '}
						<a
							href='#contact'
							className='text-primary hover:text-primary/80 underline transition-colors'
							onClick={e => {
								e.preventDefault()
								navigate(LINKS.routes.contacts)
							}}
						>
							свяжитесь со мной
						</a>
					</p>
				</motion.div>
			</div>
		</div>
	)
}

export default NotFoundPage
