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

## Recent Changes

**January 24, 2025 - Complete Platform Implementation**
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