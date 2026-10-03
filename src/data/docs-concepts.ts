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
              "O modo controla pausas previstas. Policies block, falhas de verificação e escalações tipadas continuam valendo. Memória oferece contexto; não concede autorização."
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
              "O consumo fica atrás da flag grafo.mcp do orkastery.yaml, desligada por padrão; sem ela, o MCP lista as mesmas tools de antes. As tools precisam dos analisadores, o typescript e o micromark, que desde a correção de empacotamento da RM-031 são dependências do pacote, com versão exata: o npm install -g os traz. Instalado dentro de um projeto ou pelo npx, o ork fica sem eles, e a recusa é grafo.parser.indisponivel, com a correção no ork grafo status e no ork doctor. O grafo pede Node 20.19, 22.12 ou mais novo. O pacote de contexto da thread, a federação (KG6), a paridade entre hosts (KG7) e a rodada medida do benchmark ainda não existem: o protocolo está fixado, sem medida de economia."
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
              "The mode controls scheduled pauses. Blocking policies, verification failures and typed escalations still apply. Memory provides context; it does not grant authorization."
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
              "Consumption sits behind the grafo.mcp flag in orkastery.yaml, off by default; without it, MCP lists the same tools as before. The tools need the analyzers, typescript and micromark, which have been package dependencies with exact versions since the RM-031 packaging fix: npm install -g brings them. Installed inside a project or through npx, ork goes without them, and the refusal is grafo.parser.indisponivel, with the fix in ork grafo status and ork doctor. The graph needs Node 20.19, 22.12 or later. The thread context package, federation (KG6), host parity (KG7) and the measured benchmark run do not exist yet: the protocol is fixed, with no savings measurement."
            ],
            "code": "grafo:\n  mcp: true"
          }
        ]
      },
      "es": {
        "title": "Arquitectura de Orkastery",
        "description": "Entienda quién presenta, quién ejecuta y quién verifica cada cambio.",
        "sections": [
          {
            "id": "camadas",
            "title": "Tres capas con responsabilidades explícitas",
            "paragraphs": [
              "El host recibe la petición y presenta las decisiones. El núcleo ork aplica contratos, registra el estado y comprueba las pruebas. El runtime escribe el producto. Su informe no sustituye la ejecución de los verificadores.",
              "El núcleo es un CLI determinista. Los adaptadores conectan hosts y runtimes; las reglas de negocio permanecen en el núcleo para que una decisión conserve su significado entre canales. No hay LLM dentro del núcleo, ni servidor o base de datos obligatorios; las dependencias de runtime son pocas y tienen versión fija."
            ]
          },
          {
            "id": "estado",
            "title": "Estado y procedencia",
            "paragraphs": [
              "El manifiesto orkastery.yaml define el proyecto. Cada thread tiene estado, ledger, claims y prompts con hash en .orkastery. Consulte esos datos mediante los comandos del núcleo. Una conversación puede explicar el estado, pero no es su fuente de verdad."
            ],
            "code": "ork thread status <thread>\nork phase list <thread>\nork claims list <thread>"
          },
          {
            "id": "isolamento",
            "title": "Aislamiento y decisiones",
            "paragraphs": [
              "La worktree separa el código de una thread. Los leases coordinan recursos que pueden colisionar, como rutas de edición y el árbol de destino del merge. El trabajo paralelo sigue requiriendo una entrega serializada.",
              "El modo controla las pausas previstas. Las políticas block, los fallos de verificación y los escalados tipados siguen vigentes. La memoria aporta contexto; no concede autorización."
            ]
          },
          {
            "id": "metricas",
            "title": "Dos medidas con propósitos distintos",
            "paragraphs": [
              "El índice de conducción deriva de los eventos del ledger y describe cómo se condujo el ciclo. La nota humana registra la valoración del dueño sobre el resultado. Sus fuentes son distintas: ninguna debe inventarse ni usarse como medida de la otra.",
              "Una tasa de entregas requiere un intervalo, una población definida y registros de origen. Esta página no presenta una tasa sin esa medición."
            ]
          },
          {
            "id": "kg1",
            "title": "Grafo determinista: el contrato KG1",
            "paragraphs": [
              "KG1 define ork.code-artifact-graph/v1 y ork.graph-benchmark/v1, con validación pura y corpus sintético. La misma entrada, configuración y versión del extractor producen las mismas identidades y contenido canónico. Cada relación exige pruebas localizables y conserva las restricciones de acceso de las fuentes.",
              "El grafo es una proyección local descartable. KG1 ofrece el contrato, la validación pura y el corpus; la extracción es KG2, el índice con la consulta mediante ork grafo es KG3, el índice incremental es KG4 y el consumo por las fases es KG5. No modifica orkmind.company-brain/v1 ni sustituye el estado de Ork o el Company Brain. Ningún benchmark medido demuestra ahorro en esta etapa."
            ]
          },
          {
            "id": "kg2-kg3",
            "title": "Extracción, índice y consulta: KG2 y KG3",
            "paragraphs": [
              "KG2 extrae de un repositorio Git local un grafo con el mismo contrato: TypeScript y JavaScript mediante el compilador, Markdown con secciones, enlaces, frontmatter e IDs citados, y la procedencia de cada arista. Una arista solo existe con prueba; lo que no se demuestra queda fuera y se declara como diagnóstico o como laguna del informe de extracción. La misma entrada produce el mismo grafo y el mismo digest en cualquier orden de lectura.",
              "KG3 guarda ese grafo en un índice local del HEAD limpio, fuera de git, y lo consulta por vecindad, llamadores, importadores y camino. La misma pregunta produce la misma salida, cada arista incluye extractor y prueba, y la respuesta se declara parcial. Los registros fuera de la concesión local no aparecen en respuestas, recuentos ni candidatos."
            ],
            "code": "ork grafo indexar --verificar\nork grafo vizinhos <nodo> --json"
          },
          {
            "id": "kg4-kg5",
            "title": "Índice incremental y consumo por las fases: KG4 y KG5",
            "paragraphs": [
              "KG4 construye el índice de una revisión a partir del índice ancestro y reextrae solo lo que el cambio alcanza, con los mismos bytes de la extracción completa; --verificar compara ambas. KG5 expone las consultas en el MCP del proyecto: las tools ork_grafo_* ejecutan ork grafo en la worktree de la thread, en un proceso hijo con plazo y cancelación, y la respuesta tiene un tope en bytes. El servidor MCP no carga el grafo.",
              "El consumo queda detrás del flag grafo.mcp de orkastery.yaml, apagado por defecto; sin él, MCP lista las mismas tools de antes. Las tools necesitan los analizadores, typescript y micromark, que desde la corrección de empaquetado de la RM-031 son dependencias del paquete, con versión exacta: npm install -g los trae. Instalado dentro de un proyecto o mediante npx, ork se queda sin ellos, y el rechazo es grafo.parser.indisponivel, con la corrección en ork grafo status y en ork doctor. El grafo pide Node 20.19, 22.12 o posterior. El paquete de contexto de la thread, la federación (KG6), la paridad entre hosts (KG7) y la ronda medida del benchmark aún no existen: el protocolo está fijado, sin medición de ahorro."
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
      },
      "es": {
        "title": "El ciclo de una thread",
        "description": "Del objetivo a la evaluación de la entrega, con límites claros entre fases.",
        "sections": [
          {
            "id": "preparar",
            "title": "GOAL y PLAN: defina el trabajo",
            "paragraphs": [
              "GOAL define un objetivo verificable, el impacto y los criterios de éxito. PLAN divide las tareas, registra decisiones y asocia rutas con comandos de verificación. Ninguna de estas fases implementa el producto."
            ]
          },
          {
            "id": "construir",
            "title": "GO y CHECK: implemente y compruebe",
            "paragraphs": [
              "GO implementa en la worktree vinculada, con una baseline previa y commits pequeños. CHECK compara las pruebas con esa baseline y revisa corrección, seguridad, rendimiento, mantenibilidad y estilo. Los hallazgos que requieren código vuelven a GO.",
              "La worktree del GO nace con la thread cuando orkastery.yaml tiene worktree.por_thread: true, lo que graba ork init. Con --sem-worktree, la thread corre en la raíz del proyecto, y en la rama base el SHIP queda bloqueado por la policy push_direto_na_base."
            ]
          },
          {
            "id": "entregar",
            "title": "SHIP y MASTER: entregue y aprenda",
            "paragraphs": [
              "SHIP pasa por los gates, serializa el merge y demuestra el push en el remoto. Un commit local no es una entrega publicada. MASTER registra el postmortem, las lecciones y el índice derivado del ledger; una nota humana posterior sustituye el índice presentado."
            ]
          }
        ]
      }
    }
  }
];
