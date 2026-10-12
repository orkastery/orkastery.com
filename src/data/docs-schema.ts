export type Locale = 'pt' | 'en' | 'es';
// highlight: o que muda para quem já usa, com tratamento visual próprio, logo abaixo do título da seção.
export interface Highlight { title: string; paragraphs: string[]; items?: string[]; }
export interface Section { id: string; title: string; paragraphs: string[]; highlight?: Highlight; code?: string; items?: string[]; links?: {label: string; href: string}[]; }
export interface Translation { title: string; description: string; sections: Section[]; }
export interface Article { slug: string; group: string; sources: string[]; diagram?: string; translations: Record<Locale, Translation>; }
