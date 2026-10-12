// Comando copiável (kit Partitura): "copiar" vira "✓ copiado" por 1,6 s; se a área de
// transferência recusar, "× use ⌘C" (Ctrl+C fora dos sistemas da Apple) e a mensagem para leitor
// de tela manda copiar à mão. Como no HTML da home, o rótulo vale para todos os botões da página.
let volta = 0;
const atalho = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent) ? '⌘C' : 'Ctrl+C';
function rotular(estado: 'pronto' | 'ok' | 'falha', origem: HTMLElement, mensagem: string) {
 for (const botao of document.querySelectorAll<HTMLElement>('[data-copiar]')) {
  const pilula = botao.querySelector<HTMLElement>('[data-pilula]');
  const rotulo = estado === 'ok' ? botao.dataset.rotuloOk : estado === 'falha' ? botao.dataset.rotuloFalha : botao.dataset.rotulo;
  if (pilula) pilula.textContent = (rotulo || '').replace('⌘C', atalho);
  if (estado === 'pronto') delete botao.dataset.estado; else botao.dataset.estado = estado;
 }
 const status = origem.parentElement?.querySelector<HTMLElement>('[data-status]');
 if (status) status.textContent = mensagem.replace('⌘C', atalho);
}
for (const botao of document.querySelectorAll<HTMLElement>('[data-copiar]')) {
 botao.addEventListener('click', async () => {
  const texto = botao.dataset.copiar || '';
  let ok = true;
  try { if (!navigator.clipboard) throw new Error('sem clipboard'); await navigator.clipboard.writeText(texto); } catch { ok = false; }
  rotular(ok ? 'ok' : 'falha', botao, (ok ? botao.dataset.msgOk : botao.dataset.msgFalha) || '');
  clearTimeout(volta);
  volta = window.setTimeout(() => rotular('pronto', botao, ''), 1600);
 });
}
