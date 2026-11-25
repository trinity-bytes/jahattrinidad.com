// node payload.cjs <dir> "<board name>" "<source board text>" <x>
// reads <dir>/data.json, writes payload-<dir>.svg
const fs = require('fs');
const [dir, name, src, x] = process.argv.slice(2);
if (x === undefined) throw new Error('usage: node payload.cjs <dir> "<name>" "<source>" <x>');
const j = JSON.parse(fs.readFileSync(`${dir}/data.json`));
delete j.imgs;
j.name = name;
j.x = +x;
j.caption = `Source board: ${src}\n2026-11-25\nmatches 127.0.0.1:4321 as of commit 5a0977a`;
const b = Buffer.from(JSON.stringify(j)).toString('base64');
fs.writeFileSync(`payload-${dir}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect id="PAYLOAD-${dir} ${b}" width="10" height="10" fill="#000"/></svg>`);
console.log(dir, b.length);
