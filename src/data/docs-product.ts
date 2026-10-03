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
              "O CLI concentra condução, evidência, runtimes, atenção humana e memória. Os módulos MOD-01 a MOD-05 detalham essas responsabilidades. O código fica em core/src, em TypeScript, com nove dependências de runtime de versão fixa, entre elas os analisadores do grafo de código."
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
              "The CLI brings together conduction, evidence, runtimes, human attention and memory. Modules MOD-01 through MOD-05 detail these responsibilities. The code lives in core/src, in TypeScript, with nine pinned runtime dependencies, including the code graph analyzers."
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
              "El CLI reúne conducción, pruebas, runtimes, atención humana y memoria. Los módulos MOD-01 a MOD-05 detallan estas responsabilidades. El código está en core/src, en TypeScript, con nueve dependencias de runtime de versión fija, entre ellas los analizadores del grafo de código."
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
      "docs/produto/FEAT-029-conducao-multicanal.md",
      "docs/produto/FEAT-032-roadmap-da-rede.md",
      "docs/produto/FEAT-031-orkastery-network.md"
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
              "Cada pedido tem uma thread, estado e ledger próprios. A lista padrão mostra threads abertas; o ciclo completo mantém seis fases.",
              "Com worktree.por_thread: true, o que o ork init grava, ork thread new cria a worktree e a branch da thread sem flag; --sem-worktree cria a thread sem elas, e --dry-run mostra a worktree que seria criada. Com a chave false ou ausente, a worktree só nasce com --worktree auto."
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
              "A reserva coordena quem assume um item por uma gravação atômica no remoto. Conflito informa a máquina responsável; requer acesso de rede autorizado. Fechar a thread solta a reserva ou a passa para outra thread aberta do mesmo item; a reserva órfã é marcada e sai com --soltar-orfas. ork roadmap feat reserva o próximo número de FEAT entre máquinas, e o número reservado não volta."
            ]
          },
          {
            "id": "feat-027",
            "title": "FEAT-027 · Fábrica compartilhada",
            "paragraphs": [
              "Cada máquina publica seu retrato numa branch própria de estado. Sem rede, a leitura usa a última cópia com aviso; não presume dados atuais. O retrato traz runtime, modelo e esforço de cada thread, vindos do último despacho; thread sem despacho aparece sem runtime, nunca com um inventado."
            ]
          },
          {
            "id": "feat-029",
            "title": "FEAT-029 · Condução multicanal",
            "paragraphs": [
              "Os canais compartilham a autoridade do núcleo. Uma segunda execução concorrente na mesma worktree é recusada com a identificação de quem conduz."
            ]
          },
          {
            "id": "feat-031",
            "title": "FEAT-031 · Orkastery Network",
            "paragraphs": [
              "Cada máquina publica um retrato sem segredo num repositório privado da pessoa na forja, e ork network status mostra todas, de qualquer diretório, com a fonte e as lacunas. A adesão é da máquina, explícita ou herdada de ork fabrica entrar; ork network sair vence a herança, e o manifesto do projeto não inscreve ninguém. Publicar exige a casa privada, conferida antes de cada publicação; repositório público recusa com rede.repositorio-publico.",
              "O retrato é uma lista de permissão: campo com cara de segredo recusa a publicação, e projeto com cara de segredo fica fora com aviso. Cada máquina só escreve o próprio retrato; nome tomado por outra instalação vira rede.nome-em-uso, e --forcar o toma com registro no commit. Lacuna nunca vira lista vazia. Em desenvolvimento: está na main, sem versão publicada."
            ],
            "code": "ork network entrar --maquina pc-casa\nork network status --json"
          },
          {
            "id": "feat-032",
            "title": "FEAT-032 · Roadmap da rede",
            "paragraphs": [
              "ork network roadmap junta, de qualquer diretório, o roadmap da base remota, as reservas e as threads de cada máquina, com a fonte e a hora de cada parte. Sem clone, só consulta a forja pela CLI já autenticada; o que não foi lido sai como lacuna tipada, nunca como vazio. Nos hosts, ork_network_roadmap transporta essa leitura como vem. Vigente: publicado na versão 0.5.0. Na main, a fatia 3 lê também a rede por pessoa: a seção Rede por pessoa traz a casa e cada máquina; máquina vista só na rede sai com as threads não lidas e a lacuna maquina.sem-fabrica, nunca com zero threads. ork_network_status chega ao OpenClaw, ao Hermes e ao MCP, e o gh e o glab são achados fora do PATH curto do gateway e do cron."
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
              "Each request has its own thread, state and ledger. The default list shows open threads; the full cycle retains six phases.",
              "With worktree.por_thread: true, which ork init writes, ork thread new creates the thread’s worktree and branch without a flag; --sem-worktree creates the thread without them, and --dry-run shows the worktree that would be created. With the key false or absent, a worktree is only created with --worktree auto."
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
              "Reservations coordinate who takes an item through an atomic remote write. Conflicts identify the responsible machine; authorized network access is required. Closing a thread releases its reservation or passes it to another open thread on the same item; orphaned reservations are flagged and released with --soltar-orfas. ork roadmap feat reserves the next FEAT number across machines, and a reserved number is never reused."
            ]
          },
          {
            "id": "feat-027",
            "title": "FEAT-027 · Shared factory",
            "paragraphs": [
              "Each machine publishes its snapshot to a dedicated state branch. Offline reads use the last copy with a warning; they do not assume current data. The snapshot shows each thread’s runtime, model and effort from its last dispatch; a thread without a dispatch shows no runtime rather than an invented one."
            ]
          },
          {
            "id": "feat-029",
            "title": "FEAT-029 · Multichannel conduction",
            "paragraphs": [
              "Channels share core authority. A second concurrent execution in the same worktree is rejected with the current conductor identified."
            ]
          },
          {
            "id": "feat-031",
            "title": "FEAT-031 · Orkastery Network",
            "paragraphs": [
              "Each machine publishes a secret-free snapshot to a private repository of the person on the forge, and ork network status shows all of them, from any directory, with the source and the gaps. Membership belongs to the machine, explicit or inherited from ork fabrica entrar; ork network sair overrides the inheritance, and the project manifest enrolls no one. Publishing requires a private home, checked before each publication; a public repository is refused with rede.repositorio-publico.",
              "The snapshot is an allowlist: a field that looks like a secret refuses the publication, and a project that looks like a secret is left out with a warning. Each machine writes only its own snapshot; a name taken by another installation becomes rede.nome-em-uso, and --forcar takes it with a record in the commit. A gap never becomes an empty list. In development: on main, not yet in a published version."
            ],
            "code": "ork network entrar --maquina pc-casa\nork network status --json"
          },
          {
            "id": "feat-032",
            "title": "FEAT-032 · Network roadmap",
            "paragraphs": [
              "From any directory, ork network roadmap combines the remote base roadmap, reservations and each machine’s threads, with the source and time of every part. Without a clone, it only queries the forge through the already authenticated CLI; anything not read appears as a typed gap, never as empty. In hosts, ork_network_roadmap passes this result through unchanged. Current: released in version 0.5.0. On main, slice 3 also reads the per-person network: the Network by person section shows the home and each machine; a machine seen only in the network appears with unread threads and the maquina.sem-fabrica gap, never with zero threads. ork_network_status reaches OpenClaw, Hermes and MCP, and gh and glab are found outside the short PATH of the gateway and cron."
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
              "Cada petición tiene su thread, estado y ledger. La lista predeterminada muestra las abiertas; el ciclo completo conserva seis fases.",
              "Con worktree.por_thread: true, lo que graba ork init, ork thread new crea la worktree y la rama de la thread sin flag; --sem-worktree crea la thread sin ellas, y --dry-run muestra la worktree que se crearía. Con la clave en false o ausente, la worktree solo nace con --worktree auto."
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
              "Las reservas coordinan quién asume un elemento mediante una escritura atómica en el remoto. Los conflictos identifican la máquina responsable; se requiere acceso de red autorizado. Cerrar la thread libera la reserva o la pasa a otra thread abierta del mismo elemento; la reserva huérfana se marca y se libera con --soltar-orfas. ork roadmap feat reserva el siguiente número de FEAT entre máquinas, y el número reservado no se reutiliza."
            ]
          },
          {
            "id": "feat-027",
            "title": "FEAT-027 · Fábrica compartida",
            "paragraphs": [
              "Cada máquina publica su instantánea en una rama de estado dedicada. Sin red se lee la última copia con aviso; no se presumen datos actuales. La instantánea muestra el runtime, el modelo y el esfuerzo de cada thread a partir del último despacho; una thread sin despacho aparece sin runtime, nunca con uno inventado."
            ]
          },
          {
            "id": "feat-029",
            "title": "FEAT-029 · Conducción multicanal",
            "paragraphs": [
              "Los canales comparten la autoridad del núcleo. Una segunda ejecución simultánea en la misma worktree se rechaza identificando a quien conduce."
            ]
          },
          {
            "id": "feat-031",
            "title": "FEAT-031 · Orkastery Network",
            "paragraphs": [
              "Cada máquina publica una instantánea sin secretos en un repositorio privado de la persona en la forja, y ork network status las muestra todas, desde cualquier directorio, con la fuente y las lagunas. La adhesión es de la máquina, explícita o heredada de ork fabrica entrar; ork network sair prevalece sobre la herencia, y el manifiesto del proyecto no inscribe a nadie. Publicar exige la casa privada, comprobada antes de cada publicación; un repositorio público se rechaza con rede.repositorio-publico.",
              "La instantánea es una lista de permitidos: un campo con aspecto de secreto rechaza la publicación, y un proyecto con aspecto de secreto queda fuera con aviso. Cada máquina solo escribe su propia instantánea; un nombre tomado por otra instalación se convierte en rede.nome-em-uso, y --forcar lo toma con registro en el commit. Una laguna nunca se convierte en lista vacía. En desarrollo: está en la main, sin versión publicada."
            ],
            "code": "ork network entrar --maquina pc-casa\nork network status --json"
          },
          {
            "id": "feat-032",
            "title": "FEAT-032 · Roadmap de la red",
            "paragraphs": [
              "Desde cualquier directorio, ork network roadmap reúne el roadmap de la base remota, las reservas y las threads de cada máquina, con la fuente y la hora de cada parte. Sin clon, solo consulta la forja mediante la CLI ya autenticada; lo que no se leyó aparece como laguna tipada, nunca como vacío. En los hosts, ork_network_roadmap transmite esa lectura tal como llega. Vigente: publicado en la versión 0.5.0. En la main, la porción 3 también lee la red por persona: la sección Red por persona muestra la casa y cada máquina; una máquina vista solo en la red sale con las threads no leídas y la laguna maquina.sem-fabrica, nunca con cero threads. ork_network_status llega a OpenClaw, Hermes y MCP, y gh y glab se encuentran fuera del PATH corto del gateway y del cron."
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
              "A claim precisa de comando executado no HEAD real. Resultado pendente, timeout ou prova retirada não contam como aprovação.",
              "Na entrega por PR, o check de documentação do CI também cobra a linha no CHANGELOG quando a mudança toca core, adapters ou marketplaces, e o estado do item do roadmap depois do merge. O verify e o commit pelo MCP não travam em lease de thread já fechada."
            ]
          },
          {
            "id": "feat-005",
            "title": "FEAT-005 · CHECK independente no CI",
            "paragraphs": [
              "O bundle de claims é reexecutado no SHA exato da candidata. Uma execução de outra thread ou outro commit não prova esta mudança. Cada thread tem o próprio bundle, .ork-ci/<thread>.json, que o CI acha pelo nome da branch; branch de thread sem bundle reprova, e a main roda só os comandos do manifesto."
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
              "Cada thread edita sua worktree. Leases de árvore, caminhos, cards e serviços coordenam recursos; a auditoria recusa divergência entre Git e registro.",
              "A worktree nasce com a thread quando o manifesto tem worktree.por_thread: true, o padrão do ork init, ou com --worktree auto; depois, ork worktree ensure a cria. ork worktree sync recusa com tree.blocked, causa base-reescrita, quando a base foi reescrita, e mostra o git rebase --onto que reaplica só os commits da thread."
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
              "A claim needs a command executed against the actual HEAD. Pending results, timeouts and withdrawn evidence do not count as a pass.",
              "For pull request delivery, the CI documentation check also requires a CHANGELOG line when the change touches core, adapters or marketplaces, and the roadmap item state after the merge. Verify and commit through MCP no longer stall on a lease held by an already closed thread."
            ]
          },
          {
            "id": "feat-005",
            "title": "FEAT-005 · Independent CHECK in CI",
            "paragraphs": [
              "The claim bundle is rerun against the candidate’s exact SHA. A run for another thread or commit does not prove this change. Each thread has its own bundle, .ork-ci/<thread>.json, which CI finds by branch name; a thread branch without a bundle fails, and main runs only the manifest commands."
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
              "Each thread edits its own worktree. Tree, path, card and service leases coordinate resources; auditing rejects disagreement between Git and recorded state.",
              "The worktree is created with the thread when the manifest has worktree.por_thread: true, the ork init default, or with --worktree auto; later, ork worktree ensure creates it. ork worktree sync refuses with tree.blocked, cause base-reescrita, when the base was rewritten, and shows the git rebase --onto that replays only the thread’s commits."
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
              "Una claim necesita un comando ejecutado sobre el HEAD real. Los resultados pendientes, timeouts y pruebas retiradas no cuentan como aprobación.",
              "En la entrega por PR, el check de documentación del CI también exige la línea en el CHANGELOG cuando el cambio toca core, adapters o marketplaces, y el estado del ítem del roadmap después del merge. El verify y el commit por MCP no se bloquean por un lease de una thread ya cerrada."
            ]
          },
          {
            "id": "feat-005",
            "title": "FEAT-005 · CHECK independiente en CI",
            "paragraphs": [
              "El bundle de claims se vuelve a ejecutar sobre el SHA exacto de la candidata. Una ejecución de otra thread o commit no demuestra este cambio. Cada thread tiene su propio bundle, .ork-ci/<thread>.json, que el CI encuentra por el nombre de la branch; una branch de thread sin bundle no se aprueba, y main ejecuta solo los comandos del manifiesto."
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
              "Cada thread edita su worktree. Los leases de árbol, rutas, tarjetas y servicios coordinan recursos; la auditoría rechaza divergencias entre Git y el registro.",
              "La worktree nace con la thread cuando el manifiesto tiene worktree.por_thread: true, el valor por defecto de ork init, o con --worktree auto; después, ork worktree ensure la crea. ork worktree sync rechaza con tree.blocked, causa base-reescrita, cuando la base fue reescrita, y muestra el git rebase --onto que reaplica solo los commits de la thread."
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
      "docs/produto/FEAT-022-auditoria-e-divida.md",
      "docs/produto/FEAT-037-perfil-carga-e-sessoes-das-contas.md"
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
            "id": "feat-037",
            "title": "FEAT-037 · Perfil por despacho e sessões de cada conta",
            "paragraphs": [
              "ork phase run --perfil <id> despacha a fase na conta escolhida, ou recusa com motivo tipado (runtime.profile-invalid, runtime.quota-exhausted, runtime.auth-missing) sem trocar de perfil sozinho. Com runtime_profiles.distribuir: carga, o ork escolhe a conta com menos sessões vivas nesta máquina; sem a chave, vale a ordem do store.",
              "ork sessions mostra as sessões de todas as contas, com a coluna PERFIL (o id, nunca o diretório da conta), e marca como fantasma a sessão sem processo vivo. ork sessions limpar-fantasmas solta essa sessão do ork, com registro no ledger, sem parar nada no runtime. No catálogo, a página está em desenvolvimento."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions\nork sessions limpar-fantasmas --dry-run"
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
            "id": "feat-037",
            "title": "FEAT-037 · Per-dispatch profile and sessions of each account",
            "paragraphs": [
              "ork phase run --perfil <id> dispatches the phase on the chosen account, or refuses with a typed reason (runtime.profile-invalid, runtime.quota-exhausted, runtime.auth-missing) without switching profiles on its own. With runtime_profiles.distribuir: carga, ork picks the account with the fewest live sessions on this machine; without the key, the store order applies.",
              "ork sessions shows the sessions of every account, with a PERFIL column (the id, never the account directory), and marks a session without a live process as a ghost. ork sessions limpar-fantasmas releases that session from ork, with a ledger record, without stopping anything in the runtime. The catalog lists the page as in development."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions\nork sessions limpar-fantasmas --dry-run"
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
            "id": "feat-037",
            "title": "FEAT-037 · Perfil por despacho y sesiones de cada cuenta",
            "paragraphs": [
              "ork phase run --perfil <id> despacha la fase en la cuenta elegida, o rechaza con un motivo tipado (runtime.profile-invalid, runtime.quota-exhausted, runtime.auth-missing) sin cambiar de perfil por su cuenta. Con runtime_profiles.distribuir: carga, ork elige la cuenta con menos sesiones vivas en esta máquina; sin la clave, vale el orden del store.",
              "ork sessions muestra las sesiones de todas las cuentas, con la columna PERFIL (el id, nunca el directorio de la cuenta), y marca como fantasma la sesión sin proceso vivo. ork sessions limpar-fantasmas suelta esa sesión de ork, con registro en el ledger, sin detener nada en el runtime. En el catálogo, la página figura en desarrollo."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions\nork sessions limpar-fantasmas --dry-run"
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
              "O contrato ork.hitl-curto/v1 apresenta pergunta breve, bloqueio, alternativas, recomendação e como responder. Texto livre inequívoco do dono pode escolher uma ação; ambiguidades pedem esclarecimento. Palavra solta exige janela de escuta e um único pedido aberto, e não autoriza ato irreversível. O código permanece estável ao reabrir o mesmo contexto."
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
              "O estado vem de threads, ledger e filas. ork roadmap status é leitura pura: agrupa o relatório no fuso do dono, marca #HITL no que espera decisão e mostra próximos passos. O orquestrador assume os impedimentos técnicos; sessão encerrada não vira pedido como se ainda pudesse receber resposta.",
              "O trabalho parado no condutor depois da entrega, além de 30 minutos, sai numa linha por thread no pulse, com o próximo passo e fora de “Esperando você”: branch sem push, branch sem PR, PR verde sem merge ou merge sem registro. ork roadmap status diz o estado real da entrega da thread de cada item e, com fábrica compartilhada, avisa a máquina sem batida há mais de 3 horas.",
              "O ork pulse e o ork roadmap status trazem o tempo parado por HITL de condução (hitlDeConducao): as perguntas abertas, com há quanto tempo cada uma para a thread, no fuso do dono, e a mediana dos últimos 7 dias contra a meta de 5 minutos. O resumo ganha uma linha só acima da meta, sem virar novidade que fure a cadência."
            ],
            "code": "ork roadmap status"
          },
          {
            "id": "feat-015",
            "title": "FEAT-015 · MASTER e índice de condução",
            "paragraphs": [
              "MASTER registra postmortem e índice derivado do ledger. ork master pedir solicita nota e justificativa pelo Telegram autenticado. O registro inclui remetente, canal, mensagem e hash da prova; o agente não assina pelo dono. A nota humana posterior substitui a aceitação por omissão sem apagar histórico. O diálogo MCP de nota permanece uma lacuna.",
              "ork master <thread> --aceitar-omissao aceita por omissão só a entrega da thread indicada; sem a thread, o comando aceita todas as entregues do projeto, inclusive as de outras frentes, e um agente que o rode com mais de uma recebe o aviso master.omissao-sem-thread. --dry-run lista o que fecharia, sem gravar. A nota humana exige --por com o nome de uma pessoa."
            ],
            "code": "ork master pedir <thread> --formato telegram\nork master <thread> --aceitar-omissao --dry-run"
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
              "ork.hitl-curto/v1 presents a short question, blocker, options, recommendation and response instructions. Unambiguous owner text can select an action; ambiguity asks for clarification. Standalone words require an open listening window and a single pending request, and cannot authorize irreversible actions. Codes remain stable when reopening the same context."
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
              "State comes from threads, the ledger and queues. ork roadmap status is read-only: it groups the report in the owner’s timezone, marks pending decisions with #HITL and shows next steps. The orchestrator handles technical blockers; ended sessions are not presented as able to receive a response.",
              "Work stalled with the conductor after delivery, for more than 30 minutes, appears as one line per thread in the pulse, with the next step and outside “Waiting for you”: an unpushed branch, a branch without a PR, a green PR not merged, or a merge not recorded. ork roadmap status states the real delivery state of each item’s thread and, with a shared factory, flags a machine with no heartbeat for more than 3 hours.",
              "ork pulse and ork roadmap status show the time blocked by conduction HITL (hitlDeConducao): the open questions, with how long each one has been blocking the thread, in the owner’s timezone, and the median over the last 7 days against the 5-minute target. The summary gains a line only above the target, without becoming news that breaks the cadence."
            ],
            "code": "ork roadmap status"
          },
          {
            "id": "feat-015",
            "title": "FEAT-015 · MASTER and conduction index",
            "paragraphs": [
              "MASTER records a postmortem and a ledger-derived index. ork master pedir requests a score and reason through authenticated Telegram. The record includes sender, channel, message and proof hash; the agent cannot sign for the owner. A later human score replaces acceptance by omission without erasing history. The MCP score dialog remains unavailable.",
              "ork master <thread> --aceitar-omissao accepts by default only the delivery of the given thread; without a thread, the command accepts every delivered thread in the project, including other workstreams, and an agent running it with more than one gets the master.omissao-sem-thread warning. --dry-run lists what it would close without recording anything. A human score requires --por with a person’s name."
            ],
            "code": "ork master pedir <thread> --formato telegram\nork master <thread> --aceitar-omissao --dry-run"
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
              "ork.hitl-curto/v1 presenta pregunta breve, bloqueo, alternativas, recomendación e instrucciones de respuesta. El texto inequívoco del dueño puede elegir una acción; la ambigüedad pide aclaración. Una palabra aislada exige ventana de escucha y una única solicitud pendiente, y no autoriza actos irreversibles. El código se conserva al reabrir el mismo contexto."
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
              "El estado procede de threads, ledger y colas. ork roadmap status es de lectura: agrupa el informe en el huso del dueño, marca #HITL en lo que espera decisión y muestra próximos pasos. El orquestador se ocupa de los impedimentos técnicos; las sesiones terminadas no se presentan como capaces de recibir respuesta.",
              "El trabajo detenido en el conductor después de la entrega, por más de 30 minutos, aparece en una línea por thread en el pulse, con el siguiente paso y fuera de “Esperándote”: rama sin push, rama sin PR, PR en verde sin merge o merge sin registro. ork roadmap status indica el estado real de la entrega de la thread de cada ítem y, con fábrica compartida, avisa de la máquina sin latido desde hace más de 3 horas.",
              "ork pulse y ork roadmap status muestran el tiempo detenido por HITL de conducción (hitlDeConducao): las preguntas abiertas, con cuánto tiempo lleva cada una deteniendo la thread, en la zona horaria del dueño, y la mediana de los últimos 7 días frente a la meta de 5 minutos. El resumen gana una línea solo por encima de la meta, sin convertirse en novedad que rompa la cadencia."
            ],
            "code": "ork roadmap status"
          },
          {
            "id": "feat-015",
            "title": "FEAT-015 · MASTER e índice de conducción",
            "paragraphs": [
              "MASTER registra postmortem e índice derivado del ledger. ork master pedir solicita nota y justificación mediante Telegram autenticado. El registro incluye remitente, canal, mensaje y hash de la prueba; el agente no firma por el dueño. La valoración humana posterior sustituye la aceptación por omisión sin borrar el historial. El diálogo MCP de valoración sigue sin estar disponible.",
              "ork master <thread> --aceitar-omissao acepta por omisión solo la entrega de la thread indicada; sin la thread, el comando acepta todas las entregadas del proyecto, incluidas las de otros frentes, y un agente que lo ejecute con más de una recibe el aviso master.omissao-sem-thread. --dry-run lista lo que cerraría, sin guardar. La nota humana exige --por con el nombre de una persona."
            ],
            "code": "ork master pedir <thread> --formato telegram\nork master <thread> --aceitar-omissao --dry-run"
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
      "docs/produto/FEAT-028-loop-de-aprendizado.md",
      "docs/produto/FEAT-033-dossie-de-decisao.md"
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
              "O tenant do projeto recebe decisões, handoffs e lições conforme as permissões. Indisponibilidade degrada para arquivos com evento explícito; não usa outra base silenciosamente.",
              "A busca por significado é separada da busca por tag: índice vetorial local e derivado, resultados de um único tenant marcados como não determinísticos e nada no prompt sozinho. Vetores de modelos ou dimensões diferentes nunca se comparam, e embedding indisponível tem motivo embeddings.* sem derrubar o regime.",
              "A busca por significado foi publicada na versão 0.5.0 e desliga com memory.embedding.provider: none."
            ]
          },
          {
            "id": "feat-018",
            "title": "FEAT-018 · Documentação como código",
            "paragraphs": [
              "Frontmatter e vínculos são conferidos contra código e Git. O sincronizador não transforma automaticamente um plano em deploy ou disponibilidade.",
              "A paridade vale nos dois sentidos: codigo: Mesclado exige o commit na base, e o merge ship(<thread>) da thread do item exige codigo: Mesclado (docs.paridade.merge); o índice gerado tem de bater com o frontmatter (docs.paridade.indice). O push da main reprova as duas divergências; no PR, elas só avisam, e ork docs sincronizar --escrever as corrige."
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
              "ork brain context devolve o pacote ork.brain-context/v1 com pedido, itens, lacunas e digest do JSON canônico. Inclui as entidades pedidas e seus pais; sem --ids, usa o escopo vinculado por brain bind. Cada item traz source_ref, source_hash, source_version e location, além do frescor contra o portfólio canônico.",
              "Citação incompleta vira lacuna citacao.incompleta. Item retido pela ACL traz só ID e frescor retido, nunca conteúdo recuperado da fonte local. Brain indisponível ou recusando não produz pacote fabricado só da fonte. Identidade vem do transporte autenticado; leitura não grava, e escrita exige ativação aceita e concessão do banco.",
              "O pacote vem do modo context do OrkMind e o núcleo o confere: schema, tenant, pedido, digest, citação, ordem, fecho de pais e destino de cada id. Pacote que não confere encerra com brain.context.server-invalid, sem cair na consulta; só brain.selection.context-unsupported, de um OrkMind anterior ao modo, leva o núcleo a montar o mesmo pacote por query e get. O campo caminho diz qual foi, e os dois caminhos dão o mesmo digest para os mesmos dados."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>"
          },
          {
            "id": "feat-028",
            "title": "FEAT-028 · Aprendizado entre threads",
            "paragraphs": [
              "Lições de threads fechadas voltam ao GOAL e PLAN do mesmo produto. Falhas repetidas propõem policies; a proposta não ativa um bloqueio sozinha.",
              "A lição claims.failed vira a policy opt-in claim_sem_prova_local, desligada por padrão: declarada, ork claims add roda o comando da claim uma vez, no prazo do verify, e só avisa com policy_warn; a claim entra de qualquer jeito."
            ]
          },
          {
            "id": "feat-033",
            "title": "FEAT-033 · Dossiê de decisão",
            "paragraphs": [
              "ork brain dossie reúne as decisões de uma thread com o objetivo, o projeto e o contexto citável, com as alternativas registradas, quem decidiu e a evidência. Cada decisão traz a citação da linha do ledger e os ids que o Company Brain dá ao fato. Somente leitura, também como ork_brain_dossie no MCP e no OpenClaw.",
              "A resposta do dono só aparece quando o recibo do ingresso confere; sem ele, vira a lacuna resposta.sem-prova. Relato sobre o dono sem recibo nunca vira decisão. A decisão informada não guarda alternativas e mostra a lacuna alternativas.nao-registradas; fato retido pela ACL sai só com o id e o frescor retido.",
              "O dossiê está na main e foi publicado na versão 0.5.0."
            ],
            "code": "ork brain dossie --thread <thread>\nork brain dossie --thread <thread> --decisao <id>"
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
              "The project tenant receives decisions, handoffs and lessons according to permissions. Unavailability degrades to files with an explicit event; it does not silently use another database.",
              "Search by meaning is separate from tag search: a local derived vector index, results from a single tenant marked as non-deterministic, and nothing entering the prompt on its own. Vectors from different models or dimensions are never compared, and unavailable embeddings have an embeddings.* reason without bringing down the regime.",
              "Search by meaning was released in version 0.5.0 and turns off with memory.embedding.provider: none."
            ]
          },
          {
            "id": "feat-018",
            "title": "FEAT-018 · Documentation as code",
            "paragraphs": [
              "Frontmatter and links are checked against code and Git. Synchronization does not automatically turn a plan into deployment or availability.",
              "Parity works both ways: codigo: Mesclado requires the commit on the base, and the item thread’s ship(<thread>) merge requires codigo: Mesclado (docs.paridade.merge); the generated index must match the frontmatter (docs.paridade.indice). A push to main fails on either divergence; in a pull request they only warn, and ork docs sincronizar --escrever fixes them."
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
              "ork brain context returns ork.brain-context/v1 with pedido, itens, lacunas and a canonical JSON digest. It includes requested entities and their parents; without --ids it uses the scope linked by brain bind. Every item carries source_ref, source_hash, source_version and location, plus freshness against the canonical portfolio.",
              "Incomplete citations become citacao.incompleta gaps. ACL-withheld items expose only their ID and retido freshness, never content recovered from the local source. An unavailable or refusing Brain does not produce a package fabricated from local files. Identity comes from authenticated transport; reads do not write, and writes require accepted activation and a database grant.",
              "The package comes from OrkMind’s context mode and the core checks it: schema, tenant, request, digest, citation, order, parent closure and the target of each id. A package that does not check out ends with brain.context.server-invalid, without falling back to querying; only brain.selection.context-unsupported, from an OrkMind older than the mode, makes the core build the same package with query and get. The caminho field says which path was used, and both paths give the same digest for the same data."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>"
          },
          {
            "id": "feat-028",
            "title": "FEAT-028 · Learning across threads",
            "paragraphs": [
              "Lessons from closed threads feed GOAL and PLAN for the same product. Repeated failures propose policies; a proposal does not activate a block on its own.",
              "The claims.failed lesson becomes the opt-in policy claim_sem_prova_local, off by default: when declared, ork claims add runs the claim command once, within the verify timeout, and only warns with policy_warn; the claim is recorded either way."
            ]
          },
          {
            "id": "feat-033",
            "title": "FEAT-033 · Decision dossier",
            "paragraphs": [
              "ork brain dossie gathers a thread’s decisions with the goal, project and citable context, including recorded options, who decided and the evidence. Each decision carries the ledger line citation and the IDs that Company Brain assigns to the fact. Read-only, also available as ork_brain_dossie in MCP and OpenClaw.",
              "The owner’s answer appears only when the ingress receipt checks out; otherwise it becomes the resposta.sem-prova gap. A report about the owner without a receipt never becomes a decision. Informed decisions do not store options and show the alternativas.nao-registradas gap; facts withheld by ACL expose only their ID and retido freshness.",
              "The dossier is on main and was released in version 0.5.0."
            ],
            "code": "ork brain dossie --thread <thread>\nork brain dossie --thread <thread> --decisao <id>"
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
              "El tenant del proyecto recibe decisiones, handoffs y lecciones según los permisos. La indisponibilidad degrada a archivos con un evento explícito; no usa otra base en silencio.",
              "La búsqueda por significado está separada de la búsqueda por etiqueta: índice vectorial local y derivado, resultados de un solo tenant marcados como no deterministas y nada que entre solo en el prompt. Nunca se comparan vectores de modelos o dimensiones distintos, y un embedding no disponible tiene el motivo embeddings.* sin hacer caer el régimen.",
              "La búsqueda por significado se publicó en la versión 0.5.0 y se apaga con memory.embedding.provider: none."
            ]
          },
          {
            "id": "feat-018",
            "title": "FEAT-018 · Documentación como código",
            "paragraphs": [
              "El frontmatter y los vínculos se comprueban contra código y Git. La sincronización no convierte automáticamente un plan en despliegue o disponibilidad.",
              "La paridad vale en ambos sentidos: codigo: Mesclado exige el commit en la base, y el merge ship(<thread>) de la thread del ítem exige codigo: Mesclado (docs.paridade.merge); el índice generado debe coincidir con el frontmatter (docs.paridade.indice). El push a main reprueba ambas divergencias; en el PR solo avisan, y ork docs sincronizar --escrever las corrige."
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
              "ork brain context devuelve ork.brain-context/v1 con pedido, itens, lacunas y digest del JSON canónico. Incluye las entidades solicitadas y sus padres; sin --ids usa el ámbito vinculado por brain bind. Cada elemento contiene source_ref, source_hash, source_version y location, además de la vigencia frente al portafolio canónico.",
              "Una cita incompleta produce la laguna citacao.incompleta. Un elemento retenido por ACL solo muestra ID y vigencia retido, nunca contenido recuperado de la fuente local. Un Brain no disponible o que rechaza la consulta no produce un paquete inventado desde archivos locales. La identidad procede del transporte autenticado; leer no escribe, y escribir requiere activación aceptada y concesión de la base.",
              "El paquete viene del modo context de OrkMind y el núcleo lo comprueba: schema, tenant, pedido, digest, cita, orden, cierre de padres y destino de cada id. Un paquete que no cuadra termina con brain.context.server-invalid, sin pasar a la consulta; solo brain.selection.context-unsupported, de un OrkMind anterior al modo, lleva al núcleo a montar el mismo paquete con query y get. El campo caminho indica cuál fue, y los dos caminos dan el mismo digest para los mismos datos."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>"
          },
          {
            "id": "feat-028",
            "title": "FEAT-028 · Aprendizaje entre threads",
            "paragraphs": [
              "Las lecciones de threads cerradas alimentan GOAL y PLAN del mismo producto. Los fallos repetidos proponen políticas; una propuesta no activa un bloqueo por sí sola.",
              "La lección claims.failed se convierte en la policy opcional claim_sem_prova_local, apagada por defecto: declarada, ork claims add ejecuta el comando de la claim una vez, dentro del plazo del verify, y solo avisa con policy_warn; la claim entra de todos modos."
            ]
          },
          {
            "id": "feat-033",
            "title": "FEAT-033 · Dosier de decisión",
            "paragraphs": [
              "ork brain dossie reúne las decisiones de una thread con el objetivo, el proyecto y el contexto citable, incluidas las alternativas registradas, quién decidió y la prueba. Cada decisión incluye la cita de la línea del ledger y los IDs que el Company Brain asigna al hecho. Solo lectura, también disponible como ork_brain_dossie en MCP y OpenClaw.",
              "La respuesta del dueño solo aparece cuando el comprobante del ingreso es válido; si no, se convierte en la laguna resposta.sem-prova. Un relato sobre el dueño sin comprobante nunca se convierte en decisión. La decisión informada no guarda alternativas y muestra la laguna alternativas.nao-registradas; un hecho retenido por ACL solo muestra su ID y la vigencia retido.",
              "El dosier está en main y se publicó en la versión 0.5.0."
            ],
            "code": "ork brain dossie --thread <thread>\nork brain dossie --thread <thread> --decisao <id>"
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
      "docs/produto/FEAT-021-ingresso-hitl-telegram.md",
      "docs/produto/FEAT-030-projeto-alvo-explicito.md",
      "docs/produto/FEAT-034-pacote-de-experiencia.md"
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
              "O ingresso Telegram valida o update autenticado e sua prova HMAC antes de registrar a resposta. Aceita códigos, respostas numeradas e texto livre inequívoco dentro das condições do núcleo. A janela de escuta serve só para encaminhar uma palavra solta; não é prova de identidade. Ambiguidade não aprova, e envelopes fabricados pelo agente são recusados."
            ]
          },
          {
            "id": "feat-030",
            "title": "FEAT-030 · Projeto-alvo explícito",
            "paragraphs": [
              "Todo comando e toda tool ork_* leem o projeto pedido, nunca o do diretório do gateway, e a resposta diz qual projeto leu e o que não leu. OpenClaw e Hermes declaram ORK_PROJETO_EXPLICITO=1: sem projeto e com mais de um conhecido, devolvem a escolha. No host, --projeto aceita só nome; o MCP continua fixado na instalação e recusa outro projeto com projeto.fora-do-servidor. Vigente: publicado na versão 0.5.0."
            ]
          },
          {
            "id": "feat-034",
            "title": "FEAT-034 · Pacote de experiência",
            "paragraphs": [
              "Preferências de idioma, fuso e profundidade orientam a conversa de orquestração, com opt-out e restauração dos arquivos de instrução. Claude Code e Codex recebem blocos de projeto, e Hermes, referências pela skill existente; o OpenClaw continua sem essa distribuição. Consultas MCP de reservas e fábrica não reservam nem publicam. O opt-out não desliga policies nem gates, e nenhuma preferência muda a proveniência HMAC do HITL. Vigente: publicado na versão 0.5.0."
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
              "Telegram ingress validates the authenticated update and HMAC proof before recording a response. It accepts codes, numbered answers and unambiguous free text under the core’s conditions. The listening window only routes standalone words; it is not identity proof. Ambiguity never approves a request, and agent-fabricated envelopes are rejected."
            ]
          },
          {
            "id": "feat-030",
            "title": "FEAT-030 · Explicit target project",
            "paragraphs": [
              "Every command and every ork_* tool reads the requested project, never the gateway directory’s project, and the answer states which project it read and what it did not read. OpenClaw and Hermes declare ORK_PROJETO_EXPLICITO=1: without a project and with more than one known, they return the choice. In a host, --projeto accepts only a name; MCP stays pinned to its installation and refuses another project with projeto.fora-do-servidor. Current: released in version 0.5.0."
            ]
          },
          {
            "id": "feat-034",
            "title": "FEAT-034 · Experience pack",
            "paragraphs": [
              "Language, timezone and depth preferences shape the orchestration conversation, with opt-out and restoration of instruction files. Claude Code and Codex receive project blocks, and Hermes receives references through its existing skill; OpenClaw still lacks this distribution. MCP reservation and factory queries neither reserve nor publish. Opting out does not disable policies or gates, and no preference changes HITL HMAC provenance. Current: released in version 0.5.0."
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
              "El ingreso Telegram valida el update autenticado y la prueba HMAC antes de registrar la respuesta. Acepta códigos, respuestas numeradas y texto libre inequívoco bajo las condiciones del núcleo. La ventana de escucha solo encamina palabras aisladas; no prueba identidad. La ambigüedad no aprueba solicitudes y los envelopes fabricados por agentes se rechazan."
            ]
          },
          {
            "id": "feat-030",
            "title": "FEAT-030 · Proyecto objetivo explícito",
            "paragraphs": [
              "Cada comando y cada tool ork_* leen el proyecto pedido, nunca el del directorio del gateway, y la respuesta indica qué proyecto leyó y qué no leyó. OpenClaw y Hermes declaran ORK_PROJETO_EXPLICITO=1: sin proyecto y con más de uno conocido, devuelven la elección. En el host, --projeto solo acepta un nombre; MCP sigue fijado en la instalación y rechaza otro proyecto con projeto.fora-do-servidor. Vigente: publicado en la versión 0.5.0."
            ]
          },
          {
            "id": "feat-034",
            "title": "FEAT-034 · Paquete de experiencia",
            "paragraphs": [
              "Las preferencias de idioma, zona horaria y profundidad orientan la conversación de orquestación, con desactivación y restauración de los archivos de instrucciones. Claude Code y Codex reciben bloques de proyecto, y Hermes, referencias mediante su skill existente; OpenClaw sigue sin esta distribución. Las consultas MCP de reservas y fábrica no reservan ni publican. La desactivación no apaga políticas ni gates, y ninguna preferencia cambia la procedencia HMAC del HITL. Vigente: publicado en la versión 0.5.0."
            ]
          }
        ]
      }
    }
  }
];
