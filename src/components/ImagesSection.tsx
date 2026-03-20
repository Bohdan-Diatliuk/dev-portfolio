import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { projects } from '../lib/projects'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

function ImagesSection() {
    const { slug } = useParams()
    const project = projects.find(p => p.slug === slug)

    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)

    if (!project) return <div>Проєкт не знайдено</div>

    const images = project.images ?? []

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const go = useCallback((index: number) => {
        setDirection(index > current ? 1 : -1)
        setCurrent(index)
    }, [current])

    const prev = () => go((current - 1 + images.length) % images.length)
    const next = () => go((current + 1) % images.length)

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
    }
    return (
        <>
            <section className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <AnimatePresence custom={direction} mode="popLayout">
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
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => go(i)}
                            className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                i === current
                                    ? 'border-white/60 opacity-100'
                                    : 'border-transparent opacity-40 hover:opacity-70'
                            }`}
                        >
                            <img
                                src={`/${img}`}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </>
    )
};

export default ImagesSection