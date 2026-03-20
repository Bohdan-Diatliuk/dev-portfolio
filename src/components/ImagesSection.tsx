import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { projects } from '../lib/projects'
import { ChevronsLeft, ChevronsRight, Pause, Play } from 'lucide-react'

const isVideo = (src: string) => src.startsWith('video:');
const getSrc = (src: string) => src.replace('video:', '');

function ImagesSection() {
    const { slug } = useParams()
    const project = projects.find(p => p.slug === slug)

    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)
    const [paused, setPaused] = useState(false)
    const [progress, setProgress] = useState(0)
    const [hoverProgress, setHoverProgress] = useState<number | null>(null)
    const [speed, setSpeed] = useState(1)
    const videoRef = useRef<HTMLVideoElement>(null)

    if (!project) return <div>Проєкт не знайдено</div>

    const images = project.images ?? []

    if (images.length === 0) return null

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const go = useCallback((index: number) => {
        setDirection(index > current ? 1 : -1)
        setCurrent(index)
        setPaused(false)
        setProgress(0)
        setSpeed(1)
    }, [current])

    const togglePause = () => {
        if (videoRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            paused ? videoRef.current.play() : videoRef.current.pause()
            setPaused(!paused)
        }
    }

    const toggleSpeed = () => {
        const newSpeed = speed === 1 ? 2 : 1
        if (videoRef.current) {
            videoRef.current.playbackRate = newSpeed
        }
        setSpeed(newSpeed)
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const { currentTime, duration } = videoRef.current
            setProgress((currentTime / duration) * 100)
        }
    }

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const percent = x / rect.width
            videoRef.current.currentTime = percent * videoRef.current.duration
        }
    }

    const handleSeekHover = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            setHoverProgress((x / rect.width) * 100)
    }

    const prev = () => go((current - 1 + images.length) % images.length)
    const next = () => go((current + 1) % images.length)

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
    }

    const currentSrc = getSrc(images[current])
    const currentIsVideo = isVideo(images[current])

    return (
        <>
            <section className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <AnimatePresence custom={direction} mode="popLayout">
                    {currentIsVideo ? (
                        <>
                            <motion.video
                                ref={videoRef}
                                key={current}
                                src={`/${currentSrc}`}
                                autoPlay
                                muted
                                loop
                                playsInline
                                onTimeUpdate={handleTimeUpdate}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="absolute inset-0 w-full h-full object-contain"
                            />
                            <button 
                                onClick={togglePause}
                                className="absolute bottom-4 left-4 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/20 text-white 
                                backdrop-blur-sm flex items-center justify-center hover:bg-black/90 hover:border-white/60 transition-colors"
                            >
                                {paused ? <Play /> : <Pause />}
                            </button>
                            <button
                                onClick={toggleSpeed}
                                className="absolute bottom-4 left-16 z-10 h-10 px-3 rounded-full bg-black/40 border border-white/20 text-white text-sm
                                backdrop-blur-sm flex items-center justify-center hover:bg-black/90 hover:border-white/60 transition-colors"
                            >
                                {speed}x
                            </button>
                            <div
                                onClick={handleSeek}
                                onMouseMove={handleSeekHover}
                                onMouseLeave={() => setHoverProgress(null)}
                                className="absolute bottom-0 left-0 right-0 z-10 h-1 hover:h-2 bg-white/20 transition-all duration-150 group hoverable"
                            >
                                <div
                                    className="absolute h-full bg-slate-500 transition-all duration-100"
                                    style={{ width: `${progress}%` }}
                                />
                                {hoverProgress !== null && (
                                    <div
                                        className="absolute h-full bg-slate-300 transition-none"
                                        style={{ width: `${hoverProgress}%` }}
                                    />
                                )}
                            </div>
                        </>
                        ) : (
                            <motion.img
                                key={current}
                                src={`/${images[current]}`}
                                alt={`${project.title} ${current + 1}`}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="absolute inset-0 w-full h-full object-contain"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.1}
                                onDragEnd={(_, info) => {
                                if (info.offset.x < -50) next()
                                if (info.offset.x > 50) prev()
                                }}
                            />
                        )}
                </AnimatePresence>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 border
                            border-white/20 text-white backdrop-blur-sm flex items-center justify-center hover:bg-black/90 hover:border-white/60 transition-colors"
                        >
                            <ChevronsLeft />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 border
                            border-white/20 text-white backdrop-blur-sm flex items-center justify-center hover:bg-black/90 hover:border-white/60 transition-colors"
                        >
                            <ChevronsRight />
                        </button>
                    </>
                )}

                <div className="absolute bottom-4 right-4 z-10 text-sm text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    {current + 1} / {images.length}
                </div>
            </section>

            {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto py-3">
                    {images.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => go(i)}
                            className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                i === current
                                    ? 'border-white/60 opacity-100'
                                    : 'border-transparent opacity-40 hover:opacity-70'
                            }`}
                        >
                            {isVideo(item)  ? (
                                <div className='flex justify-center text-white'>
                                    <Play />
                                </div>
                            ) : (
                                <img
                                src={`/${item}`}
                                alt=""
                                className="w-full h-full object-cover"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </>
    )
};

export default ImagesSection