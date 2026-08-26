/**
 * ⚠️  EDITABLE PLACEHOLDER — NO FABRICATED TESTIMONIALS.
 *
 * No verified testimonials exist yet, so this array is intentionally EMPTY.
 * The <TestimonialCarousel /> component renders nothing while the list is
 * empty (and the homepage omits the section entirely).
 *
 * When you have a real, approved testimonial, add an entry:
 *
 * {
 *   quote: "…the client's exact words…",
 *   person: "Full Name",
 *   title: "Title",
 *   company: "Company",
 * }
 */

export type Testimonial = {
  quote: string;
  person: string;
  title: string;
  company: string;
};

export const TESTIMONIALS: Testimonial[] = [];
