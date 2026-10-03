import {test} from 'node:test';
import assert from 'node:assert/strict';
import {violations,proseExceptions} from './check-code.mjs';
import {technicalHtml,richTechnicalHtml} from '../src/lib/technical-text.mjs';
import {checkCode} from './check-code.mjs';
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
 assert.equal(technicalHtml('Run ork verify <thread>.'),'Run <code>ork verify &lt;thread&gt;</code>.');
 assert.equal(technicalHtml('<script>alert(1)</script>'),'&lt;script&gt;alert(1)&lt;/script&gt;');
 assert.equal(technicalHtml('Orkastery · AI Software Factory'),'Orkastery · AI Software Factory');
});
test('existing rich content keeps code semantic without double wrapping',()=>{
 assert.equal(richTechnicalHtml('<strong>Run ork doctor.</strong> <code>npm test</code>'),'<strong>Run <code>ork doctor</code>.</strong> <code>npm test</code>');
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
 assert.equal(technicalHtml('pgvector/pgvector:pg16.'),'<code>pgvector/pgvector:pg16</code>.');
 assert.equal(technicalHtml('git remote -v'),'<code>git remote -v</code>');
 assert.equal(technicalHtml('npm --prefix core run test:ci'),'<code>npm --prefix core run test:ci</code>');
 assert.equal(technicalHtml('<dir>/plugins/orkastery'),'<code>&lt;dir&gt;/plugins/orkastery</code>');
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

test('multiword subcommands do not leave their command suffix as prose',()=>{
 for(const command of ['ork docs sincronizar','ork brain context','ork network roadmap','ork sessions limpar-fantasmas','ork prompt lint','ork roadmap feat'])assert.equal(technicalHtml(command),`<code>${command}</code>`);
});
