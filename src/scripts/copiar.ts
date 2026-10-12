// Botão de instalação: copia o comando. Como no design, o rótulo vale para todos os botões da página
// e volta a "copiar" depois de 1,8 s. Se a área de transferência recusar, o rótulo diz que falhou e
// a mensagem para leitor de tela manda copiar à mão (o design mostraria "copiado" mesmo assim).
let volta = 0;
function rotular(chave: 'rotulo' | 'rotuloOk' | 'rotuloFalha', origem: HTMLElement, mensagem: string) {
 for (const botao of document.querySelectorAll<HTMLElement>('[data-copiar]')) {
  const pilula = botao.querySelector<HTMLElement>('[data-pilula]');
  if (pilula) pilula.textContent = botao.dataset[chave] || '';
 }
 const status = origem.parentElement?.querySelector<HTMLElement>('[data-status]');
 if (status) status.textContent = mensagem;
}
for (const botao of document.querySelectorAll<HTMLElement>('[data-copiar]')) {
 botao.addEventListener('click', async () => {
  const texto = botao.dataset.copiar || '';
  let ok = true;
  try { if (!navigator.clipboard) throw new Error('sem clipboard'); await navigator.clipboard.writeText(texto); } catch { ok = false; }
  rotular(ok ? 'rotuloOk' : 'rotuloFalha', botao, (ok ? botao.dataset.msgOk : botao.dataset.msgFalha) || '');
  clearTimeout(volta);
  volta = window.setTimeout(() => rotular('rotulo', botao, ''), 1800);
 });
}
