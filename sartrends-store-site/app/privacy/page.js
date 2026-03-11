import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | SAR Trends AI',
  description: 'Privacy Policy for SAR Trends AI platform'
}

export default function PrivacyPage() {
  return (
    <div className="bg-dark-900 min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto glass-card p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy <span className="gradient-text">Policy</span></h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-bold mb-3 text-white">1. Introduction</h2>
              <p>Welcome to SAR Trends AI. We respect your privacy and are committed to protecting your personal data.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-white">2. Data We Collect</h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Identity Data (name, username)</li>
                <li>Contact Data (email, phone number)</li>
                <li>Technical Data (IP address, browser type)</li>
                <li>Usage Data (how you use our website)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-white">3. How We Use Your Data</h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis to improve our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-white">4. Data Security</h2>
              <p>We have put in place appropriate security measures to protect your personal data.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-white">5. Contact Us</h2>
              <p>Email: privacy@sartrends.com</p>
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

