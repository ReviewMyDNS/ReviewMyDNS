import { Helmet } from "react-helmet-async";
import { Logo } from "@/components/logo";
import { Link } from "wouter";
import MobileMenu from "@/components/mobile-menu";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>Terms of Service - ReviewMyDNS</title>
        <meta name="description" content="ReviewMyDNS terms of service. Read the terms governing use of our free DNS propagation checker and related services." />
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using ReviewMyDNS ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use of the Service</h2>
            <p>You may use ReviewMyDNS for lawful purposes only. You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the Service to perform automated mass queries beyond the published API rate limits without a paid plan</li>
              <li>Attempt to disrupt, overload, or circumvent the rate limiting or security systems</li>
              <li>Use the Service to look up DNS records for malicious, fraudulent, or illegal purposes</li>
              <li>Reverse engineer, scrape, or reproduce the Service's output for competing tools without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Free Tier Limitations</h2>
            <p>The free tier of ReviewMyDNS includes limited daily lookups and access to basic record types. We reserve the right to adjust free tier limits at any time. Users who require higher limits may upgrade to a paid plan.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Paid Plans and Billing</h2>
            <p>Paid subscriptions are billed through Stripe. By subscribing, you authorize us to charge your payment method on a recurring basis. Subscriptions may be cancelled at any time; cancellations take effect at the end of the current billing period. We do not offer refunds for partial billing periods except where required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Accuracy of DNS Results</h2>
            <p>DNS lookup results are provided for informational purposes. While we strive for accuracy, DNS propagation is inherently variable, and results may differ depending on caching, TTL values, and the DNS server queried. ReviewMyDNS makes no warranties regarding the accuracy or completeness of lookup results.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Availability</h2>
            <p>We aim to maintain high availability but do not guarantee uninterrupted service. We may perform maintenance, updates, or emergency fixes that temporarily affect availability. We are not liable for losses resulting from service downtime.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, ReviewMyDNS and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability for any claim shall not exceed the amount you paid us in the three months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Intellectual Property</h2>
            <p>All content, design, and code on ReviewMyDNS is owned by ReviewMyDNS or its licensors. You may not reproduce, distribute, or create derivative works without express written permission, except as allowed by the embed widget terms described on our <Link href="/widget" className="text-blue-600 hover:underline">widget page</Link>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use of the Service after changes constitutes acceptance of the updated terms. Material changes will be announced via the site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
            <p>Questions about these terms? Contact us at <a href="mailto:info@reviewmydns.com" className="text-blue-600 hover:underline">info@reviewmydns.com</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
