import fs from 'fs';
import path from 'path';

fs.mkdirSync('d:/makemyinvites/public/templates/modern-serenity', { recursive: true });
fs.copyFileSync(
  'C:/Users/talks/.gemini/antigravity/brain/c9ee04bb-6e31-47dd-b247-18bc68a0d197/modern_serenity_preview_1775902023567.png',
  'd:/makemyinvites/public/templates/modern-serenity/preview.jpg'
);
console.log('Preview image copied successfully.');
