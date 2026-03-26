import Link from 'next/link'
import { Scale, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-navy-800 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Scale size={40} className="text-gold-400" />
        </div>
        <h1 className="text-7xl font-heading font-bold text-gold-400 mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-white/60 mb-8">
          The page you are looking for does not exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary flex items-center justify-center gap-2">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
