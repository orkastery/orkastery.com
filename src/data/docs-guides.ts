export default [
  {
    "slug": "modos",
    "group": "guides",
    "sources": [
      "docs/guias/modos.md"
    ],
    "translations": {
      "pt": {
        "title": "Escolha um modo de condução",
        "description": "Compare os pontos de HITL e os limites de cada modo.",
        "sections": [
          {
            "id": "escolher",
            "title": "Escolha pela decisão necessária",
            "paragraphs": [
              "#Classic tem três pontos de HITL: objetivo, plano e evidências. #Maestro concentra o ponto de HITL nas premissas e no plano. #Auto percorre o ciclo completo sem ponto de HITL previsto. Em todos eles, bloqueios e escalações continuam ativos."
            ],
            "code": "ork modos\nork modos --do-pedido \"revisar a documentação #Maestro\""
          },
          {
            "id": "fast",
            "title": "O limite de #Fast",
            "paragraphs": [
              "#Fast executa somente GO, com prova proporcional ao pedido pequeno. Não concede push automático e não permite alterar contratos públicos protegidos. Uma mudança na matriz de modos, nos schemas ou em contratos de integração precisa de um modo de ciclo completo."
            ]
          },
          {
            "id": "validar",
            "title": "Confira o manifesto",
            "paragraphs": [
              "Sem tag, vale conduction.default_mode. O núcleo valida a escolha contra conduction.allowed_modes. Tags não são autorização para ignorar o escopo explícito do dono."
            ]
          },
          {
            "id": "cota",
            "title": "A troca de perfil por cota",
            "paragraphs": [
              "Com a troca por cota ligada, o padrão, esgotamento de cota, crédito ou limite do plano marca o perfil e passa para o próximo perfil ativo do mesmo runtime. O prompt que segue depende do que a sessão produziu: sem produção, vai o prompt original; com produção, vai um prompt de retomada com o checkpoint. Sem perfil ativo, o núcleo segue para o runtime de fallback do bloco e depois para a fila durável. Rate limit comum de curta janela nunca troca de perfil: espera a janela na fila.",
              "O checkpoint leva fase, HEAD, estado da worktree, claims e rodada, preserva o prompt e o SHA-256 originais e manda continuar sem repetir GOAL nem PLAN. A produção parcial não recebe o prompt original sobre a worktree alterada; sem retomada segura, a sessão vira human.pending. Em #Classic o bloco espera a resposta ao ork gate request; em #Maestro e #Auto ele troca sozinho e grava runtime_profile_rotated com quem decidiu, a evidência e a razão. Estourar retry.max_tentativas interrompe qualquer modo, inclusive o #Auto, e perfil não é eixo de independência do CHECK."
            ],
            "code": "ork accounts\nork setup <modo>"
          },
          {
            "id": "so-codex",
            "title": "Só com o Codex",
            "paragraphs": [
              "O setup padrão despacha os blocos pelo claude-bg. Para usar só o Codex, passe cada bloco dos modos permitidos para ele; ork setup <modo> lista os blocos. ork doctor reprova a falta do claude só enquanto algum bloco de modo permitido despachar pelo claude-bg; um fallback que cai nele só gera aviso."
            ],
            "code": "ork setup classic\nork setup classic --bloco 1 --runtime codex --model <modelo>"
          },
          {
            "id": "worktree",
            "title": "A worktree da thread",
            "paragraphs": [
              "O modo diz quantos pontos de HITL a thread tem; a worktree diz onde ela escreve. Com worktree.por_thread: true, o valor que o ork init grava, ork thread new cria a worktree e a branch ork/<slug> em qualquer modo, sem flag, e ork ship entrega essa branch. Com a chave false ou ausente, a worktree só nasce com --worktree auto ou com um ciclo que a exige.",
              "--worktree <DIR> reusa um diretório existente. --sem-worktree cria a thread na raiz do projeto: na branch base, ork ship é barrado por push_direto_na_base: block, o padrão do ork init, e antes do GO ork worktree ensure <thread> ainda cria a worktree. --dry-run mostra a worktree e a branch que seriam criadas, ou por que a criação seria recusada. Os ciclos greenfield, merge-branch e feature-xl-faseada exigem worktree e recusam --sem-worktree. Num repositório sem commit, a thread nasce na raiz, com aviso."
            ],
            "code": "ork thread new \"corrigir o filtro\" --modo classic --dry-run\nork thread new \"corrigir o filtro\" --modo classic --sem-worktree\nork worktree ensure <thread>"
          }
        ]
      },
      "en": {
        "title": "Choose a conduction mode",
        "description": "Compare the HITL points and the limits of each mode.",
        "sections": [
          {
            "id": "escolher",
            "title": "Choose by the decision required",
            "paragraphs": [
              " #Classic has three HITL points: goal, plan and evidence. #Maestro concentrates its HITL point on assumptions and the plan. #Auto runs the full cycle without a scheduled HITL point. Blocking conditions and escalations remain active in all three."
            ],
            "code": "ork modos\nork modos --do-pedido \"revisar a documentação #Maestro\""
          },
          {
            "id": "fast",
            "title": "The limits of #Fast",
            "paragraphs": [
              " #Fast runs only GO, with evidence proportionate to a small request. It does not grant automatic push permission or allow changes to protected public contracts. Changes to the mode matrix, schemas or integration contracts require a full-cycle mode."
            ]
          },
          {
            "id": "validar",
            "title": "Check the manifest",
            "paragraphs": [
              "Without a tag, conduction.default_mode applies. The core checks the choice against conduction.allowed_modes. A tag does not authorize ignoring the owner’s explicit scope."
            ]
          },
          {
            "id": "cota",
            "title": "Profile rotation on quota",
            "paragraphs": [
              "With quota rotation on, the default, an exhausted quota, credit or plan limit marks the profile and moves to the next active profile of the same runtime. The prompt that follows depends on what the session produced: with no output, the original prompt goes; with output, a resume prompt with the checkpoint goes. Without an active profile, the core moves to the block’s fallback runtime and then to the durable queue. An ordinary short-window rate limit never rotates profiles: it waits for the window in the queue.",
              "The checkpoint carries the phase, HEAD, worktree state, claims and round, preserves the original prompt and SHA-256 and says to continue without repeating GOAL or PLAN. Partial output does not receive the original prompt over the changed worktree; without a safe resume, the session becomes human.pending. In #Classic the block waits for the answer to ork gate request; in #Maestro and #Auto it rotates on its own and records runtime_profile_rotated with who decided, the evidence and the reason. Exceeding retry.max_tentativas stops any mode, including #Auto, and a profile is not an axis of CHECK independence."
            ],
            "code": "ork accounts\nork setup <mode>"
          },
          {
            "id": "so-codex",
            "title": "Codex only",
            "paragraphs": [
              "The default setup dispatches blocks through claude-bg. To use only Codex, move every block of the allowed modes to it; ork setup <mode> lists the blocks. ork doctor fails on a missing claude binary only while a block of an allowed mode still dispatches through claude-bg; a fallback that lands on it only produces a warning."
            ],
            "code": "ork setup classic\nork setup classic --bloco 1 --runtime codex --model <modelo>"
          },
          {
            "id": "worktree",
            "title": "The thread worktree",
            "paragraphs": [
              "The mode decides how many HITL points a thread has; the worktree decides where it writes. With worktree.por_thread: true, the value written by ork init, ork thread new creates the worktree and the ork/<slug> branch in any mode, without a flag, and ork ship delivers that branch. With the key set to false or missing, the worktree is only created with --worktree auto or by a cycle that requires it.",
              "--worktree <DIR> reuses an existing directory. --sem-worktree creates the thread at the project root: on the base branch, ork ship is blocked by push_direto_na_base: block, the ork init default, and before GO ork worktree ensure <thread> can still create the worktree. --dry-run shows the worktree and branch that would be created, or why creation would be refused. The greenfield, merge-branch and feature-xl-faseada cycles require a worktree and refuse --sem-worktree. In a repository without commits, the thread starts at the root with a warning."
            ],
            "code": "ork thread new \"corrigir o filtro\" --modo classic --dry-run\nork thread new \"corrigir o filtro\" --modo classic --sem-worktree\nork worktree ensure <thread>"
          }
        ]
      }
    }
  },
  {
    "slug": "onboarding",
    "group": "guides",
    "sources": [
      "docs/guias/onboarding.md"
    ],
    "translations": {
      "pt": {
        "title": "Configure o projeto",
        "description": "Registre objetivos, produtos, integrações e preferências públicas.",
        "sections": [
          {
            "id": "pauta",
            "title": "Retome a pauta existente",
            "paragraphs": [
              "Consulte a pauta antes de perguntar novamente. As respostas cobrem condução, credenciais por nome de variável, bancos, memória, produtos, topologia, arquitetura, skills e auditoria. Um projeto já respondido pode ser retomado sem repetir toda a entrevista."
            ],
            "code": "ork onboarding\nork onboarding show --json"
          },
          {
            "id": "respostas",
            "title": "Registre informação pública",
            "paragraphs": [
              "Use ork onboarding set para registrar uma etapa com autoria. Revise a saída antes de publicar a entrevista na memória. DSNs, tokens e senhas não pertencem às respostas públicas; a configuração aponta para variáveis protegidas. Sem --por, a autoria registrada é owner, o que não comprova a resposta de uma pessoa. Os valores secretos ficam no ambiente do processo ou no cofre do host (no Hermes, ~/.hermes/.env); o onboarding guarda só o nome da variável e nunca lê o valor."
            ],
            "code": "ork onboarding set produtos --conteudo '{\"produtos\":[\"meu-produto\"]}' --por operador"
          },
          {
            "id": "experiencia",
            "title": "Preferências da conversa",
            "paragraphs": [
              "A etapa maestro também oferece ativar o pacote de experiência com os valores detectados, configurá-lo ou desativá-lo. Uma resposta com o objeto owner grava idioma, fuso, profundidade e ativação no manifesto, preservando as outras seções e respostas. Consultar as preferências não cria resposta, autoria nem aprovação. ork doctor avisa quando o fuso da entrevista diverge do manifesto; com owner.timezone na mesma resposta maestro, o aviso compara esse valor, e o campo fuso legado só vale sem ele."
            ],
            "code": "ork experiencia show --json\nork onboarding set maestro --conteudo '{\"owner\":{\"language\":\"pt-BR\",\"timezone\":\"UTC\",\"depth\":\"curta\",\"experience\":true}}' --por equipe"
          },
          {
            "id": "runtimes",
            "title": "Runtimes de despacho",
            "paragraphs": [
              "O onboarding não escolhe runtime: o padrão do projeto é o runtime.adapter do manifesto, e o setup de cada bloco troca por bloco, com ork setup <modo> --bloco N --runtime R --model M. Cada runtime autentica pela própria conta: ork accounts add <id> --runtime R --dir D roda o login do próprio CLI do runtime, e o núcleo nunca lê a credencial.",
              "O claude-bg e o Codex servem de padrão do projeto, de bloco e de fallback, cada um pela assinatura do próprio fornecedor. O Grok Build entra como runtime de bloco e de fallback, sempre com o modelo escolhido pelo dono, e nunca como padrão do projeto: ork accounts add <id> --runtime grok --dir D faz o login pela assinatura do Grok (com --device-auth, pelo código do dispositivo), e o processo filho roda sem XAI_API_KEY.",
              "Na versão {versao}, o Grok Build ainda não tem homologação real. Seguem abertos, na RM-067, o formato da cota esgotada (até o ensaio real, a troca automática de conta nunca age nele), a conferência do login sem ler a credencial e o próprio ensaio real. O servidor MCP do núcleo roda fora do sandbox da sessão do Grok Build, que, no piso workspace, grava pelo núcleo."
            ]
          }
        ]
      },
      "en": {
        "title": "Configure your project",
        "description": "Record goals, products, integrations and public preferences.",
        "sections": [
          {
            "id": "pauta",
            "title": "Resume the existing interview",
            "paragraphs": [
              "Read the interview state before asking again. Answers cover conduction, credentials by variable name, databases, memory, products, topology, architecture, skills and auditing. An already configured project can resume without repeating the interview."
            ],
            "code": "ork onboarding\nork onboarding show --json"
          },
          {
            "id": "respostas",
            "title": "Record public information",
            "paragraphs": [
              "Use ork onboarding set to record a stage with attribution. Review the output before publishing the interview to memory. DSNs, tokens and passwords do not belong in public answers; configuration refers to protected variables. Without --por, the recorded author is owner, which does not prove that a person answered. Secret values live in the process environment or in the host vault (in Hermes, ~/.hermes/.env); onboarding stores only the variable name and never reads the value."
            ],
            "code": "ork onboarding set produtos --conteudo '{\"produtos\":[\"meu-produto\"]}' --por operador"
          },
          {
            "id": "experiencia",
            "title": "Conversation preferences",
            "paragraphs": [
              "The maestro stage also offers to activate the experience pack with detected values, configure it or turn it off. An answer with the owner object stores language, timezone, depth and activation in the manifest, preserving other sections and answers. Reading preferences creates no answer, authorship or approval. ork doctor warns when the interview time zone differs from the manifest; with owner.timezone in the same maestro answer, the warning compares that value, and the legacy fuso field applies only without it."
            ],
            "code": "ork experiencia show --json\nork onboarding set maestro --conteudo '{\"owner\":{\"language\":\"en-US\",\"timezone\":\"UTC\",\"depth\":\"curta\",\"experience\":true}}' --por equipe"
          },
          {
            "id": "runtimes",
            "title": "Dispatch runtimes",
            "paragraphs": [
              "Onboarding does not choose a runtime: the project default is the manifest’s runtime.adapter, and each block’s setup switches it per block, with ork setup <mode> --bloco N --runtime R --model M. Each runtime authenticates with its own account: ork accounts add <id> --runtime R --dir D runs the runtime CLI’s own login, and the core never reads the credential.",
              "claude-bg and Codex serve as the project default, a block runtime and a fallback, each through its vendor’s subscription. Grok Build comes in as a block runtime and a fallback, always with the model the owner chose, and never as the project default: ork accounts add <id> --runtime grok --dir D logs in with the Grok subscription (with --device-auth, through a device code), and the child process runs without XAI_API_KEY.",
              "In version {versao}, Grok Build has no live validation yet. Still open in RM-067: the format of an exhausted quota (until the live trial, automatic account switching never acts on it), checking the login without reading the credential, and the live trial itself. The core’s MCP server runs outside the sandbox of the Grok Build session, which, at the workspace floor, writes through the core."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "experiencia",
    "group": "guides",
    "sources": [
      "docs/guias/orchestration-experience.md",
      "docs/guias/orchestration-experience.pt-BR.md"
    ],
    "translations": {
      "pt": {
        "title": "Experiência de orquestração",
        "description": "Defina idioma, fuso e profundidade da conversa e instale ou remova o pacote em cada host.",
        "sections": [
          {
            "id": "configurar",
            "title": "Configure as preferências",
            "paragraphs": [
              "O pacote orienta como o agente conversa ao conduzir o projeto. Doze regras guiam mensagens, decisões, evidências, documentação, coordenação e entrega. Gates, permissões e identidade humana continuam no núcleo.",
              "owner.language recebe um locale BCP-47; owner.timezone, um fuso IANA; owner.depth, curta ou detalhada; owner.experience, true ou false. Sem valor, valem o locale do sistema (com C, POSIX ou sem locale, pt-BR, a língua da CLI), o fuso resolvido pelo núcleo, curta e true. Locales portugueses usam a variante pt-BR das skills; os demais usam a inglesa e mantêm o idioma de resposta configurado. Entrada inválida é recusada antes de gravar; valor inválido editado à mão gera aviso e vale o padrão."
            ],
            "code": "ork onboarding\nork experiencia show --json"
          },
          {
            "id": "instalar",
            "title": "Instale em cada host",
            "paragraphs": [
              "ork adapter install grava o catálogo e um bloco próprio em CLAUDE.md, no Claude Code, ou em AGENTS.md, no Codex; o Hermes recebe as duas variantes ao lado da skill existente. O bloco aponta o catálogo por caminho relativo ao projeto, para valer em outro clone, e preserva o bloco do ork init e o conteúdo externo. Num clone sem recibo, um bloco igual ao gerado é adotado sem duplicar. --dir troca a pasta-base do host (.claude no Claude Code, .agents no Codex): o catálogo vai para <dir>/plugins/orkastery ou <dir>/skills/orkastery, e o bloco continua na raiz do projeto. Catálogo fora do projeto pula o bloco com aviso.",
              "Copiar arquivos não comprova descoberta nativa nem uso pelo modelo: confira a preferência efetiva no chat do host. O Claude Code também exige a ativação do plugin indicada pelo instalador, e outra worktree precisa da própria instalação. O OpenClaw ainda não distribui essas skills."
            ],
            "code": "ork adapter install codex --dry-run\nork adapter install codex"
          },
          {
            "id": "desativar",
            "title": "Desative ou remova",
            "paragraphs": [
              "Com owner.experience false, a reinstalação tira o bloco gerenciado; repita ork adapter install em cada host com bloco. O Hermes respeita a preferência pela entrada da skill. O ork experiencia uninstall tira só o bloco de codex ou claude-code, preserva o adaptador e não muda a preferência global. Sem mudança externa, a remoção restaura os bytes anteriores.",
              "Bloco editado ou duplicado, recibo incompatível ou arquivo de instruções por link fazem o ork adapter install pular só o pacote, com aviso, e o ork experiencia uninstall recusar sem escrever. Corrija o arquivo à mão; não apague o recibo para forçar a instalação."
            ],
            "code": "ork onboarding set maestro --conteudo '{\"owner\":{\"experience\":false}}' --por equipe\nork adapter install codex\nork experiencia uninstall codex --dry-run"
          },
          {
            "id": "coordenar",
            "title": "Coordene antes de assumir um item",
            "paragraphs": [
              "Consulte reservas e fábrica antes de assumir trabalho. O dry-run do ork thread new não reserva; sem ele, --roadmap usa a reserva do núcleo, e RM-NNN apenas no nome gera aviso sem associar o item.",
              "No MCP, ork_roadmap_reservas e ork_fabrica usam o projeto fixado pelo servidor e respondem atualizado, desatualizado ou indisponivel. Indisponibilidade traz dados nulos, nunca uma falsa lista vazia. As consultas não reservam, não publicam, não fazem push nem assinam gates."
            ],
            "code": "ork roadmap reservas\nork fabrica\nork thread new \"RM-012 exemplo de melhoria\" --modo auto --roadmap RM-012 --dry-run"
          },
          {
            "id": "limites",
            "title": "Evidência e limites",
            "paragraphs": [
              "Testes focados cobrem preferências, blocos, clone sem recibo, conflitos, adaptadores e contratos MCP. Os evals das skills são estáticos e não comprovam o comportamento real de um modelo. Um ensaio do repositório do produto instala o pacote local em prefixo e HOME temporários e confere instalação, reinstalação, opt-out, remoção e restauração. O pacote foi publicado no @orkastery/cli 0.5.0. Commit local e teste local não são entrega."
            ]
          }
        ]
      },
      "en": {
        "title": "Orchestration experience",
        "description": "Set the conversation’s language, timezone and depth, and install or remove the pack in each host.",
        "sections": [
          {
            "id": "configurar",
            "title": "Configure preferences",
            "paragraphs": [
              "The pack shapes how the agent talks while running your project. Twelve rules guide messages, decisions, evidence, documentation, coordination and delivery. Gates, permissions and human identity remain in the core.",
              "owner.language takes a BCP-47 locale; owner.timezone, an IANA timezone; owner.depth, curta (short) or detalhada (detailed); owner.experience, true or false. When a value is absent, the system locale (with C, POSIX or no locale, pt-BR, the CLI language), the core’s timezone resolution, curta and true apply. Portuguese locales select the pt-BR skill variant; other locales select English while keeping the configured response language. Invalid input is rejected before anything is stored; an invalid value edited by hand raises a warning and falls back to the default."
            ],
            "code": "ork onboarding\nork experiencia show --json"
          },
          {
            "id": "instalar",
            "title": "Install in each host",
            "paragraphs": [
              "ork adapter install writes the catalog and a dedicated block to CLAUDE.md for Claude Code, or to AGENTS.md for Codex; Hermes receives both variants next to its existing skill. The block points to the catalog by a path relative to the project, so it works in another clone, and keeps the ork init block and outside content intact. In a clone without a receipt, a block identical to the generated one is adopted without duplication. --dir replaces the host base folder (.claude for Claude Code, .agents for Codex): the catalog goes to <dir>/plugins/orkastery or <dir>/skills/orkastery, and the block stays in the project root. A catalog outside the project skips the block with a warning.",
              "File copies do not prove native discovery or model behavior: check the effective preferences in the host chat. Claude Code also needs the plugin activation reported by the installer, and another worktree needs its own installation. OpenClaw does not distribute these skills yet."
            ],
            "code": "ork adapter install codex --dry-run\nork adapter install codex"
          },
          {
            "id": "desativar",
            "title": "Opt out or remove",
            "paragraphs": [
              "With owner.experience set to false, reinstalling removes the managed block; repeat ork adapter install for every host with a block. Hermes honors the preference through its skill entry. ork experiencia uninstall removes only the codex or claude-code block, keeps the adapter and leaves the global preference unchanged. Without outside changes, removal restores the previous bytes.",
              "A modified or duplicate block, an incompatible receipt or a linked instruction file makes ork adapter install skip only the pack, with a warning, and makes ork experiencia uninstall refuse without writing. Fix the file by hand; do not delete the receipt to force installation."
            ],
            "code": "ork onboarding set maestro --conteudo '{\"owner\":{\"experience\":false}}' --por equipe\nork adapter install codex\nork experiencia uninstall codex --dry-run"
          },
          {
            "id": "coordenar",
            "title": "Coordinate before taking an item",
            "paragraphs": [
              "Check reservations and the factory before taking work. A dry run of ork thread new does not reserve; without it, --roadmap uses core reservation, and an RM-NNN in the name alone raises a warning without linking the item.",
              "Over MCP, ork_roadmap_reservas and ork_fabrica use the server’s pinned project and report atualizado (current), desatualizado (stale) or indisponivel (unavailable). Unavailable results carry null data, never a misleading empty list. These queries cannot reserve, publish, push or sign gates."
            ],
            "code": "ork roadmap reservas\nork fabrica\nork thread new \"RM-012 example improvement\" --modo auto --roadmap RM-012 --dry-run"
          },
          {
            "id": "limites",
            "title": "Evidence and limits",
            "paragraphs": [
              "Focused tests cover preferences, blocks, fresh clones without a receipt, conflicts, adapters and MCP contracts. Skill evals are static and do not prove real model behavior. A rehearsal from the product repository installs the local package into a temporary prefix and HOME and checks installation, reinstallation, opt-out, removal and restoration. The pack was released in @orkastery/cli 0.5.0. A local commit or local test is not a delivery."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "claude-code",
    "group": "guides",
    "sources": [
      "docs/roadmap/RM-059-conducao-dentro-do-claude-code.md",
      "docs/roadmap/evidencias/mods-dialogo-nativo.md",
      "docs/roadmap/evidencias/mods-sessao-de-fase.md",
      "docs/guias/conducao-pela-sentinela.md"
    ],
    "translations": {
      "pt": {
        "title": "Conduza de dentro do Claude Code",
        "description": "Os mods do Orkastery no Claude Code: o que já existe, como carregar e o que ainda é plano.",
        "sections": [
          {
            "id": "o-que-existe",
            "title": "O que já existe",
            "paragraphs": [
              "A RM-059 quer levar a condução da fábrica para dentro da sessão do Claude Code em que você já trabalha, por mods: plugins de function hooks do Claude Code, que rodam dentro do cliente, reagem a eventos da sessão e desenham painéis, faixas e avisos. Na versão {versao} existem os dez mods do plano, além da ponte:"
            ],
            "items": [
              "A ponte (ork-ponte), a base dos outros mods: dá a cada um o papel da sessão (dono na sessão de quem conduz, fase nas sessões de fase, ou dormente), o retrato do núcleo pelo ork_maestro, a faixa acima do prompt e o registro do que um mod mostrou ao dono. Ela tem os papéis dono e fase.",
              "A Torre de Controle (ork-torre): na sessão do dono, um painel com cada thread aberta numa linha, com o trilho das seis fases, o modo, quem conduz e desde quando, o bloqueio tipado numa frase curta, os pedidos ao dono e a ação que o estado da thread pede. O comando /torre abre o painel, e apertar a linha abre o detalhe da thread. Ela depende da ponte e só tem o papel dono.",
              "O Clima de Cota (ork-clima): na sessão do dono, lê as janelas de limite da conta a cada medição do motor (session.measure), guarda a série e prevê quando cada janela acaba no ritmo atual. Só no alerta, a faixa da ponte diz qual retomada da fila não cabe antes de a janela acabar, quanto dela já foi usado, quando ela acaba e quando renova; o comando /clima mostra cada janela, a fila de retomada, as threads abertas paradas por cota e as contas do registro do ork accounts esgotamentos. Ele só lê e avisa: trocar de conta, de runtime ou de modelo fica com o núcleo e com o dono. Também depende da ponte e só tem o papel dono.",
              "O Freio de Lote (ork-freio), o primeiro mod de papel fase: na sessão de fase, depois de cada lote de ferramentas, ele acha os arquivos que o lote mexeu (pelos caminhos das edições e pela diferença do git status, que pega também a edição feita por Bash) e as claims da thread que os citam, pede ao núcleo, em segundo plano, a conferência delas com ork claims conferir, no sandbox do verify, e devolve no lote seguinte o que quebrou: o id da claim, o comando e o fim da saída. Também avisa quando o lote mexeu fora dos touch_paths do plano. Ele vai sozinho às sessões de fase pelo despacho, com o adaptador instalado (ork adapter install claude-code), e precisa de um ork com ork claims conferir no PATH da sessão: sem ele, avisa uma vez que a conferência está indisponível e segue. Também depende da ponte.",
              "O Radar de Colisão (ork-radar): na sessão do dono, a cada 10 min e no comando /radar, calcula o merge de cada thread aberta contra a origin/main local e entre as threads, antes do SHIP, sem worktree e sem gravar objeto no repositório (por git merge-tree --write-tree num temporário). O painel mostra o mapa de calor, os arquivos em conflito, o lease que cobre cada um e, como texto, o comando ork worktree sync <thread> --dry-run que resolve; a colisão nova vira uma linha na faixa da ponte. O fetch continua com o núcleo. Ele só lê, depende da ponte e só tem o papel dono.",
              "A Mesa do Dono (ork-mesa): na sessão do dono, junta num painel o que espera por você. O comando /mesa abre o lote de até cinco perguntas, cada uma com a alternativa recomendada na frente, o porquê e a consequência das outras; as decisões que a fábrica tomou por você na semana, com como mudar e o custo de reverter agora e depois; e as paradas, só para leitura. O botão Decidir só pede ao núcleo o diálogo nativo do host (ork_request_decision, com o threadId e o pedidoId), e o código e a letra para o Telegram ficam sempre à vista; a prova de que o diálogo abre quando o pedido vem de um mod ainda está pendente do dono. A Mesa só decide por você pela decisão autônoma do núcleo (ork_decision_record), e só quando o pedido declara que segue a recomendada no prazo e passa nas quatro condições do núcleo; hoje o núcleo não marca nenhum pedido assim, então ela não decide nada sozinha. Nunca responde um pedido. Depende da ponte e só tem o papel dono.",
              "A Sentinela do Condutor (ork-sentinela): na sessão do dono, mantém pelo núcleo a presença dela nesta máquina, com uma batida a cada 60 s, e a tira quando a sessão acaba; enquanto a presença vale, o condutor externo cede o despacho. Quando um ledger de thread muda, e a cada batida, ela relê o passo do condutor em cada thread aberta e despacha a fase seguinte das threads #Auto que o núcleo manda despachar, uma vez por turno e só pelo ork phase run; a retomada só roda o ork retry run quando o ork retry plan é automático. A cada 5 min, o que só o dono resolve no ork pulse vira notificação do sistema, com o próximo passo do núcleo, uma vez por texto, e entra no registro da ponte, para o Telegram não repetir. A faixa da ponte mostra as threads andando e as paradas, e o comando /sentinela mostra o passo de cada thread e o diário do que ela despachou, cedeu e avisou, e também pausa e retoma a Sentinela. Ela depende da ponte e só tem o papel dono.",
              "O Portão de Tarefas (ork-portao), o segundo mod de papel fase: na sessão de fase do GO, faz do quadro de tarefas do Claude Code o quadro do plano. A tarefa só entra apontando uma tarefa do plano com touch_paths e verify, e só fecha com a conferência do núcleo aprovada (ork claims conferir --tarefa, no sandbox do verify), nunca com o verify rodado pelo mod; plano sem tarefa assim não ganha portão. Com runtime.agent_teams ligado no manifesto, desligado por padrão, o teammate ocioso recebe a próxima tarefa cuja região está livre, dentro dos tetos do dono, e o Portão não toma lease. Depende da ponte.",
              "A Pista de Entrega (ork-pista): na sessão do dono, o comando /pista abre uma pista por entrega, do CHECK verde ao merge, com as oito etapas que o núcleo lê (CHECK, verify, bundle, branch, PR, CI, conflito e entrega), o texto do núcleo em cada uma que falta e o próximo passo com o comando dele. Só mostra botão para a ação que o núcleo declara disponível: publicar a branch pelo ork ship publicar, só em #Auto e #Maestro, e registrar a entrega pelo ork ship registrar-pr; fora desses modos, só o comando, para você rodar. Nunca chama o Git nem a CLI do GitHub. Depende da ponte e só tem o papel dono.",
              "O Ritual do MASTER (ork-ritual): na sessão do dono, o comando /nota mostra as entregas dos últimos 7 dias que esperam a sua nota, inclusive as aceitas por omissão, com a prova de cada uma: o índice derivado do ledger, o POSTMORTEM e as claims. O botão Dar a nota pede ao núcleo o formulário nativo do host, com a nota de 0 a 5 e o porquê, e quem grava o MASTER, com recibo, é o núcleo; sem o diálogo, o código para o Telegram fica à vista. Depende da ponte e só tem o papel dono.",
              "O Mensageiro de Sessões (ork-mensageiro), de papéis dono e fase: a resposta que você dá pelo diálogo nativo da sua sessão chega à sessão de fase claude-bg que parou esperando por ela, sem você precisar entrar nela. O núcleo prende o pedido ao turno que parou e confere a mensagem nas duas pontas, e na sessão de fase só entra o que ele confirma. A resposta informa a sessão, mas não autoriza o que só você aprova, como um gate ou um push, e pelo Telegram ela não sai. Depende da ponte."
            ]
          },
          {
            "id": "carregar",
            "title": "Carregue na sua sessão",
            "paragraphs": [
              "A Torre, o Clima, o Radar, a Mesa, a Sentinela, a Pista e o Ritual só ligam na sessão do dono, e o Mensageiro liga nela e nas sessões de fase (o Freio e o Portão, de papel fase, chegam às sessões de fase pelo despacho), que a ponte reconhece por duas coisas: o orkastery.yaml na raiz e o servidor MCP orkastery do projeto conectado. Os comandos abaixo vêm em três grupos: o servidor MCP do projeto; o adaptador do Claude Code, que deixa a cópia de cada mod em .claude/plugins/orkastery/mods/<mod>, e a carga deles na sessão por --plugin-dir; e, sem o adaptador local, a instalação pelo marketplace do repositório, no escopo do projeto. Os comandos da Sentinela estão na seção seguinte.",
              "A API de mods pede o Claude Code 2.1.287 ou mais novo. No CI, o job mods instala o Claude Code 2.1.296, valida e testa cada mod e procura no binário cada evento que eles usam; nessa busca, os builds 2.1.288 e 2.1.289 reprovam, sem ui.notify.",
              "Os dois marketplaces se chamam orkastery, e o local, registrado a partir de .claude/plugins/orkastery na ativação do adaptador, não lista os mods. Não troque um pelo outro num projeto que usa o plugin do adaptador: remover um marketplace desinstala os plugins que vieram dele, e o plugin do marketplace do repositório não traz o guard PreToolUse nem o MCP do adaptador."
            ],
            "code": "ork mcp install --project \"$PWD\" --host claude-code\n\nork adapter install claude-code\nclaude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-torre --plugin-dir .claude/plugins/orkastery/mods/ork-clima --plugin-dir .claude/plugins/orkastery/mods/ork-radar --plugin-dir .claude/plugins/orkastery/mods/ork-mesa --plugin-dir .claude/plugins/orkastery/mods/ork-pista --plugin-dir .claude/plugins/orkastery/mods/ork-ritual --plugin-dir .claude/plugins/orkastery/mods/ork-mensageiro\n\nclaude plugin marketplace add orkastery/orkastery\nclaude plugin install ork-ponte@orkastery --scope project\nclaude plugin install ork-torre@orkastery --scope project\nclaude plugin install ork-clima@orkastery --scope project\nclaude plugin install ork-radar@orkastery --scope project\nclaude plugin install ork-mesa@orkastery --scope project\nclaude plugin install ork-pista@orkastery --scope project\nclaude plugin install ork-ritual@orkastery --scope project\nclaude plugin install ork-mensageiro@orkastery --scope project"
          },
          {
            "id": "sentinela",
            "title": "Deixe a Sentinela despachar",
            "paragraphs": [
              "Com a sua sessão aberta no Claude Code e a Sentinela ligada e não pausada, é ela que despacha a fase seguinte das threads #Auto e faz o retry delas, e o condutor externo (por exemplo, um cron no gateway do Hermes) cede. Com a Sentinela pausada, ou com a sessão fechada (a presença vence 3 min depois da última batida), o condutor externo volta a conduzir. Na versão {versao}, o condutor externo do próprio ork é a batida da condução (ork conducao batida): ela lê a presença e cede o despacho e o retry enquanto a Sentinela conduz, menos a retomada da fase que parou por cota, que continua com a batida porque a conta da Sentinela também pode esgotar. Ela segue com o merge do PR verde, o registro da entrega e o MASTER por omissão, dentro da autorização durável do dono; com ela no cron, o script de fora deixa de ser necessário. A publicação da branch, o merge do PR verde e os avisos do Telegram ficam sempre com o condutor externo: a Sentinela não publica branch, não abre nem mergeia PR e não manda mensagem pelo Telegram.",
              "Ela usa os comandos de presença do núcleo, na versão {versao}, e carrega junto com a ponte, pela pasta do adaptador ou pelo marketplace do repositório, como no bloco abaixo. O script do condutor externo fica fora do repositório, e a mudança nele é sua: uma vez por rodada, antes do laço de despacho, ele lê o status da Sentinela com --json e, enquanto presenca.ativa for true, pula o despacho da fase seguinte e o ork retry run das threads #Auto. A publicação da branch que só espera push, o merge do PR verde e os avisos ao dono ficam como estão; sem presença viva, o condutor externo conduz como antes.",
              "Não há despacho duplicado, porque os dois condutores despacham só pelo núcleo: o ork phase run toma a condução da thread sob uma trava do kernel. Com dois pedidos no mesmo instante, um despacha e o outro sai sem sessão nova; com a thread já conduzida, o pedido sai 3, com conducao.em-andamento, e grava conducao_recusada; e o mesmo pedido de quem já conduz grava despacho_idempotente e devolve a sessão em andamento. A Sentinela ainda relê a condução logo antes de despachar, nunca usa ork conducao assumir e guarda o turno que já despachou. O despacho dela leva o canal do Claude Code e a sessão dela na correlação, e o phase_dispatch mostra de onde veio.",
              "A Sentinela não escolhe a fase: segue a ação que o núcleo dá a cada thread no status. No #Auto, depois de uma fase concluída, sai a fase seguinte à prova mais adiantada que a sessão do bloco deixou: o artefato da fase (goal.md, plan.md, check.md) gravado depois do despacho, o produto na branch, que mostra que houve GO, ou o ship_done e o master_done. Se o bloco já passou do CHECK, nada sai: a entrega fica com o condutor externo e com o dono. O CHECK que terminou sem exatamente um veredito é redespachado, e o despacho que falhou antes de abrir sessão vai ao ork retry plan. Pendência do dono (thread num ponto de HITL, pergunta aberta, escalação) segura qualquer passo, e, sem pedido guardado na criação da thread (ork thread new --pedido), a Sentinela não despacha e avisa.",
              "Recusa que passa (outro condutor, projeto sem vaga, pedido aberto, falha) não queima o turno: a Sentinela tenta de novo depois de 3 min, e a mesma recusa seguida dobra a espera até 30 min; só o despacho feito, ou o pedido repetido de quem já conduz, fica de vez. Se o seu condutor externo despacha pela última linha do ledger, ele pode repetir uma fase que a sessão do bloco já fez; ler a ação de cada thread no mesmo status evita isso.",
              "Para conferir, o status da Sentinela diz se ela está ligada nesta máquina e o passo de cada thread, o ork phase list <thread> mostra o despacho com o canal do Claude Code e, na sessão do dono, o /sentinela mostra o diário; as duas últimas linhas do bloco pausam e retomam a Sentinela."
            ],
            "code": "claude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-sentinela\nclaude plugin install ork-sentinela@orkastery --scope project\n\nork conducao sentinela status\nork phase list <thread>\n\n/sentinela\n/sentinela pausar\n/sentinela retomar"
          },
          {
            "id": "sessoes-de-fase",
            "title": "Nas sessões de fase",
            "paragraphs": [
              "O despacho claude-bg passa um --plugin-dir por mod de papel fase, depois do plugin do Orkastery, quando a pasta instalada do mod tem exatamente os arquivos do INSTALADO.json e a versão do Claude Code atende o mínimo do mod. Mod que pede versão mais nova fica de fora, com os que dependem dele, e o despacho segue; arquivo a mais, link ou declaração inválida recusa o despacho com runtime.context.installation. Hoje, a ponte, o Freio de Lote, o Portão de Tarefas e o Mensageiro de Sessões têm o papel fase. O papel fica no orkastery-mod.json do mod (ork.mod/v1): para tirar um mod das sessões de fase, mude o papel no catálogo e reinstale o adaptador.",
              "A prova da RM-059 mediu, no Claude Code 2.1.296, que um mod carregado por --plugin-dir numa sessão de fase recebe os eventos da sessão; o script core/scripts/prova-mods-sessao-de-fase.cjs refaz essa prova.",
              "A fundação dos mods traz também duas peças do núcleo. O ork claims conferir reexecuta, no sandbox do ork_verify e sem gravar recibo, só as claims pedidas (--claims) ou o verify de uma tarefa do plano (--tarefa); um teste que cria processo pode reprovar ali e passar no ork verify. O ork thread new --pedido guarda o pedido da thread em pedido.md, com o sha256, e o ork prompt render sem --pedido usa esse pedido."
            ]
          },
          {
            "id": "limites",
            "title": "O que nenhum mod faz",
            "paragraphs": [
              "Nenhum mod aprova gate, permissão, nota do MASTER, push ou tag pelo dono, nem fala como o dono. A regra mora em adapters/claude-code/mods/autoridade.json e tem duas guardas: node core/scripts/checar-mods.cjs reprova o mod pelo fonte, e a ponte recusa em tempo de execução. O Freio nunca roda o comando de uma claim, nunca grava estado de claim e nunca para o laço: quem verifica continua sendo o ork verify. A Sentinela lê só pelo núcleo, despacha e retoma só pelo ork phase run e pelo ork retry run e nunca usa ork conducao assumir. A Torre, o Clima e o Radar só leem, e a Mesa só pede o diálogo ao núcleo e nunca responde um pedido: ação com efeito abre o mod dono dela, quando ele está carregado, ou aparece como comando do ork, para você rodar.",
              "Os mods rodam com as permissões do seu usuário, sem sandbox, e a API de mods do Claude Code está em acesso antecipado e pode mudar entre versões. Nada no núcleo depende deles: sem mod, o despacho e o ciclo seguem como antes, e o Telegram continua como canal."
            ]
          },
          {
            "id": "plano",
            "title": "O que vem depois",
            "paragraphs": [
              "Na versão {versao}, as quatro ondas da RM-059 estão no código: a onda 0, a fundação descrita acima; a onda 1, com a Torre de Controle, o Clima de Cota, o Freio de Lote e o Radar de Colisão; a onda 2, com a Mesa do Dono e a Sentinela do Condutor; e a onda 3, com a Pista de Entrega, o Ritual do MASTER, o Mensageiro de Sessões e o Portão de Tarefas. O item segue em desenvolvimento, com a exposição parcial e a habilitação em andamento, e as provas que pedem o dono, como a do diálogo aberto a pedido de um mod, continuam com ele."
            ]
          }
        ]
      },
      "en": {
        "title": "Run the factory from Claude Code",
        "description": "The Orkastery mods in Claude Code: what exists today, how to load them and what is still planned.",
        "sections": [
          {
            "id": "o-que-existe",
            "title": "What exists today",
            "paragraphs": [
              "RM-059 aims to let you run the factory from inside the Claude Code session you already work in, through mods: Claude Code function-hook plugins that run inside the client, react to session events and draw panels, bars and notices. In version {versao}, all ten planned mods exist, plus the bridge:"
            ],
            "items": [
              "The bridge (ork-ponte), which the other mods build on: it gives each one the session role (dono for the owner’s session, fase for phase sessions, or dormente), the core snapshot through ork_maestro, the bar above the prompt and the record of what a mod showed the owner. It has both the dono and fase roles.",
              "The Control Tower (ork-torre): in the owner’s session, a panel with one line per open thread, showing the six-phase track, the mode, who is running it and since when, the typed blocker in a short sentence, requests to the owner and the action the thread’s state calls for. The /torre command opens the panel, and pressing a line opens the thread’s detail. It depends on the bridge and has only the dono role.",
              "The Quota Weather (ork-clima): in the owner’s session, it reads the account’s limit windows at each engine measurement (session.measure), keeps the series and predicts when each window runs out at the current pace. Only on an alert, the bridge’s bar says which queued resume will not fit before the window runs out, how much of the window is used, when it runs out and when it resets; the /clima command shows each window, the resume queue, the open threads stopped by quota and the accounts in the ork accounts esgotamentos record. It only reads and warns: switching account, runtime or model stays with the core and the owner. It also depends on the bridge and has only the dono role.",
              "The Batch Brake (ork-freio), the first mod with the fase role: in a phase session, after each batch of tool calls, it finds the files the batch touched (from the edit paths and the git status difference, which also catches edits made through Bash) and the thread’s claims that cite them, asks the core in the background to check them with ork claims conferir, in the verify sandbox, and returns what broke in the next batch: the claim id, the command and the end of the output. It also warns when the batch touched files outside the plan’s touch_paths. It reaches phase sessions on its own through the dispatch, with the adapter installed (ork adapter install claude-code), and needs an ork with ork claims conferir on the session’s PATH: without it, it warns once that checking is unavailable and goes on. It also depends on the bridge.",
              "The Collision Radar (ork-radar): in the owner’s session, every 10 minutes and with the /radar command, it computes the merge of each open thread against the local origin/main and between threads, before SHIP, without a worktree and without writing objects to the repository (through git merge-tree --write-tree in a temporary directory). The panel shows the heat map, the conflicting files, the lease that covers each one and, as text, the ork worktree sync <thread> --dry-run command that resolves it; a new collision becomes a line in the bridge’s bar. Fetching stays with the core. It only reads, depends on the bridge and has only the dono role.",
              "The Owner’s Desk (ork-mesa): in the owner’s session, it gathers in one panel what is waiting for you. The /mesa command opens the batch of up to five questions, each with the recommended alternative first, the reason and the consequence of the others; the decisions the factory made for you during the week, with how to change them and the cost of reverting now and later; and the stopped items, read-only. The Decide button only asks the core for the host’s native dialog (ork_request_decision, with the threadId and the pedidoId), and the code and letter for Telegram always stay in view; the proof that the dialog opens when the request comes from a mod is still pending from the owner. The Owner’s Desk only decides for you through the core’s autonomous decision (ork_decision_record), and only when the request declares that it follows the recommended one at the deadline and passes the core’s four conditions; today the core marks no request that way, so it decides nothing on its own. It never answers a request. It depends on the bridge and has only the dono role.",
              "The Conductor’s Sentinel (ork-sentinela): in the owner’s session, it keeps its presence on this machine through the core, with a heartbeat every 60 s, and removes it when the session ends; while the presence holds, the external conductor yields dispatch. When a thread ledger changes, and at each heartbeat, it rereads the conductor’s next step for each open thread and dispatches the next phase of the #Auto threads the core says to dispatch, once per turn and only through ork phase run; a resume only runs ork retry run when ork retry plan is automatic. Every 5 minutes, what only the owner can resolve in ork pulse becomes a system notification with the core’s next step, once per text, and goes into the bridge’s record so that Telegram does not repeat it. The bridge’s bar shows the threads that are moving and the stopped ones, and the /sentinela command shows each thread’s step and the journal of what it dispatched, yielded and warned about, and also pauses and resumes the Sentinel. It depends on the bridge and has only the dono role.",
              "The Task Gate (ork-portao), the second mod with the fase role: in the GO phase session, it turns Claude Code’s task board into the plan’s board. A task only enters when it points to a plan task with touch_paths and verify, and only closes when the core’s check passes (ork claims conferir --tarefa, in the verify sandbox), never with a verify run by the mod; a plan without such tasks gets no gate. With runtime.agent_teams turned on in the manifest, off by default, an idle teammate receives the next task whose region is free, within the owner’s caps, and the Task Gate takes no lease. It depends on the bridge.",
              "The Delivery Track (ork-pista): in the owner’s session, the /pista command opens one track per delivery, from a green CHECK to the merge, with the eight steps the core reads (CHECK, verify, bundle, branch, PR, CI, conflict and delivery), the core’s text for each missing one and the next step with its command. It only shows a button for an action the core declares available: publishing the branch through ork ship publicar, only in #Auto and #Maestro, and recording the delivery through ork ship registrar-pr; outside those modes, only the command, for you to run. It never calls Git or the GitHub CLI. It depends on the bridge and has only the dono role.",
              "The MASTER Ritual (ork-ritual): in the owner’s session, the /nota command shows the deliveries of the last 7 days that await your score, including those accepted by omission, with each one’s proof: the index derived from the ledger, the POSTMORTEM and the claims. The Give score button asks the core for the host’s native form, with a score from 0 to 5 and the reason, and the core is what records the MASTER, with a receipt; without the dialog, the code for Telegram stays in view. It depends on the bridge and has only the dono role.",
              "The Session Messenger (ork-mensageiro), with the dono and fase roles: the answer you give through your session’s native dialog reaches the claude-bg phase session that stopped waiting for it, without you having to attach to it. The core ties the request to the turn that stopped and checks the message at both ends, and only what it confirms enters the phase session. The answer informs the session, but does not authorize what only you approve, such as a gate or a push, and it does not go out through Telegram."
            ]
          },
          {
            "id": "carregar",
            "title": "Load them into your session",
            "paragraphs": [
              "The Tower, the Quota Weather, the Collision Radar, the Owner’s Desk, the Sentinel, the Delivery Track and the MASTER Ritual only turn on in the owner’s session, and the Session Messenger turns on there and in phase sessions (the Batch Brake and the Task Gate, phase-session mods, reach phase sessions through the dispatch), which the bridge recognizes by two things: orkastery.yaml at the root and the project’s orkastery MCP server being connected. The commands below come in three groups: the project’s MCP server; the Claude Code adapter, which puts each mod’s copy in .claude/plugins/orkastery/mods/<mod>, and loading them into the session with --plugin-dir; and, without the local adapter, installing from the repository’s marketplace at project scope. The Sentinel’s commands are in the next section.",
              "The mods API needs Claude Code 2.1.287 or newer. In CI, the mods job installs Claude Code 2.1.296, validates and tests each mod and searches the binary for every event they use; in that search, builds 2.1.288 and 2.1.289 fail, lacking ui.notify.",
              "Both marketplaces are named orkastery, and the local one, registered from .claude/plugins/orkastery when the adapter is activated, does not list the mods. Do not swap one for the other in a project that uses the adapter’s plugin: removing a marketplace uninstalls the plugins that came from it, and the plugin from the repository’s marketplace does not include the adapter’s PreToolUse guard or MCP server."
            ],
            "code": "ork mcp install --project \"$PWD\" --host claude-code\n\nork adapter install claude-code\nclaude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-torre --plugin-dir .claude/plugins/orkastery/mods/ork-clima --plugin-dir .claude/plugins/orkastery/mods/ork-radar --plugin-dir .claude/plugins/orkastery/mods/ork-mesa --plugin-dir .claude/plugins/orkastery/mods/ork-pista --plugin-dir .claude/plugins/orkastery/mods/ork-ritual --plugin-dir .claude/plugins/orkastery/mods/ork-mensageiro\n\nclaude plugin marketplace add orkastery/orkastery\nclaude plugin install ork-ponte@orkastery --scope project\nclaude plugin install ork-torre@orkastery --scope project\nclaude plugin install ork-clima@orkastery --scope project\nclaude plugin install ork-radar@orkastery --scope project\nclaude plugin install ork-mesa@orkastery --scope project\nclaude plugin install ork-pista@orkastery --scope project\nclaude plugin install ork-ritual@orkastery --scope project\nclaude plugin install ork-mensageiro@orkastery --scope project"
          },
          {
            "id": "sentinela",
            "title": "Let the Sentinel dispatch",
            "paragraphs": [
              "With your session open in Claude Code and the Sentinel on and not paused, the Sentinel dispatches the next phase of the #Auto threads and retries them, and the external conductor (for example, a cron job on the Hermes gateway) yields. With the Sentinel paused, or with the session closed (the presence expires 3 minutes after the last heartbeat), the external conductor takes over again. In version {versao}, ork's own external conductor is the conduction beat (ork conducao batida): it reads the presence and yields dispatch and retry while the Sentinel conducts, except the resume of a phase stopped by quota, which stays with the beat because the Sentinel's account can run out too. It goes on with merging the green PR, recording the delivery and the MASTER by omission, within the owner's durable authorization; with it in cron, the outside script is no longer needed. Publishing the branch, merging the green PR and the Telegram notices always stay with the external conductor: the Sentinel does not publish branches, does not open or merge PRs and does not send Telegram messages.",
              "It uses the core’s presence commands, in version {versao}, and it loads together with the bridge, from the adapter folder or from the repository’s marketplace, as in the block below. The external conductor’s script lives outside the repository, and the change to it is yours: once per round, before the dispatch loop, it reads the Sentinel status with --json and, while presenca.ativa is true, skips dispatching the next phase and ork retry run for the #Auto threads. Publishing a branch that only awaits a push, merging the green PR and the notices to the owner stay as they are; with no live presence, the external conductor runs as before.",
              "There is no duplicate dispatch, because both conductors dispatch only through the core: ork phase run takes the thread’s conduction under a kernel lock. With two requests at the same instant, one dispatches and the other exits without a new session; with the thread already being conducted, the request exits with code 3, conducao.em-andamento, and records conducao_recusada; and the same request from whoever is already conducting records despacho_idempotente and returns the session in progress. The Sentinel also rereads the conduction right before dispatching, never uses ork conducao assumir and remembers the turn it has already dispatched. Its dispatch carries the Claude Code channel and its session in the correlation, and phase_dispatch shows where it came from.",
              "The Sentinel does not choose the phase: it follows the action the core gives each thread in the status. In #Auto, after a completed phase, what goes out is the phase after the most advanced proof the block’s session left: the phase artifact (goal.md, plan.md, check.md) written after the dispatch, the product on the branch, which shows there was a GO, or ship_done and master_done. If the block is already past CHECK, nothing goes out: delivery stays with the external conductor and the owner. A CHECK that ended without exactly one verdict is dispatched again, and a dispatch that failed before opening a session goes to ork retry plan. Anything pending with the owner (a thread at a HITL point, an open question, an escalation) holds every step and, without a request stored when the thread was created (ork thread new --pedido), the Sentinel does not dispatch and warns.",
              "A passing refusal (another conductor, no free slot in the project, an open request, a failure) does not burn the turn: the Sentinel tries again after 3 minutes, and the same refusal in a row doubles the wait up to 30 minutes; only a completed dispatch, or the repeated request of whoever is already conducting, is final. If your external conductor dispatches from the last line of the ledger, it may repeat a phase the block’s session already did; reading each thread’s action in the same status avoids that.",
              "To check, the Sentinel status says whether it is active on this machine and each thread’s step, ork phase list <thread> shows the dispatch with the Claude Code channel and, in the owner’s session, /sentinela shows the journal; the last two lines of the block pause and resume the Sentinel."
            ],
            "code": "claude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-sentinela\nclaude plugin install ork-sentinela@orkastery --scope project\n\nork conducao sentinela status\nork phase list <thread>\n\n/sentinela\n/sentinela pausar\n/sentinela retomar"
          },
          {
            "id": "sessoes-de-fase",
            "title": "In phase sessions",
            "paragraphs": [
              "The claude-bg dispatch passes one --plugin-dir per mod with the fase role, after the Orkastery plugin, when the mod’s installed folder has exactly the files in INSTALADO.json and the Claude Code version meets the mod’s minimum. A mod that needs a newer version is left out, along with the mods that depend on it, and the dispatch goes on; an extra file, a link or an invalid declaration refuses the dispatch with runtime.context.installation. Today the bridge, the Batch Brake, the Task Gate and the Session Messenger have the fase role. The role lives in the mod’s orkastery-mod.json (ork.mod/v1): to take a mod out of phase sessions, change its role in the catalog and reinstall the adapter.",
              "The RM-059 proof measured, on Claude Code 2.1.296, that a mod loaded with --plugin-dir in a phase session receives the session’s events; the core/scripts/prova-mods-sessao-de-fase.cjs script repeats that proof.",
              "The mods foundation also brings two core pieces. ork claims conferir reruns, in the ork_verify sandbox and without recording a receipt, only the requested claims (--claims) or the verify of one plan task (--tarefa); a test that spawns a process may fail there and pass in ork verify. ork thread new --pedido stores the thread’s request in pedido.md, with its sha256, and ork prompt render without --pedido uses that request."
            ]
          },
          {
            "id": "limites",
            "title": "What no mod does",
            "paragraphs": [
              "No mod approves a gate, permission, MASTER score, push or tag on the owner’s behalf, or speaks as the owner. The rule lives in adapters/claude-code/mods/autoridade.json and has two guards: node core/scripts/checar-mods.cjs fails a mod from its source, and the bridge refuses at run time. The Batch Brake never runs a claim’s command, never records claim state and never stops the loop: ork verify is still the one that verifies. The Sentinel reads only through the core, dispatches and resumes only through ork phase run and ork retry run, and never uses ork conducao assumir. The Tower, the Quota Weather and the Collision Radar only read, and the Owner’s Desk only asks the core for the dialog and never answers a request: an action with an effect opens the mod that owns it, when that mod is loaded, or shows up as a command for you to run with ork.",
              "Mods run with your user’s permissions, without a sandbox, and the Claude Code mods API is in early access and may change between versions. Nothing in the core depends on them: without mods, dispatch and the cycle go on as before, and Telegram remains a channel."
            ]
          },
          {
            "id": "plano",
            "title": "What comes next",
            "paragraphs": [
              "In version {versao}, the four RM-059 waves are in the code: wave 0, the foundation described above; wave 1, with the Control Tower, the Quota Weather, the Batch Brake and the Collision Radar; wave 2, with the Owner’s Desk and the Conductor’s Sentinel; and wave 3, with the Delivery Track, the MASTER Ritual, the Session Messenger and the Task Gate. The item is still in development, with partial exposure and enablement in progress, and the proofs that need the owner, such as the dialog opened at a mod’s request, stay with the owner."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "verificacao",
    "group": "guides",
    "sources": [
      "docs/guias/verificacao.md",
      "docs/referencia/contratos/instabilidade-rm037.md"
    ],
    "translations": {
      "pt": {
        "title": "Comprove uma alegação",
        "description": "Use baseline, comandos reproduzíveis e o resultado real da execução.",
        "sections": [
          {
            "id": "baseline",
            "title": "Meça antes da mudança",
            "paragraphs": [
              "Grave a baseline antes de implementar. Ela permite distinguir uma regressão de uma falha anterior. Uma claim associa arquivo, alegação e comando; cadastrá-la não executa o comando nem comprova a alegação."
            ],
            "code": "ork verify <thread> --baseline\nork claims add <thread> src/filtro.ts --claim \"o filtro respeita o fuso\" --verificar \"node --test test/filtro.test.js\""
          },
          {
            "id": "reexecutar",
            "title": "Reexecute no estado atual",
            "paragraphs": [
              "ork verify reexecuta claims e verificadores do manifesto. Leia a causa, o código de saída e os comandos interrompidos. Timeout é uma execução incompleta, não uma prova de aprovação nem uma explicação automática sobre a causa do defeito."
            ],
            "code": "ork verify <thread>\nork retry plan <thread>"
          },
          {
            "id": "corrigir",
            "title": "Corrija e volte à verificação",
            "paragraphs": [
              "Uma falha abre trabalho de correção com escopo explícito. Consulte a rodada antes de reexecutar. Correções que alteram comportamento exigem nova verificação completa; o limite de tentativas e a escalação pertencem ao núcleo."
            ],
            "code": "ork fix open <thread>\nork fix list <thread>\nork fix reverify <thread>"
          },
          {
            "id": "check-agile",
            "title": "Agile Check, o CHECK padrão",
            "paragraphs": [
              "Na versão {versao}, o CHECK padrão é o Agile Check. Ele roda o preparo uma vez, as claims contra o produto dele com a guarda de hash, as lanes de teste e a varredura em paralelo. O Classic Check continua disponível por check.mode: classic no manifesto ou por ork verify --check classic|agile, e a opção da rodada vence o manifesto.",
              "Os dois modos têm a mesma cobertura e o mesmo veredito: o Agile nunca reduz cobertura em silêncio, e a peça indisponível cai para o equivalente do Classic, com a peça, o motivo e o que rodou no lugar registrados em agile.pecas. O preparo roda uma vez, e a claim que começa pelos passos do verify.preparo o reaproveita enquanto a árvore e o hash do produto forem os do fim do preparo; qualquer divergência roda o comando inteiro. As lanes correm em paralelo, e a lane que sobe containers espera a varredura terminar.",
              "Cada verify_run registra o modo da rodada e de onde ele veio (opcao, manifesto ou padrao), a linha check do texto do ork verify mostra o nome do modo, e o ork thread status mostra o do último verify. Sem o bloco check.agile, o Agile roda os mesmos comandos do Classic. Valor fora de agile e classic torna o manifesto inválido."
            ],
            "code": "check:\n  mode: classic\n\nork verify <thread> --check classic\nork verify <thread> --baseline --check agile"
          },
          {
            "id": "security-scan",
            "title": "O security scan no CHECK",
            "paragraphs": [
              "Com verify.security_scan declarado no manifesto, o ork verify roda o ork security-scan como o quarto comando, depois de build, test e typecheck. Quem julga é a ferramenta, e o agente só lê o resultado. Sem a chave, verify, CI, SHIP e skills seguem como antes; o ork init grava a chave sozinho quando reconhece uma stack JavaScript/TypeScript, Python ou Go.",
              "O scan cobre segredo com o Gitleaks, SAST com o Semgrep, dependência com o Trivy e o auditor da stack, IaC com o Trivy config, workflow com zizmor e actionlint, qualidade com ESLint, Ruff ou golangci-lint, e licença com o Trivy license. As ferramentas rodam por imagens oficiais fixadas por digest, com o repositório montado só para leitura; sem Docker, vale o binário nativo, e sem os dois a ferramenta fica unavailable.",
              "O scan compara o HEAD com a base e classifica cada achado como new, existing ou dismissed. Achado new de segredo entra no laço sempre; new de dependência, SAST, IaC e workflow entra com high ou critical; qualidade e licença ficam em aviso. Achado no laço faz o ork security-scan sair 1 e o verify reprovar, e o CHECK lê o report.json com o security-auditor para dar um veredito por achado.",
              "Sem Docker nem binário, o scan local sai 0 com a ferramenta unavailable, o que não vira limpo no SHIP: com verify.security_scan declarado e sem ci.required_for_ship, o ork ship para com human.pending e só segue com ork ship <thread> --para main --allow-unscanned \"<quem autoriza>\"."
            ],
            "code": "verify:\n  security_scan: ork security-scan\n\nork security-scan\nork security-scan --check agile"
          },
          {
            "id": "verificacao-confiavel",
            "title": "Falha, prazo e comando específico",
            "paragraphs": [
              "O verify registra causa, prazo e duração. Timeout é tipado e o prazo vem do manifesto; não deve virar falha genérica. Claims devem rodar o menor comando que prova a mudança. O lint avisa no ork claims add, e o ork ci prepare recusa a suíte local inteira: npm --prefix core test pode depender de recursos ausentes no CI. No lugar da suíte inteira, use só o teste da claim (node --test no arquivo do teste) ou um script hermético do projeto.",
              "O preparo do CI compila uma vez, vincula a identidade do produto e registra executado para distinguir resultado real de comando não executado. Em máquina sob contenção, a saída local pode expirar; isso não dispensa o CI no commit exato nem converte falha em aprovação."
            ],
            "code": "node --test test/filtro.test.js\nork ci prepare <thread>"
          },
          {
            "id": "steal-da-cpu",
            "title": "Teste de relógio sob steal da CPU",
            "paragraphs": [
              "Numa VPS, o hipervisor pode tomar a CPU (o steal), e um teste que mede relógio reprova sem que o código tenha mudado. Na versão {versao}, o ork verify, no CLI, no MCP e no ork fix reverify, mede o steal no /proc/stat, na rodada e na janela de cada comando, e grava a medida no verify_run (steal, e stealPct em cada comando que falha).",
              "Quando um comando reprova só em teste com relógio e o steal na janela dele passou de 40%, a reprovação vira verify.timeout: sem veredito, o retry reexecuta, e nunca é regressão. Teste com relógio é o que falhou com a assinatura de prazo do node --test (estouro do teste, ou cancelado pelo pai que estourou) ou o que tem entrada vigente no registro de instabilidade; os nomes vêm do testeQueCaiu do ledger, que também lê o reporter spec do node --test. Asserção comum sob steal alto continua regressão, comando sem teste nomeado nunca é reclassificado e sem /proc/stat nada é atenuado. O ork ci run não mede nem atenua: o CI segue sendo a prova independente.",
              "O registro é o core/instabilidade.json, no contrato ork.instabilidade/v1, lido da worktree que o verify confere. Ele nasce vazio e só aceita entrada com a taxa medida (falhas em rodadas, o comando que mediu e a data) e revalidação em até 30 dias. Arquivo ausente vale registro vazio; com erro de contrato, nenhuma entrada vale; entrada vencida não vale até alguém medir de novo. O registro nunca atenua sozinho: ele só diz que o teste é de relógio."
            ],
            "code": "{\n  \"contrato\": \"ork.instabilidade/v1\",\n  \"entradas\": []\n}"
          },
          {
            "id": "skip-tipado",
            "title": "Dependência opcional ausente é skip",
            "paragraphs": [
              "A suíte local inclui integrações que pedem o codex do sandbox em /usr/bin/codex, o interpretador do OrkMind no PATH ou PostgreSQL pelo Docker com pgvector/pgvector:pg16. Cada teste que depende de uma delas sonda antes e, se ela falta, sai como skip com o motivo, em vez de reprovar. A suíte inteira passa com 0 falhas numa máquina sem nenhuma delas, e o fim do relatório conta os skips; uma falha que sobra é de verdade.",
              "ORK_TESTE_EXIGE_AMBIENTE=1 não pula nada: a dependência que faltar reprova. O test:ci liga a variável sozinho. node core/scripts/suite-local.cjs roda a suíte, sai 0 só com 0 falhas e lista cada skip com o motivo. Teste novo que depende de ferramenta externa usa os atalhos semCodexSandbox(), semOrkMind() e semPostgres()."
            ],
            "code": "npm --prefix core test\nORK_TESTE_EXIGE_AMBIENTE=1 npm --prefix core test\nnode core/scripts/suite-local.cjs"
          },
          {
            "id": "runtime-e-sessoes",
            "title": "Modelo indisponível e conta da sessão",
            "paragraphs": [
              "model_not_found produz runtime.model-unavailable. O retry tenta destinos autorizados com o mesmo prompt, preserva o perfil para outros modelos e registra a troca. Sem destino, escala com a correção de setup; rate limit comum espera sua janela. ork sessions stop, logs e attach procuram a conta correta nos perfis Claude configurados. O inventário global, o ork doctor, o ork pulse e o controle nativo de HITL ainda podem ter cobertura restrita à conta do processo. Um perfil pedido com --perfil que não existe ou é de outro runtime recusa com runtime.profile-invalid e escala ao humano, sem trocar de perfil sozinho.",
              "Quando a sessão morre por cota depois de produzir, o retry não reenvia o prompt original sobre a worktree alterada: ele despacha ou enfileira um prompt derivado com fase, último commit, status, claims e rodada, preservando o prompt e o SHA-256 originais. O checkpoint manda continuar sem repetir GOAL nem PLAN, e a sessão que não produziu nada recebe o prompt original.",
              "runtime.workspace-untrusted (o runtime recusou o diretório da worktree) e runtime.consent-pending (o CLI espera o aceite de termos novos) viram espera do dono, com o comando exato; depois do aceite, ork retry run re-despacha a mesma fase com o mesmo prompt. Na versão {versao}, o runtime.consent-pending cobre também o aviso do modo sem permissões e a ativação do modo auto do --bg, e a prova de que o dono confiou no diretório segue a regra que o Claude Code aplica no --bg: vale o próprio diretório e os de cima até a raiz git, ou o repositório principal da worktree vinculada, mas não o diretório acima da raiz git. O diretório que não existe mais e o diretório home não são do dono e ficam em runtime.unavailable, e a recusa repetida pelo mesmo impedimento não gasta tentativa nem sobe esforço."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
          },
          {
            "id": "prova-local",
            "title": "Prova local no registro da claim",
            "paragraphs": [
              "A policy claim_sem_prova_local (alias claims_failed) vem desligada e só vale se o manifesto a declarar. Com ela, ork claims add roda os comandos da claim uma vez, na worktree da thread e no prazo de verify.timeout_ms. A claim entra de qualquer jeito: comando reprovado grava policy_warn com claims.failed, e estouro de prazo, com verify.timeout. Ela nunca para o registro, nem declarada em block. Como o add fica tão lento quanto o comando, quem decide ligá-la é o dono do projeto. Sem a worktree da thread (apagada), nada roda e o aviso diz isso. Pelo MCP (ork_claim_add), o registro nunca roda o texto da claim, com ou sem a policy: lá a prova é o ork_verify, no sandbox.",
              "O canário fx-pedido-colado prova que um pedido do dono colado em #Auto, com push e merge autorizados, segue sem parar: a dúvida vira decisão informada e um confirmo em texto livre é recusado sem gravar nada."
            ],
            "code": "policies:\n  claim_sem_prova_local: warn\n\nork eval --so-canarios"
          }
        ]
      },
      "en": {
        "title": "Prove a claim",
        "description": "Use a baseline, reproducible commands and actual execution results.",
        "sections": [
          {
            "id": "baseline",
            "title": "Measure before the change",
            "paragraphs": [
              "Record the baseline before implementation. It distinguishes a regression from an existing failure. A claim links a file, an assertion and a command; registering it neither runs the command nor proves the assertion."
            ],
            "code": "ork verify <thread> --baseline\nork claims add <thread> src/filtro.ts --claim \"o filtro respeita o fuso\" --verificar \"node --test test/filtro.test.js\""
          },
          {
            "id": "reexecutar",
            "title": "Rerun against current state",
            "paragraphs": [
              "ork verify reruns claims and manifest checks. Read the cause, exit code and interrupted commands. A timeout is incomplete execution, not a pass or an automatic explanation of the underlying defect."
            ],
            "code": "ork verify <thread>\nork retry plan <thread>"
          },
          {
            "id": "corrigir",
            "title": "Fix and verify again",
            "paragraphs": [
              "A failure opens correction work with an explicit scope. Inspect the round before rerunning it. Behavior changes require full verification again; the core owns attempt limits and escalation."
            ],
            "code": "ork fix open <thread>\nork fix list <thread>\nork fix reverify <thread>"
          },
          {
            "id": "check-agile",
            "title": "Agile Check, the default CHECK",
            "paragraphs": [
              "In version {versao}, the default CHECK is the Agile Check. It runs the preparation once, the claims against its product with the hash guard, the test lanes and the scan in parallel. The Classic Check remains available through check.mode: classic in the manifest or through ork verify --check classic|agile, and the round's option overrides the manifest.",
              "Both modes have the same coverage and the same verdict: Agile never reduces coverage silently, and an unavailable piece falls back to the Classic equivalent, with the piece, the reason and what ran instead recorded in agile.pecas. The preparation runs once, and a claim that starts with the verify.preparo steps reuses it while the tree and the product hash are those from the end of the preparation; any divergence runs the whole command. The lanes run in parallel, and the lane that starts containers waits for the scan to finish.",
              "Every verify_run records the round's mode and where it came from (opcao, manifesto or padrao), the check line in ork verify's text shows the mode name, and ork thread status shows the last verify's mode. Without the check.agile block, Agile runs the same commands as Classic. A value other than agile or classic makes the manifest invalid."
            ],
            "code": "check:\n  mode: classic\n\nork verify <thread> --check classic\nork verify <thread> --baseline --check agile"
          },
          {
            "id": "security-scan",
            "title": "The security scan in CHECK",
            "paragraphs": [
              "With verify.security_scan declared in the manifest, ork verify runs ork security-scan as the fourth command, after build, test and typecheck. The tool is the judge, and the agent only reads the result. Without the key, verify, CI, SHIP and skills behave as before; ork init writes the key on its own when it recognizes a JavaScript/TypeScript, Python or Go stack.",
              "The scan covers secrets with Gitleaks, SAST with Semgrep, dependencies with Trivy and the stack's auditor, IaC with Trivy config, workflows with zizmor and actionlint, quality with ESLint, Ruff or golangci-lint, and licenses with Trivy license. The tools run from official images pinned by digest, with the repository mounted read-only; without Docker, the native binary applies, and without either the tool stays unavailable.",
              "The scan compares HEAD with the base and classifies each finding as new, existing or dismissed. A new secret finding always enters the loop; a new dependency, SAST, IaC or workflow finding enters with high or critical; quality and license findings stay as warnings. A finding in the loop makes ork security-scan exit 1 and verify fail, and CHECK reads report.json with the security-auditor to give one verdict per finding.",
              "Without Docker or a native binary, the local scan exits 0 with the tool unavailable, which does not become clean at SHIP: with verify.security_scan declared and no ci.required_for_ship, ork ship stops with human.pending and only proceeds with ork ship <thread> --para main --allow-unscanned \"<who authorizes>\"."
            ],
            "code": "verify:\n  security_scan: ork security-scan\n\nork security-scan\nork security-scan --check agile"
          },
          {
            "id": "verificacao-confiavel",
            "title": "Failures, deadlines and focused commands",
            "paragraphs": [
              "Verify records cause, deadline and duration. Timeout has a typed reason and uses the manifest deadline. Claims should run the smallest command that proves the change. Lint warns during ork claims add, and ork ci prepare rejects the full local suite: npm --prefix core test may need resources unavailable in CI. Instead of the full suite, run only the claim’s test (node --test on the test file) or a hermetic project script.",
              "CI preparation compiles once, binds product identity and records executado to distinguish actual results from commands that never ran. Resource contention may cause a local timeout; it does not waive CI at the exact commit or turn failure into success."
            ],
            "code": "node --test test/filtro.test.js\nork ci prepare <thread>"
          },
          {
            "id": "steal-da-cpu",
            "title": "Clock-bound tests under CPU steal",
            "paragraphs": [
              "On a VPS, the hypervisor can take CPU away (steal), and a test that measures the clock fails without any code change. In version {versao}, ork verify, in the CLI, over MCP and in ork fix reverify, measures steal from /proc/stat, for the whole round and within each command’s window, and records it in verify_run (steal, plus stealPct on each failing command).",
              "When a command fails only in clock-bound tests and the steal within its window exceeded 40%, the failure becomes verify.timeout: no verdict, retry runs it again, and it is never a regression. A clock-bound test is one that failed with the node --test timeout signature (the test timed out, or was cancelled by a parent that timed out) or one with a current entry in the instability registry; the names come from the ledger’s testeQueCaiu, which also reads the node --test spec reporter. An ordinary assertion under high steal is still a regression, a command with no named test is never reclassified, and without /proc/stat nothing is softened. ork ci run neither measures nor softens: CI remains the independent proof.",
              "The registry is core/instabilidade.json, under the ork.instabilidade/v1 contract, read from the worktree being verified. It starts empty and only accepts an entry with a measured rate (failures over runs, the command that measured it and the date) and revalidation within 30 days. A missing file counts as an empty registry; with a contract error, no entry counts; an expired entry does not count until someone measures again. The registry never softens a failure on its own: it only says the test depends on the clock."
            ],
            "code": "{\n  \"contrato\": \"ork.instabilidade/v1\",\n  \"entradas\": []\n}"
          },
          {
            "id": "skip-tipado",
            "title": "A missing optional dependency is a skip",
            "paragraphs": [
              "The local suite includes integrations that need the sandbox codex at /usr/bin/codex, the OrkMind interpreter on PATH or PostgreSQL through Docker with pgvector/pgvector:pg16. Each test that depends on one of them probes first and, when it is missing, is skipped with the reason instead of failing. The full suite passes with 0 failures on a machine that has none of them, and the end of the report counts the skips; any failure left is real.",
              "ORK_TESTE_EXIGE_AMBIENTE=1 skips nothing: a missing dependency fails. test:ci sets the variable on its own. node core/scripts/suite-local.cjs runs the suite, exits 0 only with 0 failures and lists each skip with its reason. A new test that depends on an external tool uses the helpers semCodexSandbox(), semOrkMind() and semPostgres()."
            ],
            "code": "npm --prefix core test\nORK_TESTE_EXIGE_AMBIENTE=1 npm --prefix core test\nnode core/scripts/suite-local.cjs"
          },
          {
            "id": "runtime-e-sessoes",
            "title": "Unavailable models and session accounts",
            "paragraphs": [
              "model_not_found produces runtime.model-unavailable. Retry tries authorized destinations with the same prompt, retains the profile for other models and records the change. Without a destination it escalates with a setup correction; ordinary rate limits wait for their window. ork sessions stop, logs and attach find the correct account among configured Claude profiles. Global inventory, ork doctor, ork pulse and native HITL control may still be limited to the process account. A profile requested with --perfil that does not exist or belongs to another runtime is refused with runtime.profile-invalid and escalated to a human, without switching profiles automatically.",
              "When a session dies from quota after producing output, retry does not resend the original prompt over the changed worktree: it dispatches or queues a derived prompt with the phase, last commit, status, claims and round, preserving the original prompt and SHA-256. The checkpoint says to continue without repeating GOAL or PLAN, and a session that produced nothing receives the original prompt.",
              "runtime.workspace-untrusted (the runtime refused the worktree directory) and runtime.consent-pending (the CLI is waiting for new terms to be accepted) become a wait for the owner, with the exact command; after acceptance, ork retry run dispatches the same phase again with the same prompt. In version {versao}, runtime.consent-pending also covers the no-permissions mode warning and enabling auto mode for --bg, and the proof that the owner trusted the directory follows the rule Claude Code applies with --bg: the directory itself and those above it up to the root of the git repository count, as does the main repository of a linked worktree, but not a directory above that root. A directory that no longer exists and the home directory are not the owner’s to fix and stay as runtime.unavailable, and a repeated refusal for the same blocker uses no attempt and raises no effort."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
          },
          {
            "id": "prova-local",
            "title": "Local proof when a claim is registered",
            "paragraphs": [
              "The claim_sem_prova_local policy (alias claims_failed) is off by default and applies only when the manifest declares it. With it, ork claims add runs the claim’s commands once, in the thread worktree and within verify.timeout_ms. The claim is recorded either way: a failing command records policy_warn with claims.failed, and a timeout records it with verify.timeout. It never stops registration, even when declared as block. Because add becomes as slow as the command, the project owner decides whether to turn it on. Without the thread worktree (deleted), nothing runs and the warning says so. Through MCP (ork_claim_add), registration never runs the claim text, with or without the policy: there the evidence is ork_verify, in the sandbox.",
              "The fx-pedido-colado canary proves that an owner request pasted in #Auto, with push and merge authorized, proceeds without stopping: doubt becomes an informed decision, and a free-text confirmation is refused without recording anything."
            ],
            "code": "policies:\n  claim_sem_prova_local: warn\n\nork eval --so-canarios"
          }
        ]
      }
    }
  },
  {
    "slug": "auditoria",
    "group": "guides",
    "sources": [
      "docs/guias/auditoria.md"
    ],
    "translations": {
      "pt": {
        "title": "Audite e acompanhe a dívida",
        "description": "Transforme achados em trabalho rastreável, sem confundir revisão e correção.",
        "sections": [
          {
            "id": "packs",
            "title": "Escolha o pack pelo estágio",
            "paragraphs": [
              "O estágio do produto define os packs ativos: clean-code, reuse e process desde nascente; architecture, data-model e ux em crescendo; security-privacy em maduro. Consulte as regras e a evidência exigida antes da rodada."
            ],
            "code": "ork audit packs\nork audit packs --pack reuse"
          },
          {
            "id": "achados",
            "title": "Achado precisa de prova",
            "paragraphs": [
              "O auditor aponta arquivo, evidência, comando reproduzível e proposta. Ele não corrige o próprio achado. O board preserva o histórico e a recorrência; promover uma regra de aviso para bloqueio exige decisão, não acontece apenas porque um agente recomendou."
            ],
            "code": "ork audit verify <rodada>"
          }
        ]
      },
      "en": {
        "title": "Audit and track debt",
        "description": "Turn findings into traceable work while keeping review separate from correction.",
        "sections": [
          {
            "id": "packs",
            "title": "Choose a pack for the stage",
            "paragraphs": [
              "The product stage determines active packs: clean-code, reuse and process from nascente; architecture, data-model and ux in crescendo; security-privacy in maduro. Read the rules and evidence requirements before the round."
            ],
            "code": "ork audit packs\nork audit packs --pack reuse"
          },
          {
            "id": "achados",
            "title": "A finding needs evidence",
            "paragraphs": [
              "The auditor identifies the file, evidence, reproducible command and proposal. Auditors do not fix their own findings. The board preserves history and recurrence; promoting a warning to a blocking rule requires a decision, not just an agent recommendation."
            ],
            "code": "ork audit verify <rodada>"
          }
        ]
      }
    }
  },
  {
    "slug": "memoria",
    "group": "guides",
    "sources": [
      "docs/guias/memoria-e-handoff.md"
    ],
    "translations": {
      "pt": {
        "title": "Memória e continuidade",
        "description": "Passe contexto com origem e recupere detalhes quando forem necessários.",
        "sections": [
          {
            "id": "medida",
            "title": "Declare a origem da medida",
            "paragraphs": [
              "O gate de tokens distingue uso reportado, estimado, informado e indisponível. Ausência de medida não é zero. Consulte o gate antes do próximo bloco; não decida a rotação com um número inventado."
            ],
            "code": "ork gate next <thread> --proximo GO"
          },
          {
            "id": "handoff",
            "title": "Três níveis de contexto",
            "paragraphs": [
              "O conteúdo crítico entra diretamente no handoff. O importante vira ponteiro com condição de recuperação. O resumível recebe um resumo com proveniência. Cada item mantém origem, localização e hash; mudanças na fonte precisam ser percebidas antes de confiar no contexto antigo."
            ],
            "code": "ork handoff export <thread> --proxima-fase GO\nork recall <thread> --fase CHECK"
          },
          {
            "id": "degradacao",
            "title": "Memória indisponível",
            "paragraphs": [
              "OrkMind é uma integração de memória, não uma autoridade de gate. Quando indisponível, o modo efetivo e a degradação devem ser explícitos. Consulte ork memory status antes de afirmar que o contexto foi persistido ou recuperado.",
              "O ork memory status mostra o regime pedido no manifesto e o efetivo, o tenant, a variável da base, se a DSN está no ambiente (sem imprimir o valor) e o CLI do OrkMind. Em regime files, a degradação sai como modo.files, com a correção para ligar a memória semântica: memory.mode: orkmind e a fonte da DSN no manifesto, em memory.database_url_env ou memory.database_url_file. O ciclo não para por isso: o handoff continua triado em três níveis, e o ork recall continua resolvendo os ponteiros."
            ],
            "code": "ork memory status"
          },
          {
            "id": "dsn-arquivo",
            "title": "A DSN fora do ambiente dos agentes",
            "paragraphs": [
              "Com memory.database_url_env, a DSN mora no ambiente do processo e chega ao ambiente de toda sessão de agente que a herda. A segunda fonte tira a DSN de lá: memory.database_url_file aponta o caminho de um arquivo na pasta de segredos do ork, lido no momento do uso.",
              "As duas fontes são exclusivas: declarar database_url_file e database_url_env reprova o manifesto, e o ork nunca cai de uma para a outra. O caminho aceito é ~/.orkastery/segredos/<nome>, sem subpasta; o arquivo é comum, do usuário que roda o ork, com permissão 0600 ou 0400, até 4 KiB e uma linha só com a DSN. Nenhuma pasta do caminho pode ser link simbólico, e cada uso lê o arquivo de novo.",
              "Arquivo ausente, inseguro ou inválido leva o regime a files, com dsn.arquivo-ausente, dsn.arquivo-inseguro ou dsn.arquivo-invalido e a correção. A resposta de um processo filho que repita a DSN ou a senha dela é recusada inteira, com memory.transport.secret. O ork memory status mostra a fonte sem o valor, e o ork doctor avisa sobre a fonte da DSN e sobre a DSN ainda exportada no ambiente de uma sessão despachada."
            ],
            "code": "memory:\n  mode: orkmind\n  tenant: orkastery\n  database_url_file: \"~/.orkastery/segredos/orkastery.dsn\"\n\nork memory status"
          },
          {
            "id": "significado",
            "title": "Busca por significado",
            "paragraphs": [
              "A busca por tag continua sendo o caminho determinístico: é ela que monta o prompt, o recall e o handoff. A busca por significado é uma superfície separada, que acha por paráfrase o que a tag e a palavra exata não acham. Cada resultado sai marcado deterministico: false, e nada semântico entra no prompt sozinho.",
              "Ela fica desligada até o manifesto declarar o bloco memory.embedding, com provider, modelo, dimensão e o nome da variável da chave, nunca o valor. O índice vetorial é local, derivado do tenant e fora do git; reindexar sem mudança não embeda nada. O texto indexado e cada consulta saem para o provider configurado: use uma chave dedicada, com limite de crédito. A estimativa de tokens e custo não é fatura. Sem embeddings, o motivo é embeddings.*, e o regime orkmind e o recall por tag seguem iguais.",
              "Índice, vetor, FTS e ork memory status usam o mesmo universo da busca: as entradas ativas do tenant nas coleções do ork, sem as que a biblioteca marca com injection_risk. Entrada de outro tenant ou de outra coleção é falha tipada (memory.query.scope-violation), nunca descarte silencioso, e não vai ao embed. Quando a janela de leitura enche, a resposta é memory.query.window-saturated em vez de cortar, e o ork memory index sai 1 sem embedar nada.",
              "O status e o index mostram o universo por coleção e contam, só em número, o que fica fora da busca: entradas com injection_risk, expiradas e de outras coleções, como session e semantic_log. A cobertura é a dos vetores contra esse universo; o aviso de reindexar só aparece quando reindexar resolve, e a entrada fora do índice por desenho é contada à parte."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory index\nork memory search --texto \"trocar de conta quando acaba a cota\" --json"
          }
        ]
      },
      "en": {
        "title": "Memory and continuity",
        "description": "Pass context with provenance and retrieve details when needed.",
        "sections": [
          {
            "id": "medida",
            "title": "Declare the measurement source",
            "paragraphs": [
              "The token gate distinguishes reported, estimated, supplied and unavailable usage. Missing measurement is not zero. Query the gate before the next block; never decide rotation using an invented number."
            ],
            "code": "ork gate next <thread> --proximo GO"
          },
          {
            "id": "handoff",
            "title": "Three levels of context",
            "paragraphs": [
              "Critical content goes directly into the handoff. Important content becomes a pointer with a retrieval condition. Summarizable content gets a summary with provenance. Each item retains its source, location and hash; source changes must be noticed before trusting old context."
            ],
            "code": "ork handoff export <thread> --proxima-fase GO\nork recall <thread> --fase CHECK"
          },
          {
            "id": "degradacao",
            "title": "Unavailable memory",
            "paragraphs": [
              "OrkMind is a memory integration, not gate authority. When unavailable, the effective mode and degradation must be explicit. Check ork memory status before claiming context was stored or retrieved.",
              "ork memory status shows the regime requested in the manifest and the effective one, the tenant, the database variable, whether the DSN is in the environment (never printing its value) and the OrkMind CLI. In the files regime, degradation appears as modo.files, with the fix to turn on semantic memory: memory.mode: orkmind and the DSN source in the manifest, either memory.database_url_env or memory.database_url_file. The cycle does not stop because of it: the handoff stays triaged in three levels, and ork recall keeps resolving pointers."
            ],
            "code": "ork memory status"
          },
          {
            "id": "dsn-arquivo",
            "title": "The DSN outside the agents' environment",
            "paragraphs": [
              "With memory.database_url_env, the DSN lives in the process environment and reaches the environment of every agent session that inherits it. The second source takes the DSN out of there: memory.database_url_file points to a file in ork's secrets folder, read at the moment of use.",
              "The two sources are exclusive: declaring both database_url_file and database_url_env fails the manifest, and ork never falls back from one to the other. The accepted path is ~/.orkastery/segredos/<name>, with no subfolder; the file is a regular file owned by the user running ork, with mode 0600 or 0400, up to 4 KiB and a single line with the DSN. No folder in the path may be a symbolic link, and every use reads the file again.",
              "A missing, unsafe or invalid file moves the regime to files, with dsn.arquivo-ausente, dsn.arquivo-inseguro or dsn.arquivo-invalido and the fix. A child process response that repeats the DSN or its password is refused entirely, with memory.transport.secret. ork memory status shows the source without the value, and ork doctor warns about the DSN source and about a DSN still exported in a dispatched session's environment."
            ],
            "code": "memory:\n  mode: orkmind\n  tenant: orkastery\n  database_url_file: \"~/.orkastery/segredos/orkastery.dsn\"\n\nork memory status"
          },
          {
            "id": "significado",
            "title": "Search by meaning",
            "paragraphs": [
              "Tag search remains the deterministic path: it builds the prompt, recall and handoff. Search by meaning is a separate surface that finds paraphrases that tags and exact words miss. Every result is marked deterministico: false, and nothing semantic enters the prompt on its own.",
              "It stays off until the manifest declares the memory.embedding block, with provider, model, dimension and the name of the key variable, never its value. The vector index is local, derived from the tenant and kept out of git; reindexing unchanged content embeds nothing. Indexed text and every query go to the configured provider: use a dedicated key with a credit limit. The token and cost estimate is not an invoice. Without embeddings, the reason is embeddings.*, and the orkmind regime and tag recall stay the same.",
              "The index, the vectors, FTS and ork memory status use the same search universe: the tenant’s active entries in the collections of ork, minus those the library flags with injection_risk. An entry from another tenant or collection is a typed failure (memory.query.scope-violation), never a silent drop, and is not embedded. When the read window fills up, the answer is memory.query.window-saturated instead of truncating, and ork memory index exits 1 without embedding anything.",
              "status and index show the universe per collection and count, as numbers only, what stays out of search: entries flagged injection_risk, expired ones and those in other collections, such as session and semantic_log. Coverage compares the vectors with that universe; the reindex warning appears only when reindexing helps, and entries left out of the index by design are counted separately."
            ],
            "code": "ork memory status --sondar\nork memory index --dry-run --json\nork memory index\nork memory search --texto \"trocar de conta quando acaba a cota\" --json"
          }
        ]
      }
    }
  },
  {
    "slug": "varias-maquinas",
    "group": "guides",
    "sources": [
      "docs/guias/varias-maquinas.md",
      "docs/conceitos/decisoes/ADR-001-estado-da-rede.md"
    ],
    "translations": {
      "pt": {
        "title": "Trabalhe em várias máquinas",
        "description": "Coordene reservas e consulte retratos compartilhados sem transportar credenciais.",
        "sections": [
          {
            "id": "adesao",
            "title": "Adesão é uma operação explícita",
            "highlight": {
              "title": "Muda para quem já usa",
              "paragraphs": [
                "Na versão {versao}, fabrica.compartilhada: true no manifesto não liga mais a publicação do retrato desta máquina nem a leitura das outras. Só a adesão da máquina liga: ork fabrica entrar, gravada em ~/.orkastery/maquina.json, ou ORK_FABRICA_COMPARTILHADA=1. Com o pedido no manifesto e sem a adesão, o ork doctor e o ork fabrica avisam com fabrica.nao-confirmada. Se o time ligava a fábrica só pelo manifesto, rode ork fabrica entrar uma vez em cada máquina."
              ],
              "links": [
                {
                  "label": "Fronteira de confiança",
                  "href": "/docs/confianca/"
                }
              ]
            },
            "paragraphs": [
              "A fábrica compartilhada usa branches de estado no remoto para reservas e retratos de máquinas. A adesão é da máquina, não do projeto: ork fabrica entrar publica o primeiro retrato; execute apenas quando essa participação estiver autorizada. O pedido do time no orkastery.yaml (fabrica.compartilhada: true) não liga a publicação: o manifesto vem com o repositório, e só a máquina decide publicar o retrato dela. Cada máquina faz seu próprio login do runtime.",
              "fabrica.remoto é o nome de um remoto do git já configurado no clone, não uma URL: só letras, dígitos, ponto, sublinhado e hífen, sem hífen no começo, sem .. e com até 64 caracteres. O mesmo vale para o --remoto de ork fabrica, ork roadmap, ork ship registrar-pr, ork ci status e ork ship --para. Fora do formato, o valor nunca chega ao git: a recusa é tipada (fabrica.remoto-invalido, roadmap.remoto-invalido, ship.remoto-invalido ou ci.remoto-invalido) e mostra o valor redigido. Para outro servidor, crie o remoto com git remote add e ponha o nome no manifesto."
            ]
          },
          {
            "id": "leitura",
            "title": "Consulte antes de assumir trabalho",
            "paragraphs": [
              "Reservas evitam que duas máquinas assumam o mesmo item. Sem rede, consulte a última cópia e considere sua data. O retrato público não leva prompts, transcripts, credenciais ou caminhos locais. Uma decisão pendente precisa ser respondida pelo ingresso autenticado da máquina responsável."
            ],
            "code": "ork board --sem-remoto\nork fabrica --sem-remoto"
          },
          {
            "id": "pessoa",
            "title": "A rede da pessoa: Orkastery Network",
            "paragraphs": [
              "A fábrica compartilhada vive no remoto de um projeto. A rede junta as máquinas de uma pessoa, de todos os projetos, num repositório privado dela na forja, <usuario>/orkastery-network. ork network entrar cria a casa quando falta, publica o primeiro retrato e só então grava a adesão; depois, a máquina publica sozinha na batida do pulse e nos eventos de thread. A identidade vem do gh ou do glab já autenticados; o ork nunca lê token. Quem já fez ork fabrica entrar é membro sem refazer nada.",
              "A casa recebe nome, hostname, forja e login, runtimes e hosts com a versão, projetos com remoto sem credencial e a última batida. Nunca recebe token, senha, e-mail da conta, plano pago, caminho de arquivo de credencial, prompt, transcript ou log. Publicar exige a casa privada, conferida na forja, e só por HTTPS.",
              "O ork doctor tem a linha rede: adesão, casa, última batida e última falha do rede.log. Ele só lê arquivos locais e nunca bloqueia; vira aviso quando a falha é mais nova que a batida ou quando a batida passou de 3 horas. O REDE.md da casa lista as máquinas com batida nos últimos 14 dias; as paradas há mais tempo ficam no rodapé e no ork network status. A rede foi publicada na versão 0.5.3."
            ],
            "code": "ork network entrar --maquina pc-casa\nork network status\nork network publicar\nork network sair"
          },
          {
            "id": "rede",
            "title": "O roadmap da rede, de qualquer diretório",
            "paragraphs": [
              "ork network roadmap junta o status report do roadmap, as reservas e as threads de cada máquina, com a fonte e a hora de cada parte. Roda de qualquer diretório, inclusive fora de um clone. O roadmap vem da base remota, igual para toda máquina; esta máquina entra pelo estado local, e as outras pelo retrato publicado.",
              "Sem clone, a leitura usa a CLI da forja já autenticada, gh ou glab, só com consulta; nenhum token sai dela. O que não foi lido sai como lacuna, com o tipo e o que fazer: máquina sem batida há mais de 3 h, forja sem login, sem rede. A resposta nunca diz vazio por não ter lido.",
              "A rede da pessoa também entra no panorama, na seção Rede por pessoa: a casa e cada máquina, com a batida e os projetos que declara. Um projeto que só uma máquina da rede declara pode ser pedido pelo nome, sem clone nem registro nesta, e a máquina da rede que não publicou na fábrica do projeto aparece com as threads não lidas (lacuna maquina.sem-fabrica), nunca com zero ativas. ORK_REDE_LER=0 desliga essa leitura."
            ],
            "code": "ork network roadmap\nork network roadmap --projeto github:orkastery/orkastery\nork network roadmap --projeto meu-produto --json"
          }
        ]
      },
      "en": {
        "title": "Work across machines",
        "description": "Coordinate reservations and inspect shared snapshots without transferring credentials.",
        "sections": [
          {
            "id": "adesao",
            "title": "Joining is an explicit operation",
            "highlight": {
              "title": "Changes for current users",
              "paragraphs": [
                "In version {versao}, fabrica.compartilhada: true in the manifest no longer turns on publishing this machine’s snapshot or reading the others. Only the machine’s membership does: ork fabrica entrar, recorded in ~/.orkastery/maquina.json, or ORK_FABRICA_COMPARTILHADA=1. With the request in the manifest and no membership, ork doctor and ork fabrica warn with fabrica.nao-confirmada. If your team turned the factory on through the manifest alone, run ork fabrica entrar once on each machine."
              ],
              "links": [
                {
                  "label": "Trust boundary",
                  "href": "/docs/confianca/"
                }
              ]
            },
            "paragraphs": [
              "The shared factory uses remote state branches for reservations and machine snapshots. Membership belongs to the machine, not the project: ork fabrica entrar publishes the first snapshot; run it only when participation is authorized. The team’s request in orkastery.yaml (fabrica.compartilhada: true) does not turn publishing on: the manifest comes with the repository, and only the machine decides to publish its snapshot. Each machine performs its own runtime login.",
              "fabrica.remoto is the name of a git remote already configured in the clone, not a URL: only letters, digits, dot, underscore and hyphen, no leading hyphen, no .. and up to 64 characters. The same applies to --remoto in ork fabrica, ork roadmap, ork ship registrar-pr, ork ci status and ork ship --para. Outside that format, the value never reaches git: the refusal is typed (fabrica.remoto-invalido, roadmap.remoto-invalido, ship.remoto-invalido or ci.remoto-invalido) and shows the redacted value. For another server, create the remote with git remote add and put its name in the manifest."
            ]
          },
          {
            "id": "leitura",
            "title": "Inspect before taking work",
            "paragraphs": [
              "Reservations prevent two machines from taking the same item. Offline, inspect the last copy and consider its timestamp. The public snapshot excludes prompts, transcripts, credentials and local paths. Pending decisions must be answered through the responsible machine’s authenticated ingress."
            ],
            "code": "ork board --sem-remoto\nork fabrica --sem-remoto"
          },
          {
            "id": "pessoa",
            "title": "A person’s network: Orkastery Network",
            "paragraphs": [
              "The shared factory lives on one project’s remote. The network brings together one person’s machines, across all projects, in a private repository of theirs on the forge, <user>/orkastery-network. ork network entrar creates the home when it is missing, publishes the first snapshot and only then records membership; after that, the machine publishes on its own at the pulse heartbeat and on thread events. Identity comes from the already authenticated gh or glab; ork never reads a token. A machine that already ran ork fabrica entrar is a member without redoing anything.",
              "The home receives the name, hostname, forge and login, runtimes and hosts with their version, projects with a credential-free remote, and the last heartbeat. It never receives a token, password, account email, paid plan, credential file path, prompt, transcript or log. Publishing requires a private home, checked on the forge, and HTTPS only.",
              "ork doctor has a rede line: membership, home, last heartbeat and last failure from rede.log. It only reads local files and never blocks; it becomes a warning when the failure is newer than the heartbeat or when the heartbeat is older than 3 hours. The home’s REDE.md lists machines with a heartbeat in the last 14 days; those stopped for longer go to the footer and to ork network status. The network was released in version 0.5.3."
            ],
            "code": "ork network entrar --maquina pc-casa\nork network status\nork network publicar\nork network sair"
          },
          {
            "id": "rede",
            "title": "The network roadmap, from any directory",
            "paragraphs": [
              "ork network roadmap combines the roadmap’s status report, reservations and each machine’s threads, with the source and time of every part. It runs from any directory, even outside a clone. The roadmap comes from the remote base, the same for every machine; this machine contributes its local state, and the others their published snapshots.",
              "Without a clone, it reads through the forge CLI you have already authenticated, gh or glab, using queries only; no token leaves it. Anything not read appears as a typed gap with the next step: a machine without a heartbeat for more than 3 h, a forge without login, no network. The answer never says empty because it did not read.",
              "The person’s network also enters the overview, in the Network by person section: the home and each machine, with its heartbeat and the projects it declares. A project declared only by a network machine can be requested by name, without a clone or registration here, and a network machine that has not published to the project’s factory appears with unread threads (gap maquina.sem-fabrica), never with zero active. ORK_REDE_LER=0 turns this reading off."
            ],
            "code": "ork network roadmap\nork network roadmap --projeto github:orkastery/orkastery\nork network roadmap --projeto meu-produto --json"
          }
        ]
      }
    }
  },
  {
    "slug": "hitl",
    "group": "guides",
    "sources": [
      "docs/guias/sincronismo-hitl.md",
      "docs/roadmap/RM-055-impedimento-do-dono-vira-hitl.md"
    ],
    "translations": {
      "pt": {
        "title": "Acompanhe pontos de HITL e decisões",
        "description": "Diferencie uma sessão viva de uma sessão que consegue continuar.",
        "sections": [
          {
            "id": "observar",
            "title": "Observe threads e sessões",
            "paragraphs": [
              "ork monitor acompanha threads; ork sessions hitl encontra sessões paradas, inclusive as que não têm thread. O radar separa espera humana, falha e estado residual usando a evidência do runtime. Uma sessão listada como viva pode estar aguardando uma resposta.",
              "O resumo do pulse sai pelo transporte de .orkastery/monitor/pulse-host.json, um arquivo desta máquina. Na versão {versao}, versionado no git, ou como link, ele não vale, e a varredura sai com transporte.rastreado sem rodar nada; o mesmo vale para o master-host.json do digest."
            ],
            "code": "ork monitor\nork sessions hitl\nork pulse --json"
          },
          {
            "id": "responder",
            "title": "Responda no canal autorizado",
            "paragraphs": [
              "Sem --registrar, o radar é somente leitura. A opção de registro grava transições reais no ledger. Perguntas e alternativas devem vir da sessão observada; um estado desconhecido permanece desconhecido. A sessão filha não se apresenta como o dono para responder um gate."
            ]
          },
          {
            "id": "pedido-curto",
            "title": "Uma pergunta curta, com contexto",
            "paragraphs": [
              "O contrato ork.hitl-curto/v1 organiza título, pergunta em uma frase, o que trava e desde quando, alternativas de uma linha com consequência, recomendação com motivo e uma última linha dizendo como responder. Evidências, claims, riscos e diff ficam acessíveis pelo código seguido de detalhes. O ingresso autenticado e sua prova HMAC continuam obrigatórios. São até cinco alternativas, uma com o selo Recomendação, em no máximo 15 linhas."
            ],
            "code": "ork gate request <thread> --formato telegram"
          },
          {
            "id": "alternativas",
            "title": "Pedidos do ork por alternativas",
            "paragraphs": [
              "Todo pedido que o próprio ork abre ao dono é uma seleção de 3 a 5 alternativas, com exatamente uma marcada como Recomendação. O registro recusa, sem gravar nada, o pedido fora disso: hitl.selecao.fora-da-faixa, hitl.selecao.recomendada ou hitl.selecao.texto-livre. Resposta em texto só passa com uma dependência técnica: o comando exato que o dono roda no terminal e o motivo.",
              "ork prompt lint reprova o template que peça um confirmo em texto livre ou que o dono cole texto (regra hitl-texto-livre). O tempo parado por essas perguntas aparece em ork ledger stats, no campo hitlDeConducao, com a mediana comparada à meta de 5 minutos. O mesmo tempo chega ao ork pulse e ao ork roadmap status: cada pergunta aberta, com há quanto tempo para a thread e desde que hora, no fuso do dono, e a mediana dos últimos 7 dias. O resumo do pulse ganha uma linha só acima da meta, junto do resumo que já sai, sem furar a cadência. A pergunta nativa de uma sessão do host continua com as opções do próprio host."
            ],
            "code": "ork prompt lint\nork ledger stats\nork pulse --json\nork roadmap status --json"
          },
          {
            "id": "texto-e-linha",
            "title": "Texto livre e linha estável",
            "paragraphs": [
              "Texto livre inequívoco (o vocabulário fechado, a letra a a e ou o dígito 1 a 5) pode ser associado à ação de uma alternativa. Ambiguidade volta como pergunta. Uma palavra solta só vale na janela de escuta aberta pelo núcleo, com um único pedido para o dono em todas as threads, e nunca para ato irreversível. O agente não responde pelo dono.",
              "Reabrir o mesmo gate no mesmo contexto mantém o código. Resposta vencida só passa ao pedido renovado quando conteúdo e contexto são idênticos; mudança recusa a resposta. Lotes reconferem cada gate antes de registrar."
            ]
          },
          {
            "id": "recuperacao",
            "title": "Quando o runtime cai, o dono é a última instância",
            "paragraphs": [
              "O ork retry run sobe uma escada com o mesmo prompt e o mesmo sha256: reerguer o daemon do claude-bg, usar o primeiro alvo do fallback do bloco e, por último, outro perfil do mesmo runtime. Cada degrau vai ao ledger da thread como runtime_recuperacao, com o destino efetivo e a prova, e o degrau pulado ou interrompido não gasta tentativa.",
              "Esgotados os três degraus, o dono é chamado com gate_blocked human.pending e três alternativas, uma recomendada, o comando que confere o runtime e o que retoma a fase com o mesmo prompt. A escada vale por episódio e nunca abre uma segunda sessão na mesma worktree; com o daemon travado, o retry o reergue antes da prova de vida, e a terceira recusa seguida sem resposta chama o dono."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
          },
          {
            "id": "status-e-nota",
            "title": "Status e nota com prova de origem",
            "paragraphs": [
              "ork roadmap status é leitura pura e reúne o relatório por grupos, #HITL no que espera o dono e o próximo passo. Impedimentos técnicos aparecem como responsabilidade do orquestrador, exceto o que só o dono resolve no terminal, como confiar no diretório da worktree ou aceitar termos novos do CLI: esse vira espera dele, com o comando exato e o ork retry run. Na versão {versao}, o resumo do pulse traz esses impedimentos num bloco próprio, e o impedimento novo sai na hora, sem esperar a cadência.",
              "ork master pedir solicita a nota de 0 a 5 e o motivo pelo Telegram autenticado; o recibo acompanha a gravação. Na sessão do dono, o diálogo nativo do host também coleta a nota: a ferramenta MCP ork_request_master_note recebe só o threadId, pede o formulário, grava master_done com autorizadoPor dono (dialogo nativo), o canal claude-code e o recibo assinado; sem formulário no cliente, recusa com master.nota.sem-dialogo sem gravar nada. A nota pelo diálogo nativo vale como nota humana, e um --por digitado pelo agente não substitui prova de canal."
            ],
            "code": "ork roadmap status\nork master pedir <thread> --formato telegram"
          }
        ]
      },
      "en": {
        "title": "Track HITL points and decisions",
        "description": "Distinguish a live session from one that can make progress.",
        "sections": [
          {
            "id": "observar",
            "title": "Observe threads and sessions",
            "paragraphs": [
              "ork monitor tracks threads; ork sessions hitl finds blocked sessions, including those without a thread. The radar distinguishes human waiting, failure and stale state using runtime evidence. A session listed as live may be waiting for an answer.",
              "The pulse summary goes out through the transport in .orkastery/monitor/pulse-host.json, a file that belongs to this machine. In version {versao}, if it is tracked by git, or is a link, it does not count, and the sweep exits with transporte.rastreado without running anything; the same applies to master-host.json for the digest."
            ],
            "code": "ork monitor\nork sessions hitl\nork pulse --json"
          },
          {
            "id": "responder",
            "title": "Answer through the authorized channel",
            "paragraphs": [
              "Without --registrar, the radar is read-only. The recording option writes actual transitions to the ledger. Questions and options must come from the observed session; unknown state remains unknown. A child session cannot impersonate the owner to answer a gate."
            ]
          },
          {
            "id": "pedido-curto",
            "title": "A short question with context",
            "paragraphs": [
              "ork.hitl-curto/v1 organizes a title, one-sentence question, what is blocked and since when, one-line options with consequences, a reasoned recommendation and a final response instruction. Evidence, claims, risks and diff are available using the short code followed by detalhes. Authenticated ingress and its HMAC proof remain required. There are up to five options, one marked Recommendation, in at most 15 lines."
            ],
            "code": "ork gate request <thread> --formato telegram"
          },
          {
            "id": "alternativas",
            "title": "Requests from ork as options",
            "paragraphs": [
              "Every request that ork itself opens to the owner is a selection of 3 to 5 options, with exactly one marked Recommendation. Registration refuses anything else without recording it: hitl.selecao.fora-da-faixa, hitl.selecao.recomendada or hitl.selecao.texto-livre. A text answer is accepted only with a technical dependency: the exact command the owner runs in the terminal and the reason.",
              "ork prompt lint fails a template that asks for a free-text confirmation or for the owner to paste text (rule hitl-texto-livre). Time blocked by these questions appears in ork ledger stats, in the hitlDeConducao field, with the median compared to the 5-minute target. The same time reaches ork pulse and ork roadmap status: each open question, with how long it has been blocking the thread and since when, in the owner’s timezone, and the median over the last 7 days. The pulse summary gains a line only above the target, alongside the summary that is already due, without breaking the cadence. A native question from a host session keeps the host’s own options."
            ],
            "code": "ork prompt lint\nork ledger stats\nork pulse --json\nork roadmap status --json"
          },
          {
            "id": "texto-e-linha",
            "title": "Free text and stable codes",
            "paragraphs": [
              "Unambiguous free text (the closed vocabulary, a letter from a to e or a digit from 1 to 5) can map to an option’s action. Ambiguity produces a clarification. A standalone word is accepted only within the core’s open listening window, with one request for the owner across all threads, and never for an irreversible action. The agent cannot answer for the owner.",
              "Reopening the same gate in the same context retains its code. An expired response transfers to a renewed request only when content and context are identical; changes cause rejection. Batches revalidate every gate before recording."
            ]
          },
          {
            "id": "recuperacao",
            "title": "When the runtime falls, the owner is the last resort",
            "paragraphs": [
              "ork retry run climbs a ladder with the same prompt and the same sha256: restart the claude-bg daemon, use the block's first fallback target and, last, another profile of the same runtime. Each step goes to the thread ledger as runtime_recuperacao, with the effective destination and the evidence, and a skipped or interrupted step costs no attempt.",
              "Once the three steps are exhausted, the owner is called with gate_blocked human.pending and three options, one recommended, the command that checks the runtime and the one that resumes the phase with the same prompt. The ladder applies per episode and never opens a second session in the same worktree; with a stuck daemon, retry restarts it before the liveness proof, and the third refusal in a row without an answer calls the owner."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
          },
          {
            "id": "status-e-nota",
            "title": "Status and scores with provenance",
            "paragraphs": [
              "ork roadmap status is read-only: it groups the report, marks owner decisions with #HITL and shows the next step. Technical blockers remain the orchestrator’s responsibility, except those only the owner can clear in the terminal, such as trusting the worktree directory or accepting new CLI terms: these become a wait for the owner, with the exact command and ork retry run. In version {versao}, the pulse summary lists these blockers in their own block, and a new one goes out right away, without waiting for the cadence.",
              "ork master pedir requests a score from 0 to 5 and a reason through authenticated Telegram; the receipt accompanies the record. In the owner's session, the host's native dialog also collects the score: the ork_request_master_note MCP tool takes only the threadId, asks for the form, and records master_done with autorizadoPor dono (dialogo nativo), the claude-code channel and the signed receipt; without a form in the client, it refuses with master.nota.sem-dialogo without recording anything. The native-dialog score counts as a human score, and an agent-supplied --por cannot replace channel proof."
            ],
            "code": "ork roadmap status\nork master pedir <thread> --formato telegram"
          }
        ]
      }
    }
  }
];
