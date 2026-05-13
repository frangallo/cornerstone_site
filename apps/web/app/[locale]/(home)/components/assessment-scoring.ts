// Cornerstone AI Readiness Diagnostic — scoring engine
// Pure TypeScript, no React. Same code can run client- or server-side
// when persistence is wired up.

export type DimensionKey =
  | "dataFoundation"
  | "aiInAction"
  | "sharedCapability"
  | "painClarity"
  | "dataAccess"
  | "orgAdaptation";

export type TierKey = "decoration" | "personal" | "workflow" | "os";

export interface QuestionOption {
  key: string;
  label: string;
  points: number;
  unsure?: boolean;
}

export interface QuestionDef {
  id: "q1" | "q2" | "q3" | "q4" | "q5" | "q6";
  dimension: DimensionKey;
  weight: number; // multiplier in composite formula
  number: number;
  prompt: string;
  helper?: string;
  options: QuestionOption[];
  multi?: boolean;
  cap?: number;
}

export const QUESTIONS: QuestionDef[] = [
  {
    id: "q1",
    dimension: "dataFoundation",
    weight: 0.17,
    number: 1,
    prompt: "What does your team actually run on?",
    helper: "What's the main software your business runs on day to day?",
    options: [
      { key: "industry-platform", label: "Modern industry-specific platform that ties everything together (operations, customers, financials).", points: 18 },
      { key: "modern-erp", label: "Modern ERP or operating system, plus a few connected tools.", points: 14 },
      { key: "saas-suite", label: "Cloud SaaS tools that mostly work together.", points: 10 },
      { key: "fragmented", label: "Multiple systems that don't really talk to each other.", points: 6 },
      { key: "qb-spreadsheets", label: "Mostly QuickBooks plus spreadsheets and email.", points: 3 },
    ],
  },
  {
    id: "q2",
    dimension: "aiInAction",
    weight: 0.17,
    number: 2,
    prompt: "What's actually true about AI in your business today?",
    helper: "When you look honestly at AI in your business right now, what's true?",
    options: [
      { key: "ai-acting", label: "AI is doing real work in at least one part of the business, taking action and not just summarizing.", points: 18 },
      { key: "daily-use", label: "Multiple people use AI tools daily for real work, but nothing is formally measured.", points: 12 },
      { key: "tools-bought", label: "We bought tools like ChatGPT Team or Copilot. A few people use them. Most don't.", points: 6 },
      { key: "personal-experiments", label: "People experiment on their own. The company hasn't done anything official.", points: 4 },
      { key: "nothing", label: "Honestly, nothing yet.", points: 2 },
    ],
  },
  {
    id: "q3",
    dimension: "sharedCapability",
    weight: 0.18,
    number: 3,
    prompt: "If your best AI user quit tomorrow, what would happen?",
    helper: "Think about the person on your team who uses AI most effectively right now. If they walked out tomorrow, what happens to the way you use AI?",
    options: [
      { key: "shared", label: "Nothing. What they built is documented, shared, and being used by others.", points: 18 },
      { key: "partial", label: "Some loss, but most of their work is captured in shared systems or processes.", points: 12 },
      { key: "in-their-head", label: "We'd lose meaningful momentum. Most of it lives in their head.", points: 6 },
      { key: "no-best-user", label: "Honestly, we don't really have a \"best AI user\" yet.", points: 3 },
    ],
  },
  {
    id: "q4",
    dimension: "painClarity",
    weight: 0.16,
    number: 4,
    prompt: "Where does the work get stuck?",
    helper: "What's the most painful, repetitive workflow in your business right now? Pick up to 3.",
    multi: true,
    cap: 3,
    options: [
      { key: "leads-slipping", label: "Inbound leads or customer requests slipping through the cracks", points: 6 },
      { key: "quoting", label: "Quoting, proposals, or estimating taking too long", points: 6 },
      { key: "data-entry", label: "Manual data entry between systems", points: 6 },
      { key: "follow-up", label: "Customer follow-up and re-engagement", points: 6 },
      { key: "reporting", label: "Reporting and pulling numbers takes forever", points: 6 },
      { key: "onboarding", label: "Onboarding new hires or training the team", points: 6 },
      { key: "scheduling", label: "Scheduling, dispatch, or operations coordination", points: 6 },
      { key: "support", label: "Customer service or inbound questions", points: 6 },
      { key: "unsure", label: "Honestly, I'm not sure what the biggest pain is", points: 0, unsure: true },
    ],
  },
  {
    id: "q5",
    dimension: "dataAccess",
    weight: 0.14,
    number: 5,
    prompt: "Pulling the report.",
    helper: "If your CFO or finance lead asked for a specific operational number for last month, like revenue per team or unit, cost per job or project, or margin by product or service, how long would it take to produce?",
    options: [
      { key: "dashboard", label: "Under 5 minutes. It's already on a dashboard.", points: 18 },
      { key: "end-of-day", label: "End of day. Someone can pull it.", points: 13 },
      { key: "end-of-week", label: "End of week. We'd merge a few reports or spreadsheets.", points: 8 },
      { key: "untracked", label: "We don't really track it that way.", points: 3 },
    ],
  },
  {
    id: "q6",
    dimension: "orgAdaptation",
    weight: 0.18,
    number: 6,
    prompt: "How has the org actually changed?",
    helper: "Is your team, the org chart, who does what, how decisions get made, actually different than it was two years ago because of AI?",
    options: [
      { key: "deliberate", label: "Yes. We've made deliberate changes to roles, headcount, or how work flows because AI changed what's possible.", points: 18 },
      { key: "natural", label: "Yes. Some natural changes in what people focus on, but no deliberate restructuring.", points: 11 },
      { key: "same-org", label: "Not really. Same org, same hiring plan, just better tools.", points: 5 },
      { key: "havent-thought", label: "Honestly, we haven't thought about it that way.", points: 1 },
    ],
  },
];

// Single-answer responses are option keys. Q4 stores an array of selected keys.
export type Answers = {
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string[]; // multi-select
  q5?: string;
  q6?: string;
};

function pointsFor(question: QuestionDef, answer: string | string[] | undefined): number {
  if (answer === undefined) return 0;
  if (question.multi && Array.isArray(answer)) {
    const selected = answer
      .map((k) => question.options.find((o) => o.key === k))
      .filter((o): o is QuestionOption => !!o);
    const raw = selected.reduce((sum, o) => sum + o.points, 0);
    const cap = (question.cap ?? selected.length) * 6;
    return Math.min(raw, cap);
  }
  if (typeof answer === "string") {
    const opt = question.options.find((o) => o.key === answer);
    return opt ? opt.points : 0;
  }
  return 0;
}

export function calculateComposite(answers: Answers): number {
  let weighted = 0;
  for (const q of QUESTIONS) {
    const a = answers[q.id] as string | string[] | undefined;
    weighted += pointsFor(q, a) * q.weight;
  }
  // Sum of weights = 1.0; max raw points per question = 18.
  return Math.round((weighted / 18) * 100);
}

export interface SubScores {
  dataFoundation: number;
  aiInAction: number;
  sharedCapability: number;
  painClarity: number;
  dataAccess: number;
  orgAdaptation: number;
}

export function calculateSubScores(answers: Answers): SubScores {
  const out: Record<DimensionKey, number> = {
    dataFoundation: 0,
    aiInAction: 0,
    sharedCapability: 0,
    painClarity: 0,
    dataAccess: 0,
    orgAdaptation: 0,
  };
  for (const q of QUESTIONS) {
    const a = answers[q.id] as string | string[] | undefined;
    const raw = pointsFor(q, a);
    out[q.dimension] = Math.round((raw / 18) * 100);
  }
  return out;
}

const TIER_RANGES: { key: TierKey; min: number; max: number }[] = [
  { key: "decoration", min: 0, max: 35 },
  { key: "personal", min: 36, max: 60 },
  { key: "workflow", min: 61, max: 80 },
  { key: "os", min: 81, max: 100 },
];

const TIER_ORDER: TierKey[] = ["decoration", "personal", "workflow", "os"];

function tierFromComposite(composite: number): TierKey {
  for (const t of TIER_RANGES) {
    if (composite >= t.min && composite <= t.max) return t.key;
  }
  return "decoration";
}

function capTier(current: TierKey, max: TierKey): TierKey {
  const ci = TIER_ORDER.indexOf(current);
  const mi = TIER_ORDER.indexOf(max);
  return ci > mi ? max : current;
}

// Floor rules — applied in order, each can lower the tier ceiling.
export function resolveTier(answers: Answers, composite: number): TierKey {
  let tier = tierFromComposite(composite);

  // Rule 1: Q3 = no best AI user (3 pts) AND Q5 ≤ 3 (untracked) → cap Decoration
  const q3pts = pointsFor(QUESTIONS[2], answers.q3);
  const q5pts = pointsFor(QUESTIONS[4], answers.q5);
  if (answers.q3 === "no-best-user" && q5pts <= 3) {
    tier = capTier(tier, "decoration");
  }

  // Rule 2: Q1 = QuickBooks+spreadsheets (3 pts) AND Q2 ≤ 4 → cap Decoration
  const q2pts = pointsFor(QUESTIONS[1], answers.q2);
  if (answers.q1 === "qb-spreadsheets" && q2pts <= 4) {
    tier = capTier(tier, "decoration");
  }

  // Rule 3: Q4 includes "I'm not sure" → cap Personal Tool
  if (answers.q4?.includes("unsure")) {
    tier = capTier(tier, "personal");
  }

  // Rule 4: Q6 ≤ 5 (org hasn't deliberately changed) → cap Workflow
  const q6pts = pointsFor(QUESTIONS[5], answers.q6);
  if (q6pts <= 5) {
    tier = capTier(tier, "workflow");
  }

  // Suppress unused-var warnings (kept for clarity)
  void q3pts;

  return tier;
}

// ─── Tier descriptions ────────────────────────────────────────────────

export interface TierDescription {
  key: TierKey;
  name: string;
  range: [number, number];
  headline: string;
  observed: string;
  industry: string;
  next: string;
  engagement: "Assess" | "Start" | "Build" | "Accelerate";
  primaryCta: string; // CTA label
  ringColor: string; // CSS color value
}

export const TIERS: Record<TierKey, TierDescription> = {
  decoration: {
    key: "decoration",
    name: "AI as Decoration",
    range: [0, 35],
    headline: "AI has been talked about, maybe even bought, but nothing has actually changed about how the work gets done.",
    observed:
      "No shared system for using AI. The work AI could touch isn't documented or accessible. If you've bought tools, they're sitting unused. If someone is \"looking at AI,\" they don't have a budget or a target.",
    industry:
      "You are not alone. McKinsey 2025 reports only 1% of executives describe their AI rollouts as \"mature,\" and Cisco's research finds roughly half of mid-market operators are in this band. This is where the industry actually is.",
    next:
      "Don't buy more AI tools yet. Operators in this position who buy first typically waste 6 to 12 months and $50K to $250K on software that won't fit. The right move is a structured Assess engagement to figure out where AI could actually pay back before spending another dollar.",
    engagement: "Assess",
    primaryCta: "Get the prerequisite roadmap",
    ringColor: "var(--orange-deep)",
  },
  personal: {
    key: "personal",
    name: "AI as Personal Tool",
    range: [36, 60],
    headline:
      "A few people on your team use AI well. Their workflows live in their heads. You're getting individual lift, not company lift.",
    observed:
      "AI shows up in personal productivity, drafting, summarizing, brainstorming. It doesn't yet act on your systems of record or replace meaningful work. The use cases aren't tied to specific operating metrics.",
    industry:
      "Accenture puts 63% of organizations in this band. They call it \"Experimenters,\" with a median maturity score of 29 out of 100. RSM's 2025 mid-market survey found 92% of firms experienced challenges scaling AI. This is the median experience.",
    next:
      "You don't need more pilots. You need one production-grade use case tied to a P&L metric. Something that does work, not just helps individuals draft emails. The Start engagement is built for this.",
    engagement: "Start",
    primaryCta: "Book a strategy call",
    ringColor: "var(--orange)",
  },
  workflow: {
    key: "workflow",
    name: "AI in the Workflow",
    range: [61, 80],
    headline:
      "At least one team has a shared way of working with AI. The work is starting to compound, but the systems don't talk to each other yet.",
    observed:
      "Executive ownership is clear and at least partly funded. Core data is accessible. One or two functions have AI doing real work. The chasm you haven't crossed is connecting it across teams and making the org actually different because of it.",
    industry:
      "Cisco classifies this band as \"Chasers,\" about 36% of organizations globally. Moderate preparation, but the gap to the genuinely AI-mature top 10 to 13% is real and not closed by adding more tools.",
    next:
      "Move one scoped use case into production with proper measurement, governance, and a 90-day review. The Build engagement is designed for exactly this. Shipping one production system that works across teams.",
    engagement: "Build",
    primaryCta: "Book a strategy call",
    ringColor: "var(--ink)",
  },
  os: {
    key: "os",
    name: "AI in the Operating System",
    range: [81, 100],
    headline:
      "AI is wired into the systems where work actually happens. Multiple functions have AI doing real work. The org chart looks different than it did two years ago, and the difference is intentional.",
    observed:
      "Named C-level AI ownership with multi-quarter budget. Data centralized and accessible. Multiple use cases in production with documented ROI. Non-engineers shipping their own automations. Workforce reorganization is deliberate.",
    industry:
      "Accenture's \"AI Achievers,\" 12% of firms, attribute over 30% of revenue to AI-influenced workflows and grow 50% faster than peers. You are in that population.",
    next:
      "Your risks are different now: governance gaps, model lifecycle, concentration risk on the use cases that worked. The Accelerate engagement is built for operators ready to scale across multiple functions with proper guardrails.",
    engagement: "Accelerate",
    primaryCta: "Book a strategy call",
    ringColor: "var(--ink)",
  },
};

// ─── Personalized recommendations ─────────────────────────────────────

export interface Recommendation {
  tag: string;
  body: string;
  priority: number; // lower = higher priority
}

const Q4_USE_CASE_RECS: Record<string, string> = {
  "leads-slipping":
    "Voice AI and missed-call recovery typically pay back in 30 to 60 days for operators in your range.",
  quoting:
    "Document AI for proposal automation is one of the highest-ROI builds for mid-market operators.",
  "data-entry":
    "Workflow automation between your core systems often returns 10+ hours per person per week.",
  "follow-up":
    "CRM AI for follow-up automation is a fast win, usually live within 2 weeks.",
  reporting:
    "Data automation and dashboarding pays back the day your team stops merging spreadsheets.",
  onboarding:
    "Internal knowledge AI cuts ramp time by 30 to 50% for most operators.",
  scheduling:
    "Scheduling and dispatch AI typically lifts utilization by 10 to 20%.",
  support:
    "Support AI handles 40 to 60% of tier-1 questions for most operators.",
};

const Q4_USE_CASE_TAG: Record<string, string> = {
  "leads-slipping": "Voice AI · missed-call recovery",
  quoting: "Document AI · proposal automation",
  "data-entry": "Workflow automation · integration AI",
  "follow-up": "CRM AI · outbound automation",
  reporting: "Data automation · dashboarding",
  onboarding: "Knowledge AI · internal copilots",
  scheduling: "Scheduling AI · ops automation",
  support: "Support AI · chatbots",
};

export function buildRecommendations(
  answers: Answers,
  subScores: SubScores
): Recommendation[] {
  const recs: Recommendation[] = [];

  if (subScores.orgAdaptation <= 30) {
    recs.push({
      priority: 1,
      tag: "Org Adaptation",
      body:
        "The single biggest predictor of AI ROI isn't tools or strategy. It's whether the org has actually changed because of AI. Most companies run 2023's org chart with better autocomplete. The next 90 days of work is rethinking who does what now that AI can do real work.",
    });
  }

  if (subScores.sharedCapability <= 35) {
    recs.push({
      priority: 2,
      tag: "Shared Capability",
      body:
        "Your AI work lives in one or two heads. That's individual productivity, not organizational capability. The first move is making one person's AI workflow shareable across the team. Documented, replicable, owned by more than one person.",
    });
  }

  if (subScores.dataFoundation <= 35) {
    recs.push({
      priority: 3,
      tag: "Data Foundation",
      body:
        "Your data isn't AI-ready, not because it's bad, but because it lives in formats AI systems can't read. The pre-AI work is integration. Get critical operating data out of spreadsheets and into your system of record.",
    });
  }

  if (subScores.dataAccess <= 45) {
    recs.push({
      priority: 4,
      tag: "Data Access",
      body:
        "AI deployed on data you can't query is AI deployed on guesses. The next 60 days is building dashboards your team can actually pull numbers from in under a day.",
    });
  }

  if (subScores.aiInAction <= 35) {
    recs.push({
      priority: 5,
      tag: "AI in Action",
      body:
        "Buying tools isn't the problem, activation is. Your next move isn't more software. It's picking one team and one workflow and making it stick before adding anything else.",
    });
  }

  // Q4 pain clarity
  const painSel = answers.q4 ?? [];
  const isUnsure = painSel.includes("unsure");
  if (isUnsure || painSel.length === 0) {
    recs.push({
      priority: 1,
      tag: "Pain Clarity",
      body:
        "Pick one specific workflow with measurable inputs and outputs. The companies that win pick one and ship. The ones that lose pick five and stall.",
    });
  } else {
    // Surface the use-case-specific recommendation for the first selected pain point
    const top = painSel.find((k) => k !== "unsure");
    if (top && Q4_USE_CASE_RECS[top]) {
      recs.push({
        priority: 6,
        tag: Q4_USE_CASE_TAG[top] ?? "Use Case",
        body: Q4_USE_CASE_RECS[top],
      });
    }
  }

  recs.sort((a, b) => a.priority - b.priority);

  // Always return at least 3
  const filler: Recommendation[] = [
    {
      priority: 99,
      tag: "Cadence",
      body:
        "Set a monthly rhythm for AI work, even one half-day a month with the team. Without a rhythm, AI lives in someone's spare time and shows up nowhere.",
    },
    {
      priority: 99,
      tag: "Measurement",
      body:
        "Pick the metric AI is supposed to move before you pick the tool. If you can't say what number should change, you're shopping, not deploying.",
    },
    {
      priority: 99,
      tag: "Embed",
      body:
        "If you're hiring outside help, hire embedded operators, not a deck-shop. The work that sticks is built next to your team, not handed over the wall.",
    },
  ];
  for (const f of filler) {
    if (recs.length < 3) recs.push(f);
  }

  return recs.slice(0, 3);
}

// ─── Heat map color thresholds ────────────────────────────────────────

export function dimensionColor(score: number): string {
  if (score <= 40) return "#C44";
  if (score <= 70) return "#E8631C";
  return "#2D8F4E";
}

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  dataFoundation: "Data Foundation",
  aiInAction: "AI in Action",
  sharedCapability: "Shared Capability",
  painClarity: "Pain Clarity",
  dataAccess: "Data Access",
  orgAdaptation: "Org Adaptation",
};

export const DIMENSION_ORDER: DimensionKey[] = [
  "dataFoundation",
  "aiInAction",
  "sharedCapability",
  "painClarity",
  "dataAccess",
  "orgAdaptation",
];
