// Gera os PDFs da página /marca/ a partir dos documentos do kit Partitura (Claude Design): o
// manual de marca (versão de impressão, A4 paisagem), as diretrizes rápidas (uma página A4) e a
// biblioteca de componentes (uma página só, na largura de 1440 px). Os documentos do kit carregam
// o runtime do Claude Design e as fontes pela rede; por isso este passo não faz parte do build e
// grava o sha256 de cada PDF em src/data/kit-partitura.json, que o check:design confere.
// Uso: PLAYWRIGHT_MODULE=... CHROMIUM_EXECUTABLE=... node scripts/documentos-da-marca.mjs --de <pasta do kit>
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,relative} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {raiz,MANIFESTO,sha256} from './kit.mjs';

export const DOCUMENTOS=[
 {de:'Manual de Marca-print.dc.html',para:'public/marca/documentos/manual-de-marca.pdf',pdf:{format:'A4',landscape:true}},
 {de:'Diretrizes Rapidas.dc.html',para:'public/marca/documentos/diretrizes-rapidas.pdf',pdf:{format:'A4'}},
 {de:'Partitura Componentes.dc.html',para:'public/marca/documentos/partitura-componentes.pdf',pdf:{larguraDaTela:1440}},
];
// O que o documento pode buscar: o próprio kit, o React fixado do runtime e as fontes do Google.
const permitido=u=>['file:','data:','blob:'].includes(u.protocol)||(u.hostname==='unpkg.com'&&/\/(react|react-dom)@18\.3\.1\//.test(u.pathname))||/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);

async function gerar(kit){
 if(!process.env.PLAYWRIGHT_MODULE||!process.env.CHROMIUM_EXECUTABLE)throw Error('Defina PLAYWRIGHT_MODULE e CHROMIUM_EXECUTABLE');
 const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE));
 const navegador=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE});
 const derivados={};
 try{
  for(const d of DOCUMENTOS){
   const origem=resolve(kit,d.de);if(!existsSync(origem))throw Error('documento ausente no kit: '+d.de);
   const largura=d.pdf.larguraDaTela||1440;
   const contexto=await navegador.newContext({viewport:{width:largura,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
   await contexto.route('**/*',r=>permitido(new URL(r.request().url()))?r.continue():r.abort());
   const pagina=await contexto.newPage();
   await pagina.goto(pathToFileURL(origem).href,{waitUntil:'networkidle'});
   await pagina.evaluate(()=>document.fonts.ready);await pagina.waitForTimeout(800);
   let opcoes;
   if(d.pdf.larguraDaTela){await pagina.emulateMedia({media:'screen'});const altura=await pagina.evaluate(()=>document.documentElement.scrollHeight);opcoes={width:largura+'px',height:altura+'px',printBackground:true,pageRanges:'1'};}
   else opcoes={...d.pdf,printBackground:true,preferCSSPageSize:true};
   const saida=resolve(raiz,d.para);mkdirSync(resolve(saida,'..'),{recursive:true});
   writeFileSync(saida,await pagina.pdf(opcoes));
   derivados[d.para]={de:d.de,origemSha256:sha256(origem),sha256:sha256(saida)};
   await contexto.close();
  }
 }finally{await navegador.close();}
 const manifesto=JSON.parse(readFileSync(MANIFESTO,'utf8'));
 manifesto.derivados={descricao:'PDFs gerados por scripts/documentos-da-marca.mjs a partir dos documentos do kit.',...derivados};
 writeFileSync(MANIFESTO,JSON.stringify(manifesto,null,2)+'\n');
 return Object.fromEntries(Object.entries(derivados).map(([k,v])=>[k,v.sha256.slice(0,12)]));
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--de');
 if(i<0)console.error('uso: node scripts/documentos-da-marca.mjs --de <pasta do kit>'),process.exitCode=2;
 else gerar(resolve(process.argv[i+1])).then(r=>console.log(JSON.stringify(r)),e=>{console.error(e.message);process.exitCode=1;});
}
