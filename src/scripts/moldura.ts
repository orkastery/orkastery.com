// Comportamentos do kit que valem em qualquer página: o brilho que segue o cursor nos cartões
// (só com mouse; desligado em toque) e a entrada suave ao rolar ([data-reveal]): 600 ms
// (--dur-longa), deslocamento de 16 px, 80 ms de atraso entre irmãos, uma vez só, quando 20% do
// bloco entra na tela. Com movimento reduzido, nada disso roda.

for (const el of document.querySelectorAll<HTMLElement>('[data-holofote]')) {
 el.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
 });
}

function revelar() {
 if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { const el = en.target as HTMLElement; el.style.opacity = '1'; el.style.transform = 'none'; io.unobserve(el); }
 }), {threshold: 0.2});
 const irmaos = new Map<Element, number>();
 document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
  if (el.getBoundingClientRect().top < window.innerHeight) return;
  const pai = el.parentElement as Element, ordem = irmaos.get(pai) ?? 0;
  irmaos.set(pai, ordem + 1);
  el.style.opacity = '0'; el.style.transform = 'translateY(16px)';
  el.style.transition = `opacity var(--dur-longa) var(--curva) ${ordem * 80}ms, transform var(--dur-longa) var(--curva) ${ordem * 80}ms`;
  io.observe(el);
 });
}
// O HTML da home revela 60 ms depois de montar a página.
setTimeout(revelar, 60);
