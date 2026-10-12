// Interações da home do design: relógio de 2,4 s (board, topologia, fila e roadmap), modos, fases,
// alternativas, noite pela rolagem e a partitura. O estado inicial veio pronto do build; aqui só se
// recalcula com as mesmas funções (src/lib/home-state.mjs) e se repinta o mesmo elemento.
// Com movimento reduzido, nada se move sozinho: a partitura fica parada e o relógio não anda.
import {board, topo, modes, phases, options, nightVals, nightItems, nightProgress, cor, preencher, TICK_MS, ESTADO_INICIAL} from '../lib/home-state.mjs';
import {iniciarPartitura} from '../lib/partitura.mjs';

const dados = document.getElementById('home-dados');
if (dados) {
 const t = JSON.parse(dados.textContent || '{}');
 const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const estado = {...ESTADO_INICIAL};
 let pausado = false;
 const $ = <T extends Element = HTMLElement>(sel: string, raiz: ParentNode = document) => [...raiz.querySelectorAll<T & HTMLElement>(sel)];
 const pinta = (el: HTMLElement | undefined, estilo: Record<string, string>) => { if (el) for (const [k, v] of Object.entries(estilo)) el.style.setProperty(k, v); };

 // Partitura: contagem viva no topo do cartão.
 const canvas = document.querySelector<HTMLCanvasElement>('[data-partitura]');
 if (canvas) {
  const vivo = Object.fromEntries($('[data-vivo]').map(el => [el.dataset.vivo, el]));
  const partitura = iniciarPartitura(canvas, {nomes: t.hero.names, etiqueta: t.hero.waitTag, reduzir,
   aoContar: (c: {run: number, wait: number, ok: number}) => { for (const k of ['run', 'wait', 'ok'] as const) if (vivo[k]) vivo[k].textContent = String(c[k]); }});
  let visivel = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(en => { visivel = en.isIntersecting; visivel && !pausado ? partitura.retomar() : partitura.parar(); })).observe(canvas);
  // Pausar o movimento (WCAG 2.2.2): para a partitura, o relógio e as animações CSS da página.
  const botao = document.querySelector<HTMLButtonElement>('[data-movimento-botao]');
  botao?.addEventListener('click', () => {
   pausado = !pausado;
   document.documentElement.toggleAttribute('data-movimento-pausado', pausado);
   botao.textContent = (pausado ? botao.dataset.rotuloRetomar : botao.dataset.rotuloPausar) || '';
   pausado || !visivel ? partitura.parar() : partitura.retomar();
  });
 }

 // Topologia e board pelo relógio.
 function pintaTopo(tick: number) {
  const v = topo(t, tick);
  v.coreFns.forEach((f: any, i: number) => pinta($(`[data-fn="${i}"]`)[0], {background: cor(f.bg), color: cor(f.fg), 'border-color': cor(f.bd)}));
  v.machines.forEach((m: any, mi: number) => m.runtimes.forEach((r: any, ri: number) => {
   const perfil = $(`[data-rt-perfil="${mi}-${ri}"]`)[0], est = $(`[data-rt-estado="${mi}-${ri}"]`)[0];
   if (perfil) perfil.textContent = preencher(t.parallel.profile, {p: r.prof});
   if (est) { est.textContent = r.state; pinta(est, {background: cor(r.sbg), color: cor(r.sfg)}); }
  }));
  let fio = 0;
  v.machines.forEach((m: any) => m.runtimes.forEach((r: any) => r.threads.forEach((th: any) => {
   const barra = $(`[data-fio="${fio}"]`)[0], rotulo = $(`[data-fio-fase="${fio++}"]`)[0];
   const segs = $(':scope > span', barra || document.createElement('span'));
   th.segs.forEach((s: string, i: number) => pinta(segs[i], {background: cor(s)}));
   if (rotulo) rotulo.textContent = th.fase;
   barra?.setAttribute('aria-label', `${th.n}: ${th.fase}, ${th.estado}`);
  })));
  v.mergeQueue.forEach((q: any, k: number) => { const el = $(`[data-fila="${k}"]`)[0]; if (el) { el.textContent = q.t; pinta(el, {background: cor(q.bg), color: cor(q.fg)}); } });
  v.roadmap.forEach((it: any, i: number) => pinta($(`[data-rm="${i}"]`)[0], {background: cor(it.bg), color: cor(it.fg), border: `1px ${it.bs} ${cor(it.bd)}`}));
 }
 function pintaBoard(tick: number) {
  board(t, tick).forEach((l: any, i: number) => {
   const linha = $(`[data-board="${i}"]`)[0]; if (!linha) return;
   pinta(linha, {background: cor(l.rowBg)});
   $('.board-segmentos > span', linha).forEach((s, k) => pinta(s, {background: cor(l.segs[k])}));
   const fase = $('[data-board-fase]', linha)[0]; if (fase) fase.textContent = l.phase;
   const est = $('[data-board-estado]', linha)[0]; pinta(est, {color: cor(l.fg)});
   pinta(est?.firstElementChild as HTMLElement, {background: cor(l.dot)});
   const rot = $('[data-board-rotulo]', linha)[0]; if (rot) rot.textContent = l.label;
  });
 }
 if (!reduzir) setInterval(() => { if (pausado) return; estado.tick++; pintaTopo(estado.tick); pintaBoard(estado.tick); }, TICK_MS);

 // Modos.
 function pintaModos() {
  modes(t, estado.mode).forEach((l: any, i: number) => {
   const linha = $(`[data-modo="${i}"]`)[0]; if (!linha) return;
   linha.setAttribute('aria-pressed', l.on ? 'true' : 'false');
   pinta(linha, {background: cor(l.bg)});
   $('.modo-faixa', linha).forEach((f, k) => pinta(f, {background: cor(l.blocks[k].bg), color: cor(l.blocks[k].fg)}));
  });
  $('[data-modo-texto]').forEach(el => { el.hidden = Number(el.dataset.modoTexto) !== estado.mode; });
 }
 $('[data-modo]').forEach(el => el.addEventListener('click', () => { estado.mode = Number(el.dataset.modo); pintaModos(); }));

 // Fases (abas com seta, Home e End).
 const abas = $('[data-fase]');
 function pintaFases(foco = false) {
  phases(t, estado.phase).forEach((f: any, i: number) => {
   const aba = abas[i]; if (!aba) return;
   aba.setAttribute('aria-selected', f.on ? 'true' : 'false'); aba.tabIndex = f.on ? 0 : -1;
   pinta(aba, {background: cor(f.bg), 'border-color': cor(f.bd), color: cor(f.fg)});
   if (f.on && foco) aba.focus();
  });
  $('[data-detalhe]').forEach(el => { el.hidden = Number(el.dataset.detalhe) !== estado.phase; });
  document.getElementById('ciclo-painel')?.setAttribute('aria-labelledby', 'fase-' + estado.phase);
 }
 abas.forEach(aba => {
  aba.addEventListener('click', () => { estado.phase = Number(aba.dataset.fase); pintaFases(); });
  aba.addEventListener('keydown', e => {
   const n = abas.length, alvo = {ArrowRight: estado.phase + 1, ArrowDown: estado.phase + 1, ArrowLeft: estado.phase - 1, ArrowUp: estado.phase - 1, Home: 0, End: n - 1}[e.key];
   if (alvo === undefined) return;
   e.preventDefault(); estado.phase = (alvo + n) % n; pintaFases(true);
  });
 });

 // Alternativas da pergunta.
 function pintaOpcoes() {
  options(t, estado.answer).forEach((o: any, i: number) => {
   const op = $(`[data-opcao="${i}"]`)[0]; if (!op) return;
   op.setAttribute('aria-pressed', o.on ? 'true' : 'false');
   pinta(op, {background: cor(o.bg), 'border-color': cor(o.bd)});
   pinta($('.opcao-chave', op)[0], {background: cor(o.kbg), color: cor(o.kfg)});
  });
  $('[data-nota]').forEach(el => { el.hidden = Number(el.dataset.nota) !== (estado.answer ?? -1); });
 }
 $('[data-opcao]').forEach(el => el.addEventListener('click', () => { estado.answer = Number(el.dataset.opcao) as any; pintaOpcoes(); }));

 // Noite: o relógio e a linha do tempo seguem a rolagem, como no design.
 const noite = document.querySelector<HTMLElement>('[data-noite]');
 if (noite) {
  let quadro = 0;
  const relogio = $('[data-noite-relogio]', noite)[0], pct = $('[data-noite-pct]', noite)[0], fioN = $('[data-noite-fio]', noite)[0], manha = $('[data-noite-manha]', noite)[0];
  const eventos = $('[data-noite-evento]', noite);
  const pintaNoite = () => {
   const v = nightVals(estado.np);
   if (relogio) relogio.textContent = v.clock;
   pinta(pct, {width: v.pct}); pinta(fioN, {height: v.pct});
   pinta(manha, {opacity: String(v.morningOp), transform: v.morningTf});
   nightItems(t, estado.np).forEach((e: any, i: number) => {
    const ev = eventos[i]; if (!ev) return;
    pinta(ev, {opacity: String(e.op)});
    pinta($('[data-noite-ponto]', ev)[0], {background: `var(--${e.fill})`, 'box-shadow': e.glow});
   });
  };
  const aoRolar = () => {
   if (quadro) return;
   quadro = requestAnimationFrame(() => {
    quadro = 0;
    const r = noite.getBoundingClientRect(), p = nightProgress(r.top, r.height, window.innerHeight);
    if (Math.abs(p - estado.np) > 0.004) { estado.np = p; pintaNoite(); }
   });
  };
  window.addEventListener('scroll', aoRolar, {passive: true});
  aoRolar();
 }
}
