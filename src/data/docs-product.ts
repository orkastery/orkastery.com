export default [
  {
    "slug": "produto",
    "group": "product",
    "sources": [
      "docs/produto/PLAT-01-orkastery.md",
      "docs/produto/SYS-01-nucleo-ork.md",
      "docs/produto/SYS-02-hosts-e-canais.md"
    ],
    "translations": {
      "pt": {
        "title": "Mapa do produto",
        "description": "Navegue da plataforma aos sistemas, módulos e funcionalidades.",
        "sections": [
          {
            "id": "plat-01",
            "title": "PLAT-01 · Orkastery",
            "paragraphs": [
              "A plataforma conduz desenvolvimento de software com agentes e evidência verificável. O catálogo local classifica as entidades aqui resumidas como vigentes; isso descreve documentação de comportamento, não uma homologação de toda instalação."
            ]
          },
          {
            "id": "sys-01",
            "title": "SYS-01 · Núcleo ork",
            "paragraphs": [
              "O CLI concentra condução, evidência, runtimes, atenção humana e memória. Os módulos MOD-01 a MOD-05 detalham essas responsabilidades."
            ]
          },
          {
            "id": "sys-02",
            "title": "SYS-02 · Hosts e canais",
            "paragraphs": [
              "Adaptadores conectam o núcleo a Claude Code, Codex, Hermes e OpenClaw. O MOD-06 cobre MCP e ingresso autenticado. Disponibilidade de transporte e permissões depende do host instalado."
            ]
          }
        ]
      },
      "en": {
        "title": "Product map",
        "description": "Navigate from the platform to systems, modules and features.",
        "sections": [
          {
            "id": "plat-01",
            "title": "PLAT-01 · Orkastery",
            "paragraphs": [
              "The platform conducts software development with agents and verifiable evidence. The local catalog classifies the summarized entities as current; this describes documented behavior, not validation of every installation."
            ]
          },
          {
            "id": "sys-01",
            "title": "SYS-01 · ork core",
            "paragraphs": [
              "The CLI brings together conduction, evidence, runtimes, human attention and memory. Modules MOD-01 through MOD-05 detail these responsibilities."
            ]
          },
          {
            "id": "sys-02",
            "title": "SYS-02 · Hosts and channels",
            "paragraphs": [
              "Adapters connect the core to Claude Code, Codex, Hermes and OpenClaw. MOD-06 covers MCP and authenticated ingress. Transport availability and permissions depend on the installed host."
            ]
          }
        ]
      },
      "es": {
        "title": "Mapa del producto",
        "description": "Navegue desde la plataforma a sistemas, módulos y funcionalidades.",
        "sections": [
          {
            "id": "plat-01",
            "title": "PLAT-01 · Orkastery",
            "paragraphs": [
              "La plataforma conduce el desarrollo de software con agentes y pruebas verificables. El catálogo local clasifica estas entidades como vigentes; esto describe comportamiento documentado, no la validación de todas las instalaciones."
            ]
          },
          {
            "id": "sys-01",
            "title": "SYS-01 · Núcleo ork",
            "paragraphs": [
              "El CLI reúne conducción, pruebas, runtimes, atención humana y memoria. Los módulos MOD-01 a MOD-05 detallan estas responsabilidades."
            ]
          },
          {
            "id": "sys-02",
            "title": "SYS-02 · Hosts y canales",
            "paragraphs": [
              "Los adaptadores conectan el núcleo a Claude Code, Codex, Hermes y OpenClaw. MOD-06 cubre MCP e ingreso autenticado. La disponibilidad del transporte y los permisos dependen del host instalado."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "mod-01",
    "group": "product",
    "sources": [
      "docs/produto/MOD-01-conducao-de-threads.md",
      "docs/produto/FEAT-001-thread-e-seis-fases.md",
      "docs/produto/FEAT-002-modos-de-conducao.md",
      "docs/produto/FEAT-003-despacho-de-fase.md",
      "docs/produto/FEAT-023-onboarding-do-projeto.md",
      "docs/produto/FEAT-025-catalogo-de-portfolio.md",
      "docs/produto/FEAT-026-reservas-do-roadmap.md",
      "docs/produto/FEAT-027-fabrica-compartilhada.md",
      "docs/produto/FEAT-029-conducao-multicanal.md"
    ],
    "translations": {
      "pt": {
        "title": "MOD-01 · Condução de threads",
        "description": "Comportamentos e limites de condução de threads, conforme o catálogo de produto revisado.",
        "sections": [
          {
            "id": "feat-001",
            "title": "FEAT-001 · Threads e fases",
            "paragraphs": [
              "Cada pedido tem uma thread, estado e ledger próprios. A lista padrão mostra threads abertas; o ciclo completo mantém seis fases."
            ]
          },
          {
            "id": "feat-002",
            "title": "FEAT-002 · Modos de condução",
            "paragraphs": [
              "#Classic, #Maestro e #Auto mudam as pausas. #Fast executa apenas GO e não autoriza push nem alterações de contrato público."
            ]
          },
          {
            "id": "feat-003",
            "title": "FEAT-003 · Despacho de fase",
            "paragraphs": [
              "O núcleo monta o prompt e registra seu hash, runtime, modelo e esforço efetivos. Falhas seguem o fallback configurado; o agente não escolhe outra identidade por conta própria."
            ]
          },
          {
            "id": "feat-023",
            "title": "FEAT-023 · Onboarding",
            "paragraphs": [
              "A pauta registra respostas públicas e referências de credenciais. Publicação na memória é opcional; os valores secretos ficam fora da entrevista."
            ]
          },
          {
            "id": "feat-025",
            "title": "FEAT-025 · Catálogo de portfólio",
            "paragraphs": [
              "Produto, projeto e iniciativa têm pais e escopo explícitos. Pai inexistente e escopo incompatível são recusados."
            ]
          },
          {
            "id": "feat-026",
            "title": "FEAT-026 · Reservas entre máquinas",
            "paragraphs": [
              "A reserva coordena quem assume um item por uma gravação atômica no remoto. Conflito informa a máquina responsável; requer acesso de rede autorizado."
            ]
          },
          {
            "id": "feat-027",
            "title": "FEAT-027 · Fábrica compartilhada",
            "paragraphs": [
              "Cada máquina publica seu retrato numa branch própria de estado. Sem rede, a leitura usa a última cópia com aviso; não presume dados atuais."
            ]
          },
          {
            "id": "feat-029",
            "title": "FEAT-029 · Condução multicanal",
            "paragraphs": [
              "Os canais compartilham a autoridade do núcleo. Uma segunda execução concorrente na mesma worktree é recusada com a identificação de quem conduz."
            ]
          }
        ]
      },
      "en": {
        "title": "MOD-01 · Thread conduction",
        "description": "Behavior and limits for thread conduction, based on the reviewed product catalog.",
        "sections": [
          {
            "id": "feat-001",
            "title": "FEAT-001 · Threads and phases",
            "paragraphs": [
              "Each request has its own thread, state and ledger. The default list shows open threads; the full cycle retains six phases."
            ]
          },
          {
            "id": "feat-002",
            "title": "FEAT-002 · Conduction modes",
            "paragraphs": [
              " #Classic, #Maestro and #Auto change pauses. #Fast runs only GO and does not authorize push or public contract changes."
            ]
          },
          {
            "id": "feat-003",
            "title": "FEAT-003 · Phase dispatch",
            "paragraphs": [
              "The core assembles the prompt and records its hash and effective runtime, model and effort. Failures follow configured fallback; an agent cannot choose another identity on its own."
            ]
          },
          {
            "id": "feat-023",
            "title": "FEAT-023 · Project onboarding",
            "paragraphs": [
              "The interview records public answers and credential references. Publishing to memory is optional; secret values stay out of the interview."
            ]
          },
          {
            "id": "feat-025",
            "title": "FEAT-025 · Portfolio catalog",
            "paragraphs": [
              "Products, projects and initiatives have explicit parents and scope. Missing parents and incompatible scope are rejected."
            ]
          },
          {
            "id": "feat-026",
            "title": "FEAT-026 · Cross-machine reservations",
            "paragraphs": [
              "Reservations coordinate who takes an item through an atomic remote write. Conflicts identify the responsible machine; authorized network access is required."
            ]
          },
          {
            "id": "feat-027",
            "title": "FEAT-027 · Shared factory",
            "paragraphs": [
              "Each machine publishes its snapshot to a dedicated state branch. Offline reads use the last copy with a warning; they do not assume current data."
            ]
          },
          {
            "id": "feat-029",
            "title": "FEAT-029 · Multichannel conduction",
            "paragraphs": [
              "Channels share core authority. A second concurrent execution in the same worktree is rejected with the current conductor identified."
            ]
          }
        ]
      },
      "es": {
        "title": "MOD-01 · Conducción de threads",
        "description": "Comportamientos y límites de conducción de threads, según el catálogo de producto revisado.",
        "sections": [
          {
            "id": "feat-001",
            "title": "FEAT-001 · Threads y fases",
            "paragraphs": [
              "Cada petición tiene su thread, estado y ledger. La lista predeterminada muestra las abiertas; el ciclo completo conserva seis fases."
            ]
          },
          {
            "id": "feat-002",
            "title": "FEAT-002 · Modos de conducción",
            "paragraphs": [
              "#Classic, #Maestro y #Auto cambian las pausas. #Fast ejecuta solo GO y no autoriza push ni cambios de contrato público."
            ]
          },
          {
            "id": "feat-003",
            "title": "FEAT-003 · Despacho de fase",
            "paragraphs": [
              "El núcleo prepara el prompt y registra su hash, runtime, modelo y esfuerzo efectivos. Los fallos siguen el fallback configurado; el agente no elige otra identidad por su cuenta."
            ]
          },
          {
            "id": "feat-023",
            "title": "FEAT-023 · Configuración inicial",
            "paragraphs": [
              "La entrevista registra respuestas públicas y referencias de credenciales. La publicación en memoria es opcional; los valores secretos quedan fuera de la entrevista."
            ]
          },
          {
            "id": "feat-025",
            "title": "FEAT-025 · Catálogo de portafolio",
            "paragraphs": [
              "Productos, proyectos e iniciativas tienen padres y alcance explícitos. Se rechazan padres inexistentes y alcances incompatibles."
            ]
          },
          {
            "id": "feat-026",
            "title": "FEAT-026 · Reservas entre máquinas",
            "paragraphs": [
              "Las reservas coordinan quién asume un elemento mediante una escritura atómica en el remoto. Los conflictos identifican la máquina responsable; se requiere acceso de red autorizado."
            ]
          },
          {
            "id": "feat-027",
            "title": "FEAT-027 · Fábrica compartida",
            "paragraphs": [
              "Cada máquina publica su instantánea en una rama de estado dedicada. Sin red se lee la última copia con aviso; no se presumen datos actuales."
            ]
          },
          {
            "id": "feat-029",
            "title": "FEAT-029 · Conducción multicanal",
            "paragraphs": [
              "Los canales comparten la autoridad del núcleo. Una segunda ejecución simultánea en la misma worktree se rechaza identificando a quien conduce."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "mod-02",
    "group": "product",
    "sources": [
      "docs/produto/MOD-02-verdade-e-entrega.md",
      "docs/produto/FEAT-004-claims-e-verify.md",
      "docs/produto/FEAT-005-ci-check-independente.md",
      "docs/produto/FEAT-006-ship-com-push-provado.md",
      "docs/produto/FEAT-007-worktree-e-leases.md"
    ],
    "translations": {
      "pt": {
        "title": "MOD-02 · Verdade e entrega",
        "description": "Comportamentos e limites de verdade e entrega, conforme o catálogo de produto revisado.",
        "sections": [
          {
            "id": "feat-004",
            "title": "FEAT-004 · Claims e verificação",
            "paragraphs": [
              "A claim precisa de comando executado no HEAD real. Resultado pendente, timeout ou prova retirada não contam como aprovação."
            ]
          },
          {
            "id": "feat-005",
            "title": "FEAT-005 · CHECK independente no CI",
            "paragraphs": [
              "O bundle de claims é reexecutado no SHA exato da candidata. Uma execução de outra thread ou outro commit não prova esta mudança."
            ]
          },
          {
            "id": "feat-006",
            "title": "FEAT-006 · Entrega com push comprovado",
            "paragraphs": [
              "SHIP serializa o merge por lease e confere o remoto. Dry-run e commit local não são recibos de publicação."
            ]
          },
          {
            "id": "feat-007",
            "title": "FEAT-007 · Worktrees e leases",
            "paragraphs": [
              "Cada thread edita sua worktree. Leases de árvore, caminhos, cards e serviços coordenam recursos; a auditoria recusa divergência entre Git e registro."
            ]
          }
        ]
      },
      "en": {
        "title": "MOD-02 · Evidence and delivery",
        "description": "Behavior and limits for evidence and delivery, based on the reviewed product catalog.",
        "sections": [
          {
            "id": "feat-004",
            "title": "FEAT-004 · Claims and verification",
            "paragraphs": [
              "A claim needs a command executed against the actual HEAD. Pending results, timeouts and withdrawn evidence do not count as a pass."
            ]
          },
          {
            "id": "feat-005",
            "title": "FEAT-005 · Independent CHECK in CI",
            "paragraphs": [
              "The claim bundle is rerun against the candidate’s exact SHA. A run for another thread or commit does not prove this change."
            ]
          },
          {
            "id": "feat-006",
            "title": "FEAT-006 · Delivery with verified push",
            "paragraphs": [
              "SHIP serializes the merge through a lease and checks the remote. Dry runs and local commits are not publication receipts."
            ]
          },
          {
            "id": "feat-007",
            "title": "FEAT-007 · Worktrees and leases",
            "paragraphs": [
              "Each thread edits its own worktree. Tree, path, card and service leases coordinate resources; auditing rejects disagreement between Git and recorded state."
            ]
          }
        ]
      },
      "es": {
        "title": "MOD-02 · Pruebas y entrega",
        "description": "Comportamientos y límites de pruebas y entrega, según el catálogo de producto revisado.",
        "sections": [
          {
            "id": "feat-004",
            "title": "FEAT-004 · Claims y verificación",
            "paragraphs": [
              "Una claim necesita un comando ejecutado sobre el HEAD real. Los resultados pendientes, timeouts y pruebas retiradas no cuentan como aprobación."
            ]
          },
          {
            "id": "feat-005",
            "title": "FEAT-005 · CHECK independiente en CI",
            "paragraphs": [
              "El bundle de claims se vuelve a ejecutar sobre el SHA exacto de la candidata. Una ejecución de otra thread o commit no demuestra este cambio."
            ]
          },
          {
            "id": "feat-006",
            "title": "FEAT-006 · Entrega con push demostrado",
            "paragraphs": [
              "SHIP serializa el merge mediante un lease y comprueba el remoto. Un dry-run o commit local no es un comprobante de publicación."
            ]
          },
          {
            "id": "feat-007",
            "title": "FEAT-007 · Worktrees y leases",
            "paragraphs": [
              "Cada thread edita su worktree. Los leases de árbol, rutas, tarjetas y servicios coordinan recursos; la auditoría rechaza divergencias entre Git y el registro."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "mod-03",
    "group": "product",
    "sources": [
      "docs/produto/MOD-03-runtimes-e-contas.md",
      "docs/produto/FEAT-008-rodizio-de-contas.md",
      "docs/produto/FEAT-009-retry-tipado.md",
      "docs/produto/FEAT-010-observacao-de-sessoes.md",
      "docs/produto/FEAT-022-auditoria-e-divida.md"
    ],
    "translations": {
      "pt": {
        "title": "MOD-03 · Runtimes e contas",
        "description": "Comportamentos e limites de runtimes e contas, conforme o catálogo de produto revisado.",
        "sections": [
          {
            "id": "feat-008",
            "title": "FEAT-008 · Rodízio de contas",
            "paragraphs": [
              "Cota esgotada pode seguir a política de rotação ou fallback. Rate limit curto aguarda na fila; a operação não copia credenciais entre perfis."
            ]
          },
          {
            "id": "feat-009",
            "title": "FEAT-009 · Retry por motivo",
            "paragraphs": [
              "A causa tipada determina a ação. O limite de tentativas escala em qualquer modo; cost.violation não recebe retry automático."
            ]
          },
          {
            "id": "feat-010",
            "title": "FEAT-010 · Observação de sessões",
            "paragraphs": [
              "Sensores consultam o runtime para confirmar estado e conclusão. Adotar uma sessão não executa seu prompt; um relato de sucesso não encerra a fase."
            ]
          },
          {
            "id": "feat-022",
            "title": "FEAT-022 · Auditoria e dívida",
            "paragraphs": [
              "Achados têm claims reexecutáveis e estado com histórico. Adiar ou descartar requer registro; o auditor não trata seu relato como prova."
            ]
          }
        ]
      },
      "en": {
        "title": "MOD-03 · Runtimes and accounts",
        "description": "Behavior and limits for runtimes and accounts, based on the reviewed product catalog.",
        "sections": [
          {
            "id": "feat-008",
            "title": "FEAT-008 · Account rotation",
            "paragraphs": [
              "Exhausted quota can follow rotation or fallback policy. Short rate limits wait in the queue; the operation does not copy credentials between profiles."
            ]
          },
          {
            "id": "feat-009",
            "title": "FEAT-009 · Reason-based retry",
            "paragraphs": [
              "The typed cause determines the action. Attempt limits escalate in every mode; cost.violation never receives automatic retry."
            ]
          },
          {
            "id": "feat-010",
            "title": "FEAT-010 · Session observation",
            "paragraphs": [
              "Sensors query the runtime to confirm state and completion. Adopting a session does not execute its prompt; a success report does not complete the phase."
            ]
          },
          {
            "id": "feat-022",
            "title": "FEAT-022 · Auditing and debt",
            "paragraphs": [
              "Findings have reproducible claims and historical state. Deferral or dismissal requires a record; an auditor’s report is not itself evidence."
            ]
          }
        ]
      },
      "es": {
        "title": "MOD-03 · Runtimes y cuentas",
        "description": "Comportamientos y límites de runtimes y cuentas, según el catálogo de producto revisado.",
        "sections": [
          {
            "id": "feat-008",
            "title": "FEAT-008 · Rotación de cuentas",
            "paragraphs": [
              "Una cuota agotada puede seguir la política de rotación o fallback. Los límites breves esperan en la cola; la operación no copia credenciales entre perfiles."
            ]
          },
          {
            "id": "feat-009",
            "title": "FEAT-009 · Reintentos según el motivo",
            "paragraphs": [
              "La causa tipada determina la acción. El límite de intentos escala en cualquier modo; cost.violation no recibe reintentos automáticos."
            ]
          },
          {
            "id": "feat-010",
            "title": "FEAT-010 · Observación de sesiones",
            "paragraphs": [
              "Los sensores consultan el runtime para confirmar estado y finalización. Adoptar una sesión no ejecuta su prompt; un informe de éxito no termina la fase."
            ]
          },
          {
            "id": "feat-022",
            "title": "FEAT-022 · Auditoría y deuda",
            "paragraphs": [
              "Los hallazgos tienen claims reproducibles y estado con historial. Aplazar o descartar requiere registro; el informe del auditor no es una prueba por sí mismo."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "mod-04",
    "group": "product",
    "sources": [
      "docs/produto/MOD-04-atencao-humana.md",
      "docs/produto/FEAT-011-hitl-em-camadas.md",
      "docs/produto/FEAT-012-decisao-tomada.md",
      "docs/produto/FEAT-013-horario-do-dono.md",
      "docs/produto/FEAT-014-monitor-board-e-pulse.md",
      "docs/produto/FEAT-015-entrega-e-indice-master.md"
    ],
    "translations": {
      "pt": {
        "title": "MOD-04 · Atenção humana",
        "description": "Comportamentos e limites de atenção humana, conforme o catálogo de produto revisado.",
        "sections": [
          {
            "id": "feat-011",
            "title": "FEAT-011 · Atenção humana em camadas",
            "paragraphs": [
              "O resumo prepara a decisão, com alternativas e recomendação. Prazo vencido espera ou escala; não significa consentimento."
            ]
          },
          {
            "id": "feat-012",
            "title": "FEAT-012 · Decisões com prestação de contas",
            "paragraphs": [
              "Escolhas delegadas registram motivo, reversão e custo de mudar. O dono pode revê-las; atos irreversíveis seguem a autorização exigida."
            ]
          },
          {
            "id": "feat-013",
            "title": "FEAT-013 · Fuso do dono",
            "paragraphs": [
              "A apresentação usa owner.timezone. Ledger, hashes e recibos continuam em UTC ISO; um fuso inválido gera aviso."
            ]
          },
          {
            "id": "feat-014",
            "title": "FEAT-014 · Monitor, board e pulse",
            "paragraphs": [
              "O estado vem de threads, ledger e filas. Sessões mortas não devem pedir resposta como se ainda pudessem recebê-la; lacunas da fonte são declaradas."
            ]
          },
          {
            "id": "feat-015",
            "title": "FEAT-015 · MASTER e índice de condução",
            "paragraphs": [
              "MASTER registra postmortem e índice derivado do ledger. A nota humana posterior substitui a aceitação por omissão sem apagar o histórico."
            ]
          }
        ]
      },
      "en": {
        "title": "MOD-04 · Human attention",
        "description": "Behavior and limits for human attention, based on the reviewed product catalog.",
        "sections": [
          {
            "id": "feat-011",
            "title": "FEAT-011 · Layered human attention",
            "paragraphs": [
              "The summary prepares the decision with options and a recommendation. Expired deadlines wait or escalate; they do not mean consent."
            ]
          },
          {
            "id": "feat-012",
            "title": "FEAT-012 · Accountable decisions",
            "paragraphs": [
              "Delegated choices record rationale, reversal and the cost of change. The owner can revisit them; irreversible acts follow required authorization."
            ]
          },
          {
            "id": "feat-013",
            "title": "FEAT-013 · Owner timezone",
            "paragraphs": [
              "Presentation uses owner.timezone. The ledger, hashes and receipts retain UTC ISO; an invalid timezone raises a warning."
            ]
          },
          {
            "id": "feat-014",
            "title": "FEAT-014 · Monitor, board and pulse",
            "paragraphs": [
              "State comes from threads, the ledger and queues. Dead sessions must not request answers as if they could receive them; source gaps are declared."
            ]
          },
          {
            "id": "feat-015",
            "title": "FEAT-015 · MASTER and conduction index",
            "paragraphs": [
              "MASTER records a postmortem and a ledger-derived index. A later human score supersedes default acceptance without erasing history."
            ]
          }
        ]
      },
      "es": {
        "title": "MOD-04 · Atención humana",
        "description": "Comportamientos y límites de atención humana, según el catálogo de producto revisado.",
        "sections": [
          {
            "id": "feat-011",
            "title": "FEAT-011 · Atención humana por capas",
            "paragraphs": [
              "El resumen prepara la decisión con opciones y recomendación. Un plazo vencido espera o escala; no significa consentimiento."
            ]
          },
          {
            "id": "feat-012",
            "title": "FEAT-012 · Decisiones con rendición de cuentas",
            "paragraphs": [
              "Las decisiones delegadas registran motivo, reversión y coste del cambio. El dueño puede revisarlas; los actos irreversibles siguen la autorización exigida."
            ]
          },
          {
            "id": "feat-013",
            "title": "FEAT-013 · Zona horaria del dueño",
            "paragraphs": [
              "La presentación usa owner.timezone. El ledger, hashes y comprobantes conservan UTC ISO; una zona inválida genera un aviso."
            ]
          },
          {
            "id": "feat-014",
            "title": "FEAT-014 · Monitor, board y pulse",
            "paragraphs": [
              "El estado procede de threads, ledger y colas. Las sesiones terminadas no deben pedir respuestas como si pudieran recibirlas; se declaran las lagunas de la fuente."
            ]
          },
          {
            "id": "feat-015",
            "title": "FEAT-015 · MASTER e índice de conducción",
            "paragraphs": [
              "MASTER registra un postmortem y un índice derivado del ledger. Una nota humana posterior sustituye la aceptación por omisión sin borrar el historial."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "mod-05",
    "group": "product",
    "sources": [
      "docs/produto/MOD-05-memoria-e-registro.md",
      "docs/produto/FEAT-016-handoff-e-recall.md",
      "docs/produto/FEAT-017-memoria-orkmind.md",
      "docs/produto/FEAT-018-documentacao-como-codigo.md",
      "docs/produto/FEAT-019-telemetria-do-ledger.md",
      "docs/produto/FEAT-024-company-brain-no-cli.md",
      "docs/produto/FEAT-028-loop-de-aprendizado.md"
    ],
    "translations": {
      "pt": {
        "title": "MOD-05 · Memória e registro",
        "description": "Comportamentos e limites de memória e registro, conforme o catálogo de produto revisado.",
        "sections": [
          {
            "id": "feat-016",
            "title": "FEAT-016 · Handoff e recall",
            "paragraphs": [
              "O contexto passa por triagem: crítico, importante e resumível. O recall recupera ponteiros quando necessários; não recarrega toda a conversa."
            ]
          },
          {
            "id": "feat-017",
            "title": "FEAT-017 · Memória OrkMind",
            "paragraphs": [
              "O tenant do projeto recebe decisões, handoffs e lições conforme as permissões. Indisponibilidade degrada para arquivos com evento explícito; não usa outra base silenciosamente."
            ]
          },
          {
            "id": "feat-018",
            "title": "FEAT-018 · Documentação como código",
            "paragraphs": [
              "Frontmatter e vínculos são conferidos contra código e Git. O sincronizador não transforma automaticamente um plano em deploy ou disponibilidade."
            ]
          },
          {
            "id": "feat-019",
            "title": "FEAT-019 · Telemetria do ledger",
            "paragraphs": [
              "Métricas declaram período, origem e cobertura. Estimativas exigem método, premissas e autor; não se apresentam como horas ou gastos medidos."
            ]
          },
          {
            "id": "feat-024",
            "title": "FEAT-024 · Company Brain no CLI",
            "paragraphs": [
              "ork brain usa a identidade do login autenticado e começa em leitura. Escrita exige ativação; principal ou DSN fornecidos pela conversa não se tornam autoridade."
            ]
          },
          {
            "id": "feat-028",
            "title": "FEAT-028 · Aprendizado entre threads",
            "paragraphs": [
              "Lições de threads fechadas voltam ao GOAL e PLAN do mesmo produto. Falhas repetidas propõem policies; a proposta não ativa um bloqueio sozinha."
            ]
          }
        ]
      },
      "en": {
        "title": "MOD-05 · Memory and records",
        "description": "Behavior and limits for memory and records, based on the reviewed product catalog.",
        "sections": [
          {
            "id": "feat-016",
            "title": "FEAT-016 · Handoff and recall",
            "paragraphs": [
              "Context is triaged as critical, important or summarizable. Recall resolves pointers when needed; it does not reload the entire conversation."
            ]
          },
          {
            "id": "feat-017",
            "title": "FEAT-017 · OrkMind memory",
            "paragraphs": [
              "The project tenant receives decisions, handoffs and lessons according to permissions. Unavailability degrades to files with an explicit event; it does not silently use another database."
            ]
          },
          {
            "id": "feat-018",
            "title": "FEAT-018 · Documentation as code",
            "paragraphs": [
              "Frontmatter and links are checked against code and Git. Synchronization does not automatically turn a plan into deployment or availability."
            ]
          },
          {
            "id": "feat-019",
            "title": "FEAT-019 · Ledger telemetry",
            "paragraphs": [
              "Metrics declare time range, provenance and coverage. Estimates require a method, assumptions and author; they are not presented as measured hours or spending."
            ]
          },
          {
            "id": "feat-024",
            "title": "FEAT-024 · Company Brain in the CLI",
            "paragraphs": [
              "ork brain uses the authenticated login identity and defaults to reading. Writing requires activation; a principal or DSN supplied in conversation does not become authority."
            ]
          },
          {
            "id": "feat-028",
            "title": "FEAT-028 · Learning across threads",
            "paragraphs": [
              "Lessons from closed threads feed GOAL and PLAN for the same product. Repeated failures propose policies; a proposal does not activate a block on its own."
            ]
          }
        ]
      },
      "es": {
        "title": "MOD-05 · Memoria y registro",
        "description": "Comportamientos y límites de memoria y registro, según el catálogo de producto revisado.",
        "sections": [
          {
            "id": "feat-016",
            "title": "FEAT-016 · Handoff y recall",
            "paragraphs": [
              "El contexto se clasifica como crítico, importante o resumible. El recall resuelve referencias cuando hace falta; no recarga toda la conversación."
            ]
          },
          {
            "id": "feat-017",
            "title": "FEAT-017 · Memoria OrkMind",
            "paragraphs": [
              "El tenant del proyecto recibe decisiones, handoffs y lecciones según los permisos. La indisponibilidad degrada a archivos con un evento explícito; no usa otra base en silencio."
            ]
          },
          {
            "id": "feat-018",
            "title": "FEAT-018 · Documentación como código",
            "paragraphs": [
              "El frontmatter y los vínculos se comprueban contra código y Git. La sincronización no convierte automáticamente un plan en despliegue o disponibilidad."
            ]
          },
          {
            "id": "feat-019",
            "title": "FEAT-019 · Telemetría del ledger",
            "paragraphs": [
              "Las métricas declaran período, procedencia y cobertura. Las estimaciones requieren método, premisas y autor; no se presentan como horas o gastos medidos."
            ]
          },
          {
            "id": "feat-024",
            "title": "FEAT-024 · Company Brain en el CLI",
            "paragraphs": [
              "ork brain usa la identidad del inicio de sesión autenticado y comienza en lectura. La escritura requiere activación; un principal o DSN aportado en la conversación no se convierte en autoridad."
            ]
          },
          {
            "id": "feat-028",
            "title": "FEAT-028 · Aprendizaje entre threads",
            "paragraphs": [
              "Las lecciones de threads cerradas alimentan GOAL y PLAN del mismo producto. Los fallos repetidos proponen políticas; una propuesta no activa un bloqueo por sí sola."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "mod-06",
    "group": "product",
    "sources": [
      "docs/produto/MOD-06-integracao-com-hosts.md",
      "docs/produto/FEAT-020-mcp-e-adaptadores.md",
      "docs/produto/FEAT-021-ingresso-hitl-telegram.md"
    ],
    "translations": {
      "pt": {
        "title": "MOD-06 · Integração com hosts",
        "description": "Comportamentos e limites de integração com hosts, conforme o catálogo de produto revisado.",
        "sections": [
          {
            "id": "feat-020",
            "title": "FEAT-020 · MCP e adaptadores",
            "paragraphs": [
              "A instalação produz recibos e hashes. O host encaminha operações; a interpretação de modo e as regras de gate permanecem no núcleo."
            ]
          },
          {
            "id": "feat-021",
            "title": "FEAT-021 · Ingresso autenticado",
            "paragraphs": [
              "O ingresso Telegram valida a prova do update e sua identidade. Texto livre e envelopes fabricados pelo agente não aprovam gates."
            ]
          }
        ]
      },
      "en": {
        "title": "MOD-06 · Host integration",
        "description": "Behavior and limits for host integration, based on the reviewed product catalog.",
        "sections": [
          {
            "id": "feat-020",
            "title": "FEAT-020 · MCP and adapters",
            "paragraphs": [
              "Installation produces receipts and hashes. The host forwards operations; mode interpretation and gate rules remain in the core."
            ]
          },
          {
            "id": "feat-021",
            "title": "FEAT-021 · Authenticated ingress",
            "paragraphs": [
              "Telegram ingress validates the update’s proof and identity. Free text and agent-fabricated envelopes do not approve gates."
            ]
          }
        ]
      },
      "es": {
        "title": "MOD-06 · Integración con hosts",
        "description": "Comportamientos y límites de integración con hosts, según el catálogo de producto revisado.",
        "sections": [
          {
            "id": "feat-020",
            "title": "FEAT-020 · MCP y adaptadores",
            "paragraphs": [
              "La instalación produce comprobantes y hashes. El host transmite operaciones; la interpretación del modo y las reglas del gate permanecen en el núcleo."
            ]
          },
          {
            "id": "feat-021",
            "title": "FEAT-021 · Ingreso autenticado",
            "paragraphs": [
              "El ingreso de Telegram valida la prueba del update y su identidad. El texto libre y los sobres fabricados por un agente no aprueban gates."
            ]
          }
        ]
      }
    }
  }
];
