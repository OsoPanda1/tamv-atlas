import { useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string | null | undefined;
  icon: LucideIcon;
  accent?: "primary" | "accent" | "emerald";
  sub?: string;
}

export function MetricCounter({ label, value, icon: Icon, accent = "primary", sub }: Props) {
  const isNum = typeof value === "number";
  const [display, setDisplay] = useState(isNum ? 0 : value ?? "—");
  const raf = useRef<number>();

  useEffect(() => {
    if (!isNum) { setDisplay(value ?? "—"); return; }
    const target = value as number;
    const start = performance.now();
    const dur = 900;
    const from = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (target - from) * eased).toLocaleString());
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [value, isNum]);

  const tone = accent === "accent" ? "text-accent border-accent/30" : accent === "emerald" ? "text-emerald-400 border-emerald-400/30" : "text-primary border-primary/30";

  return (
    <div className={`relative p-4 rounded-lg border bg-card/40 backdrop-blur-sm overflow-hidden group hover:bg-card/60 transition-all ${tone}`}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-current/5 to-transparent pointer-events-none" />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</p>
          <p className="text-2xl font-mono font-bold text-foreground mt-1 tabular-nums">{display}</p>
          {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
        </div>
        <Icon className={`w-4 h-4 ${tone.split(" ")[0]}`} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
    </div>
  );
}
