import { motion } from "framer-motion";
import { ExternalLink, Github, BookOpen, Award, MessageCircle, Users, Globe, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { icon: BookOpen, label: "Blog Oficial", url: "https://tamvonlinenetwork.blogspot.com", desc: "Artículos, visión y actualizaciones del ecosistema" },
  { icon: Github, label: "GitHub — OsoPanda1", url: "https://github.com/OsoPanda1", desc: "Repositorios y código del proyecto" },
  { icon: Award, label: "AVIXA Xchange", url: "https://xchange.avixa.org/posts/tamv-online-primer-plataforma-mexicana-sistémica-digital", desc: "Publicación oficial en la comunidad AVIXA" },
  { icon: Globe, label: "ORCID", url: "https://orcid.org/0009-0004-3897-2000", desc: "Perfil académico e investigación" },
  { icon: MessageCircle, label: "OpenAI Community", url: "https://community.openai.com", desc: "Participación en foros de IA y GPT Builders" },
];

const resources = [
  { title: "TAMV y el Nacimiento del Primer CITEMESH", url: "https://tamvonlinenetwork.blogspot.com/2026/02/tamv-y-el-nacimiento-del-primer.html", type: "Blog" },
  { title: "TAMV Online — AVIXA Xchange", url: "https://xchange.avixa.org/posts/tamv-online-primer-plataforma-mexicana-sistémica-digital", type: "Publicación" },
  { title: "Isabella AI — Scientific Appeal", url: "https://tamvonlinenetwork.blogspot.com/2025/10/announcement-scientific-appeal.html", type: "Comunicado" },
  { title: "Cómo se construyó TAMV DM-X4™", url: "https://tamvonlinenetwork.blogspot.com/2025/09/como-se-construyo-tamv-dmx4-blog.html", type: "Artículo" },
];

export default function Comunidad() {
  return (
    <div>
      <section className="min-h-[50vh] flex items-center gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-display text-xs tracking-[0.4em] text-accent text-glow-lime mb-3">CONECTA</p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4">
              <span className="text-primary text-glow-blue">Comunidad</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl">
              Únete al movimiento. TAMV Online busca colaboradores, investigadores y visionarios comprometidos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-center text-foreground mb-12">
            Presencia <span className="text-secondary text-glow-silver">Digital</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-premium rounded-lg p-6 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <link.icon className="text-primary group-hover:scale-110 transition-transform" size={24} />
                  <h3 className="font-display text-sm font-semibold text-foreground">{link.label}</h3>
                  <ExternalLink className="ml-auto text-muted-foreground" size={14} />
                </div>
                <p className="font-body text-xs text-muted-foreground">{link.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-center text-foreground mb-12">
            Publicaciones y <span className="text-primary">Recursos</span>
          </h2>
          <div className="space-y-4">
            {resources.map((r, i) => (
              <motion.a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between py-4 border-b border-border/50 group hover:border-primary/30 transition-all"
              >
                <div>
                  <p className="font-body text-sm text-foreground group-hover:text-primary transition-colors">{r.title}</p>
                  <span className="font-mono text-xs text-muted-foreground">{r.type}</span>
                </div>
                <ExternalLink className="text-muted-foreground group-hover:text-primary flex-shrink-0 ml-4" size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Mail className="mx-auto text-primary mb-6" size={36} />
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Contacto <span className="text-primary">Directo</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Para información, alianzas, investigación, reportajes y colaboraciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="mailto:tamvonlinenetwork@outlook.es" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/30 text-primary font-body text-sm hover:bg-primary/5 transition-all">
              <Mail size={16} /> tamvonlinenetwork@outlook.es
            </a>
            <a href="mailto:ecastillotrejo1983@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-secondary/30 text-secondary font-body text-sm hover:bg-secondary/5 transition-all">
              <Mail size={16} /> ecastillotrejo1983@gmail.com
            </a>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/5">
            <MapPin size={14} className="text-destructive" />
            <span className="font-display text-xs tracking-[0.2em] text-destructive">ORGULLOSAMENTE REALMONTENSES</span>
          </div>
          <p className="font-body text-sm text-muted-foreground mt-2">Real del Monte, Hidalgo, México</p>
        </div>
      </section>
    </div>
  );
}
