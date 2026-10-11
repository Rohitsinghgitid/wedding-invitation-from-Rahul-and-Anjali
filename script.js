// Floating gold particles
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 45; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = 1.5 + Math.random() * 2.5;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -8px;
      width: ${size}px;
      height: ${size}px;
      --delay: ${(Math.random() * 12).toFixed(1)}s;
      --dur:   ${(7 + Math.random() * 8).toFixed(1)}s;
    `;
    container.appendChild(p);
  }
})();

// Sparkle trail on names hover
const nameEl = document.querySelector('.couple-names');
if (nameEl) {
  nameEl.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.45) return;
    const s = document.createElement('span');
    s.textContent = '✦';
    s.style.cssText = `
      position:fixed; left:${e.clientX}px; top:${e.clientY}px;
      color:#f5d98b; font-size:${8 + Math.random() * 10}px;
      pointer-events:none; z-index:9999; opacity:1;
      transform:translate(-50%,-50%) scale(1);
      transition: opacity 0.55s ease, transform 0.55s ease;
    `;
    document.body.appendChild(s);
    requestAnimationFrame(() => {
      s.style.opacity = '0';
      s.style.transform = `translate(-50%, -${50 + Math.random() * 35}%) scale(0.4)`;
    });
    setTimeout(() => s.remove(), 600);
  });
}

// Current active page state (1-based)
let currentPage = 1;

// Navigate to a specific page by index (1-based)
function goToPage(pageNum) {
  pageNum = Number(pageNum);
  if (pageNum < 1 || pageNum > 3) return;
  currentPage = pageNum;

  const pages = document.querySelectorAll('.page');
  const dots = document.querySelectorAll('.pdot');

  pages.forEach((page, idx) => {
    if (idx + 1 === pageNum) {
      page.classList.add('active');
      page.scrollTop = 0;
    } else {
      page.classList.remove('active');
    }
  });

  dots.forEach(dot => {
    if (Number(dot.getAttribute('data-page')) === pageNum) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Allow natural internal scrolling on scrollable cards while preventing window page-level scrolling
window.addEventListener('wheel', (e) => {
  const activePage = document.querySelector('.page.active');
  if (activePage && activePage.scrollHeight > activePage.clientHeight) {
    const atTop = activePage.scrollTop <= 0 && e.deltaY < 0;
    const atBottom = activePage.scrollTop + activePage.clientHeight >= activePage.scrollHeight - 1 && e.deltaY > 0;
    if (!atTop && !atBottom) return;
  }
  e.preventDefault();
}, { passive: false });

// Keyboard arrow step navigation
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
    e.preventDefault();
    if (currentPage < 3) goToPage(currentPage + 1);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault();
    if (currentPage > 1) goToPage(currentPage - 1);
  }
});
