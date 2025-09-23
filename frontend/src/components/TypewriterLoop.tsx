import { useEffect, useState } from 'react'

interface TypewriterLoopProps {
	phrases: string[]
	className?: string
}

const TypewriterLoop: React.FC<TypewriterLoopProps> = ({
	phrases,
	className = '',
}) => {
	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
	const [currentText, setCurrentText] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		const currentPhrase = phrases[currentPhraseIndex]

		const timeout = setTimeout(
			() => {
				if (isPaused) {
					setIsPaused(false)
					setIsDeleting(true)
					return
				}

				if (isDeleting) {
					setCurrentText(currentPhrase.substring(0, currentText.length - 1))

					if (currentText === '') {
						setIsDeleting(false)
						setCurrentPhraseIndex(prev => (prev + 1) % phrases.length)
					}
				} else {
					setCurrentText(currentPhrase.substring(0, currentText.length + 1))

					if (currentText === currentPhrase) {
						setIsPaused(true)
					}
				}
			},
			isDeleting ? 50 : isPaused ? 2000 : 100
		)

		return () => clearTimeout(timeout)
	}, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases])

	return (
		<span className={`font-mono text-gradient ${className}`}>
			{currentText}
			<span className='animate-pulse text-primary'>|</span>
		</span>
	)
}

export default TypewriterLoop
