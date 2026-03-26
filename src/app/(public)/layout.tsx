import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AIAssistant from '@/components/ai/AIAssistant'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <AIAssistant />
    </>
  )
}
