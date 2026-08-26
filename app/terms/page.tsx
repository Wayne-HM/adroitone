import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { OFFICES } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "Terms governing use of the AdroitOne website and its content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="August 2026"
      intro="These terms govern your use of this website. By using it, you agree to them."
      sections={[
        {
          heading: "Purpose of this website",
          paragraphs: [
            "This website describes the capabilities of AdroitOne — including talent & search, AI & automation, software development, and IT services — and provides a way to contact us. It does not constitute an offer, a contract for services, or professional advice.",
            "Any engagement between you and AdroitOne is governed exclusively by a separate written agreement signed by both parties.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The text, design, graphics, and structure of this website are the property of AdroitOne and its entities. You may not reproduce or reuse them commercially without written permission.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You agree not to misuse this website — including attempting unauthorized access, submitting unlawful or misleading content through forms, or using automated tools to disrupt the service.",
          ],
        },
        {
          heading: "Content accuracy",
          paragraphs: [
            "We work to keep website content accurate and current, but capabilities described here may evolve. Nothing on this site should be relied upon as a warranty of specific results.",
            "Where illustrative examples are shown (such as case-study templates), they are clearly labeled and do not represent claims about specific clients or outcomes.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the maximum extent permitted by applicable law, AdroitOne is not liable for indirect or consequential damages arising from use of this website.",
          ],
        },
        {
          heading: "Governing entities",
          paragraphs: [
            `This website is operated by ${OFFICES.newYork.entity} (New York, USA) and ${OFFICES.hyderabad.entity}, ${OFFICES.hyderabad.lines.join(", ")}. Applicable law depends on the entity and jurisdiction relevant to your interaction with us; where a separate agreement exists, its terms control.`,
          ],
        },
      ]}
    />
  );
}
