/**
 * Generates favicons and the default Open Graph image into /public.
 * Run with: npm run brand-assets
 * Re-run after changing brand colours or the share photo.
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const INK = '#0e0f11';
const PAPER = '#f4f2ed';
const LIME = '#d4f500';
const AST =
  'M10.4 1h3.2l-.5 7.5 6.3-4.1 1.6 2.8-6.8 3.3 6.8 3.3-1.6 2.8-6.3-4.1.5 7.5h-3.2l.5-7.5-6.3 4.1-1.6-2.8 6.8-3.3-6.8-3.3 1.6-2.8 6.3 4.1z';

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="${INK}"/>
  <g transform="translate(11 11) scale(1.75)"><path d="${AST}" fill="${LIME}"/></g>
</svg>`;

await writeFile('public/favicon.svg', favicon);
await sharp(Buffer.from(favicon)).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(Buffer.from(favicon)).resize(180, 180).flatten({ background: INK }).png().toFile('public/apple-touch-icon.png');

// Open Graph image: 1200×630 — lime panel with condensed type, photo on the right.
const W = 1200;
const H = 630;
const PW = 470;
const photo = await sharp('src/assets/img/fashion-yellow.jpg').resize(PW - 40, H - 80, { fit: 'cover', position: 'attention' }).toBuffer();
const mask = Buffer.from(`<svg width="${PW - 40}" height="${H - 80}"><rect width="100%" height="100%" rx="22" fill="#fff"/></svg>`);
const rounded = await sharp(photo).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();

const COND = "Impact, 'Arial Narrow Bold', 'Arial Black', sans-serif";
const type = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${LIME}"/>
  <rect x="56" y="52" width="350" height="44" rx="22" fill="${INK}"/>
  <text x="231" y="81" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="17" letter-spacing="1" fill="${PAPER}">CREATIVE · ADVERTISING · FILM</text>
  <text x="52" y="300" font-family="${COND}" font-size="160" textLength="580" lengthAdjust="spacingAndGlyphs" fill="${INK}">THE PUBLIC</text>
  <text x="52" y="462" font-family="${COND}" font-size="160" textLength="496" lengthAdjust="spacingAndGlyphs" fill="${INK}">FICTION!</text>
  <text x="56" y="560" font-family="Arial, sans-serif" font-weight="700" font-size="30" fill="${INK}">We make brands impossible to ignore.</text>
  <g transform="translate(566 370) scale(3.6)"><path d="${AST}" fill="${INK}"/></g>
</svg>`;

await sharp(Buffer.from(type))
  .composite([{ input: rounded, left: W - PW + 10, top: 40 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og.jpg');

console.log('Brand assets written to /public');
