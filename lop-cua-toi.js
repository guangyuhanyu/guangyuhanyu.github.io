/* GUANGYU HANYU · Nút "Lớp của tôi" cho trang chủ
   Mở trang lớp học (/lop/) thành lớp phủ đè lên trang chủ, đóng lại là về trang chủ như cũ.
   Cách gắn: chép file này vào repo trang chủ, rồi thêm 1 dòng trước </body>:
     <script src="lop-cua-toi.js"></script>
   - Nếu trang chủ đã có nút/đường link riêng, thêm thuộc tính data-lop-cua-toi vào nút đó là xong.
   - Nếu không có, file tự thêm 1 nút nổi "Lớp của tôi" ở góc dưới bên phải.
   - Link dạng guangyuhanyu.github.io/?ma=XXXXXXXX sẽ tự mở lớp phủ của đúng lớp đó. */
(() => {
  const DUONG_DAN = '/lop/';
  const css = `
  .gy-lop-nut{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom));z-index:9998;display:inline-flex;align-items:center;gap:8px;
    border:0;border-radius:99px;padding:12px 20px;background:#5F8DB8;color:#fff;font:700 15px 'Noto Serif','Songti SC',serif;letter-spacing:.02em;
    box-shadow:0 12px 26px -10px rgba(45,66,87,.7);cursor:pointer;transition:transform .2s,box-shadow .2s}
  .gy-lop-nut:hover{transform:translateY(-2px);box-shadow:0 16px 30px -10px rgba(45,66,87,.8)}
  .gy-lop-phu{position:fixed;inset:0;z-index:9999;background:rgba(36,48,60,.45);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
    display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s}
  .gy-lop-phu.hien{opacity:1}
  .gy-lop-khung{position:relative;width:min(1120px,calc(100vw - 48px));height:calc(100vh - 48px);height:calc(100dvh - 48px);border-radius:24px;overflow:hidden;
    background:#ECE8DF;box-shadow:0 30px 80px -20px rgba(0,0,0,.5);transform:translateY(18px) scale(.98);transition:transform .3s ease}
  .gy-lop-phu.hien .gy-lop-khung{transform:none}
  .gy-lop-khung iframe{width:100%;height:100%;border:0;display:block}
  .gy-lop-x{position:absolute;top:10px;right:10px;z-index:2;width:40px;height:40px;border-radius:50%;border:1px solid #C9D9E8;background:#fff;color:#2D4257;font-size:22px;cursor:pointer;line-height:1}
  .gy-lop-phu.san .gy-lop-x{display:none}
  @media (max-width:760px){.gy-lop-khung{width:100vw;height:100vh;height:100dvh;border-radius:0}}
  html.gy-lop-khoa,html.gy-lop-khoa body{overflow:hidden}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  let phu = null, daDay = false;
  function mo(ma) {
    if (phu) return;
    const src = DUONG_DAN + '?nhung=1' + (ma ? '&ma=' + encodeURIComponent(ma) : '');
    phu = document.createElement('div'); phu.className = 'gy-lop-phu';
    phu.innerHTML = `<div class="gy-lop-khung" role="dialog" aria-modal="true" aria-label="Lớp của tôi"><button class="gy-lop-x" aria-label="Đóng">×</button><iframe src="${src}" title="Lớp của tôi"></iframe></div>`;
    document.body.appendChild(phu); document.documentElement.classList.add('gy-lop-khoa');
    requestAnimationFrame(() => phu.classList.add('hien'));
    phu.querySelector('.gy-lop-x').onclick = dong;
    phu.addEventListener('click', e => { if (e.target === phu) dong(); });
    history.pushState({ gyLop: 1 }, ''); daDay = true;      // nút Back / vuốt lùi = đóng lớp phủ
  }
  function dong(tuBack) {
    if (!phu) return;
    const p = phu; phu = null; p.classList.remove('hien');
    setTimeout(() => p.remove(), 250); document.documentElement.classList.remove('gy-lop-khoa');
    if (daDay && tuBack !== true) { daDay = false; history.back(); } else daDay = false;
  }
  addEventListener('popstate', () => { if (phu) dong(true); });
  addEventListener('keydown', e => { if (e.key === 'Escape') dong(); });
  addEventListener('message', e => {
    if (e.origin !== location.origin || !e.data || !e.data.gyLop) return;
    if (e.data.gyLop === 'dong') dong();
    if (e.data.gyLop === 'san' && phu) phu.classList.add('san');   // trang lớp đã tải xong, dùng nút Đóng của trang lớp
  });
  document.addEventListener('click', e => {
    const n = e.target.closest('[data-lop-cua-toi]'); if (!n) return;
    e.preventDefault(); mo();
  });
  function ganNut() {
    if (!document.querySelector('[data-lop-cua-toi]')) {
      const b = document.createElement('button'); b.className = 'gy-lop-nut'; b.setAttribute('data-lop-cua-toi', '');
      b.innerHTML = '📚 Lớp của tôi'; document.body.appendChild(b);
    }
    const ma = new URLSearchParams(location.search).get('ma');
    if (ma) { history.replaceState(null, '', location.pathname + location.hash); mo(ma); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ganNut); else ganNut();
})();
