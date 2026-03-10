import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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
      <body className="bg-dark-900 text-white">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

