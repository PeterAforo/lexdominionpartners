'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#1B2A4A', color: '#fff', borderRadius: '2px' },
          success: { iconTheme: { primary: '#C5A54E', secondary: '#1B2A4A' } },
        }}
      />
    </SessionProvider>
  )
}
