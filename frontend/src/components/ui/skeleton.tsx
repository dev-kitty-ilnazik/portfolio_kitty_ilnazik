import { cn } from '@/lib/utils'

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-primary/10', className)}
			{...props}
		/>
	)
}

function SkeletonText({
	lines = 1,
	className = '',
}: {
	lines?: number
	className?: string
}) {
	return (
		<div className={`space-y-2 ${className}`}>
			{Array.from({ length: lines }).map((_, i) => (
				<Skeleton
					key={i}
					className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
				/>
			))}
		</div>
	)
}

function SkeletonCard({ className = '' }: { className?: string }) {
	return (
		<div className={`rounded-lg border bg-card p-6 ${className}`}>
			<div className='flex items-center space-x-4'>
				<Skeleton className='h-12 w-12 rounded-full' />
				<div className='space-y-2 flex-1'>
					<Skeleton className='h-4 w-3/4' />
					<Skeleton className='h-4 w-1/2' />
				</div>
			</div>
		</div>
	)
}

export { Skeleton, SkeletonCard, SkeletonText }
