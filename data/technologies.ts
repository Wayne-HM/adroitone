export type TechCategory = {
  key: string;
  label: string;
  blurb: string;
  items: string[];
};

/**
 * Technologies AdroitOne works with.
 * No certifications or vendor partnerships are implied.
 */
export const TECHNOLOGIES: TechCategory[] = [
  {
    key: "frontend",
    label: "Frontend",
    blurb:
      "Interfaces that feel fast, precise, and considered — on every screen.",
    items: ["React", "Angular", "JavaScript", "TypeScript"],
  },
  {
    key: "backend",
    label: "Backend",
    blurb: "APIs and services built for correctness, then for scale.",
    items: ["Node.js", "Python", "PHP", "Ruby on Rails"],
  },
  {
    key: "cloud",
    label: "Cloud",
    blurb: "Infrastructure across the major platforms — chosen per workload.",
    items: ["AWS", "Microsoft Azure", "Google Cloud"],
  },
  {
    key: "ai",
    label: "AI",
    blurb: "Language models and automation wired into real operations.",
    items: ["LLM Integrations", "ChatGPT", "AI Automation", "Intelligent Workflows"],
  },
  {
    key: "design",
    label: "Design",
    blurb: "Systems and prototypes that keep product decisions honest.",
    items: ["Figma", "Adobe XD", "Sketch"],
  },
];
