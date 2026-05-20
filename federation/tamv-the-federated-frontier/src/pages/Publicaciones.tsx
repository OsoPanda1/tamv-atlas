import { motion } from "framer-motion";
import { FileText, Shield, Brain, Users, Scale, AlertTriangle, BookOpen, ExternalLink, MapPin } from "lucide-react";

export default function Publicaciones() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="font-display text-xs tracking-[0.4em] text-destructive text-glow-cherry mb-3">DOMINIO PÚBLICO</p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4">
              <span className="text-primary text-glow-blue">Publicaciones</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl">
              Documentos, informes y análisis de dominio público con enfoque tecnológico,
              ético y estructural del proyecto TAMV Online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Publication */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>

            {/* Header */}
            <div className="card-premium rounded-lg p-8 md:p-12 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-destructive" size={20} />
                <span className="font-display text-xs tracking-wider text-destructive">INFORME INTERNACIONAL · EDICIÓN 2026</span>
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight">
                Inteligencia Artificial, Desinformación y Responsabilidad Humana
              </h2>
              <p className="font-body text-base text-secondary mb-2">
                Declaración ética, diagnóstico sistémico y llamado global a la integridad cognitiva
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-mono mt-4">
                <span>Fecha: 15 de febrero de 2026</span>
                <span>·</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> Real del Monte, Hidalgo, México</span>
              </div>
              <p className="font-body text-sm text-muted-foreground mt-2">
                Autor: Edwin Oswaldo Castillo Trejo (Anubis Villaseñor) — Fundador y director del proyecto TAMV Online
              </p>
              <p className="font-body text-sm text-primary mt-1">Firma documental: La Corona – Anubis Villaseñor</p>
            </div>

            {/* Sections */}
            <div className="space-y-8 font-body text-sm text-muted-foreground leading-relaxed">

              {/* Section 1 */}
              <div className="card-premium rounded-lg p-8">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">1. Declaración de Identidad, Autoría y Contexto</h3>
                <p className="mb-3">
                  Mi nombre es Edwin Oswaldo Castillo Trejo, conocido en entornos digitales como Anubis Villaseñor.
                  Soy fundador y director del proyecto TAMV Online, una iniciativa privada de investigación, desarrollo
                  y experimentación en infraestructura digital con enfoque humano, orientada a analizar y mitigar los
                  efectos de la inteligencia artificial y la desinformación sobre la vida social, cultural y democrática.
                </p>
                <p className="mb-3">
                  En mi vida civil continúo siendo un ciudadano ordinario de Real del Monte, Hidalgo. Trabajo, observo,
                  documento y participo sin privilegios ni representación institucional ajena. La identidad bajo la cual
                  firmo este documento no constituye un personaje, sino una firma funcional, técnica y ética.
                </p>
                <p>
                  Este informe no pretende reconocimiento ni autoridad moral sobre terceros. Su propósito es asumir
                  responsabilidad explícita y contribuir al debate informado sobre la inteligencia artificial y la
                  desinformación asociada a su uso.
                </p>
              </div>

              {/* Section 2 */}
              <div className="card-premium rounded-lg p-8">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">2. Objeto y Alcance del Documento</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />Un análisis crítico independiente del uso irresponsable de sistemas de IA en la creación y difusión de contenidos.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />Un diagnóstico ético y social sobre la erosión del pensamiento crítico y la normalización de la holgazanería cognitiva.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />Una declaración pública de responsabilidad individual aplicable a quien publica, amplifica o legitima información mediante tecnologías automatizadas.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />Un marco de referencia argumentativo alineado con estándares internacionales de derechos humanos, ética tecnológica y gobernanza responsable.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="card-premium rounded-lg p-8">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">3. Diagnóstico Central: La Holgazanería Cognitiva</h3>

                <h4 className="font-display text-xs text-accent mb-2 mt-4">3.1 Producción sin Lectura</h4>
                <p className="mb-3">
                  Se ha normalizado la generación de textos, imágenes y videos mediante herramientas de IA con publicación
                  automática sin lectura crítica, verificación ni evaluación de impacto. Esto no representa eficiencia ni
                  innovación. Constituye <span className="text-destructive">negligencia intelectual sistematizada</span>.
                </p>

                <h4 className="font-display text-xs text-accent mb-2 mt-4">3.2 Autoengaño Tecnológico</h4>
                <p className="mb-3">
                  El contenido generado por IA es asumido como prueba del talento o conocimiento del usuario. Se atribuye
                  mérito intelectual a la simple activación de una herramienta. Cuando esta ilusión se institucionaliza,
                  se diluye la frontera entre herramienta y capacidad humana.
                </p>

                <h4 className="font-display text-xs text-accent mb-2 mt-4">3.3 Evasión de Responsabilidad</h4>
                <p>
                  "No fui yo, fue la IA" — Esta afirmación es ética y jurídicamente insostenible. La decisión de publicar,
                  compartir o amplificar es humana. La complejidad técnica no extingue la responsabilidad moral ni social.
                </p>
              </div>

              {/* Section 4 */}
              <div className="card-premium rounded-lg p-8">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">4. La Falacia de la Detección y la Inquisición Digital</h3>
                <p className="mb-3">
                  En determinados entornos se ha normalizado acusar de "contenido artificial" a textos bien estructurados,
                  lenguaje técnico o argumentaciones extensas. Esto no es pensamiento crítico. Es
                  <span className="text-destructive"> anti-intelectualismo funcional</span>, que penaliza el esfuerzo
                  cognitivo y recompensa la improvisación como falsa señal de autenticidad.
                </p>
                <p>
                  Los sistemas diseñados para "detectar" contenido generado por IA presentan altas tasas de falsos
                  positivos y negativos, vulnerabilidad a ediciones mínimas y ausencia de validación científica robusta.
                  Utilizarlos como base para sanciones constituye negligencia técnica y ética.
                </p>
              </div>

              {/* Section 5 */}
              <div className="card-premium rounded-lg p-8">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">5. Fundamentos Técnicos Esenciales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-display text-xs text-primary mb-2">La IA puede:</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• Optimizar procesos complejos</li>
                      <li>• Automatizar tareas repetitivas</li>
                      <li>• Analizar grandes conjuntos de datos a escala</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-display text-xs text-destructive mb-2">La IA no puede:</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• Sustituir el juicio ético humano</li>
                      <li>• Asumir responsabilidad por decisiones</li>
                      <li>• Definir el rumbo de una sociedad</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="card-premium rounded-lg p-8">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">6. Marco Ético-Jurídico de Referencia</h3>
                <p>
                  La postura expresada es coherente con principios de centralidad de la dignidad humana,
                  enfoques regulatorios basados en riesgo, transparencia y supervisión humana, marcos de gobernanza
                  que exigen trazabilidad, rendición de cuentas y corrección del daño. El mensaje es inequívoco:
                  <span className="text-primary"> la tecnología no diluye la responsabilidad; la amplifica</span>.
                </p>
              </div>

              {/* Section 7 */}
              <div className="card-premium rounded-lg p-8">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">7. Principios de Liderazgo Responsable</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Transparencia sobre el uso de IA",
                    "Responsabilidad personal indelegable",
                    "Autonomía del criterio humano",
                    "Educación crítica continua",
                    "Prevención del daño desde el diseño",
                  ].map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-xs">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 8 */}
              <div className="card-premium rounded-lg p-8">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">8. Propuesta de Acción</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />Alfabetización en IA y desinformación en educación formal y continua</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />Comunicación pública clara sobre capacidades y límites reales de la IA</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />Espacios de diálogo multisectorial basados en evidencia</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />Regulación proporcionada, técnicamente informada y orientada a proteger derechos</li>
                </ul>
              </div>

              {/* Section 10 - Final Declaration */}
              <div className="card-premium rounded-lg p-8 border-accent/20">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">10. Declaración Final (Edición 2026)</h3>
                <blockquote className="font-body text-base text-foreground italic leading-relaxed mb-4">
                  La inteligencia artificial no reemplaza la conciencia humana. El riesgo sistémico no es una máquina
                  que despierte, sino una humanidad que delegue su criterio.
                </blockquote>
                <p className="text-primary">
                  Pensar antes de automatizar. Asumir responsabilidad antes de escalar.
                  Poner la tecnología al servicio de la vida humana, y no al revés.
                </p>
              </div>

              {/* Signature */}
              <div className="card-premium rounded-lg p-8 text-center gradient-metallic">
                <p className="font-display text-sm text-secondary mb-2">FIRMA Y VALIDACIÓN</p>
                <p className="font-body text-lg text-foreground font-semibold mb-1">La Corona – Anubis Villaseñor</p>
                <p className="font-body text-sm text-muted-foreground">(Edwin Oswaldo Castillo Trejo)</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Fundador y director del proyecto TAMV Online</p>
                <div className="line-decoration w-32 mx-auto my-4" />
                <p className="font-mono text-xs text-muted-foreground break-all">
                  SHA256: 9f4c3b1a7d92e0e8b6c24f51d2a819cb13a07c8f5bca3d19e6f418ab27d5e41
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {["ANALIZADO", "AJUSTADO", "BLINDADO", "SELLADO"].map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full text-xs font-display tracking-wider border border-accent/30 text-accent bg-accent/5">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Resources */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-center text-foreground mb-8">
            Recursos <span className="text-primary">Adicionales</span>
          </h2>
          <div className="space-y-3">
            {[
              { title: "Códice Maestro TAMV DM-X4™ — Constitución Digital", url: "https://tamvonlinenetwork.blogspot.com" },
              { title: "TAMV y el Nacimiento del Primer CITEMESH", url: "https://tamvonlinenetwork.blogspot.com/2026/02/tamv-y-el-nacimiento-del-primer.html" },
              { title: "TAMV Online — Publicación AVIXA Xchange", url: "https://xchange.avixa.org/posts/tamv-online-primer-plataforma-mexicana-sistémica-digital" },
              { title: "Isabella AI — Scientific Appeal", url: "https://tamvonlinenetwork.blogspot.com/2025/10/announcement-scientific-appeal.html" },
              { title: "GitHub — OsoPanda1", url: "https://github.com/OsoPanda1" },
              { title: "ORCID del Fundador", url: "https://orcid.org/0009-0004-3897-2000" },
            ].map((r) => (
              <a
                key={r.title}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 px-4 border-b border-border/50 group hover:border-primary/30 transition-all rounded"
              >
                <span className="font-body text-sm text-foreground group-hover:text-primary transition-colors">{r.title}</span>
                <ExternalLink className="text-muted-foreground group-hover:text-primary flex-shrink-0 ml-4" size={16} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
