
(function(){
  const NS='http://www.w3.org/2000/svg';
  const $=s=>document.querySelector(s);
  const f1=n=>Math.round(n*10)/10;
  const rng=s=>()=>(s=(s*16807)%2147483647)/2147483647;
  const SEA=()=>document.documentElement.dataset.mua;
  const IS=()=>SEA()==='tet';
  const BR=()=>SEA()==='tet'||SEA()==='xuan'||SEA()==='ha'||SEA()==='thu';

  /* ---------- cành đào ---------- */
  const IMG='tai-nguyen/anh/47e718aaf6.webp';
  const IMW=680.5,IMH=680.5,R0=[0,0],A0=[-69.2,-277.0],ANG=0,SC=1;
  const STEM0=[[624.2, 335.0], [564.7, 348.7], [513.7, 341.6], [469.2, 318.2], [421.8, 328.7], [363.2, 353.6], [310.3, 364.6], [265.7, 368.1], [217.4, 380.9], [167.2, 398.4], [107.7, 412.1], [51.0, 418.9], [37.6, 405.4]];
  const stemPts=STEM0.map(p=>{const x=(p[0]-R0[0])*SC,y=(p[1]-R0[1])*SC,a=ANG*Math.PI/180;return[A0[0]+x*Math.cos(a)-y*Math.sin(a),A0[1]+x*Math.sin(a)+y*Math.cos(a)]});
  const WISP=[[490.6, 58.0], [443.6, 95.6], [406.0, 128.5], [359.0, 142.6], [312.0, 175.5], [265.0, 194.3], [218.0, 194.3], [171.0, 184.9], [124.0, 166.1], [77.0, 152.0], [11.2, 119.1], [-59.3, 95.6]];const HAP=[[545.0,63.6],[494.6,44.0],[444.2,20.5],[393.8,10.4],[332.2,7.0],[287.4,8.2],[231.4,17.1],[186.6,37.3],[153.0,72.0],[119.4,106.7],[69.0,139.2],[7.4,168.3]],THP=[[545.0,28.1],[501.5,54.2],[424.0,70.6],[346.6,73.5],[259.5,78.4],[201.5,92.9],[157.9,141.3],[114.4,180.0],[75.6,228.4]];const stemY=x=>{const sp=SEA()==='ha'?HAP:(SEA()==='thu'?THP:stemPts);for(let i=0;i<sp.length-1;i++){const a=sp[i],b=sp[i+1];if(x<=a[0]&&x>=b[0])return a[1]+(b[1]-a[1])*(a[0]-x)/(a[0]-b[0]||1)}return x<sp[sp.length-1][0]?sp[sp.length-1][1]:sp[0][1]};
  const PIECES={coin:`<g><path d="M0 0V__L__" stroke="#E8B64B" stroke-width="1.1"/><g transform="translate(0 __L__)"><path d="M0 0V5" stroke="#DE6054" stroke-width="1.6"/><path d="M0 3C-8 3-9 12 0 15C9 12 8 3 0 3Z" fill="#DE6054" stroke="#B04A40" stroke-width=".8"/><path d="M-5.2 9H5.2M0 5V16" stroke="#B04A40" stroke-width=".8"/><path d="M0 15V27" stroke="#DE6054" stroke-width="1.5"/><circle cx="0" cy="37" r="9.2" fill="#F1C56B" stroke="#D8A650" stroke-width="1.3"/><circle cx="0" cy="37" r="6.8" fill="none" stroke="#FFE8B0" stroke-width=".9"/><rect x="-2.7" y="34.3" width="5.4" height="5.4" fill="#A8433A" stroke="#D8A650" stroke-width=".8"/><circle cx="0" cy="59" r="9.2" fill="#F1C56B" stroke="#D8A650" stroke-width="1.3"/><circle cx="0" cy="59" r="6.8" fill="none" stroke="#FFE8B0" stroke-width=".9"/><rect x="-2.7" y="56.3" width="5.4" height="5.4" fill="#A8433A" stroke="#D8A650" stroke-width=".8"/><circle cx="0" cy="81" r="9.2" fill="#F1C56B" stroke="#D8A650" stroke-width="1.3"/><circle cx="0" cy="81" r="6.8" fill="none" stroke="#FFE8B0" stroke-width=".9"/><rect x="-2.7" y="78.3" width="5.4" height="5.4" fill="#A8433A" stroke="#D8A650" stroke-width=".8"/><path d="M0 46V49.6" stroke="#DE6054" stroke-width="1.5"/><path d="M0 68V71.6" stroke="#DE6054" stroke-width="1.5"/><path d="M0 90V98" stroke="#DE6054" stroke-width="1.5"/><circle cx="0" cy="100" r="2.4" fill="#F1C56B" stroke="#D8A650" stroke-width=".7"/><path d="M-3.2 102H3.2L4.8 120H-4.8Z" fill="#DE6054" stroke="#B04A40" stroke-width=".7"/><path d="M-1.6 104V119M0 104V120M1.6 104V119" stroke="#B04A40" stroke-width=".6" opacity=".7"/></g></g>`,lan:`<g><path d="M0 0V__L__" stroke="#E8B64B" stroke-width="1.1"/><g transform="translate(0 __L__)"><rect x="-6" y="0" width="12" height="4" rx="1.2" fill="#F1C56B" stroke="#D8A650" stroke-width=".7"/><ellipse cx="0" cy="19" rx="18" ry="15.5" fill="#DE6054" stroke="#B04A40" stroke-width=".9"/><path d="M-9 5.5C-14 12-14 26-9 32.5M9 5.5C14 12 14 26 9 32.5M0 3.5V34.5" fill="none" stroke="#B04A40" stroke-width=".9" opacity=".75"/><path d="M-13 9C-8 4-3 3.8 0 3.8" fill="none" stroke="#FF8A70" stroke-width="1.4" stroke-linecap="round" opacity=".65"/><rect x="-7" y="33" width="14" height="4" rx="1.2" fill="#F1C56B" stroke="#D8A650" stroke-width=".7"/><path d="M0 37V42" stroke="#F1C56B" stroke-width="1.3"/><path d="M-3.4 42H3.4L4.6 55H-4.6Z" fill="#F1C56B" stroke="#D8A650" stroke-width=".6"/><path d="M-1.6 44V54M0 44V55M1.6 44V54" stroke="#D8A650" stroke-width=".6"/></g></g>`,env:`<g><path d="M0 0V__L__" stroke="#E8B64B" stroke-width="1.1"/><g transform="translate(0 __L__)"><circle cx="0" cy="0" r="2.3" fill="#F1C56B" stroke="#D8A650" stroke-width=".7"/><g transform="translate(-12 2)"><rect width="24" height="35" rx="2.6" fill="#DE6054" stroke="#B04A40" stroke-width=".9"/><path d="M0.6 1.4L12 13L23.4 1.4" fill="#CC5045" stroke="#B04A40" stroke-width=".8"/><circle cx="12" cy="21" r="5.8" fill="#F1C56B" stroke="#D8A650" stroke-width=".9"/><rect x="9.6" y="18.6" width="4.8" height="4.8" fill="#CC5045"/><path d="M4 31H20" stroke="#F1C56B" stroke-width="1.2" stroke-linecap="round"/></g></g></g>`};
  function branchSVG(orn){
    const NM=false;
    if(innerWidth<700&&!document.getElementById('tet-mb')){const st=document.createElement('style');st.id='tet-mb';st.textContent='html[data-mua=tet] .chime,html[data-mua=xuan] .chime{margin-top:112px!important}';document.head.appendChild(st)}
    let o=(NM?`<defs><linearGradient id="cmg" gradientUnits="userSpaceOnUse" x1="0" y1="-30" x2="0" y2="28"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient><mask id="cmk" maskUnits="userSpaceOnUse" x="-300" y="-400" width="1200" height="1200"><rect x="-300" y="-400" width="1200" height="1200" fill="url(#cmg)"/></mask></defs>`:'')+`<g ${NM?'mask="url(#cmk)"':''}>${false?`<image href="data:image/webp;base64," x="-54.6" y="48.6" width="564.0" height="437.1"/>`:`<g transform="translate(${A0[0]} ${A0[1]}) rotate(${ANG}) scale(${SC}) translate(${-R0[0]} ${-R0[1]})"><image href="${IMG}" x="0" y="0" width="${IMW}" height="${IMH}"/></g>`}</g>`;
    const D=[[462,'lan',16,1.42,-1],[408,'env',12,1.3,-2.4],[342,'coin',10,1.24,-.6],[166,'lan',16,1.3,-1.8],[74,'env',16,1.3,-.2]];
    if(orn)D.forEach(d=>{const y=stemY(d[0])+1;o+=`<g class="sw" style="transform-origin:${d[0]}px ${f1(y)}px;animation-delay:${d[4]}s"><g transform="translate(${d[0]} ${f1(y)}) scale(${d[3]})">${PIECES[d[1]].replace(/__L__/g,d[2])}</g></g>`});
    if(orn)[[484,56],[378,34],[300,56],[214,80],[120,118],[40,150],[440,14]].forEach((p,i)=>{o+=`<path class="st" style="animation-delay:${f1(i*.45)}s" d="M${p[0]} ${p[1]-6}L${p[0]+1.6} ${p[1]-1.6}L${p[0]+6} ${p[1]}L${p[0]+1.6} ${p[1]+1.6}L${p[0]} ${p[1]+6}L${p[0]-1.6} ${p[1]+1.6}L${p[0]-6} ${p[1]}L${p[0]-1.6} ${p[1]-1.6}Z" fill="#FFE9A0"/>`});
    return o;
  }
  let bsv=null,bmode=null;
  function init(){
    const art=$('#art');if(!art)return;
    if(!bsv){bsv=document.createElementNS(NS,'svg');bsv.setAttribute('class','branch tbr');bsv.setAttribute('viewBox','0 0 480 200');bsv.setAttribute('aria-hidden','true');art.insertBefore(bsv,art.firstChild)}
    const m=(SEA()==='ha'||SEA()==='thu')?SEA():(IS()?'tet':'xuan');if(bmode!==m){bmode=m;bsv.innerHTML=(m==='ha'||m==='thu')?'':branchSVG(IS())}
  }
  function place(){
    const on=BR();
    document.querySelectorAll('.hang').forEach(el=>{
      if(on){if(el.dataset.ot===undefined){el.dataset.ot=el.style.top;el.dataset.tl=el.style.left}
        const cx=parseFloat(el.dataset.tl)+42;el.style.top=f1(stemY(cx)-1)+'px'}
      else if(el.dataset.ot!==undefined){el.style.top=el.dataset.ot;delete el.dataset.ot}
    });
    const len=84.5+2-stemY(250)+2;
    document.documentElement.style.setProperty('--tstr',(len>4?len:0).toFixed(1)+'px');
  }
  function splitTitle(){
    const h=$('.hero h1');if(!h||h.dataset.tsplit)return;h.dataset.tsplit='1';
    const tn=[...h.childNodes].find(n=>n.nodeType===3&&/cùng\s*$/.test(n.nodeValue));
    if(tn){const t=tn.nodeValue,m=t.match(/n(g\s*)$/);if(m){const s=document.createElement('span');s.className='tn';s.textContent='n';tn.nodeValue=t.slice(0,t.length-m[0].length);tn.after(s,document.createTextNode(m[1]))}}
    const gl=h.querySelector('.gl-t');
    if(gl&&gl.childNodes.length===1&&gl.firstChild.nodeType===3){const t=gl.firstChild.nodeValue,i=t.indexOf('yu');if(i>=0){gl.textContent='';const u=document.createElement('span');u.className='tu';u.textContent='u';gl.append(t.slice(0,i+1),u,t.slice(i+2))}}
  }
  /* ---------- dây pháo ---------- */
  const cb=(p0,p1,p2,p3,t)=>{const u=1-t;return[u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0],u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1]]};
  const cbt=(p0,p1,p2,p3,t)=>{const u=1-t;const x=3*u*u*(p1[0]-p0[0])+6*u*t*(p2[0]-p1[0])+3*t*t*(p3[0]-p2[0]),y=3*u*u*(p1[1]-p0[1])+6*u*t*(p2[1]-p1[1])+3*t*t*(p3[1]-p2[1]);const l=Math.hypot(x,y)||1;return[x/l,y/l]};
  function pao(){
    const rope=$('#rope');if(!rope)return;let sv=rope.querySelector('svg.pao');
    if(!sv){sv=document.createElementNS(NS,'svg');sv.setAttribute('class','pao');sv.setAttribute('aria-hidden','true');const line=rope.querySelector('svg.line');if(line)line.after(sv);else rope.prepend(sv)}
    const W=rope.clientWidth;if(!W)return;
    sv.setAttribute('viewBox',`0 0 ${W} 90`);
    const mob=W<700,P0=[0,mob?14:8],P1=[W*.25,mob?28:52],P2=[W*.75,mob?28:52],P3=[W,mob?14:8];
    const d=`M${P0[0]} ${P0[1]}C${f1(P1[0])} ${P1[1]} ${f1(P2[0])} ${P2[1]} ${P3[0]} ${P3[1]}`;
    let o=`<defs><linearGradient id="pRed" x1="0" x2="1"><stop offset="0" stop-color="#F0513F"/><stop offset=".55" stop-color="#D7281B"/><stop offset="1" stop-color="#A81810"/></linearGradient></defs>`;
    o+=`<path d="${d}" stroke="#4A241E" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#F2C14E" stroke-width="1.4" fill="none" stroke-dasharray="2 5" stroke-linecap="round"/>`;
    const step=mob?19:23,N=Math.max(10,Math.round(W/step)),r=rng(7);
    for(let i=0;i<=N;i++){
      const t=i/N,pt=cb(P0,P1,P2,P3,t),tg=cbt(P0,P1,P2,P3,t);
      const big=(i%6===3),w=big?10.5:8.4,h=big?27:(i%2?21:24),ang=Math.atan2(tg[1],tg[0])*180/Math.PI*.45+(r()*6-3);
      o+=`<g transform="translate(${f1(pt[0])} ${f1(pt[1]+1)}) rotate(${f1(ang)})">`
        +`<path d="M0 0V3.4" stroke="#F2C14E" stroke-width="1.1"/>`
        +`<rect x="${-w/2}" y="3" width="${w}" height="${h}" rx="${f1(w*.38)}" fill="url(#pRed)" stroke="#4A241E" stroke-width=".7"/>`
        +`<rect x="${-w/2}" y="${f1(3+h*.18)}" width="${w}" height="1.7" fill="#F2C14E"/><rect x="${-w/2}" y="${f1(3+h*.74)}" width="${w}" height="1.7" fill="#F2C14E"/>`
        +`<path d="M${f1(-w*.22)} 5V${f1(h*.8)}" stroke="#FF9A86" stroke-width="1" stroke-linecap="round" opacity=".6"/>`
        +`<path d="M0 ${3+h}V${5+h}" stroke="#E8B64B" stroke-width=".9"/></g>`;
    }
    const m=cb(P0,P1,P2,P3,.5);
    o+=`<g transform="translate(${f1(m[0])} ${f1(m[1]+2)})"><path d="M0 0C-9 4-9 14 0 17C9 14 9 4 0 0Z" fill="#E23A2B" stroke="#4A241E" stroke-width=".9"/><path d="M-6 8.5H6M0 3V16" stroke="#4A241E" stroke-width=".8"/><path d="M-3.4 17H3.4L5 38H-5Z" fill="#E23A2B" stroke="#4A241E" stroke-width=".8"/><path d="M-1.6 19V37M0 19V38M1.6 19V37" stroke="#4A241E" stroke-width=".6" opacity=".7"/><circle cx="0" cy="18" r="2.6" fill="#F4C542" stroke="#D99A1E" stroke-width=".7"/></g>`;
    [[W*.012,P0[1]+6],[W*.988,P3[1]+6],[W*.09,P0[1]+26],[W*.91,P3[1]+26]].forEach((p,i)=>{o+=`<path class="st" style="animation-delay:${f1(i*.5)}s" d="M${f1(p[0])} ${f1(p[1]-7)}L${f1(p[0]+1.8)} ${f1(p[1]-1.8)}L${f1(p[0]+7)} ${f1(p[1])}L${f1(p[0]+1.8)} ${f1(p[1]+1.8)}L${f1(p[0])} ${f1(p[1]+7)}L${f1(p[0]-1.8)} ${f1(p[1]+1.8)}L${f1(p[0]-7)} ${f1(p[1])}L${f1(p[0]-1.8)} ${f1(p[1]-1.8)}Z" fill="#FFE9A0"/>`});
    sv.innerHTML=o;
  }

  /* ---------- pháo hoa khắp trang ---------- */
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cv=null,cx=null,W=0,H=0,raf=0,last=0,parts=[],rk=[],nextL=0,fxOffT=-9999,fxOff=false;
  function fxSize(){const DPR=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;cx.setTransform(DPR,0,0,DPR,0,0)}
  const RR=(a,b)=>a+Math.random()*(b-a);
  const GOLD=['#D8962A','#F0C055'],SILV=['#D9753F','#F0AE7E'];
  const SPR={};
  function spr(c){let s=SPR[c];if(s)return s;s=document.createElement('canvas');s.width=s.height=48;const g=s.getContext('2d'),r=g.createRadialGradient(24,24,0,24,24,24);r.addColorStop(0,c);r.addColorStop(.18,c+'CC');r.addColorStop(.45,c+'44');r.addColorStop(1,c+'00');g.fillStyle=r;g.fillRect(0,0,48,48);return SPR[c]=s}
  function launch(kind){
    const tx=W*RR(.1,.9),ty=H*RR(.12,.46),sx=Math.min(W-10,Math.max(10,tx+RR(-90,90))),T=RR(.85,1.15);
    rk.push({x:sx,y:H+6,tx,ty,vx:(tx-sx)/T,vy:(ty-H-6)/T,t:0,T,sp:0,pal:Math.random()<.72?GOLD:SILV,kind:kind||(Math.random()<.68?'peony':'willow')});
  }
  function P(x,y,vx,vy,c,o){parts.push(Object.assign({x:x+vx*.04,y:y+vy*.04,vx,vy,l:0,L:RR(2,2.8),c,r:1.5,tl:.045,g:62,k:2.3,tw:0},o||{}))}
  function burst(x,y,q){
    const small=W<600,sc=small?.72:1,n=small?90:140,c0=q.pal[0],c1=q.pal[1];
    if(q.kind==='peony'){
      const sp=RR(300,380)*sc;
      for(let i=0;i<n;i++){const a=RR(0,6.2832),z=RR(-1,1),s=sp*Math.sqrt(1-z*z)*RR(.93,1.02);P(x,y,Math.cos(a)*s,Math.sin(a)*s,i%4?c0:c1,{L:RR(2.1,2.9),r:RR(1.3,1.9),tw:Math.random()<.45?1:0})}
      for(let i=0;i<18;i++){const a=RR(0,6.2832),s=sp*RR(.15,.55);P(x,y,Math.cos(a)*s,Math.sin(a)*s,'#F0C055',{L:RR(.9,1.5),r:1.1,tl:.03,g:40})}
    }else{
      const sp=RR(250,320)*sc;
      for(let i=0;i<n;i++){const a=RR(0,6.2832),z=RR(-1,1),s=sp*Math.sqrt(1-z*z)*RR(.55,1);P(x,y,Math.cos(a)*s,Math.sin(a)*s,i%3?c0:c1,{L:RR(3,4),r:RR(1.2,1.6),k:1.9,g:105,tl:.07,tw:1})}
    }
  }
  function dim(){let k=1;const y=innerHeight*.5;['cam-nhan','lien-he'].forEach(id=>{const e=document.getElementById(id);if(!e)return;const r=e.getBoundingClientRect();if(r.top<y&&r.bottom>y)k=.5});return k}
  function fxFrame(t){
    raf=requestAnimationFrame(fxFrame);
    const dt=Math.min(.05,(t-last)/1000||.016);last=t;
    if(t-fxOffT>1000){fxOffT=t;try{fxOff=localStorage.getItem('gy_fx_off')==='1'}catch(e){fxOff=false}}
    cx.clearRect(0,0,W,H);
    if(fxOff){parts.length=0;rk.length=0;return}
    nextL-=dt;if(nextL<=0&&parts.length<1100){launch();if(Math.random()<.28)setTimeout(launch,RR(250,600));nextL=RR(1.3,2.4)}
    const k=dim();cx.globalCompositeOperation='source-over';cx.lineCap='round';
    for(let i=rk.length-1;i>=0;i--){const q=rk[i];q.t+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;
      q.vy+=18*dt;
      cx.globalAlpha=.55*k;cx.drawImage(spr('#D8962A'),q.x-7,q.y-7,14,14);
      q.sp-=dt;if(q.sp<=0){q.sp=.025;P(q.x,q.y,RR(-14,14),RR(10,38),'#D8962A',{L:RR(.35,.7),r:1,tl:0,g:30,k:1.2})}
      if(q.t>=q.T){burst(q.x,q.y,q);rk.splice(i,1)}}
    for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.l+=dt;if(p.l>=p.L){parts.splice(i,1);continue}
      const u=1-p.l/p.L;
      if(p.flash){cx.globalAlpha=.12*u*u*k;const R=p.r*(1.1-.4*u);cx.drawImage(spr(p.c),p.x-R,p.y-R,R*2,R*2);continue}
      const dr=Math.exp(-p.k*dt);p.vx*=dr;p.vy=p.vy*dr+p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
      let al=Math.min(1,u*2.2)*Math.min(1,p.l/.16);al*=al>0?1:0;
      if(p.tw&&u<.4)al*=.45+.55*Math.abs(Math.sin(p.l*47+i*3.1));
      cx.globalAlpha=al*k*.66;
      if(p.tl>0){cx.strokeStyle=p.c;cx.lineWidth=p.r*(.6+.5*u);cx.globalAlpha*=.6;cx.beginPath();cx.moveTo(p.x-p.vx*p.tl,p.y-p.vy*p.tl);cx.lineTo(p.x,p.y);cx.stroke();cx.globalAlpha/=.6}
      const R=p.r*(1.6+.9*u);cx.drawImage(spr(p.c),p.x-R*2,p.y-R*2,R*4,R*4)}
    cx.globalAlpha=1;cx.globalCompositeOperation='source-over';
  }
  function fxStart(){
    if(RM)return;
    if(!cv){cv=document.createElement('canvas');cv.id='t-fw';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);cx=cv.getContext('2d');fxSize();addEventListener('resize',()=>{clearTimeout(fxStart._t);fxStart._t=setTimeout(fxSize,200)})}
    if(!raf){last=performance.now();nextL=.4;raf=requestAnimationFrame(fxFrame)}
  }
  function fxStop(){if(raf){cancelAnimationFrame(raf);raf=0}parts.length=0;rk.length=0;if(cx)cx.clearRect(0,0,W,H)}
  document.addEventListener('visibilitychange',()=>{if(!IS())return;if(document.hidden){cancelAnimationFrame(raf);raf=0}else fxStart()});

  const DESK='tai-nguyen/anh/09b75f8021.webp';
  function deskImg(on){const im=document.querySelector('.desk img');if(!im)return;if(on){if(!im.dataset.o)im.dataset.o=im.src;im.src=DESK}else if(im.dataset.o){im.src=im.dataset.o}}
  function onSeason(){
    deskImg(IS());splitTitle();
    if(BR()){init();place()}else place();
    if(IS()){pao();fxStart()}else fxStop();
  }
  new MutationObserver(onSeason).observe(document.documentElement,{attributes:true,attributeFilter:['data-mua']});
  addEventListener('resize',()=>{clearTimeout(onSeason._t);onSeason._t=setTimeout(()=>{if(IS())pao()},150)});
  const tgs=document.getElementById('tags');if(tgs)new MutationObserver(()=>{if(IS())setTimeout(pao,0)}).observe(tgs,{childList:true});
  onSeason();
})();
