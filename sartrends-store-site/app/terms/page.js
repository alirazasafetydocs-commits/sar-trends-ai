import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | SAR Trends AI',
  description: 'Terms of Service for SAR Trends AI platform'
}

export default function TermsPage() {
  return (
    <div className="bg-dark-900 min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto glass-card p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of <span className="gradient-text">Service</span></h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-bold mb-3 text-white">1. Acceptance of Terms</h2>
              <p>By accessing and using SAR Trends AI, you accept and agree to be bound by the terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-white">2. Use License</h2>
              <p>Permission is granted to temporarily use SAR Trends AI for personal, non-commercial use only.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-white">3. Service Description</h2>
              <p>SAR Trends AI provides AI-powered tools for generating resumes, cover letters, HSE documents, and website content.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-white">4. User Obligations</h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Provide accurate information</li>
                <li>Maintain the security of your account</li>
                <li>Not use the service for unlawful purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-white">5. Payment Terms</h2>
              <p>Subscription fees are billed monthly. Users can cancel at any time.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-white">6. Contact</h2>
              <p>Email: legal@sartrends.com</p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-dark-700">
            <Link href="/" className="text-primary hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

