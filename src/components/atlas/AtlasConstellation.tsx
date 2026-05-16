import { useEffect, useRef, useState } from "react";

export interface ConstellationNode {
  id: string;
  label: string;
  short: string;
  desc: string;
  angle: number;
  radius?: number;
  metric?: string | number;
  color?: string;
}

interface Props {
  nodes: ConstellationNode[];
  active: number;
  onSelect?: (i: number) => void;
}

/**
 * AAA-quality animated SVG constellation: rotating orbits, pulsing core,
 * particle field, animated edges, and hover/active glow. Pure SVG + CSS,
 * GPU-accelerated, no external deps.
 */
export function AtlasConstellation({ nodes, active, onSelect }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const [rot, setRot] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    let last = performance.now();
    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setRot((r) => (r + dt * 4) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current!);
  }, []);

  const cx = 250;
  const cy = 250;
  const R = 170;

  const points = nodes.map((n, i) => {
    const rad = ((n.angle - 90) * Math.PI) / 180;
    const r = n.radius ?? R;
    return { ...n, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad), idx: i };
  });

  const focused = hover ?? active;

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none">
      <defs>
        <radialGradient id="corona" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bg-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
        </linearGradient>
        <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="strong-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* radial background glow */}
      <circle cx={cx} cy={cy} r="240" fill="url(#bg-glow)" />

      {/* concentric orbits — rotating */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${rot * 0.3}deg)` }}>
        {[80, 130, 180, 220].map((rr, i) => (
          <circle
            key={rr}
            cx={cx}
            cy={cy}
            r={rr}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity={0.15 - i * 0.02}
            strokeDasharray={i % 2 ? "4 8" : "1 3"}
            strokeWidth="0.6"
          />
        ))}
      </g>

      {/* counter-rotating dash ring */}
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeOpacity="0.25"
        strokeWidth="1"
        strokeDasharray="2 14"
        style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${-rot}deg)` }}
      />

      {/* particle field on outer ring */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${rot * 0.6}deg)` }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const pr = 200 + (i % 3) * 12;
          return (
            <circle
              key={i}
              cx={cx + pr * Math.cos(a)}
              cy={cy + pr * Math.sin(a)}
              r={0.8 + (i % 3) * 0.4}
              fill="hsl(var(--primary))"
              opacity={0.4 + (i % 4) * 0.1}
            />
          );
        })}
      </g>

      {/* edges between adjacent nodes */}
      {points.map((p, i) => {
        const next = points[(i + 1) % points.length];
        const isActiveEdge = i === focused || (i + 1) % points.length === focused;
        return (
          <line
            key={`e-${i}`}
            x1={p.x}
            y1={p.y}
            x2={next.x}
            y2={next.y}
            stroke="url(#edge-grad)"
            strokeOpacity={isActiveEdge ? 0.95 : 0.4}
            strokeWidth={isActiveEdge ? 1.6 : 0.8}
            filter={isActiveEdge ? "url(#neon)" : undefined}
          />
        );
      })}

      {/* spokes from core */}
      {points.map((p, i) => (
        <line
          key={`s-${i}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="hsl(var(--primary))"
          strokeOpacity={focused === i ? 0.9 : 0.18}
          strokeWidth={focused === i ? 1.6 : 0.5}
          strokeDasharray={focused === i ? undefined : "2 4"}
        />
      ))}

      {/* core corona */}
      <circle cx={cx} cy={cy} r="90" fill="url(#corona)" />
      <circle cx={cx} cy={cy} r="32" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" filter="url(#strong-glow)" />
      <circle cx={cx} cy={cy} r="20" fill="hsl(var(--primary))" opacity="0.9">
        <animate attributeName="r" values="18;24;18" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x={cx} y={cy + 4} textAnchor="middle" className="fill-primary-foreground text-[11px] font-mono font-bold tracking-wider">
        TAMV
      </text>

      {/* signal pulses traveling along spokes */}
      {points.map((p, i) => (
        <circle key={`pulse-${i}`} r="2.5" fill="hsl(var(--accent))" opacity="0.9">
          <animateMotion dur={`${3 + (i % 3)}s`} repeatCount="indefinite" path={`M ${cx} ${cy} L ${p.x} ${p.y}`} />
          <animate attributeName="opacity" values="0;1;0" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* nodes */}
      {points.map((p, i) => {
        const isFocus = focused === i;
        return (
          <g
            key={p.id}
            className="cursor-pointer transition-all"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect?.(i)}
          >
            {/* hex shape */}
            <polygon
              points={hexPoints(p.x, p.y, isFocus ? 22 : 16)}
              fill="hsl(var(--card))"
              stroke={isFocus ? "hsl(var(--accent))" : "hsl(var(--primary))"}
              strokeWidth={isFocus ? 2 : 1}
              filter={isFocus ? "url(#strong-glow)" : "url(#neon)"}
            />
            <polygon
              points={hexPoints(p.x, p.y, isFocus ? 14 : 10)}
              fill={isFocus ? "hsl(var(--accent))" : "hsl(var(--primary))"}
              opacity={isFocus ? 0.9 : 0.6}
            />
            <text x={p.x} y={p.y + 3} textAnchor="middle" className="fill-background text-[9px] font-mono font-bold pointer-events-none">
              {p.short}
            </text>

            {/* label */}
            <g transform={`translate(${p.x}, ${p.y - 36})`}>
              <rect x={-44} y={-10} width={88} height={16} rx={3} fill="hsl(var(--background))" opacity={isFocus ? 0.95 : 0.7} stroke="hsl(var(--border))" />
              <text textAnchor="middle" y={2} className="fill-foreground text-[9px] font-mono font-semibold pointer-events-none">
                {p.label}
              </text>
            </g>

            {/* metric chip */}
            {p.metric !== undefined && (
              <g transform={`translate(${p.x}, ${p.y + 34})`}>
                <rect x={-30} y={-7} width={60} height={14} rx={7} fill="hsl(var(--primary))" opacity={isFocus ? 0.25 : 0.12} />
                <text textAnchor="middle" y={3} className="fill-primary text-[8px] font-mono font-bold pointer-events-none">
                  {p.metric}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const a = ((i * 60 - 30) * Math.PI) / 180;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    })
    .join(" ");
}
