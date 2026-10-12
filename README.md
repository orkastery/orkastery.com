# Orkastery: site e documentação

Site estático Astro com português em `/`, inglês em `/en/` e espanhol em `/es/`.
Todas as páginas HTML têm idioma, canonical, alternates recíprocos e seletor para
a mesma página. Os slugs e IDs técnicos permanecem estáveis entre línguas.

## Desenvolvimento e prova local

Requer Node.js 22 e as dependências do lockfile. Com a instalação já preparada,
nenhuma etapa do build acessa a rede. As fontes, fontes tipográficas e ativos são locais.
Em uma instalação nova, `npm ci` prepara dependências; essa preparação exige que
os pacotes estejam disponíveis no cache ou no registry e não faz parte da prova offline.

```sh
npm run dev
npm run build
npm run docs:check
npm run check:links
npm run check:i18n
npm run check:public
npm run check:content
npm run test:docs
npm run test:code
npm run check:code
npm run check:design
```

O prebuild confere o snapshot e a revisão editorial. O postbuild confere HTML,
links, fragmentos, idiomas, metadados, padrões públicos e semântica, e executa
canários negativos. Build aprovado não é revisão visual nem prova de naturalidade
da tradução. Links externos são inventariados, mas não consultados pela prova offline.
`parse5` já integra a árvore do Astro; a mesma versão do lockfile é declarada
diretamente para os auditores de HTML, sem adicionar outro parser.

## Conteúdo e fontes

`src/data/docs-catalog.ts` lista módulos editoriais. Cada artigo tem slug, grupo,
fontes e texto explícito em PT, EN e ES. Não há fallback silencioso ou tradução
remota durante o build. `docs-schema.ts` descreve o formato; o verificador valida
os módulos usados pelas rotas. Os arquivos `.ts` editoriais exportam dados JSON
por default para permitir leitura pelo Astro e por Node sem executar conteúdo.

Uma seção pode ter `highlight` (título, parágrafos, itens e links): o que muda
para quem já usa, renderizado logo abaixo do título da seção com borda e sinal na
cor de alerta. Ele existe na mesma seção das três línguas, ou em nenhuma; o
`docs:check` reprova destaque vazio ou só numa língua. Link interno do catálogo
começa com `/docs/` e vai para a mesma língua, dentro do `base` da prévia.

A versão do CLI que o site descreve fica só em `src/data/release.mjs`. O texto
editorial escreve `{versao}`, que a renderização troca pelo número: para outra
release, troque o número ali e rode `npm run build`, sem revisar texto. O
`check:content` reprova o marcador que sobrar no HTML e procura na home o rótulo
`@orkastery/cli` com a versão.

`src/data/docs-sources.json` contém caminhos relativos, SHA-256, classificação,
tratamento e destinos das fontes. Cada revisão registra hash das fontes, hash
do texto, autor editorial e data. O inventário inclui documentação e metadados de
versão; não copia responsáveis pessoais nem conteúdo interno para o site.

```sh
# Use um clone local do repositório de produto correspondente.
npm run docs:sync -- --source /caminho/do/repositorio
npm run docs:check -- --source /caminho/do/repositorio

# Depois de revisar de fato as traduções e fontes afetadas:
npm run docs:sync -- --source /caminho/do/repositorio --review pt,en,es --reviewer executor-editorial --articles contribuir
npm run build
```

A sincronização comum preserva os recibos anteriores, mas uma fonte alterada
invalida os hashes de revisão; não aprova traduções sozinha. `--review` é uma
atestação editorial explícita de quem executa o comando, não revisão humana
independente. Selecione em `--articles` somente os slugs alterados, separados por vírgula.
Os artigos fora da seleção preservam o revisor, a data e os hashes.
Não use a opção antes de ler os textos. Fonte nova sem destino,
fonte removida ainda referenciada e revisão desatualizada reprovam.

Sem `--source`, o build verifica apenas a integridade e cobertura do snapshot
versionado. Isso permite CI offline, mas não prova que o upstream não mudou.
Índices, modelos e marca têm tratamento explícito; roadmap é exceção deliberada:
um resumo mensal traduzido e um link para o repositório, sem cópia de tickets.

## Revisão mensal do roadmap

Revise `src/data/roadmap.json`, atualize `updatedAt`, `nextReview` e os três resumos.
A página editorial `roadmap` contextualiza o mês em `docs-standards.ts` (Orkastery)
ou `docs-retrieval.ts` (OrkMind): atualize-a na mesma revisão e registre os hashes.
Uma intenção não é uma capacidade entregue. Datas de revisão não são prazos de entrega.

## Código sempre distinto da prosa

Todo comando, flag, caminho, arquivo, variável de ambiente, ferramenta e contrato
citado deve sair como `<code>` ou `<pre><code>`. Em templates, use esses elementos;
em campos editoriais, use `TechnicalText` na renderização. O reconhecedor de
`src/lib/technical-text.mjs` cobre a sintaxe técnica usada pelo catálogo sem alterar
as traduções nem seus hashes. Ele escapa texto simples; `richTechnicalHtml` é
reservado às traduções HTML locais já existentes, nunca a conteúdo remoto.
Para uma sintaxe nova, acrescente um caso explícito ao reconhecedor e um teste,
ou marque o trecho com `<code>` no componente. Não envolva a frase inteira.
O identificador vai inteiro para o código: o `$` de `$CODEX_HOME`, a atribuição de
`ORK_PROJETO_EXPLICITO=1`, a chamada de `semPostgres()`, o curinga de `ork_grafo_*`,
o membro de `runtime_profiles.distribuir` e o comando do `ork` com até dois níveis de
subcomando e os argumentos (`ork setup sandbox confirmar danger-full-access`).

`npm run build` executa `test:code` e `check:code`. O auditor usa o DOM do HTML
final, independentemente do reconhecedor. Reprova comandos soltos de `ork`, `npm`,
`npx`, `git` e `pip`, flags e identificadores técnicos, inclusive em painéis ainda
fechados, entidades HTML e comandos divididos por tags inline. Não há exceção por
pedaço de comando: `ork <code>doctor</code>` também reprova; marque o comando inteiro.
Subcomando do `ork` citado sem o `ork` (“claims add”, “ci prepare”) também reprova:
o texto diz `ork claims add`.
`Node.js`, `projeto-alvo` e “resources unavailable in CI” são prosa; arquivos como
`index.js`, caminhos e contratos com ponto continuam distintos.
Não há exceção por
página ou idioma. `code`/`pre` e metadados não visíveis são os únicos elementos
excluídos. A lista `proseExceptions` em `scripts/check-code.mjs` aceita pares exatos
como “ork core” e “git repository”, descrições do programa em prosa; cada entrada
tem teste que garante que ela não libera o comando seguinte. Os domínios públicos
de contato também têm teste explícito. Novas exceções exigem justificativa e teste.

O código inline é atômico (`inline-block` limitado à largura do texto): um comando
curto nunca se parte entre linhas, e um longo quebra dentro do próprio chip. Como o
navegador abre quebra junto de um elemento atômico mesmo colado a outro caractere, o
`TechnicalText` e o HTML rico põem a sequência não branca que encosta no chip
(parênteses e pontuação) numa unidade sem quebra
(`.code-unit`) com ele. A folga do chip dentro da unidade (`--folga`) acompanha o que
foi colado (pontuação estreita pesa menos que letra ou símbolo), e `check:code` reprova
unidade com mais de 12 caracteres colados, porque ela não encolhe e estouraria a coluna
estreita. Dentro de um link, o código aplica a si
mesmo o sublinhado, também dentro da unidade. Num bloco, todo código usa a mesma
escala; `check:code` reprova a classe `mono` em código dentro de `<p>`, e
`check:design` confere no CSS gerado que o código inline continua atômico e que a
unidade não quebra. Esses canários do CSS só conferem presença de regra; a prova de
layout é a matriz do `check:visual`.

## Identidade e acessibilidade

`src/styles/tokens.css` concentra cores, fontes, espaçamento, raios, sombras e
movimento. Grafite e ciano distinguem a interface; verde marca prova e rosa marca
conflito. O padrão é escuro; o botão de tema oferece uma paleta clara em todas as
páginas e guarda a preferência localmente. Sem JavaScript, o conteúdo permanece
legível no tema escuro. Os nomes antigos dos tokens são aliases de compatibilidade.

Instrument Sans (grotesca variável) atende títulos e prosa, com pesos e escalas
próprios; Geist Mono identifica código. Os WOFF2 Latin são auto-hospedados pelo
build e cobrem PT, EN e ES. Ambas usam SIL OFL 1.1. Fraunces fica restrita à marca
existente: o logo aprovado não foi redesenhado. As três licenças e atribuições
acompanham o bundle em `public/licenses/`. Não há fonte ou script de CDN.

Nós, trilhas paralelas, terminais e uma grade técnica substituem a partitura e
os ícones de instrumentos nos componentes ativos. Onde os chips do ciclo quebram em
linhas (680 px ou menos), a trilha decorativa some junto com os laços, e
`check:design` reprova o CSS gerado que a deixe por cima dos chips. A grade das
páginas vem de uma fonte só, `.container` (`--largura` e `--calha`): cabeçalho,
home, contato, rodapé e docs começam na mesma borda. A cena de colisão é uma
ilustração, não telemetria: mantém o texto real e mostra o relatório contraditório
com texto riscado e “(falso)” para leitores de tela, além da cor. A animação CSS
acompanha a entrada da cena na tela por `animation-timeline: view()`; sem suporte
ou com `prefers-reduced-motion: reduce`, a cena final aparece estática. Os demais
chamados de impacto seguem a mesma linguagem de trilhas e sinais de verificação.

A primeira dobra da home combina texto e recibo ilustrativo: instalação real
copiável, saída de exemplo e SHA fictício identificado. Nenhuma verificação roda
no visitante. O botão de cópia informa sucesso ou falha; sem JavaScript, o comando
continua selecionável. O recibo desce para baixo do texto em telas menores.
Rótulos em caixa de frase usam `--tracking-label: .04em`.

`check:design` mede os pares de texto e fundos dos dois temas (mínimo 4,5:1), código
sobre fundo composto e bordas de controles (mínimo 3:1). Confere temas, licenças,
ornamentos ativos, recursos externos e orçamentos de fontes (200 kB no total) e JS
(45 kB, arquivos mais maior volume inline por página). Isso não substitui a revisão
de contraste e layout no navegador. Títulos e rótulos usam caixa de frase.

O layout documental mantém trilha, sumário, navegação e anterior/próximo. Diagramas
informativos mantêm título, descrição e legenda; blocos de código e tabelas rolam
por dentro, sem alargar a página. Componentes antigos sem importação nas rotas
permanecem no clone; não devem voltar sem revisão das três línguas.

## Prova visual sem rede

Confira a matriz sem iniciar um navegador com `npm run check:visual -- --plan`.
Para capturar, forneça uma instalação local de Playwright e Chromium. Nenhum caminho pessoal
ou navegador é fixado no código ou no lockfile do site.

```sh
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs \
CHROMIUM_EXECUTABLE=/caminho/chromium \
npm run check:visual -- --output /diretorio/privado/screenshots
```

O verificador intercepta todas as requisições, serve somente `dist` em memória e
bloqueia destinos externos. Exercita home, páginas de produto, índice, arquitetura,
contribuição, rede e fronteira de confiança (a página com o destaque do que muda para
quem já usa) nos três idiomas e em 1280, 700 e 390 px, com os dois temas
selecionados de verdade. São 144 capturas de página inteira com movimento reduzido,
feitas a partir do topo, e mais 18 da home com movimento normal: 162 capturas
previstas. A captura com movimento é só da janela visível, com a cena no centro: a de
página inteira, com a página rolada, pintava o link de pular (fixo) no meio da imagem
e numa rodada saiu com a cena fora do estado final. O estilo do estado final (nó de
colisão, trilhas e relatório) é conferido antes da captura e de novo depois dela; a
conferência lê o estilo calculado, não os pixels. Confere overflow, teclado, nome
acessível e persistência do tema, disposição do recibo, cópia (sucesso e recusa
simulados), anúncio do relatório falso, entrada da animação, painéis interativos,
movimento reduzido, código inline sem partir entre linhas, colado ao que encosta nele
(atravessando elementos inline) e numa escala por bloco, sublinhado do link no
código, trilha decorativa fora dos chips quebrados e a mesma borda esquerda para
cabeçalho, conteúdo, contato e rodapé, medida nesses elementos e não pela classe.
`--plan` lista essas verificações em `checks`.
Os PNGs e `report.json` ficam fora do repositório público. Se o navegador não puder
iniciar, o comando falha e registra o impedimento; não muda sandbox nem permissões.
A inspeção humana das imagens ainda é necessária para avaliar qualidade visual.

## Privacidade e publicação

`check:public` procura padrões de dados pessoais e credenciais em fontes e saída,
sem imprimir o valor encontrado. O email institucional de contato é uma exceção
explícita; a busca não substitui revisão contextual. O formulário apenas prepara
um email no aplicativo do visitante; não tem backend de coleta.

O workflow `.github/workflows/publicar.yml` publica somente por tag (`producao-*` ou
`validacao-*`), pelo apagamento de uma tag `validacao-*` ou por execução manual, e
sempre a publicação composta descrita em "Prévia de uma release". Um commit local
ou um push na `main` não publica. A reversão operacional é promover uma revisão
anteriormente validada, com autorização do responsável.

## Prévia de uma release

Cada release em validação sai no domínio do próprio site, em
`https://orkastery.com/releasevalidation/<release>/`, antes de qualquer promoção. A publicação
no GitHub Pages é sempre composta: a raiz é a build da última tag `producao-AAAAMMDD-HHMM`
(a produção aprovada) e cada tag `validacao-<release>` ativa vira uma prévia, compilada
com `base` `/releasevalidation/<release>/`. Uma prévia nova não muda a raiz; uma promoção
nova mantém as prévias.

Para abrir a prévia de um commit revisado:

```sh
git tag validacao-<release> <sha> && git push origin validacao-<release>
```

A release aceita letras, números, ponto, sublinhado e hífen, começando por letra ou
número (`0.5.5`, `0.6.0-rc.1`); na ordem das prévias, um sufixo como `-rc.1` conta como
anterior à versão final. O push da tag dispara `.github/workflows/publicar.yml`. Envie uma
tag por push: o GitHub não dispara o workflow quando mais de três tags chegam juntas. O
commit precisa ter a regra da prévia (`src/lib/previa.mjs`).

No push da tag, o GitHub roda o workflow e o motor (`scripts/publicar.mjs`) do próprio
commit marcado, que montam a publicação inteira, raiz inclusive, e as builds rodam o código
dele no mesmo job. Só marque commit revisado: quem pode criar tag pode mudar o site. Para
exigir aprovação antes de cada deploy, o dono pode pôr revisor obrigatório no ambiente
`github-pages` ou um ruleset nas tags `producao-*` e `validacao-*`.

Na prévia, todo link interno, asset, canonical, alternates, seletor de língua e o
`versao.json` ficam dentro do `base`; toda página tem `noindex, nofollow` e, no topo, a
faixa "Prévia da release <release>, não publicada" com o SHA do commit. O `robots.txt` da
raiz bloqueia `/releasevalidation/`, e a prévia não entra em sitemap da produção. Os dois
bloqueios juntos têm um custo: o robô que respeita o `robots.txt` nem lê o `noindex`, então
o endereço de uma prévia que vazar ainda pode aparecer numa busca, sem o conteúdo. O
commit publicado se confere em `/releasevalidation/<release>/versao.json`, que traz
`release` e `sha`.

Para tirar uma prévia do ar, apague a tag no remoto:

```sh
git push origin --delete validacao-<release>
```

O apagamento dispara a publicação de novo, já sem a prévia (apagar mais de três tags
de uma vez não dispara; nesse caso, rode à mão). Apague também a tag local
(`git tag -d validacao-<release>`), senão um envio de todas as tags a traz de volta.
Para recompor à mão, rode o workflow "Publicar" pela aba Actions, na `main`. Há também
um teto: ficam no ar as 5 prévias mais novas pela ordem de versão
(`git -c versionsort.suffix=- tag --sort=-v:refname`), ajustável por `PREVIAS_MAXIMO`
no workflow.

Só o dono promove para a raiz, criando `producao-AAAAMMDD-HHMM` no commit que validou
pela prévia. Uma prévia verde não é aprovação. A raiz é sempre a maior tag
`producao-AAAAMMDD-HHMM` pelo nome; tag `producao-*` fora desse padrão é ignorada. Os nomes
seguem o mesmo fuso das tags que já existem. No push de uma tag `producao-*` que não vira a
raiz (nome menor que o da maior, ou fora do padrão), a execução reprova e nada muda no ar;
o mesmo vale para uma tag `validacao-*` que fique fora do teto. As execuções esperam na
fila do Pages, uma depois da outra, sem que uma descarte a outra; depois de corrigir uma
tag recusada, rode o workflow à mão para recompor. Para reverter, crie uma tag
`producao-*` nova no commit anterior. Apagar uma tag `producao-*` não republica sozinho: a
raiz só muda na publicação seguinte, para a maior tag que restar. Promover ou reverter para
um commit anterior a esta regra usa o workflow antigo daquele commit, que publica só a
raiz: as prévias saem do ar até a próxima publicação composta.

O ambiente `github-pages` do repositório precisa aceitar as tags `validacao-*` na
política de deploy, configuração feita pelo dono; sem isso, a execução disparada pela
tag para no job `publicar`. Se a build de qualquer árvore falhar, ou a conferência da
árvore montada reprovar, nada é publicado e o site no ar fica como estava: uma prévia
ativa que não compila segura toda publicação, promoção inclusive, até a tag dela sair.

Prova local:

```sh
npm run build
SITE_BASE=/releasevalidation/0.5.5/ npm run build
npm run test:publicar
node scripts/publicar.mjs --ensaio
node scripts/publicar.mjs --saida /tmp/publicacao
```

A build de produção termina com `test:previa`: compila uma prévia de exemplo a partir
da árvore de trabalho, monta a árvore com o `dist` de produção e confere raiz, prévia,
`noindex`, faixa, `robots.txt`, `versao.json` e links, com canários que reprovam cada
desvio. A segunda linha compila uma prévia com todas as checagens do postbuild em modo
`base` (`SITE_BASE` só aceita `/` e `/releasevalidation/<release>/`). `test:publicar`
ensaia o motor (`scripts/publicar.mjs`) num repositório Git temporário com tags de
verdade. As duas últimas usam as tags deste clone: `--ensaio` mostra o que seria
publicado, e `--saida` monta e confere a árvore; o `npm ci` dos commits cujo
`package-lock.json` difere do clone precisa de rede. Para iterar mais rápido,
`SITE_TESTE_PREVIA=0 npm run build` pula a árvore composta do `test:previa` (os testes da
regra continuam). O `check:visual` continua servindo só a build de produção; a prévia se
confere pelo `test:previa` e abrindo a URL dela.
