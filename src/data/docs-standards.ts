export default [
  {
    "slug": "padroes",
    "group": "standards",
    "sources": [
      "docs/padroes/documentacao-de-produto.md",
      "docs/padroes/roadmap-de-produto.md",
      "docs/README.md",
      "docs/conceitos/diagramas/README.md",
      "docs/assets/marca/README.md",
      "docs/produto/README.md",
      "docs/produto/_modelo-feature.md",
      "docs/referencia/contratos/grafo-deterministico-kg1.md",
      "docs/referencia/contratos/benchmark-grafo-kg1.md",
      "docs/referencia/contratos/indice-grafo-kg3.md"
    ],
    "translations": {
      "pt": {
        "title": "Padrões e manutenção das docs",
        "description": "Mantenha identidade, comportamento, evidência e planejamento em seus lugares.",
        "sections": [
          {
            "id": "produto",
            "title": "Documente comportamento verificável",
            "paragraphs": [
              "A hierarquia PLAT → SYS → MOD → FEAT organiza o produto. Cada página identifica finalidade, estado, origem e vínculos. Uma feature descreve pré-condições, fluxo, alternativas, pós-condições, regras e critérios de aceite. Dados, APIs e operação precisam de limites explícitos. No Orkastery, o número de uma FEAT nova sai de ork roadmap feat, reservado entre máquinas; nunca do maior número da sua branch."
            ],
            "code": "ork roadmap feat --thread <thread>\nork docs verificar\nork docs sincronizar"
          },
          {
            "id": "planejamento",
            "title": "Separe plano de disponibilidade",
            "paragraphs": [
              "O roadmap registra problema, objetivo, escopo, dependências, decisões e critérios de validação. Código mesclado, testes aprovados, deploy e exposição ao usuário são fatos diferentes. Nos sites, o roadmap aparece somente como resumo mensal com link para a fonte.",
              "O estado do código acompanha o git nos dois sentidos: codigo: Mesclado exige o commit do merge na base, e o merge ship(<thread>) da thread do item exige codigo: Mesclado. O ork docs verificar reprova a divergência (docs.paridade.merge) e o índice que não bate com o frontmatter (docs.paridade.indice); no PR, com --pr, os dois só avisam, porque a divergência é da main. O ork docs sincronizar --escrever, num PR de docs depois do merge, corrige os dois.",
              "No Orkastery, ork docs sincronizar atualiza o estado do código a partir do ledger e do git, e a seção sdlc a partir da thread; nunca mexe em ciclo, documentação, deploy, exposição ou habilitação. Na worktree de uma thread, só toca o item dela; --so escolhe os itens e --todos volta a todos. Fechar a thread solta a reserva do item ou a passa para outra thread aberta do mesmo item."
            ]
          },
          {
            "id": "editorial",
            "title": "Revisão editorial e visual",
            "paragraphs": [
              "Use caixa de frase nos títulos e rótulos; preserve siglas, comandos e nomes próprios. Diagramas têm título, descrição e sequência legível sem depender da cor. Os índices e modelos orientam a edição; os ativos de marca permanecem na origem e não representam funcionalidades adicionais.",
              "O snapshot público registra caminhos relativos e hashes. Sincronizar uma fonte alterada invalida as revisões afetadas. A revisão das três línguas é explícita e o build funciona com o snapshot versionado, sem buscar conteúdo remoto."
            ]
          },
          {
            "id": "contratos-kg1",
            "title": "Contrato não é resultado medido",
            "paragraphs": [
              "Os contratos KG1 fixam grafo e benchmark separadamente. O grafo conserva proveniência e restrições de acesso e recalcula identidades pelo conteúdo. O benchmark fixa pares A/B, tarefas, controles, tentativas e fontes de medida. Corpus sintético valida o contrato; não demonstra economia de tokens, latência ou significância. Uma medida ausente fica null com motivo. A extração do KG2, o índice com consulta do KG3 e o índice incremental do KG4, com os mesmos bytes da extração completa, vieram sem mudar o contrato. O KG4 também mediu a parte determinística e fixou o protocolo da rodada paga como not-run; a rodada paga continua pendente, e nenhum número publicado é economia medida."
            ]
          }
        ]
      },
      "en": {
        "title": "Documentation standards and maintenance",
        "description": "Keep identity, behavior, evidence and planning in their proper places.",
        "sections": [
          {
            "id": "produto",
            "title": "Document verifiable behavior",
            "paragraphs": [
              "The PLAT → SYS → MOD → FEAT hierarchy organizes the product. Each page identifies purpose, state, sources and relationships. A feature describes preconditions, flow, alternatives, postconditions, rules and acceptance criteria. Data, APIs and operations need explicit limits. In Orkastery, a new FEAT number comes from ork roadmap feat, reserved across machines; never from the highest number on your branch."
            ],
            "code": "ork roadmap feat --thread <thread>\nork docs verificar\nork docs sincronizar"
          },
          {
            "id": "planejamento",
            "title": "Separate plans from availability",
            "paragraphs": [
              "The roadmap records the problem, goal, scope, dependencies, decisions and validation criteria. Merged code, passing tests, deployment and user exposure are different facts. On these sites, the roadmap appears only as a monthly summary linked to its source.",
              "Code state follows git both ways: codigo: Mesclado requires the merge commit on the base, and the ship(<thread>) merge of the item’s thread requires codigo: Mesclado. ork docs verificar fails on the mismatch (docs.paridade.merge) and on an index that does not match the frontmatter (docs.paridade.indice); on a PR, with --pr, both only warn, because the mismatch belongs to main. ork docs sincronizar --escrever, in a docs PR after the merge, fixes both.",
              "In Orkastery, ork docs sincronizar updates code state from the ledger and git, and the sdlc section from the thread; it never changes lifecycle, documentation, deployment, exposure or enablement. In a thread’s worktree it touches only that thread’s item; --so selects items and --todos covers all of them. Closing a thread releases its item reservation or passes it to another open thread on the same item."
            ]
          },
          {
            "id": "editorial",
            "title": "Editorial and visual review",
            "paragraphs": [
              "Use sentence case for headings and labels; preserve acronyms, commands and proper names. Diagrams have titles, descriptions and a sequence readable without relying on color. Indexes and templates guide editing; brand assets remain at the source and do not represent additional features.",
              "The public snapshot records relative paths and hashes. Synchronizing a changed source invalidates affected reviews. All three languages require explicit review, and builds use the versioned snapshot without fetching remote content."
            ]
          },
          {
            "id": "contratos-kg1",
            "title": "A contract is not a measured result",
            "paragraphs": [
              "KG1 defines separate graph and benchmark contracts. The graph preserves provenance and access restrictions and recomputes content-derived identities. The benchmark fixes A/B pairs, tasks, controls, attempts and measurement sources. A synthetic corpus validates the contract; it demonstrates neither token savings, latency nor significance. Missing measurements remain null with a reason. KG2 extraction, the KG3 index and queries and the KG4 incremental index, with the same bytes as a full extraction, arrived without changing the contract. KG4 also measured the deterministic part and fixed the paid-run protocol as not-run; the paid run is still pending, and no published number is a measured saving."
            ]
          }
        ]
      },
      "es": {
        "title": "Estándares y mantenimiento de la documentación",
        "description": "Mantenga identidad, comportamiento, pruebas y planificación en su lugar.",
        "sections": [
          {
            "id": "produto",
            "title": "Documente comportamiento verificable",
            "paragraphs": [
              "La jerarquía PLAT → SYS → MOD → FEAT organiza el producto. Cada página identifica finalidad, estado, fuentes y relaciones. Una feature describe precondiciones, flujo, alternativas, postcondiciones, reglas y criterios de aceptación. Los datos, APIs y operaciones necesitan límites explícitos. En Orkastery, el número de una FEAT nueva sale de ork roadmap feat, reservado entre máquinas; nunca del mayor número de su branch."
            ],
            "code": "ork roadmap feat --thread <thread>\nork docs verificar\nork docs sincronizar"
          },
          {
            "id": "planejamento",
            "title": "Separe los planes de la disponibilidad",
            "paragraphs": [
              "El roadmap registra problema, objetivo, alcance, dependencias, decisiones y criterios de validación. Código fusionado, pruebas aprobadas, despliegue y exposición al usuario son hechos distintos. En estos sitios, el roadmap aparece solo como resumen mensual con enlace a su fuente.",
              "El estado del código sigue a git en ambos sentidos: codigo: Mesclado exige el commit del merge en la base, y el merge ship(<thread>) de la thread del elemento exige codigo: Mesclado. ork docs verificar falla ante la divergencia (docs.paridade.merge) y ante el índice que no coincide con el frontmatter (docs.paridade.indice); en el PR, con --pr, ambos solo avisan, porque la divergencia pertenece a main. ork docs sincronizar --escrever, en un PR de documentación tras el merge, corrige ambos.",
              "En Orkastery, ork docs sincronizar actualiza el estado del código desde el ledger y git, y la sección sdlc desde la thread; nunca modifica ciclo, documentación, despliegue, exposición o habilitación. En la worktree de una thread solo toca su elemento; --so elige los elementos y --todos vuelve a cubrirlos todos. Cerrar la thread libera la reserva del elemento o la pasa a otra thread abierta del mismo elemento."
            ]
          },
          {
            "id": "editorial",
            "title": "Revisión editorial y visual",
            "paragraphs": [
              "Use mayúscula inicial en títulos y etiquetas; conserve siglas, comandos y nombres propios. Los diagramas tienen título, descripción y una secuencia legible sin depender del color. Los índices y modelos orientan la edición; los recursos de marca permanecen en la fuente y no representan funcionalidades adicionales.",
              "La instantánea pública registra rutas relativas y hashes. Sincronizar una fuente modificada invalida las revisiones afectadas. Los tres idiomas requieren revisión explícita y el build usa la instantánea versionada sin obtener contenido remoto."
            ]
          },
          {
            "id": "contratos-kg1",
            "title": "Un contrato no es un resultado medido",
            "paragraphs": [
              "KG1 define contratos separados de grafo y benchmark. El grafo conserva procedencia y restricciones de acceso y recalcula las identidades por contenido. El benchmark fija pares A/B, tareas, controles, intentos y fuentes de medida. El corpus sintético valida el contrato; no demuestra ahorro de tokens, latencia ni significancia. Una medida ausente queda null con motivo. La extracción de KG2, el índice con consulta de KG3 y el índice incremental de KG4, con los mismos bytes que la extracción completa, llegaron sin cambiar el contrato. KG4 también midió la parte determinista y fijó el protocolo de la ronda de pago como not-run; la ronda de pago sigue pendiente, y ningún número publicado es un ahorro medido."
            ]
          }
        ]
      }
    }
  },
  {
    "slug": "roadmap",
    "group": "standards",
    "sources": [
      "docs/roadmap/README.md"
    ],
    "translations": {
      "pt": {
        "title": "Direção do produto",
        "description": "Resumo mensal do planejamento e link para a fonte de acompanhamento.",
        "sections": [
          {
            "id": "resumo",
            "title": "Resumo de outubro de 2026",
            "paragraphs": [
              "O planejamento reúne condução, integração com hosts, memória governada e qualidade da documentação. Em outubro, a prioridade do topo é o HITL de condução por alternativas: todo pedido que o ork abre ao dono vira uma escolha entre 3 e 5 opções, uma delas recomendada, sem texto colado. Também estão em desenvolvimento o impedimento que só o dono resolve no terminal, que passa a ser um pedido a ele com o comando exato, e o perfil por despacho, com divisão pela carga entre contas. Consulte o roadmap no repositório para ver o estado de cada iniciativa. Esta página não replica tickets nem transforma uma intenção em promessa de disponibilidade."
            ]
          },
          {
            "id": "acompanhar",
            "title": "Consulte o status atual",
            "paragraphs": [
              "O relatório do CLI agrupa iniciativas, sinaliza o que espera o dono com #HITL e mostra o próximo passo, sem alterar o roadmap. ork network roadmap traz o mesmo relatório com as threads de todas as máquinas e a fonte de cada parte. As fontes atuais incluem o HITL curto e o HITL de condução por alternativas, o impedimento do dono que vira pedido, o perfil por despacho, o pacote de contexto e o dossiê de decisão do Company Brain, o grafo de código, a busca por significado na memória, o projeto-alvo explícito, o roadmap da rede, o pacote de experiência, o plugin nos marketplaces, as correções de condução e os guias de contribuição. Código mesclado ou numa branch não equivale a publicação; confira as dimensões de estado na origem."
            ],
            "code": "ork roadmap status\nork network roadmap"
          }
        ]
      },
      "en": {
        "title": "Product direction",
        "description": "Monthly planning summary and a link to the tracking source.",
        "sections": [
          {
            "id": "resumo",
            "title": "October 2026 summary",
            "paragraphs": [
              "Planning covers conduction, host integration, governed memory and documentation quality. In October, the top priority is conduction HITL by alternatives: every request ork opens to the owner becomes a choice among 3 to 5 options, one of them recommended, with no pasted text. Also in development: a blocker only the owner can clear in the terminal becomes a request to them with the exact command, and a profile per dispatch, with load-based distribution across accounts. Consult the repository roadmap for each initiative’s state. This page neither replicates tickets nor turns intent into a promise of availability."
            ]
          },
          {
            "id": "acompanhar",
            "title": "Read the current status",
            "paragraphs": [
              "The CLI report groups initiatives, marks owner decisions with #HITL and shows the next step without changing the roadmap. ork network roadmap provides the same report with threads from every machine and the source of each part. Current sources cover short HITL requests and conduction HITL by alternatives, owner blockers that become requests, profile per dispatch, the Company Brain context package and decision dossier, the code graph, search by meaning in memory, explicit target projects, the network roadmap, the experience pack, the marketplace plugin, conduction fixes and contribution guides. Merged or branch code does not establish publication; check the state dimensions at the source."
            ],
            "code": "ork roadmap status\nork network roadmap"
          }
        ]
      },
      "es": {
        "title": "Dirección del producto",
        "description": "Resumen mensual de la planificación y enlace a la fuente de seguimiento.",
        "sections": [
          {
            "id": "resumo",
            "title": "Resumen de octubre de 2026",
            "paragraphs": [
              "La planificación reúne conducción, integración con hosts, memoria gobernada y calidad de la documentación. En octubre, la prioridad principal es el HITL de conducción por alternativas: toda petición que ork abre al dueño se convierte en una elección entre 3 y 5 opciones, una de ellas recomendada, sin texto pegado. También están en desarrollo el impedimento que solo el dueño resuelve en la terminal, que pasa a ser una petición con el comando exacto, y el perfil por despacho, con reparto por carga entre cuentas. Consulte el roadmap del repositorio para conocer el estado de cada iniciativa. Esta página no replica tickets ni convierte una intención en promesa de disponibilidad."
            ]
          },
          {
            "id": "acompanhar",
            "title": "Consulte el estado actual",
            "paragraphs": [
              "El informe del CLI agrupa iniciativas, marca con #HITL lo que espera al dueño y muestra el siguiente paso sin modificar el roadmap. ork network roadmap ofrece el mismo informe con las threads de todas las máquinas y la fuente de cada parte. Las fuentes actuales incluyen HITL breve y HITL de conducción por alternativas, el impedimento del dueño convertido en petición, el perfil por despacho, el paquete de contexto y el dosier de decisión del Company Brain, el grafo de código, la búsqueda por significado en la memoria, el proyecto objetivo explícito, el roadmap de la red, el paquete de experiencia, el plugin en los marketplaces, las correcciones de conducción y las guías de contribución. El código fusionado o en una branch no equivale a publicación; consulte las dimensiones de estado en la fuente."
            ],
            "code": "ork roadmap status\nork network roadmap"
          }
        ]
      }
    }
  }
];
