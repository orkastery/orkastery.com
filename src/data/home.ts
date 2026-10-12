// Texto da home, nas três línguas. O PT é o do design do dono (Claude Design), palavra por palavra;
// EN e ES são traduções no mesmo tom (D11). As exceções ao texto do design são de fato: os números e a
// lacuna da seção Prova e dois códigos de fase seguem a main do núcleo (D13, README "Verificado nesta
// árvore"). Comandos e identificadores ficam iguais nas três línguas. {versao} vem de release.mjs.
// O que o navegador recalcula (board, topologia, noite, modos, fases e alternativas) usa os mesmos
// campos, por src/lib/home-state.mjs.

const pt = {
 title: 'Orkastery · Conduza 20 roadmaps com a calma de quem conduz um.',
 description: 'A Orkastery rege seus agentes de código em threads paralelas, prova cada entrega contra o repositório e só chama você quando a decisão é realmente sua.',
 hero: {
  badge: ['AI Software Factory', '@orkastery/cli {versao}', 'MIT'],
  title: 'Conduza 20 roadmaps',
  titleMuted: 'com a calma de quem conduz um.',
  lead: 'A Orkastery é a plataforma que rege seus agentes de código em threads paralelas, prova cada entrega contra o repositório e só chama você quando a decisão é realmente sua.',
  talk: 'Falar com a gente',
  note: 'Sem servidor e sem LLM embutido. Roda nas suas assinaturas de Claude Code e Codex.',
  scoreHead: 'agora · {n} roadmaps · 3 máquinas · 2 runtimes',
  live: {run: 'executando', wait: 'esperando você', ok: 'já verificados'},
  canvasLabel: 'Partitura animada: 20 roadmaps atravessam as seis fases, de GOAL a MASTER. Os pontos em latão esperam você; os verdes já foram verificados.',
  waitTag: 'espera você',
  names: ['checkout-v2', 'billing-api', 'onboarding', 'docs-modos', 'search-index', 'auth-keys', 'pricing', 'mobile-push', 'analytics', 'crm-sync', 'infra-tf', 'design-tokens', 'api-gateway', 'notificações', 'relatórios', 'i18n-en', 'marketplace', 'suporte-bot', 'pagamentos-pix', 'status-page']
 },
 runtimes: {label: 'Conduza de onde você já trabalha', list: ['Claude Code', 'Codex', 'Hermes', 'OpenClaw']},
 parallel: {
  eyebrow: '01 · Paralelismo',
  title: 'Uma camada rege todos os seus runtimes, em todas as suas máquinas.',
  lead: 'Você conduz de uma conversa só. O ork reserva os itens do roadmap, distribui as threads entre máquinas, runtimes e contas, isola cada uma na própria worktree e devolve tudo por um merge serializado.',
  you: 'Você, de uma conversa',
  youSub: '#TAG no pedido · resumo de hora em hora · lote a–d',
  layer: 'camada de orquestração',
  layerSub: 'determinístico · sem servidor · sem LLM',
  fns: ['reserva o roadmap', 'distribui threads', 'isola em worktrees', 'rotaciona contas', 'verifica claims', 'serializa o merge'],
  profile: 'perfil {p}',
  active: 'ativo',
  rotated: 'cota esgotada · rotacionou',
  rotatedProfile: 'time ← pessoal',
  foot: '{n} threads · {n} worktrees · leases ok',
  machines: [
   {name: 'mac-studio', env: 'local · macOS', runtimes: [{rt: 'claude-bg', prof: 'pessoal', threads: ['checkout-v2', 'onboarding', 'pricing']}, {rt: 'codex', prof: 'time', threads: ['design-tokens']}]},
   {name: 'vps-01', env: 'cloud · Ubuntu', runtimes: [{rt: 'claude-bg', prof: 'time', threads: ['search-index', 'analytics']}, {rt: 'codex', prof: 'pessoal', threads: ['billing-api', 'crm-sync']}]},
   {name: 'vps-02', env: 'cloud · Ubuntu', runtimes: [{rt: 'claude-bg', prof: 'estúdio', threads: ['docs-modos', 'i18n-en', 'status-page']}, {rt: 'codex', prof: 'time', threads: ['auth-keys']}]}
  ],
  mergeLabel: 'merge serializado, um por vez',
  ships: ['billing-api', 'pricing', 'docs-modos', 'checkout-v2', 'i18n-en', 'crm-sync'],
  roadmapTitle: 'Um roadmap, várias máquinas, nenhum item em dobro.',
  roadmapSub: 'cada máquina reserva o item antes de começar',
  free: 'livre',
  scale: [
   {t: 'Uma worktree por thread', d: 'Cada thread escreve só na própria worktree. Escrever fora é bloqueado por lease, com fila.', c: 'ork thread new'},
   {t: 'Merge serializado', d: 'Um merge por vez. O push só conta quando o remoto confirma o SHA.', c: 'ork ship'},
   {t: 'Contas que se revezam', d: 'Cota esgotada ou login perdido: o mesmo prompt segue no próximo perfil. Só assinatura; chave paga no ambiente é cost.violation.', c: 'ork accounts add'},
   {t: 'Várias máquinas, um roadmap', d: 'Antes de começar, cada máquina reserva o item do roadmap. Duas nunca pegam o mesmo.', c: 'ork roadmap pegar'}
  ]
 },
 problem: {
  eyebrow: '02 · O problema',
  title: 'Agentes ficaram bons. Conduzir agentes, não.',
  quote: 'Aponte três agentes para o mesmo repositório',
  quoteMuted: 'e você recebe três agentes se atropelando, e um relatório dizendo que deu tudo certo.',
  pains: [
   {n: '20', t: 'abas de terminal abertas, sete produtos pela metade e nenhum lançado.'},
   {n: '02h', t: 'a conta do runtime acaba e o roadmap para até você acordar.'},
   {n: '∞', t: 'vezes por dia você vira o relatório de status dos seus próprios agentes.'}
  ],
  without: 'Sem ork',
  with: 'Com ork',
  compare: [
   {sem: 'O agente diz que os testes passam', com: 'ork verify reexecuta o comando no HEAD real, e o CI reexecuta de novo num runner limpo'},
   {sem: 'Você pede status várias vezes por dia', com: 'Um resumo de hora em hora diz o que está pendente, urgente, bloqueando ou crítico'},
   {sem: 'Toda decisão óbvia vira pergunta', com: 'A óbvia chega decidida e registrada; você muda se quiser'},
   {sem: 'A conta acaba e o roadmap para', com: 'O mesmo prompt continua no próximo perfil ou no runtime de fallback'},
   {sem: 'Duas sessões pisam no mesmo arquivo', com: 'Uma worktree por thread, e leases com fila'},
   {sem: 'A documentação mente sobre o código', com: 'ork docs verificar reprova o PR quando uma página diverge'}
  ]
 },
 audience: {
  eyebrow: '03 · Para quem',
  builders: {label: 'Builders, vibecoders, fundadores', title: 'Muitos produtos, uma pessoa, nenhum burnout.', text: 'Rode roadmaps em paralelo nas suas próprias assinaturas. Pare de alternar entre vinte terminais e de virar o relatório de status dos seus agentes.'},
  teams: {label: 'CTOs, startups, empresas', title: 'Governança que não depende de confiar no agente.', text: 'CHECK independente no SHA exato, push comprovado, decisões registradas com o porquê e o custo de mudar. Memória governada com OrkMind quando o time precisar.', cta: 'Falar com a gente'}
 },
 modes: {
  eyebrow: '04 · Modos',
  title: 'Quanta autonomia você dá à fábrica? Escreva uma #TAG.',
  lead: 'A fábrica foi feita para trabalhar com muita autonomia. A #TAG no pedido define em quais pontos ela chama você para decidir ou aprovar, os pontos de HITL (human-in-the-loop). Fora deles, ela segue sozinha. A verificação da entrega é a mesma nos quatro modos.',
  hitlTitle: 'ponto de HITL: você decide ou aprova',
  legendHitl: 'ponto de HITL: a fábrica espera sua decisão ou aprovação',
  legendBlock: 'bloco que a fábrica executa sozinha',
  whenLabel: '{tag} · para quando',
  hitlLabel: 'nos pontos de HITL, você decide ou aprova',
  closing: 'O modo ajusta a autonomia.',
  closingPatina: 'A verificação é sempre a mesma.',
  list: [
   {tag: '#Classic', pausas: 3, ciclo: [['GOAL', 1, 1, true], ['PLAN', 2, 1, true], ['GO · CHECK', 3, 2, true], ['SHIP · MASTER', 5, 2, false]], uso: 'O padrão do ork init: premissas delicadas com entrega confiável.', sobre: 'Objetivo, plano e evidências, com autorização antecipada de push.'},
   {tag: '#Maestro', pausas: 1, ciclo: [['GOAL · PLAN', 1, 2, true], ['GO · CHECK · SHIP', 3, 3, false], ['MASTER', 6, 1, false]], uso: 'Solução clara e ágil, sem tradeoff pesado: um ponto de HITL para alinhar as premissas.', sobre: 'Premissas.'},
   {tag: '#Auto', pausas: 0, ciclo: [['GOAL · PLAN · GO · CHECK · SHIP · MASTER', 1, 6, false]], uso: 'Docs, estudos, pesquisas, configurações, auditorias, migrações.', sobre: 'Nada. A entrega chega verificada.'},
   {tag: '#Fast', pausas: 0, ciclo: [['GO · fase única, prova mínima', 1, 6, false]], uso: 'Pedido pequeno e claro, de minutos: uma fase só, sem cerimônia.', sobre: 'Nada. O push para a base continua pedindo autorização.'}
  ]
 },
 attention: {
  eyebrow: '05 · Sua atenção',
  title: 'As decisões simples, a Orkastery toma por você.',
  titleMuted: 'Você decide só o que importa.',
  lead: 'Toda pergunta do ork chega curta e organizada, com alternativas e uma recomendação, para você decidir em segundos. Essa leveza é objetivo de projeto e pensa também em quem tem TDAH.',
  boardMeta: '7 threads · atualiza sozinho',
  boardHead: ['Thread', 'Onde roda', 'Fase', 'Estado'],
  threads: [
   {name: 'checkout-v2 · migrar sessões', repo: 'loja/web', where: 'mac-studio · claude-bg', p: 3, o: 0},
   {name: 'billing-api · faturas em lote', repo: 'fin/billing', where: 'vps-01 · codex', p: 4, o: 1},
   {name: 'onboarding · fluxo de convite', repo: 'app/mobile', where: 'mac-studio · claude-bg', p: 1, o: 2, wait: true},
   {name: 'docs · guia de modos', repo: 'orkastery/docs', where: 'vps-02 · claude-bg', p: 5, o: 2},
   {name: 'search · índice incremental', repo: 'core/search', where: 'vps-01 · claude-bg', p: 2, o: 0, fix: true},
   {name: 'auth · rotação de chaves', repo: 'infra/auth', where: 'vps-02 · codex', p: 0, o: 1},
   {name: 'pricing · página nova', repo: 'site/www', where: 'mac-studio · codex', p: 2, o: 2}
  ],
  states: {run: 'executando', wait: 'espera você', ok: 'entregue', fix: 'GO-FIX'},
  pulseWhen: 'resumo das 09:00 · BRT',
  pulse: [{n: '3', l: 'pendentes'}, {n: '1', l: 'urgente'}, {n: '1', l: 'bloqueia thread'}, {n: '0', l: 'críticos'}],
  pulseAsk: 'Posso enviar as 3 perguntas agora?',
  pulseYes: 'Sim, agora',
  pulseLater: 'Às 11:00',
  questionMeta: 'pergunta 1 de 3 · onboarding · PLAN',
  questionKeys: 'a–d',
  question: 'Como migrar as sessões ativas para o novo fluxo de convite?',
  options: [
   {k: 'a', t: 'Migrar em lote às 03:00, com rollback pronto', rec: true},
   {k: 'b', t: 'Migrar sob demanda, no próximo login'},
   {k: 'c', t: 'Manter as duas versões por 7 dias'},
   {k: 'd', t: 'Adiar a migração para a próxima sprint'}
  ],
  recommended: 'recomendada',
  noteBefore: 'Depois das objetivas, até 2 abertas, uma por vez. Prazo vencido espera ou escala, nunca aprova.',
  noteAfter: 'Resposta {k} registrada. Só vale com a prova HMAC do canal autenticado; o agente nunca responde por você.',
  layers: [
   {n: '01', t: 'Resumo de hora em hora', d: 'Quantos itens estão pendentes, urgentes, bloqueando uma thread ou críticos, e se pode mandar agora.'},
   {n: '02', t: 'Perguntas em lote', d: 'Até 5 objetivas por vez, com alternativas a–d e uma recomendada. Depois, até 2 abertas.'},
   {n: '03', t: 'A óbvia já vem decidida', d: 'Registrada com o porquê, como mudar e o custo de mudar agora ou depois. Você é informado.'},
   {n: '04', t: 'Prazo nunca aprova', d: 'Um prazo vencido espera ou escala. Uma resposta só conta com a prova do canal autenticado.'}
  ]
 },
 night: {
  eyebrow: '06 · Enquanto você dorme',
  title: 'A fábrica não para quando você dorme.',
  lead: 'Você fecha o laptop às 23h. Isto é o que o ledger registra até o café. Nada aqui pediu a sua presença.',
  note: 'role a página · exemplo de uma noite no seu fuso',
  events: [
   {t: '23:04', tag: 'GO', c: 'noite-info', text: 'Seis threads abertas em três máquinas, cada uma na sua worktree. Nenhuma toca o arquivo da outra.'},
   {t: '00:37', tag: 'CHECK ✕', c: 'noite-alerta', text: 'checkout-v2 reprovou em dois testes contra a baseline. Volta como GO-FIX com spec tipada, sem acordar você.'},
   {t: '01:52', tag: 'rotação', c: 'sobre-noite-2', text: 'A cota do perfil claude-bg/pessoal acabou. O mesmo prompt segue no perfil claude-bg/time.'},
   {t: '03:18', tag: 'SHIP ✓', c: 'noite-ok', text: 'billing-api em merge serializado. O push só contou quando git ls-remote bateu com o SHA local.'},
   {t: '05:40', tag: 'decisão', c: 'acento', text: 'Uma decisão óbvia tomada e registrada: o porquê, como mudar e quanto custa mudar agora ou depois.'}
  ],
  morningLabel: '07:00 · resumo da noite',
  morning: 'Bom dia. 11 entregas verificadas, 2 perguntas esperando você, nenhuma crítica.'
 },
 cycle: {
  eyebrow: '07 · Como funciona',
  title: 'Seis fases que nenhum agente pula.',
  lead: 'Cada fase tem um contrato. O resultado não depende de acreditar no relatório do agente. Toque em uma fase.',
  givesLabel: '{phase} entrega',
  needsLabel: 'O ork exige para passar',
  phases: [
   {gives: 'Objetivo, critério de pronto e claims com comando.', needs: 'Uma claim sem comando é recusada.', code: 'claims.unverifiable'},
   {gives: 'Tarefas, decisões e um verify executável por tarefa.', needs: 'Sem o plano gravado, a fase não fecha.', code: 'artifact.missing'},
   {gives: 'Um commit atômico por tarefa, na worktree da thread.', needs: 'Escrever fora da worktree é bloqueado por lease.', code: 'lease.busy'},
   {gives: 'Verificação contra a baseline, mais CI independente.', needs: 'Claim reprovada vira falha tipada, nunca relatório otimista.', code: 'claims.failed · verify.regression'},
   {gives: 'Merge serializado com push comprovado.', needs: 'Só conta quando git ls-remote bate com o SHA local.', code: 'git ls-remote'},
   {gives: 'Postmortem tipado e índice de condução.', needs: 'O índice vem do ledger. Ninguém digita.', code: 'ledger'}
  ],
  failChip: 'CHECK ✕',
  failNote: 'Reprovou? A thread volta como GO-FIX com uma spec tipada. Ninguém precisa acordar você para isso.'
 },
 proof: {
  eyebrow: '08 · Prova',
  title: 'Cada número tem o comando que o prova.',
  lead: 'Comandos reproduzíveis conferem o trabalho na árvore real. A baseline separa regressão de dívida anterior.',
  proofs: [
   {n: '2.733', l: 'testes do núcleo, zero falhas no CI', c: 'npm --prefix core run test:ci'},
   {n: '24', l: 'canários de comportamento, todos verdes', c: 'ork eval --so-canarios'},
   {n: '199', l: 'asserções em 20 skills e 101 casos', c: 'ork eval --so-skills'},
   {n: '0', l: 'erros de paridade entre docs e código', c: 'ork docs verificar'}
  ],
  demoMeta: '30 s · sem conta · sem modelo',
  demo: [
   {k: '$', kc: 'acento', v: 'ork demo', vc: 'sobre-noite', code: true},
   {k: 'claim', kc: 'sobre-noite-4', v: 'soma() trata números negativos', vc: 'sobre-noite-2'},
   {k: 'verify', kc: 'sobre-noite-4', v: 'npm test -- soma.spec.ts', vc: 'sobre-noite-2', code: true},
   {k: '✕ falhou', kc: 'noite-alerta', v: 'claims.failed · 2 de 5 casos no HEAD a41f9c2', vc: 'noite-alerta'},
   {k: '→', kc: 'sobre-noite-4', v: 'GO-FIX com spec tipada', vc: 'sobre-noite-2'},
   {k: 'verify', kc: 'sobre-noite-4', v: 'npm test -- soma.spec.ts', vc: 'sobre-noite-2', code: true},
   {k: '✓ aceita', kc: 'noite-ok', v: '5 de 5 casos no HEAD 7d02e1b', vc: 'noite-ok'},
   {k: '', kc: 'sobre-noite-4', v: 'o relatório do agente não contou. O comando contou.', vc: 'sobre-noite-4'}
  ],
  gapsTitle: 'Lacuna publicada como lacuna.',
  gaps: [
   {s: 'não existe', c: 'alerta-texto', t: 'Verify local estável em VM com CPU roubada pelo hipervisor. Nessa máquina, a prova confiável é o CI.'},
   {s: 'planejado', c: 'info-texto', t: 'Estado de conta compartilhado entre projetos, no roadmap como RM-040.'}
  ]
 },
 cta: {
  title: 'Comece a conduzir hoje.',
  text: 'Instale em um minuto. Rode ork demo e veja uma claim falsa ser rejeitada em 30 segundos.',
  talk: 'Falar com a gente'
 }
};

type Home = typeof pt;

const en: Home = {
 title: 'Orkastery · Conduct 20 roadmaps with the calm of conducting one.',
 description: 'Orkastery conducts your coding agents in parallel threads, proves every delivery against the repository and only calls you when the decision is truly yours.',
 hero: {
  badge: ['AI Software Factory', '@orkastery/cli {versao}', 'MIT'],
  title: 'Conduct 20 roadmaps',
  titleMuted: 'with the calm of conducting one.',
  lead: 'Orkastery is the platform that conducts your coding agents in parallel threads, proves every delivery against the repository and only calls you when the decision is truly yours.',
  talk: 'Talk to us',
  note: 'No server and no built-in LLM. It runs on your Claude Code and Codex subscriptions.',
  scoreHead: 'now · {n} roadmaps · 3 machines · 2 runtimes',
  live: {run: 'running', wait: 'waiting on you', ok: 'already verified'},
  canvasLabel: 'Animated score: 20 roadmaps move through the six phases, from GOAL to MASTER. The brass dots are waiting on you; the green ones are already verified.',
  waitTag: 'waiting on you',
  names: ['checkout-v2', 'billing-api', 'onboarding', 'docs-modes', 'search-index', 'auth-keys', 'pricing', 'mobile-push', 'analytics', 'crm-sync', 'infra-tf', 'design-tokens', 'api-gateway', 'notifications', 'reports', 'i18n-en', 'marketplace', 'support-bot', 'payments-pix', 'status-page']
 },
 runtimes: {label: 'Conduct from where you already work', list: ['Claude Code', 'Codex', 'Hermes', 'OpenClaw']},
 parallel: {
  eyebrow: '01 · Parallelism',
  title: 'One layer conducts all your runtimes, on all your machines.',
  lead: 'You conduct from a single conversation. The ork reserves the roadmap items, spreads the threads across machines, runtimes and accounts, isolates each one in its own worktree and brings everything back through a serialized merge.',
  you: 'You, from one conversation',
  youSub: '#TAG in the request · hourly summary · batch a–d',
  layer: 'orchestration layer',
  layerSub: 'deterministic · no server · no LLM',
  fns: ['reserves the roadmap', 'spreads threads', 'isolates in worktrees', 'rotates accounts', 'verifies claims', 'serializes the merge'],
  profile: 'profile {p}',
  active: 'active',
  rotated: 'quota exhausted · rotated',
  rotatedProfile: 'team ← personal',
  foot: '{n} threads · {n} worktrees · leases ok',
  machines: [
   {name: 'mac-studio', env: 'local · macOS', runtimes: [{rt: 'claude-bg', prof: 'personal', threads: ['checkout-v2', 'onboarding', 'pricing']}, {rt: 'codex', prof: 'team', threads: ['design-tokens']}]},
   {name: 'vps-01', env: 'cloud · Ubuntu', runtimes: [{rt: 'claude-bg', prof: 'team', threads: ['search-index', 'analytics']}, {rt: 'codex', prof: 'personal', threads: ['billing-api', 'crm-sync']}]},
   {name: 'vps-02', env: 'cloud · Ubuntu', runtimes: [{rt: 'claude-bg', prof: 'studio', threads: ['docs-modes', 'i18n-en', 'status-page']}, {rt: 'codex', prof: 'team', threads: ['auth-keys']}]}
  ],
  mergeLabel: 'serialized merge, one at a time',
  ships: ['billing-api', 'pricing', 'docs-modes', 'checkout-v2', 'i18n-en', 'crm-sync'],
  roadmapTitle: 'One roadmap, several machines, no item done twice.',
  roadmapSub: 'each machine reserves the item before it starts',
  free: 'free',
  scale: [
   {t: 'One worktree per thread', d: 'Each thread writes only to its own worktree. Writing anywhere else is blocked by a lease, with a queue.', c: 'ork thread new'},
   {t: 'Serialized merge', d: 'One merge at a time. A push only counts when the remote confirms the SHA.', c: 'ork ship'},
   {t: 'Accounts that take turns', d: 'Quota exhausted or login lost: the same prompt carries on in the next profile. Subscriptions only; a paid key in the environment is cost.violation.', c: 'ork accounts add'},
   {t: 'Several machines, one roadmap', d: 'Before starting, each machine reserves the roadmap item. Two never take the same one.', c: 'ork roadmap pegar'}
  ]
 },
 problem: {
  eyebrow: '02 · The problem',
  title: 'Agents got good. Conducting agents, not yet.',
  quote: 'Point three agents at the same repository',
  quoteMuted: 'and you get three agents tripping over each other, plus a report saying everything went fine.',
  pains: [
   {n: '20', t: 'terminal tabs open, seven products half done and none shipped.'},
   {n: '02h', t: 'the runtime account runs out and the roadmap stops until you wake up.'},
   {n: '∞', t: 'times a day you turn into the status report of your own agents.'}
  ],
  without: 'Without ork',
  with: 'With ork',
  compare: [
   {sem: 'The agent says the tests pass', com: 'ork verify reruns the command on the real HEAD, and CI reruns it again on a clean runner'},
   {sem: 'You ask for status several times a day', com: 'An hourly summary says what is pending, urgent, blocking or critical'},
   {sem: 'Every obvious decision turns into a question', com: 'The obvious one arrives decided and recorded; you change it if you want'},
   {sem: 'The account runs out and the roadmap stops', com: 'The same prompt carries on in the next profile or on the fallback runtime'},
   {sem: 'Two sessions step on the same file', com: 'One worktree per thread, and leases with a queue'},
   {sem: 'The documentation lies about the code', com: 'ork docs verificar fails the PR when a page diverges'}
  ]
 },
 audience: {
  eyebrow: '03 · Who it is for',
  builders: {label: 'Builders, vibecoders, founders', title: 'Many products, one person, no burnout.', text: 'Run roadmaps in parallel on your own subscriptions. Stop switching between twenty terminals and being the status report of your agents.'},
  teams: {label: 'CTOs, startups, companies', title: 'Governance that does not depend on trusting the agent.', text: 'Independent CHECK on the exact SHA, proven push, decisions recorded with the why and the cost of changing. Governed memory with OrkMind when the team needs it.', cta: 'Talk to us'}
 },
 modes: {
  eyebrow: '04 · Modes',
  title: 'How much autonomy do you give the factory? Write a #TAG.',
  lead: 'The factory was built to work with a lot of autonomy. The #TAG in the request sets the points where it calls you to decide or approve, the HITL (human-in-the-loop) points. Outside them, it carries on by itself. Delivery verification is the same in all four modes.',
  hitlTitle: 'HITL point: you decide or approve',
  legendHitl: 'HITL point: the factory waits for your decision or approval',
  legendBlock: 'block the factory runs by itself',
  whenLabel: '{tag} · when to use it',
  hitlLabel: 'at the HITL points, you decide or approve',
  closing: 'The mode sets the autonomy.',
  closingPatina: 'Verification is always the same.',
  list: [
   {tag: '#Classic', pausas: 3, ciclo: [['GOAL', 1, 1, true], ['PLAN', 2, 1, true], ['GO · CHECK', 3, 2, true], ['SHIP · MASTER', 5, 2, false]], uso: 'The ork init default: delicate premises with reliable delivery.', sobre: 'Goal, plan and evidence, with push authorized in advance.'},
   {tag: '#Maestro', pausas: 1, ciclo: [['GOAL · PLAN', 1, 2, true], ['GO · CHECK · SHIP', 3, 3, false], ['MASTER', 6, 1, false]], uso: 'A clear, quick solution with no heavy tradeoff: one HITL point to align the premises.', sobre: 'Premises.'},
   {tag: '#Auto', pausas: 0, ciclo: [['GOAL · PLAN · GO · CHECK · SHIP · MASTER', 1, 6, false]], uso: 'Docs, studies, research, configuration, audits, migrations.', sobre: 'Nothing. The delivery arrives verified.'},
   {tag: '#Fast', pausas: 0, ciclo: [['GO · single phase, minimal proof', 1, 6, false]], uso: 'A small, clear request that takes minutes: a single phase, no ceremony.', sobre: 'Nothing. Pushing to the base still asks for authorization.'}
  ]
 },
 attention: {
  eyebrow: '05 · Your attention',
  title: 'The simple decisions, Orkastery makes for you.',
  titleMuted: 'You decide only what matters.',
  lead: 'Every question from the ork arrives short and organized, with alternatives and a recommendation, so you can decide in seconds. That lightness is a design goal, and it also has people with ADHD in mind.',
  boardMeta: '7 threads · updates by itself',
  boardHead: ['Thread', 'Where it runs', 'Phase', 'State'],
  threads: [
   {name: 'checkout-v2 · migrate sessions', repo: 'loja/web', where: 'mac-studio · claude-bg', p: 3, o: 0},
   {name: 'billing-api · batch invoices', repo: 'fin/billing', where: 'vps-01 · codex', p: 4, o: 1},
   {name: 'onboarding · invite flow', repo: 'app/mobile', where: 'mac-studio · claude-bg', p: 1, o: 2, wait: true},
   {name: 'docs · modes guide', repo: 'orkastery/docs', where: 'vps-02 · claude-bg', p: 5, o: 2},
   {name: 'search · incremental index', repo: 'core/search', where: 'vps-01 · claude-bg', p: 2, o: 0, fix: true},
   {name: 'auth · key rotation', repo: 'infra/auth', where: 'vps-02 · codex', p: 0, o: 1},
   {name: 'pricing · new page', repo: 'site/www', where: 'mac-studio · codex', p: 2, o: 2}
  ],
  states: {run: 'running', wait: 'waiting on you', ok: 'delivered', fix: 'GO-FIX'},
  pulseWhen: '09:00 summary · BRT',
  pulse: [{n: '3', l: 'pending'}, {n: '1', l: 'urgent'}, {n: '1', l: 'blocks a thread'}, {n: '0', l: 'critical'}],
  pulseAsk: 'Can I send the 3 questions now?',
  pulseYes: 'Yes, now',
  pulseLater: 'At 11:00',
  questionMeta: 'question 1 of 3 · onboarding · PLAN',
  questionKeys: 'a–d',
  question: 'How should the active sessions move to the new invite flow?',
  options: [
   {k: 'a', t: 'Migrate in a batch at 03:00, with rollback ready', rec: true},
   {k: 'b', t: 'Migrate on demand, at the next login'},
   {k: 'c', t: 'Keep both versions for 7 days'},
   {k: 'd', t: 'Postpone the migration to the next sprint'}
  ],
  recommended: 'recommended',
  noteBefore: 'After the objective ones, up to 2 open questions, one at a time. A missed deadline waits or escalates, never approves.',
  noteAfter: 'Answer {k} recorded. It only counts with the HMAC proof of the authenticated channel; the agent never answers for you.',
  layers: [
   {n: '01', t: 'Hourly summary', d: 'How many items are pending, urgent, blocking a thread or critical, and whether it can send them now.'},
   {n: '02', t: 'Batched questions', d: 'Up to 5 objective ones at a time, with alternatives a–d and one recommended. Then, up to 2 open ones.'},
   {n: '03', t: 'The obvious one comes decided', d: 'Recorded with the why, how to change it and the cost of changing now or later. You are informed.'},
   {n: '04', t: 'A deadline never approves', d: 'A missed deadline waits or escalates. An answer only counts with the proof of the authenticated channel.'}
  ]
 },
 night: {
  eyebrow: '06 · While you sleep',
  title: 'The factory does not stop when you sleep.',
  lead: 'You close the laptop at 23:00. This is what the ledger records until coffee. Nothing here asked for you to be there.',
  note: 'scroll the page · an example night in your time zone',
  events: [
   {t: '23:04', tag: 'GO', c: 'noite-info', text: 'Six threads open on three machines, each in its own worktree. None touches the files of another.'},
   {t: '00:37', tag: 'CHECK ✕', c: 'noite-alerta', text: 'checkout-v2 failed two tests against the baseline. It goes back as GO-FIX with a typed spec, without waking you.'},
   {t: '01:52', tag: 'rotation', c: 'sobre-noite-2', text: 'The quota of the claude-bg/personal profile ran out. The same prompt carries on in the claude-bg/team profile.'},
   {t: '03:18', tag: 'SHIP ✓', c: 'noite-ok', text: 'billing-api in a serialized merge. The push only counted when git ls-remote matched the local SHA.'},
   {t: '05:40', tag: 'decision', c: 'acento', text: 'An obvious decision made and recorded: the why, how to change it and how much changing costs now or later.'}
  ],
  morningLabel: '07:00 · night summary',
  morning: 'Good morning. 11 verified deliveries, 2 questions waiting for you, nothing critical.'
 },
 cycle: {
  eyebrow: '07 · How it works',
  title: 'Six phases no agent skips.',
  lead: 'Each phase has a contract. The result does not depend on believing the agent’s report. Tap a phase.',
  givesLabel: '{phase} delivers',
  needsLabel: 'The ork requires, to pass',
  phases: [
   {gives: 'Goal, definition of done and claims with a command.', needs: 'A claim without a command is refused.', code: 'claims.unverifiable'},
   {gives: 'Tasks, decisions and an executable verify per task.', needs: 'Without the recorded plan, the phase does not close.', code: 'artifact.missing'},
   {gives: 'One atomic commit per task, in the thread’s worktree.', needs: 'Writing outside the worktree is blocked by a lease.', code: 'lease.busy'},
   {gives: 'Verification against the baseline, plus independent CI.', needs: 'A failed claim becomes a typed failure, never an optimistic report.', code: 'claims.failed · verify.regression'},
   {gives: 'Serialized merge with a proven push.', needs: 'It only counts when git ls-remote matches the local SHA.', code: 'git ls-remote'},
   {gives: 'Typed postmortem and conduction index.', needs: 'The index comes from the ledger. Nobody types it.', code: 'ledger'}
  ],
  failChip: 'CHECK ✕',
  failNote: 'Failed? The thread goes back as GO-FIX with a typed spec. Nobody needs to wake you for that.'
 },
 proof: {
  eyebrow: '08 · Proof',
  title: 'Every number has the command that proves it.',
  lead: 'Reproducible commands check the work on the real tree. The baseline separates regression from earlier debt.',
  proofs: [
   {n: '2,733', l: 'core tests, zero failures in CI', c: 'npm --prefix core run test:ci'},
   {n: '24', l: 'behavior canaries, all green', c: 'ork eval --so-canarios'},
   {n: '199', l: 'assertions across 20 skills and 101 cases', c: 'ork eval --so-skills'},
   {n: '0', l: 'parity errors between docs and code', c: 'ork docs verificar'}
  ],
  demoMeta: '30 s · no account · no model',
  demo: [
   {k: '$', kc: 'acento', v: 'ork demo', vc: 'sobre-noite', code: true},
   {k: 'claim', kc: 'sobre-noite-4', v: 'soma() handles negative numbers', vc: 'sobre-noite-2'},
   {k: 'verify', kc: 'sobre-noite-4', v: 'npm test -- soma.spec.ts', vc: 'sobre-noite-2', code: true},
   {k: '✕ failed', kc: 'noite-alerta', v: 'claims.failed · 2 of 5 cases on HEAD a41f9c2', vc: 'noite-alerta'},
   {k: '→', kc: 'sobre-noite-4', v: 'GO-FIX with a typed spec', vc: 'sobre-noite-2'},
   {k: 'verify', kc: 'sobre-noite-4', v: 'npm test -- soma.spec.ts', vc: 'sobre-noite-2', code: true},
   {k: '✓ accepted', kc: 'noite-ok', v: '5 of 5 cases on HEAD 7d02e1b', vc: 'noite-ok'},
   {k: '', kc: 'sobre-noite-4', v: 'the agent’s report did not count. The command did.', vc: 'sobre-noite-4'}
  ],
  gapsTitle: 'A gap published as a gap.',
  gaps: [
   {s: 'does not exist', c: 'alerta-texto', t: 'Stable local verify on a VM whose CPU is stolen by the hypervisor. On that machine, the reliable proof is CI.'},
   {s: 'planned', c: 'info-texto', t: 'Account state shared across projects, on the roadmap as RM-040.'}
  ]
 },
 cta: {
  title: 'Start conducting today.',
  text: 'Install in a minute. Run ork demo and watch a false claim get rejected in 30 seconds.',
  talk: 'Talk to us'
 }
};

const es: Home = {
 title: 'Orkastery · Conduzca 20 roadmaps con la calma de quien conduce uno.',
 description: 'Orkastery rige a sus agentes de código en threads paralelos, prueba cada entrega contra el repositorio y solo lo llama cuando la decisión es realmente suya.',
 hero: {
  badge: ['AI Software Factory', '@orkastery/cli {versao}', 'MIT'],
  title: 'Conduzca 20 roadmaps',
  titleMuted: 'con la calma de quien conduce uno.',
  lead: 'Orkastery es la plataforma que rige a sus agentes de código en threads paralelos, prueba cada entrega contra el repositorio y solo lo llama cuando la decisión es realmente suya.',
  talk: 'Hable con nosotros',
  note: 'Sin servidor y sin LLM integrado. Funciona con sus suscripciones de Claude Code y Codex.',
  scoreHead: 'ahora · {n} roadmaps · 3 máquinas · 2 runtimes',
  live: {run: 'ejecutando', wait: 'le esperan', ok: 'ya verificados'},
  canvasLabel: 'Partitura animada: 20 roadmaps recorren las seis fases, de GOAL a MASTER. Los puntos en latón le esperan; los verdes ya están verificados.',
  waitTag: 'le espera',
  names: ['checkout-v2', 'billing-api', 'onboarding', 'docs-modos', 'search-index', 'auth-keys', 'pricing', 'mobile-push', 'analytics', 'crm-sync', 'infra-tf', 'design-tokens', 'api-gateway', 'notificaciones', 'informes', 'i18n-en', 'marketplace', 'soporte-bot', 'pagos-pix', 'status-page']
 },
 runtimes: {label: 'Conduzca desde donde ya trabaja', list: ['Claude Code', 'Codex', 'Hermes', 'OpenClaw']},
 parallel: {
  eyebrow: '01 · Paralelismo',
  title: 'Una capa rige todos sus runtimes, en todas sus máquinas.',
  lead: 'Usted conduce desde una sola conversación. El ork reserva los ítems del roadmap, distribuye los threads entre máquinas, runtimes y cuentas, aísla cada uno en su propia worktree y lo devuelve todo con un merge serializado.',
  you: 'Usted, desde una conversación',
  youSub: '#TAG en el pedido · resumen cada hora · lote a–d',
  layer: 'capa de orquestación',
  layerSub: 'determinista · sin servidor · sin LLM',
  fns: ['reserva el roadmap', 'distribuye threads', 'aísla en worktrees', 'rota cuentas', 'verifica claims', 'serializa el merge'],
  profile: 'perfil {p}',
  active: 'activo',
  rotated: 'cuota agotada · rotó',
  rotatedProfile: 'equipo ← personal',
  foot: '{n} threads · {n} worktrees · leases ok',
  machines: [
   {name: 'mac-studio', env: 'local · macOS', runtimes: [{rt: 'claude-bg', prof: 'personal', threads: ['checkout-v2', 'onboarding', 'pricing']}, {rt: 'codex', prof: 'equipo', threads: ['design-tokens']}]},
   {name: 'vps-01', env: 'cloud · Ubuntu', runtimes: [{rt: 'claude-bg', prof: 'equipo', threads: ['search-index', 'analytics']}, {rt: 'codex', prof: 'personal', threads: ['billing-api', 'crm-sync']}]},
   {name: 'vps-02', env: 'cloud · Ubuntu', runtimes: [{rt: 'claude-bg', prof: 'estudio', threads: ['docs-modos', 'i18n-en', 'status-page']}, {rt: 'codex', prof: 'equipo', threads: ['auth-keys']}]}
  ],
  mergeLabel: 'merge serializado, uno a la vez',
  ships: ['billing-api', 'pricing', 'docs-modos', 'checkout-v2', 'i18n-en', 'crm-sync'],
  roadmapTitle: 'Un roadmap, varias máquinas, ningún ítem por duplicado.',
  roadmapSub: 'cada máquina reserva el ítem antes de empezar',
  free: 'libre',
  scale: [
   {t: 'Una worktree por thread', d: 'Cada thread escribe solo en su propia worktree. Escribir fuera queda bloqueado por lease, con cola.', c: 'ork thread new'},
   {t: 'Merge serializado', d: 'Un merge a la vez. El push solo cuenta cuando el remoto confirma el SHA.', c: 'ork ship'},
   {t: 'Cuentas que se turnan', d: 'Cuota agotada o sesión perdida: el mismo prompt sigue en el siguiente perfil. Solo suscripción; una clave de pago en el entorno es cost.violation.', c: 'ork accounts add'},
   {t: 'Varias máquinas, un roadmap', d: 'Antes de empezar, cada máquina reserva el ítem del roadmap. Dos nunca toman el mismo.', c: 'ork roadmap pegar'}
  ]
 },
 problem: {
  eyebrow: '02 · El problema',
  title: 'Los agentes mejoraron. Conducir agentes, no.',
  quote: 'Apunte tres agentes al mismo repositorio',
  quoteMuted: 'y recibirá tres agentes atropellándose, y un informe que dice que todo salió bien.',
  pains: [
   {n: '20', t: 'pestañas de terminal abiertas, siete productos a medias y ninguno lanzado.'},
   {n: '02h', t: 'la cuenta del runtime se agota y el roadmap se detiene hasta que usted despierte.'},
   {n: '∞', t: 'veces al día usted se convierte en el informe de estado de sus propios agentes.'}
  ],
  without: 'Sin ork',
  with: 'Con ork',
  compare: [
   {sem: 'El agente dice que las pruebas pasan', com: 'ork verify vuelve a ejecutar el comando en el HEAD real, y el CI lo ejecuta de nuevo en un runner limpio'},
   {sem: 'Usted pide el estado varias veces al día', com: 'Un resumen cada hora dice qué está pendiente, urgente, bloqueando o crítico'},
   {sem: 'Toda decisión obvia se vuelve pregunta', com: 'La obvia llega decidida y registrada; usted la cambia si quiere'},
   {sem: 'La cuenta se agota y el roadmap se detiene', com: 'El mismo prompt continúa en el siguiente perfil o en el runtime de respaldo'},
   {sem: 'Dos sesiones pisan el mismo archivo', com: 'Una worktree por thread, y leases con cola'},
   {sem: 'La documentación miente sobre el código', com: 'ork docs verificar reprueba el PR cuando una página diverge'}
  ]
 },
 audience: {
  eyebrow: '03 · Para quién',
  builders: {label: 'Builders, vibecoders, fundadores', title: 'Muchos productos, una persona, ningún burnout.', text: 'Ejecute roadmaps en paralelo con sus propias suscripciones. Deje de alternar entre veinte terminales y de ser el informe de estado de sus agentes.'},
  teams: {label: 'CTOs, startups, empresas', title: 'Gobernanza que no depende de confiar en el agente.', text: 'CHECK independiente en el SHA exacto, push comprobado, decisiones registradas con el porqué y el costo de cambiar. Memoria gobernada con OrkMind cuando el equipo la necesite.', cta: 'Hable con nosotros'}
 },
 modes: {
  eyebrow: '04 · Modos',
  title: '¿Cuánta autonomía le da a la fábrica? Escriba una #TAG.',
  lead: 'La fábrica se hizo para trabajar con mucha autonomía. La #TAG en el pedido define en qué puntos lo llama para decidir o aprobar, los puntos de HITL (human-in-the-loop). Fuera de ellos, sigue sola. La verificación de la entrega es la misma en los cuatro modos.',
  hitlTitle: 'punto de HITL: usted decide o aprueba',
  legendHitl: 'punto de HITL: la fábrica espera su decisión o aprobación',
  legendBlock: 'bloque que la fábrica ejecuta sola',
  whenLabel: '{tag} · para cuándo',
  hitlLabel: 'en los puntos de HITL, usted decide o aprueba',
  closing: 'El modo ajusta la autonomía.',
  closingPatina: 'La verificación es siempre la misma.',
  list: [
   {tag: '#Classic', pausas: 3, ciclo: [['GOAL', 1, 1, true], ['PLAN', 2, 1, true], ['GO · CHECK', 3, 2, true], ['SHIP · MASTER', 5, 2, false]], uso: 'El predeterminado de ork init: premisas delicadas con entrega confiable.', sobre: 'Objetivo, plan y evidencias, con autorización anticipada de push.'},
   {tag: '#Maestro', pausas: 1, ciclo: [['GOAL · PLAN', 1, 2, true], ['GO · CHECK · SHIP', 3, 3, false], ['MASTER', 6, 1, false]], uso: 'Solución clara y ágil, sin tradeoff pesado: un punto de HITL para alinear las premisas.', sobre: 'Premisas.'},
   {tag: '#Auto', pausas: 0, ciclo: [['GOAL · PLAN · GO · CHECK · SHIP · MASTER', 1, 6, false]], uso: 'Docs, estudios, investigaciones, configuraciones, auditorías, migraciones.', sobre: 'Nada. La entrega llega verificada.'},
   {tag: '#Fast', pausas: 0, ciclo: [['GO · fase única, prueba mínima', 1, 6, false]], uso: 'Pedido pequeño y claro, de minutos: una sola fase, sin ceremonia.', sobre: 'Nada. El push a la base sigue pidiendo autorización.'}
  ]
 },
 attention: {
  eyebrow: '05 · Su atención',
  title: 'Las decisiones simples, Orkastery las toma por usted.',
  titleMuted: 'Usted decide solo lo que importa.',
  lead: 'Toda pregunta del ork llega corta y organizada, con alternativas y una recomendación, para que usted decida en segundos. Esa ligereza es un objetivo de diseño y piensa también en quien tiene TDAH.',
  boardMeta: '7 threads · se actualiza solo',
  boardHead: ['Thread', 'Dónde corre', 'Fase', 'Estado'],
  threads: [
   {name: 'checkout-v2 · migrar sesiones', repo: 'loja/web', where: 'mac-studio · claude-bg', p: 3, o: 0},
   {name: 'billing-api · facturas en lote', repo: 'fin/billing', where: 'vps-01 · codex', p: 4, o: 1},
   {name: 'onboarding · flujo de invitación', repo: 'app/mobile', where: 'mac-studio · claude-bg', p: 1, o: 2, wait: true},
   {name: 'docs · guía de modos', repo: 'orkastery/docs', where: 'vps-02 · claude-bg', p: 5, o: 2},
   {name: 'search · índice incremental', repo: 'core/search', where: 'vps-01 · claude-bg', p: 2, o: 0, fix: true},
   {name: 'auth · rotación de claves', repo: 'infra/auth', where: 'vps-02 · codex', p: 0, o: 1},
   {name: 'pricing · página nueva', repo: 'site/www', where: 'mac-studio · codex', p: 2, o: 2}
  ],
  states: {run: 'ejecutando', wait: 'le espera', ok: 'entregado', fix: 'GO-FIX'},
  pulseWhen: 'resumen de las 09:00 · BRT',
  pulse: [{n: '3', l: 'pendientes'}, {n: '1', l: 'urgente'}, {n: '1', l: 'bloquea un thread'}, {n: '0', l: 'críticos'}],
  pulseAsk: '¿Puedo enviar las 3 preguntas ahora?',
  pulseYes: 'Sí, ahora',
  pulseLater: 'A las 11:00',
  questionMeta: 'pregunta 1 de 3 · onboarding · PLAN',
  questionKeys: 'a–d',
  question: '¿Cómo migrar las sesiones activas al nuevo flujo de invitación?',
  options: [
   {k: 'a', t: 'Migrar en lote a las 03:00, con rollback listo', rec: true},
   {k: 'b', t: 'Migrar bajo demanda, en el próximo inicio de sesión'},
   {k: 'c', t: 'Mantener las dos versiones durante 7 días'},
   {k: 'd', t: 'Aplazar la migración al próximo sprint'}
  ],
  recommended: 'recomendada',
  noteBefore: 'Después de las objetivas, hasta 2 abiertas, una a la vez. Un plazo vencido espera o escala, nunca aprueba.',
  noteAfter: 'Respuesta {k} registrada. Solo vale con la prueba HMAC del canal autenticado; el agente nunca responde por usted.',
  layers: [
   {n: '01', t: 'Resumen cada hora', d: 'Cuántos ítems están pendientes, urgentes, bloqueando un thread o críticos, y si puede enviarlos ahora.'},
   {n: '02', t: 'Preguntas en lote', d: 'Hasta 5 objetivas a la vez, con alternativas a–d y una recomendada. Después, hasta 2 abiertas.'},
   {n: '03', t: 'La obvia ya viene decidida', d: 'Registrada con el porqué, cómo cambiarla y el costo de cambiar ahora o después. Usted queda informado.'},
   {n: '04', t: 'Un plazo nunca aprueba', d: 'Un plazo vencido espera o escala. Una respuesta solo cuenta con la prueba del canal autenticado.'}
  ]
 },
 night: {
  eyebrow: '06 · Mientras usted duerme',
  title: 'La fábrica no se detiene cuando usted duerme.',
  lead: 'Usted cierra el portátil a las 23 h. Esto es lo que el ledger registra hasta el café. Nada de esto pidió su presencia.',
  note: 'desplace la página · ejemplo de una noche en su huso horario',
  events: [
   {t: '23:04', tag: 'GO', c: 'noite-info', text: 'Seis threads abiertos en tres máquinas, cada uno en su worktree. Ninguno toca el archivo del otro.'},
   {t: '00:37', tag: 'CHECK ✕', c: 'noite-alerta', text: 'checkout-v2 reprobó dos pruebas contra la baseline. Vuelve como GO-FIX con spec tipada, sin despertarlo.'},
   {t: '01:52', tag: 'rotación', c: 'sobre-noite-2', text: 'La cuota del perfil claude-bg/personal se agotó. El mismo prompt sigue en el perfil claude-bg/equipo.'},
   {t: '03:18', tag: 'SHIP ✓', c: 'noite-ok', text: 'billing-api en merge serializado. El push solo contó cuando git ls-remote coincidió con el SHA local.'},
   {t: '05:40', tag: 'decisión', c: 'acento', text: 'Una decisión obvia tomada y registrada: el porqué, cómo cambiarla y cuánto cuesta cambiarla ahora o después.'}
  ],
  morningLabel: '07:00 · resumen de la noche',
  morning: 'Buenos días. 11 entregas verificadas, 2 preguntas esperándolo, ninguna crítica.'
 },
 cycle: {
  eyebrow: '07 · Cómo funciona',
  title: 'Seis fases que ningún agente se salta.',
  lead: 'Cada fase tiene un contrato. El resultado no depende de creer en el informe del agente. Toque una fase.',
  givesLabel: '{phase} entrega',
  needsLabel: 'El ork exige para pasar',
  phases: [
   {gives: 'Objetivo, criterio de terminado y claims con comando.', needs: 'Una claim sin comando se rechaza.', code: 'claims.unverifiable'},
   {gives: 'Tareas, decisiones y un verify ejecutable por tarea.', needs: 'Sin el plan grabado, la fase no se cierra.', code: 'artifact.missing'},
   {gives: 'Un commit atómico por tarea, en la worktree del thread.', needs: 'Escribir fuera de la worktree queda bloqueado por lease.', code: 'lease.busy'},
   {gives: 'Verificación contra la baseline, más CI independiente.', needs: 'Una claim reprobada se vuelve falla tipada, nunca informe optimista.', code: 'claims.failed · verify.regression'},
   {gives: 'Merge serializado con push comprobado.', needs: 'Solo cuenta cuando git ls-remote coincide con el SHA local.', code: 'git ls-remote'},
   {gives: 'Postmortem tipado e índice de conducción.', needs: 'El índice viene del ledger. Nadie lo escribe a mano.', code: 'ledger'}
  ],
  failChip: 'CHECK ✕',
  failNote: '¿Reprobó? El thread vuelve como GO-FIX con una spec tipada. Nadie necesita despertarlo para eso.'
 },
 proof: {
  eyebrow: '08 · Prueba',
  title: 'Cada número tiene el comando que lo prueba.',
  lead: 'Comandos reproducibles comprueban el trabajo en el árbol real. La baseline separa la regresión de la deuda anterior.',
  proofs: [
   {n: '2.733', l: 'pruebas del núcleo, cero fallos en el CI', c: 'npm --prefix core run test:ci'},
   {n: '24', l: 'canarios de comportamiento, todos en verde', c: 'ork eval --so-canarios'},
   {n: '199', l: 'aserciones en 20 skills y 101 casos', c: 'ork eval --so-skills'},
   {n: '0', l: 'errores de paridad entre docs y código', c: 'ork docs verificar'}
  ],
  demoMeta: '30 s · sin cuenta · sin modelo',
  demo: [
   {k: '$', kc: 'acento', v: 'ork demo', vc: 'sobre-noite', code: true},
   {k: 'claim', kc: 'sobre-noite-4', v: 'soma() maneja números negativos', vc: 'sobre-noite-2'},
   {k: 'verify', kc: 'sobre-noite-4', v: 'npm test -- soma.spec.ts', vc: 'sobre-noite-2', code: true},
   {k: '✕ falló', kc: 'noite-alerta', v: 'claims.failed · 2 de 5 casos en el HEAD a41f9c2', vc: 'noite-alerta'},
   {k: '→', kc: 'sobre-noite-4', v: 'GO-FIX con spec tipada', vc: 'sobre-noite-2'},
   {k: 'verify', kc: 'sobre-noite-4', v: 'npm test -- soma.spec.ts', vc: 'sobre-noite-2', code: true},
   {k: '✓ aceptada', kc: 'noite-ok', v: '5 de 5 casos en el HEAD 7d02e1b', vc: 'noite-ok'},
   {k: '', kc: 'sobre-noite-4', v: 'el informe del agente no contó. El comando sí.', vc: 'sobre-noite-4'}
  ],
  gapsTitle: 'Una laguna publicada como laguna.',
  gaps: [
   {s: 'no existe', c: 'alerta-texto', t: 'Verify local estable en VM con CPU robada por el hipervisor. En esa máquina, la prueba confiable es el CI.'},
   {s: 'planificado', c: 'info-texto', t: 'Estado de cuenta compartido entre proyectos, en el roadmap como RM-040.'}
  ]
 },
 cta: {
  title: 'Empiece a conducir hoy.',
  text: 'Instale en un minuto. Ejecute ork demo y vea cómo se rechaza una claim falsa en 30 segundos.',
  talk: 'Hable con nosotros'
 }
};

export type HomeCopy = Home;
export default {pt, en, es};
