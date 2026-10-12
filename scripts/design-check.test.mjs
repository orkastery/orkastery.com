// Canários do check:design: cada guarda reprova a mutação que deve pegar.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cpSync,mkdtempSync,rmSync,readFileSync,writeFileSync,readdirSync,unlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {checkDesign,checkContrast,codeRules,contrast,FONTES_ANTIGAS} from './check-design.mjs';
import {css as gerarCss,read as lerDs,cssFile} from './design-tokens.mjs';
import {root} from './check-links.mjs';

const ds=lerDs();
const cores=Object.fromEntries(Object.entries(ds.identidade.cores).map(([k,v])=>[k,v.valor]));

test('o CSS gravado é exatamente o que o JSON gera, e muda quando o JSON muda',()=>{
 assert.equal(readFileSync(cssFile,'utf8'),gerarCss(ds));
 const outro=structuredClone(ds);outro.identidade.cores.tinta.valor='#000000';
 assert.notEqual(gerarCss(outro),gerarCss(ds));
});
test('contraste AA: os pares do site passam e um cinza claro demais reprova',()=>{
 assert.ok(checkContrast(cores).length>30);
 assert.throws(()=>checkContrast({...cores,'tinta-4-aa':'#7A818B'}),/Contrast tinta-4-aa\/papel/);
 assert.throws(()=>checkContrast({...cores,'acento-texto':'#E0B264'}),/Contrast acento-texto/);
 assert.ok(contrast('#7A818B','#EEF0F2')<4.5,'o cinza do design falha AA em texto pequeno');
});
test('código inline: sem inline-block, sem a unidade sem quebra ou sem o código liso inteiro, reprova',()=>{
 const ok=':not(pre)>code{display:inline-block;max-width:100%}.code-unit{white-space:nowrap}.codigo-liso{display:inline;white-space:nowrap}';
 assert.equal(codeRules(ok),true);
 assert.throws(()=>codeRules(ok.replace('display:inline-block;','')),/Inline code can split/);
 assert.throws(()=>codeRules(ok.replace('.code-unit{white-space:nowrap}','')),/Adjacent text can detach/);
 assert.throws(()=>codeRules(ok.replace('.codigo-liso{display:inline;white-space:nowrap}','')),/Plain code can split/);
});
test('fontes do visual antigo são reconhecidas',()=>{
 for(const f of ['Fraunces','Instrument Sans','Geist Mono'])assert.ok(FONTES_ANTIGAS.test(`font-family:"${f}"`));
 assert.ok(!FONTES_ANTIGAS.test("font-family:'Geist Variable','IBM Plex Mono'"));
});

function distFixture(run){
 const dir=mkdtempSync(join(tmpdir(),'site-design-'));
 try{cpSync(resolve(root,'dist'),dir,{recursive:true});run(dir);}finally{rmSync(dir,{recursive:true,force:true});}
}
test('a build atual passa, e asset externo, licença ausente ou fonte antiga reprovam',()=>distFixture(dir=>{
 assert.equal(checkDesign(dir).pages>0,true);
 const home=join(dir,'index.html'),original=readFileSync(home,'utf8');
 writeFileSync(home,original.replace('</head>','<script src="https://cdn.example.invalid/x.js"></script></head>'));
 assert.throws(()=>checkDesign(dir),/External runtime asset/);
 writeFileSync(home,original);
 unlinkSync(join(dir,'licenses','geist.txt'));
 assert.throws(()=>checkDesign(dir),/Missing font license: geist/);
 cpSync(resolve(root,'public','licenses','geist.txt'),join(dir,'licenses','geist.txt'));
 const css=readdirSync(join(dir,'_astro')).find(f=>f.endsWith('.css'));
 writeFileSync(join(dir,'_astro',css),readFileSync(join(dir,'_astro',css),'utf8')+'.x{font-family:Fraunces}');
 assert.throws(()=>checkDesign(dir),/Old design font/);
}));
