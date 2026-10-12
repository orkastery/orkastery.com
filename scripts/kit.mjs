// Traz o kit Partitura do dono (Claude Design) para o site sem mudar um byte: os tokens
// (partitura.css e partitura.json), o DESIGN.md e a marca (svg, png e templates). Grava em
// src/data/kit-partitura.json o sha256 de cada arquivo; o check:design confere a cópia por ele.
// Uso: node scripts/kit.mjs --de <pasta do kit>
import {readFileSync,writeFileSync,readdirSync,mkdirSync,copyFileSync,existsSync} from 'node:fs';
import {resolve,dirname,relative} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
export const raiz=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export const MANIFESTO=resolve(raiz,'src/data/kit-partitura.json');
// origem no kit -> destino no site (pasta pública: tudo aqui também é baixável em /marca/)
export const DESTINOS=[
 ['partitura/partitura.css','public/partitura/partitura.css'],
 ['partitura/partitura.json','public/partitura/partitura.json'],
 ['DESIGN.md','public/partitura/DESIGN.md'],
 ['marca/svg/','public/marca/svg/'],
 ['marca/png/','public/marca/png/'],
 ['marca/templates/','public/marca/templates/'],
];
export const sha256=arquivo=>createHash('sha256').update(readFileSync(arquivo)).digest('hex');
// /favicon.ico, que navegadores antigos pedem na raiz: o favicon-32.png do kit dentro de um ICO,
// com os bytes do PNG intactos (cabeçalho de 6 bytes, uma entrada de 16, depois o PNG).
export function icoDoPng(png){
 const cab=Buffer.alloc(22);
 cab.writeUInt16LE(0,0);cab.writeUInt16LE(1,2);cab.writeUInt16LE(1,4);
 cab.writeUInt8(png.readUInt32BE(16)>=256?0:png.readUInt32BE(16),6);cab.writeUInt8(png.readUInt32BE(20)>=256?0:png.readUInt32BE(20),7);
 cab.writeUInt8(0,8);cab.writeUInt8(0,9);cab.writeUInt16LE(1,10);cab.writeUInt16LE(32,12);
 cab.writeUInt32LE(png.length,14);cab.writeUInt32LE(22,18);
 return Buffer.concat([cab,png]);
}
export const FAVICON_ICO='public/favicon.ico',FAVICON_PNG='public/marca/png/favicon-32.png';
function arquivosDe(kit,origem){
 if(!origem.endsWith('/'))return [origem];
 return readdirSync(resolve(kit,origem),{withFileTypes:true}).filter(e=>e.isFile()&&!e.name.startsWith('.')).map(e=>origem+e.name).sort();
}
export function trazerKit(kit){
 const versao=JSON.parse(readFileSync(resolve(kit,'partitura/partitura.json'),'utf8')).versao;
 const arquivos={};
 for(const [origem,destino] of DESTINOS)for(const rel of arquivosDe(kit,origem)){
  const alvo=resolve(raiz,destino.endsWith('/')?destino+rel.slice(origem.length):destino);
  mkdirSync(dirname(alvo),{recursive:true});copyFileSync(resolve(kit,rel),alvo);
  arquivos[relative(raiz,alvo)]=sha256(alvo);
 }
 writeFileSync(resolve(raiz,FAVICON_ICO),icoDoPng(readFileSync(resolve(raiz,FAVICON_PNG))));
 const manifesto={descricao:'Arquivos do kit Partitura copiados sem mudança por scripts/kit.mjs. O check:design reprova qualquer diferença. public/favicon.ico é o favicon-32.png do kit dentro de um ICO.',partitura:versao,arquivos};
 writeFileSync(MANIFESTO,JSON.stringify(manifesto,null,2)+'\n');
 return {partitura:versao,arquivos:Object.keys(arquivos).length};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--de');
 if(i<0||!process.argv[i+1]||!existsSync(resolve(process.argv[i+1],'partitura/partitura.css'))){console.error('uso: node scripts/kit.mjs --de <pasta do kit, com partitura/ e marca/>');process.exitCode=2;}
 else console.log(JSON.stringify(trazerKit(resolve(process.argv[i+1]))));
}
