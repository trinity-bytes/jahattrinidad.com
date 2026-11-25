const sharp = require(require.resolve('sharp',{paths:[process.env.REPO_ROOT||process.cwd(),__dirname+'/../../../..']}));
const [a, b, out, w = '700'] = process.argv.slice(2);
(async () => {
  const W = +w;
  const A = await sharp(a).resize({ width: W }).png().toBuffer({ resolveWithObject: true });
  const B = await sharp(b).resize({ width: W }).png().toBuffer({ resolveWithObject: true });
  const H = Math.max(A.info.height, B.info.height);
  await sharp({ create: { width: W * 2 + 20, height: H, channels: 3, background: '#ff00ff' } })
    .composite([{ input: A.data, left: 0, top: 0 }, { input: B.data, left: W + 20, top: 0 }]).png().toFile(out);
})();
