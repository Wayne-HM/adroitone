export type Principle = {
  index: string;
  name: string;
  description: string;
};

export const PRINCIPLES: Principle[] = [
  {
    index: "01",
    name: "Practical expertise",
    description:
      "We start from the outcome — revenue, cost, speed, risk — and bring people who have done the specific work before. No buzzwords, no theater.",
  },
  {
    index: "02",
    name: "Specialized talent",
    description:
      "People who have done the specific work before. We screen for depth, not keyword matches, and stand behind every introduction.",
  },
  {
    index: "03",
    name: "Modern technology",
    description:
      "Contemporary stacks, cloud-native architecture, and AI where it genuinely helps — chosen for longevity, not novelty.",
  },
  {
    index: "04",
    name: "Flexible engagement",
    description:
      "A single hire, a dedicated squad, an automation sprint, or a managed platform — the model adapts to the problem.",
  },
  {
    index: "05",
    name: "Long-term partnership",
    description:
      "We build relationships measured in years. Most of our work continues long after the first launch.",
  },
];
