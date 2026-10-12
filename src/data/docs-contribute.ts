export default [
  {
    "slug": "contribuir",
    "group": "guides",
    "sources": [
      "CONTRIBUTING.md",
      "docs/guias/contribuir/o-que-contribuir.md",
      "docs/guias/contribuir/desenvolvimento-local.md",
      "docs/guias/contribuir/testes-e-verificacao.md",
      "docs/guias/contribuir/documentacao.md",
      "docs/guias/contribuir/lint-e-estilo.md",
      "docs/guias/contribuir/pull-request.md",
      "docs/guias/contribuir/triagem.md",
      "docs/guias/contribuir/versoes-e-publicacao.md",
      "docs/guias/contribuir/com-o-ork.md"
    ],
    "translations": {
      "pt": {
        "title": "Contribuir",
        "description": "Escolha uma contribuição, prepare a prova e encontre o guia da sua tarefa.",
        "sections": [
          {
            "id": "comecar",
            "title": "Por onde começar",
            "paragraphs": [
              "Feature nova começa no GitHub Discussions. Defeito começa por uma issue com o comando, a saída real e a versão. Documentação e correções pequenas podem ir direto a um PR. Consulte issues e roadmap antes de começar; comente na issue que pretende assumir."
            ],
            "links": [
              {
                "label": "Propor uma feature no Discussions",
                "href": "https://github.com/orkastery/orkastery/discussions"
              },
              {
                "label": "Ver as issues",
                "href": "https://github.com/orkastery/orkastery/issues"
              },
              {
                "label": "Ler o CONTRIBUTING",
                "href": "https://github.com/orkastery/orkastery/blob/main/CONTRIBUTING.md"
              }
            ]
          },
          {
            "id": "prova",
            "title": "Prepare uma mudança verificável",
            "paragraphs": [
              "O PR explica o problema, a mudança, a prova, a baseline e o risco. Cole a saída real dos comandos. Separe regressões de falhas que já existiam; mudança de comportamento pede teste que reproduza o defeito. Usar o ork é recomendado e opcional. O mantenedor integra com CI verde no commit exato e conduz a publicação.",
              "Rode os comandos a partir da raiz do checkout. O guia de testes traz a lista completa de checks. Os checks obrigatórios são documentacao (markdownlint e paridade), nucleo ork (build, testes, canarios), um por versão do Node, e ork-verify.",
              "A suíte inteira (npm --prefix core test) roda em qualquer máquina. Sem o codex em /usr/bin, sem PostgreSQL com a imagem pgvector/pgvector:pg16 ou sem o interpretador do OrkMind, os testes que precisam deles saem como skip com o motivo, e a suíte termina com 0 falhas. Com ORK_TESTE_EXIGE_AMBIENTE=1, nada é pulado e a dependência que faltar reprova; o test:ci liga essa variável sozinho.",
              "Se usar o ork, rode ork ci prepare: ele grava .ork-ci/<thread>.json, só da sua thread; faça dele o último commit do PR, e o check ork-verify o acha pelo nome da branch.",
              "Mexeu em skills, references, nos adaptadores do Claude Code ou do Codex ou na versão do core/package.json? Rode node core/scripts/gerar-marketplaces.cjs e comite o resultado; o CI confere com --verificar. Mudou o frontmatter de um item? Regere só as tabelas dele com ork docs sincronizar --escrever --so RM-NNN.",
              "Mudou comportamento em core/, adapters/ ou marketplaces/? Acrescente uma linha na seção \"Não publicado\" do CHANGELOG: o check documentacao reprova o PR sem ela com changelog.linha-ausente. PR só de testes ou só de CI fica de fora. Confira antes do PR com node core/scripts/checar-changelog.cjs --base origin/main.",
              "Depois que o PR de uma thread entra na main, o item dela tem de dizer codigo: Mesclado e o índice gerado tem de bater com o frontmatter. No PR, o CI só avisa; o push da main reprova. Quem mesclou abre o PR de docs com ork docs sincronizar --escrever --so RM-NNN, numa branch nova sobre a origin/main atualizada."
            ],
            "code": "npm --prefix core ci\nnpm --prefix core run build\nnpm --prefix core run test:ci\nnode core/dist/index.js eval\nnode core/scripts/checar-changelog.cjs --base origin/main"
          },
          {
            "id": "site",
            "title": "Texto que o site usa",
            "paragraphs": [
              "Os dois sites, o do Orkastery e o do OrkMind, têm repositório próprio, e cada página de documentação sai de um catálogo, sem cópia manual: src/data/docs-catalog.ts lista os módulos editoriais, cada módulo (src/data/docs-*.ts) diz que arquivos do repositório cada página usa, e src/data/docs-sources.json guarda o SHA-256 de cada fonte e a revisão da página em PT, EN e ES. O build do site confere só esse snapshot: a sua mudança aparece lá quando o site compara as fontes com um clone do repositório do Orkastery, e a página volta a valer depois da revisão nas três línguas. Por isso a correção vai sempre na fonte, no repositório do Orkastery.",
              "Para saber que página do site do Orkastery a sua mudança deixa para revisar, node core/scripts/checar-fontes-do-site.cjs compara o checkout com o snapshot publicado; o comando abaixo, que usa a rede e o gh autenticado, baixa o snapshot e o entrega a ele. Sai 0 quando nenhum arquivo da mudança difere do snapshot e 1 com as páginas e as fontes de cada uma: cite as páginas no PR. Sem --base, a lista traz tudo o que mudou desde a última revisão do site. A página do site está errada e a fonte está certa? Abra a issue no repositório do site."
            ],
            "links": [
              {
                "label": "Como o site usa este texto",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/documentacao.md#como-o-site-usa-este-texto"
              }
            ],
            "code": "gh api repos/orkastery/orkastery.com/contents/src/data/docs-sources.json -H 'Accept: application/vnd.github.raw' | node core/scripts/checar-fontes-do-site.cjs --snapshot - --base origin/main"
          },
          {
            "id": "guias",
            "title": "Um guia por tarefa",
            "paragraphs": [
              "Os guias-fonte estão em português do Brasil, como o restante da pasta docs. Contribuições técnicas claras em inglês são bem-vindas e nunca são recusadas só pela língua.",
              "O CONTRIBUTING.md abre com o caminho curto em inglês, a partir da raiz do checkout: clone, npm --prefix core ci, build, node core/dist/index.js --version e npm --prefix core run test:ci, que é hermético (sem rede, Docker nem runtime de agente). O título do PR, as mensagens de commit e a linha do CHANGELOG podem ser em pt-BR ou em inglês; os nomes dos grupos do CHANGELOG (Adicionado, Mudado, Corrigido, Removido) não mudam.",
              "As mensagens do CLI, os rótulos e a documentação são escritos em pt-BR. Nos comandos que seguem o locale na versão {versao}, como ork doctor, ork init, ork thread new e ork phase run, o inglês vem do catálogo de core/src/locale.ts e dos core/src/locale-*.ts, tipado pelo pt-BR."
            ],
            "links": [
              {
                "label": "O que contribuir",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/o-que-contribuir.md"
              },
              {
                "label": "Desenvolvimento local",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/desenvolvimento-local.md"
              },
              {
                "label": "Testes e verificação",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/testes-e-verificacao.md"
              },
              {
                "label": "Documentação",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/documentacao.md"
              },
              {
                "label": "Lint e estilo",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/lint-e-estilo.md"
              },
              {
                "label": "Pull request",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/pull-request.md"
              },
              {
                "label": "Triagem",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/triagem.md"
              },
              {
                "label": "Versões e publicação",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/versoes-e-publicacao.md"
              },
              {
                "label": "Contribuir com o ork",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/com-o-ork.md"
              }
            ]
          },
          {
            "id": "triagem",
            "title": "Prazo, revisão e segurança",
            "paragraphs": [
              "A meta é uma primeira resposta em até 7 dias para issues e uma primeira revisão no mesmo prazo para PRs. É meta, não garantia. Se passar do prazo, comente no pedido original.",
              "O RM-050 mede este guia pelos PRs de fora: a fração cujo CI passa na primeira execução, com meta de 80%, e dois PRs mesclados sem ajuda do mantenedor, que fecham o piloto. A medida sai de node core/scripts/medir-piloto-de-contribuicao.cjs, que usa a rede e o gh autenticado. De fora é quem não é dono nem membro da organização, nem bot, e reexecutar o CI até passar não vira verde na primeira execução.",
              "Vulnerabilidades vão pelo canal privado indicado em SECURITY.md. Nunca inclua segredos, dados pessoais ou dados de clientes no repositório."
            ],
            "links": [
              {
                "label": "Como reportar uma vulnerabilidade",
                "href": "https://github.com/orkastery/orkastery/blob/main/SECURITY.md"
              }
            ]
          }
        ]
      },
      "en": {
        "title": "Contribute",
        "description": "Choose a contribution, prepare evidence and find the guide for your task.",
        "sections": [
          {
            "id": "comecar",
            "title": "Where to start",
            "paragraphs": [
              "Start new features in GitHub Discussions. Report bugs in an issue with the command, actual output and version. Documentation and small fixes can go straight to a PR. Check existing issues and the roadmap first; comment on an issue before picking it up."
            ],
            "links": [
              {
                "label": "Propose a feature in Discussions",
                "href": "https://github.com/orkastery/orkastery/discussions"
              },
              {
                "label": "Browse issues",
                "href": "https://github.com/orkastery/orkastery/issues"
              },
              {
                "label": "Read CONTRIBUTING",
                "href": "https://github.com/orkastery/orkastery/blob/main/CONTRIBUTING.md"
              }
            ]
          },
          {
            "id": "prova",
            "title": "Prepare a verifiable change",
            "paragraphs": [
              "A PR explains the problem, change, evidence, baseline and risk. Include actual command output. Separate regressions from existing failures; behavior changes need a test that reproduces the problem. Using ork is recommended and optional. The maintainer integrates with passing CI at the exact commit and handles publishing.",
              "Run commands from the checkout root. The testing guide lists the complete checks. The required checks are documentacao (markdownlint e paridade), nucleo ork (build, testes, canarios), one per Node version, and ork-verify.",
              "The full suite (npm --prefix core test) runs on any machine. Without codex in /usr/bin, without PostgreSQL with the pgvector/pgvector:pg16 image or without the OrkMind interpreter, the tests that need them are skipped with the reason, and the suite ends with 0 failures. With ORK_TESTE_EXIGE_AMBIENTE=1, nothing is skipped and a missing dependency fails; test:ci sets that variable on its own.",
              "If you use ork, run ork ci prepare: it writes .ork-ci/<thread>.json for your thread only; make it the PR’s last commit, and the ork-verify check finds it by branch name.",
              "Changed skills, references, the Claude Code or Codex adapters, or the version in core/package.json? Run node core/scripts/gerar-marketplaces.cjs and commit the result; CI checks it with --verificar. Changed an item’s frontmatter? Regenerate only its tables with ork docs sincronizar --escrever --so RM-NNN.",
              "Changed behavior in core/, adapters/ or marketplaces/? Add a line under \"Não publicado\" in the CHANGELOG: the documentacao check fails a PR without it with changelog.linha-ausente. Test-only and CI-only PRs are exempt. Check before opening the PR with node core/scripts/checar-changelog.cjs --base origin/main.",
              "Once a thread’s PR reaches main, its item must say codigo: Mesclado and the generated index must match the frontmatter. On the PR, CI only warns; the push to main fails. Whoever merged opens the docs PR with ork docs sincronizar --escrever --so RM-NNN, on a new branch from the updated origin/main."
            ],
            "code": "npm --prefix core ci\nnpm --prefix core run build\nnpm --prefix core run test:ci\nnode core/dist/index.js eval\nnode core/scripts/checar-changelog.cjs --base origin/main"
          },
          {
            "id": "site",
            "title": "Text the site uses",
            "paragraphs": [
              "Both sites, Orkastery’s and OrkMind’s, have their own repository, and each documentation page comes from a catalog, with no manual copy: src/data/docs-catalog.ts lists the editorial modules, each module (src/data/docs-*.ts) says which repository files each page uses, and src/data/docs-sources.json keeps the SHA-256 of each source and the page review in PT, EN and ES. The site build checks only that snapshot: your change shows up there when the site compares the sources with a clone of the Orkastery repository, and the page is valid again after review in all three languages. That is why the fix always goes to the source, in the Orkastery repository.",
              "To find which page of the Orkastery site your change leaves for review, node core/scripts/checar-fontes-do-site.cjs compares the checkout with the published snapshot; the command below, which uses the network and an authenticated gh, downloads the snapshot and hands it over. It exits 0 when no file in the change differs from the snapshot and 1 with the pages and each page’s sources: cite the pages in the PR. Without --base, the list covers everything that changed since the site’s last review. Is the site page wrong while the source is right? Open the issue in the site repository."
            ],
            "links": [
              {
                "label": "How the site uses this text",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/documentacao.md#como-o-site-usa-este-texto"
              }
            ],
            "code": "gh api repos/orkastery/orkastery.com/contents/src/data/docs-sources.json -H 'Accept: application/vnd.github.raw' | node core/scripts/checar-fontes-do-site.cjs --snapshot - --base origin/main"
          },
          {
            "id": "guias",
            "title": "One guide per task",
            "paragraphs": [
              "Source guides are in Brazilian Portuguese, like the rest of the docs folder. Clear technical contributions in English are welcome and are never turned away for language alone.",
              "CONTRIBUTING.md opens with the short path in English, from the checkout root: clone, npm --prefix core ci, build, node core/dist/index.js --version and npm --prefix core run test:ci, which is hermetic (no network, no Docker, no agent runtime). The PR title, commit messages and CHANGELOG line can be in pt-BR or in English; the CHANGELOG group names (Adicionado, Mudado, Corrigido, Removido) stay as they are.",
              "CLI messages, labels and documentation are written in pt-BR. For the commands that follow the locale in version {versao}, such as ork doctor, ork init, ork thread new and ork phase run, the English comes from the catalog in core/src/locale.ts and the core/src/locale-*.ts files, typed by the pt-BR."
            ],
            "links": [
              {
                "label": "What to contribute",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/o-que-contribuir.md"
              },
              {
                "label": "Local development",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/desenvolvimento-local.md"
              },
              {
                "label": "Tests and verification",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/testes-e-verificacao.md"
              },
              {
                "label": "Documentation",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/documentacao.md"
              },
              {
                "label": "Lint and style",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/lint-e-estilo.md"
              },
              {
                "label": "Pull requests",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/pull-request.md"
              },
              {
                "label": "Triage",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/triagem.md"
              },
              {
                "label": "Versions and publishing",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/versoes-e-publicacao.md"
              },
              {
                "label": "Contributing with ork",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/com-o-ork.md"
              }
            ]
          },
          {
            "id": "triagem",
            "title": "Response time, review and security",
            "paragraphs": [
              "The target is an initial response to issues within 7 days, and an initial PR review within the same period. This is a target, not a guarantee. If it is missed, comment on the original request.",
              "RM-050 measures this guide by outside PRs: the share whose CI passes on the first run, with an 80% target, and two PRs merged without the maintainer’s help, which close the pilot. The measurement comes from node core/scripts/medir-piloto-de-contribuicao.cjs, which uses the network and an authenticated gh. Outside means neither the owner, an organization member nor a bot, and re-running CI until it passes does not count as green on the first run.",
              "Report vulnerabilities through the private channel in SECURITY.md. Keep secrets, personal information and customer data out of the repository."
            ],
            "links": [
              {
                "label": "How to report a vulnerability",
                "href": "https://github.com/orkastery/orkastery/blob/main/SECURITY.md"
              }
            ]
          }
        ]
      },
      "es": {
        "title": "Cómo contribuir",
        "description": "Elija una contribución, prepare las pruebas y encuentre la guía de su tarea.",
        "sections": [
          {
            "id": "comecar",
            "title": "Por dónde empezar",
            "paragraphs": [
              "Una funcionalidad nueva empieza en GitHub Discussions. Un defecto empieza por una issue con el comando, la salida real y la versión. La documentación y las correcciones pequeñas pueden ir directamente a un PR. Consulte las issues y el roadmap antes de empezar; comente en la issue que quiera asumir."
            ],
            "links": [
              {
                "label": "Proponer una funcionalidad en Discussions",
                "href": "https://github.com/orkastery/orkastery/discussions"
              },
              {
                "label": "Consultar las issues",
                "href": "https://github.com/orkastery/orkastery/issues"
              },
              {
                "label": "Leer CONTRIBUTING",
                "href": "https://github.com/orkastery/orkastery/blob/main/CONTRIBUTING.md"
              }
            ]
          },
          {
            "id": "prova",
            "title": "Prepare un cambio verificable",
            "paragraphs": [
              "El PR explica el problema, el cambio, las pruebas, la baseline y el riesgo. Incluya la salida real de los comandos. Separe las regresiones de los fallos previos; un cambio de comportamiento requiere una prueba que reproduzca el defecto. Usar ork es recomendable y opcional. El mantenedor integra con CI aprobado en el commit exacto y se encarga de publicar.",
              "Ejecute los comandos desde la raíz del checkout. La guía de pruebas incluye la lista completa de comprobaciones. Los checks obligatorios son documentacao (markdownlint e paridade), nucleo ork (build, testes, canarios), uno por versión de Node, y ork-verify.",
              "La suite completa (npm --prefix core test) corre en cualquier máquina. Sin codex en /usr/bin, sin PostgreSQL con la imagen pgvector/pgvector:pg16 o sin el intérprete de OrkMind, las pruebas que los necesitan salen como skip con el motivo, y la suite termina con 0 fallos. Con ORK_TESTE_EXIGE_AMBIENTE=1, no se omite nada y la dependencia que falte reprueba; test:ci activa esa variable por sí solo.",
              "Si usa ork, ejecute ork ci prepare: escribe .ork-ci/<thread>.json, solo de su thread; conviértalo en el último commit del PR, y el check ork-verify lo encuentra por el nombre de la branch.",
              "¿Cambió skills, references, los adaptadores de Claude Code o Codex o la versión de core/package.json? Ejecute node core/scripts/gerar-marketplaces.cjs y haga commit del resultado; el CI lo comprueba con --verificar. ¿Cambió el frontmatter de un elemento? Regenere solo sus tablas con ork docs sincronizar --escrever --so RM-NNN.",
              "¿Cambió el comportamiento en core/, adapters/ o marketplaces/? Añada una línea en la sección \"Não publicado\" del CHANGELOG: el check documentacao rechaza el PR sin ella con changelog.linha-ausente. Los PR solo de pruebas o solo de CI quedan exentos. Compruébelo antes del PR con node core/scripts/checar-changelog.cjs --base origin/main.",
              "Cuando el PR de una thread entra en main, su elemento debe decir codigo: Mesclado y el índice generado debe coincidir con el frontmatter. En el PR, el CI solo avisa; el push a main falla. Quien fusionó abre el PR de documentación con ork docs sincronizar --escrever --so RM-NNN, en una branch nueva sobre la origin/main actualizada."
            ],
            "code": "npm --prefix core ci\nnpm --prefix core run build\nnpm --prefix core run test:ci\nnode core/dist/index.js eval\nnode core/scripts/checar-changelog.cjs --base origin/main"
          },
          {
            "id": "site",
            "title": "Texto que usa el sitio",
            "paragraphs": [
              "Los dos sitios, el de Orkastery y el de OrkMind, tienen repositorio propio, y cada página de documentación sale de un catálogo, sin copia manual: src/data/docs-catalog.ts lista los módulos editoriales, cada módulo (src/data/docs-*.ts) indica qué archivos del repositorio usa cada página, y src/data/docs-sources.json guarda el SHA-256 de cada fuente y la revisión de la página en PT, EN y ES. El build del sitio comprueba solo esa instantánea: su cambio aparece allí cuando el sitio compara las fuentes con un clon del repositorio de Orkastery, y la página vuelve a valer tras la revisión en los tres idiomas. Por eso la corrección va siempre a la fuente, en el repositorio de Orkastery.",
              "Para saber qué página del sitio de Orkastery deja su cambio por revisar, node core/scripts/checar-fontes-do-site.cjs compara el checkout con la instantánea publicada; el comando de abajo, que usa la red y el gh autenticado, descarga la instantánea y se la entrega. Sale con 0 cuando ningún archivo del cambio difiere de la instantánea y con 1 con las páginas y las fuentes de cada una: cite las páginas en el PR. Sin --base, la lista incluye todo lo que cambió desde la última revisión del sitio. ¿La página del sitio está mal y la fuente está bien? Abra la issue en el repositorio del sitio."
            ],
            "links": [
              {
                "label": "Cómo usa el sitio este texto",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/documentacao.md#como-o-site-usa-este-texto"
              }
            ],
            "code": "gh api repos/orkastery/orkastery.com/contents/src/data/docs-sources.json -H 'Accept: application/vnd.github.raw' | node core/scripts/checar-fontes-do-site.cjs --snapshot - --base origin/main"
          },
          {
            "id": "guias",
            "title": "Una guía por tarea",
            "paragraphs": [
              "Las guías fuente están en portugués de Brasil, como el resto de la carpeta docs. Las contribuciones técnicas claras en inglés son bienvenidas y nunca se rechazan solo por el idioma.",
              "CONTRIBUTING.md empieza con el camino corto en inglés, desde la raíz del checkout: clone, npm --prefix core ci, build, node core/dist/index.js --version y npm --prefix core run test:ci, que es hermético (sin red, sin Docker y sin runtime de agente). El título del PR, los mensajes de commit y la línea del CHANGELOG pueden estar en pt-BR o en inglés; los nombres de los grupos del CHANGELOG (Adicionado, Mudado, Corrigido, Removido) no cambian.",
              "Los mensajes del CLI, las etiquetas y la documentación se escriben en pt-BR. En los comandos que siguen el locale en la versión {versao}, como ork doctor, ork init, ork thread new y ork phase run, el inglés sale del catálogo de core/src/locale.ts y de los core/src/locale-*.ts, tipado por el pt-BR."
            ],
            "links": [
              {
                "label": "Qué contribuir",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/o-que-contribuir.md"
              },
              {
                "label": "Desarrollo local",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/desenvolvimento-local.md"
              },
              {
                "label": "Pruebas y verificación",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/testes-e-verificacao.md"
              },
              {
                "label": "Documentación",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/documentacao.md"
              },
              {
                "label": "Lint y estilo",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/lint-e-estilo.md"
              },
              {
                "label": "Pull requests",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/pull-request.md"
              },
              {
                "label": "Triaje",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/triagem.md"
              },
              {
                "label": "Versiones y publicación",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/versoes-e-publicacao.md"
              },
              {
                "label": "Contribuir con ork",
                "href": "https://github.com/orkastery/orkastery/blob/main/docs/guias/contribuir/com-o-ork.md"
              }
            ]
          },
          {
            "id": "triagem",
            "title": "Plazo, revisión y seguridad",
            "paragraphs": [
              "El objetivo es una primera respuesta a las issues en un máximo de 7 días y una primera revisión de los PRs en el mismo plazo. Es un objetivo, no una garantía. Si se supera, comente en la solicitud original.",
              "El RM-050 mide esta guía por los PR de fuera: la fracción cuyo CI pasa en la primera ejecución, con un objetivo del 80%, y dos PR fusionados sin ayuda del mantenedor, que cierran el piloto. La medida sale de node core/scripts/medir-piloto-de-contribuicao.cjs, que usa la red y el gh autenticado. De fuera es quien no es dueño ni miembro de la organización, ni bot, y reejecutar el CI hasta que pase no cuenta como verde en la primera ejecución.",
              "Comunique las vulnerabilidades por el canal privado de SECURITY.md. No incluya secretos, datos personales ni datos de clientes en el repositorio."
            ],
            "links": [
              {
                "label": "Cómo comunicar una vulnerabilidad",
                "href": "https://github.com/orkastery/orkastery/blob/main/SECURITY.md"
              }
            ]
          }
        ]
      }
    }
  }
];
