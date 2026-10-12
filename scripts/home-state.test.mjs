// A lógica portada da home (src/lib/home-state.mjs) dá o mesmo estado que o script do design do dono.
// O esperado (scripts/fidelidade/estado-do-design.json) foi calculado rodando a classe Component do
// Claude Design fora do navegador; aqui os nomes de token viram os hex de src/data/design-system.json.
// Roda com: node --experimental-strip-types scripts/home-state.test.mjs (home.ts é TypeScript).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {board,topo,nightVals,nightItems,modes,modeDetail,phases,phaseDetail,options,answerNote,ESTADO_INICIAL} from '../src/lib/home-state.mjs';
import home from '../src/data/home.ts';

const esperado=JSON.parse(readFileSync(new URL('./fidelidade/estado-do-design.json',import.meta.url),'utf8'));
const ds=JSON.parse(readFileSync(new URL('../src/data/design-system.json',import.meta.url),'utf8'));
const hex=Object.fromEntries(Object.entries(ds.identidade.cores).map(([k,v])=>[k,v.valor.toUpperCase()]));
// Token do site para o valor do design: nome de token vira hex; rgba, transparent e var() são resolvidos.
const valor=v=>{
 if(typeof v!=='string')return v;
 const s=v.replace(/var\(--([\w-]+)\)/g,(_,n)=>hex[n]||n);
 return hex[s]||s;
};
const norm=v=>typeof v==='string'?v.replace(/\s+/g,'').toUpperCase():v;
const t=home.pt;

test('estado inicial é o do design: tique 0, CHECK, #Maestro, sem resposta, noite em 0',()=>{
 assert.deepEqual({...ESTADO_INICIAL},{tick:0,phase:3,mode:1,answer:null,np:0});
});

test('board: as 7 threads em cada um dos 25 tiques',()=>{
 for(const [tick,e] of Object.entries(esperado.ticks)){
  const b=board(t,Number(tick));
  assert.equal(b.length,e.board.length);
  b.forEach((l,i)=>{
   const x=e.board[i];
   assert.deepEqual(l.segs.map(valor).map(norm),x.segs.map(norm),`segmentos ${tick}/${i}`);
   assert.equal(norm(valor(l.dot)),norm(x.dot),`ponto ${tick}/${i}`);
   assert.equal(norm(valor(l.fg)),norm(x.fg),`cor ${tick}/${i}`);
   assert.equal(l.label,x.label);assert.equal(l.phase,x.phase);
   assert.equal(norm(valor(l.rowBg)),norm(x.rowBg),`linha ${tick}/${i}`);
  });
 }
});

test('topologia: funções da camada, máquinas, fila de merge e roadmap em cada tique',()=>{
 for(const [tick,e] of Object.entries(esperado.ticks)){
  const v=topo(t,Number(tick)),x=e.topo;
  assert.deepEqual(v.coreFns.map(f=>[f.t,norm(valor(f.bg)),norm(valor(f.fg)),norm(valor(f.bd))]),x.coreFns.map(f=>[f.t,norm(f.bg),norm(f.fg),norm(f.bd)]),'funções '+tick);
  assert.deepEqual(v.mergeQueue.map(q=>[q.t,norm(valor(q.bg)),norm(valor(q.fg))]),x.mergeQueue.map(q=>[q.t,norm(q.bg),norm(q.fg)]),'fila '+tick);
  assert.deepEqual(v.roadmap.map(r=>[r.id,norm(valor(r.bg)),norm(valor(r.fg)),norm(valor(r.bd)),r.bs]),x.roadmap.map(r=>[r.id,norm(r.bg),norm(r.fg),norm(r.bd),r.bs]),'roadmap '+tick);
  v.machines.forEach((m,mi)=>{
   const xm=x.machines[mi];
   assert.equal(norm(valor(m.color)),norm(xm.color));assert.equal(m.foot,xm.foot);
   m.runtimes.forEach((r,ri)=>{
    const xr=xm.runtimes[ri];
    assert.deepEqual([r.prof,r.state,norm(valor(r.sbg)),norm(valor(r.sfg))],[xr.prof,xr.state,norm(xr.sbg),norm(xr.sfg)],`runtime ${tick}/${mi}/${ri}`);
    assert.deepEqual(r.threads.map(th=>th.segs.map(valor).map(norm)),xr.segs.map(s=>s.map(norm)),`fios ${tick}/${mi}/${ri}`);
   });
  });
 }
});

test('noite: relógio, progresso, eventos e resumo da manhã em cada ponto da rolagem',()=>{
 for(const [np,e] of Object.entries(esperado.noite)){
  const v=nightVals(Number(np));
  assert.deepEqual([v.clock,v.pct,v.morningOp,v.morningTf],[e.vals.nightClock,e.vals.nightPct,e.vals.morningOp,e.vals.morningTf],'noite '+np);
  nightItems(t,Number(np)).forEach((it,i)=>{
   const x=e.itens[i];
   assert.deepEqual([it.t,it.op,norm(valor(it.fill)),norm(valor(it.glow))],[x.t,x.op,norm(x.fill),norm(x.glow)],`evento ${np}/${i}`);
  });
 }
});

test('modos, fases e alternativas: o mesmo destaque e o mesmo texto do design',()=>{
 for(const [m,e] of Object.entries(esperado.modos)){
  const l=modes(t,Number(m));
  assert.deepEqual(l.map(x=>[x.tag,x.pausas,norm(valor(x.bg)),x.blocks.map(b=>[b.label,b.pausa,b.col,norm(valor(b.bg)),norm(valor(b.fg))])]),
   e.modes.map(x=>[x.tag,x.pausas,norm(x.bg),x.blocks.map(b=>[b.label,b.pausa,b.col,norm(b.bg),norm(b.fg)])]),'modo '+m);
  const d=modeDetail(t,Number(m));
  assert.deepEqual([d.when.split(' · ')[0],d.use,d.about],[e.modeTag,e.modeUse,e.modeAbout]);
 }
 for(const [p,e] of Object.entries(esperado.fases)){
  assert.deepEqual(phases(t,Number(p)).map(x=>[x.name,x.n,norm(valor(x.bg)),norm(valor(x.fg)),norm(valor(x.bd))]),e.phases.map(x=>[x.name,x.n,norm(x.bg),norm(x.fg),norm(x.bd)]),'fase '+p);
  const d=phaseDetail(t,Number(p));
  assert.equal(d.gives.split(' ')[0],e.phaseName);assert.equal(d.givesText,e.phaseGives);
 }
 for(const [a,e] of Object.entries(esperado.opcoes)){
  const resposta=a==='null'?null:Number(a);
  assert.deepEqual(options(t,resposta).map(o=>[o.k,o.t,norm(valor(o.bg)),norm(valor(o.bd)),norm(valor(o.kbg)),norm(valor(o.kfg)),o.rec]),e.options.map(o=>[o.k,o.t,norm(o.bg),norm(o.bd),norm(o.kbg),norm(o.kfg),o.rec]),'alternativa '+a);
  assert.equal(answerNote(t,resposta),e.answerNote);
 }
});

test('desvios de texto do design são só os registrados (D13): duas necessidades de fase com código real',()=>{
 const diferentes=Object.entries(esperado.fases).filter(([p,e])=>{const d=phaseDetail(t,Number(p));return d.needs!==e.phaseNeeds||d.code!==e.phaseCode;}).map(([p])=>Number(p));
 assert.deepEqual(diferentes,[1,2]);
});
