const sharp = require("sharp");
const fs = require("fs");
sharp("app/icon.png")
  .resize(256, 256)
  .png({ compressionLevel: 9 })
  .toBuffer()
  .then((b) => {
    fs.writeFileSync("app/icon.png", b);
    console.log("icon:", Math.round(b.length / 1024) + "kb");
  });
