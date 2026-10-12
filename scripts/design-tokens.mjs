// Gera src/styles/tokens.css a partir de src/data/design-system.json, a fonte única dos tokens.
//   node scripts/design-tokens.mjs              grava o CSS
//   node scripts/design-tokens.mjs --verificar  sai 1 se o CSS gravado não for o que o JSON gera
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

export const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
export const jsonFile=resolve(root,'src/data/design-system.json');
export const cssFile=resolve(root,'src/styles/tokens.css');

export function tokens(ds){
 const out=[];
 const add=(name,value)=>{if(typeof value!=='string'||!value.trim())throw Error('Token sem valor: '+name);out.push([name,value]);};
 for(const [name,c] of Object.entries(ds.identidade.cores))add('--'+name,c.valor);
 for(const [name,f] of Object.entries(ds.identidade.fontes))add('--fonte-'+name,f.familia);
 for(const [name,t] of Object.entries(ds.estrutura.tipografia)){
  add('--tipo-'+name,t.font);
  if(t.tracking)add('--tracking-'+name,t.tracking);
 }
 for(const [name,v] of Object.entries(ds.estrutura.espaco))add('--esp-'+name,v);
 for(const [name,v] of Object.entries(ds.estrutura.secao))add('--secao-'+name,v);
 for(const [name,v] of Object.entries(ds.estrutura.raio))add('--raio-'+name,v);
 for(const [name,v] of Object.entries(ds.estrutura.sombra))add('--sombra-'+name,v);
 for(const [name,v] of Object.entries(ds.estrutura.linha))add('--linha-'+name,v);
 add('--curva-revelar',ds.estrutura.movimento['curva-revelar']);
 add('--largura-maxima',ds.estrutura.layout['largura-maxima']);
 add('--calha',ds.estrutura.layout.calha);
 add('--altura-cabecalho',ds.estrutura.layout['altura-do-cabecalho']);
 const names=out.map(([n])=>n);
 if(new Set(names).size!==names.length)throw Error('Token repetido');
 return out;
}

export function css(ds){
 const lines=tokens(ds).map(([n,v])=>` ${n}:${v};`);
 return '/* Gerado por scripts/design-tokens.mjs a partir de src/data/design-system.json.\n'+
  '   Não edite à mão: mude o JSON e rode npm run tokens. O check:design reprova este arquivo fora de sincronia. */\n'+
  ':root{\n'+lines.join('\n')+'\n}\n';
}

export function read(){return JSON.parse(readFileSync(jsonFile,'utf8'));}
export function verify(){
 const expected=css(read());
 if(!existsSync(cssFile)||readFileSync(cssFile,'utf8')!==expected)throw Error('src/styles/tokens.css fora de sincronia com src/data/design-system.json: rode npm run tokens');
 return {tokens:tokens(read()).length};
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.includes('--verificar'))console.log(JSON.stringify(verify()));
  else{writeFileSync(cssFile,css(read()));console.log(JSON.stringify({escrito:'src/styles/tokens.css',tokens:tokens(read()).length}));}
 }catch(e){console.error(e.message);process.exitCode=1;}
}
