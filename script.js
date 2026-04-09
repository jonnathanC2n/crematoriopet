/* ─── Navbar scroll effect ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ─── Scroll fade-in observer ─── */
const fadeEls = document.querySelectorAll('.fade-in-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

/* ─── Active nav link on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ─── Contact form → WhatsApp ─── */
function handleFormSubmit(e) {
  e.preventDefault();
  const nome     = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const animal   = document.getElementById('animal').value || 'não informado';
  const urgencia = document.getElementById('urgencia').value || 'não informado';
  const mensagem = document.getElementById('mensagem').value;

  const text = 
    `*Nova mensagem do site*\n\n` +
    `👤 *Nome:* ${nome}\n` +
    `📞 *Telefone:* ${telefone}\n` +
    `🐾 *Animal:* ${animal}\n` +
    `⚡ *Urgência:* ${urgencia}\n` +
    (mensagem ? `📝 *Mensagem:* ${mensagem}` : '');

  const url = `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

/* ─── Hide floating buttons when contact section is visible ─── */
const contactSection = document.getElementById('contact');
const floatingBtns   = document.querySelector('.floating-btns');
const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    floatingBtns.style.opacity = entry.isIntersecting ? '0' : '1';
    floatingBtns.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
  });
}, { threshold: 0.3 });
contactObserver.observe(contactSection);
