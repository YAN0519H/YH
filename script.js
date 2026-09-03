const canvas = document.querySelector('#fireworks');
const context = canvas.getContext('2d');
const loveButton = document.querySelector('#loveButton');
const letterButton = document.querySelector('#letterButton');
const letter = document.querySelector('#letter');
const toast = document.querySelector('#toast');
let particles = [];
let width = 0;
let height = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function burst(x, y, color = '#ff8eae', count = 42) {
  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count;
    const speed = 1.4 + Math.random() * 3.5;
    particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, color, size: 1 + Math.random() * 2 });
  }
}

function animate() {
  context.clearRect(0, 0, width, height);
  particles = particles.filter((particle) => particle.life > 0.02);
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.035;
    particle.vx *= 0.985;
    particle.life *= 0.965;
    context.globalAlpha = particle.life;
    context.fillStyle = particle.color;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();
  });
  context.globalAlpha = 1;
  requestAnimationFrame(animate);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

window.addEventListener('resize', resizeCanvas);
loveButton.addEventListener('click', () => {
  burst(width * 0.25, height * 0.29, '#ff9fbd');
  burst(width * 0.72, height * 0.25, '#b6a1ff');
  burst(width * 0.52, height * 0.17, '#ffd0a6');
  showToast('这一刻，整片星河都在为你闪耀 ✦');
});
letterButton.addEventListener('click', () => {
  letter.classList.remove('reveal');
  void letter.offsetWidth;
  letter.classList.add('reveal');
  letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
window.addEventListener('pointerdown', (event) => {
  if (event.target.closest('button')) return;
  burst(event.clientX, event.clientY, Math.random() > 0.5 ? '#ff8eae' : '#a98aff', 25);
});
resizeCanvas();
animate();
window.setTimeout(() => burst(width * 0.78, height * 0.22, '#ffad9e', 36), 650);
