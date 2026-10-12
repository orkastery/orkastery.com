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

O visual é o design que o dono fez no Claude Design ("Orkastery Home") sobre a Partitura,
o design system do kit do dono: a home reproduz o HTML dele seção por seção, e o resto do
site (docs, contribuir, páginas de produto, a página da marca e as duas línguas) usa os
mesmos componentes. Onde o HTML da home e o kit discordam, vale o kit (ver "Design
system: a Partitura do kit").

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
npm run check:redirecionamentos
npm run check:public
npm run check:content
npm run check:code
npm run check:design
npm run test:docs
npm run test:redirecionamentos
npm run test:code
npm run test:design
npm run fontes
npm run kit -- --de /caminho/do/kit
```

O prebuild confere o snapshot e a revisão editorial. O postbuild confere HTML,
links, fragmentos, idiomas, metadados, padrões públicos, semântica, texto técnico
formatado como código, o vocabulário do kit, os redirecionamentos do espanhol, a
Partitura (cópia do kit, cor solta, latão, foco, contraste e fontes) e a lógica da home
contra a do design, e executa canários negativos. Build aprovado não é
revisão visual nem prova de naturalidade da tradução: a prova visual é o
`check:visual` e o `check:fidelity`, com navegador. Links externos são
inventariados, mas não consultados pela prova offline. `parse5` já integra a árvore
do Astro; a mesma versão do lockfile é declarada diretamente para os auditores de
HTML, sem adicionar outro parser.

## Design system: a Partitura do kit

O design system é a Partitura, do kit do dono no Claude Design (o `DESIGN.md` e o
`CLAUDE.md` do kit). Ela vence os tokens do HTML da home e o `tokens.css` legado (decisão
D14 da thread): onde os dois discordam, vale o kit.

Os arquivos do kit entram sem mudança por `npm run kit -- --de <pasta do kit>`
(`scripts/kit.mjs`), que grava o sha256 de cada um em `src/data/kit-partitura.json`:

- `public/partitura/partitura.css`: os tokens, ligados no `<head>` de
  `src/layouts/Base.astro` e também publicados em `/partitura/partitura.css`, como no
  exemplo do `DESIGN.md`;
- `public/partitura/partitura.json`: os mesmos tokens em JSON;
- `public/partitura/DESIGN.md`: as regras para agentes;
- `public/marca/svg/`, `public/marca/png/` e `public/marca/templates/`: logos retingidos
  para a Partitura, ícones, favicons e templates. `public/favicon.ico` é o
  `favicon-32.png` do kit dentro de um ICO.

`npm run fontes` (`scripts/fontes.mjs`) gera `src/styles/fonts.css` com os nomes de
família que o `partitura.css` usa ('Geist', 'Hanken Grotesk' e 'IBM Plex Mono'), a partir
dos pacotes `@fontsource` fixados em 5.3.0. As licenças OFL ficam em `public/licenses/`.

Regras do kit, onde valem e a guarda de cada uma:

| Regra do kit | Onde | Guarda |
| --- | --- | --- |
| Só `var(--…)` da Partitura (e `color-mix` deles), nenhuma cor solta | estilos de todos os componentes, `src/lib/home-state.mjs` e o canvas da partitura, que lê os tokens no próprio canvas | `check:design` (fonte, CSS da build e estilos inline) |
| Latão só em espera você, ponto de HITL, recomendada, separador e na borda de luz do comando de instalação | `Divider`, `InstallButton`, board e resumo da atenção, matriz de modos e pergunta | `check:design` (CSS), `test:design` (lógica da home) e `check:visual` (cor calculada de cada elemento) |
| Texto com 4,5:1 nos dois temas; texto de estado pela variante `-texto` | semânticos do `partitura.css` | `check:design` (35 pares) e `check:visual` (contraste real de cada texto) |
| Foco por `box-shadow: var(--anel-foco)`, nunca recortado nem sob o cabeçalho | `src/styles/base.css`, respiro de 4 px nos contêineres com recorte e `scroll-padding-top` | `check:design` e `check:visual` (todo focável, na ordem do Tab) |
| Alvo de toque de 44 x 44 px | botões, navegação, seletor de língua e listas de links | `check:visual` |
| Bloco de código e comando copiável sempre noite | `data-tema="noite"` no `InstallButton`, nos `<pre>` e no terminal | revisão visual |
| Logos dos arquivos do kit, sem mudança; assinatura com 120 px ou mais | `public/marca/svg/`; abaixo de 480 px o cabeçalho mostra o símbolo | `check:design` (sha256) |
| Movimento andante (`--curva`, 160, 280 e 600 ms), brilho neutro só com mouse, entrada ao rolar de 600 ms, 16 px e 80 ms entre irmãos | `base.css` e `src/scripts/moldura.ts` | `check:visual` (só as animações do kit; nada anda com movimento reduzido) |
| Vocabulário sem afrouxar, batuta, metrônomo, Bernstein, disruptivo e "pausa" no sentido de HITL | dados das docs e das páginas | `check:content` |
| PT em `/` e EN em `/en/` | `src/data/i18n.ts` | `check:i18n` e `check:redirecionamentos` |

Tipografia: os papéis de texto ficam em `src/styles/base.css` como composições da escala
do kit (`--tipo-display` sobre `--t-display`, `--tipo-titulo-1` a `--tipo-titulo-3`,
`--tipo-corpo`, `--tipo-apoio`, `--tipo-rotulo` e `--tipo-codigo`), com o peso, a
entrelinha e o tracking das notas do `partitura.css` (`--trk-*`). O tema noite vem do
atributo `data-tema="noite"`, como no kit; o `base.css` declara de novo o `--anel-foco`
nesse tema, porque o `partitura.css` o resolve só no `:root`.

| Componente do kit | No site |
| --- | --- |
| Comando copiável | `src/components/ds/InstallButton.astro` (hero com a borda de luz girando, cartão e noite) e `src/scripts/copiar.ts` |
| Botões primário e secundário | cabeçalho, hero, páginas de produto, chamada final e `/marca/`, com 44 px e raio 12 |
| Separador | `src/components/ds/Divider.astro` |
| Barra de 6 fases, chip de estado e ork board | `src/components/home/Atencao.astro` (abaixo de 768 px, lista de cartões) |
| Pergunta a–d e resumo horário | `Atencao.astro`: a escolhida com borda `--texto`, a recomendada com o ponto de latão |
| Número de prova e lacuna | `src/components/home/Prova.astro` |
| Matriz de modos | `src/components/home/Modos.astro` |
| Topologia | `src/components/home/Paralelismo.astro` (instrução em tracejado regência, evidência em pátina contínua) |
| Header e menu de 390 px | `src/components/SiteHeader.astro` (abaixo de 768 px vira menu) |
| Alerta | o destaque das docs, em `src/styles/docs.css` |

Para outro site da família (o do OrkMind) reaproveitar a estrutura e trocar só a
identidade: traga o kit dele com `npm run kit -- --de <pasta do kit>` (o `partitura.css`
dele troca os primitivos e mantém os nomes dos semânticos), rode `npm run fontes` se as
famílias mudarem e troque os SVGs. `base.css`, os componentes de `src/components/ds/` e as
guardas (`check:design` e `check:visual`) seguem iguais, e o `check:design` confere o
contraste dos pares com as cores novas.

Desvios do HTML da home, cada um com motivo (decisões da thread):

- O kit vence (D14, D16 e D18): tipografia na escala do kit (h1 até 72 px, h2 até 44 px)
  com tracking entre -0,01 e -0,035em e rótulos com +0,06em; cores pelos semânticos; o
  latão que o HTML punha em links, setas, botões de contato, rótulo da camada, progresso e
  decisão da noite, função ativa, rotação de perfil e alternativa escolhida passa a
  regência, ação ou neutro; o ponto do selo deixa de pulsar (pulso só no que está vivo);
  foco pelo anel do kit; alvos de 44 px (rodapé e listas de links ficam mais altos);
  contêiner de 1280 px com a calha do kit; espaços e raios do kit.
- Responsividade do kit (D19): menu abaixo de 768 px, board em cartões e, abaixo de
  480 px, o símbolo no lugar da assinatura.
- Regra do código inteiro (D6, de 03/10): o comando inteiro no botão de instalação, com a
  pílula descendo de linha; o chip nunca quebra por dentro (rola quando não cabe nem
  sozinho na coluna); números da prova em uma coluna quando o comando não cabe na célula.
- Conteúdo (D7, D8 e D13): o contato institucional; rodapé com destinos reais, Contribuir
  e Marca; números e lacuna do README do núcleo.
- Idiomas (D15): PT e EN, como no seletor do próprio HTML da home.
- Acessibilidade (revisão independente): botão de pausar o movimento da home (WCAG
  2.2.2), nome acessível do seletor de língua com o rótulo visível, foco nunca sob o
  cabeçalho, diagrama que rola como região focável, link da navegação que não cabe
  sumindo inteiro e o resumo das 09:00 em 2 x 2 no cartão estreito.
- Os glifos →, ✓, ✕ e ∞ saem da fonte de reserva, porque as fontes embutidas no HTML da
  home não os têm.

## A marca

`/marca/` e `/en/marca/` são o Brand Kit do kit (a capa do manual e as diretrizes rápidas
apontam `orkastery.com/marca`): logos com downloads em SVG e PNG, ícones de app, a paleta
(cada amostra copia o hex), as fontes com o trecho do `<head>`, os templates, as
diretrizes rápidas e os arquivos para devs e agentes. Os botões de documento abrem PDFs
feitos dos documentos do kit por `scripts/documentos-da-marca.mjs`, que precisa de
Playwright e de rede (fontes e runtime do Claude Design) e não faz parte do build; o
sha256 de cada PDF fica em `src/data/kit-partitura.json`, e o `check:design` o confere. O
link "editar os templates" do Brand Kit não entra: ele abre o editor do Claude Design,
sem endereço público. O inventário dos itens do kit, com o destino de cada um no site,
está em `scripts/fidelidade/inventario-kit.json`.

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
revelação ao rolar e sem o relógio de 2,4 s. Sem a preferência, o botão "pausar
movimento", no cartão da partitura, para a partitura, o relógio e as animações (WCAG
2.2.2). Os modos são botões com `aria-pressed`, as fases são abas (com setas, Home e
End), a alternativa escolhida tem `aria-pressed`, e o botão de instalação anuncia o
resultado da cópia para leitor de tela. `test:design` compara as cores da lógica com as
do design pelo papel (tinta, linha, executando, verificado...), com as trocas do kit
listadas no próprio teste.

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
(parêntese, ponto, sufixo colado) viaja junto numa unidade sem quebra. O chip nunca
quebra por dentro: desce de linha como um bloco e, se for mais largo que a coluna inteira,
rola nele mesmo. O `check:code` audita o HTML gerado: reprova comando, flag, caminho
(inclusive diretório com a barra no fim, como `core/`) ou identificador fora de código,
identificador partido entre código e texto (como `claude-bg` seguido de `/pessoal`), e
subcomando do `ork` sem o `ork`. As poucas frases em que `ork` é o sujeito da frase
(como "o ork reserva") estão numa lista exata de exceções de prosa. No visual, o código
inline é o chip do design; o código que o design já mostra em mono (terminal, rótulos)
usa `.codigo-liso`, sem chip.

## Tipografia, caixa e diagramas

Títulos em Geist 600, texto em Hanken Grotesk 400 e 500 e prova (comandos, SHAs,
horários, rótulos e números) em IBM Plex Mono, na escala do kit (`--tipo-*`). Títulos,
menus, links e botões usam caixa de frase; o rótulo em mono maiúsculo, com +0,06em, é
desenho do kit. Siglas, comandos e nomes próprios
conservam a grafia original.

O layout documental tem trilha, sumário, navegação por assunto e anterior/próximo, em
cartões em papel sobre a névoa. SVGs têm title, desc, relações numeradas e legenda
textual; a leitura não depende só da cor. O site tem o tema dia do kit, com as seções e
os blocos em tema noite que o HTML da home e o kit desenham.

## Prova visual sem rede

Forneça uma instalação local de Playwright e Chromium. Nenhum caminho pessoal
ou navegador é fixado no código ou no lockfile do site.

```sh
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs \
CHROMIUM_EXECUTABLE=/caminho/chromium \
npm run check:visual -- --output /diretorio/privado/screenshots
```

O verificador intercepta todas as requisições, serve somente `dist` em memória e
bloqueia destinos externos. Exercita a home, `/ork/`, `/orkmind/`, o índice das docs, três
artigos e `/marca/` em PT e EN, a 1440, 768, 390 e 320 px: 64 capturas de página inteira.
Em cada uma confere o link de pular e o seletor de língua pelo teclado; em todo focável,
na ordem do Tab, o anel do kit visível, sem recorte e fora do cabeçalho fixo; nenhuma
sobra horizontal; o contraste real de cada texto; texto que não vaza da própria caixa; o
código inline inteiro, colado ao vizinho, dentro do bloco e rolando só quando não cabe; o
alvo de 44 px fora do texto corrido; o latão só nos lugares do kit; e, abaixo de 768 px,
o menu do cabeçalho (abre, fecha com Esc e devolve o foco). Na home, também copiar ("✓
copiado" por 1,6 s e a recusa), o board em cartões no estreito, os modos, as fases com
setas, a alternativa escolhida com 4,5:1, o relógio da noite pela rolagem, a entrada ao
rolar, só as animações do kit, o botão de pausar o movimento e, com movimento reduzido,
nenhuma animação, partitura nem relógio andando. `node scripts/check-visual.mjs --plan`
mostra a matriz; `--linguas`, `--larguras`, `--rotas` e `--dist` recortam a matriz.
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
números; quem lê compara com os desvios registrados em "Design system: a Partitura do
kit". Como o kit vence o HTML da home na tipografia, nas cores e nas regras, a
diferença medida inclui essas trocas. O HTML do design não fica no repositório.

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
