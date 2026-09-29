export default [
  {
    "slug": "cli",
    "group": "reference",
    "sources": [
      "docs/referencia/cli.md"
    ],
    "translations": {
      "pt": {
        "title": "Referência do CLI",
        "description": "Encontre comandos por tarefa e confira os argumentos na instalação em uso.",
        "sections": [
          {
            "id": "consultar",
            "title": "Consulte o estado",
            "paragraphs": [
              "Comece pelo diagnóstico e pelo panorama. Consultas de thread, fases e claims explicam o que foi registrado; não concedem permissão de escrita. Use --help no comando específico antes de uma operação mutável."
            ],
            "code": "ork doctor\nork maestro --json\nork thread status <thread>\nork phase list <thread>\nork claims list <thread>"
          },
          {
            "id": "familias",
            "title": "Comandos por responsabilidade",
            "paragraphs": [
              "Condução reúne thread, phase, modos e gate. Evidência usa claims, verify, fix e retry. Isolamento usa worktree e lease. Continuidade usa handoff, recall e memory. Entrega usa ship e master. Auditoria usa audit e divida."
            ],
            "code": "ork --help\nork ship --help\nork master --help"
          },
          {
            "id": "integracoes",
            "title": "Integrações e operação",
            "paragraphs": [
              "adapter e mcp conectam o host. accounts e setup descrevem runtimes e perfis. sessions, monitor e pulse observam execução e atenção humana. brain e portfolio consultam memória e catálogo. fabrica e roadmap coordenam trabalho entre máquinas. A referência canônica no repositório detalha as opções de cada família."
            ]
          },
          {
            "id": "contexto-e-atencao",
            "title": "Contexto citável e atenção humana",
            "paragraphs": [
              "brain context devolve entidades, pais, citações, frescor e lacunas sem conceder permissão de escrita. roadmap status monta um relatório de leitura com a atenção que cabe ao dono. master pedir gera o pedido de nota para resposta pelo canal autenticado; não é uma nota dada pelo agente."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork roadmap status --json\nork master pedir <thread> --formato telegram"
          }
        ]
      },
      "en": {
        "title": "CLI reference",
        "description": "Find commands by task and check arguments in your installed version.",
        "sections": [
          {
            "id": "consultar",
            "title": "Inspect state",
            "paragraphs": [
              "Start with diagnostics and the overview. Thread, phase and claim queries explain recorded state; they do not grant write permission. Use --help on a specific command before performing a mutation."
            ],
            "code": "ork doctor\nork maestro --json\nork thread status <thread>\nork phase list <thread>\nork claims list <thread>"
          },
          {
            "id": "familias",
            "title": "Commands by responsibility",
            "paragraphs": [
              "Conduction includes thread, phase, modos and gate. Evidence uses claims, verify, fix and retry. Isolation uses worktree and lease. Continuity uses handoff, recall and memory. Delivery uses ship and master. Auditing uses audit and divida."
            ],
            "code": "ork --help\nork ship --help\nork master --help"
          },
          {
            "id": "integracoes",
            "title": "Integrations and operations",
            "paragraphs": [
              "adapter and mcp connect the host. accounts and setup describe runtimes and profiles. sessions, monitor and pulse observe execution and human attention. brain and portfolio access memory and the catalog. fabrica and roadmap coordinate work across machines. The canonical repository reference details each family’s options."
            ]
          },
          {
            "id": "contexto-e-atencao",
            "title": "Citable context and human attention",
            "paragraphs": [
              "brain context returns entities, parents, citations, freshness and gaps without granting write access. roadmap status builds a read-only report showing where the owner’s attention is needed. master pedir creates a score request for an authenticated human response; it is not an agent-supplied score."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork roadmap status --json\nork master pedir <thread> --formato telegram"
          }
        ]
      },
      "es": {
        "title": "Referencia del CLI",
        "description": "Encuentre comandos por tarea y compruebe sus argumentos en la versión instalada.",
        "sections": [
          {
            "id": "consultar",
            "title": "Consulte el estado",
            "paragraphs": [
              "Empiece por el diagnóstico y el panorama. Las consultas de thread, fases y claims explican el estado registrado; no conceden permiso de escritura. Use --help en el comando concreto antes de modificar datos."
            ],
            "code": "ork doctor\nork maestro --json\nork thread status <thread>\nork phase list <thread>\nork claims list <thread>"
          },
          {
            "id": "familias",
            "title": "Comandos por responsabilidad",
            "paragraphs": [
              "La conducción reúne thread, phase, modos y gate. Las pruebas usan claims, verify, fix y retry. El aislamiento usa worktree y lease. La continuidad usa handoff, recall y memory. La entrega usa ship y master. La auditoría usa audit y divida."
            ],
            "code": "ork --help\nork ship --help\nork master --help"
          },
          {
            "id": "integracoes",
            "title": "Integraciones y operación",
            "paragraphs": [
              "adapter y mcp conectan el host. accounts y setup describen runtimes y perfiles. sessions, monitor y pulse observan la ejecución y la atención humana. brain y portfolio consultan memoria y catálogo. fabrica y roadmap coordinan el trabajo entre máquinas. La referencia canónica del repositorio detalla las opciones de cada familia."
            ]
          },
          {
            "id": "contexto-e-atencao",
            "title": "Contexto citable y atención humana",
            "paragraphs": [
              "brain context devuelve entidades, padres, citas, vigencia y lagunas sin conceder escritura. roadmap status crea un informe de lectura con lo que requiere atención del dueño. master pedir genera la solicitud de nota para una respuesta humana autenticada; no es una nota dada por el agente."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork roadmap status --json\nork master pedir <thread> --formato telegram"
          }
        ]
      }
    }
  },
  {
    "slug": "contratos",
    "group": "reference",
    "sources": [
      "docs/referencia/contratos/maestro-i32.md",
      "docs/referencia/contratos/playbook-runtimes-i09.md",
      "docs/referencia/contratos/telemetria-i07.md",
      "docs/referencia/maestro-capacidades.json"
    ],
    "translations": {
      "pt": {
        "title": "Contratos e capacidades",
        "description": "Interprete snapshots, capacidades de runtime e métricas sem atribuir autoridade ao relato.",
        "sections": [
          {
            "id": "maestro",
            "title": "Panorama Maestro",
            "paragraphs": [
              "ork.maestro-snapshot/v1 é uma projeção de leitura. Suas seções declaram fonte, instante, fingerprint, estado e cobertura. empty significa vazio observado; unavailable significa fonte inacessível. Paginação e omissões fazem parte do contrato. O snapshot não cria ciclo, aprova gate ou comprova SHIP."
            ],
            "code": "ork maestro --json\nork maestro --json --thread <thread>"
          },
          {
            "id": "runtime",
            "title": "Capacidade e permissão são distintas",
            "paragraphs": [
              "O playbook descreve transporte, ferramentas nativas e limites por fase. PLAN não edita produto; GO recebe a worktree; CHECK requer revisão independente. Um schema de saída de claims contém candidatos: a resposta do modelo não registra nem verifica a alegação. Configuração instalada não comprova homologação live."
            ]
          },
          {
            "id": "telemetria",
            "title": "Métrica com cobertura e origem",
            "paragraphs": [
              "ork.ledger-stats/v1 agrega fatos registrados em um intervalo semiaberto UTC. Tokens e duração têm cobertura explícita; ausência continua ausente. custoReferencia é uma estimativa para comparar cenários, não uma fatura. Throughput depende de ship_done; não conte um commit local como entrega remota."
            ],
            "code": "ork ledger stats --desde 7d --json"
          }
        ]
      },
      "en": {
        "title": "Contracts and capabilities",
        "description": "Interpret snapshots, runtime capabilities and metrics without treating reports as authority.",
        "sections": [
          {
            "id": "maestro",
            "title": "Maestro overview",
            "paragraphs": [
              "ork.maestro-snapshot/v1 is a read projection. Its sections declare source, timestamp, fingerprint, state and coverage. empty means observed emptiness; unavailable means an inaccessible source. Pagination and omissions are part of the contract. The snapshot does not create a cycle, approve a gate or prove SHIP."
            ],
            "code": "ork maestro --json\nork maestro --json --thread <thread>"
          },
          {
            "id": "runtime",
            "title": "Capability and permission are distinct",
            "paragraphs": [
              "The playbook describes transport, native tools and phase limits. PLAN does not edit the product; GO receives the worktree; CHECK requires independent review. A claim output schema contains candidates: a model response neither registers nor verifies the assertion. Installed configuration does not prove live validation."
            ]
          },
          {
            "id": "telemetria",
            "title": "Metrics with coverage and provenance",
            "paragraphs": [
              "ork.ledger-stats/v1 aggregates recorded facts over a half-open UTC interval. Tokens and duration have explicit coverage; missing values remain missing. custoReferencia is a scenario estimate, not an invoice. Throughput depends on ship_done; do not count a local commit as remote delivery."
            ],
            "code": "ork ledger stats --desde 7d --json"
          }
        ]
      },
      "es": {
        "title": "Contratos y capacidades",
        "description": "Interprete instantáneas, capacidades de runtime y métricas sin atribuir autoridad al relato.",
        "sections": [
          {
            "id": "maestro",
            "title": "Panorama Maestro",
            "paragraphs": [
              "ork.maestro-snapshot/v1 es una proyección de lectura. Sus secciones declaran fuente, instante, fingerprint, estado y cobertura. empty significa vacío observado; unavailable significa fuente inaccesible. La paginación y las omisiones forman parte del contrato. La instantánea no crea un ciclo, aprueba un gate ni demuestra SHIP."
            ],
            "code": "ork maestro --json\nork maestro --json --thread <thread>"
          },
          {
            "id": "runtime",
            "title": "Capacidad y permiso son distintos",
            "paragraphs": [
              "El playbook describe transporte, herramientas nativas y límites por fase. PLAN no edita el producto; GO recibe la worktree; CHECK requiere revisión independiente. El schema de salida de claims contiene candidatos: una respuesta del modelo no registra ni verifica la alegación. La configuración instalada no demuestra validación en vivo."
            ]
          },
          {
            "id": "telemetria",
            "title": "Métricas con cobertura y procedencia",
            "paragraphs": [
              "ork.ledger-stats/v1 agrega hechos registrados en un intervalo UTC semiabierto. Los tokens y la duración tienen cobertura explícita; los valores ausentes siguen ausentes. custoReferencia es una estimación para comparar escenarios, no una factura. El throughput depende de ship_done; no cuente un commit local como entrega remota."
            ],
            "code": "ork ledger stats --desde 7d --json"
          }
        ]
      }
    }
  }
];
