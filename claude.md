# Project
Cornerstone AI (cornerstoneai.co) — helping $10-30M companies take the first step with AI, see real results fast, and build from there. Founded by Francesco Gallo, based in Austin, TX. Built on next-forge.

## Core positioning
**"You don't need a digital transformation. You need a blueprint to go from 0 to 1."**

Anti-transformation positioning. Our buyers haven't started with AI yet. They don't want to be transformed, they want someone to show them where to start. We meet them where they are (zero), not where we want them to be.

# Architecture
- /apps/web → cornerstoneai.co (marketing site, blog, assessment)
- /apps/app → app.cornerstoneai.co (Cornerstone OS, future build, DO NOT TOUCH)
- Blog powered by BaseHub
- Deploy to Vercel
- Package manager: **bun** (not npm or pnpm). Use `bun install`, not `npm install`.
- Next.js pinned to **15.3.4** across all packages. Do NOT upgrade to 16 (Turbopack build panic).
- Middleware: `apps/web/middleware.ts` (Next.js 15 convention). Do NOT use `proxy.ts` (that's Next.js 16).
- Sentry, Clerk auth, Arcjet, Logtail, and feature flags toolbar are **stripped from /apps/web**. Do not re-add them to the marketing site config, layout, or middleware.
- The marketing site layout uses ThemeProvider + TooltipProvider directly, NOT DesignSystemProvider (which pulls in Clerk auth).

# Brand palette
- Amber #D97706 — accent, CTAs, section labels, links
- Cream #F5F0E8 — primary background
- Stone #EDE8DE — alternate section background
- Carbon #1C1917 — headings, dark CTA sections, footer
- Dark Stone #292524 — secondary dark
- Warm Gray #78716C — body text, descriptions
- White #FFFFFF — service cards, blog cards floating on cream/stone

# Typography direction
- Display/hero headings: serif font (like Instrument Serif)
- Headings and UI: clean sans-serif (like Plus Jakarta Sans)
- Body copy: readable sans-serif (like Source Sans 3)
- Monospace for stats/numbers (like JetBrains Mono)

# Logo mark
The Cornerstone logo is an L-shaped block (a cornerstone). No letter "C", no text inside. Just the shape:
```svg
<svg viewBox="0 0 48 48" fill="none">
  <path d="M8,8 L24,8 L24,24 L40,24 L40,40 L8,40 Z" fill="currentColor"/>
</svg>
```
- On dark backgrounds: fill="#D97706" (amber)
- On light backgrounds: fill="#D97706" (amber)
- Favicon: amber shape on transparent background

# Design system
- Cream and stone backgrounds alternate between sections
- Dark carbon bands for major CTAs
- White cards with subtle shadows float on cream/stone
- Numbered sections (01, 02, 03...) as large faded watermarks
- Section headers: small caps amber label + serif heading with one italic emphasis word
- Rounded pill-shaped CTA buttons in amber
- Subtle grain texture overlay on page
- Scroll-triggered stagger animations on sections
- FAQ accordion component
- Amber divider lines between sections

# Design principles
- Every element must justify its existence
- One primary action per screen, make it unmissable
- Whitespace is structure, not emptiness
- Mobile first, desktop is the enhancement
- All values reference design tokens, no hardcoded colors or spacing

# Structural reference
Model the homepage section flow after jonathanlasley.ai: numbered sections, serif display headings with italic emphasis words, alternating cream/stone backgrounds, white floating cards, dark CTA bands, and a consistent section rhythm.

# SEO
- Full structured data (Person, ProfessionalService, WebSite, WebPage, BreadcrumbList, FAQPage, HowTo schemas)
- Per-page meta titles, descriptions, Open Graph, Twitter cards
- Canonical URLs on every page
- Clean semantic HTML with proper aria labels

# Service tiers (Assess → Start → Build → Accelerate)
No prices shown on the site. Four equal cards in a row.
- **Assess** (ONE-TIME): Executive alignment, AI Readiness Assessment, 90-day strategic roadmap.
- **Start** (RECURRING): Everything in Assess + 1-2 workflow implementations, hands-on team enablement, department-level AI rollout, custom tool & automation builds.
- **Build** (RECURRING, RECOMMENDED): Everything in Start + 3-4 workflow implementations/month, multi-department AI rollout, AI monitoring.
- **Accelerate** (RECURRING): Everything in Build + company-wide simultaneous rollout, embedded operational presence, aggressive execution cadence, AI hiring fluency.

Every engagement begins with full AI diagnostic and 90-day roadmap in Month 1.

## Four-week operating rhythm
Week 1: Align (CEO check-in, review numbers, set priorities)
Week 2: Discover (deep work in departments, map workflows)
Week 3: Build (1-4 highest-impact automations)
Week 4: Train + Report (hands-on training, monthly impact report)

## The bad options (always frame these before presenting ourselves)
1. Hire Big 4 firm: $100K deck, impressive in board meetings, collects dust
2. Hire freelancer: Builds chatbot, disappears, nobody maintains it
3. Figure it out internally: Team stretched, nobody has 20 hours/week
4. Do nothing: Risk falling behind

Then: "There's a better way." We embed, build plan, raise AI acumen, build tools, train team to keep going without us.

## Four key differentiators
1. We build with you, not just advise (working systems, not slide deck)
2. Results within first 30 days (not 6 months of planning)
3. We teach your team (they learn AI, not just watch us)
4. We come with tech that stays (systems run whether we're there or not)

## What we leave behind (critical section)
1. Real-time training that raises output quality, builds fluency
2. AI hiring screening built into hiring process
3. Cornerstone OS dashboard showing what's built, what's saving, who's adopting, what's next

## Proof stats (use these exact numbers)
- 81% of leaders know AI can help, only 27% have done anything (WSI)
- 88% of business owners want help getting started (Goldman Sachs)
- 45% cite lack of technical expertise as #1 barrier (Goldman Sachs)

# Writing rules
- Warm, direct, honest. Talk like a person, not a consulting firm
- No jargon the CEO wouldn't use at dinner
- Never say: "leverage AI," "digital transformation," "agentic frameworks," "RAG pipelines," "operational excellence"
- Always say: "build the tools," "working systems," "your team gets better at AI"
- Never use rhetorical questions in copy
- Never use em dashes — use commas, periods, or line breaks
- CEO should feel like we've been in their office, know their business, not trying to impress with jargon

# Calendly integration
- All "Book a Call" and "Book a free strategy call" buttons open the Calendly popup, they do NOT navigate to /contact.
- Calendly widget.css and widget.js are loaded in the layout `<head>`.
- Buttons use a direct `Calendly.initPopupWidget()` onClick. The CalendlyButton component is in `components/calendly-button.tsx`.
- Calendly URL: `https://calendly.com/cornerstoneai/30min?hide_gdpr_banner=1&background_color=f5f0e8&text_color=78716c&primary_color=d97706`

# Metadata
- `packages/seo/metadata.ts` exports `baseMetadata` (used in root layout) and `createMetadata` (used per page).
- `baseMetadata` sets `title: "Cornerstone AI"` as the default. No template suffix.
- Pages pass their full title to `createMetadata`. It does NOT append "| Cornerstone AI" automatically.
- Homepage title: "Cornerstone AI - AI Strategy & Implementation"

# Scope rules
- Only work in /apps/web unless explicitly told otherwise
- Do not modify /apps/app, /apps/api, or /apps/email without permission
- Keep the marketing site as lightweight as possible

# Technical debugging notes
- **Global styling issues**: When visual styling issues affect multiple elements (thick borders, wrong colors, spacing problems), check `/packages/design-system/styles/globals.css` FIRST, specifically the `@layer base` sections. Don't waste time trying component-level fixes if it's a global CSS issue.
- Global base styles in this project use `@apply` directives that can override component styles
- **Always run `npx next build` from `apps/web` locally before pushing** to catch type errors, missing modules, and build failures before they hit Vercel.
- **No inline event handler strings in JSX.** React requires functions, not strings. `onLoad="this.media='all'"` will fail TypeScript. Use `dangerouslySetInnerHTML` or a client component if you need inline JS behavior on HTML elements.
- **Next.js version must match across ALL packages.** A version mismatch between packages (e.g., web on 15.3.4, seo on 15.3.3) causes cross-package type errors. When changing the Next.js version, update every package.json that depends on it.
- **Don't import `@repo/observability/next-config` in web.** It pulls in Sentry's full dependency tree (OpenTelemetry, require-in-the-middle) which breaks the build.
- **`next/script` (Script component) does not work in server components.** Use plain `<script>` tags in `<head>` instead. For inline JS, use `dangerouslySetInnerHTML`.
- **Don't kill the dev server for file changes.** Webpack hot-reloads automatically. Only restart for dependency or config changes. Repeated `.next` cache clears cause slow 40+ second recompiles.
- **Self-closing `<script />` in JSX** can cause duplicate script loading. Always use `<script ...></script>` with explicit closing tag.
