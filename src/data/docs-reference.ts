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
              "A condução reúne ork thread, ork phase, ork modos e ork gate. A evidência usa ork claims, ork verify, ork fix e ork retry. O isolamento usa ork worktree e ork lease. A continuidade usa ork handoff, ork recall e ork memory. A entrega usa ork ship e ork master. A auditoria usa ork audit, com o board de dívida em ork audit divida."
            ],
            "code": "ork --help\nork ship --help\nork master --help"
          },
          {
            "id": "thread-e-worktree",
            "title": "Thread e worktree",
            "paragraphs": [
              "Com worktree.por_thread: true, o que o ork init grava, ork thread new cria a worktree e a branch ork/<slug> sem flag; com a chave false ou ausente, só com --worktree auto. --worktree DIR reusa um diretório existente, --sem-worktree cria sem worktree e avisa que, na branch base, o ork ship sai barrado, e --dry-run mostra a worktree que seria criada. A mesma regra vale para --from-finding.",
              "ork worktree sync recria a branch sem commit próprio no SHA da base. Com commits próprios e a base reescrita, por exemplo depois de um force-push, recusa com tree.blocked, causa base-reescrita, e mostra o git rebase --onto que reaplica só os commits da thread.",
              "Na versão {versao}, com --pedido, ork thread new guarda o pedido em pedido.md, na pasta da thread, com o sha256 no thread.json e no thread_created; pedido vazio ou acima de 64 KiB recusa antes de gravar. Sem --pedido, ork prompt render usa o pedido guardado, conferido pelo sha256 (thread.pedido.divergente quando o arquivo foi editado fora do núcleo); thread sem pedido guardado segue com o texto de exemplo."
            ],
            "code": "ork thread new \"<nome>\" --modo auto --dry-run\nork thread new \"<nome>\" --modo auto --sem-worktree\nork thread new \"<nome>\" --modo auto --pedido \"<texto>\"\nork prompt render <thread> --fase GO\nork worktree sync <thread> --dry-run"
          },
          {
            "id": "integracoes",
            "title": "Integrações e operação",
            "paragraphs": [
              "ork adapter e ork mcp conectam o host. ork accounts e ork setup descrevem runtimes, perfis e o que esta máquina confirmou. ork onboarding guarda a pauta e as respostas do projeto, e ork experiencia mostra as preferências do pacote de experiência. ork sessions, ork monitor e ork pulse observam execução e atenção humana. ork brain e ork portfolio consultam memória e catálogo, e ork ledger stats dá a telemetria do ledger. ork fabrica, ork roadmap e ork network coordenam trabalho entre máquinas, e ork projetos diz qual projeto cada comando lê. ork grafo consulta o índice local do grafo de código. A referência canônica no repositório detalha as opções de cada família, e um teste confere as invocações dela contra a ajuda do ork."
            ]
          },
          {
            "id": "confirmacoes",
            "title": "Confirmações desta máquina",
            "paragraphs": [
              "Na versão {versao}, três escolhas do manifesto só valem depois de a máquina confirmar, fora do git. O runtime.sandbox que afrouxa o sandbox do agente (danger-full-access) só despacha pelo Codex depois de ork setup sandbox confirmar <postura>; sem isso, ork phase run e ork retry run recusam com runtime.sandbox-nao-confirmado. O worktree.dir que leva para fora da raiz, pelo caminho real, só cria worktree depois de ork setup worktree confirmar; sem isso, a criação recusa com worktree.dir-fora-da-raiz. E o fabrica.compartilhada: true só liga a fábrica com a adesão da máquina, por ork fabrica entrar.",
              "Cada confirmação fica em .orkastery/private (postura-local.json e worktree-local.json, modo 0600, fora do git) e vale só para este checkout; a da worktree, só para aquela pasta. O ork doctor acusa a falta de cada uma.",
              "Também na versão {versao}, o ork eval só executa o catálogo do pacote que está rodando: um catálogo achado a partir do cwd que não é o do pacote recusa com eval.catalogo-alheio. Num checkout do Orkastery, use o do checkout, node core/dist/index.js eval, como o CI já faz."
            ],
            "links": [
              {
                "label": "Fronteira de confiança",
                "href": "/docs/confianca/"
              }
            ],
            "code": "ork setup sandbox --json\nork setup sandbox confirmar danger-full-access\nork setup worktree confirmar\nork setup worktree revogar\nnode core/dist/index.js eval"
          },
          {
            "id": "contas-e-sessoes",
            "title": "Contas, perfis e sessões",
            "paragraphs": [
              "ork phase run --perfil <id> despacha pela conta pedida, ou recusa com runtime.profile-invalid, runtime.quota-exhausted ou runtime.auth-missing, sem trocar de perfil sozinho. runtime_profiles.distribuir escolhe entre os perfis: ordem, o padrão, é o primeiro do store; carga é o de menos sessões vivas nesta máquina. Valor desconhecido vale ordem, com aviso.",
              "ork sessions lista as sessões de todas as contas, com a coluna PERFIL e as fantasmas; --global inventaria também as sessões Claude e Codex da conta fora da raiz do projeto, e --exigir-limpo sai diferente de zero com fonte inválida ou sessão sem thread. ork sessions limpar-fantasmas solta cada fantasma do ork com registro no ledger, sem chamar stop nem rm no runtime. Quando o runtime recusa o diretório da worktree ou espera o aceite de termos novos, a fase espera o dono rodar o comando da pausa, e ork retry run re-despacha o mesmo prompt depois.",
              "Na versão {versao}, para o ork retry run, a confiança no diretório vale quando o .claude.json da conta a registra no próprio diretório, num de cima até a raiz do repositório ou no repositório principal da worktree, e o redespacho recusado de novo pelo mesmo impedimento não gasta tentativa nem sobe esforço.",
              "ork accounts esgotamentos mede, sem gravar nada, os despachos que caíram numa conta marcada como esgotada por outro projeto dentro do prazo da marca; a conta sai como id opaco, e o total é um piso."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions --all\nork sessions --global --json\nork sessions limpar-fantasmas --dry-run --json\nork accounts esgotamentos --desde 7d --json"
          },
          {
            "id": "contexto-e-atencao",
            "title": "Contexto citável e atenção humana",
            "paragraphs": [
              "ork brain context devolve entidades, pais, citações, frescor e lacunas sem conceder permissão de escrita, e ork brain dossie monta, só para leitura, o dossiê de uma decisão: vínculo, contexto citável, alternativas, quem decidiu e evidência. ork roadmap status monta um relatório de leitura com a atenção que cabe ao dono. ork master pedir gera o pedido de nota para resposta pelo canal autenticado; não é uma nota dada pelo agente. ork master <thread> --score exige --por com o nome de quem dá a nota. ork master <thread> --aceitar-omissao aceita por omissão só a thread indicada, com --dry-run para ver antes; sem a thread, aceita todas as entregues do projeto.",
              "Sem --classe, a classe da falha sai do motivo de cada gate reprovado, e base-avancou entra quando a branch trouxe a base antes da entrega; vale também no --aceitar-omissao.",
              "Na versão {versao}, quando uma thread fora do roadmap espera o dono, o fecho do ork roadmap status ganha uma linha que conta essas threads e aponta o ork pulse, e o --json ganha o campo opcional foraDoRoadmap; sem thread assim, a saída não muda."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork brain dossie --thread <thread>\nork roadmap status --json\nork master pedir <thread> --formato telegram\nork master <thread> --aceitar-omissao --dry-run"
          },
          {
            "id": "projeto-alvo",
            "title": "Escolha o projeto consultado",
            "paragraphs": [
              "Todo comando lê um projeto. Vale, nesta ordem: --projeto <nome|caminho>, em qualquer posição do comando; a variável ORK_PROJETO; no host sem diretório de projeto, o único projeto conhecido ou a recusa projeto.escolha; e, no terminal, o diretório atual. Nome ambíguo ou desconhecido recusa com os candidatos, na saída 4; o ork nunca escolhe no lugar de quem pediu.",
              "ork projetos lista os projetos conhecidos desta máquina, sem segredo. ork init, ork thread new e ork fabrica entrar registram sozinhos; ork projetos registrar e ork projetos esquecer cuidam das cópias antigas, sem apagar nada do disco. ork maestro, ork board, ork board plan, ork fabrica e ork roadmap status começam dizendo o projeto consultado e o que não foi lido.",
              "Na versão {versao}, ork roadmap reservas também começa pelo projeto consultado, e os demais comandos que leem um projeto que o leitor não tem como adivinhar (no host, ou fora do diretório dele) terminam com a linha Projeto consultado, no stderr."
            ],
            "code": "ork projetos --json\nork roadmap status --projeto meu-produto\nork roadmap reservas --json\nork projetos registrar\nork projetos esquecer <nome>"
          },
          {
            "id": "rede-e-reservas",
            "title": "Rede, reservas e números de feature",
            "paragraphs": [
              "ork network roadmap junta o roadmap da rede de qualquer diretório, com lacuna tipada no que não leu. ork roadmap reservas marca a reserva órfã de thread já fechada nesta máquina, e --soltar-orfas a solta ou a passa para outra thread aberta do mesmo item, com registro; --remoto escolhe o remoto lido, origin por padrão. ork roadmap feat reserva o próximo número de FEAT por push atômico; duas máquinas nunca levam o mesmo número, e o número reservado não volta.",
              "ork network status mostra as máquinas da Orkastery Network da pessoa, de qualquer diretório, com a fonte, as lacunas tipadas e o que não foi lido. ork network entrar confere ou cria a casa privada na forja e publica o primeiro retrato antes de gravar a adesão; ork network publicar grava o retrato na hora, e ork network sair o tira da casa.",
              "ork docs sincronizar leva fatos do ledger e do git aos itens do roadmap. --so limita aos itens pedidos; na worktree de uma thread com item, o padrão é o item dela, e --todos volta a todos. ork docs verificar confere a documentação de produto e do roadmap contra o código e o git, e sai diferente de zero com erro; no PR, com --pr, o merge de outra thread e o índice que divergem da main só avisam. ork docs init cria padrões, modelos, índices e o lint de Markdown no projeto."
            ],
            "code": "ork network roadmap --json\nork network status --json\nork network entrar --maquina <nome>\nork roadmap reservas --soltar-orfas\nork roadmap feat --thread <thread>\nork docs sincronizar --escrever --so RM-NNN\nork docs verificar --pr"
          },
          {
            "id": "conferir-claims",
            "title": "Confira claims no sandbox",
            "paragraphs": [
              "Na versão {versao}, ork claims conferir <thread> --claims C3,C7 reexecuta só essas claims no sandbox do ork_verify, na worktree da thread registrada no git, sob a condução da thread e sem gravar recibo: nem verify_run, nem estado de claim. ork claims conferir <thread> --tarefa T2.1 confere, no lugar delas, o verify de uma tarefa do docs/plan.md da thread, quando ele é um comando só, entre crases; --prazo vai de 10 a 600 segundos, com 180 por padrão, e --json devolve ork.claims-conferencia/v1.",
              "Sai 1 quando alguma não passa, 2 sem sandbox ou com pedido inválido e 3 quando outra sessão conduz. Quem verifica de verdade continua sendo o ork verify, que não roda confinado: no sandbox, processo filho do node falha, e a claim de teste que cria processo pode reprovar ali e passar no ork verify."
            ],
            "code": "ork claims conferir <thread> --claims C3,C7\nork claims conferir <thread> --tarefa T2.1 --json\nork verify <thread>"
          },
          {
            "id": "entrega-e-ci",
            "title": "Entrega, CI e concorrência",
            "paragraphs": [
              "ork ci prepare grava .ork-ci/<thread>.json na worktree da thread, com a branch dela; ork ci run --branch acha esse bundle pelo nome da branch, reprova branch ork/* sem bundle e, fora de thread, roda só os comandos do manifesto. ork ship registrar-pr --repo --pr registra PR mesclado num repositório externo declarado em ci.external_repositories, com o merge conferido pela API do GitHub e o check declarado verde no head do PR.",
              "ork phase run recusa com concurrency.limite, na saída 3, quando o projeto já tem max_parallel_threads sessões vivas em outras threads; --esperar espera a vaga. Na sessão sem acesso ao ledger, a ferramenta MCP ork_decision_record grava a decisão pelo mesmo contrato de ork decisao registrar.",
              "ork ship registrar-pr --dry-run, também com --repo --pr, faz as mesmas conferências e responde registraria, sem gravar ship_done, sem mudar a fase e sem publicar a fábrica.",
              "O --remoto de ork ship --para, ork ship registrar-pr e ork ci status é o nome de um remoto do git, validado antes de qualquer git: fora do formato, recusa com ship.remoto-invalido ou ci.remoto-invalido, sem consultar o GitHub."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <dono/nome> --pr <n>\nork phase run <thread> GO --prompt \"<texto>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Busca por significado na memória",
            "paragraphs": [
              "ork memory search --texto busca por significado no tenant, com vetor e FTS combinados, e não é determinística; não combina com --tags nem --thread. ork memory index mantém o índice vetorial local, idempotente, e --dry-run estima tokens e custo sem chamar o provider. ork memory status --sondar faz uma chamada real e mede a latência. Os três usam o mesmo universo da busca do tenant; ork memory status e ork memory index o mostram por coleção, contam o que fica fora da busca e avisam quando o índice cobre menos do que a busca enxerga.",
              "Sem o universo lido inteiro, ou com a memória desligada ou indisponível, ork memory search --texto sai 1 com motivo tipado e sem resultados, também em --json; universo vazio lido com sucesso sai 0. A leitura do universo tem prazo próprio, memory.universo_timeout_ms, 90.000 ms por padrão.",
              "ork memory search --tags é a busca determinística por tag; com --thread, a leitura fica restrita à thread, e --restrito e --janela exigem --thread (memory.query.thread-required).",
              "Na versão {versao}, a prova core/scripts/prova-busca-semantica.sh mostra, por par, a posição e a similaridade de cada alvo no ranking vetorial e quantas entradas da busca têm vetor coerente no índice, sem mudar os pares nem os códigos de saída. Sem argumentos, ela usa os pares padrão que o dono decidiu; pares passados como argumentos substituem os padrão."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory search --texto \"<frase>\" --json"
          },
          {
            "id": "grafo",
            "title": "Consulte o grafo de código",
            "paragraphs": [
              "ork grafo indexar constrói o índice do HEAD limpo, no estado do projeto e fora do git; --verificar extrai de novo e confere contrato, bytes e determinismo. ork grafo vizinhos, ork grafo chamadores, ork grafo importadores e ork grafo caminho respondem pelas arestas, em texto ou --json, com o extrator e a evidência de cada uma. ork grafo status mostra o índice do HEAD, ork grafo amostra ajuda na auditoria manual de arestas e ork grafo limpar apaga os índices que não são do HEAD de nenhuma árvore.",
              "A resposta é parcial por construção: só o que o extrator prova, e ela diz isso. Com a árvore modificada, a resposta é a do HEAD, com aviso. Todo o ork grafo precisa do typescript e do micromark no node_modules do próprio pacote do ork: são dependências do pacote, com versão exata, e o npm install -g os traz. Instalado dentro de um projeto ou pelo npx, o npm os iça para fora do pacote, e a recusa é grafo.parser.indisponivel, com a correção no ork grafo status e no ork doctor. O grafo pede Node 20.19, 22.12 ou mais novo.",
              "Na versão {versao}, a resposta confere a proveniência contra a árvore: o texto marca com [fonte modificada na arvore] a aresta cuja origem, alvo ou evidência mudou depois do HEAD e lista até cinco fontes que mudaram; no JSON, cada aresta traz o campo arvore, e a resposta traz o campo fontes.",
              "Com o índice de uma revisão ancestral, ork grafo indexar reextrai só o que a mudança alcança, com os mesmos bytes da extração completa, e diz quando foi completo e por quê. Com --json, --teto-bytes N limita a resposta a N bytes, tirando primeiro as arestas mais longe do alvo; o caminho não se corta e recusa com grafo.consulta.teto-excedido. Sem o índice do HEAD, a recusa diz o caso (grafo.indice.ausente, grafo.indice.outra-revisao ou grafo.indice.outro-extrator) e a correção. As mesmas consultas estão no MCP do projeto atrás da flag grafo.mcp, desligada por padrão.",
              "ork grafo contexto <thread> monta o pacote compacto da thread, com o diff da worktree, GOAL, PLAN e claims, as ligações mais próximas do diff primeiro e evidência em tupla; o JSON ork.thread-graph-context/v2 tem teto de 32.768 bytes por padrão, de 4.096 a 65.536. Sem worktree, o diff é ignorado e declarado; com a flag ligada, ork_grafo_contexto entrega o mesmo JSON no MCP."
            ],
            "code": "ork grafo indexar --verificar\nork grafo status\nork grafo chamadores <símbolo>\nork grafo importadores <arquivo> --json\nork grafo caminho <de> <para>\nork grafo contexto <thread> --json"
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
              "Conduction covers ork thread, ork phase, ork modos and ork gate. Evidence uses ork claims, ork verify, ork fix and ork retry. Isolation uses ork worktree and ork lease. Continuity uses ork handoff, ork recall and ork memory. Delivery uses ork ship and ork master. Auditing uses ork audit, with the debt board in ork audit divida."
            ],
            "code": "ork --help\nork ship --help\nork master --help"
          },
          {
            "id": "thread-e-worktree",
            "title": "Thread and worktree",
            "paragraphs": [
              "With worktree.por_thread: true, which ork init writes, ork thread new creates the worktree and the ork/<slug> branch without a flag; with the key false or absent, only with --worktree auto. --worktree DIR reuses an existing directory, --sem-worktree creates no worktree and warns that on the base branch ork ship will be blocked, and --dry-run shows the worktree that would be created. The same rule applies to --from-finding.",
              "ork worktree sync recreates a branch with no commits of its own at the base SHA. With its own commits and a rewritten base, for example after a force-push, it refuses with tree.blocked, cause base-reescrita, and shows the git rebase --onto that replays only the thread’s commits.",
              "In version {versao}, with --pedido, ork thread new stores the request in pedido.md, in the thread folder, with the sha256 in thread.json and in thread_created; an empty request or one over 64 KiB is refused before anything is written. Without --pedido, ork prompt render uses the stored request, checked against the sha256 (thread.pedido.divergente when the file was edited outside the core); a thread with no stored request keeps the sample text."
            ],
            "code": "ork thread new \"<nome>\" --modo auto --dry-run\nork thread new \"<nome>\" --modo auto --sem-worktree\nork thread new \"<nome>\" --modo auto --pedido \"<text>\"\nork prompt render <thread> --fase GO\nork worktree sync <thread> --dry-run"
          },
          {
            "id": "integracoes",
            "title": "Integrations and operations",
            "paragraphs": [
              "ork adapter and ork mcp connect the host. ork accounts and ork setup describe runtimes, profiles and what this machine has confirmed. ork onboarding keeps the project’s interview and answers, and ork experiencia shows the preferences of the experience pack. ork sessions, ork monitor and ork pulse observe execution and human attention. ork brain and ork portfolio access memory and the catalog, and ork ledger stats gives the ledger telemetry. ork fabrica, ork roadmap and ork network coordinate work across machines, and ork projetos shows which project each command reads. ork grafo queries the local code graph index. The canonical repository reference details each family’s options, and a test checks its invocations against the CLI help."
            ]
          },
          {
            "id": "confirmacoes",
            "title": "Confirmations on this machine",
            "paragraphs": [
              "In version {versao}, three manifest choices only take effect after the machine confirms them, outside git. A runtime.sandbox that loosens the agent sandbox (danger-full-access) only dispatches through Codex after ork setup sandbox confirmar <postura>; without it, ork phase run and ork retry run refuse with runtime.sandbox-nao-confirmado. A worktree.dir that leads outside the root, by its real path, only creates a worktree after ork setup worktree confirmar; without it, creation refuses with worktree.dir-fora-da-raiz. And fabrica.compartilhada: true only turns the factory on with the machine’s membership, through ork fabrica entrar.",
              "Each confirmation lives in .orkastery/private (postura-local.json and worktree-local.json, mode 0600, outside git) and applies only to this checkout; the worktree one, only to that folder. ork doctor reports each missing confirmation.",
              "Also in version {versao}, ork eval only runs the catalog of the package that is running: a catalog found from the cwd that is not the package’s own refuses with eval.catalogo-alheio. In an Orkastery checkout, use that checkout’s own, node core/dist/index.js eval, as CI already does."
            ],
            "links": [
              {
                "label": "Trust boundary",
                "href": "/docs/confianca/"
              }
            ],
            "code": "ork setup sandbox --json\nork setup sandbox confirmar danger-full-access\nork setup worktree confirmar\nork setup worktree revogar\nnode core/dist/index.js eval"
          },
          {
            "id": "contas-e-sessoes",
            "title": "Accounts, profiles and sessions",
            "paragraphs": [
              "ork phase run --perfil <id> dispatches through the requested account, or refuses with runtime.profile-invalid, runtime.quota-exhausted or runtime.auth-missing, without switching profiles on its own. runtime_profiles.distribuir chooses among profiles: ordem, the default, is the first in the store; carga is the one with the fewest live sessions on this machine. An unknown value falls back to ordem, with a warning.",
              "ork sessions lists the sessions of every account, with the PERFIL column and the ghosts; --global also inventories the account’s Claude and Codex sessions outside the project root, and --exigir-limpo exits non-zero with an invalid source or a session without a thread. ork sessions limpar-fantasmas releases each ghost from ork with a ledger record, without calling stop or rm in the runtime. When the runtime refuses the worktree directory or waits for new terms to be accepted, the phase waits for the owner to run the pause command, and ork retry run then re-dispatches the same prompt.",
              "In version {versao}, for ork retry run, directory trust counts when the account’s .claude.json records it for the directory itself, for one above it up to the repository root, or for the worktree’s main repository, and a re-dispatch refused again for the same blocker neither spends an attempt nor raises the effort.",
              "ork accounts esgotamentos measures, without writing anything, the dispatches that landed on an account another project had marked as exhausted while the mark was still valid; the account appears as an opaque id, and the total is a floor."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions --all\nork sessions --global --json\nork sessions limpar-fantasmas --dry-run --json\nork accounts esgotamentos --desde 7d --json"
          },
          {
            "id": "contexto-e-atencao",
            "title": "Citable context and human attention",
            "paragraphs": [
              "ork brain context returns entities, parents, citations, freshness and gaps without granting write access, and ork brain dossie builds a read-only decision dossier: link, citable context, alternatives, who decided and evidence. ork roadmap status builds a read-only report showing where the owner’s attention is needed. ork master pedir creates a score request for an authenticated human response; it is not an agent-supplied score. ork master <thread> --score requires --por with the name of the person giving the score. ork master <thread> --aceitar-omissao accepts by default only the given thread, with --dry-run to preview; without a thread, it accepts every delivered thread in the project.",
              "Without --classe, the failure class comes from the reason of each failed gate, and base-avancou is added when the branch pulled in the base before delivery; this also applies to --aceitar-omissao.",
              "In version {versao}, when a thread outside the roadmap is waiting for the owner, the closing of ork roadmap status gains a line that counts those threads and points to ork pulse, and --json gains the optional foraDoRoadmap field; with no such thread, the output does not change."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork brain dossie --thread <thread>\nork roadmap status --json\nork master pedir <thread> --formato telegram\nork master <thread> --aceitar-omissao --dry-run"
          },
          {
            "id": "projeto-alvo",
            "title": "Choose the project being read",
            "paragraphs": [
              "Every command reads one project, chosen in this order: --projeto <name|path>, anywhere in the command; the ORK_PROJETO variable; in a host without a project directory, the only known project or the projeto.escolha refusal; and, in the terminal, the current directory. An ambiguous or unknown name is refused with the candidates, exit code 4; ork never chooses on behalf of whoever asked.",
              "ork projetos lists the projects known to this machine, without secrets. ork init, ork thread new and ork fabrica entrar register automatically; ork projetos registrar and ork projetos esquecer handle older copies without deleting anything from disk. ork maestro, ork board, ork board plan, ork fabrica and ork roadmap status begin by stating the project read and what was not read.",
              "In version {versao}, ork roadmap reservas also starts with the project read, and the other commands that read a project the reader cannot guess (in a host, or outside its directory) end with the Projeto consultado line on stderr."
            ],
            "code": "ork projetos --json\nork roadmap status --projeto meu-produto\nork roadmap reservas --json\nork projetos registrar\nork projetos esquecer <name>"
          },
          {
            "id": "rede-e-reservas",
            "title": "Network, reservations and feature numbers",
            "paragraphs": [
              "ork network roadmap combines the network roadmap from any directory, with typed gaps for anything it did not read. ork roadmap reservas flags orphaned reservations held by threads already closed on this machine, and --soltar-orfas releases them or passes them to another open thread on the same item, with a record; --remoto picks the remote that is read, origin by default. ork roadmap feat reserves the next FEAT number through an atomic push; two machines never get the same number, and a reserved number is never reused.",
              "ork network status shows the machines in the person’s Orkastery Network, from any directory, with the source, typed gaps and what was not read. ork network entrar checks or creates the private home on the forge and publishes the first snapshot before recording membership; ork network publicar writes the snapshot right away, and ork network sair removes it from the home.",
              "ork docs sincronizar brings ledger and git facts into roadmap items. --so limits it to the requested items; in the worktree of a thread linked to an item, that item is the default, and --todos covers every item again. ork docs verificar checks product and roadmap documentation against the code and git, and exits non-zero on error; on a PR, with --pr, another thread’s merge and an index that diverge from main only warn. ork docs init creates standards, templates, indexes and the Markdown lint in the project."
            ],
            "code": "ork network roadmap --json\nork network status --json\nork network entrar --maquina <nome>\nork roadmap reservas --soltar-orfas\nork roadmap feat --thread <thread>\nork docs sincronizar --escrever --so RM-NNN\nork docs verificar --pr"
          },
          {
            "id": "conferir-claims",
            "title": "Check claims in the sandbox",
            "paragraphs": [
              "In version {versao}, ork claims conferir <thread> --claims C3,C7 re-runs only those claims in the ork_verify sandbox, in the thread’s worktree registered in git, under the thread’s conduction and without writing a receipt: no verify_run and no claim state. ork claims conferir <thread> --tarefa T2.1 checks instead the verify of a task in the thread’s docs/plan.md, when it is a single command in backticks; --prazo goes from 10 to 600 seconds, 180 by default, and --json returns ork.claims-conferencia/v1.",
              "It exits 1 when any claim fails, 2 without a sandbox or with an invalid request, and 3 when another session is conducting. The real check is still ork verify, which does not run confined: in the sandbox, a node child process fails, so a test claim that spawns a process can fail there and pass in ork verify."
            ],
            "code": "ork claims conferir <thread> --claims C3,C7\nork claims conferir <thread> --tarefa T2.1 --json\nork verify <thread>"
          },
          {
            "id": "entrega-e-ci",
            "title": "Delivery, CI and concurrency",
            "paragraphs": [
              "ork ci prepare writes .ork-ci/<thread>.json in the thread’s worktree, with its branch; ork ci run --branch finds that bundle by branch name, fails an ork/* branch without a bundle and, outside a thread, runs only the manifest commands. ork ship registrar-pr --repo --pr records a PR merged into an external repository declared in ci.external_repositories, with the merge confirmed through the GitHub API and the declared check green on the PR head.",
              "ork phase run refuses with concurrency.limite, exit code 3, when the project already has max_parallel_threads live sessions in other threads; --esperar waits for a slot. In a session without ledger access, the ork_decision_record MCP tool records the decision through the same contract as ork decisao registrar.",
              "ork ship registrar-pr --dry-run, also with --repo --pr, runs the same checks and answers registraria, without writing ship_done, changing the phase or publishing the factory.",
              "--remoto in ork ship --para, ork ship registrar-pr and ork ci status is the name of a remote, validated before any git call: outside the format, it refuses with ship.remoto-invalido or ci.remoto-invalido, without querying GitHub."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <owner/name> --pr <n>\nork phase run <thread> GO --prompt \"<text>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Search memory by meaning",
            "paragraphs": [
              "ork memory search --texto searches the tenant by meaning, combining vector and FTS, and is not deterministic; it cannot be combined with --tags or --thread. ork memory index maintains the local, idempotent vector index, and --dry-run estimates tokens and cost without calling the provider. ork memory status --sondar makes one real call and measures its latency. All three use the same tenant search universe; ork memory status and ork memory index display it per collection, count what stays out of search and warn when the index covers less than search can see.",
              "When the universe was not read in full, or memory is off or unavailable, ork memory search --texto exits 1 with a typed reason and no results, also with --json; an empty universe read successfully exits 0. Reading the universe has its own deadline, memory.universo_timeout_ms, 90,000 ms by default.",
              "ork memory search --tags is the deterministic tag search; with --thread, reading is restricted to the thread, and --restrito and --janela require --thread (memory.query.thread-required).",
              "In version {versao}, the core/scripts/prova-busca-semantica.sh proof shows, for each pair, the position and similarity of each target in the vector ranking and how many search entries have a coherent vector in the index, without changing the pairs or the exit codes. Without arguments, it uses the default pairs the owner decided on; pairs passed as arguments replace the defaults."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory search --texto \"<phrase>\" --json"
          },
          {
            "id": "grafo",
            "title": "Query the code graph",
            "paragraphs": [
              "ork grafo indexar builds the index for a clean HEAD, in project state and outside git; --verificar extracts again and checks contract, bytes and determinism. ork grafo vizinhos, ork grafo chamadores, ork grafo importadores and ork grafo caminho respond from the edges, as text or --json, with each edge’s extractor and evidence. ork grafo status shows the HEAD index, ork grafo amostra supports manual edge audits and ork grafo limpar deletes indexes that are not the HEAD of any tree.",
              "Answers are partial by construction: they contain only what the extractor proves, and they say so. With a modified tree, the answer reflects HEAD and warns about it. All of ork grafo needs typescript and micromark in the node_modules of the ork package itself: they are package dependencies with exact versions, and npm install -g brings them. Installed inside a project or through npx, npm hoists them out of the package, and the refusal is grafo.parser.indisponivel, with the fix in ork grafo status and ork doctor. The graph needs Node 20.19, 22.12 or later.",
              "In version {versao}, answers check provenance against the tree: the text marks with [fonte modificada na arvore] the edge whose source, target or evidence changed after HEAD and lists up to five sources that changed; in JSON, each edge carries the arvore field, and the answer carries the fontes field.",
              "With the index of an ancestor revision, ork grafo indexar re-extracts only what the change reaches, with the same bytes as a full extraction, and says when it ran in full and why. With --json, --teto-bytes N caps the answer at N bytes, dropping the edges farthest from the target first; a path is never cut and refuses with grafo.consulta.teto-excedido. Without a HEAD index, the refusal names the case (grafo.indice.ausente, grafo.indice.outra-revisao or grafo.indice.outro-extrator) and the fix. The same queries are in the project MCP server behind the grafo.mcp flag, off by default.",
              "ork grafo contexto <thread> builds the thread’s compact package from the worktree diff, GOAL, PLAN and claims, with the links closest to the diff first and evidence as tuples; the ork.thread-graph-context/v2 JSON is capped at 32,768 bytes by default, from 4,096 to 65,536. Without a worktree, the diff is ignored and the answer says so; with the flag on, ork_grafo_contexto returns the same JSON over MCP."
            ],
            "code": "ork grafo indexar --verificar\nork grafo status\nork grafo chamadores <symbol>\nork grafo importadores <file> --json\nork grafo caminho <from> <to>\nork grafo contexto <thread> --json"
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
              "La conducción reúne ork thread, ork phase, ork modos y ork gate. Las pruebas usan ork claims, ork verify, ork fix y ork retry. El aislamiento usa ork worktree y ork lease. La continuidad usa ork handoff, ork recall y ork memory. La entrega usa ork ship y ork master. La auditoría usa ork audit, con el tablero de deuda en ork audit divida."
            ],
            "code": "ork --help\nork ship --help\nork master --help"
          },
          {
            "id": "thread-e-worktree",
            "title": "Thread y worktree",
            "paragraphs": [
              "Con worktree.por_thread: true, lo que graba ork init, ork thread new crea la worktree y la rama ork/<slug> sin flag; con la clave en false o ausente, solo con --worktree auto. --worktree DIR reutiliza un directorio existente, --sem-worktree crea sin worktree y avisa que, en la rama base, ork ship queda bloqueado, y --dry-run muestra la worktree que se crearía. La misma regla vale para --from-finding.",
              "ork worktree sync recrea en el SHA de la base la rama sin commits propios. Con commits propios y la base reescrita, por ejemplo después de un force-push, rechaza con tree.blocked, causa base-reescrita, y muestra el git rebase --onto que reaplica solo los commits de la thread.",
              "En la versión {versao}, con --pedido, ork thread new guarda el pedido en pedido.md, en la carpeta de la thread, con el sha256 en thread.json y en thread_created; un pedido vacío o de más de 64 KiB se rechaza antes de grabar. Sin --pedido, ork prompt render usa el pedido guardado, comprobado por el sha256 (thread.pedido.divergente cuando el archivo se editó fuera del núcleo); una thread sin pedido guardado sigue con el texto de ejemplo."
            ],
            "code": "ork thread new \"<nome>\" --modo auto --dry-run\nork thread new \"<nome>\" --modo auto --sem-worktree\nork thread new \"<nome>\" --modo auto --pedido \"<texto>\"\nork prompt render <thread> --fase GO\nork worktree sync <thread> --dry-run"
          },
          {
            "id": "integracoes",
            "title": "Integraciones y operación",
            "paragraphs": [
              "ork adapter y ork mcp conectan el host. ork accounts y ork setup describen runtimes, perfiles y lo que esta máquina confirmó. ork onboarding guarda la entrevista y las respuestas del proyecto, y ork experiencia muestra las preferencias del paquete de experiencia. ork sessions, ork monitor y ork pulse observan la ejecución y la atención humana. ork brain y ork portfolio consultan memoria y catálogo, y ork ledger stats da la telemetría del ledger. ork fabrica, ork roadmap y ork network coordinan el trabajo entre máquinas, y ork projetos indica qué proyecto lee cada comando. ork grafo consulta el índice local del grafo de código. La referencia canónica del repositorio detalla las opciones de cada familia, y una prueba compara sus invocaciones con la ayuda de ork."
            ]
          },
          {
            "id": "confirmacoes",
            "title": "Confirmaciones de esta máquina",
            "paragraphs": [
              "En la versión {versao}, tres elecciones del manifiesto solo valen después de que la máquina las confirme, fuera de git. El runtime.sandbox que afloja el sandbox del agente (danger-full-access) solo despacha por Codex después de ork setup sandbox confirmar <postura>; sin eso, ork phase run y ork retry run rechazan con runtime.sandbox-nao-confirmado. El worktree.dir que lleva fuera de la raíz, por la ruta real, solo crea worktree después de ork setup worktree confirmar; sin eso, la creación se rechaza con worktree.dir-fora-da-raiz. Y fabrica.compartilhada: true solo activa la fábrica con la adhesión de la máquina, mediante ork fabrica entrar.",
              "Cada confirmación queda en .orkastery/private (postura-local.json y worktree-local.json, modo 0600, fuera de git) y vale solo para este checkout; la de la worktree, solo para esa carpeta. ork doctor señala la falta de cada una.",
              "También en la versión {versao}, ork eval solo ejecuta el catálogo del paquete que está corriendo: un catálogo encontrado a partir del cwd que no es el del paquete se rechaza con eval.catalogo-alheio. En un checkout de Orkastery, use el del checkout, node core/dist/index.js eval, como ya hace el CI."
            ],
            "links": [
              {
                "label": "Frontera de confianza",
                "href": "/docs/confianca/"
              }
            ],
            "code": "ork setup sandbox --json\nork setup sandbox confirmar danger-full-access\nork setup worktree confirmar\nork setup worktree revogar\nnode core/dist/index.js eval"
          },
          {
            "id": "contas-e-sessoes",
            "title": "Cuentas, perfiles y sesiones",
            "paragraphs": [
              "ork phase run --perfil <id> despacha por la cuenta pedida, o rechaza con runtime.profile-invalid, runtime.quota-exhausted o runtime.auth-missing, sin cambiar de perfil por su cuenta. runtime_profiles.distribuir elige entre los perfiles: ordem, el valor por defecto, es el primero del store; carga es el de menos sesiones vivas en esta máquina. Un valor desconocido vale ordem, con aviso.",
              "ork sessions lista las sesiones de todas las cuentas, con la columna PERFIL y las fantasmas; --global inventaría también las sesiones de Claude y Codex de la cuenta fuera de la raíz del proyecto, y --exigir-limpo sale con un código distinto de cero ante una fuente inválida o una sesión sin thread. ork sessions limpar-fantasmas suelta cada fantasma de ork con registro en el ledger, sin llamar a stop ni rm en el runtime. Cuando el runtime rechaza el directorio de la worktree o espera la aceptación de términos nuevos, la fase espera a que el dueño ejecute el comando de la pausa, y ork retry run después vuelve a despachar el mismo prompt.",
              "En la versión {versao}, para ork retry run, la confianza en el directorio vale cuando el .claude.json de la cuenta la registra en el propio directorio, en uno superior hasta la raíz del repositorio o en el repositorio principal de la worktree, y el nuevo despacho rechazado otra vez por el mismo impedimento no gasta intento ni sube el esfuerzo.",
              "ork accounts esgotamentos mide, sin escribir nada, los despachos que cayeron en una cuenta marcada como agotada por otro proyecto dentro del plazo de la marca; la cuenta aparece como id opaco, y el total es un mínimo."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions --all\nork sessions --global --json\nork sessions limpar-fantasmas --dry-run --json\nork accounts esgotamentos --desde 7d --json"
          },
          {
            "id": "contexto-e-atencao",
            "title": "Contexto citable y atención humana",
            "paragraphs": [
              "ork brain context devuelve entidades, padres, citas, vigencia y lagunas sin conceder escritura, y ork brain dossie arma, solo para lectura, el dossier de una decisión: vínculo, contexto citable, alternativas, quién decidió y evidencia. ork roadmap status crea un informe de lectura con lo que requiere atención del dueño. ork master pedir genera la solicitud de nota para una respuesta humana autenticada; no es una nota dada por el agente. ork master <thread> --score exige --por con el nombre de quien da la nota. ork master <thread> --aceitar-omissao acepta por omisión solo la thread indicada, con --dry-run para verlo antes; sin la thread, acepta todas las entregadas del proyecto.",
              "Sin --classe, la clase del fallo sale del motivo de cada gate rechazado, y base-avancou se añade cuando la rama trajo la base antes de la entrega; también vale en --aceitar-omissao.",
              "En la versión {versao}, cuando una thread fuera del roadmap espera al dueño, el cierre de ork roadmap status gana una línea que cuenta esas threads y apunta a ork pulse, y el --json gana el campo opcional foraDoRoadmap; sin una thread así, la salida no cambia."
            ],
            "code": "ork brain context --thread <thread> --ids <ids>\nork brain dossie --thread <thread>\nork roadmap status --json\nork master pedir <thread> --formato telegram\nork master <thread> --aceitar-omissao --dry-run"
          },
          {
            "id": "projeto-alvo",
            "title": "Elija el proyecto consultado",
            "paragraphs": [
              "Cada comando lee un proyecto, en este orden: --projeto <nombre|ruta>, en cualquier posición del comando; la variable ORK_PROJETO; en un host sin directorio de proyecto, el único proyecto conocido o el rechazo projeto.escolha; y, en el terminal, el directorio actual. Un nombre ambiguo o desconocido se rechaza con los candidatos, con código de salida 4; ork nunca elige en nombre de quien pidió.",
              "ork projetos enumera los proyectos conocidos de esta máquina, sin secretos. ork init, ork thread new y ork fabrica entrar registran automáticamente; ork projetos registrar y ork projetos esquecer gestionan las copias antiguas sin borrar nada del disco. ork maestro, ork board, ork board plan, ork fabrica y ork roadmap status empiezan indicando el proyecto consultado y lo que no se leyó.",
              "En la versión {versao}, ork roadmap reservas también empieza por el proyecto consultado, y los demás comandos que leen un proyecto que el lector no puede adivinar (en el host, o fuera de su directorio) terminan con la línea Projeto consultado en el stderr."
            ],
            "code": "ork projetos --json\nork roadmap status --projeto meu-produto\nork roadmap reservas --json\nork projetos registrar\nork projetos esquecer <nombre>"
          },
          {
            "id": "rede-e-reservas",
            "title": "Red, reservas y números de feature",
            "paragraphs": [
              "ork network roadmap reúne el roadmap de la red desde cualquier directorio, con lagunas tipadas para lo que no leyó. ork roadmap reservas marca la reserva huérfana de una thread ya cerrada en esta máquina, y --soltar-orfas la libera o la pasa a otra thread abierta del mismo elemento, con registro; --remoto elige el remoto que se lee, origin por defecto. ork roadmap feat reserva el siguiente número de FEAT mediante un push atómico; dos máquinas nunca reciben el mismo número, y el número reservado no se reutiliza.",
              "ork network status muestra las máquinas de la Orkastery Network de la persona, desde cualquier directorio, con la fuente, las lagunas tipadas y lo que no se leyó. ork network entrar comprueba o crea la casa privada en la forja y publica la primera instantánea antes de guardar la adhesión; ork network publicar escribe la instantánea en el momento, y ork network sair la retira de la casa.",
              "ork docs sincronizar lleva hechos del ledger y de git a los elementos del roadmap. --so limita la operación a los elementos pedidos; en la worktree de una thread con elemento, el predeterminado es el suyo, y --todos vuelve a cubrirlos todos. ork docs verificar compara la documentación de producto y del roadmap con el código y git, y sale con un código distinto de cero si hay error; en el PR, con --pr, el merge de otra thread y el índice que divergen de main solo avisan. ork docs init crea estándares, plantillas, índices y el lint de Markdown en el proyecto."
            ],
            "code": "ork network roadmap --json\nork network status --json\nork network entrar --maquina <nome>\nork roadmap reservas --soltar-orfas\nork roadmap feat --thread <thread>\nork docs sincronizar --escrever --so RM-NNN\nork docs verificar --pr"
          },
          {
            "id": "conferir-claims",
            "title": "Compruebe claims en el sandbox",
            "paragraphs": [
              "En la versión {versao}, ork claims conferir <thread> --claims C3,C7 vuelve a ejecutar solo esas claims en el sandbox de ork_verify, en la worktree de la thread registrada en git, bajo la conducción de la thread y sin grabar recibo: ni verify_run ni estado de claim. ork claims conferir <thread> --tarefa T2.1 comprueba en su lugar el verify de una tarea del docs/plan.md de la thread, cuando es un solo comando entre comillas invertidas; --prazo va de 10 a 600 segundos, con 180 por defecto, y --json devuelve ork.claims-conferencia/v1.",
              "Sale con 1 cuando alguna no pasa, con 2 sin sandbox o con un pedido inválido y con 3 cuando otra sesión conduce. Quien verifica de verdad sigue siendo ork verify, que no corre confinado: en el sandbox, un proceso hijo de node falla, y la claim de prueba que crea un proceso puede reprobar allí y pasar en ork verify."
            ],
            "code": "ork claims conferir <thread> --claims C3,C7\nork claims conferir <thread> --tarefa T2.1 --json\nork verify <thread>"
          },
          {
            "id": "entrega-e-ci",
            "title": "Entrega, CI y concurrencia",
            "paragraphs": [
              "ork ci prepare escribe .ork-ci/<thread>.json en la worktree de la thread, con su branch; ork ci run --branch encuentra ese bundle por el nombre de la branch, rechaza una branch ork/* sin bundle y, fuera de una thread, ejecuta solo los comandos del manifiesto. ork ship registrar-pr --repo --pr registra un PR fusionado en un repositorio externo declarado en ci.external_repositories, con el merge comprobado mediante la API de GitHub y el check declarado en verde en el head del PR.",
              "ork phase run rechaza con concurrency.limite, código de salida 3, cuando el proyecto ya tiene max_parallel_threads sesiones vivas en otras threads; --esperar espera un hueco. En una sesión sin acceso al ledger, la herramienta MCP ork_decision_record registra la decisión con el mismo contrato que ork decisao registrar.",
              "ork ship registrar-pr --dry-run, también con --repo --pr, hace las mismas comprobaciones y responde registraria, sin grabar ship_done, sin cambiar la fase y sin publicar la fábrica.",
              "--remoto de ork ship --para, ork ship registrar-pr y ork ci status es el nombre de un remoto de git, validado antes de cualquier git: fuera del formato, se rechaza con ship.remoto-invalido o ci.remoto-invalido, sin consultar GitHub."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <dueño/nombre> --pr <n>\nork phase run <thread> GO --prompt \"<texto>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Búsqueda por significado en la memoria",
            "paragraphs": [
              "ork memory search --texto busca por significado en el tenant, combinando vector y FTS, y no es determinista; no se combina con --tags ni --thread. ork memory index mantiene el índice vectorial local e idempotente, y --dry-run estima tokens y coste sin llamar al provider. ork memory status --sondar hace una llamada real y mide la latencia. Los tres usan el mismo universo de búsqueda del tenant; ork memory status y ork memory index lo muestran por colección, cuentan lo que queda fuera de la búsqueda y avisan cuando el índice cubre menos de lo que ve la búsqueda.",
              "Sin el universo leído entero, o con la memoria apagada o no disponible, ork memory search --texto sale con 1, motivo tipado y sin resultados, también en --json; un universo vacío leído con éxito sale con 0. La lectura del universo tiene su propio plazo, memory.universo_timeout_ms, 90.000 ms por defecto.",
              "ork memory search --tags es la búsqueda determinista por etiqueta; con --thread, la lectura se restringe a la thread, y --restrito y --janela exigen --thread (memory.query.thread-required).",
              "En la versión {versao}, la prueba core/scripts/prova-busca-semantica.sh muestra, por par, la posición y la similitud de cada objetivo en el ranking vectorial y cuántas entradas de la búsqueda tienen un vector coherente en el índice, sin cambiar los pares ni los códigos de salida. Sin argumentos, usa los pares por defecto que decidió el dueño; los pares pasados como argumentos sustituyen a los predeterminados."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory search --texto \"<frase>\" --json"
          },
          {
            "id": "grafo",
            "title": "Consulte el grafo de código",
            "paragraphs": [
              "ork grafo indexar construye el índice del HEAD limpio, en el estado del proyecto y fuera de git; --verificar vuelve a extraer y comprueba contrato, bytes y determinismo. ork grafo vizinhos, ork grafo chamadores, ork grafo importadores y ork grafo caminho responden a partir de las aristas, en texto o --json, con el extractor y la prueba de cada una. ork grafo status muestra el índice del HEAD, ork grafo amostra sirve para auditar aristas a mano y ork grafo limpar borra los índices que no son del HEAD de ningún árbol.",
              "La respuesta es parcial por construcción: solo contiene lo que el extractor demuestra, y lo indica. Con el árbol modificado, la respuesta corresponde al HEAD, con aviso. Todo ork grafo necesita typescript y micromark en el node_modules del propio paquete de ork: son dependencias del paquete, con versión exacta, y npm install -g los trae. Instalado dentro de un proyecto o mediante npx, npm los eleva fuera del paquete, y el rechazo es grafo.parser.indisponivel, con la corrección en ork grafo status y en ork doctor. El grafo pide Node 20.19, 22.12 o posterior.",
              "En la versión {versao}, la respuesta comprueba la procedencia contra el árbol: el texto marca con [fonte modificada na arvore] la arista cuyo origen, destino o evidencia cambió después del HEAD y enumera hasta cinco fuentes que cambiaron; en el JSON, cada arista trae el campo arvore, y la respuesta trae el campo fontes.",
              "Con el índice de una revisión ancestro, ork grafo indexar reextrae solo lo que el cambio alcanza, con los mismos bytes de la extracción completa, y dice cuándo fue completa y por qué. Con --json, --teto-bytes N limita la respuesta a N bytes, quitando primero las aristas más lejanas del objetivo; el camino no se corta y rechaza con grafo.consulta.teto-excedido. Sin el índice del HEAD, el rechazo indica el caso (grafo.indice.ausente, grafo.indice.outra-revisao o grafo.indice.outro-extrator) y la corrección. Las mismas consultas están en el MCP del proyecto detrás del flag grafo.mcp, apagado por defecto.",
              "ork grafo contexto <thread> arma el paquete compacto de la thread con el diff de la worktree, GOAL, PLAN y claims, con los vínculos más cercanos al diff primero y la evidencia en tuplas; el JSON ork.thread-graph-context/v2 tiene un tope de 32.768 bytes por defecto, de 4.096 a 65.536. Sin worktree, el diff se ignora y se declara; con el flag activado, ork_grafo_contexto entrega el mismo JSON por MCP."
            ],
            "code": "ork grafo indexar --verificar\nork grafo status\nork grafo chamadores <símbolo>\nork grafo importadores <archivo> --json\nork grafo caminho <de> <a>\nork grafo contexto <thread> --json"
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
              "ork.projetos/v1 é o registro desta máquina em ~/.orkastery/projetos.json, com modo 0600 e sem segredo: nome, abbrev, raiz, remoto sem usuário nem senha, datas e a fonte do registro. Arquivo ausente, corrompido ou de outro contrato vale registro vazio. ork.consulta/v1 é o cabeçalho de ork maestro, ork board, ork board plan, ork fabrica, ork roadmap status e, na versão {versao}, ork roadmap reservas: o projeto consultado, a origem da escolha, o que foi lido e o que não foi.",
              "As recusas projeto.desconhecido, projeto.ambiguo, projeto.sem-manifesto, projeto.escolha, projeto.nenhum e projeto.fora-do-servidor trazem os candidatos e a correção. Quem consome o registro lê sem gravar, confere o contrato e nunca escolhe a primeira cópia de um nome ambíguo.",
              "Sem o remoto, o naoLido diz que nada foi lido de ork/fabrica-estado; na versão {versao}, nas reservas, diz o mesmo de ork/roadmap-reservas, e o JSON delas traz o campo leitura (lido-agora, copia-local, sem-copia ou sem-remoto): só lido-agora ou copia-local sem reserva viram a mensagem de nenhum item reservado. Nas reservas, projeto.remoto é o remoto lido (--remoto, ou origin); em ork board e ork fabrica, é o fabrica.remoto do manifesto.",
              "Também na versão {versao}, os demais comandos que leem um projeto terminam com a mesma primeira linha, Projeto consultado, no stderr, quando o leitor não tem como saber qual projeto foi lido: no host (ORK_PROJETO_EXPLICITO=1) ou com o projeto fora do diretório atual. A linha vem uma vez por comando, também quando ele falha, antes da mensagem de erro, e o stdout, inclusive o JSON, não muda. Nela e no cabeçalho, o remoto é o de exibição: sem usuário e senha, sem query e fragmento, com ~ no lugar da pasta da conta no caminho local, e omitido quando ainda parece segredo.",
              "Na versão {versao}, a sessão despachada (ork phase run, ork retry run e ork audit run) recebe ORK_PROJETO vazio e ORK_PROJETO_EXPLICITO=0 no ambiente: o projeto dela é o do próprio cwd, a worktree da thread, e o modo host de quem despachou não a segue. No Codex, os dois valores vão por cima do ambiente herdado; no claude-bg, pelo --settings, que vence o ambiente do daemon. O filho ork fabrica publicar herda o mesmo."
            ],
            "code": "ork projetos --json\nork roadmap status --json\nork roadmap reservas --json"
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
              "ork.projetos/v1 is this machine’s registry in ~/.orkastery/projetos.json, with mode 0600 and no secrets: name, abbrev, root, remote without user or password, timestamps and the registration source. A missing, corrupted or foreign-contract file counts as an empty registry. ork.consulta/v1 is the header of ork maestro, ork board, ork board plan, ork fabrica, ork roadmap status and, in version {versao}, ork roadmap reservas: the project read, how it was chosen, what was read and what was not.",
              "The projeto.desconhecido, projeto.ambiguo, projeto.sem-manifesto, projeto.escolha, projeto.nenhum and projeto.fora-do-servidor refusals include the candidates and the fix. Consumers read the registry without writing, check the contract and never pick the first copy of an ambiguous name.",
              "Without the remote, naoLido says nothing was read from ork/fabrica-estado; in version {versao}, for reservations, it says the same about ork/roadmap-reservas, and their JSON carries the leitura field (lido-agora, copia-local, sem-copia or sem-remoto): only lido-agora or copia-local without a reservation turn into the message that no item is reserved. For reservations, projeto.remoto is the remote read (--remoto, or origin); in ork board and ork fabrica, it is the manifest’s fabrica.remoto.",
              "Also in version {versao}, the other commands that read a project end with the same first line, Projeto consultado, on stderr, when the reader cannot know which project was read: in a host (ORK_PROJETO_EXPLICITO=1) or with the project outside the current directory. The line comes once per command, also when it fails, before the error message, and stdout, JSON included, does not change. In that line and in the header, the remote is the display one: without user and password, without query and fragment, with ~ in place of the account folder in a local path, and omitted when it still looks like a secret.",
              "In version {versao}, a dispatched session (ork phase run, ork retry run and ork audit run) gets an empty ORK_PROJETO and ORK_PROJETO_EXPLICITO=0 in its environment: its project is that of its own cwd, the thread’s worktree, and the host mode of whoever dispatched it does not follow it. In Codex, both values override the inherited environment; in claude-bg, they go through --settings, which wins over the daemon’s environment. The ork fabrica publicar child inherits the same."
            ],
            "code": "ork projetos --json\nork roadmap status --json\nork roadmap reservas --json"
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
              "ork.projetos/v1 es el registro de esta máquina en ~/.orkastery/projetos.json, con modo 0600 y sin secretos: nombre, abbrev, raíz, remoto sin usuario ni contraseña, fechas y la fuente del registro. Un archivo ausente, dañado o de otro contrato equivale a un registro vacío. ork.consulta/v1 es la cabecera de ork maestro, ork board, ork board plan, ork fabrica, ork roadmap status y, en la versión {versao}, ork roadmap reservas: el proyecto consultado, el origen de la elección, lo que se leyó y lo que no.",
              "Los rechazos projeto.desconhecido, projeto.ambiguo, projeto.sem-manifesto, projeto.escolha, projeto.nenhum y projeto.fora-do-servidor incluyen los candidatos y la corrección. Quien consume el registro lo lee sin escribir, comprueba el contrato y nunca elige la primera copia de un nombre ambiguo.",
              "Sin el remoto, naoLido dice que no se leyó nada de ork/fabrica-estado; en la versión {versao}, en las reservas, dice lo mismo de ork/roadmap-reservas, y su JSON trae el campo leitura (lido-agora, copia-local, sem-copia o sem-remoto): solo lido-agora o copia-local sin reserva se convierten en el mensaje de que ningún elemento está reservado. En las reservas, projeto.remoto es el remoto leído (--remoto, u origin); en ork board y ork fabrica, es el fabrica.remoto del manifiesto.",
              "También en la versión {versao}, los demás comandos que leen un proyecto terminan con la misma primera línea, Projeto consultado, en el stderr, cuando el lector no puede saber qué proyecto se leyó: en el host (ORK_PROJETO_EXPLICITO=1) o con el proyecto fuera del directorio actual. La línea aparece una vez por comando, también cuando falla, antes del mensaje de error, y el stdout, incluido el JSON, no cambia. En ella y en la cabecera, el remoto es el de visualización: sin usuario ni contraseña, sin query ni fragmento, con ~ en lugar de la carpeta de la cuenta en una ruta local, y omitido cuando todavía parece un secreto.",
              "En la versión {versao}, la sesión despachada (ork phase run, ork retry run y ork audit run) recibe ORK_PROJETO vacío y ORK_PROJETO_EXPLICITO=0 en el entorno: su proyecto es el de su propio cwd, la worktree de la thread, y el modo host de quien despachó no la sigue. En Codex, los dos valores pasan por encima del entorno heredado; en claude-bg, por --settings, que prevalece sobre el entorno del daemon. El hijo ork fabrica publicar hereda lo mismo."
            ],
            "code": "ork projetos --json\nork roadmap status --json\nork roadmap reservas --json"
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
  },
  {
    "slug": "confianca",
    "group": "reference",
    "sources": [
      "docs/referencia/fronteira-de-confianca.md"
    ],
    "translations": {
      "pt": {
        "title": "Fronteira de confiança e procedência do estado",
        "description": "Veja o que um valor do repositório clonado pode decidir e o que cada máquina precisa confirmar.",
        "sections": [
          {
            "id": "regra",
            "title": "O que vem do clone não decide execução",
            "highlight": {
              "title": "Muda para quem já usa",
              "paragraphs": [
                "Na versão {versao}, rode uma vez em cada máquina o comando da sua situação, na lista abaixo.",
                "Quem usa .claude/worktrees, workspace-write, estado fora do índice e ork fabrica entrar não percebe mudança."
              ],
              "items": [
                "Com runtime.sandbox: danger-full-access, rode ork setup sandbox confirmar danger-full-access.",
                "Com o .orkastery versionado, rode git rm -r --cached .orkastery.",
                "Com worktree.dir fora da raiz, rode ork setup worktree confirmar.",
                "Com a fábrica ligada só pelo manifesto, rode ork fabrica entrar.",
                "Com o pacote instalado rodando ork eval num checkout do Orkastery, use o do checkout: node core/dist/index.js eval."
              ]
            },
            "paragraphs": [
              "Rodar o Orkastery num repositório de terceiros não executa código só por isso. Um valor vindo do clone não vira opção de processo, não vira executável e não vira caminho fora da raiz; os únicos comandos executados por desenho são os declarados.",
              "A fronteira de confiança é a auditoria de cada chamada de processo e de cada caminho que o núcleo monta com dado do clone, com a classe de cada um e sem roteiro de exploração. A matriz completa, módulo por módulo, fica na fonte.",
              "Na versão {versao}, entram as correções da auditoria e as regras de procedência do estado, estas como patch de segurança, por decisão do dono."
            ],
            "links": [
              {
                "label": "Matriz da fronteira de confiança",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/referencia/fronteira-de-confianca.md"
              },
              {
                "label": "Política de segurança",
                "href": "https://github.com/orkastery/orkastery/blob/main/SECURITY.md"
              }
            ]
          },
          {
            "id": "fontes",
            "title": "Em que o núcleo confia",
            "paragraphs": [
              "A linha de comando é de quem está no teclado: merece confiança, mas é validada quando vai ao git, como --remoto, --para, --de e os ids de thread. O ambiente e as pastas da conta (~/.orkastery, ~/.claude e ~/.codex) também são confiáveis.",
              "Não merecem confiança o manifesto e o setup versionados (orkastery.yaml e orkastery.setup.json), o estado versionado no clone (.orkastery e os bundles .ork-ci/<thread>.json), as branches de estado (ork/roadmap-reservas, a da fábrica e as ork/*) e o que chega de outra máquina da rede (retratos, reservas e o frontmatter do roadmap). Saída de ferramenta (git, runtime) é dado, nunca código.",
              "Cada chamada de processo e cada caminho da matriz recebem uma destas classes. Toda chamada de processo do núcleo usa vetor de argumentos, sem shell; shell só existe nos comandos declarados e na sonda de sandbox do MCP."
            ],
            "items": [
              "Declarado: comando que o manifesto ou a claim declara para rodar. É o produto (reexecutar o que se alega), e o SECURITY.md documenta.",
              "Inerte: só constantes, ou dado confiável.",
              "Defendido: dado externo, mas validado, depois de --end-of-options, com a ref qualificada ou com o sha conferido.",
              "Corrigido: era injeção de opção, executável escolhido pelo clone ou caminho fora da raiz.",
              "Corrigido em decisão do dono: fecha um pendente mudando comportamento, e o dono escolheu mesclar como patch de segurança.",
              "Pendente do dono: fechar exige mudar comportamento documentado ou aceito hoje, e a decisão é do dono."
            ]
          },
          {
            "id": "declarados",
            "title": "Comandos declarados",
            "paragraphs": [
              "São os únicos que o núcleo executa por desenho, e o SECURITY.md lista todos. A documentação não promete aviso em tempo de execução: trate o orkastery.yaml e o estado de um repositório de terceiros como um Makefile.",
              "ork doctor, ork board, ork thread list, ork init, ork thread new e ork retry plan não executam comando declarado."
            ],
            "items": [
              "verify.build, verify.test, verify.typecheck e verify.preparo, na worktree, por ork verify, ork fix open, ork fix reverify, ork retry run (na ação corrigir-dirigido), a baseline do ork phase run e o gate do ork ship.",
              "ci.command e o bundle .ork-ci/<thread>.json, no ork ci run do runner do CI.",
              "As claims (o claims.jsonl e o --verificar) e o doneWhen do thread.json, nos mesmos comandos do verify; o ork claims add só as roda com a policy do manifesto.",
              "As correções do GO-FIX e as claims dos achados de auditoria (board.jsonl), no ork fix reverify e na conferência da rodada de auditoria.",
              "O binário do runtime (claude e codex), pelos adaptadores, no ork phase run e no ork retry run."
            ],
            "code": "ork verify <thread>\nork fix reverify <thread>\nork audit verify <rodada>\nork ci run --branch <branch>"
          },
          {
            "id": "regras",
            "title": "As cinco regras de procedência",
            "paragraphs": [
              "Na versão {versao}, cinco regras (P1 a P5) fecham os pendentes que a auditoria deixou com o dono. A ideia é a mesma em todas: o que vem com o repositório não decide executável, caminho fora da raiz nem publicação desta máquina; quando o uso é legítimo, a máquina confirma fora do git, e a recusa é tipada e diz o comando."
            ],
            "items": [
              "Postura do sandbox (P1): o runtime.sandbox que afrouxa o sandbox do agente (danger-full-access) só despacha pelo Codex depois de ork setup sandbox confirmar <postura>, gravado em .orkastery/private/postura-local.json (0600, fora do git, só para este checkout). Sem isso, ork phase run e ork retry run recusam com runtime.sandbox-nao-confirmado, e o ork doctor acusa.",
              "Estado rastreado (P2): estado versionado do .orkastery não escolhe cwd, worktree nem executável (estado.rastreado). O cwd vindo do thread.json, do ledger ou da fila, para o agente ou para o git, só vale na raiz do projeto ou numa worktree que o repositório registrou (estado.worktree-nao-registrada). Vale para despacho, retomada, verify, claims, GO-FIX, prova do GO, handoff, liveness, ork ci prepare, ork worktree audit e ork worktree release.",
              "Transporte do pulse e do digest (P2): só valem o pulse-host.json e o master-host.json locais, arquivos comuns fora do índice do git (transporte.rastreado).",
              "Ponteiros do recall e do handoff (P2): o ork recall, o ork handoff recall e o ork handoff export só leem arquivo que, pelo caminho real, fica na raiz do projeto ou na worktree registrada da thread. O recall recusa com ponteiro.fora-da-raiz, e o export deixa de apontar para fora.",
              "Pasta das worktrees (P3): o worktree.dir que leva para fora da raiz pelo caminho real (caminho absoluto, subida de pasta, link no caminho ou .git) só cria worktree depois de ork setup worktree confirmar, gravado em .orkastery/private/worktree-local.json (0600, fora do git, só para este checkout e esta pasta). Sem isso, a criação recusa com worktree.dir-fora-da-raiz, e o ork doctor acusa. As worktrees que já existem seguem valendo, e o MCP segue recusando worktree fora da raiz.",
              "Eval (P4): o ork eval só executa o catálogo (canários, hooks e core/dist) do pacote que está rodando. Um diretório com as pastas skills, references e eval achado a partir do cwd que não é o do pacote recusa com eval.catalogo-alheio, e a mensagem diz como rodar de propósito o eval daquele checkout. O CI do kit, com node core/dist/index.js eval na raiz, não muda.",
              "Fábrica compartilhada (P5): o fabrica.compartilhada: true do manifesto não liga mais a publicação do retrato desta máquina (threads, nome e host) no remoto do clone, nem a leitura das outras máquinas. Só a adesão da máquina liga: ork fabrica entrar, em ~/.orkastery/maquina.json, ou ORK_FABRICA_COMPARTILHADA=1. Com o pedido no manifesto e sem a adesão, o ork doctor e o ork fabrica avisam com fabrica.nao-confirmada."
            ],
            "code": "ork setup sandbox confirmar danger-full-access\nork setup worktree confirmar\nork fabrica entrar\nork doctor\ngit rm -r --cached .orkastery"
          },
          {
            "id": "corrigido",
            "title": "O que a auditoria corrigiu",
            "paragraphs": [
              "Na versão {versao}, a auditoria corrige estes casos sem mudar comportamento aceito:"
            ],
            "items": [
              "O mergeSha e a branch de destino de um ship_done do ledger só chegam ao git log da detecção de reversão como sha hexadecimal e nome de branch, depois de --end-of-options; antes, um ledger versionado no clone passava uma opção ao git, em ork master e ork ship.",
              "ork docs sincronizar não cai mais na base crua do manifesto quando ela não resolve, e, do sha do ledger e do commit do frontmatter, só sha hexadecimal chega ao git.",
              "O manifesto recusa worktree.base_branch que não vale como nome de branch no git (começa com hífen ou tem .. no nome).",
              "O manifesto recusa memory.cli relativo: vale nome procurado no PATH, como orkmind, ou caminho absoluto. A sonda do OrkMind, inclusive a do ork doctor, ignora entradas relativas do PATH e shebang com interpretador relativo, e o ork brain roda o executável com cwd no $HOME, não na raiz do clone.",
              ".orkastery, .orkastery/threads e a pasta de uma thread como link simbólico recusam com estado.link, e o append do ledger, das claims e do board usa O_NOFOLLOW; antes, um link versionado levava a escrita para fora da raiz.",
              "O id de uma rodada de auditoria lido do run.json precisa ser um nome simples (audit.rodada-invalida).",
              "O SECURITY.md passa a listar todos os comandos declarados, inclusive verify.preparo, ci.command, os bundles .ork-ci/<thread>.json e o doneWhen."
            ]
          },
          {
            "id": "pendentes",
            "title": "O que segue com o dono",
            "paragraphs": [
              "A auditoria deixou cinco itens como pendentes do dono, porque fechá-los mudava comportamento aceito ou documentado. Os cinco, P1 a P5, ganharam as regras de procedência desta página, mescladas por decisão do dono.",
              "Na mesma lista, ficam registrados, com risco baixo:"
            ],
            "items": [
              "ork retry run --dry-run, na ação corrigir-dirigido, reexecuta claims e verify: são comandos declarados, mas contra a semântica do --dry-run.",
              "O perfil do runtime gravado no ledger escolhe o CLAUDE_CONFIG_DIR e o CODEX_HOME de comandos de consulta.",
              "O memory.database_url_env aceita o nome de qualquer variável de ambiente.",
              "O ci.external_repositories aceita segmento de subida de pasta no caminho de uma leitura pela API do GitHub.",
              "O ork adapter install ainda acha o catálogo a partir do projeto, como o ork eval achava, mas só copia o adaptador para dentro do próprio projeto e prefere o executável do PATH quando ele existe."
            ]
          },
          {
            "id": "contribuir",
            "title": "Para quem contribui com o núcleo",
            "paragraphs": [
              "As regras para o código em core/src:"
            ],
            "items": [
              "Valor do clone a caminho do git: valide antes da chamada com remotoValido ou exigirRemoto, branchValida ou shaValido (core/src/branch-de-estado.ts), e ponha --end-of-options antes dele.",
              "A ref de branch vai qualificada, e o merge vai pelo sha conferido, nunca pelo nome.",
              "O executável nunca sai do manifesto por caminho relativo, e o cwd de um executável escolhido por configuração não é a raiz do clone.",
              "Caminho com id vindo de arquivo tem um segmento só, conferido por regex, e o diretório de estado não é link.",
              "Append em estado usa O_NOFOLLOW; escrita de arquivo inteiro vai por um temporário criado com wx e depois renomeado.",
              "Caminho lido de ponteiro guardado no estado é conferido pelo caminho real com exigirCaminhoContido (core/src/procedencia.ts). Decisão que o manifesto não pode tomar sozinho vira confirmação local em .orkastery/private, com lerArquivoPrivado e gravarArquivoPrivado (core/src/postura-local.ts).",
              "O teste da correção reprova o código anterior; os de referência são core/test/fronteira-de-confianca.test.ts, core/test/procedencia-e-postura.test.ts e core/test/fronteira-pendentes.test.ts."
            ]
          }
        ]
      },
      "en": {
        "title": "Trust boundary and state provenance",
        "description": "See what a value from a cloned repository can decide and what each machine has to confirm.",
        "sections": [
          {
            "id": "regra",
            "title": "What comes from the clone does not decide execution",
            "highlight": {
              "title": "Changes for current users",
              "paragraphs": [
                "In version {versao}, run the command for your situation once on each machine, from the list below.",
                "If you use .claude/worktrees, workspace-write, state outside the index and ork fabrica entrar, you will not notice any change."
              ],
              "items": [
                "With runtime.sandbox: danger-full-access, run ork setup sandbox confirmar danger-full-access.",
                "With .orkastery under version control, run git rm -r --cached .orkastery.",
                "With worktree.dir outside the root, run ork setup worktree confirmar.",
                "With the factory turned on only by the manifest, run ork fabrica entrar.",
                "With the installed package running ork eval in an Orkastery checkout, use the checkout’s own: node core/dist/index.js eval."
              ]
            },
            "paragraphs": [
              "Running Orkastery in a third-party repository does not execute code just because of that. A value that comes from the clone does not become a process option, an executable or a path outside the root; the only commands run by design are the declared ones.",
              "The trust boundary is the audit of every process call and every path the core builds with data from the clone, with the class of each one and no exploitation recipe. The full matrix, module by module, is in the source.",
              "In version {versao}, the audit fixes and the state provenance rules ship, the latter as a security patch, by the owner’s decision."
            ],
            "links": [
              {
                "label": "Trust boundary matrix",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/referencia/fronteira-de-confianca.md"
              },
              {
                "label": "Security policy",
                "href": "https://github.com/orkastery/orkastery/blob/main/SECURITY.md"
              }
            ]
          },
          {
            "id": "fontes",
            "title": "What the core trusts",
            "paragraphs": [
              "The command line belongs to whoever is at the keyboard: it is trusted, but validated when it goes to git, as with --remoto, --para, --de and thread ids. The environment and the account folders (~/.orkastery, ~/.claude and ~/.codex) are trusted too.",
              "Not trusted: the versioned manifest and setup (orkastery.yaml and orkastery.setup.json), state versioned in the clone (.orkastery and the .ork-ci/<thread>.json bundles), the state branches (ork/roadmap-reservas, the factory’s and the ork/* ones) and whatever comes from another machine in the network (snapshots, reservations and the roadmap frontmatter). Tool output (git, runtime) is data, never code.",
              "Every process call and every path in the matrix gets one of these classes. Every process call in the core uses an argument vector, without a shell; a shell exists only in the declared commands and in the MCP sandbox probe."
            ],
            "items": [
              "Declared: a command that the manifest or a claim declares to run. It is the product (re-running what is claimed), and SECURITY.md documents it.",
              "Inert: constants only, or trusted data.",
              "Defended: external data, but validated, placed after --end-of-options, with a qualified ref or a checked sha.",
              "Fixed: it was option injection, an executable chosen by the clone or a path outside the root.",
              "Fixed by owner decision: it closes a pending item by changing behavior, and the owner chose to merge it as a security patch.",
              "Pending with the owner: closing it means changing behavior that is documented or accepted today, and the decision belongs to the owner."
            ]
          },
          {
            "id": "declarados",
            "title": "Declared commands",
            "paragraphs": [
              "They are the only ones the core runs by design, and SECURITY.md lists them all. The documentation promises no runtime warning: treat the orkastery.yaml and the state of a third-party repository like a Makefile.",
              "ork doctor, ork board, ork thread list, ork init, ork thread new and ork retry plan do not run declared commands."
            ],
            "items": [
              "verify.build, verify.test, verify.typecheck and verify.preparo, in the worktree, through ork verify, ork fix open, ork fix reverify, ork retry run (in the corrigir-dirigido action), the baseline of ork phase run and the gate of ork ship.",
              "ci.command and the .ork-ci/<thread>.json bundle, in ork ci run on the CI runner.",
              "Claims (claims.jsonl and --verificar) and the doneWhen in thread.json, in the same commands as verify; ork claims add runs them only with the manifest policy.",
              "GO-FIX corrections and the claims of audit findings (board.jsonl), in ork fix reverify and in the check of an audit round.",
              "The runtime binary (claude and codex), through the adapters, in ork phase run and ork retry run."
            ],
            "code": "ork verify <thread>\nork fix reverify <thread>\nork audit verify <rodada>\nork ci run --branch <branch>"
          },
          {
            "id": "regras",
            "title": "The five provenance rules",
            "paragraphs": [
              "In version {versao}, five rules (P1 to P5) close the items the audit left pending with the owner. The idea is the same in all of them: what comes with the repository does not decide the executable, a path outside the root or what this machine publishes; when the use is legitimate, the machine confirms outside git, and the refusal is typed and names the command."
            ],
            "items": [
              "Sandbox posture (P1): a runtime.sandbox that loosens the agent sandbox (danger-full-access) only dispatches through Codex after ork setup sandbox confirmar <postura>, stored in .orkastery/private/postura-local.json (0600, outside git, for this checkout only). Without it, ork phase run and ork retry run refuse with runtime.sandbox-nao-confirmado, and ork doctor reports it.",
              "Tracked state (P2): versioned .orkastery state does not choose the cwd, the worktree or the executable (estado.rastreado). A cwd that comes from thread.json, the ledger or the queue, for the agent or for git, only counts at the project root or in a worktree the repository has registered (estado.worktree-nao-registrada). This covers dispatch, resume, verify, claims, GO-FIX, the GO proof, handoff, liveness, ork ci prepare, ork worktree audit and ork worktree release.",
              "Pulse and digest transport (P2): only the local pulse-host.json and master-host.json count, regular files not tracked by git (transporte.rastreado).",
              "Recall and handoff pointers (P2): ork recall, ork handoff recall and ork handoff export only read a file that, by its real path, sits at the project root or in the thread’s registered worktree. Recall refuses with ponteiro.fora-da-raiz, and export no longer points outside.",
              "Worktree folder (P3): a worktree.dir that leads outside the root by its real path (absolute path, parent directory, a link in the path or .git) only creates a worktree after ork setup worktree confirmar, stored in .orkastery/private/worktree-local.json (0600, outside git, for this checkout and this folder only). Without it, creation refuses with worktree.dir-fora-da-raiz, and ork doctor reports it. Existing worktrees keep working, and the MCP still refuses a worktree outside the root.",
              "Eval (P4): ork eval only runs the catalog (canaries, hooks and core/dist) of the package that is running. A directory with skills, references and eval folders found from the cwd that is not the package’s own refuses with eval.catalogo-alheio, and the message says how to run that checkout’s eval on purpose. The kit’s CI, with node core/dist/index.js eval at the root, does not change.",
              "Shared factory (P5): fabrica.compartilhada: true in the manifest no longer turns on publishing this machine’s snapshot (threads, name and host) to the clone’s remote, nor reading the other machines. Only the machine’s own membership does: ork fabrica entrar, in ~/.orkastery/maquina.json, or ORK_FABRICA_COMPARTILHADA=1. With the request in the manifest and no membership, ork doctor and ork fabrica warn with fabrica.nao-confirmada."
            ],
            "code": "ork setup sandbox confirmar danger-full-access\nork setup worktree confirmar\nork fabrica entrar\nork doctor\ngit rm -r --cached .orkastery"
          },
          {
            "id": "corrigido",
            "title": "What the audit fixed",
            "paragraphs": [
              "In version {versao}, the audit fixes these cases without changing accepted behavior:"
            ],
            "items": [
              "The mergeSha and the target branch of a ship_done in the ledger only reach the git log of the revert detection as a hexadecimal sha and a branch name, after --end-of-options; before, a ledger versioned in the clone passed an option to git, in ork master and ork ship.",
              "ork docs sincronizar no longer falls back to the raw manifest base when it does not resolve, and, from the ledger sha and the frontmatter commit, only a hexadecimal sha reaches git.",
              "The manifest refuses a worktree.base_branch that is not a valid branch name for git (it starts with a hyphen or contains ..).",
              "The manifest refuses a relative memory.cli: it accepts a name looked up in PATH, like orkmind, or an absolute path. The OrkMind probe, including the one in ork doctor, ignores relative PATH entries and a shebang with a relative interpreter, and ork brain runs the executable with its cwd in $HOME, not at the clone root.",
              ".orkastery, .orkastery/threads and a thread folder as a symbolic link refuse with estado.link, and appends to the ledger, claims and board use O_NOFOLLOW; before, a versioned link sent the write outside the root.",
              "The id of an audit round read from run.json must be a simple name (audit.rodada-invalida).",
              "SECURITY.md now lists every declared command, including verify.preparo, ci.command, the .ork-ci/<thread>.json bundles and doneWhen."
            ]
          },
          {
            "id": "pendentes",
            "title": "What remains with the owner",
            "paragraphs": [
              "The audit left five items pending with the owner, because closing them changed accepted or documented behavior. All five, P1 to P5, got the provenance rules on this page, merged by the owner’s decision.",
              "On the same list, these remain recorded, with low risk:"
            ],
            "items": [
              "ork retry run --dry-run, in the corrigir-dirigido action, re-runs claims and verify: they are declared commands, but this goes against the meaning of --dry-run.",
              "The runtime profile recorded in the ledger chooses the CLAUDE_CONFIG_DIR and the CODEX_HOME of query commands.",
              "memory.database_url_env accepts the name of any environment variable.",
              "ci.external_repositories accepts a parent-directory segment in the path of a read through the GitHub API.",
              "ork adapter install still finds the catalog from the project, as ork eval used to, but only copies the adapter into the project itself and prefers the executable on PATH when there is one."
            ]
          },
          {
            "id": "contribuir",
            "title": "For core contributors",
            "paragraphs": [
              "Rules for code in core/src:"
            ],
            "items": [
              "A value from the clone on its way to git: validate it before the call with remotoValido or exigirRemoto, branchValida or shaValido (core/src/branch-de-estado.ts), and put --end-of-options before it.",
              "A branch ref goes fully qualified, and a merge goes by the checked sha, never by name.",
              "An executable never comes from the manifest through a relative path, and the cwd of an executable chosen by configuration is not the clone root.",
              "A path with an id read from a file has a single segment, checked by regex, and the state directory is not a link.",
              "Appends to state use O_NOFOLLOW; a whole-file write goes through a temporary file created with wx and then renamed.",
              "A path read from a pointer stored in state is checked by its real path with exigirCaminhoContido (core/src/procedencia.ts). A decision the manifest cannot take alone becomes a local confirmation in .orkastery/private, with lerArquivoPrivado and gravarArquivoPrivado (core/src/postura-local.ts).",
              "The fix’s test fails the previous code; the reference tests are core/test/fronteira-de-confianca.test.ts, core/test/procedencia-e-postura.test.ts and core/test/fronteira-pendentes.test.ts."
            ]
          }
        ]
      },
      "es": {
        "title": "Frontera de confianza y procedencia del estado",
        "description": "Vea qué puede decidir un valor del repositorio clonado y qué debe confirmar cada máquina.",
        "sections": [
          {
            "id": "regra",
            "title": "Lo que viene del clon no decide la ejecución",
            "highlight": {
              "title": "Cambia para quien ya lo usa",
              "paragraphs": [
                "En la versión {versao}, ejecute una vez en cada máquina el comando de su situación, en la lista de abajo.",
                "Quien usa .claude/worktrees, workspace-write, estado fuera del índice y ork fabrica entrar no notará ningún cambio."
              ],
              "items": [
                "Con runtime.sandbox: danger-full-access, ejecute ork setup sandbox confirmar danger-full-access.",
                "Con .orkastery versionado, ejecute git rm -r --cached .orkastery.",
                "Con worktree.dir fuera de la raíz, ejecute ork setup worktree confirmar.",
                "Con la fábrica activada solo por el manifiesto, ejecute ork fabrica entrar.",
                "Con el paquete instalado ejecutando ork eval en un checkout de Orkastery, use el del checkout: node core/dist/index.js eval."
              ]
            },
            "paragraphs": [
              "Usar Orkastery en un repositorio de terceros no ejecuta código solo por eso. Un valor que viene del clon no se convierte en opción de proceso, en ejecutable ni en ruta fuera de la raíz; los únicos comandos que se ejecutan por diseño son los declarados.",
              "La frontera de confianza es la auditoría de cada llamada de proceso y de cada ruta que el núcleo arma con datos del clon, con la clase de cada una y sin guion de explotación. La matriz completa, módulo por módulo, está en la fuente.",
              "En la versión {versao}, entran las correcciones de la auditoría y las reglas de procedencia del estado, estas últimas como parche de seguridad, por decisión del dueño."
            ],
            "links": [
              {
                "label": "Matriz de la frontera de confianza",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/referencia/fronteira-de-confianca.md"
              },
              {
                "label": "Política de seguridad",
                "href": "https://github.com/orkastery/orkastery/blob/main/SECURITY.md"
              }
            ]
          },
          {
            "id": "fontes",
            "title": "En qué confía el núcleo",
            "paragraphs": [
              "La línea de comandos es de quien está al teclado: merece confianza, pero se valida cuando va a git, como --remoto, --para, --de y los ids de thread. El entorno y las carpetas de la cuenta (~/.orkastery, ~/.claude y ~/.codex) también son de confianza.",
              "No merecen confianza el manifiesto y el setup versionados (orkastery.yaml y orkastery.setup.json), el estado versionado en el clon (.orkastery y los bundles .ork-ci/<thread>.json), las ramas de estado (ork/roadmap-reservas, la de la fábrica y las ork/*) y lo que llega de otra máquina de la red (instantáneas, reservas y el frontmatter del roadmap). La salida de herramientas (git, runtime) es dato, nunca código.",
              "Cada llamada de proceso y cada ruta de la matriz recibe una de estas clases. Toda llamada de proceso del núcleo usa un vector de argumentos, sin shell; el shell solo existe en los comandos declarados y en la sonda de sandbox del MCP."
            ],
            "items": [
              "Declarado: comando que el manifiesto o la claim declara para ejecutar. Es el producto (volver a ejecutar lo que se alega), y el SECURITY.md lo documenta.",
              "Inerte: solo constantes, o datos de confianza.",
              "Defendido: dato externo, pero validado, después de --end-of-options, con la ref calificada o con el sha comprobado.",
              "Corregido: era inyección de opciones, un ejecutable elegido por el clon o una ruta fuera de la raíz.",
              "Corregido por decisión del dueño: cierra un pendiente cambiando el comportamiento, y el dueño decidió fusionarlo como parche de seguridad.",
              "Pendiente del dueño: cerrarlo exige cambiar un comportamiento documentado o aceptado hoy, y la decisión es del dueño."
            ]
          },
          {
            "id": "declarados",
            "title": "Comandos declarados",
            "paragraphs": [
              "Son los únicos que el núcleo ejecuta por diseño, y el SECURITY.md los enumera todos. La documentación no promete aviso en tiempo de ejecución: trate el orkastery.yaml y el estado de un repositorio de terceros como un Makefile.",
              "ork doctor, ork board, ork thread list, ork init, ork thread new y ork retry plan no ejecutan comandos declarados."
            ],
            "items": [
              "verify.build, verify.test, verify.typecheck y verify.preparo, en la worktree, mediante ork verify, ork fix open, ork fix reverify, ork retry run (en la acción corrigir-dirigido), la baseline de ork phase run y el gate de ork ship.",
              "ci.command y el bundle .ork-ci/<thread>.json, en ork ci run del runner del CI.",
              "Las claims (claims.jsonl y --verificar) y el doneWhen de thread.json, en los mismos comandos del verify; ork claims add solo las ejecuta con la policy del manifiesto.",
              "Las correcciones del GO-FIX y las claims de los hallazgos de auditoría (board.jsonl), en ork fix reverify y en la comprobación de la ronda de auditoría.",
              "El binario del runtime (claude y codex), mediante los adaptadores, en ork phase run y ork retry run."
            ],
            "code": "ork verify <thread>\nork fix reverify <thread>\nork audit verify <rodada>\nork ci run --branch <branch>"
          },
          {
            "id": "regras",
            "title": "Las cinco reglas de procedencia",
            "paragraphs": [
              "En la versión {versao}, cinco reglas (P1 a P5) cierran los pendientes que la auditoría dejó con el dueño. La idea es la misma en todas: lo que viene con el repositorio no decide el ejecutable, una ruta fuera de la raíz ni lo que publica esta máquina; cuando el uso es legítimo, la máquina confirma fuera de git, y el rechazo es tipado y dice el comando."
            ],
            "items": [
              "Postura del sandbox (P1): el runtime.sandbox que afloja el sandbox del agente (danger-full-access) solo despacha por Codex después de ork setup sandbox confirmar <postura>, guardado en .orkastery/private/postura-local.json (0600, fuera de git, solo para este checkout). Sin eso, ork phase run y ork retry run rechazan con runtime.sandbox-nao-confirmado, y ork doctor lo señala.",
              "Estado rastreado (P2): el estado versionado de .orkastery no elige cwd, worktree ni ejecutable (estado.rastreado). El cwd que viene del thread.json, del ledger o de la cola, para el agente o para git, solo vale en la raíz del proyecto o en una worktree que el repositorio registró (estado.worktree-nao-registrada). Vale para despacho, reanudación, verify, claims, GO-FIX, prueba del GO, handoff, liveness, ork ci prepare, ork worktree audit y ork worktree release.",
              "Transporte del pulse y del digest (P2): solo valen el pulse-host.json y el master-host.json locales, archivos comunes fuera del índice de git (transporte.rastreado).",
              "Punteros del recall y del handoff (P2): ork recall, ork handoff recall y ork handoff export solo leen un archivo que, por su ruta real, está en la raíz del proyecto o en la worktree registrada de la thread. El recall se rechaza con ponteiro.fora-da-raiz, y el export deja de apuntar afuera.",
              "Carpeta de las worktrees (P3): el worktree.dir que lleva fuera de la raíz por la ruta real (ruta absoluta, subida de carpeta, enlace en la ruta o .git) solo crea worktree después de ork setup worktree confirmar, guardado en .orkastery/private/worktree-local.json (0600, fuera de git, solo para este checkout y esta carpeta). Sin eso, la creación se rechaza con worktree.dir-fora-da-raiz, y ork doctor lo señala. Las worktrees que ya existen siguen valiendo, y el MCP sigue rechazando worktree fuera de la raíz.",
              "Eval (P4): ork eval solo ejecuta el catálogo (canarios, hooks y core/dist) del paquete que está corriendo. Un directorio con las carpetas skills, references y eval encontrado a partir del cwd que no es el del paquete se rechaza con eval.catalogo-alheio, y el mensaje dice cómo ejecutar a propósito el eval de ese checkout. El CI del kit, con node core/dist/index.js eval en la raíz, no cambia.",
              "Fábrica compartida (P5): el fabrica.compartilhada: true del manifiesto ya no activa la publicación de la instantánea de esta máquina (threads, nombre y host) en el remoto del clon, ni la lectura de las otras máquinas. Solo la adhesión de la máquina la activa: ork fabrica entrar, en ~/.orkastery/maquina.json, o ORK_FABRICA_COMPARTILHADA=1. Con el pedido en el manifiesto y sin la adhesión, ork doctor y ork fabrica avisan con fabrica.nao-confirmada."
            ],
            "code": "ork setup sandbox confirmar danger-full-access\nork setup worktree confirmar\nork fabrica entrar\nork doctor\ngit rm -r --cached .orkastery"
          },
          {
            "id": "corrigido",
            "title": "Lo que corrigió la auditoría",
            "paragraphs": [
              "En la versión {versao}, la auditoría corrige estos casos sin cambiar un comportamiento aceptado:"
            ],
            "items": [
              "El mergeSha y la rama de destino de un ship_done del ledger solo llegan al git log de la detección de reversión como sha hexadecimal y nombre de rama, después de --end-of-options; antes, un ledger versionado en el clon pasaba una opción a git, en ork master y ork ship.",
              "ork docs sincronizar ya no recurre a la base cruda del manifiesto cuando no se resuelve, y, del sha del ledger y del commit del frontmatter, solo un sha hexadecimal llega a git.",
              "El manifiesto rechaza un worktree.base_branch que no vale como nombre de rama en git (empieza con guion o contiene ..).",
              "El manifiesto rechaza un memory.cli relativo: vale un nombre buscado en el PATH, como orkmind, o una ruta absoluta. La sonda de OrkMind, también la de ork doctor, ignora las entradas relativas del PATH y el shebang con intérprete relativo, y ork brain ejecuta el binario con el cwd en $HOME, no en la raíz del clon.",
              ".orkastery, .orkastery/threads y la carpeta de una thread como enlace simbólico se rechazan con estado.link, y el append del ledger, de las claims y del board usa O_NOFOLLOW; antes, un enlace versionado llevaba la escritura fuera de la raíz.",
              "El id de una ronda de auditoría leído del run.json debe ser un nombre simple (audit.rodada-invalida).",
              "El SECURITY.md pasa a enumerar todos los comandos declarados, incluidos verify.preparo, ci.command, los bundles .ork-ci/<thread>.json y el doneWhen."
            ]
          },
          {
            "id": "pendentes",
            "title": "Lo que sigue con el dueño",
            "paragraphs": [
              "La auditoría dejó cinco elementos como pendientes del dueño, porque cerrarlos cambiaba un comportamiento aceptado o documentado. Los cinco, P1 a P5, recibieron las reglas de procedencia de esta página, fusionadas por decisión del dueño.",
              "En la misma lista quedan registrados, con riesgo bajo:"
            ],
            "items": [
              "ork retry run --dry-run, en la acción corrigir-dirigido, vuelve a ejecutar claims y verify: son comandos declarados, pero va contra el sentido de --dry-run.",
              "El perfil del runtime grabado en el ledger elige el CLAUDE_CONFIG_DIR y el CODEX_HOME de comandos de consulta.",
              "memory.database_url_env acepta el nombre de cualquier variable de entorno.",
              "ci.external_repositories acepta un segmento de subida de carpeta en la ruta de una lectura por la API de GitHub.",
              "ork adapter install todavía encuentra el catálogo a partir del proyecto, como hacía ork eval, pero solo copia el adaptador dentro del propio proyecto y prefiere el ejecutable del PATH cuando existe."
            ]
          },
          {
            "id": "contribuir",
            "title": "Para quien contribuye al núcleo",
            "paragraphs": [
              "Las reglas para el código de core/src:"
            ],
            "items": [
              "Valor del clon que va a git: valídelo antes de la llamada con remotoValido o exigirRemoto, branchValida o shaValido (core/src/branch-de-estado.ts), y ponga --end-of-options antes de él.",
              "La ref de rama va calificada, y el merge va por el sha comprobado, nunca por el nombre.",
              "El ejecutable nunca sale del manifiesto por ruta relativa, y el cwd de un ejecutable elegido por configuración no es la raíz del clon.",
              "Una ruta con id leído de un archivo tiene un solo segmento, comprobado por regex, y el directorio de estado no es un enlace.",
              "El append en el estado usa O_NOFOLLOW; la escritura de un archivo entero va por un temporal creado con wx y luego renombrado.",
              "La ruta leída de un puntero guardado en el estado se comprueba por la ruta real con exigirCaminhoContido (core/src/procedencia.ts). Una decisión que el manifiesto no puede tomar solo se convierte en confirmación local en .orkastery/private, con lerArquivoPrivado y gravarArquivoPrivado (core/src/postura-local.ts).",
              "La prueba de la corrección reprueba el código anterior; las de referencia son core/test/fronteira-de-confianca.test.ts, core/test/procedencia-e-postura.test.ts y core/test/fronteira-pendentes.test.ts."
            ]
          }
        ]
      }
    }
  }
];
