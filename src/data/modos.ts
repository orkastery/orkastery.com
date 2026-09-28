// A matriz dos 4 modos de conducao (#Classic, #Maestro, #Auto e #Fast), do que mais pausa ao mais leve.
// Fonte de verdade: `ork modos` (core/src/modos.ts do Orkastery/orkastery).
// Este arquivo e dado, nao decisao: os componentes renderizam o que esta aqui,
// e quem muda a matriz no nucleo atualiza este espelho junto.

export interface BlocoDeModo {
  /** Fases do bloco, no formato do slug do ciclo (`GOAL`, `GO-CHECK-SHIP`, ...). */
  fases: string;
  /** Quantas das 6 fases canonicas este bloco cobre. */
  largura: number;
  /** O fim deste bloco pausa e espera o veredito humano? */
  pausa: boolean;
  /** Coluna (1 a 6) onde o bloco comeca, quando ele nao segue o anterior: o GO do #Fast fica sob o GO. */
  inicio?: number;
}

export interface ModoDeConducao {
  tag: string;
  modo: string;
  padrao?: boolean;
  blocos: number;
  pausas: number;
  ciclo: BlocoDeModo[];
  /** Parte 3 dos slugs de sessao que o modo gera. */
  slugs: string;
  /** Sobre o que o humano decide nas pausas. */
  pausaSobre: string;
  /** Quando usar. */
  uso: string;
  /** Planejado, ainda nao aceito por `ork modos`: o site mostra, marcado como em breve. */
  emBreve?: boolean;
}

export const MODOS_DE_CONDUCAO: ModoDeConducao[] = [
  {
    tag: '#Classic',
    modo: 'classic',
    padrao: true,
    blocos: 4,
    pausas: 3,
    ciclo: [
      { fases: 'GOAL', largura: 1, pausa: true },
      { fases: 'PLAN', largura: 1, pausa: true },
      { fases: 'GO-CHECK', largura: 2, pausa: true },
      { fases: 'SHIP-MASTER', largura: 2, pausa: false }
    ],
    slugs: 'goal, plan, f34, f56',
    pausaSobre: 'objetivo, plano, evidências, com autorização antecipada de push',
    uso: 'O padrão do ork init: premissas delicadas com entrega confiável.'
  },
  {
    tag: '#Maestro',
    modo: 'maestro',
    blocos: 3,
    pausas: 1,
    ciclo: [
      { fases: 'GOAL-PLAN', largura: 2, pausa: true },
      { fases: 'GO-CHECK-SHIP', largura: 3, pausa: false },
      { fases: 'MASTER', largura: 1, pausa: false }
    ],
    slugs: 'f12, f345, master',
    pausaSobre: 'premissas',
    uso: 'Solução clara e ágil, sem tradeoff pesado: uma pausa para alinhar as premissas.'
  },
  {
    tag: '#Auto',
    modo: 'auto',
    blocos: 1,
    pausas: 0,
    ciclo: [{ fases: 'GOAL-PLAN-GO-CHECK-SHIP-MASTER', largura: 6, pausa: false }],
    slugs: 'full',
    pausaSobre: 'nada',
    uso: 'Docs, estudos, pesquisas, configurações, auditorias, migrações.'
  },
  {
    tag: '#Fast',
    modo: 'fast',
    blocos: 1,
    pausas: 0,
    ciclo: [{ fases: 'GO', largura: 1, inicio: 3, pausa: false }],
    slugs: 'go',
    pausaSobre: 'nada; o push para a base continua pedindo autorização',
    uso: 'Pedido pequeno e claro, de minutos: uma fase só, sem cerimônia, com Claude Sonnet ou GPT Terra em esforço alto.'
  }
];

/** As 6 fases canonicas, na ordem, para eixos e legendas. */
export const FASES_CANONICAS = ['GOAL', 'PLAN', 'GO', 'CHECK', 'SHIP', 'MASTER'];
