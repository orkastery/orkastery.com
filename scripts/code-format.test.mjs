import {test} from 'node:test';
import assert from 'node:assert/strict';
import {violations,proseExceptions,scaleViolations,glueViolations} from './check-code.mjs';
import {technicalHtml,richTechnicalHtml,technicalUnits} from '../src/lib/technical-text.mjs';
import {checkCode} from './check-code.mjs';
import {versao,comVersao,marcadorDeVersao} from '../src/data/release.mjs';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

test('commands in PT, EN and ES must be code, including unknown verbs',()=>{
 for(const sentence of ['Execute ork fabrica entrar agora.','Run npm install today.','Ejecute git ls-remote ahora.','Use npx astro build.','Use pip install astro.','Execute ork futuro.'])assert.ok(violations(`<p>${sentence}</p>`).length);
});
test('inline tags, entities, flags, filenames, tools and contracts are audited',()=>{
 for(const html of ['<p>ork <em>fabrica</em> entrar</p>','<p>git&#32;status</p>','<p>--json</p>','<p>ORK_PROJECT</p>','<p>ork_thread_status</p>','<p>AGENTS.md</p>','<p>ork.rede/v1</p>','<p aria-hidden="true">npm test</p>','<details><p>ork doctor</p></details>'])assert.ok(violations(html).length,html);
});
test('only code/pre and non-rendered metadata are exempt; no crossing block boundaries',()=>{
 assert.deepEqual(violations('<head><title>ork doctor</title></head><body><script>npm test</script><style>git status</style><code><em>ork doctor</em></code><pre>npm test</pre><template>pip install x</template><p>ork</p><p>doctor</p>'),[]);
});
test('bare executables immediately before inline code are rejected',()=>{
 for(const executable of ['ork','npm','npx','git','pip','pip3']){
  for(const suffix of [' <code>doctor</code>',' <strong><code>doctor</code></strong>','&#32;<code>doctor</code>','<code>doctor</code>']){
   assert.deepEqual(violations(`<p><em>${executable}</em>${suffix}</p>`),[executable]);
  }
  assert.deepEqual(violations(`<p><code>${executable} doctor</code></p>`),[]);
  assert.deepEqual(violations(`<p>${executable}</p><p><code>doctor</code></p>`),[]);
 }
});
test('every prose exception is exact and cannot hide the following command',()=>{
 assert.equal(new Set(proseExceptions).size,proseExceptions.length);
 for(const phrase of proseExceptions){assert.deepEqual(violations(`<p>${phrase}</p>`),[]);assert.deepEqual(violations(`<p>${phrase}; ork doctor</p>`),['ork doctor']);}
});
test('technical rendering preserves prose and escapes markup',()=>{
 assert.equal(technicalHtml('A fábrica usa ork fabrica entrar para publicar.'),'A fábrica usa <code>ork fabrica entrar</code> para publicar.');
 assert.equal(technicalHtml('Run ork verify <thread>.'),'Run <span class="code-unit" style="--folga:0.6ch"><code>ork verify &lt;thread&gt;</code>.</span>');
 assert.equal(technicalHtml('<script>alert(1)</script>'),'&lt;script&gt;alert(1)&lt;/script&gt;');
 assert.equal(technicalHtml('Orkastery · AI Software Factory'),'Orkastery · AI Software Factory');
});
test('existing rich content keeps code semantic without double wrapping',()=>{
 assert.equal(richTechnicalHtml('<strong>Run ork doctor.</strong> <code>npm test</code>'),'<strong>Run <span class="code-unit" style="--folga:0.6ch"><code>ork doctor</code>.</span></strong> <code>npm test</code>');
});
test('ordinary prose and product names are not technical syntax',()=>{
 for(const text of ['resources unavailable in CI','projeto-alvo','Node.js']){
  assert.equal(technicalHtml(text),text);
  assert.deepEqual(violations(`<p>${text}</p>`),[]);
 }
 for(const token of ['check-code.mjs','index.js','Component.js','ork.rede-maquina/v1','roadmap.remoto-invalido','--dry-run','src/Node.js']){
  assert.equal(technicalHtml(token),`<code>${token}</code>`);
 }
});

test('paths, field names and public domains are distinguished',()=>{
 for(const token of ['owner.language','rotate_above','origin/main','/usr/bin/codex','tools/list','@orkastery/cli','orkmind.company-brain/v1']){
  assert.ok(violations(`<p>${token}</p>`).length,token);
  assert.deepEqual(violations(`<p>${technicalHtml(token)}</p>`),[],token);
 }
 assert.deepEqual(violations('<p>maestro@orkastery.com · orkmind.com</p>'),[]);
});
test('full command placeholders, single flags and rich markup stay intact',()=>{
 assert.equal(technicalHtml('ork worktree ensure <thread>'),'<code>ork worktree ensure &lt;thread&gt;</code>');
 assert.equal(technicalHtml('pgvector/pgvector:pg16.'),'<span class="code-unit" style="--folga:0.6ch"><code>pgvector/pgvector:pg16</code>.</span>');
 assert.equal(technicalHtml('git remote -v'),'<code>git remote -v</code>');
 assert.equal(technicalHtml('npm --prefix core run test:ci'),'<code>npm --prefix core run test:ci</code>');
 assert.equal(technicalHtml('<dir>/plugins/orkastery'),'<code>&lt;dir&gt;/plugins/orkastery</code>');
});

test('commands and identifiers from the quickstart text are whole code',()=>{
 for(const token of ['ork accounts esgotamentos --desde 7d','ork lease acquire','ork ship registrar-pr','npm --prefix core ci','prs.sem-leitura','estado.worktree-nao-registrada']){
  assert.equal(technicalHtml(token),`<code>${token}</code>`,token);
  assert.deepEqual(violations(`<p>${technicalHtml(token)}</p>`),[],token);
 }
 assert.equal(technicalHtml('com o ork chamado da raiz'),'com o ork chamado da raiz');
});
test('rendered-directory audit rejects a regression then accepts the semantic repair',()=>{
 const dir=mkdtempSync(join(tmpdir(),'site-code-'));
 try{
  writeFileSync(join(dir,'index.html'),'<p>A fábrica usa ork <strong>fabrica</strong> entrar.</p>');
  assert.throws(()=>checkCode(dir),/Technical text outside code/);
  writeFileSync(join(dir,'index.html'),'<p>A fábrica usa <code>ork fabrica entrar</code>.</p>');
  assert.equal(checkCode(dir).unformatted,0);
 }finally{rmSync(dir,{recursive:true,force:true});}
});

test('adjacent non-space text travels with inline code in one unit',()=>{
 assert.deepEqual(technicalUnits('Com Claude Code (claude-bg) e Codex.'),[{text:'Com Claude Code '},{open:'(',code:'claude-bg',close:')'},{text:' e Codex.'}]);
 assert.deepEqual(technicalUnits('Use ork doctor e siga.'),[{text:'Use '},{open:'',code:'ork doctor',close:''},{text:' e siga.'}]);
 // O identificador inteiro vai para o codigo: o $ da variavel, a atribuicao, a chamada e o membro.
 assert.equal(technicalHtml('Fica em $CODEX_HOME/sessions hoje.'),'Fica em <code>$CODEX_HOME/sessions</code> hoje.');
 assert.equal(technicalHtml('Com ORK_PROJETO_EXPLICITO=1, devolve a escolha.'),'Com <span class="code-unit" style="--folga:0.6ch"><code>ORK_PROJETO_EXPLICITO=1</code>,</span> devolve a escolha.');
 assert.equal(technicalHtml('ORK_REDE_LER=0 desliga'),'<code>ORK_REDE_LER=0</code> desliga');
 assert.equal(technicalHtml('pula com semPostgres() e semCodexSandbox().'),'pula com <code>semPostgres()</code> e <span class="code-unit" style="--folga:0.6ch"><code>semCodexSandbox()</code>.</span>');
 assert.equal(technicalHtml('use runtime_profiles.distribuir no manifesto'),'use <code>runtime_profiles.distribuir</code> no manifesto');
 assert.equal(technicalHtml('o $ sozinho e o preço R$ 10 seguem prosa'),'o $ sozinho e o preço R$ 10 seguem prosa');
 assert.equal(technicalHtml('Com ORK_TESTE_EXIGE_AMBIENTE=1, nada cai.'),'Com <span class="code-unit" style="--folga:0.6ch"><code>ORK_TESTE_EXIGE_AMBIENTE=1</code>,</span> nada cai.');
 assert.equal(technicalHtml('Usa semPostgres() aqui.'),'Usa <code>semPostgres()</code> aqui.');
 assert.equal(technicalHtml('As ork_grafo_* respondem.'),'As <code>ork_grafo_*</code> respondem.');
 // Pontuacao estreita pesa menos na folga que letra ou simbolo; a folga tem teto de 12.
 assert.match(technicalHtml('Veja (memory.query.scope-violation), depois.'),/--folga:1\.8ch/);
 // Codigo que ja vinha no HTML revisado tambem recebe a unidade, sem embrulhar duas vezes.
 const rich=richTechnicalHtml('<p>Com Claude Code (<code>claude-bg</code>) e Codex (<code>codex</code>).</p>');
 assert.equal(rich,'<p>Com Claude Code <span class="code-unit" style="--folga:1.2ch">(<code>claude-bg</code>)</span> e Codex <span class="code-unit" style="--folga:1.8ch">(<code>codex</code>).</span></p>');
 assert.equal(richTechnicalHtml(rich),rich);
 assert.equal(richTechnicalHtml('<p><span class="code-unit x">(<code>a</code>)</span></p>'),'<p><span class="code-unit x">(<code>a</code>)</span></p>');
 assert.equal(technicalHtml('Edite (core/package.json)?'),'Edite <span class="code-unit" style="--folga:2.2ch">(<code>core/package.json</code>)?</span>');
 // A unidade e inline: o auditor de prosa continua lendo o comando inteiro.
 assert.deepEqual(violations(`<p>${rich}</p>`),[]);
 assert.deepEqual(violations('<p>Rode ork <span class="code-unit"><code>doctor</code>.</span></p>'),['ork']);
});

test('a unit that glues more than 12 characters fails the code audit',()=>{
 // A unidade nao encolhe: colada a uma sequencia longa, estouraria a coluna estreita.
 const longa=technicalHtml('Veja ork_x/'+'a'.repeat(30)+' depois.');
 assert.match(longa,/--folga:12ch/);
 assert.equal(glueViolations(`<p>${longa}</p>`).length,1);
 assert.deepEqual(glueViolations(`<p>${technicalHtml('Fica em $CODEX_HOME/sessions hoje.')}</p>`),[]);
 assert.deepEqual(glueViolations(`<p>${technicalHtml('Com ORK_TESTE_EXIGE_AMBIENTE=1, nada cai.')}</p>`),[]);
 const dir=mkdtempSync(join(tmpdir(),'site-code-glue-'));
 try{
  writeFileSync(join(dir,'index.html'),`<p>${longa}</p>`);
  assert.throws(()=>checkCode(dir),/glues more than 12 characters/);
  writeFileSync(join(dir,'index.html'),'<p>Veja <code>ork_x/'+'a'.repeat(30)+'</code> depois.</p>');
  assert.equal(checkCode(dir).longCodeUnits,0);
 }finally{rmSync(dir,{recursive:true,force:true});}
});

test('inline code inside a paragraph keeps the shared type scale',()=>{
 assert.deepEqual(scaleViolations('<p>Com <code>codex</code>, pelo <code class="mono">ork setup</code>.</p>'),['<code class="mono">']);
 assert.deepEqual(scaleViolations('<p>Com <code>codex</code>, pelo <strong><code class="mono x">ork setup</code></strong>.</p>'),['<code class="mono x">']);
 assert.deepEqual(scaleViolations('<p>Com <code>codex</code>, pelo <code>ork setup</code>.</p>'),[]);
 // Rotulos de cartao fora do texto corrido podem manter a propria escala.
 assert.deepEqual(scaleViolations('<ul><li><code class="mono lease-nome">main-tree</code></li></ul>'),[]);
 const dir=mkdtempSync(join(tmpdir(),'site-code-scale-'));
 try{
  writeFileSync(join(dir,'index.html'),'<p>Configure com <code class="mono">ork setup</code>.</p>');
  assert.throws(()=>checkCode(dir),/own type scale/);
  writeFileSync(join(dir,'index.html'),'<p>Configure com <code>ork setup</code>.</p>');
  assert.equal(checkCode(dir).scaledInlineCode,0);
 }finally{rmSync(dir,{recursive:true,force:true});}
});

test('multiword subcommands do not leave their command suffix as prose',()=>{
 for(const command of ['ork docs sincronizar','ork brain context','ork network roadmap','ork sessions limpar-fantasmas','ork prompt lint','ork roadmap feat'])assert.equal(technicalHtml(command),`<code>${command}</code>`);
});

test('the CLI version lives in one module and the editorial marker becomes that number',()=>{
 assert.match(versao,/^[0-9]+[.][0-9]+[.][0-9]+$/);
 assert.equal(marcadorDeVersao,'{versao}');
 assert.equal(comVersao('versão {versao}; de novo {versao}.'),`versão ${versao}; de novo ${versao}.`);
 assert.equal(comVersao('outro marcador {versão} fica'),'outro marcador {versão} fica');
 assert.equal(technicalHtml(comVersao('Instale @orkastery/cli e use a {versao}.')),`Instale <code>@orkastery/cli</code> e use a ${versao}.`);
});

test('three-level ork commands, git rm with a path and node with an ork subcommand stay whole',()=>{
 for(const token of ['ork setup sandbox confirmar danger-full-access','ork setup worktree confirmar','ork master digest enviar','ork audit finding add','ork adapter install claude-code','ork_*','ork-ponte','ork-torre','ork-clima','/torre','/clima','session.measure','ork audit verify','ork handoff recall','danger-full-access','ork claims conferir --claims C3,C7','ork claims conferir --tarefa T2.1','ork docs sincronizar --escrever --so RM-059','git rm -r --cached .orkastery','node core/dist/index.js eval','ork master ork-rm059torre --aceitar-omissao']){
  assert.equal(technicalHtml(token),`<code>${token}</code>`,token);
 }
 assert.equal(technicalHtml('Rode git status e veja.'),'Rode <code>git status</code> e veja.');
 assert.equal(technicalHtml('crie o remoto com git remote add e ponha'),'crie o remoto com <code>git remote add</code> e ponha');
 // Um segundo nivel generico engolia o verbo da prosa: o comando termina onde a referencia termina.
 assert.equal(technicalHtml('ork roadmap status show the time'),'<code>ork roadmap status</code> show the time');
 assert.equal(technicalHtml('e ork ship entrega essa branch'),'e <code>ork ship</code> entrega essa branch');
 assert.equal(technicalHtml('ork experiencia uninstall remove o bloco'),'<code>ork experiencia uninstall</code> remove o bloco');
 assert.equal(technicalHtml('Abra /torre no Claude Code; e/ou siga.'),'Abra <code>/torre</code> no Claude Code; e/ou siga.');
 assert.equal(technicalHtml('Use ork thread status para ver.'),'Use <code>ork thread status</code> para ver.');
});

test('an ork subcommand quoted without ork fails the code audit, in prose of any language',()=>{
 assert.deepEqual(violations('<p>O lint avisa em claims add e ci prepare recusa.</p>'),['ork? claims add','ork? ci prepare']);
 assert.deepEqual(violations('<p>Then ci run dispatches; ship registrar-pr records it.</p>'),['ork? ci run','ork? ship registrar-pr']);
 assert.deepEqual(violations('<p>Then ci  run, again.</p>'),['ork? ci  run']);
 // Par que uma frase comum forma fica de fora; letra colada antes ou depois não é o comando.
 assert.deepEqual(violations('<p>Check the thread status. Antes de a thread entrar no GO. Each phase run, the memory search, a lease release, la worktree status, a retry run, the adapter install step.</p>'),[]);
 assert.deepEqual(violations('<p>xclaims add, claims addx, ci preparex.</p>'),[]);
 assert.deepEqual(violations('<p>'+technicalHtml('O lint avisa em ork claims add e ork ci prepare recusa.')+'</p>'),[]);
 assert.deepEqual(violations('<p>a thread nova, o status da thread e o pacote de contexto</p>'),[]);
 assert.deepEqual(violations('<p>ork <em>claims</em> add</p>'),['ork claims']);
});

test('a command split between code and prose fails the code audit',()=>{
 assert.deepEqual(violations('<p>Use <code>ork claims</code> conferir agora.</p>'),['partido: ork claims + conferir']);
 assert.deepEqual(violations('<p>Rode <code>ork docs sincronizar --escrever --so</code> RM-NNN.</p>'),['partido: ork docs sincronizar --escrever --so + RM-NNN']);
 assert.deepEqual(violations('<p>Rode node <code>--test</code> no arquivo.</p>'),['partido: node + --test']);
 assert.deepEqual(violations('<p>Use <span class="code-unit">(<code>ork claims</code></span> conferir).</p>'),['partido: ork claims + conferir']);
 assert.deepEqual(violations('<p>Rode node <span class="code-unit"><code>--test</code>,</span> e siga.</p>'),['partido: node + --test']);
 // Dois comandos como sujeito, verbo no plural: inglês comum, não comando partido.
 for(const s of ['ork pulse and ork roadmap status show the time','ork memory status and ork memory index show it per collection','ork claims add and ork ci prepare run the same lint','ork pulse and ork board show the time'])assert.deepEqual(violations('<p>'+technicalHtml(s)+'</p>'),[],s);
 assert.deepEqual(violations('<p>Use <code>ork claims add</code> agora e <code>ork verify</code> depois.</p>'),[]);
 assert.deepEqual(violations('<p>e '+technicalHtml('ork ship')+' entrega essa branch</p>'),[]);
 assert.deepEqual(violations('<p>'+technicalHtml('Rode node --test no arquivo e ork docs sincronizar --escrever --so RM-NNN.')+'</p>'),[]);
});

test('identifiers from the review stay whole, and prose abbreviations stay prose for the auditor',()=>{
 for(const token of ['ork thread entrega <id>','ork setup sandbox revogar','ork setup worktree revogar','ork master digest preview','ork sessions logs <id>','ork roadmap pegar RM-031','ork docs sincronizar --escrever --so RM-NNN','node --test','node --test-reporter=tap scripts/x.test.mjs','.orkastery/','$HOME','PATH','LANG','/orkastery:goal','$ork','runtime_profile_x()']){
  assert.equal(technicalHtml(token),`<code>${token.replace('<','&lt;').replace('>','&gt;')}</code>`,token);
 }
 assert.equal(technicalHtml('e ork ship entrega essa branch'),'e <code>ork ship</code> entrega essa branch');
 // logs, ausente e pegar só depois do verbo deles.
 assert.equal(technicalHtml('ork verify logs each command'),'<code>ork verify</code> logs each command');
 assert.equal(technicalHtml('com o ork mcp ausente'),'com o <code>ork mcp</code> ausente');
 assert.equal(technicalHtml('use ork claims ausente'),'use <code>ork claims ausente</code>');
 assert.equal(technicalHtml('ork phase list --worktree DIR e --teto-bytes N.'),'<code>ork phase list --worktree DIR</code> e <span class="code-unit" style="--folga:0.6ch"><code>--teto-bytes N</code>.</span>');
 // O auditor também guarda esses identificadores, não só o reconhecedor.
 assert.deepEqual(violations('<p>cwd no $HOME e no PATH, (LANG), /orkastery:goal e $ork.</p>'),['$HOME','PATH','LANG','/orkastery:goal','$ork']);
 for(const text of ['Use a short name, e.g. demo','that is, i.e. now']){assert.equal(technicalHtml(text),text);assert.ok(violations(`<p>${text}</p>`).length,text);}
});
