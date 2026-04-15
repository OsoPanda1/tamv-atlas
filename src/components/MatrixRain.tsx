import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]()<>=/\\|;:ISNITAMVDID";

export default function MatrixRain({ color = "blue" }: { color?: "blue" | "platinum" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight);

    const fontSize = 13;
    const columns = Math.floor(w / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);

    const baseColor = color === "platinum" ? [200, 210, 230] : [96, 165, 250];

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.06)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const brightness = 0.15 + Math.random() * 0.35;
        ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${brightness})`;
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      w = canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      h = canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
}
