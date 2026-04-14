import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { wikiStructure } from "@/data/wikiStructure";

export default function WikiSidebar() {
  const { sectionId, pageSlug } = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(wikiStructure.map((s) => [s.id, s.id === sectionId || s.id === "modulo-cero"]))
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const nav = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-mono text-sm font-bold border border-primary/30">
          T
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">TAMV ONLINE</div>
          <div className="text-xs text-muted-foreground">Wiki · Documentación</div>
        </div>
      </Link>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {wikiStructure.map((section) => (
          <div key={section.id} className="mb-1">
            <button
              onClick={() => toggle(section.id)}
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm font-medium text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
            >
              <span className="text-base">{section.icon}</span>
              <span className="flex-1 truncate">{section.title}</span>
              {expanded[section.id] ? (
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
            {expanded[section.id] && (
              <div className="ml-4 border-l border-border">
                {section.children.map((page) => {
                  const isActive = sectionId === section.id && pageSlug === page.slug;
                  return (
                    <Link
                      key={page.slug}
                      to={`/wiki/${section.id}/${page.slug}`}
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

      {/* Footer */}
      <div className="border-t border-border px-5 py-3">
        <div className="text-xs text-muted-foreground">
          ORCID: 0009-0008-5050-1539
        </div>
        <div className="text-xs text-muted-foreground">
          DOI: 10.5281/zenodo.19562517
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-card border border-border text-foreground"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
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
