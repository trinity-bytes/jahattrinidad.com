const { chromium } = require('playwright');
const [url, w, h, out] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/chromium' });
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  await p.emulateMedia({ reducedMotion: 'reduce' });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { await document.fonts.ready; for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); document.querySelector('astro-dev-toolbar')?.remove(); });
  await p.waitForTimeout(600);
  const t = await p.evaluate(() => { const e = [...document.querySelectorAll('h3,h2')].find(x => x.textContent.includes('zero-dependency')); return e ? e.getClientRects().length + ' rects, h=' + e.getBoundingClientRect().height : 'none'; });
  console.log(t, await p.evaluate(() => document.documentElement.scrollHeight));
  await p.screenshot({ path: out, fullPage: true }); await b.close();
})();
