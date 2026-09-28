// A regencia da pagina: tudo que se move fora de um componente especifico.
// Um observador para revelar, um laco de rolagem para progresso e paralaxe,
// um laco de ponteiro para o holofote das superficies. Nada de biblioteca.
//
// Sem JS a pagina inteira aparece pronta. Com prefers-reduced-motion, tudo
// chega no estado final e nenhum laco continuo e armado.

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- revelacao ao rolar ---------- */

const alvos = document.querySelectorAll<HTMLElement>('.revela, .revela-corte, .escalona');

if ('IntersectionObserver' in window && alvos.length > 0) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  for (const alvo of alvos) observador.observe(alvo);
} else {
  for (const alvo of alvos) alvo.classList.add('visivel');
}

/* ---------- contadores ---------- */

function animarContador(elemento: HTMLElement) {
  const alvo = Number(elemento.dataset.contador ?? '0');
  if (reduzMovimento || alvo === 0) {
    elemento.textContent = String(alvo);
    return;
  }
  const duracao = 1500;
  const inicio = performance.now();
  function passo(agora: number) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const suave = 1 - Math.pow(1 - progresso, 4);
    elemento.textContent = String(Math.round(alvo * suave));
    if (progresso < 1) requestAnimationFrame(passo);
  }
  requestAnimationFrame(passo);
}

const contadores = document.querySelectorAll<HTMLElement>('[data-contador]');

if (contadores.length > 0 && 'IntersectionObserver' in window) {
  const obsContador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        animarContador(entrada.target as HTMLElement);
        obsContador.unobserve(entrada.target);
      }
    },
    { threshold: 0.4 }
  );
  for (const contador of contadores) obsContador.observe(contador);
} else {
  for (const contador of contadores) animarContador(contador);
}

/* ---------- copiar comando ---------- */

for (const botao of document.querySelectorAll<HTMLButtonElement>('[data-copiar]')) {
  const rotuloOriginal = botao.textContent ?? 'copiar';
  botao.addEventListener('click', async () => {
    const texto = botao.dataset.copiar ?? '';
    try {
      await navigator.clipboard.writeText(texto);
      botao.textContent = 'copiado';
      botao.dataset.copiado = 'sim';
      window.setTimeout(() => {
        botao.textContent = rotuloOriginal;
        delete botao.dataset.copiado;
      }, 1700);
    } catch {
      // area de transferencia indisponivel: o texto segue selecionavel na tela
      botao.textContent = 'selecione e copie';
      window.setTimeout(() => {
        botao.textContent = rotuloOriginal;
      }, 2200);
    }
  });
}

/* ---------- holofote das superficies ----------
   Uma escuta so, no documento, com um quadro de atraso. Cada superficie
   recebe a posicao relativa do ponteiro em variaveis proprias. */

if (!reduzMovimento && window.matchMedia('(hover: hover)').matches) {
  let pendente = false;
  let ultimoEvento: PointerEvent | null = null;

  function aplicarHolofote() {
    pendente = false;
    const evento = ultimoEvento;
    if (!evento) return;
    const alvo = (evento.target as HTMLElement | null)?.closest<HTMLElement>(
      '.painel, [data-holofote]'
    );
    if (!alvo) return;
    const caixa = alvo.getBoundingClientRect();
    alvo.style.setProperty('--mx', `${((evento.clientX - caixa.left) / caixa.width) * 100}%`);
    alvo.style.setProperty('--my', `${((evento.clientY - caixa.top) / caixa.height) * 100}%`);
  }

  document.addEventListener(
    'pointermove',
    (evento) => {
      ultimoEvento = evento;
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(aplicarHolofote);
    },
    { passive: true }
  );
}

/* ---------- laco de rolagem: progresso, cabecalho e paralaxe ---------- */

const barraProgresso = document.querySelector<HTMLElement>('[data-progresso]');
const cabecalho = document.querySelector<HTMLElement>('[data-cabecalho]');
const camadasParalaxe = Array.from(
  document.querySelectorAll<HTMLElement>('[data-paralaxe]')
);

let aguardandoQuadro = false;

function aoRolar() {
  aguardandoQuadro = false;
  const topo = window.scrollY;

  if (barraProgresso) {
    const rolavel = document.documentElement.scrollHeight - window.innerHeight;
    const fracao = rolavel > 0 ? Math.min(topo / rolavel, 1) : 0;
    barraProgresso.style.setProperty('--progresso', fracao.toFixed(4));
  }

  if (cabecalho) {
    cabecalho.classList.toggle('cabecalho-descolado', topo > 12);
  }

  if (!reduzMovimento) {
    const altura = window.innerHeight;
    for (const camada of camadasParalaxe) {
      const caixa = camada.getBoundingClientRect();
      if (caixa.bottom < -200 || caixa.top > altura + 200) continue;
      const fator = Number(camada.dataset.paralaxe || '10');
      const centro = caixa.top + caixa.height / 2 - altura / 2;
      camada.style.setProperty('--paralaxe', String(-(centro / altura) * fator));
    }
  }
}

function agendarRolagem() {
  if (aguardandoQuadro) return;
  aguardandoQuadro = true;
  requestAnimationFrame(aoRolar);
}

window.addEventListener('scroll', agendarRolagem, { passive: true });
window.addEventListener('resize', agendarRolagem, { passive: true });
aoRolar();

/* ---------- pausa de animacao fora de cena ----------
   Marca cada bloco marcado com [data-anima] como fora de cena, para que o CSS
   possa parar a animacao e nao gastar quadro com o que ninguem esta vendo. */

const blocosAnimados = document.querySelectorAll<HTMLElement>('[data-anima]');

if (blocosAnimados.length > 0 && 'IntersectionObserver' in window) {
  const obsAnima = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        (entrada.target as HTMLElement).dataset.emCena = entrada.isIntersecting ? 'sim' : 'nao';
      }
    },
    { rootMargin: '120px' }
  );
  for (const bloco of blocosAnimados) obsAnima.observe(bloco);
} else {
  for (const bloco of blocosAnimados) bloco.dataset.emCena = 'sim';
}
