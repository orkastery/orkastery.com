export default [
  {
    "slug": "comecar",
    "group": "start",
    "sources": [
      "docs/comecar/quickstart.md",
      "README.md",
      "core/package.json"
    ],
    "translations": {
      "pt": {
        "title": "Comece pelo primeiro ciclo",
        "description": "Instale o CLI, confira o ambiente e transforme um pedido em trabalho verificável.",
        "sections": [
          {
            "id": "instalar",
            "title": "Instale e confira",
            "paragraphs": [
              "Use Node.js 20 ou superior, Git e um repositório com pelo menos um commit: a thread parte do commit da base. O pacote se chama @orkastery/cli; o executável é ork. O núcleo não contém um modelo de IA. O runtime de agente configurado executa as fases: o claude-bg (o binário claude), que é o padrão, ou o Codex CLI. Esta documentação descreve a versão 0.5.3; confira a versão publicada com npm view @orkastery/cli version. O pacote traz nove dependências de runtime com versão fixa, entre elas os analisadores do grafo de código, que pede Node 20.19, 22.12 ou mais novo.",
              "Só com o Codex, passe cada bloco dos modos permitidos para ele com ork setup <modo> --bloco N --runtime codex --model <modelo>. Depois disso, a falta do claude vira aviso no doctor."
            ],
            "code": "npm install -g @orkastery/cli\nork doctor\nork demo"
          },
          {
            "id": "projeto",
            "title": "Prepare o projeto",
            "paragraphs": [
              "Execute init na raiz do seu repositório. Ele gera o manifesto, que define verificações, modo e integração com runtimes, e um bloco do Orkastery no AGENTS.md. O estado do ork (.orkastery/) e as worktrees das threads são da máquina, não do repositório: ficam fora do git sem mudar o seu .gitignore. Faça o commit do manifesto antes da primeira thread. Fora de um repositório git, o init recusa sem criar nada (init.fora-do-repositorio), e o doctor avisa quando o orkastery.yaml que leu fica fora do repositório, como o de um init antigo numa pasta acima.",
              "Em seguida, responda à pauta de onboarding. Registre apenas nomes de variáveis de credenciais; os valores ficam no ambiente do processo ou no cofre do host. A etapa maestro também oferece as preferências da conversa: idioma, fuso e profundidade, ou o opt-out. Confira os valores efetivos com ork experiencia show --json; o guia de experiência de orquestração explica a instalação em cada host. Respondida, a etapa maestro grava o bloco owner no orkastery.yaml: faça o commit do manifesto de novo antes do primeiro ork ship, porque a árvore principal suja barra o merge com tree.blocked."
            ],
            "code": "ork init --name \"meu-produto\" --abbrev prd\ngit add orkastery.yaml AGENTS.md\ngit commit -m \"ork init\"\nork onboarding\ngit commit -m \"ork onboarding\" orkastery.yaml\nork experiencia show --json\nork doctor"
          },
          {
            "id": "primeira-thread",
            "title": "Crie uma thread",
            "paragraphs": [
              "Uma thread reúne objetivo, plano, implementação, verificação e entrega. Comece com um pedido pequeno e um critério observável. Com worktree.por_thread: true, o que o init grava, a thread nasce com a própria worktree e a branch ork/<slug>, sem flag; --dry-run mostra a worktree antes de criar e --sem-worktree cria sem ela, mas aí o ship na branch base é barrado. Use o ID retornado nos comandos seguintes; o ID de exemplo não é um recibo real.",
              "Prefira claims com o teste focado: uma claim que roda a suíte inteira recebe aviso no registro e é recusada pelo ork ci prepare."
            ],
            "code": "ork thread new \"corrigir o filtro de data\" --modo classic --dry-run\nork thread new \"corrigir o filtro de data\" --modo classic\nork thread status <thread>\nork phase list <thread>"
          },
          {
            "id": "fechar",
            "title": "Feche a primeira thread em #Fast",
            "paragraphs": [
              "O menor ciclo completo usa o modo #Fast: uma única fase, GO, que só pausa no push. O phase run despacha o pedido para o runtime, que trabalha na worktree da thread. Registre a claim, o que o agente afirma mais o comando que a julga, e o verify a reexecuta no HEAD real com as verificações do manifesto. O ship faz o merge e o push com a sua autorização; sem o --autorizar-push, ele para com human.pending e mostra o comando que autoriza. O master por omissão fecha a thread com o índice derivado do ledger, e o thread status mostra status fechada.",
              "Se o phase run parar com runtime.workspace-untrusted, rode claude uma vez na worktree, aceite a confiança no diretório e saia; depois, ork retry run <thread> despacha o GO de novo com o mesmo prompt gravado. O ork pulse mostra a mesma instrução. O quickstart do repositório detalha cada etapa no #Classic, que também pausa no objetivo, no plano e nas evidências."
            ],
            "code": "ork thread new \"corrigir o filtro de data\" --modo fast\nork phase run <thread> GO --prompt \"<o pedido>\"\nork claims add <thread> <arquivo> --claim \"<alegação>\" --verificar \"<comando de teste>\"\nork verify <thread>\nork ship <thread> --para main --autorizar-push <você>\nork master <thread> --aceitar-omissao\nork thread status <thread>"
          },
          {
            "id": "confirmar",
            "title": "Confirme antes de avançar",
            "paragraphs": [
              "Um doctor bloqueado impede novo despacho; um aviso nunca bloqueia. Cada falha traz a correção: antes do init, por exemplo, o manifesto ausente aponta ork init. Resolva a causa indicada e execute-o novamente. A demo é um exercício local de uma alegação que falha e depois passa; não comprova que seu projeto está pronto para publicação. A linha analisadores do grafo mostra as versões do typescript e do micromark que o ork grafo usa e, quando faltam, avisa com a correção."
            ]
          },
          {
            "id": "host",
            "title": "Ative no seu host",
            "paragraphs": [
              "Copiar os arquivos do adaptador não ativa o plugin do Claude Code: rode a ativação que o instalador imprime e depois instale o servidor MCP do projeto. Numa sessão aberta no projeto, diga orkastery maestro ou use /orkastery:ork; as fases são /orkastery:goal, /orkastery:plan, /orkastery:go, /orkastery:check, /orkastery:ship e /orkastery:master. No Codex, ork adapter install codex põe a entrada $ork nas skills do projeto.",
              "O mesmo plugin, sem os hooks do projeto, também sai do marketplace do repositório. Use um dos dois caminhos, porque os dois se chamam orkastery."
            ],
            "code": "ork adapter install claude-code\nclaude plugin validate \"$PWD/.claude/plugins/orkastery\"\nclaude plugin marketplace add \"$PWD/.claude/plugins/orkastery\" --scope project\nclaude plugin install orkastery@orkastery --scope project\nork mcp install --project \"$PWD\" --host claude-code"
          },
          {
            "id": "prova-local",
            "title": "Experimente sem conta",
            "paragraphs": [
              "ork demo funciona offline e sem conta: mostra uma claim falsa reprovada e a corrigida aceita. Para contribuir com o núcleo, a suíte hermética do CI não exige runtime de agente. A execução de fases usa o runtime e o perfil configurados no projeto."
            ],
            "code": "ork demo\nork --version"
          }
        ]
      },
      "en": {
        "title": "Start with your first cycle",
        "description": "Install the CLI, check your environment and turn a request into verifiable work.",
        "sections": [
          {
            "id": "instalar",
            "title": "Install and check",
            "paragraphs": [
              "Use Node.js 20 or later, Git and a repository with at least one commit: a thread starts from the base commit. The package is @orkastery/cli; its executable is ork. The core contains no AI model. Your configured agent runtime executes the phases: claude-bg (the claude binary), the default, or the Codex CLI. This documentation describes version 0.5.3; check the published version with npm view @orkastery/cli version. The package ships nine pinned runtime dependencies, including the code graph analyzers; the code graph needs Node 20.19, 22.12 or later.",
              "To use Codex only, move each block of the allowed modes to it with ork setup <mode> --bloco N --runtime codex --model <model>. After that, a missing claude is only a doctor warning."
            ],
            "code": "npm install -g @orkastery/cli\nork doctor\nork demo"
          },
          {
            "id": "projeto",
            "title": "Prepare the project",
            "paragraphs": [
              "Run init at the root of your repository. It generates the manifest, which defines checks, conduction mode and runtime integration, plus an Orkastery block in AGENTS.md. The ork state (.orkastery/) and the thread worktrees belong to the machine, not to the repository: they stay out of git without changing your .gitignore. Commit the manifest before your first thread. Outside a git repository, init refuses without creating anything (init.fora-do-repositorio), and doctor warns when the orkastery.yaml it read lies outside the repository, such as one left by an old init in a parent folder.",
              "Then complete onboarding. Record credential variable names only; values stay in the process environment or the host vault. The maestro stage also offers conversation preferences: language, timezone and depth, or opt-out. Check the effective values with ork experiencia show --json; the orchestration experience guide explains installation in each host. Once answered, the maestro step writes the owner block into orkastery.yaml: commit the manifest again before the first ork ship, because a dirty main tree blocks the merge with tree.blocked."
            ],
            "code": "ork init --name \"my-product\" --abbrev prd\ngit add orkastery.yaml AGENTS.md\ngit commit -m \"ork init\"\nork onboarding\ngit commit -m \"ork onboarding\" orkastery.yaml\nork experiencia show --json\nork doctor"
          },
          {
            "id": "primeira-thread",
            "title": "Create a thread",
            "paragraphs": [
              "A thread brings together the goal, plan, implementation, verification and delivery. Start with a small request and an observable criterion. With worktree.por_thread: true, which init writes, the thread is created with its own worktree and an ork/<slug> branch, no flag needed; --dry-run shows the worktree before creating it, and --sem-worktree creates the thread without one, but then ship on the base branch is blocked. Use the returned ID in subsequent commands; the example ID is not a real receipt.",
              "Prefer claims backed by a focused test: a claim that runs the whole suite gets a warning when recorded and is refused by ork ci prepare."
            ],
            "code": "ork thread new \"fix the date filter\" --modo classic --dry-run\nork thread new \"fix the date filter\" --modo classic\nork thread status <thread>\nork phase list <thread>"
          },
          {
            "id": "fechar",
            "title": "Close your first thread in #Fast",
            "paragraphs": [
              "The smallest full cycle uses #Fast mode: a single GO phase that pauses only at the push. phase run dispatches the request to the runtime, which works in the thread’s worktree. Record the claim, what the agent states plus the command that judges it, and verify re-runs it on the real HEAD together with the manifest checks. ship merges and pushes with your authorization; without --autorizar-push it stops with human.pending and prints the command that authorizes it. master by default closes the thread with the index derived from the ledger, and thread status then shows status fechada (closed).",
              "If phase run stops with runtime.workspace-untrusted, run claude once in the worktree, accept the directory trust prompt and exit; then ork retry run <thread> dispatches GO again with the same recorded prompt. ork pulse shows the same instruction. The CLI prints Brazilian Portuguese today: the README glossary, Reading the CLI in English, translates what a first run shows. The repository quickstart details each step in #Classic, which also pauses at the goal, the plan and the evidence."
            ],
            "code": "ork thread new \"fix the date filter\" --modo fast\nork phase run <thread> GO --prompt \"<the request>\"\nork claims add <thread> <file> --claim \"<statement>\" --verificar \"<test command>\"\nork verify <thread>\nork ship <thread> --para main --autorizar-push <you>\nork master <thread> --aceitar-omissao\nork thread status <thread>"
          },
          {
            "id": "confirmar",
            "title": "Confirm before proceeding",
            "paragraphs": [
              "A blocked doctor prevents a new dispatch; a warning never blocks. Each failure carries its fix: before init, for example, the missing manifest points to ork init. Resolve the reported cause and rerun it. The demo is a local exercise in a claim that fails and then passes; it does not establish that your project is ready for publication. The graph analyzers line shows the typescript and micromark versions that ork grafo uses and, when they are missing, warns with the fix."
            ]
          },
          {
            "id": "host",
            "title": "Activate it in your host",
            "paragraphs": [
              "Copying the adapter files does not activate the Claude Code plugin: run the activation the installer prints, then install the project MCP server. In a session opened in the project, say orkastery maestro or use /orkastery:ork; the phases are /orkastery:goal, /orkastery:plan, /orkastery:go, /orkastery:check, /orkastery:ship and /orkastery:master. In Codex, ork adapter install codex adds the $ork entry to the project skills.",
              "The same plugin, without the project hooks, is also available from the repository marketplace. Choose one of the two paths, because both are named orkastery."
            ],
            "code": "ork adapter install claude-code\nclaude plugin validate \"$PWD/.claude/plugins/orkastery\"\nclaude plugin marketplace add \"$PWD/.claude/plugins/orkastery\" --scope project\nclaude plugin install orkastery@orkastery --scope project\nork mcp install --project \"$PWD\" --host claude-code"
          },
          {
            "id": "prova-local",
            "title": "Try it without an account",
            "paragraphs": [
              "ork demo runs offline without an account: it shows a false claim failing and its correction passing. The hermetic core CI suite requires no agent runtime. Running phases uses the project’s configured runtime and profile."
            ],
            "code": "ork demo\nork --version"
          }
        ]
      },
      "es": {
        "title": "Empiece por el primer ciclo",
        "description": "Instale el CLI, compruebe el entorno y convierta una petición en trabajo verificable.",
        "sections": [
          {
            "id": "instalar",
            "title": "Instale y compruebe",
            "paragraphs": [
              "Utilice Node.js 20 o posterior, Git y un repositorio con al menos un commit: la thread parte del commit de la base. El paquete se llama @orkastery/cli; su ejecutable es ork. El núcleo no contiene un modelo de IA. El runtime de agente configurado ejecuta las fases: claude-bg (el binario claude), que es el predeterminado, o el Codex CLI. Esta documentación describe la versión 0.5.3; compruebe la versión publicada con npm view @orkastery/cli version. El paquete trae nueve dependencias de runtime con versión fija, entre ellas los analizadores del grafo de código, que pide Node 20.19, 22.12 o posterior.",
              "Para usar solo Codex, pase cada bloque de los modos permitidos a él con ork setup <modo> --bloco N --runtime codex --model <modelo>. A partir de entonces, la falta de claude es solo un aviso del doctor."
            ],
            "code": "npm install -g @orkastery/cli\nork doctor\nork demo"
          },
          {
            "id": "projeto",
            "title": "Prepare el proyecto",
            "paragraphs": [
              "Ejecute init en la raíz del repositorio. Genera el manifiesto, que define las verificaciones, el modo de conducción y la integración con runtimes, y un bloque de Orkastery en AGENTS.md. El estado de ork (.orkastery/) y las worktrees de las threads pertenecen a la máquina, no al repositorio: quedan fuera de git sin cambiar su .gitignore. Haga commit del manifiesto antes de la primera thread. Fuera de un repositorio git, init se niega sin crear nada (init.fora-do-repositorio), y doctor avisa cuando el orkastery.yaml que leyó queda fuera del repositorio, como el de un init antiguo en una carpeta superior.",
              "Después complete el onboarding. Registre solo los nombres de las variables de credenciales; los valores quedan en el entorno del proceso o en el almacén del host. La etapa maestro también ofrece las preferencias de la conversación: idioma, zona horaria y profundidad, o la desactivación. Compruebe los valores efectivos con ork experiencia show --json; la guía de experiencia de orquestación explica la instalación en cada host. Una vez respondida, la etapa maestro escribe el bloque owner en orkastery.yaml: haga de nuevo el commit del manifiesto antes del primer ork ship, porque el árbol principal sucio bloquea el merge con tree.blocked."
            ],
            "code": "ork init --name \"mi-producto\" --abbrev prd\ngit add orkastery.yaml AGENTS.md\ngit commit -m \"ork init\"\nork onboarding\ngit commit -m \"ork onboarding\" orkastery.yaml\nork experiencia show --json\nork doctor"
          },
          {
            "id": "primeira-thread",
            "title": "Cree una thread",
            "paragraphs": [
              "Una thread reúne objetivo, plan, implementación, verificación y entrega. Empiece con una petición pequeña y un criterio observable. Con worktree.por_thread: true, que init escribe, la thread nace con su propia worktree y la rama ork/<slug>, sin flag; --dry-run muestra la worktree antes de crearla y --sem-worktree crea la thread sin ella, pero entonces el ship en la rama base queda bloqueado. Utilice el ID devuelto en los siguientes comandos; el ID del ejemplo no es un comprobante real.",
              "Prefiera claims con la prueba focalizada: una claim que ejecuta la suite completa recibe un aviso al registrarse y ork ci prepare la rechaza."
            ],
            "code": "ork thread new \"corregir el filtro de fecha\" --modo classic --dry-run\nork thread new \"corregir el filtro de fecha\" --modo classic\nork thread status <thread>\nork phase list <thread>"
          },
          {
            "id": "fechar",
            "title": "Cierre la primera thread en #Fast",
            "paragraphs": [
              "El ciclo completo más pequeño usa el modo #Fast: una sola fase, GO, que solo se detiene en el push. phase run despacha la petición al runtime, que trabaja en la worktree de la thread. Registre la claim, lo que el agente afirma más el comando que la juzga, y verify la vuelve a ejecutar en el HEAD real junto con las verificaciones del manifiesto. ship hace el merge y el push con su autorización; sin --autorizar-push se detiene con human.pending y muestra el comando que autoriza. master por omisión cierra la thread con el índice derivado del ledger, y thread status muestra status fechada (cerrada).",
              "Si phase run se detiene con runtime.workspace-untrusted, ejecute claude una vez en la worktree, acepte la confianza en el directorio y salga; después, ork retry run <thread> vuelve a despachar GO con el mismo prompt registrado. ork pulse muestra la misma instrucción. El CLI muestra sus mensajes en portugués de Brasil. El quickstart del repositorio detalla cada etapa en #Classic, que también se detiene en el objetivo, el plan y las evidencias."
            ],
            "code": "ork thread new \"corregir el filtro de fecha\" --modo fast\nork phase run <thread> GO --prompt \"<la petición>\"\nork claims add <thread> <archivo> --claim \"<afirmación>\" --verificar \"<comando de prueba>\"\nork verify <thread>\nork ship <thread> --para main --autorizar-push <usted>\nork master <thread> --aceitar-omissao\nork thread status <thread>"
          },
          {
            "id": "confirmar",
            "title": "Confirme antes de avanzar",
            "paragraphs": [
              "Un doctor bloqueado impide un nuevo despacho; un aviso nunca bloquea. Cada fallo trae su corrección: antes de init, por ejemplo, el manifiesto ausente indica ork init. Resuelva la causa indicada y vuelva a ejecutarlo. La demo muestra una alegación que falla y después pasa; no demuestra que su proyecto esté listo para publicarse. La línea de analizadores del grafo muestra las versiones de typescript y micromark que usa ork grafo y, cuando faltan, avisa con la corrección."
            ]
          },
          {
            "id": "host",
            "title": "Actívelo en su host",
            "paragraphs": [
              "Copiar los archivos del adaptador no activa el plugin de Claude Code: ejecute la activación que imprime el instalador y después instale el servidor MCP del proyecto. En una sesión abierta en el proyecto, diga orkastery maestro o use /orkastery:ork; las fases son /orkastery:goal, /orkastery:plan, /orkastery:go, /orkastery:check, /orkastery:ship y /orkastery:master. En Codex, ork adapter install codex añade la entrada $ork a las skills del proyecto.",
              "El mismo plugin, sin los hooks del proyecto, también está en el marketplace del repositorio. Use uno de los dos caminos, porque ambos se llaman orkastery."
            ],
            "code": "ork adapter install claude-code\nclaude plugin validate \"$PWD/.claude/plugins/orkastery\"\nclaude plugin marketplace add \"$PWD/.claude/plugins/orkastery\" --scope project\nclaude plugin install orkastery@orkastery --scope project\nork mcp install --project \"$PWD\" --host claude-code"
          },
          {
            "id": "prova-local",
            "title": "Pruébelo sin cuenta",
            "paragraphs": [
              "ork demo funciona sin red ni cuenta: muestra una claim falsa rechazada y su corrección aprobada. La suite hermética del CI del núcleo no exige runtime de agente. Las fases usan el runtime y el perfil configurados en el proyecto."
            ],
            "code": "ork demo\nork --version"
          }
        ]
      }
    }
  }
];
