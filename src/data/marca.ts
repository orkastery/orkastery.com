// Página /marca/ (PT) e /en/marca/ (EN): o Brand Kit do kit Partitura do dono ("Brand Kit.dc.html"
// e "Brand Kit EN.dc.html"), com o texto dele. A capa do manual e o rodapé das diretrizes apontam
// para orkastery.com/marca. Os arquivos vêm de public/marca/ e public/partitura/ (cópia do kit);
// os PDFs são os documentos do kit renderizados por scripts/documentos-da-marca.mjs.
// Trecho entre crases vira código (arquivo, token, atributo). Comandos e nomes de arquivo ficam iguais.

export type Logo = {nome: string; uso: string; svg: string; png: string; pngTam: string; fundo: string; altura: number};
export type Cor = {token: string; hex: string; uso: string};

const arquivos = {
 logos: [
  ['assinatura.svg', 'assinatura-1920.png', '1920', 'noite', 44],
  ['assinatura-fundo-claro.svg', 'assinatura-fundo-claro-1920.png', '1920', 'nevoa', 44],
  ['simbolo.svg', 'simbolo-512.png', '512', 'noite', 80],
  ['simbolo-fundo-claro.svg', 'simbolo-fundo-claro-512.png', '512', 'nevoa', 80],
  ['nome.svg', 'nome-1200.png', '1200', 'noite', 40],
  ['nome-fundo-claro.svg', 'nome-fundo-claro-1200.png', '1200', 'nevoa', 40],
  ['icone.svg', 'avatar-github-1024.png', '1024', 'trilho', 96],
  ['icone-pequeno.svg', 'favicon-32.png', '32', 'trilho', 64]
 ] as const,
 icones: ['icone-512.png', 'icone-192.png', 'apple-touch-icon-180.png', 'favicon-32.png', 'avatar-github-1024.png'],
 cores: {
  dia: [['--nevoa', '#EEF0F2'], ['--papel', '#FFFFFF'], ['--trilho', '#E3E6EA'], ['--tinta', '#12161C'], ['--tinta-2', '#454C56'], ['--tinta-3', '#5F6670']],
  noite: [['--noite', '#0D1015'], ['--noite-2', '#161A21'], ['--noite-3', '#232831'], ['--luar', '#E9ECEF'], ['--luar-2', '#A7AEB8']],
  estado: [['--latao', '#E0B264'], ['--latao-tinta', '#8A5F17'], ['--regencia', '#4F78B8'], ['--regencia-tinta', '#3D639F'], ['--patina', '#3C9A86'], ['--patina-tinta', '#1F6B5C'], ['--brasa', '#D9673F'], ['--brasa-tinta', '#A8461F']]
 },
 templates: [
  ['og-1200x630.png', '1200 × 630'],
  ['github-banner-1280x640.png', '1280 × 640'],
  ['social-1080x1080.png', '1080 × 1080'],
  ['deck-capa-1920x1080.png', '1920 × 1080']
 ],
 documentos: {diretrizes: '/marca/documentos/diretrizes-rapidas.pdf', manual: '/marca/documentos/manual-de-marca.pdf', componentes: '/marca/documentos/partitura-componentes.pdf'},
 fontesLinks: ['https://fonts.google.com/specimen/Geist', 'https://fonts.google.com/specimen/Hanken+Grotesk', 'https://fonts.google.com/specimen/IBM+Plex+Mono'],
 fontesSnippet: '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@600&family=Hanken+Grotesk:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap">\n<link rel="stylesheet" href="/partitura/partitura.css">'
};

const pt = {
 titulo: 'Marca · Orkastery',
 descricao: 'Logos em SVG e PNG, a paleta, as fontes, quatro templates, as diretrizes e os arquivos da Partitura para aplicar a marca Orkastery.',
 rotulo: 'Brand kit · Partitura v1.0',
 h1: 'Tudo para aplicar a marca.',
 lead: 'Logos em SVG e PNG, a paleta copiável, as fontes, quatro templates e as diretrizes de uma página. Clique numa cor para copiar o hex.',
 navRotulo: 'Nesta página',
 nav: [['logos', 'logos'], ['paleta', 'paleta'], ['fontes', 'fontes'], ['templates', 'templates'], ['diretrizes', 'diretrizes'], ['devs', 'devs e agentes']],
 logos: {titulo: 'Logos', nota: 'Versão `-fundo-claro` no dia; padrão no noite.', baixar: 'Baixar', icones: 'Ícones de app:',
  itens: [['Assinatura', 'noite'], ['Assinatura', 'dia'], ['Símbolo', 'noite'], ['Símbolo', 'dia'], ['Nome', 'noite'], ['Nome', 'dia'], ['Ícone · avatar', 'app, GitHub'], ['Ícone pequeno', 'favicon']]},
 paleta: {titulo: 'Paleta', aviso: 'clique para copiar o hex', copiado: '{hex} copiado', copiar: 'Copiar', ok: '✓ copiado', falha: '× use ⌘C',
  grupos: [['DIA', 'dia', ['chão', 'cartões', 'linhas', 'texto', 'apoio', 'rótulo']], ['NOITE', 'noite', ['chão', 'cartões', 'linhas', 'texto', 'apoio']],
   ['ESTADO', 'estado', ['espera você · HITL', 'texto de espera, dia', 'executando', 'texto, dia', 'verificado', 'texto, dia', 'falha · GO-FIX', 'texto, dia']]]},
 fontes: {titulo: 'Fontes', cabeca: 'html · head', copiar: 'copiar', ok: '✓ copiado', falha: '× use ⌘C', msgOk: 'Trecho copiado.', msgFalha: 'Não deu para copiar: selecione o trecho e use ⌘C.',
  itens: [['Aa', 'Geist · 600', 'Títulos. Licença OFL.', 'titulo'], ['Aa', 'Hanken Grotesk · 400 / 500', 'Texto. Licença OFL.', 'texto'], ['a41f', 'IBM Plex Mono · 400 / 500', 'Comandos, SHAs, horários, rótulos, provas. Licença OFL.', 'mono']]},
 templates: {titulo: 'Templates', itens: [['OG image', 'noite'], ['Banner do GitHub', 'dia'], ['Post social', 'noite'], ['Capa de deck', 'noite']]},
 diretrizes: {titulo: 'Diretrizes rápidas', texto: 'O essencial em uma página A4, para imprimir ou mandar junto do pedido.', abrir: 'Abrir diretrizes', manual: 'Manual completo',
  regras: ['Use os arquivos de `marca/svg`. Nunca redesenhe, recolore ou distorça o logo.', 'Latão só em “espera você” e pontos de HITL. Exceção: a borda de luz do comando de instalação.', 'Todo estado tem rótulo. Cor nunca carrega a informação sozinha.', 'Geist 600 nos títulos, Hanken Grotesk no texto, IBM Plex Mono na prova.', 'Todo número vem com o comando que o prova.', 'Sem fotos: terminal real, recortes do produto e diagramas Partitura.']},
 devs: {titulo: 'Para devs e agentes', itens: [['`partitura.css` ↓', 'Tokens com nomes em PT, dia e noite por `data-tema`.'], ['`partitura.json` ↓', 'Os mesmos tokens para pipelines e Figma.'], ['`DESIGN.md` ↓', 'Regras, tokens e exemplos para agentes de IA.'], ['Componentes →', 'Biblioteca com todos os estados, dia e noite.']]}
};

type Marca = typeof pt;

const en: Marca = {
 titulo: 'Brand · Orkastery',
 descricao: 'Logos in SVG and PNG, the palette, the fonts, four templates, the guidelines and the Partitura files to apply the Orkastery brand.',
 rotulo: 'Brand kit · Partitura v1.0',
 h1: 'Everything you need to apply the brand.',
 lead: 'Logos in SVG and PNG, a copyable palette, the fonts, four templates and the one-page guidelines. Click a color to copy its hex.',
 navRotulo: 'On this page',
 nav: [['logos', 'logos'], ['paleta', 'palette'], ['fontes', 'fonts'], ['templates', 'templates'], ['diretrizes', 'guidelines'], ['devs', 'devs and agents']],
 logos: {titulo: 'Logos', nota: 'Use the `-fundo-claro` version on light; the default on night.', baixar: 'Download', icones: 'App icons:',
  itens: [['Signature', 'night'], ['Signature', 'day'], ['Symbol', 'night'], ['Symbol', 'day'], ['Wordmark', 'night'], ['Wordmark', 'day'], ['Icon · avatar', 'app, GitHub'], ['Small icon', 'favicon']]},
 paleta: {titulo: 'Palette', aviso: 'click to copy the hex', copiado: '{hex} copied', copiar: 'Copy', ok: '✓ copied', falha: '× use ⌘C',
  grupos: [['DAY', 'dia', ['floor', 'cards', 'lines', 'text', 'supporting', 'label']], ['NIGHT', 'noite', ['floor', 'cards', 'lines', 'text', 'supporting']],
   ['STATE', 'estado', ['waiting for you · HITL', 'waiting text, day', 'running', 'text, day', 'verified', 'text, day', 'failure · GO-FIX', 'text, day']]]},
 fontes: {titulo: 'Fonts', cabeca: 'html · head', copiar: 'copy', ok: '✓ copied', falha: '× use ⌘C', msgOk: 'Snippet copied.', msgFalha: 'Could not copy: select the snippet and use ⌘C.',
  itens: [['Aa', 'Geist · 600', 'Headings. OFL license.', 'titulo'], ['Aa', 'Hanken Grotesk · 400 / 500', 'Body text. OFL license.', 'texto'], ['a41f', 'IBM Plex Mono · 400 / 500', 'Commands, SHAs, times, labels, proof. OFL license.', 'mono']]},
 templates: {titulo: 'Templates', itens: [['OG image', 'night'], ['GitHub banner', 'day'], ['Social post', 'night'], ['Deck cover', 'night']]},
 diretrizes: {titulo: 'Quick guidelines', texto: 'The essentials on one A4 page, to print or attach to a brief.', abrir: 'Open guidelines (PT)', manual: 'Full manual (PT)',
  regras: ['Use the files in `marca/svg`. Never redraw, recolor or distort the logo.', 'Brass only for “waiting for you” and HITL points. Exception: the light border on the install command.', 'Every state has a label. Color never carries the information alone.', 'Geist 600 for headings, Hanken Grotesk for text, IBM Plex Mono for proof.', 'Every number comes with the command that proves it.', 'No photos: real terminal output, product crops and Partitura diagrams.']},
 devs: {titulo: 'For devs and agents', itens: [['`partitura.css` ↓', 'Tokens with Portuguese names; day and night via `data-tema`.'], ['`partitura.json` ↓', 'The same tokens for pipelines and Figma.'], ['`DESIGN.md` ↓', 'Rules, tokens and examples for AI agents.'], ['Components →', 'Library with every state, day and night.']]}
};

export default {pt, en, arquivos};
