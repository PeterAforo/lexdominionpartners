'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GSAPRevealProps {
  children: React.ReactNode
  animation?: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleIn'
  delay?: number
  duration?: number
  className?: string
}

export function GSAPReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 1,
  className = '',
}: GSAPRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { y: 60, opacity: 0 },
      fadeIn: { opacity: 0 },
      fadeLeft: { x: -60, opacity: 0 },
      fadeRight: { x: 60, opacity: 0 },
      scaleIn: { scale: 0.8, opacity: 0 },
    }

    gsap.set(el, animations[animation])

    gsap.to(el, {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) trigger.kill()
      })
    }
  }, [animation, delay, duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface GSAPTextRevealProps {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?: number
}

export function GSAPTextReveal({
  text,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
}: GSAPTextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = el.querySelectorAll('.word')
    gsap.set(words, { y: 50, opacity: 0 })

    gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) trigger.kill()
      })
    }
  }, [delay])

  const wrappedText = text.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="word inline-block">{word}&nbsp;</span>
    </span>
  ))

  return (
    <Tag ref={ref as any} className={className}>
      {wrappedText}
    </Tag>
  )
}

export function GSAPParallax({
  children,
  speed = 0.5,
  className = '',
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.to(el, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) trigger.kill()
      })
    }
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface GSAPCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function GSAPCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}: GSAPCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.to(countRef.current, {
      value: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (el) {
          el.textContent = `${prefix}${Math.round(countRef.current.value)}${suffix}`
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) trigger.kill()
      })
    }
  }, [end, duration, suffix, prefix])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
