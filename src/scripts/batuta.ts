// Gesto de regencia 4/4: baixo, dentro, fora, alto. A anacruse prepara a entrada.
// A camada e independente do shader brasa.ts e nunca recebe eventos de ponteiro.
export function iniciarBatuta(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  if (!ctx || !hero) return () => {};

  const movimento = matchMedia('(prefers-reduced-motion: reduce)');
  let largura = 0;
  let altura = 0;
  let cor = '';
  let ponta = '';
  let quadro = 0;
  let anterior = 0;
  let tempo = 0;
  let visivel = false;
  let paginaAtiva = true;

  // Beziers cubicas, um tempo por segmento, em coordenadas normalizadas.
  const gesto = [
    [0.52, 0.12, 0.49, 0.34, 0.42, 0.96, 0.50, 0.86],
    [0.50, 0.86, 0.56, 0.63, 0.13, 0.50, 0.20, 0.65],
    [0.20, 0.65, 0.34, 0.85, 0.90, 0.44, 0.87, 0.59],
    [0.87, 0.59, 0.75, 0.72, 0.63, 0.05, 0.52, 0.12],
  ];

  function posicao(t: number) {
    const fase = ((t % 4) + 4) % 4;
    const p = gesto[Math.floor(fase)];
    const u = fase % 1;
    const v = 1 - u;
    return {
      x: (v ** 3 * p[0] + 3 * v * v * u * p[2] + 3 * v * u * u * p[4] + u ** 3 * p[6]) * largura,
      y: (v ** 3 * p[1] + 3 * v * v * u * p[3] + 3 * v * u * u * p[5] + u ** 3 * p[7]) * altura,
    };
  }

  function desenhar(estatico = false) {
    ctx!.clearRect(0, 0, largura, altura);
    const fase = estatico ? 3.7 : tempo / 850 - 0.7;
    const cauda = estatico ? 3.7 : Math.min(1.5, tempo / 850 + 0.08);
    ctx!.lineCap = 'round';
    ctx!.strokeStyle = cor;
    ctx!.shadowColor = cor;
    ctx!.shadowBlur = 10;
    for (let i = 0; i < 64; i++) {
      const a = posicao(fase - cauda + cauda * i / 64);
      const b = posicao(fase - cauda + cauda * (i + 1) / 64);
      ctx!.globalAlpha = 0.08 + (i / 64) ** 2 * 0.65;
      ctx!.lineWidth = 0.6 + i / 64 * 1.4;
      ctx!.beginPath();
      ctx!.moveTo(a.x, a.y);
      ctx!.lineTo(b.x, b.y);
      ctx!.stroke();
    }
    ctx!.fillStyle = ponta;
    for (let i = 0; i < 9; i++) {
      const p = posicao(fase - i * 0.024);
      const dispersao = i * 0.8;
      ctx!.globalAlpha = (1 - i / 9) * 0.85;
      ctx!.beginPath();
      ctx!.arc(p.x + Math.sin(i * 2.4) * dispersao, p.y + Math.cos(i * 1.8) * dispersao, i === 0 ? 2.2 : 0.9, 0, Math.PI * 2);
      ctx!.fill();
    }
    ctx!.globalAlpha = 1;
    ctx!.shadowBlur = 0;
  }

  function redimensionar() {
    const estilo = getComputedStyle(canvas);
    cor = estilo.getPropertyValue('--latao').trim();
    ponta = estilo.getPropertyValue('--latao-claro').trim();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    largura = canvas.clientWidth;
    altura = canvas.clientHeight;
    canvas.width = Math.round(largura * dpr);
    canvas.height = Math.round(altura * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    desenhar(movimento.matches);
  }

  function animar(agora: number) {
    tempo += anterior ? Math.min(agora - anterior, 64) : 0;
    anterior = agora;
    desenhar();
    quadro = requestAnimationFrame(animar);
  }

  function sincronizar() {
    cancelAnimationFrame(quadro);
    quadro = 0;
    anterior = 0;
    if (movimento.matches) desenhar(true);
    else if (visivel && paginaAtiva && !document.hidden) quadro = requestAnimationFrame(animar);
  }

  const intersecao = new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
    sincronizar();
  });
  const tamanho = new ResizeObserver(redimensionar);
  const suspender = () => { paginaAtiva = false; sincronizar(); };
  const retomar = () => { paginaAtiva = true; sincronizar(); };
  redimensionar();
  intersecao.observe(hero);
  tamanho.observe(canvas);
  movimento.addEventListener('change', sincronizar);
  document.addEventListener('visibilitychange', sincronizar);
  window.addEventListener('pagehide', suspender);
  window.addEventListener('pageshow', retomar);

  return () => {
    cancelAnimationFrame(quadro);
    intersecao.disconnect();
    tamanho.disconnect();
    movimento.removeEventListener('change', sincronizar);
    document.removeEventListener('visibilitychange', sincronizar);
    window.removeEventListener('pagehide', suspender);
    window.removeEventListener('pageshow', retomar);
  };
}

const canvas = document.querySelector<HTMLCanvasElement>('[data-batuta]');
if (canvas) {
  const encerrar = iniciarBatuta(canvas);
  document.addEventListener('astro:before-swap', encerrar, { once: true });
}
