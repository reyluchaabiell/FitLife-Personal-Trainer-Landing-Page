const WA_NUMBER = "6289512565802";

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

if (toggle && mobileMenu) {
  const closeMobileMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', String(expanded));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeMobileMenu();
  });
}

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, '_blank', 'noopener');
}

const packageButtons = document.querySelectorAll('.wa-package');
packageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const packageName = button.dataset.package || 'program personal training';
    const message = `Halo Coach, saya tertarik dengan paket ${packageName}. Boleh minta penjelasan detail program, sistem pendampingan, dan langkah bookingnya?`;
    openWhatsApp(message);
  });
});

const form = document.querySelector('#lead-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nama = data.get('nama');
    const target = data.get('target');
    const level = data.get('level');
    const tantangan = data.get('tantangan');

    const message = [
      'Halo Coach, saya mau konsultasi program personal training.',
      '',
      `Nama: ${nama}`,
      `Target utama: ${target}`,
      `Level saat ini: ${level}`,
      `Tantangan terbesar: ${tantangan}`,
      '',
      'Saya ingin dibantu rekomendasi program yang paling cocok.'
    ].join('\n');

    openWhatsApp(message);
  });
}

const compare = document.querySelector('.compare-card');
if (compare) {
  const range = compare.querySelector('.compare-slider');
  const overlay = compare.querySelector('.compare-overlay');
  const line = compare.querySelector('.compare-line');

  const syncCompare = (value) => {
    overlay.style.width = `${value}%`;
    line.style.left = `${value}%`;
  };

  range.addEventListener('input', (event) => {
    syncCompare(event.target.value);
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
