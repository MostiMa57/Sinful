const irisLink = document.querySelector('.iris-link');
const eye = document.querySelector('.eye');

document.addEventListener('mousemove', e => {
  const rect = eye.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const maxOffsetX = rect.width * 0.1;
  const maxOffsetY = rect.height * 0.1;

  const moveX = Math.max(-maxOffsetX, Math.min(maxOffsetX, x * 0.1));
  const moveY = Math.max(-maxOffsetY, Math.min(maxOffsetY, y * 0.1));

  irisLink.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
