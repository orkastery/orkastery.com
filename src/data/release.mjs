// A versão do CLI que o site descreve mora só aqui. Para outra release, troque este número:
// a home, as docs (pelo marcador {versao} no texto editorial) e as checagens seguem dele.
export const versao = '0.5.5';
export const marcadorDeVersao = '{versao}';
// O texto revisado guarda o marcador, não o número: trocar a versão não invalida a revisão editorial.
export const comVersao = text => String(text).replaceAll(marcadorDeVersao, versao);
