// Le tableau tactique de l'accueil : on trace une action au feutre, le ballon la suit.
// Au chargement, une action de démonstration montre le principe et marque un but.

import { createBall } from "./ball.js";
import { burst } from "./confetti.js";

const root = document.documentElement;
const host = document.querySelector("[data-board]");
const canvas = host?.querySelector("canvas");
const goal = host?.querySelector("[data-board-goal]");
const spot = host?.querySelector("[data-board-spot]");
const scoreEl = document.querySelector("[data-score]");
const marked = document.querySelector("[data-marked]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Le score compte aussi le but marqué en fin de page
let goals = 0;
window.addEventListener("vd:goal", () => {
  goals += 1;
  if (!scoreEl) return;
  scoreEl.textContent = goals;
  scoreEl.classList.remove("is-flip");
  void scoreEl.offsetWidth;
  scoreEl.classList.add("is-flip");
});

if (canvas && goal && spot && !reduceMotion) setup();
else marked?.classList.add("is-marked");

function setup() {
  const ctx = canvas.getContext("2d");
  const sprite = createBall(38);
  let lastBall = null;

  let ratio = 1;
  let width = 0;
  let height = 0;
  let line = [];
  let reveal = 0; // nombre de points visibles pendant la démonstration
  let ball = null; // position du ballon le long du trait
  let alpha = 1;
  let state = "idle"; // idle, drawing, demo, playing, fading
  let frame = 0;
  let pointerId = null;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    render();
  }

  const local = (el) => {
    const box = canvas.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left - box.left,
      right: rect.right - box.left,
      top: rect.top - box.top,
      bottom: rect.bottom - box.top,
      x: rect.left - box.left + rect.width / 2,
      y: rect.top - box.top + rect.height / 2,
    };
  };

  function render() {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const visible = state === "demo" ? Math.min(Math.floor(reveal), line.length) : line.length;
    if (visible > 1) {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#cc4814";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(line[0].x, line[0].y);
      for (let i = 1; i < visible; i++) ctx.lineTo(line[i].x, line[i].y);
      ctx.stroke();
    }

    if (ball) {
      if (lastBall) sprite.roll(ball.x - lastBall.x, ball.y - lastBall.y);
      lastBall = ball;
      ctx.globalAlpha = alpha * 0.28;
      ctx.fillStyle = "#161616";
      ctx.beginPath();
      ctx.ellipse(ball.x + 3, ball.y + 16, 15, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprite.canvas, ball.x - 19, ball.y - 19, 38, 38);
    } else {
      lastBall = null;
    }
    ctx.globalAlpha = 1;
  }

  function stop() {
    cancelAnimationFrame(frame);
    root.classList.remove("board-busy");
    ball = null;
    line = [];
    alpha = 1;
    state = "idle";
    render();
  }

  function fade() {
    state = "fading";
    const begin = performance.now();
    cancelAnimationFrame(frame);
    (function tick(now) {
      alpha = Math.max(0, 1 - (now - begin) / 650);
      render();
      if (alpha > 0) frame = requestAnimationFrame(tick);
      else stop();
    })(begin);
  }

  function scored() {
    goal.classList.remove("is-goal");
    void goal.offsetWidth;
    goal.classList.add("is-goal");
    const rect = goal.getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 110);
    window.dispatchEvent(new CustomEvent("vd:goal"));
    marked?.classList.add("is-marked");
  }

  function play() {
    const box = local(goal);
    const margin = 12;
    const inGoal = (p) =>
      p.x >= box.left - margin && p.x <= box.right + margin && p.y >= box.top - margin && p.y <= box.bottom + margin;
    const hit = line.findIndex(inGoal);
    const stops = hit >= 0 ? line.slice(0, hit + 1) : line;

    const lengths = [0];
    for (let i = 1; i < stops.length; i++) {
      lengths.push(lengths[i - 1] + Math.hypot(stops[i].x - stops[i - 1].x, stops[i].y - stops[i - 1].y));
    }
    const total = lengths[lengths.length - 1];
    const duration = Math.min(2600, Math.max(1000, total * 2.4));

    state = "playing";
    root.classList.add("board-busy");
    const begin = performance.now();
    cancelAnimationFrame(frame);

    (function tick(now) {
      const t = Math.min(1, (now - begin) / duration);
      const eased = t * t * (3 - 2 * t);
      const distance = eased * total;
      let i = 1;
      while (i < lengths.length - 1 && lengths[i] < distance) i++;
      const span = lengths[i] - lengths[i - 1] || 1;
      const mix = (distance - lengths[i - 1]) / span;
      ball = {
        x: stops[i - 1].x + (stops[i].x - stops[i - 1].x) * mix,
        y: stops[i - 1].y + (stops[i].y - stops[i - 1].y) * mix,
      };
      render();
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (hit >= 0) scored();
      fade();
    })(begin);
  }

  function demo() {
    if (state !== "idle") return;
    if (window.scrollY > 40) {
      marked?.classList.add("is-marked");
      root.classList.add("board-ready");
      return;
    }
    const from = local(spot);
    const to = local(goal);
    const count = 70;
    const bend = Math.min(70, height * 0.2);
    line = Array.from({ length: count + 1 }, (_, i) => {
      const t = i / count;
      return {
        x: from.x + (to.x - from.x) * t,
        y: from.y + (to.y - from.y) * t + Math.sin(t * Math.PI * 2) * bend * (1 - t * 0.3),
      };
    });
    state = "demo";
    reveal = 0;
    const begin = performance.now();

    (function tick(now) {
      reveal = ((now - begin) / 950) * line.length;
      render();
      if (reveal < line.length) {
        frame = requestAnimationFrame(tick);
        return;
      }
      root.classList.add("board-ready");
      play();
    })(begin);
  }

  canvas.addEventListener("pointerdown", (event) => {
    if (event.button) return;
    cancelAnimationFrame(frame);
    root.classList.remove("board-busy");
    root.classList.add("board-used", "board-ready");
    marked?.classList.add("is-marked");
    ball = null;
    alpha = 1;
    state = "drawing";
    const box = canvas.getBoundingClientRect();
    line = [{ x: event.clientX - box.left, y: event.clientY - box.top }];
    pointerId = event.pointerId;
    canvas.setPointerCapture(pointerId);
    render();
  });

  canvas.addEventListener("pointermove", (event) => {
    if (state !== "drawing" || event.pointerId !== pointerId) return;
    const box = canvas.getBoundingClientRect();
    const point = { x: event.clientX - box.left, y: event.clientY - box.top };
    const previous = line[line.length - 1];
    if (Math.hypot(point.x - previous.x, point.y - previous.y) < 4) return;
    line.push(point);
    render();
  });

  const release = (event) => {
    if (state !== "drawing" || event.pointerId !== pointerId) return;
    pointerId = null;
    if (line.length < 6) stop();
    else play();
  };
  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", () => {
    if (state === "drawing") stop();
  });

  new ResizeObserver(resize).observe(canvas);
  resize();

  // Laisse le temps de lire le titre avant la démonstration
  setTimeout(demo, 900);
}
