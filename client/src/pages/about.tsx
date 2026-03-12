import { Helmet } from "react-helmet-async";
import { Logo } from "@/components/logo";
import { Link } from "wouter";
import MobileMenu from "@/components/mobile-menu";
import { Globe, Shield, Zap, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>About ReviewMyDNS - Free DNS Propagation Checker</title>
        <meta name="description" content="ReviewMyDNS is a free DNS propagation checker that queries 50+ global DNS servers. Learn about our mission to make DNS troubleshooting accessible to everyone." />
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
              <Link href="/tools" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Tools</Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About ReviewMyDNS</h1>
          <p className="text-lg text-gray-600">
            Making DNS troubleshooting accessible to everyone — from individual developers to enterprise IT teams.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What We Do</h2>
            <p className="text-gray-600 leading-relaxed">
              ReviewMyDNS is a free DNS propagation checker and diagnostic tool. When you make a DNS change — updating a nameserver, adding an MX record, or pointing a domain to a new server — it takes time for the change to propagate across the global DNS network. ReviewMyDNS queries 50+ DNS servers across North America, Europe, Asia, and Oceania simultaneously to show you exactly where your changes have and haven't propagated yet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why We Built It</h2>
            <p className="text-gray-600 leading-relaxed">
              DNS problems are notoriously difficult to diagnose. Existing tools were either too basic (checking only a handful of servers), required paid accounts for real utility, or gave you raw data without any interpretation. We built ReviewMyDNS to be the tool we wished existed — one that not only shows you what DNS servers are returning, but also tells you what it means and what to do about it.
            </p>
          </section>

          <section>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {[
                { icon: Globe, title: "50+ Global Servers", desc: "Check DNS propagation across servers in every major region worldwide." },
                { icon: Zap, title: "Instant Diagnostics", desc: "Auto-detect misconfigurations in SPF, DKIM, DMARC, MX, and more." },
                { icon: Shield, title: "Always Free", desc: "Core DNS lookup and propagation checking will always be free." },
                { icon: Users, title: "Built for Pros", desc: "Designed for DevOps, sysadmins, MSPs, and IT teams who manage DNS daily." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Have questions, feedback, or want to discuss an enterprise plan?{" "}
              <a href="mailto:info@reviewmydns.com" className="text-blue-600 hover:underline">info@reviewmydns.com</a>
              {" "}or visit our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
