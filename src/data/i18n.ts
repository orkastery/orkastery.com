export const locales = ['pt', 'en'] as const;
export type Locale = typeof locales[number];
export const languageTag = {pt:'pt-BR', en:'en'};
export const languageName = {pt:'Português', en:'English'};
// O base da build: '' na produção e /releasevalidation/<release> na prévia (SITE_BASE, src/lib/previa.mjs).
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
export function withBase(path: string) { return base + path; }
export function withoutBase(path: string) { return base && (path === base || path.startsWith(base + '/')) ? path.slice(base.length) || '/' : path; }
export function localeFor(path: string): Locale { const logical = withoutBase(path); return logical.startsWith('/en/') ? 'en' : 'pt'; }
export function unlocalize(path: string) { return withoutBase(path).replace(/^\/en(?=\/)/, '') || '/'; }
// Caminho da página na língua, sem o base: serve ao link para o outro site, que não tem esta prévia.
export function localizedPath(path: string, locale: Locale) { return (locale === 'pt' ? '' : '/'+locale) + unlocalize(path); }
// Href da página na língua dentro desta build, com o base da prévia quando houver.
export function localize(path: string, locale: Locale) { return withBase(localizedPath(path, locale)); }
const labels = {
 pt: {contribute:'Contribuir',home:'Início',docs:'Documentação',language:'Idioma',skip:'Pular para o conteúdo',navigation:'Navegação principal',onThisPage:'Nesta página',previous:'Anterior',next:'Próximo',source:'Fontes desta página',reviewed:'Revisão editorial',indexTitle:'Documentação para usar e entender',indexDescription:'Comece pelo seu objetivo. Encontre guias, conceitos e referências com origem explícita.',start:'Começar',concepts:'Conceitos',guides:'Guias',reference:'Referência',standards:'Padrões',product:'Produto',integrations:'Integrações',governance:'Governança',storage:'Armazenamento',retrieval:'Recuperação',openSource:'Código aberto',contact:'Contato',read:'Ler o guia',roadmap:'Planejamento no repositório',nextReview:'Próxima revisão',menu:'Abrir navegação',close:'Fechar navegação',soon:'Em breve',newTab:'Abre em nova aba',contents:'Guias por assunto',provenance:'Conteúdo curado das fontes listadas. A data indica revisão editorial; não certifica uma instalação.',name:'Seu nome',email:'Seu email',message:'Mensagem',send:'Preparar email',contactText:'Dúvidas, propostas e contribuições são bem-vindas.',mailHelp:'O envio abre seu aplicativo de email. Nenhum dado é enviado a um servidor por este formulário.',license:'Licença MIT',organization:'A organização',ork:'O produto Ork',diagram:'Diagrama',legacy:'Atalhos das versões anteriores'},
 en: {contribute:'Contribute',home:'Home',docs:'Documentation',language:'Language',skip:'Skip to content',navigation:'Main navigation',onThisPage:'On this page',previous:'Previous',next:'Next',source:'Page sources',reviewed:'Editorial review',indexTitle:'Documentation to use and understand',indexDescription:'Start with your goal. Find guides, concepts and references with explicit sources.',start:'Get started',concepts:'Concepts',guides:'Guides',reference:'Reference',standards:'Standards',product:'Product',integrations:'Integrations',governance:'Governance',storage:'Storage',retrieval:'Retrieval',openSource:'Open source',contact:'Contact',read:'Read the guide',roadmap:'Planning in the repository',nextReview:'Next review',menu:'Open navigation',close:'Close navigation',soon:'Coming soon',newTab:'Opens in a new tab',contents:'Guides by topic',provenance:'Content curated from the listed sources. The date indicates editorial review; it does not certify an installation.',name:'Your name',email:'Your email',message:'Message',send:'Prepare email',contactText:'Questions, proposals and contributions are welcome.',mailHelp:'Submitting opens your email application. This form sends no data to a server.',license:'MIT license',organization:'The organization',ork:'The Ork product',diagram:'Diagram',legacy:'Shortcuts from earlier versions'}
};
export const ui = (locale: Locale) => labels[locale];

// Moldura do design (cabeçalho, rodapé e botão de instalação) em PT e EN.
const frame = {
 pt: {nav:[['#escala','Paralelismo'],['#ciclo','Como funciona'],['#modos','Modos'],['#prova','Prova']],docs:'Docs',talk:'Falar com a gente',install:'Instalar',languageShort:{pt:'PT',en:'EN'},copy:'copiar',copied:'✓ copiado',copyFailed:'× use ⌘C',copiedMessage:'Comando copiado.',copyFailedMessage:'Não deu para copiar: selecione o comando e use ⌘C.',tagline:'Maestria é construir mais, e mais rápido, com qualidade no produto e na vida de quem conduz.',columns:[{title:'Plataforma',links:[['Ork','/ork/'],['OrkMind','/orkmind/'],['Modos','/docs/modos/'],['Changelog','changelog']]},{title:'Docs',links:[['Quickstart','/docs/comecar/'],['Guias','/docs/#guides'],['Referência do CLI','/docs/cli/'],['Arquitetura','/docs/arquitetura/'],['Contribuir','/docs/contribuir/']]},{title:'Orkastery',links:[['Marca','/marca/'],['GitHub','github'],['npm','npm'],['Segurança','security'],['Contato','mailto']]}],rights:'© 2026 Orkastery · MIT',pronunciation:'or-KAS-te-ree'},
 en: {nav:[['#escala','Parallelism'],['#ciclo','How it works'],['#modos','Modes'],['#prova','Proof']],docs:'Docs',talk:'Talk to us',install:'Install',languageShort:{pt:'PT',en:'EN'},copy:'copy',copied:'✓ copied',copyFailed:'× use ⌘C',copiedMessage:'Command copied.',copyFailedMessage:'Could not copy: select the command and use ⌘C.',tagline:'Mastery is building more, and faster, with quality in the product and in the life of whoever conducts.',columns:[{title:'Platform',links:[['Ork','/ork/'],['OrkMind','/orkmind/'],['Modes','/docs/modos/'],['Changelog','changelog']]},{title:'Docs',links:[['Quickstart','/docs/comecar/'],['Guides','/docs/#guides'],['CLI reference','/docs/cli/'],['Architecture','/docs/arquitetura/'],['Contribute','/docs/contribuir/']]},{title:'Orkastery',links:[['Brand','/marca/'],['GitHub','github'],['npm','npm'],['Security','security'],['Contact','mailto']]}],rights:'© 2026 Orkastery · MIT',pronunciation:'or-KAS-te-ree'}
};
export const moldura = (locale: Locale) => frame[locale];
// O e-mail institucional publicado (o único que o check:public aceita) e os destinos fora do site.
export const contato = 'maestro@orkastery.com';
export const destinosExternos: Record<string,string> = {
 changelog:'https://github.com/orkastery/orkastery/blob/main/CHANGELOG.md',
 github:'https://github.com/orkastery/orkastery',
 npm:'https://www.npmjs.com/package/@orkastery/cli',
 security:'https://github.com/orkastery/orkastery/blob/main/SECURITY.md',
 mailto:'mailto:maestro@orkastery.com'
};
