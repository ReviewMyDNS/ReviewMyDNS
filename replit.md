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
- **Monetization**: Stripe integration for subscription plans (Pro: $19/month, Enterprise: $49/month).
- **Freemium Model**: Tiered access (Anonymous, Free, Pro, Enterprise) with rate limiting and feature gating based on subscription plan. Advanced DNS record types are exclusive to Pro/Enterprise plans.

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