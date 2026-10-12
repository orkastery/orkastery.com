// Canários do check:design (Partitura): cada guarda reprova a mutação que deve pegar.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cpSync,mkdtempSync,rmSync,readFileSync,writeFileSync,readdirSync,unlinkSync,appendFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {checkDesign,checkKit,checkSincronia,checkContraste,checkCorSolta,checkLatao,checkFoco,checkFontes,codeRules,contraste,paleta,misturar,FONTES_PROIBIDAS,PARTITURA_CSS,PARTITURA_JSON,lerJson} from './check-design.mjs';
import {root} from './check-links.mjs';

const css=readFileSync(PARTITURA_CSS,'utf8'),json=lerJson(PARTITURA_JSON);

test('partitura.css e partitura.json do kit dizem o mesmo, e uma divergência reprova',()=>{
 assert.ok(checkSincronia(css,json).primitivos>=19);
 assert.throws(()=>checkSincronia(css.replace('--latao: #E0B264;','--latao: #E0B265;'),json),/divergem em --latao/);
 const outro=structuredClone(json);outro.semantico.noite['executando-texto']='{cor.regencia}';
 assert.throws(()=>checkSincronia(css,outro),/executando-texto \(noite\)/);
});
test('contraste: os pares de texto passam nos dois temas e um texto de estado claro demais reprova',()=>{
 const p=paleta(css);
 assert.ok(checkContraste(p).length>=30);
 assert.throws(()=>checkContraste({...p,dia:{...p.dia,'espera-texto':p.dia.espera}}),/Contraste dia espera-texto/);
 assert.throws(()=>checkContraste({...p,noite:{...p.noite,'executando-texto':p.noite.executando}}),/Contraste noite executando-texto/);
 assert.ok(contraste('#4F78B8','#161A21')<4.5,'regência não passa como texto na noite (por isso o kit escreve em luar)');
 assert.equal(misturar('#000000',50,'#FFFFFF'),'#808080');
});
test('cor solta em componente, no CSS da build ou num estilo inline reprova',()=>{
 assert.equal(checkCorSolta([{arquivo:'ok.astro',css:'.a{color:var(--texto);white-space:nowrap}',atributos:''}]),true);
 assert.throws(()=>checkCorSolta([{arquivo:'x.astro',css:'.a{color:#12161C}',atributos:''}]),/Cor solta.*x\.astro/);
 assert.throws(()=>checkCorSolta([{arquivo:'y.astro',css:'.a{background:rgba(18,22,28,.1)}',atributos:''}]),/Cor solta/);
 assert.throws(()=>checkCorSolta([{arquivo:'z.astro',css:'.a{color:white}',atributos:''}]),/Cor solta/);
 assert.throws(()=>checkCorSolta([],'.b{border-color:#E0B264}'),/na build/);
 assert.throws(()=>checkCorSolta([],'','background:rgb(1,2,3)'),/na build/);
});
test('latão fora do lugar reprova; nos lugares do kit passa',()=>{
 assert.equal(checkLatao('.ponto-hitl[data-astro-cid-ab12]{background:var(--espera)}.instalar-caixa{box-shadow:var(--luz-latao)}.divisor-fio span{background:var(--latao)}'),true);
 assert.throws(()=>checkLatao('.hero-seta{color:var(--espera-texto)}'),/Latão fora do lugar/);
 assert.throws(()=>checkLatao('a:hover{color:var(--latao-tinta)}'),/Latão fora do lugar/);
});
test('foco: sem o anel do kit ou com outline apagado reprova',()=>{
 const ok=':focus-visible{outline:2px solid transparent;box-shadow:var(--anel-foco)}main:focus{outline:none}';
 assert.equal(checkFoco(ok),true);
 assert.throws(()=>checkFoco(ok.replace('box-shadow:var(--anel-foco)','')),/anel do kit/);
 assert.throws(()=>checkFoco(ok+'.botao:focus{outline:none}'),/outline apagado/);
});
test('código inline: sem inline-block, sem a unidade sem quebra ou sem o código liso inteiro, reprova',()=>{
 const ok=':not(pre)>code{display:inline-block;max-width:100%}.code-unit{white-space:nowrap}.codigo-liso{display:inline;white-space:nowrap}';
 assert.equal(codeRules(ok),true);
 assert.throws(()=>codeRules(ok.replace('display:inline-block;','')),/Inline code can split/);
 assert.throws(()=>codeRules(ok.replace('.code-unit{white-space:nowrap}','')),/Adjacent text can detach/);
 assert.throws(()=>codeRules(ok.replace('.codigo-liso{display:inline;white-space:nowrap}','')),/Plain code can split/);
});
test('fontes: as famílias são as do kit, e fonte proibida ou família trocada reprova',()=>{
 assert.deepEqual(checkFontes().sort(),['Geist','Hanken Grotesk','IBM Plex Mono']);
 const fonts=readFileSync(resolve(root,'src/styles/fonts.css'),'utf8');
 assert.throws(()=>checkFontes(fonts.replace("font-family: 'Geist';","font-family: 'Geist Variable';")),/fora de sincronia/);
 for(const f of ['Fraunces','Bricolage Grotesque','Inter','Roboto','Geist Variable'])assert.ok(FONTES_PROIBIDAS.test(`font-family:"${f}"`),f);
 assert.ok(!FONTES_PROIBIDAS.test("font-family:'Geist','Hanken Grotesk','IBM Plex Mono'"));
});

function distFixture(run){
 const dir=mkdtempSync(join(tmpdir(),'site-design-'));
 try{cpSync(resolve(root,'dist'),dir,{recursive:true});run(dir);}finally{rmSync(dir,{recursive:true,force:true});}
}
test('a build atual passa, e kit mudado, asset externo, licença ausente, fonte proibida ou latão solto reprovam',()=>distFixture(dir=>{
 assert.ok(checkDesign(dir).pages>0);
 appendFileSync(join(dir,'marca','svg','simbolo.svg'),' ');
 assert.throws(()=>checkKit(dir),/Arquivo do kit diferente na build: public\/marca\/svg\/simbolo\.svg/);
 cpSync(resolve(root,'public','marca','svg','simbolo.svg'),join(dir,'marca','svg','simbolo.svg'));
 const home=join(dir,'index.html'),original=readFileSync(home,'utf8');
 writeFileSync(home,original.replace('</head>','<script src="https://cdn.example.invalid/x.js"></script></head>'));
 assert.throws(()=>checkDesign(dir),/External runtime asset/);
 writeFileSync(home,original);
 unlinkSync(join(dir,'licenses','geist.txt'));
 assert.throws(()=>checkDesign(dir),/Missing font license: geist/);
 cpSync(resolve(root,'public','licenses','geist.txt'),join(dir,'licenses','geist.txt'));
 const arquivoCss=readdirSync(join(dir,'_astro')).find(f=>f.endsWith('.css')),cssOriginal=readFileSync(join(dir,'_astro',arquivoCss),'utf8');
 writeFileSync(join(dir,'_astro',arquivoCss),cssOriginal+'.x{font-family:Fraunces}');
 assert.throws(()=>checkDesign(dir),/Fonte proibida/);
 writeFileSync(join(dir,'_astro',arquivoCss),cssOriginal+'.link-novo:hover{color:var(--latao)}');
 assert.throws(()=>checkDesign(dir),/Latão fora do lugar/);
 writeFileSync(join(dir,'_astro',arquivoCss),cssOriginal);
 writeFileSync(home,original.replace('<meta name="theme-color" content="#EEF0F2"','<meta name="theme-color" content="#FFFFFF"'));
 assert.throws(()=>checkDesign(dir),/theme-color/);
}));
