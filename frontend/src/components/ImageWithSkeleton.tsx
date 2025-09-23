import { useImageLoader } from '@/hooks/useImageLoader'

import { Skeleton } from '@/components/ui/skeleton'

interface imageWithSkeletonProps {
	src: string
	alt?: string
	className?: string
}

const ImageWithSkeleton: React.FC<imageWithSkeletonProps> = ({
	src,
	alt,
	className,
}) => {
	const { isLoaded, handleLoad, handleError } = useImageLoader()

	return (
		<div>
			{!isLoaded && (
				<Skeleton
					className={`absolute top-0 left-0 w-full h-full animate-shimmer ${className}`}
				/>
			)}
			<img
				src={src}
				alt={alt}
				onLoad={handleLoad}
				onError={handleError}
				className={`absolute top-0 left-0 w-full h-full ${className} ${
					isLoaded ? 'opacity-100' : 'opacity-0'
				}`}
			/>
		</div>
	)
}

export default ImageWithSkeleton
