
// ARFA PRO Lighting scripts: menu, video hero, inquiry WhatsApp, gallery lightbox.
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Pilih video desktop atau mobile otomatis. Video hanya ada di hero Home, jadi saat scroll turun videonya hilang normal.
const heroVideo = document.getElementById('heroVideo');
function chooseHeroVideo() {
  if (!heroVideo) return;
  const isMobile = window.matchMedia('(max-width: 760px)').matches;
  const nextSrc = isMobile ? heroVideo.dataset.mobile : heroVideo.dataset.desktop;
  const nextPoster = isMobile ? heroVideo.dataset.posterMobile : heroVideo.dataset.posterDesktop;
  if (heroVideo.getAttribute('poster') !== nextPoster) heroVideo.setAttribute('poster', nextPoster);
  if (!heroVideo.src.endsWith(nextSrc)) {
    heroVideo.src = nextSrc;
    heroVideo.load();
    const play = heroVideo.play();
    if (play && play.catch) play.catch(() => {});
  }
}
chooseHeroVideo();
window.addEventListener('resize', () => { clearTimeout(window.__arfaResize); window.__arfaResize = setTimeout(chooseHeroVideo, 220); });
document.addEventListener('visibilitychange', () => {
  if (!heroVideo) return;
  if (document.hidden) heroVideo.pause(); else heroVideo.play().catch(() => {});
});

// Form quick inquiry: isi data lalu otomatis buka WhatsApp dengan pesan rapi.
document.querySelectorAll('.inquiry-bar').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const message = `Halo ARFA PRO Lighting, saya ingin konsultasi event.

Jenis acara: ${data.get('eventType') || '-'}
Tanggal: ${data.get('eventDate') || '-'}
Lokasi: ${data.get('location') || '-'}`;
    window.open(`https://wa.me/628558696827?text=${encodeURIComponent(message)}`, '_blank');
  });
});

// Lightbox gallery.
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxText = lightbox?.querySelector('p');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImg || !lightboxText) return;
    lightboxImg.src = item.dataset.full;
    lightboxText.textContent = item.dataset.caption || 'ARFA PRO Lighting';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
}
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
