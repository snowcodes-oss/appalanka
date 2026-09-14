/**
 * Generates the raster brand assets (icons, OG image) from the SVG sources.
 * Run: node scripts/brand-assets.mjs
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const GREEN = '#114237';
const mark = readFileSync('src/assets/mark.svg');
const logo = readFileSync('src/assets/logo.svg');

async function icon(size) {
  const pad = Math.round(size * 0.13);
  const inner = size - pad * 2;
  const radius = Math.round(size * 0.2);
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${GREEN}"/></svg>`,
  );
  const elephant = await sharp(mark)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp(bg).composite([{ input: elephant, left: pad, top: pad }]).png().toBuffer();
}

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = [];
  for (const { size, buf } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += buf.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.buf)]);
}

// Favicon .ico (16/32/48) + PNG icons
const icoImages = [];
for (const size of [16, 32, 48]) icoImages.push({ size, buf: await icon(size) });
writeFileSync('public/favicon.ico', ico(icoImages));
writeFileSync('public/apple-touch-icon.png', await icon(180));
writeFileSync('public/icon-192.png', await icon(192));
writeFileSync('public/icon-512.png', await icon(512));

// Open Graph image 1200x630: darkened photo of the room + logo
const W = 1200;
const H = 630;
const photo = await sharp('src/assets/images/salle-bar.jpg').resize(W, H, { fit: 'cover' }).toBuffer();
const tint = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#0d3128" fill-opacity="0.72"/></svg>`,
);
const logoPng = await sharp(logo).resize(720, null, { fit: 'inside' }).png().toBuffer();
const { width: lw, height: lh } = await sharp(logoPng).metadata();
await sharp(photo)
  .composite([
    { input: tint, left: 0, top: 0 },
    { input: logoPng, left: Math.round((W - lw) / 2), top: Math.round((H - lh) / 2) },
  ])
  .jpeg({ quality: 82, progressive: true })
  .toFile('public/og-image.jpg');

console.log('brand assets generated');
