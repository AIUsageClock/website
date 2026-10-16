// One-off helper: regenerates public/apple-touch-icon.png (180x180) from the 1024px app icon.
// It is a plain proportional downscale of the same artwork: no redrawing, no simplified variant.
// Run from the site folder:  node scripts/make-apple-touch-icon.mjs
// `sharp` is installed as a dependency of Astro (its image service), so nothing extra is needed.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('../src/assets/aiusageclockicon.png', import.meta.url));
const out = fileURLToPath(new URL('../public/apple-touch-icon.png', import.meta.url));

await sharp(src)
  .resize(180, 180, { fit: 'fill', kernel: 'lanczos3' })
  .png({ compressionLevel: 9 })
  .toFile(out);

const meta = await sharp(out).metadata();
console.log(`wrote ${out} (${meta.width}x${meta.height}, alpha=${meta.hasAlpha})`);
