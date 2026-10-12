// Comportamentos do design que valem em qualquer página: o holofote que segue o mouse nos cartões
// e a revelação ao rolar ([data-reveal]), desligada com movimento reduzido, como no design.

for (const el of document.querySelectorAll<HTMLElement>('[data-holofote]')) {
 el.addEventListener('mousemove', e => {
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
 });
}

function revelar() {
 if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { const el = en.target as HTMLElement; el.style.opacity = '1'; el.style.transform = 'none'; io.unobserve(el); }
 }), {rootMargin: '0px 0px -6% 0px'});
 document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
  if (el.getBoundingClientRect().top < window.innerHeight) return;
  el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)';
  io.observe(el);
 });
}
// O design revela 60 ms depois de montar a página.
setTimeout(revelar, 60);
