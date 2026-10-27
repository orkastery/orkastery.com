export default [
  {
    "slug": "arquitetura",
    "group": "concepts",
    "sources": [
      "docs/conceitos/arquitetura.md",
      "docs/conceitos/visao-geral.md",
      "docs/referencia/contratos/grafo-deterministico-kg1.md",
      "docs/referencia/contratos/benchmark-grafo-kg1.md",
      "docs/referencia/contratos/extracao-grafo-kg2.md",
      "docs/referencia/contratos/indice-grafo-kg3.md",
      "docs/referencia/contratos/incremental-grafo-kg4.md",
      "docs/referencia/contratos/consumo-grafo-kg5.md"
    ],
    "diagram": "layers",
    "translations": {
      "pt": {
        "title": "Arquitetura do Orkastery",
        "description": "Entenda quem apresenta, quem executa e quem verifica cada mudança.",
        "sections": [
          {
            "id": "camadas",
            "title": "Três camadas, responsabilidades explícitas",
            "paragraphs": [
              "O host recebe o pedido e apresenta as decisões. O núcleo ork aplica contratos, registra o estado e confere a evidência. O runtime escreve o produto. Um relato do runtime não substitui a execução dos verificadores.",
              "O núcleo é um CLI determinístico. Adaptadores conectam hosts e runtimes; a regra de negócio permanece no núcleo para que a mesma decisão não mude de sentido entre canais. Não há LLM dentro do núcleo, nem servidor ou banco obrigatório; as dependências de runtime são poucas e têm versão fixa."
            ]
          },
          {
            "id": "estado",
            "title": "Estado e proveniência",
            "paragraphs": [
              "O manifesto orkastery.yaml define o projeto. Cada thread tem estado, ledger, claims e prompts com hash em .orkastery. Consulte esses dados pelos comandos do núcleo. Uma conversa pode explicar um estado, mas não é sua fonte de verdade."
            ],
            "code": "ork thread status <thread>\nork phase list <thread>\nork claims list <thread>"
          },
          {
            "id": "isolamento",
            "title": "Isolamento e decisões",
            "paragraphs": [
              "A worktree separa o código de uma thread. Leases coordenam recursos que podem colidir, como caminhos de edição e a árvore de destino do merge. Paralelismo não elimina a necessidade de serializar a entrega.",
              "O modo define os pontos de HITL previstos. Policies block, falhas de verificação e escalações tipadas continuam valendo. Memória oferece contexto; não concede autorização."
            ]
          },
          {
            "id": "metricas",
            "title": "Duas medidas com propósitos distintos",
            "paragraphs": [
              "O índice de condução deriva dos eventos do ledger e descreve como o ciclo foi conduzido. A nota humana registra a avaliação do dono sobre o resultado. São origens diferentes: nenhuma deve ser inventada ou tratada como medida da outra.",
              "Uma taxa de entregas exige intervalo, população e registros de origem. Esta página não apresenta uma taxa sem essa medição."
            ]
          },
          {
            "id": "kg1",
            "title": "Grafo determinístico: o contrato KG1",
            "paragraphs": [
              "KG1 define ork.code-artifact-graph/v1 e ork.graph-benchmark/v1, com validação pura e corpus sintético. A mesma entrada, configuração e versão do extrator produzem as mesmas identidades e conteúdo canônico. Cada relação exige evidência localizável e preserva as restrições de acesso das fontes.",
              "O grafo é uma projeção local descartável. O KG1 entrega o contrato, a validação pura e o corpus; a extração é o KG2, o índice com a consulta pelo ork grafo é o KG3, o índice incremental é o KG4 e o consumo pelas fases é o KG5. Não altera orkmind.company-brain/v1 nem substitui o estado do Ork ou o Company Brain. Nenhum benchmark medido comprova economia nesta etapa."
            ]
          },
          {
            "id": "kg2-kg3",
            "title": "Extração, índice e consulta: KG2 e KG3",
            "paragraphs": [
              "O KG2 extrai de um repositório Git local um grafo no mesmo contrato: TypeScript e JavaScript pelo compilador, Markdown com seções, links, frontmatter e IDs citados, e a proveniência de cada aresta. Aresta só existe com prova; o que não se prova fica fora e é declarado, como diagnóstico ou lacuna do relatório de extração. A mesma entrada dá o mesmo grafo e o mesmo digest em qualquer ordem de leitura.",
              "O KG3 guarda esse grafo num índice local do HEAD limpo, fora do git, e o consulta por vizinhança, chamadores, importadores e caminho. A mesma pergunta dá a mesma saída, toda aresta traz extrator e evidência, e a resposta se declara parcial. Registro fora da concessão local não aparece em resposta, contagem nem candidato."
            ],
            "code": "ork grafo indexar --verificar\nork grafo vizinhos <nó> --json"
          },
          {
            "id": "kg4-kg5",
            "title": "Incremental e consumo pelas fases: KG4 e KG5",
            "paragraphs": [
              "O KG4 constrói o índice de uma revisão a partir do índice ancestral e reextrai só o que a mudança alcança, com os mesmos bytes da extração completa; --verificar compara as duas. O KG5 expõe as consultas no MCP do projeto: as tools ork_grafo_* rodam o ork grafo na worktree da thread, num processo filho com prazo e cancelamento, e a resposta tem teto em bytes. O servidor MCP não carrega o grafo.",
              "O consumo fica atrás da flag grafo.mcp do orkastery.yaml, desligada por padrão; sem ela, o MCP lista as mesmas tools de antes. As tools precisam dos analisadores, o typescript e o micromark, que desde a correção de empacotamento da RM-031 são dependências do pacote, com versão exata: o npm install -g os traz. Instalado dentro de um projeto ou pelo npx, o ork fica sem eles, e a recusa é grafo.parser.indisponivel, com a correção no ork grafo status e no ork doctor. O grafo pede Node 20.19, 22.12 ou mais novo.",
              "O pacote de contexto da thread já existe: ork grafo contexto <thread> e a tool ork_grafo_contexto entregam o JSON ork.thread-graph-context/v2, com as sementes do diff da worktree, do GOAL, do PLAN e das claims, a vizinhança de um salto ordenada por relevância e teto de 32.768 bytes por padrão; com a flag ligada, o pedido da fase ganha uma dica curta. Na versão {versao}, o índice ganha arestas cites, de caminhos citados literalmente em Markdown e em strings de testes e scripts para arquivos do índice, e o pacote usa a sobra do teto para vizinhos a dois saltos, marcados com salto: 2. Um índice gravado antes das citações pede ork grafo indexar. Numa fixture sintética, o pacote caiu de 22.973 para 3.119 bytes, e dá 3.137 com o segundo salto; em dois casos reais, a cobertura do pacote subiu de 23% para 69% e de 41% para 65%, com precisão menor e o pacote quase dobrando. Nada disso demonstra economia de tokens.",
              "Também na versão {versao}, a proveniência é conferida contra a árvore da thread: as consultas por nó (vizinhos, chamadores, importadores e caminho, no ork grafo com --json e nas tools ork_grafo_*) trazem as fontes, com o sha256 e o blob do Git de cada arquivo citado e a situação dele na árvore (igual, modificada ou ausente), e cada aresta diz se a origem, o alvo ou uma das evidências mudou depois do HEAD. No pacote de contexto, só o grupo de fonte mudada ganha essa marca, e, com a árvore limpa, o pacote sai byte a byte igual ao de antes. A árvore só é lida quando o git status diz que ela mudou, e nenhum índice precisa ser refeito por isso. No mesmo índice, a resposta sem corte cresce de 15% a 29% em bytes, e a cortada pelo teto traz 34 arestas em vez de 41. A federação (KG6), a paridade entre hosts (KG7) e a rodada paga do benchmark ainda não existem."
            ],
            "code": "grafo:\n  mcp: true"
          }
        ]
      },
      "en": {
        "title": "Orkastery architecture",
        "description": "Understand who presents, executes and verifies each change.",
        "sections": [
          {
            "id": "camadas",
            "title": "Three layers with explicit responsibilities",
            "paragraphs": [
              "The host receives the request and presents decisions. The ork core applies contracts, records state and checks evidence. The runtime writes the product. A runtime report does not replace running the checks.",
              "The core is a deterministic CLI. Adapters connect hosts and runtimes; business rules remain in the core so the same decision keeps its meaning across channels. There is no LLM inside the core and no required server or database; runtime dependencies are few and pinned."
            ]
          },
          {
            "id": "estado",
            "title": "State and provenance",
            "paragraphs": [
              "The orkastery.yaml manifest defines the project. Each thread has state, a ledger, claims and hashed prompts under .orkastery. Query these through core commands. A conversation may explain state, but is not its source of truth."
            ],
            "code": "ork thread status <thread>\nork phase list <thread>\nork claims list <thread>"
          },
          {
            "id": "isolamento",
            "title": "Isolation and decisions",
            "paragraphs": [
              "A worktree separates a thread’s code. Leases coordinate resources that could collide, such as edited paths and the merge destination tree. Parallel work still requires serialized delivery.",
              "The mode sets the scheduled HITL points. Blocking policies, verification failures and typed escalations still apply. Memory provides context; it does not grant authorization."
            ]
          },
          {
            "id": "metricas",
            "title": "Two measures with different purposes",
            "paragraphs": [
              "The conduction index derives from ledger events and describes how the cycle was conducted. The human score records the owner’s assessment of the result. They have different sources: neither should be invented or used as a measure of the other.",
              "A delivery rate requires a time interval, a defined population and source records. This page does not report a rate without that measurement."
            ]
          },
          {
            "id": "kg1",
            "title": "Deterministic graph: the KG1 contract",
            "paragraphs": [
              "KG1 defines ork.code-artifact-graph/v1 and ork.graph-benchmark/v1, with pure validation and a synthetic corpus. Identical input, configuration and extractor versions produce identical identities and canonical content. Each relationship requires locatable evidence and preserves source access restrictions.",
              "The graph is a disposable local projection. KG1 provides the contract, pure validation and the corpus; extraction is KG2, the index with ork grafo queries is KG3, the incremental index is KG4 and phase consumption is KG5. It does not change orkmind.company-brain/v1 or replace Ork state or Company Brain. No measured benchmark demonstrates savings at this stage."
            ]
          },
          {
            "id": "kg2-kg3",
            "title": "Extraction, index and queries: KG2 and KG3",
            "paragraphs": [
              "KG2 extracts a graph in the same contract from a local Git repository: TypeScript and JavaScript through the compiler, Markdown with sections, links, frontmatter and cited IDs, and provenance for every edge. An edge exists only with proof; anything unproven stays out and is declared as a diagnostic or as a gap in the extraction report. The same input yields the same graph and digest in any read order.",
              "KG3 stores that graph in a local index for a clean HEAD, outside git, and queries it for neighbors, callers, importers and paths. The same question produces the same output, every edge carries its extractor and evidence, and answers declare themselves partial. Records outside the local grant appear in no answer, count or candidate."
            ],
            "code": "ork grafo indexar --verificar\nork grafo vizinhos <node> --json"
          },
          {
            "id": "kg4-kg5",
            "title": "Incremental index and phase consumption: KG4 and KG5",
            "paragraphs": [
              "KG4 builds a revision’s index from the ancestor index and re-extracts only what the change reaches, with the same bytes as a full extraction; --verificar compares both. KG5 exposes the queries in the project MCP server: the ork_grafo_* tools run ork grafo in the thread worktree, in a child process with a deadline and cancellation, and the answer has a byte cap. The MCP server does not load the graph.",
              "Consumption sits behind the grafo.mcp flag in orkastery.yaml, off by default; without it, MCP lists the same tools as before. The tools need the analyzers, typescript and micromark, which have been package dependencies with exact versions since the RM-031 packaging fix: npm install -g brings them. Installed inside a project or through npx, ork goes without them, and the refusal is grafo.parser.indisponivel, with the fix in ork grafo status and ork doctor. The graph needs Node 20.19, 22.12 or later.",
              "The context package for a thread now exists: ork grafo contexto <thread> and the ork_grafo_contexto tool return the ork.thread-graph-context/v2 JSON, seeded from the worktree diff, GOAL, PLAN and claims, with a one-hop neighborhood ranked by relevance and a 32,768-byte cap by default; with the flag on, the phase request gets a short hint. In version {versao}, the index gains cites edges, from paths cited literally in Markdown and in test and script strings to files in the index, and the package spends what is left of the cap on neighbors two hops away, marked with salto: 2. An index written before the citations needs ork grafo indexar. On a synthetic fixture the package dropped from 22,973 to 3,119 bytes, and it is 3,137 with the second hop; on two real cases, the package’s coverage rose from 23% to 69% and from 41% to 65%, with lower precision and a package almost twice as large. None of this demonstrates token savings.",
              "Also in version {versao}, provenance is checked against the thread’s tree: node queries (neighbors, callers, importers and path, in ork grafo with --json and in the ork_grafo_* tools) bring the sources, with the sha256 and Git blob of each cited file and its state in the tree (igual, modificada or ausente: unchanged, modified or missing), and each edge says whether its origin, its target or a piece of its evidence changed after HEAD. In the context package, only a group whose source changed gets that mark, and with a clean tree the package is byte for byte the same as before. The tree is read only when git status says it changed, and no index has to be rebuilt for this. On the same index, an uncut answer grows 15% to 29% in bytes, and the one cut by the cap returns 34 edges instead of 41. Federation (KG6), host parity (KG7) and the paid benchmark run do not exist yet."
            ],
            "code": "grafo:\n  mcp: true"
          }
        ]
      }
    }
  },
  {
    "slug": "ciclo",
    "group": "concepts",
    "sources": [
      "docs/produto/FEAT-001-thread-e-seis-fases.md",
      "docs/conceitos/visao-geral.md"
    ],
    "diagram": "cycle",
    "translations": {
      "pt": {
        "title": "O ciclo de uma thread",
        "description": "Do objetivo à avaliação da entrega, com limites claros entre as fases.",
        "sections": [
          {
            "id": "preparar",
            "title": "GOAL e PLAN: defina o trabalho",
            "paragraphs": [
              "GOAL define objetivo verificável, impacto e critérios de sucesso. PLAN divide tarefas, registra decisões e associa caminhos a comandos de verificação. Nenhuma das duas fases implementa o produto."
            ]
          },
          {
            "id": "construir",
            "title": "GO e CHECK: implemente e confira",
            "paragraphs": [
              "GO implementa na worktree vinculada, com baseline anterior e commits pequenos. CHECK compara a evidência com essa baseline e revisa correção, segurança, performance, manutenção e estilo. Um achado que exige código volta ao GO.",
              "Na versão {versao}, o CHECK roda por padrão no Agile Check: o preparo acontece uma vez, as claims rodam contra o produto dele com guarda de hash e as lanes de teste e a varredura seguem em paralelo, sem passar da CPU da máquina. O Classic Check, com os mesmos comandos na mesma ordem, volta por check.mode: classic no orkastery.yaml ou por ork verify --check classic na rodada, e uma peça do Agile indisponível cai para o equivalente do Classic.",
              "A worktree do GO nasce com a thread quando o orkastery.yaml tem worktree.por_thread: true, o que o ork init grava. Com --sem-worktree, a thread roda na raiz do projeto, e na branch base o SHIP sai barrado pela policy push_direto_na_base."
            ]
          },
          {
            "id": "entregar",
            "title": "SHIP e MASTER: entregue e aprenda",
            "paragraphs": [
              "SHIP passa pelos gates, serializa o merge e comprova o push no remoto. Um commit local não é uma entrega publicada. MASTER registra postmortem, lições e o índice derivado do ledger; a nota humana, quando vier, substitui o índice apresentado."
            ]
          }
        ]
      },
      "en": {
        "title": "The thread lifecycle",
        "description": "From the goal to delivery assessment, with clear boundaries between phases.",
        "sections": [
          {
            "id": "preparar",
            "title": "GOAL and PLAN: define the work",
            "paragraphs": [
              "GOAL defines a verifiable objective, impact and success criteria. PLAN splits tasks, records decisions and associates paths with verification commands. Neither phase implements the product."
            ]
          },
          {
            "id": "construir",
            "title": "GO and CHECK: implement and verify",
            "paragraphs": [
              "GO implements in the linked worktree, using an earlier baseline and small commits. CHECK compares evidence with that baseline and reviews correctness, security, performance, maintainability and style. Findings that require code return to GO.",
              "In version {versao}, CHECK runs Agile Check by default: preparation happens once, claims run against its output under a hash guard, and the test lanes and the scan run in parallel, without exceeding the machine’s CPU. Classic Check, with the same commands in the same order, returns through check.mode: classic in orkastery.yaml or through ork verify --check classic for the run, and an unavailable Agile piece falls back to the Classic equivalent.",
              "The GO worktree is created with the thread when orkastery.yaml has worktree.por_thread: true, which ork init writes. With --sem-worktree, the thread runs at the project root, and on the base branch SHIP is blocked by the push_direto_na_base policy."
            ]
          },
          {
            "id": "entregar",
            "title": "SHIP and MASTER: deliver and learn",
            "paragraphs": [
              "SHIP passes gates, serializes the merge and proves the push against the remote. A local commit is not a published delivery. MASTER records the postmortem, lessons and ledger-derived index; a later human score replaces the displayed index."
            ]
          }
        ]
      }
    }
  }
];
