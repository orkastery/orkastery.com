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
      "docs/produto/_modelo-feature.md"
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
              "A hierarquia PLAT → SYS → MOD → FEAT organiza o produto. Cada página identifica finalidade, estado, origem e vínculos. Uma feature descreve pré-condições, fluxo, alternativas, pós-condições, regras e critérios de aceite. Dados, APIs e operação precisam de limites explícitos."
            ],
            "code": "ork docs verificar\nork docs sincronizar"
          },
          {
            "id": "planejamento",
            "title": "Separe plano de disponibilidade",
            "paragraphs": [
              "O roadmap registra problema, objetivo, escopo, dependências, decisões e critérios de validação. Código mesclado, testes aprovados, deploy e exposição ao usuário são fatos diferentes. Nos sites, o roadmap aparece somente como resumo mensal com link para a fonte."
            ]
          },
          {
            "id": "editorial",
            "title": "Revisão editorial e visual",
            "paragraphs": [
              "Use caixa de frase nos títulos e rótulos; preserve siglas, comandos e nomes próprios. Diagramas têm título, descrição e sequência legível sem depender da cor. Os índices e modelos orientam a edição; os ativos de marca permanecem na origem e não representam funcionalidades adicionais.",
              "O snapshot público registra caminhos relativos e hashes. Sincronizar uma fonte alterada invalida as revisões afetadas. A revisão das três línguas é explícita e o build funciona com o snapshot versionado, sem buscar conteúdo remoto."
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
              "The PLAT → SYS → MOD → FEAT hierarchy organizes the product. Each page identifies purpose, state, sources and relationships. A feature describes preconditions, flow, alternatives, postconditions, rules and acceptance criteria. Data, APIs and operations need explicit limits."
            ],
            "code": "ork docs verificar\nork docs sincronizar"
          },
          {
            "id": "planejamento",
            "title": "Separate plans from availability",
            "paragraphs": [
              "The roadmap records the problem, goal, scope, dependencies, decisions and validation criteria. Merged code, passing tests, deployment and user exposure are different facts. On these sites, the roadmap appears only as a monthly summary linked to its source."
            ]
          },
          {
            "id": "editorial",
            "title": "Editorial and visual review",
            "paragraphs": [
              "Use sentence case for headings and labels; preserve acronyms, commands and proper names. Diagrams have titles, descriptions and a sequence readable without relying on color. Indexes and templates guide editing; brand assets remain at the source and do not represent additional features.",
              "The public snapshot records relative paths and hashes. Synchronizing a changed source invalidates affected reviews. All three languages require explicit review, and builds use the versioned snapshot without fetching remote content."
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
              "La jerarquía PLAT → SYS → MOD → FEAT organiza el producto. Cada página identifica finalidad, estado, fuentes y relaciones. Una feature describe precondiciones, flujo, alternativas, postcondiciones, reglas y criterios de aceptación. Los datos, APIs y operaciones necesitan límites explícitos."
            ],
            "code": "ork docs verificar\nork docs sincronizar"
          },
          {
            "id": "planejamento",
            "title": "Separe los planes de la disponibilidad",
            "paragraphs": [
              "El roadmap registra problema, objetivo, alcance, dependencias, decisiones y criterios de validación. Código fusionado, pruebas aprobadas, despliegue y exposición al usuario son hechos distintos. En estos sitios, el roadmap aparece solo como resumen mensual con enlace a su fuente."
            ]
          },
          {
            "id": "editorial",
            "title": "Revisión editorial y visual",
            "paragraphs": [
              "Use mayúscula inicial en títulos y etiquetas; conserve siglas, comandos y nombres propios. Los diagramas tienen título, descripción y una secuencia legible sin depender del color. Los índices y modelos orientan la edición; los recursos de marca permanecen en la fuente y no representan funcionalidades adicionales.",
              "La instantánea pública registra rutas relativas y hashes. Sincronizar una fuente modificada invalida las revisiones afectadas. Los tres idiomas requieren revisión explícita y el build usa la instantánea versionada sin obtener contenido remoto."
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
            "title": "Resumo de setembro de 2026",
            "paragraphs": [
              "O planejamento reúne evolução da condução, integração com hosts, memória governada e qualidade da documentação. Consulte o roadmap no repositório para ver o estado de cada iniciativa. Esta página não replica tickets nem transforma uma intenção em promessa de disponibilidade."
            ]
          }
        ]
      },
      "en": {
        "title": "Product direction",
        "description": "Monthly planning summary and a link to the tracking source.",
        "sections": [
          {
            "id": "resumo",
            "title": "September 2026 summary",
            "paragraphs": [
              "Planning covers conduction, host integration, governed memory and documentation quality. Consult the repository roadmap for each initiative’s state. This page neither replicates tickets nor turns intent into a promise of availability."
            ]
          }
        ]
      },
      "es": {
        "title": "Dirección del producto",
        "description": "Resumen mensual de la planificación y enlace a la fuente de seguimiento.",
        "sections": [
          {
            "id": "resumo",
            "title": "Resumen de septiembre de 2026",
            "paragraphs": [
              "La planificación reúne conducción, integración con hosts, memoria gobernada y calidad de la documentación. Consulte el roadmap del repositorio para conocer el estado de cada iniciativa. Esta página no replica tickets ni convierte una intención en promesa de disponibilidad."
            ]
          }
        ]
      }
    }
  }
];
