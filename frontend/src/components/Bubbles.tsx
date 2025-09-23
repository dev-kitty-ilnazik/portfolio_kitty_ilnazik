import { useEffect, useRef } from 'react'

import { useColorTheme } from '@/providers/ColorThemeProvider'

interface Bubble {
	x: number
	y: number
	originX: number
	originY: number
	size: number
	opacity: number
	vx: number
	vy: number
}

const generateBubbles = (
	count: number,
	width: number,
	height: number
): Bubble[] => {
	return Array.from({ length: count }, () => {
		const x = Math.random() * width
		const y = Math.random() * height

		return {
			x,
			y,
			originX: x,
			originY: y,
			size: Math.random() * 6 + 1,
			opacity: Math.random() * 0.3 + 0.3,
			vx: (Math.random() - 0.5) * 0.5,
			vy: (Math.random() - 0.5) * 0.5,
		}
	})
}

const BubblesCanvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const bubblesRef = useRef<Bubble[]>([])
	const mouseRef = useRef({ x: -9999, y: -9999 })

	const { theme, supported } = useColorTheme()
	const currentColor =
		supported.find(c => c.value === theme)?.color || '#ff4da6'

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const resize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			bubblesRef.current = generateBubbles(180, canvas.width, canvas.height)
		}
		resize()
		window.addEventListener('resize', resize)

		const handleMouse = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY }
		}
		window.addEventListener('mousemove', handleMouse)

		const handleTouch = (e: TouchEvent) => {
			if (e.touches.length > 0) {
				const touch = e.touches[0]
				mouseRef.current = { x: touch.clientX, y: touch.clientY }
			} else {
				mouseRef.current = { x: -9999, y: -9999 }
			}
		}
		window.addEventListener('touchstart', handleTouch)
		window.addEventListener('touchmove', handleTouch)
		window.addEventListener('touchend', () => {
			mouseRef.current = { x: -9999, y: -9999 }
		})

		let lastTime = 0
		const fps = 40
		const interval = 1000 / fps

		const animate = (time: number) => {
			requestAnimationFrame(animate)
			const delta = time - lastTime
			if (delta < interval) return
			lastTime = time

			ctx.clearRect(0, 0, canvas.width, canvas.height)

			bubblesRef.current.forEach(bubble => {
				const dxMouse = mouseRef.current.x - bubble.x
				const dyMouse = mouseRef.current.y - bubble.y
				const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

				let vx = bubble.vx
				let vy = bubble.vy

				if (distMouse < 180) {
					const force = (180 - distMouse) / 180
					vx -= (dxMouse / distMouse) * force * 0.6
					vy -= (dyMouse / distMouse) * force * 0.6
				}

				const dxOrigin = bubble.originX - bubble.x
				const dyOrigin = bubble.originY - bubble.y
				vx += dxOrigin * 0.01
				vy += dyOrigin * 0.01

				vx *= 0.95
				vy *= 0.95

				vx += (Math.random() - 0.5) * 0.05
				vy += (Math.random() - 0.5) * 0.05

				bubble.x += vx
				bubble.y += vy
				bubble.vx = vx
				bubble.vy = vy

				ctx.fillStyle = `rgba(${parseInt(
					currentColor.slice(1, 3),
					16
				)}, ${parseInt(currentColor.slice(3, 5), 16)}, ${parseInt(
					currentColor.slice(5, 7),
					16
				)}, ${bubble.opacity})`
				ctx.shadowColor = ctx.fillStyle
				ctx.shadowBlur = bubble.size * 2
				ctx.beginPath()
				ctx.arc(bubble.x, bubble.y, bubble.size / 2, 0, Math.PI * 2)
				ctx.fill()
			})
		}

		requestAnimationFrame(animate)

		return () => {
			window.removeEventListener('resize', resize)
			window.removeEventListener('mousemove', handleMouse)
			window.removeEventListener('touchstart', handleTouch)
			window.removeEventListener('touchmove', handleTouch)
			window.removeEventListener('touchend', () => {
				mouseRef.current = { x: -9999, y: -9999 }
			})
		}
	}, [currentColor])

	return (
		<canvas ref={canvasRef} className='fixed inset-0 pointer-events-none z-0' />
	)
}

export default BubblesCanvas
