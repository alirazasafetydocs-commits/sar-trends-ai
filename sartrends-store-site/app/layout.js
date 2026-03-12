import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton'
import { Metadata } from 'next'

export const metadata = {
  title: 'SAR Trends - AI Powered Professional Tools',
  description: 'Create ATS resumes, HSE documents and websites instantly with AI. Boost your career with our professional AI tools.',
  keywords: 'AI, resume builder, HSE documents, ATS resume, professional tools, AI writing',
  openGraph: {
    title: 'SAR Trends - AI Powered Professional Tools',
    description: 'Create ATS resumes, HSE documents and websites instantly with AI.',
    url: 'https://sartrends.store',
    siteName: 'SAR Trends',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Critical styles to ensure WhatsApp button is always visible */}
        <style>{`
          /* Critical styles to ensure WhatsApp button is always visible */
          body {
            overflow-x: hidden !important;
            position: relative !important;
          }
          
          /* Prevent any container from clipping fixed elements */
          #__next, main, .container, div[class*="container"] {
            position: relative !important;
            overflow: visible !important;
          }
          
          /* Ensure high z-index for WhatsApp button */
          .whatsapp-button-container {
            z-index: 9999 !important;
          }
          
          /* Mobile responsiveness */
          @media (max-width: 640px) {
            .whatsapp-button-container {
              bottom: 1rem !important;
              right: 1rem !important;
            }
          }
          
          /* Print styles - hide button when printing */
          @media print {
            .whatsapp-button-container {
              display: none !important;
            }
          }
        `}</style>
      </head>
      <body className="bg-dark-900 text-white relative">
        {/* Ensure no parent containers hide fixed elements */}
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          
          {/* Production-ready WhatsApp Floating Button */}
          <WhatsAppFloatingButton 
            phoneNumber="+923454837460"
            message="Hello SAR Trends, I need help with your services."
            position="fixed bottom-5 right-5"
          />
        </div>
      </body>
    </html>
  )
}

