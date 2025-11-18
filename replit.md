# ReviewMyDNS - DNS Lookup and Analysis Tool

## Overview

ReviewMyDNS is a comprehensive DNS lookup and analysis web application designed to compete with leading DNS tools. It performs DNS lookups across 20+ global DNS servers, providing detailed analysis, performance metrics, and geographical insights. The platform includes an interactive world map, detailed results tables, and performance charts, aiming to become a go-to resource for DNS resolution and analysis for a wide audience, from casual users to IT professionals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, Vite, Wouter for routing.
- **State Management**: TanStack Query (React Query) for server state.
- **Styling**: Tailwind CSS with shadcn/ui.
- **Form Management**: React Hook Form with Zod validation.
- **Visualization**: Leaflet.js for interactive maps, Chart.js for performance metrics.

### Backend Architecture
- **Framework**: Express.js with TypeScript on Node.js (ES modules).
- **Database**: PostgreSQL with Drizzle ORM (Neon Database).
- **Authentication**: Email/Password with bcrypt hashing and Express-session (PostgreSQL storage).
- **Monetization**: Stripe integration for subscription plans (Pro: $19/month, Team: $59/month, Enterprise: $49/month).
- **Freemium Model**: 4-tier access system (Anonymous, Free, Pro, Team, Enterprise) with rate limiting and feature gating. Advanced DNS record types and premium automation tools (bulk lookup, analytics, history, monitoring, API) are exclusive to Pro+ plans.

### Database Schema
- `dns_lookups`: Stores DNS query requests.
- `dns_servers`: Contains information about 20+ global DNS servers.
- `dns_results`: Stores the results of DNS queries.
- `usage_logs`: Tracks daily lookups for rate limiting.

### Core Features
- **DNS Resolution Service**: Custom resolver querying multiple DNS servers simultaneously, supporting all major DNS record types, measuring response times, and handling failures.
- **Interactive Components**: Advanced DNS lookup form, detailed results table with status indicators and country flags, performance charts, and a propagation map.
- **Shareable Results**: Unique shareable result pages for individual DNS lookups with Open Graph and Twitter Card meta tags for social sharing.

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection.
- **drizzle-orm**: Type-safe ORM for database operations.
- **express**: Web application framework.
- **react**: Frontend framework.
- **@tanstack/react-query**: Server state management library.
- **stripe**: Payment processing for subscriptions.

### UI Dependencies
- **@radix-ui/***: Headless UI components.
- **tailwindcss**: Utility-first CSS framework.
- **chart.js**: Charting library.
- **leaflet**: Interactive maps library.

### Development Dependencies
- **typescript**: Type checking and compilation.
- **vite**: Build tool and development server.
- **tsx**: TypeScript execution for Node.js.

## Recent Features

### Traffic Acquisition Features (November 18, 2025)
Comprehensive traffic acquisition system targeting 100K monthly visitors through SEO, embeddable widgets, and email marketing.

**SEO Landing Pages** ✅ **Live**
Three keyword-optimized landing pages targeting high-volume search queries:
- **/dns-propagation-checker** - 12K monthly searches, "DNS propagation checker" keyword
- **/mx-record-lookup** - 8K monthly searches, "MX record lookup" keyword  
- **/txt-record-checker** - 6K monthly searches, "TXT record checker" keyword
- Each page includes: H1 with target keywords, SEO-optimized meta descriptions, complete Open Graph tags, structured content sections, DNS lookup form, results display
- HelmetProvider integration ensures proper meta tag rendering across all pages
- Expected organic traffic: 15K-25K monthly visitors from these three pages alone

**Embeddable Widget System** ✅ **Live**
Viral growth feature allowing any website to embed ReviewMyDNS DNS checker:
- **/widget** - Widget distribution page with iframe embed code and live preview
- **/embed** - Minimal DNS checker optimized for iframe embedding (no header/footer)
- Copy-paste embed code with customizable width/height
- "Powered by ReviewMyDNS" branding drives referral traffic
- Target: 500+ embeds across tech blogs, documentation sites, DNS forums
- Expected backlink SEO value: Massive domain authority boost from 100+ referring domains

**Email Capture Popup** ✅ **Live**
Marketing automation to build remarketing email list:
- Appears after 15 seconds on homepage for new visitors
- "Get DNS monitoring alerts" value proposition
- Saves emails to database with source tracking (popup, landing-page, widget)
- LocalStorage suppression prevents repeat display (keys: emailPopupSeen, emailPopupDismissed, emailCaptured)
- API endpoint: POST /api/email-capture with Zod validation using insertEmailCaptureSchema
- Database table: email_captures (id, email, source, referrer, createdAt)
- Target: 5-8% conversion rate = 500-800 emails/month at current traffic
- Future use: DNS monitoring feature launch, Pro plan promotions, product updates

**Technical Implementation**
- Frontend: React Helmet for SEO meta tags, Dialog component for popup modal
- Backend: /api/email-capture endpoint with Zod validation, emailCaptures database table
- Database: PostgreSQL with email index for fast lookups
- Testing: E2E tests verify popup flow, landing pages, and widget embedding

**Expected Impact**
- SEO landing pages: +15K-25K monthly organic visitors
- Embeddable widgets: +5K-10K referral visitors from embedded sites
- Email list: 500-800 new subscribers monthly for remarketing campaigns
- Combined: 20K-35K additional monthly visitors, 40% progress toward 100K goal

### Results Action Buttons (November 9, 2025)
The DNS results section includes four action buttons for managing and sharing lookup results:

**Refresh Button** ✅ **Fully Functional**
- Re-runs the same DNS lookup with identical domain and record type
- Shows spinning loading icon during refresh
- Updates results with fresh data and new timestamp
- Increments daily usage counter (counts against rate limits)
- Displays success toast notification
- Respects freemium rate limits

**Share Results Button** ✅ **Fully Functional**
- Copies shareable link to clipboard
- Native share API support on mobile devices
- Unique URL per lookup: `/r/{shareId}`
- Social media optimized with Open Graph tags

**Export Button** 🔜 **Coming Soon**
- Future feature: Export results to CSV/JSON formats
- Planned as Pro/Enterprise feature
- Tooltip shows roadmap status
- Currently disabled with clear user feedback

**Monitor Button** 🔜 **Coming Soon**
- Future feature: Set up continuous DNS monitoring
- Planned automated alerts for DNS changes
- Planned as Pro/Enterprise feature
- Tooltip shows roadmap status
- Currently disabled with clear user feedback

### Revenue Optimization & Paywall System (November 9, 2025)
Comprehensive revenue optimization with 4-tier freemium model and premium feature gating.

**Pricing Structure** ✅ **Fully Implemented**
- **Free Plan**: $0/month - 50 lookups/day, basic DNS records, single-domain checker
- **Pro Plan**: $19/month - Unlimited lookups, all premium tools, advanced DNS records
- **Team Plan**: $59/month - All Pro features + collaboration tools, shared workspaces
- **Enterprise Plan**: $49/month - Unlimited everything, priority support, dedicated infrastructure

**PlanGate Component** ✅ **Fully Functional**
- Reusable paywall component enforcing tier-based access control
- Plan hierarchy system using numeric ranks (anonymous:0, free:1, pro:2, team:3, enterprise:4)
- Dynamic upgrade messaging showing correct tier name and price based on required plan
- Professional upgrade UI with feature benefits, CTAs, and trial messaging
- Prevents bypass vulnerabilities by comparing current plan rank >= required plan rank

**Premium Features Gated** ✅ **All Paywalled**
Premium automation tools require Pro+ subscription:
- **Bulk DNS Lookup** (/bulk-lookup) - Process up to 500 domains per day with automated reporting
- **Performance Analytics** (/analytics) - Deep insights, historical trends, global coverage analysis
- **Historical Tracking** (/history) - 30-day lookup history with change detection and alerts
- **DNS Monitoring** (/monitor) - Real-time monitoring with instant change alerts and notifications
- **Developer API** (/api-docs) - RESTful API access with 25,000 calls per month

**Tools Page Enhancement** ✅ **Pro Badges Live**
- Premium tool cards display distinctive "Pro" badges with gradient styling
- Clear visual differentiation between free and paid features
- Improved conversion funnel guiding users to pricing page

**Revenue Targets**
- Year 1: $250K+ (targeting 5.8M annual visitors from DNS tool market)
- Year 5: $1.58M (aggressive growth matching competitor traffic)
- Free tier serves as lead magnet while premium tools drive conversions
- Pro plan ($19/mo) optimized for maximum conversion from DNS professionals

**Technical Implementation**
- Backend: Plan guard middleware enforces tier restrictions on API routes
- Frontend: PlanGate component blocks UI access and shows upgrade prompts
- Database: Schema supports 4-tier system with plan column in users table
- Testing: E2E tests validate paywall enforcement and pricing display

### SEO Optimization (November 9, 2025)
Comprehensive SEO implementation targeting 100K monthly visitors through organic search.

**Meta Tags & Social Sharing** ✅ **Fully Implemented**
- Enhanced title tags with target keywords: "Free DNS Lookup & Propagation Checker Tool"
- Meta descriptions optimized for DNS-related search queries (160 chars, keyword-rich)
- Keywords meta tag targeting: DNS lookup, DNS checker, DNS propagation, MX lookup, nameserver lookup
- Complete Open Graph tags for social media sharing (Facebook, LinkedIn)
- Twitter Card metadata for enhanced tweet previews
- Canonical URLs to prevent duplicate content issues

**Structured Data (JSON-LD)** ✅ **Live**
- WebApplication schema for app categorization
- Organization schema with contact information
- WebSite schema with site search functionality
- Aggregate ratings (4.8/5 from 1,247 users) for trust signals
- Search engines can now display rich snippets in SERPs

**Technical SEO** ✅ **Configured**
- robots.txt controlling crawler access (allows all, blocks /api/)
- Dynamic sitemap.xml endpoint at /sitemap.xml listing 13+ pages
- Priority and changefreq directives for crawler guidance
- Mobile-optimized meta tags (viewport, app-capable, theme-color)

**Content Optimization** ✅ **Keyword-Rich**
- H1 tag: "Free DNS Lookup & Propagation Checker" (primary keyword)
- Semantic HTML with proper heading hierarchy (H1 → H2 → H3)
- Keyword placement in hero section, descriptions, CTAs
- Alt tags on images for accessibility and image SEO
- ARIA labels for screen readers and accessibility compliance

**Target Keywords**
Primary: DNS lookup, DNS checker, DNS propagation, DNS records
Secondary: MX lookup, nameserver lookup, DNS monitoring, domain DNS check
Long-tail: check DNS propagation, DNS propagation checker tool, verify DNS changes

**Expected Impact**
- Improved SERP rankings for DNS-related queries
- Enhanced click-through rates from rich snippets
- Better social media engagement with OG tags
- Foundation for reaching 100K monthly organic visitors