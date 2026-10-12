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
        "description": "Compare as pausas previstas e os limites de cada modo.",
        "sections": [
          {
            "id": "escolher",
            "title": "Escolha pela decisão necessária",
            "paragraphs": [
              "#Classic separa objetivo, plano e evidências em três pausas. #Maestro concentra a pausa nas premissas e no plano. #Auto percorre o ciclo completo sem pausa prevista. Em todos eles, bloqueios e escalações continuam ativos."
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
              "O modo diz quantas pausas a thread tem; a worktree diz onde ela escreve. Com worktree.por_thread: true, o valor que o ork init grava, ork thread new cria a worktree e a branch ork/<slug> em qualquer modo, sem flag, e ork ship entrega essa branch. Com a chave false ou ausente, a worktree só nasce com --worktree auto ou com um ciclo que a exige.",
              "--worktree <DIR> reusa um diretório existente. --sem-worktree cria a thread na raiz do projeto: na branch base, ork ship é barrado por push_direto_na_base: block, o padrão do ork init, e antes do GO ork worktree ensure <thread> ainda cria a worktree. --dry-run mostra a worktree e a branch que seriam criadas, ou por que a criação seria recusada. Os ciclos greenfield, merge-branch e feature-xl-faseada exigem worktree e recusam --sem-worktree. Num repositório sem commit, a thread nasce na raiz, com aviso."
            ],
            "code": "ork thread new \"corrigir o filtro\" --modo classic --dry-run\nork thread new \"corrigir o filtro\" --modo classic --sem-worktree\nork worktree ensure <thread>"
          }
        ]
      },
      "en": {
        "title": "Choose a conduction mode",
        "description": "Compare scheduled pauses and the limits of each mode.",
        "sections": [
          {
            "id": "escolher",
            "title": "Choose by the decision required",
            "paragraphs": [
              " #Classic provides three pauses for the goal, plan and evidence. #Maestro concentrates its pause on assumptions and the plan. #Auto runs the full cycle without scheduled pauses. Blocking conditions and escalations remain active in all three."
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
              "The mode decides how many pauses a thread has; the worktree decides where it writes. With worktree.por_thread: true, the value written by ork init, ork thread new creates the worktree and the ork/<slug> branch in any mode, without a flag, and ork ship delivers that branch. With the key set to false or missing, the worktree is only created with --worktree auto or by a cycle that requires it.",
              "--worktree <DIR> reuses an existing directory. --sem-worktree creates the thread at the project root: on the base branch, ork ship is blocked by push_direto_na_base: block, the ork init default, and before GO ork worktree ensure <thread> can still create the worktree. --dry-run shows the worktree and branch that would be created, or why creation would be refused. The greenfield, merge-branch and feature-xl-faseada cycles require a worktree and refuse --sem-worktree. In a repository without commits, the thread starts at the root with a warning."
            ],
            "code": "ork thread new \"corrigir o filtro\" --modo classic --dry-run\nork thread new \"corrigir o filtro\" --modo classic --sem-worktree\nork worktree ensure <thread>"
          }
        ]
      },
      "es": {
        "title": "Elija un modo de conducción",
        "description": "Compare las pausas previstas y los límites de cada modo.",
        "sections": [
          {
            "id": "escolher",
            "title": "Elija según la decisión necesaria",
            "paragraphs": [
              "#Classic ofrece tres pausas para el objetivo, el plan y las pruebas. #Maestro concentra la pausa en las premisas y el plan. #Auto recorre el ciclo completo sin pausas previstas. Los bloqueos y escalados siguen activos en los tres."
            ],
            "code": "ork modos\nork modos --do-pedido \"revisar a documentação #Maestro\""
          },
          {
            "id": "fast",
            "title": "Los límites de #Fast",
            "paragraphs": [
              "#Fast ejecuta solo GO, con pruebas proporcionales a una petición pequeña. No concede permiso automático de push ni permite cambiar contratos públicos protegidos. Los cambios en la matriz de modos, schemas o contratos de integración requieren un modo de ciclo completo."
            ]
          },
          {
            "id": "validar",
            "title": "Compruebe el manifiesto",
            "paragraphs": [
              "Sin etiqueta se aplica conduction.default_mode. El núcleo comprueba la elección con conduction.allowed_modes. Una etiqueta no autoriza a ignorar el alcance explícito del dueño."
            ]
          },
          {
            "id": "so-codex",
            "title": "Solo con Codex",
            "paragraphs": [
              "La configuración predeterminada despacha los bloques por claude-bg. Para usar solo Codex, pase cada bloque de los modos permitidos a él; ork setup <modo> lista los bloques. ork doctor falla por la ausencia de claude solo mientras algún bloque de un modo permitido despache por claude-bg; un fallback que caiga en él solo genera un aviso."
            ],
            "code": "ork setup classic\nork setup classic --bloco 1 --runtime codex --model <modelo>"
          },
          {
            "id": "worktree",
            "title": "La worktree de la thread",
            "paragraphs": [
              "El modo define cuántas pausas tiene la thread; la worktree define dónde escribe. Con worktree.por_thread: true, el valor que graba ork init, ork thread new crea la worktree y la rama ork/<slug> en cualquier modo, sin flag, y ork ship entrega esa rama. Con la clave en false o ausente, la worktree solo se crea con --worktree auto o con un ciclo que la exige.",
              "--worktree <DIR> reutiliza un directorio existente. --sem-worktree crea la thread en la raíz del proyecto: en la rama base, ork ship queda bloqueado por push_direto_na_base: block, el valor por defecto de ork init, y antes del GO ork worktree ensure <thread> todavía puede crear la worktree. --dry-run muestra la worktree y la rama que se crearían, o por qué se rechazaría la creación. Los ciclos greenfield, merge-branch y feature-xl-faseada exigen worktree y rechazan --sem-worktree. En un repositorio sin commits, la thread nace en la raíz, con aviso."
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
          }
        ]
      },
      "es": {
        "title": "Configure el proyecto",
        "description": "Registre objetivos, productos, integraciones y preferencias públicas.",
        "sections": [
          {
            "id": "pauta",
            "title": "Retome la entrevista existente",
            "paragraphs": [
              "Consulte el estado antes de volver a preguntar. Las respuestas cubren conducción, credenciales por nombre de variable, bases de datos, memoria, productos, topología, arquitectura, skills y auditoría. Un proyecto configurado puede retomarse sin repetir la entrevista."
            ],
            "code": "ork onboarding\nork onboarding show --json"
          },
          {
            "id": "respostas",
            "title": "Registre información pública",
            "paragraphs": [
              "Use ork onboarding set para registrar una etapa con autoría. Revise la salida antes de publicar la entrevista en la memoria. Los DSN, tokens y contraseñas no pertenecen a las respuestas públicas; la configuración referencia variables protegidas. Sin --por, la autoría registrada es owner, lo que no demuestra la respuesta de una persona. Los valores secretos quedan en el entorno del proceso o en el almacén del host (en Hermes, ~/.hermes/.env); el onboarding guarda solo el nombre de la variable y nunca lee el valor."
            ],
            "code": "ork onboarding set produtos --conteudo '{\"produtos\":[\"meu-produto\"]}' --por operador"
          },
          {
            "id": "experiencia",
            "title": "Preferencias de la conversación",
            "paragraphs": [
              "La etapa maestro también ofrece activar el paquete de experiencia con los valores detectados, configurarlo o desactivarlo. Una respuesta con el objeto owner guarda idioma, zona horaria, profundidad y activación en el manifiesto, conservando las demás secciones y respuestas. Consultar las preferencias no crea respuesta, autoría ni aprobación. ork doctor avisa cuando la zona horaria de la entrevista difiere del manifiesto; con owner.timezone en la misma respuesta maestro, el aviso compara ese valor, y el campo fuso heredado solo vale sin él."
            ],
            "code": "ork experiencia show --json\nork onboarding set maestro --conteudo '{\"owner\":{\"language\":\"es-ES\",\"timezone\":\"UTC\",\"depth\":\"curta\",\"experience\":true}}' --por equipe"
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
      },
      "es": {
        "title": "Experiencia de orquestación",
        "description": "Defina idioma, zona horaria y profundidad de la conversación e instale o retire el paquete en cada host.",
        "sections": [
          {
            "id": "configurar",
            "title": "Configure las preferencias",
            "paragraphs": [
              "El paquete orienta cómo conversa el agente al conducir el proyecto. Doce reglas guían mensajes, decisiones, pruebas, documentación, coordinación y entrega. Los gates, los permisos y la identidad humana siguen en el núcleo.",
              "owner.language recibe un locale BCP-47; owner.timezone, una zona horaria IANA; owner.depth, curta (breve) o detalhada (detallada); owner.experience, true o false. Sin valor, se aplican el locale del sistema (con C, POSIX o sin locale, pt-BR, el idioma de la CLI), la zona que resuelve el núcleo, curta y true. Los locales portugueses usan la variante pt-BR de las skills; los demás usan la inglesa y conservan el idioma de respuesta configurado. Una entrada inválida se rechaza antes de guardar; un valor inválido editado a mano genera un aviso y se aplica el valor predeterminado."
            ],
            "code": "ork onboarding\nork experiencia show --json"
          },
          {
            "id": "instalar",
            "title": "Instale en cada host",
            "paragraphs": [
              "ork adapter install escribe el catálogo y un bloque propio en CLAUDE.md, para Claude Code, o en AGENTS.md, para Codex; Hermes recibe las dos variantes junto a la skill existente. El bloque apunta al catálogo con una ruta relativa al proyecto, para que funcione en otro clon, y conserva el bloque de ork init y el contenido externo. En un clon sin comprobante, un bloque idéntico al generado se adopta sin duplicarse. --dir cambia la carpeta base del host (.claude en Claude Code, .agents en Codex): el catálogo va a <dir>/plugins/orkastery o <dir>/skills/orkastery, y el bloque sigue en la raíz del proyecto. Un catálogo fuera del proyecto omite el bloque con aviso.",
              "Copiar archivos no demuestra el descubrimiento nativo ni el uso por el modelo: compruebe la preferencia efectiva en el chat del host. Claude Code también exige la activación del plugin que indica el instalador, y otra worktree necesita su propia instalación. OpenClaw todavía no distribuye estas skills."
            ],
            "code": "ork adapter install codex --dry-run\nork adapter install codex"
          },
          {
            "id": "desativar",
            "title": "Desactive o retire",
            "paragraphs": [
              "Con owner.experience en false, la reinstalación retira el bloque gestionado; repita ork adapter install en cada host con bloque. Hermes respeta la preferencia mediante la entrada de su skill. ork experiencia uninstall retira solo el bloque de codex o claude-code, conserva el adaptador y no cambia la preferencia global. Sin cambios externos, la retirada restaura los bytes anteriores.",
              "Un bloque editado o duplicado, un comprobante incompatible o un archivo de instrucciones enlazado hacen que ork adapter install omita solo el paquete, con aviso, y que ork experiencia uninstall se niegue sin escribir. Corrija el archivo a mano; no borre el comprobante para forzar la instalación."
            ],
            "code": "ork onboarding set maestro --conteudo '{\"owner\":{\"experience\":false}}' --por equipe\nork adapter install codex\nork experiencia uninstall codex --dry-run"
          },
          {
            "id": "coordenar",
            "title": "Coordine antes de asumir un elemento",
            "paragraphs": [
              "Consulte reservas y fábrica antes de asumir trabajo. El dry-run de ork thread new no reserva; sin él, --roadmap usa la reserva del núcleo, y un RM-NNN solo en el nombre genera un aviso sin asociar el elemento.",
              "En MCP, ork_roadmap_reservas y ork_fabrica usan el proyecto fijado por el servidor y responden atualizado (actualizado), desatualizado (desactualizado) o indisponivel (no disponible). La falta de disponibilidad trae datos nulos, nunca una lista vacía engañosa. Estas consultas no reservan, no publican, no hacen push ni firman gates."
            ],
            "code": "ork roadmap reservas\nork fabrica\nork thread new \"RM-012 ejemplo de mejora\" --modo auto --roadmap RM-012 --dry-run"
          },
          {
            "id": "limites",
            "title": "Pruebas y límites",
            "paragraphs": [
              "Las pruebas específicas cubren preferencias, bloques, clones sin comprobante, conflictos, adaptadores y contratos MCP. Los evals de las skills son estáticos y no demuestran el comportamiento real de un modelo. Un ensayo desde el repositorio del producto instala el paquete local en un prefijo y un HOME temporales y comprueba instalación, reinstalación, desactivación, retirada y restauración. El paquete se publicó en @orkastery/cli 0.5.0. Un commit local o una prueba local no son una entrega."
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
              "A RM-059 quer levar a condução da fábrica para dentro da sessão do Claude Code em que você já trabalha, por mods: plugins de function hooks do Claude Code, que rodam dentro do cliente, reagem a eventos da sessão e desenham painéis, faixas e avisos. Na versão {versao} existem seis, e a main do núcleo já tem um sétimo, ainda fora de uma versão publicada:"
            ],
            "items": [
              "A ponte (ork-ponte), a base dos outros mods: dá a cada um o papel da sessão (dono na sessão de quem conduz, fase nas sessões de fase, ou dormente), o retrato do núcleo pelo ork_maestro, a faixa acima do prompt e o registro do que um mod mostrou ao dono. Ela tem os papéis dono e fase.",
              "A Torre de Controle (ork-torre): na sessão do dono, um painel com cada thread aberta numa linha, com o trilho das seis fases, o modo, quem conduz e desde quando, o bloqueio tipado numa frase curta, os pedidos ao dono e a ação que o estado da thread pede. O comando /torre abre o painel, e apertar a linha abre o detalhe da thread. Ela depende da ponte e só tem o papel dono.",
              "O Clima de Cota (ork-clima): na sessão do dono, lê as janelas de limite da conta a cada medição do motor (session.measure), guarda a série e prevê quando cada janela acaba no ritmo atual. Só no alerta, a faixa da ponte diz qual retomada da fila não cabe antes de a janela acabar, quanto dela já foi usado, quando ela acaba e quando renova; o comando /clima mostra cada janela, a fila de retomada, as threads abertas paradas por cota e as contas do registro do ork accounts esgotamentos. Ele só lê e avisa: trocar de conta, de runtime ou de modelo fica com o núcleo e com o dono. Também depende da ponte e só tem o papel dono.",
              "O Freio de Lote (ork-freio), o primeiro mod de papel fase: na sessão de fase, depois de cada lote de ferramentas, ele acha os arquivos que o lote mexeu (pelos caminhos das edições e pela diferença do git status, que pega também a edição feita por Bash) e as claims da thread que os citam, pede ao núcleo, em segundo plano, a conferência delas com ork claims conferir, no sandbox do verify, e devolve no lote seguinte o que quebrou: o id da claim, o comando e o fim da saída. Também avisa quando o lote mexeu fora dos touch_paths do plano. Ele vai sozinho às sessões de fase pelo despacho, com o adaptador instalado (ork adapter install claude-code), e precisa de um ork com ork claims conferir no PATH da sessão: sem ele, avisa uma vez que a conferência está indisponível e segue. Também depende da ponte.",
              "O Radar de Colisão (ork-radar): na sessão do dono, a cada 10 min e no comando /radar, calcula o merge de cada thread aberta contra a origin/main local e entre as threads, antes do SHIP, sem worktree e sem gravar objeto no repositório (por git merge-tree --write-tree num temporário). O painel mostra o mapa de calor, os arquivos em conflito, o lease que cobre cada um e, como texto, o comando ork worktree sync <thread> --dry-run que resolve; a colisão nova vira uma linha na faixa da ponte. O fetch continua com o núcleo. Ele só lê, depende da ponte e só tem o papel dono.",
              "A Mesa do Dono (ork-mesa): na sessão do dono, junta num painel o que espera por você. O comando /mesa abre o lote de até cinco perguntas, cada uma com a alternativa recomendada na frente, o porquê e a consequência das outras; as decisões que a fábrica tomou por você na semana, com como mudar e o custo de reverter agora e depois; e as paradas, só para leitura. O botão Decidir só pede ao núcleo o diálogo nativo do host (ork_request_decision, com o threadId e o pedidoId), e o código e a letra para o Telegram ficam sempre à vista; a prova de que o diálogo abre quando o pedido vem de um mod ainda está pendente do dono. A Mesa só decide por você pela decisão autônoma do núcleo (ork_decision_record), e só quando o pedido declara que segue a recomendada no prazo e passa nas quatro condições do núcleo; hoje o núcleo não marca nenhum pedido assim, então ela não decide nada sozinha. Nunca responde um pedido. Depende da ponte e só tem o papel dono.",
              "A Sentinela do Condutor (ork-sentinela), por enquanto só na main: na sessão do dono, mantém pelo núcleo a presença dela nesta máquina, com uma batida a cada 60 s, e a tira quando a sessão acaba; enquanto a presença vale, o condutor externo cede o despacho. Quando um ledger de thread muda, e a cada batida, ela relê o passo do condutor em cada thread aberta e despacha a fase seguinte das threads #Auto que o núcleo manda despachar, uma vez por turno e só pelo ork phase run; a retomada só roda o ork retry run quando o ork retry plan é automático. A cada 5 min, o que só o dono resolve no ork pulse vira notificação do sistema, com o próximo passo do núcleo, uma vez por texto, e entra no registro da ponte, para o Telegram não repetir. A faixa da ponte mostra as threads andando e as paradas, e o comando /sentinela mostra o passo de cada thread e o diário do que ela despachou, cedeu e avisou, e também pausa e retoma a Sentinela. Ela depende da ponte e só tem o papel dono."
            ]
          },
          {
            "id": "carregar",
            "title": "Carregue na sua sessão",
            "paragraphs": [
              "A Torre, o Clima, o Radar, a Mesa e a Sentinela só ligam na sessão do dono (o Freio, de papel fase, chega às sessões de fase pelo despacho), que a ponte reconhece por duas coisas: o orkastery.yaml na raiz e o servidor MCP orkastery do projeto conectado. Os comandos abaixo vêm em três grupos: o servidor MCP do projeto; o adaptador do Claude Code, que deixa a cópia de cada mod em .claude/plugins/orkastery/mods/<mod>, e a carga deles na sessão por --plugin-dir; e, sem o adaptador local, a instalação pelo marketplace do repositório, no escopo do projeto. Os comandos da Sentinela estão na seção seguinte, porque ela pede um ork com comandos que só a main do núcleo tem.",
              "A API de mods pede o Claude Code 2.1.287 ou mais novo. No CI, o job mods instala o Claude Code 2.1.296, valida e testa cada mod e procura no binário cada evento que eles usam; nessa busca, os builds 2.1.288 e 2.1.289 reprovam, sem ui.notify.",
              "Os dois marketplaces se chamam orkastery, e o local, registrado a partir de .claude/plugins/orkastery na ativação do adaptador, não lista os mods. Não troque um pelo outro num projeto que usa o plugin do adaptador: remover um marketplace desinstala os plugins que vieram dele, e o plugin do marketplace do repositório não traz o guard PreToolUse nem o MCP do adaptador."
            ],
            "code": "ork mcp install --project \"$PWD\" --host claude-code\n\nork adapter install claude-code\nclaude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-torre --plugin-dir .claude/plugins/orkastery/mods/ork-clima --plugin-dir .claude/plugins/orkastery/mods/ork-radar --plugin-dir .claude/plugins/orkastery/mods/ork-mesa\n\nclaude plugin marketplace add orkastery/orkastery\nclaude plugin install ork-ponte@orkastery --scope project\nclaude plugin install ork-torre@orkastery --scope project\nclaude plugin install ork-clima@orkastery --scope project\nclaude plugin install ork-radar@orkastery --scope project\nclaude plugin install ork-mesa@orkastery --scope project"
          },
          {
            "id": "sentinela",
            "title": "Deixe a Sentinela despachar",
            "paragraphs": [
              "Com a sua sessão aberta no Claude Code e a Sentinela ligada e não pausada, é ela que despacha a fase seguinte das threads #Auto e faz o retry delas, e o condutor externo (por exemplo, um cron no gateway do Hermes) cede. Com a Sentinela pausada, ou com a sessão fechada (a presença vence 3 min depois da última batida), o condutor externo volta a conduzir. A publicação da branch, o merge do PR verde e os avisos do Telegram ficam sempre com o condutor externo: a Sentinela não publica branch, não abre nem mergeia PR e não manda mensagem pelo Telegram.",
              "Ela pede um ork com os comandos de presença que só a main do núcleo tem, e carrega junto com a ponte, pela pasta do adaptador ou pelo marketplace do repositório, como no bloco abaixo. O script do condutor externo fica fora do repositório, e a mudança nele é sua: uma vez por rodada, antes do laço de despacho, ele lê o status da Sentinela com --json e, enquanto presenca.ativa for true, pula o despacho da fase seguinte e o ork retry run das threads #Auto. A publicação da branch que só espera push, o merge do PR verde e os avisos ao dono ficam como estão; sem presença viva, o condutor externo conduz como antes.",
              "Não há despacho duplicado, porque os dois condutores despacham só pelo núcleo: o ork phase run toma a condução da thread sob uma trava do kernel. Com dois pedidos no mesmo instante, um despacha e o outro sai sem sessão nova; com a thread já conduzida, o pedido sai 3, com conducao.em-andamento, e grava conducao_recusada; e o mesmo pedido de quem já conduz grava despacho_idempotente e devolve a sessão em andamento. A Sentinela ainda relê a condução logo antes de despachar, nunca usa ork conducao assumir e guarda o turno que já despachou. O despacho dela leva o canal do Claude Code e a sessão dela na correlação, e o phase_dispatch mostra de onde veio.",
              "A Sentinela não escolhe a fase: segue a ação que o núcleo dá a cada thread no status. No #Auto, depois de uma fase concluída, sai a fase seguinte à prova mais adiantada que a sessão do bloco deixou: o artefato da fase (goal.md, plan.md, check.md) gravado depois do despacho, o produto na branch, que mostra que houve GO, ou o ship_done e o master_done. Se o bloco já passou do CHECK, nada sai: a entrega fica com o condutor externo e com o dono. O CHECK que terminou sem exatamente um veredito é redespachado, e o despacho que falhou antes de abrir sessão vai ao ork retry plan. Pendência do dono (thread pausada, pergunta aberta, escalação) segura qualquer passo, e, sem pedido guardado na criação da thread (ork thread new --pedido), a Sentinela não despacha e avisa.",
              "Recusa que passa (outro condutor, projeto sem vaga, pedido aberto, falha) não queima o turno: a Sentinela tenta de novo depois de 3 min, e a mesma recusa seguida dobra a espera até 30 min; só o despacho feito, ou o pedido repetido de quem já conduz, fica de vez. Se o seu condutor externo despacha pela última linha do ledger, ele pode repetir uma fase que a sessão do bloco já fez; ler a ação de cada thread no mesmo status evita isso.",
              "Para conferir, o status da Sentinela diz se ela está ligada nesta máquina e o passo de cada thread, o ork phase list <thread> mostra o despacho com o canal do Claude Code e, na sessão do dono, o /sentinela mostra o diário; as duas últimas linhas do bloco pausam e retomam a Sentinela."
            ],
            "code": "claude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-sentinela\nclaude plugin install ork-sentinela@orkastery --scope project\n\nork conducao sentinela status\nork phase list <thread>\n\n/sentinela\n/sentinela pausar\n/sentinela retomar"
          },
          {
            "id": "sessoes-de-fase",
            "title": "Nas sessões de fase",
            "paragraphs": [
              "O despacho claude-bg passa um --plugin-dir por mod de papel fase, depois do plugin do Orkastery, quando a pasta instalada do mod tem exatamente os arquivos do INSTALADO.json e a versão do Claude Code atende o mínimo do mod. Mod que pede versão mais nova fica de fora, com os que dependem dele, e o despacho segue; arquivo a mais, link ou declaração inválida recusa o despacho com runtime.context.installation. Hoje, a ponte e o Freio de Lote têm o papel fase. O papel fica no orkastery-mod.json do mod (ork.mod/v1): para tirar um mod das sessões de fase, mude o papel no catálogo e reinstale o adaptador.",
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
              "O resto da RM-059 é plano, sem data. A onda 0 (a fundação descrita acima) e a onda 1 (Torre de Controle, Clima de Cota, Freio de Lote e Radar de Colisão) já existem; da onda 2, a Mesa do Dono está na versão {versao} e a Sentinela do Condutor, na main do núcleo, ainda fora de uma versão publicada; na onda 3 vêm a Pista de Entrega, o Ritual do MASTER, o Mensageiro de Sessões e o Portão de Tarefas, cada um à espera da decisão do dono que o libera. Por enquanto, só a ponte, a Torre, o Clima, o Freio, o Radar, a Mesa e a Sentinela existem como mods."
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
              "RM-059 aims to let you run the factory from inside the Claude Code session you already work in, through mods: Claude Code function-hook plugins that run inside the client, react to session events and draw panels, bars and notices. In version {versao}, there are six, and the core’s main branch already has a seventh, not yet in a published version:"
            ],
            "items": [
              "The bridge (ork-ponte), which the other mods build on: it gives each one the session role (dono for the owner’s session, fase for phase sessions, or dormente), the core snapshot through ork_maestro, the bar above the prompt and the record of what a mod showed the owner. It has both the dono and fase roles.",
              "The Control Tower (ork-torre): in the owner’s session, a panel with one line per open thread, showing the six-phase track, the mode, who is running it and since when, the typed blocker in a short sentence, requests to the owner and the action the thread’s state calls for. The /torre command opens the panel, and pressing a line opens the thread’s detail. It depends on the bridge and has only the dono role.",
              "The Quota Weather (ork-clima): in the owner’s session, it reads the account’s limit windows at each engine measurement (session.measure), keeps the series and predicts when each window runs out at the current pace. Only on an alert, the bridge’s bar says which queued resume will not fit before the window runs out, how much of the window is used, when it runs out and when it resets; the /clima command shows each window, the resume queue, the open threads stopped by quota and the accounts in the ork accounts esgotamentos record. It only reads and warns: switching account, runtime or model stays with the core and the owner. It also depends on the bridge and has only the dono role.",
              "The Batch Brake (ork-freio), the first mod with the fase role: in a phase session, after each batch of tool calls, it finds the files the batch touched (from the edit paths and the git status difference, which also catches edits made through Bash) and the thread’s claims that cite them, asks the core in the background to check them with ork claims conferir, in the verify sandbox, and returns what broke in the next batch: the claim id, the command and the end of the output. It also warns when the batch touched files outside the plan’s touch_paths. It reaches phase sessions on its own through the dispatch, with the adapter installed (ork adapter install claude-code), and needs an ork with ork claims conferir on the session’s PATH: without it, it warns once that checking is unavailable and goes on. It also depends on the bridge.",
              "The Collision Radar (ork-radar): in the owner’s session, every 10 minutes and with the /radar command, it computes the merge of each open thread against the local origin/main and between threads, before SHIP, without a worktree and without writing objects to the repository (through git merge-tree --write-tree in a temporary directory). The panel shows the heat map, the conflicting files, the lease that covers each one and, as text, the ork worktree sync <thread> --dry-run command that resolves it; a new collision becomes a line in the bridge’s bar. Fetching stays with the core. It only reads, depends on the bridge and has only the dono role.",
              "The Owner’s Desk (ork-mesa): in the owner’s session, it gathers in one panel what is waiting for you. The /mesa command opens the batch of up to five questions, each with the recommended alternative first, the reason and the consequence of the others; the decisions the factory made for you during the week, with how to change them and the cost of reverting now and later; and the stopped items, read-only. The Decide button only asks the core for the host’s native dialog (ork_request_decision, with the threadId and the pedidoId), and the code and letter for Telegram always stay in view; the proof that the dialog opens when the request comes from a mod is still pending from the owner. The Owner’s Desk only decides for you through the core’s autonomous decision (ork_decision_record), and only when the request declares that it follows the recommended one at the deadline and passes the core’s four conditions; today the core marks no request that way, so it decides nothing on its own. It never answers a request. It depends on the bridge and has only the dono role.",
              "The Conductor’s Sentinel (ork-sentinela), so far only on main: in the owner’s session, it keeps its presence on this machine through the core, with a heartbeat every 60 s, and removes it when the session ends; while the presence holds, the external conductor yields dispatch. When a thread ledger changes, and at each heartbeat, it rereads the conductor’s next step for each open thread and dispatches the next phase of the #Auto threads the core says to dispatch, once per turn and only through ork phase run; a resume only runs ork retry run when ork retry plan is automatic. Every 5 minutes, what only the owner can resolve in ork pulse becomes a system notification with the core’s next step, once per text, and goes into the bridge’s record so that Telegram does not repeat it. The bridge’s bar shows the threads that are moving and the stopped ones, and the /sentinela command shows each thread’s step and the journal of what it dispatched, yielded and warned about, and also pauses and resumes the Sentinel. It depends on the bridge and has only the dono role."
            ]
          },
          {
            "id": "carregar",
            "title": "Load them into your session",
            "paragraphs": [
              "The Tower, the Quota Weather, the Collision Radar, the Owner’s Desk and the Sentinel only turn on in the owner’s session (the Batch Brake, a phase-session mod, reaches phase sessions through the dispatch), which the bridge recognizes by two things: orkastery.yaml at the root and the project’s orkastery MCP server being connected. The commands below come in three groups: the project’s MCP server; the Claude Code adapter, which puts each mod’s copy in .claude/plugins/orkastery/mods/<mod>, and loading them into the session with --plugin-dir; and, without the local adapter, installing from the repository’s marketplace at project scope. The Sentinel’s commands are in the next section, because it needs an ork with commands that only the core’s main branch has.",
              "The mods API needs Claude Code 2.1.287 or newer. In CI, the mods job installs Claude Code 2.1.296, validates and tests each mod and searches the binary for every event they use; in that search, builds 2.1.288 and 2.1.289 fail, lacking ui.notify.",
              "Both marketplaces are named orkastery, and the local one, registered from .claude/plugins/orkastery when the adapter is activated, does not list the mods. Do not swap one for the other in a project that uses the adapter’s plugin: removing a marketplace uninstalls the plugins that came from it, and the plugin from the repository’s marketplace does not include the adapter’s PreToolUse guard or MCP server."
            ],
            "code": "ork mcp install --project \"$PWD\" --host claude-code\n\nork adapter install claude-code\nclaude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-torre --plugin-dir .claude/plugins/orkastery/mods/ork-clima --plugin-dir .claude/plugins/orkastery/mods/ork-radar --plugin-dir .claude/plugins/orkastery/mods/ork-mesa\n\nclaude plugin marketplace add orkastery/orkastery\nclaude plugin install ork-ponte@orkastery --scope project\nclaude plugin install ork-torre@orkastery --scope project\nclaude plugin install ork-clima@orkastery --scope project\nclaude plugin install ork-radar@orkastery --scope project\nclaude plugin install ork-mesa@orkastery --scope project"
          },
          {
            "id": "sentinela",
            "title": "Let the Sentinel dispatch",
            "paragraphs": [
              "With your session open in Claude Code and the Sentinel on and not paused, the Sentinel dispatches the next phase of the #Auto threads and retries them, and the external conductor (for example, a cron job on the Hermes gateway) yields. With the Sentinel paused, or with the session closed (the presence expires 3 minutes after the last heartbeat), the external conductor takes over again. Publishing the branch, merging the green PR and the Telegram notices always stay with the external conductor: the Sentinel does not publish branches, does not open or merge PRs and does not send Telegram messages.",
              "It needs an ork with the presence commands that only the core’s main branch has, and it loads together with the bridge, from the adapter folder or from the repository’s marketplace, as in the block below. The external conductor’s script lives outside the repository, and the change to it is yours: once per round, before the dispatch loop, it reads the Sentinel status with --json and, while presenca.ativa is true, skips dispatching the next phase and ork retry run for the #Auto threads. Publishing a branch that only awaits a push, merging the green PR and the notices to the owner stay as they are; with no live presence, the external conductor runs as before.",
              "There is no duplicate dispatch, because both conductors dispatch only through the core: ork phase run takes the thread’s conduction under a kernel lock. With two requests at the same instant, one dispatches and the other exits without a new session; with the thread already being conducted, the request exits with code 3, conducao.em-andamento, and records conducao_recusada; and the same request from whoever is already conducting records despacho_idempotente and returns the session in progress. The Sentinel also rereads the conduction right before dispatching, never uses ork conducao assumir and remembers the turn it has already dispatched. Its dispatch carries the Claude Code channel and its session in the correlation, and phase_dispatch shows where it came from.",
              "The Sentinel does not choose the phase: it follows the action the core gives each thread in the status. In #Auto, after a completed phase, what goes out is the phase after the most advanced proof the block’s session left: the phase artifact (goal.md, plan.md, check.md) written after the dispatch, the product on the branch, which shows there was a GO, or ship_done and master_done. If the block is already past CHECK, nothing goes out: delivery stays with the external conductor and the owner. A CHECK that ended without exactly one verdict is dispatched again, and a dispatch that failed before opening a session goes to ork retry plan. Anything pending with the owner (a paused thread, an open question, an escalation) holds every step and, without a request stored when the thread was created (ork thread new --pedido), the Sentinel does not dispatch and warns.",
              "A passing refusal (another conductor, no free slot in the project, an open request, a failure) does not burn the turn: the Sentinel tries again after 3 minutes, and the same refusal in a row doubles the wait up to 30 minutes; only a completed dispatch, or the repeated request of whoever is already conducting, is final. If your external conductor dispatches from the last line of the ledger, it may repeat a phase the block’s session already did; reading each thread’s action in the same status avoids that.",
              "To check, the Sentinel status says whether it is active on this machine and each thread’s step, ork phase list <thread> shows the dispatch with the Claude Code channel and, in the owner’s session, /sentinela shows the journal; the last two lines of the block pause and resume the Sentinel."
            ],
            "code": "claude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-sentinela\nclaude plugin install ork-sentinela@orkastery --scope project\n\nork conducao sentinela status\nork phase list <thread>\n\n/sentinela\n/sentinela pausar\n/sentinela retomar"
          },
          {
            "id": "sessoes-de-fase",
            "title": "In phase sessions",
            "paragraphs": [
              "The claude-bg dispatch passes one --plugin-dir per mod with the fase role, after the Orkastery plugin, when the mod’s installed folder has exactly the files in INSTALADO.json and the Claude Code version meets the mod’s minimum. A mod that needs a newer version is left out, along with the mods that depend on it, and the dispatch goes on; an extra file, a link or an invalid declaration refuses the dispatch with runtime.context.installation. Today the bridge and the Batch Brake have the fase role. The role lives in the mod’s orkastery-mod.json (ork.mod/v1): to take a mod out of phase sessions, change its role in the catalog and reinstall the adapter.",
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
              "The rest of RM-059 is a plan, with no dates. Wave 0 (the foundation described above) and wave 1 (the Control Tower, the Quota Weather, the Batch Brake and the Collision Radar) already exist; from wave 2, the Owner’s Desk is in version {versao} and the Conductor’s Sentinel is on the core’s main branch, not yet in a published version; wave 3 brings the Pista de Entrega, the Ritual do MASTER, the Mensageiro de Sessões and the Portão de Tarefas, each waiting for the owner’s decision that releases it. For now, only the bridge, the Tower, the Quota Weather, the Batch Brake, the Collision Radar, the Owner’s Desk and the Sentinel exist as mods."
            ]
          }
        ]
      },
      "es": {
        "title": "Conduzca desde Claude Code",
        "description": "Los mods de Orkastery en Claude Code: lo que ya existe, cómo cargarlos y lo que aún es un plan.",
        "sections": [
          {
            "id": "o-que-existe",
            "title": "Lo que ya existe",
            "paragraphs": [
              "La RM-059 busca llevar la conducción de la fábrica a la sesión de Claude Code en la que usted ya trabaja, mediante mods: plugins de function hooks de Claude Code que se ejecutan dentro del cliente, reaccionan a los eventos de la sesión y dibujan paneles, franjas y avisos. En la versión {versao} hay seis, y la main del núcleo ya tiene un séptimo, todavía fuera de una versión publicada:"
            ],
            "items": [
              "El puente (ork-ponte), sobre el que se apoyan los demás mods: da a cada uno el papel de la sesión (dono en la sesión de quien conduce, fase en las sesiones de fase, o dormente), la instantánea del núcleo mediante ork_maestro, la franja sobre el prompt y el registro de lo que un mod mostró al dueño. Tiene los papeles dono y fase.",
              "La Torre de Control (ork-torre): en la sesión del dueño, un panel con cada thread abierta en una línea, con el recorrido de las seis fases, el modo, quién la conduce y desde cuándo, el bloqueo tipado en una frase corta, los pedidos al dueño y la acción que pide el estado de la thread. El comando /torre abre el panel, y al pulsar una línea se abre el detalle de la thread. Depende del puente y solo tiene el papel dono.",
              "El Clima de Cuota (ork-clima): en la sesión del dueño, lee las ventanas de límite de la cuenta en cada medición del motor (session.measure), guarda la serie y prevé cuándo se agota cada ventana al ritmo actual. Solo en la alerta, la franja del puente dice qué reanudación de la cola no cabe antes de que se agote la ventana, cuánto de ella ya se usó, cuándo se agota y cuándo se renueva; el comando /clima muestra cada ventana, la cola de reanudación, las threads abiertas detenidas por cuota y las cuentas del registro de ork accounts esgotamentos. Solo lee y avisa: cambiar de cuenta, de runtime o de modelo queda en manos del núcleo y del dueño. También depende del puente y solo tiene el papel dono.",
              "El Freno de Lote (ork-freio), el primer mod con el papel fase: en la sesión de fase, después de cada lote de herramientas, encuentra los archivos que el lote tocó (por las rutas de las ediciones y por la diferencia del git status, que también capta la edición hecha con Bash) y las claims de la thread que los citan, pide al núcleo, en segundo plano, que las compruebe con ork claims conferir, en el sandbox del verify, y devuelve en el lote siguiente lo que se rompió: el id de la claim, el comando y el final de la salida. También avisa cuando el lote tocó archivos fuera de los touch_paths del plan. Llega solo a las sesiones de fase por el despacho, con el adaptador instalado (ork adapter install claude-code), y necesita un ork con ork claims conferir en el PATH de la sesión: sin él, avisa una vez que la comprobación no está disponible y sigue. También depende del puente.",
              "El Radar de Colisión (ork-radar): en la sesión del dueño, cada 10 min y con el comando /radar, calcula el merge de cada thread abierta contra la origin/main local y entre las threads, antes del SHIP, sin worktree y sin grabar objetos en el repositorio (con git merge-tree --write-tree en un temporal). El panel muestra el mapa de calor, los archivos en conflicto, el lease que cubre cada uno y, como texto, el comando ork worktree sync <thread> --dry-run que lo resuelve; una colisión nueva se convierte en una línea en la franja del puente. El fetch sigue a cargo del núcleo. Solo lee, depende del puente y solo tiene el papel dono.",
              "La Mesa del Dueño (ork-mesa): en la sesión del dueño, reúne en un panel lo que lo espera a usted. El comando /mesa abre el lote de hasta cinco preguntas, cada una con la alternativa recomendada al frente, el porqué y la consecuencia de las otras; las decisiones que la fábrica tomó por usted en la semana, con cómo cambiarlas y el costo de revertir ahora y después; y las paradas, solo de lectura. El botón Decidir solo pide al núcleo el diálogo nativo del host (ork_request_decision, con el threadId y el pedidoId), y el código y la letra para Telegram quedan siempre a la vista; la prueba de que el diálogo se abre cuando el pedido viene de un mod sigue pendiente del dueño. La Mesa solo decide por usted mediante la decisión autónoma del núcleo (ork_decision_record), y solo cuando el pedido declara que sigue la recomendada al vencer el plazo y pasa las cuatro condiciones del núcleo; hoy el núcleo no marca ningún pedido así, de modo que no decide nada por sí sola. Nunca responde un pedido. Depende del puente y solo tiene el papel dono.",
              "La Centinela del Conductor (ork-sentinela), por ahora solo en la main: en la sesión del dueño, mantiene a través del núcleo su presencia en esta máquina, con un latido cada 60 s, y la retira cuando termina la sesión; mientras la presencia está vigente, el conductor externo cede el despacho. Cuando cambia el ledger de una thread, y en cada latido, vuelve a leer el paso del conductor en cada thread abierta y despacha la fase siguiente de las threads #Auto que el núcleo manda despachar, una vez por turno y solo mediante ork phase run; la reanudación solo ejecuta ork retry run cuando ork retry plan es automático. Cada 5 min, lo que solo el dueño resuelve en ork pulse se convierte en una notificación del sistema, con el siguiente paso del núcleo, una vez por texto, y entra en el registro del puente, para que Telegram no lo repita. La franja del puente muestra las threads en marcha y las detenidas, y el comando /sentinela muestra el paso de cada thread y el diario de lo que despachó, cedió y avisó, y también pausa y reanuda la Centinela. Depende del puente y solo tiene el papel dono."
            ]
          },
          {
            "id": "carregar",
            "title": "Cárguelos en su sesión",
            "paragraphs": [
              "La Torre, el Clima de Cuota, el Radar de Colisión, la Mesa del Dueño y la Centinela solo se activan en la sesión del dueño (el Freno de Lote, con el papel fase, llega a las sesiones de fase por el despacho), que el puente reconoce por dos cosas: el orkastery.yaml en la raíz y el servidor MCP orkastery del proyecto conectado. Los comandos de abajo vienen en tres grupos: el servidor MCP del proyecto; el adaptador de Claude Code, que deja la copia de cada mod en .claude/plugins/orkastery/mods/<mod>, y su carga en la sesión con --plugin-dir; y, sin el adaptador local, la instalación desde el marketplace del repositorio, en el ámbito del proyecto. Los comandos de la Centinela están en la sección siguiente, porque necesita un ork con comandos que solo tiene la main del núcleo.",
              "La API de mods pide Claude Code 2.1.287 o posterior. En el CI, el job mods instala Claude Code 2.1.296, valida y prueba cada mod y busca en el binario cada evento que usan; en esa búsqueda, las builds 2.1.288 y 2.1.289 fallan, sin ui.notify.",
              "Los dos marketplaces se llaman orkastery, y el local, registrado a partir de .claude/plugins/orkastery al activar el adaptador, no lista los mods. No cambie uno por otro en un proyecto que usa el plugin del adaptador: quitar un marketplace desinstala los plugins que vinieron de él, y el plugin del marketplace del repositorio no trae el guard PreToolUse ni el MCP del adaptador."
            ],
            "code": "ork mcp install --project \"$PWD\" --host claude-code\n\nork adapter install claude-code\nclaude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-torre --plugin-dir .claude/plugins/orkastery/mods/ork-clima --plugin-dir .claude/plugins/orkastery/mods/ork-radar --plugin-dir .claude/plugins/orkastery/mods/ork-mesa\n\nclaude plugin marketplace add orkastery/orkastery\nclaude plugin install ork-ponte@orkastery --scope project\nclaude plugin install ork-torre@orkastery --scope project\nclaude plugin install ork-clima@orkastery --scope project\nclaude plugin install ork-radar@orkastery --scope project\nclaude plugin install ork-mesa@orkastery --scope project"
          },
          {
            "id": "sentinela",
            "title": "Deje que la Centinela despache",
            "paragraphs": [
              "Con su sesión abierta en Claude Code y la Centinela activa y sin pausa, es ella quien despacha la fase siguiente de las threads #Auto y hace sus reintentos, y el conductor externo (por ejemplo, un cron en el gateway de Hermes) cede. Con la Centinela en pausa, o con la sesión cerrada (la presencia vence 3 min después del último latido), el conductor externo vuelve a conducir. La publicación de la branch, el merge del PR en verde y los avisos de Telegram quedan siempre con el conductor externo: la Centinela no publica branches, no abre ni fusiona PR y no envía mensajes por Telegram.",
              "Necesita un ork con los comandos de presencia que solo tiene la main del núcleo, y se carga junto con el puente, desde la carpeta del adaptador o desde el marketplace del repositorio, como en el bloque de abajo. El script del conductor externo queda fuera del repositorio, y el cambio le corresponde a usted: una vez por ronda, antes del bucle de despacho, lee el estado de la Centinela con --json y, mientras presenca.ativa sea true, omite el despacho de la fase siguiente y el ork retry run de las threads #Auto. La publicación de la branch que solo espera el push, el merge del PR en verde y los avisos al dueño quedan como están; sin presencia viva, el conductor externo conduce como antes.",
              "No hay despacho duplicado, porque los dos conductores despachan solo mediante el núcleo: ork phase run toma la conducción de la thread bajo un bloqueo del kernel. Con dos pedidos en el mismo instante, uno despacha y el otro sale sin sesión nueva; con la thread ya conducida, el pedido sale con 3, conducao.em-andamento, y graba conducao_recusada; y el mismo pedido de quien ya conduce graba despacho_idempotente y devuelve la sesión en curso. La Centinela además vuelve a leer la conducción justo antes de despachar, nunca usa ork conducao assumir y guarda el turno que ya despachó. Su despacho lleva el canal de Claude Code y su sesión en la correlación, y el phase_dispatch muestra de dónde vino.",
              "La Centinela no elige la fase: sigue la acción que el núcleo da a cada thread en el estado. En #Auto, después de una fase concluida, sale la fase siguiente a la prueba más avanzada que dejó la sesión del bloque: el artefacto de la fase (goal.md, plan.md, check.md) grabado después del despacho, el producto en la branch, que muestra que hubo GO, o el ship_done y el master_done. Si el bloque ya pasó del CHECK, no sale nada: la entrega queda con el conductor externo y con el dueño. El CHECK que terminó sin exactamente un veredicto se vuelve a despachar, y el despacho que falló antes de abrir sesión va a ork retry plan. Lo que espera al dueño (thread en pausa, pregunta abierta, escalada) retiene cualquier paso y, sin pedido guardado al crear la thread (ork thread new --pedido), la Centinela no despacha y avisa.",
              "Un rechazo pasajero (otro conductor, proyecto sin hueco, pedido abierto, fallo) no quema el turno: la Centinela lo intenta de nuevo después de 3 min, y el mismo rechazo seguido duplica la espera hasta 30 min; solo el despacho hecho, o el pedido repetido de quien ya conduce, queda en firme. Si su conductor externo despacha por la última línea del ledger, puede repetir una fase que la sesión del bloque ya hizo; leer la acción de cada thread en el mismo estado lo evita.",
              "Para comprobarlo, el estado de la Centinela indica si está activa en esta máquina y el paso de cada thread, ork phase list <thread> muestra el despacho con el canal de Claude Code y, en la sesión del dueño, /sentinela muestra el diario; las dos últimas líneas del bloque pausan y reanudan la Centinela."
            ],
            "code": "claude --plugin-dir .claude/plugins/orkastery/mods/ork-ponte --plugin-dir .claude/plugins/orkastery/mods/ork-sentinela\nclaude plugin install ork-sentinela@orkastery --scope project\n\nork conducao sentinela status\nork phase list <thread>\n\n/sentinela\n/sentinela pausar\n/sentinela retomar"
          },
          {
            "id": "sessoes-de-fase",
            "title": "En las sesiones de fase",
            "paragraphs": [
              "El despacho claude-bg pasa un --plugin-dir por cada mod con el papel fase, después del plugin de Orkastery, cuando la carpeta instalada del mod tiene exactamente los archivos de INSTALADO.json y la versión de Claude Code cumple el mínimo del mod. Un mod que pide una versión más nueva queda fuera, junto con los que dependen de él, y el despacho sigue; un archivo de más, un enlace o una declaración inválida rechazan el despacho con runtime.context.installation. Hoy el puente y el Freno de Lote tienen el papel fase. El papel está en el orkastery-mod.json del mod (ork.mod/v1): para sacar un mod de las sesiones de fase, cambie el papel en el catálogo y reinstale el adaptador.",
              "La prueba de la RM-059 midió, en Claude Code 2.1.296, que un mod cargado con --plugin-dir en una sesión de fase recibe los eventos de la sesión; el script core/scripts/prova-mods-sessao-de-fase.cjs repite esa prueba.",
              "La base de los mods trae además dos piezas del núcleo. ork claims conferir vuelve a ejecutar, en el sandbox de ork_verify y sin grabar recibo, solo las claims pedidas (--claims) o el verify de una tarea del plan (--tarefa); una prueba que crea procesos puede fallar allí y pasar en ork verify. ork thread new --pedido guarda el pedido de la thread en pedido.md, con su sha256, y ork prompt render sin --pedido usa ese pedido."
            ]
          },
          {
            "id": "limites",
            "title": "Lo que ningún mod hace",
            "paragraphs": [
              "Ningún mod aprueba gate, permiso, nota del MASTER, push ni tag en nombre del dueño, ni habla como el dueño. La regla está en adapters/claude-code/mods/autoridade.json y tiene dos guardas: node core/scripts/checar-mods.cjs rechaza el mod por su código fuente, y el puente lo rechaza en tiempo de ejecución. El Freno de Lote nunca ejecuta el comando de una claim, nunca graba estado de claim y nunca detiene el bucle: quien verifica sigue siendo ork verify. La Centinela lee solo mediante el núcleo, despacha y reanuda solo mediante ork phase run y ork retry run, y nunca usa ork conducao assumir. La Torre, el Clima de Cuota y el Radar de Colisión solo leen, y la Mesa del Dueño solo pide el diálogo al núcleo y nunca responde un pedido: una acción con efecto abre el mod que la tiene a cargo, cuando está cargado, o aparece como comando de ork, para que usted lo ejecute.",
              "Los mods se ejecutan con los permisos de su usuario, sin sandbox, y la API de mods de Claude Code está en acceso anticipado y puede cambiar entre versiones. Nada en el núcleo depende de ellos: sin mods, el despacho y el ciclo siguen como antes, y Telegram sigue siendo un canal."
            ]
          },
          {
            "id": "plano",
            "title": "Lo que viene después",
            "paragraphs": [
              "El resto de la RM-059 es un plan, sin fechas. La oleada 0 (la base descrita arriba) y la oleada 1 (la Torre de Control, el Clima de Cuota, el Freno de Lote y el Radar de Colisión) ya existen; de la oleada 2, la Mesa del Dueño está en la versión {versao} y la Centinela del Conductor, en la main del núcleo, todavía fuera de una versión publicada; la oleada 3 trae la Pista de Entrega, el Ritual do MASTER, el Mensageiro de Sessões y el Portão de Tarefas, cada uno a la espera de la decisión del dueño que lo libera. Por ahora, solo el puente, la Torre, el Clima de Cuota, el Freno de Lote, el Radar de Colisión, la Mesa del Dueño y la Centinela existen como mods."
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
      },
      "es": {
        "title": "Demuestre una alegación",
        "description": "Utilice una baseline, comandos reproducibles y los resultados reales de ejecución.",
        "sections": [
          {
            "id": "baseline",
            "title": "Mida antes del cambio",
            "paragraphs": [
              "Registre la baseline antes de implementar. Permite distinguir una regresión de un fallo previo. Una claim vincula un archivo, una alegación y un comando; registrarla no ejecuta el comando ni demuestra la alegación."
            ],
            "code": "ork verify <thread> --baseline\nork claims add <thread> src/filtro.ts --claim \"o filtro respeita o fuso\" --verificar \"node --test test/filtro.test.js\""
          },
          {
            "id": "reexecutar",
            "title": "Vuelva a ejecutar sobre el estado actual",
            "paragraphs": [
              "ork verify vuelve a ejecutar las claims y los verificadores del manifiesto. Lea la causa, el código de salida y los comandos interrumpidos. Un timeout es una ejecución incompleta, no una aprobación ni una explicación automática del defecto."
            ],
            "code": "ork verify <thread>\nork retry plan <thread>"
          },
          {
            "id": "corrigir",
            "title": "Corrija y vuelva a verificar",
            "paragraphs": [
              "Un fallo abre trabajo de corrección con alcance explícito. Consulte la ronda antes de ejecutarla otra vez. Los cambios de comportamiento requieren una nueva verificación completa; el núcleo controla los límites de intentos y el escalado."
            ],
            "code": "ork fix open <thread>\nork fix list <thread>\nork fix reverify <thread>"
          },
          {
            "id": "verificacao-confiavel",
            "title": "Fallos, plazos y comandos específicos",
            "paragraphs": [
              "Verify registra causa, plazo y duración. El timeout tiene un motivo tipado y usa el plazo del manifiesto. Las claims deben ejecutar el comando más pequeño que demuestre el cambio. El lint avisa en ork claims add, y ork ci prepare rechaza la suite local completa: npm --prefix core test puede necesitar recursos ausentes en CI. En lugar de la suite completa, ejecute solo la prueba de la claim (node --test en el archivo de prueba) o un script hermético del proyecto.",
              "La preparación del CI compila una vez, vincula la identidad del producto y registra executado para distinguir resultados reales de comandos no ejecutados. La contención puede agotar el plazo local; eso no exime del CI en el commit exacto ni convierte un fallo en aprobación."
            ],
            "code": "node --test test/filtro.test.js\nork ci prepare <thread>"
          },
          {
            "id": "steal-da-cpu",
            "title": "Pruebas de reloj bajo steal de la CPU",
            "paragraphs": [
              "En una VPS, el hipervisor puede quitar CPU (el steal), y una prueba que mide el reloj falla sin que el código haya cambiado. En la versión {versao}, ork verify, en el CLI, por MCP y en ork fix reverify, mide el steal en /proc/stat, en la ronda y en la ventana de cada comando, y graba la medida en el verify_run (steal, y stealPct en cada comando que falla).",
              "Cuando un comando falla solo en pruebas de reloj y el steal en su ventana superó el 40%, el fallo pasa a verify.timeout: sin veredicto, el retry vuelve a ejecutarlo, y nunca es regresión. Una prueba de reloj es la que falló con la firma de plazo de node --test (la prueba agotó su plazo, o la canceló el padre que lo agotó) o la que tiene una entrada vigente en el registro de inestabilidad; los nombres vienen del testeQueCaiu del ledger, que también lee el reporter spec de node --test. Una aserción común con steal alto sigue siendo regresión, un comando sin prueba nombrada nunca se reclasifica y sin /proc/stat no se atenúa nada. ork ci run no mide ni atenúa: el CI sigue siendo la prueba independiente.",
              "El registro es core/instabilidade.json, en el contrato ork.instabilidade/v1, leído de la worktree que se verifica. Nace vacío y solo acepta una entrada con la tasa medida (fallos en rondas, el comando que la midió y la fecha) y revalidación en un plazo de 30 días. Un archivo ausente vale como registro vacío; con un error de contrato, ninguna entrada vale; una entrada vencida no vale hasta que alguien mida de nuevo. El registro nunca atenúa por sí solo: solo dice que la prueba depende del reloj."
            ],
            "code": "{\n  \"contrato\": \"ork.instabilidade/v1\",\n  \"entradas\": []\n}"
          },
          {
            "id": "skip-tipado",
            "title": "Una dependencia opcional ausente es skip",
            "paragraphs": [
              "La suite local incluye integraciones que piden el codex del sandbox en /usr/bin/codex, el intérprete de OrkMind en el PATH o PostgreSQL mediante Docker con pgvector/pgvector:pg16. Cada prueba que depende de una de ellas sondea antes y, si falta, sale como skip con el motivo, en lugar de reprobar. La suite completa pasa con 0 fallos en una máquina sin ninguna de ellas, y el final del informe cuenta los skips; un fallo que queda es real.",
              "ORK_TESTE_EXIGE_AMBIENTE=1 no omite nada: la dependencia que falte reprueba. test:ci activa la variable por sí solo. node core/scripts/suite-local.cjs corre la suite, sale con 0 solo con 0 fallos y lista cada skip con su motivo. Una prueba nueva que depende de una herramienta externa usa los atajos semCodexSandbox(), semOrkMind() y semPostgres()."
            ],
            "code": "npm --prefix core test\nORK_TESTE_EXIGE_AMBIENTE=1 npm --prefix core test\nnode core/scripts/suite-local.cjs"
          },
          {
            "id": "runtime-e-sessoes",
            "title": "Modelo no disponible y cuenta de sesión",
            "paragraphs": [
              "model_not_found produce runtime.model-unavailable. El retry prueba destinos autorizados con el mismo prompt, conserva el perfil para otros modelos y registra el cambio. Sin destino, escala con la corrección de setup; el rate limit habitual espera su ventana. ork sessions stop, logs y attach buscan la cuenta correcta entre los perfiles Claude configurados. El inventario global, ork doctor, ork pulse y el control nativo de HITL aún pueden limitarse a la cuenta del proceso. Un perfil pedido con --perfil que no existe o es de otro runtime se rechaza con runtime.profile-invalid y se escala a una persona, sin cambiar de perfil por su cuenta.",
              "runtime.workspace-untrusted (el runtime rechazó el directorio de la worktree) y runtime.consent-pending (el CLI espera que se acepten términos nuevos) pasan a esperar al dueño, con el comando exacto; tras la aceptación, ork retry run vuelve a despachar la misma fase con el mismo prompt. En la versión {versao}, runtime.consent-pending cubre también el aviso del modo sin permisos y la activación del modo auto de --bg, y la prueba de que el dueño confió en el directorio sigue la regla que Claude Code aplica con --bg: valen el propio directorio y los de arriba hasta la raíz git, o el repositorio principal de la worktree vinculada, pero no el directorio por encima de la raíz git. El directorio que ya no existe y el directorio home no le tocan al dueño y quedan en runtime.unavailable, y el rechazo repetido por el mismo impedimento no gasta intento ni sube el esfuerzo."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
          },
          {
            "id": "prova-local",
            "title": "Prueba local al registrar la claim",
            "paragraphs": [
              "La policy claim_sem_prova_local (alias claims_failed) viene desactivada y solo vale si el manifiesto la declara. Con ella, ork claims add ejecuta los comandos de la claim una vez, en la worktree de la thread y dentro de verify.timeout_ms. La claim se registra de todos modos: un comando que falla graba policy_warn con claims.failed, y un plazo agotado, con verify.timeout. Nunca detiene el registro, ni siquiera declarada como block. Como add se vuelve tan lento como el comando, quien decide activarla es el dueño del proyecto. Sin la worktree de la thread (borrada), no se ejecuta nada y el aviso lo dice. Por MCP (ork_claim_add), el registro nunca ejecuta el texto de la claim, con o sin la policy: allí la prueba es ork_verify, en el sandbox.",
              "El canario fx-pedido-colado demuestra que un pedido del dueño pegado en #Auto, con push y merge autorizados, sigue sin detenerse: la duda se convierte en decisión informada y una confirmación en texto libre se rechaza sin grabar nada."
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
      },
      "es": {
        "title": "Audite y siga la deuda",
        "description": "Convierta los hallazgos en trabajo trazable, separando revisión y corrección.",
        "sections": [
          {
            "id": "packs",
            "title": "Elija el pack según la etapa",
            "paragraphs": [
              "La etapa del producto determina los packs activos: clean-code, reuse y process desde nascente; architecture, data-model y ux en crescendo; security-privacy en maduro. Consulte las reglas y las pruebas exigidas antes de la ronda."
            ],
            "code": "ork audit packs\nork audit packs --pack reuse"
          },
          {
            "id": "achados",
            "title": "Un hallazgo necesita pruebas",
            "paragraphs": [
              "El auditor identifica el archivo, la prueba, el comando reproducible y la propuesta. No corrige su propio hallazgo. El board conserva el historial y la recurrencia; convertir un aviso en una regla de bloqueo requiere una decisión, no solo la recomendación de un agente."
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
              "O ork memory status mostra o regime pedido no manifesto e o efetivo, o tenant, a variável da base, se a DSN está no ambiente (sem imprimir o valor) e o CLI do OrkMind. Em regime files, a degradação sai como modo.files, com a correção para ligar a memória semântica: memory.mode: orkmind e memory.database_url_env no manifesto. O ciclo não para por isso: o handoff continua triado em três níveis, e o ork recall continua resolvendo os ponteiros."
            ],
            "code": "ork memory status"
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
              "ork memory status shows the regime requested in the manifest and the effective one, the tenant, the database variable, whether the DSN is in the environment (never printing its value) and the OrkMind CLI. In the files regime, degradation appears as modo.files, with the fix to turn on semantic memory: memory.mode: orkmind and memory.database_url_env in the manifest. The cycle does not stop because of it: the handoff stays triaged in three levels, and ork recall keeps resolving pointers."
            ],
            "code": "ork memory status"
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
      },
      "es": {
        "title": "Memoria y continuidad",
        "description": "Transfiera contexto con procedencia y recupere detalles cuando sean necesarios.",
        "sections": [
          {
            "id": "medida",
            "title": "Declare el origen de la medida",
            "paragraphs": [
              "El gate de tokens distingue uso reportado, estimado, informado y no disponible. La ausencia de medida no es cero. Consulte el gate antes del siguiente bloque; nunca decida la rotación con un número inventado."
            ],
            "code": "ork gate next <thread> --proximo GO"
          },
          {
            "id": "handoff",
            "title": "Tres niveles de contexto",
            "paragraphs": [
              "El contenido crítico entra directamente en el handoff. El importante se convierte en referencia con condición de recuperación. El resumible recibe un resumen con procedencia. Cada elemento conserva origen, ubicación y hash; los cambios de fuente deben detectarse antes de confiar en el contexto antiguo."
            ],
            "code": "ork handoff export <thread> --proxima-fase GO\nork recall <thread> --fase CHECK"
          },
          {
            "id": "degradacao",
            "title": "Memoria no disponible",
            "paragraphs": [
              "OrkMind es una integración de memoria, no una autoridad de gate. Cuando no está disponible, el modo efectivo y la degradación deben ser explícitos. Consulte ork memory status antes de afirmar que se guardó o recuperó contexto.",
              "ork memory status muestra el régimen pedido en el manifiesto y el efectivo, el tenant, la variable de la base, si la DSN está en el entorno (sin imprimir su valor) y el CLI de OrkMind. En el régimen files, la degradación aparece como modo.files, con la corrección para activar la memoria semántica: memory.mode: orkmind y memory.database_url_env en el manifiesto. El ciclo no se detiene por eso: el handoff sigue clasificado en tres niveles, y ork recall sigue resolviendo los punteros."
            ],
            "code": "ork memory status"
          },
          {
            "id": "significado",
            "title": "Búsqueda por significado",
            "paragraphs": [
              "La búsqueda por etiqueta sigue siendo el camino determinista: es la que construye el prompt, el recall y el handoff. La búsqueda por significado es una superficie separada que encuentra por paráfrasis lo que la etiqueta y la palabra exacta no encuentran. Cada resultado se marca deterministico: false, y nada semántico entra solo en el prompt.",
              "Permanece desactivada hasta que el manifiesto declare el bloque memory.embedding, con provider, modelo, dimensión y el nombre de la variable de la clave, nunca su valor. El índice vectorial es local, derivado del tenant y fuera de git; reindexar sin cambios no genera embeddings. El texto indexado y cada consulta salen hacia el provider configurado: use una clave dedicada con límite de crédito. La estimación de tokens y coste no es una factura. Sin embeddings, el motivo es embeddings.*, y el régimen orkmind y el recall por etiqueta no cambian.",
              "El índice, los vectores, FTS y ork memory status usan el mismo universo de búsqueda: las entradas activas del tenant en las colecciones de ork, sin las que la biblioteca marca con injection_risk. Una entrada de otro tenant o de otra colección es un fallo tipado (memory.query.scope-violation), nunca un descarte silencioso, y no va al embed. Cuando la ventana de lectura se llena, la respuesta es memory.query.window-saturated en lugar de cortar, y ork memory index sale con 1 sin embeber nada.",
              "status e index muestran el universo por colección y cuentan, solo en número, lo que queda fuera de la búsqueda: entradas con injection_risk, caducadas y de otras colecciones, como session y semantic_log. La cobertura compara los vectores con ese universo; el aviso de reindexar solo aparece cuando reindexar lo resuelve, y la entrada fuera del índice por diseño se cuenta aparte."
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
      },
      "es": {
        "title": "Trabaje en varias máquinas",
        "description": "Coordine reservas y consulte estados compartidos sin transferir credenciales.",
        "sections": [
          {
            "id": "adesao",
            "title": "La adhesión es una operación explícita",
            "highlight": {
              "title": "Cambia para quien ya lo usa",
              "paragraphs": [
                "En la versión {versao}, fabrica.compartilhada: true en el manifiesto ya no activa la publicación de la instantánea de esta máquina ni la lectura de las demás. Solo la adhesión de la máquina la activa: ork fabrica entrar, guardada en ~/.orkastery/maquina.json, o ORK_FABRICA_COMPARTILHADA=1. Con el pedido en el manifiesto y sin la adhesión, ork doctor y ork fabrica avisan con fabrica.nao-confirmada. Si su equipo activaba la fábrica solo con el manifiesto, ejecute ork fabrica entrar una vez en cada máquina."
              ],
              "links": [
                {
                  "label": "Frontera de confianza",
                  "href": "/docs/confianca/"
                }
              ]
            },
            "paragraphs": [
              "La fábrica compartida usa ramas de estado en el remoto para reservas e instantáneas de máquinas. La adhesión es de la máquina, no del proyecto: ork fabrica entrar publica la primera instantánea; ejecútelo solo cuando la participación esté autorizada. El pedido del equipo en orkastery.yaml (fabrica.compartilhada: true) no activa la publicación: el manifiesto llega con el repositorio, y solo la máquina decide publicar su instantánea. Cada máquina inicia su propia sesión del runtime.",
              "fabrica.remoto es el nombre de un remoto de git ya configurado en el clon, no una URL: solo letras, dígitos, punto, guion bajo y guion, sin guion al principio, sin .. y con hasta 64 caracteres. Lo mismo vale para --remoto de ork fabrica, ork roadmap, ork ship registrar-pr, ork ci status y ork ship --para. Fuera del formato, el valor nunca llega a git: el rechazo es tipado (fabrica.remoto-invalido, roadmap.remoto-invalido, ship.remoto-invalido o ci.remoto-invalido) y muestra el valor redactado. Para otro servidor, cree el remoto con git remote add y ponga el nombre en el manifiesto."
            ]
          },
          {
            "id": "leitura",
            "title": "Consulte antes de asumir trabajo",
            "paragraphs": [
              "Las reservas evitan que dos máquinas asuman el mismo elemento. Sin red, consulte la última copia y tenga en cuenta su fecha. La instantánea pública excluye prompts, transcripciones, credenciales y rutas locales. Las decisiones pendientes deben responderse mediante el ingreso autenticado de la máquina responsable."
            ],
            "code": "ork board --sem-remoto\nork fabrica --sem-remoto"
          },
          {
            "id": "pessoa",
            "title": "La red de la persona: Orkastery Network",
            "paragraphs": [
              "La fábrica compartida vive en el remoto de un proyecto. La red reúne las máquinas de una persona, de todos los proyectos, en un repositorio privado suyo en la forja, <usuario>/orkastery-network. ork network entrar crea la casa cuando falta, publica la primera instantánea y solo entonces guarda la adhesión; después, la máquina publica sola en el latido del pulse y en los eventos de thread. La identidad viene de gh o glab ya autenticados; ork nunca lee un token. Quien ya hizo ork fabrica entrar es miembro sin rehacer nada.",
              "La casa recibe nombre, hostname, forja y login, runtimes y hosts con su versión, proyectos con remoto sin credencial y el último latido. Nunca recibe token, contraseña, email de la cuenta, plan de pago, ruta de archivo de credenciales, prompt, transcript ni log. Publicar exige la casa privada, comprobada en la forja, y solo por HTTPS.",
              "ork doctor tiene la línea rede: adhesión, casa, último latido y último fallo de rede.log. Solo lee archivos locales y nunca bloquea; pasa a aviso cuando el fallo es más reciente que el latido o cuando el latido supera las 3 horas. El REDE.md de la casa lista las máquinas con latido en los últimos 14 días; las detenidas desde hace más tiempo quedan en el pie y en ork network status. La red se publicó en la versión 0.5.3."
            ],
            "code": "ork network entrar --maquina pc-casa\nork network status\nork network publicar\nork network sair"
          },
          {
            "id": "rede",
            "title": "El roadmap de la red, desde cualquier directorio",
            "paragraphs": [
              "ork network roadmap reúne el informe de estado del roadmap, las reservas y las threads de cada máquina, con la fuente y la hora de cada parte. Funciona desde cualquier directorio, incluso fuera de un clon. El roadmap procede de la base remota, igual para todas las máquinas; esta máquina aporta su estado local, y las demás, su instantánea publicada.",
              "Sin clon, la lectura usa la CLI de la forja ya autenticada, gh o glab, solo con consultas; ningún token sale de ella. Lo que no se leyó aparece como laguna tipada, con lo que hay que hacer: máquina sin latido desde hace más de 3 h, forja sin sesión iniciada, sin red. La respuesta nunca dice vacío por no haber leído.",
              "La red de la persona también entra en el panorama, en la sección Red por persona: la casa y cada máquina, con el latido y los proyectos que declara. Un proyecto que solo declara una máquina de la red puede pedirse por nombre, sin clon ni registro en esta, y la máquina de la red que no publicó en la fábrica del proyecto aparece con las threads no leídas (laguna maquina.sem-fabrica), nunca con cero activas. ORK_REDE_LER=0 desactiva esa lectura."
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
        "title": "Acompanhe pausas e decisões",
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
            "id": "status-e-nota",
            "title": "Status e nota com prova de origem",
            "paragraphs": [
              "ork roadmap status é leitura pura e reúne o relatório por grupos, #HITL no que espera o dono e o próximo passo. Impedimentos técnicos aparecem como responsabilidade do orquestrador, exceto o que só o dono resolve no terminal, como confiar no diretório da worktree ou aceitar termos novos do CLI: esse vira espera dele, com o comando exato e o ork retry run. Na versão {versao}, o resumo do pulse traz esses impedimentos num bloco próprio, e o impedimento novo sai na hora, sem esperar a cadência.",
              "ork master pedir solicita a nota de 0 a 5 e o motivo pelo Telegram autenticado; o recibo acompanha a gravação. O diálogo MCP de nota ainda não está disponível. Um --por digitado pelo agente não substitui prova de canal."
            ],
            "code": "ork roadmap status\nork master pedir <thread> --formato telegram"
          }
        ]
      },
      "en": {
        "title": "Track pauses and decisions",
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
            "id": "status-e-nota",
            "title": "Status and scores with provenance",
            "paragraphs": [
              "ork roadmap status is read-only: it groups the report, marks owner decisions with #HITL and shows the next step. Technical blockers remain the orchestrator’s responsibility, except those only the owner can clear in the terminal, such as trusting the worktree directory or accepting new CLI terms: these become a wait for the owner, with the exact command and ork retry run. In version {versao}, the pulse summary lists these blockers in their own block, and a new one goes out right away, without waiting for the cadence.",
              "ork master pedir requests a score from 0 to 5 and a reason through authenticated Telegram; the receipt accompanies the record. The MCP score dialog is not yet available. An agent-supplied --por cannot replace channel proof."
            ],
            "code": "ork roadmap status\nork master pedir <thread> --formato telegram"
          }
        ]
      },
      "es": {
        "title": "Siga las pausas y decisiones",
        "description": "Distinga una sesión viva de una sesión que puede avanzar.",
        "sections": [
          {
            "id": "observar",
            "title": "Observe threads y sesiones",
            "paragraphs": [
              "ork monitor sigue las threads; ork sessions hitl encuentra sesiones detenidas, incluso sin thread. El radar distingue espera humana, fallo y estado residual usando pruebas del runtime. Una sesión listada como viva puede estar esperando una respuesta.",
              "El resumen del pulse sale por el transporte de .orkastery/monitor/pulse-host.json, un archivo de esta máquina. En la versión {versao}, versionado en git, o como enlace, no vale, y el barrido sale con transporte.rastreado sin ejecutar nada; lo mismo vale para el master-host.json del digest."
            ],
            "code": "ork monitor\nork sessions hitl\nork pulse --json"
          },
          {
            "id": "responder",
            "title": "Responda por el canal autorizado",
            "paragraphs": [
              "Sin --registrar, el radar es de solo lectura. La opción de registro escribe transiciones reales en el ledger. Las preguntas y opciones deben proceder de la sesión observada; un estado desconocido sigue siendo desconocido. Una sesión hija no puede hacerse pasar por el dueño para responder a un gate."
            ]
          },
          {
            "id": "pedido-curto",
            "title": "Una pregunta breve con contexto",
            "paragraphs": [
              "ork.hitl-curto/v1 organiza título, pregunta en una frase, qué bloquea y desde cuándo, alternativas de una línea con consecuencia, recomendación justificada y una última línea que indica cómo responder. Las pruebas, claims, riesgos y diff se consultan con el código seguido de detalhes. El ingreso autenticado y su prueba HMAC siguen siendo obligatorios. Son hasta cinco alternativas, una con el sello Recomendación, en un máximo de 15 líneas."
            ],
            "code": "ork gate request <thread> --formato telegram"
          },
          {
            "id": "alternativas",
            "title": "Pedidos de ork por alternativas",
            "paragraphs": [
              "Todo pedido que ork abre al dueño es una selección de 3 a 5 alternativas, con exactamente una marcada como Recomendación. El registro rechaza, sin grabar nada, lo que no cumpla eso: hitl.selecao.fora-da-faixa, hitl.selecao.recomendada o hitl.selecao.texto-livre. Una respuesta en texto solo se acepta con una dependencia técnica: el comando exacto que el dueño ejecuta en la terminal y el motivo.",
              "ork prompt lint rechaza la plantilla que pida una confirmación en texto libre o que el dueño pegue texto (regla hitl-texto-livre). El tiempo detenido por estas preguntas aparece en ork ledger stats, en el campo hitlDeConducao, con la mediana frente a la meta de 5 minutos. El mismo tiempo llega a ork pulse y a ork roadmap status: cada pregunta abierta, con cuánto tiempo lleva deteniendo la thread y desde qué hora, en la zona horaria del dueño, y la mediana de los últimos 7 días. El resumen del pulse gana una línea solo por encima de la meta, junto al resumen que ya sale, sin romper la cadencia. La pregunta nativa de una sesión del host conserva las opciones del propio host."
            ],
            "code": "ork prompt lint\nork ledger stats\nork pulse --json\nork roadmap status --json"
          },
          {
            "id": "texto-e-linha",
            "title": "Texto libre y códigos estables",
            "paragraphs": [
              "El texto libre inequívoco (el vocabulario cerrado, una letra de la a a la e o un dígito del 1 al 5) puede corresponder a la acción de una alternativa. La ambigüedad devuelve una pregunta. Una palabra aislada solo se acepta en la ventana de escucha abierta por el núcleo, con una única solicitud para el dueño en todas las threads, y nunca para un acto irreversible. El agente no responde por el dueño.",
              "Reabrir el mismo gate en el mismo contexto conserva el código. Una respuesta vencida pasa a la solicitud renovada solo cuando contenido y contexto son idénticos; los cambios provocan rechazo. Los lotes vuelven a validar cada gate antes de registrar."
            ]
          },
          {
            "id": "status-e-nota",
            "title": "Estado y valoración con procedencia",
            "paragraphs": [
              "ork roadmap status es de solo lectura: agrupa el informe, marca con #HITL lo que espera al dueño y muestra el siguiente paso. Los impedimentos técnicos siguen siendo responsabilidad del orquestador, salvo los que solo el dueño resuelve en la terminal, como confiar en el directorio de la worktree o aceptar términos nuevos del CLI: esos pasan a esperar al dueño, con el comando exacto y ork retry run. En la versión {versao}, el resumen del pulse trae esos impedimentos en un bloque propio, y el impedimento nuevo sale enseguida, sin esperar la cadencia.",
              "ork master pedir solicita una nota de 0 a 5 y el motivo mediante Telegram autenticado; el recibo acompaña al registro. El diálogo MCP de valoración aún no está disponible. Un --por escrito por el agente no sustituye la prueba de canal."
            ],
            "code": "ork roadmap status\nork master pedir <thread> --formato telegram"
          }
        ]
      }
    }
  }
];
