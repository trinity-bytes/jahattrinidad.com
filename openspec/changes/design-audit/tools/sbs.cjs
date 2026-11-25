// usage: node sbs.cjs fig.png site.png prefix sliceH [from to]
const sharp=require(require.resolve('sharp',{paths:[process.env.REPO_ROOT||process.cwd(),__dirname+'/../../../..']}));
(async()=>{const [f,s,pre,sh,from,to]=process.argv.slice(2);const H=+sh;const a=await sharp(f).metadata(),c=await sharp(s).metadata();const max=Math.max(a.height,c.height);console.log('fig',a.width,a.height,'site',c.width,c.height);
const st=+(from||0),en=Math.min(+(to||max),max);let n=0;for(let y=st;y<en;y+=H,n++){const parts=[];for(const [file,m,left] of [[f,a,0],[s,c,a.width+24]]){if(y>=m.height)continue;parts.push({input:await sharp(file).extract({left:0,top:y,width:m.width,height:Math.min(H,m.height-y)}).toBuffer(),left,top:0})}
await sharp({create:{width:a.width+c.width+24,height:H,channels:3,background:'#ff00ff'}}).composite(parts).png().toFile(pre+'-'+n+'.png')}console.log(n)})();
