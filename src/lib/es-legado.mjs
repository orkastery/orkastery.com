// O espanhol saiu do site (decisão E1 a do dono). As URLs /es/ que existiam continuam
// respondendo com uma página estática que leva ao mesmo caminho em /en/: slugs e IDs são
// iguais nas duas línguas, então o fragmento também vale do outro lado.
import legado from '../data/es-legado.json' with { type: 'json' };

export const rotasDoLegado = legado.rotas;

/** O caminho em /en/ que substitui uma rota /es/ antiga (sem o base da build). */
export function alvoDoLegado(rota) {
  if (!/^\/es\/(?:[a-z0-9-]+\/)*$/.test(rota)) throw new Error(`rota /es/ inválida: ${JSON.stringify(rota)}`);
  return '/en/' + rota.slice('/es/'.length);
}

/** O parâmetro da rota de resto de src/pages/es/[...rota].astro (undefined é o próprio /es/). */
export function parametroDoLegado(rota) {
  const resto = rota.slice('/es/'.length).replace(/\/$/, '');
  return resto || undefined;
}
