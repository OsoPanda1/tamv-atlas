import { motion } from "framer-motion";
import { Globe, Layers, Coins, Users, ShieldCheck, Zap, MapPin } from "lucide-react";
import ecosistemaBg from "@/assets/ecosistema-bg.jpg";
import nexoImg from "@/assets/nexo-agua.png";
import tamvArchImg from "@/assets/tamv-architecture.png";

const features = [
  { icon: Globe, title: "XR / VR / 3D / 4D", desc: "Experiencias inmersivas nativas que van más allá del plataforma XR convencional. Realidad extendida como estándar." },
  { icon: Layers, title: "CITEMESH", desc: "Civilizational Intelligence Engine and Systemic Solutions Meshwork — el primer framework sistémica de su tipo." },
  { icon: Coins, title: "Economía Colaborativa", desc: "Créditos internos, cuentas de contribución y herramientas de apoyo comunitario. FairSplit 75/25 para creadores." },
  { icon: Users, title: "Gobernanza Ética", desc: "Modelo federado con gobernanza transparente. Comités auditables con reglas públicas y trazabilidad operativa." },
  { icon: ShieldCheck, title: "Seguridad Post-Cuántica", desc: "Criptografía Kyber/Dilithium, QuantumPods™ inmutables, 13 capas de seguridad Dekateotl." },
  { icon: Zap, title: "Arquitectura Antifrágil", desc: "Heptafederada: 7 Federaciones, niveles L0-L3. Breakeven con 1,300-2,300 usuarios activos." },
];

const comparisons = [
  { name: "Roblox", revenue: "$4.46B", users: "200M+", arpu: "~$2" },
  { name: "Fortnite", revenue: "$6B", users: "650M+", arpu: "~$9" },
  { name: "Decentraland", revenue: "$40M", users: "300K", arpu: "~$11" },
  { name: "TAMV Online", revenue: "Proyectado $10.8M", users: "50K objetivo", arpu: "$18-$48", highlight: true },
];

export default function Ecosistema() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={ecosistemaBg} alt="Ecosistema TAMV" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-display text-xs tracking-[0.4em] text-accent text-glow-lime mb-3">TAMV MD-X4</p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4">
              El <span className="text-primary text-glow-blue">Ecosistema</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mb-4">
              Infraestructura Digital Interoperable — una "plataforma digital de pila completa" diseñada para la dignidad humana.
            </p>
            <div className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-destructive" />
              <span className="font-display text-xs tracking-[0.2em] text-destructive">ORGULLOSAMENTE REALMONTENSES</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-premium rounded-lg p-8"
              >
                <f.icon className="text-primary mb-4" size={28} />
                <h3 className="font-display text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual: Architecture & Nexo */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <img src={tamvArchImg} alt="Arquitectura TAMV" className="rounded-lg border border-border shadow-2xl w-full" />
              <p className="font-body text-xs text-muted-foreground mt-3 text-center">Arquitectura del Ecosistema TAMV</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <img src={nexoImg} alt="El Nexo del Agua" className="rounded-lg border border-border shadow-2xl w-full" />
              <p className="font-body text-xs text-muted-foreground mt-3 text-center">El Nexo del Agua — Mining Life. Not Time.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            TAMV vs. <span className="text-primary text-glow-blue">Plataformas Globales</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-display text-xs text-muted-foreground tracking-wider">Plataforma</th>
                  <th className="text-left py-3 px-4 font-display text-xs text-muted-foreground tracking-wider">Ingresos</th>
                  <th className="text-left py-3 px-4 font-display text-xs text-muted-foreground tracking-wider">Usuarios</th>
                  <th className="text-left py-3 px-4 font-display text-xs text-muted-foreground tracking-wider">ARPU</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c) => (
                  <tr key={c.name} className={`border-b border-border/50 ${c.highlight ? "bg-primary/5" : ""}`}>
                    <td className={`py-3 px-4 font-body text-sm ${c.highlight ? "text-primary font-semibold" : "text-foreground"}`}>{c.name}</td>
                    <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{c.revenue}</td>
                    <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{c.users}</td>
                    <td className={`py-3 px-4 font-mono text-sm ${c.highlight ? "text-accent font-semibold" : "text-muted-foreground"}`}>{c.arpu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6 font-body">
            Datos basados en reportes públicos 2025. Fuente: AVIXA Xchange, reportes corporativos.
          </p>
        </div>
      </section>
    </div>
  );
}
