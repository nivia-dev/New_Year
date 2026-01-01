const nomes = [
    "Ana Luíza", "Ariadna", "Beatriz", "Bruna", "Cidinha", "Claudia", "Daniela", "Elba", "Fernanda", "Hannah", "Haroldo",
    "Kailane", "Katia", "Rita", "Maíra", "Marcela", "Marília", "Murilo", "Nívia", "Patrícia", "Ricardo",
    "Rubian", "Sandra", "Valquíria"
  ];

  const cores = [
    "#FFD166", "#EF476F", "#06D6A0", "#118AB2",
    "#F4A261", "#E9C46A", "#90DBF4", "#CDB4DB",
    "#FFC8DD", "#B5E48C", "#FFB703", "#A2D2FF"
  ];

let iniciado = false;

const startOverlay = document.getElementById("startOverlay");
const music = document.getElementById("music");

startOverlay.addEventListener("click", () => {
  if (iniciado) return;

  iniciado = true;

  music.play().catch(() => {});
  startOverlay.style.display = "none";

  setTimeout(mostrarNome, tempoInicial);
});



const tempoInicial = 1500;
const tempoPorNome = 2000;

const nameEl = document.getElementById("name");
const allNamesEl = document.getElementById("allNames");
const finalMsgEl = document.getElementById("finalMessage");

let index = 0;

function mostrarNome() {
  if (index >= nomes.length) {
    mostrarTodos();
    return;
  }

  nameEl.className = "name hidden";

  setTimeout(() => {
    nameEl.textContent = nomes[index];
    nameEl.style.color = cores[index % cores.length];
    nameEl.classList.add("show");
    index++;
  }, 400);

  setTimeout(mostrarNome, tempoPorNome);
}

function mostrarTodos() {
  nameEl.style.display = "none";

  allNamesEl.innerHTML = nomes
    .map((n, i) => `<span style="color:${cores[i % cores.length]}">${n}</span>`)
    .join(" • ");

  setTimeout(() => allNamesEl.style.opacity = 1, 600);
  setTimeout(() => finalMsgEl.style.opacity = 1, 3500);
}


/* ===== MÚSICA (mobile) ===== */


/* ===== FOGOS ===== */
const canvas = document.getElementById("fogos");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const particles = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  const color = cores[Math.floor(Math.random() * cores.length)];

  for (let i = 0; i < 30; i++) {
    particles.push({
      x, y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 2 + 0.5,
      alpha: 1,
      color
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.015;

    ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();

    if (p.alpha <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return `${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255}`;
}

setInterval(() => {
    if (iniciado) createFirework();
}, 1800);
animate();

/* ===== REPLAY ===== */
document.getElementById("replayBtn").addEventListener("click", () => {
  index = 0;
  nameEl.style.display = "block";
  nameEl.className = "name hidden";
  allNamesEl.style.opacity = 0;
  finalMsgEl.style.opacity = 0;
  allNamesEl.innerHTML = "";

  const music = document.getElementById("music");
  music.currentTime = 0;
  music.play();

  setTimeout(mostrarNome, tempoInicial);
});

/* ===== FECHAR (sempre disponível) ===== */
document.getElementById("closeBtnFixed").addEventListener("click", () => {
  const music = document.getElementById("music");
  music.pause();

    document.body.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      height:100vh;
      background:#0b0f17;
      color:white;
      font-family:Segoe UI, sans-serif;
      text-align:center;
      padding:20px;
    ">
      <div>
        <h2>✨ Mensagem encerrada ✨</h2>
        <p style="opacity:0.85">
          Para continuar a conversa, volte ao WhatsApp
        </p>

        <div style="margin-top:30px; display:flex; gap:15px; justify-content:center; flex-wrap:wrap;">
          <a href="https://wa.me/" 
             style="
               padding:14px 26px;
               border-radius:30px;
               background:#25D366;
               color:#fff;
               text-decoration:none;
               font-size:1.05em;
             ">
            💬 Voltar ao WhatsApp
          </a>

          <button onclick="location.reload()" 
            style="
              padding:14px 26px;
              border-radius:30px;
              background:rgba(255,255,255,0.15);
              color:#fff;
              border:none;
              font-size:1em;
              cursor:pointer;
            ">
            🔁 Rever cartão
          </button>
        </div>
      </div>
    </div>
  `;
});