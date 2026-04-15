import { useEffect, useRef } from "react";

export default function DNAPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 300);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 600);
    let t = 0;
    let rafId: number;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.02;

      const strands = 40;
      for (let i = 0; i < strands; i++) {
        const y = (i / strands) * h;
        const phase = t + i * 0.3;
        const x1 = w / 2 + Math.sin(phase) * 30;
        const x2 = w / 2 + Math.sin(phase + Math.PI) * 30;

        // Helix strands
        ctx.beginPath();
        ctx.arc(x1, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${0.4 + Math.sin(phase) * 0.3})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 230, ${0.4 + Math.cos(phase) * 0.3})`;
        ctx.fill();

        // Connecting bars (base pairs)
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(96, 165, 250, ${0.12 + Math.sin(t + i) * 0.08})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Pulse wave traveling along
      const pulseY = ((t * 50) % h);
      ctx.beginPath();
      ctx.arc(w / 2, pulseY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(96, 165, 250, 0.6)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w / 2, pulseY, 12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(96, 165, 250, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      rafId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = canvas.parentElement?.clientWidth ?? 300;
      h = canvas.height = canvas.parentElement?.clientHeight ?? 600;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
