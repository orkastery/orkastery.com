// Fundo do hero: "a fundicao regida".
// Camada 1: shader WebGL de ruido fbm. Latao incandescente no arco de baixo, como a luz
//           do fosso da orquestra, e um veu de patina em cima, frio, que segura a cena.
// Camada 2: constelacao em canvas 2D (as threads da orquestra), com ligacoes de proximidade.
//
// Sem WebGL a camada 1 nao sobe e fica o gradiente CSS do hero.
// Com prefers-reduced-motion tudo congela em um quadro unico.

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- camada 1: shader ---------- */

const VERTICE = `
attribute vec2 posicao;
void main() {
  gl_Position = vec4(posicao, 0.0, 1.0);
}`;

const FRAGMENTO = `
precision highp float;
uniform vec2 u_res;
uniform float u_tempo;
uniform vec2 u_ponteiro;
uniform float u_scroll;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float ruido(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += amp * ruido(p);
    p = rot * p * 2.05;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_tempo * 0.04;

  // fluxo lento do metal, distorcido por um segundo campo
  vec2 q = vec2(fbm(p * 1.55 + t), fbm(p * 1.55 - t * 0.7));
  float campo = fbm(p * 2.1 + q * 1.35 + vec2(0.0, -t * 0.75));

  // calor concentrado no arco inferior, como a luz do fosso da orquestra.
  // O centro fica logo abaixo da borda: o brilho sobe pela metade de baixo da cena
  // e ainda aparece acima do veu que fecha a secao.
  float arco = 1.0 - distance(uv, vec2(0.5, -0.08 + u_scroll * 0.12));
  float calor = smoothstep(0.3, 1.02, arco) * 1.55;

  // sopro do ponteiro: a brasa responde a quem passa por ela
  float sopro = 1.0 - distance(uv, u_ponteiro);
  calor += smoothstep(0.74, 1.0, sopro) * 0.32;

  float brasa = campo * calor;

  // veu frio no alto: a patina que impede a cena de virar so laranja
  float frio = smoothstep(0.42, 1.0, uv.y) * (0.28 + 0.35 * campo);

  vec3 fundo = vec3(0.039, 0.035, 0.031);
  vec3 latao = vec3(0.878, 0.698, 0.392);
  vec3 ember = vec3(0.886, 0.376, 0.235);
  vec3 patina = vec3(0.435, 0.725, 0.659);

  vec3 cor = fundo;
  cor += latao * pow(brasa, 1.55) * 0.95;
  cor += ember * pow(brasa, 2.9) * 0.85;
  cor += patina * pow(frio, 2.6) * 0.16;

  // vinheta quente, para o texto ter onde pousar
  float vinheta = smoothstep(1.22, 0.42, distance(uv, vec2(0.5, 0.44)));
  cor *= mix(0.72, 1.0, vinheta);

  gl_FragColor = vec4(cor, 1.0);
}`;

function iniciarShader(hospedeiro: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.className = 'brasa-gl';
  canvas.setAttribute('aria-hidden', 'true');
  hospedeiro.prepend(canvas);

  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) {
    canvas.remove();
    hospedeiro.dataset.brasaEstado = 'sem-gl';
    return;
  }

  function compilar(tipo: number, fonte: string) {
    const shader = gl!.createShader(tipo)!;
    gl!.shaderSource(shader, fonte);
    gl!.compileShader(shader);
    return shader;
  }

  const programa = gl.createProgram()!;
  gl.attachShader(programa, compilar(gl.VERTEX_SHADER, VERTICE));
  gl.attachShader(programa, compilar(gl.FRAGMENT_SHADER, FRAGMENTO));
  gl.linkProgram(programa);
  if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) {
    canvas.remove();
    hospedeiro.dataset.brasaEstado = 'sem-gl';
    return;
  }
  gl.useProgram(programa);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const locPosicao = gl.getAttribLocation(programa, 'posicao');
  gl.enableVertexAttribArray(locPosicao);
  gl.vertexAttribPointer(locPosicao, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(programa, 'u_res');
  const uTempo = gl.getUniformLocation(programa, 'u_tempo');
  const uPonteiro = gl.getUniformLocation(programa, 'u_ponteiro');
  const uScroll = gl.getUniformLocation(programa, 'u_scroll');

  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

  function redimensionar() {
    const largura = hospedeiro.clientWidth;
    const altura = hospedeiro.clientHeight;
    canvas.width = Math.round(largura * dpr * 0.72);
    canvas.height = Math.round(altura * dpr * 0.72);
    gl!.viewport(0, 0, canvas.width, canvas.height);
  }
  redimensionar();
  window.addEventListener('resize', redimensionar, { passive: true });

  const ponteiro = { x: 0.5, y: 0.68 };
  const ponteiroSuave = { x: 0.5, y: 0.68 };
  hospedeiro.addEventListener(
    'pointermove',
    (evento) => {
      const caixa = hospedeiro.getBoundingClientRect();
      ponteiro.x = (evento.clientX - caixa.left) / caixa.width;
      ponteiro.y = 1 - (evento.clientY - caixa.top) / caixa.height;
    },
    { passive: true }
  );

  let visivel = true;
  const observador = new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
  });
  observador.observe(hospedeiro);

  let quadro = 0;
  let primeiroQuadro = true;

  function desenhar(agora: number) {
    if (visivel && !document.hidden) {
      ponteiroSuave.x += (ponteiro.x - ponteiroSuave.x) * 0.042;
      ponteiroSuave.y += (ponteiro.y - ponteiroSuave.y) * 0.042;

      const caixa = hospedeiro.getBoundingClientRect();
      const rolagem = Math.min(Math.max(-caixa.top / Math.max(caixa.height, 1), 0), 1);

      gl!.uniform2f(uRes, canvas.width, canvas.height);
      gl!.uniform1f(uTempo, agora / 1000);
      gl!.uniform2f(uPonteiro, ponteiroSuave.x, ponteiroSuave.y);
      gl!.uniform1f(uScroll, rolagem);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      if (primeiroQuadro) {
        primeiroQuadro = false;
        hospedeiro.dataset.brasaEstado = 'pronto';
      }
    }
    if (!reduzMovimento) quadro = requestAnimationFrame(desenhar);
  }

  if (reduzMovimento) {
    // um unico quadro estatico, sem laco
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTempo, 42);
    gl.uniform2f(uPonteiro, 0.5, 0.68);
    gl.uniform1f(uScroll, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    hospedeiro.dataset.brasaEstado = 'pronto';
  } else {
    quadro = requestAnimationFrame(desenhar);
  }

  window.addEventListener('pagehide', () => cancelAnimationFrame(quadro));
}

/* ---------- camada 2: constelacao ---------- */

function iniciarConstelacao(hospedeiro: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.className = 'brasa-pontos';
  canvas.setAttribute('aria-hidden', 'true');
  hospedeiro.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let largura = 0;
  let altura = 0;

  function redimensionar() {
    largura = hospedeiro.clientWidth;
    altura = hospedeiro.clientHeight;
    canvas.width = largura * dpr;
    canvas.height = altura * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  redimensionar();
  window.addEventListener('resize', redimensionar, { passive: true });

  const quantidade = Math.min(Math.round((largura * altura) / 17000), 96);

  type Ponto = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    raio: number;
    fase: number;
    fria: boolean;
  };

  // Uma em cada sete e patina: as poucas que ja viraram evidencia medida.
  const pontos: Ponto[] = Array.from({ length: quantidade }, (_, indice) => ({
    x: Math.random() * largura,
    y: Math.random() * altura,
    vx: (Math.random() - 0.5) * 0.17,
    vy: (Math.random() - 0.5) * 0.13,
    raio: 0.8 + Math.random() * 1.5,
    fase: Math.random() * Math.PI * 2,
    fria: indice % 7 === 0
  }));

  const ponteiro = { x: -9999, y: -9999 };
  hospedeiro.addEventListener(
    'pointermove',
    (evento) => {
      const caixa = hospedeiro.getBoundingClientRect();
      ponteiro.x = evento.clientX - caixa.left;
      ponteiro.y = evento.clientY - caixa.top;
    },
    { passive: true }
  );
  hospedeiro.addEventListener('pointerleave', () => {
    ponteiro.x = -9999;
    ponteiro.y = -9999;
  });

  let visivel = true;
  const observador = new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
  });
  observador.observe(hospedeiro);

  const LIMITE = 128;

  function desenhar(agora: number) {
    if (visivel && !document.hidden) {
      ctx!.clearRect(0, 0, largura, altura);

      if (!reduzMovimento) {
        for (const ponto of pontos) {
          ponto.x += ponto.vx;
          ponto.y += ponto.vy;

          // atracao suave ao ponteiro, sem grudar
          const dx = ponteiro.x - ponto.x;
          const dy = ponteiro.y - ponto.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 46000 && d2 > 420) {
            const d = Math.sqrt(d2);
            ponto.x += (dx / d) * 0.33;
            ponto.y += (dy / d) * 0.33;
          }

          if (ponto.x < -10) ponto.x = largura + 10;
          if (ponto.x > largura + 10) ponto.x = -10;
          if (ponto.y < -10) ponto.y = altura + 10;
          if (ponto.y > altura + 10) ponto.y = -10;
        }
      }

      ctx!.lineWidth = 0.7;
      for (let i = 0; i < pontos.length; i++) {
        for (let j = i + 1; j < pontos.length; j++) {
          const a = pontos[i];
          const b = pontos[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distancia = Math.hypot(dx, dy);
          if (distancia >= LIMITE) continue;
          const alfa = (1 - distancia / LIMITE) * 0.15;
          ctx!.strokeStyle =
            a.fria || b.fria
              ? `rgba(111, 185, 168, ${alfa.toFixed(3)})`
              : `rgba(224, 178, 100, ${alfa.toFixed(3)})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      for (const ponto of pontos) {
        const cintila = reduzMovimento
          ? 0.55
          : 0.38 + 0.3 * Math.sin(agora / 950 + ponto.fase);
        ctx!.fillStyle = ponto.fria
          ? `rgba(165, 219, 207, ${cintila.toFixed(3)})`
          : `rgba(244, 217, 164, ${cintila.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(ponto.x, ponto.y, ponto.raio, 0, Math.PI * 2);
        ctx!.fill();
      }
    }
    if (!reduzMovimento) requestAnimationFrame(desenhar);
  }

  if (reduzMovimento) {
    desenhar(0);
  } else {
    requestAnimationFrame(desenhar);
  }
}

/* ---------- partida ----------
   Chamado no fim do arquivo, e nao no topo: as constantes de shader sao `const`,
   e chamar antes da declaracao delas cai na zona morta temporal. */

const heroi = document.querySelector<HTMLElement>('[data-brasa]');

if (heroi) {
  iniciarShader(heroi);
  iniciarConstelacao(heroi);
}
