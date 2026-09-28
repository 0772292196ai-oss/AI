// Full-screen welcome image shown on every visit to prog.co.il,
// until the user clicks the link to the site once.
(async () => {
  const SITE_URL = 'https://0772292196ai-oss.github.io/AI/';
  const CLICKED_KEY = 'splashLinkClicked';

  if (window.top !== window) return;
  try {
    const data = await chrome.storage.local.get(CLICKED_KEY);
    if (data[CLICKED_KEY]) return;
  } catch (e) {}

  const host = document.createElement('div');
  host.style.cssText = 'all:initial;position:fixed;inset:0;z-index:2147483647;';
  const root = host.attachShadow({ mode: 'closed' });

  root.innerHTML = `
    <style>
      .overlay {
        position: fixed; inset: 0;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 20px; padding: 16px; box-sizing: border-box;
        background: rgba(10, 20, 35, 0.92);
        font-family: Arial, "Segoe UI", sans-serif; direction: rtl;
        animation: fade .3s ease-out;
      }
      @keyframes fade { from { opacity: 0 } to { opacity: 1 } }
      a.banner { display: block; line-height: 0; border-radius: 14px; overflow: hidden;
        box-shadow: 0 12px 40px rgba(0,0,0,.5); transition: transform .15s; }
      a.banner:hover { transform: scale(1.01); }
      img { max-width: min(1024px, 92vw); max-height: 78vh; width: auto; height: auto; display: block; }
      button {
        font: bold 18px Arial, "Segoe UI", sans-serif; cursor: pointer;
        padding: 12px 36px; border: 0; border-radius: 10px;
        background: #a4d200; color: #12324a; box-shadow: 0 4px 14px rgba(0,0,0,.3);
      }
      button:hover { background: #b8e600; }
    </style>
    <div class="overlay">
      <a class="banner" href="${SITE_URL}" target="_blank" rel="noopener" title="למידע נוסף">
        <img src="${chrome.runtime.getURL('splash.png')}" alt="אין פרסומות בזכות יהודי פשוט">
      </a>
      <button type="button">כניסה לאתר ›</button>
    </div>`;

  const prevOverflow = { html: '', body: '' };

  function close() {
    host.remove();
    document.documentElement.style.overflow = prevOverflow.html;
    if (document.body) document.body.style.overflow = prevOverflow.body;
    document.removeEventListener('keydown', onKey, true);
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
  }

  root.querySelector('button').addEventListener('click', close);
  root.querySelector('a.banner').addEventListener('click', () => {
    try { chrome.storage.local.set({ [CLICKED_KEY]: true }); } catch (e) {}
    close();
  });
  document.addEventListener('keydown', onKey, true);

  prevOverflow.html = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.appendChild(host);
})();
