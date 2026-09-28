// Removes ad elements from prog.co.il, including ones injected after page load.
(() => {
  const SELECTORS = [
    '.samUnitWrapper',
    '.samCodeUnit',
    '.samItem',
    '[class*="samBannerUnit"]',
    '[data-xf-init="sam-unit"]',
    '[data-xf-init="sam-item"]',
    '.sam-swiper-container',
    '.samCarousel',
    '[class*="samPopup"]',
    '.samOverlay',
    '.progArticleAd',
    '.progad2',
    '.bottom-page-ad',
    '.banner_728x90',
    '.ad-banner',
    'iframe[src*="/prog-www/campaigns/"]',
    'img[src*="/prog-www/campaigns/"]'
  ].join(',');

  function clean(root) {
    if (!root || !root.querySelectorAll) return;
    if (root.matches && root.matches(SELECTORS)) {
      root.remove();
      return;
    }
    root.querySelectorAll(SELECTORS).forEach((el) => el.remove());
  }

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType === 1) clean(node);
      });
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener('DOMContentLoaded', () => clean(document));
  window.addEventListener('load', () => clean(document));
})();
