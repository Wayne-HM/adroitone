/**
 * ⚠️  EDITABLE PLACEHOLDER — NO FABRICATED CLIENT WORK.
 *
 * AdroitOne has no published case studies yet. These entries are clearly
 * labeled *illustrative templates* everywhere they render (badge: "Illustrative
 * template"). They demonstrate the Challenge → Approach → Technology →
 * Outcome structure so real engagements can be swapped in later.
 *
 * Replace each entry with verified client work, set `illustrative: false`,
 * and remove this notice.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  context: string;
  challenge: string;
  approach: string;
  technology: string[];
  outcome: string[];
  illustrative: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "document-intelligence-operations",
    title: "Document intelligence for an operations team",
    context: "Illustrative template · AI & Automation",
    challenge:
      "A high volume of incoming documents — orders, claims, requests — was being read, classified, and re-keyed by hand. Turnaround lagged and errors compounded downstream.",
    approach:
      "Map the document lifecycle end-to-end, then layer AI classification and extraction over the existing systems. Route confident results automatically; send edge cases to a human review queue with full context attached.",
    technology: ["LLM integrations", "Workflow automation", "CRM & ERP integration"],
    outcome: [
      "Manual handling reduced to exception-only review",
      "Every decision logged, auditable, and measurable",
      "Throughput scales with volume instead of headcount",
    ],
    illustrative: true,
  },
  {
    slug: "platform-modernization-delivery",
    title: "Modernizing a core platform without stopping the business",
    context: "Illustrative template · Software & Digital",
    challenge:
      "A revenue-critical platform was running on an aging stack. Every change was risky, releases were infrequent, and hiring for the legacy codebase had become nearly impossible.",
    approach:
      "Strangler-pattern modernization: stand up a modern service layer alongside the old system, migrate capability by capability behind stable interfaces, and keep both worlds running until each cutover is boring.",
    technology: ["React", "Node.js", "Cloud migration", "CI/CD"],
    outcome: [
      "Releases moved from quarterly to weekly",
      "Zero-downtime cutovers, feature by feature",
      "A stack mainstream engineers want to work in",
    ],
    illustrative: true,
  },
  {
    slug: "engineering-team-acceleration",
    title: "Standing up a specialized engineering team in weeks",
    context: "Illustrative template · Technology Talent",
    challenge:
      "A product roadmap was stalling for lack of niche engineering skills the internal team couldn't hire fast enough — while competitors shipped.",
    approach:
      "Combine direct-hire search for anchor roles with contract specialists who could contribute immediately. Technical screening at AdroitOne meant client interviews focused on fit, not fundamentals.",
    technology: ["Direct hire", "Contract staffing", "Technical screening"],
    outcome: [
      "Anchor hires and contract capacity landing in parallel",
      "Roadmap unblocked within a single quarter",
      "Contract-to-hire paths that de-risked every conversion",
    ],
    illustrative: true,
  },
];
