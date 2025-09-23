import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface MusicPlayerContextType {
	isPlaying: boolean
	togglePlay: () => void
	volume: number
	setVolume: (v: number) => void
	muted: boolean
	toggleMute: () => void
	progress: number
	handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void
	audioRef: React.RefObject<HTMLAudioElement | null>
}

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null)

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [volume, setVolume] = useState(0.5)
	const [muted, setMuted] = useState(false)
	const [progress, setProgress] = useState(0)

	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio('/music/background.mp3')
			audioRef.current.loop = true
			audioRef.current.volume = volume
		}

		const audio = audioRef.current

		const updateProgress = () => {
			if (audio.duration > 0) {
				setProgress((audio.currentTime / audio.duration) * 100)
			}
		}

		audio.addEventListener('timeupdate', updateProgress)
		audio
			.play()
			.then(() => setIsPlaying(true))
			.catch(() => setIsPlaying(false))

		return () => {
			audio.pause()
			audio.removeEventListener('timeupdate', updateProgress)
		}
	}, [])

	useEffect(() => {
		if (!audioRef.current) return
		audioRef.current.volume = volume
		audioRef.current.muted = muted
	}, [volume, muted])

	const togglePlay = () => {
		if (!audioRef.current) return
		if (isPlaying) {
			audioRef.current.pause()
			setIsPlaying(false)
		} else {
			audioRef.current
				.play()
				.then(() => setIsPlaying(true))
				.catch(() => setIsPlaying(false))
		}
	}

	const toggleMute = () => {
		if (!audioRef.current) return
		const newMuted = !audioRef.current.muted
		audioRef.current.muted = newMuted
		setMuted(newMuted)

		if (newMuted) {
			setVolume(0)
			audioRef.current.volume = 0
		} else {
			setVolume(0.5)
			audioRef.current.volume = 0.5
		}
	}

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!audioRef.current) return
		const value = parseFloat(e.target.value)
		audioRef.current.currentTime =
			(value / 100) * (audioRef.current.duration || 1)
		setProgress(value)
	}

	return (
		<MusicPlayerContext.Provider
			value={{
				isPlaying,
				togglePlay,
				volume,
				setVolume,
				muted,
				toggleMute,
				progress,
				handleSeek,
				audioRef,
			}}
		>
			{children}
		</MusicPlayerContext.Provider>
	)
}

export const useMusicPlayer = () => {
	const context = useContext(MusicPlayerContext)
	if (!context) {
		throw new Error('useMusicPlayer must be used within MusicPlayerProvider')
	}
	return context
}
