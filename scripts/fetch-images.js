/**
 * Downloads editorial photography into public/images.
 *
 * City imagery: Wikipedia/Wikimedia (guaranteed-correct subjects, free licenses).
 * Workplace imagery: Unsplash direct CDN.
 *
 * Replace any file in public/images with licensed company photography later —
 * filenames stay the same, no code changes needed.
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public", "images");
const UA = "AdroitOne-site-build/1.0 (contact: dev local)";

async function download(url, dest, headers = {}) {
  const res = await fetch(url, { headers: { "User-Agent": UA, ...headers } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const type = res.headers.get("content-type") ?? "";
  const buf = Buffer.from(await res.arrayBuffer());
  if (!type.startsWith("image/") && !type.includes("octet-stream"))
    throw new Error(`not an image (${type}): ${url}`);
  if (buf.length < 20000) throw new Error(`too small (${buf.length}b): ${url}`);
  fs.writeFileSync(dest, buf);
  console.log("ok ", path.basename(dest), Math.round(buf.length / 1024) + "kb", type);
}

async function commonsFile(title, dest) {
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    title
  )}?width=1600`;
  await download(url, dest);
}

async function wikiSummaryImage(article, dest) {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${article}`,
    { headers: { "User-Agent": UA } }
  );
  if (!res.ok) throw new Error(`summary ${res.status} ${article}`);
  const json = await res.json();
  const src = json.originalimage?.source ?? json.thumbnail?.source ?? null;
  if (!src) throw new Error(`no image for ${article}`);
  const file = decodeURIComponent(src.split("/").pop() ?? "");
  await commonsFile(file, dest);
}

async function unsplash(id, dest) {
  await download(
    `https://images.unsplash.com/${id}?w=1800&q=80&auto=format&fit=crop`,
    dest
  );
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  // Hyderabad — HITEC City aerial (confirmed to exist via article summary)
  try {
    await commonsFile(
      "Aerial view of Durgam cheruvu and Hitech CIty.jpg",
      path.join(OUT, "hyderabad.jpg")
    );
  } catch (e) {
    console.log("primary hyderabad failed:", e.message);
    await wikiSummaryImage("Hyderabad", path.join(OUT, "hyderabad.jpg"));
  }

  // New York — known panorama, fall back to article image
  try {
    await commonsFile(
      "Lower Manhattan from Jersey City November 2014 panorama 3.jpg",
      path.join(OUT, "nyc.jpg")
    );
  } catch (e) {
    console.log("primary nyc failed:", e.message);
    await wikiSummaryImage("New_York_City", path.join(OUT, "nyc.jpg"));
  }

  // Workplace / technology
  await unsplash("photo-1519389950473-47ba0277781c", path.join(OUT, "team.jpg"));
  await unsplash("photo-1531482615713-2afd69097998", path.join(OUT, "engineering.jpg"));
  await unsplash("photo-1555066931-4365d14bab8c", path.join(OUT, "code.jpg"));
  await unsplash("photo-1497366216548-37526070297c", path.join(OUT, "office.jpg"));
  await unsplash("photo-1486406146926-c627a92ad1ab", path.join(OUT, "architecture.jpg"));
  await unsplash("photo-1454165804606-c3d57bc86b40", path.join(OUT, "planning.jpg"));
  await unsplash("photo-1558494949-ef010cbdcc31", path.join(OUT, "server.jpg"));

  console.log("all images downloaded");
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
