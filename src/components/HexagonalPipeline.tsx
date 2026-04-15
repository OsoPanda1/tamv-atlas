import { useEffect, useRef } from "react";

export default function HexagonalPipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 400);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);
    let t = 0;
    let rafId: number;

    const drawHex = (cx: number, cy: number, r: number, alpha: number, color: string) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = color.replace("1)", `${alpha})`);
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.015;

      const cx = w / 2;
      const cy = h / 2;

      // Central hex (kernel)
      const kernelPulse = 0.6 + Math.sin(t * 2) * 0.2;
      drawHex(cx, cy, 30, kernelPulse, "rgba(96, 165, 250, 1)");
      drawHex(cx, cy, 35, kernelPulse * 0.5, "rgba(96, 165, 250, 1)");

      // Pipeline A ring (intake)
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + t * 0.3;
        const x = cx + 80 * Math.cos(angle);
        const y = cy + 80 * Math.sin(angle);
        const pulse = 0.3 + Math.sin(t * 3 + i) * 0.2;
        drawHex(x, y, 20, pulse, "rgba(96, 165, 250, 1)");

        // Connection line to center
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 + Math.sin(t + i) * 0.05})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Pipeline B ring (output)
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 6 - t * 0.2;
        const x = cx + 130 * Math.cos(angle);
        const y = cy + 130 * Math.sin(angle);
        const pulse = 0.2 + Math.sin(t * 2.5 + i * 1.2) * 0.15;
        drawHex(x, y, 16, pulse, "rgba(200, 210, 230, 1)");

        ctx.beginPath();
        ctx.moveTo(cx + 80 * Math.cos((Math.PI / 3) * i + t * 0.3), cy + 80 * Math.sin((Math.PI / 3) * i + t * 0.3));
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(200, 210, 230, ${0.08})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Data flow particles
      for (let i = 0; i < 12; i++) {
        const progress = ((t * 0.5 + i * 0.08) % 1);
        const angle = (Math.PI / 3) * (i % 6) + (i < 6 ? t * 0.3 : -t * 0.2 + Math.PI / 6);
        const r = i < 6 ? 80 * progress : 80 + 50 * progress;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = i < 6 ? `rgba(96, 165, 250, ${0.6 * (1 - progress)})` : `rgba(200, 210, 230, ${0.5 * (1 - progress)})`;
        ctx.fill();
      }

      // Labels
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(96, 165, 250, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("PIPELINE A · INTAKE", cx, cy + 105);
      ctx.fillStyle = "rgba(200, 210, 230, 0.4)";
      ctx.fillText("PIPELINE B · OUTPUT", cx, cy + 155);
      ctx.fillStyle = "rgba(96, 165, 250, 0.7)";
      ctx.fillText("MD-X5", cx, cy + 4);

      rafId = requestAnimationFrame(animate);
    };

    animate();
    const handleResize = () => {
      w = canvas.width = canvas.parentElement?.clientWidth ?? 400;
      h = canvas.height = canvas.parentElement?.clientHeight ?? 300;
    };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", handleResize); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
