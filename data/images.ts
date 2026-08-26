/**
 * Central image registry.
 *
 * City photography: Wikimedia Commons (free licenses — see README credits).
 * Workplace photography: Unsplash.
 *
 * ➜ Replace any of these with licensed AdroitOne company photography later.
 *   Filenames are stable — swapping a file requires no code changes.
 */

export type SiteImage = {
  src: string;
  alt: string;
  credit: string;
};

export const IMAGES = {
  nyc: {
    src: "/images/nyc.jpg",
    alt: "Lower Manhattan at dusk, New York City",
    credit: "Wikimedia Commons — Lower Manhattan from Jersey City",
  },
  hyderabad: {
    src: "/images/hyderabad.jpg",
    alt: "HITEC City skyline and Durgam Cheruvu cable bridge, Hyderabad",
    credit: "Wikimedia Commons — Aerial view of Durgam Cheruvu and HITEC City",
  },
  team: {
    src: "/images/team.jpg",
    alt: "A team working together around a table of laptops",
    credit: "Unsplash",
  },
  engineering: {
    src: "/images/engineering.jpg",
    alt: "Two engineers reviewing code together at a workstation",
    credit: "Unsplash",
  },
  code: {
    src: "/images/code.jpg",
    alt: "Close-up of application code on a screen",
    credit: "Unsplash",
  },
  office: {
    src: "/images/office.jpg",
    alt: "A calm, modern office interior",
    credit: "Unsplash",
  },
  architecture: {
    src: "/images/architecture.jpg",
    alt: "Looking up at a modern glass office building",
    credit: "Unsplash",
  },
  planning: {
    src: "/images/planning.jpg",
    alt: "Hands sketching product plans beside a laptop",
    credit: "Unsplash",
  },
  server: {
    src: "/images/server.jpg",
    alt: "A modern data center corridor",
    credit: "Unsplash",
  },
} as const satisfies Record<string, SiteImage>;
