# Orkastery — site e documentação

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

`npm run build` executa `test:code` e `check:code`. O auditor usa o DOM do HTML
final, independentemente do reconhecedor. Reprova comandos soltos de `ork`, `npm`,
`npx`, `git` e `pip`, flags e identificadores técnicos, inclusive em painéis ainda
fechados, entidades HTML e comandos divididos por tags inline. Não há exceção por
pedaço de comando: `ork <code>doctor</code>` também reprova; marque o comando inteiro.
`Node.js`, `projeto-alvo` e “resources unavailable in CI” são prosa; arquivos como
`index.js`, caminhos e contratos com ponto continuam distintos.
Não há exceção por
página ou idioma. `code`/`pre` e metadados não visíveis são os únicos elementos
excluídos. A lista `proseExceptions` em `scripts/check-code.mjs` aceita pares exatos
como “ork core” e “git repository”, descrições do programa em prosa; cada entrada
tem teste que garante que ela não libera o comando seguinte. Os domínios públicos
de contato também têm teste explícito. Novas exceções exigem justificativa e teste.

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
os ícones de instrumentos nos componentes ativos. A cena de colisão é uma
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
contribuição e rede nos três idiomas e em 1280, 700 e 390 px, com os dois temas
selecionados de verdade. São 126 capturas com movimento reduzido e mais 18 da home
com movimento normal, após rolar até a cena: 144 capturas previstas. Confere overflow,
teclado, nome acessível e persistência do tema, disposição do recibo, cópia (sucesso
e recusa simulados), anúncio do relatório falso, entrada da animação, painéis
interativos e movimento reduzido.
Os PNGs e `report.json` ficam fora do repositório público. Se o navegador não puder
iniciar, o comando falha e registra o impedimento; não muda sandbox nem permissões.
A inspeção humana das imagens ainda é necessária para avaliar qualidade visual.

## Privacidade e publicação

`check:public` procura padrões de dados pessoais e credenciais em fontes e saída,
sem imprimir o valor encontrado. O email institucional de contato é uma exceção
explícita; a busca não substitui revisão contextual. O formulário apenas prepara
um email no aplicativo do visitante; não tem backend de coleta.

O workflow existente `.github/workflows/publicar.yml` publica somente por promoção
explícita com tag `producao-*` ou execução manual com ref. Um commit local não
publica. A reversão operacional é promover uma revisão anteriormente validada,
com autorização do responsável; o workflow não foi alterado por esta revisão.
