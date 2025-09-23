import { Music, Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
	dropdownContentStyles,
	dropdownTriggerStyles,
	iconMediumStyles,
	iconSmallStyles,
} from '@/lib/styles/switchers'

import { useMusicPlayer } from '@/providers/MusicPlayerProvider'

interface MusicPlayerProps {
	variant?: 'desktop' | 'mobile'
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ variant = 'desktop' }) => {
	const {
		isPlaying,
		progress,
		volume,
		togglePlay,
		toggleMute,
		setVolume,
		handleSeek,
	} = useMusicPlayer()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='default'
					className={dropdownTriggerStyles}
				>
					<Music className={iconSmallStyles} />
					<span className='text-sm'>Music</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='end'
				className={dropdownContentStyles(variant, 'large')}
			>
				<div className='flex items-center gap-3'>
					<Button variant='outline' size='icon' onClick={togglePlay}>
						{isPlaying ? (
							<Pause className={iconMediumStyles} />
						) : (
							<Play className={iconMediumStyles} />
						)}
					</Button>
					<div className='flex items-center gap-2 flex-1'>
						<Button variant='outline' size='icon' onClick={toggleMute}>
							{volume === 0 ? (
								<VolumeX className={iconMediumStyles} />
							) : volume < 0.5 ? (
								<Volume1 className={iconMediumStyles} />
							) : (
								<Volume2 className={iconMediumStyles} />
							)}
						</Button>
						<input
							type='range'
							min={0}
							max={1}
							step={0.01}
							value={volume}
							onChange={e => setVolume(parseFloat(e.target.value))}
							className='flex-1 accent-primary'
						/>
					</div>
				</div>
				<div className='w-full'>
					<input
						type='range'
						min={0}
						max={100}
						step={0.1}
						value={progress}
						onChange={handleSeek}
						className='w-full accent-primary'
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default MusicPlayer
