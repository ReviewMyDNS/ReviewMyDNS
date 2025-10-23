# ReviewMyDNS - DNS Lookup and Analysis Tool

## Overview

ReviewMyDNS is a comprehensive DNS lookup and analysis web application that competes with DNSChecker.org. Built with a React frontend and Express backend, the application performs DNS lookups across 20+ global DNS servers, providing detailed analysis, performance metrics, and geographical insights into DNS resolution. The platform includes an interactive world map, detailed results tables, and performance charts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Form Management**: React Hook Form with Zod validation
- **Visualization**: Leaflet.js for interactive maps, Chart.js for performance metrics

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM (migrated from memory storage)
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development Server**: Custom Vite integration for hot reloading

### Database Schema
The application uses three main tables with proper relations:
- `dns_lookups`: Stores DNS query requests with domain, record type, and expected values
- `dns_servers`: Contains information about 20+ global DNS servers including geographical data
- `dns_results`: Stores the results of DNS queries with status, response, and timing data

## Stripe Configuration

### Authentication System
- **Email/Password Authentication**: Users sign up with email and password (bcrypt hashing)
- **Session Management**: Express-session with PostgreSQL storage (connect-pg-simple)
- **Protected Routes**: Pricing page and dashboard require authentication
- **Auth Endpoints**: /api/auth/signup, /api/auth/login, /api/auth/logout, /api/auth/user

### Subscription Plans & Pricing

**Test Mode (Development)**
- Pro Plan: $19/month - `price_1SLCZcJeS2vWG8pbb9zBK4jr`
- Enterprise Plan: $49/month - `price_1SLDruJeS2vWG8pbuw4Cc5lW`
- API Keys: `TESTING_STRIPE_SECRET_KEY`, `TESTING_VITE_STRIPE_PUBLIC_KEY`

**Live Mode (Production)**
- Pro Plan: $19/month - `price_1SLDyoQxClCOXM9XTqZKZ2hc`
- Enterprise Plan: $49/month - `price_1SLDuLQxClCOXM9XjxZpCGEr`
- API Keys: `STRIPE_SECRET_KEY` (sk_live_...), `VITE_STRIPE_PUBLIC_KEY` (pk_live_...)

### Environment Variables
- `STRIPE_SECRET_KEY`: Stripe secret key (currently Test mode)
- `VITE_STRIPE_PUBLIC_KEY`: Stripe publishable key (currently Test mode)
- `STRIPE_PRICE_ID`: Pro plan price ID
- `STRIPE_ENTERPRISE_PRICE_ID`: Enterprise plan price ID
- `STRIPE_WEBHOOK_SECRET`: (Optional) Webhook signing secret for enhanced security

### Switching to Live Mode
To enable real payments, update these secrets in Replit:
1. `STRIPE_SECRET_KEY` → Your Live secret key (sk_live_...)
2. `VITE_STRIPE_PUBLIC_KEY` → Your Live publishable key (pk_live_...)
3. `STRIPE_PRICE_ID` → `price_1SLDyoQxClCOXM9XTqZKZ2hc`
4. `STRIPE_ENTERPRISE_PRICE_ID` → `price_1SLDuLQxClCOXM9XjxZpCGEr`
5. Configure webhook in Stripe Dashboard pointing to: `https://yourdomain.replit.app/api/stripe/webhook`
6. Add `STRIPE_WEBHOOK_SECRET` with your webhook signing secret

## Recent Changes

**October 23, 2025 - Email/Password Authentication & Stripe Integration**
- ✅ Removed Replit Auth, implemented email/password authentication system
- ✅ Added bcrypt password hashing and PostgreSQL session storage
- ✅ Created auth endpoints for signup, login, logout, and user management
- ✅ Integrated Stripe checkout with Pro ($19/month) and Enterprise ($49/month) plans
- ✅ Implemented webhook handler for subscription updates
- ✅ Added session verification for post-checkout subscription activation
- ✅ Configured for both Test Mode and Live Mode operations
- ✅ Protected routes require authentication before accessing premium features

**August 20, 2025 - PLATFORM DEPLOYED - Live Production Launch**
- ✅ ReviewMyDNS successfully deployed to production environment
- ✅ Platform now live and accessible to global users
- ✅ All DNS tools operational with authentic resolution data
- ✅ Monetization systems active and ready for revenue generation
- ✅ Created comprehensive launch checklist for immediate growth actions
- ✅ Target: 1,000 users and $500 MRR within first month
- ✅ Ready to compete directly with DNSChecker.org's 5.8M monthly visitors
- ✅ Next phase: Content marketing and user acquisition campaign

**July 26, 2025 - Complete Monetization & Mobile Optimization**
- ✅ Comprehensive advertising and sponsorship integration across all pages
- ✅ Strategic ad placements: header banners, sidebar ads, sponsored content, partner showcases
- ✅ Multi-revenue stream monetization: subscriptions, display ads, sponsored content, affiliate partnerships
- ✅ Complete mobile optimization with responsive design and touch-friendly interfaces
- ✅ Professional ad management system with closeable ads and placement targeting
- ✅ Conservative revenue projection: $3,350-6,050/month with growth potential to $15-25k/month

**July 24, 2025 - Complete Platform Implementation - ALL TOOLS WORKING**
- ✅ Implemented ALL 8 DNS tools with full functionality - NO MORE "Coming Soon"
- ✅ Performance & Monitoring: Response Time Monitor, Historical Tracking, Performance Analytics
- ✅ Security & Validation: DNS Security Check, DNSSEC Validator with comprehensive security analysis
- ✅ DNS Analysis: Bulk DNS Lookup, DNS Comparison, Global Coverage with real-time processing
- ✅ Developer Tools: Complete API documentation with endpoints and examples
- ✅ All navigation buttons and links now work properly across entire platform
- ✅ Professional UI with interactive controls, progress indicators, and detailed reporting
- ✅ Platform now fully competes with DNSChecker.org with superior functionality

**Previous Implementation (January 24, 2025)**
- Added fully functional navigation with working links to all pages
- Created comprehensive Tools page showcasing DNS tool categories and features
- Built detailed API Documentation with endpoints, pricing, and code examples
- Added extensive Documentation page with DNS guides and troubleshooting information
- Fixed all navigation buttons and links in header and footer
- Optimized DNS resolver with 3-second timeouts for faster responses
- Integrated PostgreSQL database with proper schema and global DNS servers
- Added interactive world map with Leaflet.js showing DNS propagation status
- Implemented results table with country flags and response time metrics
- Platform now fully competes with DNSChecker.org functionality

## Key Components

### DNS Resolution Service
- Custom DNS resolver service that queries multiple DNS servers simultaneously
- Supports all major DNS record types (A, AAAA, CNAME, MX, NS, TXT, SOA, PTR)
- Measures response times and handles failures gracefully
- Pre-configured with 10+ global DNS servers from major providers

### Interactive Components
- **DNS Lookup Form**: Advanced form with validation and optional expected value matching
- **Results Table**: Displays detailed results with status indicators and country flags
- **Performance Chart**: Chart.js integration for visualizing response times
- **Propagation Map**: Leaflet.js integration for geographical visualization of DNS servers

### Storage Layer
- Memory-based storage implementation (easily replaceable with database storage)
- Interfaces defined for easy extension to other storage backends
- Pre-populated with global DNS servers including geographical coordinates

## Data Flow

1. **User Input**: User submits DNS lookup form with domain and record type
2. **Validation**: Zod schema validates input on both client and server
3. **Storage**: DNS lookup record created and stored
4. **Resolution**: Parallel DNS queries sent to all active DNS servers
5. **Results Storage**: Individual results stored with timing and status information
6. **Visualization**: Results displayed in table, chart, and map formats

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework
- **react**: Frontend framework
- **@tanstack/react-query**: Server state management

### UI Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **chart.js**: Charting library for performance visualization
- **leaflet**: Interactive maps for geographical visualization

### Development Dependencies
- **typescript**: Type checking and compilation
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Single deployment artifact with both frontend and backend

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Drizzle configuration for PostgreSQL with migrations support
- Development vs production environment handling

### Development Workflow
- Hot reloading for both frontend and backend changes
- TypeScript checking across the entire monorepo
- Database migrations via Drizzle CLI (`npm run db:push`)

The application follows a monorepo structure with shared TypeScript types and schemas, enabling type safety across the full stack while maintaining clear separation of concerns between frontend, backend, and shared utilities.

## Growth Strategy for 50,000+ Monthly Views

### Content Marketing & SEO (Target: 60% of traffic)
- **DNS Educational Content**: Weekly blog posts on DNS fundamentals, troubleshooting, best practices
- **Technical Tutorials**: Step-by-step guides for DNS configuration, DNSSEC setup, performance optimization
- **Industry News**: DNS security alerts, outage reports, infrastructure updates
- **Case Studies**: Real-world DNS problem solving and optimization stories
- **Tool Comparisons**: Head-to-head DNS tool reviews and feature comparisons

### Technical SEO Optimization
- **Long-tail Keywords**: Target "DNS propagation checker", "DNS lookup tool", "check DNS records"
- **Featured Snippets**: Optimize for DNS definition boxes and quick answers
- **Local SEO**: Target "DNS checker" + location-based searches
- **Technical Content**: Rank for DNS troubleshooting and configuration queries

### Community Building & Social Proof
- **Developer Communities**: Active participation in Reddit r/webdev, r/sysadmin, Stack Overflow
- **Social Media**: LinkedIn articles, Twitter DNS tips, YouTube tutorials
- **Email Newsletter**: Weekly DNS insights and platform updates
- **User-Generated Content**: Customer success stories and community submissions

### Strategic Partnerships
- **DNS Providers**: Cross-promotion with Cloudflare, Route 53, NS1
- **Developer Tools**: Integration partnerships with hosting providers
- **Educational Platforms**: Collaboration with coding bootcamps and universities
- **Industry Influencers**: Partnerships with DevOps and infrastructure experts

### Product-Led Growth Features
- **Free API Tier**: Attract developers with generous free API limits
- **Embeddable Widgets**: DNS status widgets for websites and dashboards
- **Browser Extension**: Quick DNS lookup tool for developers
- **Slack/Discord Bots**: DNS monitoring notifications for teams

### Conversion Optimization
- **Progressive Registration**: Gradual feature unlocking with account creation
- **Value Demonstration**: Clear before/after comparisons and success metrics
- **Social Proof**: User testimonials, usage statistics, enterprise customer logos
- **Retargeting Campaigns**: Re-engage visitors with targeted advertising