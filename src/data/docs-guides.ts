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
              "Use ork onboarding set para registrar uma etapa com autoria. Revise a saída antes de publicar a entrevista na memória. DSNs, tokens e senhas não pertencem às respostas públicas; a configuração aponta para variáveis protegidas. Sem --por, a autoria registrada é owner, o que não comprova a resposta de uma pessoa."
            ],
            "code": "ork onboarding set produtos --conteudo '{\"produtos\":[\"meu-produto\"]}' --por operador"
          },
          {
            "id": "experiencia",
            "title": "Preferências da conversa",
            "paragraphs": [
              "A etapa maestro também oferece ativar o pacote de experiência com os valores detectados, configurá-lo ou desativá-lo. Uma resposta com o objeto owner grava idioma, fuso, profundidade e ativação no manifesto, preservando as outras seções e respostas. Consultar as preferências não cria resposta, autoria nem aprovação."
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
              "Use ork onboarding set to record a stage with attribution. Review the output before publishing the interview to memory. DSNs, tokens and passwords do not belong in public answers; configuration refers to protected variables. Without --por, the recorded author is owner, which does not prove that a person answered."
            ],
            "code": "ork onboarding set produtos --conteudo '{\"produtos\":[\"meu-produto\"]}' --por operador"
          },
          {
            "id": "experiencia",
            "title": "Conversation preferences",
            "paragraphs": [
              "The maestro stage also offers to activate the experience pack with detected values, configure it or turn it off. An answer with the owner object stores language, timezone, depth and activation in the manifest, preserving other sections and answers. Reading preferences creates no answer, authorship or approval."
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
              "Use ork onboarding set para registrar una etapa con autoría. Revise la salida antes de publicar la entrevista en la memoria. Los DSN, tokens y contraseñas no pertenecen a las respuestas públicas; la configuración referencia variables protegidas. Sin --por, la autoría registrada es owner, lo que no demuestra la respuesta de una persona."
            ],
            "code": "ork onboarding set produtos --conteudo '{\"produtos\":[\"meu-produto\"]}' --por operador"
          },
          {
            "id": "experiencia",
            "title": "Preferencias de la conversación",
            "paragraphs": [
              "La etapa maestro también ofrece activar el paquete de experiencia con los valores detectados, configurarlo o desactivarlo. Una respuesta con el objeto owner guarda idioma, zona horaria, profundidad y activación en el manifiesto, conservando las demás secciones y respuestas. Consultar las preferencias no crea respuesta, autoría ni aprobación."
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
              "owner.language recebe um locale BCP-47; owner.timezone, um fuso IANA; owner.depth, curta ou detalhada; owner.experience, true ou false. Sem valor, valem o locale do sistema, o fuso resolvido pelo núcleo, curta e true. Locales portugueses usam a variante pt-BR das skills; os demais usam a inglesa e mantêm o idioma de resposta configurado. Entrada inválida é recusada antes de gravar; valor inválido editado à mão gera aviso e vale o padrão."
            ],
            "code": "ork onboarding\nork experiencia show --json"
          },
          {
            "id": "instalar",
            "title": "Instale em cada host",
            "paragraphs": [
              "adapter install grava o catálogo e um bloco próprio em CLAUDE.md, no Claude Code, ou em AGENTS.md, no Codex; o Hermes recebe as duas variantes ao lado da skill existente. O bloco aponta o catálogo por caminho relativo ao projeto, para valer em outro clone, e preserva o bloco do ork init e o conteúdo externo. Num clone sem recibo, um bloco igual ao gerado é adotado sem duplicar.",
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
              "Testes focados cobrem preferências, blocos, clone sem recibo, conflitos, adaptadores e contratos MCP. Os evals das skills são estáticos e não comprovam o comportamento real de um modelo. Um ensaio do repositório do produto instala o pacote local em prefixo e HOME temporários e confere instalação, reinstalação, opt-out, remoção e restauração."
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
              "owner.language takes a BCP-47 locale; owner.timezone, an IANA timezone; owner.depth, curta (short) or detalhada (detailed); owner.experience, true or false. When a value is absent, the system locale, the core’s timezone resolution, curta and true apply. Portuguese locales select the pt-BR skill variant; other locales select English while keeping the configured response language. Invalid input is rejected before anything is stored; an invalid value edited by hand raises a warning and falls back to the default."
            ],
            "code": "ork onboarding\nork experiencia show --json"
          },
          {
            "id": "instalar",
            "title": "Install in each host",
            "paragraphs": [
              "adapter install writes the catalog and a dedicated block to CLAUDE.md for Claude Code, or to AGENTS.md for Codex; Hermes receives both variants next to its existing skill. The block points to the catalog by a path relative to the project, so it works in another clone, and keeps the ork init block and outside content intact. In a clone without a receipt, a block identical to the generated one is adopted without duplication.",
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
              "Focused tests cover preferences, blocks, fresh clones without a receipt, conflicts, adapters and MCP contracts. Skill evals are static and do not prove real model behavior. A rehearsal from the product repository installs the local package into a temporary prefix and HOME and checks installation, reinstallation, opt-out, removal and restoration."
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
              "owner.language recibe un locale BCP-47; owner.timezone, una zona horaria IANA; owner.depth, curta (breve) o detalhada (detallada); owner.experience, true o false. Sin valor, se aplican el locale del sistema, la zona que resuelve el núcleo, curta y true. Los locales portugueses usan la variante pt-BR de las skills; los demás usan la inglesa y conservan el idioma de respuesta configurado. Una entrada inválida se rechaza antes de guardar; un valor inválido editado a mano genera un aviso y se aplica el valor predeterminado."
            ],
            "code": "ork onboarding\nork experiencia show --json"
          },
          {
            "id": "instalar",
            "title": "Instale en cada host",
            "paragraphs": [
              "adapter install escribe el catálogo y un bloque propio en CLAUDE.md, para Claude Code, o en AGENTS.md, para Codex; Hermes recibe las dos variantes junto a la skill existente. El bloque apunta al catálogo con una ruta relativa al proyecto, para que funcione en otro clon, y conserva el bloque de ork init y el contenido externo. En un clon sin comprobante, un bloque idéntico al generado se adopta sin duplicarse.",
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
              "Las pruebas específicas cubren preferencias, bloques, clones sin comprobante, conflictos, adaptadores y contratos MCP. Los evals de las skills son estáticos y no demuestran el comportamiento real de un modelo. Un ensayo desde el repositorio del producto instala el paquete local en un prefijo y un HOME temporales y comprueba instalación, reinstalación, desactivación, retirada y restauración."
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
            "code": "ork verify <thread> --baseline\nork claims add <thread> src/filtro.ts --claim \"o filtro respeita o fuso\" --verificar \"npm test -- filtro\""
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
              "O verify registra causa, prazo e duração. Timeout é tipado e o prazo vem do manifesto; não deve virar falha genérica. Claims devem rodar o menor comando que prova a mudança. O lint avisa em claims add e ci prepare recusa a suíte local inteira: npm --prefix core test pode depender de recursos ausentes no CI.",
              "O preparo do CI compila uma vez, vincula a identidade do produto e registra executado para distinguir resultado real de comando não executado. Em máquina sob contenção, a saída local pode expirar; isso não dispensa o CI no commit exato nem converte falha em aprovação."
            ],
            "code": "npm --prefix core run test:ci\nork ci prepare <thread>"
          },
          {
            "id": "runtime-e-sessoes",
            "title": "Modelo indisponível e conta da sessão",
            "paragraphs": [
              "model_not_found produz runtime.model-unavailable. O retry tenta destinos autorizados com o mesmo prompt, preserva o perfil para outros modelos e registra a troca. Sem destino, escala com a correção de setup; rate limit comum espera sua janela. sessions stop, logs e attach procuram a conta correta nos perfis Claude configurados. Inventário global, doctor, pulse e controle nativo de HITL ainda podem ter cobertura restrita à conta do processo."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
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
            "code": "ork verify <thread> --baseline\nork claims add <thread> src/filtro.ts --claim \"o filtro respeita o fuso\" --verificar \"npm test -- filtro\""
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
              "Verify records cause, deadline and duration. Timeout has a typed reason and uses the manifest deadline. Claims should run the smallest command that proves the change. Lint warns during claims add, and ci prepare rejects the full local suite: npm --prefix core test may need resources unavailable in CI.",
              "CI preparation compiles once, binds product identity and records executado to distinguish actual results from commands that never ran. Resource contention may cause a local timeout; it does not waive CI at the exact commit or turn failure into success."
            ],
            "code": "npm --prefix core run test:ci\nork ci prepare <thread>"
          },
          {
            "id": "runtime-e-sessoes",
            "title": "Unavailable models and session accounts",
            "paragraphs": [
              "model_not_found produces runtime.model-unavailable. Retry tries authorized destinations with the same prompt, retains the profile for other models and records the change. Without a destination it escalates with a setup correction; ordinary rate limits wait for their window. sessions stop, logs and attach find the correct account among configured Claude profiles. Global inventory, doctor, pulse and native HITL control may still be limited to the process account."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
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
            "code": "ork verify <thread> --baseline\nork claims add <thread> src/filtro.ts --claim \"o filtro respeita o fuso\" --verificar \"npm test -- filtro\""
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
              "Verify registra causa, plazo y duración. El timeout tiene un motivo tipado y usa el plazo del manifiesto. Las claims deben ejecutar el comando más pequeño que demuestre el cambio. El lint avisa en claims add y ci prepare rechaza la suite local completa: npm --prefix core test puede necesitar recursos ausentes en CI.",
              "La preparación del CI compila una vez, vincula la identidad del producto y registra executado para distinguir resultados reales de comandos no ejecutados. La contención puede agotar el plazo local; eso no exime del CI en el commit exacto ni convierte un fallo en aprobación."
            ],
            "code": "npm --prefix core run test:ci\nork ci prepare <thread>"
          },
          {
            "id": "runtime-e-sessoes",
            "title": "Modelo no disponible y cuenta de sesión",
            "paragraphs": [
              "model_not_found produce runtime.model-unavailable. El retry prueba destinos autorizados con el mismo prompt, conserva el perfil para otros modelos y registra el cambio. Sin destino, escala con la corrección de setup; el rate limit habitual espera su ventana. sessions stop, logs y attach buscan la cuenta correcta entre los perfiles Claude configurados. El inventario global, doctor, pulse y el control nativo de HITL aún pueden limitarse a la cuenta del proceso."
            ],
            "code": "ork retry plan <thread>\nork retry run <thread> --dry-run"
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
              "Ela fica desligada até o manifesto declarar o bloco memory.embedding, com provider, modelo, dimensão e o nome da variável da chave, nunca o valor. O índice vetorial é local, derivado do tenant e fora do git; reindexar sem mudança não embeda nada. O texto indexado e cada consulta saem para o provider configurado: use uma chave dedicada, com limite de crédito. A estimativa de tokens e custo não é fatura. Sem embeddings, o motivo é embeddings.*, e o regime orkmind e o recall por tag seguem iguais."
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
              "It stays off until the manifest declares the memory.embedding block, with provider, model, dimension and the name of the key variable, never its value. The vector index is local, derived from the tenant and kept out of git; reindexing unchanged content embeds nothing. Indexed text and every query go to the configured provider: use a dedicated key with a credit limit. The token and cost estimate is not an invoice. Without embeddings, the reason is embeddings.*, and the orkmind regime and tag recall stay the same."
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
              "Permanece desactivada hasta que el manifiesto declare el bloque memory.embedding, con provider, modelo, dimensión y el nombre de la variable de la clave, nunca su valor. El índice vectorial es local, derivado del tenant y fuera de git; reindexar sin cambios no genera embeddings. El texto indexado y cada consulta salen hacia el provider configurado: use una clave dedicada con límite de crédito. La estimación de tokens y coste no es una factura. Sin embeddings, el motivo es embeddings.*, y el régimen orkmind y el recall por etiqueta no cambian."
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
      "docs/guias/varias-maquinas.md"
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
              "A fábrica compartilhada usa branches de estado no remoto para reservas e retratos de máquinas. ork fabrica entrar publica o primeiro retrato; execute apenas quando essa participação estiver autorizada. Cada máquina faz seu próprio login do runtime."
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
            "id": "rede",
            "title": "O roadmap da rede, de qualquer diretório",
            "paragraphs": [
              "ork network roadmap junta o status report do roadmap, as reservas e as threads de cada máquina, com a fonte e a hora de cada parte. Roda de qualquer diretório, inclusive fora de um clone. O roadmap vem da base remota, igual para toda máquina; esta máquina entra pelo estado local, e as outras pelo retrato publicado.",
              "Sem clone, a leitura usa a CLI da forja já autenticada, gh ou glab, só com consulta; nenhum token sai dela. O que não foi lido sai como lacuna, com o tipo e o que fazer: máquina sem batida há mais de 3 h, forja sem login, sem rede. A resposta nunca diz vazio por não ter lido."
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
              "The shared factory uses remote state branches for reservations and machine snapshots. ork fabrica entrar publishes the first snapshot; run it only when participation is authorized. Each machine performs its own runtime login."
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
            "id": "rede",
            "title": "The network roadmap, from any directory",
            "paragraphs": [
              "ork network roadmap combines the roadmap status report, reservations and each machine’s threads, with the source and time of every part. It runs from any directory, even outside a clone. The roadmap comes from the remote base, the same for every machine; this machine contributes its local state, and the others their published snapshots.",
              "Without a clone, it reads through the forge CLI you have already authenticated, gh or glab, using queries only; no token leaves it. Anything not read appears as a typed gap with the next step: a machine without a heartbeat for more than 3 h, a forge without login, no network. The answer never says empty because it did not read."
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
              "La fábrica compartida usa ramas de estado en el remoto para reservas e instantáneas de máquinas. ork fabrica entrar publica la primera instantánea; ejecútelo solo cuando la participación esté autorizada. Cada máquina inicia su propia sesión del runtime."
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
            "id": "rede",
            "title": "El roadmap de la red, desde cualquier directorio",
            "paragraphs": [
              "ork network roadmap reúne el informe de estado del roadmap, las reservas y las threads de cada máquina, con la fuente y la hora de cada parte. Funciona desde cualquier directorio, incluso fuera de un clon. El roadmap procede de la base remota, igual para todas las máquinas; esta máquina aporta su estado local, y las demás, su instantánea publicada.",
              "Sin clon, la lectura usa la CLI de la forja ya autenticada, gh o glab, solo con consultas; ningún token sale de ella. Lo que no se leyó aparece como laguna tipada, con lo que hay que hacer: máquina sin latido desde hace más de 3 h, forja sin sesión iniciada, sin red. La respuesta nunca dice vacío por no haber leído."
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
              "O contrato ork.hitl-curto/v1 organiza título, pergunta em uma frase, o que trava e desde quando, alternativas de uma linha com consequência, recomendação com motivo e uma última linha dizendo como responder. Evidências, claims, riscos e diff ficam acessíveis pelo código seguido de detalhes. O ingresso autenticado e sua prova HMAC continuam obrigatórios."
            ],
            "code": "ork gate request <thread> --formato telegram"
          },
          {
            "id": "texto-e-linha",
            "title": "Texto livre e linha estável",
            "paragraphs": [
              "Texto livre inequívoco pode ser associado à ação de uma alternativa. Ambiguidade volta como pergunta. Uma palavra solta só vale na janela de escuta aberta pelo núcleo, com um único pedido para o dono em todas as threads, e nunca para ato irreversível. O agente não responde pelo dono.",
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
              "ork.hitl-curto/v1 organizes a title, one-sentence question, what is blocked and since when, one-line options with consequences, a reasoned recommendation and a final response instruction. Evidence, claims, risks and diff are available using the short code followed by detalhes. Authenticated ingress and its HMAC proof remain required."
            ],
            "code": "ork gate request <thread> --formato telegram"
          },
          {
            "id": "texto-e-linha",
            "title": "Free text and stable codes",
            "paragraphs": [
              "Unambiguous free text can map to an option’s action. Ambiguity produces a clarification. A standalone word is accepted only within the core’s open listening window, with one request for the owner across all threads, and never for an irreversible action. The agent cannot answer for the owner.",
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
              "ork.hitl-curto/v1 organiza título, pregunta en una frase, qué bloquea y desde cuándo, alternativas de una línea con consecuencia, recomendación justificada y una última línea que indica cómo responder. Las pruebas, claims, riesgos y diff se consultan con el código seguido de detalhes. El ingreso autenticado y su prueba HMAC siguen siendo obligatorios."
            ],
            "code": "ork gate request <thread> --formato telegram"
          },
          {
            "id": "texto-e-linha",
            "title": "Texto libre y códigos estables",
            "paragraphs": [
              "El texto libre inequívoco puede corresponder a la acción de una alternativa. La ambigüedad devuelve una pregunta. Una palabra aislada solo se acepta en la ventana de escucha abierta por el núcleo, con una única solicitud para el dueño en todas las threads, y nunca para un acto irreversible. El agente no responde por el dueño.",
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
