import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { wikiStructure } from "@/data/wikiStructure";

export default function WikiSidebar() {
  const { slug } = useParams();
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(wikiStructure.map((s) => [s.id, s.id === "modulo-cero"]))
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const nav = (
    <nav className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-mono text-sm font-bold border border-primary/30">
            T
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">TAMV ATLAS</div>
            <div className="text-xs text-muted-foreground">ISNI Wiki · Living Whitepaper</div>
          </div>
        </Link>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono text-muted-foreground">
          <Link to="/" className="px-2 py-1 border border-border rounded hover:text-primary hover:border-primary/30">Resumen</Link>
          <Link to="/modulo/0" className="px-2 py-1 border border-border rounded hover:text-primary hover:border-primary/30">Módulos 0–12</Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {wikiStructure.map((section, moduleIndex) => (
          <div key={section.id} className="mb-1">
            <div className="flex items-center">
              <button
                onClick={() => toggle(section.id)}
                className="flex items-center gap-2 flex-1 px-4 py-2 text-left text-sm font-medium text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
              >
                <span className="text-base">{section.icon}</span>
                <span className="flex-1 truncate">{section.title}</span>
                {expanded[section.id] ? (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
              <Link
                to={`/modulo/${moduleIndex}`}
                className="mr-2 text-[11px] font-mono text-muted-foreground hover:text-primary"
              >
                ver
              </Link>
            </div>
            {expanded[section.id] && (
              <div className="ml-4 border-l border-border">
                {section.children.map((page) => {
                  const isActive = slug === page.slug || location.pathname === `/articulo/${page.slug}`;
                  return (
                    <Link
                      key={page.slug}
                      to={`/articulo/${page.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className={`block pl-5 pr-4 py-1.5 text-sm transition-colors ${
                        isActive
                          ? "text-primary border-l-2 border-primary -ml-px font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {page.shortTitle || page.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-card border border-border text-foreground"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-72 bg-sidebar border-r border-sidebar-border transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {nav}
      </aside>
    </>
  );
}
