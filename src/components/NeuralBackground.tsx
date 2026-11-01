import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1 };
type Pulse = { from: number; to: number; t: number; speed: number };

const LINK_DISTANCE = 170;

/** Agent-graph backdrop: drifting nodes, with messages travelling along the edges between them. */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let frame = 0;
    let lastSpawn = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(72, Math.max(26, Math.round((width * height) / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1.2 + Math.random() * 1.6,
        hue: Math.random() > 0.5 ? 1 : 0,
      }));
      pulses = [];
    };

    const palette = () =>
      document.documentElement.classList.contains("dark")
        ? { violet: "167,139,250", sky: "56,189,248", edge: 0.17, node: 0.75 }
        : { violet: "109,40,217", sky: "14,165,233", edge: 0.14, node: 0.5 };

    const spawnPulse = () => {
      const from = Math.floor(Math.random() * nodes.length);
      const near: number[] = [];
      nodes.forEach((n, i) => {
        if (i !== from && Math.hypot(n.x - nodes[from].x, n.y - nodes[from].y) < LINK_DISTANCE) near.push(i);
      });
      if (near.length) {
        pulses.push({ from, to: near[Math.floor(Math.random() * near.length)], t: 0, speed: 0.008 + Math.random() * 0.01 });
      }
    };

    const draw = () => {
      const colors = palette();
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${nodes[i].hue ? colors.sky : colors.violet},${colors.edge * (1 - dist / LINK_DISTANCE)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.hue ? colors.sky : colors.violet},${colors.node})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of pulses) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 9);
        glow.addColorStop(0, `rgba(${colors.sky},0.95)`);
        glow.addColorStop(1, `rgba(${colors.sky},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (now: number) => {
      for (const n of nodes) {
        // Nodes lean gently away from the cursor, then settle back into their drift.
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        const push = dist < 140 && dist > 0 ? ((140 - dist) / 140) * 0.5 : 0;
        n.x += n.vx + (push * dx) / (dist || 1);
        n.y += n.vy + (push * dy) / (dist || 1);
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      if (now - lastSpawn > 380 && pulses.length < 14) {
        spawnPulse();
        lastSpawn = now;
      }
      pulses = pulses.filter((p) => (p.t += p.speed) < 1);

      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion) draw();
      else if (!document.hidden) frame = requestAnimationFrame(step);
    };
    const onResize = () => {
      resize();
      start();
    };
    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    // The reduced-motion frame is static, so repaint it when the theme changes.
    const themeObserver = new MutationObserver(() => reduceMotion && draw());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
