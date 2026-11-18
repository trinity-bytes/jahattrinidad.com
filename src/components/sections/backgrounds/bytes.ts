// plex-mono-digits.woff2: IBM Plex Mono Regular (SIL OFL, see src/assets/fonts/ibmplexmono/OFL.txt)
// subset to space, 0 and 1 so the byte SVG renders in the brand font. Regenerate with fonttools:
//   pyftsubset src/assets/fonts/ibmplexmono/ibmplexmono-regular.woff2 --unicodes=U+20,U+30-31 \
//     --flavor=woff2 --output-file=src/components/sections/backgrounds/plex-mono-digits.woff2
import plexDigits from './plex-mono-digits.woff2?inline';

/** Generate the same decorative field for a given section on every build. */
export function bytesImage(seed: number, highlighted = false): string {
  let state = seed >>> 0 || 1;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const entries: string[] = [];
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 20; col++) {
      const x = col * 72 + Math.round(random() * 5);
      const y = row * 20 + Math.round(random() * 2);
      const value = random();
      const byte = row === 1 && col === 16 ? '01001010' : value < 0.12 ? '01001010' : value < 0.24 ? '01010100' : Math.floor(random() * 256).toString(2).padStart(8, '0');
      if ((row === 1 && col === 16) === highlighted) {
        entries.push(`<text x="${x}" y="${y}">${byte}</text>`);
      }
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="320" viewBox="0 0 1440 320"><style>@font-face{font-family:PlexDigits;src:url(${plexDigits}) format('woff2');font-weight:400}</style><g fill="white" font-family="PlexDigits,monospace" font-size="12">${entries.join('')}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
