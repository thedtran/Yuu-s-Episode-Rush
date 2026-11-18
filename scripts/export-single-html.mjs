import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');
const outPath = path.join(distDir, 'bigcartel-maintenance.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found; run vite build first.');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// Inline stylesheet(s)
html = html.replace(
  /<link\s+rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
  (_match, href) => {
    const cleanPath = path.join(distDir, href.replace(/^\//, ''));
    if (!fs.existsSync(cleanPath)) return _match;
    const css = fs.readFileSync(cleanPath, 'utf8');
    return `<style>${css}</style>`;
  }
);

// Inline module script(s) safely
html = html.replace(
  /<script\s+type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g,
  (_match, src) => {
    const cleanPath = path.join(distDir, src.replace(/^\//, ''));
    if (!fs.existsSync(cleanPath)) return _match;
    const js = fs.readFileSync(cleanPath, 'utf8').replace(/<\/script/gi, '<\\/script');
    return `<script type="module">${js}</script>`;
  }
);

fs.writeFileSync(outPath, html, 'utf8');
const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
console.log(`Generated single-file Big Cartel Maintenance HTML: dist/bigcartel-maintenance.html (${kb} KB)`);
