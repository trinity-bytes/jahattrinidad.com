// ===== PARAMETERS (edit only these) =====
const KEYS = ['g1440'];      // payload keys to build; each needs one uploaded payload-<key>.svg on the page
const PAGE_ID = '2446:60';   // "As built · Work & projects" (use your own page id elsewhere)
const BOARD_Y = 120;         // board y; caption goes at y 40
// Board name, x and caption come from the payload (see payload.cjs).
// use_figma call: fileKey gq6glEp9QrPOnEyYG9dldh, skillNames "resource:figma-use" (load that skill first).
// Returns per key: board id and "imgKey=nodeId ..." for the image upload step.
// WARNING: running a key again needs a fresh payload upload; delete the old board first.
// ========================================
const p = await figma.getNodeByIdAsync(PAGE_ID); await figma.setCurrentPageAsync(p);
const fam=f=>f.includes('Epilogue')?'Epilogue':f.includes('Hanken')?'Hanken Grotesk':f.includes('IBM')?'IBM Plex Mono':'Inter';
const avail=await figma.listAvailableFontsAsync();
const styles={};for(const a of avail)(styles[a.fontName.family]=styles[a.fontName.family]||new Set()).add(a.fontName.style);
const font=(f,w)=>{const F=fam(f);const names={400:['Regular'],500:['Medium'],600:['SemiBold','Semi Bold'],700:['Bold'],800:['ExtraBold','Extra Bold']}[w]||['Regular'];return {family:F,style:names.find(n=>styles[F].has(n))||'Regular'}};
const loaded=new Set();const load=async f=>{const k=f.family+f.style;if(!loaded.has(k)){await figma.loadFontAsync(f);loaded.add(k)}};
const rgb=c=>({r:Math.min(1,c[0]/255),g:Math.min(1,c[1]/255),b:Math.min(1,c[2]/255)});
const paint=c=>({type:'SOLID',color:rgb(c),opacity:c[3]});
const utf8=b=>{let s='',i=0;while(i<b.length){let c=b[i++];if(c>=240){c=((c&7)<<18)|((b[i++]&63)<<12)|((b[i++]&63)<<6)|(b[i++]&63)}else if(c>=224){c=((c&15)<<12)|((b[i++]&63)<<6)|(b[i++]&63)}else if(c>=192){c=((c&31)<<6)|(b[i++]&63)}s+=String.fromCodePoint(c)}return s};
const out={};
for(const key of KEYS){
const holders=p.findAll(n=>n.name.startsWith('PAYLOAD-'+key+' '));if(holders.length!==1)throw new Error('payload '+key+' '+holders.length);
const d=JSON.parse(utf8(figma.base64Decode(holders[0].name.split(' ')[1])));
const board=figma.createFrame();p.appendChild(board);board.name=d.name;board.resize(d.W,d.H);board.x=d.x;board.y=BOARD_Y;board.clipsContent=true;board.fills=[paint([250,246,232,1])];
const imgs={};const errors=[];
for(const g of d.groups){const sec=figma.createFrame();board.appendChild(sec);sec.name=g.nav?'Nav':g.name;sec.resize(d.W,Math.max(1,g.h));sec.x=0;sec.y=g.y;sec.fills=[];sec.clipsContent=false;
 for(const pl of g.plates){const r=figma.createRectangle();sec.appendChild(r);r.name='bg / plate (site background render)';r.resize(d.W,pl.h);r.x=0;r.y=pl.y;r.fills=[paint([200,200,200,1])];r.locked=true;imgs[pl.key]=r.id}
 const items=[...g.items.filter(i=>i.t!=='T'),...g.items.filter(i=>i.t==='T')];
 for(const it of items){try{let n;
  if(it.t==='R'){n=figma.createRectangle();sec.appendChild(n);n.name=it.name;n.resize(Math.max(.1,it.w),Math.max(.1,it.h));n.fills=it.f?[paint(it.f)]:[];[n.topLeftRadius,n.topRightRadius,n.bottomRightRadius,n.bottomLeftRadius]=it.r;
   if(it.s){n.strokes=[paint(it.s)];n.strokeAlign='INSIDE';[n.strokeTopWeight,n.strokeRightWeight,n.strokeBottomWeight,n.strokeLeftWeight]=it.bw;if(it.dash)n.dashPattern=[4,4]}
   if(it.sh.length&&it.f)n.effects=it.sh.map(s=>({type:'DROP_SHADOW',color:{...rgb(s.c),a:s.c[3]},offset:{x:s.x,y:s.y},radius:Math.max(0,s.b),spread:s.s,visible:true,blendMode:'NORMAL'}));n.opacity=it.o}
  else if(it.t==='I'){n=figma.createRectangle();sec.appendChild(n);n.name=it.name;n.resize(it.w,it.h);n.fills=[paint([200,200,200,1])];imgs[it.key]=n.id}
  else if(it.t==='V'){n=figma.createNodeFromSvg(it.svg);sec.appendChild(n);n.name='Icon';n.fills=[];n.opacity=it.o}
  else{const f=font(it.f,it.wt);await load(f);n=figma.createText();sec.appendChild(n);n.fontName=f;n.characters=it.s;n.fontSize=it.s==='● ● ●'?it.fs*0.8:it.fs;n.lineHeight={unit:'PIXELS',value:it.lh};n.letterSpacing={unit:'PIXELS',value:it.ls||0};n.fills=[paint(it.c)];if(it.u)n.textDecoration='UNDERLINE';n.textAutoResize='WIDTH_AND_HEIGHT';n.opacity=it.o;n.name=it.s.slice(0,60)}
  n.x=it.x;n.y=it.y-g.y;
 }catch(e){errors.push(it.t+' '+(it.s||it.name||'')+' '+e.message)}}
}
const cap=figma.createText();p.appendChild(cap);const cf={family:'IBM Plex Mono',style:'Regular'};await load(cf);cap.fontName=cf;cap.fontSize=12;cap.lineHeight={unit:'PIXELS',value:18};cap.characters=d.caption;cap.textAutoResize='HEIGHT';cap.resize(d.W,54);cap.x=d.x;cap.y=BOARD_Y-80;cap.name='Caption — '+d.name;
holders[0].parent.type==='PAGE'?holders[0].remove():holders[0].parent.remove();
out[key]={board:board.id,caption:cap.id,imgs:Object.entries(imgs).map(e=>e.join('=')).join(' '),errors:errors.slice(0,5),n:errors.length};
}
return out;
