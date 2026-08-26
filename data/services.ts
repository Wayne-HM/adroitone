export const SERVICE_OPTIONS = [
  "Technology Talent",
  "AI & Automation",
  "Software Development",
  "IT Services",
  "Digital Transformation",
  "Other",
] as const;

export const SERVICE_OPTION_VALUES = SERVICE_OPTIONS;

export type DiagramKey = "talent" | "ai" | "software" | "cloud";

export type Service = {
  /** URL slug under /services */
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  capabilities: string[];
  outcomes: string[];
  engagements: { name: string; note: string }[];
  accent: string;
  diagram: DiagramKey;
};

export const SERVICES: Service[] = [
  {
    slug: "talent-search",
    index: "01",
    title: "Technology Talent",
    shortTitle: "Talent",
    tagline: "Specialists, not résumés.",
    description:
      "We operate as a strategic talent partner — finding, evaluating, and placing the technology specialists who change the speed of a team. Every search is run by people who understand the work itself.",
    capabilities: [
      "Direct Hire",
      "Contract Staffing",
      "Contract-to-Hire",
      "C2C Partnerships",
      "Technology Staffing",
      "Niche & Leadership Search",
      "Technical Screening",
      "Recruitment Management",
    ],
    outcomes: [
      "Shortlists you can trust — technically screened before they reach you",
      "Engagement models that flex from a single hire to a full team",
      "Long-term relationships instead of transactional placements",
    ],
    engagements: [
      { name: "Direct Hire", note: "Permanent specialists, vetted end-to-end." },
      {
        name: "Contract Staffing",
        note: "Skilled capacity for defined timelines.",
      },
      {
        name: "Contract-to-Hire",
        note: "Evaluate on the job before committing.",
      },
      {
        name: "C2C",
        note: "Structured partnerships with specialist firms.",
      },
    ],
    accent: "#43d9e6",
    diagram: "talent",
  },
  {
    slug: "ai-automation",
    index: "02",
    title: "AI & Automation",
    shortTitle: "AI",
    tagline: "Intelligence, applied to real work.",
    description:
      "We find the repetitive, high-volume work inside your operation and replace it with intelligent workflows — LLM integrations, assistants, and automations connected directly to the systems you already run.",
    capabilities: [
      "AI Opportunity Mapping",
      "LLM & ChatGPT Integrations",
      "Intelligent Assistants",
      "Workflow Automation",
      "Business Process Automation",
      "AI-Powered Applications",
      "Systems Integration",
      "Measurement & Optimization",
    ],
    outcomes: [
      "A clear map of which processes are worth automating first",
      "AI that works inside your systems — not beside them",
      "Operations that get measurably faster every quarter",
    ],
    engagements: [
      {
        name: "Opportunity Sprint",
        note: "Map processes, identify automation ROI.",
      },
      {
        name: "Build & Integrate",
        note: "Ship AI features into production systems.",
      },
      {
        name: "Automation Program",
        note: "Roll out across departments, measure outcomes.",
      },
      {
        name: "Advisory",
        note: "Ongoing guidance as your AI capability matures.",
      },
    ],
    accent: "#8a7cff",
    diagram: "ai",
  },
  {
    slug: "software-development",
    index: "03",
    title: "Software Development",
    shortTitle: "Software",
    tagline: "Products engineered to last.",
    description:
      "From customer-facing web and mobile products to enterprise platforms, we design and build modern software that ships fast and holds up — with UI/UX and QA built into every engagement.",
    capabilities: [
      "Web Applications",
      "Mobile Applications",
      "Custom Software",
      "Enterprise Platforms",
      "E-commerce",
      "UI / UX Design",
      "Software Testing & QA",
      "Legacy Modernization",
    ],
    outcomes: [
      "Working software in weeks, not quarters",
      "Interfaces your customers actually enjoy using",
      "Codebases your future engineers will thank you for",
    ],
    engagements: [
      { name: "Product Build", note: "End-to-end design, build, launch." },
      {
        name: "Delivery Team",
        note: "A dedicated squad embedded with yours.",
      },
      {
        name: "Modernization",
        note: "Re-platform legacy systems without disruption.",
      },
      { name: "Design & QA", note: "Experience and quality expertise on demand." },
    ],
    accent: "#3d63ff",
    diagram: "software",
  },
  {
    slug: "it-services",
    index: "04",
    title: "IT & Technology",
    shortTitle: "IT",
    tagline: "Infrastructure that stays out of your way.",
    description:
      "We keep the technology underneath your business modern, integrated, and dependable — across AWS, Microsoft Azure, and Google Cloud — with ongoing maintenance and support that scales with you.",
    capabilities: [
      "Cloud — AWS, Azure & Google Cloud",
      "Cloud Migration",
      "Technology Integration",
      "Application Modernization",
      "DevOps & Reliability",
      "Maintenance",
      "Ongoing Support",
      "Performance Optimization",
    ],
    outcomes: [
      "Cloud environments that are simpler, faster, and easier to run",
      "Systems that talk to each other instead of fighting each other",
      "A partner who answers when something matters",
    ],
    engagements: [
      { name: "Cloud Migration", note: "Move workloads with zero drama." },
      {
        name: "Integration",
        note: "Connect CRM, ERP, data and internal tools.",
      },
      {
        name: "Managed Support",
        note: "Maintenance and improvements, ongoing.",
      },
      {
        name: "Modernization",
        note: "Upgrade platforms while business runs.",
      },
    ],
    accent: "#43d9e6",
    diagram: "cloud",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
