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

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});
