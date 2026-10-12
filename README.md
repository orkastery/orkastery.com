# Orkastery: site e documentação

Site estático Astro com português em `/` e inglês em `/en/`. Todas as páginas HTML
têm idioma, canonical, alternates recíprocos e seletor para a mesma página. Os slugs
e IDs técnicos permanecem estáveis entre as duas línguas.

O espanhol saiu do site por decisão do dono. Cada URL `/es/` que existia antes
(lista em `src/data/es-legado.json`) continua respondendo com uma página estática que
leva ao mesmo caminho em `/en/`: refresh, canonical para o destino e `noindex`, e um
script que leva também o fragmento. `check:redirecionamentos` confere cada uma na build,
e `test:redirecionamentos` tem os canários (sem `noindex`, destino errado, página em
espanhol de volta, link ou `hreflang` para `/es/`).

O visual é o design que o dono fez no Claude Design ("Orkastery Home"): a home o
reproduz seção por seção, e o resto do site (docs, contribuir, páginas de produto e as
duas línguas) usa o mesmo design system, descrito em "Design system".

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
npm run check:code
npm run check:design
npm run test:docs
npm run test:code
npm run test:design
```

O prebuild confere o snapshot e a revisão editorial. O postbuild confere HTML,
links, fragmentos, idiomas, metadados, padrões públicos, semântica, texto técnico
formatado como código, o design system (tokens, contraste e CSS gerado) e a lógica
da home contra a do design, e executa canários negativos. Build aprovado não é
revisão visual nem prova de naturalidade da tradução: a prova visual é o
`check:visual` e o `check:fidelity`, com navegador. Links externos são
inventariados, mas não consultados pela prova offline. `parse5` já integra a árvore
do Astro; a mesma versão do lockfile é declarada diretamente para os auditores de
HTML, sem adicionar outro parser.

## Design system

A fonte única dos tokens é `src/data/design-system.json`, com os valores tirados do
HTML do design do dono. `npm run tokens` (`scripts/design-tokens.mjs`) gera
`src/styles/tokens.css` a partir dele; não edite o CSS à mão. O `check:design`
reprova o CSS fora de sincronia, confere o contraste AA de 42 pares de texto dos
tokens, a ausência de asset externo e de fonte do visual antigo, as licenças das
fontes, a regra do código inline inteiro no CSS gerado e o orçamento de JS e fontes.

O JSON tem duas camadas:

- `identidade`: o que muda de uma marca para outra. Cores por papel (`tinta`,
  `papel`, `acento`, `ok`, `info`, `alerta`, `noite` e as variantes), as três
  famílias tipográficas e os arquivos de marca em `public/marca/`.
- `estrutura`: o que vale para qualquer marca da família. Escala tipográfica
  (`--tipo-*`, com o `tracking` de cada uma), espaço, padding das seções, raios,
  sombras, linhas, movimento, contêiner (1200 px de conteúdo com a calha
  `clamp(20px,4vw,40px)`) e as larguras de referência (1440, 1280, 1024, 768, 390 e 320).

Os componentes saem dos blocos do design e usam só os tokens:

| Componente | Arquivo | Bloco do design |
| --- | --- | --- |
| `SiteHeader` | `src/components/SiteHeader.astro` | cabeçalho fixo, translúcido, com navegação de prioridade |
| `LanguageSelector` | `src/components/LanguageSelector.astro` | seletor de língua em pílula |
| `SiteFooter` | `src/components/SiteFooter.astro` | rodapé escuro com frase, colunas e linha final |
| `Eyebrow` e `SectionHead` | `src/components/ds/` | sobretítulo, h2 com continuação em cinza e parágrafo |
| `Divider` | `src/components/ds/Divider.astro` | fio em degradê com o ponto de latão |
| `InstallButton` | `src/components/ds/InstallButton.astro` | botão que copia o comando, nas variantes hero, cartão e noite |

Classes globais em `src/styles/base.css`: `.container`, `.sobretitulo`, `.secao-padrao`,
`.holofote` (o brilho que segue o mouse, com `data-holofote`), `.codigo-liso` (código
sem chip, na letra de quem o contém) e o código inline no estilo do chip.

Para outro site da família (por exemplo, o do OrkMind) reaproveitar a estrutura e
trocar só a identidade: copie `src/data/design-system.json`, `scripts/design-tokens.mjs`,
`src/styles/base.css`, `src/styles/fonts.css` e os componentes acima; troque os
valores de `identidade.cores` (os nomes são papéis, não cores: `acento` pode deixar
de ser latão), as famílias de `identidade.fontes` (e os pacotes em `fonts.css` e em
`package.json`, com as licenças em `public/licenses/`) e os SVGs de `identidade.marca`;
rode `npm run tokens`. A estrutura, os componentes e as checagens seguem iguais, e o
`check:design` já confere o contraste dos pares com as cores novas.

As fontes são Geist, Hanken Grotesk e IBM Plex Mono, pelos pacotes
`@fontsource-variable/geist`, `@fontsource-variable/hanken-grotesk` e
`@fontsource/ibm-plex-mono` na versão 5.3.0, fixada: são os mesmos arquivos, byte a
byte, que o HTML do design embutia. As licenças OFL ficam em `public/licenses/`.

Desvios do design, cada um com motivo (lista em `desvios`, no JSON): rótulo pequeno
no cinza `tinta-4-aa` em vez de `tinta-4` (contraste AA); comando inteiro no botão de
instalação, com a pílula descendo de linha no estreito (regra do código inteiro);
botões do cabeçalho que somem inteiros no estreito em vez de ficar cortados; PT, EN e
ES no seletor; comando e identificador na prosa como código; o endereço de contato
institucional; e grades que no estreito estourariam a tela passam a refluir.

## A home

`src/components/HomePage.astro` compõe as seções de `src/components/home/` na ordem do
design: hero com a partitura, runtimes, 01 a 08 e a chamada final. O texto mora em
`src/data/home.ts`: o PT é o do design, palavra por palavra; o EN é tradução no
mesmo tom; comandos e identificadores ficam iguais nas duas línguas. Os números da
seção Prova e a lacuna publicada seguem o README do núcleo, não um valor solto.

A lógica do script do design virou funções puras em `src/lib/home-state.mjs` (board,
topologia, fila, roadmap, noite, modos, fases e alternativas), e o canvas da partitura
está em `src/lib/partitura.mjs`, com a mesma ordem de `Math.random`. O build renderiza o
estado inicial do design; `src/scripts/home.ts` recalcula com as mesmas funções (relógio
de 2,4 s, cliques, rolagem). `test:design` confere que essas funções dão o mesmo estado
que o script do design em 25 tiques, na noite, nos modos, nas fases e nas alternativas
(`scripts/fidelidade/estado-do-design.json`).

Com movimento reduzido, nada se move sozinho: animações paradas, partitura parada, sem
revelação ao rolar e sem o relógio de 2,4 s. Os modos são botões com `aria-pressed`, as
fases são abas (com setas, Home e End), a alternativa escolhida tem `aria-pressed`, e o
botão de instalação anuncia o resultado da cópia para leitor de tela.

## Conteúdo e fontes

`src/data/docs-catalog.ts` lista módulos editoriais. Cada artigo tem slug, grupo,
fontes e texto explícito em PT e EN. Não há fallback silencioso ou tradução
remota durante o build. `docs-schema.ts` descreve o formato; o verificador valida
os módulos usados pelas rotas. Os arquivos `.ts` editoriais exportam dados JSON
por default para permitir leitura pelo Astro e por Node sem executar conteúdo.

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

## Versão do CLI

A versão do CLI que o site descreve fica só em `src/data/release.mjs`. O texto
editorial escreve `{versao}`, que a renderização troca pelo número, para duas coisas
ao mesmo tempo: a versão que esta revisão das docs descreve e a release em que entram
as mudanças desta revisão ("na versão {versao}"). Se o número desta mesma release
mudar antes de ela sair, troque-o ali e rode `npm run build`, sem revisar texto. Ao
passar para a release seguinte, troque antes o marcador pelo número publicado nas
frases do que já saiu e registre a revisão desses artigos; senão uma mudança antiga
passaria a constar como da release nova. O `check:content` reprova o marcador que
sobrar no HTML e procura na home o rótulo `@orkastery/cli` com a versão.

## Código no texto

Comando, caminho, flag e identificador técnico ficam sempre como código e inteiros, sem
quebrar no meio da linha. O reconhecedor `src/lib/technical-text.mjs`, usado pelo
componente `TechnicalText`, põe esse texto em `<code>` no build; o que encosta no código
(parêntese, ponto, sufixo colado) viaja junto numa unidade sem quebra. O `check:code`
audita o HTML gerado: reprova comando, flag, caminho ou identificador fora de código, e
subcomando do `ork` sem o `ork`. As poucas frases em que `ork` é o sujeito da frase
(como "o ork reserva") estão numa lista exata de exceções de prosa. No visual, o código
inline é o chip do design; o código que o design já mostra em mono (terminal, rótulos)
usa `.codigo-liso`, sem chip.

## Tipografia, caixa e diagramas

Títulos em Geist, texto em Hanken Grotesk e código em IBM Plex Mono, com a escala dos
tokens `--tipo-*`. Títulos, menus, links, botões e rótulos usam caixa de frase; o
sobretítulo em mono maiúsculo é desenho do design. Siglas, comandos e nomes próprios
conservam a grafia original.

O layout documental tem trilha, sumário, navegação por assunto e anterior/próximo, em
cartões brancos sobre o papel. SVGs têm title, desc, relações numeradas e legenda
textual; a leitura não depende só da cor. O site tem um tema só, o claro do design, com
as seções escuras que o próprio design desenha.

## Prova visual sem rede

Forneça uma instalação local de Playwright e Chromium. Nenhum caminho pessoal
ou navegador é fixado no código ou no lockfile do site.

```sh
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs \
CHROMIUM_EXECUTABLE=/caminho/chromium \
npm run check:visual -- --output /diretorio/privado/screenshots
```

O verificador intercepta todas as requisições, serve somente `dist` em memória e
bloqueia destinos externos. Exercita home, `/ork/`, `/orkmind/`, o índice das docs e três
artigos nas três línguas, a 1440, 768 e 390 px: 63 capturas de página inteira. Em cada uma
confere o link de pular, o seletor de língua pelo teclado, o foco visível, nenhuma sobra
horizontal e o código inline inteiro e colado ao vizinho; na home, também copiar (com
sucesso e com recusa da área de transferência), os modos, as fases com setas, as
alternativas, o relógio da noite pela rolagem, a revelação ao rolar e nenhuma animação
rodando com movimento reduzido. `node scripts/check-visual.mjs --plan` mostra a matriz.
Os PNGs e `report.json` ficam fora do repositório público. Se o navegador não puder
iniciar, o comando falha e registra o impedimento; não muda sandbox nem permissões.

## Fidelidade ao design

```sh
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs \
CHROMIUM_EXECUTABLE=/caminho/chromium \
npm run check:fidelity -- --design /caminho/do/design.html --output /diretorio/privado/fidelidade
```

Captura o HTML do design e a home construída em 1440, 1280, 1024, 768, 390 e 320 px, com
movimento reduzido, relógio parado e a mesma semente de `Math.random` (a partitura sai
igual), e mede a diferença de pixels na página e em cada seção, alinhada pelo próprio
topo. Também captura cada item do inventário do design (`scripts/fidelidade/inventario.json`,
um id por seção, bloco, texto, botão, imagem, interação e variação responsiva, com o
arquivo de destino no site) dos dois lados. O relatório (`fidelidade.json`) traz os
números; quem lê compara com os desvios registrados no design system. O HTML do design
não fica no repositório.

## Privacidade e publicação

`check:public` procura padrões de dados pessoais e credenciais em fontes e saída,
sem imprimir o valor encontrado. O email institucional de contato é uma exceção
explícita; a busca não substitui revisão contextual. O contato do site é por
`mailto:`, sem formulário e sem backend de coleta.

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
