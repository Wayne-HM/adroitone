export type ProcessStep = {
  index: string;
  name: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    name: "Discover",
    description:
      "We start with the business outcome — not the ticket. What has to be true in six months for this to have been worth it?",
  },
  {
    index: "02",
    name: "Design",
    description:
      "Architecture, experience, and a delivery plan shaped together — so everyone knows what ships, when, and why.",
  },
  {
    index: "03",
    name: "Build",
    description:
      "Working software in tight increments. Progress you can see and click, not decks you have to believe.",
  },
  {
    index: "04",
    name: "Automate",
    description:
      "As the product takes shape, we remove the manual work around it with AI and intelligent workflows.",
  },
  {
    index: "05",
    name: "Deploy",
    description:
      "Launch on cloud infrastructure built for reliability — with monitoring, rollback, and support from day one.",
  },
  {
    index: "06",
    name: "Scale",
    description:
      "Optimize, extend, and grow what we shipped. Most of our partnerships begin at this step.",
  },
];
