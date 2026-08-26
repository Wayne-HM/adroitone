const sharp = require("sharp");
const path = require("path");

const LOGO = path.join(__dirname, "..", "public", "images", "adroitone-logo.png");
const OUT = path.join(__dirname, "..", "app", "icon.png");

async function main() {
  const { data, info } = await sharp(LOGO).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Opaque pixel count per row
  const rowCounts = [];
  for (let y = 0; y < height; y++) {
    let c = 0;
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * channels + 3] > 10) c++;
    }
    rowCounts.push(c);
  }

  // First content band = the symbol
  let top = rowCounts.findIndex((c) => c > 0);
  let bottom = top;
  while (bottom + 1 < height && rowCounts[bottom + 1] > 0) bottom++;

  console.log("symbol rows:", top, "→", bottom, "of", height);

  // Horizontal bounds within that band
  let left = width, right = 0;
  for (let y = top; y <= bottom; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * channels + 3] > 10) {
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }
  const w = right - left + 1;
  const h = bottom - top + 1;
  console.log("symbol box:", left, top, w, "x", h);

  const buf = await sharp(LOGO)
    .extract({ left, top, width: w, height: h })
    .toBuffer();

  const side = Math.round(Math.max(w, h) * 1.3);
  await sharp(buf)
    .extend({
      top: Math.round((side - h) / 2),
      bottom: side - h - Math.round((side - h) / 2),
      left: Math.round((side - w) / 2),
      right: side - w - Math.round((side - w) / 2),
      background: { r: 5, g: 6, b: 10, alpha: 1 },
    })
    .resize(512, 512)
    .png()
    .toFile(OUT);
  console.log("icon rewritten");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
