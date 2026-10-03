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
              "Comece pelo diagnóstico e pelo panorama. Consultas de thread, fases e claims explicam o que foi registrado; não concedem permissão de escrita. Use --help no comando específico antes de uma operação mutável.",
              "O ork doctor reprova arquivo ou pasta do .git com dono diferente do dono do repositório, com a contagem, exemplos e o chown exato na correção; ele não roda nada. O check analisadores do grafo carrega o typescript e o micromark como o ork grafo indexar e avisa com a correção quando faltam. A linha rede mostra a adesão à Orkastery Network, a casa, a última batida e a última falha, só lendo arquivos locais."
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
            "id": "thread-e-worktree",
            "title": "Thread e worktree",
            "paragraphs": [
              "Com worktree.por_thread: true, o que o ork init grava, ork thread new cria a worktree e a branch ork/<slug> sem flag; com a chave false ou ausente, só com --worktree auto. --worktree DIR reusa um diretório existente, --sem-worktree cria sem worktree e avisa que, na branch base, o ork ship sai barrado, e --dry-run mostra a worktree que seria criada. A mesma regra vale para --from-finding.",
              "ork worktree sync recria a branch sem commit próprio no SHA da base. Com commits próprios e a base reescrita, por exemplo depois de um force-push, recusa com tree.blocked, causa base-reescrita, e mostra o git rebase --onto que reaplica só os commits da thread."
            ],
            "code": "ork thread new \"<nome>\" --modo auto --dry-run\nork thread new \"<nome>\" --modo auto --sem-worktree\nork worktree sync <thread> --dry-run"
          },
          {
            "id": "integracoes",
            "title": "Integrações e operação",
            "paragraphs": [
              "adapter e mcp conectam o host. accounts e setup descrevem runtimes e perfis. sessions, monitor e pulse observam execução e atenção humana. brain e portfolio consultam memória e catálogo. fabrica, roadmap e network coordenam trabalho entre máquinas, e projetos diz qual projeto cada comando lê. grafo consulta o índice local do grafo de código. A referência canônica no repositório detalha as opções de cada família."
            ]
          },
          {
            "id": "contas-e-sessoes",
            "title": "Contas, perfis e sessões",
            "paragraphs": [
              "phase run --perfil <id> despacha pela conta pedida, ou recusa com runtime.profile-invalid, runtime.quota-exhausted ou runtime.auth-missing, sem trocar de perfil sozinho. runtime_profiles.distribuir escolhe entre os perfis: ordem, o padrão, é o primeiro do store; carga é o de menos sessões vivas nesta máquina. Valor desconhecido vale ordem, com aviso.",
              "sessions lista as sessões de todas as contas, com a coluna PERFIL e as fantasmas; sessions limpar-fantasmas solta cada fantasma do ork com registro no ledger, sem chamar stop nem rm no runtime. Quando o runtime recusa o diretório da worktree ou espera o aceite de termos novos, a fase espera o dono rodar o comando da pausa, e retry run re-despacha o mesmo prompt depois."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions --all\nork sessions limpar-fantasmas --dry-run --json"
          },
          {
            "id": "contexto-e-atencao",
            "title": "Contexto citável e atenção humana",
            "paragraphs": [
              "brain context devolve entidades, pais, citações, frescor e lacunas sem conceder permissão de escrita. roadmap status monta um relatório de leitura com a atenção que cabe ao dono. master pedir gera o pedido de nota para resposta pelo canal autenticado; não é uma nota dada pelo agente. master <thread> --score exige --por com o nome de quem dá a nota. master <thread> --aceitar-omissao aceita por omissão só a thread indicada, com --dry-run para ver antes; sem a thread, aceita todas as entregues do projeto."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork roadmap status --json\nork master pedir <thread> --formato telegram\nork master <thread> --aceitar-omissao --dry-run"
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
              "network status mostra as máquinas da Orkastery Network da pessoa, de qualquer diretório, com a fonte, as lacunas tipadas e o que não foi lido. network entrar confere ou cria a casa privada na forja e publica o primeiro retrato antes de gravar a adesão; network publicar grava o retrato na hora, e network sair o tira da casa.",
              "docs sincronizar leva fatos do ledger e do git aos itens do roadmap. --so limita aos itens pedidos; na worktree de uma thread com item, o padrão é o item dela, e --todos volta a todos."
            ],
            "code": "ork network roadmap --json\nork network status --json\nork network entrar --maquina <nome>\nork roadmap reservas --soltar-orfas\nork roadmap feat --thread <thread>\nork docs sincronizar --escrever --so RM-NNN"
          },
          {
            "id": "entrega-e-ci",
            "title": "Entrega, CI e concorrência",
            "paragraphs": [
              "ci prepare grava .ork-ci/<thread>.json na worktree da thread, com a branch dela; ci run --branch acha esse bundle pelo nome da branch, reprova branch ork/* sem bundle e, fora de thread, roda só os comandos do manifesto. ship registrar-pr --repo --pr registra PR mesclado num repositório externo declarado em ci.external_repositories, com o merge conferido pela API do GitHub e o check declarado verde no head do PR.",
              "phase run recusa com concurrency.limite, na saída 3, quando o projeto já tem max_parallel_threads sessões vivas em outras threads; --esperar espera a vaga. Na sessão sem acesso ao ledger, a ferramenta MCP ork_decision_record grava a decisão pelo mesmo contrato de decisao registrar.",
              "ship registrar-pr --dry-run, também com --repo --pr, faz as mesmas conferências e responde registraria, sem gravar ship_done, sem mudar a fase e sem publicar a fábrica.",
              "O --remoto de ship --para, ship registrar-pr e ci status é o nome de um remoto do git, validado antes de qualquer git: fora do formato, recusa com ship.remoto-invalido ou ci.remoto-invalido, sem consultar o GitHub."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <dono/nome> --pr <n>\nork phase run <thread> GO --prompt \"<texto>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Busca por significado na memória",
            "paragraphs": [
              "memory search --texto busca por significado no tenant, com vetor e FTS combinados, e não é determinística; não combina com --tags nem --thread. memory index mantém o índice vetorial local, idempotente, e --dry-run estima tokens e custo sem chamar o provider. memory status --sondar faz uma chamada real e mede a latência. Status, index e search usam o mesmo universo da busca do tenant; status e index o mostram por coleção, contam o que fica fora da busca e avisam quando o índice cobre menos do que a busca enxerga."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory search --texto \"<frase>\" --json"
          },
          {
            "id": "grafo",
            "title": "Consulte o grafo de código",
            "paragraphs": [
              "grafo indexar constrói o índice do HEAD limpo, no estado do projeto e fora do git; --verificar extrai de novo e confere contrato, bytes e determinismo. vizinhos, chamadores, importadores e caminho respondem pelas arestas, em texto ou --json, com o extrator e a evidência de cada uma. status mostra o índice do HEAD, amostra serve à auditoria manual de arestas e limpar apaga os índices que não são do HEAD de nenhuma árvore.",
              "A resposta é parcial por construção: só o que o extrator prova, e ela diz isso. Com a árvore modificada, a resposta é a do HEAD, com aviso. Todo o ork grafo precisa do typescript e do micromark no node_modules do próprio pacote do ork: são dependências do pacote, com versão exata, e o npm install -g os traz. Instalado dentro de um projeto ou pelo npx, o npm os iça para fora do pacote, e a recusa é grafo.parser.indisponivel, com a correção no grafo status e no doctor. O grafo pede Node 20.19, 22.12 ou mais novo.",
              "Com o índice de uma revisão ancestral, grafo indexar reextrai só o que a mudança alcança, com os mesmos bytes da extração completa, e diz quando foi completo e por quê. Com --json, --teto-bytes N limita a resposta a N bytes, tirando primeiro as arestas mais longe do alvo; o caminho não se corta e recusa com grafo.consulta.teto-excedido. Sem o índice do HEAD, a recusa diz o caso (grafo.indice.ausente, grafo.indice.outra-revisao ou grafo.indice.outro-extrator) e a correção. As mesmas consultas estão no MCP do projeto atrás da flag grafo.mcp, desligada por padrão."
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
              "Start with diagnostics and the overview. Thread, phase and claim queries explain recorded state; they do not grant write permission. Use --help on a specific command before performing a mutation.",
              "ork doctor fails when a file or folder in .git has a different owner from the repository owner, with the count, examples and the exact chown in the fix; it runs nothing itself. The graph analyzers check loads typescript and micromark as ork grafo indexar does and warns with the fix when they are missing. The rede line shows Orkastery Network membership, the home, the last heartbeat and the last failure, reading local files only."
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
            "id": "thread-e-worktree",
            "title": "Thread and worktree",
            "paragraphs": [
              "With worktree.por_thread: true, which ork init writes, ork thread new creates the worktree and the ork/<slug> branch without a flag; with the key false or absent, only with --worktree auto. --worktree DIR reuses an existing directory, --sem-worktree creates no worktree and warns that on the base branch ork ship will be blocked, and --dry-run shows the worktree that would be created. The same rule applies to --from-finding.",
              "ork worktree sync recreates a branch with no commits of its own at the base SHA. With its own commits and a rewritten base, for example after a force-push, it refuses with tree.blocked, cause base-reescrita, and shows the git rebase --onto that replays only the thread’s commits."
            ],
            "code": "ork thread new \"<nome>\" --modo auto --dry-run\nork thread new \"<nome>\" --modo auto --sem-worktree\nork worktree sync <thread> --dry-run"
          },
          {
            "id": "integracoes",
            "title": "Integrations and operations",
            "paragraphs": [
              "adapter and mcp connect the host. accounts and setup describe runtimes and profiles. sessions, monitor and pulse observe execution and human attention. brain and portfolio access memory and the catalog. fabrica, roadmap and network coordinate work across machines, and projetos shows which project each command reads. grafo queries the local code graph index. The canonical repository reference details each family’s options."
            ]
          },
          {
            "id": "contas-e-sessoes",
            "title": "Accounts, profiles and sessions",
            "paragraphs": [
              "phase run --perfil <id> dispatches through the requested account, or refuses with runtime.profile-invalid, runtime.quota-exhausted or runtime.auth-missing, without switching profiles on its own. runtime_profiles.distribuir chooses among profiles: ordem, the default, is the first in the store; carga is the one with the fewest live sessions on this machine. An unknown value falls back to ordem, with a warning.",
              "sessions lists the sessions of every account, with the PERFIL column and the ghosts; sessions limpar-fantasmas releases each ghost from ork with a ledger record, without calling stop or rm in the runtime. When the runtime refuses the worktree directory or waits for new terms to be accepted, the phase waits for the owner to run the pause command, and retry run then re-dispatches the same prompt."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions --all\nork sessions limpar-fantasmas --dry-run --json"
          },
          {
            "id": "contexto-e-atencao",
            "title": "Citable context and human attention",
            "paragraphs": [
              "brain context returns entities, parents, citations, freshness and gaps without granting write access. roadmap status builds a read-only report showing where the owner’s attention is needed. master pedir creates a score request for an authenticated human response; it is not an agent-supplied score. master <thread> --score requires --por with the name of the person giving the score. master <thread> --aceitar-omissao accepts by default only the given thread, with --dry-run to preview; without a thread, it accepts every delivered thread in the project."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork roadmap status --json\nork master pedir <thread> --formato telegram\nork master <thread> --aceitar-omissao --dry-run"
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
              "network status shows the machines in the person’s Orkastery Network, from any directory, with the source, typed gaps and what was not read. network entrar checks or creates the private home on the forge and publishes the first snapshot before recording membership; network publicar writes the snapshot right away, and network sair removes it from the home.",
              "docs sincronizar brings ledger and git facts into roadmap items. --so limits it to the requested items; in the worktree of a thread linked to an item, that item is the default, and --todos covers every item again."
            ],
            "code": "ork network roadmap --json\nork network status --json\nork network entrar --maquina <nome>\nork roadmap reservas --soltar-orfas\nork roadmap feat --thread <thread>\nork docs sincronizar --escrever --so RM-NNN"
          },
          {
            "id": "entrega-e-ci",
            "title": "Delivery, CI and concurrency",
            "paragraphs": [
              "ci prepare writes .ork-ci/<thread>.json in the thread’s worktree, with its branch; ci run --branch finds that bundle by branch name, fails an ork/* branch without a bundle and, outside a thread, runs only the manifest commands. ship registrar-pr --repo --pr records a PR merged into an external repository declared in ci.external_repositories, with the merge confirmed through the GitHub API and the declared check green on the PR head.",
              "phase run refuses with concurrency.limite, exit code 3, when the project already has max_parallel_threads live sessions in other threads; --esperar waits for a slot. In a session without ledger access, the ork_decision_record MCP tool records the decision through the same contract as decisao registrar.",
              "ship registrar-pr --dry-run, also with --repo --pr, runs the same checks and answers registraria, without writing ship_done, changing the phase or publishing the factory.",
              "--remoto in ship --para, ship registrar-pr and ci status is the name of a git remote, validated before any git call: outside the format, it refuses with ship.remoto-invalido or ci.remoto-invalido, without querying GitHub."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <owner/name> --pr <n>\nork phase run <thread> GO --prompt \"<text>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Search memory by meaning",
            "paragraphs": [
              "memory search --texto searches the tenant by meaning, combining vector and FTS, and is not deterministic; it cannot be combined with --tags or --thread. memory index maintains the local, idempotent vector index, and --dry-run estimates tokens and cost without calling the provider. memory status --sondar makes one real call and measures its latency. status, index and search use the same tenant search universe; status and index show it per collection, count what stays out of search and warn when the index covers less than search can see."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory search --texto \"<phrase>\" --json"
          },
          {
            "id": "grafo",
            "title": "Query the code graph",
            "paragraphs": [
              "grafo indexar builds the index for a clean HEAD, in project state and outside git; --verificar extracts again and checks contract, bytes and determinism. vizinhos, chamadores, importadores and caminho answer from the edges, as text or --json, with each edge’s extractor and evidence. status shows the HEAD index, amostra supports manual edge audits and limpar deletes indexes that are not the HEAD of any tree.",
              "Answers are partial by construction: they contain only what the extractor proves, and they say so. With a modified tree, the answer reflects HEAD and warns about it. All of ork grafo needs typescript and micromark in the node_modules of the ork package itself: they are package dependencies with exact versions, and npm install -g brings them. Installed inside a project or through npx, npm hoists them out of the package, and the refusal is grafo.parser.indisponivel, with the fix in grafo status and doctor. The graph needs Node 20.19, 22.12 or later.",
              "With the index of an ancestor revision, grafo indexar re-extracts only what the change reaches, with the same bytes as a full extraction, and says when it ran in full and why. With --json, --teto-bytes N caps the answer at N bytes, dropping the edges farthest from the target first; a path is never cut and refuses with grafo.consulta.teto-excedido. Without a HEAD index, the refusal names the case (grafo.indice.ausente, grafo.indice.outra-revisao or grafo.indice.outro-extrator) and the fix. The same queries are in the project MCP server behind the grafo.mcp flag, off by default."
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
              "Empiece por el diagnóstico y el panorama. Las consultas de thread, fases y claims explican el estado registrado; no conceden permiso de escritura. Use --help en el comando concreto antes de modificar datos.",
              "ork doctor reprueba un archivo o carpeta de .git con un dueño distinto del dueño del repositorio, con el recuento, ejemplos y el chown exacto en la corrección; no ejecuta nada. El check de analizadores del grafo carga typescript y micromark como ork grafo indexar y avisa con la corrección cuando faltan. La línea rede muestra la adhesión a la Orkastery Network, la casa, el último latido y el último fallo, leyendo solo archivos locales."
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
            "id": "thread-e-worktree",
            "title": "Thread y worktree",
            "paragraphs": [
              "Con worktree.por_thread: true, lo que graba ork init, ork thread new crea la worktree y la rama ork/<slug> sin flag; con la clave en false o ausente, solo con --worktree auto. --worktree DIR reutiliza un directorio existente, --sem-worktree crea sin worktree y avisa que, en la rama base, ork ship queda bloqueado, y --dry-run muestra la worktree que se crearía. La misma regla vale para --from-finding.",
              "ork worktree sync recrea en el SHA de la base la rama sin commits propios. Con commits propios y la base reescrita, por ejemplo después de un force-push, rechaza con tree.blocked, causa base-reescrita, y muestra el git rebase --onto que reaplica solo los commits de la thread."
            ],
            "code": "ork thread new \"<nome>\" --modo auto --dry-run\nork thread new \"<nome>\" --modo auto --sem-worktree\nork worktree sync <thread> --dry-run"
          },
          {
            "id": "integracoes",
            "title": "Integraciones y operación",
            "paragraphs": [
              "adapter y mcp conectan el host. accounts y setup describen runtimes y perfiles. sessions, monitor y pulse observan la ejecución y la atención humana. brain y portfolio consultan memoria y catálogo. fabrica, roadmap y network coordinan el trabajo entre máquinas, y projetos indica qué proyecto lee cada comando. grafo consulta el índice local del grafo de código. La referencia canónica del repositorio detalla las opciones de cada familia."
            ]
          },
          {
            "id": "contas-e-sessoes",
            "title": "Cuentas, perfiles y sesiones",
            "paragraphs": [
              "phase run --perfil <id> despacha por la cuenta pedida, o rechaza con runtime.profile-invalid, runtime.quota-exhausted o runtime.auth-missing, sin cambiar de perfil por su cuenta. runtime_profiles.distribuir elige entre los perfiles: ordem, el valor por defecto, es el primero del store; carga es el de menos sesiones vivas en esta máquina. Un valor desconocido vale ordem, con aviso.",
              "sessions lista las sesiones de todas las cuentas, con la columna PERFIL y las fantasmas; sessions limpar-fantasmas suelta cada fantasma de ork con registro en el ledger, sin llamar a stop ni rm en el runtime. Cuando el runtime rechaza el directorio de la worktree o espera la aceptación de términos nuevos, la fase espera a que el dueño ejecute el comando de la pausa, y retry run después vuelve a despachar el mismo prompt."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions --all\nork sessions limpar-fantasmas --dry-run --json"
          },
          {
            "id": "contexto-e-atencao",
            "title": "Contexto citable y atención humana",
            "paragraphs": [
              "brain context devuelve entidades, padres, citas, vigencia y lagunas sin conceder escritura. roadmap status crea un informe de lectura con lo que requiere atención del dueño. master pedir genera la solicitud de nota para una respuesta humana autenticada; no es una nota dada por el agente. master <thread> --score exige --por con el nombre de quien da la nota. master <thread> --aceitar-omissao acepta por omisión solo la thread indicada, con --dry-run para verlo antes; sin la thread, acepta todas las entregadas del proyecto."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork roadmap status --json\nork master pedir <thread> --formato telegram\nork master <thread> --aceitar-omissao --dry-run"
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
              "network status muestra las máquinas de la Orkastery Network de la persona, desde cualquier directorio, con la fuente, las lagunas tipadas y lo que no se leyó. network entrar comprueba o crea la casa privada en la forja y publica la primera instantánea antes de guardar la adhesión; network publicar escribe la instantánea en el momento, y network sair la retira de la casa.",
              "docs sincronizar lleva hechos del ledger y de git a los elementos del roadmap. --so limita la operación a los elementos pedidos; en la worktree de una thread con elemento, el predeterminado es el suyo, y --todos vuelve a cubrirlos todos."
            ],
            "code": "ork network roadmap --json\nork network status --json\nork network entrar --maquina <nome>\nork roadmap reservas --soltar-orfas\nork roadmap feat --thread <thread>\nork docs sincronizar --escrever --so RM-NNN"
          },
          {
            "id": "entrega-e-ci",
            "title": "Entrega, CI y concurrencia",
            "paragraphs": [
              "ci prepare escribe .ork-ci/<thread>.json en la worktree de la thread, con su branch; ci run --branch encuentra ese bundle por el nombre de la branch, rechaza una branch ork/* sin bundle y, fuera de una thread, ejecuta solo los comandos del manifiesto. ship registrar-pr --repo --pr registra un PR fusionado en un repositorio externo declarado en ci.external_repositories, con el merge comprobado mediante la API de GitHub y el check declarado en verde en el head del PR.",
              "phase run rechaza con concurrency.limite, código de salida 3, cuando el proyecto ya tiene max_parallel_threads sesiones vivas en otras threads; --esperar espera un hueco. En una sesión sin acceso al ledger, la herramienta MCP ork_decision_record registra la decisión con el mismo contrato que decisao registrar.",
              "ship registrar-pr --dry-run, también con --repo --pr, hace las mismas comprobaciones y responde registraria, sin grabar ship_done, sin cambiar la fase y sin publicar la fábrica.",
              "--remoto de ship --para, ship registrar-pr y ci status es el nombre de un remoto de git, validado antes de cualquier git: fuera del formato, se rechaza con ship.remoto-invalido o ci.remoto-invalido, sin consultar GitHub."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <dueño/nombre> --pr <n>\nork phase run <thread> GO --prompt \"<texto>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Búsqueda por significado en la memoria",
            "paragraphs": [
              "memory search --texto busca por significado en el tenant, combinando vector y FTS, y no es determinista; no se combina con --tags ni --thread. memory index mantiene el índice vectorial local e idempotente, y --dry-run estima tokens y coste sin llamar al provider. memory status --sondar hace una llamada real y mide la latencia. status, index y search usan el mismo universo de búsqueda del tenant; status e index lo muestran por colección, cuentan lo que queda fuera de la búsqueda y avisan cuando el índice cubre menos de lo que ve la búsqueda."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory search --texto \"<frase>\" --json"
          },
          {
            "id": "grafo",
            "title": "Consulte el grafo de código",
            "paragraphs": [
              "grafo indexar construye el índice del HEAD limpio, en el estado del proyecto y fuera de git; --verificar vuelve a extraer y comprueba contrato, bytes y determinismo. vizinhos, chamadores, importadores y caminho responden a partir de las aristas, en texto o --json, con el extractor y la prueba de cada una. status muestra el índice del HEAD, amostra sirve para auditar aristas a mano y limpar borra los índices que no son del HEAD de ningún árbol.",
              "La respuesta es parcial por construcción: solo contiene lo que el extractor demuestra, y lo indica. Con el árbol modificado, la respuesta corresponde al HEAD, con aviso. Todo ork grafo necesita typescript y micromark en el node_modules del propio paquete de ork: son dependencias del paquete, con versión exacta, y npm install -g los trae. Instalado dentro de un proyecto o mediante npx, npm los eleva fuera del paquete, y el rechazo es grafo.parser.indisponivel, con la corrección en grafo status y en doctor. El grafo pide Node 20.19, 22.12 o posterior.",
              "Con el índice de una revisión ancestro, grafo indexar reextrae solo lo que el cambio alcanza, con los mismos bytes de la extracción completa, y dice cuándo fue completa y por qué. Con --json, --teto-bytes N limita la respuesta a N bytes, quitando primero las aristas más lejanas del objetivo; el camino no se corta y rechaza con grafo.consulta.teto-excedido. Sin el índice del HEAD, el rechazo indica el caso (grafo.indice.ausente, grafo.indice.outra-revisao o grafo.indice.outro-extrator) y la corrección. Las mismas consultas están en el MCP del proyecto detrás del flag grafo.mcp, apagado por defecto."
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
      "docs/referencia/contratos/projetos-rm052.md",
      "docs/referencia/contratos/rede-rm053.md"
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
            "id": "prova-ativacao",
            "title": "Prova de ativação por host",
            "paragraphs": [
              "prova-ativacao.cjs abre uma sessão nova e não interativa no host instalado, numa cópia descartável do projeto, e pede orkastery maestro. A conferência julga só o determinístico: a entrada contratada foi exposta e chamada, e o resultado cumpre o contrato dela, com o projeto esperado e o que não foi consultado. A resposta tem de nomear o projeto e não pode concluir roadmap vazio. Os hosts da prova são claude-code, openclaw e codex. No Codex, a entrada é mcp__orkastery__ork_maestro, o servidor MCP do projeto vai à sessão por -c e as ferramentas expostas vêm do tools/list desse servidor; a sessão efêmera não pode ficar em $CODEX_HOME/sessions.",
              "O roteiro também confere que a consulta não escreveu no estado do projeto e que a configuração global do host não mudou. O recibo ork.prova-ativacao/v1 sai redigido. Saídas: 0 aprovada, 1 reprovada, 2 host ausente ou fora da prova, 3 pendente de ação humana. A prova não consente MCP nem reinicia gateway por ninguém."
            ],
            "code": "node core/scripts/prova-ativacao.cjs claude-code\nnode core/scripts/prova-ativacao.cjs codex"
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
            "id": "rede",
            "title": "Contratos da Orkastery Network",
            "paragraphs": [
              "ork.rede/v1 é a adesão desta máquina, em ~/.orkastery/rede.json; membro false é a saída explícita e vence a adesão herdada. ork.rede-maquina/v1 é o retrato publicado em maquinas/<maquina>.json na casa privada: máquina, id da instalação, hostname, forjas com o login, runtimes e hosts com versão, projetos com remoto sem credencial, versão do ork e batida. ork.rede-status/v1 é a leitura de ork network status --json: casa, esta máquina, fontes, membros, lacunas e o que não foi consultado.",
              "Campo novo e opcional não muda a versão. O leitor ignora retrato malformado, com nome de outra máquina ou com caractere invisível e o transforma em lacuna; o escritor publica só o que o leitor aceita. A casa fala só por HTTPS, e o ork nunca lê token."
            ],
            "code": "ork network status --json"
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
              "ork.ledger-stats/v1 agrega fatos registrados em um intervalo semiaberto UTC. Tokens e duração têm cobertura explícita; ausência continua ausente. custoReferencia é uma estimativa para comparar cenários, não uma fatura. Throughput depende de ship_done; não conte um commit local como entrega remota.",
              "hitlDeConducao mede o tempo parado pelas perguntas que o próprio ork abriu ao dono: pedidos, respondidos, sem resposta e abertos, o tempo parado no período, a mediana e a maior espera das respondidas, e a meta de 5 minutos, com null quando não há amostra. A decisão informada não para nada e fica fora. O ork pulse e o ork roadmap status levam o mesmo cálculo no campo opcional hitlDeConducao, com abertas, seteDias e acimaDaMeta; o campo só aparece com pergunta aberta ou com pergunta e resposta na semana, e a visão da rede não o soma."
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
            "id": "prova-ativacao",
            "title": "Activation proof per host",
            "paragraphs": [
              "prova-ativacao.cjs opens a new non-interactive session in the installed host, on a disposable copy of the project, and asks for orkastery maestro. The check judges only what is deterministic: the contracted entry point was exposed and called, and the result meets its contract, with the expected project and what was not consulted. The answer must name the project and must not conclude that the roadmap is empty. The proof hosts are claude-code, openclaw and codex. In Codex, the entry point is mcp__orkastery__ork_maestro, the project MCP server reaches the session through -c, and the exposed tools come from that server’s tools/list; the ephemeral session must not remain in $CODEX_HOME/sessions.",
              "The script also checks that the query did not write to the project state and that the host’s global configuration did not change. The ork.prova-ativacao/v1 receipt is redacted. Exit codes: 0 passed, 1 failed, 2 host missing or outside the proof, 3 pending human action. The proof neither consents to MCP nor restarts a gateway for anyone."
            ],
            "code": "node core/scripts/prova-ativacao.cjs claude-code\nnode core/scripts/prova-ativacao.cjs codex"
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
            "id": "rede",
            "title": "Orkastery Network contracts",
            "paragraphs": [
              "ork.rede/v1 is this machine’s membership, in ~/.orkastery/rede.json; membro false is the explicit exit and overrides inherited membership. ork.rede-maquina/v1 is the snapshot published at maquinas/<maquina>.json in the private home: machine, installation id, hostname, forges with the login, runtimes and hosts with version, projects with a credential-free remote, ork version and heartbeat. ork.rede-status/v1 is the reading from ork network status --json: home, this machine, sources, members, gaps and what was not consulted.",
              "A new optional field does not change the version. The reader ignores a malformed snapshot, one with another machine’s name or one with invisible characters, and turns it into a gap; the writer publishes only what the reader accepts. The home speaks HTTPS only, and ork never reads a token."
            ],
            "code": "ork network status --json"
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
              "ork.ledger-stats/v1 aggregates recorded facts over a half-open UTC interval. Tokens and duration have explicit coverage; missing values remain missing. custoReferencia is a scenario estimate, not an invoice. Throughput depends on ship_done; do not count a local commit as remote delivery.",
              "hitlDeConducao measures the time stalled by questions that ork itself opened to the owner: requests, answered, unanswered and open, stalled time in the period, the median and longest wait among answered ones, and the 5-minute target, null when there is no sample. An informed decision stops nothing and is excluded. ork pulse and ork roadmap status carry the same calculation in the optional hitlDeConducao field, with abertas, seteDias and acimaDaMeta; the field appears only with an open question or with a question and answer during the week, and the network view does not add it up."
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
            "id": "prova-ativacao",
            "title": "Prueba de activación por host",
            "paragraphs": [
              "prova-ativacao.cjs abre una sesión nueva y no interactiva en el host instalado, en una copia descartable del proyecto, y pide orkastery maestro. La comprobación juzga solo lo determinista: la entrada contratada se expuso y se llamó, y el resultado cumple su contrato, con el proyecto esperado y lo que no se consultó. La respuesta debe nombrar el proyecto y no puede concluir que el roadmap está vacío. Los hosts de la prueba son claude-code, openclaw y codex. En Codex, la entrada es mcp__orkastery__ork_maestro, el servidor MCP del proyecto llega a la sesión mediante -c y las herramientas expuestas vienen del tools/list de ese servidor; la sesión efímera no puede quedar en $CODEX_HOME/sessions.",
              "El guion también comprueba que la consulta no escribió en el estado del proyecto y que la configuración global del host no cambió. El recibo ork.prova-ativacao/v1 sale redactado. Salidas: 0 aprobada, 1 reprobada, 2 host ausente o fuera de la prueba, 3 pendiente de acción humana. La prueba no consiente MCP ni reinicia un gateway por nadie."
            ],
            "code": "node core/scripts/prova-ativacao.cjs claude-code\nnode core/scripts/prova-ativacao.cjs codex"
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
            "id": "rede",
            "title": "Contratos de la Orkastery Network",
            "paragraphs": [
              "ork.rede/v1 es la adhesión de esta máquina, en ~/.orkastery/rede.json; membro false es la salida explícita y prevalece sobre la adhesión heredada. ork.rede-maquina/v1 es la instantánea publicada en maquinas/<maquina>.json en la casa privada: máquina, id de la instalación, hostname, forjas con el login, runtimes y hosts con versión, proyectos con remoto sin credencial, versión de ork y latido. ork.rede-status/v1 es la lectura de ork network status --json: casa, esta máquina, fuentes, miembros, lagunas y lo que no se consultó.",
              "Un campo nuevo y opcional no cambia la versión. El lector ignora la instantánea malformada, con el nombre de otra máquina o con caracteres invisibles, y la convierte en laguna; el escritor publica solo lo que el lector acepta. La casa habla solo por HTTPS, y ork nunca lee un token."
            ],
            "code": "ork network status --json"
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
              "ork.ledger-stats/v1 agrega hechos registrados en un intervalo UTC semiabierto. Los tokens y la duración tienen cobertura explícita; los valores ausentes siguen ausentes. custoReferencia es una estimación para comparar escenarios, no una factura. El throughput depende de ship_done; no cuente un commit local como entrega remota.",
              "hitlDeConducao mide el tiempo detenido por las preguntas que el propio ork abrió al dueño: pedidos, respondidos, sin respuesta y abiertos, el tiempo detenido en el período, la mediana y la mayor espera de los respondidos, y la meta de 5 minutos, con null cuando no hay muestra. La decisión informada no detiene nada y queda fuera. ork pulse y ork roadmap status llevan el mismo cálculo en el campo opcional hitlDeConducao, con abertas, seteDias y acimaDaMeta; el campo solo aparece con una pregunta abierta o con pregunta y respuesta en la semana, y la vista de la red no lo suma."
            ],
            "code": "ork ledger stats --desde 7d --json"
          }
        ]
      }
    }
  }
];
