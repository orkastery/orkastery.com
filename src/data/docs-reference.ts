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
              "adapter e mcp conectam o host. accounts e setup descrevem runtimes e perfis. sessions, monitor e pulse observam execução e atenção humana. brain e portfolio consultam memória e catálogo. fabrica, roadmap e network coordenam trabalho entre máquinas, e projetos diz qual projeto cada comando lê. grafo consulta o índice local do grafo de código. A referência canônica no repositório detalha as opções de cada família."
            ]
          },
          {
            "id": "contexto-e-atencao",
            "title": "Contexto citável e atenção humana",
            "paragraphs": [
              "brain context devolve entidades, pais, citações, frescor e lacunas sem conceder permissão de escrita. roadmap status monta um relatório de leitura com a atenção que cabe ao dono. master pedir gera o pedido de nota para resposta pelo canal autenticado; não é uma nota dada pelo agente."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork roadmap status --json\nork master pedir <thread> --formato telegram"
          },
          {
            "id": "projeto-alvo",
            "title": "Escolha o projeto consultado",
            "paragraphs": [
              "Todo comando lê um projeto. Vale, nesta ordem: --projeto <nome|caminho>, em qualquer posição do comando; a variável ORK_PROJETO; no host sem diretório de projeto, o único projeto conhecido ou a recusa projeto.escolha; e, no terminal, o diretório atual. Nome ambíguo ou desconhecido recusa com os candidatos, na saída 4; o ork nunca escolhe no lugar de quem pediu.",
              "ork projetos lista os projetos conhecidos desta máquina, sem segredo. ork init, ork thread new e ork fabrica entrar registram sozinhos; registrar e esquecer cuidam das cópias antigas, sem apagar nada do disco. maestro, board, board plan, fabrica e roadmap status começam dizendo o projeto consultado e o que não foi lido."
            ],
            "code": "ork projetos --json\nork roadmap status --projeto meu-produto\nork projetos registrar\nork projetos esquecer <nome>"
          },
          {
            "id": "rede-e-reservas",
            "title": "Rede, reservas e números de feature",
            "paragraphs": [
              "network roadmap junta o roadmap da rede de qualquer diretório, com lacuna tipada no que não leu. roadmap reservas marca a reserva órfã de thread já fechada nesta máquina, e --soltar-orfas a solta ou a passa para outra thread aberta do mesmo item, com registro. roadmap feat reserva o próximo número de FEAT por push atômico; duas máquinas nunca levam o mesmo número, e o número reservado não volta.",
              "docs sincronizar leva fatos do ledger e do git aos itens do roadmap. --so limita aos itens pedidos; na worktree de uma thread com item, o padrão é o item dela, e --todos volta a todos."
            ],
            "code": "ork network roadmap --json\nork roadmap reservas --soltar-orfas\nork roadmap feat --thread <thread>\nork docs sincronizar --escrever --so RM-NNN"
          },
          {
            "id": "entrega-e-ci",
            "title": "Entrega, CI e concorrência",
            "paragraphs": [
              "ci prepare grava .ork-ci/<thread>.json na worktree da thread, com a branch dela; ci run --branch acha esse bundle pelo nome da branch, reprova branch ork/* sem bundle e, fora de thread, roda só os comandos do manifesto. ship registrar-pr --repo --pr registra PR mesclado num repositório externo declarado em ci.external_repositories, com o merge conferido pela API do GitHub e o check declarado verde no head do PR.",
              "phase run recusa com concurrency.limite, na saída 3, quando o projeto já tem max_parallel_threads sessões vivas em outras threads; --esperar espera a vaga. Na sessão sem acesso ao ledger, a ferramenta MCP ork_decision_record grava a decisão pelo mesmo contrato de decisao registrar."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <dono/nome> --pr <n>\nork phase run <thread> GO --prompt \"<texto>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Busca por significado na memória",
            "paragraphs": [
              "memory search --texto busca por significado no tenant, com vetor e FTS combinados, e não é determinística; não combina com --tags nem --thread. memory index mantém o índice vetorial local, idempotente, e --dry-run estima tokens e custo sem chamar o provider. memory status --sondar faz uma chamada real e mede a latência."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory search --texto \"<frase>\" --json"
          },
          {
            "id": "grafo",
            "title": "Consulte o grafo de código",
            "paragraphs": [
              "grafo indexar constrói o índice do HEAD limpo, no estado do projeto e fora do git; --verificar extrai de novo e confere contrato, bytes e determinismo. vizinhos, chamadores, importadores e caminho respondem pelas arestas, em texto ou --json, com o extrator e a evidência de cada uma. status mostra o índice do HEAD, amostra serve à auditoria manual de arestas e limpar apaga os índices que não são do HEAD de nenhuma árvore.",
              "A resposta é parcial por construção: só o que o extrator prova, e ela diz isso. Com a árvore modificada, a resposta é a do HEAD, com aviso. Todo o ork grafo precisa do typescript e do micromark instalados no próprio pacote do ork; sem eles, a recusa é grafo.parser.indisponivel."
            ],
            "code": "ork grafo indexar --verificar\nork grafo status\nork grafo chamadores <símbolo>\nork grafo importadores <arquivo> --json\nork grafo caminho <de> <para>"
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
              "adapter and mcp connect the host. accounts and setup describe runtimes and profiles. sessions, monitor and pulse observe execution and human attention. brain and portfolio access memory and the catalog. fabrica, roadmap and network coordinate work across machines, and projetos shows which project each command reads. grafo queries the local code graph index. The canonical repository reference details each family’s options."
            ]
          },
          {
            "id": "contexto-e-atencao",
            "title": "Citable context and human attention",
            "paragraphs": [
              "brain context returns entities, parents, citations, freshness and gaps without granting write access. roadmap status builds a read-only report showing where the owner’s attention is needed. master pedir creates a score request for an authenticated human response; it is not an agent-supplied score."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork roadmap status --json\nork master pedir <thread> --formato telegram"
          },
          {
            "id": "projeto-alvo",
            "title": "Choose the project being read",
            "paragraphs": [
              "Every command reads one project, chosen in this order: --projeto <name|path>, anywhere in the command; the ORK_PROJETO variable; in a host without a project directory, the only known project or the projeto.escolha refusal; and, in the terminal, the current directory. An ambiguous or unknown name is refused with the candidates, exit code 4; ork never chooses on behalf of whoever asked.",
              "ork projetos lists the projects known to this machine, without secrets. ork init, ork thread new and ork fabrica entrar register automatically; registrar and esquecer handle older copies without deleting anything from disk. maestro, board, board plan, fabrica and roadmap status start by stating the project read and what was not read."
            ],
            "code": "ork projetos --json\nork roadmap status --projeto meu-produto\nork projetos registrar\nork projetos esquecer <name>"
          },
          {
            "id": "rede-e-reservas",
            "title": "Network, reservations and feature numbers",
            "paragraphs": [
              "network roadmap combines the network roadmap from any directory, with typed gaps for anything it did not read. roadmap reservas flags orphaned reservations held by threads already closed on this machine, and --soltar-orfas releases them or passes them to another open thread on the same item, with a record. roadmap feat reserves the next FEAT number through an atomic push; two machines never get the same number, and a reserved number is never reused.",
              "docs sincronizar brings ledger and git facts into roadmap items. --so limits it to the requested items; in the worktree of a thread linked to an item, that item is the default, and --todos covers every item again."
            ],
            "code": "ork network roadmap --json\nork roadmap reservas --soltar-orfas\nork roadmap feat --thread <thread>\nork docs sincronizar --escrever --so RM-NNN"
          },
          {
            "id": "entrega-e-ci",
            "title": "Delivery, CI and concurrency",
            "paragraphs": [
              "ci prepare writes .ork-ci/<thread>.json in the thread’s worktree, with its branch; ci run --branch finds that bundle by branch name, fails an ork/* branch without a bundle and, outside a thread, runs only the manifest commands. ship registrar-pr --repo --pr records a PR merged into an external repository declared in ci.external_repositories, with the merge confirmed through the GitHub API and the declared check green on the PR head.",
              "phase run refuses with concurrency.limite, exit code 3, when the project already has max_parallel_threads live sessions in other threads; --esperar waits for a slot. In a session without ledger access, the ork_decision_record MCP tool records the decision through the same contract as decisao registrar."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <owner/name> --pr <n>\nork phase run <thread> GO --prompt \"<text>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Search memory by meaning",
            "paragraphs": [
              "memory search --texto searches the tenant by meaning, combining vector and FTS, and is not deterministic; it cannot be combined with --tags or --thread. memory index maintains the local, idempotent vector index, and --dry-run estimates tokens and cost without calling the provider. memory status --sondar makes one real call and measures its latency."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory search --texto \"<phrase>\" --json"
          },
          {
            "id": "grafo",
            "title": "Query the code graph",
            "paragraphs": [
              "grafo indexar builds the index for a clean HEAD, in project state and outside git; --verificar extracts again and checks contract, bytes and determinism. vizinhos, chamadores, importadores and caminho answer from the edges, as text or --json, with each edge’s extractor and evidence. status shows the HEAD index, amostra supports manual edge audits and limpar deletes indexes that are not the HEAD of any tree.",
              "Answers are partial by construction: they contain only what the extractor proves, and they say so. With a modified tree, the answer reflects HEAD and warns about it. All of ork grafo needs typescript and micromark installed inside the ork package itself; without them, it refuses with grafo.parser.indisponivel."
            ],
            "code": "ork grafo indexar --verificar\nork grafo status\nork grafo chamadores <symbol>\nork grafo importadores <file> --json\nork grafo caminho <from> <to>"
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
              "adapter y mcp conectan el host. accounts y setup describen runtimes y perfiles. sessions, monitor y pulse observan la ejecución y la atención humana. brain y portfolio consultan memoria y catálogo. fabrica, roadmap y network coordinan el trabajo entre máquinas, y projetos indica qué proyecto lee cada comando. grafo consulta el índice local del grafo de código. La referencia canónica del repositorio detalla las opciones de cada familia."
            ]
          },
          {
            "id": "contexto-e-atencao",
            "title": "Contexto citable y atención humana",
            "paragraphs": [
              "brain context devuelve entidades, padres, citas, vigencia y lagunas sin conceder escritura. roadmap status crea un informe de lectura con lo que requiere atención del dueño. master pedir genera la solicitud de nota para una respuesta humana autenticada; no es una nota dada por el agente."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork roadmap status --json\nork master pedir <thread> --formato telegram"
          },
          {
            "id": "projeto-alvo",
            "title": "Elija el proyecto consultado",
            "paragraphs": [
              "Cada comando lee un proyecto, en este orden: --projeto <nombre|ruta>, en cualquier posición del comando; la variable ORK_PROJETO; en un host sin directorio de proyecto, el único proyecto conocido o el rechazo projeto.escolha; y, en el terminal, el directorio actual. Un nombre ambiguo o desconocido se rechaza con los candidatos, con código de salida 4; ork nunca elige en nombre de quien pidió.",
              "ork projetos enumera los proyectos conocidos de esta máquina, sin secretos. ork init, ork thread new y ork fabrica entrar registran automáticamente; registrar y esquecer gestionan las copias antiguas sin borrar nada del disco. maestro, board, board plan, fabrica y roadmap status empiezan indicando el proyecto consultado y lo que no se leyó."
            ],
            "code": "ork projetos --json\nork roadmap status --projeto meu-produto\nork projetos registrar\nork projetos esquecer <nombre>"
          },
          {
            "id": "rede-e-reservas",
            "title": "Red, reservas y números de feature",
            "paragraphs": [
              "network roadmap reúne el roadmap de la red desde cualquier directorio, con lagunas tipadas para lo que no leyó. roadmap reservas marca la reserva huérfana de una thread ya cerrada en esta máquina, y --soltar-orfas la libera o la pasa a otra thread abierta del mismo elemento, con registro. roadmap feat reserva el siguiente número de FEAT mediante un push atómico; dos máquinas nunca reciben el mismo número, y el número reservado no se reutiliza.",
              "docs sincronizar lleva hechos del ledger y de git a los elementos del roadmap. --so limita la operación a los elementos pedidos; en la worktree de una thread con elemento, el predeterminado es el suyo, y --todos vuelve a cubrirlos todos."
            ],
            "code": "ork network roadmap --json\nork roadmap reservas --soltar-orfas\nork roadmap feat --thread <thread>\nork docs sincronizar --escrever --so RM-NNN"
          },
          {
            "id": "entrega-e-ci",
            "title": "Entrega, CI y concurrencia",
            "paragraphs": [
              "ci prepare escribe .ork-ci/<thread>.json en la worktree de la thread, con su branch; ci run --branch encuentra ese bundle por el nombre de la branch, rechaza una branch ork/* sin bundle y, fuera de una thread, ejecuta solo los comandos del manifiesto. ship registrar-pr --repo --pr registra un PR fusionado en un repositorio externo declarado en ci.external_repositories, con el merge comprobado mediante la API de GitHub y el check declarado en verde en el head del PR.",
              "phase run rechaza con concurrency.limite, código de salida 3, cuando el proyecto ya tiene max_parallel_threads sesiones vivas en otras threads; --esperar espera un hueco. En una sesión sin acceso al ledger, la herramienta MCP ork_decision_record registra la decisión con el mismo contrato que decisao registrar."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <dueño/nombre> --pr <n>\nork phase run <thread> GO --prompt \"<texto>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Búsqueda por significado en la memoria",
            "paragraphs": [
              "memory search --texto busca por significado en el tenant, combinando vector y FTS, y no es determinista; no se combina con --tags ni --thread. memory index mantiene el índice vectorial local e idempotente, y --dry-run estima tokens y coste sin llamar al provider. memory status --sondar hace una llamada real y mide la latencia."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory search --texto \"<frase>\" --json"
          },
          {
            "id": "grafo",
            "title": "Consulte el grafo de código",
            "paragraphs": [
              "grafo indexar construye el índice del HEAD limpio, en el estado del proyecto y fuera de git; --verificar vuelve a extraer y comprueba contrato, bytes y determinismo. vizinhos, chamadores, importadores y caminho responden a partir de las aristas, en texto o --json, con el extractor y la prueba de cada una. status muestra el índice del HEAD, amostra sirve para auditar aristas a mano y limpar borra los índices que no son del HEAD de ningún árbol.",
              "La respuesta es parcial por construcción: solo contiene lo que el extractor demuestra, y lo indica. Con el árbol modificado, la respuesta corresponde al HEAD, con aviso. Todo ork grafo necesita typescript y micromark instalados dentro del propio paquete de ork; sin ellos, el rechazo es grafo.parser.indisponivel."
            ],
            "code": "ork grafo indexar --verificar\nork grafo status\nork grafo chamadores <símbolo>\nork grafo importadores <archivo> --json\nork grafo caminho <de> <a>"
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
      "docs/referencia/maestro-capacidades.json",
      "docs/referencia/contratos/projetos-rm052.md"
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
              "ork.maestro-snapshot/v1 é uma projeção de leitura. Suas seções declaram fonte, instante, fingerprint, estado e cobertura. empty significa vazio observado; unavailable significa fonte inacessível. Paginação e omissões fazem parte do contrato. O snapshot não cria ciclo, aprova gate ou comprova SHIP. O snapshot também traz project.root, com ~, project.remote, sem credencial, e notConsulted, com o que o panorama não leu. Zero threads no panorama nunca quer dizer roadmap vazio."
            ],
            "code": "ork maestro --json\nork maestro --json --thread <thread>"
          },
          {
            "id": "projetos",
            "title": "Registro de projetos e cabeçalho da consulta",
            "paragraphs": [
              "ork.projetos/v1 é o registro desta máquina em ~/.orkastery/projetos.json, com modo 0600 e sem segredo: nome, abbrev, raiz, remoto sem usuário nem senha, datas e a fonte do registro. Arquivo ausente, corrompido ou de outro contrato vale registro vazio. ork.consulta/v1 é o cabeçalho de maestro, board, board plan, fabrica e roadmap status: o projeto consultado, a origem da escolha, o que foi lido e o que não foi.",
              "As recusas projeto.desconhecido, projeto.ambiguo, projeto.sem-manifesto, projeto.escolha, projeto.nenhum e projeto.fora-do-servidor trazem os candidatos e a correção. Quem consome o registro lê sem gravar, confere o contrato e nunca escolhe a primeira cópia de um nome ambíguo."
            ],
            "code": "ork projetos --json\nork roadmap status --json"
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
              "ork.maestro-snapshot/v1 is a read projection. Its sections declare source, timestamp, fingerprint, state and coverage. empty means observed emptiness; unavailable means an inaccessible source. Pagination and omissions are part of the contract. The snapshot does not create a cycle, approve a gate or prove SHIP. The snapshot also carries project.root, shown with ~, project.remote, without credentials, and notConsulted, listing what the overview did not read. Zero threads in the overview never means an empty roadmap."
            ],
            "code": "ork maestro --json\nork maestro --json --thread <thread>"
          },
          {
            "id": "projetos",
            "title": "Project registry and query header",
            "paragraphs": [
              "ork.projetos/v1 is this machine’s registry in ~/.orkastery/projetos.json, with mode 0600 and no secrets: name, abbrev, root, remote without user or password, timestamps and the registration source. A missing, corrupted or foreign-contract file counts as an empty registry. ork.consulta/v1 is the header of maestro, board, board plan, fabrica and roadmap status: the project read, how it was chosen, what was read and what was not.",
              "The projeto.desconhecido, projeto.ambiguo, projeto.sem-manifesto, projeto.escolha, projeto.nenhum and projeto.fora-do-servidor refusals include the candidates and the fix. Consumers read the registry without writing, check the contract and never pick the first copy of an ambiguous name."
            ],
            "code": "ork projetos --json\nork roadmap status --json"
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
              "ork.maestro-snapshot/v1 es una proyección de lectura. Sus secciones declaran fuente, instante, fingerprint, estado y cobertura. empty significa vacío observado; unavailable significa fuente inaccesible. La paginación y las omisiones forman parte del contrato. La instantánea no crea un ciclo, aprueba un gate ni demuestra SHIP. La instantánea también incluye project.root, con ~, project.remote, sin credenciales, y notConsulted, con lo que el panorama no leyó. Cero threads en el panorama nunca significa un roadmap vacío."
            ],
            "code": "ork maestro --json\nork maestro --json --thread <thread>"
          },
          {
            "id": "projetos",
            "title": "Registro de proyectos y cabecera de la consulta",
            "paragraphs": [
              "ork.projetos/v1 es el registro de esta máquina en ~/.orkastery/projetos.json, con modo 0600 y sin secretos: nombre, abbrev, raíz, remoto sin usuario ni contraseña, fechas y la fuente del registro. Un archivo ausente, dañado o de otro contrato equivale a un registro vacío. ork.consulta/v1 es la cabecera de maestro, board, board plan, fabrica y roadmap status: el proyecto consultado, el origen de la elección, lo que se leyó y lo que no.",
              "Los rechazos projeto.desconhecido, projeto.ambiguo, projeto.sem-manifesto, projeto.escolha, projeto.nenhum y projeto.fora-do-servidor incluyen los candidatos y la corrección. Quien consume el registro lo lee sin escribir, comprueba el contrato y nunca elige la primera copia de un nombre ambiguo."
            ],
            "code": "ork projetos --json\nork roadmap status --json"
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
