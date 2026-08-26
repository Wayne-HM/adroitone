import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { OFFICES } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How AdroitOne collects, uses, and protects information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="August 2026"
      intro="We collect as little as possible, use it only to respond to you, and never sell it."
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "When you submit our contact form, we collect the information you provide: your name, work email, company, phone number (if shared), service interest, engagement range, and message.",
            "Like most websites, basic technical information (such as IP address and browser type) may be processed for security and abuse prevention.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: [
            "Information submitted through this site is used solely to review and respond to your inquiry. We do not sell, rent, or trade personal information.",
            "If analytics is enabled on this site, it is used in aggregate to understand how the site is used — not to build individual profiles.",
          ],
        },
        {
          heading: "Where it goes",
          paragraphs: [
            "Form submissions are transmitted securely to AdroitOne and may be processed by infrastructure providers acting on our behalf (for example, email delivery services). We choose providers carefully and require appropriate safeguards.",
          ],
        },
        {
          heading: "Retention & your choices",
          paragraphs: [
            "We keep inquiry-related information only as long as needed to handle your request and any follow-up, unless a longer period is required by law.",
            `You may ask us to access, correct, or delete the personal information you've sent us by contacting either entity below: ${OFFICES.newYork.entity} (New York, USA) or ${OFFICES.hyderabad.entity}, ${OFFICES.hyderabad.lines.join(", ")}.`,
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "We apply reasonable technical and organizational measures to protect information submitted through this site. No method of transmission over the internet is perfectly secure, and we cannot guarantee absolute security.",
          ],
        },
      ]}
    />
  );
}
