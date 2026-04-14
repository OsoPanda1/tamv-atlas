import { Link, Outlet } from "react-router-dom";
import WikiSidebar from "./WikiSidebar";

export default function WikiLayout() {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <WikiSidebar />
      <main className="lg:ml-72 min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border">
          <div className="max-w-5xl mx-auto px-6 py-3 lg:px-12 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-primary">TAMV ATLAS</p>
              <p className="text-sm text-muted-foreground">ISNI / Digital Civilization System v1.0 · Living Whitepaper</p>
            </div>
            <nav className="hidden md:flex gap-4 text-xs font-mono">
              <Link to="/" className="text-muted-foreground hover:text-primary">Resumen</Link>
              <Link to="/modulo/0" className="text-muted-foreground hover:text-primary">Índice global</Link>
            </nav>
          </div>
        </header>

        <div className="max-w-5xl mx-auto w-full px-6 py-10 lg:px-12 flex-1">
          <Outlet />
        </div>

        <footer className="border-t border-border mt-auto">
          <div className="max-w-5xl mx-auto px-6 py-5 lg:px-12 text-xs text-muted-foreground flex flex-wrap items-center gap-3">
            <span>© TAMV / Isabella</span>
            <a href="https://orcid.org/0009-0008-5050-1539" target="_blank" rel="noreferrer" className="hover:text-primary">ORCID</a>
            <a href="https://zenodo.org/records/19562517" target="_blank" rel="noreferrer" className="hover:text-primary">Zenodo</a>
            <a href="https://www.avixa.org" target="_blank" rel="noreferrer" className="hover:text-primary">AVIXA</a>
            <a href="https://xchange.avixa.org" target="_blank" rel="noreferrer" className="hover:text-primary">Xchange</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
