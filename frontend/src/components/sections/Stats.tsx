import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { motion } from 'framer-motion'

import { SkeletonCard } from '@/components/ui/skeleton'

import { fadeInUp, staggerContainer } from '@/lib/animations/motionVariants'
import { cardStyles } from '@/lib/styles/cards'
import { textStyles } from '@/lib/styles/texts'

const statsData = [
	{ number: '4+', label: 'лет опыта', wide: false },
	{ number: '19', label: 'возраст', wide: false },
	{ number: '2021', label: 'год начала программирования', wide: true },
	{ number: '5+', label: 'технологий', wide: false },
	{ number: '10', label: 'языков программировании', wide: true },
	{ number: '99', label: 'проектов', wide: false },
	{ number: '80+', label: 'заказов', wide: false },
	{ number: '99', label: 'Счастливых клиентов', wide: false },
]

const StatsSection = () => {
	const [isLoaded, setIsLoaded] = useState(false)
	const { ref, inView } = useInView({ threshold: 0.2 })

	if (!isLoaded) {
		setTimeout(() => setIsLoaded(true), 2000)
	}

	return (
		<section ref={ref} id='stats' className='py-20 px-4'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial='hidden'
					animate={inView ? 'visible' : 'hidden'}
					variants={staggerContainer}
				>
					<motion.h2
						className={`${textStyles.headings.h2} text-center mb-16 ${textStyles.gradient}`}
						variants={fadeInUp}
					>
						Мои достижения
					</motion.h2>
					{!isLoaded ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 auto-rows-min'>
							{Array.from({ length: 8 }).map((_, i) => (
								<SkeletonCard
									key={i}
									className={
										i === 2 || i === 5 ? 'md:col-span-2' : 'md:col-span-1'
									}
								/>
							))}
						</div>
					) : (
						<>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 auto-rows-min'>
								{statsData.map((stat, index) => (
									<motion.div
										key={index}
										variants={fadeInUp}
										className={`group ${
											stat.wide ? 'md:col-span-2' : 'md:col-span-1'
										}`}
									>
										<div
											className={`
                        ${cardStyles.base}
                        ${cardStyles.gradient.primary}
                        ${cardStyles.hover}
                        ${cardStyles.border.primary}
                      `}
										>
											<div className='flex items-center space-x-4'>
												<div
													className={`text-4xl md:text-5xl font-bold ${textStyles.gradient}`}
												>
													{stat.number}
												</div>
												<div className={`text-lg ${textStyles.body.muted}`}>
													{stat.label}
												</div>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</>
					)}
				</motion.div>
			</div>
		</section>
	)
}

export default StatsSection
