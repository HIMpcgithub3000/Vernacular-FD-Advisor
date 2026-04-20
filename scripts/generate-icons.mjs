import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';

function drawRoundedRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
    return;
  }
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
  ctx.fill();
}

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0A0F0A';
  drawRoundedRect(ctx, 0, 0, size, size, size * 0.22);

  ctx.fillStyle = '#A3E635';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.38, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0A0F0A';
  ctx.font = `bold ${size * 0.28}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FG', size / 2, size / 2);

  return canvas.toBuffer('image/png');
}

mkdirSync('public/icons', { recursive: true });
writeFileSync('public/icons/icon-192.png', generateIcon(192));
writeFileSync('public/icons/icon-512.png', generateIcon(512));
console.log('Icons generated!');

