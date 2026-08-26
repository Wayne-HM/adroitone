/**
 * Analytics abstraction.
 *
 * Set NEXT_PUBLIC_ANALYTICS_ID in the environment to activate. No provider is
 * hardcoded — wire `initAnalytics` below to the vendor of your choice
 * (GA4, Plausible, Fathom, PostHog…) in one place.
 *
 * `track()` pushes events onto window.dataLayer so any tag manager or
 * provider picked up later can consume them without code changes.
 */

export const analyticsId =
  process.env.NEXT_PUBLIC_ANALYTICS_ID ?? "";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...properties });
}
