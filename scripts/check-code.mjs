import {fileURLToPath} from 'node:url';
import {parse} from 'parse5';
import {pages,distArg} from './check-links.mjs';

// Exact two-word prose, not wildcard exclusions of pages, components or languages.
// These describe the program/package rather than invoke a command.
export const proseExceptions = [
 'git a','git aos','git both','git call','git com','git con','git en','git facts','git has','git já','git nos','git repository','git sem','git sin','git without','git ya',
 'npm hoists','npm los','npm os',
 'ork a','ork abre','ork abrió','ork abriu','ork aplica','ork as','ork brings','ork chega','ork com','ork con','ork core','ork e','ork é','ork elige','ork entry','ork es','ork escolhe','ork exige','ork fica','ork goes','ork is','ork itself','ork llega','ork nas','ork never','ork nunca','ork opens','ork package','ork picks','ork por','ork se','ork state','ork version','ork with','ork y','ork requires',
];
const exceptions=new Set(proseExceptions);
const blocks=new Set(['address','article','aside','blockquote','br','div','dl','dt','dd','figcaption','figure','footer','h1','h2','h3','h4','h5','h6','header','hr','li','main','nav','ol','p','section','svg','text','tspan','table','td','th','tr','ul']);
const excluded=new Set(['head','script','style','template','code','pre']);
// Keep hidden panels/details: they can become visible on interaction. aria-hidden is
// not a visual exemption. Entity decoding and inline tag joins come from the DOM.
export function prose(node) {
 if(excluded.has(node.tagName))return '\u0000';
 if(node.nodeName==='#text')return node.value;
 const value=(node.childNodes||[]).map(prose).join('');
 return blocks.has(node.tagName)?'\u0000'+value+'\u0000':value;
}
export function violations(html) {
 const text=prose(typeof html==='string'?parse(html):html),found=[];
 for(const m of text.matchAll(/\b(?:ork|npm|npx|git|pip3?)\s+(?:--?[a-z][\w-]*|[\p{L}][\p{L}\d_-]*)/gu)){
  const candidate=m[0].replace(/\s+/g,' ');
  if(!exceptions.has(candidate))found.push(candidate);
 }
 for(const m of text.matchAll(/(?<![\w-])--[a-z][\w-]*|\b(?:[A-Z][A-Z0-9]*_)+[A-Z0-9_]+\b|\b(?:mcp__\w+|ork_\w+)\b|\b[\w.-]+\.(?:jsonl?|ya?ml|md|toml|mjs|cjs|ts|py|sh)\b|\bork\.[\w.-]+\/v\d+/g))found.push(m[0]);
 for(const m of text.matchAll(/\b[a-z][\w-]*(?:\.[a-z][\w-]*)+(?:\/v\d+)?\b|\b[a-z][\w]*(?:_[a-z\d]+)+\b|(?:~\/|\.[a-z][\w-]*\/|\/(?:usr|tmp)\/|\b(?:origin|tools|plugins|pgvector)\/)(?:[\w@*-]+|<[^<>]+>|\/|\.[\w-]+)+|@[a-z][\w-]*\/[\w.-]+/g)){
  // Public contact/domain is prose. This does not exempt any command or path.
  if(!['orkastery.com','orkmind.com'].includes(m[0]))found.push(m[0]);
 }
 return [...new Set(found)];
}
export function checkCode(dist=distArg()) {
 const all=pages(dist),errors=[];
 for(const page of all)for(const item of violations(page.dom))errors.push(`${page.path}: ${item}`);
 if(errors.length)throw Error('Technical text outside code/pre:\n'+errors.join('\n'));
 return {pages:all.length,unformatted:0,proseExceptions:proseExceptions.length};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(checkCode()));}catch(error){console.error(error.message);process.exitCode=1;}}
