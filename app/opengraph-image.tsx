import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #05060a 0%, #0a0d18 55%, #101530 100%)",
          color: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(61,99,255,0.28) 0%, rgba(138,124,255,0.12) 45%, transparent 70%)",
            top: -180,
            right: -120,
          }}
        />
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>
          Adroit
          <span
            style={{
              backgroundImage:
                "linear-gradient(100deg, #a9b6ff, #43d9e6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            One
          </span>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 34,
            letterSpacing: 1,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Talent. Automation. Delivery.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 20,
            letterSpacing: 8,
            color: "rgba(255,255,255,0.38)",
          }}
        >
          NEW YORK × HYDERABAD
        </div>
      </div>
    ),
    size
  );
}
