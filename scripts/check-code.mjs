import {fileURLToPath} from 'node:url';
import {parse} from 'parse5';
import {pages,distArg,walk,attrs,content} from './check-links.mjs';

// Exact two-word prose, not wildcard exclusions of pages, components or languages.
// These describe the program/package rather than invoke a command.
export const proseExceptions = [
 'git a','git aos','git both','git call','git com','git con','git en','git facts','git has','git já','git nos','git repository','git sem','git sin','git without','git ya',
 'npm hoists','npm los','npm os',
 'ork a','ork abre','ork abrió','ork abriu','ork aplica','ork arrives','ork as','ork brings','ork chamado','ork chega','ork com','ork con','ork core','ork e','ork é','ork elige','ork entry','ork es','ork escolhe','ork exige','ork fica','ork goes','ork is','ork itself','ork llega','ork nas','ork never','ork nunca','ork opens','ork package','ork picks','ork por','ork reserva','ork reserves','ork se','ork state','ork version','ork with','ork y','ork requires',
];
const exceptions=new Set(proseExceptions);
// Subcomando do ork citado sem o ork: o comando é "ork claims add", nunca "claims add".
// Lista fechada de pares que não são prosa em nenhuma das três línguas. Ficam de fora os que
// uma frase comum forma ("the thread status", "each phase run", "the memory search", "a thread
// entrar"): esses ficam com a revisão editorial, e o par com o ork antes é outra regra.
export const bareCommandPairs=['claims add','claims conferir','claims retirar','ci prepare','ci run','ci status','ship registrar-pr','decisao registrar','decisao placar','docs sincronizar','docs verificar','network entrar','network sair','network publicar','fabrica entrar','fabrica publicar','grafo indexar','master pedir','brain context','brain dossie','projetos registrar','projetos esquecer','sessions limpar-fantasmas','accounts esgotamentos','roadmap reservas','worktree ensure','lease acquire','setup sandbox','setup worktree'];
export const bareCommand=new RegExp(`(?<![\\p{L}\\d_./@-])(?<!ork\\s)(?:${bareCommandPairs.map(p=>p.replace(' ','\\s+')).join('|')})(?![\\p{L}\\d_-])`,'gu');
// Comando partido: o código termina antes do comando acabar e o resto ficou na prosa
// (<code>ork claims</code> add, <code>ork docs sincronizar --so</code> RM-NNN, node <code>--test</code>).
// Só subcomandos que não são verbo comum de prosa: "ork pulse e ork roadmap status show" é inglês.
const restOfCommand=/^\s+(?:conferir|retirar|prepare|registrar-pr|registrar|placar|sincronizar|verificar|entrar|sair|publicar|indexar|pedir|dossie|esquecer|limpar-fantasmas|esgotamentos|reservas|ensure|acquire|revogar|confirmar)(?![\p{L}\d_-])/u;
const valueAfterFlag=/^\s+(?:RM-[\dN]+|C\d+|T\d|<[^<>]+>|ork-[a-z])/;
const isUnitNode=n=>n?.tagName==='span'&&(attrs(n).class||'').split(/\s+/).includes('code-unit');
const textOf=n=>!n?'':n.nodeName==='#text'?n.value:content(n);
export function splitCommands(html) {
 const dom=typeof html==='string'?parse(html):html,found=[];
 const visit=node=>{
  const kids=node.childNodes||[];
  kids.forEach((child,i)=>{
   if(child.tagName==='code'){
    const code=content(child).trim();
    let after=textOf(kids[i+1]),before=textOf(kids[i-1]);
    if(i===kids.length-1&&isUnitNode(node)){const up=node.parentNode?.childNodes||[];after=textOf(up[up.indexOf(node)+1]);}
    if(i===0&&isUnitNode(node)){const up=node.parentNode?.childNodes||[];before=textOf(up[up.indexOf(node)-1]);}
    if(/^ork\s+[a-z][\w-]*$/.test(code)&&restOfCommand.test(after))found.push(`partido: ${code} + ${after.trim().split(/\s+/)[0].replace(/[.,;:)]+$/,'')}`);
    else if(/^ork\s.*\s--[a-z][\w-]*$/.test(code)&&valueAfterFlag.test(after))found.push(`partido: ${code} + ${after.trim().split(/\s+/)[0].replace(/[.,;:)]+$/,'')}`);
    if(/^--/.test(code)&&/\bnode\s+$/.test(before))found.push(`partido: node + ${code}`);
   }else if(!excluded.has(child.tagName))visit(child);
  });
 };
 visit(dom);return found;
}
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
 const dom=typeof html==='string'?parse(html):html,text=prose(dom),found=[...splitCommands(dom)];
 // Preserve the inline-code boundary: an executable left in prose is still
 // unformatted even when its subcommand is inside code (possibly nested).
 for(const m of text.matchAll(/\b(?:ork|npm|npx|git|pip3?)\s*(?=\u0001)/g))found.push(m[0].trim());
 for(const m of text.matchAll(/\b(?:ork|npm|npx|git|pip3?)\s+(?:--?[a-z][\w-]*|[\p{L}][\p{L}\d_-]*)/gu)){
  const candidate=m[0].replace(/\s+/g,' ');
  if(!exceptions.has(candidate))found.push(candidate);
 }
 for(const m of text.matchAll(bareCommand))found.push('ork? '+m[0]);
 // Variável de ambiente e comando de barra do plugin fora do código ($HOME, PATH, LANG, /orkastery:goal, $ork).
 for(const m of text.matchAll(/\$[A-Z][A-Z0-9_]*\b|\b(?:PATH|HOME|LANG|TMPDIR|PWD)\b|(?<![\w/.:-])\/orkastery:[a-z][\w-]*|(?<![\w$])\$ork\b/g))found.push(m[0]);
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
