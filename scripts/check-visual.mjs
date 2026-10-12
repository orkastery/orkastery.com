// Prova com navegador do site na Partitura do kit do dono. Serve só o dist, sem rede, e confere em
// cada língua, largura e rota: teclado (pular para o conteúdo, seletor de língua, foco visível pelo
// anel do kit), nenhuma sobra horizontal, código inline inteiro e colado ao vizinho, alvo de toque
// de 44 px em tudo que se toca fora do texto corrido, latão só onde o kit deixa (cor calculada na
// página, inclusive estilo inline) e, abaixo de 768 px, o menu do cabeçalho e o board em cartões.
// Na home, as interações (copiar com "✓ copiado" por 1,6 s e a recusa, modos, fases com setas,
// alternativas, noite pela rolagem, entrada ao rolar, só as animações do kit e movimento reduzido
// sem animação rodando). Grava uma captura de página inteira por combinação.
//   PLAYWRIGHT_MODULE=... CHROMIUM_EXECUTABLE=... npm run check:visual -- --output DIRETORIO_PRIVADO
//   node scripts/check-visual.mjs --plan    mostra a matriz sem abrir o navegador
import {readFileSync,writeFileSync,mkdirSync,existsSync,statSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {pathToFileURL} from 'node:url';

const opcao=(k,padrao)=>process.argv.includes(k)?process.argv[process.argv.indexOf(k)+1].split(','):padrao;
// --linguas, --larguras e --rotas recortam a matriz (para canário e depuração); --dist troca a build.
const locales=opcao('--linguas',['pt','en']),widths=opcao('--larguras',['1440','768','390','320']).map(Number),routes=opcao('--rotas',['/','/ork/','/orkmind/','/docs/','/docs/arquitetura/','/docs/contribuir/','/docs/claude-code/','/marca/']);
const checks=['skipLink','languageKeyboard','focusRing','focusRingNotClipped','focusNotUnderHeader','focusBackwards','inlineCodeCutCue','noCutCodeOnHome','textContrast','textInsideBox','overflow','inlineCodeWhole','inlineCodeScrollsOnlyIfWider','adjacentTextWithCode','codeInsideBlock','touchTarget','brassOnlyWhereAllowed','mobileMenu','boardCards','copySuccessAndRefusal','modes','phaseTabsKeyboard','options','nightScroll','reveal','kitMotionOnly','pauseMotion','reducedMotion','reducedMotionCanvasAndClock','scorePainted'];
const args=process.argv.slice(2);
if(args.includes('--plan')){console.log(JSON.stringify({locales,widths,routes,checks,screenshots:locales.length*widths.length*routes.length,network:'blocked',requires:['PLAYWRIGHT_MODULE','CHROMIUM_EXECUTABLE','--output']},null,2));process.exit(0);}
const output=args.includes('--output')?resolve(args[args.indexOf('--output')+1]):null;
if(!output||!process.env.PLAYWRIGHT_MODULE||!process.env.CHROMIUM_EXECUTABLE)throw Error('Set PLAYWRIGHT_MODULE and CHROMIUM_EXECUTABLE, then pass --output PRIVATE_DIRECTORY');
const dist=resolve(process.argv.includes('--dist')?process.argv[process.argv.indexOf('--dist')+1]:'dist');
if(output===resolve('.')||output.startsWith(resolve('.')+'/'))throw Error('Screenshots must stay outside public output');
mkdirSync(output,{recursive:true});
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.woff':'font/woff','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.json':'application/json','.txt':'text/plain','.webmanifest':'application/manifest+json'};
async function servir(context){
 await context.route('**/*',async route=>{
  const url=new URL(route.request().url());if(url.origin!=='http://docs.local')return route.abort('blockedbyclient');
  let file=resolve(dist,'.'+decodeURIComponent(url.pathname));
  if(file!==dist&&!file.startsWith(dist+'/'))return route.fulfill({status:403,body:''});
  if(existsSync(file)&&statSync(file).isDirectory())file=resolve(file,'index.html');
  if(!existsSync(file))return route.fulfill({status:404,body:'Missing local artifact'});
  await route.fulfill({status:200,contentType:types[extname(file)]||'application/octet-stream',body:readFileSync(file)});
 });
}

// O focável atual: anel do kit (2 px do chão e 4 px da cor de foco), recorte por contêiner com
// overflow e o cabeçalho fixo por cima.
const focoAtual=()=>{
     const el=document.activeElement;if(!el||el===document.body)return {fim:true};
     const cs=getComputedStyle(el),anel=/0px 0px 0px 4px/.test(cs.boxShadow)||(cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>=2&&cs.outlineColor!=='rgba(0, 0, 0, 0)');
     const r=el.getBoundingClientRect(),id=el.tagName+'|'+(el.getAttribute('href')||'')+'|'+Math.round(r.top+scrollY)+'|'+Math.round(r.left);
     let cortado=null;
     for(let p=el.parentElement;p&&p!==document.body&&!cortado;p=p.parentElement){
      const pc=getComputedStyle(p);if(pc.overflowX==='visible'&&pc.overflowY==='visible')continue;
      const q=p.getBoundingClientRect(),c={l:q.left+parseFloat(pc.borderLeftWidth),t:q.top+parseFloat(pc.borderTopWidth),r:q.right-parseFloat(pc.borderRightWidth),b:q.bottom-parseFloat(pc.borderBottomWidth)};
      // Só conta o lado em que o próprio elemento cabe no contêiner e o anel de 4 px não.
      const lados=[['esq',r.left>=c.l-.5&&r.left-4<c.l-.5],['topo',r.top>=c.t-.5&&r.top-4<c.t-.5],['dir',r.right<=c.r+.5&&r.right+4>c.r+.5],['base',r.bottom<=c.b+.5&&r.bottom+4>c.b+.5]].filter(x=>x[1]).map(x=>x[0]);
      if(lados.length)cortado=p.tagName.toLowerCase()+'.'+String(p.className).split(' ')[0]+' '+lados.join('+');
     }
     const cab=document.querySelector('.cabecalho'),hb=cab?cab.getBoundingClientRect().bottom:0;
     const sob=!el.closest('.cabecalho,.pular')&&cs.position!=='fixed'&&r.top<hb-1;
     return {id,nome:(el.textContent||el.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,30),anel,cortado,sob};
    };

// Auditoria de layout que roda na página: sobra horizontal e código inline.
const auditoria=()=>{
 const visivel=el=>el.getClientRects().length>0&&getComputedStyle(el).visibility!=='hidden';
 const rolagem=el=>{for(let p=el.parentElement;p;p=p.parentElement){const o=getComputedStyle(p).overflowX;if(o==='auto'||o==='scroll')return true;}return false;};
 const sobra=[...document.querySelectorAll('body *')].filter(el=>{
  if(!(el instanceof HTMLElement)||el.closest('svg,pre')||getComputedStyle(el).position==='fixed'||rolagem(el))return false;
  const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<-1);
 }).map(el=>el.tagName+'.'+el.className);
 const codigos=[...document.querySelectorAll('code')].filter(c=>!c.closest('pre')&&visivel(c));
 // O chip é uma caixa só (inline-flex): partido é o texto dele em mais de uma linha.
 const linhas=el=>{const r=document.createRange();r.selectNodeContents(el);return new Set([...r.getClientRects()].filter(x=>x.width>0).map(x=>Math.round(x.top))).size;};
 const partido=codigos.filter(c=>linhas(c)>1).map(c=>c.textContent.trim());
 const inline=el=>!!el&&el.nodeType===1&&['inline','contents'].includes(getComputedStyle(el).display);
 const glifo=(n,i)=>{const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+1);return r.getClientRects()[0];};
 const mesmaLinha=(g,b)=>!g||((g.top+g.bottom)/2>=b.top-1&&(g.top+g.bottom)/2<=b.bottom+1);
 const borda=(n,ultimo)=>{if(!n)return null;if(n.nodeType===3)return n.nodeValue.length?n:null;if(!inline(n)&&n.tagName!=='CODE')return null;const k=[...n.childNodes];for(const x of ultimo?k.reverse():k){const t=borda(x,ultimo);if(t)return t;}return null;};
 const vizinho=(c,antes)=>{for(let n=c;n;n=n.parentElement){const s=antes?n.previousSibling:n.nextSibling;if(s)return borda(s,antes);if(!inline(n.parentElement))return null;}return null;};
 const solto=codigos.flatMap(c=>{const b=c.getBoundingClientRect(),t=c.textContent.trim(),p=vizinho(c,true),n=vizinho(c,false),f=[];
  if(p&&/\S$/.test(p.nodeValue)&&!mesmaLinha(glifo(p,p.nodeValue.length-1),b))f.push(p.nodeValue.at(-1)+t);
  if(n&&/^\S/.test(n.nodeValue)&&!mesmaLinha(glifo(n,0),b))f.push(t+n.nodeValue[0]);return f;});
 // Código que não quebra e passa da borda do bloco que o contém (fora de contêiner com rolagem).
 const bloco=el=>{let p=el.parentElement;while(p&&['inline','contents'].includes(getComputedStyle(p).display))p=p.parentElement;return p;};
 const vaza=codigos.filter(c=>!rolagem(c)).filter(c=>{const b=bloco(c);if(!b)return false;const r=c.getBoundingClientRect(),q=b.getBoundingClientRect(),cs=getComputedStyle(b);return r.right>q.right-parseFloat(cs.paddingRight)-parseFloat(cs.borderRightWidth)+1.5;}).map(c=>c.textContent.trim());
 // Alvo de toque (regra dura 5 do kit): tudo que se toca tem 44 x 44 px, menos o link no meio de
 // uma frase (o bloco em volta tem outro texto e o link é inline).
 const doBloco=el=>{let b=el.parentElement;while(b&&['inline','contents'].includes(getComputedStyle(b).display))b=b.parentElement;return b;};
 const naFrase=el=>getComputedStyle(el).display==='inline'&&!!doBloco(el)&&doBloco(el).textContent.replace(el.textContent,'').trim().length>0;
 const pequeno=[...document.querySelectorAll('a[href],button,[role="tab"],summary')].filter(el=>visivel(el)&&!el.closest('[hidden],[inert],.so-leitor')&&!el.matches('.pular')&&!naFrase(el)).filter(el=>{const r=el.getBoundingClientRect();return r.width<43.5||r.height<43.5;}).map(el=>{const r=el.getBoundingClientRect();return `${el.tagName.toLowerCase()}.${el.className} "${el.textContent.trim().slice(0,24)}" ${Math.round(r.width)}x${Math.round(r.height)}`;});
 // Latão (regra dura 1): nenhuma cor calculada da família do latão fora dos lugares do kit.
 // Cor calculada: rgb()/rgba() (0 a 255) ou color(srgb ...) (0 a 1), que é como o Chrome devolve o color-mix.
 const coresDe=v=>[...String(v).matchAll(/rgba?\(([^)]+)\)|color\(srgb\s+([^)]+)\)/g)].map(m=>{if(m[1]){const [r,g,b,a=1]=m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);return [r,g,b,a];}const [r,g,b,a=1]=m[2].split(/[\s\/]+/).filter(Boolean).map(Number);return [r*255,g*255,b*255,a];});
 const doLatao=v=>coresDe(v).some(([r,g,b,a])=>{if(a<0.05)return false;const R=r/255,G=g/255,B=b/255,mx=Math.max(R,G,B),mn=Math.min(R,G,B),d=mx-mn,l=(mx+mn)/2;if(d<0.06)return false;const sat=d/(1-Math.abs(2*l-1));let h=mx===R?60*(((G-B)/d)%6):mx===G?60*((B-R)/d+2):60*((R-G)/d+4);if(h<0)h+=360;return h>=28&&h<=48&&sat>=0.25;});
 const permitido='.divisor-fio span,.instalar-giro,.instalar-caixa,.hero-ponto-espera,.opcao-rec,.opcao-rec-ponto,.ponto-hitl,[data-board-estado],[data-board-estado]>span,.board-segmentos>span,.pulso-numeros>div,.pulso-n,[data-amostra],[data-amostra] *';
 const props=['color','backgroundColor','borderTopColor','borderRightColor','borderBottomColor','borderLeftColor','boxShadow','backgroundImage','outlineColor','fill','stroke','textDecorationColor'];
 const latao=[...document.querySelectorAll('body *')].filter(el=>el.getClientRects().length&&!el.matches(permitido)).filter(el=>{const cs=getComputedStyle(el);return props.some(p=>doLatao(cs[p]));}).map(el=>el.tagName.toLowerCase()+'.'+el.className);
 // O chip só rola quando não cabe nem sozinho na coluna (com o que vem colado a ele).
 const larguraUtil=b=>{const cs=getComputedStyle(b);return b.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);};
 const rolaAToa=codigos.filter(c=>c.scrollWidth>c.clientWidth+1).filter(c=>{const b=bloco(c);if(!b)return false;const u=c.parentElement?.classList.contains('code-unit')?c.parentElement:null;const extra=u?u.getBoundingClientRect().width-c.getBoundingClientRect().width:0;return c.scrollWidth+extra<=larguraUtil(b)-1;}).map(c=>c.textContent.trim());
 const rolando=codigos.filter(c=>c.scrollWidth>c.clientWidth+1).length;
 // O chip que rola mostra o corte (D24): data-rola, o comando inteiro no title, foco pelo teclado
 // (fora de link e botão) e o degradê do lado em que há comando escondido.
 const semSinal=codigos.filter(c=>c.scrollWidth>c.clientWidth+1).filter(c=>{const cs=getComputedStyle(c),mascara=(cs.maskImage||cs.webkitMaskImage||'none')!=='none';return !c.hasAttribute('data-rola')||c.title!==c.textContent.trim()||(!c.closest('a,button')&&c.tabIndex!==0)||(c.scrollLeft+c.clientWidth<c.scrollWidth-1&&!mascara);}).map(c=>c.textContent.trim());
 // Contraste real do texto (regra dura 3): cor do texto contra o fundo efetivo, misturando as
 // camadas translúcidas; 4,5:1, ou 3:1 em texto grande. Texto sob opacidade (eventos da noite
 // ainda apagados, que acendem antes do centro da tela) fica de fora.
 const cor=v=>coresDe(v)[0]||null;
 const sobre=(f,b)=>[0,1,2].map(i=>f[i]*f[3]+b[i]*(1-f[3])).concat(1);
 const lum=c=>c.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((s,n,i)=>s+n*[.2126,.7152,.0722][i],0);
 const razao=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
 const fundoDe=el=>{const camadas=[];for(let p=el;p;p=p.parentElement){const c=cor(getComputedStyle(p).backgroundColor);if(c&&c[3]>0){camadas.push(c);if(c[3]>=1)break;}}let base=[255,255,255,1];for(const c of camadas.reverse())base=sobre(c,base);return base;};
 const apagado=el=>{for(let p=el;p;p=p.parentElement)if(Number(getComputedStyle(p).opacity)<1)return true;return false;};
 // Texto escondido só da vista (recorte de 1 px, como o .so-leitor) é para leitor de tela.
 const soLeitor=el=>{for(let q=el;q;q=q.parentElement){if(getComputedStyle(q).clip==='rect(0px, 0px, 0px, 0px)')return true;}return false;};
 const comTexto=[...document.querySelectorAll('body *')].filter(el=>!el.closest('svg,canvas,.so-leitor,[hidden]')&&!soLeitor(el)&&el.getClientRects().length&&[...el.childNodes].some(n=>n.nodeType===3&&n.nodeValue.trim())&&getComputedStyle(el).visibility!=='hidden');
 // Separador decorativo ("/", "·") escondido do leitor de tela é ornamento, não texto.
 const ornamento=el=>!!el.closest('[aria-hidden="true"]')&&/^[\/·|•]$/.test(el.textContent.trim());
 const contraste=comTexto.filter(el=>!apagado(el)&&!ornamento(el)).flatMap(el=>{const cs=getComputedStyle(el),f=cor(cs.color);if(!f)return [];const b=fundoDe(el),r=razao(f[3]<1?sobre(f,b):f,b),grande=parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.66&&Number(cs.fontWeight)>=700);return r<(grande?3:4.5)?[`${el.tagName.toLowerCase()}.${el.className} "${el.textContent.trim().slice(0,20)}" ${r.toFixed(2)}`]:[];});
 // Texto que vaza da própria caixa (legenda maior que o bloco), fora de contêiner com rolagem.
 const vazaCaixa=comTexto.filter(el=>{const cs=getComputedStyle(el);return !['inline','contents'].includes(cs.display)&&cs.overflowX==='visible'&&el.clientWidth>0&&!rolagem(el)&&el.scrollWidth>el.clientWidth+1&&el.tagName!=='PRE';}).map(el=>`${el.tagName.toLowerCase()}.${el.className} "${el.textContent.trim().slice(0,20)}"`);
 return {sobra,partido,solto,vaza,pequeno,latao,rolaAToa,rolando,semSinal,contraste,vazaCaixa};
};

const results=[];let browser;
try{
 const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE));
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE});
 for(const locale of locales)for(const width of widths){
  const context=await browser.newContext({viewport:{width,height:900},locale:locale==='pt'?'pt-BR':locale,reducedMotion:'reduce',serviceWorkers:'block'});
  await servir(context);
  for(const path of routes){
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   const local=(locale==='pt'?'':'/'+locale)+path,onde=local+' '+width;
   await page.goto('http://docs.local'+local,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   // Teclado: pular para o conteúdo é o primeiro Tab e leva ao main.
   await page.keyboard.press('Tab');
   if(await page.locator(':focus').getAttribute('href')!=='#conteudo')throw Error('Skip link not first in keyboard order '+onde);
   await page.keyboard.press('Enter');
   if(!await page.waitForFunction(()=>location.hash==='#conteudo',null,{timeout:3000}).then(()=>true,()=>false))throw Error('Skip target failed '+onde);
   await page.goto('http://docs.local'+local,{waitUntil:'networkidle'});
   let achou=false;for(let i=0;i<40;i++){await page.keyboard.press('Tab');if(await page.locator('[data-language-selector] a:focus').count()){achou=true;break;}}
   if(!achou)throw Error('Language selector unreachable by keyboard '+onde);
   // Foco visível pelo anel do kit (--anel-foco: 2 px do chão e 4 px da cor de foco).
   const foco=await page.evaluate(()=>{const cs=getComputedStyle(document.activeElement);return /0px 0px 0px 4px/.test(cs.boxShadow)||(cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>=2&&cs.outlineColor!=='rgba(0, 0, 0, 0)');});
   if(!foco)throw Error('Focus ring not visible '+onde);
   // Todos os focáveis, numa página recém-carregada (o percurso começa no link de pular): com Tab
   // e depois com Shift+Tab, cada um com o anel do kit visível, sem recorte por contêiner e fora do
   // cabeçalho fixo (WCAG 2.4.11; para trás é que o foco cai embaixo do cabeçalho).
   await page.goto('http://docs.local'+local,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   const vistos=new Set();
   for(const tecla of ['Tab','Shift+Tab']){
    const nestaVolta=new Set();
    for(let i=0;i<250;i++){
     await page.keyboard.press(tecla);
     const f=await page.evaluate(focoAtual);
     if(f.fim||nestaVolta.has(f.id))break;nestaVolta.add(f.id);vistos.add(f.id);
     if(!f.anel)throw Error('Focus ring not visible on "'+f.nome+'" ('+tecla+') '+onde);
     if(f.cortado)throw Error('Focus ring clipped on "'+f.nome+'" by '+f.cortado+' ('+tecla+') '+onde);
     if(f.sob)throw Error('Focused element under the sticky header "'+f.nome+'" ('+tecla+') '+onde);
    }
   }
   await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'});});
   const a=await page.evaluate(auditoria);
   if(a.sobra.length)throw Error('Overflow '+onde+': '+a.sobra.slice(0,8).join(', '));
   if(a.partido.length)throw Error('Inline code split across lines '+onde+': '+a.partido.join(', '));
   if(a.solto.length)throw Error('Adjacent text detached from inline code '+onde+': '+a.solto.join(', '));
   if(a.vaza.length)throw Error('Inline code past its block edge '+onde+': '+a.vaza.join(', '));
   if(a.rolaAToa.length)throw Error('Inline code scrolls although it fits its column '+onde+': '+a.rolaAToa.join(', '));
   if(a.semSinal.length)throw Error('Inline code cut without the visible cue '+onde+': '+a.semSinal.join(', '));
   if(path==='/'&&a.rolando)throw Error('Inline code cut on the home '+onde+' ('+a.rolando+' chips)');
   if(a.contraste.length)throw Error('Text contrast below AA '+onde+': '+a.contraste.slice(0,6).join(' | '));
   if(a.vazaCaixa.length)throw Error('Text overflows its box '+onde+': '+a.vazaCaixa.slice(0,6).join(' | '));
   if(a.pequeno.length)throw Error('Touch target under 44 px '+onde+': '+a.pequeno.slice(0,6).join(' | '));
   if(a.latao.length)throw Error('Brass outside the places the kit allows '+onde+': '+a.latao.slice(0,6).join(', '));
   // Abaixo de 768 px o cabeçalho vira menu (D19): abre pelo botão, fecha com Esc e devolve o foco.
   const estreito=width<768;
   if(estreito){
    const botao=page.locator('[data-menu-botao]');
    if(!await botao.isVisible()||await page.locator('.cabecalho-nav').isVisible())throw Error('Header did not turn into a menu '+onde);
    await botao.click();
    if(await botao.getAttribute('aria-expanded')!=='true'||!await page.locator('[data-menu-painel]').isVisible())throw Error('Menu did not open '+onde);
    const alvos=await page.locator('[data-menu-painel] a').evaluateAll(as=>as.map(a=>a.getBoundingClientRect().height));
    if(!alvos.length||alvos.some(h=>h<43.5))throw Error('Menu links under 44 px '+onde);
    await page.keyboard.press('Escape');
    if(await botao.getAttribute('aria-expanded')!=='false'||await page.locator('[data-menu-painel]').isVisible()||!await botao.evaluate(b=>b===document.activeElement))throw Error('Menu did not close with Escape '+onde);
   }else if(await page.locator('[data-menu-botao]').isVisible())throw Error('Menu button visible on a wide screen '+onde);
   const r={path:local,width,overflow:0,keyboard:true,focusRing:true,focusRingNotClipped:true,focusNotUnderHeader:true,focusablesChecked:vistos.size,textContrast:true,textInsideBox:true,inlineCodeScrolling:a.rolando,inlineCodeWhole:true,adjacentTextWithCode:true,codeInsideBlock:true,touchTarget:true,brassOnlyWhereAllowed:true,mobileMenu:estreito};
   if(path==='/'){
    // Movimento reduzido: nada anima sozinho.
    const rodando=await page.evaluate(()=>document.getAnimations().filter(x=>x.playState==='running').length);
    if(rodando)throw Error('Animation running with reduced motion '+onde);
    // Com movimento reduzido, a partitura não anda e o relógio de 2,4 s não troca a fila de merge.
    const quadro=()=>page.evaluate(()=>{const c=document.querySelector('[data-partitura]');const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let h=0;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return h;});
    const fila=()=>page.locator('[data-fila="0"]').textContent();
    const [q1,f1]=[await quadro(),await fila()];await page.waitForTimeout(2700);
    if(await quadro()!==q1||await fila()!==f1)throw Error('Score or clock moved with reduced motion '+onde);
    // Copiar: sucesso e recusa.
    const botao=page.locator('.instalar-hero');
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async t=>{window.__copiado=t;}}}));
    await botao.click();
    await page.waitForFunction(()=>window.__copiado==='npm install -g @orkastery/cli');
    if(await page.locator('.instalar-hero [data-pilula]').textContent()!==await botao.getAttribute('data-rotulo-ok')||!/^✓ /.test(await botao.getAttribute('data-rotulo-ok')))throw Error('Copy confirmation missing '+onde);
    const inicio=Date.now();
    await page.waitForFunction(()=>document.querySelector('.instalar-hero [data-pilula]').textContent===document.querySelector('.instalar-hero').dataset.rotulo,null,{timeout:3000});
    if(Date.now()-inicio<1300)throw Error('Copy confirmation shorter than the kit 1.6 s '+onde);
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('negado');}}}));
    await botao.click();
    await page.waitForFunction(()=>/^× use (⌘C|Ctrl\+C)$/.test(document.querySelector('.instalar-hero [data-pilula]').textContent)&&document.querySelector('.instalar-hero').dataset.estado==='falha');
    // Modos: cada linha marca a si mesma e mostra o seu texto.
    for(const linha of await page.locator('[data-modo]').all()){
     await linha.click();const i=await linha.getAttribute('data-modo');
     if(await linha.getAttribute('aria-pressed')!=='true'||!await page.locator(`[data-modo-texto="${i}"]`).first().isVisible())throw Error('Mode selection failed '+onde+' '+i);
    }
    // Fases: abas com clique e com seta.
    const abas=page.locator('[data-ciclo] [role="tab"]');
    await abas.first().click();
    if(await abas.first().getAttribute('aria-selected')!=='true'||!await page.locator('[data-detalhe="0"]').isVisible())throw Error('Phase tab failed '+onde);
    await page.keyboard.press('ArrowRight');
    if(await abas.nth(1).getAttribute('aria-selected')!=='true'||!await page.locator('[data-detalhe="1"]').isVisible()||await page.evaluate(()=>document.activeElement?.dataset.fase)!=='1')throw Error('Phase arrow key failed '+onde);
    // Board: tabela no largo, lista de cartões abaixo de 768 px (sem cabeçalho de colunas).
    if(await page.locator('.board-cabeca').isVisible()===estreito)throw Error('Board layout wrong for the width '+onde);
    // Alternativas: a escolhida mostra a nota dela e o texto continua legível.
    await page.locator('[data-opcao="1"]').click();
    if(!await page.locator('[data-nota="1"]').isVisible())throw Error('Answer note missing '+onde);
    // Depois da transição, o texto da escolhida tem 4,5:1 contra o fundo dela.
    await page.waitForTimeout(450);
    const legivel=await page.evaluate(()=>{const cor=v=>{const m=/rgba?\(([^)]+)\)|color\(srgb\s+([^)]+)\)/.exec(v);return m[1]?m[1].split(/[\s,\/]+/).filter(Boolean).map(Number):m[2].split(/[\s\/]+/).filter(Boolean).map(Number).map((n,i)=>i<3?n*255:n);};const lum=c=>c.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((s,n,i)=>s+n*[.2126,.7152,.0722][i],0);const b=document.querySelector('[data-opcao="1"]'),t=b.querySelector('.opcao-texto'),x=lum(cor(getComputedStyle(t).color)),y=lum(cor(getComputedStyle(b).backgroundColor));return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);});
    if(legivel<4.5)throw Error('Chosen answer text below 4.5:1 ('+legivel.toFixed(2)+') '+onde);
    // Noite: o relógio anda com a rolagem e o resumo da manhã aparece no fim.
    const relogio=page.locator('[data-noite-relogio]');
    await page.locator('#noite').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*0.2,behavior:'instant'}));
    await page.waitForFunction(()=>document.querySelector('[data-noite-relogio]').textContent!=='23:00',null,{timeout:3000});
    await page.locator('#noite').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().bottom+scrollY-innerHeight,behavior:'instant'}));
    await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('[data-noite-manha]')).opacity)>.99,null,{timeout:4000});
    if((await relogio.textContent()).trim()==='23:00')throw Error('Night clock did not move '+onde);
    // Revelação, com movimento liberado: um bloco abaixo da dobra começa invisível e aparece ao rolar.
    const livre=await browser.newContext({viewport:{width,height:900},reducedMotion:'no-preference'});await servir(livre);
    const p2=await livre.newPage();await p2.goto('http://docs.local'+local,{waitUntil:'networkidle'});await p2.waitForTimeout(250);
    const alvo=p2.locator('#problema [data-reveal]').first();
    if(Number(await alvo.evaluate(el=>getComputedStyle(el).opacity))>0.01)throw Error('Reveal did not start hidden '+onde);
    await alvo.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
    await p2.waitForFunction(()=>Number(getComputedStyle(document.querySelector('#problema [data-reveal]')).opacity)>.99,null,{timeout:4000});
    // Só os efeitos aprovados do kit animam sozinhos: a borda de luz do comando e o fluxo tracejado.
    const nomes=await p2.evaluate(()=>[...new Set(document.getAnimations().map(x=>x.animationName).filter(Boolean))]);
    const fora=nomes.filter(n=>!['orkSpin','orkFlow','orkFlowX'].includes(n));
    if(fora.length)throw Error('Animation outside the kit effects '+onde+': '+fora.join(', '));
    // Pausar o movimento (WCAG 2.2.2): o botão para as animações, a partitura e o relógio, e retoma.
    // A partitura só anda visível: o cartão dela fica na tela durante a prova da pausa.
    await p2.locator('[data-partitura]').evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await p2.waitForTimeout(300);
    const pausa=p2.locator('[data-movimento-botao]');
    if(!await pausa.isVisible())throw Error('Pause motion control missing '+onde);
    await pausa.click();await p2.waitForTimeout(300);
    const quadro2=()=>p2.evaluate(()=>{const c=document.querySelector('[data-partitura]');const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let h=0;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return h;});
    const animando=()=>p2.evaluate(()=>document.getAnimations().filter(x=>x.animationName&&x.playState==="running").length);
    const [q2,f2]=[await quadro2(),await p2.locator('[data-fila="0"]').textContent()];
    if(await animando())throw Error("CSS animation running after pause "+onde);
    await p2.waitForTimeout(2700);
    if(await quadro2()!==q2||await p2.locator('[data-fila="0"]').textContent()!==f2)throw Error('Score or clock moved after pause '+onde);
    await pausa.click();await p2.waitForTimeout(900);
    if(!await animando()||await quadro2()===q2)throw Error("Motion did not resume "+onde);
    await livre.close();
    await page.reload({waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
    // A partitura fica desenhada mesmo fora da tela e depois de recarregar (canvas vazio reprova).
    await page.waitForTimeout(300);
    const pintado=await page.evaluate(()=>{const c=document.querySelector('[data-partitura]');const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i])n++;return n;});
    if(pintado<1000)throw Error('Score canvas blank '+onde);
    Object.assign(r,{reducedMotion:true,reducedMotionCanvasAndClock:true,copySuccessAndRefusal:true,modes:true,phaseTabsKeyboard:true,options:true,nightScroll:true,reveal:true,kitMotionOnly:true,pauseMotion:true,scorePainted:true,boardCards:estreito});
   }
   const shot=`${locale}-${path==='/'?'home':path.slice(1,-1).replaceAll('/','-')}-${width}.png`;
   // Página inteira a partir do topo: o link de pular é fixo e apareceria no meio da imagem.
   await page.evaluate(()=>{window.scrollTo({top:0,behavior:'instant'});document.activeElement?.blur();});
   await page.screenshot({path:resolve(output,shot),fullPage:true});
   if(errors.length)throw Error(errors.join('; '));
   results.push({...r,screenshot:shot});await page.close();
  }
  await context.close();
 }
 writeFileSync(resolve(output,'report.json'),JSON.stringify({status:'passed',checks,results},null,2)+'\n');console.log(JSON.stringify({screenshots:results.length,status:'passed',output}));
}catch(e){writeFileSync(resolve(output,'report.json'),JSON.stringify({status:'blocked-or-failed',error:e.message,results},null,2)+'\n');console.error(e.message);process.exitCode=1;}
finally{if(browser)await browser.close();}
