const sharp=require('/mnt/files/Projects/portfolio/node_modules/sharp');
(async()=>{const [f,s]=process.argv.slice(2);const A=await sharp(f).removeAlpha().raw().toBuffer({resolveWithObject:true}),B=await sharp(s).removeAlpha().raw().toBuffer({resolveWithObject:true});const w=A.info.width,h=Math.min(A.info.height,B.info.height);
const bands=[];let tot=0;for(let y=0;y<h;y+=500){let n=0,c=0;for(let yy=y;yy<Math.min(h,y+500);yy++)for(let x=0;x<w;x++){const i=(yy*w+x)*3,j=(yy*B.info.width+x)*3;const d=Math.abs(A.data[i]-B.data[j])+Math.abs(A.data[i+1]-B.data[j+1])+Math.abs(A.data[i+2]-B.data[j+2]);if(d>60)n++;c++}tot+=n;bands.push((100*n/c).toFixed(1))}
console.log(A.info.width+'x'+A.info.height,B.info.width+'x'+B.info.height,'diff%',(100*tot/(w*h)).toFixed(2),'bands500',bands.join(' '))})();
