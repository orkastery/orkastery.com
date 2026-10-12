// Guarda da Partitura, o design system do kit do dono (DESIGN.md, D14 e D18), em todo build e
// sem rede: a cópia do kit sem mudança (sha256 do manifesto), o partitura.css em sincronia com o
// partitura.json, as fontes com os nomes de família do kit, nenhuma cor solta no código do site
// (só var(--…) da Partitura e color-mix delas), o latão só onde o kit deixa, o contraste dos
// pares de texto nos dois temas, foco sem outline apagado, nenhum asset externo, as licenças e o
// orçamento. Alvo de toque, anel de foco e latão na página renderizada ficam no check:visual.
import {readFileSync,existsSync,statSync,readdirSync} from 'node:fs';
import {resolve,relative,join} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {pages,files,attrs,distArg,root} from './check-links.mjs';
import {gerarFontes} from './fontes.mjs';

const sha256=b=>createHash('sha256').update(b).digest('hex');
export const lerJson=f=>JSON.parse(readFileSync(f,'utf8'));
export const MANIFESTO_KIT=resolve(root,'src/data/kit-partitura.json');
export const PARTITURA_CSS=resolve(root,'public/partitura/partitura.css');
export const PARTITURA_JSON=resolve(root,'public/partitura/partitura.json');

// 1. A cópia do kit: cada arquivo do manifesto, no repositório e na build, com o sha256 dele; o
//    favicon.ico é o favicon-32.png do kit dentro de um ICO, com os bytes do PNG intactos.
export function checkKit(dist=distArg(),manifesto=lerJson(MANIFESTO_KIT),base=root){
 const arquivos=Object.entries(manifesto.arquivos||{});
 if(!arquivos.length)throw Error('Manifesto do kit vazio');
 for(const [rel,esperado] of arquivos){
  const fonte=resolve(base,rel);
  if(!existsSync(fonte)||sha256(readFileSync(fonte))!==esperado)throw Error('Arquivo do kit mudou ou sumiu: '+rel);
  const publicado=resolve(dist,relative('public',rel));
  if(!existsSync(publicado)||sha256(readFileSync(publicado))!==esperado)throw Error('Arquivo do kit diferente na build: '+rel);
 }
 // PDFs gerados dos documentos do kit (manual, diretrizes e componentes): o arquivo é o registrado.
 for(const [rel,d] of Object.entries(manifesto.derivados||{})){
  if(rel==='descricao')continue;
  for(const f of [resolve(base,rel),resolve(dist,relative('public',rel))])if(!existsSync(f)||sha256(readFileSync(f))!==d.sha256)throw Error('Documento da marca mudou ou sumiu: '+rel);
 }
 const ico=readFileSync(resolve(dist,'favicon.ico')),png=readFileSync(resolve(base,'public/marca/png/favicon-32.png'));
 if(ico.readUInt16LE(2)!==1||ico.readUInt16LE(4)!==1||!ico.subarray(ico.readUInt32LE(18)).equals(png))throw Error('favicon.ico não é o favicon-32.png do kit');
 return arquivos.length;
}

// 2. partitura.css e partitura.json dizem a mesma coisa (primitivos e semânticos, dia e noite).
const blocoCss=(css,seletor)=>{const i=css.indexOf(seletor+' {');if(i<0)throw Error('Bloco ausente no partitura.css: '+seletor);return css.slice(i,css.indexOf('\n}',i));};
const varsDe=bloco=>Object.fromEntries([...bloco.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)].map(m=>[m[1],m[2].trim()]));
const valorJson=v=>typeof v==='object'?v.valor:v;
export function checkSincronia(css=readFileSync(PARTITURA_CSS,'utf8'),json=lerJson(PARTITURA_JSON)){
 const raiz=varsDe(blocoCss(css,':root')),noite=varsDe(blocoCss(css,'[data-tema="noite"]'));
 const cor=Object.fromEntries(Object.entries(json.cor).map(([k,v])=>[k,valorJson(v)]));
 for(const [k,v] of Object.entries(cor))if((raiz[k]||'').toUpperCase()!==v.toUpperCase())throw Error('partitura.css e partitura.json divergem em --'+k);
 const resolver=v=>String(v).replace(/^\{cor\.([a-z0-9-]+)\}$/,(_,n)=>'var(--'+n+')').replace(/\s+/g,'');
 for(const [tema,vars] of [['dia',raiz],['noite',noite]])for(const [k,v] of Object.entries(json.semantico[tema])){
  const noCss=(tema==='noite'&&!(k in vars))?raiz[k]:vars[k];
  if((noCss||'').replace(/\s+/g,'').toUpperCase()!==resolver(v).toUpperCase())throw Error(`partitura.css e partitura.json divergem em --${k} (${tema})`);
 }
 for(const [k,v] of Object.entries(json.tipografia.escala))if(raiz[k]!==valorJson(v))throw Error('Escala tipográfica diverge em --'+k);
 for(const [k,v] of Object.entries(json.raio))if(raiz[k]!==valorJson(v))throw Error('Raio diverge em --'+k);
 return {primitivos:Object.keys(cor).length,semanticos:Object.keys(json.semantico.dia).length};
}
// A cor de um token semântico no tema, resolvida até o hex.
export function paleta(css=readFileSync(PARTITURA_CSS,'utf8')){
 const raiz=varsDe(blocoCss(css,':root')),noite=varsDe(blocoCss(css,'[data-tema="noite"]'));
 const resolver=(vars,v,n=0)=>{const m=/^var\(--([a-z0-9-]+)\)$/.exec(v);return m&&n<8?resolver(vars,vars[m[1]]??raiz[m[1]],n+1):v;};
 const tema=vars=>Object.fromEntries(Object.keys({...raiz,...vars}).map(k=>[k,resolver({...raiz,...vars},({...raiz,...vars})[k])]).filter(([,v])=>/^#[0-9A-Fa-f]{6}$/.test(v)));
 return {dia:tema({}),noite:tema(noite)};
}

// 3. Contraste: texto >= 4,5:1 nos dois temas (regra dura 3), inclusive sobre os tons de estado
//    que o site mistura com color-mix.
const rgb=hex=>hex.slice(1).match(/../g).map(n=>parseInt(n,16));
const hex=c=>'#'+c.map(n=>Math.round(n).toString(16).padStart(2,'0')).join('').toUpperCase();
export const misturar=(a,pct,b)=>hex(rgb(a).map((n,i)=>n*pct/100+rgb(b)[i]*(1-pct/100)));
const luminancia=h=>rgb(h).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((s,n,i)=>s+n*[.2126,.7152,.0722][i],0);
export function contraste(a,b){const x=luminancia(a),y=luminancia(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
// [frente, fundo] por tema; o fundo pode ser [token, %, base] para um tom de color-mix.
export const PARES={
 dia:[['texto','chao'],['texto','superficie'],['texto-2','chao'],['texto-2','superficie'],['texto-2','superficie-2'],['texto-3','chao'],['texto-3','superficie'],['texto-3','superficie-2'],
  ['sobre-acao','acao'],['espera-texto','superficie'],['espera-texto','chao'],['espera-texto',['espera',22,'superficie']],
  ['executando-texto','superficie'],['executando-texto',['executando',14,'superficie']],['verificado-texto','superficie'],['verificado-texto',['verificado',6,'superficie']],['verificado-texto',['verificado',14,'superficie']],
  ['falha-texto','superficie'],['falha-texto','chao'],['falha-texto',['falha',16,'superficie']],['texto',['verificado',4,'superficie']],['texto-2',['falha',14,'superficie']]],
 noite:[['texto','chao'],['texto','superficie'],['texto-2','chao'],['texto-2','superficie'],['texto-2','superficie-2'],['sobre-acao','acao'],
  ['espera-texto','superficie'],['executando-texto','superficie'],['verificado-texto','superficie'],['verificado-texto','chao'],['falha-texto','superficie'],['falha-texto','chao'],['texto',['executando',22,'superficie']]]
};
export function checkContraste(p=paleta()){
 const medidas=[];
 for(const [tema,pares] of Object.entries(PARES))for(const [f,b] of pares){
  const cores=p[tema],fundo=Array.isArray(b)?misturar(cores[b[0]],b[1],cores[b[2]]):cores[b];
  if(!cores[f]||!fundo)throw Error('Token de cor ausente: '+f+'/'+b);
  const r=contraste(cores[f],fundo);
  if(r<4.5)throw Error(`Contraste ${tema} ${f}/${[].concat(b).join(' ')}: ${r.toFixed(2)} < 4.5`);
  medidas.push({tema,par:f+'/'+[].concat(b).join(' '),razao:Number(r.toFixed(2))});
 }
 return medidas;
}

// 4. Nenhuma cor solta: no CSS do site (estilos dos componentes, folhas e CSS da build) e nas
//    cores que a lógica da home calcula, só var(--…) e color-mix delas. A exceção é a meta
//    theme-color (e o manifesto), que não aceitam var() e têm de ser a névoa do kit.
export const COR_SOLTA=/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(\s*\d|(?<![\w-])(?:black|white|red|green|blue|gray|grey|silver|gold|orange|yellow)(?![\w-])/;
export const cssRules=css=>[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m=>({selectors:m[1].split(',').map(s=>s.trim()),declarations:m[2]}));
function estilosDoFonte(dir=resolve(root,'src')){
 const out=[];
 const andar=d=>{for(const e of readdirSync(d,{withFileTypes:true})){const f=join(d,e.name);if(e.isDirectory())andar(f);else if(/\.(astro|css)$/.test(e.name))out.push(f);}};
 andar(dir);
 return out.map(f=>{const s=readFileSync(f,'utf8');return {arquivo:relative(root,f),css:f.endsWith('.css')?s:[...s.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n'),atributos:[...s.matchAll(/style=\{?[`'"]([^`'"]*)[`'"]/g)].map(m=>m[1]).join('\n')};});
}
export function checkCorSolta(estilos=estilosDoFonte(),cssDaBuild='',estiloInline=''){
 for(const {arquivo,css,atributos} of estilos){
  const semComentario=css.replace(/\/\*[\s\S]*?\*\//g,'');
  const m=COR_SOLTA.exec(semComentario)||COR_SOLTA.exec(atributos);
  if(m)throw Error('Cor solta fora da Partitura em '+arquivo+': '+m[0]);
 }
 const m=COR_SOLTA.exec(cssDaBuild.replace(/\/\*[\s\S]*?\*\//g,''))||COR_SOLTA.exec(estiloInline);
 if(m)throw Error('Cor solta fora da Partitura na build: '+m[0]);
 for(const f of ['src/lib/home-state.mjs','src/lib/partitura.mjs','src/scripts/home.ts','src/scripts/copiar.ts','src/scripts/moldura.ts']){
  const s=readFileSync(resolve(root,f),'utf8').replace(/\/\/.*$/gm,'');
  const achado=/['"`]#[0-9a-fA-F]{3,8}['"`]|rgba?\(\s*\d/.exec(s);
  if(achado)throw Error('Cor solta fora da Partitura em '+f+': '+achado[0]);
 }
 return true;
}
export function checkThemeColor(dist=distArg(),json=lerJson(PARTITURA_JSON)){
 const nevoa=valorJson(json.cor.nevoa).toUpperCase();
 for(const p of pages(dist))for(const n of p.nodes){const a=attrs(n);if(n.tagName==='meta'&&a.name==='theme-color'&&a.content.toUpperCase()!==nevoa)throw Error('theme-color fora da névoa do kit: '+p.path);}
 const m=lerJson(resolve(dist,'site.webmanifest'));
 if(m.theme_color.toUpperCase()!==nevoa||m.background_color.toUpperCase()!==nevoa)throw Error('Cores do manifesto fora da névoa do kit');
 return true;
}

// 5. Latão só onde o kit deixa (regra dura 1): espera você e ponto de HITL, o ponto da alternativa
//    recomendada, o ponto do separador e a borda de luz do comando de instalação. A lógica da
//    home (board e resumo) é conferida pelo test:design; a página renderizada, pelo check:visual.
export const LATAO=/var\(--(?:espera|espera-texto|latao|latao-tinta|luz-latao)\)/;
export const LATAO_PERMITIDO=['.divisor-fio span','.instalar-giro','.instalar-caixa','.hero-ponto-espera','.opcao-rec','.opcao-rec-ponto','.ponto-hitl'];
export function checkLatao(css){
 for(const r of cssRules(css.replace(/\/\*[\s\S]*?\*\//g,'')))if(LATAO.test(r.declarations)){
  const limpos=r.selectors.map(s=>s.replace(/\[data-astro-cid-[a-z0-9]+\]/g,'').replace(/:where\([^)]*\)/g,'').trim());
  if(!limpos.every(s=>LATAO_PERMITIDO.includes(s)))throw Error('Latão fora do lugar (kit: só espera você e HITL): '+r.selectors.join(','));
 }
 return true;
}

// 6. Regras do CSS: código inteiro, foco sem outline apagado (o alvo do link de pular, main, não é
//    interativo), anel do kit no :focus-visible, nenhuma fonte proibida pelo kit.
export function codeRules(css){
 // O chip é inteiro (regra de 03/10): nunca quebra por dentro; mais largo que a coluna, rola nele mesmo.
 if(!cssRules(css).some(r=>r.selectors.includes(':not(pre)>code')&&/white-space:\s*nowrap/.test(r.declarations)&&/max-width:\s*100%/.test(r.declarations)&&/overflow-x:\s*auto/.test(r.declarations)))throw Error('Inline code can split across lines');
 if(!cssRules(css).some(r=>r.selectors.some(s=>/^\.code-unit$/.test(s))&&/white-space:\s*nowrap/.test(r.declarations)))throw Error('Adjacent text can detach from inline code');
 if(!cssRules(css).some(r=>r.selectors.some(s=>/^\.codigo-liso$/.test(s))&&/white-space:\s*nowrap/.test(r.declarations)))throw Error('Plain code can split across lines');
 return true;
}
export function checkFoco(css){
 if(!cssRules(css).some(r=>r.selectors.includes(':focus-visible')&&/box-shadow:\s*var\(--anel-foco\)/.test(r.declarations)))throw Error('Foco sem o anel do kit (--anel-foco)');
 for(const r of cssRules(css))if(/outline:\s*(?:none|0)\b/.test(r.declarations)&&!r.selectors.every(s=>/^main(?:\[data-astro-cid-[a-z0-9]+\])?:focus$/.test(s)))throw Error('outline apagado sem substituto: '+r.selectors.join(','));
 return true;
}
export const FONTES_PROIBIDAS=/Fraunces|Bricolage|\bInter\b|Roboto|Instrument Sans|Geist Mono|Geist Variable|Hanken Grotesk Variable/;
export function checkFontes(fontsCss=readFileSync(resolve(root,'src/styles/fonts.css'),'utf8'),partitura=readFileSync(PARTITURA_CSS,'utf8')){
 if(fontsCss!==gerarFontes())throw Error('src/styles/fonts.css fora de sincronia com os pacotes de fonte (rode npm run fontes)');
 const familias=new Set([...fontsCss.matchAll(/font-family:\s*'([^']+)'/g)].map(m=>m[1]));
 const raiz=varsDe(blocoCss(partitura,':root'));
 const doKit=['f-titulo','f-texto','f-mono'].map(k=>/^'([^']+)'/.exec(raiz[k])?.[1]);
 if(doKit.some(f=>!familias.has(f))||familias.size!==3)throw Error('As famílias de fonts.css não são as do partitura.css: '+[...familias].join(', '));
 return [...familias];
}
export const LICENCAS=['geist','hanken-grotesk','ibm-plex-mono'];
export const ORCAMENTO={js:30000,fontes:300000};

export function checkDesign(dist=distArg()){
 const kit=checkKit(dist);
 const sincronia=checkSincronia();
 const medidas=checkContraste();
 const familias=checkFontes();
 const all=pages(dist);
 for(const page of all)for(const node of page.nodes){
  const a=attrs(node);
  if((node.tagName==='script'&&a.src&&/^(https?:)?\/\//.test(a.src))||(node.tagName==='link'&&['stylesheet','preload','modulepreload'].includes(a.rel)&&/^(https?:)?\/\//.test(a.href)))throw Error('External runtime asset: '+page.path);
 }
 const assets=files(dist);
 const cssDoSite=assets.filter(f=>f.endsWith('.css')&&!f.endsWith('/partitura/partitura.css')).map(f=>readFileSync(f,'utf8')).join('\n')+'\n'+all.map(p=>p.nodes.filter(n=>n.tagName==='style').map(n=>(n.childNodes||[]).map(c=>c.value||'').join('')).join('\n')).join('\n');
 const inline=all.map(p=>p.nodes.map(n=>attrs(n).style||'').join('\n')).join('\n');
 if(/(?:@import\s*|url\(["']?)(?:https?:)?\/\//.test(cssDoSite))throw Error('External CSS/font');
 if(FONTES_PROIBIDAS.test(cssDoSite))throw Error('Fonte proibida pelo kit ou do visual antigo no CSS');
 codeRules(cssDoSite);checkFoco(cssDoSite);checkLatao(cssDoSite);
 checkCorSolta(undefined,cssDoSite,inline);
 checkThemeColor(dist);
 for(const fonte of LICENCAS){const f=resolve(dist,'licenses',fonte+'.txt');if(!existsSync(f)||!readFileSync(f,'utf8').includes('SIL Open Font License'))throw Error('Missing font license: '+fonte);}
 const total=ext=>assets.filter(f=>f.endsWith(ext)).reduce((s,f)=>s+statSync(f).size,0);
 const js=total('.js'),fontes=total('.woff2');
 if(js>ORCAMENTO.js||fontes>ORCAMENTO.fontes)throw Error(`Asset budget exceeded: JS=${js}, fonts=${fontes}`);
 return {pages:all.length,arquivosDoKit:kit,...sincronia,familias,paresDeContraste:medidas.length,menorContraste:Math.min(...medidas.map(m=>m.razao)),jsBytes:js,fontBytes:fontes,scope:'kit, tokens, contraste, cor solta, latão no CSS e foco; alvo de toque e a página renderizada são o check:visual'};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(checkDesign()));}catch(e){console.error(e.message);process.exitCode=1;}}
