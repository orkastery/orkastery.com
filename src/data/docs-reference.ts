export default [
  {
    "slug": "cli",
    "group": "reference",
    "sources": [
      "docs/referencia/cli.md",
      "docs/referencia/cli.en.md"
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
              "O ork doctor reprova arquivo ou pasta do .git com dono diferente do dono do repositório, com a contagem, exemplos e o chown exato na correção; ele não roda nada. O check analisadores do grafo carrega o typescript e o micromark como o ork grafo indexar e avisa com a correção quando faltam. A linha rede mostra a adesão à Orkastery Network, a casa, a última batida e a última falha, só lendo arquivos locais. Com a batida no crontab, a última rodada há mais de 30 min também reprova: a batida parou. A seção forja confere a forja do remoto origin, e só aparece com remoto de forja ou com o bloco forja: no manifesto. Com verify.security_scan declarado, o check security scan fica ok com o Docker, ou com o binário nativo de toda ferramenta do laço, e avisa, nunca reprova, quando alguma ficaria indisponível.",
              "Na versão {versao}, ork doctor --json devolve os mesmos checks no contrato ork.doctor/v1, com veredito, falhas, avisos, projeto, máquina e a batida da fábrica: threads abertas, linha no crontab, última rodada, a idade dela, atrasada e o aviso pronto para o dono. A seção forja só roda com --forja; sem a flag, o JSON traz forja: nao-medida."
            ],
            "code": "ork doctor\nork maestro --json\nork thread status <thread>\nork phase list <thread>\nork claims list <thread>"
          },
          {
            "id": "familias",
            "title": "Comandos por responsabilidade",
            "paragraphs": [
              "A condução reúne ork thread, ork phase, ork modos e ork gate. A evidência usa ork claims, ork verify, ork fix e ork retry, e a varredura usa ork security-scan e ork privado varrer. O isolamento usa ork worktree, ork lease e ork conducao, que diz quem conduz cada thread. A continuidade usa ork handoff, ork recall e ork memory, e o conhecimento escrito usa ork conhecimento. A entrega usa ork ship e ork master. A auditoria usa ork audit, com o board de dívida em ork audit divida. A versão {versao} acrescenta o Agile Check ao ork verify e o security-scan como comando próprio."
            ],
            "code": "ork --help\nork ship --help\nork master --help"
          },
          {
            "id": "thread-e-worktree",
            "title": "Thread e worktree",
            "paragraphs": [
              "Com worktree.por_thread: true, o que o ork init grava, ork thread new cria a worktree e a branch ork/<slug> sem flag; com a chave false ou ausente, só com --worktree auto. --worktree DIR reusa um diretório existente, --sem-worktree cria sem worktree e avisa que, na branch base, o ork ship sai barrado, e --dry-run mostra a worktree que seria criada. A mesma regra vale para --from-finding. Na versão {versao}, com worktree.dependencias no manifesto, o comando roda dentro da worktree nova depois da criação da thread, e a falha vai ao stderr com o comando exato, sem desfazer a thread.",
              "ork worktree sync recria a branch sem commit próprio no SHA da base. Com commits próprios e a base reescrita, por exemplo depois de um force-push, recusa com tree.blocked, causa base-reescrita, e mostra o git rebase --onto que reaplica só os commits da thread.",
              "Na versão {versao}, com --pedido, ork thread new guarda o pedido em pedido.md, na pasta da thread, com o sha256 no thread.json e no thread_created; pedido vazio ou acima de 64 KiB recusa antes de gravar. Sem --pedido, ork prompt render usa o pedido guardado, conferido pelo sha256 (thread.pedido.divergente quando o arquivo foi editado fora do núcleo); thread sem pedido guardado segue com o texto de exemplo."
            ],
            "code": "ork thread new \"<nome>\" --modo auto --dry-run\nork thread new \"<nome>\" --modo auto --sem-worktree\nork thread new \"<nome>\" --modo auto --pedido \"<texto>\"\nork prompt render <thread> --fase GO\nork worktree sync <thread> --dry-run"
          },
          {
            "id": "conducao",
            "title": "Quem conduz a thread",
            "paragraphs": [
              "ork conducao status <thread> diz quem conduz a thread agora (o canal, a sessão ou o processo, a fase e desde quando) e libera, com prova, a condução que ficou sem dono. ork conducao assumir <thread> faz o handoff: encerra a condução atual pelo runtime, registra quem assumiu, de qual canal e por quê, e reserva a vez para esse canal; --por e --motivo são obrigatórios.",
              "Na versão {versao}, o ork conducao também tem os três comandos da Sentinela do Condutor, no bloco abaixo. O primeiro diz se a Sentinela está ligada nesta máquina, com a sessão, a última batida e o prazo, e dá o passo do condutor em cada thread aberta, calculado pelo núcleo; com --json, no contrato ork.conducao-sentinela/v1, é o que o condutor externo lê para ceder o despacho. O segundo é a batida: renova a presença da sessão por 3 min, ou a toma quando não há outra viva; com outra sessão viva na máquina, sai 3 e não toma o lugar dela. O terceiro tira a presença da própria sessão, e o condutor externo volta a conduzir. Quem bate e desliga é o mod ork-sentinela, sozinho.",
              "A mesma versão traz a autorização durável do dono, que deixa a batida agir sozinha dentro do prazo. ork conducao autorizar --ate D --pode limpar,registrar,master,merge,despachar grava o contrato ork.autorizacao-duravel/v1 em .orkastery/monitor/autorizacao.json, fora do git, por até 31 dias; sem --por, vale o user.name do git, quando nomeia uma pessoa. ork conducao autorizacao lê a autorização vigente, ou o motivo tipado de ela não valer. ork conducao batida executa o passo determinístico do cron: o merge do PR de branch ork/* com os checks obrigatórios verdes, o registro da entrega, o MASTER por omissão, a limpeza das fantasmas e o despacho da fase seguinte, só dentro da autorização, e sai 3 com outra batida agindo. ork conducao atualizar <thread> mescla a base remota na branch da thread, e --enviar empurra sem força e prova pelo git ls-remote."
            ],
            "links": [
              {
                "label": "Conduza de dentro do Claude Code",
                "href": "/docs/claude-code/#sentinela"
              }
            ],
            "code": "ork conducao status <thread> --json\nork conducao assumir <thread> --por <quem> --motivo \"<por que>\"\nork conducao sentinela status --json\nork conducao sentinela bater --sessao <id>\nork conducao sentinela desligar --sessao <id>\nork conducao autorizar --ate 2026-11-02 --pode limpar,registrar,master --por \"<quem>\"\nork conducao autorizacao --json\nork conducao batida --json\nork conducao atualizar <thread>"
          },
          {
            "id": "integracoes",
            "title": "Integrações e operação",
            "paragraphs": [
              "ork adapter e ork mcp conectam o host. ork accounts e ork setup descrevem runtimes, perfis e o que esta máquina confirmou. ork onboarding guarda a pauta e as respostas do projeto, e ork experiencia mostra as preferências do pacote de experiência. ork sessions, ork monitor e ork pulse observam execução e atenção humana. ork brain e ork portfolio consultam memória e catálogo, e ork ledger stats dá a telemetria do ledger. ork fabrica, ork roadmap e ork network coordenam trabalho entre máquinas, e ork projetos diz qual projeto cada comando lê. ork grafo consulta o índice local do grafo de código, e ork conhecimento consulta o conhecimento escrito do projeto. A referência canônica no repositório detalha as opções de cada família, e um teste confere as invocações dela contra a ajuda do ork.",
              "Na versão {versao}, ork mcp install aceita --ship-transport github-ssh, forja-ssh, forja-https ou bare-local, e esse é o único push que um agente dispara. Sem a opção, vale github-ssh. forja-ssh aceita host e porta da forja, lê a chave do servidor e só a fixa confirmada pelo seu known_hosts ou por --ssh-fingerprint, e confere a chave a cada push com StrictHostKeyChecking=yes. forja-https usa o auth git-credential do gh ou do glab, com login no host exato, zera os outros helpers da config e recusa HTTP puro ou credencial na URL. A fixação fica em $XDG_CONFIG_HOME/orkastery/mcp-ship/, é por máquina e exige reinstalar em outra; trocar de modo é remover a entrada orkastery e reinstalar."
            ],
            "code": "ork mcp install --project \"$PWD\" --host claude-code --ship-transport forja-https\nork mcp install --project \"$PWD\" --host claude-code --ship-transport forja-ssh --ssh-fingerprint SHA256:<impressao>"
          },
          {
            "id": "confirmacoes",
            "title": "Confirmações desta máquina",
            "paragraphs": [
              "Na versão {versao}, três escolhas do manifesto só valem depois de a máquina confirmar, fora do git. O runtime.sandbox que dá ao agente acesso total (danger-full-access) só despacha pelo Codex e pelo Grok Build depois de ork setup sandbox confirmar <postura>; sem isso, ork phase run e ork retry run recusam com runtime.sandbox-nao-confirmado. O worktree.dir que leva para fora da raiz, pelo caminho real, só cria worktree depois de ork setup worktree confirmar; sem isso, a criação recusa com worktree.dir-fora-da-raiz. E o fabrica.compartilhada: true só liga a fábrica com a adesão da máquina, por ork fabrica entrar.",
              "As duas confirmações do ork setup ficam em .orkastery/private (postura-local.json e worktree-local.json, modo 0600, fora do git) e valem só para este checkout; a da worktree, só para aquela pasta. A adesão da fábrica fica em ~/.orkastery/maquina.json e vale para a máquina. O ork doctor acusa a falta de cada uma.",
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
              "ork sessions lista as sessões de todas as contas, com a coluna PERFIL e as fantasmas; --global inventaria também as sessões Claude e Codex da conta fora da raiz do projeto, e --exigir-limpo sai diferente de zero com fonte inválida ou sessão sem thread. ork sessions limpar-fantasmas solta cada fantasma do ork com registro no ledger, sem chamar stop nem rm no runtime. Quando o runtime recusa o diretório da worktree ou espera o aceite de termos novos, a fase espera o dono rodar o comando indicado, e ork retry run re-despacha o mesmo prompt depois.",
              "Na versão {versao}, para o ork retry run, a confiança no diretório vale quando o .claude.json da conta a registra no próprio diretório, num de cima até a raiz do repositório ou no repositório principal da worktree, e o redespacho recusado de novo pelo mesmo impedimento não gasta tentativa nem sobe esforço.",
              "ork accounts esgotamentos mede, sem gravar nada, os despachos que caíram numa conta marcada como esgotada por outro projeto dentro do prazo da marca; a conta sai como id opaco, e o total é um piso."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions --all\nork sessions --global --json\nork sessions limpar-fantasmas --dry-run --json\nork accounts esgotamentos --desde 7d --json"
          },
          {
            "id": "grok",
            "title": "Grok Build por despacho explícito",
            "paragraphs": [
              "Na versão {versao}, ork phase run <thread> GO --runtime grok --model <modelo> despacha a fase pelo Grok Build sem interface, pedido explicitamente ou pelo setup do bloco, e nunca pelo runtime.adapter do projeto. Não há modelo padrão: o modelo é sempre o do dono, e o esforço vai ao Grok Build com o mesmo nome. O processo filho roda sem XAI_API_KEY, pela assinatura que o login do perfil guardou, no sandbox workspace por padrão: read-only com runtime.sandbox: read-only e no PLAN que fecha o bloco, e sem sandbox só com danger-full-access confirmado nesta máquina por ork setup sandbox confirmar <postura>.",
              "O comando ork setup <modo> --bloco N --runtime grok --model <modelo> faz do Grok Build o runtime de um bloco, e o fallback do bloco aceita o Grok Build com o modelo. ork mcp install --project <raiz> --host grok grava a entrada do MCP no .grok/config.toml do projeto, que não se versiona; no despacho, o servidor MCP do núcleo sobe fora do sandbox do Grok Build, só em 127.0.0.1, com um token por despacho e só com as ferramentas daquela sessão, e morre com ela.",
              "O Grok Build não documenta um comando que confira o login, então ork accounts check mantém o estado do perfil dele, e o erro de login no despacho o tira do rodízio com runtime.auth-missing. ork sessions também lista as sessões do Grok Build de cada perfil. O ensaio real que homologa o runtime ainda falta."
            ]
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
              "O --remoto de ork ship --para, ork ship registrar-pr e ork ci status é o nome de um remoto do git, validado antes de qualquer git: fora do formato, recusa com ship.remoto-invalido ou ci.remoto-invalido, sem consultar o GitHub.",
              "Na versão {versao}, o push da base recusado pela proteção da branch vira entrega.base-protegida, com a orientação de entregar por PR ou MR. Com verify.security_scan declarado e sem ci.required_for_ship, uma categoria do laço sem varredura no SHA da candidata para com human.pending antes de qualquer push, e --allow-unscanned \"<quem>\" entrega mesmo assim, gravando ship_unscanned_authorized no ledger. ork ship registrar-pr e ork ci status reconhecem o GitLab pela forja resolvida, e no GitLab --repo aceita grupo, subgrupo e projeto, com --pr sendo o iid do MR."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <dono/nome> --pr <n>\nork ship <thread> --para main --allow-unscanned \"<quem>\"\nork phase run <thread> GO --prompt \"<texto>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Busca por significado na memória",
            "paragraphs": [
              "ork memory search --texto busca por significado no tenant, com vetor e FTS combinados, e não é determinística; não combina com --tags nem --thread. ork memory index mantém o índice vetorial local, idempotente, e --dry-run estima tokens e custo sem chamar o provider. ork memory status --sondar faz uma chamada real e mede a latência. Os três usam o mesmo universo da busca do tenant; ork memory status e ork memory index o mostram por coleção, contam o que fica fora da busca e avisam quando o índice cobre menos do que a busca enxerga.",
              "Sem o universo lido inteiro, ou com a memória desligada ou indisponível, ork memory search --texto sai 1 com motivo tipado e sem resultados, também em --json; universo vazio lido com sucesso sai 0. A leitura do universo tem prazo próprio, memory.universo_timeout_ms, 90.000 ms por padrão.",
              "ork memory search --tags é a busca determinística por tag; com --thread, a leitura fica restrita à thread, e --restrito e --janela exigem --thread (memory.query.thread-required).",
              "Na versão {versao}, a DSN da memória pode vir de arquivo, fora do ambiente dos agentes: memory.database_url_file aceita só a forma ~/.orkastery/segredos/<nome>, e as duas fontes são exclusivas, então o ork nunca cai de uma para a outra. O arquivo precisa ser comum, do usuário que roda o ork, com permissão 0600 ou 0400 exata, até 4 KiB e uma linha só com a DSN. Ausente, inseguro ou inválido, a memória degrada para files com dsn.arquivo-ausente, dsn.arquivo-inseguro ou dsn.arquivo-invalido. ork memory status mostra a fonte, sem o valor, e o ork doctor ganha os checks fonte da DSN e DSN no ambiente; o segundo lista, pelo nome, as variáveis com a DSN do projeto ou com URL com senha que o agente lê com env.",
              "Na mesma versão, a prova core/scripts/prova-busca-semantica.sh mostra, por par, a posição e a similaridade de cada alvo no ranking vetorial e quantas entradas da busca têm vetor coerente no índice, sem mudar os pares nem os códigos de saída. Sem argumentos, ela usa os pares padrão que o dono decidiu; pares passados como argumentos substituem os padrão."
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
          },
          {
            "id": "check",
            "title": "Agile Check e Classic Check",
            "paragraphs": [
              "Na versão {versao}, o ork verify roda o Agile Check por padrão, e o Classic Check continua sendo o CHECK de sempre, com os mesmos comandos, a mesma ordem e as mesmas ferramentas. --check classic ou --check agile vence o check.mode do manifesto, e o verify_run grava o modo e de onde ele veio: opcao, manifesto ou padrao. O texto da rodada mostra a linha check.",
              "O Agile Check roda o preparo uma vez e as claims contra o produto dele, com guarda de hash, e leva as lanes de teste e a varredura em paralelo sem passar da CPU da máquina; a lane que sobe containers espera a varredura, por check.agile.apos_a_varredura. O banco do Trivy fica em cache, a imagem de lint é pré-montada e o binário nativo vem primeiro; a peça indisponível cai para o equivalente do Classic e fica registrada no verify_run. Nos dois modos, o verify_run grava a duração de cada comando, claim e rodada, e o parecer do CHECK e o pr-body.md dizem o modo da rodada.",
              "A rodada e a baseline esperam a vez na fila de recursos pesados: concurrency.max_parallel_heavy, 1 por padrão, e 0 desliga. No máximo essa quantidade roda ao mesmo tempo nas worktrees do projeto, e nunca duas na mesma worktree. A espera em primeiro plano vai até --esperar ou 60 min e então recusa com fila-pesada.ocupada, na saída 3, dizendo quem ocupa."
            ],
            "code": "ork verify <thread>\nork verify <thread> --check classic\nork verify <thread> --check agile --esperar 20"
          },
          {
            "id": "security-scan",
            "title": "Varredura de segurança e qualidade",
            "paragraphs": [
              "ork security-scan varre o HEAD, o conteúdo versionado numa worktree destacada, com as ferramentas do catálogo: segredos, dependências, SAST, IaC, workflows, qualidade e licença. Cada achado é comparado com a base por impressão digital e sai como new, existing ou dismissed. A base é --base, ou o merge-base com <remoto>/<worktree.base_branch>.",
              "Segredo novo e vulnerabilidade high ou critical nova fazem o comando sair 1; qualidade e licença só reportam. O relatório report.json, no contrato ork.security-scan/v1, e o report.md ficam em .orkastery/security-scan/<sha>/ da árvore principal, e nunca levam o valor de um segredo. Sem --json, o resumo termina com o caminho do report.md.",
              "Com verify.security_scan no manifesto, o ork verify roda o scan como quarto comando, e o ork doctor ganha o check security scan. ORK_SECURITY_SCAN_REQUIRED=1 faz ferramenta da categoria do laço indisponível ou que falhou sair 1. Os motivos unsupported-ci e no-requirements-file são declarados no relatório e não contam como categoria não varrida. O --check classic ou agile escolhe o paralelismo: no Agile as ferramentas rodam ao mesmo tempo, com o banco do Trivy em cache persistente, e no Classic uma por vez."
            ],
            "code": "ork security-scan --json\nork security-scan --base origin/main\nork security-scan --check classic"
          },
          {
            "id": "dado-privado",
            "title": "Barreira de dado privado",
            "paragraphs": [
              "Na versão {versao}, ork privado varrer procura dado privado no repositório do diretório atual: caminho de home, e-mail fora da lista permitida, hostname no formato de máquina e os termos da lista local, que fica fora do git. A lista é termos-privados.txt em ~/.orkastery/ e em .orkastery/ do projeto, ou o arquivo indicado por ORK_TERMOS_PRIVADOS, e só é lida como arquivo comum do usuário atual, sem link e com permissão 0600. As exceções ficam em orkastery.privado.json, com padrão e valor exato sem curinga e motivo obrigatório.",
              "Sem --base, a varredura lê os nomes e todo o conteúdo dos arquivos versionados, inclusive binários. Com --base REF, lê o diff contra a merge-base com REF e os arquivos não rastreados. O relatório diz arquivo, linha, coluna e padrão, nunca o valor, e o nome de arquivo com achado sai com [omitido]. Sai 1 com achado sob a policy dado_privado em block ou sem a policy declarada, 0 em warn e off, e 2 quando a varredura não roda.",
              "Com a policy dado_privado no manifesto, o ork verify varre o diff da thread e reprova com policy.violation em block, e o ork ci prepare recusa gerar o bundle com achado. No CI do núcleo, a varredura é um passo do job documentacao."
            ],
            "code": "ork privado varrer\nork privado varrer --base origin/main\nork privado varrer --json"
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
              "ork doctor fails when a file or folder in .git has a different owner from the repository owner, with the count, examples and the exact chown in the fix; it runs nothing itself. The graph analyzers check loads typescript and micromark as ork grafo indexar does and warns with the fix when they are missing. The rede line shows Orkastery Network membership, the home, the last heartbeat and the last failure, reading local files only. With the heartbeat line in crontab, a last run older than 30 min also fails: the heartbeat stopped. The forja section checks the forge of the origin remote, and only appears with a forge remote or with the forja: block in the manifest. With verify.security_scan declared, the security scan check is ok with Docker, or with the native binary of every tool in the loop, and warns, never fails, when one would be unavailable.",
              "In version {versao}, ork doctor --json returns the same checks in the ork.doctor/v1 contract, with verdict, failures, warnings, project, machine and the factory heartbeat: open threads, crontab line, last run, its age, atrasada and the notice ready for the owner. The forja section only runs with --forja; without the flag, the JSON carries forja: nao-medida."
            ],
            "code": "ork doctor\nork maestro --json\nork thread status <thread>\nork phase list <thread>\nork claims list <thread>"
          },
          {
            "id": "familias",
            "title": "Commands by responsibility",
            "paragraphs": [
              "Conduction covers ork thread, ork phase, ork modos and ork gate. Evidence uses ork claims, ork verify, ork fix and ork retry, and scanning uses ork security-scan and ork privado varrer. Isolation uses ork worktree, ork lease and ork conducao, which shows who is conducting each thread. Continuity uses ork handoff, ork recall and ork memory, and written knowledge uses ork conhecimento. Delivery uses ork ship and ork master. Auditing uses ork audit, with the debt board in ork audit divida. Version {versao} adds the Agile Check to ork verify and security-scan as a command of its own."
            ],
            "code": "ork --help\nork ship --help\nork master --help"
          },
          {
            "id": "thread-e-worktree",
            "title": "Thread and worktree",
            "paragraphs": [
              "With worktree.por_thread: true, which ork init writes, ork thread new creates the worktree and the ork/<slug> branch without a flag; with the key false or absent, only with --worktree auto. --worktree DIR reuses an existing directory, --sem-worktree creates no worktree and warns that on the base branch ork ship will be blocked, and --dry-run shows the worktree that would be created. The same rule applies to --from-finding. In version {versao}, with worktree.dependencias in the manifest, the command runs inside the new worktree after the thread is created, and a failure goes to stderr with the exact command, without undoing the thread.",
              "ork worktree sync recreates a branch with no commits of its own at the base SHA. With its own commits and a rewritten base, for example after a force-push, it refuses with tree.blocked, cause base-reescrita, and shows the git rebase --onto that replays only the thread’s commits.",
              "In version {versao}, with --pedido, ork thread new stores the request in pedido.md, in the thread folder, with the sha256 in thread.json and in thread_created; an empty request or one over 64 KiB is refused before anything is written. Without --pedido, ork prompt render uses the stored request, checked against the sha256 (thread.pedido.divergente when the file was edited outside the core); a thread with no stored request keeps the sample text."
            ],
            "code": "ork thread new \"<nome>\" --modo auto --dry-run\nork thread new \"<nome>\" --modo auto --sem-worktree\nork thread new \"<nome>\" --modo auto --pedido \"<text>\"\nork prompt render <thread> --fase GO\nork worktree sync <thread> --dry-run"
          },
          {
            "id": "conducao",
            "title": "Who conducts a thread",
            "paragraphs": [
              "ork conducao status <thread> shows who is conducting the thread right now (the channel, the session or process, the phase and since when) and releases, with proof, a conduction left without an owner. ork conducao assumir <thread> performs the handoff: it ends the current conduction through the runtime, records who took over, from which channel and why, and reserves the turn for that channel; --por and --motivo are required.",
              "In version {versao}, ork conducao also has the three commands of the Conductor’s Sentinel, in the block below. The first shows whether the Sentinel is active on this machine, with the session, the last heartbeat and the deadline, and gives the conductor’s next step for each open thread, computed by the core; with --json, in the ork.conducao-sentinela/v1 contract, it is what the external conductor reads to yield dispatch. The second is the heartbeat: it renews the session’s presence for 3 minutes, or takes it over when no other one is alive; with another live session on the machine, it exits with code 3 and does not take its place. The third removes the session’s own presence, and the external conductor takes over again. The ork-sentinela mod runs the heartbeat and the switch-off by itself.",
              "The same version brings the owner’s durable authorization, which lets the heartbeat act on its own within the deadline. ork conducao autorizar --ate D --pode limpar,registrar,master,merge,despachar writes the ork.autorizacao-duravel/v1 contract to .orkastery/monitor/autorizacao.json, outside git, for up to 31 days; without --por, the user.name configured in git is the value that counts when it names a person. ork conducao autorizacao reads the authorization in force, or the typed reason why it does not hold. ork conducao batida runs the cron’s deterministic step: the merge of an ork/* PR with the required checks green, delivery registration, MASTER by default, ghost cleanup and dispatch of the next phase, only within the authorization, and exits 3 when another heartbeat is acting. ork conducao atualizar <thread> merges the remote base into the thread branch, and --enviar pushes without force and proves it with git ls-remote."
            ],
            "links": [
              {
                "label": "Run the factory from Claude Code",
                "href": "/docs/claude-code/#sentinela"
              }
            ],
            "code": "ork conducao status <thread> --json\nork conducao assumir <thread> --por <who> --motivo \"<why>\"\nork conducao sentinela status --json\nork conducao sentinela bater --sessao <id>\nork conducao sentinela desligar --sessao <id>\nork conducao autorizar --ate 2026-11-02 --pode limpar,registrar,master --por \"<who>\"\nork conducao autorizacao --json\nork conducao batida --json\nork conducao atualizar <thread>"
          },
          {
            "id": "integracoes",
            "title": "Integrations and operations",
            "paragraphs": [
              "ork adapter and ork mcp connect the host. ork accounts and ork setup describe runtimes, profiles and what this machine has confirmed. ork onboarding keeps the project’s interview and answers, and ork experiencia shows the preferences of the experience pack. ork sessions, ork monitor and ork pulse observe execution and human attention. ork brain and ork portfolio access memory and the catalog, and ork ledger stats gives the ledger telemetry. ork fabrica, ork roadmap and ork network coordinate work across machines, and ork projetos shows which project each command reads. ork grafo queries the local code graph index, and ork conhecimento queries the project’s written knowledge. The canonical repository reference details each family’s options, and a test checks its invocations against the CLI help.",
              "In version {versao}, ork mcp install accepts --ship-transport github-ssh, forja-ssh, forja-https or bare-local, and that is the only push an agent fires. Without the option, github-ssh applies. forja-ssh accepts the forge host and port, reads the server key and only pins it once confirmed by your known_hosts or by --ssh-fingerprint, and checks the key on every push with StrictHostKeyChecking=yes. forja-https uses the auth git-credential of gh or glab, with a login on the exact host, clears the other helpers in the config and refuses plain HTTP or credentials in the URL. The pin lives in $XDG_CONFIG_HOME/orkastery/mcp-ship/, is per machine and requires the same install there; changing mode means removing the orkastery entry and reinstalling."
            ],
            "code": "ork mcp install --project \"$PWD\" --host claude-code --ship-transport forja-https\nork mcp install --project \"$PWD\" --host claude-code --ship-transport forja-ssh --ssh-fingerprint SHA256:<fingerprint>"
          },
          {
            "id": "confirmacoes",
            "title": "Confirmations on this machine",
            "paragraphs": [
              "In version {versao}, three manifest choices only take effect after the machine confirms them, outside git. A runtime.sandbox that gives the agent full access (danger-full-access) only dispatches through Codex and Grok Build after ork setup sandbox confirmar <postura>; without it, ork phase run and ork retry run refuse with runtime.sandbox-nao-confirmado. A worktree.dir that leads outside the root, by its real path, only creates a worktree after ork setup worktree confirmar; without it, creation refuses with worktree.dir-fora-da-raiz. And fabrica.compartilhada: true only turns the factory on with the machine’s membership, through ork fabrica entrar.",
              "The two ork setup confirmations live in .orkastery/private (postura-local.json and worktree-local.json, mode 0600, outside git) and apply only to this checkout; the worktree one, only to that folder. The factory membership lives in ~/.orkastery/maquina.json and applies to the machine. ork doctor reports each one that is missing.",
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
              "ork sessions lists the sessions of every account, with the PERFIL column and the ghosts; --global also inventories the account’s Claude and Codex sessions outside the project root, and --exigir-limpo exits non-zero with an invalid source or a session without a thread. ork sessions limpar-fantasmas releases each ghost from ork with a ledger record, without calling stop or rm in the runtime. When the runtime refuses the worktree directory or waits for new terms to be accepted, the phase waits for the owner to run the indicated command, and ork retry run then re-dispatches the same prompt.",
              "In version {versao}, for ork retry run, directory trust counts when the account’s .claude.json records it for the directory itself, for one above it up to the repository root, or for the worktree’s main repository, and a re-dispatch refused again for the same blocker neither spends an attempt nor raises the effort.",
              "ork accounts esgotamentos measures, without writing anything, the dispatches that landed on an account another project had marked as exhausted while the mark was still valid; the account appears as an opaque id, and the total is a floor."
            ],
            "code": "ork phase run <thread> GO --prompt \"<texto>\" --perfil <id>\nork sessions --all\nork sessions --global --json\nork sessions limpar-fantasmas --dry-run --json\nork accounts esgotamentos --desde 7d --json"
          },
          {
            "id": "grok",
            "title": "Grok Build by explicit dispatch",
            "paragraphs": [
              "In version {versao}, ork phase run <thread> GO --runtime grok --model <model> dispatches the phase through Grok Build without an interface, requested explicitly or through the block setup, and never through the project’s runtime.adapter. There is no default model: the model is always the owner’s, and the effort goes to Grok Build under the same name. The child process runs without XAI_API_KEY, using the subscription the profile’s login stored, in the workspace sandbox by default: read-only with runtime.sandbox: read-only and in the PLAN that closes the block, and with no sandbox only when danger-full-access is confirmed on this machine through ork setup sandbox confirmar <postura>.",
              "The command ork setup <mode> --bloco N --runtime grok --model <model> makes Grok Build a block’s runtime, and the block fallback accepts Grok Build with its model. ork mcp install --project <root> --host grok writes the MCP entry to the project’s .grok/config.toml, which is not versioned; at dispatch, the core’s MCP server starts outside the Grok Build sandbox, on 127.0.0.1 only, with a per-dispatch token and only that session’s tools, and dies with the session.",
              "Grok Build documents no command that checks its login, so ork accounts check keeps its profile’s state, and a login error at dispatch takes the profile out of rotation with runtime.auth-missing. ork sessions also lists the Grok Build sessions of each profile. The live trial that validates the runtime is still missing."
            ]
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
              "--remoto in ork ship --para, ork ship registrar-pr and ork ci status is the name of a remote, validated before any git call: outside the format, it refuses with ship.remoto-invalido or ci.remoto-invalido, without querying GitHub.",
              "In version {versao}, a base push refused by branch protection becomes entrega.base-protegida, with guidance to deliver through a PR or MR. With verify.security_scan declared and without ci.required_for_ship, a loop category without a scan on the candidate SHA stops with human.pending before any push, and --allow-unscanned \"<who>\" delivers anyway, recording ship_unscanned_authorized in the ledger. ork ship registrar-pr and ork ci status recognize GitLab through the resolved forge, and on GitLab --repo accepts group, subgroup and project, with --pr being the MR iid."
            ],
            "code": "ork ci prepare <thread>\nork ci run --branch <branch>\nork ship registrar-pr <thread> --repo <owner/name> --pr <n>\nork ship <thread> --para main --allow-unscanned \"<who>\"\nork phase run <thread> GO --prompt \"<text>\" --esperar"
          },
          {
            "id": "memoria",
            "title": "Search memory by meaning",
            "paragraphs": [
              "ork memory search --texto searches the tenant by meaning, combining vector and FTS, and is not deterministic; it cannot be combined with --tags or --thread. ork memory index maintains the local, idempotent vector index, and --dry-run estimates tokens and cost without calling the provider. ork memory status --sondar makes one real call and measures its latency. All three use the same tenant search universe; ork memory status and ork memory index display it per collection, count what stays out of search and warn when the index covers less than search can see.",
              "When the universe was not read in full, or memory is off or unavailable, ork memory search --texto exits 1 with a typed reason and no results, also with --json; an empty universe read successfully exits 0. Reading the universe has its own deadline, memory.universo_timeout_ms, 90,000 ms by default.",
              "ork memory search --tags is the deterministic tag search; with --thread, reading is restricted to the thread, and --restrito and --janela require --thread (memory.query.thread-required).",
              "In version {versao}, the memory DSN can come from a file, outside the agents’ environment: memory.database_url_file accepts only the ~/.orkastery/segredos/<nome> form, and the two sources are exclusive, so ork never falls back from one to the other. The file must be a regular file of the user running ork, with exact 0600 or 0400 permissions, up to 4 KiB and a single line with the DSN. Missing, unsafe or invalid, memory degrades to files with dsn.arquivo-ausente, dsn.arquivo-inseguro or dsn.arquivo-invalido. ork memory status shows the source, never the value, and ork doctor gains the DSN source and DSN in the environment checks; the second lists, by name, the variables carrying the project DSN or a URL with a password that the agent reads with env.",
              "In the same version, the core/scripts/prova-busca-semantica.sh proof shows, for each pair, the position and similarity of each target in the vector ranking and how many search entries have a coherent vector in the index, without changing the pairs or the exit codes. Without arguments, it uses the default pairs the owner decided on; pairs passed as arguments replace the defaults."
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
          },
          {
            "id": "check",
            "title": "Agile Check and Classic Check",
            "paragraphs": [
              "In version {versao}, ork verify runs the Agile Check by default, and the Classic Check remains the CHECK as it always was, with the same commands, the same order and the same tools. --check classic or --check agile overrides the manifest’s check.mode, and verify_run records the mode and where it came from: opcao, manifesto or padrao. The run text shows the check line.",
              "The Agile Check runs the preparation once and the claims against its product, with a hash guard, and runs the test lanes and the scan in parallel without exceeding the machine’s CPU; the lane that starts containers waits for the scan, through check.agile.apos_a_varredura. The Trivy database is cached, the lint image is prebuilt and the native binary comes first; an unavailable piece falls back to the Classic equivalent and is recorded in verify_run. In both modes, verify_run records the duration of each command, claim and run, and the CHECK report and pr-body.md state the run’s mode.",
              "The run and the baseline wait their turn in the heavy resource queue: concurrency.max_parallel_heavy, 1 by default, and 0 disables it. At most that many run at once in the project’s worktrees, and never two in the same worktree. Waiting in the foreground goes up to --esperar or 60 min and then refuses with fila-pesada.ocupada, exit code 3, naming who holds it."
            ],
            "code": "ork verify <thread>\nork verify <thread> --check classic\nork verify <thread> --check agile --esperar 20"
          },
          {
            "id": "security-scan",
            "title": "Security and quality scan",
            "paragraphs": [
              "ork security-scan scans HEAD, the versioned content in a detached worktree, with the catalog tools: secrets, dependencies, SAST, IaC, workflows, quality and license. Each finding is compared with the base by fingerprint and comes out as new, existing or dismissed. The base is --base, or the merge-base with <remote>/<worktree.base_branch>.",
              "A new secret and a new high or critical vulnerability make the command exit 1; quality and license only report. The report.json, in the ork.security-scan/v1 contract, and report.md live in .orkastery/security-scan/<sha>/ of the main tree, and never carry a secret’s value. Without --json, the summary ends with the path to report.md.",
              "With verify.security_scan in the manifest, ork verify runs the scan as a fourth command, and ork doctor gains the security scan check. ORK_SECURITY_SCAN_REQUIRED=1 makes a loop category tool that is unavailable or failed exit 1. The unsupported-ci and no-requirements-file reasons are declared in the report and do not count as an unscanned category. --check classic or agile chooses the parallelism: in Agile the tools run at the same time, with the Trivy database in persistent cache, and in Classic one at a time."
            ],
            "code": "ork security-scan --json\nork security-scan --base origin/main\nork security-scan --check classic"
          },
          {
            "id": "dado-privado",
            "title": "Private data barrier",
            "paragraphs": [
              "In version {versao}, ork privado varrer looks for private data in the repository of the current directory: home paths, email outside the allowed list, hostnames in machine format and the terms of the local list, which stays outside git. The list is termos-privados.txt in ~/.orkastery/ and in the project’s .orkastery/, or the file named by ORK_TERMOS_PRIVADOS, and is only read as a regular file of the current user, without a link and with 0600 permissions. Exceptions live in orkastery.privado.json, with an exact pattern and value, no wildcard, and a required reason.",
              "Without --base, the scan reads the names and all the content of versioned files, binaries included. With --base REF, it reads the diff against the merge-base with REF and the untracked files. The report states file, line, column and pattern, never the value, and a file name with a finding comes out as [omitido]. It exits 1 with a finding under the dado_privado policy in block or without the policy declared, 0 in warn and off, and 2 when the scan does not run.",
              "With the dado_privado policy in the manifest, ork verify scans the thread diff and fails with policy.violation in block, and ork ci prepare refuses to write the bundle when there is a finding. In the core CI, the scan is a step of the documentacao job."
            ],
            "code": "ork privado varrer\nork privado varrer --base origin/main\nork privado varrer --json"
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
      "docs/referencia/contratos/rede-rm053.md",
      "docs/referencia/contratos/forja.md",
      "docs/referencia/contratos/autorizacao-duravel-rm063.md"
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
              "As recusas projeto.desconhecido, projeto.ambiguo, projeto.sem-manifesto, projeto.escolha, projeto.nenhum e projeto.fora-do-servidor trazem os candidatos e a correção. Quem consome o registro lê sem gravar, confere o contrato e nunca escolhe a primeira cópia de um nome ambíguo. Na versão {versao}, o ork privado é um dos comandos que não leem projeto: ele varre o repositório do diretório atual e não resolve alvo global.",
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
              "O playbook descreve transporte, ferramentas nativas e limites por fase. PLAN não edita produto; GO recebe a worktree; CHECK requer revisão independente. Um schema de saída de claims contém candidatos: a resposta do modelo não registra nem verifica a alegação. Configuração instalada não comprova homologação live.",
              "O Grok Build ainda não entra na matriz de capacidades do playbook: um runtime só entra nela com o ensaio real da homologação, que é a F5 da RM-067. Na versão {versao}, o despacho, o setup e o fallback, o sandbox com piso workspace, as instruções do projeto, a conta por perfil, o MCP do núcleo fora do sandbox e o inventário de sessões já valem para ele; o formato da cota esgotada e a conferência do login seguem como lacunas."
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
          },
          {
            "id": "forja",
            "title": "Forja e autorização durável",
            "paragraphs": [
              "Na versão {versao}, o núcleo reconhece a forja do projeto, GitHub ou GitLab, pela CLI dela já logada, gh ou glab, e nunca lê nem passa token. O bloco opcional forja: do orkastery.yaml declara tipo, host, porta, caminho_base, ssh_host, ssh_porta e ca; sem ele, tudo vem do remoto origin e da sondagem. A forja é resolvida pelo manifesto, pelo host conhecido ou pela sondagem só da CLI com login no host, nunca pelo nome do host; sem resposta, forja.desconhecida, e com duas, forja.ambigua.",
              "O ci.produtor diz quem aprova o check exigido, com github-actions por padrão, e no GitLab só o job da pipeline do projeto conta como produtor gitlab-ci. O ork ci status passa a ork.ci-status/v2, com provider, fonte e produtor, e a v1 continua lida. O ork ship publicar recusa remoto Enterprise sem forja: e sem login da CLI antes de qualquer escrita (forja.desconhecida), e o registrar-pr --repo não tem host de reserva: sem leitura, entrega.sem-leitura.",
              "A autorização durável é o contrato ork.autorizacao-duravel/v1, em .orkastery/monitor/autorizacao.json, fora do git. Ela vale só nesta máquina e neste projeto, com prazo ISO de fuso explícito, por até 31 dias, e uma lista fechada de ações: limpar, registrar, master, merge e despachar. Ação fora do contrato invalida o arquivo inteiro, e sem autorização a batida não age."
            ],
            "code": "ork doctor --json --forja\nork ci status --json\nork conducao autorizacao --json"
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
              "The projeto.desconhecido, projeto.ambiguo, projeto.sem-manifesto, projeto.escolha, projeto.nenhum and projeto.fora-do-servidor refusals include the candidates and the fix. Consumers read the registry without writing, check the contract and never pick the first copy of an ambiguous name. In version {versao}, ork privado is one of the commands that do not read a project: it scans the repository of the current directory and does not resolve a global target.",
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
              "The playbook describes transport, native tools and phase limits. PLAN does not edit the product; GO receives the worktree; CHECK requires independent review. A claim output schema contains candidates: a model response neither registers nor verifies the assertion. Installed configuration does not prove live validation.",
              "Grok Build is not in the playbook’s capability matrix yet: a runtime only enters it with the live validation trial, which is RM-067’s F5. In version {versao}, dispatch, setup and fallback, the sandbox with a workspace floor, project instructions, per-profile accounts, the core’s MCP server outside the sandbox and the session inventory already apply to it; the exhausted-quota format and the login check remain gaps."
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
          },
          {
            "id": "forja",
            "title": "Forge and durable authorization",
            "paragraphs": [
              "In version {versao}, the core recognizes the project’s forge, GitHub or GitLab, through its logged-in CLI, gh or glab, and never reads or passes a token. The optional forja: block in orkastery.yaml declares tipo, host, porta, caminho_base, ssh_host, ssh_porta and ca; without it, everything comes from the origin remote and probing. The forge is resolved by the manifest, by the known host or by probing only the CLI with a login on the host, never by the host name; with no answer, forja.desconhecida, and with two, forja.ambigua.",
              "ci.produtor states who approves the required check, github-actions by default, and on GitLab only the project pipeline job counts as the gitlab-ci producer. ork ci status moves to ork.ci-status/v2, with provider, fonte and produtor, and v1 is still read. ork ship publicar refuses an Enterprise remote without forja: and without a CLI login before any write (forja.desconhecida), and registrar-pr --repo has no fallback host: without a reading, entrega.sem-leitura.",
              "Durable authorization is the ork.autorizacao-duravel/v1 contract, in .orkastery/monitor/autorizacao.json, outside git. It applies only on this machine and in this project, with an ISO deadline carrying an explicit offset, for up to 31 days, and a closed list of actions: limpar, registrar, master, merge and despachar. An action outside the contract invalidates the whole file, and without authorization the heartbeat does not act."
            ],
            "code": "ork doctor --json --forja\nork ci status --json\nork conducao autorizacao --json"
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
              "Postura do sandbox (P1): o runtime.sandbox que dá ao agente acesso total (danger-full-access) só despacha pelo Codex depois de ork setup sandbox confirmar <postura>, gravado em .orkastery/private/postura-local.json (0600, fora do git, só para este checkout). Sem isso, ork phase run e ork retry run recusam com runtime.sandbox-nao-confirmado, e o ork doctor acusa.",
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
            "id": "dado-privado",
            "title": "Barreira de dado privado e DSN fora do ambiente",
            "paragraphs": [
              "Na versão {versao}, a barreira de dado privado é um comando do núcleo: ork privado varrer procura caminho de home, e-mail fora da lista permitida, hostname no formato de máquina e os termos da lista local, que fica fora do git. As exceções em orkastery.privado.json exigem padrão e valor exato, sem curinga, com caminho apenas como filtro e motivo obrigatório. O relatório diz arquivo, linha, coluna e padrão, nunca o valor, e mascara o nome do arquivo com achado.",
              "Com a policy dado_privado no manifesto, o ork verify varre o diff da thread e reprova com policy.violation em block, e o ork ci prepare recusa gerar o bundle com achado. No CI do núcleo, a varredura é um passo do job documentacao. A lista local só é lida como arquivo comum do usuário atual, sem link e com permissão 0600; ausente, como no CI, só os padrões genéricos rodam, e a saída diz isso.",
              "A DSN da memória ganha uma fonte fora do ambiente dos agentes: memory.database_url_file aponta para ~/.orkastery/segredos/<nome>, e o manifesto não escolhe arquivo fora dessa pasta. As duas fontes são exclusivas, então o ork nunca cai de uma para a outra. Antes de abrir, o núcleo confere pelo lstat cada pasta entre a casa e a pasta de segredos, abre com O_NOFOLLOW e exige arquivo comum, do usuário que roda o ork, com permissão 0600 ou 0400 exata, até 4 KiB e uma linha só com a DSN.",
              "A resposta do processo filho que repita a DSN ou a senha dela é recusada inteira, com memory.transport.secret, brain.transport.secret ou brain.migration.secret, sem o valor. O limite é honesto e está dito: o agente roda com o mesmo usuário do dono e pode ler um arquivo 0600 dele. O ganho é a senha fora de env, da transcrição e do contexto do modelo; isolamento forte pede outro usuário ou um intermediário."
            ],
            "code": "ork privado varrer\nork privado varrer --base origin/main\nork memory status"
          },
          {
            "id": "pendentes",
            "title": "O que segue com o dono",
            "paragraphs": [
              "A auditoria deixou seis itens como pendentes do dono, porque fechá-los mudava comportamento aceito ou documentado. Os cinco primeiros, P1 a P5, ganharam as regras de procedência desta página, mescladas por decisão do dono. A P6 segue pendente.",
              "Na mesma lista, ficam registrados, com risco baixo:"
            ],
            "items": [
              "ork retry run --dry-run, na ação corrigir-dirigido, reexecuta claims e verify: são comandos declarados, mas contra a semântica do --dry-run.",
              "O perfil do runtime gravado no ledger escolhe o CLAUDE_CONFIG_DIR e o CODEX_HOME de comandos de consulta.",
              "A P6: o memory.cli do manifesto pode ser qualquer nome do PATH ou caminho absoluto, inclusive dentro do clone, e o memory.database_url_env nomeia qualquer variável de ambiente. O valor vai ao executável do Brain em toda consulta, e a fonte de arquivo memory.database_url_file só aceita a pasta de segredos do ork, para não alargar a classe.",
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
              "Sandbox posture (P1): a runtime.sandbox that gives the agent full access (danger-full-access) only dispatches through Codex after ork setup sandbox confirmar <postura>, stored in .orkastery/private/postura-local.json (0600, outside git, for this checkout only). Without it, ork phase run and ork retry run refuse with runtime.sandbox-nao-confirmado, and ork doctor reports it.",
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
            "id": "dado-privado",
            "title": "Private data barrier and DSN outside the environment",
            "paragraphs": [
              "In version {versao}, the private data barrier is a core command: ork privado varrer looks for home paths, email outside the allowed list, hostnames in machine format and the terms of the local list, which stays outside git. Exceptions in orkastery.privado.json require an exact pattern and value, without wildcards, with the path only as a filter and a required reason. The report states file, line, column and pattern, never the value, and masks the name of a file with a finding.",
              "With the dado_privado policy in the manifest, ork verify scans the thread diff and fails with policy.violation in block, and ork ci prepare refuses to write the bundle when there is a finding. In the core CI, the scan is a step of the documentacao job. The local list is only read as a regular file of the current user, without a link and with 0600 permissions; when absent, as in CI, only the generic patterns run, and the output says so.",
              "The memory DSN gains a source outside the agents’ environment: memory.database_url_file points to ~/.orkastery/segredos/<nome>, and the manifest cannot choose a file outside that folder. The two sources are exclusive, so ork never falls back from one to the other. Before opening, it checks with lstat every folder between the home and the secrets folder, opens with O_NOFOLLOW and requires a regular file of the user running ork, with exact 0600 or 0400 permissions, up to 4 KiB and a single line with the DSN.",
              "A child process response that repeats the DSN or its password is refused whole, with memory.transport.secret, brain.transport.secret or brain.migration.secret, without the value. The limit is stated honestly: the agent runs as the owner’s user and can read a 0600 file of theirs. The gain is the password out of env, the transcript and the model context; strong isolation needs another user or an intermediary."
            ],
            "code": "ork privado varrer\nork privado varrer --base origin/main\nork memory status"
          },
          {
            "id": "pendentes",
            "title": "What remains with the owner",
            "paragraphs": [
              "The audit left six items pending with the owner, because closing them changed accepted or documented behavior. The first five, P1 to P5, got the provenance rules on this page, merged by the owner’s decision. P6 remains pending.",
              "On the same list, these remain recorded, with low risk:"
            ],
            "items": [
              "ork retry run --dry-run, in the corrigir-dirigido action, re-runs claims and verify: they are declared commands, but this goes against the meaning of --dry-run.",
              "The runtime profile recorded in the ledger chooses the CLAUDE_CONFIG_DIR and the CODEX_HOME of query commands.",
              "P6: the manifest’s memory.cli can be any name on PATH or an absolute path, including inside the clone, and memory.database_url_env names any environment variable. The value reaches the Brain executable on every query, and the file source memory.database_url_file only accepts ork’s secrets folder, so the class does not widen.",
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
      }
    }
  }
];
