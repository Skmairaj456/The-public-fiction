/**
 * Generates favicons and the default Open Graph image into /public.
 * Run with: npm run brand-assets
 * Re-run after changing the hero image or brand colours.
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const INK = '#141312';
const PAPER = '#ece8e1';
const SIGNAL = '#e2412b';

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${INK}"/>
  <text x="31" y="47" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="46" fill="${PAPER}">f</text>
  <circle cx="48" cy="45" r="4.5" fill="${SIGNAL}"/>
</svg>`;

await writeFile('public/favicon.svg', favicon);
await sharp(Buffer.from(favicon)).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(Buffer.from(favicon)).resize(180, 180).flatten({ background: INK }).png().toFile('public/apple-touch-icon.png');

// Open Graph image: 1200×630, campaign still on the right, type on paper.
const W = 1200;
const H = 630;
const photo = await sharp('src/assets/img/hero-yellow.jpg').resize(520, H, { fit: 'cover', position: 'attention' }).toBuffer();

const type = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <text x="56" y="84" font-family="Consolas, 'Courier New', monospace" font-size="20" letter-spacing="2" fill="${INK}">THE PUBLIC FICTION</text>
  <text x="56" y="300" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="76" letter-spacing="-3" fill="${INK}">WE MAKE</text>
  <text x="56" y="380" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="76" letter-spacing="-3" fill="${INK}">BRANDS</text>
  <text x="56" y="466" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="92" fill="${SIGNAL}">impossible</text>
  <text x="56" y="546" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="76" letter-spacing="-3" fill="${INK}">TO IGNORE.</text>
</svg>`;

await sharp(Buffer.from(type))
  .composite([{ input: photo, left: W - 520, top: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og.jpg');

console.log('Brand assets written to /public');
