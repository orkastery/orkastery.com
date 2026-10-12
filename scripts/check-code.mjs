import {fileURLToPath} from 'node:url';
import {parse} from 'parse5';
import {pages,distArg,walk,attrs,content} from './check-links.mjs';

// Exact two-word prose, not wildcard exclusions of pages, components or languages.
// These describe the program/package rather than invoke a command.
export const proseExceptions = [
 'git a','git aos','git both','git call','git com','git con','git en','git facts','git has','git já','git nos','git repository','git sem','git sin','git without','git ya',
 'npm hoists','npm los','npm os',
 'ork a','ork abre','ork abrió','ork abriu','ork aplica','ork as','ork brings','ork chamado','ork chega','ork com','ork con','ork core','ork e','ork é','ork elige','ork entry','ork es','ork escolhe','ork exige','ork fica','ork goes','ork is','ork itself','ork llega','ork nas','ork never','ork nunca','ork opens','ork package','ork picks','ork por','ork se','ork state','ork version','ork with','ork y','ork requires',
];
const exceptions=new Set(proseExceptions);
// Subcomando do ork citado sem o ork: o comando é "ork claims add", nunca "claims add".
// Lista fechada de verbos e subcomandos reais da referência do CLI; o par com o ork antes é outra regra.
const bareVerbs='accounts|adapter|audit|board|brain|ci|claims|conducao|decisao|docs|doctor|experiencia|fabrica|gate|grafo|handoff|lease|ledger|master|memory|network|onboarding|phase|portfolio|prompt|pulse|retry|roadmap|sessions|setup|ship|thread|worktree';
const bareSubcommands='add|acquire|adopt|approve|assumir|conferir|confirmar|context|dossie|ensure|entrar|esgotamentos|export|indexar|install|new|pedir|placar|prepare|publicar|registrar-pr|registrar|release|retirar|run|sair|search|sincronizar|status|verificar';
export const bareCommand=new RegExp(`(?<![\\p{L}\\d_./@-])(?<!ork\\s)(?:${bareVerbs}) (?:${bareSubcommands})(?![\\p{L}\\d_-])`,'gu');
const blocks=new Set(['address','article','aside','blockquote','br','div','dl','dt','dd','figcaption','figure','footer','h1','h2','h3','h4','h5','h6','header','hr','li','main','nav','ol','p','section','svg','text','tspan','table','td','th','tr','ul']);
const excluded=new Set(['head','script','style','template','code','pre']);
// Keep hidden panels/details: they can become visible on interaction. aria-hidden is
// not a visual exemption. Entity decoding and inline tag joins come from the DOM.
export function prose(node) {
 if(node.tagName==='code')return '\u0001';
 if(excluded.has(node.tagName))return '\u0000';
 if(node.nodeName==='#text')return node.value;
 const value=(node.childNodes||[]).map(prose).join('');
 return blocks.has(node.tagName)?'\u0000'+value+'\u0000':value;
}
export function violations(html) {
 const text=prose(typeof html==='string'?parse(html):html),found=[];
 // Preserve the inline-code boundary: an executable left in prose is still
 // unformatted even when its subcommand is inside code (possibly nested).
 for(const m of text.matchAll(/\b(?:ork|npm|npx|git|pip3?)\s*(?=\u0001)/g))found.push(m[0].trim());
 for(const m of text.matchAll(/\b(?:ork|npm|npx|git|pip3?)\s+(?:--?[a-z][\w-]*|[\p{L}][\p{L}\d_-]*)/gu)){
  const candidate=m[0].replace(/\s+/g,' ');
  if(!exceptions.has(candidate))found.push(candidate);
 }
 for(const m of text.matchAll(bareCommand))found.push('ork? '+m[0]);
 for(const m of text.matchAll(/(?<![\w-])--[a-z][\w-]*|\b(?:[A-Z][A-Z0-9]*_)+[A-Z0-9_]+\b|\b(?:mcp__\w+|ork_\w+)\b|\b[\w.-]+\.(?:jsonl?|ya?ml|md|toml|mjs|cjs|ts|py|sh)\b|\bork\.[\w.-]+\/v\d+/g))found.push(m[0]);
 for(const m of text.matchAll(/\b[a-z][\w-]*(?:\.[a-z][\w-]*)+(?:\/v\d+)?\b|\b[a-z][\w]*(?:_[a-z\d]+)+\b|(?:~\/|\.[a-z][\w-]*\/|\/(?:usr|tmp)\/|\b(?:origin|tools|plugins|pgvector)\/)(?:[\w@*-]+|<[^<>]+>|\/|\.[\w-]+)+|@[a-z][\w-]*\/[\w.-]+/g)){
  // Public contact/domain is prose. This does not exempt any command or path.
  if(!['orkastery.com','orkmind.com'].includes(m[0]))found.push(m[0]);
 }
 return [...new Set(found)];
}
// Dentro de um paragrafo, o codigo inline segue o tamanho da regra comum. A classe
// mono fixa um tamanho absoluto, e os codigos do mesmo paragrafo ficariam diferentes.
export function scaleViolations(html) {
 const dom=typeof html==='string'?parse(html):html;
 return walk(dom).filter(n=>n.tagName==='p').flatMap(p=>walk(p).filter(n=>n.tagName==='code'&&(attrs(n).class||'').split(/\s+/).includes('mono')).map(n=>`<code class="${attrs(n).class}">`));
}
// A unidade sem quebra nao encolhe: colada a mais de 12 caracteres, ela estouraria a coluna
// estreita. Texto assim pede o identificador inteiro no codigo ou um espaco antes do resto.
export function glueViolations(html) {
 const dom=typeof html==='string'?parse(html):html;
 return walk(dom).filter(n=>n.tagName==='span'&&(attrs(n).class||'').split(/\s+/).includes('code-unit')).flatMap(unit=>{
  const glued=content(unit).length-walk(unit).filter(n=>n.tagName==='code').map(content).join('').length;
  return glued>12?[content(unit)]:[];
 });
}
export function checkCode(dist=distArg()) {
 const all=pages(dist),errors=[],scaled=[],glued=[];
 for(const page of all){
  for(const item of violations(page.dom))errors.push(`${page.path}: ${item}`);
  for(const item of scaleViolations(page.dom))scaled.push(`${page.path}: ${item}`);
  for(const item of glueViolations(page.dom))glued.push(`${page.path}: ${item}`);
 }
 if(errors.length)throw Error('Technical text outside code/pre:\n'+errors.join('\n'));
 if(scaled.length)throw Error('Inline code with its own type scale:\n'+scaled.join('\n'));
 if(glued.length)throw Error('Inline code unit glues more than 12 characters:\n'+glued.join('\n'));
 return {pages:all.length,unformatted:0,scaledInlineCode:0,longCodeUnits:0,proseExceptions:proseExceptions.length};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(checkCode()));}catch(error){console.error(error.message);process.exitCode=1;}}
