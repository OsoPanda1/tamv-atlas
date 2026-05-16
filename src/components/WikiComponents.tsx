import { ReactNode } from "react";

export function WikiH1({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2 text-glow-cyan">
      {children}
    </h1>
  );
}

export function WikiH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl lg:text-2xl font-semibold text-foreground mt-10 mb-4 border-b border-border pb-2">
      {children}
    </h2>
  );
}

export function WikiH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
      {children}
    </h3>
  );
}

export function WikiP({ children }: { children: ReactNode }) {
  return <p className="text-secondary-foreground leading-relaxed mb-4">{children}</p>;
}

export function WikiBreadcrumb({ section, page }: { section: string; page: string }) {
  return (
    <div className="text-xs text-muted-foreground mb-6 font-mono">
      <span className="text-primary">wiki</span>
      <span className="mx-1.5">/</span>
      <span>{section}</span>
      <span className="mx-1.5">/</span>
      <span className="text-foreground">{page}</span>
    </div>
  );
}

export function WikiCard({ title, children, accent = "cyan" }: { title?: string; children: ReactNode; accent?: "cyan" | "orange" | "green" | "blue" | "purple" }) {
  const borderColor = {
    cyan: "border-neon-cyan/30",
    orange: "border-neon-orange/30",
    green: "border-neon-green/30",
    blue: "border-primary/30",
    purple: "border-neon-purple/30",
  }[accent];
  return (
    <div className={`bg-card border ${borderColor} rounded-lg p-5 mb-4`}>
      {title && <div className="text-sm font-semibold text-foreground mb-2">{title}</div>}
      <div className="text-sm text-secondary-foreground">{children}</div>
    </div>
  );
}

export function WikiTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-secondary">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-semibold text-foreground border-b border-border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-secondary-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function WikiCode({ children }: { children: string }) {
  return (
    <pre className="bg-secondary border border-border rounded-lg p-4 mb-4 overflow-x-auto text-xs font-mono text-foreground">
      <code>{children}</code>
    </pre>
  );
}

export function WikiTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded mr-2 mb-2">
      {children}
    </span>
  );
}

export function WikiLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
      {children}
    </a>
  );
}
