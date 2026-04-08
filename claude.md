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

# Service tiers (Start → Build → Accelerate)
- **Start** ($5-7.5K/mo): Strategy + training + 1 quick win per month. Executive alignment, 90-day roadmap, use-case pipeline, 1 workflow/month, team enablement, AI proficiency assessment.
- **Build** ($12.5-15K/mo, RECOMMENDED): Everything in Start + 3-4 workflows/month, multi-department rollout, AI hiring screening, monthly impact report via Cornerstone OS.
- **Accelerate** (Build × depts, 15% discount): Everything in Build, company-wide simultaneous activation, embedded operational presence, cross-functional integration.

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

# Scope rules
- Only work in /apps/web unless explicitly told otherwise
- Do not modify /apps/app, /apps/api, or /apps/email without permission
- Keep the marketing site as lightweight as possible

# Technical debugging notes
- **Global styling issues**: When visual styling issues affect multiple elements (thick borders, wrong colors, spacing problems), check `/packages/design-system/styles/globals.css` FIRST, specifically the `@layer base` sections. Don't waste time trying component-level fixes if it's a global CSS issue.
- Global base styles in this project use `@apply` directives that can override component styles
