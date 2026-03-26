import Hero from '@/components/sections/Hero'
import PracticeAreas from '@/components/sections/PracticeAreas'
import AboutPreview from '@/components/sections/AboutPreview'
import Testimonials from '@/components/sections/Testimonials'
import CTASection from '@/components/sections/CTASection'
import BlogPreview from '@/components/sections/BlogPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PracticeAreas />
      <AboutPreview />
      <Testimonials />
      <BlogPreview />
      <CTASection />
    </>
  )
}
