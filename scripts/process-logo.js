const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = "C:/Users/known/OneDrive/Desktop/adr.png";
const OUT_DIR = path.join(__dirname, "..", "public", "images");

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // 1. Load raw pixels
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // 2. Luminance-key the black background → alpha; unpremultiply color
  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const lum = Math.max(r, g, b);
    let na;
    if (lum < 10) na = 0;
    else if (lum > 245) na = 255;
    else na = lum;
    if (na > 0 && na < 255) {
      const f = 255 / na;
      data[o] = Math.min(255, Math.round(r * f));
      data[o + 1] = Math.min(255, Math.round(g * f));
      data[o + 2] = Math.min(255, Math.round(b * f));
    }
    data[o + 3] = Math.min(data[o + 3], na);
  }

  const rawPath = path.join(__dirname, "logo-raw.png");
  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(rawPath);

  // 3. Trim transparent margins → final lockup
  const finalPath = path.join(OUT_DIR, "adroitone-logo.png");
  const finalMeta = await sharp(rawPath)
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(finalPath);
  console.log("logo:", finalMeta.width, "x", finalMeta.height);

  // 4. Favicon: crop the symbol (top portion), trim, square-pad
  const symbolH = Math.round(finalMeta.height * 0.52);
  const symbolBuf = await sharp(finalPath)
    .extract({ left: 0, top: 0, width: finalMeta.width, height: symbolH })
    .toBuffer();
  const symMeta = await sharp(symbolBuf).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const side = Math.round(Math.max(symMeta.info.width, symMeta.info.height) * 1.18);
  const iconPath = path.join(__dirname, "..", "app", "icon.png");
  await sharp(symbolBuf)
    .extend({
      top: Math.round((side - symMeta.info.height) / 2),
      bottom: Math.round((side - symMeta.info.height) / 2),
      left: Math.round((side - symMeta.info.width) / 2),
      right: Math.round((side - symMeta.info.width) / 2),
      background: { r: 5, g: 6, b: 10, alpha: 1 },
    })
    .resize(512, 512)
    .png()
    .toFile(iconPath);
  console.log("icon: 512 x 512");

  fs.unlinkSync(rawPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
