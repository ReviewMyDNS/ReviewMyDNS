import { Helmet } from "react-helmet-async";
import { Logo } from "@/components/logo";
import { Link } from "wouter";
import MobileMenu from "@/components/mobile-menu";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>Privacy Policy - ReviewMyDNS</title>
        <meta name="description" content="ReviewMyDNS privacy policy. Learn how we collect, use, and protect your data when using our free DNS propagation checker." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size="sm" className="mr-2" />
              <span className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>When you use ReviewMyDNS, we may collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>DNS query data:</strong> Domain names and record types you look up. These are used to perform the lookup and may be stored temporarily for rate limiting purposes.</li>
              <li><strong>Account information:</strong> If you create an account, we store your email address and a hashed (never plain-text) password.</li>
              <li><strong>Usage data:</strong> Anonymous usage logs including page views, lookup counts, and feature interactions collected via Google Analytics and Ahrefs Analytics.</li>
              <li><strong>IP address:</strong> Used for rate limiting and abuse prevention. Not linked to individual users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To perform DNS lookups and return results to you</li>
              <li>To enforce usage limits and prevent abuse</li>
              <li>To improve the product and understand how it is used</li>
              <li>To send transactional emails (e.g., password reset) if you have an account</li>
              <li>To process subscription payments via Stripe (we never store card details)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cookies</h2>
            <p>We use cookies for session management (keeping you logged in) and anonymous analytics. We do not use third-party advertising cookies. You can disable cookies in your browser, though some features may not function correctly.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal data. We share data only with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Stripe:</strong> For payment processing (subject to Stripe's privacy policy)</li>
              <li><strong>Google Analytics:</strong> Anonymous usage statistics</li>
              <li><strong>Ahrefs Analytics:</strong> Anonymous traffic analytics</li>
              <li><strong>Neon Database:</strong> Secure cloud PostgreSQL hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Retention</h2>
            <p>DNS lookup records are retained for up to 90 days. Account data is retained as long as your account is active. You may request deletion of your account and associated data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
            <p>Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:info@reviewmydns.com" className="text-blue-600 hover:underline">info@reviewmydns.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Security</h2>
            <p>We use HTTPS, bcrypt password hashing, and secure session management to protect your data. No system is 100% secure, but we take reasonable measures to safeguard the information we hold.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Material changes will be noted on this page with an updated date. Continued use of the service after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
            <p>Questions about this privacy policy? Email us at <a href="mailto:info@reviewmydns.com" className="text-blue-600 hover:underline">info@reviewmydns.com</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
