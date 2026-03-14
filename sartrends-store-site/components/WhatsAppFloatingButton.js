'use client'

export default function WhatsAppFloatingButton() {
  const phoneNumber = '+923454837460'
  const message = 'Hello SAR Trends! I need help with your AI tools/services.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <>
      <style jsx>{`
        .whatsapp-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999 !important;
          width: 64px;
          height: 64px;
          background: #25d366 !important;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4) !important;
          transition: all 0.3s ease;
          border: none !important;
        }
        .whatsapp-btn:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6) !important;
          background: #128c7e !important;
        }
        .whatsapp-icon {
          width: 36px;
          height: 36px;
          fill: white !important;
        }
      `}</style>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="WhatsApp">
        <svg className="whatsapp-icon" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.151.198 2.477 3.383 6.008 4.728.789.346 1.421.42 1.919.246.497-.274.793-.865 0.904-1.517.099-.652.008-1.21-.173-1.353z"/>
        </svg>
      </a>
    </>
  )
}
