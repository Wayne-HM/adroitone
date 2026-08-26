/**
 * ⚠️  EDITABLE PLACEHOLDER EDITORIAL.
 *
 * These are original editorial placeholders so the Insights section is
 * fully functional out of the box. The /insights page labels them as
 * editorial previews. Replace titles, dates and bodies with published
 * articles when available — routes are generated from this file.
 */

export const INSIGHT_CATEGORIES = [
  "All",
  "AI",
  "Automation",
  "Technology",
  "Talent",
  "Digital Transformation",
] as const;

export type InsightCategory = Exclude<
  (typeof INSIGHT_CATEGORIES)[number],
  "All"
>;

export type Article = {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  date: string;
  readMinutes: number;
  body: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "where-ai-pays-off-first",
    title: "Where AI actually pays off first",
    category: "AI",
    excerpt:
      "Most AI initiatives fail by starting in the wrong place. The highest-return projects share three boring characteristics.",
    date: "2026-07-14",
    readMinutes: 5,
    body: [
      "The most valuable AI project in your organization is probably not the one that would impress a conference audience. It is the one your team does two hundred times a week while sighing.",
      "High-return automation shares three traits: the input is repetitive, the judgment required is bounded, and the cost of an occasional mistake is low or recoverable. Document intake. Ticket triage. First-pass data entry. Quote preparation. None of these are glamorous; all of them compound.",
      "Start by mapping where human hours go inside one process, not across the company. Rank tasks by volume times tedium, then ask whether the correct answer is knowable from the material itself. That intersection is where intelligent automation earns its keep first.",
      "The strategic move is not to deploy AI everywhere at once. It is to build one workflow that works measurably better, earn organizational trust, and let the second project fund itself.",
    ],
  },
  {
    slug: "hidden-cost-of-manual-handoffs",
    title: "The hidden cost of manual handoffs",
    category: "Automation",
    excerpt:
      "The most expensive work in your operation is the copy-paste nobody remembers doing. A field guide to finding it.",
    date: "2026-06-30",
    readMinutes: 4,
    body: [
      "Ask any operations team how work moves between systems and you will hear about exports, spreadsheets, and 'Priya usually handles that part.' Manual handoffs rarely appear on process maps because everyone considers them beneath documentation.",
      "Each handoff costs twice: once in the labor of moving information, and again in the delay, duplication, and error it introduces downstream. The second cost is the one that scales dangerously.",
      "The audit is simple. Pick your five most common workflows. For each, list every time a human re-types, re-formats, or re-enters information that already exists somewhere else. That list is your automation backlog, roughly pre-sorted by ROI.",
      "Modern integration makes most of these handoffs obsolete. The barrier is rarely technical anymore — it is noticing that the workaround became infrastructure.",
    ],
  },
  {
    slug: "modernize-without-a-rewrite",
    title: "Modernizing without the big rewrite",
    category: "Technology",
    excerpt:
      "'We'll rebuild it from scratch' is the most expensive sentence in software. There is a disciplined alternative.",
    date: "2026-06-12",
    readMinutes: 6,
    body: [
      "Every legacy platform eventually produces the same proposal: stop feature work for a year, rewrite everything on a modern stack, and emerge renewed. The organizations that attempt this learn why the plan is called a second system trap.",
      "The disciplined alternative is incremental strangulation. Build a modern layer alongside the old system. Move capability across interface by interface. Keep both running until every cutover is uneventful. At no point does the business hold its breath.",
      "This approach demands more architectural patience than a rewrite, but it buys something priceless: reversibility. Any step can be paused without stranding the company halfway.",
      "Modernization is not a project; it is a posture. Teams that adopt it ship new value continuously — even during the migration itself.",
    ],
  },
  {
    slug: "hiring-engineers-tight-market",
    title: "Hiring engineers when everyone is hiring engineers",
    category: "Talent",
    excerpt:
      "In a crowded market, the advantage goes to teams that fix their funnel before they widen it.",
    date: "2026-05-22",
    readMinutes: 5,
    body: [
      "When every company is competing for the same specialists, posting another job description is not a strategy. Speed and signal win. Candidates decide within days, and top engineers evaluate your process as a preview of your engineering culture.",
      "The first fix is screening depth. Interview loops staffed by people who cannot evaluate the work produce both false negatives — great candidates lost — and false positives that surface six months later.",
      "The second fix is honesty about the role. Precise requirements attract precise matches. A search described clearly to twenty right people beats a broadcast to two thousand wrong ones.",
      "Finally, consider blended capacity: anchor roles filled permanently, specialist gaps covered by vetted contract talent. The goal is not headcount. It is momentum.",
    ],
  },
  {
    slug: "build-vs-buy-ai-capability",
    title: "Build vs. buy: making the AI decision honestly",
    category: "AI",
    excerpt:
      "A practical decision framework for leaders who are tired of vendor decks and want the answer for their context.",
    date: "2026-04-28",
    readMinutes: 5,
    body: [
      "Every AI capability now arrives with the same question attached: assemble it from models and tooling ourselves, or buy a packaged product? Honest answers depend less on technology than on where your differentiation actually lives.",
      "Buy when the capability is generic — summarization, standard document parsing, common integrations. Paying a vendor for commodity intelligence is rational; building it is vanity.",
      "Build when the value is trapped in your proprietary context — your documents, your domain logic, your customer relationships. That context is precisely what packaged products cannot see, and it compounds every quarter you encode it well.",
      "Most enterprises end up hybrid: bought components assembled with a thin, owned integration layer. What matters is deciding deliberately instead of by default.",
    ],
  },
  {
    slug: "transformation-without-theater",
    title: "Digital transformation without the theater",
    category: "Digital Transformation",
    excerpt:
      "Real transformation is measured in cycle times, not slideware. How to run a program that survives contact with reality.",
    date: "2026-03-31",
    readMinutes: 6,
    body: [
      "Transformation programs fail in familiar ways: initiatives chosen for narrative rather than impact, success measured in launches rather than outcomes, and a workforce that learns to wait programs out.",
      "Durable transformation inverts the sequence. Start with one operational metric everyone agrees matters — order-to-cash time, quote turnaround, ticket resolution. Attach technology and talent to that number. Publicize movement, not activity.",
      "Two cities help here more than one. Strategy set close to the business, delivery executed with focus — that combination keeps ambition honest and execution fast.",
      "The tell of a real program is simple: eighteen months in, the people who lived through it can name what specifically got faster. If they cannot, it was theater.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
