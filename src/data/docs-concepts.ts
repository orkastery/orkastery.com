export default [
  {
    "slug": "arquitetura",
    "group": "concepts",
    "sources": [
      "docs/conceitos/arquitetura.md",
      "docs/conceitos/visao-geral.md"
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
              "O núcleo é um CLI determinístico. Adaptadores conectam hosts e runtimes; a regra de negócio permanece no núcleo para que a mesma decisão não mude de sentido entre canais."
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
              "The core is a deterministic CLI. Adapters connect hosts and runtimes; business rules remain in the core so the same decision keeps its meaning across channels."
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
              "El núcleo es un CLI determinista. Los adaptadores conectan hosts y runtimes; las reglas de negocio permanecen en el núcleo para que una decisión conserve su significado entre canales."
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
              "GO implementa na worktree vinculada, com baseline anterior e commits pequenos. CHECK compara a evidência com essa baseline e revisa correção, segurança, performance, manutenção e estilo. Um achado que exige código volta ao GO."
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
              "GO implements in the linked worktree, using an earlier baseline and small commits. CHECK compares evidence with that baseline and reviews correctness, security, performance, maintainability and style. Findings that require code return to GO."
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
              "GO implementa en la worktree vinculada, con una baseline previa y commits pequeños. CHECK compara las pruebas con esa baseline y revisa corrección, seguridad, rendimiento, mantenibilidad y estilo. Los hallazgos que requieren código vuelven a GO."
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
