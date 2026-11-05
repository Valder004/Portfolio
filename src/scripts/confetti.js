// Célébration de but : des confettis aux couleurs du logo.

const COLORS = ["#cc4814", "#161616", "#ffffff", "#f1f1ee", "#a83a0f"];

/** Lance des confettis depuis un point de l'écran (coordonnées de la fenêtre). */
export function burst(x, y, count = 90) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:60;pointer-events:none";
  document.body.append(canvas);

  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);

  const pieces = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 240 + Math.random() * 620;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 340,
      w: 5 + Math.random() * 7,
      h: 8 + Math.random() * 10,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  const start = performance.now();
  let last = start;
  const duration = 1500;

  (function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const t = (now - start) / duration;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.globalAlpha = Math.max(0, 1 - t * t);

    for (const p of pieces) {
      p.vy += 1150 * dt;
      p.vx *= 0.985;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.r += p.vr * dt;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (t < 1) requestAnimationFrame(frame);
    else canvas.remove();
  })(start);
}
