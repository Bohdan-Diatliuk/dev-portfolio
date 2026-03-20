import { useRef, useState, useEffect } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'

function VideoSection({ src }: { src: string }) {
  const [paused, setPaused] = useState(true)
  const [muted, setMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause()
          setPaused(true)
        }
      },
      { threshold: 0.2 }
    )
    if (wrapRef.current) observer.observe(wrapRef.current)
    return () => observer.disconnect()
  }, [])

  const togglePause = () => {
    if (!videoRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    paused ? videoRef.current.play() : videoRef.current.pause()
    setPaused(!paused)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <div ref={wrapRef} className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
      <video
        ref={videoRef}
        src={src}
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-contain"
      />
      <button
        onClick={togglePause}
        className="absolute bottom-4 left-4 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/20 text-white backdrop-blur-sm flex items-center justify-center hover:bg-black/90 hover:border-white/60 transition-colors"
      >
        {paused ? <Play /> : <Pause />}
      </button>
      <button
        onClick={toggleMute}
        className="absolute bottom-4 left-16 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/20 text-white backdrop-blur-sm flex items-center justify-center hover:bg-black/90 hover:border-white/60 transition-colors"
      >
        {muted ? <VolumeX /> : <Volume2 />}
      </button>
    </div>
  )
}

export default VideoSection