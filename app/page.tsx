import type { Metadata } from "next";
import { Atmosphere } from "@/components/home/Atmosphere";
import { HeroEditorial } from "@/components/home/HeroEditorial";
import { Positioning } from "@/components/home/Positioning";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { AiEditorial } from "@/components/home/AiEditorial";
import { TalentHuman } from "@/components/home/TalentHuman";
import { TechEcosystem } from "@/components/home/TechEcosystem";
import { HyderabadSection } from "@/components/home/HyderabadSection";
import { InternationalPresence } from "@/components/home/InternationalPresence";
import { AboutBand } from "@/components/home/AboutBand";
import { PrinciplesSection } from "@/components/why/PrinciplesSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { pageMetadata, siteConfig, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — Technology, Talent & AI Company in Hyderabad`,
  description:
    "AdroitOne (Adroitone Consulting Pvt Ltd) helps businesses build stronger technology teams, modern software and practical AI solutions — from Banjara Hills, Hyderabad, India.",
  path: "/",
});

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.indiaEntity,
  url: siteUrl,
  description: siteConfig.description,
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "5th Floor, Sufi Chambers, Road No. 1, Banjara Hills",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500034",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "245 East Gun Hill Road, Suite #6E",
      addressLocality: "Bronx",
      addressRegion: "NY",
      postalCode: "10467",
      addressCountry: "US",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {/* Background atmosphere — sits behind everything on this page */}
      <Atmosphere />
      <div className="relative z-10">
        <HeroEditorial />
        <Positioning />
        <ServicesIndex />
        <AiEditorial />
        <TalentHuman />
        <TechEcosystem />
        <HyderabadSection />
        <InternationalPresence />
        <AboutBand />
        <PrinciplesSection />
        <FinalCTA />
      </div>
    </>
  );
}
