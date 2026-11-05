// Le fil de jeu : un trait de feutre relie les points [data-play] de la page.
// Au scroll, le ballon suit ce trait : il roule, fait des passes en l'air d'un aimant
// à l'autre, jongle quand on s'arrête et finit par une frappe dans le but.
//
// Attributs :
//   data-play                 point de passage, dans l'ordre du document
//   data-play-x="l|r|42"      abscisse imposée : marge gauche, marge droite ou % de la largeur
//   data-play-goal            dernier point : déclenche la célébration
//   data-play-react (parent)  élément qui reçoit .is-hit quand le ballon arrive

import { createBall } from "./ball.js";
import { burst } from "./confetti.js";

const main = document.querySelector("main");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (main?.querySelector("[data-play]")) start();

function start() {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  const defs = document.createElementNS(NS, "defs");
  const gradient = document.createElementNS(NS, "linearGradient");
  const lines = document.createElementNS(NS, "g");
  const trail = document.createElementNS(NS, "path");
  gradient.id = "play-ink";
  gradient.setAttribute("gradientUnits", "userSpaceOnUse");
  defs.append(gradient);
  for (const line of [lines, trail]) {
    line.setAttribute("fill", "none");
    line.setAttribute("stroke", "url(#play-ink)");
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("stroke-linejoin", "round");
  }
  lines.setAttribute("stroke-width", "3");
  trail.setAttribute("stroke-width", "10");
  trail.setAttribute("opacity", "0.28");
  svg.append(defs, trail, lines);
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("play-line");
  main.prepend(svg);

  const sprite = createBall(38);
  const ball = document.createElement("div");
  const shadow = document.createElement("div");
  ball.className = "play-ball";
  shadow.className = "play-ball-shadow";
  ball.setAttribute("aria-hidden", "true");
  ball.append(shadow, sprite.canvas);
  main.append(ball);
  const half = sprite.size / 2;

  let xs = [];
  let ys = [];
  let lengths = [];
  let progressTable = [];
  let stops = [];
  let flights = [];
  let chunks = [];
  let reactors = new Map();
  let total = 0;
  let current = 0;
  let velocity = 0;
  let target = 0;
  let endScroll = 1;
  let shotStart = Infinity;
  let armed = true;
  let running = false;

  // Le ballon « en vrai » : position précédente, élan et petits sauts
  let lastX = null;
  let lastY = null;
  let lastTime = 0;
  let speed = 0;
  let hop = 0;
  let hopSpeed = 0;
  let juggles = 0;
  let squash = 0;
  let flightIndex = -1;
  let keepUps = 0;
  let idleTimer;

  const GRAVITY = 1050;
  const CHUNK_POINTS = 200; // le trait est découpé : seul le morceau en cours est recalculé
  const MIN_PACE = 0.35; // même sur un passage plat, le scroll fait toujours avancer le ballon
  const MAX_SPEED = 7000; // pixels par seconde, pour ne jamais se téléporter

  const gutterX = (side, width) => {
    const padding = width >= 768 ? 32 : 20;
    const left = (width - Math.min(width, 1280)) / 2 + padding / 2;
    return side === "l" ? left : width - left;
  };

  function anchors(box, width) {
    return [...main.querySelectorAll("[data-play]")]
      .filter((el) => el.getClientRects().length > 0)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        const forced = el.dataset.playX;
        let x = rect.left + rect.width / 2 - box.left;
        if (forced === "l" || forced === "r") x = gutterX(forced, width);
        else if (forced) x = (Number(forced) / 100) * width;
        return { el, x, y: rect.top + rect.height / 2 - box.top };
      });
  }

  function build() {
    const box = main.getBoundingClientRect();
    const width = main.clientWidth;
    const height = main.scrollHeight;
    const points = anchors(box, width);
    if (points.length < 2) {
      svg.style.display = "none";
      ball.style.display = "none";
      return;
    }
    svg.style.display = "";
    ball.style.display = "";
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    // Courbe légèrement tremblée pour imiter le feutre
    xs = [];
    ys = [];
    lengths = [];
    progressTable = [];
    stops = [];
    let length = 0;
    let progress = -Infinity;
    let top = -Infinity;
    const maxLead = window.innerHeight * 0.5;
    const push = (x, y) => {
      const wobble = xs.length * 5;
      const px = x + Math.sin(wobble * 0.021 + 1.3) * 0.8 + Math.sin(wobble * 0.057) * 0.4;
      const py = y + Math.sin(wobble * 0.017 + 4.1) * 0.8 + Math.sin(wobble * 0.049 + 2) * 0.4;
      const step = xs.length ? Math.hypot(px - xs[xs.length - 1], py - ys[ys.length - 1]) : 0;
      length += step;
      xs.push(px);
      ys.push(py);
      lengths.push(length);
      // Table scroll → distance : elle suit la hauteur du trait, mais progresse toujours.
      // Sans ça, le ballon attend sur les passages plats, puis saute d'un coup.
      // Plus le ballon a de retard sur le scroll, plus ce rythme minimal diminue : il reste à l'écran.
      top = Math.max(top, py);
      const lead = Math.max(0, progress - top);
      const pace = MIN_PACE * Math.max(0.24, 1 - lead / maxLead);
      progress = xs.length === 1 ? py : Math.max(progress + step * pace, py);
      progressTable.push(progress);
    };

    // Catmull-Rom centripète : pas de boucle ni de crochet dans les virages serrés
    const gap = (a, b) => Math.max(Math.sqrt(Math.hypot(b.x - a.x, b.y - a.y)), 0.001);
    const mirror = (a, b) => ({ x: 2 * a.x - b.x, y: 2 * a.y - b.y });
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const p0 = i > 0 ? points[i - 1] : mirror(p1, p2);
      const p3 = i < points.length - 2 ? points[i + 2] : mirror(p2, p1);
      const d0 = gap(p0, p1);
      const d1 = gap(p1, p2);
      const d2 = gap(p2, p3);
      const tangent = (a, b, c, da, db) =>
        d1 * ((b - a) / da - (c - a) / (da + db) + (c - b) / db);
      const m1x = tangent(p0.x, p1.x, p2.x, d0, d1);
      const m1y = tangent(p0.y, p1.y, p2.y, d0, d1);
      const m2x = tangent(p1.x, p2.x, p3.x, d1, d2);
      const m2y = tangent(p1.y, p2.y, p3.y, d1, d2);
      stops.push({ el: p1.el, at: length });
      const steps = Math.max(4, Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / 5));
      for (let step = 0; step < steps; step++) {
        const t = step / steps;
        const t2 = t * t;
        const t3 = t2 * t;
        const h00 = 2 * t3 - 3 * t2 + 1;
        const h10 = t3 - 2 * t2 + t;
        const h01 = -2 * t3 + 3 * t2;
        const h11 = t3 - t2;
        push(h00 * p1.x + h10 * m1x + h01 * p2.x + h11 * m2x, h00 * p1.y + h10 * m1y + h01 * p2.y + h11 * m2y);
      }
    }
    const last = points[points.length - 1];
    push(last.x, last.y);
    stops.push({ el: last.el, at: length });
    total = length;

    // Ce qui réagit au ballon : un élément s'active dès son premier point de passage
    reactors = new Map();
    for (const { el, at } of stops) {
      const element = el.closest("[data-play-react]") ?? el;
      if (!reactors.has(element)) reactors.set(element, at);
    }

    // Les passes en l'air : d'un aimant à l'autre, et au-dessus du match de nuit
    flights = [];
    stops.forEach((stop, i) => {
      const next = stops[i + 1];
      if (!next) return;
      const between = next.at - stop.at;
      const tokens = stop.el.classList.contains("token") && next.el.classList.contains("token");
      const night = stop.el.closest(".lights") && next.el.closest(".lights");
      if ((tokens || night) && between > 60) {
        flights.push({ from: stop.at, to: next.at, height: Math.min(night ? 84 : 58, between * 0.16) });
      }
    });

    // Le trait, en morceaux
    lines.replaceChildren();
    chunks = [];
    for (let start = 0; start < xs.length - 1; start += CHUNK_POINTS) {
      const end = Math.min(start + CHUNK_POINTS, xs.length - 1);
      let d = "";
      for (let i = start; i <= end; i++) d += `${i === start ? "M" : "L"}${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`;
      const piece = document.createElementNS(NS, "path");
      const span = lengths[end] - lengths[start];
      piece.setAttribute("d", d);
      piece.setAttribute("stroke-dasharray", `${span} ${span}`);
      piece.setAttribute("stroke-dashoffset", span);
      lines.append(piece);
      chunks.push({ piece, from: lengths[start], to: lengths[end], span, shown: -1 });
    }

    // Trait orange, qui passe au blanc sur les aplats orange
    gradient.setAttribute("x1", 0);
    gradient.setAttribute("y1", 0);
    gradient.setAttribute("x2", 0);
    gradient.setAttribute("y2", height);
    const bands = [...main.querySelectorAll(".bg-orange")].map((el) => {
      const rect = el.getBoundingClientRect();
      return [(rect.top - box.top) / height, (rect.bottom - box.top) / height];
    });
    const offsets = [[0, "#cc4814"]];
    for (const [from, to] of bands) {
      offsets.push([from, "#cc4814"], [from, "#ffffff"], [to, "#ffffff"], [to, "#cc4814"]);
    }
    offsets.push([1, "#cc4814"]);
    gradient.replaceChildren(
      ...offsets.map(([offset, color]) => {
        const stop = document.createElementNS(NS, "stop");
        stop.setAttribute("offset", Math.min(1, Math.max(0, offset)));
        stop.setAttribute("stop-color", color);
        return stop;
      }),
    );

    // Le ballon arrive au dernier point quand celui-ci atteint 62 % de la hauteur de l'écran
    const mainTop = box.top + window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    endScroll = Math.max(1, Math.min(maxScroll - 2, mainTop + last.y - window.innerHeight * 0.62));

    // Devant le but, le ballon n'attend plus le scroll : il frappe
    const beforeLast = stops[stops.length - 2];
    const isGoal = last.el.hasAttribute("data-play-goal");
    shotStart = isGoal ? total - (total - beforeLast.at) * 0.6 : Infinity;

    if (reduceMotion) {
      for (const chunk of chunks) chunk.piece.setAttribute("stroke-dashoffset", 0);
      trail.style.display = "none";
      ball.style.display = "none";
      for (const element of reactors.keys()) element.classList.add("is-hit");
      return;
    }
    measure();
    current = Math.min(current, target);
    lastX = null;
    paint(0);
  }

  function indexAt(value, list) {
    let low = 0;
    let high = list.length - 1;
    while (low < high) {
      const middle = (low + high) >> 1;
      if (list[middle] < value) low = middle + 1;
      else high = middle;
    }
    return low;
  }

  // Position exacte entre deux points de la courbe (sinon le ballon avance par à-coups)
  function positionAt(distance) {
    const i = indexAt(distance, lengths);
    if (i === 0) return { x: xs[0], y: ys[0] };
    const span = lengths[i] - lengths[i - 1] || 1;
    const t = (distance - lengths[i - 1]) / span;
    return { x: xs[i - 1] + (xs[i] - xs[i - 1]) * t, y: ys[i - 1] + (ys[i] - ys[i - 1]) * t };
  }

  function measure() {
    const scrolled = Math.min(1, Math.max(0, window.scrollY / endScroll));
    if (scrolled >= 1) {
      target = total;
      return;
    }
    const first = progressTable[0];
    const wanted = first + scrolled * (progressTable[progressTable.length - 1] - first);
    const i = indexAt(wanted, progressTable);
    if (i === 0) {
      target = 0;
    } else {
      const span = progressTable[i] - progressTable[i - 1] || 1;
      target = lengths[i - 1] + ((wanted - progressTable[i - 1]) / span) * (lengths[i] - lengths[i - 1]);
    }
    if (target >= shotStart) target = total;
  }

  function loftAt(distance) {
    for (let i = 0; i < flights.length; i++) {
      const flight = flights[i];
      if (distance >= flight.from && distance <= flight.to) {
        const t = (distance - flight.from) / (flight.to - flight.from);
        return { height: Math.sin(Math.PI * t) * flight.height, index: i };
      }
    }
    return { height: 0, index: -1 };
  }

  function drawLine() {
    for (const chunk of chunks) {
      const offset = current >= chunk.to ? 0 : current <= chunk.from ? chunk.span : chunk.span - (current - chunk.from);
      if (offset !== chunk.shown) {
        chunk.piece.setAttribute("stroke-dashoffset", offset);
        chunk.shown = offset;
      }
    }

    // La traînée s'allonge avec la vitesse
    const tail = Math.min(280, Math.min(current, speed * 7));
    if (tail <= 6) {
      trail.style.display = "none";
      return;
    }
    const from = indexAt(current - tail, lengths);
    const to = indexAt(current, lengths);
    let d = "";
    for (let i = from; i <= to; i++) d += `${i === from ? "M" : "L"}${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`;
    trail.setAttribute("d", d);
    trail.style.display = "";
  }

  function paint(dt) {
    const { x, y } = positionAt(current);

    if (lastX !== null) sprite.roll(x - lastX, y - lastY);
    lastX = x;
    lastY = y;

    // Le ballon retombe et s'écrase un instant à la fin d'une passe
    const loft = loftAt(current);
    if (flightIndex !== loft.index) {
      if (flightIndex !== -1 && loft.index === -1) squash = 1;
      flightIndex = loft.index;
    }
    squash = Math.max(0, squash - dt * 6);

    if (hop > 0 || hopSpeed > 0) {
      hopSpeed -= GRAVITY * dt;
      hop += hopSpeed * dt;
      sprite.roll(hopSpeed * dt * 0.35, hopSpeed * dt * 0.2);
      if (hop <= 0) {
        hop = 0;
        squash = 1;
        if (juggles > 0) {
          juggles -= 1;
          hopSpeed = 225;
        } else {
          hopSpeed = 0;
          keepUps = 0;
        }
      }
    }

    const height = loft.height + hop;
    const grow = 1 + height / 150;
    const wide = 1 + squash * 0.13;
    const tall = 1 - squash * 0.13;
    ball.style.transform = `translate3d(${(x - half).toFixed(2)}px, ${(y - half).toFixed(2)}px, 0)`;
    sprite.canvas.style.transform = `translateY(${(-height * 0.62).toFixed(2)}px) scale(${(grow * wide).toFixed(3)}, ${(grow * tall).toFixed(3)})`;
    shadow.style.transform = `translate(${(height * 0.34).toFixed(2)}px, ${(height * 0.24).toFixed(2)}px) scale(${(1 - height / 220).toFixed(3)})`;
    shadow.style.opacity = Math.max(0.1, 0.38 - height / 300).toFixed(3);

    drawLine();
    for (const [element, at] of reactors) element.classList.toggle("is-hit", current >= at - 2);

    const finish = stops[stops.length - 1].el;
    if (finish.hasAttribute("data-play-goal")) {
      if (armed && current >= total - 3) {
        armed = false;
        score(finish);
      } else if (current < shotStart - 40) {
        armed = true;
      }
    }
  }

  function score(finish) {
    const goal = finish.closest("[data-goal]");
    const rect = (goal ?? finish).getBoundingClientRect();
    goal?.classList.remove("is-goal");
    void goal?.offsetWidth;
    goal?.classList.add("is-goal");
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 130);
    window.dispatchEvent(new CustomEvent("vd:goal"));
    // Le ballon rebondit dans le filet
    jump(190, 1);
  }

  function jump(power, repeats = 0) {
    hopSpeed = power;
    juggles = repeats;
    hop = Math.max(hop, 0.1);
    wakeLoop();
  }

  function moving() {
    return current !== target || Math.abs(velocity) > 2 || hop > 0 || hopSpeed > 0 || squash > 0 || speed > 0.5;
  }

  // Ressort amorti : le ballon accélère et ralentit en douceur, quelle que soit la cadence d'images
  function follow(dt) {
    const smoothTime = target === total && current >= shotStart ? 0.13 : 0.17;
    const omega = 2 / smoothTime;
    const x = omega * dt;
    const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    const limit = MAX_SPEED * smoothTime;
    const change = Math.max(-limit, Math.min(limit, current - target));
    const anchor = current - change;
    const temp = (velocity + omega * change) * dt;
    velocity = (velocity - omega * temp) * decay;
    current = anchor + (change + temp) * decay;
    if (Math.abs(target - current) < 0.3 && Math.abs(velocity) < 3) {
      current = target;
      velocity = 0;
    }
    current = Math.max(0, Math.min(total, current));
  }

  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05) || 0.016;
    lastTime = now;

    const before = current;
    follow(dt);
    speed += (Math.abs(current - before) * (0.0167 / dt) - speed) * 0.25;
    if (speed < 0.5 && current === target) speed = 0;

    paint(dt);
    if (moving()) requestAnimationFrame(loop);
    else {
      running = false;
      planIdle();
    }
  }

  function wakeLoop() {
    clearTimeout(idleTimer);
    if (running) return;
    running = true;
    lastTime = performance.now();
    requestAnimationFrame(loop);
  }

  function wake() {
    measure();
    clearTimeout(idleTimer);
    if (moving()) wakeLoop();
    else planIdle();
  }

  // À l'arrêt, s'il est à l'écran, le ballon fait quelques jongles… puis attend
  function planIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (document.documentElement.classList.contains("board-busy") || document.hidden) return;
      if (target === total && stops[stops.length - 1]?.el.hasAttribute("data-play-goal")) return;
      const rect = ball.getBoundingClientRect();
      if (rect.bottom < 80 || rect.top > window.innerHeight) return;
      jump(225, 2);
    }, 800);
  }

  // Un clic sur le ballon le relance : à 5 jongles d'affilée, c'est la fête
  document.addEventListener("pointerdown", (event) => {
    if (reduceMotion || event.target.closest("a, button, input, textarea, label")) return;
    const rect = ball.getBoundingClientRect();
    const near = Math.hypot(event.clientX - (rect.left + half), event.clientY - (rect.top + half - hop * 0.62));
    if (near > 34 + hop * 0.2) return;
    keepUps = hop > 0 ? keepUps + 1 : 1;
    jump(330);
    if (keepUps >= 5) {
      keepUps = 0;
      burst(rect.left + half, rect.top, 70);
    }
  });

  let timer;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      build();
      if (!reduceMotion) wake();
    }, 120);
  };

  build();
  if (!reduceMotion) {
    window.addEventListener("scroll", wake, { passive: true });
    wake();
    planIdle();
  }
  new ResizeObserver(rebuild).observe(main);
  window.addEventListener("resize", rebuild);
  document.fonts?.ready.then(rebuild);
}
