'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const defaultImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    title: 'AI Resume Builder',
    description: 'Create professional ATS-optimized resumes'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    title: 'HSE Documentation',
    description: 'Generate Risk Assessments & RAMS instantly'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    title: 'Website Builder',
    description: 'Build stunning websites with AI'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    title: 'Cover Letters',
    description: 'Write compelling cover letters in seconds'
  }
]

export default function ImageCarousel({ images = defaultImages, autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, interval, images.length])

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToIndex = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 }
          }}
          className="absolute inset-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${images[currentIndex].url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-dark-900/30" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-2">{images[currentIndex].title}</h3>
                <p className="text-gray-300 text-lg">{images[currentIndex].description}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary/80 transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary/80 transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-primary' 
                : 'bg-dark-600 hover:bg-dark-400'
            }`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary/80 transition-colors z-10"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-700 z-10">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: interval / 1000,
            ease: 'linear'
          }}
          key={currentIndex}
        />
      </div>
    </div>
  )
}

