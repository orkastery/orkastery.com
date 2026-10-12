// Página da marca: a amostra de cor copia o hex e o botão do trecho copia o <head> das fontes, como
// no Brand Kit do kit. O rótulo vira "✓ copiado" por 1,6 s; se a área de transferência recusar,
// "× use ⌘C" (Ctrl+C fora dos sistemas da Apple).
const atalho = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent) ? '⌘C' : 'Ctrl+C';
async function copiar(texto: string) {
 try { if (!navigator.clipboard) throw new Error('sem clipboard'); await navigator.clipboard.writeText(texto); return true; } catch { return false; }
}
const aviso = document.querySelector<HTMLElement>('[data-aviso]');
let voltaAmostra = 0;
for (const amostra of document.querySelectorAll<HTMLElement>('[data-amostra]')) {
 amostra.addEventListener('click', async () => {
  const hex = amostra.dataset.hex || '', ok = await copiar(hex);
  for (const outra of document.querySelectorAll<HTMLElement>('[data-amostra]')) {
   const rotulo = outra.querySelector<HTMLElement>('[data-rotulo]');
   if (rotulo) rotulo.textContent = outra === amostra ? ((ok ? outra.dataset.ok : outra.dataset.falha) || '').replace('⌘C', atalho) : outra.dataset.hex || '';
  }
  if (aviso) aviso.textContent = ok ? (aviso.dataset.copiado || '').replace('{hex}', hex) : (amostra.dataset.falha || '').replace('⌘C', atalho);
  clearTimeout(voltaAmostra);
  voltaAmostra = window.setTimeout(() => {
   for (const outra of document.querySelectorAll<HTMLElement>('[data-amostra]')) { const rotulo = outra.querySelector<HTMLElement>('[data-rotulo]'); if (rotulo) rotulo.textContent = outra.dataset.hex || ''; }
   if (aviso) aviso.textContent = aviso.dataset.padrao || '';
  }, 1600);
 });
}
for (const botao of document.querySelectorAll<HTMLElement>('[data-copiar-trecho]')) {
 let volta = 0;
 botao.addEventListener('click', async () => {
  const trecho = botao.closest('.trecho')?.querySelector('pre')?.textContent || '', ok = await copiar(trecho);
  botao.textContent = ((ok ? botao.dataset.ok : botao.dataset.falha) || '').replace('⌘C', atalho);
  botao.dataset.estado = ok ? 'ok' : 'falha';
  const status = botao.parentElement?.querySelector<HTMLElement>('[data-status]');
  if (status) status.textContent = ((ok ? botao.dataset.msgOk : botao.dataset.msgFalha) || '').replace('⌘C', atalho);
  clearTimeout(volta);
  volta = window.setTimeout(() => { botao.textContent = botao.dataset.rotulo || ''; delete botao.dataset.estado; if (status) status.textContent = ''; }, 1600);
 });
}
