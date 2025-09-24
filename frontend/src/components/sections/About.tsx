import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { ChevronDown, ChevronUp } from 'lucide-react'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'

import ImageWithSkeleton from '@/components/ImageWithSkeleton'

import {
	fadeInLeft,
	fadeInRight,
	fadeInUp,
	staggerContainer,
} from '@/lib/animations/motionVariants'

const AboutSection = () => {
	const { ref, inView } = useInView({ threshold: 0.2 })
	const [isExpanded, setIsExpanded] = useState(false)

	return (
		<section ref={ref} id='about' className='py-20 px-4'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					className='grid lg:grid-cols-2 gap-12 items-center'
					initial='hidden'
					animate={inView ? 'visible' : 'hidden'}
					variants={staggerContainer}
				>
					<motion.div
						className='flex justify-center lg:justify-start'
						variants={fadeInLeft}
					>
						<div className='relative w-80 h-80 md:w-96 md:h-96'>
							<div className='absolute inset-0 rounded-2xl overflow-hidden border-4 border-primary'>
								<ImageWithSkeleton
									src='https://i.pinimg.com/736x/fa/07/b9/fa07b92099f033397bbec45ba6379f8f.jpg'
									className='object-cover'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-background/20 to-transparent'></div>
							</div>
						</div>
					</motion.div>
					<motion.div
						className='space-y-6 text-center lg:text-left'
						variants={fadeInRight}
					>
						<h2 className='text-3xl md:text-4xl font-bold text-gradient'>
							Обо мне
						</h2>
						<motion.div className='space-y-4' variants={fadeInUp}>
							<p className='text-lg text-muted-foreground leading-relaxed'>
								Меня зовут Ильназ Мингалеев, мне 19 лет. Я full stack middle
								разработчик с опытом более 4 лет. Работаю с мобильными и
								десктопными приложениями, чат-ботами, Telegram Mini Apps,
								веб-сайтами и backend. Использую Flutter, React, Next.js, React
								Native, Expo, а также Aiogram, Flask, FastAPI, Pydantic, React
								Query, Framer Motion.
							</p>
							<motion.div
								className={`overflow-hidden transition-all duration-500 ${
									isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
								}`}
							>
								<p className='text-lg text-muted-foreground leading-relaxed pt-4'>
									Работаю с базами данных MongoDB, PostgreSQL, MySQL, SQLite
									через SQLAlchemy и Alembic. Имею опыт создания RESTful API,
									интеграции с внешними сервисами и оптимизации
									производительности приложений. Постоянно изучаю новые
									технологии и следую лучшим практикам разработки.
								</p>
							</motion.div>
							<Button
								variant='ghost'
								onClick={() => setIsExpanded(!isExpanded)}
								className='text-primary hover:text-primary/80 p-0 h-auto font-semibold'
							>
								{isExpanded ? (
									<>
										Показать меньше <ChevronUp className='ml-2 h-4 w-4' />
									</>
								) : (
									<>
										Показать больше <ChevronDown className='ml-2 h-4 w-4' />
									</>
								)}
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}

export default AboutSection
