/*! gy-tools.js v5 · Công cụ giáo viên Guangyu Hanyu (dùng chung mọi quyển: q1…, h1–h4…)
 * Bút · dạ quang · tẩy · ô chữ (có pinyin) · dấu ✓ ✗ · trình chiếu phóng to · tải PDF · mở bảng trắng.
 * Đặt tại https://guangyuhanyu.github.io/gy-tools.js (cùng gy-pinyin.js). Chỉ chạy trên máy đã bật ?gv=1.
 * Sửa công cụ = chỉ cần up lại file này.
 */
(function(){
var GY_BASE=((document.currentScript&&document.currentScript.src)||'https://guangyuhanyu.github.io/gy-tools.js').replace(/[?#].*$/,'').replace(/[^\/]*$/,'');
var BOARD_URL='https://guangyuhanyu.github.io/bangtrang/';
var CSS=[
'html.gyT,html.gyT body{overflow-x:hidden}',
'#bBoard,#bDraw,#tBoard{display:none!important}',
'.gyInkL{position:absolute!important;top:0;left:0;width:100%;height:100%;z-index:8500;pointer-events:none;touch-action:none}',
'.gyInkL.ext{left:-600px;width:calc(100% + 1200px)}',
'html.gyAct .gyInkL{pointer-events:auto}',
'html.gyDeckP #deck .slide:not(.active)>.gyInkL{pointer-events:none!important}',
'html.gyT-pen .gyInkL,html.gyT-hl .gyInkL{cursor:crosshair}html.gyT-er .gyInkL{cursor:cell}html.gyT-tx .gyInkL{cursor:text}html.gyT-ok .gyInkL,html.gyT-no .gyInkL{cursor:copy}',
'.gyInkL svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}',
'.gyInkL svg path{fill:none;stroke-linecap:round;stroke-linejoin:round}',
'.gyNotes{position:absolute;left:0;top:0;width:100%;height:100%}',
'.gyNote{position:absolute;min-width:60px;pointer-events:none}',
'html.gyT-tx .gyNote{pointer-events:auto}',
'.gyNt,.gyNr{font-family:"Be Vietnam Pro","PingFang SC","Noto Sans SC",system-ui,sans-serif;font-weight:600;white-space:pre-wrap;word-break:break-word;max-width:820px;padding:2px 6px;border-radius:6px}',
'.gyNt{line-height:1.35;outline:none;min-height:1.35em}',
'.gyNr{display:none;line-height:1.9}.gyNr ruby{ruby-position:over}.gyNr rt{font-family:Andika,"Be Vietnam Pro",sans-serif;font-weight:400;font-size:.56em;line-height:1}',
'.gyNote.py:not(.ed) .gyNt{display:none}.gyNote.py:not(.ed) .gyNr{display:block}',
'html.gyT-tx .gyNt,html.gyT-tx .gyNote.py:not(.ed) .gyNr{background:rgba(250,244,232,.55);box-shadow:0 0 0 1.5px rgba(42,93,118,.35)}',
'html.gyT-tx .gyNt:focus{background:rgba(250,244,232,.92);box-shadow:0 0 0 2px #2a5d76}',
'.gyNh{position:absolute;left:0;top:-26px;display:none;gap:4px}',
'html.gyT-tx .gyNote:hover .gyNh,html.gyT-tx .gyNote:focus-within .gyNh{display:flex}',
'.gyNh span{display:inline-flex;align-items:center;justify-content:center;width:24px;height:22px;border-radius:6px;background:#2a5d76;color:#fbf6ec;font:700 13px system-ui;cursor:move;user-select:none;-webkit-user-select:none}',
'.gyNh span.x{background:#a83a2c;cursor:pointer}',
'html.gyP .gyZoom{transform-origin:top center;margin-left:auto!important;margin-right:auto!important}',
'html.gyP .gyZoom .navrow,html.gyP .gyZoom .back-note,html.gyP .gyZoom .pybtn,html.gyP .gyZoom #pyBtn,html.gyP .pytog,html.gyP .gyZoom .homebar,html.gyP .gyZoom .home-btn-row{visibility:hidden!important}',
'#gyBar{position:fixed;left:50%;bottom:8px;transform:translateX(-50%);z-index:9000;display:none;align-items:center;gap:4px;background:rgba(250,244,232,.97);border:1.5px solid rgba(122,92,58,.45);border-radius:16px;padding:5px 8px;box-shadow:0 4px 18px rgba(60,40,20,.22);font:600 14px/1 "Be Vietnam Pro",system-ui,sans-serif;max-width:calc(100vw - 16px);overflow-x:auto;-webkit-user-select:none;user-select:none}',
'html.gyBarOn #gyBar{display:flex}',
'#gyBar button{flex:none;height:38px;min-width:38px;padding:0 9px;border:0;border-radius:10px;background:transparent;color:#5a4632;font:600 15px/1 "Be Vietnam Pro",system-ui,sans-serif;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}',
'#gyBar button:hover{background:rgba(42,93,118,.1)}#gyBar button.on{background:#2a5d76;color:#fbf6ec}',
'#gyBar .sep{width:1px;height:26px;background:rgba(122,92,58,.25);margin:0 3px;flex:none}',
'#gyBar .sw{width:24px;min-width:24px;height:24px;padding:0;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1.5px rgba(0,0,0,.18)}#gyBar .sw.on{box-shadow:0 0 0 3px #2a5d76}',
'#gyBar .sz i{display:block;border-radius:50%;background:currentColor}',
'#gyBar .okb{color:#3f6b52;font-size:20px}#gyBar .nob{color:#a83a2c;font-size:20px}#gyBar .okb.on,#gyBar .nob.on{color:#fbf6ec}',
'#gyWm{position:fixed;right:18px;bottom:14px;z-index:7000;display:none;align-items:center;gap:8px;opacity:.16;pointer-events:none;font:700 20px/1 "Lora","Be Vietnam Pro",serif;color:#2a5d76;letter-spacing:.06em}',
'#gyWm img{width:46px;height:46px;object-fit:contain}html.gyP #gyWm{display:flex}html.gyBarOn #gyWm{bottom:66px}',
'#gyTip{position:fixed;left:50%;top:10px;transform:translateX(-50%);z-index:9001;background:rgba(44,36,31,.9);color:#f6efe2;border:1px solid rgba(200,150,30,.5);font:600 14px/1.4 "Be Vietnam Pro",system-ui,sans-serif;padding:8px 14px;border-radius:10px;display:none;pointer-events:none;max-width:90vw;text-align:center}',
'#gyHelp{position:fixed;inset:0;z-index:9500;display:none;align-items:center;justify-content:center;background:rgba(30,40,45,.35)}#gyHelp.show{display:flex}',
'#gyHelp .bx{background:#faf4e8;border:1.5px solid #8a6a45;border-radius:16px;padding:18px 24px;font:500 15px/1.5 "Be Vietnam Pro",system-ui,sans-serif;color:#2c241f;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:94vw;max-height:92vh;overflow:auto}',
'#gyHelp h4{margin:0 0 8px;font:700 18px "Be Vietnam Pro",sans-serif;color:#2a5d76}#gyHelp table{border-collapse:collapse}#gyHelp td{padding:3px 10px;vertical-align:top}',
'#gyHelp kbd{display:inline-block;min-width:22px;text-align:center;padding:1px 6px;border:1px solid #b8a98c;border-bottom-width:2px;border-radius:5px;background:#fff;font:600 13px/1.4 system-ui;margin:0 1px}',
'#gyHelp .ft{margin-top:8px;font-size:13px;color:#6b5f55}',
'@media print{#gyBar,#gyTip,#gyHelp,#gyWm{display:none!important}html.gyT,html.gyT body{overflow:visible!important}.gyZoom{transform:none!important}.gyPR{zoom:var(--gyPZ,1);overflow:clip!important}html.gyT,html.gyT *{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{margin:10mm}}'
].join('\n');

function boot(){
if(window.__gyPres)return;window.__gyPres=1;
var TEACH=false;
try{var gq=location.search.match(/[?&]gv=([01])/);if(gq)localStorage.setItem('gy-teacher',gq[1]);TEACH=localStorage.getItem('gy-teacher')==='1';}catch(e){}
if(!TEACH)return;
var IFR=false,PDOC=null;try{IFR=window.parent!==window;PDOC=IFR?window.parent.document:null;}catch(e){IFR=false;}
var DE=document.documentElement,NS='http://www.w3.org/2000/svg';
var DECK=document.getElementById('deck');
var root=null;
if(!DECK){var cand=document.querySelectorAll('.lesson,.wrap,.app,#app,.page,main'),ba=0;
 for(var ci=0;ci<cand.length;ci++){var ce=cand[ci],ar=ce.offsetWidth*ce.offsetHeight;if(ar>ba*1.05){ba=ar;root=ce;}}}
if(!DECK&&!root)return;
var st=document.createElement('style');st.id='gy-tools-css';st.textContent=CSS;(document.head||DE).appendChild(st);
DE.classList.add('gyT');

var on=false,fsUsed=false,zAdj=1,tool='hand',penC='#a83a2c',hlC='#d9a62e',szI=1,mul=1;
var PEN=[2,3.5,6],HLW=[12,18,26],FS=[18,26,36],STP=[20,28,38];
var COLORS=['#a83a2c','#2a5d76','#2c241f','#3f6b52','#c8961e','#b5522a'];
var CN=['son đỏ','lam','mực tàu','lục trúc','hoàng thổ','cam đất'],SN=['nhỏ','vừa','to'];
var OKC='#3f6b52',NOC='#a83a2c';
var TN={hand:'Con trỏ',pen:'Bút',hl:'Dạ quang',er:'Tẩy',tx:'Ô chữ',ok:'Dấu ✓ đúng',no:'Dấu ✗ sai'};
var SURF=[],U=[],RD=[];

/* ---------- mặt vẽ: bài cuộn = 1 mặt; bài slide = mỗi slide 1 mặt ---------- */
function mkSurf(host,ext){
 if(host.__gyS)return host.__gyS;
 if(getComputedStyle(host).position==='static')host.style.position='relative';
 var L=document.createElement('div');L.className='gyInkL'+(ext?' ext':'');
 L.innerHTML='<svg xmlns="'+NS+'"><g></g></svg><div class="gyNotes"></div>';
 host.appendChild(L);
 var s={host:host,ink:L,G:L.querySelector('g'),NT:L.querySelector('.gyNotes'),S:[],N:[]};
 host.__gyS=s;L.__gyS=s;SURF.push(s);bindInk(s);return s;
}
function ensure(){
 if(DECK){var sl=DECK.querySelectorAll('.slide');for(var i=0;i<sl.length;i++){var s=mkSurf(sl[i],false);
  var h=Math.max(sl[i].scrollHeight,sl[i].clientHeight);s.ink.style.height=h?h+'px':'';}}
 else mkSurf(root,root.offsetWidth<innerWidth-40);
}
function isPres(){var b=document.body,m=document.getElementById('mPresent');return b.classList.contains('present')||(!b.classList.contains('study')&&!!m&&m.classList.contains('on'));}
function syncDeck(){DE.classList.toggle('gyDeckP',!!DECK&&isPres());}
function curSurf(){
 if(!DECK)return root.__gyS||mkSurf(root,true);
 var a=isPres()?DECK.querySelector('.slide.active'):null;
 var best=null,bv=0,sl=DECK.querySelectorAll('.slide');
 for(var i=0;i<sl.length;i++){var r=sl[i].getBoundingClientRect();var v=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0))*(r.width>0?1:0);if(v>bv){bv=v;best=sl[i];}}
 var h=(a&&a.offsetParent)?a:best;return h?mkSurf(h,false):null;
}
ensure();
if(DECK&&window.MutationObserver){new MutationObserver(function(){ensure();}).observe(DECK,{childList:true,subtree:false});
 var mo=new MutationObserver(syncDeck);mo.observe(document.body,{attributes:true,attributeFilter:['class']});var mp=document.getElementById('mPresent');if(mp)mo.observe(mp,{attributes:true,attributeFilter:['class','aria-pressed']});}
if(DECK)syncDeck();

/* ---------- giao diện ---------- */
var wm=document.createElement('div');wm.id='gyWm';
var lg=document.querySelector('.banner img,.brand img,header img');
wm.innerHTML=(lg?'<img alt="" src="'+lg.src+'">':'')+'<span>GUANGYU HANYU</span>';document.body.appendChild(wm);
var tip=document.createElement('div');tip.id='gyTip';document.body.appendChild(tip);
function say(t,ms){tip.textContent=t;tip.style.display='block';clearTimeout(say.k);say.k=setTimeout(function(){tip.style.display='none';},ms||1600);}
var help=document.createElement('div');help.id='gyHelp';
var own=DECK?'<b>Phím của bài giảng (giữ như cũ):</b> <kbd>←</kbd><kbd>→</kbd> chuyển slide · <kbd>F</kbd> toàn màn hình · <kbd>P</kbd> pinyin · <kbd>T</kbd> thanh điệu / đồng hồ · <kbd>N</kbd> nghĩa · <kbd>L</kbd> danh sách từ. Ghi chú gắn theo từng slide.'
 :'<kbd>F</kbd> trình chiếu phóng to (nhấn lại để thôi) · <kbd>+</kbd><kbd>−</kbd><kbd>0</kbd> cỡ chiếu · <kbd>P</kbd> pinyin cả bài.';
help.innerHTML='<div class="bx"><h4>Phím tắt của Thầy <span style="font:500 12px system-ui;color:#8a7b6b">· gy-tools v5</span></h4><table>'+
'<tr><td><kbd>V</kbd></td><td>Con trỏ (bấm, làm bài)</td><td><kbd>B</kbd></td><td>Bút</td></tr>'+
'<tr><td><kbd>H</kbd></td><td>Bút dạ quang</td><td><kbd>E</kbd></td><td>Tẩy (chạm vào nét để xóa)</td></tr>'+
'<tr><td><kbd>G</kbd></td><td>Ô chữ (bấm chỗ muốn gõ)</td><td><kbd>D</kbd> / <kbd>S</kbd></td><td>Đóng dấu ✓ đúng / ✗ sai</td></tr>'+
'<tr><td><kbd>1</kbd>–<kbd>6</kbd></td><td>Màu: son đỏ · lam · mực tàu · lục trúc · hoàng thổ · cam đất</td><td><kbd>7</kbd><kbd>8</kbd><kbd>9</kbd> <kbd>[</kbd><kbd>]</kbd></td><td>Cỡ nhỏ · vừa · to · nhỏ dần / to dần</td></tr>'+
'<tr><td><kbd>Y</kbd></td><td>Pinyin trên chữ Hán Thầy gõ</td><td><kbd>W</kbd></td><td>Mở bảng trắng (tab mới)</td></tr>'+
'<tr><td><kbd>Z</kbd> · <kbd>⇧</kbd><kbd>Z</kbd></td><td>Hoàn tác · làm lại</td><td><kbd>X</kbd> ×2</td><td>Xóa hết ghi chú '+(DECK?'của slide đang xem':'của bài')+'</td></tr>'+
'<tr><td><kbd>K</kbd></td><td>Tải bài kèm ghi chú (lưu PDF)</td><td><kbd>M</kbd></td><td>Hiện / ẩn thanh công cụ</td></tr>'+
'<tr><td><kbd>Esc</kbd></td><td>Về con trỏ'+(DECK?'':' · nhấn lần nữa: thôi chiếu')+'</td><td><kbd>?</kbd></td><td>Mở / đóng bảng này</td></tr>'+
'</table><div class="ft">'+own+'<br>Đang gõ trong ô chữ: nhấn <kbd>Esc</kbd> để ra khỏi ô rồi mới dùng phím tắt. Ghi chú giữ đến khi đóng hoặc tải lại trang.</div></div>';
document.body.appendChild(help);help.addEventListener('click',function(){help.classList.remove('show');});
var bar=document.createElement('div');bar.id='gyBar';
var h='';
if(!DECK)h+='<button type="button" data-a="pres" title="Trình chiếu (F)">🖥</button><span class="sep"></span>';
h+='<button type="button" data-t="hand" title="Con trỏ (V)">👆</button><button type="button" data-t="pen" title="Bút (B)">✏️</button><button type="button" data-t="hl" title="Dạ quang (H)">🖍️</button><button type="button" data-t="er" title="Tẩy (E)">🧽</button><button type="button" data-t="tx" title="Ô chữ (G)"><b style="font:700 17px Lora,serif">T</b></button><button type="button" class="okb" data-t="ok" title="Dấu đúng (D)">✓</button><button type="button" class="nob" data-t="no" title="Dấu sai (S)">✗</button><span class="sep"></span>';
COLORS.forEach(function(c){h+='<button type="button" class="sw" data-c="'+c+'" style="background:'+c+'" title="Màu"></button>';});
h+='<span class="sep"></span>';
[6,9,13].forEach(function(d,i){h+='<button type="button" class="sz" data-s="'+i+'" title="Cỡ (7 8 9)"><i style="width:'+d+'px;height:'+d+'px"></i></button>';});
h+='<button type="button" data-a="sm" title="Nhỏ dần ([)">‹</button><button type="button" data-a="sb" title="To dần (])">›</button><span class="sep"></span>';
h+='<button type="button" data-a="undo" title="Hoàn tác (Z)">↶</button><button type="button" data-a="redo" title="Làm lại (⇧Z)">↷</button><button type="button" data-a="clear" title="Xóa hết (X ×2)">🗑</button><span class="sep"></span>';
h+='<button type="button" data-a="npy" title="Pinyin chữ Thầy gõ (Y)">拼</button><button type="button" data-a="wb" title="Bảng trắng (W)">▭</button><button type="button" data-a="dl" title="Tải bài kèm ghi chú (K)">⬇</button><button type="button" data-a="help" title="Phím tắt (?)">?</button><button type="button" data-a="hide" title="Ẩn thanh công cụ (M)">✕</button>';
bar.innerHTML=h;document.body.appendChild(bar);
var barOn=false;try{barOn=localStorage.getItem('gyp-bar')==='1';}catch(e){}
function applyBar(){DE.classList.toggle('gyBarOn',barOn);try{localStorage.setItem('gyp-bar',barOn?'1':'0');}catch(e){}}
applyBar();

/* ---------- trình chiếu phóng to (chỉ bài dạng cuộn) ---------- */
function zr(){var s=root.__gyS;if(!s)return 1;var w=s.ink.offsetWidth;return w?s.ink.getBoundingClientRect().width/w:1;}
function rootTop(){return root.getBoundingClientRect().top+(window.scrollY||0);}
function fit(){if(!on)return;var w=root.offsetWidth||1;root.style.transform='scale('+Math.max(0.5,Math.min(4,(innerWidth-28)/w*zAdj))+')';}
function enter(){
 if(on||DECK)return;
 var anchor=((window.scrollY||0)-rootTop())/zr();
 root.style.width=root.offsetWidth+'px';root.classList.add('gyZoom');
 on=true;DE.classList.add('gyP');fit();
 var f=DE.requestFullscreen||DE.webkitRequestFullscreen;fsUsed=false;
 if(f&&!IFR){try{var r=f.call(DE);fsUsed=true;if(r&&r.catch)r.catch(function(){fsUsed=false;});}catch(e){fsUsed=false;}}
 var fix=function(){if(!on)return;fit();window.scrollTo(0,Math.max(0,rootTop()+anchor*zr()));};
 fix();setTimeout(fix,250);setTimeout(fix,700);
 say('Đang chiếu · F để thôi · ? xem phím tắt');
}
function exit(){
 if(!on)return;
 var anchor=((window.scrollY||0)-rootTop())/zr();
 on=false;DE.classList.remove('gyP');root.style.transform='';root.style.width='';root.classList.remove('gyZoom');
 if(document.fullscreenElement||document.webkitFullscreenElement){try{(document.exitFullscreen||document.webkitExitFullscreen).call(document);}catch(e){}}
 var fix=function(){window.scrollTo(0,Math.max(0,rootTop()+anchor));};fix();setTimeout(fix,250);
}
function quit(){
 if(IFR&&PDOC){var fv=PDOC.querySelector('.fov');if(fv){on=false;try{window.parent.focus();}catch(e){}var cb=fv.querySelector('button');if(cb)cb.click();return true;}}
 if(on){exit();return true;}
 return false;
}
addEventListener('resize',function(){if(on)fit();});
function onFs(){if(on&&fsUsed&&!(document.fullscreenElement||document.webkitFullscreenElement))exit();}
document.addEventListener('fullscreenchange',onFs);document.addEventListener('webkitfullscreenchange',onFs);

/* ---------- vẽ ---------- */
function setTool(t){
 tool=t;
 DE.className=DE.className.replace(/\bgyT-\w+\b/g,'').replace(/\bgyAct\b/g,'').trim();
 if(t!=='hand'){DE.classList.add('gyAct');DE.classList.add('gyT-'+t);ensure();}
 var bs=bar.querySelectorAll('[data-t]');for(var i=0;i<bs.length;i++)bs[i].classList.toggle('on',bs[i].getAttribute('data-t')===t);
 var c=(t==='hl')?hlC:penC;
 var sw=bar.querySelectorAll('.sw');for(var j=0;j<sw.length;j++)sw[j].classList.toggle('on',/^(pen|hl|tx)$/.test(t)&&sw[j].getAttribute('data-c')===c);
 var sz=bar.querySelectorAll('.sz');for(var k=0;k<sz.length;k++)sz[k].classList.toggle('on',+sz[k].getAttribute('data-s')===szI);
}
function state(){var c=tool==='hl'?hlC:penC,t=TN[tool];if(/^(pen|hl|tx)$/.test(tool))t+=' · '+(CN[COLORS.indexOf(c)]||'');if(tool!=='hand'&&tool!=='er')t+=' · cỡ '+SN[szI]+(mul!==1?' '+Math.round(mul*100)+'%':'');say(t);}
function zOf(s){var w=s.ink.offsetWidth;return w?(s.ink.getBoundingClientRect().width/w)||1:1;}
function sz(a,s){return a[szI]*mul/zOf(s);}
function pt(e,s){var r=s.ink.getBoundingClientRect(),z=r.width/(s.ink.offsetWidth||1)||1;return{x:(e.clientX-r.left)/z,y:(e.clientY-r.top)/z};}
function pathD(p){
 if(p.length===1)return'M'+p[0].x.toFixed(1)+' '+p[0].y.toFixed(1)+'l0.01 0';
 var d='M'+p[0].x.toFixed(1)+' '+p[0].y.toFixed(1);
 for(var i=1;i<p.length-1;i++){var mx=(p[i].x+p[i+1].x)/2,my=(p[i].y+p[i+1].y)/2;d+='Q'+p[i].x.toFixed(1)+' '+p[i].y.toFixed(1)+' '+mx.toFixed(1)+' '+my.toFixed(1);}
 var l=p[p.length-1];d+='L'+l.x.toFixed(1)+' '+l.y.toFixed(1);return d;
}
function mkPath(o){var el=document.createElementNS(NS,'path');el.setAttribute('d',o.d||pathD(o.p));el.setAttribute('stroke',o.c);el.setAttribute('stroke-width',o.w);if(o.o<1)el.setAttribute('stroke-opacity',o.o);o.node=el;return el;}
function stamp(q,kind,s){
 var a=sz(STP,s),w=a/7.5,lines,p=[],d='';
 if(kind==='ok')lines=[[[q.x-a*0.45,q.y],[q.x-a*0.1,q.y+a*0.38],[q.x+a*0.5,q.y-a*0.42]]];
 else lines=[[[q.x-a*0.38,q.y-a*0.38],[q.x+a*0.38,q.y+a*0.38]],[[q.x+a*0.38,q.y-a*0.38],[q.x-a*0.38,q.y+a*0.38]]];
 lines.forEach(function(L){d+='M'+L[0][0].toFixed(1)+' '+L[0][1].toFixed(1);for(var i=1;i<L.length;i++){d+='L'+L[i][0].toFixed(1)+' '+L[i][1].toFixed(1);
  for(var k=0;k<=6;k++)p.push({x:L[i-1][0]+(L[i][0]-L[i-1][0])*k/6,y:L[i-1][1]+(L[i][1]-L[i-1][1])*k/6});}});
 return{c:kind==='ok'?OKC:NOC,w:w,o:1,p:p,d:d};
}
function act(a){U.push(a);RD=[];}
function render(s){while(s.G.firstChild)s.G.removeChild(s.G.firstChild);s.NT.innerHTML='';s.S.forEach(function(o){s.G.appendChild(mkPath(o));});s.N.forEach(function(n){s.NT.appendChild(mkNote(n,s));});}
function blurNote(){var ae=document.activeElement;if(ae&&ae.classList&&ae.classList.contains('gyNt')){ae.blur();return true;}return false;}
var drawing=null,dS=null;
function bindInk(s){
 var L=s.ink;
 L.addEventListener('pointerdown',function(e){
  if(tool==='hand')return;
  if(tool==='tx'){
   if(e.target.closest('.gyNote'))return;
   e.preventDefault();if(blurNote())return;
   var fs=sz(FS,s),q=pt(e,s),n={x:q.x,y:q.y-fs*0.7,c:penC,f:fs,t:''};
   s.N.push(n);act({k:'n+',n:n,s:s});var el=mkNote(n,s);s.NT.appendChild(el);setTimeout(function(){el.querySelector('.gyNt').focus();},0);return;
  }
  e.preventDefault();e.stopPropagation();
  if(tool==='ok'||tool==='no'){var o=stamp(pt(e,s),tool,s);s.S.push(o);s.G.appendChild(mkPath(o));act({k:'s',o:o,s:s});return;}
  try{L.setPointerCapture(e.pointerId);}catch(_){}
  dS=s;
  if(tool==='er'){drawing={er:true,rm:[]};erase(pt(e,s),s);return;}
  var o2={c:tool==='hl'?hlC:penC,w:sz(tool==='hl'?HLW:PEN,s),o:tool==='hl'?0.38:1,p:[pt(e,s)]};
  drawing=o2;s.G.appendChild(mkPath(o2));
 });
 L.addEventListener('pointermove',function(e){
  if(!drawing||dS!==s)return;
  if(drawing.er){erase(pt(e,s),s);return;}
  var evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];if(!evs.length)evs=[e];var z=zOf(s);
  for(var i=0;i<evs.length;i++){var q=pt(evs[i],s),l=drawing.p[drawing.p.length-1];if(Math.abs(q.x-l.x)+Math.abs(q.y-l.y)>0.6/z)drawing.p.push(q);}
  drawing.node.setAttribute('d',pathD(drawing.p));
 });
 var end=function(){
  if(!drawing||dS!==s)return;
  if(drawing.er){if(drawing.rm.length)act({k:'e',l:drawing.rm,s:s});}
  else{
   if(tool==='hl'&&drawing.p.length>2){var a=drawing.p[0],b=drawing.p[drawing.p.length-1],dx=b.x-a.x,dy=b.y-a.y,len=Math.sqrt(dx*dx+dy*dy)||1,mx=0;
    drawing.p.forEach(function(q){var dd=Math.abs((q.x-a.x)*dy-(q.y-a.y)*dx)/len;if(dd>mx)mx=dd;});
    if(mx<6/zOf(s)&&Math.abs(dy)<Math.abs(dx)*0.25){drawing.p=[a,{x:b.x,y:a.y}];drawing.node.setAttribute('d',pathD(drawing.p));}}
   s.S.push(drawing);act({k:'s',o:drawing,s:s});
  }
  drawing=null;dS=null;
 };
 L.addEventListener('pointerup',end);L.addEventListener('pointercancel',end);
 /* đang dùng công cụ: không để cú bấm/kéo lọt xuống bài (tránh bài tự chuyển slide) */
 ['click','dblclick','mousedown','mouseup','pointerup','pointermove','touchstart','touchend'].forEach(function(ev){L.addEventListener(ev,function(e){if(tool!=='hand')e.stopPropagation();});});
}
function erase(q,s){
 var rz=10/zOf(s);
 for(var i=s.S.length-1;i>=0;i--){var o=s.S[i],r=o.w/2+rz,hit=false;
  for(var j=0;j<o.p.length&&!hit;j++){var dx=o.p[j].x-q.x,dy=o.p[j].y-q.y;if(dx*dx+dy*dy<r*r)hit=true;
   if(!hit&&j>0){var a=o.p[j-1],b=o.p[j],vx=b.x-a.x,vy=b.y-a.y,L=vx*vx+vy*vy;if(L>0){var t=((q.x-a.x)*vx+(q.y-a.y)*vy)/L;if(t>0&&t<1){var px=a.x+t*vx-q.x,py=a.y+t*vy-q.y;if(px*px+py*py<r*r)hit=true;}}}}
  if(hit){s.S.splice(i,1);if(o.node&&o.node.parentNode)o.node.parentNode.removeChild(o.node);drawing.rm.push({o:o,i:i});}
 }
}
function mkNote(n,s){
 var w=document.createElement('div');w.className='gyNote';w.style.left=n.x+'px';w.style.top=n.y+'px';
 w.innerHTML='<div class="gyNh"><span class="mv" title="Kéo để di chuyển">⠿</span><span class="x" title="Xóa ô chữ">✕</span></div><div class="gyNt" contenteditable="true" spellcheck="false"></div><div class="gyNr"></div>';
 var t=w.querySelector('.gyNt'),rb=w.querySelector('.gyNr');
 t.style.color=n.c;t.style.fontSize=n.f+'px';t.textContent=n.t;rb.style.color=n.c;rb.style.fontSize=n.f+'px';
 n.el=w;if(NPY)rubyNote(n);
 t.addEventListener('focus',function(){w.classList.add('ed');});
 rb.addEventListener('pointerdown',function(e){if(tool!=='tx')return;e.preventDefault();e.stopPropagation();t.focus();});
 t.addEventListener('input',function(){n.t=t.innerText;});
 t.addEventListener('blur',function(){w.classList.remove('ed');n.t=t.innerText;if(NPY)rubyNote(n);
  if(!n.t.trim()){var k=s.N.indexOf(n);if(k>=0)s.N.splice(k,1);U=U.filter(function(x){return x.n!==n;});RD=RD.filter(function(x){return x.n!==n;});if(w.parentNode)w.parentNode.removeChild(w);}});
 w.querySelector('.x').addEventListener('pointerdown',function(e){e.preventDefault();e.stopPropagation();var k=s.N.indexOf(n);if(k>=0){s.N.splice(k,1);act({k:'n-',n:n,s:s});}w.parentNode.removeChild(w);});
 var mv=w.querySelector('.mv');
 mv.addEventListener('pointerdown',function(e){e.preventDefault();e.stopPropagation();try{mv.setPointerCapture(e.pointerId);}catch(_){}var a=pt(e,s),ox=n.x,oy=n.y;
  function m(ev){var q=pt(ev,s);n.x=ox+q.x-a.x;n.y=oy+q.y-a.y;w.style.left=n.x+'px';w.style.top=n.y+'px';}
  function u(){mv.removeEventListener('pointermove',m);mv.removeEventListener('pointerup',u);}
  mv.addEventListener('pointermove',m);mv.addEventListener('pointerup',u);});
 return w;
}
function doA(a,back){
 var s=a.s;
 if(a.k==='s'){if(back){var i=s.S.indexOf(a.o);if(i>=0)s.S.splice(i,1);}else s.S.push(a.o);}
 else if(a.k==='e'){if(back)a.l.slice().reverse().forEach(function(x){s.S.splice(Math.min(x.i,s.S.length),0,x.o);});else a.l.forEach(function(x){var i=s.S.indexOf(x.o);if(i>=0)s.S.splice(i,1);});}
 else if(a.k==='n+'||a.k==='n-'){var add=(a.k==='n+')!==back,k=s.N.indexOf(a.n);if(add){if(k<0)s.N.push(a.n);}else if(k>=0)s.N.splice(k,1);}
 else if(a.k==='c'){if(back){s.S=a.S.slice();s.N=a.N.slice();}else{s.S=[];s.N=[];}}
 render(s);
}
function undo(){blurNote();if(!U.length){say('Không còn gì để hoàn tác');return;}var a=U.pop();doA(a,true);RD.push(a);}
function redo(){if(!RD.length){say('Không còn gì để làm lại');return;}var a=RD.pop();doA(a,false);U.push(a);}
var clrArm=0;
function clearAll(){
 var s=curSurf();if(!s||(!s.S.length&&!s.N.length)){say(DECK?'Slide này chưa có ghi chú':'Chưa có ghi chú nào');return;}
 if(Date.now()-clrArm>2500){clrArm=Date.now();say('Nhấn X lần nữa để xóa hết ghi chú'+(DECK?' của slide này':''));return;}
 clrArm=0;act({k:'c',S:s.S.slice(),N:s.N.slice(),s:s});s.S=[];s.N=[];render(s);say('Đã xóa · Z để lấy lại');
}
function pyBtn(){return document.querySelector('.lesson [data-py],.wrap [data-py]')||document.getElementById('pyBtn')||document.getElementById('tp');}
function togglePy(){var b=pyBtn();if(b){b.click();return true;}return false;}
function zoomBy(f){zAdj=f===0?1:Math.max(0.5,Math.min(2,zAdj*f));fit();say('Cỡ chiếu '+Math.round(zAdj*100)+'%');}
function sizeBy(f){mul=Math.max(0.4,Math.min(3,mul*f));if(tool==='hand'||tool==='er')setTool('pen');state();}
function openBoard(){var w=null;try{w=window.open(BOARD_URL,'gy-bangtrang');}catch(e){}if(w){try{w.focus();}catch(e){}}else say('Safari chặn mở tab – Thầy cho phép cửa sổ bật lên giúp em');}

/* ---------- pinyin cho chữ Thầy gõ ---------- */
var NPY=false,PYD=null,pyQ=null;
function loadPy(cb){
 if(PYD){cb();return;}if(window.GY_PY){prepPy();cb();return;}if(pyQ){pyQ.push(cb);return;}
 pyQ=[cb];say('Đang tải từ điển pinyin…',4000);
 var sc=document.createElement('script');sc.src=GY_BASE+'gy-pinyin.js?v=1';
 sc.onload=function(){prepPy();var q=pyQ;pyQ=null;q.forEach(function(f){f();});};
 sc.onerror=function(){pyQ=null;say('Không tải được từ điển pinyin – Thầy kiểm tra mạng rồi nhấn Y lại');};
 (document.head||DE).appendChild(sc);
}
function prepPy(){if(PYD||!window.GY_PY)return;var d=window.GY_PY,m={},cs=Array.from(d.c),r=d.r.split(' ');for(var i=0;i<cs.length;i++)m[cs[i]]=r[i];PYD={m:m,p:d.p};}
function tone(p){if(/[āēīōūǖ]/.test(p))return 1;if(/[áéíóúǘ]/.test(p))return 2;if(/[ǎěǐǒǔǚ]/.test(p))return 3;if(/[àèìòùǜ]/.test(p))return 4;return 0;}
function toPy(text){
 var out=[],ch=Array.from(text),i=0;
 while(i<ch.length){var c=ch[i];if(!PYD.m[c]){out.push({c:c});i++;continue;}
  var done=false;for(var L=4;L>=2&&!done;L--){if(i+L>ch.length)continue;var w=ch.slice(i,i+L).join(''),p=PYD.p[w];if(p){var ps=p.split(' ');for(var k=0;k<L;k++)out.push({c:ch[i+k],p:ps[k]});i+=L;done=true;}}
  if(!done){out.push({c:c,p:PYD.m[c]});i++;}}
 for(var k=0;k<out.length-1;k++){var a=out[k],b=out[k+1];if(!a.p||!b.p)continue;var t=tone(b.p);
  if(a.c==='不'&&a.p==='bù'&&t===4)a.p='bú';
  if(b.c==='儿'&&b.p==='ér'&&/[一-鿿]/.test(a.c)&&'女婴幼孤健男胎宠'.indexOf(a.c)<0&&!(out[k+2]&&out[k+2].c==='童'))b.p='r';
  if(a.c==='一'&&a.p==='yī'){var pv=out[k-1];if(pv&&/[第一二三四五六七八九十〇零两]/.test(pv.c))continue;if(/[一二三四五六七八九十〇零两]/.test(b.c))continue;a.p=(t===4||t===0)?'yí':'yì';}}
 return out;
}
function esc(x){return x.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
function rubyNote(n){var w=n.el;if(!w)return;var rb=w.querySelector('.gyNr');if(!NPY||!PYD){w.classList.remove('py');return;}
 rb.innerHTML=toPy(n.t||'').map(function(o){return o.c==='\n'?'<br>':(o.p?'<ruby>'+esc(o.c)+'<rt>'+o.p+'</rt></ruby>':esc(o.c));}).join('');w.classList.add('py');}
function allNotes(){var a=[];SURF.forEach(function(s){a=a.concat(s.N);});return a;}
function toggleNotePy(){
 if(NPY){NPY=false;allNotes().forEach(rubyNote);say('Ẩn pinyin trên chữ Thầy gõ');return;}
 loadPy(function(){NPY=true;var a=allNotes();a.forEach(rubyNote);say('Hiện pinyin trên chữ Thầy gõ'+(a.length?'':' (gõ chữ bằng phím G)'));});
}

/* ---------- tải nguyên bài kèm ghi chú (in → Lưu dưới dạng PDF) ---------- */
var saved=null,frozen=[],PR=null,deckMode=null;
function freezeMedia(){
 frozen=[];
 for(var i=0;i<document.styleSheets.length;i++){var sh=document.styleSheets[i],rs;
  if(sh.ownerNode&&sh.ownerNode.id==='gy-tools-css')continue;
  try{rs=sh.cssRules;}catch(e){continue;}
  (function walk(list){for(var j=0;j<list.length;j++){var r=list[j];
   if(r.media&&r.cssRules&&r.type===4){var mt=r.media.mediaText,nt=null;
    if(/print/.test(mt))nt='not all';
    else if(/width|height|orientation|aspect|resolution|hover|pointer/.test(mt))nt=window.matchMedia(mt).matches?'all':'not all';
    if(nt!==null){frozen.push([r,mt]);try{r.media.mediaText=nt;}catch(e){}}
    walk(r.cssRules);}}})(rs);
 }
}
function thawMedia(){frozen.forEach(function(x){try{x[0].media.mediaText=x[1];}catch(e){}});frozen=[];}
function prePrint(){
 if(saved)return;
 PR=DECK||root;freezeMedia();
 var cs=getComputedStyle(PR);
 saved={w:PR.style.width,mw:PR.style.maxWidth,fs:PR.style.fontSize,pd:PR.style.padding};
 var w=PR.offsetWidth;PR.style.width=w+'px';PR.style.maxWidth=w+'px';PR.style.fontSize=cs.fontSize;PR.style.padding=cs.padding;
 PR.classList.add('gyPR');PR.style.setProperty('--gyPZ',Math.min(1,700/w).toFixed(3));
}
function postPrint(){
 if(!saved)return;thawMedia();
 PR.style.width=saved.w;PR.style.maxWidth=saved.mw;PR.style.fontSize=saved.fs;PR.style.padding=saved.pd;PR.style.removeProperty('--gyPZ');PR.classList.remove('gyPR');
 saved=null;if(on){root.style.width=root.offsetWidth+'px';fit();}
 if(deckMode){var b=document.getElementById(deckMode);deckMode=null;if(b)setTimeout(function(){b.click();},50);}
}
addEventListener('beforeprint',prePrint);addEventListener('afterprint',postPrint);
function download(){
 blurNote();
 var wait=350;
 if(DECK){var pres=isPres();
  var ms=document.getElementById('mStudy');if(pres&&ms){deckMode='mPresent';ms.click();wait=900;}}
 say('Hộp in mở ra → góc dưới bên trái chọn “PDF” → “Lưu dưới dạng PDF”',3500);
 setTimeout(function(){ensure();prePrint();try{window.print();}finally{setTimeout(postPrint,300);}},wait);
}

/* ---------- nút & phím (bắt trước phím của bài) ---------- */
bar.addEventListener('click',function(e){
 var b=e.target.closest('button');if(!b)return;
 if(b.hasAttribute('data-t')){setTool(b.getAttribute('data-t'));return;}
 if(b.hasAttribute('data-c')){var c=b.getAttribute('data-c');if(tool==='hl')hlC=c;else{penC=c;if(!/^(pen|tx)$/.test(tool))tool='pen';}setTool(tool);
  var ae=document.activeElement;if(ae&&ae.classList&&ae.classList.contains('gyNt'))ae.style.color=c;return;}
 if(b.hasAttribute('data-s')){szI=+b.getAttribute('data-s');mul=1;if(tool==='hand'||tool==='er')tool='pen';setTool(tool);return;}
 var a=b.getAttribute('data-a');
 if(a==='pres'){on?exit():enter();}else if(a==='undo')undo();else if(a==='redo')redo();else if(a==='clear')clearAll();
 else if(a==='npy')toggleNotePy();else if(a==='wb')openBoard();else if(a==='sm')sizeBy(1/1.2);else if(a==='sb')sizeBy(1.2);else if(a==='dl')download();
 else if(a==='help')help.classList.toggle('show');else if(a==='hide'){barOn=false;applyBar();}
});
bar.addEventListener('pointerdown',function(e){if(e.target.closest('.sw'))e.preventDefault();});
addEventListener('keydown',function(e){
 var fov=document.querySelector('.fov');
 if(fov){var fr=fov.querySelector('iframe');try{if(fr)fr.contentWindow.focus();}catch(_){}return;}
 var t=e.target;
 if(t&&t.classList&&t.classList.contains('gyNt')){e.stopPropagation();if(e.key==='Escape'){e.preventDefault();t.blur();}return;}
 if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;
 if(e.metaKey||e.ctrlKey||e.altKey)return;
 var k=e.key,kl=k.length===1?k.toLowerCase():k,done=true,c;
 if(k==='?'){help.classList.toggle('show');}
 else if(help.classList.contains('show')&&k==='Escape'){help.classList.remove('show');}
 else switch(kl){
  case 'v':setTool('hand');state();break;
  case 'b':setTool('pen');state();break;
  case 'h':setTool('hl');state();break;
  case 'e':setTool('er');state();break;
  case 'g':setTool('tx');state();break;
  case 'd':setTool('ok');state();break;
  case 's':setTool('no');state();break;
  case 'y':toggleNotePy();break;
  case 'w':openBoard();break;
  case 'k':download();break;
  case 'm':barOn=!barOn;applyBar();break;
  case 'z':if(e.shiftKey)redo();else undo();break;
  case 'x':clearAll();break;
  case '[':sizeBy(1/1.2);break;
  case ']':sizeBy(1.2);break;
  case 'f':if(DECK)done=false;else{on?exit():enter();}break;
  case 'p':if(DECK||!togglePy())done=false;break;
  case '+':case '=':if(on)zoomBy(1.15);else done=false;break;
  case '-':case '_':if(on)zoomBy(1/1.15);else done=false;break;
  case '0':if(on)zoomBy(0);else done=false;break;
  case 'Escape':
   if(tool!=='hand'){setTool('hand');state();}
   else if(!quit())done=false;
   break;
  default:
   if(/^[1-6]$/.test(k)){c=COLORS[+k-1];if(tool==='hl')hlC=c;else{penC=c;if(!/^(pen|tx)$/.test(tool))tool='pen';}setTool(tool);state();}
   else if(/^[7-9]$/.test(k)){szI=+k-7;mul=1;if(tool==='hand'||tool==='er')tool='pen';setTool(tool);state();}
   else done=false;
 }
 if(done){e.preventDefault();e.stopImmediatePropagation();}
},true);
setTool('hand');
try{if(IFR&&PDOC&&PDOC.documentElement.classList.contains('gyP')){setTimeout(function(){enter();try{window.focus();}catch(e){}},60);}}catch(e){}
window.GYPresent={enter:enter,exit:exit,on:function(){return on;},surfaces:function(){return SURF;},S:function(){var s=curSurf();return s?s.S:[];},N:function(){var s=curSurf();return s?s.N:[];},cur:curSurf,deck:!!DECK};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
