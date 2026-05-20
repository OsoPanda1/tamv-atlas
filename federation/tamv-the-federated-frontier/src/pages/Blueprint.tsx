import { motion } from "framer-motion";
import { Brain, Network, Shield, Code2, Database, Mic, Scale, FileCheck, GitBranch, Layers, BookOpen, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tripleFederado = [
  {
    icon: BookOpen,
    title: "Federación Filosófica",
    color: "text-primary",
    desc: "Tricotomía dialéctica hegeliana (tesis · antítesis · síntesis), fenomenología y analogía. Define valores, límites éticos y criterios de sentido. Gobernanza reflexiva con autoevaluación continua.",
  },
  {
    icon: Code2,
    title: "Federación Técnico-Operacional",
    color: "text-accent",
    desc: "Federated Learning descentralizado, sincronización adaptativa con CRDTs, criptografía avanzada (CP-ABE, CKKS, secret sharing), defensa activa contra data poisoning. Cells sectoriales autónomas y orquestación modular.",
  },
  {
    icon: Layers,
    title: "Federación Simbólico-Narrativa",
    color: "text-secondary",
    desc: "Sistemas de símbolos explícitos, lógica formal y marcos semánticos. Motor narrativo con metáfora, control de estilo y emociones. Estancias narrativas con auditoría y linaje de decisiones.",
  },
];

const algoritmos = [
  { name: "FedAvg", robust: "Media", fair: "Media", res: "Media", eff: "Alta", use: "Datos IID, baja adversidad" },
  { name: "FedProx", robust: "Alta", fair: "Media", res: "Alta", eff: "Media", use: "Datos no-IID, heterogeneidad" },
  { name: "FedYogi", robust: "Alta", fair: "Alta", res: "Media", eff: "Alta", use: "Escenarios dinámicos" },
  { name: "FedMedian", robust: "Alta", fair: "Alta", res: "Alta", eff: "Baja", use: "Defensa contra outliers" },
  { name: "q-FedAvg", robust: "Alta", fair: "Muy alta", res: "Media", eff: "Media", use: "Fairness crítico" },
];

const estancias = [
  { name: "Local", purpose: "Almacenamiento en dispositivo", crypto: "AES-256", access: "Usuario/Cell" },
  { name: "Federada", purpose: "Modelos y parámetros agregados", crypto: "CKKS, CP-ABE", access: "Nodo autorizado" },
  { name: "Narrativa", purpose: "Historias, explicaciones, linaje", crypto: "AES-256", access: "Cell/Auditor" },
  { name: "Auditoría", purpose: "Logs, trazabilidad, eventos", crypto: "SHA-512 + AES", access: "Auditor/Comité técnico" },
  { name: "Índice Referencial", purpose: "Metadatos e índices de búsqueda", crypto: "AES-128", access: "Sistema" },
];

const librerias = [
  { name: "isabella-core", desc: "Núcleo de federated learning, sincronización y QA automatizado." },
  { name: "isabella-voice", desc: "Motor TTS federado, control de estilo y compilación móvil (TFLite/ONNX)." },
  { name: "isabella-narrative", desc: "Generación y auditoría de narrativas justificativas." },
  { name: "isabella-security", desc: "Cifrado CKKS/CP-ABE, gestión de claves y defensa adversaria." },
];

const kpis = [
  { kpi: "Precisión modelo global", cat: "IA / Calidad", range: ">95%" },
  { kpi: "Tasa participación nodos", cat: "Operacional", range: ">90%" },
  { kpi: "Tiempo recuperación (RTO)", cat: "Resiliencia", range: "<4h" },
  { kpi: "Pérdida de datos (RPO)", cat: "Resiliencia", range: "<8h" },
  { kpi: "Incidentes de seguridad", cat: "Seguridad", range: "0" },
  { kpi: "Sesgo demográfico", cat: "Ética", range: "<2%" },
  { kpi: "Trazabilidad de linaje", cat: "Auditoría", range: "100%" },
];

const cumplimiento = [
  "ISO 42001 — Sistemas de Gestión de IA",
  "EU AI Act — Evaluaciones de impacto y riesgos",
  "NIST AI RMF — Gestión de riesgos",
  "GDPR / HIPAA — Privacidad y salud",
  "INAI México — Marco legal nacional",
  "Red Teaming continuo y respuesta a incidentes",
  "Data lineage trazable end-to-end",
  "Auditoría multinube cruzada (AWS · Azure · GCP · Oracle)",
];

export default function Blueprint() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-display text-xs tracking-[0.4em] text-accent text-glow-lime mb-3">DOCUMENTO MAESTRO EXPANDIDO</p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4 leading-tight">
              <span className="text-primary text-glow-blue">Isabella Villaseñor IA™</span><br />
              <span className="text-secondary text-glow-silver">NextGen Blueprint</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mb-6">
              Especificación modular avanzada del modelo <span className="text-accent">Triple Federado</span> —
              Filosófico · Técnico-Operacional · Simbólico-Narrativo. Base para despliegues multinube,
              auditoría internacional y activación de cells sectoriales del ecosistema TAMV.
            </p>
            <div className="line-decoration w-48 mb-6" />
            <div className="flex flex-wrap gap-2">
              {["ISO 42001", "EU AI Act", "NIST AI RMF", "GDPR", "HIPAA", "Multinube"].map((t) => (
                <span key={t} className="px-3 py-1 text-[10px] font-display tracking-wider border border-primary/30 bg-primary/5 text-primary rounded">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Triple Federado */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.4em] text-accent mb-3">SECCIÓN 2 · MARCO TRIPLE</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              El <span className="text-primary text-glow-blue">Triple Federado</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto mt-4">
              Marco de integración que articula tres dimensiones interdependientes para que la IA sea técnicamente
              robusta, comprensible, auditable y alineada con valores humanos y sectoriales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {tripleFederado.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-premium rounded-lg p-8"
              >
                <t.icon className={`${t.color} mb-4`} size={32} />
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">{t.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Federated Learning Algorithms */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.4em] text-accent mb-3">SECCIÓN 3 · IMPLEMENTACIÓN</p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Algoritmos de <span className="text-primary text-glow-blue">Federated Learning</span>
            </h2>
          </div>

          <Card className="card-premium p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="text-accent" size={20} />
              <h3 className="font-display text-base text-foreground">FedAvg · Promedio Federado</h3>
            </div>
            <pre className="bg-background/60 border border-border rounded p-4 text-xs font-mono text-muted-foreground overflow-x-auto">
{`for round in range(T):
    selected_clients = sample_clients()
    local_updates = []
    for client in selected_clients:
        w_local = train_local(client, w_global)
        local_updates.append((client.data_size, w_local))
    w_global = weighted_average(local_updates)`}
            </pre>
            <p className="text-xs text-muted-foreground mt-3 font-body">
              Fórmula: <span className="text-primary">w_{`{t+1}`} = Σ (n_k / n_s) · w_{`{t+1}^k`}</span> — reduce comunicación y preserva privacidad.
            </p>
          </Card>

          <div className="max-w-5xl mx-auto card-premium rounded-lg p-2 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-display text-xs tracking-wider">Algoritmo</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Robustez</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Fairness</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Resiliencia</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Eficiencia</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Uso recomendado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {algoritmos.map((a) => (
                  <TableRow key={a.name}>
                    <TableCell className="font-body text-sm text-primary">{a.name}</TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{a.robust}</TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{a.fair}</TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{a.res}</TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{a.eff}</TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{a.use}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Defensa & Voz */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium p-8">
              <Shield className="text-destructive mb-4" size={28} />
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Defensa Contra Data Poisoning</h3>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>· Detección de anomalías en gradientes y parámetros</li>
                <li>· PCA y thresholds para outliers</li>
                <li>· Agregación robusta: FedMedian, FedTrimmedMean</li>
                <li>· Sistema PoCC (Proof of Contribution Consensus) + blockchain</li>
              </ul>
              <pre className="bg-background/60 border border-border rounded p-3 text-[11px] font-mono text-muted-foreground mt-4 overflow-x-auto">
{`for update in client_updates:
    if is_anomalous(update):
        flag_as_malicious(update)
aggregate(normal_updates)`}
              </pre>
            </Card>

            <Card className="card-premium p-8">
              <Mic className="text-accent mb-4" size={28} />
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Motor de Voz Isabella</h3>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>· Modelo base: <span className="text-primary">FastSpeech2 + HiFi-GAN</span></li>
                <li>· Entrenamiento federado con FedSpeech + LoRA</li>
                <li>· Control de estilo: prosodia, emociones, narrativa</li>
                <li>· Compilación móvil: TFLite, ONNX, ML Kit</li>
                <li>· Inferencia <span className="text-accent">&lt;0.5s</span> en gama media</li>
                <li>· Clonación con muestras mínimas (15–30s)</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Estancias de Datos */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.4em] text-accent mb-3">SECCIÓN 5 · ARQUITECTURA DE DATOS</p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Estancias de <span className="text-secondary text-glow-silver">Datos</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto card-premium rounded-lg p-2 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-display text-xs tracking-wider">Estancia</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Propósito</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Cifrado</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Acceso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estancias.map((e) => (
                  <TableRow key={e.name}>
                    <TableCell className="font-body text-sm text-primary">{e.name}</TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{e.purpose}</TableCell>
                    <TableCell className="font-body text-xs text-accent">{e.crypto}</TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{e.access}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card className="card-premium p-6 mt-8 max-w-3xl mx-auto">
            <h4 className="font-display text-sm text-foreground mb-3 flex items-center gap-2">
              <Database size={16} className="text-primary" /> Flujo de Sincronización Federada
            </h4>
            <ol className="space-y-2 font-body text-sm text-muted-foreground list-decimal list-inside">
              <li>El nodo local entrena el modelo y cifra parámetros con CKKS.</li>
              <li>Envía el fragmento cifrado a la estancia federada.</li>
              <li>El servidor agrega fragmentos y actualiza el modelo global.</li>
              <li>El modelo global cifrado se distribuye a los nodos.</li>
              <li>Cada nodo actualiza su estancia local y narrativa.</li>
            </ol>
          </Card>
        </div>
      </section>

      {/* Librerías propias */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.4em] text-accent mb-3">SECCIÓN 6 · LIBRERÍAS PROPIAS</p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Stack <span className="text-primary text-glow-blue">Isabella</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-3">
              Auditable, portable y sin dependencias de terceros no auditables.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {librerias.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-premium rounded-lg p-6"
              >
                <code className="font-mono text-sm text-accent text-glow-lime">{l.name}</code>
                <p className="font-body text-sm text-muted-foreground mt-2">{l.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.4em] text-accent mb-3">SECCIÓN 7 · APÉNDICES OPERATIVOS</p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              KPIs y Métricas de <span className="text-secondary text-glow-silver">Seguridad y Ética</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto card-premium rounded-lg p-2 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-display text-xs tracking-wider">KPI</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Categoría</TableHead>
                  <TableHead className="font-display text-xs tracking-wider">Rango ideal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpis.map((k) => (
                  <TableRow key={k.kpi}>
                    <TableCell className="font-body text-sm text-foreground">{k.kpi}</TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{k.cat}</TableCell>
                    <TableCell className="font-body text-xs text-accent">{k.range}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Cumplimiento */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.4em] text-accent mb-3">SECCIÓN 8 · CUMPLIMIENTO INTERNACIONAL</p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Certificación <span className="text-primary text-glow-blue">ISO · NIST · AI Act</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cumplimiento.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 border border-border rounded card-premium"
              >
                <FileCheck className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="font-body text-sm text-muted-foreground">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusión */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Brain className="mx-auto text-primary mb-6 animate-float" size={48} />
          <blockquote className="font-body text-lg text-foreground italic leading-relaxed mb-6">
            "El blueprint Isabella Villaseñor IA™ NextGen representa una síntesis avanzada de filosofía,
            técnica y narrativa, garantizando robustez, auditabilidad, equidad y cumplimiento multinube e internacional.
            IA eficiente, segura, comprensible, ética y alineada con valores humanos."
          </blockquote>
          <p className="font-display text-xs tracking-[0.3em] text-muted-foreground mb-6">
            FIN DE LA ESPECIFICACIÓN MODULAR AVANZADA
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/5">
            <MapPin size={14} className="text-destructive" />
            <span className="font-display text-xs tracking-[0.2em] text-destructive">ORGULLOSAMENTE REALMONTENSES</span>
          </div>
        </div>
      </section>
    </div>
  );
}
