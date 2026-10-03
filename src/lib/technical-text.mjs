// Build-time typography. Text stays escaped; only reviewed technical syntax becomes code.
// The independent HTML auditor in scripts/check-code.mjs checks the rendered result.
import {parseFragment, serialize} from 'parse5';

const verbs = 'adapter|audit|board|fix|brain|ci|claims|collections|demo|docs|doctor|experiencia|fabrica|gate|grafo|init|ledger|master|memory|modos|monitor|network|onboarding|phase|projetos|prompt|pulse|retry|roadmap|sessions|setup|ship|thread|verify|worktree';
const subcommands = 'context|dossie|sincronizar|verificar|show|indexar|roadmap|lint|policy|feat|hitl|limpar-fantasmas|registrar|esquecer|acquire|add|adopt|approve|audit|build|check|classic|config|deny|entrar|ensure|export|gc|get|import|index|install|inspect|join|leave|list|new|next|pedir|prepare|query|reindex|release|reset|resume|review|run|sair|search|set|start|stats|status|sync|validate|view|warmup';
const argument = String.raw`(?:<[^<>\n]+>|--[a-z][\w-]*(?:=[\w./:-]+)?|@orkastery/[\w.-]+(?:@[\w.-]+)?|\d+(?:[dhm])?|auto|classic|codex|claude-bg|maestro|GOAL|PLAN|GO|CHECK|SHIP|MASTER|N)`;
const patterns = [
  new RegExp(String.raw`\bork\s+(?:${verbs})(?:\s+(?:${subcommands}))?(?:\s+${argument})*(?![\w-])`, 'g'),
  /\b(?:npm|npx)\s+(?:(?:--prefix\s+\w+\s+)?(?:run\s+[\w:-]+|install(?:\s+-g)?(?:\s+@[\w/-]+)?|view\s+@[\w/-]+(?:\s+version)?|test)|@[\w/-]+)(?:\s+--[\w-]+)*/g,
  /\bnode\s+[\w./-]+\.(?:[cm]?js|ts)(?:\s+(?:ci|prepare|origin\/main))*/g,
  /\.(?:git|env|gitignore|orkastery|agents|claude|codex)\b/g,
  /\b(?:git\s+(?:ls-remote|rebase|remote(?:\s+-v)?|status|diff|log|clone|fetch|pull|push|commit|checkout|switch)|pip3?\s+install)(?:\s+<[^<>]+>)?/g,
  /(?<![\w-])--[a-z][\w-]*(?:[= ](?:<[^<>]+>|auto|block|true|false))?/g,
  /(?:~\/|\.{1,2}\/|\b(?:docs|core|src|scripts|maquinas|threads|skills|adapters|marketplaces|prompts)\/|\.orkastery\/|\bork\/)(?:[\w.@*{}-]+|<[^<>]+>|\/)+/g,
  // A product name is not a filename. Explicit paths/commands above still
  // format a file named Node.js; the standalone product name stays prose.
  /\b(?!Node\.js\b)[\w.-]+\.(?:jsonl?|ya?ml|md|ts|mjs|cjs|js|py|toml|sh|svg|woff2|html|css)\b/g,
  /\b(?:[A-Z][A-Z0-9]*_)+[A-Z0-9_]+\b/g,
  /\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b/g,
  /\b[a-z][a-z0-9]*(?:[A-Z][a-z0-9]+)+\b/g,
  /\b(?:ork|orkastery|claims|verify|artifact|tree|lease|runtime|policy|human|cost|project|projeto|conduction|worktree|memory|remoto|roadmap|board|ship|retry|prompt|capabilities|snapshot|doc|docs|onboarding|network|fabrica|gate|maestro|ci|providers|skills|security|performance|browser|git)(?:\.[a-z][\w-]*)+(?:\/v\d+)?\b/g,
  /(?<![\w@])(?:orkmind|owner|grafo|hitl|init|rede|master|brain|alternativas|resposta|maquina|citacao|concurrency|changelog)(?:\.[a-z][\w-]*)+(?:\/v\d+)?\b/g,
  /(?:<[^<>\n]+>\/|\/[a-z][\w-]*\/|\.[a-z][\w-]*\/|\b(?:origin|tools|plugins|pgvector)\/)(?:[\w@*-]+|<[^<>]+>|\/|\.[\w-]+)+(?:[:][\w.-]+)?/g,
  /@[a-z][\w-]*\/[\w.-]+(?:@[\w.-]+)?/g,
  /(?<![\w-])-[gvCh](?![\w-])/g,
  /\b(?:true|false|null|undefined|rotate_above|Dockerfile|Makefile|Bash|ToolSearch)\b/g,
  /\b(?:mcp__[\w]+|ork_[\w]+|sha256|claude-bg)\b/g,
];

export function technicalParts(text) {
  const ranges = patterns.flatMap(pattern => Array.from(text.matchAll(pattern), m => [m.index, m.index + m[0].replace(/[.,;:]+$/,'').length]));
  ranges.sort((a,b) => a[0]-b[0] || b[1]-a[1]);
  const merged=[];
  for (const range of ranges) {
    const last=merged.at(-1);
    if(last && range[0]<=last[1]) last[1]=Math.max(last[1],range[1]);
    else merged.push([...range]);
  }
  const parts=[];let cursor=0;
  for(const [start,end] of merged){if(start>cursor)parts.push({text:text.slice(cursor,start),code:false});parts.push({text:text.slice(start,end),code:true});cursor=end;}
  if(cursor<text.length)parts.push({text:text.slice(cursor),code:false});
  return parts;
}
export const escapeText = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const technicalHtml = text => technicalParts(String(text)).map(p=>p.code?`<code>${escapeText(p.text)}</code>`:escapeText(p.text)).join('');

// Only for existing, repository-owned rich translations. Never accepts remote HTML.
export function richTechnicalHtml(html) {
  const fragment=parseFragment(html);
  function visit(node){
    if(['code','pre','script','style'].includes(node.tagName))return;
    for(const child of [...(node.childNodes||[])]) {
      if(child.nodeName==='#text'){
        const replacement=parseFragment(technicalHtml(child.value)).childNodes;
        for(const item of replacement)item.parentNode=node;
        node.childNodes.splice(node.childNodes.indexOf(child),1,...replacement);
      }else visit(child);
    }
  }
  visit(fragment);return serialize(fragment);
}
