import confetti from 'canvas-confetti';

export function launchVictoryConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  const credColors = ['#00FF66', '#FFB800', '#FF3366', '#8B5CF6', '#00F0FF'];

  function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: credColors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: credColors,
      zIndex: 9999,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }
  frame();
}

export function launchBurstConfetti(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { x, y },
    colors: ['#00FF66', '#00F0FF', '#FFB800', '#EC4899'],
    zIndex: 9999,
  });
}
