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
              "adapter install grava o catálogo e um bloco próprio em CLAUDE.md, no Claude Code, ou em AGENTS.md, no Codex; o Hermes recebe as duas variantes ao lado da skill existente. O bloco aponta o catálogo por caminho relativo ao projeto, para valer em outro clone, e preserva o bloco do ork init e o conteúdo externo. Num clone sem recibo, um bloco igual ao gerado é adotado sem duplicar. --dir troca a pasta-base do host (.claude no Claude Code, .agents no Codex): o catálogo vai para <dir>/plugins/orkastery ou <dir>/skills/orkastery, e o bloco continua na raiz do projeto. Catálogo fora do projeto pula o bloco com aviso.",
              "Copiar arquivos não comprova descoberta nativa nem uso pelo modelo: confira a preferência efetiva no chat do host. O Claude Code também exige a ativação do plugin indicada pelo instalador, e outra worktree precisa da própria instalação. O OpenClaw ainda não distribui essas skills."
            ],
            "code": "ork adapter install codex --dry-run\nork adapter install codex"
          },
          {
            "id": "desativar",
            "title": "Desative ou remova",
            "paragraphs": [
              "Com owner.experience false, a reinstalação tira o bloco gerenciado; repita adapter install em cada host com bloco. O Hermes respeita a preferência pela entrada da skill. experiencia uninstall remove só o bloco de codex ou claude-code, preserva o adaptador e não muda a preferência global. Sem mudança externa, a remoção restaura os bytes anteriores.",
              "Bloco editado ou duplicado, recibo incompatível ou arquivo de instruções por link fazem adapter install pular só o pacote, com aviso, e experiencia uninstall recusar sem escrever. Corrija o arquivo à mão; não apague o recibo para forçar a instalação."
            ],
            "code": "ork onboarding set maestro --conteudo '{\"owner\":{\"experience\":false}}' --por equipe\nork adapter install codex\nork experiencia uninstall codex --dry-run"
          },
          {
            "id": "coordenar",
            "title": "Coordene antes de assumir um item",
            "paragraphs": [
              "Consulte reservas e fábrica antes de assumir trabalho. O dry-run de thread new não reserva; sem ele, --roadmap usa a reserva do núcleo, e RM-NNN apenas no nome gera aviso sem associar o item.",
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
              "adapter install writes the catalog and a dedicated block to CLAUDE.md for Claude Code, or to AGENTS.md for Codex; Hermes receives both variants next to its existing skill. The block points to the catalog by a path relative to the project, so it works in another clone, and keeps the ork init block and outside content intact. In a clone without a receipt, a block identical to the generated one is adopted without duplication. --dir replaces the host base folder (.claude for Claude Code, .agents for Codex): the catalog goes to <dir>/plugins/orkastery or <dir>/skills/orkastery, and the block stays in the project root. A catalog outside the project skips the block with a warning.",
              "File copies do not prove native discovery or model behavior: check the effective preferences in the host chat. Claude Code also needs the plugin activation reported by the installer, and another worktree needs its own installation. OpenClaw does not distribute these skills yet."
            ],
            "code": "ork adapter install codex --dry-run\nork adapter install codex"
          },
          {
            "id": "desativar",
            "title": "Opt out or remove",
            "paragraphs": [
              "With owner.experience set to false, reinstalling removes the managed block; repeat adapter install for every host with a block. Hermes honors the preference through its skill entry. experiencia uninstall removes only the codex or claude-code block, keeps the adapter and leaves the global preference unchanged. Without outside changes, removal restores the previous bytes.",
              "A modified or duplicate block, an incompatible receipt or a linked instruction file makes adapter install skip only the pack, with a warning, and makes experiencia uninstall refuse without writing. Fix the file by hand; do not delete the receipt to force installation."
            ],
            "code": "ork onboarding set maestro --conteudo '{\"owner\":{\"experience\":false}}' --por equipe\nork adapter install codex\nork experiencia uninstall codex --dry-run"
          },
          {
            "id": "coordenar",
            "title": "Coordinate before taking an item",
            "paragraphs": [
              "Check reservations and the factory before taking work. A thread new dry run does not reserve; without it, --roadmap uses core reservation, and an RM-NNN in the name alone raises a warning without linking the item.",
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
              "adapter install escribe el catálogo y un bloque propio en CLAUDE.md, para Claude Code, o en AGENTS.md, para Codex; Hermes recibe las dos variantes junto a la skill existente. El bloque apunta al catálogo con una ruta relativa al proyecto, para que funcione en otro clon, y conserva el bloque de ork init y el contenido externo. En un clon sin comprobante, un bloque idéntico al generado se adopta sin duplicarse. --dir cambia la carpeta base del host (.claude en Claude Code, .agents en Codex): el catálogo va a <dir>/plugins/orkastery o <dir>/skills/orkastery, y el bloque sigue en la raíz del proyecto. Un catálogo fuera del proyecto omite el bloque con aviso.",
              "Copiar archivos no demuestra el descubrimiento nativo ni el uso por el modelo: compruebe la preferencia efectiva en el chat del host. Claude Code también exige la activación del plugin que indica el instalador, y otra worktree necesita su propia instalación. OpenClaw todavía no distribuye estas skills."
            ],
            "code": "ork adapter install codex --dry-run\nork adapter install codex"
          },
          {
            "id": "desativar",
            "title": "Desactive o retire",
            "paragraphs": [
              "Con owner.experience en false, la reinstalación retira el bloque gestionado; repita adapter install en cada host con bloque. Hermes respeta la preferencia mediante la entrada de su skill. experiencia uninstall retira solo el bloque de codex o claude-code, conserva el adaptador y no cambia la preferencia global. Sin cambios externos, la retirada restaura los bytes anteriores.",
              "Un bloque editado o duplicado, un comprobante incompatible o un archivo de instrucciones enlazado hacen que adapter install omita solo el paquete, con aviso, y que experiencia uninstall se niegue sin escribir. Corrija el archivo a mano; no borre el comprobante para forzar la instalación."
            ],
            "code": "ork onboarding set maestro --conteudo '{\"owner\":{\"experience\":false}}' --por equipe\nork adapter install codex\nork experiencia uninstall codex --dry-run"
          },
          {
            "id": "coordenar",
            "title": "Coordine antes de asumir un elemento",
            "paragraphs": [
              "Consulte reservas y fábrica antes de asumir trabajo. El dry-run de thread new no reserva; sin él, --roadmap usa la reserva del núcleo, y un RM-NNN solo en el nombre genera un aviso sin asociar el elemento.",
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
    "slug": "verificacao",
    "group": "guides",
    "sources": [
      "docs/guias/verificacao.md"
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
              "O verify registra causa, prazo e duração. Timeout é tipado e o prazo vem do manifesto; não deve virar falha genérica. Claims devem rodar o menor comando que prova a mudança. O lint avisa em claims add e ci prepare recusa a suíte local inteira: npm --prefix core test pode depender de recursos ausentes no CI. No lugar da suíte inteira, use só o teste da claim (node --test no arquivo do teste) ou um script hermético do projeto.",
              "O preparo do CI compila uma vez, vincula a identidade do produto e registra executado para distinguir resultado real de comando não executado. Em máquina sob contenção, a saída local pode expirar; isso não dispensa o CI no commit exato nem converte falha em aprovação."
            ],
            "code": "node --test test/filtro.test.js\nork ci prepare <thread>"
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
              "model_not_found produz runtime.model-unavailable. O retry tenta destinos autorizados com o mesmo prompt, preserva o perfil para outros modelos e registra a troca. Sem destino, escala com a correção de setup; rate limit comum espera sua janela. sessions stop, logs e attach procuram a conta correta nos perfis Claude configurados. Inventário global, doctor, pulse e controle nativo de HITL ainda podem ter cobertura restrita à conta do processo. Um perfil pedido com --perfil que não existe ou é de outro runtime recusa com runtime.profile-invalid e escala ao humano, sem trocar de perfil sozinho. runtime.workspace-untrusted (o runtime recusou o diretório da worktree) e runtime.consent-pending (o CLI espera o aceite de termos novos) viram espera do dono, com o comando exato; depois do aceite, ork retry run re-despacha a mesma fase com o mesmo prompt."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
          },
          {
            "id": "prova-local",
            "title": "Prova local no registro da claim",
            "paragraphs": [
              "A policy claim_sem_prova_local (alias claims_failed) vem desligada e só vale se o manifesto a declarar. Com ela, ork claims add roda os comandos da claim uma vez, na worktree da thread e no prazo de verify.timeout_ms. A claim entra de qualquer jeito: comando reprovado grava policy_warn com claims.failed, e estouro de prazo, com verify.timeout. Ela nunca para o registro, nem declarada em block. Como o add fica tão lento quanto o comando, quem decide ligá-la é o dono do projeto.",
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
              "Verify records cause, deadline and duration. Timeout has a typed reason and uses the manifest deadline. Claims should run the smallest command that proves the change. Lint warns during claims add, and ci prepare rejects the full local suite: npm --prefix core test may need resources unavailable in CI. Instead of the full suite, run only the claim’s test (node --test on the test file) or a hermetic project script.",
              "CI preparation compiles once, binds product identity and records executado to distinguish actual results from commands that never ran. Resource contention may cause a local timeout; it does not waive CI at the exact commit or turn failure into success."
            ],
            "code": "node --test test/filtro.test.js\nork ci prepare <thread>"
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
              "model_not_found produces runtime.model-unavailable. Retry tries authorized destinations with the same prompt, retains the profile for other models and records the change. Without a destination it escalates with a setup correction; ordinary rate limits wait for their window. sessions stop, logs and attach find the correct account among configured Claude profiles. Global inventory, doctor, pulse and native HITL control may still be limited to the process account. A profile requested with --perfil that does not exist or belongs to another runtime is refused with runtime.profile-invalid and escalated to a human, without switching profiles automatically. runtime.workspace-untrusted (the runtime refused the worktree directory) and runtime.consent-pending (the CLI awaits acceptance of new terms) become a wait for the owner, with the exact command; after acceptance, ork retry run dispatches the same phase again with the same prompt."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
          },
          {
            "id": "prova-local",
            "title": "Local proof when a claim is registered",
            "paragraphs": [
              "The claim_sem_prova_local policy (alias claims_failed) is off by default and applies only when the manifest declares it. With it, ork claims add runs the claim’s commands once, in the thread worktree and within verify.timeout_ms. The claim is recorded either way: a failing command records policy_warn with claims.failed, and a timeout records it with verify.timeout. It never stops registration, even when declared as block. Because add becomes as slow as the command, the project owner decides whether to turn it on.",
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
              "Verify registra causa, plazo y duración. El timeout tiene un motivo tipado y usa el plazo del manifiesto. Las claims deben ejecutar el comando más pequeño que demuestre el cambio. El lint avisa en claims add y ci prepare rechaza la suite local completa: npm --prefix core test puede necesitar recursos ausentes en CI. En lugar de la suite completa, ejecute solo la prueba de la claim (node --test en el archivo de prueba) o un script hermético del proyecto.",
              "La preparación del CI compila una vez, vincula la identidad del producto y registra executado para distinguir resultados reales de comandos no ejecutados. La contención puede agotar el plazo local; eso no exime del CI en el commit exacto ni convierte un fallo en aprobación."
            ],
            "code": "node --test test/filtro.test.js\nork ci prepare <thread>"
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
              "model_not_found produce runtime.model-unavailable. El retry prueba destinos autorizados con el mismo prompt, conserva el perfil para otros modelos y registra el cambio. Sin destino, escala con la corrección de setup; el rate limit habitual espera su ventana. sessions stop, logs y attach buscan la cuenta correcta entre los perfiles Claude configurados. El inventario global, doctor, pulse y el control nativo de HITL aún pueden limitarse a la cuenta del proceso. Un perfil pedido con --perfil que no existe o es de otro runtime se rechaza con runtime.profile-invalid y se escala a una persona, sin cambiar de perfil por su cuenta. runtime.workspace-untrusted (el runtime rechazó el directorio de la worktree) y runtime.consent-pending (el CLI espera la aceptación de términos nuevos) pasan a esperar al dueño, con el comando exacto; tras la aceptación, ork retry run vuelve a despachar la misma fase con el mismo prompt."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
          },
          {
            "id": "prova-local",
            "title": "Prueba local al registrar la claim",
            "paragraphs": [
              "La policy claim_sem_prova_local (alias claims_failed) viene desactivada y solo vale si el manifiesto la declara. Con ella, ork claims add ejecuta los comandos de la claim una vez, en la worktree de la thread y dentro de verify.timeout_ms. La claim se registra de todos modos: un comando que falla graba policy_warn con claims.failed, y un plazo agotado, con verify.timeout. Nunca detiene el registro, ni siquiera declarada como block. Como add se vuelve tan lento como el comando, quien decide activarla es el dueño del proyecto.",
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
              "OrkMind é uma integração de memória, não uma autoridade de gate. Quando indisponível, o modo efetivo e a degradação devem ser explícitos. Consulte ork memory status antes de afirmar que o contexto foi persistido ou recuperado."
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
              "OrkMind is a memory integration, not gate authority. When unavailable, the effective mode and degradation must be explicit. Check ork memory status before claiming context was stored or retrieved."
            ],
            "code": "ork memory status"
          },
          {
            "id": "significado",
            "title": "Search by meaning",
            "paragraphs": [
              "Tag search remains the deterministic path: it builds the prompt, recall and handoff. Search by meaning is a separate surface that finds paraphrases that tags and exact words miss. Every result is marked deterministico: false, and nothing semantic enters the prompt on its own.",
              "It stays off until the manifest declares the memory.embedding block, with provider, model, dimension and the name of the key variable, never its value. The vector index is local, derived from the tenant and kept out of git; reindexing unchanged content embeds nothing. Indexed text and every query go to the configured provider: use a dedicated key with a credit limit. The token and cost estimate is not an invoice. Without embeddings, the reason is embeddings.*, and the orkmind regime and tag recall stay the same.",
              "The index, the vectors, FTS and ork memory status use the same search universe: the tenant’s active entries in the ork collections, minus those the library flags with injection_risk. An entry from another tenant or collection is a typed failure (memory.query.scope-violation), never a silent drop, and is not embedded. When the read window fills up, the answer is memory.query.window-saturated instead of truncating, and ork memory index exits 1 without embedding anything.",
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
              "OrkMind es una integración de memoria, no una autoridad de gate. Cuando no está disponible, el modo efectivo y la degradación deben ser explícitos. Consulte ork memory status antes de afirmar que se guardó o recuperó contexto."
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
            "paragraphs": [
              "A fábrica compartilhada usa branches de estado no remoto para reservas e retratos de máquinas. ork fabrica entrar publica o primeiro retrato; execute apenas quando essa participação estiver autorizada. Cada máquina faz seu próprio login do runtime.",
              "fabrica.remoto é o nome de um remoto do git já configurado no clone, não uma URL: só letras, dígitos, ponto, sublinhado e hífen, sem hífen no começo, sem .. e com até 64 caracteres. O mesmo vale para o --remoto de fabrica, roadmap, ship registrar-pr, ci status e ship --para. Fora do formato, o valor nunca chega ao git: a recusa é tipada (fabrica.remoto-invalido, roadmap.remoto-invalido, ship.remoto-invalido ou ci.remoto-invalido) e mostra o valor redigido. Para outro servidor, crie o remoto com git remote add e ponha o nome no manifesto."
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
              "O ork doctor tem a linha rede: adesão, casa, última batida e última falha do rede.log. Ele só lê arquivos locais e nunca bloqueia; vira aviso quando a falha é mais nova que a batida ou quando a batida passou de 3 horas. O REDE.md da casa lista as máquinas com batida nos últimos 14 dias; as paradas há mais tempo ficam no rodapé e no ork network status. A rede está na main e ainda não saiu numa versão publicada."
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
            "paragraphs": [
              "The shared factory uses remote state branches for reservations and machine snapshots. ork fabrica entrar publishes the first snapshot; run it only when participation is authorized. Each machine performs its own runtime login.",
              "fabrica.remoto is the name of a git remote already configured in the clone, not a URL: only letters, digits, dot, underscore and hyphen, no leading hyphen, no .. and up to 64 characters. The same applies to --remoto in fabrica, roadmap, ship registrar-pr, ci status and ship --para. Outside that format, the value never reaches git: the refusal is typed (fabrica.remoto-invalido, roadmap.remoto-invalido, ship.remoto-invalido or ci.remoto-invalido) and shows the redacted value. For another server, create the remote with git remote add and put its name in the manifest."
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
              "ork doctor has a rede line: membership, home, last heartbeat and last failure from rede.log. It only reads local files and never blocks; it becomes a warning when the failure is newer than the heartbeat or when the heartbeat is older than 3 hours. The home’s REDE.md lists machines with a heartbeat in the last 14 days; those stopped for longer go to the footer and to ork network status. The network is on main and has not yet shipped in a published version."
            ],
            "code": "ork network entrar --maquina pc-casa\nork network status\nork network publicar\nork network sair"
          },
          {
            "id": "rede",
            "title": "The network roadmap, from any directory",
            "paragraphs": [
              "ork network roadmap combines the roadmap status report, reservations and each machine’s threads, with the source and time of every part. It runs from any directory, even outside a clone. The roadmap comes from the remote base, the same for every machine; this machine contributes its local state, and the others their published snapshots.",
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
            "paragraphs": [
              "La fábrica compartida usa ramas de estado en el remoto para reservas e instantáneas de máquinas. ork fabrica entrar publica la primera instantánea; ejecútelo solo cuando la participación esté autorizada. Cada máquina inicia su propia sesión del runtime.",
              "fabrica.remoto es el nombre de un remoto de git ya configurado en el clon, no una URL: solo letras, dígitos, punto, guion bajo y guion, sin guion al principio, sin .. y con hasta 64 caracteres. Lo mismo vale para --remoto de fabrica, roadmap, ship registrar-pr, ci status y ship --para. Fuera del formato, el valor nunca llega a git: el rechazo es tipado (fabrica.remoto-invalido, roadmap.remoto-invalido, ship.remoto-invalido o ci.remoto-invalido) y muestra el valor redactado. Para otro servidor, cree el remoto con git remote add y ponga el nombre en el manifiesto."
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
              "ork doctor tiene la línea rede: adhesión, casa, último latido y último fallo de rede.log. Solo lee archivos locales y nunca bloquea; pasa a aviso cuando el fallo es más reciente que el latido o cuando el latido supera las 3 horas. El REDE.md de la casa lista las máquinas con latido en los últimos 14 días; las detenidas desde hace más tiempo quedan en el pie y en ork network status. La red está en la main y aún no salió en una versión publicada."
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
      "docs/guias/sincronismo-hitl.md"
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
              "ork monitor acompanha threads; ork sessions hitl encontra sessões paradas, inclusive as que não têm thread. O radar separa espera humana, falha e estado residual usando a evidência do runtime. Uma sessão listada como viva pode estar aguardando uma resposta."
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
              "ork roadmap status é leitura pura e reúne o relatório por grupos, #HITL no que espera o dono e o próximo passo. Impedimentos técnicos aparecem como responsabilidade do orquestrador. ork master pedir solicita a nota de 0 a 5 e o motivo pelo Telegram autenticado; o recibo acompanha a gravação. O diálogo MCP de nota ainda não está disponível. Um --por digitado pelo agente não substitui prova de canal."
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
              "ork monitor tracks threads; ork sessions hitl finds blocked sessions, including those without a thread. The radar distinguishes human waiting, failure and stale state using runtime evidence. A session listed as live may be waiting for an answer."
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
              "ork roadmap status is read-only: it groups the report, marks owner decisions with #HITL and shows the next step. Technical blockers remain the orchestrator’s responsibility. ork master pedir requests a score from 0 to 5 and a reason through authenticated Telegram; the receipt accompanies the record. The MCP score dialog is not yet available. An agent-supplied --por cannot replace channel proof."
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
              "ork monitor sigue las threads; ork sessions hitl encuentra sesiones detenidas, incluso sin thread. El radar distingue espera humana, fallo y estado residual usando pruebas del runtime. Una sesión listada como viva puede estar esperando una respuesta."
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
              "ork roadmap status es de solo lectura: agrupa el informe, marca con #HITL lo que espera al dueño y muestra el siguiente paso. Los impedimentos técnicos siguen siendo responsabilidad del orquestador. ork master pedir solicita una nota de 0 a 5 y el motivo mediante Telegram autenticado; el recibo acompaña al registro. El diálogo MCP de valoración aún no está disponible. Un --por escrito por el agente no sustituye la prueba de canal."
            ],
            "code": "ork roadmap status\nork master pedir <thread> --formato telegram"
          }
        ]
      }
    }
  }
];
