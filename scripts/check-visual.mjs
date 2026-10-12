// Prova com navegador do site no design do dono. Serve só o dist, sem rede, e confere em cada língua,
// largura e rota: teclado (pular para o conteúdo, seletor de língua, foco visível), nenhuma sobra
// horizontal, código inline inteiro e colado ao vizinho, e, na home, as interações do design
// (copiar com sucesso e recusa, modos, fases com setas, alternativas, noite pela rolagem, revelação
// e movimento reduzido sem animação rodando). Grava uma captura de página inteira por combinação.
//   PLAYWRIGHT_MODULE=... CHROMIUM_EXECUTABLE=... npm run check:visual -- --output DIRETORIO_PRIVADO
//   node scripts/check-visual.mjs --plan    mostra a matriz sem abrir o navegador
import {readFileSync,writeFileSync,mkdirSync,existsSync,statSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {pathToFileURL} from 'node:url';

const locales=['pt','en'],widths=[1440,768,390,320],routes=['/','/ork/','/orkmind/','/docs/','/docs/arquitetura/','/docs/contribuir/','/docs/claude-code/'];
const checks=['skipLink','languageKeyboard','focusVisible','overflow','inlineCodeWhole','adjacentTextWithCode','codeInsideBlock','copySuccessAndRefusal','modes','phaseTabsKeyboard','options','nightScroll','reveal','reducedMotion','scorePainted'];
const args=process.argv.slice(2);
if(args.includes('--plan')){console.log(JSON.stringify({locales,widths,routes,checks,screenshots:locales.length*widths.length*routes.length,network:'blocked',requires:['PLAYWRIGHT_MODULE','CHROMIUM_EXECUTABLE','--output']},null,2));process.exit(0);}
const output=args.includes('--output')?resolve(args[args.indexOf('--output')+1]):null;
if(!output||!process.env.PLAYWRIGHT_MODULE||!process.env.CHROMIUM_EXECUTABLE)throw Error('Set PLAYWRIGHT_MODULE and CHROMIUM_EXECUTABLE, then pass --output PRIVATE_DIRECTORY');
const dist=resolve('dist');
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

// Auditoria de layout que roda na página: sobra horizontal e código inline.
const auditoria=()=>{
 const visivel=el=>el.getClientRects().length>0&&getComputedStyle(el).visibility!=='hidden';
 const rolagem=el=>{for(let p=el.parentElement;p;p=p.parentElement){const o=getComputedStyle(p).overflowX;if(o==='auto'||o==='scroll')return true;}return false;};
 const sobra=[...document.querySelectorAll('body *')].filter(el=>{
  if(!(el instanceof HTMLElement)||el.closest('svg,pre')||getComputedStyle(el).position==='fixed'||rolagem(el))return false;
  const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<-1);
 }).map(el=>el.tagName+'.'+el.className);
 const codigos=[...document.querySelectorAll('code')].filter(c=>!c.closest('pre')&&visivel(c));
 const partido=codigos.filter(c=>c.getClientRects().length>1).map(c=>c.textContent.trim());
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
 return {sobra,partido,solto,vaza};
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
   const foco=await page.evaluate(()=>{const cs=getComputedStyle(document.activeElement);return cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>=2;});
   if(!foco)throw Error('Focus not visible '+onde);
   const a=await page.evaluate(auditoria);
   if(a.sobra.length)throw Error('Overflow '+onde+': '+a.sobra.slice(0,8).join(', '));
   if(a.partido.length)throw Error('Inline code split across lines '+onde+': '+a.partido.join(', '));
   if(a.solto.length)throw Error('Adjacent text detached from inline code '+onde+': '+a.solto.join(', '));
   if(a.vaza.length)throw Error('Inline code past its block edge '+onde+': '+a.vaza.join(', '));
   const r={path:local,width,overflow:0,keyboard:true,focusVisible:true,inlineCodeWhole:true,adjacentTextWithCode:true,codeInsideBlock:true};
   if(path==='/'){
    // Movimento reduzido: nada anima sozinho.
    const rodando=await page.evaluate(()=>document.getAnimations().filter(x=>x.playState==='running').length);
    if(rodando)throw Error('Animation running with reduced motion '+onde);
    // Copiar: sucesso e recusa.
    const botao=page.locator('.instalar-hero');
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async t=>{window.__copiado=t;}}}));
    await botao.click();
    await page.waitForFunction(()=>window.__copiado==='npm install -g @orkastery/cli');
    if(await page.locator('.instalar-hero [data-pilula]').textContent()!==await botao.getAttribute('data-rotulo-ok'))throw Error('Copy confirmation missing '+onde);
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('negado');}}}));
    await botao.click();
    await page.waitForFunction(()=>document.querySelector('.instalar-hero [data-pilula]').textContent===document.querySelector('.instalar-hero').dataset.rotuloFalha);
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
    // Alternativas: a escolhida mostra a nota dela e o texto continua legível.
    await page.locator('[data-opcao="1"]').click();
    if(!await page.locator('[data-nota="1"]').isVisible())throw Error('Answer note missing '+onde);
    const legivel=await page.evaluate(()=>{const b=document.querySelector('[data-opcao="1"]'),t=b.querySelector('.opcao-texto');return getComputedStyle(t).color!==getComputedStyle(b).backgroundColor;});
    if(!legivel)throw Error('Chosen answer text invisible '+onde);
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
    await livre.close();
    await page.reload({waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
    // A partitura fica desenhada mesmo fora da tela e depois de recarregar (canvas vazio reprova).
    await page.waitForTimeout(300);
    const pintado=await page.evaluate(()=>{const c=document.querySelector('[data-partitura]');const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i])n++;return n;});
    if(pintado<1000)throw Error('Score canvas blank '+onde);
    Object.assign(r,{reducedMotion:true,copySuccessAndRefusal:true,modes:true,phaseTabsKeyboard:true,options:true,nightScroll:true,reveal:true,scorePainted:true});
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
