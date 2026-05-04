const shareText = document.getElementById('shareText')?.textContent?.trim() || '';
const copyButtons = [
  document.getElementById('copyButton'),
  document.getElementById('copyFooterButton'),
].filter(Boolean);
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

async function copyShareText() {
  if (!shareText) return;

  try {
    await navigator.clipboard.writeText(shareText);
    showToast('分享文案已复制');
  } catch {
    showToast('复制失败，请手动复制');
  }
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 1800);
}

function updateActiveNav() {
  const scrollPosition = window.scrollY + 160;

  let activeId = '';
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', isActive);
  });
}

copyButtons.forEach((button) => {
  button.addEventListener('click', copyShareText);
});

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);
