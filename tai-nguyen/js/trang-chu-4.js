
(function(){
  const NS='http://www.w3.org/2000/svg';
  const $=s=>document.querySelector(s);
  const IS=()=>document.documentElement.dataset.mua==='xuan';
  const f1=n=>Math.round(n*10)/10;
  const rng=s=>()=>(s=(s*16807)%2147483647)/2147483647;
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- hoa màu nước (theo bộ hoa của Thầy) ---------- */
  let gc=0;
  const RG=(st,cx,cy,r)=>{const id='xg'+(gc++);return[id,`<radialGradient id="${id}" cx="${cx==null?.5:cx}" cy="${cy==null?.5:cy}" r="${r||.65}">${st.map(k=>`<stop offset="${k[0]}" stop-color="${k[1]}"/>`).join('')}</radialGradient>`]};
  const LG=(st)=>{const id='xg'+(gc++);return[id,`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${st.map(k=>`<stop offset="${k[0]}" stop-color="${k[1]}"/>`).join('')}</linearGradient>`]};
  const GREEN='#6FA356',GREEN2='#8DBB6E';
  const rot=(p,n,f,stroke,extra)=>{let o='';for(let k=0;k<n;k++)o+=`<path d="${p}" transform="rotate(${k*360/n+(extra||0)})" fill="${f}" stroke="${stroke}" stroke-width=".3"/>`;return o};
  const dots=(c,n,r,dr)=>{let o='';for(let k=0;k<n;k++){const a=k*2.4,rr=Math.sqrt(k/n)*r;o+=`<circle cx="${(Math.cos(a)*rr).toFixed(2)}" cy="${(Math.sin(a)*rr).toFixed(2)}" r="${dr}" fill="${c}"/>`}return o};
  const P5='M0 0C-7 -1.5-8.6 -9.4-3.4 -11.6C-1.6 -10.4 1.6 -10.4 3.4 -11.6C8.6 -9.4 7 -1.5 0 0Z';
  const veins=(n,col)=>{let o='';for(let k=0;k<n;k++)o+=`<path d="M0 -2.4V-8.4" transform="rotate(${k*360/n})" stroke="${col}" stroke-width=".35" opacity=".7" stroke-linecap="round"/>`;return o};
  const FL={
    cosmos(){const[i,d]=RG([[0,'#EFD2F4'],[.55,'#C48BD6'],[1,'#A25DB5']],.5,.9,1);return d+rot(P5,5,`url(#${i})`,'rgba(110,50,130,.28)')+veins(5,'#F7E8FB')+`<circle r="3.1" fill="#F7E24A"/>`+dots('#E8B820',9,2.6,.55)},
    anemone(){const[i,d]=RG([[0,'#FCE4D2'],[.55,'#F3C3D6'],[1,'#CFA2E2']],.5,.9,1);return d+rot(P5,5,`url(#${i})`,'rgba(150,80,140,.28)',10)+veins(5,'#FFFFFF')+`<circle r="2.6" fill="#7A5640"/>`+dots('#B98A5E',8,2.2,.5)},
    orange(){const[i,d]=RG([[0,'#FFE29A'],[1,'#F4A064']],.5,.9,1);return d+rot('M0 0C-5.4 -2 -6.4 -10 0 -12C6.4 -10 5.4 -2 0 0Z',4,`url(#${i})`,'rgba(190,100,40,.3)')+veins(4,'#FFF2D0')+`<circle r="2.8" fill="#F9DB3E"/>`+dots('#E5A81A',9,2.6,.5)},
    peri(){const[i,d]=RG([[0,'#F0F6FD'],[.6,'#B9CFEE'],[1,'#86A9DD']],.5,.9,1);let st='';for(let k=0;k<9;k++)st+=`<path d="M0 0L${(Math.sin(k*.7)*2.6).toFixed(1)} ${(-2.8-Math.cos(k*1.3)*.8).toFixed(1)}" stroke="#F6E27A" stroke-width=".5"/>`;return d+rot('M0 0C-5.2 -2 -6.6 -9 -1.5 -11.2C0 -10.4 0 -10.4 1.5 -11.2C6.6 -9 5.2 -2 0 0Z',5,`url(#${i})`,'rgba(60,90,160,.3)')+st+`<circle r="1.1" fill="#FFF1A8"/>`},
    peony(){const[i,d]=RG([[0,'#FFE8EE'],[.6,'#F5B1C8'],[1,'#E57BA0']],.5,.5,.8);let o=d;[[0,-3,5.6],[-4.2,-1,5.4],[4.2,-1,5.4],[-2.4,2.4,5],[2.4,2.4,5],[0,0,4.2]].forEach(k=>{o+=`<circle cx="${k[0]}" cy="${k[1]}" r="${k[2]}" fill="url(#${i})" stroke="rgba(190,70,110,.28)" stroke-width=".3"/>`});return o+`<path d="M-2 0Q0 -2.6 2 0" stroke="#D2587F" stroke-width=".5" fill="none" opacity=".6"/>`},
    butterfly(){const[i,d]=LG([[0,'#8EB3E0'],[1,'#CFE0F4']]);const pt='M0 3C-3.6 -1-3.8 -9 0 -11.6C3.8 -9 3.6 -1 0 3Z';let o=d+`<path d="${pt}" transform="rotate(-34)" fill="url(#${i})" stroke="rgba(60,90,160,.3)" stroke-width=".3"/><path d="${pt}" transform="rotate(34)" fill="url(#${i})" stroke="rgba(60,90,160,.3)" stroke-width=".3"/><path d="${pt}" fill="url(#${i})" stroke="rgba(60,90,160,.3)" stroke-width=".3"/>`;[-34,0,34].forEach(a=>{o+=`<path d="M0 0V-8" transform="rotate(${a})" stroke="#6F93CF" stroke-width=".35" opacity=".6"/><circle cx="0" cy="-9.4" r=".8" fill="#F6DC52" transform="rotate(${a})"/>`});return o+`<path d="M-3.6 3.4C-2.4 .8 2.4 .8 3.6 3.4C2.4 5.4 -2.4 5.4 -3.6 3.4Z" fill="${GREEN}"/>`},
    clover(){const[i,d]=RG([[0,'#FFF3F6'],[.5,'#F6B3C8'],[1,'#EA84A6']],.38,.32,.8);let o=d+`<path d="M0 12C0 6 -1 2 -5 -4M0 12C0 6 1 2 5 -4M0 12C0 4 0 -2 0 -8" stroke="${GREEN}" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M-1.5 6L-5 4.4L-3.4 7.4Z M1.5 3L5 1.2L3.6 4.6Z" fill="${GREEN2}"/>`;[[-5.6,-6,3.7],[5.6,-6,3.7],[0,-10,3.9]].forEach(k=>{o+=`<circle cx="${k[0]}" cy="${k[1]}" r="${k[2]}" fill="url(#${i})" stroke="rgba(190,70,110,.25)" stroke-width=".3"/>`});return o},
    lavender(){const[i,d]=RG([[0,'#C99AD0'],[1,'#8E5C9E']],.4,.3,.9);let o=d+`<path d="M0 13V-11" stroke="${GREEN}" stroke-width="1" stroke-linecap="round"/>`;for(let k=0;k<6;k++){const y=-10+k*3.4,sz=1.9+k*.12;o+=`<ellipse cx="${-1.9-sz*.3}" cy="${y}" rx="${sz*.9}" ry="${sz*1.25}" transform="rotate(-34 ${-1.9} ${y})" fill="url(#${i})"/><ellipse cx="${1.9+sz*.3}" cy="${y}" rx="${sz*.9}" ry="${sz*1.25}" transform="rotate(34 ${1.9} ${y})" fill="url(#${i})"/>`}return o+`<ellipse cx="0" cy="-11.5" rx="1.5" ry="2.2" fill="url(#${i})"/>`},
    mimosa(){let o=`<path d="M0 13C0 6 -1 0 -3 -6M0 4C2 0 4 -4 5 -9" stroke="${GREEN}" stroke-width=".9" fill="none" stroke-linecap="round"/>`;[[-3,-6.6],[-5.2,-4],[-1.4,-9],[-4.6,-8.2],[-2.2,-3.2],[5,-9.6],[3.4,-6.4],[6.6,-6.6],[2.4,-11],[-.6,-5.4],[4,-3]].forEach((k,n)=>{o+=`<circle cx="${k[0]}" cy="${k[1]}" r="${1.5+(n%3)*.2}" fill="${n%2?'#F8D557':'#F3C13E'}"/>`});return o},
    bud(){const[i,d]=LG([[0,'#C5DBF3'],[1,'#7FA7DC']]);return d+`<path d="M0 12C0 8 0 7 0 5" stroke="${GREEN}" stroke-width="1.1" fill="none"/><ellipse cx="-3.2" cy="-3" rx="3.2" ry="7.2" fill="url(#${i})" stroke="rgba(60,90,160,.3)" stroke-width=".3" transform="rotate(-8 -3.2 -3)"/><ellipse cx="3.2" cy="-3" rx="3.2" ry="7.2" fill="url(#${i})" stroke="rgba(60,90,160,.3)" stroke-width=".3" transform="rotate(8 3.2 -3)"/><ellipse cx="0" cy="-4" rx="3.4" ry="7.6" fill="url(#${i})" stroke="rgba(60,90,160,.35)" stroke-width=".3"/><path d="M-4.6 4.6C-3 2.6 3 2.6 4.6 4.6C3 6.4 -3 6.4 -4.6 4.6Z" fill="${GREEN}"/>`}
  };
  const leaf=(rot,sc,col)=>`<g transform="rotate(${rot}) scale(${sc||1})"><path d="M0 0C3 -3 8 -3 11 0C8 3 3 3 0 0Z" fill="${col||GREEN2}" stroke="rgba(60,110,50,.35)" stroke-width=".35"/><path d="M1 0H9" stroke="rgba(255,255,255,.5)" stroke-width=".5"/></g>`;

  /* ---------- hoa phối trong chữ: nằm trong lòng chữ / dọc nét chữ ---------- */
  /* [chỉ số chữ, loại hoa, trái %, trên em, cỡ em, xoay độ] */
  const CFG=[
    [0,'anemone',68,.80,.42,0],
    [1,'bud',56,.80,.40,0],
    [2,'orange',54,.86,.32,0],
    [3,'clover',50,.80,.50,0],
    [4,'peri',46,1.28,.32,0],
    [5,'mimosa',50,.80,.46,0],
    [6,'lavender',50,.82,.46,0],
    [8,'butterfly',66,.80,.58,0],
    [9,'cosmos',54,.86,.32,0],
    [10,'anemone',52,.88,.30,0],
    [11,'peri',54,.88,.32,0],
    [12,'cosmos',64,.92,.34,0],
    [13,'peony',62,.44,.36,0]
  ];
  const LEAVES=[[1,16,1.02,-40],[3,82,1.04,30],[5,88,1.1,40],[6,14,1.02,-30],[9,14,1.04,-25],[11,12,1.06,-35],[13,92,1.0,35],[12,20,1.1,-30],[10,86,1.0,30]];
  const SPR={"L":{"x":40,"y":142,"w":575,"h":430,"b":"tai-nguyen/anh/9ff84b0bb5.webp"},"R":{"x":1565,"y":140,"w":581,"h":449,"b":"tai-nguyen/anh/bb2c5cbf08.webp"},"M":{"x":1090,"y":446,"w":371,"h":54,"b":"tai-nguyen/anh/06ecf7c482.webp"}};
  const X0=215,X1=2015,BASE=415;
  function dressTitle(){
    const gl=$('.hero h1 .gl-t');if(!gl)return;
    if(!gl.dataset.xs){gl.dataset.xs='1';
      const m=document.createElement('i');m.className='xm';gl.append(m);
      for(const k in SPR){const e=document.createElement('img');e.className='xspr';e.alt='';e.setAttribute('aria-hidden','true');e.dataset.k=k;e.onload=placeTitle;e.src=SPR[k].b;gl.append(e)}}
    placeTitle();
  }
  function placeTitle(){
    const gl=$('.hero h1 .gl-t');if(!gl||!IS())return;const m=gl.querySelector('.xm');if(!m)return;
    const r=gl.getBoundingClientRect();if(!r.width)return;
    const by=m.getBoundingClientRect().bottom-r.top,sc=r.width/(X1-X0);
    gl.querySelectorAll('.xspr').forEach(e=>{const p=SPR[e.dataset.k];
      e.style.left=f1((p.x-X0)*sc)+'px';e.style.top=f1(by+(p.y-BASE)*sc)+'px';e.style.width=f1(p.w*sc)+'px'});
  }

  /* ---------- dây hoa dưới bảng cảm nhận ---------- */
  const cb=(p0,p1,p2,p3,t)=>{const u=1-t;return[u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0],u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1]]};
  const cbt=(p0,p1,p2,p3,t)=>{const u=1-t;const x=3*u*u*(p1[0]-p0[0])+6*u*t*(p2[0]-p1[0])+3*t*t*(p3[0]-p2[0]),y=3*u*u*(p1[1]-p0[1])+6*u*t*(p2[1]-p1[1])+3*t*t*(p3[1]-p2[1]);const l=Math.hypot(x,y)||1;return[x/l,y/l]};
  function garland(){
    const rope=$('#rope');if(!rope)return;let sv=rope.querySelector('svg.gar');
    if(!sv){sv=document.createElementNS(NS,'svg');sv.setAttribute('class','gar');sv.setAttribute('aria-hidden','true');const line=rope.querySelector('svg.line');if(line)line.after(sv);else rope.prepend(sv)}
    const W=rope.clientWidth;if(!W)return;
    sv.setAttribute('viewBox',`0 0 ${W} 90`);
    const mob=W<700,P0=[0,mob?14:8],P1=[W*.25,mob?28:52],P2=[W*.75,mob?28:52],P3=[W,mob?14:8];
    const d=`M${P0[0]} ${P0[1]}C${f1(P1[0])} ${P1[1]} ${f1(P2[0])} ${P2[1]} ${P3[0]} ${P3[1]}`;
    let o=`<path d="${d}" stroke="#5A9748" stroke-width="3" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#9BCB78" stroke-width="1.1" fill="none" stroke-dasharray="1 5" stroke-linecap="round"/>`;
    const r=rng(11),N=Math.max(12,Math.round(W/(mob?22:27)));
    const KINDS=['peony','cosmos','orange','peri','anemone','clover','mimosa','butterfly','cosmos','peony','peri','anemone','lavender','orange'];
    let lv='',fl='';
    for(let i=0;i<=N;i++){
      const t=i/N,pt=cb(P0,P1,P2,P3,t),tg=cbt(P0,P1,P2,P3,t),ang=Math.atan2(tg[1],tg[0])*180/Math.PI;
      const side=i%2?1:-1;
      lv+=`<g transform="translate(${f1(pt[0])} ${f1(pt[1])}) rotate(${f1(ang+side*(52+r()*18))}) scale(${f1(.8+r()*.5)})">${leaf(0,1)}</g>`;
      const k=KINDS[i%KINDS.length],sz=(mob?9:11)+r()*(mob?4:5);
      const dy=(r()-.5)*3;
      fl+=`<g transform="translate(${f1(pt[0])} ${f1(pt[1]+dy)}) rotate(${f1(r()*40-20)}) scale(${f1(sz/20)})">${FL[k]()}</g>`;
      if(i%3===1){const hl=8+r()*10,bk=['bud','clover','lavender','peri'][Math.floor(r()*4)];
        fl+=`<path d="M${f1(pt[0])} ${f1(pt[1])}V${f1(pt[1]+hl)}" stroke="#7DB65F" stroke-width=".9"/><g transform="translate(${f1(pt[0])} ${f1(pt[1]+hl+4)}) rotate(180) scale(${f1((mob?7:9)/20)})">${FL[bk]()}</g>`}
    }
    const m=cb(P0,P1,P2,P3,.5);
    fl+=`<g transform="translate(${f1(m[0]-14)} ${f1(m[1]+2)}) scale(.78)">${FL.cosmos()}</g><g transform="translate(${f1(m[0]+14)} ${f1(m[1]+2)}) scale(.78)">${FL.orange()}</g><g transform="translate(${f1(m[0])} ${f1(m[1]+3)}) scale(1.1)">${FL.peony()}</g>`;
    sv.innerHTML=o+lv+fl;
  }

  /* ---------- cánh hoa đào rơi ---------- */
  let cv=null,cx=null,W=0,H=0,raf=0,last=0,P=[],acc=0,acc2=0,fxOff=false,fxOffT=-9999,SP=[];
  const RR=(a,b)=>a+Math.random()*(b-a);
  function mkSprite(c1,c2,c3){
    const s=document.createElement('canvas');s.width=s.height=64;const g=s.getContext('2d');g.translate(32,33);
    g.beginPath();g.moveTo(0,25);g.bezierCurveTo(-22,10,-27,-14,-11,-24);g.quadraticCurveTo(-5,-28,0,-19);g.quadraticCurveTo(5,-28,11,-24);g.bezierCurveTo(27,-14,22,10,0,25);g.closePath();
    const gr=g.createRadialGradient(0,16,1,0,0,32);gr.addColorStop(0,c1);gr.addColorStop(.5,c2);gr.addColorStop(1,c3);g.fillStyle=gr;g.fill();
    g.strokeStyle='rgba(214,110,146,.35)';g.lineWidth=1.1;g.stroke();
    g.strokeStyle='rgba(224,120,156,.25)';g.lineWidth=1;g.beginPath();g.moveTo(0,22);g.lineTo(0,-6);g.stroke();
    return s}
  function sprites(){if(SP.length)return SP;[['#F27AA3','#F8B4CB','#FFE3EC'],['#F6A0BC','#FBCADA','#FFF0F4'],['#EE8FB0','#F9C3D6','#FFE9F1'],['#F7BCD0','#FDE2EA','#FFFFFF'],['#F4A3BE','#FAD0DE','#FFF3F7']].forEach(c=>SP.push(mkSprite(c[0],c[1],c[2])));return SP}
  function fxSize(){const D=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;cx.setTransform(D,0,0,D,0,0)}
  function petal(x,y,vy,fresh){
    const sp=sprites();P.push({x,y,vy,sw:RR(16,40),ph:RR(0,6.28),sf:RR(.55,1.1),rot0:RR(0,6.28),rs:RR(-.22,.22),rk:RR(.35,.7),sz:RR(11,20)*(W<700?.85:1),sy:RR(.8,1),al:RR(.82,.98),wind:RR(-10,6),age:fresh?0:2,s:sp[Math.floor(Math.random()*sp.length)]})
  }
  function branchRect(){const e=$('#art svg.tbr');return e?e.getBoundingClientRect():null}
  function seed(){P.length=0;const n=Math.round(Math.min(40,W*H/30000));for(let i=0;i<n;i++)petal(RR(0,W),RR(0,H),RR(26,54),false)}
  function frame(t){
    raf=requestAnimationFrame(frame);
    const dt=Math.min(.05,(t-last)/1000||.016);last=t;
    if(t-fxOffT>1000){fxOffT=t;try{fxOff=localStorage.getItem('gy_fx_off')==='1'}catch(e){fxOff=false}}
    cx.clearRect(0,0,W,H);if(fxOff){P.length=0;return}
    const br=branchRect(),vis=br&&br.bottom>0&&br.top<H&&br.width>40;
    /* dày ngay dưới cành */
    if(vis&&P.length<340){acc+=dt*(W<700?8:15);while(acc>=1){acc--;const x=br.left+br.width*RR(.06,.98),y=br.top+br.height*RR(.2,.62);petal(x,y,RR(22,46),true)}}
    /* thưa khắp trang */
    if(P.length<260){acc2+=dt*(W<700?1.6:2.6);while(acc2>=1){acc2--;petal(RR(-20,W+20),-20,RR(28,56),true)}}
    for(let i=P.length-1;i>=0;i--){const p=P[i];p.age+=dt;p.ph+=dt*p.sf;
      p.x+=(p.wind+Math.cos(p.ph)*p.sw*p.sf*.6)*dt;p.y+=(p.vy+Math.sin(p.ph*2)*4)*dt;
      if(p.y>H+30||p.x<-40||p.x>W+40){P.splice(i,1);continue}
      const rot=p.rot0+p.rs*p.age+Math.sin(p.ph)*p.rk,a=p.al*Math.min(1,p.age/.7);
      cx.save();cx.globalAlpha=a;cx.translate(p.x,p.y);cx.rotate(rot);cx.scale(1,p.sy);cx.drawImage(p.s,-p.sz/2,-p.sz/2,p.sz,p.sz);cx.restore()}
    cx.globalAlpha=1;
  }
  function fxStart(){
    if(RM)return;
    if(!cv){cv=document.createElement('canvas');cv.id='x-fw';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);cx=cv.getContext('2d');fxSize();addEventListener('resize',()=>{clearTimeout(fxStart._t);fxStart._t=setTimeout(()=>{fxSize()},200)})}
    if(!raf){fxSize();seed();last=performance.now();raf=requestAnimationFrame(frame)}
  }
  function fxStop(){if(raf){cancelAnimationFrame(raf);raf=0}P.length=0;if(cx)cx.clearRect(0,0,W,H)}
  document.addEventListener('visibilitychange',()=>{if(!IS())return;if(document.hidden){cancelAnimationFrame(raf);raf=0}else fxStart()});

  /* sóng nước: lớp cuối lấy đúng màu của dải nền tại vị trí đó để liền mạch */
  const BG=[[0,255,241,244],[.25,252,227,234],[.5,244,235,224],[.75,230,241,210],[1,214,235,192]];
  function bgAt(t){t=Math.max(0,Math.min(1,t));for(let i=1;i<BG.length;i++){if(t<=BG[i][0]){const a=BG[i-1],b=BG[i],u=(t-a[0])/(b[0]-a[0]);return[1,2,3].map(k=>Math.round(a[k]+(b[k]-a[k])*u))}}return BG[BG.length-1].slice(1)}
  function tintWaves(){
    if(!IS())return;const bb=document.body.getBoundingClientRect(),H=bb.height;if(!H)return;
    document.querySelectorAll('.wave').forEach(w=>{const r=w.getBoundingClientRect();const t=(r.top+r.height*.62-bb.top)/H;const c=bgAt(t);
      const p=w.querySelector('.lay:nth-child(3) path');if(p)p.style.setProperty('fill','rgb('+c.join(',')+')','important')})
  }
  const FOOTLOGO='tai-nguyen/anh/af0d61442e.webp';
  function footLogo(){return;
    const f=document.querySelector('footer img');if(!f)return;
    if(!f.dataset.orig)f.dataset.orig=f.getAttribute('src')||'';
    if(IS()){if(f.getAttribute('src')!==FOOTLOGO)f.setAttribute('src',FOOTLOGO)}
    else if(document.documentElement.dataset.mua!=='ha'&&f.dataset.orig&&f.getAttribute('src')!==f.dataset.orig)f.setAttribute('src',f.dataset.orig)
  }
  function onSeason(){
    footLogo();setTimeout(footLogo,800);if(IS()){dressTitle();garland();fxStart();tintWaves();setTimeout(tintWaves,700)}else fxStop();
  }
  addEventListener('load',()=>setTimeout(tintWaves,300));if(window.ResizeObserver)new ResizeObserver(()=>tintWaves()).observe(document.body);
  new MutationObserver(onSeason).observe(document.documentElement,{attributes:true,attributeFilter:['data-mua']});
  addEventListener('resize',()=>{clearTimeout(onSeason._t);onSeason._t=setTimeout(()=>{if(IS()){garland();placeTitle();tintWaves()}},150)});
  const tgs=document.getElementById('tags');if(tgs)new MutationObserver(()=>{if(IS())setTimeout(garland,0)}).observe(tgs,{childList:true});
  onSeason();
})();
