# orkastery-web

O portal da Orkastery: a organização de código aberto e o produto Ork, a AI Software
Factory. Quatro rotas estáticas, um único tema escuro deliberado, conteúdo extraído dos
documentos reais do núcleo.

## Rotas

| Rota | O que mostra |
|---|---|
| `/` | A organização: manifesto, as três camadas, o ciclo de seis fases, números com comando de prova, ecossistema e contato |
| `/ork/` | O produto: instalação via npm, fases, modos por #TAG, verificação de claims, threads paralelas, gate de tokens, radar HITL, auditores, score e adaptadores |
| `/docs/` | Guia do usuário: instalação, primeira entrega, uso nativo no Claude Code/Codex, acompanhamento, verificação, memória e problemas comuns |
| `/orkmind/` | Ponte para o site próprio do OrkMind (https://orkmind.com), sem duplicar conteúdo |
| `/versao.json` | O commit que gerou o build publicado |

## Stack

- Astro 5 com saída estática e zero framework de UI
- CSS autoral com custom properties, sem biblioteca de animação
- Hero em WebGL autoral (shader de ruído fbm) com fallback estático e respeito a
  `prefers-reduced-motion`
- Diagramas interativos em SVG e CSS, com teclado e leitores de tela atendidos

## Sistema de design: "a fundição regida"

Um chão de carvão morno, latão como acento de condução, brasa como calor e falha,
pátina como o contrapeso frio do que é determinístico. A cor carrega sentido: no
diagrama das três camadas o pedido desce em latão e a evidência sobe em pátina; nos
doze motivos de gate, latão é o que a máquina reexecuta e brasa é o que sobe para
gente.

| Papel | Token | Valor |
|---|---|---|
| Poço, palco, painel, relevo | `--poco` … `--relevo` | `#0a0908` → `#211d19` |
| Tinta (três degraus legíveis) | `--tinta`, `--tinta-2`, `--tinta-3` | `#f5f1ea`, `#b3aaa0`, `#968e84` |
| Traço e borda, nunca texto | `--tinta-4` | `#5d564f` |
| Condução, verificado | `--latao` | `#e0b264` |
| Calor, alerta, falha | `--brasa` | `#e2603c` |
| Determinístico, medido | `--patina` | `#6fb9a8` |

Todo texto do site fica acima de 5:1 de contraste sobre qualquer superfície da paleta.

### Tipografia

Um único display em toda a superfície: **Fraunces** variável, com o eixo de tamanho
óptico calibrado por tamanho (`opsz` 144 no título, 28 no subtítulo, 30 na marca) para
que o mesmo tipo tenha alto contraste no grande e forma robusta no pequeno. **Instrument
Sans** para interface e texto, **Geist Mono** para código e micro-rótulos. Tudo
self-host via Fontsource, com precarga do corte latino que pinta o primeiro quadro.

### Movimento

Um observador revela ao rolar, um laço de rolagem cuida de progresso e paralaxe, e um
laço de ponteiro move o holofote das superfícies. Blocos marcados com `data-anima`
param de animar fora de cena. Sem JS a página aparece pronta; com
`prefers-reduced-motion` nenhum laço contínuo é armado.

## Desenvolvimento

```bash
npm install
npm run dev        # servidor local
npm run build      # gera dist/
```

## Publicação: teste, aprovação e produção

O site é publicado em https://orkastery.com pelo GitHub Pages, e só quando uma versão é
promovida. Um push na `main` não publica nada.

- **Ver antes:** `npm run build && npm run preview` mostra exatamente o build que vai ao ar.
- **Versão:** todo build publica `/versao.json` com o SHA e a data do commit. É assim que se
  confere que a produção recebeu exatamente o commit aprovado.
- **Promover:** criar a tag `producao-AAAAMMDD-HHMM` no commit aprovado. O workflow
  `.github/workflows/publicar.yml` compila esse commit, confere o `/versao.json` e publica.
- **Desfazer:** promover de novo o commit da promoção anterior (tag nova apontando para ele),
  ou rodar o workflow à mão com o `ref` desejado.
- **Links ainda fechados:** o que ainda não é público aparece como "em breve". A chave fica em
  `src/data/externos.ts`.
