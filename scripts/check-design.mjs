// Guarda do design system do dono (Claude Design): tokens em sincronia com o JSON, contraste AA dos
// pares de texto, nenhum asset externo, licenças das três fontes, nenhuma fonte do visual antigo, a
// regra do código inline inteiro no CSS gerado e o orçamento de JS e fontes. A prova visual é o
// check:visual e o check:fidelity, com navegador; esta guarda roda em todo build, sem rede.
import {readFileSync,existsSync,statSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {pages,files,attrs,distArg,root} from './check-links.mjs';
import {verify as tokensEmSincronia,read as lerDesignSystem} from './design-tokens.mjs';

const rgb=hex=>hex.slice(1).match(/../g).map(n=>parseInt(n,16)/255);
const luminance=c=>c.map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((s,n,i)=>s+n*[.2126,.7152,.0722][i],0);
export function contrast(a,b){const x=luminance(rgb(a)),y=luminance(rgb(b));return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}

// Pares de texto do site: [frente, fundo, mínimo]. 4,5 para texto normal, 3 para título grande.
export const PARES=[
 ['tinta','papel',4.5],['tinta','branco',4.5],['tinta-2','papel',4.5],['tinta-2','branco',4.5],['tinta-2','papel-3',4.5],
 ['tinta-3','papel',4.5],['tinta-3','branco',4.5],['tinta-3','papel-3',4.5],['tinta-3','ok-fundo',4.5],
 ['tinta-4-aa','papel',4.5],['tinta-4-aa','branco',4.5],['tinta-4-aa','info-destaque',4.5],['tinta-4-aa','ok-destaque',4.5],
 ['tinta-4','papel',3],['tinta-4','branco',3],
 ['acento-texto','branco',4.5],['acento-texto','acento-suave',4.5],['acento-texto','papel',4.5],
 ['ok-texto','branco',4.5],['ok-texto','ok-fundo',4.5],['ok-texto','ok-suave',4.5],
 ['info-texto','branco',4.5],['info-texto','info-destaque',4.5],['alerta-texto','branco',4.5],['alerta-texto','alerta-suave',4.5],['alerta-texto','papel',4.5],
 ['sobre-noite','noite',4.5],['sobre-noite-2','noite',4.5],['sobre-noite-3','noite',4.5],['sobre-noite-4','noite',4.5],['sobre-noite-4','noite-painel',4.5],
 ['sobre-noite','tinta',4.5],['sobre-noite-2','tinta',4.5],['sobre-noite-3','tinta',4.5],['papel','tinta',4.5],
 ['acento','noite',4.5],['acento','tinta',4.5],['noite-info','noite-painel',4.5],['noite-alerta','noite-painel',4.5],['noite-ok','noite-painel',4.5],
 ['sobre-acento','acento',4.5],['sobre-acento','acento-forte',4.5]
];
export function checkContrast(cores){
 const medidas=[];
 for(const [f,b,min] of PARES){
  if(!cores[f]||!cores[b])throw Error('Token de cor ausente: '+(!cores[f]?f:b));
  const r=contrast(cores[f],cores[b]);
  if(r<min)throw Error(`Contrast ${f}/${b}: ${r.toFixed(2)} < ${min}`);
  medidas.push({par:f+'/'+b,razao:Number(r.toFixed(2)),minimo:min});
 }
 return medidas;
}

// Leitura estrutural do CSS do build, o suficiente para as regras de código.
export const cssRules=css=>[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m=>({selectors:m[1].split(',').map(s=>s.trim()),declarations:m[2]}));
export function codeRules(css){
 if(!cssRules(css).some(r=>r.selectors.includes(':not(pre)>code')&&/display:\s*inline-block/.test(r.declarations)&&/max-width:\s*100%/.test(r.declarations)))throw Error('Inline code can split across lines');
 if(!cssRules(css).some(r=>r.selectors.some(s=>/^\.code-unit$/.test(s))&&/white-space:\s*nowrap/.test(r.declarations)))throw Error('Adjacent text can detach from inline code');
 if(!cssRules(css).some(r=>r.selectors.some(s=>/^\.codigo-liso$/.test(s))&&/white-space:\s*nowrap/.test(r.declarations)))throw Error('Plain code can split across lines');
 return true;
}
export const FONTES_ANTIGAS=/Fraunces|Instrument Sans|Geist Mono/;
export const LICENCAS=['geist','hanken-grotesk','ibm-plex-mono'];
export const ORCAMENTO={js:30000,fontes:300000};

export function checkDesign(dist=distArg()){
 const {tokens}=tokensEmSincronia();
 const ds=lerDesignSystem();
 const cores=Object.fromEntries(Object.entries(ds.identidade.cores).map(([k,v])=>[k,v.valor]));
 const medidas=checkContrast(cores);
 const all=pages(dist);
 for(const page of all)for(const node of page.nodes){
  const a=attrs(node);
  if((node.tagName==='script'&&a.src&&/^(https?:)?\/\//.test(a.src))||(node.tagName==='link'&&['stylesheet','preload','modulepreload'].includes(a.rel)&&/^(https?:)?\/\//.test(a.href)))throw Error('External runtime asset: '+page.path);
 }
 const assets=files(dist),css=assets.filter(f=>f.endsWith('.css')).map(f=>readFileSync(f,'utf8')).join('\n')+all.map(p=>p.nodes.filter(n=>n.tagName==='style').map(n=>(n.childNodes||[]).map(c=>c.value||'').join('')).join('\n')).join('\n');
 if(/(?:@import\s*|url\(["']?)(?:https?:)?\/\//.test(css))throw Error('External CSS/font');
 if(FONTES_ANTIGAS.test(css))throw Error('Old design font in CSS');
 codeRules(css);
 for(const fonte of LICENCAS){const f=resolve(dist,'licenses',fonte+'.txt');if(!existsSync(f)||!readFileSync(f,'utf8').includes('SIL Open Font License'))throw Error('Missing font license: '+fonte);}
 const total=ext=>assets.filter(f=>f.endsWith(ext)).reduce((s,f)=>s+statSync(f).size,0);
 const js=total('.js'),fontes=total('.woff2');
 if(js>ORCAMENTO.js||fontes>ORCAMENTO.fontes)throw Error(`Asset budget exceeded: JS=${js}, fonts=${fontes}`);
 return {pages:all.length,tokens,contrastPairs:medidas.length,minTextContrast:Math.min(...medidas.filter(m=>m.minimo===4.5).map(m=>m.razao)),jsBytes:js,fontBytes:fontes,scope:'tokens, pares de contraste e CSS gerado; a revisão visual é o check:visual e o check:fidelity'};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(checkDesign()));}catch(e){console.error(e.message);process.exitCode=1;}}
