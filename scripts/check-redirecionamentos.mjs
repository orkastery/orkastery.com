// O espanhol saiu do site (decisão E1 a do dono). Confere, na build, que cada URL /es/ que
// existia (src/data/es-legado.json) é uma página estática que leva ao mesmo caminho em /en/:
// refresh para lá, canonical para lá, noindex (na prévia, noindex, nofollow), lang en, link
// visível e o destino é uma página de verdade. Nenhuma outra página fica em /es/ e nenhuma
// página do site aponta para /es/.
import {fileURLToPath} from 'node:url';
import {pages,attrs,distArg,siteBase} from './check-links.mjs';
import {rotasDoLegado,alvoDoLegado} from '../src/lib/es-legado.mjs';
import {releaseDaBase} from '../src/lib/previa.mjs';

const ORIGEM='https://orkastery.com';
/** Página estática de redirecionamento do legado /es/: o caminho e o refresh dizem o que ela é. */
export const ehRedirecionamento=p=>/^\/es\//.test(p.path)&&p.nodes.some(n=>n.tagName==='meta'&&(attrs(n)['http-equiv']||'').toLowerCase()==='refresh');

export function checkRedirecionamentos(dist=distArg(),base=siteBase(),rotas=rotasDoLegado){
 const all=pages(dist),porCaminho=new Map(all.map(p=>[p.path,p]));
 const preview=Boolean(releaseDaBase(base||'/'));
 const listadas=new Set(rotas);
 for(const p of all){
  if(/^\/es\//.test(p.path)&&!listadas.has(p.path))throw Error('Página em /es/ fora do legado: '+p.path);
  if(/^\/es\//.test(p.path)&&!ehRedirecionamento(p))throw Error('Conteúdo em espanhol no lugar do redirecionamento: '+p.path);
  if(!/^\/es\//.test(p.path))for(const n of p.nodes){const a=attrs(n);
   if((a.hreflang||'').toLowerCase().startsWith('es'))throw Error('Página aponta para o espanhol (hreflang): '+p.path);
   for(const chave of ['href','src'])if(a[chave]&&new URL(a[chave],ORIGEM+base+p.path).origin===ORIGEM&&/^\/es\//.test(new URL(a[chave],ORIGEM+base+p.path).pathname.slice(base.length)))throw Error('Página aponta para /es/: '+p.path);
  }
 }
 for(const rota of rotas){
  const p=porCaminho.get(rota);
  if(!p)throw Error('URL /es/ antiga sem página de redirecionamento: '+rota);
  const destino=base+alvoDoLegado(rota),canonica=ORIGEM+destino;
  if(attrs(p.nodes.find(n=>n.tagName==='html')).lang!=='en')throw Error('Redirecionamento sem lang en: '+rota);
  const refresh=p.nodes.filter(n=>n.tagName==='meta'&&(attrs(n)['http-equiv']||'').toLowerCase()==='refresh');
  if(refresh.length!==1||(attrs(refresh[0]).content||'').replace(/\s+/g,' ').trim()!=='0; url='+destino)throw Error('Refresh errado: '+rota);
  const canon=p.nodes.filter(n=>n.tagName==='link'&&attrs(n).rel==='canonical');
  if(canon.length!==1||attrs(canon[0]).href!==canonica)throw Error('Canonical errado: '+rota);
  const robots=p.nodes.filter(n=>n.tagName==='meta'&&(attrs(n).name||'').toLowerCase()==='robots');
  const diretivas=robots.length===1?(attrs(robots[0]).content||'').toLowerCase().split(',').map(d=>d.trim()):[];
  if(!diretivas.includes('noindex')||(preview&&!diretivas.includes('nofollow')))throw Error('Redirecionamento sem noindex: '+rota);
  if(!p.nodes.some(n=>n.tagName==='a'&&attrs(n).href===destino))throw Error('Redirecionamento sem link visível para o destino: '+rota);
  const alvo=porCaminho.get(alvoDoLegado(rota));
  if(!alvo||ehRedirecionamento(alvo))throw Error('Destino do redirecionamento não é página do site: '+rota+' → '+alvoDoLegado(rota));
  if(p.nodes.some(n=>n.tagName==='link'&&attrs(n).rel==='alternate'))throw Error('Redirecionamento com alternates: '+rota);
 }
 return {redirecionamentos:rotas.length,modo:preview?'prévia':'produção'};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(checkRedirecionamentos()));}catch(e){console.error(e.message);process.exitCode=1;}}
