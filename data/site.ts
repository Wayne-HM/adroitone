/**
 * Verified company information.
 *
 * This website represents the INDIA operation — adroitoneconsult.co —
 * with Adroitone Consulting Pvt Ltd (Hyderabad) as the primary company
 * identity. The U.S. entity is secondary international context.
 */

export const OFFICES = {
  hyderabad: {
    entity: "Adroitone Consulting Pvt Ltd",
    lines: [
      "5th Floor, Sufi Chambers",
      "Road No. 1, Banjara Hills",
      "Hyderabad, Telangana 500034",
      "India",
    ],
    city: "Hyderabad",
    country: "India",
    role: "Engineering · Technology · Delivery",
  },
  newYork: {
    entity: "AdroitOne Inc.",
    lines: [
      "245 East Gun Hill Road, Suite #6E",
      "Bronx, NY 10467",
      "United States",
    ],
    city: "New York",
    country: "USA",
    role: "International · Clients",
  },
} as const;

/** Deep link to Google Maps using the verified Hyderabad address. */
export const HYDERABAD_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Sufi Chambers, Road No. 1, Banjara Hills, Hyderabad, Telangana 500034, India"
  );

/** The global (U.S.) website for the AdroitOne group. */
export const GLOBAL_WEBSITE_URL = "https://adroitone.com/";
