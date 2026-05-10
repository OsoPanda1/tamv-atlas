import { useEffect, useRef } from "react";

export default function HexagonalPipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let t = 0;
    const dpr = window.devicePixelRatio || 1;

    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      w = parent.clientWidth;
      h = parent.clientHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const glow = (
      x: number,
      y: number,
      r: number,
      color: string,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color.replace("1)", `${alpha})`));
      g.addColorStop(1, color.replace("1)", "0)"));

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawHex = (
      cx: number,
      cy: number,
      r: number,
      alpha: number,
      color: string,
      rotation = 0
    ) => {
      ctx.beginPath();

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6 + rotation;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.strokeStyle = color.replace("1)", `${alpha})`);
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 14;
      ctx.shadowColor = color.replace("1)", `${alpha})`);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const line = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      alpha: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(96,165,250,${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      t += 0.012;

      const cx = w / 2;
      const cy = h / 2;

      // background field
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 260);
      bg.addColorStop(0, "rgba(15,23,42,0.18)");
      bg.addColorStop(1, "rgba(2,6,23,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // kernel pulse
      const kernelPulse = 0.75 + Math.sin(t * 2.5) * 0.18;

      glow(cx, cy, 55, "rgba(56,189,248,1)", 0.14);
      glow(cx, cy, 90, "rgba(14,165,233,1)", 0.05);

      drawHex(cx, cy, 34, kernelPulse, "rgba(96,165,250,1)", t * 0.25);
      drawHex(cx, cy, 42, kernelPulse * 0.45, "rgba(56,189,248,1)", -t * 0.18);

      // ring A
      const innerNodes = [];

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + t * 0.22;
        const x = cx + 90 * Math.cos(angle);
        const y = cy + 90 * Math.sin(angle);

        innerNodes.push({ x, y });

        const pulse = 0.35 + Math.sin(t * 3 + i) * 0.15;

        glow(x, y, 18, "rgba(56,189,248,1)", 0.08);
        drawHex(x, y, 20, pulse, "rgba(96,165,250,1)", t * 0.12);

        line(cx, cy, x, y, 0.08 + pulse * 0.12);
      }

      // ring B
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - t * 0.16 + Math.PI / 6;
        const x = cx + 150 * Math.cos(angle);
        const y = cy + 150 * Math.sin(angle);

        const pulse = 0.22 + Math.sin(t * 2 + i) * 0.1;

        glow(x, y, 14, "rgba(226,232,240,1)", 0.05);
        drawHex(x, y, 16, pulse, "rgba(226,232,240,1)", -t * 0.08);

        const inner = innerNodes[i];
        line(inner.x, inner.y, x, y, 0.06);
      }

      // particles
      for (let i = 0; i < 24; i++) {
        const progress = (t * 0.35 + i * 0.05) % 1;
        const angle = (Math.PI / 3) * (i % 6);

        const radius =
          i < 12
            ? 90 * progress
            : 90 + 60 * progress;

        const px = cx + radius * Math.cos(angle);
        const py = cy + radius * Math.sin(angle);

        glow(px, py, 5, "rgba(96,165,250,1)", 0.22);

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125,211,252,${0.75 - progress * 0.5})`;
        ctx.fill();
      }

      // outer resonance halo
      drawHex(cx, cy, 185, 0.06 + Math.sin(t) * 0.03, "rgba(59,130,246,1)", t * 0.03);

      // scanline overlay
      for (let y = 0; y < h; y += 4) {
        ctx.strokeStyle = "rgba(255,255,255,0.015)";
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // labels
      ctx.font = "10px JetBrains Mono";
      ctx.textAlign = "center";

      ctx.fillStyle = "rgba(125,211,252,0.8)";
      ctx.fillText("MD-X5 CORE", cx, cy + 4);

      ctx.fillStyle = "rgba(96,165,250,0.55)";
      ctx.fillText("PIPELINE INGEST", cx, cy + 120);

      ctx.fillStyle = "rgba(226,232,240,0.35)";
      ctx.fillText("FEDERATED OUTPUT BUS", cx, cy + 185);

      rafId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-2xl bg-slate-950"
    />
  );
}
