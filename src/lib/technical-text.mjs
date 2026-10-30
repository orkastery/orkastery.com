// Build-time typography. Text stays escaped; only reviewed technical syntax becomes code.
// The independent HTML auditor in scripts/check-code.mjs checks the rendered result.
import {parseFragment, serialize} from 'parse5';

const verbs = 'thread entrega|sessions logs|claims ausente|roadmap pegar|accounts|activation|adapter|audit|board|fix|brain|ci|ciclos|claims|collections|conducao|conhecimento|creation|decisao|demo|docs|doctor|eval|experiencia|fabrica|gate|grafo|handoff|init|lease|ledger|licoes|maestro|master|mcp|memory|modos|monitor|network|objective|onboarding|orquestracao|phase|portfolio|privado|projetos|prompt|pulse|recall|security-scan|receipt-verifiers|retry|roadmap|sessions|setup|ship|thread|verify|worktree';
// Os de tres palavras sao so os que a referencia do CLI tem; um segundo nivel generico engoliria a prosa (show, run, list).
const subcommands = 'sandbox confirmar|sandbox revogar|worktree confirmar|worktree revogar|digest enviar|digest responder|digest preview|finding add|finding estado|context|contexto|dossie|sincronizar|verificar|show|indexar|roadmap|lint|policy|feat|hitl|limpar-fantasmas|limpar|registrar-pr|registrar|esquecer|esgotamentos|acquire|add|adopt|amostra|answer|apply|approve|bind|rollback|assumir|atualizar|attach|autorizacao|autorizar|audit|batch|build|cadencia|caminho|cancel|chamadores|check|classic|close|conferir|config|confirmar|create|deny|varrer|digest|divida|enable|entrar|ensure|estimate|export|gc|get|import|importadores|index|ingest|init|inspect|install|inventory|join|leave|list|migrar|migrate|new|next|open|packs|pedir|placar|plan|prepare|process|propor|publicar|query|ratificar|recall|reconcile|reindex|release|remove|render|report|request|reservas|reset|responder|resume|retirar|reverify|review|revogar|run|sair|sandbox|search|serve|set|soltar|start|stats|status|stop|supersede|sync|uninstall|validate|verify|versionar|view|vizinhos|warmup|watch|worktree';
const argument = String.raw`(?:<[^<>\n]+>|--[a-z][\w-]*(?:=[\w./:-]+)?|@orkastery/[\w.-]+(?:@[\w.-]+)?|\d+(?:[dhm])?|[a-z][a-z0-9-]*(?:,[a-z][a-z0-9-]*)+(?![\w-])|auto|classic|codex|grok|claude-bg|claude-code|hermes|openclaw|maestro|GOAL|PLAN|GO|CHECK|SHIP|MASTER|N|D|danger-full-access|workspace-write|read-only|C\d+(?:,C\d+)*|T\d+(?:\.\d+)*|RM-(?:\d+|N+)|ork-[a-z0-9]+(?:-[a-z0-9]+)*)`;
const patterns = [
  new RegExp(String.raw`\bork\s+(?:${verbs})(?:\s+(?:${subcommands}))?(?:\s+${argument})*(?![\w-])`, 'g'),
  /\b(?:npm|npx)\s+(?:(?:--prefix\s+\w+\s+)?(?:run\s+[\w:-]+|install(?:\s+-g)?(?:\s+@[\w/-]+)?|view\s+@[\w/-]+(?:\s+version)?|test|ci)|@[\w/-]+)(?:\s+--[\w-]+)*/g,
  /\bnode\s+[\w./-]+\.(?:[cm]?js|ts)(?:\s+(?:ci|prepare|eval|docs|verificar|sincronizar|origin\/main|--[a-z][\w-]*|<[^<>]+>))*/g,
  /\bnode\s+--test(?:-[a-z][\w-]*(?:=[\w-]+)?)?(?:\s+--test-[a-z][\w-]*(?:=[\w-]+)?)*(?:\s+[\w./*-]+\.(?:[cm]?js|ts))?/g,
  /\.(?:git|env|gitignore|orkastery|agents|claude|codex)\b\/?/g,
  /\b(?:git\s+(?:ls-remote|rebase|remote(?:\s+(?:-v|add|remove|rename|set-url|get-url))?|status|diff|log|clone|fetch|pull|push|commit|checkout|switch|merge-tree(?:\s+--write-tree)?|rm(?:\s+-r)?(?:\s+--cached)?)|pip3?\s+install)(?:\s+(?:<[^<>]+>|\.[\w.\/-]+|[\w-]+\/[\w.\/-]*))?/g,
  /(?<![\w-])--[a-z][\w-]*(?:[= ](?:<[^<>]+>|[a-z][a-z0-9-]*(?:,[a-z][a-z0-9-]*)+(?![\w-])|auto|block|true|false|(?:DIR|N|ID|R|D|M|S|F|K|T|Q|NOME|URL)\b(?![-.]\w)))?/g,
  /(?:~\/|\.{1,2}\/|\.orkastery\/|\bork\/)(?:[\w.@*{}-]+|<[^<>]+>|\/)+/g,
  // Diretório da raiz do repositório: com o resto do caminho ou só com a barra (core/, adapters/).
  /\b(?:docs|core|src|scripts|maquinas|threads|skills|adapters|marketplaces|prompts)\/(?:[\w.@*{}-]+|<[^<>]+>|\/)*/g,
  // Perfil de conta de um runtime, inteiro: claude-bg/pessoal, codex/time.
  /\b(?:claude-bg|codex)\/[\wÀ-ÿ-]+/g,
  // A product name is not a filename. Explicit paths/commands above still
  // format a file named Node.js; the standalone product name stays prose.
  /\b(?!Node\.js\b)[\w.-]+\.(?:jsonl?|ya?ml|md|ts|mjs|cjs|js|py|toml|sh|svg|woff2|html|css)\b/g,
  // Variavel de ambiente inteira: com o $ da expansao, a atribuicao colada (=1) e o caminho que segue.
  /(?:\$|\b)(?:[A-Z][A-Z0-9]*_)+[A-Z0-9_]+\b(?:=[\w.:-]+)?(?:\/[\w.@*-]+)*/g,
  /\$[A-Z][A-Z0-9]*\b(?:\/[\w.@*-]+)*|\b(?:PATH|HOME|LANG|TMPDIR|PWD)\b(?:=[\w.:-]+)?/g,
  // snake_case e camelCase levam a chamada vazia junto: semPostgres(), e nao semPostgres e ().
  /\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b(?:\(\))?/g,
  /\b[a-z][a-z0-9]*(?:[A-Z][a-z0-9]+)+\b(?:\(\))?/g,
  /\b(?:ork|orkastery|claims|verify|artifact|tree|lease|runtime|policy|human|cost|project|projeto|conduction|worktree|memory|remoto|roadmap|board|ship|retry|prompt|capabilities|snapshot|doc|docs|onboarding|network|fabrica|gate|maestro|ci|providers|skills|security|performance|browser|git)(?:\.[a-z][\w-]*)+(?:\/v\d+)?\b/g,
  /(?<![\w@])(?:orkmind|owner|grafo|hitl|init|rede|master|brain|alternativas|resposta|maquina|citacao|concurrency|changelog)(?:\.[a-z][\w-]*)+(?:\/v\d+)?\b/g,
  // Todo identificador minusculo com ponto e codigo, como o auditor exige (prs.sem-leitura,
  // estado.link, runtime_profiles.distribuir). Esta regra geral deixa de fora os dois dominios de contato
  // (as listas acima ainda os formatam) e as abreviaturas de prosa, que o auditor reprova.
  /(?<![\w@./-])(?!(?:orkastery|orkmind)\.com\b|(?:e\.g|i\.e|p\.ex|a\.k\.a|vs|etc)\b)[a-z][a-z0-9]*(?:[_-][a-z0-9]+)*(?:\.[a-z][\w-]*)+(?:\/v\d+)?\b/g,
  /(?:<[^<>\n]+>\/|\/[a-z][\w-]*\/|\.[a-z][\w-]*\/|\b(?:origin|tools|plugins|pgvector)\/)(?:[\w@*-]+|<[^<>]+>|\/|\.[\w-]+)+(?:[:][\w.-]+)?/g,
  /@[a-z][\w-]*\/[\w.-]+(?:@[\w.-]+)?/g,
  /(?<![\w-])-[gvCh](?![\w-])/g,
  /\b(?:true|false|null|undefined|rotate_above|Dockerfile|Makefile|Bash|ToolSearch)\b/g,
  // A familia de ferramentas leva o curinga junto (ork_grafo_*).
  /\b(?:mcp__[\w]+|ork_[\w]+|sha256|claude-bg)\b(?:\*)?/g,
  // Identificadores hifenizados conhecidos (check do CI e packs de regras); hifen comum segue prosa.
  /\b(?:ork-verify|security-privacy|clean-code|data-model)\b/g,
  // Mod, check e thread do Orkastery por nome (ork-ponte, ork-torre, ork-rm059torre), a familia ork_* e o comando /torre.
  /(?<![\w./-])ork-[a-z][a-z0-9]*(?:-[a-z0-9]+)*\b/g,
  /\bork_\*/g,
  // Posturas do runtime.sandbox citadas como valor.
  /\b(?:danger-full-access|workspace-write)\b/g,
  /(?<![\w/.:-])\/(?:torre|clima|freio|radar|mesa|sentinela|pista|ritual|nota|mensageiro|portao|goal|plan|go|check|ship|master|onboarding)(?![\w/-])/g,
  /(?<![\w/.:-])\/orkastery:[a-z][\w-]*|(?<![\w$])\$ork\b/g,
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

// O que encosta no codigo viaja com ele. O codigo inline e atomico, e o Chrome abre quebra
// antes e depois dele mesmo colado a outro caractere (parentese, ponto, =1, /sessions, ());
// a unidade sem quebra leva junto a sequencia nao branca vizinha.
const opening=/\S+$/, closing=/^\S+/;
// Folga do chip dentro da unidade na medida do que foi colado: pontuacao estreita pesa 0,6 do
// caractere do codigo, o resto pesa 1, com teto de 12. O check:code reprova colagem maior que 12.
const narrow=/[.,:;!()[\]'"]/;
export const unitStyle=(open,close)=>`--folga:${Math.min(Math.round([...open+close].reduce((sum,ch)=>sum+(narrow.test(ch)?0.6:1),0)*10)/10,12)}ch`;
export function technicalUnits(text) {
  const parts=technicalParts(String(text)).map(part=>({...part})),units=[];
  parts.forEach((part,i)=>{
    if(!part.code){if(part.text)units.push({text:part.text});return;}
    const before=units.at(-1),open=before&&'text' in before?before.text.match(opening)?.[0]||'':'';
    if(open)before.text=before.text.slice(0,-open.length);
    const after=parts[i+1],close=after&&!after.code?after.text.match(closing)?.[0]||'':'';
    if(close)after.text=after.text.slice(close.length);
    units.push({open,code:part.text,close});
  });
  return units.filter(unit=>!('text' in unit)||unit.text);
}
const codeHtml=text=>`<code>${escapeText(text)}</code>`;
const unitOpen=(open,close)=>`<span class="code-unit" style="${unitStyle(open,close)}">`;
export const technicalHtml = text => technicalUnits(text).map(u=>'text' in u?escapeText(u.text):u.open||u.close?`${unitOpen(u.open,u.close)}${escapeText(u.open)}${codeHtml(u.code)}${escapeText(u.close)}</span>`:codeHtml(u.code)).join('');
const isUnit=node=>node.tagName==='span'&&(node.attrs||[]).some(a=>a.name==='class'&&a.value.split(/\s+/).includes('code-unit'));
// Codigos que ja vinham no HTML revisado tambem levam o que encosta neles.
function bindCodes(node){
  const kids=node.childNodes||[];
  for(let i=0;i<kids.length;i++){
    const child=kids[i],prev=kids[i-1],next=kids[i+1];
    if(child.tagName==='code'&&!isUnit(node)){
      const open=prev?.nodeName==='#text'?prev.value.match(opening)?.[0]||'':'';
      const close=next?.nodeName==='#text'?next.value.match(closing)?.[0]||'':'';
      if(!open&&!close)continue;
      const unit=parseFragment(`${unitOpen(open,close)}</span>`).childNodes[0];
      const text=value=>({nodeName:'#text',value,parentNode:unit});
      if(open)prev.value=prev.value.slice(0,-open.length);
      if(close)next.value=next.value.slice(close.length);
      unit.childNodes=[...(open?[text(open)]:[]),child,...(close?[text(close)]:[])];
      child.parentNode=unit;unit.parentNode=node;kids[i]=unit;
    }else if(!['code','pre','script','style'].includes(child.tagName))bindCodes(child);
  }
}

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
  visit(fragment);bindCodes(fragment);return serialize(fragment);
}
