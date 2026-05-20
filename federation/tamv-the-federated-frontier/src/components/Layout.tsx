import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoTamv from "@/assets/logo-tamv.jpg";

const navItems = [
  { path: "/", label: "Inicio" },
  { path: "/ecosistema", label: "Ecosistema" },
  { path: "/isabella-ai", label: "Isabella AI" },
  { path: "/blueprint", label: "Blueprint" },
  { path: "/utamv", label: "UTAMV" },
  { path: "/manifiesto-humano", label: "Manifiesto Humano" },
  { path: "/integracion-tamv", label: "Integración TAMV" },
  { path: "/visual-center", label: "Centro Visual" },
  { path: "/ceo", label: "CEO" },
  { path: "/tecnologia", label: "Tecnología" },
  { path: "/registros", label: "Registros · DOIs" },
  { path: "/certificaciones", label: "Certificaciones" },
  { path: "/publicaciones", label: "Publicaciones" },
  { path: "/comunidad", label: "Comunidad" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 glass-surface">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoTamv} alt="TAMV" className="w-8 h-8 rounded object-cover" />
            <span className="font-display text-lg font-bold tracking-wider text-primary text-glow-blue">
              TAMV<span className="text-secondary"> ONLINE</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-xs font-body font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/10 border-glow-blue"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden glass-surface border-t border-border"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-6 py-3 text-sm font-body ${
                    location.pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16">{children}</main>

      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display text-lg text-primary text-glow-blue mb-3">TAMV ONLINE</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
                Ecosistema Civilizatorio Federado Nativo XR, VR, 3D y 4D con IA Cognitiva.
              </p>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-destructive" />
                <span className="font-display text-[10px] tracking-wider text-destructive">ORGULLOSAMENTE REALMONTENSES</span>
              </div>
            </div>
            <div>
              <h4 className="font-display text-xs text-secondary mb-3 tracking-wider">ENLACES</h4>
              <div className="space-y-2">
                {[
                  { label: "Sitio Oficial TAMV", url: "https://tamvonline-oficial.odoo.com" },
                  { label: "Blog Oficial", url: "https://tamvonlinenetwork.blogspot.com" },
                  { label: "GitHub · OsoPanda1", url: "https://github.com/OsoPanda1" },
                  { label: "Comunidad groups.io", url: "https://TAMVONLINE-ECOSISTEM-LATAM.groups.io/" },
                  { label: "LinkedIn Newsletter", url: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7395085399506927616" },
                  { label: "ORCID 0009-0008-5050-1539", url: "https://orcid.org/0009-0008-5050-1539" },
                  { label: "DOI Zenodo Canon", url: "https://doi.org/10.5281/zenodo.19436662" },
                ].map((l) => (
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-body">
                    <ExternalLink size={12} /> {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-xs text-secondary mb-3 tracking-wider">CONTACTO</h4>
              <div className="space-y-2">
                <a href="mailto:tamvonlinenetwork@outlook.es" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-body">
                  <Mail size={12} /> tamvonlinenetwork@outlook.es
                </a>
                <a href="mailto:ecastillotrejo1983@gmail.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-body">
                  <Mail size={12} /> ecastillotrejo1983@gmail.com
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-display text-xs text-secondary mb-3 tracking-wider">DEDICATORIA</h4>
              <p className="text-sm text-muted-foreground font-body">
                Dedicado a <span className="text-secondary">Reina Trejo Serrano</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-body">
                +22,000 horas documentadas · TRL 7 · Lanzamiento 5 febrero 2026
              </p>
            </div>
          </div>
          <div className="line-decoration mt-8 mb-4" />
          <p className="text-center text-xs text-muted-foreground font-body">
            © 2026 TAMV ONLINE NETWORK · CEO Fundador: Edwin Oswaldo Castillo Trejo (Anubis Villaseñor) · Real del Monte, Hidalgo, México
          </p>
        </div>
      </footer>
    </div>
  );
}
