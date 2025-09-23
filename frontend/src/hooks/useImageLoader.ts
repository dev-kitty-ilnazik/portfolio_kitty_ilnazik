import { useState } from 'react'

export const useImageLoader = () => {
	const [isLoaded, setIsLoaded] = useState(false)

	const handleLoad = () => setIsLoaded(true)
	const handleError = () => setIsLoaded(false)

	return {
		isLoaded,
		handleLoad,
		handleError,
	}
}
