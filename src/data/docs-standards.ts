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
              "A hierarquia PLAT → SYS → MOD → FEAT organiza o produto. Cada página identifica finalidade, estado, origem e vínculos. Uma feature descreve pré-condições, fluxo, alternativas, pós-condições, regras e critérios de aceite. Dados, APIs e operação precisam de limites explícitos. No Orkastery, o número de uma FEAT nova sai de ork roadmap feat, reservado entre máquinas; nunca do maior número da sua branch. Decisões de arquitetura ficam em ADRs numerados, com contexto, critérios, opções comparadas e a decisão; a ADR-001 diz onde mora a rede das máquinas de uma pessoa."
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
              "Os contratos KG1 fixam grafo e benchmark separadamente. O grafo conserva proveniência e restrições de acesso e recalcula identidades pelo conteúdo. O benchmark fixa pares A/B, tarefas, controles, tentativas e fontes de medida. Corpus sintético valida o contrato; não demonstra economia de tokens, latência ou significância. Uma medida ausente fica null com motivo. A extração do KG2, o índice com consulta do KG3 e o índice incremental do KG4, com os mesmos bytes da extração completa, vieram sem mudar o contrato. O KG4 também mediu a parte determinística e fixou o protocolo da rodada paga como not-run; a rodada paga continua pendente, e nenhum número publicado é economia medida. Os analisadores do KG3, o typescript e o micromark, passaram a ser dependências do pacote, com versão exata, sem mudar os rótulos ork.ts-ast e ork.md-structure. Na versão {versao}, a consulta por nó do KG3 passou a trazer o sha256 e o blob do Git de cada fonte citada, que o contrato KG1 já põe em cada evidência, e, em cada aresta, se as fontes dela conferem com a árvore, sem mudar o contrato."
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
              "The PLAT → SYS → MOD → FEAT hierarchy organizes the product. Each page identifies purpose, state, sources and relationships. A feature describes preconditions, flow, alternatives, postconditions, rules and acceptance criteria. Data, APIs and operations need explicit limits. In Orkastery, a new FEAT number comes from ork roadmap feat, reserved across machines; never from the highest number on your branch. Architecture decisions live in numbered ADRs, with context, criteria, compared options and the decision; ADR-001 records where the network of a person’s machines lives."
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
              "KG1 defines separate graph and benchmark contracts. The graph preserves provenance and access restrictions and recomputes content-derived identities. The benchmark fixes A/B pairs, tasks, controls, attempts and measurement sources. A synthetic corpus validates the contract; it demonstrates neither token savings, latency nor significance. Missing measurements remain null with a reason. KG2 extraction, the KG3 index and queries and the KG4 incremental index, with the same bytes as a full extraction, arrived without changing the contract. KG4 also measured the deterministic part and fixed the paid-run protocol as not-run; the paid run is still pending, and no published number is a measured saving. The KG3 analyzers, typescript and micromark, became package dependencies with exact versions, without changing the ork.ts-ast and ork.md-structure labels. In version {versao}, KG3 node queries also return the sha256 and Git blob of each cited source, which the KG1 contract already puts in every piece of evidence, and, for each edge, whether its sources match the tree, without changing the contract."
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
      "docs/roadmap/README.md",
      "docs/roadmap/RM-026-workspace-empresarial.md",
      "docs/roadmap/RM-031-grafo-de-codigo.md",
      "docs/roadmap/RM-037-verify-rapido-e-confiavel.md",
      "docs/roadmap/RM-038-busca-semantica-na-memoria.md",
      "docs/roadmap/RM-047-fabrica-em-varias-maquinas.md",
      "docs/roadmap/RM-052-projeto-alvo-explicito.md",
      "docs/roadmap/RM-055-impedimento-do-dono-vira-hitl.md",
      "docs/roadmap/RM-056-perfil-por-thread-e-carga.md",
      "docs/roadmap/RM-057-hitl-por-alternativas.md",
      "docs/roadmap/RM-058-modo-noctum.md",
      "docs/roadmap/RM-059-conducao-dentro-do-claude-code.md",
      "docs/roadmap/RM-060-site-como-produto.md",
      "docs/roadmap/RM-061-cli-em-ingles-e-pt-br.md",
      "docs/roadmap/RM-062-repositorio-publico-sem-dado-privado.md"
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
              "O planejamento reúne condução, integração com hosts, memória governada e qualidade da documentação. A prioridade do topo continua sendo o HITL de condução por alternativas: todo pedido que o ork abre ao dono vira uma escolha entre 3 e 5 opções, uma delas recomendada, sem texto colado. Também seguem em desenvolvimento o impedimento que só o dono resolve no terminal, que vira um pedido a ele com o comando exato, e o perfil por despacho, com divisão pela carga entre contas. Esta página não replica tickets nem transforma uma intenção em promessa de disponibilidade.",
              "Desde a revisão anterior, cinco itens novos entraram no roadmap, e outros avançaram sem mudar de estágio:"
            ],
            "items": [
              "Modo #Noctum, arcos autônomos de 6 a 12 horas com muitas threads e máquinas: em desenvolvimento, com o modo ainda desligado. A primeira das seis fatias, a N1, está implementada, com testes: o envelope de autorização do dono (janela, destinos, tetos e exclusões) e o estado do arco; #Noctum ainda não é aceito como modo, nenhum comando abre arco, e a próxima fatia é a N2, a fila local e a capacidade. O dono já tomou as quatro decisões de produto; a posição 5 na prioridade é uma proposta, e o primeiro piloto espera a autorização dele e os valores que só ele define: o teto, o horário e o canal do relatório da manhã.",
              "Condução dentro do Claude Code, com dez mods em quatro ondas: em desenvolvimento; a fundação, a onda 1 (Torre de Controle, Clima de Cota, Freio de Lote e Radar de Colisão) e a Mesa do Dono, da onda 2, estão na versão {versao}. A Sentinela do Condutor, que completa a onda 2, já está na main do núcleo, ainda fora de uma versão publicada, e os mods da onda 3 seguem como plano.",
              "Site como produto, os dois sites públicos com o rigor do núcleo: em desenvolvimento, e nada é publicado sem a aprovação do dono.",
              "CLI em inglês e pt-BR: em desenvolvimento. Na versão {versao}, o caminho da primeira experiência (de ork doctor e ork init a ork thread new e ork phase run), ork verify, ork ship, ork pulse, ork master, ork retry plan, ork retry run, ork roadmap status e a ajuda falam inglês quando owner.language ou o locale pedem en. A cobertura medida é de 23,0% dos textos de saída do CLI; o restante segue em português.",
              "Repositório público sem dado privado: em desenvolvimento. O nome do arquivo de evidência da RM-040, que levava o nome de uma máquina, já foi trocado por um nome genérico, e a correção está mesclada. A barreira automática no CI, no ork verify e no ork ci prepare ainda é plano, e a próxima fatia é a barreira no CI.",
              "Busca por significado na memória: o dono escolheu os pares da prova, que passou em todas as execuções medidas; o item segue em validação.",
              "Grafo de código: o consumo pelas fases ganhou citações, segundo salto e proveniência conferida contra a árvore, com a flag grafo.mcp ainda desligada.",
              "Verify rápido e confiável: avançou no registro de instabilidade e no ork verify que leva em conta o steal da CPU.",
              "Impedimento que só o dono resolve: reconhece as frases atuais dos runtimes e chega ao dono no resumo, com o comando.",
              "Projeto-alvo explícito: a segunda fatia da resposta honesta foi entregue por PR, e o item espera o piloto do dono.",
              "Fábrica em várias máquinas: ganhou a auditoria da fronteira de confiança do repositório clonado.",
              "Company Brain: o conhecimento escrito espera a escolha do dono entre quatro alternativas, e nenhum código entra antes dela."
            ]
          },
          {
            "id": "acompanhar",
            "title": "Consulte o status atual",
            "paragraphs": [
              "O relatório do CLI agrupa iniciativas, sinaliza o que espera o dono com #HITL e mostra o próximo passo, sem alterar o roadmap. ork network roadmap traz o mesmo relatório com as threads de todas as máquinas e a fonte de cada parte. As fontes atuais incluem o HITL curto e o HITL de condução por alternativas, o impedimento do dono que vira pedido, o perfil por despacho, o pacote de contexto e o dossiê de decisão do Company Brain, o grafo de código, a busca por significado na memória, o projeto-alvo explícito, o roadmap da rede, a Orkastery Network das máquinas de uma pessoa, o pacote de experiência, o plugin nos marketplaces, as correções de condução, os guias de contribuição e, desde outubro, o modo #Noctum, a condução dentro do Claude Code, o site como produto e o CLI em inglês e pt-BR. Consulte o roadmap no repositório para ver o estado de cada iniciativa: código mesclado ou numa branch não equivale a publicação, então confira as dimensões de estado na origem."
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
              "Planning covers conduction, host integration, governed memory and documentation quality. The top priority is still conduction HITL by alternatives: every request ork opens to the owner becomes a choice among 3 to 5 options, one of them recommended, with no pasted text. Also still in development: a blocker only the owner can clear in the terminal becomes a request to them with the exact command, and a profile per dispatch, with load-based distribution across accounts. This page neither replicates tickets nor turns intent into a promise of availability.",
              "Since the previous review, five new items entered the roadmap, and others moved forward without changing stage:"
            ],
            "items": [
              "#Noctum mode, autonomous arcs of 6 to 12 hours across many threads and machines: in development, with the mode still off. The first of six slices, N1, is implemented, with tests: the owner’s authorization envelope (window, destinations, caps and exclusions) and the arc state; #Noctum is not yet accepted as a mode, no command opens an arc, and the next slice is N2, the local queue and capacity. The owner has made the four product decisions; position 5 in the priority list is a proposal, and the first pilot awaits the owner’s authorization and the values only the owner sets: the cap, and the time and channel of the morning report.",
              "Conduction inside Claude Code, with ten mods in four waves: in development; the foundation, wave 1 (the Control Tower, the Quota Weather, the Batch Brake and the Collision Radar) and the Owner’s Desk, from wave 2, are in version {versao}. The Conductor’s Sentinel, which completes wave 2, is already on the core’s main branch, not yet in a published version, and the wave 3 mods remain planned.",
              "Site as a product, the two public sites held to the core’s rigor: in development, and nothing is published without the owner’s approval.",
              "CLI in English and pt-BR: in development. In version {versao}, the first-run path (from ork doctor and ork init to ork thread new and ork phase run), ork verify, ork ship, ork pulse, ork master, ork retry plan, ork retry run, ork roadmap status and the help print English when owner.language or the locale asks for en. The measured coverage is 23.0% of the CLI’s output texts; the rest still prints Portuguese.",
              "Public repository without private data: in development. The RM-040 evidence file, whose name carried a machine name, has already been renamed to a generic one, and the fix is merged. The automatic barrier in CI, in ork verify and in ork ci prepare is still a plan, and the next slice is the CI barrier.",
              "Search by meaning in memory: the owner chose the proof pairs, and the proof passed in every measured run; the item is still in validation.",
              "Code graph: phase consumption gained citations, a second hop and provenance checked against the tree, with the grafo.mcp flag still off.",
              "Fast and reliable verify: progress on the instability registry and on making ork verify aware of CPU steal.",
              "Blocker only the owner can clear: it recognizes the runtimes’ current messages and reaches the owner in the summary, with the command.",
              "Explicit target project: the second slice of the honest answer was delivered by PR, and the item awaits the owner’s pilot.",
              "Factory on several machines: it gained an audit of the trust boundary of the cloned repository.",
              "Company Brain: written knowledge awaits the owner’s choice among four alternatives, and no code goes in before it."
            ]
          },
          {
            "id": "acompanhar",
            "title": "Read the current status",
            "paragraphs": [
              "The CLI report groups initiatives, marks owner decisions with #HITL and shows the next step without changing the roadmap. ork network roadmap provides the same report with threads from every machine and the source of each part. Current sources cover short HITL requests and conduction HITL by alternatives, owner blockers that become requests, profile per dispatch, the Company Brain context package and decision dossier, the code graph, search by meaning in memory, explicit target projects, the network roadmap, the Orkastery Network of a person’s machines, the experience pack, the marketplace plugin, conduction fixes, contribution guides and, since October, #Noctum mode, conduction inside Claude Code, the site as a product and the CLI in English and pt-BR. Consult the repository roadmap for each initiative’s state: merged or branch code does not establish publication, so check the state dimensions at the source."
            ],
            "code": "ork roadmap status\nork network roadmap"
          }
        ]
      }
    }
  }
];
