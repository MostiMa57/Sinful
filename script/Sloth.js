const images = [
  'gato-images/crook-cat.png',
  'gato-images/explode-gato.png',
  'gato-images/grand-cat.png',
  'gato-images/huh.png',
  'gato-images/kripi-cat.png',
  'gato-images/lasang-gato.png',
  'gato-images/mr-fresh.png',
  'gato-images/oiia-cat.png',
  'gato-images/onde-mande.png',
  'gato-images/pop-cat.png',
  'gato-images/shocked-cat.png',
  'gato-images/shocked-gato.png',
  'gato-images/stare-cat.png',
  'gato-images/wet-cat.png'
];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinEl = document.getElementById('spin');
const resultBox = document.getElementById('result-popup');
const resultImg = document.getElementById('resultImg');
const resultName = document.getElementById('resultName');

const radius = canvas.width / 2;
const TAU = Math.PI * 2;
const arc = TAU / images.length;
let angle = 0;
let angVel = 0;
const friction = 0.991;
const loadedImages = [];
let hasShownResult = false;

// Preload images
images.forEach((src, i) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedImages[i] = img;
    if (loadedImages.filter(Boolean).length === images.length) {
      drawWheel();
      animate();
    }
  };
});

function drawWheel() {
  for (let i = 0; i < images.length; i++) {
    const startAngle = i * arc;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = i % 2 === 0 ? "#444" : "#666";
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, startAngle, startAngle + arc);
    ctx.lineTo(radius, radius);
    ctx.fill();

    const img = loadedImages[i];
    if (img) {
      const angleMid = startAngle + arc / 2;
      const imgX = radius + Math.cos(angleMid) * radius * 0.6 - 20;
      const imgY = radius + Math.sin(angleMid) * radius * 0.6 - 20;
      ctx.save();
      ctx.translate(imgX + 20, imgY + 20);
      ctx.rotate(angleMid);
      ctx.drawImage(img, -20, -20, 40, 40);
      ctx.restore();
    }
    ctx.restore();
  }
}

function animate() {
  requestAnimationFrame(animate);
  if (!angVel) return;

  angVel *= friction;
  if (angVel < 0.002) {
    angVel = 0;

    if (!hasShownResult) {
      showResult();
      hasShownResult = true;
    }
  }

  angle += angVel;
  angle %= TAU;
  canvas.style.transform = `rotate(${angle - Math.PI / 2}rad)`;
}

spinEl.addEventListener('click', () => {
  if (!angVel) {
    angVel = Math.random() * 0.3 + 0.35;
    hasShownResult = false;
    resultBox.classList.add('hidden');
  }
});

function showResult() {
  const index = Math.floor(images.length - (angle / TAU) * images.length) % images.length;
  const imgSrc = images[index];
  resultImg.src = imgSrc;
  resultName.textContent = imgSrc.split('/').pop().replace('.png', '').replace(/[-_]/g, ' ').toUpperCase();
  resultBox.classList.remove('hidden');
}
