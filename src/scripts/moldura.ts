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
  el.style.transition = 'none'; el.style.opacity = '0'; el.style.transform = 'translateY(16px)';
  // O estado escondido vale antes de a transição existir: sem isso, o bloco sumiria em fade.
  el.getBoundingClientRect();
  el.style.transition = `opacity var(--dur-longa) var(--curva) ${ordem * 80}ms, transform var(--dur-longa) var(--curva) ${ordem * 80}ms`;
  io.observe(el);
 });
}
// O HTML da home revela 60 ms depois de montar a página.
setTimeout(revelar, 60);

// Código inline mais largo que a coluna (D20) rola no próprio chip. Para o corte nunca passar por
// comando inteiro: degradê na borda enquanto houver comando escondido (data-antes e data-mais),
// title com o comando inteiro e foco pelo teclado (o WebKit não dá foco a quem só rola), menos
// dentro de link ou botão, que já são focáveis.
function bordas(c: HTMLElement) {
 c.toggleAttribute('data-antes', c.scrollLeft > 1);
 c.toggleAttribute('data-mais', c.scrollLeft + c.clientWidth < c.scrollWidth - 1);
}
function marcarChips() {
 for (const c of document.querySelectorAll<HTMLElement>(':not(pre)>code')) {
  const rola = c.scrollWidth > c.clientWidth + 1;
  if (rola === c.hasAttribute('data-rola')) { if (rola) bordas(c); continue; }
  c.toggleAttribute('data-rola', rola);
  if (rola) {
   c.title = (c.textContent || '').trim();
   if (!c.closest('a,button')) c.tabIndex = 0;
   c.addEventListener('scroll', () => bordas(c), {passive: true});
   bordas(c);
  } else {
   c.removeAttribute('title'); c.removeAttribute('tabindex'); c.removeAttribute('data-antes'); c.removeAttribute('data-mais');
  }
 }
}
marcarChips();
document.fonts?.ready.then(marcarChips);
if ('ResizeObserver' in window) new ResizeObserver(() => marcarChips()).observe(document.documentElement);

// Regiões que rolam na horizontal (topologia da home, diagrama de /ork/): no desktop são parada de
// Tab, como no design. Abaixo de 1054 px a responsividade as faz caber, e elas só seguem no Tab se
// ainda rolarem: um bloco que não rola e é mais alto que a tela levava o foco para baixo do cabeçalho.
const estreito = matchMedia('(max-width:1053.98px)');
function marcarRegioes() {
 for (const r of document.querySelectorAll<HTMLElement>('[data-regiao-rolavel]')) {
  if (!estreito.matches || r.scrollWidth > r.clientWidth + 1) r.tabIndex = 0;
  else r.removeAttribute('tabindex');
 }
}
marcarRegioes();
if ('ResizeObserver' in window) new ResizeObserver(() => marcarRegioes()).observe(document.documentElement);
