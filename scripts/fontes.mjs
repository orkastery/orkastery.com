// Gera src/styles/fonts.css a partir dos pacotes @fontsource fixados no package.json, com os
// nomes de família que o partitura.css usa em --f-titulo, --f-texto e --f-mono ('Geist',
// 'Hanken Grotesk' e 'IBM Plex Mono'). Os arquivos são os mesmos dos pacotes; só o nome da
// família e o caminho mudam. Uso: node scripts/fontes.mjs [--verificar]
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const raiz=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const saida=resolve(raiz,'src/styles/fonts.css');
// pacote, folha de origem e o nome de família da Partitura
export const FONTES=[
 ['@fontsource-variable/geist','wght.css','Geist'],
 ['@fontsource-variable/hanken-grotesk','wght.css','Hanken Grotesk'],
 ['@fontsource/ibm-plex-mono','400.css','IBM Plex Mono'],
 ['@fontsource/ibm-plex-mono','500.css','IBM Plex Mono'],
];
export function gerarFontes(){
 const partes=['/* Gerado por scripts/fontes.mjs a partir dos pacotes @fontsource do package.json. Não edite à mão.',
  '   As famílias têm os nomes de --f-titulo, --f-texto e --f-mono do partitura.css; as licenças OFL',
  '   estão em public/licenses/. */'];
 for(const [pacote,folha,familia] of FONTES){
  const origem=resolve(raiz,'node_modules',pacote,folha);
  if(!existsSync(origem))throw Error('pacote de fonte ausente: '+pacote+'/'+folha+' (rode npm ci)');
  const css=readFileSync(origem,'utf8')
   .replace(/font-family:\s*'[^']+';/g,`font-family: '${familia}';`)
   .replace(/url\(\.\/files\//g,`url(../../node_modules/${pacote}/files/`);
  partes.push(`/* ${pacote}/${folha} */`,css.trim());
 }
 return partes.join('\n')+'\n';
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const css=gerarFontes();
 if(process.argv.includes('--verificar')){
  if(!existsSync(saida)||readFileSync(saida,'utf8')!==css){console.error('src/styles/fonts.css fora de sincronia com os pacotes: rode node scripts/fontes.mjs');process.exitCode=1;}
  else console.log(JSON.stringify({fontes:'em sincronia'}));
 }else{writeFileSync(saida,css);console.log(JSON.stringify({gerado:'src/styles/fonts.css',faces:(css.match(/@font-face/g)||[]).length}));}
}
