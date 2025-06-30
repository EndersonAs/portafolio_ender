/*--------------------------------------------------------*/
// script Fondo Animado
const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d');

let width, height;
let points = [];
const pointCount = 80;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function initPoints() {
  points = [];
  for (let i = 0; i < pointCount; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
}

function drawLines() {
  for (let i = 0; i < pointCount; i++) {
    for (let j = i + 1; j < pointCount; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = dx * dx + dy * dy;
      if (dist < 20000) {
        ctx.strokeStyle = `rgba(222, 222, 222, ${1 - dist / 20000})`;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }
}

function updatePoints() {
  for (let p of points) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawLines();
  updatePoints();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initPoints();
});

resizeCanvas();
initPoints();
animate();

/*--------------------------------------------------------*/
// script Navbar burguer
const burger = document.getElementById('burger-menu');
const nav = document.querySelector('.navbar');
const links = document.querySelectorAll('.navbar a');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Cuando haga clic en cualquier enlace del nav, se cierra el menú
links.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

/*--------------------------------------------------------*/
// script Splash Screen con gráfico + puntos + ejes simulados
const graphCanvas = document.getElementById('graphCanvas');
const graphCtx = graphCanvas.getContext('2d');

function resizeGraphCanvas() {
  graphCanvas.width = window.innerWidth;
  graphCanvas.height = window.innerHeight;
}
resizeGraphCanvas();
window.addEventListener('resize', () => {
  resizeGraphCanvas();
  initDataPoints();
});

let dataPoints = [];
const maxPoints = 50;

function initDataPoints() {
  dataPoints = [];
  for (let i = 0; i < maxPoints; i++) {
    dataPoints.push(Math.random() * graphCanvas.height * 0.6 + graphCanvas.height * 0.2);
  }
}
initDataPoints();

function drawAxesAndLabels() {
  graphCtx.strokeStyle = 'rgba(255,255,255,0.1)';
  graphCtx.lineWidth = 1;
  graphCtx.font = "12px sans-serif";
  graphCtx.fillStyle = "rgba(255,255,255,0.5)";

  // Líneas horizontales + etiquetas
  let numHLines = 6;
  for (let i = 1; i < numHLines; i++) {
    let y = (graphCanvas.height / numHLines) * i;
    graphCtx.beginPath();
    graphCtx.moveTo(0, y);
    graphCtx.lineTo(graphCanvas.width, y);
    graphCtx.stroke();

    // etiquetas simuladas
    let label = "$" + ((numHLines - i) * 10) + "K";
    graphCtx.fillText(label, 5, y - 5);
  }

  // Líneas verticales + etiquetas
  let numVLines = 10;
  for (let i = 1; i < numVLines; i++) {
    let x = (graphCanvas.width / numVLines) * i;
    graphCtx.beginPath();
    graphCtx.moveTo(x, 0);
    graphCtx.lineTo(x, graphCanvas.height);
    graphCtx.stroke();

    // etiquetas simuladas
    let year = 2020 + i;
    graphCtx.fillText(year, x - 10, graphCanvas.height - 5);
  }
}

function drawGraphUpTo(upto) {
  graphCtx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  drawAxesAndLabels();

  graphCtx.beginPath();
  graphCtx.moveTo(0, graphCanvas.height - dataPoints[0]);

  for (let i = 1; i < upto; i++) {
    let x = (graphCanvas.width / maxPoints) * i;
    let y = graphCanvas.height - dataPoints[i];
    graphCtx.lineTo(x, y);
  }

  graphCtx.strokeStyle = 'white';
  graphCtx.lineWidth = 2;
  graphCtx.stroke();

  // Relleno
  if (upto > 0) {
    graphCtx.lineTo((graphCanvas.width / maxPoints) * (upto - 1), graphCanvas.height);
    graphCtx.lineTo(0, graphCanvas.height);
    graphCtx.closePath();
    graphCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    graphCtx.fill();
  }

  // Dibujar puntos
  graphCtx.fillStyle = 'white';
  for (let i = 0; i < upto; i++) {
    let x = (graphCanvas.width / maxPoints) * i;
    let y = graphCanvas.height - dataPoints[i];
    graphCtx.beginPath();
    graphCtx.arc(x, y, 3, 0, Math.PI * 2);
    graphCtx.fill();
  }
}

let currentPoint = 0;
let speed = 0.3; // controla velocidad

function animateGraph() {
  if (currentPoint < maxPoints) {
    currentPoint += speed;
    let drawUpTo = Math.floor(currentPoint);
    drawGraphUpTo(drawUpTo);
    requestAnimationFrame(animateGraph);
  } else {
    finishSplash();
  }
}

function finishSplash() {
  document.getElementById('splash').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('portfolio').style.display = 'block';
  }, 500);
}

animateGraph();

/*--------------------------------------------------------*/
