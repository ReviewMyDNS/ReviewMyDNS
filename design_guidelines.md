# ReviewMyDNS Design Guidelines

## Design Approach
**System Selected**: Material Design 3 + Linear-inspired aesthetics
**Rationale**: Technical utility tool requiring clarity, data density, and professional credibility. Material's elevation system works perfectly for layered data displays (maps, charts, results tables).

## Background Treatment
**Hero Section**: Deep gradient background (#0F172A → #1E293B) with subtle grid pattern overlay (10% opacity white dots, 32px spacing)
**Body Sections**: Light neutral (#F8FAFC) with elevated white cards (shadow-sm) for content containers
**Accent Zones**: Soft blue-tinted backgrounds (#EFF6FF) for feature sections

## Typography System
**Primary Font**: Inter (Google Fonts)
**Secondary Font**: JetBrains Mono (for DNS records, IP addresses, technical data)

**Hierarchy**:
- Hero Headline: text-5xl/font-bold
- Section Headers: text-3xl/font-semibold
- Subsections: text-xl/font-medium
- Body: text-base/font-normal
- Technical Data: text-sm/font-mono
- Labels: text-xs/font-medium/uppercase/tracking-wide

## Layout & Spacing
**Tailwind Units**: Consistently use 4, 6, 8, 12, 16, 20, 24 for spacing
**Section Padding**: py-20 desktop, py-12 mobile
**Container**: max-w-7xl with px-6
**Component Gaps**: gap-6 for cards, gap-4 for form elements

## Component Library

### Hero Section
- Full-width gradient background with grid pattern
- Centered content: headline + description + dual CTAs (Start DNS Check / View Documentation)
- Floating card preview showing live DNS check interface with blurred background buttons
- Subtle animated ping indicators on global server locations
- Height: min-h-[85vh]

### DNS Checker Interface (Featured Below Hero)
- Large elevated card (shadow-lg) with tabs: Quick Check / Advanced / Bulk
- Input field with domain validation, server selector dropdown
- Real-time result cards showing: Server Location (flag icon), IP, Response Time, Status badge
- Interactive world map with ping markers

### Feature Grid (3 columns desktop, 1 mobile)
Cards with: Icon (Heroicons), heading, description, "Learn more →" link
- Global Server Network (50+ locations visualization)
- Performance Analytics (mini chart preview)
- DNS Records Inspector (table preview)
- Propagation Timeline (animated progress bar)
- Custom Nameserver Testing
- Export & API Access

### Stats Bar
4-column centered metrics on blue-tinted background: Checks Performed, Active Servers, Average Response, Uptime %
Large numbers (text-4xl/font-bold) with labels

### Interactive Map Section
Full-width embedded map component showing server locations with clustering
Side panel listing servers by region with latency indicators (green/yellow/red dots)

### Technical Tools Showcase
2-column layout alternating image-left and image-right:
- WHOIS Lookup tool interface
- DNS Record visualizer with tree diagram
- TTL analyzer with timeline
- Reverse DNS checker

### Comparison Table
ReviewMyDNS vs Competitors: checkmarks/X marks, highlight advantages with accent color borders

### Footer
3-column grid: Product links, Resources, Company info
Bottom bar: Logo, copyright, social icons (right-aligned)

## Imagery Requirements

**Hero Image**: YES - Floating dashboard preview showing DNS check interface with animated globe/network visualization in background (subtle, not distracting)

**Additional Images**:
1. DNS checker interface mockup (clean UI with sample results)
2. World map visualization with server pings
3. Performance chart screenshots (response time graphs)
4. DNS record table with syntax highlighting
5. Mobile app mockup if applicable

All images should have subtle shadows and rounded corners (rounded-lg)

## Icons
**Library**: Heroicons (outline for navigation, solid for status indicators)
Key icons: GlobeAltIcon, ServerIcon, ChartBarIcon, ClockIcon, CheckCircleIcon, XCircleIcon

## Key Design Principles
1. **Data Clarity**: White cards on neutral backgrounds for maximum readability
2. **Technical Credibility**: Monospace fonts for all DNS/IP data
3. **Visual Hierarchy**: Bold contrast between sections using background treatments
4. **Progressive Disclosure**: Tabs and expandable sections for complex data
5. **Status Communication**: Green/yellow/red system for DNS health indicators