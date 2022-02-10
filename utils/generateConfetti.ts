import confetti from "canvas-confetti";

var end = Date.now() + 5 * 1000;

var colors = ["#ff1700", "#5800ff"];

export const generateConfetti = () => {
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 100,
      origin: { x: 0 },
      colors: colors,
      shapes: ["circle", "square"],
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 100,
      origin: { x: 1 },
      colors: colors,
      shapes: ["circle", "square"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
