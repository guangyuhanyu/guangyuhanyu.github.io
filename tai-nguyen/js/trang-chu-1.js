
const IMG={"hac": "tai-nguyen/anh/19305f462b.png", "ca": "tai-nguyen/anh/13adf5811b.png", "logo": "tai-nguyen/anh/95dcd94a0c.png", "logoToi": "tai-nguyen/anh/802bc0489b.png", "seal": "tai-nguyen/anh/d6c333388e.png", "hacSang": "tai-nguyen/anh/9dc8f056ff.png", "qr": "tai-nguyen/anh/a6cb66da2d.png", "sealW": "tai-nguyen/anh/680488cf60.png", "hacA": "tai-nguyen/anh/6c053b921c.png", "hacB": "tai-nguyen/anh/f53d9cffc6.png"};
/* ====== CẤU HÌNH – sửa link và nội dung ở đây ======
   ready:false → hiện "Sắp ra mắt", chưa bấm được. Đổi thành true khi bài đã đăng. */
const SITE='https://guangyuhanyu.github.io/';
const CONFIG={
  links:{nhapMon:SITE+'nhapmon/',onLuyen:SITE+'onluyen/',dangKy:SITE+'dangky/',camNhan:SITE+'camnhan/'},
  gt:{title:'Giao tiếp',han:'口语速成',sub:'Giáo trình luyện nói tiếng Trung cấp tốc',items:[
    {no:'Q1',title:'Cơ bản',han:'第一册',href:SITE+'q1/',ready:true},
    {no:'Q2',title:'Sơ cấp 1',han:'第二册',href:SITE+'q2/',ready:true},
    {no:'Q3',title:'Sơ cấp 2',han:'第三册',href:SITE+'q3/',ready:true},
    {no:'Q4',title:'Sơ cấp 3',han:'第四册',href:SITE+'q4/',ready:true},
    {no:'Q5',title:'Tiền trung cấp',han:'第五册',href:SITE+'q5/',ready:true}]},
  hsk:{title:'HSK 3.0',han:'汉语水平考试',sub:'Giáo trình chuẩn HSK 3.0',items:[
    {feat:true,no:'人',title:'Làm quen nhân vật',han:'人物介绍',href:SITE+'nhanvat/',ready:true},
    {no:'1',title:'HSK 1',han:'一级',href:SITE+'h1/',ready:true},
    {no:'2',title:'HSK 2',han:'二级',href:SITE+'h2/',ready:true},
    {no:'3',title:'HSK 3',han:'三级',href:SITE+'h3/',ready:true},
    {no:'4',title:'HSK 4',han:'四级',href:SITE+'h4/',ready:true}]},
  /* Cảm nhận: chỉ chép cảm nhận học viên ĐÃ ĐỒNG Ý công khai.
     {ten:'Chị Lan', lop:'HSK 2', noiDung:'...'} – để trống ten nếu học viên muốn ẩn danh. */
  camNhanCSV:'https://docs.google.com/spreadsheets/d/e/2PACX-1vQbUBgnReeCWJvAyYK6645eLIxywMQ1kT7deSWRiczDG2ja2GCmRIXCgOZDUqKpu63Fq7KJ6DmWXOEB/pub?gid=1451703679&single=true&output=csv',  // dán link CSV của tab "Trang chủ" trong Google Sheet (Tệp → Chia sẻ → Xuất bản lên web → CSV)
  soThe:6,        // số thẻ hiện mỗi lần (máy tính); mỗi lần mở trang chọn ngẫu nhiên
  camNhan:[]
};
const SVG={knot:"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 96\" fill=\"none\" stroke-linecap=\"round\"><path d=\"M10 34H150M250 34H390\" stroke=\"currentColor\" stroke-width=\"1.6\"/><path d=\"M150 34l7-7 7 7-7 7z\" stroke=\"currentColor\" stroke-width=\"1.6\"/><path d=\"M250 34l-7-7-7 7 7 7z\" stroke=\"currentColor\" stroke-width=\"1.6\"/><path d=\"M200 2.0V16.0\" stroke=\"#CF3D2F\" stroke-width=\"2.4\"/><circle cx=\"214.3\" cy=\"19.7\" r=\"6.0\" fill=\"none\" stroke=\"#CF3D2F\" stroke-width=\"4.2\"/><circle cx=\"214.3\" cy=\"48.3\" r=\"6.0\" fill=\"none\" stroke=\"#CF3D2F\" stroke-width=\"4.2\"/><circle cx=\"185.7\" cy=\"48.3\" r=\"6.0\" fill=\"none\" stroke=\"#CF3D2F\" stroke-width=\"4.2\"/><circle cx=\"185.7\" cy=\"19.7\" r=\"6.0\" fill=\"none\" stroke=\"#CF3D2F\" stroke-width=\"4.2\"/><path d=\"M200.0 16.0 L218.0 34.0 L200.0 52.0 L182.0 34.0Z\" fill=\"#CF3D2F\" stroke=\"#CF3D2F\" stroke-width=\"4.2\" stroke-linejoin=\"round\"/><path d=\"M194.0 22.0L212.0 40.0\" stroke=\"#F3B9A8\" stroke-width=\"1.4\"/><path d=\"M206.0 22.0L188.0 40.0\" stroke=\"#F3B9A8\" stroke-width=\"1.4\"/><path d=\"M188.0 28.0L206.0 46.0\" stroke=\"#F3B9A8\" stroke-width=\"1.4\"/><path d=\"M212.0 28.0L194.0 46.0\" stroke=\"#F3B9A8\" stroke-width=\"1.4\"/><path d=\"M200 52.0V59.0\" stroke=\"#CF3D2F\" stroke-width=\"2.4\"/><circle cx=\"200\" cy=\"62.0\" r=\"3.6\" fill=\"#D6C997\"/><path d=\"M196.0 65.0h8.0l4.0 20.0h-16.0z\" fill=\"#CF3D2F\"/><path d=\"M194.8 68.0l-1.8 16.0\" stroke=\"#A52A1E\" stroke-width=\"0.8\"/><path d=\"M197.4 68.0l-0.9 16.0\" stroke=\"#A52A1E\" stroke-width=\"0.8\"/><path d=\"M200.0 68.0l0.0 16.0\" stroke=\"#A52A1E\" stroke-width=\"0.8\"/><path d=\"M202.6 68.0l0.9 16.0\" stroke=\"#A52A1E\" stroke-width=\"0.8\"/><path d=\"M205.2 68.0l1.8 16.0\" stroke=\"#A52A1E\" stroke-width=\"0.8\"/></svg>",
 cloud:'<svg viewBox="0 0 260 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 62c20 0 26-26 50-24 6-26 44-30 56-8 14-16 40-10 44 10 18-6 34 4 34 22h64"/><path d="M84 52c18-6 30 0 36 10"/></svg>'};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
document.querySelectorAll('[data-img]').forEach(i=>i.src=IMG[i.dataset.img]);
document.querySelectorAll('image[data-href]').forEach(i=>i.setAttribute('href',IMG[i.dataset.href]));
document.querySelectorAll('[data-svg]').forEach(d=>d.innerHTML=SVG[d.dataset.svg]);
document.querySelectorAll('[data-link]').forEach(a=>a.href=CONFIG.links[a.dataset.link]);

/* ---- tiếng chuông nhẹ (tạo bằng Web Audio, không cần file) ---- */
let muted=true; try{muted=localStorage.getItem('gy-mute')!=='0'}catch(e){}
const sndBtn=$('snd'); sndBtn.setAttribute('aria-pressed',String(!muted));
sndBtn.onclick=()=>{muted=!muted;sndBtn.setAttribute('aria-pressed',String(!muted));try{localStorage.setItem('gy-mute',muted?'1':'0')}catch(e){} if(!muted)chime(0)};
let ctx=null;
const NOTES=[1046.5,1174.7,1318.5,1568,1760]; // ngũ cung
/* Âm thanh đổi theo mùa (tạo bằng Web Audio): Xuân đàn tranh · Tết chiêng trống · Hè sáo trúc · Thu chuông đồng · Đông chuông pha lê · Trung Thu trống lân */
function tone(c,out,t,type,f,pk,att,dec,det){const o=c.createOscillator(),v=c.createGain();o.type=type;o.frequency.value=f;if(det)o.detune.value=det;v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(pk,t+att);v.gain.exponentialRampToValueAtTime(.0001,t+dec);o.connect(v);v.connect(out);o.start(t);o.stop(t+dec+.05);return o}
function thump(c,out,t,f0,f1,pk,dec){const o=c.createOscillator(),v=c.createGain();o.type='sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dec*.55);v.gain.setValueAtTime(pk,t);v.gain.exponentialRampToValueAtTime(.0001,t+dec);o.connect(v);v.connect(out);o.start(t);o.stop(t+dec+.05)}
function puff(c,out,t,fc,q,pk,dur){const n=Math.floor(c.sampleRate*dur),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=fc;f.Q.value=q;const v=c.createGain();v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(pk,t+dur*.25);v.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f);f.connect(v);v.connect(out);s.start(t)}
function bellP(c,out,t,f,parts,det){parts.forEach(([m,g,d])=>{tone(c,out,t,'sine',f*m,g,.008,d);if(det)tone(c,out,t,'sine',f*m*det,g*.6,.008,d*.9)})}
const SND={
  xuan:{vol:.2,notes:[523.3,587.3,659.3,784,880,1046.5],play(c,o,t,f){tone(c,o,t,'triangle',f,.9,.004,1.5);tone(c,o,t,'sine',f*2,.25,.004,.8);tone(c,o,t,'sine',f*3,.07,.004,.4);puff(c,o,t,Math.min(f*4,6000),1.2,.12,.05)}},
  tet:{vol:.14,notes:[523.3,587.3,659.3,784,880],play(c,o,t,f,k){bellP(c,o,t,f,[[1,1,2.8],[2.76,.35,1.6],[5.4,.12,.8]]);thump(c,o,t,150,58,.9,.4);if((k|0)%2)bellP(c,o,t+.14,f*1.5,[[1,.5,1.6],[2.76,.15,.9]])}},
  ha:{vol:.2,notes:[523.3,587.3,659.3,784,880],play(c,o,t,f){const x=tone(c,o,t,'sine',f,.7,.06,1.3);const l=c.createOscillator(),lg=c.createGain();l.frequency.value=5.5;lg.gain.value=f*.006;l.connect(lg);lg.connect(x.frequency);l.start(t);l.stop(t+1.4);tone(c,o,t,'sine',f*2,.08,.06,.9);puff(c,o,t,f*2,6,.12,.35)}},
  thu:{vol:.14,notes:[392,440,523.3,587.3,659.3],play(c,o,t,f){bellP(c,o,t,f,[[1,1,3.8],[2,.45,2.8],[2.97,.3,2.1],[5.2,.1,1.1]],1.004)}},
  dong:{vol:.085,notes:[1568,1760,2093,2349,2637],play(c,o,t,f){bellP(c,o,t,f,[[1,.8,2.6],[3.01,.25,1.5],[4.15,.14,1],[6.3,.06,.6]],1.003)}},
  trungthu:{vol:.15,notes:[392,440,523.3,587.3,659.3],play(c,o,t,f,k){thump(c,o,t,130,48,1,.45);tone(c,o,t+.01,'square',900,.12,.002,.06);bellP(c,o,t+.08,f*2,[[1,.6,1.8],[2.76,.18,1]]);if((k|0)%2===0)thump(c,o,t+.16,120,52,.6,.35)}}
};
function chime(k){
  if(muted)return;
  try{
    ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();
    if(ctx.state==='suspended')ctx.resume();
    const P=SND[document.documentElement.dataset.mua]||SND.dong;
    const t=ctx.currentTime,idx=(k??Math.floor(Math.random()*P.notes.length)),f=P.notes[idx%P.notes.length];
    const out=ctx.createGain();out.gain.value=P.vol;out.connect(ctx.destination);
    P.play(ctx,out,t,f,idx);
  }catch(e){}
}
/* ---- chuyển động mềm như gió thật: con lắc có lò xo + gió biến thiên ---- */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const bell={th:0,v:0,a:0,k:6.5,c:.9}; const papers=[...document.querySelectorAll('.hang')].map((el,i)=>({el,btn:el.querySelector('.paper'),th:0,v:0,k:4.6+i*.9,c:.7,ph:i*1.7,fv:0}));
const twig={th:0,v:0};
function fitArt(){const w=$('chimeWrap').clientWidth,sc=Math.min(1,w/480);$('art').style.transform=`translateX(${(w-480*sc)/2}px) scale(${sc})`;$('art').style.transformOrigin='0 0';$('chimeWrap').style.height=(680*sc)+'px'}
fitArt();addEventListener('resize',fitArt);
let tagBodies=[]; let boost=0, boostT=0, gust={t0:-99,amp:0}, T=20+Math.random()*30;
function wind(t){
  if(t-gust.t0>9+Math.random()*7&&Math.random()<.01){gust={t0:t+1.2,amp:(Math.random()<.5?-1:1)*(1.4+Math.random())}}
  const g=gust.amp*Math.exp(-Math.pow((t-gust.t0)/1.1,2));
  return .55*Math.sin(t*.37)+.32*Math.sin(t*.83+1.3)+.16*Math.sin(t*1.9+.4)+g;
}
function ring(){bell.v+=12;papers.forEach(p=>p.v-=3)}
const chimeEl=$('chimeWrap');
chimeEl.addEventListener('pointerenter',()=>{boostT=1});chimeEl.addEventListener('pointerleave',()=>{boostT=0});
/* tua rua: 22 sợi lụa dài, mỗi sợi uốn theo gió và theo nhịp lắc của chuông */
const TS=[];(function(){const g=$('tassel');const N=22;for(let i=0;i<N;i++){const p=document.createElementNS('http://www.w3.org/2000/svg','path');
  const m=(i-(N-1)/2)/((N-1)/2);p.setAttribute('fill','none');p.setAttribute('stroke-linecap','round');
  p.setAttribute('stroke',i%4==1?'url(#silk2)':'url(#silk)');p.setAttribute('stroke-width',(0.75+Math.random()*.5).toFixed(2));
  g.appendChild(p);TS.push({p,m,L:112+Math.random()*26-Math.abs(m)*14,ph:Math.random()*6.28,lag:0})}})();
function drawTassel(){const sw=-bell.v*1.1, W=wind(T-.4);TS.forEach(s=>{
  s.lag+=((sw+W*3)-s.lag)*0.06;
  const x0=180+s.m*4.6,y0=283,L=s.L, flut=Math.sin(T*2.3+s.ph)*1.6, end=x0+s.m*9+s.lag+flut*1.4;
  const c1x=x0+s.m*2+s.lag*.15, c2x=x0+s.m*6+s.lag*.6+flut;
  s.p.setAttribute('d',`M${x0.toFixed(1)} ${y0}C${c1x.toFixed(1)} ${(y0+L*.35).toFixed(1)} ${c2x.toFixed(1)} ${(y0+L*.7).toFixed(1)} ${end.toFixed(1)} ${(y0+L).toFixed(1)}`)})}
drawTassel();
let last=performance.now();
function frame(now){
  let dt=Math.min(.05,(now-last)/1000);last=now;
  for(let s=0;s<3;s++){const h=dt/3;T+=h;boost+=(boostT-boost)*h*1.5;const W=wind(T)*(1+boost*1.3);
    const a=-bell.k*bell.th-bell.c*bell.v+W*16; bell.v+=a*h; bell.th+=bell.v*h; bell.a=a;
    papers.forEach(p=>{const w=wind(T-.35-p.ph*.12)*(1+boost*1.3);const pa=-p.k*p.th-p.c*p.v+w*9*(.85+.3*Math.sin(T*.5+p.ph));p.v+=pa*h;p.th+=p.v*h});
    {const ta=-3.2*twig.th-.9*twig.v+W*.6;twig.v+=ta*h;twig.th+=twig.v*h}
    tagBodies.forEach(b=>{const w=wind(T*.9-b.off);const ta=-b.k*b.th-b.c*b.v+w*24;b.v+=ta*h;b.th+=b.v*h});
  }
  $('sway').style.transform=`rotate(${bell.th.toFixed(3)}deg)`;drawTassel();
  papers.forEach(p=>{p.el.style.transform=`rotate(${p.th.toFixed(3)}deg)`;p.btn.style.transform=`rotate(${(-p.v*.35).toFixed(3)}deg) skewX(${(-p.v*.12).toFixed(3)}deg)`});
  $('art').querySelectorAll('svg.branch').forEach(b=>{b.style.transform=`rotate(${(twig.th*.35).toFixed(3)}deg)`});
  tagBodies.forEach(b=>{b.el.style.transform=`rotate(${b.th.toFixed(3)}deg) skewX(${(-b.v*.05).toFixed(3)}deg)`});
  requestAnimationFrame(frame);
}
if(!RM)requestAnimationFrame(frame);
/* chuông: kêu rồi mới chuyển trang */
$('bell').addEventListener('click',e=>{e.preventDefault();ring();chime(2);const h=e.currentTarget.href;setTimeout(()=>{location.href=h},650)});

/* ---- 2 tờ giấy → danh sách ---- */
let openList=null;
function renderList(key){
  const L=CONFIG[key];
  $('panelBox').style.setProperty('--arrow',key==='gt'?'38%':'62%');
  $('panelBox').innerHTML=`<h3>${esc(L.title)}<span>${esc(L.han)}</span></h3><p class="sub">${esc(L.sub)}</p><div class="list">${L.items.map(it=>{
    const inner=`<span class="no">${esc(it.no)}</span><span><b>${esc(it.title)}</b><small>${esc(it.han)}</small></span>`;
    const cls='item'+(it.feat?' feat':'');
    return it.ready?`<a class="${cls}" href="${esc(it.href)}">${inner}</a>`:`<div class="${cls} soon">${inner}</div>`}).join('')}</div>`;
}
document.querySelectorAll('.paper').forEach(p=>p.addEventListener('click',()=>{
  const key=p.dataset.list;
  const pb=papers.find(x=>x.btn===p);if(pb)pb.v+=9;bell.v+=2;
  chime(key==='gt'?0:4);
  if(openList===key){openList=null;$('panel').classList.remove('open');p.setAttribute('aria-expanded','false');return}
  openList=key;renderList(key);
  document.querySelectorAll('.paper').forEach(x=>x.setAttribute('aria-expanded',String(x===p)));
  $('panel').classList.add('open');
}));

/* ---- dây treo cảm nhận ---- */
const COLORS=['#F6EEDD','#E2EAE0','#EFE2CF','#DCE6EA','#F1E6E0','#E8EDE0'];
const HAN=['心声','感谢','进步','快乐','收获','坚持'];
const tags=$('tags');
function renderFeedback(list){
$('letter').classList.remove('open');
if(!list.length){
  tagBodies=[];
  $('rope').style.height='auto';$('rope').querySelector('svg').style.display='none';
  tags.style.position='static';tags.innerHTML='<div class="empty"><b>Những lời nhắn đầu tiên</b>Cảm nhận của học viên sẽ được treo lên đây.</div>';
}else{
  const n=list.length;
  tags.innerHTML=list.map((c,i)=>{const x=(i+.5)/n, y=Math.round(8+Math.sin(Math.PI*x)*34);
    return `<button class="tag" type="button" aria-expanded="false" data-i="${i}" style="--y:${y+14}px;--d:${-i*0.9}s;--c:${COLORS[i%COLORS.length]}"><span class="t"><span class="v">${HAN[i%HAN.length]}</span><b>${esc(c.ten||'Ẩn danh')}</b><span>${esc(c.lop||'')}</span></span></button>`}).join('');
  $('rope').style.height='';$('rope').querySelector('svg').style.display='';tags.style.position='';
  tagBodies=[...tags.querySelectorAll('.tag')].map((el,i)=>({el,th:0,v:0,k:11+(i%3)*2,c:1.3,off:i*.7}));
  let cur=null;
  tags.onclick=e=>{const b=e.target.closest('.tag');if(!b)return;const i=+b.dataset.i;
    const tb=tagBodies.find(x=>x.el===b);if(tb)tb.v+=22;chime(i);
    tags.querySelectorAll('.tag').forEach(x=>x.setAttribute('aria-expanded',String(x===b&&cur!==i)));
    if(cur===i){cur=null;$('letter').classList.remove('open');return}
    cur=i;const c=list[i];
    $('letterBox').innerHTML=`<span class="stamp">学员<br>心声</span><span class="eyebrow" style="color:var(--chu-sa)">Lời nhắn${c.demo?'<span class="demo">VÍ DỤ</span>':''}</span><blockquote>“${esc(c.noiDung)}”</blockquote><div class="who"><b>${esc(c.ten||'Học viên ẩn danh')}</b>${c.lop?' · '+esc(c.lop):''}</div>`;
    $('letter').classList.add('open');
  };
}
}
/* hiện ngẫu nhiên một nhóm lời nhắn mỗi lần mở trang */
let ALL=[],shown=0;
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function useList(list){ALL=shuffle(list);shown=0;nextBatch()}
function nextBatch(){const n=innerWidth<700?6:CONFIG.soThe;if(!ALL.length){renderFeedback([]);$('more').hidden=true;return}
  if(shown>=ALL.length){ALL=shuffle(ALL);shown=0}
  const b=ALL.slice(shown,shown+n);shown+=n;renderFeedback(b);$('more').hidden=ALL.length<=n}
$('more').onclick=()=>{nextBatch();chime()};
useList(CONFIG.camNhan);
/* Tự lấy cảm nhận từ Google Sheet (bản CSV đã "Xuất bản lên web") */
function parseCSV(t){const R=[];let r=[],f='',q=false;for(let i=0;i<t.length;i++){const c=t[i];if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++}else q=false}else f+=c}else if(c=='"')q=true;else if(c==','){r.push(f);f=''}else if(c=='\n'||c=='\r'){if(c=='\r'&&t[i+1]=='\n')i++;r.push(f);R.push(r);r=[];f=''}else f+=c}if(f||r.length){r.push(f);R.push(r)}return R}
const DEBUG=location.hash==='#kiemtra';
function dbg(lines){if(!DEBUG)return;let d=$('dbg');if(!d){d=document.createElement('pre');d.id='dbg';d.style.cssText='white-space:pre-wrap;background:#fff;border:2px dashed #CF3D2F;border-radius:12px;padding:16px;margin:20px auto;max-width:760px;font:13px/1.6 ui-monospace,Menlo,monospace;color:#0D0E05';$('cam-nhan').querySelector('.inner').appendChild(d)}d.textContent='KIỂM TRA CẢM NHẬN\n'+lines.join('\n')}
if(CONFIG.camNhanCSV){dbg(['Đang tải link Google Sheet…']);fetch(CONFIG.camNhanCSV,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('Google trả về lỗi '+r.status);return r.text()}).then(t=>{
  const N=x=>String(x||'').normalize('NFC').trim();
  const rows=parseCSV(t).map(r=>r.map(N)).filter(r=>r.some(x=>x));
  if(rows.length<2){dbg(['Tải được link nhưng bảng chỉ có '+rows.length+' dòng (chưa có cảm nhận nào được chọn).','Dòng tiêu đề: '+(rows[0]||[]).join(' | ')]);return}
  const h=rows[0].map(x=>x.toLowerCase());
  const col2=(inc,exc=[])=>h.findIndex(x=>inc.some(k=>x.includes(k))&&!exc.some(k=>x.includes(k)));
  const CONS=['cho phép','đồng ý','công khai','ẩn danh','chế độ'];
  const iT=col2(['tên','ten','name'],['hiển thị','cho phép','đồng ý','công khai','ẩn danh']),iX=col2(['xưng']),iL=col2(['lớp','lop','khóa','khoá','class','trình độ']),
        iN=col2(['cảm nhận','cam nhan','nội dung','noi dung','feedback','chia sẻ','nhận xét'],['hiển thị','cho phép','đồng ý','công khai','ẩn danh']);
  let iC=col2(CONS);if(iC<0)iC=col2(['hiển thị']);
  let hidden=0;
  const list=rows.slice(1).map(r=>{const c=iC>=0?(r[iC]||'').toLowerCase():'';
    if(/riêng|không hiển thị|không công khai|không đồng ý|không cho phép|^false$/.test(c)){hidden++;return null}
    const anon=/ẩn danh|ẩn tên/.test(c);const ten=anon?'':((iX>=0&&r[iX]?r[iX]+' ':'')+(iT>=0?(r[iT]||''):'')).trim();
    return {ten,lop:iL>=0?(r[iL]||''):'',noiDung:iN>=0?(r[iN]||''):''}}).filter(x=>x&&x.noiDung);
  const nm=i=>i>=0?'"'+rows[0][i]+'"':'(không tìm thấy)';
  dbg(['Tải link: được','Dòng tiêu đề: '+rows[0].join(' | '),'Số dòng dữ liệu: '+(rows.length-1),
    'Cột tên: '+nm(iT),'Cột danh xưng: '+nm(iX),'Cột lớp: '+nm(iL),'Cột cảm nhận: '+nm(iN),'Cột cho phép hiển thị: '+nm(iC),
    'Bị ẩn vì riêng tư: '+hidden,'Sẽ hiện lên trang: '+list.length]);
  if(list.length)useList(list);
}).catch(e=>{dbg(['Không tải được link Google Sheet.','Lỗi: '+(e&&e.message||e),'Hãy kiểm tra: tab đã "Công bố lên web" dạng .csv chưa, và trang có đang mở trên guangyuhanyu.github.io không.'])})}

function copyTxt(t,el,ok){return async()=>{const m=$('msgZ');try{await navigator.clipboard.writeText(t);m.textContent=ok}catch(e){const r=document.createRange();r.selectNodeContents($(el));const s=getSelection();s.removeAllRanges();s.addRange(r);m.textContent='Đã chọn sẵn, nhấn Cmd+C để sao chép.'}}}
$('copyM').addEventListener('click',copyTxt('guangyuhanyu@gmail.com','mail','Đã sao chép email.'));
$('copyZ').addEventListener('click',async()=>{const m=$('msgZ');try{await navigator.clipboard.writeText('0358840411');m.textContent='Đã sao chép số Zalo.'}catch(e){const r=document.createRange();r.selectNodeContents($('zalo'));const s=getSelection();s.removeAllRanges();s.addRange(r);m.textContent='Số đã được chọn, nhấn Cmd+C để sao chép.'}});
