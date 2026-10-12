// Teste dos redirecionamentos do legado /es/ (decisão E1 a do dono), na saída da build atual.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, cpSync, readFileSync, writeFileSync, mkdirSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { root, siteBase } from './check-links.mjs';
import { checkRedirecionamentos } from './check-redirecionamentos.mjs';
import { checkI18n } from './check-i18n.mjs';
import { alvoDoLegado, rotasDoLegado } from '../src/lib/es-legado.mjs';
const B=siteBase();
function saida(run){
 const dir=mkdtempSync(resolve(tmpdir(),'redirecionamentos-'));
 try{cpSync(resolve(root,'dist'),dir,{recursive:true});run(dir);}finally{rmSync(dir,{recursive:true,force:true});}
}
const editar=(dir,caminho,troca)=>{const f=resolve(dir,caminho);writeFileSync(f,troca(readFileSync(f,'utf8')));};
test('cada URL /es/ antiga leva ao mesmo caminho em /en/',()=>{
 assert.equal(rotasDoLegado.length,29);
 assert.equal(checkRedirecionamentos().redirecionamentos,29);
 assert.equal(alvoDoLegado('/es/docs/cli/'),'/en/docs/cli/');
 assert.equal(alvoDoLegado('/es/'),'/en/');
 assert.throws(()=>alvoDoLegado('/es/../x/'),/inválida/);
});
test('sem noindex reprova',()=>saida(dir=>{
 editar(dir,'es/docs/cli/index.html',s=>s.replace(/<meta name="robots"[^>]*>/,''));
 assert.throws(()=>checkRedirecionamentos(dir),/noindex/);
}));
test('refresh para outro destino reprova',()=>saida(dir=>{
 editar(dir,'es/docs/cli/index.html',s=>s.replace('url='+B+'/en/docs/cli/','url='+B+'/en/docs/'));
 assert.throws(()=>checkRedirecionamentos(dir),/Refresh errado/);
}));
test('canonical que não é o destino reprova',()=>saida(dir=>{
 editar(dir,'es/ork/index.html',s=>s.replace('href="https://orkastery.com'+B+'/en/ork/"','href="https://orkastery.com'+B+'/es/ork/"'));
 assert.throws(()=>checkRedirecionamentos(dir),/Canonical errado/);
}));
test('URL antiga sem página reprova',()=>saida(dir=>{
 unlinkSync(resolve(dir,'es/orkmind/index.html'));
 assert.throws(()=>checkRedirecionamentos(dir),/sem página de redirecionamento: \/es\/orkmind\//);
}));
test('destino que sumiu reprova',()=>saida(dir=>{
 unlinkSync(resolve(dir,'en/docs/modos/index.html'));
 assert.throws(()=>checkRedirecionamentos(dir),/Destino do redirecionamento/);
}));
test('página em espanhol de volta reprova',()=>saida(dir=>{
 mkdirSync(resolve(dir,'es/nova'),{recursive:true});
 writeFileSync(resolve(dir,'es/nova/index.html'),'<!doctype html><html lang="es"><head><title>Nueva</title></head><body><main><h1>Nueva</h1></main></body></html>');
 assert.throws(()=>checkRedirecionamentos(dir),/fora do legado/);
 editar(dir,'es/index.html',()=>'<!doctype html><html lang="es"><head><title>Inicio</title></head><body><main><h1>Inicio</h1></main></body></html>');
 rmSync(resolve(dir,'es/nova'),{recursive:true});
 assert.throws(()=>checkRedirecionamentos(dir),/Conteúdo em espanhol/);
}));
test('hreflang ou link para /es/ numa página do site reprova',()=>saida(dir=>{
 editar(dir,'en/index.html',s=>s.replace('</head>','<link rel="alternate" hreflang="es" href="https://orkastery.com'+B+'/es/" /></head>'));
 assert.throws(()=>checkRedirecionamentos(dir),/hreflang/);
 assert.throws(()=>checkI18n(dir),/hreflang|alternate/i);
}));
test('seletor com uma terceira língua reprova',()=>saida(dir=>{
 editar(dir,'index.html',s=>s.replace(/(<nav[^>]*data-language-selector[^>]*>)/,'$1<a href="'+B+'/es/" hreflang="es" lang="es">ES</a>'));
 assert.throws(()=>checkI18n(dir),/selector|Página aponta/);
}));
