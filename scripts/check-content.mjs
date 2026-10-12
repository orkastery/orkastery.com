import {fileURLToPath} from 'node:url';
import {pages,attrs,content,distArg,siteBase} from './check-links.mjs';
import {versao,marcadorDeVersao} from '../src/data/release.mjs';
import {ehRedirecionamento} from './check-redirecionamentos.mjs';
// Vocabulário proibido pelo kit (DESIGN.md, seção 4, e CLAUDE.md do kit): afrouxar, batuta, metrônomo,
// Bernstein, disruptivo e "pausa" no sentido de HITL (diga "ponto de HITL: decidir ou aprovar"), nas
// duas línguas. Pausar o movimento da home e a Sentinela pausada (estado de um mod) não são HITL.
export const PROIBIDOS=[/\bafrouxa\w*/i,/\bbatuta\b/i,/\bmetr[oô]nomos?\b/i,/\bbernstein\b/i,/\bdisruptiv\w*/i,/\bpausas?\b/i,/\bloosen\w*/i,/\bbaton\b/i,/\bmetronomes?\b/i,/\bpauses\b/i,/\bpause\b/i];
export const FORA_DE_HITL=['pause motion','pause and resume the Sentinel','pauses and resumes the Sentinel','pausa e retoma a Sentinela'];
export function vocabularioProibido(texto){
 let t=texto;for(const f of FORA_DE_HITL)t=t.replaceAll(f,'');
 return PROIBIDOS.map(re=>re.exec(t)?.[0]).filter(Boolean);
}
export function checkContent(dist=distArg(),base=siteBase()){
 // As páginas que levam as URLs /es/ antigas para /en/ têm a checagem delas (check-redirecionamentos.mjs).
 const all=pages(dist).filter(p=>!ehRedirecionamento(p));let diagrams=0;
 for(const p of all){
  const proibidos=vocabularioProibido(content(p.nodes.find(n=>n.tagName==='body')).replace(/\s+/g,' '));
  if(proibidos.length)throw Error('Vocabulário proibido pelo kit em '+p.path+': '+proibidos.join(', '));
  if(p.nodes.filter(n=>n.tagName==='main').length!==1||p.nodes.filter(n=>n.tagName==='h1').length!==1)throw Error('Expected one main and h1: '+p.path);
  // O marcador da versão só existe no texto editorial; no HTML ele sempre vira o número.
  if(p.source.includes(marcadorDeVersao))throw Error('Unreplaced version marker: '+p.path);
  for(const n of p.nodes){const a=attrs(n);
   if(n.tagName==='img'&&!('alt' in a))throw Error('Missing alt: '+p.path);
   if(n.tagName==='svg'&&a.role==='img'){
    const ids=(a['aria-labelledby']||'').split(/\s+/);
    if(ids.length<2||ids.some(id=>!p.nodes.some(x=>attrs(x).id===id&&['title','desc'].includes(x.tagName)&&content(x).trim())))throw Error('Inaccessible diagram: '+p.path);
    diagrams++;
   }
   if(/^h[1-6]$/.test(n.tagName||'')){
    const value=content(n).replace(/\b(?:GOAL|PLAN|GO|CHECK|SHIP|MASTER|CLI|MCP|SVG|PT|EN|ES|MIT|DAG|PLAT|SYS|MOD|FEAT|HITL)\b/g,'').trim();
    if(/[A-ZÀ-Ý]{4,}/.test(value))throw Error('All-caps heading: '+p.path);
   }
  }
 }
 for(const locale of ['pt','en']) {
  const prefix=locale==='pt'?'':'/'+locale, home=all.find(p=>p.path===prefix+'/');
  if(!home)throw Error('Missing translated home: '+locale);
  // Os títulos das seções da home do design do dono (Claude Design), na ordem dele, em cada língua.
  const required={"pt": ["Uma camada rege todos os seus runtimes, em todas as suas máquinas.", "Agentes ficaram bons. Conduzir agentes, não.", "Quanta autonomia você dá à fábrica? Escreva uma #TAG.", "As decisões simples, a Orkastery toma por você.", "A fábrica não para quando você dorme.", "Seis fases que nenhum agente pula.", "Cada número tem o comando que o prova.", "Comece a conduzir hoje."], "en": ["One layer conducts all your runtimes, on all your machines.", "Agents got good. Conducting agents, not yet.", "How much autonomy do you give the factory? Write a #TAG.", "The simple decisions, Orkastery makes for you.", "The factory does not stop when you sleep.", "Six phases no agent skips.", "Every number has the command that proves it.", "Start conducting today."]}[locale];
  for(const heading of required)if(!home.nodes.some(n=>n.tagName==='h2'&&content(n).includes(heading)))throw Error('Missing design home section: '+locale+': '+heading);
  if(!home.nodes.some(n=>'data-ciclo' in attrs(n))||!home.nodes.some(n=>'data-modos' in attrs(n)))throw Error('Missing interactive cycle or modes: '+locale);
  if(!content(home.nodes.find(n=>n.tagName==='main')).includes('@orkastery/cli '+versao))throw Error('Missing release label');
  const product=all.find(p=>p.path===prefix+'/ork/');if(!product||!product.nodes.some(n=>n.tagName==='h2'&&/dia cheio|full day/.test(content(n))))throw Error('Missing approved decision card: '+locale);
  const contribution=all.find(p=>p.path===prefix+'/docs/contribuir/');
  if(!contribution)throw Error('Missing contribution page: '+locale);
  for(const entry of [home,all.find(p=>p.path===prefix+'/docs/')])if(!entry?.nodes.some(n=>n.tagName==='a'&&attrs(n).href===base+prefix+'/docs/contribuir/'))throw Error('Missing contribution navigation: '+locale);
  if(!contribution.nodes.some(n=>n.tagName==='a'&&attrs(n).href?.endsWith('/discussions')))throw Error('Missing feature discussion link');
  if(!contribution.nodes.some(n=>n.tagName==='a'&&attrs(n).href?.endsWith('/CONTRIBUTING.md')))throw Error('Missing contribution source');
  const visible=content(home.nodes.find(n=>n.tagName==='main'));
  if(/OrkMind Web|Orkastery Web|Orkastery Board|pron[uú]ncia|pronunciation/.test(visible))throw Error('Excluded home content');
 }
 return {pages:all.length,accessibleDiagrams:diagrams,manualVisualReview:'required'};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(checkContent()));}catch(e){console.error(e.message);process.exitCode=1;}}
