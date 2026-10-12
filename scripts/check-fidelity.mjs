// Fidelidade ao design do dono: compara o HTML do Claude Design com a home construída.
//   PLAYWRIGHT_MODULE=... CHROMIUM_EXECUTABLE=... npm run check:fidelity -- --design ARQUIVO.html --output DIRETORIO_PRIVADO
//   node scripts/check-fidelity.mjs --plan
// Para cada largura de referência, captura a página inteira dos dois lados com movimento reduzido,
// relógio parado e a mesma semente de Math.random (a partitura sai igual), mede a diferença de pixels
// na página e em cada seção alinhada pelo próprio topo, e captura cada item do inventário
// (scripts/fidelidade/inventario.json) no design e no site. Rede bloqueada; o site vem do dist.
// Não decide sozinho: o relatório traz os números e quem lê compara com os desvios registrados.
import {readFileSync,writeFileSync,mkdirSync,existsSync,statSync} from 'node:fs';
import {resolve,extname,join} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const inventario=JSON.parse(readFileSync(resolve(root,'scripts/fidelidade/inventario.json'),'utf8'));
const larguras=[1440,1280,1024,768,390,320];
// Seções na ordem do design: seletor no design e no site.
const secoes=[['cabecalho','header','.cabecalho'],['hero','#topo','#topo'],['runtimes','section:nth-of-type(2)','.runtimes'],['01 paralelismo','#escala','#escala'],['02 problema','#problema','#problema'],['03 para quem','#contato','#contato'],['04 modos','#modos','#modos'],['05 atencao','#manha','#manha'],['06 noite','#noite','#noite'],['07 ciclo','#ciclo','#ciclo'],['08 prova','#prova','#prova'],['chamada final','section:nth-of-type(11)','.chamada'],['rodape','footer','footer']];
const args=process.argv.slice(2),opt=k=>args.includes(k)?args[args.indexOf(k)+1]:undefined;
if(args.includes('--plan')){console.log(JSON.stringify({larguras,secoes:secoes.map(s=>s[0]),itens:inventario.length,limiarPorCanal:24,requer:['PLAYWRIGHT_MODULE','CHROMIUM_EXECUTABLE','--design','--output']},null,2));process.exit(0);}
const design=opt('--design')&&resolve(opt('--design')),saida=opt('--output')&&resolve(opt('--output'));
if(!design||!saida||!existsSync(design)||!process.env.PLAYWRIGHT_MODULE||!process.env.CHROMIUM_EXECUTABLE)throw Error('Set PLAYWRIGHT_MODULE and CHROMIUM_EXECUTABLE, then pass --design DESIGN.html --output PRIVATE_DIRECTORY');
if(saida===root||saida.startsWith(root+'/'))throw Error('Captures must stay outside the repository');
const sharp=createRequire(resolve(root,'package.json'))('sharp');
const dist=resolve(root,'dist');
mkdirSync(saida,{recursive:true});

const tipos={'.html':'text/html','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.woff':'font/woff','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.ico':'image/x-icon'};
async function contexto(browser,largura,pular){
 const ctx=await browser.newContext({viewport:{width:largura,height:900},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block',locale:'pt-BR',timezoneId:'America/Sao_Paulo'});
 await ctx.route('**/*',async route=>{
  const u=new URL(route.request().url());
  if(['file:','blob:','data:'].includes(u.protocol))return route.continue();
  if(u.origin==='http://site.local'){
   let f=resolve(dist,'.'+decodeURIComponent(u.pathname));
   if(f!==dist&&!f.startsWith(dist+'/'))return route.fulfill({status:403,body:''});
   if(existsSync(f)&&statSync(f).isDirectory())f=resolve(f,'index.html');
   if(!existsSync(f))return route.fulfill({status:404,body:''});
   return route.fulfill({status:200,contentType:tipos[extname(f)]||'application/octet-stream',body:readFileSync(f)});
  }
  return route.abort('blockedbyclient');
 });
 // A mesma semente nos dois lados; pular alinha o que o runtime do design consome antes da partitura.
 await ctx.addInitScript(({pular})=>{let a=0x2F6B5C;const r=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};for(let i=0;i<pular;i++)r();let n=0;Math.random=()=>{n++;return r();};window.__aleatorios=()=>n;},{pular});
 return ctx;
}
async function abrir(ctx,url){
 const page=await ctx.newPage();
 await page.clock.install({time:new Date('2026-10-12T12:00:00-03:00')});
 await page.goto(url,{waitUntil:'load'});
 await page.waitForSelector('[data-screen-label="Home"], main',{timeout:20000});
 await page.evaluate(()=>document.fonts.ready);await page.clock.runFor(400);await page.evaluate(()=>document.fonts.ready);await page.clock.runFor(200);
 return page;
}
const medir=(page,pares,lado)=>page.evaluate(({pares,lado})=>Object.fromEntries(pares.map(([nome,d,s])=>{const el=document.querySelector(lado==='design'?d:s);if(!el)return [nome,null];const r=el.getBoundingClientRect();return [nome,{top:Math.round(r.top+scrollY),h:Math.round(r.height)}];})),{pares,lado});
async function diferenca(a,b,saidaPng,area){
 const A=sharp(a),B=sharp(b);
 const ia=await A.metadata(),ib=await B.metadata();
 const w=Math.min(ia.width,ib.width);
 const ra=area?{left:0,top:area.ta,width:w,height:area.h}:{left:0,top:0,width:w,height:Math.min(ia.height,ib.height)};
 const rb=area?{left:0,top:area.tb,width:w,height:area.h}:ra;
 const da=await sharp(a).extract(ra).ensureAlpha().raw().toBuffer(),db=await sharp(b).extract(rb).ensureAlpha().raw().toBuffer();
 let dif=0;const D=saidaPng?Buffer.alloc(da.length):null;
 for(let i=0;i<da.length;i+=4){const d=Math.max(Math.abs(da[i]-db[i]),Math.abs(da[i+1]-db[i+1]),Math.abs(da[i+2]-db[i+2]));if(d>24){dif++;if(D){D[i]=255;D[i+3]=255;}}else if(D){const g=Math.round(235+(da[i]+da[i+1]+da[i+2])/765*20);D[i]=D[i+1]=D[i+2]=g;D[i+3]=255;}}
 if(D)await sharp(D,{raw:{width:ra.width,height:ra.height,channels:4}}).png().toFile(saidaPng);
 return {pixels:ra.width*ra.height,diferentes:dif,percentual:Number((dif/(ra.width*ra.height)*100).toFixed(3))};
}

const relatorio={design:design.split('/').at(-1),sha256Design:null,larguras:[],itens:[]};
relatorio.sha256Design=(await import('node:crypto')).createHash('sha256').update(readFileSync(design)).digest('hex');
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE));
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE});
try{
 // Quantos números aleatórios o design consome antes da partitura, para alinhar a semente do site.
 let pular=0;
 {const c1=await contexto(browser,1440,0),p1=await abrir(c1,pathToFileURL(design).href),n1=await p1.evaluate(()=>window.__aleatorios());await c1.close();
  const c2=await contexto(browser,1440,0),p2=await abrir(c2,'http://site.local/'),n2=await p2.evaluate(()=>window.__aleatorios());await c2.close();pular=Math.max(0,n1-n2);}
 relatorio.semente={pularNoSite:pular};
 const paginas={};
 for(const largura of larguras){
  const cd=await contexto(browser,largura,0),cs=await contexto(browser,largura,pular);
  const pd=await abrir(cd,pathToFileURL(design).href),ps=await abrir(cs,'http://site.local/');
  const fd=join(saida,`design-${largura}.png`),fs=join(saida,`site-${largura}.png`);
  await pd.screenshot({path:fd,fullPage:true,animations:'disabled'});await ps.screenshot({path:fs,fullPage:true,animations:'disabled'});
  const md=await medir(pd,secoes,'design'),ms=await medir(ps,secoes,'site');
  const pagina=await diferenca(fd,fs,join(saida,`diferenca-${largura}.png`));
  const alturas={design:await pd.evaluate(()=>document.documentElement.scrollHeight),site:await ps.evaluate(()=>document.documentElement.scrollHeight)};
  const porSecao=[];
  for(const [nome] of secoes){
   const a=md[nome],b=ms[nome];if(!a||!b){porSecao.push({secao:nome,ausente:!a?'design':'site'});continue;}
   // O topo de cada seção vem arredondado: compara com deslocamento de -2 a +2 px e fica com o menor.
   const h=Math.min(a.h,b.h)-4;let d={percentual:0},desloc=0;
   if(h>0){d=null;for(const o of [-2,-1,0,1,2]){const x=await diferenca(fd,fs,null,{ta:a.top+2,tb:b.top+2+o,h});if(!d||x.percentual<d.percentual){d=x;desloc=o;}}}
   porSecao.push({secao:nome,alturaDesign:a.h,alturaSite:b.h,diferencaDeAltura:b.h-a.h,percentualNaAreaComum:d.percentual,deslocamento:desloc});
  }
  relatorio.larguras.push({largura,alturas,diferencaDeAltura:alturas.site-alturas.design,pagina,porSecao,sobraHorizontal:{design:await pd.evaluate(()=>document.documentElement.scrollWidth>innerWidth),site:await ps.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}});
  paginas[largura]={cd,cs,pd,ps};
 }
 // Cada item do inventário, capturado no design e no site na largura dele.
 for(const item of inventario){
  const {pd,ps}=paginas[item.largura]||paginas[1440];
  const registro={id:item.id,secao:item.secao,item:item.item,destino:item.destino,largura:item.largura,estado:item.estado||null};
  if(item.estado==='texto'){registro.design=await pd.title();registro.site=await ps.title();registro.igual=registro.design===registro.site;relatorio.itens.push(registro);continue;}
  if(item.estado==='pagina'){registro.capturas={design:`design-${item.largura}.png`,site:`site-${item.largura}.png`};relatorio.itens.push(registro);continue;}
  for(const [lado,page,sel] of [['design',pd,item.design],['site',ps,item.site]]){
   const loc=page.locator(sel).first();
   if(!await loc.count()){registro[lado]='seletor sem resultado: '+sel;continue;}
   await loc.scrollIntoViewIfNeeded().catch(()=>{});
   if(item.estado==='hover'||item.estado==='hover-link'){await (item.estado==='hover-link'?loc.locator('a').first():loc).hover().catch(()=>{});await page.clock.runFor(50);}
   const arquivo=`item-${item.id}-${lado}.png`;
   await loc.screenshot({path:join(saida,arquivo),animations:'disabled'}).catch(e=>{registro[lado+'Erro']=e.message.split('\n')[0];});
   await page.mouse.move(0,0);
   (registro.capturas||={})[lado]=arquivo;
  }
  relatorio.itens.push(registro);
 }
 for(const {cd,cs} of Object.values(paginas)){await cd.close();await cs.close();}
}finally{await browser.close();}
writeFileSync(join(saida,'fidelidade.json'),JSON.stringify(relatorio,null,1)+'\n');
const resumo=relatorio.larguras.map(l=>({largura:l.largura,percentual:l.pagina.percentual,diferencaDeAltura:l.diferencaDeAltura}));
const semCaptura=relatorio.itens.filter(i=>!i.capturas&&i.estado!=='texto').map(i=>i.id);
console.log(JSON.stringify({resumo,itens:relatorio.itens.length,semCaptura,saida}));
if(semCaptura.length)process.exitCode=1;
