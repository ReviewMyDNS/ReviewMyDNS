# ReviewMyDNS - DNS Lookup and Analysis Tool

## Overview
ReviewMyDNS is a comprehensive web application for DNS lookup and analysis, designed to compete with leading DNS tools. It performs DNS lookups across over 20 global DNS servers, offering detailed analysis, performance metrics, and geographical insights. The platform features an interactive world map, detailed results tables, and performance charts, aiming to serve as a primary resource for DNS resolution and analysis for a wide range of users, from casual individuals to IT professionals. The project has a business vision to capture a significant share of the DNS tool market, targeting 100K monthly visitors and substantial revenue generation through a freemium model and subscription plans.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, Vite, Wouter for routing.
- **State Management**: TanStack Query (React Query).
- **Styling**: Tailwind CSS with shadcn/ui.
- **Form Management**: React Hook Form with Zod validation.
- **Visualization**: Leaflet.js for interactive maps, Chart.js for performance metrics.
- **UI/UX Decisions**: Incorporates interactive maps, detailed tables with status indicators and country flags, and performance charts. Shareable results pages include Open Graph and Twitter Card meta tags.
- **Design Approach**: Programmatic SEO system to scale content production for SEO.

### Backend
- **Framework**: Express.js with TypeScript on Node.js (ES modules).
- **Database**: PostgreSQL with Drizzle ORM (Neon Database).
- **Authentication**: Email/Password with bcrypt hashing and Express-session.
- **Monetization**: Stripe integration for subscription plans (Pro, Team, Enterprise).
- **Freemium Model**: 4-tier access system (Anonymous, Free, Pro, Team, Enterprise) with rate limiting and feature gating for advanced DNS record types and premium automation tools (bulk lookup, analytics, history, monitoring, API).

### Database Schema
- `dns_lookups`: Stores DNS query requests.
- `dns_servers`: Contains information about global DNS servers.
- `dns_results`: Stores the results of DNS queries.
- `usage_logs`: Tracks daily lookups for rate limiting.
- `email_captures`: Stores emails for marketing automation.

### Core Features
- **DNS Resolution Service**: Custom resolver querying multiple DNS servers, supporting major DNS record types, measuring response times, and handling failures.
- **Interactive Components**: Advanced DNS lookup form, detailed results table, performance charts, and a propagation map.
- **DNS Diagnostic Mode**: Auto-interprets DNS results with actionable insights - detects Google Workspace/Microsoft 365 MX misconfigurations, Cloudflare proxy detection, SPF/DKIM/DMARC validation, nameserver analysis, propagation consistency checks, and performance recommendations. Component: `dns-insights.tsx`.
- **Sticky Tool Features**: Mismatch highlighter (`mismatch-highlighter.tsx`) shows inconsistent DNS responses across servers. Feedback widget (`feedback-widget.tsx`) with Yes/No engagement buttons and localStorage persistence.
- **Shareable Results**: Unique shareable result pages with social sharing meta tags.
- **Traffic Acquisition**: SEO landing pages, embeddable widgets, and email capture popup.
- **Programmatic SEO**: Dynamic routing for provider-specific DNS setup guides with SEO optimization. 135+ indexed URLs in sitemap.
- **Topical Authority Content**: 16+ supporting content pages building SEO clusters around DNS fundamentals (TTL, record types, A vs CNAME, DNS cache, nameservers, flush DNS cache, TTL migration, MX troubleshooting, SPF/DKIM/DMARC) plus high-intent panic query pages.
- **Results Action Buttons**: Refresh, Share, Export (coming soon), and Monitor (coming soon).
- **Revenue Optimization**: Paywall system with `PlanGate` component for tier-based access control to premium features like bulk DNS lookup, performance analytics, historical tracking, DNS monitoring, and developer API.
- **SEO Optimization**: Comprehensive meta tags, structured data (JSON-LD with FAQPage), `robots.txt`, dynamic `sitemap.xml`, and content optimization.

## External Dependencies

### Core
- **@neondatabase/serverless**: Serverless PostgreSQL database connection.
- **drizzle-orm**: Type-safe ORM.
- **express**: Web application framework.
- **react**: Frontend framework.
- **@tanstack/react-query**: Server state management.
- **stripe**: Payment processing.

### UI
- **@radix-ui/***: Headless UI components.
- **tailwindcss**: CSS framework.
- **chart.js**: Charting library.
- **leaflet**: Interactive maps library.

### Development
- **typescript**: Type checking and compilation.
- **vite**: Build tool and development server.
- **tsx**: TypeScript execution for Node.js.