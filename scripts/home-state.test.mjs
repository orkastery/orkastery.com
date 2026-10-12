// A lógica portada da home (src/lib/home-state.mjs) dá o mesmo estado que o script do design do dono.
// O esperado (scripts/fidelidade/estado-do-design.json) foi calculado rodando a classe Component do
// Claude Design fora do navegador. As cores comparam pelo papel: o hex do design e a expressão da
// Partitura viram a mesma categoria (tinta, linha, executando, verificado...). As únicas trocas de
// papel são as do kit (D18), listadas em TROCAS: o latão sai da rotação de perfil, da função ativa
// da camada, da decisão da noite e da alternativa escolhida; o texto sobre a cor de ação é
// --sobre-acao.
// Roda com: node --experimental-strip-types scripts/home-state.test.mjs (home.ts é TypeScript).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {board,topo,nightVals,nightItems,modes,modeDetail,phases,phaseDetail,options,answerNote,pulse,ESTADO_INICIAL,C,mistura,MAQUINA_CORES} from '../src/lib/home-state.mjs';
import home from '../src/data/home.ts';

const esperado=JSON.parse(readFileSync(new URL('./fidelidade/estado-do-design.json',import.meta.url),'utf8'));
const norm=v=>typeof v==='string'?v.replace(/\s+/g,'').toUpperCase():v;
// Papel de cada cor do script do design.
const DO_DESIGN={
 '#12161C':'tinta','#454C56':'tinta-2','#5F6670':'tinta-3','#C3C9D1':'tinta-2','#9AA1AB':'feito','#AEB4BC':'maquina-3',
 '#E3E6EA':'linha','RGBA(18,22,28,.1)':'linha','#2A303A':'linha','RGBA(18,22,28,.25)':'linha-livre',
 '#EEF0F2':'nevoa','#FFFFFF':'papel','RGBA(255,255,255,.55)':'papel-55','RGBA(255,255,255,0)':'transparente','#0D1015':'chao',
 '#E0B264':'espera','#8A5F17':'espera-texto','#F6ECD9':'espera-tom','#17110A':'sobre-espera','RGBA(224,178,100,.16)':'espera-ativo','RGBA(224,178,100,.5)':'espera-ativo-borda',
 '#4F78B8':'executando','#8FB0E0':'executando','#2F5A8F':'executando-texto','#EFF3FA':'executando-destaque',
 '#3C9A86':'verificado','#7CC7B4':'verificado','#1F6B5C':'verificado-texto','#DDEEE9':'verificado-tom','#EEF6F3':'verificado-destaque',
 '#D9673F':'falha','#EE8C68':'falha','#A6432B':'falha-texto','RGBA(233,236,239,.04)':'luar-fundo','NONE':'nenhum','TRANSPARENT':'transparente'
};
// Papel de cada expressão da Partitura que a lógica usa.
const DO_SITE={
 'texto':'tinta','texto-2':'tinta-2','texto-3':'tinta-3',[C.done]:'feito',[MAQUINA_CORES[2]]:'maquina-3','linha':'linha',[mistura('texto',25)]:'linha-livre',
 'superficie-2':'nevoa','superficie':'papel',[mistura('superficie',55)]:'papel-55','transparent':'transparente','chao':'chao','acao':'tinta','sobre-acao':'sobre-acao',
 'espera':'espera','espera-texto':'espera-texto',[C.brassS]:'espera-tom',
 'executando':'executando','executando-texto':'executando-texto',[C.runS]:'executando-tom',[mistura('executando',7,'superficie')]:'executando-destaque',[mistura('executando',22)]:'executando-ativo',[mistura('executando',60)]:'executando-ativo-borda',
 'verificado':'verificado','verificado-texto':'verificado-texto',[C.patS]:'verificado-tom',[mistura('verificado',7,'superficie')]:'verificado-destaque',
 'falha':'falha','falha-texto':'falha-texto',[C.embS]:'falha-tom',[mistura('texto',4)]:'luar-fundo','none':'nenhum'
};
const papelDesign=v=>{const s=norm(v),m=/^0014PX(.+)$/.exec(s);if(m)return 'brilho:'+papelDesign(m[1]);const p=DO_DESIGN[s];if(!p)throw Error('cor do design sem papel: '+v);return p;};
const papelSite=v=>{const m=/^0 0 14px var\(--([\w-]+)\)$/.exec(v);if(m)return 'brilho:'+papelSite(m[1]);const p=DO_SITE[v];if(!p)throw Error('expressão do site sem papel: '+v);return p;};
// Trocas de papel do kit (D18): [função.campo, papel no design, papel no site].
const TROCAS=[
 ['topo.coreFns.bg','espera-ativo','executando-ativo'],['topo.coreFns.fg','espera','tinta'],['topo.coreFns.bd','espera-ativo-borda','executando-ativo-borda'],
 ['topo.runtime.sbg','espera-tom','executando-tom'],['topo.runtime.sfg','espera-texto','executando-texto'],
 ['noite.fill','espera','tinta'],['noite.glow','brilho:espera','brilho:tinta'],
 ['opcoes.bg','tinta','nevoa'],['opcoes.kbg','espera','tinta'],['opcoes.kfg','sobre-espera','papel'],
 ['fases.fg','nevoa','sobre-acao']
];
const comoNoSite=(onde,papel)=>TROCAS.find(([o,d])=>o===onde&&d===papel)?.[2]??papel;
const mesmoPapel=(onde,site,design,msg)=>assert.equal(papelSite(site),comoNoSite(onde,papelDesign(design)),msg+' ('+onde+')');
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
   l.segs.forEach((s,k)=>mesmoPapel('board.segs',s,x.segs[k],`segmento ${tick}/${i}/${k}`));
   mesmoPapel('board.dot',l.dot,x.dot,`ponto ${tick}/${i}`);
   mesmoPapel('board.fg',l.fg,x.fg,`cor ${tick}/${i}`);
   assert.equal(l.label,x.label);assert.equal(l.phase,x.phase);
   mesmoPapel('board.rowBg',l.rowBg,x.rowBg,`linha ${tick}/${i}`);
  });
 }
});

test('topologia: funções da camada, máquinas, fila de merge e roadmap em cada tique',()=>{
 for(const [tick,e] of Object.entries(esperado.ticks)){
  const v=topo(t,Number(tick)),x=e.topo;
  assert.deepEqual(v.coreFns.map(f=>f.t),x.coreFns.map(f=>f.t));
  v.coreFns.forEach((f,i)=>{for(const k of ['bg','fg','bd'])mesmoPapel('topo.coreFns.'+k,f[k],x.coreFns[i][k],`função ${tick}/${i}`);});
  assert.deepEqual(v.mergeQueue.map(q=>q.t),x.mergeQueue.map(q=>q.t),'fila '+tick);
  v.mergeQueue.forEach((q,k)=>{mesmoPapel('topo.fila.bg',q.bg,x.mergeQueue[k].bg,'fila '+tick);mesmoPapel('topo.fila.fg',q.fg,x.mergeQueue[k].fg,'fila '+tick);});
  assert.deepEqual(v.roadmap.map(r=>[r.id,r.bs]),x.roadmap.map(r=>[r.id,r.bs]),'roadmap '+tick);
  v.roadmap.forEach((r,k)=>{for(const c of ['bg','fg','bd'])mesmoPapel('topo.roadmap.'+c,r[c],x.roadmap[k][c],`roadmap ${tick}/${k}`);});
  v.machines.forEach((m,mi)=>{
   const xm=x.machines[mi];
   mesmoPapel('topo.maquina',m.color,xm.color,'máquina '+mi);assert.equal(m.foot,xm.foot);
   m.runtimes.forEach((r,ri)=>{
    const xr=xm.runtimes[ri];
    assert.deepEqual([r.prof,r.state],[xr.prof,xr.state],`runtime ${tick}/${mi}/${ri}`);
    mesmoPapel('topo.runtime.sbg',r.sbg,xr.sbg,`runtime ${tick}/${mi}/${ri}`);mesmoPapel('topo.runtime.sfg',r.sfg,xr.sfg,`runtime ${tick}/${mi}/${ri}`);
    r.threads.forEach((th,ti)=>th.segs.forEach((s,k)=>mesmoPapel('topo.fios',s,xr.segs[ti][k],`fio ${tick}/${mi}/${ri}/${ti}`)));
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
   assert.deepEqual([it.t,it.op],[x.t,x.op],`evento ${np}/${i}`);
   mesmoPapel('noite.fill',it.fill,x.fill,`evento ${np}/${i}`);
   mesmoPapel('noite.glow',it.glow,x.glow,`brilho ${np}/${i}`);
  });
 }
});

test('modos, fases e alternativas: o mesmo destaque e o mesmo texto do design',()=>{
 for(const [m,e] of Object.entries(esperado.modos)){
  const l=modes(t,Number(m));
  assert.deepEqual(l.map(x=>[x.tag,x.pausas,x.blocks.map(b=>[b.label,b.pausa,b.col])]),e.modes.map(x=>[x.tag,x.pausas,x.blocks.map(b=>[b.label,b.pausa,b.col])]),'modo '+m);
  l.forEach((x,i)=>{mesmoPapel('modos.bg',x.bg,e.modes[i].bg,'modo '+m);x.blocks.forEach((b,k)=>{mesmoPapel('modos.bloco.bg',b.bg,e.modes[i].blocks[k].bg,'bloco '+m);mesmoPapel('modos.bloco.fg',b.fg,e.modes[i].blocks[k].fg,'bloco '+m);});});
  const d=modeDetail(t,Number(m));
  assert.deepEqual([d.when.split(' · ')[0],d.use,d.about],[e.modeTag,e.modeUse,e.modeAbout]);
 }
 for(const [p,e] of Object.entries(esperado.fases)){
  const f=phases(t,Number(p));
  assert.deepEqual(f.map(x=>[x.name,x.n]),e.phases.map(x=>[x.name,x.n]),'fase '+p);
  f.forEach((x,i)=>{for(const k of ['bg','fg','bd'])mesmoPapel('fases.'+k,x[k],e.phases[i][k],`fase ${p}/${i}`);});
  const d=phaseDetail(t,Number(p));
  assert.equal(d.gives.split(' ')[0],e.phaseName);assert.equal(d.givesText,e.phaseGives);
 }
 for(const [a,e] of Object.entries(esperado.opcoes)){
  const resposta=a==='null'?null:Number(a),o=options(t,resposta);
  assert.deepEqual(o.map(x=>[x.k,x.t,x.rec]),e.options.map(x=>[x.k,x.t,x.rec]),'alternativa '+a);
  o.forEach((x,i)=>{for(const k of ['bg','bd','kbg','kfg'])mesmoPapel('opcoes.'+k,x[k],e.options[i][k],`alternativa ${a}/${i}`);});
  assert.equal(answerNote(t,resposta),e.answerNote);
 }
});

test('latão só onde o kit deixa: espera você no board e o urgente do resumo',()=>{
 const latao=new Set(['espera','espera-texto',C.brassS]);
 for(const tick of [0,3,7,12]){
  for(const l of board(t,tick))for(const c of [...l.segs,l.dot,l.fg,l.rowBg])if(latao.has(c))assert.equal(l.label,t.attention.states.wait,'latão no board só em espera você');
  const v=topo(t,tick);
  for(const c of [...v.coreFns.flatMap(f=>[f.bg,f.fg,f.bd]),...v.machines.flatMap(m=>m.runtimes.flatMap(r=>[r.sbg,r.sfg]))])assert.ok(!latao.has(c),'latão na topologia');
 }
 for(const it of nightItems(t,1))assert.ok(!latao.has(it.fill),'latão na noite');
 for(const a of [null,0,1,2,3])for(const o of options(t,a))for(const c of [o.bg,o.bd,o.kbg,o.kfg])assert.ok(!latao.has(c),'latão na alternativa');
 const k=pulse(t);
 assert.deepEqual(k.map(x=>latao.has(x.bg)||latao.has(x.fg)),[false,true,false,false],'no resumo, só o urgente (espera você)');
});

test('desvios de texto do design são só os registrados (D13): duas necessidades de fase com código real',()=>{
 const diferentes=Object.entries(esperado.fases).filter(([p,e])=>{const d=phaseDetail(t,Number(p));return d.needs!==e.phaseNeeds||d.code!==e.phaseCode;}).map(([p])=>Number(p));
 assert.deepEqual(diferentes,[1,2]);
});
