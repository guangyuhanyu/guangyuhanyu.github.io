/*! gy-tools.js v7.3 · Công cụ giáo viên Guangyu Hanyu (dùng chung mọi quyển: q1…, h1–h4…)
 * Bút · dạ quang · tẩy · ô chữ (có pinyin) · dấu ✓ ✗ · trình chiếu phóng to · tải PDF · mở bảng trắng.
 * Đặt tại https://guangyuhanyu.github.io/gy-tools.js (cùng gy-pinyin.js). Chỉ chạy trên máy đã bật ?gv=1.
 * Sửa công cụ = chỉ cần up lại file này.
 */
(function(){
var GY_BASE=((document.currentScript&&document.currentScript.src)||'https://guangyuhanyu.github.io/gy-tools.js').replace(/[?#].*$/,'').replace(/[^\/]*$/,'');
var BOARD_URL='https://guangyuhanyu.github.io/bangtrang/';
var CSS=[
'@media print{.gyPR.gyPV{overflow:visible!important}html.gyPrn .gyInkL.ext{left:0!important;width:100%!important}html.gyPrn .gyInkL.ext>svg,html.gyPrn .gyInkL.ext>.gyNotes{left:-600px!important;width:1px!important;height:1px!important;overflow:visible!important}html.gyPrn .gyPH>svg{width:1px!important;height:1px!important}html.gyPrn .gyNote{width:max-content}}',
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
'html:not(.gyAct) .gyNote,html.gyT-tx .gyNote{pointer-events:auto;cursor:move;touch-action:none}html .gyNote.ed{cursor:text}','html:not(.gyAct) .gyNote:not(.ed):hover .gyNt,html:not(.gyAct) .gyNote.py:not(.ed):hover .gyNr{box-shadow:0 0 0 1.5px rgba(42,93,118,.45);background:rgba(250,244,232,.45)}','.gyNote.drag{opacity:.85}.gyNote.drag .gyNt,.gyNote.drag .gyNr{box-shadow:0 0 0 2px #2a5d76!important}','.gyNote.ed .gyNt{background:rgba(250,244,232,.92)!important;box-shadow:0 0 0 2px #2a5d76!important;cursor:text}','.gyNh .mv{display:none!important}','.gyStp{filter:drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 1.5px #fff)}',
'.gyNt,.gyNr{font-family:"Be Vietnam Pro","PingFang SC","Noto Sans SC",system-ui,sans-serif;font-weight:600;white-space:pre-wrap;word-break:break-word;max-width:820px;padding:2px 6px;border-radius:6px}',
'.gyNt{line-height:1.35;outline:none;min-height:1.35em}',
'.gyNr{display:none;line-height:1.9}.gyNr ruby{ruby-position:over}.gyNr rt{font-family:Andika,"Be Vietnam Pro",sans-serif;font-weight:400;font-size:.56em;line-height:1}',
'.gyNote.py:not(.ed) .gyNt{display:none}.gyNote.py:not(.ed) .gyNr{display:block}',
'html.gyT-tx .gyNt,html.gyT-tx .gyNote.py:not(.ed) .gyNr{background:rgba(250,244,232,.55);box-shadow:0 0 0 1.5px rgba(42,93,118,.35)}',
'html.gyT-tx .gyNt:focus{background:rgba(250,244,232,.92);box-shadow:0 0 0 2px #2a5d76}',
'.gyNh{position:absolute;left:0;top:-26px;display:none;gap:4px}',
'html.gyT-tx .gyNote:hover .gyNh,html:not(.gyAct) .gyNote:hover .gyNh,.gyNote.ed .gyNh{display:flex}',
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
'#gyBar button.okb,#gyBar button.nob{color:#fff;font:900 21px/1 system-ui,sans-serif;width:34px;min-width:34px;height:34px;padding:0;margin:0 2px;border-radius:50%;text-shadow:0 1px 1px rgba(0,0,0,.25)}#gyBar button.okb{background:#00b14f;box-shadow:0 2px 6px rgba(0,150,70,.45)}#gyBar button.nob{background:#ff1744;box-shadow:0 2px 6px rgba(220,0,50,.45)}#gyBar button.okb:hover{background:#00c853}#gyBar button.nob:hover{background:#ff3d5a}#gyBar button.okb.on{background:#00b14f;box-shadow:0 0 0 3px #fbf6ec,0 0 0 5.5px #00b14f}#gyBar button.nob.on{background:#ff1744;box-shadow:0 0 0 3px #fbf6ec,0 0 0 5.5px #ff1744}',
'#gyWm{position:fixed;right:18px;bottom:14px;z-index:7000;display:none;align-items:center;gap:8px;opacity:.16;pointer-events:none;font:700 20px/1 "Lora","Be Vietnam Pro",serif;color:#2a5d76;letter-spacing:.06em}',
'#gyWm img{width:46px;height:46px;object-fit:contain}html.gyP #gyWm{display:flex}html.gyBarOn #gyWm{bottom:66px}',
'#gyTip{position:fixed;left:50%;top:10px;transform:translateX(-50%);z-index:9001;background:rgba(44,36,31,.9);color:#f6efe2;border:1px solid rgba(200,150,30,.5);font:600 14px/1.4 "Be Vietnam Pro",system-ui,sans-serif;padding:8px 14px;border-radius:10px;display:none;pointer-events:none;max-width:90vw;text-align:center}',
'#gyHelp{position:fixed;inset:0;z-index:9500;display:none;align-items:center;justify-content:center;background:rgba(30,40,45,.35)}#gyHelp.show{display:flex}',
'#gyHelp .bx{background:#faf4e8;border:1.5px solid #8a6a45;border-radius:16px;padding:18px 24px;font:500 15px/1.5 "Be Vietnam Pro",system-ui,sans-serif;color:#2c241f;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:94vw;max-height:92vh;overflow:auto}',
'#gyHelp h4{margin:0 0 8px;font:700 18px "Be Vietnam Pro",sans-serif;color:#2a5d76}#gyHelp table{border-collapse:collapse}#gyHelp td{padding:3px 10px;vertical-align:top}',
'#gyHelp kbd{display:inline-block;min-width:22px;text-align:center;padding:1px 6px;border:1px solid #b8a98c;border-bottom-width:2px;border-radius:5px;background:#fff;font:600 13px/1.4 system-ui;margin:0 1px}',
'#gyHelp .ft{margin-top:8px;font-size:13px;color:#6b5f55}',
'#gyLz{position:fixed;left:0;top:0;width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;z-index:2147483000;pointer-events:none;display:none;will-change:transform;background:radial-gradient(circle,#fff 0 16%,#ff5a4e 30%,rgba(229,57,53,.9) 46%,rgba(229,57,53,.35) 62%,rgba(229,57,53,0) 72%);box-shadow:0 0 18px 4px rgba(229,57,53,.35)}html.gyLzOn #gyLz.in{display:block}html.gyLzOn,html.gyLzOn *{cursor:none!important}',
'.gyNote.sel .gyNt,.gyNote.sel .gyNr{box-shadow:0 0 0 2px rgba(207,61,47,.75)!important;border-radius:4px}',
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
if(!DECK){var cand=[].slice.call(document.querySelectorAll('.gy-root,.lesson,.wrap,.app,#app,.page,main,.bai,.gy-khung,.box')),ba=0;
 /* trang lạ: thêm các khối lớn nằm thẳng trong body (bỏ nền cố định) */
 [].slice.call(document.body.children).forEach(function(e){if(/^(SCRIPT|STYLE|LINK|TEMPLATE)$/.test(e.tagName))return;var ps=getComputedStyle(e).position;if(ps==='fixed'||ps==='absolute')return;if(cand.indexOf(e)<0)cand.push(e);});
 for(var ci=0;ci<cand.length;ci++){var ce=cand[ci],ar=ce.offsetWidth*ce.offsetHeight;if(ar>ba*1.05){ba=ar;root=ce;}}}
if(!DECK&&!root)return;
var st=document.createElement('style');st.id='gy-tools-css';st.textContent=CSS;(document.head||DE).appendChild(st);
DE.classList.add('gyT');

var on=false,fsUsed=false,zAdj=1,tool='hand',penC='#e53935',hlC='#ffe14d',lzC='#e53935',szI=0,txI=1,mul=1,lzOn=false,selN=null;
var PEN=[2,3.5,6],HLW=[12,18,26],FS=[18,26,36],STP=[20,28,38];
var COLORS=['#e53935','#1e88e5','#222222','#2eaa4a','#d81b60','#fb8c00'];
var CN=['đỏ tươi','xanh dương','đen','xanh lá','hồng cánh sen','cam'],SN=['nhỏ','vừa','to'];
var HLC=['#ffe14d','#ff9ec7','#8ef0c8','#8fd3ff','#ffc29a','#c9a7ff'],HN=['vàng chanh','hồng phấn','xanh bạc hà','xanh da trời','cam đào','tím oải hương'];
var OKC='#00b14f',NOC='#ff1744';
var TN={hand:'Con trỏ',pen:'Bút',hl:'Dạ quang',er:'Tẩy',tx:'Ô chữ',ok:'Dấu ✓ đúng',no:'Dấu ✗ sai',lz:'Bút laze'};
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
(function(){var tgt=DECK||root;
 if(window.ResizeObserver){try{new ResizeObserver(relayAll).observe(tgt);}catch(_){}}
 if(window.MutationObserver){new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var t=ms[i].target;
   if(t.nodeType!==1)t=t.parentNode;if(!t||(t.closest&&t.closest('.gyInkL')))continue;
   if(ms[i].type==='attributes'&&t.ownerSVGElement)continue;relayAll();return;}})
  .observe(tgt,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','hidden','open'],characterData:true});}
 addEventListener('resize',relayAll);addEventListener('load',relayAll);
 try{document.fonts.ready.then(relayAll);document.fonts.addEventListener('loadingdone',relayAll);}catch(_){}
 setInterval(relayAll,1500);
})();
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
help.innerHTML='<div class="bx"><h4>Phím tắt của Thầy <span style="font:500 12px system-ui;color:#8a7b6b">· gy-tools v6</span></h4><table>'+
'<tr><td><kbd>V</kbd></td><td>Con trỏ (bấm, làm bài)</td><td><kbd>B</kbd></td><td>Bút</td></tr>'+
'<tr><td><kbd>H</kbd></td><td>Bút dạ quang</td><td><kbd>E</kbd></td><td>Tẩy (chạm vào nét để xóa)</td></tr>'+
'<tr><td><kbd>G</kbd></td><td>Ô chữ (bấm chỗ muốn gõ)</td><td><kbd>D</kbd> / <kbd>S</kbd></td><td>Đóng dấu ✓ đúng / ✗ sai</td></tr>'+
'<tr><td><kbd>1</kbd>–<kbd>6</kbd></td><td>Màu bút: đỏ · xanh dương · đen · xanh lá · hồng · cam (dạ quang: vàng · hồng · bạc hà · da trời · đào · tím)</td><td><kbd>7</kbd><kbd>8</kbd><kbd>9</kbd> <kbd>[</kbd><kbd>]</kbd></td><td>Cỡ nhỏ · vừa · to · nhỏ dần / to dần</td></tr>'+
'<tr><td><kbd>R</kbd></td><td>Bút laze: chấm đỏ lớn, bật/tắt (vẫn viết, gõ được như thường)</td><td><kbd>Y</kbd></td><td>Pinyin trên chữ Hán Thầy gõ</td></tr>'+
'<tr><td><kbd>W</kbd></td><td>Mở bảng trắng (tab mới)</td><td></td><td></td></tr>'+
'<tr><td><kbd>Z</kbd> · <kbd>⇧</kbd><kbd>Z</kbd></td><td>Hoàn tác · làm lại</td><td><kbd>X</kbd> ×2</td><td>Xóa hết ghi chú '+(DECK?'của slide đang xem':'của bài')+'</td></tr>'+
'<tr><td><kbd>K</kbd></td><td>Tải bài kèm ghi chú (lưu PDF)</td><td><kbd>M</kbd></td><td>Hiện / ẩn thanh công cụ</td></tr>'+
'<tr><td><kbd>Esc</kbd></td><td>Về con trỏ'+(DECK?'':' · nhấn lần nữa: thôi chiếu')+'</td><td><kbd>?</kbd></td><td>Mở / đóng bảng này</td></tr>'+
'</table><div class="ft">'+own+'<br>Đang gõ trong ô chữ: nhấn <kbd>Esc</kbd> để ra khỏi ô rồi mới dùng phím tắt. Ghi chú giữ đến khi đóng hoặc tải lại trang.</div></div>';
document.body.appendChild(help);help.addEventListener('click',function(){help.classList.remove('show');});
var bar=document.createElement('div');bar.id='gyBar';
var h='';
if(!DECK)h+='<button type="button" data-a="pres" title="Trình chiếu (F)">🖥</button><span class="sep"></span>';
h+='<button type="button" data-t="hand" title="Con trỏ (V)">👆</button><button type="button" data-t="pen" title="Bút (B)">✏️</button><button type="button" data-t="hl" title="Dạ quang (H)">🖍️</button><button type="button" data-t="er" title="Tẩy (E)">🧽</button><button type="button" data-t="tx" title="Ô chữ (G)"><b style="font:700 17px Lora,serif">T</b></button><button type="button" class="okb" data-t="ok" title="Dấu đúng (D)">✓</button><button type="button" class="nob" data-t="no" title="Dấu sai (S)">✗</button><button type="button" data-t="lz" title="Bút laze (R)">🔴</button><span class="sep"></span>';
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
 if(IFR&&PDOC){var fv=PDOC.querySelector('.fov,.gy-ov');if(fv){on=false;try{window.parent.focus();}catch(e){}var cb=fv.querySelector('.gy-ovx')||fv.querySelector('button');if(cb)cb.click();return true;}}
 if(on){exit();return true;}
 return false;
}
addEventListener('resize',function(){if(on)fit();});
function onFs(){if(on&&fsUsed&&!(document.fullscreenElement||document.webkitFullscreenElement))exit();}
document.addEventListener('fullscreenchange',onFs);document.addEventListener('webkitfullscreenchange',onFs);

/* ---------- vẽ ---------- */
function setTool(t){
 if(t==='lz'){toggleLz();return;}
 tool=t;
 DE.className=DE.className.replace(/\bgyT-\w+\b/g,'').replace(/\bgyAct\b/g,'').trim();
 if(t!=='hand'&&t!=='lz'){DE.classList.add('gyAct');ensure();}if(t!=='hand')DE.classList.add('gyT-'+t);
 var bs=bar.querySelectorAll('[data-t]');for(var i=0;i<bs.length;i++)bs[i].classList.toggle('on',bs[i].getAttribute('data-t')===t);
 var pal=(t==='hl')?HLC:COLORS,c=(t==='hl')?hlC:(t==='lz'?lzC:penC);
 var sw=bar.querySelectorAll('.sw');for(var j=0;j<sw.length;j++){sw[j].style.background=pal[j];sw[j].setAttribute('data-c',pal[j]);sw[j].classList.toggle('on',/^(pen|hl|tx|lz)$/.test(t)&&pal[j]===c);}
 var sz=bar.querySelectorAll('.sz');for(var k=0;k<sz.length;k++)sz[k].classList.toggle('on',+sz[k].getAttribute('data-s')===(t==='tx'?txI:szI));
 var lb=bar.querySelector('[data-t="lz"]');if(lb)lb.classList.toggle('on',lzOn);
}
function state(){var t=TN[tool];if(tool==='hl')t+=' · '+(HN[HLC.indexOf(hlC)]||'');else if(/^(pen|tx)$/.test(tool))t+=' · '+(CN[COLORS.indexOf(penC)]||'');else if(tool==='lz')t+=' · '+(CN[COLORS.indexOf(lzC)]||'');if(!/^(hand|er|lz)$/.test(tool))t+=' · cỡ '+SN[tool==='tx'?txI:szI]+(mul!==1?' '+Math.round(mul*100)+'%':'');say(t);}
function zOf(s){var w=s.ink.offsetWidth;return w?(s.ink.getBoundingClientRect().width/w)||1:1;}
function sz(a,s){return a[szI]*mul/zOf(s);}
function pt(e,s){var r=s.ink.getBoundingClientRect(),z=r.width/(s.ink.offsetWidth||1)||1;return{x:(e.clientX-r.left)/z,y:(e.clientY-r.top)/z};}
function pathD(p){
 if(p.length===1)return'M'+p[0].x.toFixed(1)+' '+p[0].y.toFixed(1)+'l0.01 0';
 var d='M'+p[0].x.toFixed(1)+' '+p[0].y.toFixed(1);
 for(var i=1;i<p.length-1;i++){var mx=(p[i].x+p[i+1].x)/2,my=(p[i].y+p[i+1].y)/2;d+='Q'+p[i].x.toFixed(1)+' '+p[i].y.toFixed(1)+' '+mx.toFixed(1)+' '+my.toFixed(1);}
 var l=p[p.length-1];d+='L'+l.x.toFixed(1)+' '+l.y.toFixed(1);return d;
}
function mkPath(o){var el=document.createElementNS(NS,'path');el.setAttribute('d',o.d||pathD(o.p));el.setAttribute('stroke',o.c);el.setAttribute('stroke-width',o.w);if(o.o<1)el.setAttribute('stroke-opacity',o.o);if(o.tx||o.ty)el.setAttribute('transform','translate('+(o.tx||0).toFixed(1)+' '+(o.ty||0).toFixed(1)+')');if(o.k)el.setAttribute('class','gyStp');o.node=el;return el;}
function stamp(q,kind,s){
 var a=sz(STP,s),w=a/5.5,lines,p=[],d='';
 if(kind==='ok')lines=[[[q.x-a*0.45,q.y],[q.x-a*0.1,q.y+a*0.38],[q.x+a*0.5,q.y-a*0.42]]];
 else lines=[[[q.x-a*0.38,q.y-a*0.38],[q.x+a*0.38,q.y+a*0.38]],[[q.x+a*0.38,q.y-a*0.38],[q.x-a*0.38,q.y+a*0.38]]];
 lines.forEach(function(L){d+='M'+L[0][0].toFixed(1)+' '+L[0][1].toFixed(1);for(var i=1;i<L.length;i++){d+='L'+L[i][0].toFixed(1)+' '+L[i][1].toFixed(1);
  for(var k=0;k<=6;k++)p.push({x:L[i-1][0]+(L[i][0]-L[i-1][0])*k/6,y:L[i-1][1]+(L[i][1]-L[i-1][1])*k/6});}});
 return{c:kind==='ok'?OKC:NOC,w:w,o:1,p:p,d:d,k:kind};
}
function act(a){U.push(a);RD=[];}
/* ---------- v7: neo nét vẽ / ô chữ vào khối nội dung bên dưới ----------
   Bài đổi chiều cao (mở "Nét viết", ảnh/phông tải chậm, ẩn hiện pinyin, đổi cỡ cửa sổ…)
   thì ghi chú chạy theo khối của nó, không bị lệch. Khi in/lưu PDF, ghi chú được
   gắn tạm vào đúng khối đó nên ngắt trang cũng không làm lệch. */
function aOff(el,s){
 if(!el||!el.isConnected)return null;var r=el.getBoundingClientRect();if(!r.width&&!r.height)return null;
 var L=s.ink.getBoundingClientRect();if(!L.width)return null;var z=L.width/(s.ink.offsetWidth||1)||1;
 return{x:(r.left-L.left)/z,y:(r.top-L.top)/z};
}
function pickA(cx,cy,s){
 var h=s.host,hr=h.getBoundingClientRect(),xs=[cx,hr.left+hr.width*0.5,hr.left+hr.width*0.25,hr.left+hr.width*0.75];
 for(var k=0;k<xs.length;k++){
  var x=Math.max(hr.left+6,Math.min(hr.right-6,xs[k])),els=document.elementsFromPoint?document.elementsFromPoint(x,cy):[],el=null;
  for(var i=0;i<els.length;i++){var c=els[i];if(c===h||!h.contains(c)||s.ink.contains(c))continue;el=c;break;}
  while(el&&el!==h){if(/^(CANVAS|IMG|SVG|VIDEO|IFRAME|INPUT|TEXTAREA|SELECT|PICTURE|OBJECT|EMBED)$/i.test(el.tagName)||el.ownerSVGElement){el=el.parentElement;continue;}var cs=getComputedStyle(el);if(el.offsetHeight>=24&&el.offsetWidth>=60&&cs.display!=='inline'&&cs.display!=='contents')break;el=el.parentElement;}
  if(el&&el!==h)return el;
 }
 return null;
}
function anc(o,e,s){try{var el=pickA(e.clientX,e.clientY,s),off=el&&aOff(el,s);if(off){o.a=el;o.ax=off.x;o.ay=off.y;}}catch(_){}o.tx=o.tx||0;o.ty=o.ty||0;}
function relayout(s){
 var cache=new Map();function get(el){if(!cache.has(el))cache.set(el,aOff(el,s));return cache.get(el);}
 for(var i=0;i<s.S.length;i++){var o=s.S[i];if(!o.a)continue;var f=get(o.a);if(!f)continue;
  var tx=f.x-o.ax,ty=f.y-o.ay;if(Math.abs(tx-(o.tx||0))<0.5&&Math.abs(ty-(o.ty||0))<0.5)continue;
  o.tx=tx;o.ty=ty;if(o.node)o.node.setAttribute('transform','translate('+tx.toFixed(1)+' '+ty.toFixed(1)+')');}
 for(var j=0;j<s.N.length;j++){var n=s.N[j];if(!n.a)continue;var g=get(n.a);if(!g)continue;
  var dx=g.x-n.ax,dy=g.y-n.ay;if(Math.abs(dx)<0.5&&Math.abs(dy)<0.5)continue;
  n.x+=dx;n.y+=dy;n.ax=g.x;n.ay=g.y;if(n.el){n.el.style.left=n.x+'px';n.el.style.top=n.y+'px';}}
}
var rlQ=0;function relayAll(){if(rlQ)return;rlQ=requestAnimationFrame(function(){rlQ=0;if(saved)return;for(var i=0;i<SURF.length;i++){try{relayout(SURF[i]);}catch(_){}}});}

function render(s){while(s.G.firstChild)s.G.removeChild(s.G.firstChild);s.NT.innerHTML='';s.S.forEach(function(o){s.G.appendChild(mkPath(o));});s.N.forEach(function(n){s.NT.appendChild(mkNote(n,s));});}
function blurNote(){var ae=document.activeElement;if(ae&&ae.classList&&ae.classList.contains('gyNt')){ae.blur();return true;}return false;}
var drawing=null,dS=null;
document.addEventListener('pointerdown',function(e){if(selN&&!(e.target.closest&&(e.target.closest('.gyNote')||e.target.closest('#gyBar'))))selNote(null);},true);
function bindInk(s){
 var L=s.ink;
 L.addEventListener('pointerdown',function(e){
  if(tool==='hand')return;
  if(tool==='tx'){
   if(e.target.closest('.gyNote'))return;
   e.preventDefault();blurNote();selNote(null);
   var fs=FS[txI]*mul/zOf(s),q=pt(e,s),n={x:q.x,y:q.y-fs*0.7,c:penC,f:fs,t:''};anc(n,e,s);
   s.N.push(n);act({k:'n+',n:n,s:s});var el=mkNote(n,s);s.NT.appendChild(el);editNote(el);setTimeout(function(){editNote(el);},0);
   var fx=function(){L.removeEventListener('pointerup',fx);if(document.activeElement!==el.querySelector('.gyNt'))editNote(el);};L.addEventListener('pointerup',fx);return;
  }
  e.preventDefault();e.stopPropagation();
  if(tool==='ok'||tool==='no'){var o=stamp(pt(e,s),tool,s);anc(o,e,s);s.S.push(o);s.G.appendChild(mkPath(o));act({k:'s',o:o,s:s});return;}
  try{L.setPointerCapture(e.pointerId);}catch(_){}
  dS=s;
  if(tool==='er'){drawing={er:true,rm:[]};erase(pt(e,s),s);return;}
  var o2={c:tool==='hl'?hlC:penC,w:sz(tool==='hl'?HLW:PEN,s),o:tool==='hl'?0.5:1,p:[pt(e,s)]};anc(o2,e,s);
  drawing=o2;s.G.appendChild(mkPath(o2));
  o2.cx=e.clientX;o2.cy=e.clientY;armHold(o2,s);
 });
 L.addEventListener('pointermove',function(e){
  if(!drawing||dS!==s)return;
  if(drawing.er){erase(pt(e,s),s);return;}
  if(drawing.line){drawing.p[1]=snapEnd(drawing.p[0],pt(e,s));drawing.node.setAttribute('d',pathD(drawing.p));return;}
  if(Math.abs(e.clientX-drawing.cx)+Math.abs(e.clientY-drawing.cy)>4){drawing.cx=e.clientX;drawing.cy=e.clientY;armHold(drawing,s);}
  var evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];if(!evs.length)evs=[e];var z=zOf(s);
  for(var i=0;i<evs.length;i++){var q=pt(evs[i],s),l=drawing.p[drawing.p.length-1];if(Math.abs(q.x-l.x)+Math.abs(q.y-l.y)>0.6/z)drawing.p.push(q);}
  drawing.node.setAttribute('d',pathD(drawing.p));
 });
 var end=function(){
  if(!drawing||dS!==s)return;
  clearTimeout(drawing.ht);
  if(drawing.er){if(drawing.rm.length)act({k:'e',l:drawing.rm,s:s});}
  else{
   if(tool==='hl'&&!drawing.line&&drawing.p.length>2){var a=drawing.p[0],b=drawing.p[drawing.p.length-1],dx=b.x-a.x,dy=b.y-a.y,len=Math.sqrt(dx*dx+dy*dy)||1,mx=0;
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
/* giữ yên tay ~0,6 giây khi đang kẻ → nét thành đường thẳng (gần ngang/dọc thì nắn thẳng hẳn) */
function snapEnd(a,b){var dx=b.x-a.x,dy=b.y-a.y,ang=Math.atan2(Math.abs(dy),Math.abs(dx))*180/Math.PI;
 if(ang<7)return{x:b.x,y:a.y};if(ang>83)return{x:a.x,y:b.y};return b;}
function armHold(o,s){clearTimeout(o.ht);o.ht=setTimeout(function(){
 if(drawing!==o||o.line||o.p.length<3)return;
 var a=o.p[0],b=o.p[o.p.length-1];if(Math.abs(b.x-a.x)+Math.abs(b.y-a.y)<12/zOf(s))return;
 o.line=true;o.p=[a,snapEnd(a,b)];o.node.setAttribute('d',pathD(o.p));
 o.node.style.transition='stroke-width .12s';var w=o.w;o.node.setAttribute('stroke-width',w*1.5);setTimeout(function(){o.node.setAttribute('stroke-width',w);},120);
},600);}
function erase(Q,s){var q;
 var rz=10/zOf(s);
 for(var i=s.S.length-1;i>=0;i--){q=null;var o=s.S[i],r=o.w/2+rz,hit=false,qq={x:Q.x-(o.tx||0),y:Q.y-(o.ty||0)};q=qq;
  for(var j=0;j<o.p.length&&!hit;j++){var dx=o.p[j].x-q.x,dy=o.p[j].y-q.y;if(dx*dx+dy*dy<r*r)hit=true;
   if(!hit&&j>0){var a=o.p[j-1],b=o.p[j],vx=b.x-a.x,vy=b.y-a.y,L=vx*vx+vy*vy;if(L>0){var t=((q.x-a.x)*vx+(q.y-a.y)*vy)/L;if(t>0&&t<1){var px=a.x+t*vx-q.x,py=a.y+t*vy-q.y;if(px*px+py*py<r*r)hit=true;}}}}
  if(hit){s.S.splice(i,1);if(o.node&&o.node.parentNode)o.node.parentNode.removeChild(o.node);drawing.rm.push({o:o,i:i});}
 }
}
function selNote(x){if(selN&&selN.n.el)selN.n.el.classList.remove('sel');selN=x;if(x&&x.n.el)x.n.el.classList.add('sel');}
function noteSize(i){var n=selN.n,s=selN.s,f=FS[i]/zOf(s);n.f=f;var w=n.el;if(!w)return;var t=w.querySelector('.gyNt'),rb=w.querySelector('.gyNr');t.style.fontSize=f+'px';rb.style.fontSize=f+'px';if(NPY)rubyNote(n);say('Cỡ ô chữ: '+SN[i]);}
function setSize(i){if(selN&&selN.n.el&&selN.n.el.parentNode){noteSize(i);return;}mul=1;if(tool==='tx')txI=i;else{szI=i;if(tool==='hand'||tool==='er')tool='pen';}setTool(tool);state();}
function editNote(w){var t=w.querySelector('.gyNt');if(!t)return;t.setAttribute('contenteditable','true');t.focus();
 try{var r=document.createRange();r.selectNodeContents(t);r.collapse(false);var sl=getSelection();sl.removeAllRanges();sl.addRange(r);}catch(_){}}
function mkNote(n,s){
 var w=document.createElement('div');w.className='gyNote';w.style.left=n.x+'px';w.style.top=n.y+'px';
 w.innerHTML='<div class="gyNh"><span class="x" title="Xóa ô chữ">✕</span></div><div class="gyNt" contenteditable="false" spellcheck="false"></div><div class="gyNr"></div>';
 var t=w.querySelector('.gyNt'),rb=w.querySelector('.gyNr');
 t.style.color=n.c;t.style.fontSize=n.f+'px';t.textContent=n.t;rb.style.color=n.c;rb.style.fontSize=n.f+'px';
 n.el=w;if(NPY)rubyNote(n);
 t.addEventListener('focus',function(){w.classList.add('ed');selNote({n:n,s:s});});
 t.addEventListener('input',function(){n.t=t.innerText;});
 t.addEventListener('blur',function(){w.classList.remove('ed');t.setAttribute('contenteditable','false');n.t=t.innerText;if(NPY)rubyNote(n);
  if(!n.t.trim()){var k=s.N.indexOf(n);if(k>=0)s.N.splice(k,1);U=U.filter(function(x){return x.n!==n;});RD=RD.filter(function(x){return x.n!==n;});if(w.parentNode)w.parentNode.removeChild(w);}});
 w.querySelector('.x').addEventListener('pointerdown',function(e){e.preventDefault();e.stopPropagation();var k=s.N.indexOf(n);if(k>=0){s.N.splice(k,1);act({k:'n-',n:n,s:s});}if(w.parentNode)w.parentNode.removeChild(w);});
 /* bấm giữ & kéo = di chuyển ô chữ; nhấn đúp = sửa chữ */
 w.addEventListener('pointerdown',function(e){
  if(w.classList.contains('ed')||e.button>0||e.target.closest('.gyNh'))return;
  e.preventDefault();e.stopPropagation();blurNote();selNote({n:n,s:s});
  try{w.setPointerCapture(e.pointerId);}catch(_){}
  var a=pt(e,s),ox=n.x,oy=n.y,moved=false;
  function m(ev){var q=pt(ev,s);if(!moved&&Math.abs(q.x-a.x)+Math.abs(q.y-a.y)<3)return;moved=true;w.classList.add('drag');
   n.x=ox+q.x-a.x;n.y=oy+q.y-a.y;w.style.left=n.x+'px';w.style.top=n.y+'px';}
  function u(ev){w.removeEventListener('pointermove',m);w.removeEventListener('pointerup',u);w.removeEventListener('pointercancel',u);w.classList.remove('drag');
   if(moved){var ax=n.ax,ay=n.ay,aa=n.a;n.a=null;anc(n,ev,s);if(!n.a){n.a=aa;n.ax=ax;n.ay=ay;}}}
  w.addEventListener('pointermove',m);w.addEventListener('pointerup',u);w.addEventListener('pointercancel',u);
 });
 w.addEventListener('dblclick',function(e){e.preventDefault();e.stopPropagation();if(!w.classList.contains('ed'))editNote(w);});
 ['click','mousedown','mouseup','touchstart','touchend'].forEach(function(ev){w.addEventListener(ev,function(e){e.stopPropagation();});});
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
function pyBtn(){return document.querySelector('.lesson [data-py],.wrap [data-py],[data-bai="py"]')||document.getElementById('pyBtn')||document.getElementById('gy-pyt')||document.getElementById('tp');}
function togglePy(){var b=pyBtn();if(b){b.click();return true;}return false;}
function pickColor(i){if(i<0)return;if(tool==='hl')hlC=HLC[i];else if(tool==='lz')lzC=COLORS[i];else{penC=COLORS[i];if(!/^(pen|tx)$/.test(tool))tool='pen';}setTool(tool);}
function zoomBy(f){zAdj=f===0?1:Math.max(0.5,Math.min(2,zAdj*f));fit();say('Cỡ chiếu '+Math.round(zAdj*100)+'%');}
function sizeBy(f){mul=Math.max(0.4,Math.min(3,mul*f));if(tool==='hand'||tool==='er')setTool('pen');state();}
function openBoard(){var w=null;try{w=window.open(BOARD_URL,'gy-bangtrang');}catch(e){}if(w){try{w.focus();}catch(e){}}else say('Safari chặn mở tab – Thầy cho phép cửa sổ bật lên giúp em');}

/* ---------- bút laze: chấm đỏ lớn kiểu Canva, luôn hiện tới khi tắt (R / Esc); vẫn dùng mọi công cụ khác ---------- */
var lzD=document.createElement('div');lzD.id='gyLz';document.body.appendChild(lzD);
var lzX0=-99,lzY0=-99,lzRaf=0;
function lzPlace(){lzRaf=0;lzD.style.transform='translate('+lzX0+'px,'+lzY0+'px)';}
function toggleLz(){lzOn=!lzOn;DE.classList.toggle('gyLzOn',lzOn);if(lzOn){lzD.classList.toggle('in',lzX0>-50);lzPlace();say('Bút laze · bấm R để tắt');}else say('Tắt bút laze');var lb=bar.querySelector('[data-t="lz"]');if(lb)lb.classList.toggle('on',lzOn);}
addEventListener('pointermove',function(e){lzX0=e.clientX;lzY0=e.clientY;if(!lzOn)return;lzD.classList.add('in');if(!lzRaf)lzRaf=requestAnimationFrame(lzPlace);},true);
addEventListener('pointerdown',function(e){lzX0=e.clientX;lzY0=e.clientY;if(lzOn){lzD.classList.add('in');lzPlace();}},true);
DE.addEventListener('mouseleave',function(){lzD.classList.remove('in');});

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

var PH=[];
function clipTop(el){var top=null;for(var p=el;p&&p!==root;p=p.parentElement){var c=getComputedStyle(p);if(c.overflowX!=='visible'||c.overflowY!=='visible'||/paint|strict|content/.test(c.contain||''))top=p;}return top;}
function phost(el){if(!el||!el.isConnected||!root.contains(el))return null;var t=clipTop(el),h=t?t.parentElement:el;return(h&&h!==root&&root.contains(h))?h:null;}
function attachPrint(w){
 var s=root.__gyS;if(!s)return{l:0,r:0};relayout(s);
 var ext=s.ink.classList.contains('ext')?600:0,mn=1e9,mx=-1e9;
 s.S.forEach(function(o){o.p.forEach(function(q){var x=q.x+(o.tx||0)-ext;if(x-o.w<mn)mn=x-o.w;if(x+o.w>mx)mx=x+o.w;});});
 s.N.forEach(function(n){var x=n.x-ext,ww=n.el?n.el.offsetWidth:80;if(x<mn)mn=x;if(x+ww>mx)mx=x+ww;});
 var res={l:Math.min(400,Math.max(0,Math.ceil(-mn))),r:Math.min(400,Math.max(0,Math.ceil(mx-w)))};
 root.classList.add('gyPV');DE.classList.add('gyPrn');
 if(!s.S.length&&!s.N.length)return{l:0,r:0};
 var hosts=new Map();
 function box(h){if(hosts.has(h))return hosts.get(h);var f=aOff(h,s);if(!f){hosts.set(h,null);return null;}
  var ps=h.style.position;if(getComputedStyle(h).position==='static')h.style.position='relative';
  var L=document.createElement('div');L.className='gyInkL gyPH';L.innerHTML='<svg xmlns="'+NS+'"><g></g></svg><div class="gyNotes"></div>';h.appendChild(L);
  var b={h:h,ps:ps,L:L,G:L.querySelector('g'),NT:L.querySelector('.gyNotes'),x:f.x+h.clientLeft,y:f.y+h.clientTop};PH.push(b);hosts.set(h,b);return b;}
 s.S.forEach(function(o){var b=box(phost(o.a));if(!b||!o.node)return;
  o.node.setAttribute('transform','translate('+((o.tx||0)-b.x).toFixed(1)+' '+((o.ty||0)-b.y).toFixed(1)+')');b.G.appendChild(o.node);});
 s.N.forEach(function(n){var b=box(phost(n.a));if(!b||!n.el)return;n.el.style.left=(n.x-b.x)+'px';n.el.style.top=(n.y-b.y)+'px';b.NT.appendChild(n.el);});
 root.classList.add('gyPV');DE.classList.add('gyPrn');
 return res;
}
function detachPrint(){
 if(!PH.length&&!DE.classList.contains('gyPrn'))return;
 PH.forEach(function(b){if(b.L.parentNode)b.L.parentNode.removeChild(b.L);b.h.style.position=b.ps;});PH=[];
 if(root){root.classList.remove('gyPV');}DE.classList.remove('gyPrn');
 var s=root&&root.__gyS;if(s)render(s);
}
function prePrint(){
 if(saved)return;
 PR=DECK||root;freezeMedia();
 var cs=getComputedStyle(PR);
 saved={w:PR.style.width,mw:PR.style.maxWidth,fs:PR.style.fontSize,pd:PR.style.padding};
 var w=PR.offsetWidth;PR.style.width=w+'px';PR.style.maxWidth=w+'px';PR.style.fontSize=cs.fontSize;PR.style.padding=cs.padding;
 PR.classList.add('gyPR');
 var ex=DECK?{l:0,r:0}:attachPrint(w);saved.ml=PR.style.marginLeft;
 if(ex.l||ex.r){PR.style.marginLeft=ex.l+'px';saved.mr=PR.style.marginRight;PR.style.marginRight='0px';}
 PR.style.setProperty('--gyPZ',Math.min(1,(window.GY_PRINT_W||700)/(w+ex.l+ex.r)).toFixed(3));
}
function postPrint(){
 if(!saved)return;thawMedia();
 detachPrint();PR.style.marginLeft=saved.ml||'';if('mr' in saved)PR.style.marginRight=saved.mr||'';PR.style.width=saved.w;PR.style.maxWidth=saved.mw;PR.style.fontSize=saved.fs;PR.style.padding=saved.pd;PR.style.removeProperty('--gyPZ');PR.classList.remove('gyPR');
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
 if(b.hasAttribute('data-c')){var sws=[].slice.call(bar.querySelectorAll('.sw'));pickColor(sws.indexOf(b));
  var ae=document.activeElement;if(ae&&ae.classList&&ae.classList.contains('gyNt'))ae.style.color=penC;return;}
 if(b.hasAttribute('data-s')){setSize(+b.getAttribute('data-s'));return;}
 var a=b.getAttribute('data-a');
 if(a==='pres'){on?exit():enter();}else if(a==='undo')undo();else if(a==='redo')redo();else if(a==='clear')clearAll();
 else if(a==='npy')toggleNotePy();else if(a==='wb')openBoard();else if(a==='sm')sizeBy(1/1.2);else if(a==='sb')sizeBy(1.2);else if(a==='dl')download();
 else if(a==='help')help.classList.toggle('show');else if(a==='hide'){barOn=false;applyBar();}
});
bar.addEventListener('pointerdown',function(e){if(e.target.closest('.sw'))e.preventDefault();});
addEventListener('keydown',function(e){
 var fov=document.querySelector('.fov,.gy-ov');
 if(fov){var fr=fov.querySelector('iframe');try{if(fr)fr.contentWindow.focus();}catch(_){}return;}
 var t=e.target;
 if(t&&t.classList&&t.classList.contains('gyNt')){e.stopPropagation();if(e.isComposing||e.keyCode===229)return;if(e.key==='Escape'||(e.key==='Enter'&&!e.shiftKey)){e.preventDefault();t.blur();if(e.key==='Escape'){selNote(null);setTool('hand');}say(e.key==='Escape'?'Đã xong ô chữ · bấm kéo để dời · nhấn đúp để sửa':'Đã xong · bấm chỗ khác để gõ ô chữ mới');}return;}
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
  case 'r':toggleLz();break;
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
   if(lzOn)toggleLz();
   else if(selN){selNote(null);}
   else if(tool!=='hand'){setTool('hand');state();}
   else if(!quit())done=false;
   break;
  default:
   if(/^[1-6]$/.test(k)){pickColor(+k-1);state();}
   else if(/^[7-9]$/.test(k)){setSize(+k-7);}
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
