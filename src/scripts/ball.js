// Le ballon : un vrai ballon de football en 3D (icosaèdre tronqué : 12 pentagones noirs),
// dessiné sur un petit canvas. Il tourne sur lui-même selon la distance qu'il parcourt.

const PHI = (1 + Math.sqrt(5)) / 2;

function normalize([x, y, z]) {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
}

function buildGeometry() {
  const corners = [];
  for (const a of [-1, 1]) {
    for (const b of [-PHI, PHI]) {
      corners.push([0, a, b], [a, b, 0], [b, 0, a]);
    }
  }

  const points = [];
  const seams = [];
  const around = corners.map(() => []);

  corners.forEach((a, i) => {
    corners.forEach((b, j) => {
      if (j <= i || Math.abs(Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) - 2) > 0.01) return;
      const near = normalize(a.map((value, k) => (value * 2 + b[k]) / 3));
      const far = normalize(a.map((value, k) => (value + b[k] * 2) / 3));
      const first = points.push(near) - 1;
      const second = points.push(far) - 1;
      around[i].push(first);
      around[j].push(second);
      seams.push([first, second]);
    });
  });

  // Range les 5 points de chaque pentagone dans l'ordre, autour de son centre
  const pentagons = corners.map((corner, i) => {
    const center = normalize(corner);
    const helper = Math.abs(center[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
    const u = normalize([
      center[1] * helper[2] - center[2] * helper[1],
      center[2] * helper[0] - center[0] * helper[2],
      center[0] * helper[1] - center[1] * helper[0],
    ]);
    const v = [
      center[1] * u[2] - center[2] * u[1],
      center[2] * u[0] - center[0] * u[2],
      center[0] * u[1] - center[1] * u[0],
    ];
    const angle = (index) => {
      const p = points[index];
      return Math.atan2(p[0] * v[0] + p[1] * v[1] + p[2] * v[2], p[0] * u[0] + p[1] * u[1] + p[2] * u[2]);
    };
    const ring = [...around[i]].sort((a, b) => angle(a) - angle(b));
    ring.forEach((index, k) => seams.push([index, ring[(k + 1) % ring.length]]));
    return { center: points.push(center) - 1, ring };
  });

  return { points, seams, pentagons };
}

const GEOMETRY = buildGeometry();

export function createBall(size = 38) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size * ratio;
  canvas.style.width = canvas.style.height = `${size}px`;
  canvas.setAttribute("aria-hidden", "true");

  const ctx = canvas.getContext("2d");
  const radius = size / 2;
  const roundness = radius - 1;
  const moved = GEOMETRY.points.map(() => [0, 0, 0]);

  // Orientation de départ (quaternion), pour montrer un pentagone de trois quarts
  let q = [0.86, 0.32, 0.28, 0.27];

  function draw() {
    const [w, x, y, z] = q;
    const m = [
      1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y),
      2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x),
      2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y),
    ];
    GEOMETRY.points.forEach(([px, py, pz], i) => {
      const out = moved[i];
      out[0] = m[0] * px + m[1] * py + m[2] * pz;
      out[1] = m[3] * px + m[4] * py + m[5] * pz;
      out[2] = m[6] * px + m[7] * py + m[8] * pz;
    });

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, roundness, 0, Math.PI * 2);
    ctx.fillStyle = "#fbfaf6";
    ctx.fill();
    ctx.clip();

    const sx = (p) => radius + p[0] * roundness;
    const sy = (p) => radius + p[1] * roundness;

    ctx.strokeStyle = "rgb(22 22 22 / 0.5)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (const [a, b] of GEOMETRY.seams) {
      if (moved[a][2] < 0 || moved[b][2] < 0) continue;
      ctx.moveTo(sx(moved[a]), sy(moved[a]));
      ctx.lineTo(sx(moved[b]), sy(moved[b]));
    }
    ctx.stroke();

    ctx.fillStyle = "#161616";
    for (const pentagon of GEOMETRY.pentagons) {
      if (moved[pentagon.center][2] < -0.05) continue;
      ctx.beginPath();
      pentagon.ring.forEach((index, k) => {
        const p = moved[index];
        // Les points passés derrière restent collés au bord du ballon
        const scale = p[2] < 0 ? 1 / Math.max(Math.hypot(p[0], p[1]), 0.01) : 1;
        const px = radius + p[0] * scale * roundness;
        const py = radius + p[1] * scale * roundness;
        if (k) ctx.lineTo(px, py);
        else ctx.moveTo(px, py);
      });
      ctx.closePath();
      ctx.fill();
    }

    // Le volume : la lumière ne tourne pas avec le ballon
    const shade = ctx.createRadialGradient(radius * 0.72, radius * 0.6, radius * 0.1, radius, radius, radius * 1.08);
    shade.addColorStop(0, "rgb(255 255 255 / 0.32)");
    shade.addColorStop(0.55, "rgb(255 255 255 / 0)");
    shade.addColorStop(1, "rgb(22 22 22 / 0.42)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, size, size);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(radius, radius, roundness, 0, Math.PI * 2);
    ctx.strokeStyle = "#161616";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  /** Fait rouler le ballon : (dx, dy) est son déplacement à l'écran, en pixels. */
  function roll(dx, dy) {
    const distance = Math.hypot(dx, dy);
    if (distance < 0.01) return;
    const half = distance / roundness / 2;
    const s = Math.sin(half) / distance;
    const a = [Math.cos(half), -dy * s, dx * s, 0];
    const [aw, ax, ay, az] = a;
    const [bw, bx, by, bz] = q;
    const next = [
      aw * bw - ax * bx - ay * by - az * bz,
      aw * bx + ax * bw + ay * bz - az * by,
      aw * by - ax * bz + ay * bw + az * bx,
      aw * bz + ax * by - ay * bx + az * bw,
    ];
    const length = Math.hypot(...next);
    q = next.map((value) => value / length);
    draw();
  }

  draw();
  return { canvas, roll, size };
}
