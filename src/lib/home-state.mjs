// A lógica do script do design (classe Component do Claude Design), portada para funções puras.
// O build chama estas funções com o estado inicial do design e renderiza o HTML estático; o
// navegador (src/scripts/home.ts) chama as mesmas com o estado que muda (relógio, cliques, rolagem).
// Cores são nomes de token (var(--nome)); os valores estão em src/data/design-system.json.

export const PH = ['GOAL', 'PLAN', 'GO', 'CHECK', 'SHIP', 'MASTER'];
export const ESTADO_INICIAL = Object.freeze({tick: 0, phase: 3, mode: 1, answer: null, np: 0});
export const TICK_MS = 2400;

// Cores do script do design, como nomes de token.
const C = {
 ink: 'tinta', ink2: 'tinta-2', ink3: 'tinta-3',
 brass: 'acento', brassT: 'acento-texto', brassS: 'acento-suave',
 pat: 'ok', patT: 'ok-texto', patS: 'ok-suave',
 run: 'info', runT: 'info-texto', runS: 'info-suave',
 emb: 'alerta', embT: 'alerta-texto', embS: 'alerta-suave',
 track: 'trilho', done: 'tinta-5'
};
export const cor = nome => nome.startsWith('#') || nome.startsWith('rgba') ? nome : `var(--${nome})`;
const fill = (texto, valores) => texto.replace(/\{(\w+)\}/g, (m, k) => (k in valores ? String(valores[k]) : m));

// ork board: fase e estado de cada thread pelo relógio.
export function board(t, tick) {
 return t.attention.threads.map(th => {
  let cur, st, changed = false;
  const at = k => (th.p + Math.floor((k + th.o) / 3)) % 7;
  if (th.wait) { cur = th.p; st = 'wait'; }
  else if (th.fix) { cur = 2; st = 'fix'; }
  else { cur = at(tick); st = cur === 6 ? 'ok' : 'run'; changed = tick > 0 && cur !== at(tick - 1); }
  const col = {run: [C.run, C.runT], wait: [C.brass, C.brassT], ok: [C.pat, C.patT], fix: [C.emb, C.embT]}[st];
  const segs = PH.map((_, i) => st === 'ok' ? C.pat : i < cur ? C.done : i === cur ? col[0] : C.track);
  return {...th, segs, dot: col[0], fg: col[1], label: t.attention.states[st], phase: st === 'ok' ? 'MASTER ✓' : PH[cur],
   rowBg: changed ? (st === 'ok' ? 'ok-destaque' : 'info-destaque') : 'rgba(255,255,255,0)'};
 });
}

// Topologia do diagrama: funções da camada, máquinas, fila de merge e roadmap.
export const MAQUINA_CORES = ['tinta', 'tinta-3', 'tinta-6'];
export function topo(t, tick) {
 const MC = MAQUINA_CORES;
 const rot = (tick % 12) >= 4 && (tick % 12) < 9;
 const segs = k => { const cur = k % 7; return PH.map((_, i) => cur === 6 ? C.pat : i < cur ? C.done : i === cur ? C.run : C.track); };
 const act = tick % t.parallel.fns.length;
 let seed = 0;
 const machines = t.parallel.machines.map((m, mi) => {
  let count = 0;
  const runtimes = m.runtimes.map((r, ri) => {
   const rotating = rot && mi === 0 && ri === 0;
   const threads = r.threads.map(n => { seed++; count++; return {n, segs: segs(seed * 2 + Math.floor((tick + seed) / 3))}; });
   return {rt: r.rt, prof: rotating ? t.parallel.rotatedProfile : r.prof, state: rotating ? t.parallel.rotated : t.parallel.active,
    sbg: rotating ? C.brassS : C.patS, sfg: rotating ? C.brassT : C.patT, threads};
  });
  return {name: m.name, env: m.env, color: MC[mi], runtimes, foot: fill(t.parallel.foot, {n: count})};
 });
 const ships = t.parallel.ships;
 const q0 = Math.floor(tick / 2) % ships.length;
 const mergeQueue = [0, 1, 2].map(k => { const n = ships[(q0 + k) % ships.length];
  return k === 0 ? {t: n + ' ✓ ls-remote', bg: 'branco', fg: C.patT, primeiro: true} : {t: (k + 1) + '. ' + n, bg: 'rgba(255,255,255,.55)', fg: C.ink2}; });
 const roadmap = Array.from({length: 24}, (_, i) => {
  const o = (i * 3 + Math.floor(tick / 2) + (i % 5)) % 4;
  const id = 'RM-' + String(31 + i).padStart(3, '0');
  return o === 3 ? {id, livre: true, bg: 'branco', fg: C.ink3, bd: 'rgba(18,22,28,.25)', bs: 'dashed'} : {id, livre: false, maquina: o, bg: MC[o], fg: o === 2 ? 'tinta' : 'branco', bd: MC[o], bs: 'solid'};
 });
 const coreFns = t.parallel.fns.map((label, i) => ({t: label, ativo: i === act,
  bg: i === act ? 'rgba(224,178,100,.16)' : 'rgba(233,236,239,.04)', fg: i === act ? 'acento' : 'sobre-noite-2', bd: i === act ? 'rgba(224,178,100,.5)' : 'grafite-3'}));
 return {coreFns, machines, mergeQueue, roadmap, machineLegend: t.parallel.machines.map((m, i) => ({n: m.name, c: MC[i]}))};
}

// Noite: o relógio vai de 23:00 a 07:00 conforme a rolagem (np de 0 a 1).
export function nightVals(np) {
 const m = 1380 + Math.round(np * 480);
 const pad = n => String(n).padStart(2, '0');
 return {clock: pad(Math.floor(m / 60) % 24) + ':' + pad(m % 60), pct: (np * 100).toFixed(1) + '%',
  morningOn: np > 0.9, morningOp: np > 0.9 ? 1 : 0.22, morningTf: np > 0.9 ? 'none' : 'translateY(14px)'};
}
export function nightItems(t, np) {
 const pm = np * 480;
 return t.night.events.map(e => {
  const [hh, mm] = e.t.split(':').map(Number);
  const at = ((hh * 60 + mm) - 1380 + 1440) % 1440;
  const on = pm >= at - 8;
  return {...e, on, op: on ? 1 : 0.26, fill: on ? e.c : 'noite', glow: on ? `0 0 14px var(--${e.c})` : 'none'};
 });
}
// A fórmula do design: 0 quando o topo da seção está a 55% da janela, 1 perto do fim dela.
export function nightProgress(top, height, vh) {
 return Math.max(0, Math.min(1, (vh * 0.55 - top) / Math.max(1, height - vh * 0.45)));
}

export function modes(t, mode) {
 return t.modes.list.map((m, i) => {
  const on = mode === i;
  return {tag: m.tag, pausas: m.pausas, on, bg: on ? 'papel' : 'transparent',
   blocks: m.ciclo.map(([label, start, span, pausa]) => ({label, pausa, col: `${start} / span ${span}`, bg: on ? 'tinta' : 'papel', fg: on ? 'papel' : C.ink2}))};
 });
}
export function modeDetail(t, mode) {
 const md = t.modes.list[mode];
 return {when: fill(t.modes.whenLabel, {tag: md.tag}), use: md.uso, about: md.sobre};
}

export function phases(t, phase) {
 return PH.map((name, i) => {
  const on = phase === i;
  return {name, n: '0' + (i + 1), on, bg: on ? 'tinta' : 'branco', fg: on ? 'papel' : 'tinta', bd: on ? 'tinta' : 'rgba(18,22,28,.1)'};
 });
}
export function phaseDetail(t, phase) {
 const ph = t.cycle.phases[phase];
 return {gives: fill(t.cycle.givesLabel, {phase: PH[phase]}), givesText: ph.gives, needs: ph.needs, code: ph.code};
}

export function options(t, answer) {
 return t.attention.options.map((o, i) => {
  const on = answer === i;
  return {...o, on, bg: on ? 'tinta' : 'branco', bd: on ? 'tinta' : 'rgba(18,22,28,.1)', kbg: on ? C.brass : 'papel', kfg: on ? 'sobre-acento' : C.ink2, rec: !!o.rec};
 });
}
export function answerNote(t, answer) {
 return answer === null ? t.attention.noteBefore : fill(t.attention.noteAfter, {k: t.attention.options[answer].k});
}

export function pulse(t) {
 const estilo = [['papel-2', C.ink], [C.brassS, C.brassT], [C.embS, C.embT], [C.patS, C.patT]];
 return t.attention.pulse.map((k, i) => ({...k, bg: estilo[i][0], fg: estilo[i][1]}));
}

export const preencher = fill;
