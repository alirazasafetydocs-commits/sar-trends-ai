'use client';

import { FaWhatsapp } from 'react-icons/fa';

/**
 * WhatsAppFloatingButton Component
 * 
 * A production-ready floating WhatsApp button that works in both development and production.
 * 
 * Features:
 * - Fixed position in bottom-right corner
 * - High z-index (z-50) to stay above all content
 * - WhatsApp green color with hover animations
 * - Pre-filled message for better user experience
 * - Accessible with proper ARIA labels
 * - Prevents Tailwind CSS purge issues
 * - Works with both SSR and client-side rendering
 * 
 * @param {Object} props - Component props
 * @param {string} props.phoneNumber - WhatsApp phone number (default: +923454837460)
 * @param {string} props.message - Pre-filled message (default: Hello SAR Trends, I need help with your services.)
 * @param {string} props.position - CSS position classes (default: fixed bottom-5 right-5)
 * @param {string} props.className - Additional CSS classes
 */
export default function WhatsAppFloatingButton({
  phoneNumber = '+923454837460',
  message = 'Hello SAR Trends, I need help with your services.',
  position = 'fixed bottom-5 right-5',
  className = ''
}) {
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className={`${position} z-50 ${className}`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          group
          flex items-center justify-center
          w-14 h-14 md:w-16 md:h-16
          bg-[#25D366] hover:bg-[#128C7E]
          text-white
          rounded-full
          shadow-lg hover:shadow-xl
          transition-all duration-300
          transform hover:scale-110
          border-2 border-white/20
          focus:outline-none focus:ring-4 focus:ring-[#25D366]/50
        "
        // Inline styles as fallback in case Tailwind classes are purged
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 50,
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '9999px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3.5rem',
          height: '3.5rem',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#128C7E';
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#25D366';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
        }}
      >
        <FaWhatsapp 
          className="w-7 h-7 md:w-8 md:h-8" 
          style={{
            width: '1.75rem',
            height: '1.75rem'
          }}
        />
        
        {/* Pulse animation effect */}
        <span 
          className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#25D366]"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',
            backgroundColor: '#25D366',
            opacity: 0.2,
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
        
        {/* Tooltip for desktop */}
        <div 
          className="
            absolute
            bottom-full right-0
            mb-2
            px-3 py-2
            bg-gray-900 text-white text-sm
            rounded-lg
            shadow-lg
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            pointer-events-none
            whitespace-nowrap
          "
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginBottom: '0.5rem',
            padding: '0.5rem 0.75rem',
            backgroundColor: '#1f2937',
            color: 'white',
            fontSize: '0.875rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            opacity: 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Chat with us on WhatsApp
          <div 
            className="
              absolute
              top-full right-4
              w-0 h-0
              border-l-4 border-r-4 border-t-4
              border-l-transparent border-r-transparent border-t-gray-900
            "
            style={{
              position: 'absolute',
              top: '100%',
              right: '1rem',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #1f2937'
            }}
          />
        </div>
      </a>
      
      {/* Add keyframes for ping animation if not already in Tailwind config */}
      <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        /* Ensure the button is always visible */
        @media (max-width: 640px) {
          .whatsapp-button-mobile {
            bottom: 1rem !important;
            right: 1rem !important;
            width: 3rem !important;
            height: 3rem !important;
          }
        }
        
        /* Prevent any parent container from hiding the button */
        body {
          overflow-x: hidden !important;
        }
        
        /* Ensure no parent has overflow:hidden that could hide fixed elements */
        #__next, main, .container {
          position: relative !important;
        }
      `}</style>
    </div>
  );
}

/**
 * Alternative version without react-icons for better compatibility
 * Use this if you don't want to install react-icons
 */
export function WhatsAppFloatingButtonSimple({
  phoneNumber = '+923454837460',
  message = 'Hello SAR Trends, I need help with your services.',
  position = 'fixed bottom-5 right-5'
}) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`
        ${position} z-50
        flex items-center justify-center
        w-14 h-14 md:w-16 md:h-16
        bg-[#25D366] hover:bg-[#128C7E]
        text-white
        rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300
        transform hover:scale-110
        border-2 border-white/20
        focus:outline-none focus:ring-4 focus:ring-[#25D366]/50
      `}
      style={{
        backgroundColor: '#25D366',
        zIndex: 9999
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className="w-7 h-7 md:w-8 md:h-8"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
