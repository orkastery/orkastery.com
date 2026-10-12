import {readFileSync,writeFileSync,mkdirSync,existsSync,statSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {pathToFileURL} from 'node:url';
const widths=[1280,700,390],routes=['/','/ork/','/orkmind/','/docs/','/docs/arquitetura/','/docs/contribuir/','/docs/varias-maquinas/'];
const args=process.argv.slice(2);
if(args.includes('--plan')){console.log(JSON.stringify({locales:['pt','en','es'],widths,themes:['dark','light'],routes,reducedMotion:['reduce','no-preference'],screenshots:3*widths.length*2*(routes.length+1),checks:['overflow','keyboard','themeNameAndPersistence','receiptLayout','copySuccessAndRefusal','falseReportLabel','collisionEntry','panels','reducedMotion','inlineCodeAtomic','adjacentTextWithCode','oneCodeScalePerBlock','linkUnderlineOnCode','tracksClearOfWrappedChips','oneContentEdge','motionCaptureOfViewport'],network:'blocked',requires:['PLAYWRIGHT_MODULE','CHROMIUM_EXECUTABLE','--output']},null,2));process.exit(0);}
const output=args.includes('--output')?resolve(args[args.indexOf('--output')+1]):null;
if(!output||!process.env.PLAYWRIGHT_MODULE||!process.env.CHROMIUM_EXECUTABLE)throw Error('Set PLAYWRIGHT_MODULE and CHROMIUM_EXECUTABLE, then pass --output PRIVATE_DIRECTORY');
const dist=resolve('dist');
if(output===resolve('.')||output.startsWith(resolve('.')+'/'))throw Error('Screenshots must stay outside public output');
mkdirSync(output,{recursive:true});
const results=[];let browser;
try{
 const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE));
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE});
 for(const locale of ['pt','en','es'])for(const width of widths)for(const scheme of ['dark','light']){
  const context=await browser.newContext({viewport:{width,height:1000},colorScheme:scheme,locale:locale==='pt'?'pt-BR':locale,reducedMotion:'reduce',serviceWorkers:'block'});
  await context.addInitScript(theme=>{try{if(!localStorage.getItem('ork-theme'))localStorage.setItem('ork-theme',theme);}catch{}},scheme);
 // All responses come from dist; no request is allowed to reach a network.
  await context.route('**/*',async route=>{
   const url=new URL(route.request().url());if(url.origin!=='http://docs.local')return route.abort('blockedbyclient');
   let file=resolve(dist,'.'+decodeURIComponent(url.pathname));
   if(file!==dist&&!file.startsWith(dist+'/'))return route.fulfill({status:403,body:''});
   if(existsSync(file)&&statSync(file).isDirectory())file=resolve(file,'index.html');
   if(!existsSync(file))return route.fulfill({status:404,body:'Missing local artifact'});
   const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.json':'application/json'};
   await route.fulfill({status:200,contentType:types[extname(file)]||'application/octet-stream',body:readFileSync(file)});
  });
  for(const path of routes){
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   const localized=(locale==='pt'?'':'/'+locale)+path;
   await page.goto('http://docs.local'+localized,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   if(await page.locator('html').getAttribute('data-theme')!==scheme)throw Error('Theme was not applied');
   const toggle=page.locator('[data-theme-toggle]');
   const themeLabel=locale==='en'?'Light theme':'Tema claro';
   const checkThemeName=async(light)=>{
    if(await page.getByRole('button',{name:themeLabel,exact:true}).count()!==1||
       (await toggle.innerText()).trim()!==themeLabel||
       await toggle.getAttribute('aria-pressed')!==String(light))throw Error('Theme visible/accessibility label or pressed state mismatch');
   };
   await checkThemeName(scheme==='light');
   await toggle.focus();await page.keyboard.press('Enter');
   if(await page.locator('html').getAttribute('data-theme')===scheme)throw Error('Theme toggle failed');
   await checkThemeName(scheme!=='light');
   await page.reload({waitUntil:'networkidle'});
   if(await page.locator('html').getAttribute('data-theme')===scheme)throw Error('Theme preference was lost');
   await toggle.click();
   await page.goto('about:blank');
   await page.goto('http://docs.local'+localized,{waitUntil:'networkidle'});
   if(await page.locator('html').getAttribute('data-theme')!==scheme)throw Error('Theme preference was not restored');
   await page.keyboard.press('Tab');
   if(await page.locator(':focus').getAttribute('href')!=='#conteudo')throw Error('Skip link not first in keyboard order');
   // A URL que o Playwright guarda chega por evento e pode atrasar depois do Enter; o destino se confere na propria pagina.
   await page.keyboard.press('Enter');
   if(!await page.waitForFunction(()=>location.hash==='#conteudo',null,{timeout:3000}).then(()=>true,()=>false))throw Error('Skip target failed: '+await page.evaluate(()=>location.hash)+' '+page.url());
   await page.goto('http://docs.local'+localized,{waitUntil:'networkidle'});
   let found=false;for(let i=0;i<30;i++){await page.keyboard.press('Tab');if(await page.locator('[data-language-selector] a:focus').count()){found=true;break;}}
   if(!found)throw Error('Language selector unreachable by keyboard');
   await page.evaluate(()=>document.fonts.ready);
   if(path==='/'){
    const copyBox=await page.locator('.hero-copy').boundingBox(),receiptBox=await page.locator('.verification-receipt').boundingBox();
    if(!copyBox||!receiptBox)throw Error('Hero receipt missing');
    if(width===1280 ? receiptBox.x<copyBox.x+copyBox.width-1 : receiptBox.y<copyBox.y+copyBox.height-1)throw Error('Hero receipt layout mismatch');
    const falseLabel=await page.locator('.false-report s').innerText();
    if(!falseLabel.includes(locale==='en'?'(false)':'(falso)'))throw Error('False report is not announced');
    const copy=page.locator('[data-copy-install]'),status=page.locator('.receipt-install [role="status"]');
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(text)=>{window.__copiedInstall=text;}}}));
    await copy.focus();await page.keyboard.press('Enter');
    await page.waitForFunction(()=>window.__copiedInstall==='npm install -g @orkastery/cli');
    if(await status.textContent()!==await copy.getAttribute('data-success'))throw Error('Copy confirmation missing');
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('Clipboard denied');}}}));
    await copy.click();
    await page.waitForFunction(()=>document.querySelector('.copy-feedback').textContent===document.querySelector('[data-copy-install]').dataset.failure);
    // Restore the initial UI before capture; this also restores the real clipboard.
    await page.reload({waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   }
   await page.locator('details').evaluateAll(nodes=>nodes.forEach(n=>n.open=true));
   const auditLayout=async()=>{
   const motion=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
   if(motion)throw Error('Animation running with reduced motion');
   const diagram=await page.evaluate(()=>{
    const boxes=[...document.querySelectorAll('[data-diagram-box]')],problems=[];
    for(const box of boxes){
     const label=box.querySelector('[data-node-label]');
     if(!label){problems.push('missing label');continue;}
     const b=box.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(label);
     if(!b.width||!b.height||[...range.getClientRects()].some(r=>r.left<b.left+1||r.right>b.right-1||r.top<b.top+1||r.bottom>b.bottom-1))problems.push(box.getAttribute('data-no'));
    }
    return {boxes:boxes.length,problems};
   });
   if(diagram.problems.length)throw Error('Diagram labels outside boxes '+localized+' '+width+': '+diagram.problems.join(', '));
   const overflow=await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).filter(el=>{
    if(el.closest('svg,pre,[hidden]')||!(el instanceof HTMLElement)||getComputedStyle(el).position==='fixed')return false;
    const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left < -1);
   }).map(el=>el.tagName+'.'+el.className));
   if(overflow.length)throw Error('Overflow '+localized+' '+width+': '+overflow.join(', '));
   // Codigo inline atomico, colado ao que encosta nele e numa escala por bloco; sublinhado do
   // link no chip; trilha fora dos chips quebrados; cabecalho, conteudo, contato e rodape na mesma borda.
   const grid=await page.evaluate(()=>{
    const visible=el=>el.getClientRects().length>0&&getComputedStyle(el).visibility!=='hidden';
    const codes=[...document.querySelectorAll('code')].filter(c=>!c.closest('pre')&&visible(c));
    const inline=el=>!!el&&el.nodeType===1&&['inline','contents'].includes(getComputedStyle(el).display);
    // A escala se compara entre os codigos do mesmo bloco, atravessando a unidade e outros inline.
    const block=c=>{let p=c.parentElement;while(inline(p))p=p.parentElement;return p;};
    const blocks=new Map();
    for(const c of codes){const b=block(c);blocks.set(b,[...(blocks.get(b)||[]),getComputedStyle(c).fontSize]);}
    const chips=[...document.querySelectorAll('[data-ciclo] .fase')].filter(visible);
    const wrapped=new Set(chips.map(f=>Math.round(f.getBoundingClientRect().top))).size>1;
    const cross=(a,b)=>a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom;
    // Caractere vizinho no fluxo, atravessando elementos inline e outro chip: o centro dele cai dentro da altura do chip.
    const glyph=(node,index)=>{const r=document.createRange();r.setStart(node,index);r.setEnd(node,index+1);return r.getClientRects()[0];};
    const sameLine=(g,box)=>!g||(g.top+g.bottom)/2>=box.top-1&&(g.top+g.bottom)/2<=box.bottom+1;
    const edgeText=(node,last)=>{
     if(!node)return null;if(node.nodeType===3)return node.nodeValue.length?node:null;
     if(!inline(node)&&node.tagName!=='CODE')return null;
     const kids=[...node.childNodes];for(const k of last?kids.reverse():kids){const t=edgeText(k,last);if(t)return t;}return null;
    };
    const neighbour=(c,before)=>{for(let n=c;n;n=n.parentElement){const s=before?n.previousSibling:n.nextSibling;if(s)return edgeText(s,before);if(!inline(n.parentElement))return null;}return null;};
    const fixed=['.site-header-inner','.editorial-hero > div','.home-main','[data-home-section] > div','.docs-shell','.contact-inner','.footer-inner'];
    return {
     detached:codes.flatMap(c=>{
      const box=c.getBoundingClientRect(),t=c.textContent.trim(),p=neighbour(c,true),n=neighbour(c,false),found=[];
      if(p&&/\S$/.test(p.nodeValue)&&!sameLine(glyph(p,p.nodeValue.length-1),box))found.push(p.nodeValue.at(-1)+t);
      if(n&&/^\S/.test(n.nodeValue)&&!sameLine(glyph(n,0),box))found.push(t+n.nodeValue[0]);
      return found;
     }),
     split:codes.filter(c=>c.getClientRects().length>1).map(c=>c.textContent.trim()),
     scales:[...blocks].filter(([,sizes])=>new Set(sizes).size>1).map(([b])=>b.tagName.toLowerCase()+'.'+[...b.classList].join('.')),
     underline:codes.filter(c=>c.closest('a')&&getComputedStyle(c).textDecorationLine!==getComputedStyle(c.closest('a')).textDecorationLine).map(c=>c.textContent.trim()),
     tracks:wrapped?[...document.querySelectorAll('[data-ciclo] .factory-tracks')].filter(visible).filter(t=>chips.some(f=>cross(t.getBoundingClientRect(),f.getBoundingClientRect()))).length:0,
     // Borda do conteudo, nao da caixa: calha lateral local tambem conta.
     edges:[...new Set(fixed.flatMap(sel=>[...document.querySelectorAll(sel)]).filter(visible).map(el=>{const cs=getComputedStyle(el);return Math.round(el.getBoundingClientRect().left+parseFloat(cs.paddingLeft)+parseFloat(cs.borderLeftWidth));}))]
    };
   });
   if(grid.split.length)throw Error('Inline code split across lines '+localized+' '+width+': '+grid.split.join(', '));
   if(grid.detached.length)throw Error('Adjacent text detached from inline code '+localized+' '+width+': '+grid.detached.join(', '));
   if(grid.scales.length)throw Error('Inline code sizes differ within a block '+localized+' '+width+': '+grid.scales.join(', '));
   if(grid.underline.length)throw Error('Link underline missing on inline code '+localized+' '+width+': '+grid.underline.join(', '));
   if(grid.tracks)throw Error('Decorative tracks over wrapped cycle chips '+localized+' '+width);
   if(grid.edges.length!==1)throw Error('Content edges differ '+localized+' '+width+': '+grid.edges.join(', '));
    return diagram;
   };
   await auditLayout();
   for(const tab of await page.locator('[data-ciclo] [role="tab"]').all()) {
    await tab.click();
    if(await tab.getAttribute('aria-selected')!=='true')throw Error('Cycle tab failed');
    const index=await tab.getAttribute('data-fase');
    if(!await page.locator(`[data-detalhe="${index}"]`).isVisible())throw Error('Cycle panel missing');
    await auditLayout();
   }
   for(const button of await page.locator('[data-modo-linha]').all()) {
    await button.click();
    const panel=await button.getAttribute('aria-controls');
    if(await button.getAttribute('aria-expanded')!=='true'||!await page.locator('#'+panel).isVisible())throw Error('Mode panel missing');
    await auditLayout();
   }
   for(const node of await page.locator('[data-diagram-box]').all()) {
    await node.click();const id=await node.getAttribute('data-no');
    if(await node.getAttribute('aria-pressed')!=='true'||!await page.locator(`[data-painel="${id}"]`).isVisible())throw Error('System selection failed');
    await auditLayout();
   }
   const diagram=await auditLayout();
   const shot=`${locale}-${path==='/'?'home':path.slice(1,-1).replaceAll('/','-')}-${width}-${scheme}.png`;
   // Pagina inteira a partir do topo: o link de pular e fixo e apareceria no meio da imagem.
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.screenshot({path:resolve(output,shot),fullPage:true});
   if(errors.length)throw Error(errors.join('; '));
   results.push({path:localized,width,scheme,screenshot:shot,overflow:0,keyboard:true,diagramBoxes:diagram.boxes,labelsContained:true,inlineCodeAtomic:true,adjacentTextWithCode:true,oneCodeScalePerBlock:true,linkUnderlineOnCode:true,tracksClearOfWrappedChips:true,oneContentEdge:true,reducedMotion:'reduce'});
   if(path==='/'){
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.reload({waitUntil:'networkidle'});
    // O reload restaura a rolagem do print de pagina inteira; a cena precisa comecar fora da tela.
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    const viewTimeline=await page.evaluate(()=>CSS.supports('animation-timeline','view()'));
    if(viewTimeline){
     const offset=await page.locator('.collision-scene .track path').first().evaluate(el=>parseFloat(getComputedStyle(el).strokeDashoffset));
     if(offset<499)throw Error('Collision finished before entering viewport');
    }
    await page.locator('.collision-scene').evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
    await page.waitForFunction(()=>['.false-report','.collision-node'].every(sel=>Number(getComputedStyle(document.querySelector(sel)).opacity)>.99));
    if(viewTimeline)await page.waitForFunction(()=>parseFloat(getComputedStyle(document.querySelector('.collision-scene .track path')).strokeDashoffset)<1);
    if(errors.length)throw Error(errors.join('; '));
    if(!await page.locator('.false-report strong').isVisible())throw Error('Collision final state missing');
    const movingShot=`${locale}-home-${width}-${scheme}-motion.png`;
    // So a janela visivel: a captura de pagina inteira refaz o layout e desfaz o estado da animacao ligada a rolagem.
    await page.screenshot({path:resolve(output,movingShot)});
    const after=await page.evaluate(()=>({
     opaque:['.false-report','.collision-node'].every(sel=>Number(getComputedStyle(document.querySelector(sel)).opacity)>.99),
     traced:parseFloat(getComputedStyle(document.querySelector('.collision-scene .track path')).strokeDashoffset||'0')<1
    }));
    if(!after.opaque||(viewTimeline&&!after.traced))throw Error('Collision state changed during capture '+localized+' '+width);
    results.push({path:localized,width,scheme,screenshot:movingShot,capture:'viewport',reducedMotion:'no-preference',finalCollisionVisible:true,viewTimeline});
   }
   await page.close();
  }
  await context.close();
 }
 writeFileSync(resolve(output,'report.json'),JSON.stringify({status:'passed',results},null,2)+'\n');console.log(JSON.stringify({screenshots:results.length,status:'passed',output}));
}catch(e){writeFileSync(resolve(output,'report.json'),JSON.stringify({status:'blocked-or-failed',error:e.message,results},null,2)+'\n');console.error(e.message);process.exitCode=1;}
finally{if(browser)await browser.close();}
