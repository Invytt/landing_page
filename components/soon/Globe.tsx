"use client";

import { useEffect, useRef } from "react";
import { isLite, isTouch } from "@/lib/perf";

/* A dotted globe on a 2D canvas: turns slowly on its own, can be dragged,
   and pins pulse over Indian cities. Light enough to run on phones. */

const CITIES: [number, number][] = [
  [19.08, 72.88], // Mumbai
  [28.61, 77.21], // Delhi
  [12.97, 77.59], // Bengaluru
  [22.57, 88.36], // Kolkata
  [13.08, 80.27], // Chennai
  [17.39, 78.49], // Hyderabad
  [18.52, 73.86], // Pune
  [26.91, 75.79], // Jaipur
  [15.3, 74.12], // Goa
  [20.3, 85.82], // Bhubaneswar
  [9.93, 76.27], // Kochi
  [23.02, 72.57], // Ahmedabad
];
const PIN_COLORS = ["#D2402A", "#FF9A5C", "#3CCFBF", "#CDBEF7", "#FFD6A5", "#8FD9B6"];

const rad = (d: number) => (d * Math.PI) / 180;

export default function Globe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches || isLite();
    const touch = isTouch();

    // evenly spread points on a sphere (fewer on phones; at their size the
    // globe reads the same)
    const N = touch ? 900 : 1500;
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    const pins = CITIES.map(([lat, lon], i) => {
      const la = rad(lat);
      const lo = rad(lon);
      return { v: [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)] as const, c: PIN_COLORS[i % PIN_COLORS.length], phase: i * 0.7 };
    });

    // start facing India
    let yaw = -rad(79);
    let pitch = rad(14);
    let vel = calm ? 0 : 0.0016;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const rotate = (x: number, y: number, z: number) => {
      // yaw about Y, then pitch about X
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const y2 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp;
      return [x1, y2, z2] as const;
    };

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    // dots are drawn in a few brightness bands, one path per band, so a
    // frame is a handful of fills instead of one per dot
    const BANDS = 8;
    const bandFill = Array.from(
      { length: BANDS },
      (_, b) => `rgba(255,234,229,${(0.15 + ((b + 0.5) / BANDS) * 0.7).toFixed(3)})`,
    );

    let raf = 0;
    let last = 0;
    const started = performance.now();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      // phones: 30 frames a second is plenty for a slow turn. Calm: hold still
      // and redraw only while it is being dragged.
      if (touch && now - last < 32) return;
      if (calm && !dragging && last) return;
      last = now;
      const t = (now - started) / 1000;
      if (!dragging) {
        yaw += vel;
        vel += ((calm ? 0 : 0.0016) - vel) * 0.02;
      }
      const R = Math.min(w, h) * 0.4;
      const cx = w / 2;
      const cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      // halo and body
      // the glow fades out well inside the canvas, so no square edge shows
      const halo = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.22);
      halo.addColorStop(0, "rgba(210,64,42,0.28)");
      halo.addColorStop(1, "rgba(210,64,42,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx.fill();
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "#3a1a1c");
      body.addColorStop(1, "#160708");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(251,246,244,0.35)";
      ctx.stroke();

      // dots: brighter facing us, dimmer at the rim
      const bands = Array.from({ length: BANDS }, () => new Path2D());
      for (const [x, y, z] of pts) {
        const [rx, ry, rz] = rotate(x, y, z);
        if (rz < 0) continue;
        const b = Math.min(BANDS - 1, Math.floor(rz * BANDS));
        const px = cx + rx * R;
        const py = cy - ry * R;
        const r = 0.6 + rz * 1.1;
        bands[b].moveTo(px + r, py);
        bands[b].arc(px, py, r, 0, Math.PI * 2);
      }
      for (let b = 0; b < BANDS; b++) {
        ctx.fillStyle = bandFill[b];
        ctx.fill(bands[b]);
      }

      // pins
      for (const p of pins) {
        const [rx, ry, rz] = rotate(p.v[0], p.v[1], p.v[2]);
        if (rz < 0.05) continue;
        const px = cx + rx * R;
        const py = cy - ry * R;
        const pulse = (Math.sin(t * 2.2 + p.phase) + 1) / 2;
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.25 * (1 - pulse) * rz;
        ctx.beginPath();
        ctx.arc(px, py, 6 + pulse * 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        // stem and head, like a map pin
        ctx.strokeStyle = "#FBF6F4";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, py - 10 * rz);
        ctx.stroke();
        ctx.fillStyle = p.c;
        ctx.strokeStyle = "#2B1719";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px, py - 10 * rz, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(draw);

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      yaw -= dx * 0.008;
      pitch = Math.max(-1.1, Math.min(1.1, pitch + dy * 0.006));
      vel = -dx * 0.0012;
    };
    const up = () => {
      dragging = false;
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="A globe with pins on cities across India"
      data-cursor="Spin"
      className={className}
      style={{ touchAction: "pan-y", cursor: "grab" }}
    />
  );
}
