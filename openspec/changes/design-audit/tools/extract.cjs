// node extract.cjs <slug> <width> <outdir> [peek]
const {chromium}=require('playwright');const fs=require('fs');const sharp=require(require.resolve('sharp',{paths:[process.env.REPO_ROOT||process.cwd(),__dirname+'/../../../..']}));
(async()=>{const [slug,w,out,peek]=process.argv.slice(2);const W=+w,H={1440:900,768:1024,390:844}[W];fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium'});const p=await b.newPage({reducedMotion:'reduce',viewport:{width:W,height:H}});
await p.goto('http://127.0.0.1:4321/'+(slug==='home'?'':slug+'/'),{waitUntil:'networkidle'});if(process.env.LENS==='inside'){await p.evaluate(()=>{document.documentElement.dataset.lens='inside'});await p.waitForTimeout(800);}
await p.evaluate(async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}scrollTo(0,0);await Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,8000))]);document.querySelector('astro-dev-toolbar')?.remove()});
await p.waitForTimeout(700);
let peekClip=null;
if(peek){const h=await p.evaluateHandle(()=>[...document.querySelectorAll('h3')].find(e=>e.innerText.trim()==='Lock Keys OSD').closest('li,article'));await h.asElement().scrollIntoViewIfNeeded();await h.asElement().hover();await p.waitForTimeout(1200);}
// full-page capture resizes nothing but keeps hover state
await p.screenshot({path:out+'/site.png',fullPage:true});
const data=await p.evaluate(({peek})=>{
const W=innerWidth,sy=scrollY;const cv=document.createElement('canvas');cv.width=cv.height=1;const cx=cv.getContext('2d',{willReadFrequently:true});
const col=c=>{cx.clearRect(0,0,1,1);cx.fillStyle='#000';cx.fillStyle=c;cx.fillRect(0,0,1,1);const d=cx.getImageData(0,0,1,1).data;let a=d[3]/255;const m=c.match(/(?:rgba\([^)]*,\s*|\/\s*)([\d.]+)\)\s*$/);if(m)a=+m[1];if(c==='transparent')a=0;
 if(a>0&&a<1){const m2=c.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(m2)return [+m2[1],+m2[2],+m2[3],a];const m3=c.match(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)/);if(m3)return [m3[1]*255,m3[2]*255,m3[3]*255,a]}return [d[0],d[1],d[2],a]};
const R=n=>Math.round(n*100)/100;
const main=document.querySelector('main');
const secEls=[...main.children,...document.querySelectorAll('body > footer, footer.footer')].filter((e,i,a)=>e.tagName!=='SCRIPT'&&e.getBoundingClientRect().height>0&&a.indexOf(e)===i);
const nav=document.querySelector('header.site-nav');
const groups=[...secEls.map(e=>{const r=e.getBoundingClientRect();const h=e.querySelector('h1,h2');return {el:e,name:(e.className.toString().split(' ')[0]||e.tagName.toLowerCase())+(h?' — '+h.innerText.replace(/\s+/g,' ').slice(0,50):''),y:r.top+scrollY,h:r.height,items:[]}}),{el:nav,name:'Nav',y:0,h:nav.getBoundingClientRect().height,items:[],nav:true}];
const visible=el=>{for(let c=el;c&&c!==document.documentElement;c=c.parentElement){const s=getComputedStyle(c);if(s.display==='none'||+s.opacity===0)return false;const r=c.getBoundingClientRect();if((r.width<=1||r.height<=1)&&s.overflow!=='visible')return false}return getComputedStyle(el).visibility!=='hidden'};
const opac=el=>{let o=1;for(let c=el;c;c=c.parentElement)o*=+getComputedStyle(c).opacity;return R(o)};
const clipOf=el=>{let L=0,T=-1e9,Rr=W,B=1e9;for(let c=el.parentElement;c&&c!==document.body&&c!==document.documentElement;c=c.parentElement){const s=getComputedStyle(c);if(s.overflowX!=='visible'){const r=c.getBoundingClientRect();L=Math.max(L,r.left);Rr=Math.min(Rr,r.right)}if(s.overflowY!=='visible'){const r=c.getBoundingClientRect();T=Math.max(T,r.top+scrollY);B=Math.min(B,r.bottom+scrollY)}}return {L,T,R:Rr,B}};
let imgN=0;const imgs=[],hide=[];
for(const g of groups){const add=o=>g.items.push(o);
 const walk=el=>{const tag=el.tagName;if(['SCRIPT','STYLE','TEMPLATE','NOSCRIPT'].includes(tag))return;if(el.classList&&(el.classList.contains('visually-hidden')||el.classList.contains('skip-link')))return;const s=getComputedStyle(el);if(s.display==='none'||+s.opacity===0)return;
  const r=el.getBoundingClientRect();const vis=s.visibility!=='hidden';const x=r.left,y=r.top+scrollY,wd=r.width,ht=r.height;const full=wd>=W-2;const cl=clipOf(el);const inview=x<cl.R-0.5&&x+wd>cl.L+0.5&&y<cl.B&&y+ht>cl.T;
  if((tag==='IMG'||tag==='VIDEO'||tag==='CANVAS'||tag==='svg')){if(vis&&inview&&!full&&wd>1&&ht>1){if(tag==='svg'&&wd<=64&&ht<=64){const c=el.cloneNode(true);const src=[el,...el.querySelectorAll('*')],dst=[c,...c.querySelectorAll('*')];src.forEach((n,i)=>{const cs=getComputedStyle(n);if(n!==el){for(const [a,v] of [['fill',cs.fill],['stroke',cs.stroke]]){const k=v.startsWith('url')||v==='none'?v:(()=>{const q=col(v);return `rgb(${q.slice(0,3).map(Math.round)})`})();dst[i].setAttribute(a,k)}dst[i].setAttribute('stroke-width',parseFloat(cs.strokeWidth))}else{for(const [a,v] of [['fill',cs.fill],['stroke',cs.stroke]]){const q=col(v);dst[i].setAttribute(a,v==='none'?'none':`rgb(${q.slice(0,3).map(Math.round)})`)}dst[i].setAttribute('stroke-width',parseFloat(cs.strokeWidth))}dst[i].removeAttribute('class');dst[i].removeAttribute('style')});c.setAttribute('width',wd);c.setAttribute('height',ht);c.setAttribute('xmlns','http://www.w3.org/2000/svg');add({t:'V',x:R(x),y:R(y),w:R(wd),h:R(ht),svg:c.outerHTML,o:opac(el)});hide.push([el,'svg'])}else{const key='i'+(imgN++);el.setAttribute('data-x',key);const bx=Math.max(x,cl.L),by=Math.max(y,cl.T);const bw=Math.min(x+wd,cl.R)-bx,bh=Math.min(y+ht,cl.B)-by;const name=(el.getAttribute('alt')||el.getAttribute('aria-label')||(el.currentSrc||'').split('/').pop().split('?')[0]||tag).slice(0,60);imgs.push({key,x:bx,y:by,w:bw,h:bh});add({t:'I',key,x:R(bx),y:R(by),w:R(bw),h:R(bh),name:'Image — '+name});hide.push([el,'img'])}}return}
  if(vis&&inview&&!full&&wd>1&&ht>1&&el!==g.el){const bg=col(s.backgroundColor);const bw=['Top','Right','Bottom','Left'].map(k=>s['border'+k+'Style']==='none'?0:parseFloat(s['border'+k+'Width']));const bcs=['Top','Right','Bottom','Left'].map(k=>col(s['border'+k+'Color']));const bi=bw.findIndex((v,i)=>v>0&&bcs[i][3]>0);const hasSh=s.boxShadow!=='none';
   if(s.backgroundImage==='none'&&!(s.maskImage&&s.maskImage!=='none')&&(bg[3]>0||bi>=0)){const rad=['TopLeft','TopRight','BottomRight','BottomLeft'].map(k=>{const v=s['border'+k+'Radius'];return Math.min(v.endsWith('%')?parseFloat(v)/100*wd:parseFloat(v),Math.min(wd,ht)/2)});
    const sh=[];if(hasSh){for(const part of s.boxShadow.split(/,(?![^(]*\))/)){if(part.includes('inset'))continue;const cm=part.match(/(rgba?\([^)]*\)|color\([^)]*\)|oklab\([^)]*\)|#\w+)/);const nums=part.replace(cm?cm[0]:'','').trim().split(/\s+/).map(parseFloat);if(cm)sh.push({c:col(cm[0]),x:nums[0]||0,y:nums[1]||0,b:nums[2]||0,s:nums[3]||0})}}
    const bx=Math.max(x,cl.L),by=Math.max(y,cl.T);add({t:'R',x:R(bx),y:R(by),w:R(Math.min(x+wd,cl.R)-bx),h:R(Math.min(y+ht,cl.B)-by),f:bg[3]>0?bg:null,s:bi>=0?bcs[bi]:null,bw:bi>=0?bw.map((v,i)=>bcs[i][3]>0?v:0):null,dash:bi>=0&&s.borderTopStyle==='dashed',r:rad.map(R),sh,o:opac(el),name:(el.className.toString().split(' ')[0]||tag.toLowerCase())});hide.push([el,'box'])}}
  if(tag==='INPUT'||tag==='TEXTAREA'){if(vis&&el.placeholder&&!el.value){const ps=getComputedStyle(el,'::placeholder');const fs_=parseFloat(s.fontSize);add({t:'T',x:R(x+parseFloat(s.paddingLeft)+parseFloat(s.borderLeftWidth)),y:R(y+(ht-fs_*1.3)/2),s:el.placeholder,f:s.fontFamily,wt:+s.fontWeight,fs:fs_,lh:R(fs_*1.3),ls:0,c:col(ps.color),o:opac(el)});hide.push([el,'ph'])}return}
  for(const n of el.childNodes){if(n.nodeType===1)walk(n);else if(n.nodeType===3&&n.textContent.trim()&&vis){textRuns(n,el,s)}}
 };
 const textRuns=(n,el,s)=>{const color=col(s.color);if(color[3]===0||s.webkitBackgroundClip==='text'||s.backgroundClip==='text'||parseFloat(s.fontSize)>=100)return;const fill=s.webkitTextFillColor;if(fill&&col(fill)[3]===0)return;
  const cl=clipOf(n.parentElement.firstChild?n.parentElement:el);const own=el.getBoundingClientRect();const so=getComputedStyle(el);if(own.width<=1&&so.overflow!=='visible')return;
  const rg=document.createRange();const str=n.textContent;let lines=[];let cur=null;
  for(let i=0;i<str.length;){const cp=str.codePointAt(i);const len=cp>0xffff?2:1;rg.setStart(n,i);rg.setEnd(n,i+len);const rs=rg.getClientRects();const ch=str.substr(i,len);i+=len;if(!rs.length)continue;const q=rs[rs.length-1];if(q.width<0.01)continue;const top=q.top+scrollY;
   let L=q.left,Rr=q.right;let cL=cl.L,cR=cl.R;if(so.overflowX!=='visible'){cL=Math.max(cL,own.left);cR=Math.min(cR,own.right)}if(L>cR-2||Rr<cL+1||top>cl.B-2||top+q.height<cl.T+2)continue;
   if(!cur||Math.abs(top-cur.top)>q.height*0.5){cur={top,h:q.height,x:L,r:Rr,s:''};lines.push(cur)}cur.s+=/\s/.test(ch)?' ':ch;if(!/\s/.test(ch)){cur.r=Math.max(cur.r,Rr)}}
  for(const l of lines){const lead=l.s.length-l.s.trimStart().length;if(lead){/* leading space width */rg.selectNodeContents(n)} l.s=l.s.replace(/\s+$/,'')}
  lines=lines.filter(l=>l.s.trim());if(!lines.length)return;
  const fs_=parseFloat(s.fontSize);const cssLh=s.lineHeight==='normal'?null:parseFloat(s.lineHeight);
  const tx=t=>s.textTransform==='uppercase'?t.toUpperCase():t;
  let grp=null;const flush=()=>{if(!grp)return;const pitch=grp.l.length>1?(grp.l[grp.l.length-1].top-grp.l[0].top)/(grp.l.length-1):(cssLh||grp.l[0].h);const mid=grp.l[0].top+grp.l[0].h/2;
   add({t:'T',x:R(grp.l[0].x),y:R(mid-pitch/2),s:grp.l.map(l=>tx(l.s)).join('\n'),f:s.fontFamily,wt:+s.fontWeight,fs:fs_,lh:R(pitch),ls:s.letterSpacing==='normal'?0:parseFloat(s.letterSpacing),c:color,o:opac(el),u:s.textDecorationLine.includes('underline'),rw:R(Math.max(...grp.l.map(l=>l.r-l.x)))});grp=null};
  for(const l of lines){if(l.s.startsWith(' ')){const t=l.s.trimStart();const c=document.createElement('canvas').getContext('2d');c.font=`${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;l.x+=c.measureText(l.s.slice(0,l.s.length-t.length)).width;l.s=t}
   if(grp&&Math.abs(l.x-grp.l[0].x)<1.5){grp.l.push(l)}else{flush();grp={l:[l]}}}flush();
  hide.push([el,'text'])};
 if(g.nav){walk(g.el)}else{walk(g.el)}
}
// nav is walked only in its own group
window.__hide=hide;
return {W,H:document.documentElement.scrollHeight,imgs,groups:groups.map(g=>({name:g.name,y:R(g.y),h:R(g.h),nav:!!g.nav,items:g.items}))};
},{peek:!!peek});
// isolated image captures
const iso=await p.addStyleTag({content:'html,body{background:transparent!important} body *{visibility:hidden!important} body [data-iso], body [data-iso] *{visibility:visible!important}'});
for(const im of data.imgs){await p.evaluate(k=>{document.querySelectorAll('[data-iso]').forEach(e=>e.removeAttribute('data-iso'));document.querySelector(`[data-x="${k}"]`).setAttribute('data-iso','')},im.key);
 await p.screenshot({path:`${out}/${im.key}.png`,fullPage:true,omitBackground:true,clip:{x:Math.max(0,im.x),y:im.y,width:Math.max(1,Math.min(im.w,W-Math.max(0,im.x))),height:Math.max(1,im.h)}})}
await iso.evaluate(e=>e.remove());
// plate
await p.evaluate(()=>{for(const [el,k] of window.__hide){const st=(a,v)=>el.style.setProperty(a,v,'important');if(k==='svg'||k==='img')st('opacity','0');if(k==='box'){st('background-color','transparent');st('border-color','transparent');st('box-shadow','none')}if(k==='text'){st('-webkit-text-fill-color','transparent');st('text-decoration-color','transparent');st('text-shadow','none')}if(k==='ph'){const t=document.createElement('style');t.textContent='::placeholder{color:transparent!important;-webkit-text-fill-color:transparent!important}';document.head.append(t)}}
 const t=document.createElement('style');t.textContent='*{transition:none!important}';document.head.append(t)});
await p.waitForTimeout(500);
await p.screenshot({path:out+'/plate.png',fullPage:true});
const meta=await sharp(out+'/plate.png').metadata();
const files={};let secs=data.groups;
if(peek)secs=secs.filter(g=>/Small experiments|more —/i.test(g.name)||g.items.some(i=>i.t==='T'&&i.s==='Lock Keys OSD'));
let pn=0;for(const g of secs){g.plates=[];if(g.nav)continue;const y0=Math.round(g.y),y1=Math.min(meta.height,Math.round(g.y+g.h));for(let y=y0;y<y1;y+=4000){const h=Math.min(4000,y1-y);const key='p'+(pn++);await sharp(out+'/plate.png').extract({left:0,top:y,width:W,height:h}).jpeg({quality:92,chromaSubsampling:'4:4:4'}).toFile(`${out}/${key}.jpg`);g.plates.push({key,y:y-y0,h});files[key]=key+'.jpg'}for(const it of g.items)if(it.t==='I')files[it.key]=it.key+'.png'}
for(const g of secs)if(g.nav)for(const it of g.items)if(it.t==='I')files[it.key]=it.key+'.png';
fs.writeFileSync(out+'/data.json',JSON.stringify({W,H:data.H,groups:secs,files}));
const c={};secs.forEach(g=>g.items.forEach(i=>c[i.t]=(c[i.t]||0)+1));console.log(out,data.H,JSON.stringify(c),Object.keys(files).length,'files',secs.map(g=>g.name).join(' | '));
await b.close()})();
