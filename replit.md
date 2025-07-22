# ReviewMyDNS - DNS Lookup and Analysis Tool

## Overview

ReviewMyDNS is a modern DNS lookup and analysis web application built with a React frontend and Express backend. The application allows users to perform DNS lookups across multiple global DNS servers, providing detailed analysis, performance metrics, and geographical insights into DNS resolution.

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

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development Server**: Custom Vite integration for hot reloading

### Database Schema
The application uses three main tables:
- `dns_lookups`: Stores DNS query requests with domain, record type, and expected values
- `dns_servers`: Contains information about global DNS servers including geographical data
- `dns_results`: Stores the results of DNS queries with status, response, and timing data

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