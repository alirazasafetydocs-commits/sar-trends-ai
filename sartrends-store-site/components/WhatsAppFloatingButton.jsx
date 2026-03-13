'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloatingButton() {
  const phoneNumber = '+923454837460'
  const message = 'Hello SAR Trends! I need help with your AI tools/services.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-full shadow-2xl shadow-green-500/25 border-4 border-green-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-green-500/50 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white drop-shadow-md group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Pulse animation */}
      <div className="absolute w-full h-full rounded-full bg-green-500/30 animate-ping" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
        Chat with us
      </div>
      
      {/* Arrow for tooltip */}
      <div className="absolute bottom-full right-4 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible" />
    </a>
  )
}
