import {readFileSync,statSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {pages,files,attrs,content,distArg,root} from './check-links.mjs';

const rgb=hex=>hex.slice(1).match(/../g).map(n=>parseInt(n,16)/255);
const luminance=channels=>channels.map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
export function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const mix=(a,b,ratio)=>a.map((n,i)=>n*ratio+b[i]*(1-ratio));
// Leitura estrutural do CSS minificado do build, suficiente para os canarios de layout.
export function mediaBlocks(css){
 const blocks=[],start=/@media\s*([^{]+)\{/g;let m;
 while((m=start.exec(css))){let depth=1,i=start.lastIndex;for(;i<css.length&&depth;i++)depth+=css[i]==='{'?1:css[i]==='}'?-1:0;blocks.push({query:m[1].trim(),body:css.slice(start.lastIndex,i-1)});}
 return blocks;
}
export const cssRules=css=>[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m=>({selectors:m[1].split(',').map(s=>s.trim()),declarations:m[2]}));
export const hides=(css,className)=>cssRules(css).some(r=>/display:\s*none/.test(r.declarations)&&r.selectors.some(s=>new RegExp('\\.'+className+'(?:\\[[^\\]]*\\])?$').test(s)));
export function layoutCanaries(css){
 // Onde os chips do ciclo quebram em linhas, os lacos somem; a trilha decorativa vai junto.
 const wraps=mediaBlocks(css).filter(block=>hides(block.body,'lacos'));
 if(!wraps.length||!wraps.every(block=>hides(block.body,'factory-tracks')))throw Error('Decorative tracks over wrapped cycle chips');
 // Codigo inline e atomico: um comando curto nunca se parte entre linhas.
 if(!cssRules(css).some(r=>r.selectors.includes(':not(pre)>code')&&/display:\s*inline-block/.test(r.declarations)&&/max-width:\s*100%/.test(r.declarations)))throw Error('Inline code can split across lines');
 // Atomico, o chip abriria quebra junto do que encosta nele; a unidade sem quebra mantem tudo colado.
 if(!cssRules(css).some(r=>r.selectors.includes('.code-unit')&&/white-space:\s*nowrap/.test(r.declarations)))throw Error('Adjacent text can detach from inline code');
 return {wrappedCycleRules:wraps.length};
}

export function checkDesign(dist=distArg()){
 const css=readFileSync(resolve(root,'src/styles/tokens.css'),'utf8');
 const colors=block=>Object.fromEntries([...block.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6});/g)].map(m=>[m[1],rgb(m[2])]));
 const dark=colors(css.match(/:root\s*\{([\s\S]*?)\n\}/)[1]);
 const light={...dark,...colors(css.match(/:root\[data-theme='light'\]\s*\{([\s\S]*?)\n\}/)[1])};
 const measurements=[];
 function measure(theme,label,a,b,min=4.5){const ratio=contrast(a,b);if(ratio<min)throw Error(`Contrast ${theme} ${label}: ${ratio.toFixed(2)} < ${min}`);measurements.push({theme,label,ratio:Number(ratio.toFixed(2)),minimum:min});}
 for(const [theme,c] of Object.entries({dark,light})){
  for(const bg of ['--poco','--palco','--painel','--relevo']){
   for(const fg of ['--tinta','--tinta-2','--tinta-3','--tinta-4','--acento','--acento-forte','--prova','--prova-forte','--alerta','--alerta-forte'])measure(theme,fg+'/'+bg,c[fg],c[bg]);
   measure(theme,'inline-code/'+bg,c['--acento-forte'],mix(c['--acento'],c[bg],.09));
   measure(theme,'control-border/'+bg,c['--linha-forte'],c[bg],3);
  }
  for(const name of ['acento','prova','alerta'])measure(theme,'on-'+name,c['--sobre-'+name],c['--'+name]);
 }
 const all=pages(dist);
 for(const page of all){
  const html=page.nodes.find(n=>n.tagName==='html');
  if(attrs(html)['data-theme']!=='dark')throw Error('Dark default missing: '+page.path);
  if(!page.nodes.some(n=>'data-theme-toggle' in attrs(n)))throw Error('Theme control missing: '+page.path);
  for(const node of page.nodes){
   const a=attrs(node);
   if((node.tagName==='script'&&a.src&&/^(https?:)?\/\//.test(a.src)) || (node.tagName==='link'&&['stylesheet','preload'].includes(a.rel)&&/^(https?:)?\/\//.test(a.href)))throw Error('External runtime asset: '+page.path);
  }
 }
 for(const locale of ['pt','en','es']){
  const path=(locale==='pt'?'':'/'+locale)+'/';
  const page=all.find(p=>p.path===path);
  if(!page.nodes.some(n=>attrs(n).class?.split(' ').includes('collision'))||!page.nodes.some(n=>n.tagName==='s'&&content(n).trim()))throw Error('Missing collision illustration: '+locale);
  if(page.source.includes('class="partitura"')||page.source.includes('data-naipe='))throw Error('Musical ornament in active page');
 }
 const assets=files(dist);
 for(const f of assets.filter(f=>f.endsWith('.css')))if(/(?:@import\s*|url\(["']?)(?:https?:)?\/\//.test(readFileSync(f,'utf8')))throw Error('External CSS/font');
 // Canarios de presenca no CSS gerado; a prova de layout e a matriz do check:visual.
 const {wrappedCycleRules}=layoutCanaries(assets.filter(f=>f.endsWith('.css')).map(f=>readFileSync(f,'utf8')).join('\n'));
 const total=extension=>assets.filter(f=>f.endsWith(extension)).reduce((sum,f)=>sum+statSync(f).size,0);
 const jsBytes=total('.js'),fontBytes=total('.woff2'),cssBytes=total('.css');
 const maxPageInlineJsBytes=Math.max(...all.map(page=>page.nodes.filter(n=>n.tagName==='script'&&!attrs(n).src).reduce((sum,n)=>sum+Buffer.byteLength(content(n)),0)));
 // Total across the site, not a per-page transfer estimate. Budgets protect static delivery.
 if(jsBytes+maxPageInlineJsBytes>45000||fontBytes>200000)throw Error(`Asset budget exceeded: JS=${jsBytes}, fonts=${fontBytes}`);
 for(const font of ['instrument-sans','geist-mono','fraunces'])if(!readFileSync(resolve(dist,'licenses',font+'.txt'),'utf8').includes('SIL OPEN FONT LICENSE'))throw Error('Missing font license');
 return {pages:all.length,wrappedCycleRules,contrastPairs:measurements.length,minTextContrast:Math.min(...measurements.filter(m=>m.minimum===4.5).map(m=>m.ratio)),minControlContrast:Math.min(...measurements.filter(m=>m.minimum===3).map(m=>m.ratio)),jsBytes,maxPageInlineJsBytes,cssBytes,fontBytes,scope:'token pairs; rendered visual review remains required'};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(checkDesign()));}catch(error){console.error(error.message);process.exitCode=1;}}
