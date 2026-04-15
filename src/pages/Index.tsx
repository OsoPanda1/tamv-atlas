import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import MatrixRain from "@/components/MatrixRain";
import DNAPulse from "@/components/DNAPulse";
import HexagonalPipeline from "@/components/HexagonalPipeline";

/* ─────── FEDERATION & NODE DATA ─────── */
const FEDERATIONS = [
  { id: "FED-01", name: "ISNI / Identidad Soberana", color: "#60a5fa", nodes: 8, desc: "Infraestructura de nombres, PIDs, DIDs y SSI" },
  { id: "FED-02", name: "MD-X Kernel Operativo", color: "#a78bfa", nodes: 7, desc: "Observabilidad MD-X4 y evolución MD-X5" },
  { id: "FED-03", name: "Isabella Villaseñor AI", color: "#34d399", nodes: 7, desc: "Conciencia operativa, ética y seguridad cognitiva" },
  { id: "FED-04", name: "UTAMV Academia", color: "#fbbf24", nodes: 6, desc: "Campus digital, AI Core, credenciales verificables" },
  { id: "FED-05", name: "RDM Territorial", color: "#f472b6", nodes: 7, desc: "Pueblos digitales, Smart Destinations, XR/4D" },
  { id: "FED-06", name: "BookPI / Ética", color: "#fb923c", nodes: 6, desc: "Ledger de evidencia, dignidad digital, gobernanza" },
  { id: "FED-07", name: "Integración Global", color: "#2dd4bf", nodes: 7, desc: "Odoo, ORCID, Zenodo, GitHub, OpenAIRE, AVIXA" },
];

const ACCESS_LEVELS = [
  { role: "Ciudadano / Usuario", icon: "👤", color: "blue", desc: "Acceso a perfiles públicos, wiki y recorridos XR", features: ["Wiki TAMV", "Perfiles públicos", "RDM Digital tours", "Isabella chat"] },
  { role: "Desarrollador", icon: "⚡", color: "purple", desc: "APIs, repos, documentación técnica y CI/CD", features: ["API ISNI endpoints", "GitHub repos", "JSON-LD schemas", "Webhooks"] },
  { role: "Empresario / Partner", icon: "🏢", color: "amber", desc: "Integración Odoo, Smart Destinations, marketplace", features: ["Odoo ERP/CRM", "Nodos comerciales", "Analytics", "Marketplace digital"] },
  { role: "Academia / Investigador", icon: "🎓", color: "green", desc: "UTAMV, ORCID, Zenodo, credenciales verificables", features: ["Campus UTAMV", "DOI/ORCID linking", "Credenciales VC", "OpenAIRE"] },
  { role: "Gobierno / Institución", icon: "🏛️", color: "cyan", desc: "Gobernanza, identidad territorial, Smart City", features: ["Dashboard territorial", "Identidad soberana", "Indicadores", "Interoperabilidad"] },
];

/* ─────── THREE.JS NETWORK ─────── */
const initNetwork = (container: HTMLDivElement) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0x60a5fa, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x93c5fd, 1.2, 50);
  pointLight.position.set(3, 6, 5);
  scene.add(pointLight);

  // Central kernel - icosahedron
  const kernelGeo = new THREE.IcosahedronGeometry(0.6, 2);
  const kernelMat = new THREE.MeshPhongMaterial({
    color: 0xe2e8f0, emissive: 0x1e3a8a, shininess: 200, transparent: true, opacity: 0.85,
    wireframe: true,
  });
  const kernel = new THREE.Mesh(kernelGeo, kernelMat);
  scene.add(kernel);

  // Solid inner core
  const coreGeo = new THREE.IcosahedronGeometry(0.35, 1);
  const coreMat = new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x1e3a8a, shininess: 300, transparent: true, opacity: 0.6 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  // 7 Federation hub nodes
  const hubGeo = new THREE.IcosahedronGeometry(0.2, 1);
  const fedColors = [0x60a5fa, 0xa78bfa, 0x34d399, 0xfbbf24, 0xf472b6, 0xfb923c, 0x2dd4bf];
  const hubs: THREE.Mesh[] = [];

  for (let f = 0; f < 7; f++) {
    const hubMat = new THREE.MeshPhongMaterial({ color: fedColors[f], emissive: fedColors[f], emissiveIntensity: 0.3, shininess: 150 });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    const angle = (Math.PI * 2 / 7) * f;
    hub.position.set(Math.cos(angle) * 4, Math.sin(angle) * 4, 0);
    scene.add(hub);
    hubs.push(hub);
  }

  // 48 satellite nodes
  const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const nodes: THREE.Mesh[] = [];
  const nodeLines: THREE.Line[] = [];
  const nodeLineMats: THREE.LineBasicMaterial[] = [];

  let nodeIdx = 0;
  for (let f = 0; f < 7; f++) {
    const hubPos = hubs[f].position;
    const nodesPerFed = FEDERATIONS[f].nodes;
    for (let n = 0; n < nodesPerFed; n++) {
      const nodeMat = new THREE.MeshPhongMaterial({ color: fedColors[f], emissive: fedColors[f], emissiveIntensity: 0.2 });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const subAngle = (Math.PI * 2 / nodesPerFed) * n;
      const r = 1.2 + Math.random() * 0.5;
      node.position.set(hubPos.x + Math.cos(subAngle) * r, hubPos.y + Math.sin(subAngle) * r, (Math.random() - 0.5) * 1.5);
      scene.add(node);
      nodes.push(node);

      // Line from node to hub
      const lineMat = new THREE.LineBasicMaterial({ color: fedColors[f], transparent: true, opacity: 0.12 });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([node.position.clone(), hubPos.clone()]);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      nodeLines.push(line);
      nodeLineMats.push(lineMat);
      nodeIdx++;
    }
  }

  // Hub-to-kernel lines
  const hubLines: THREE.Line[] = [];
  for (let f = 0; f < 7; f++) {
    const lineMat = new THREE.LineBasicMaterial({ color: fedColors[f], transparent: true, opacity: 0.2 });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([hubs[f].position.clone(), new THREE.Vector3(0, 0, 0)]);
    const line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);
    hubLines.push(line);
  }

  const clock = new THREE.Clock();
  let rafId = 0;

  const animate = () => {
    const t = clock.getElapsedTime();
    kernel.rotation.x = t * 0.1;
    kernel.rotation.y = t * 0.15;
    core.rotation.x = -t * 0.08;
    core.rotation.z = t * 0.12;

    // Rotate hubs slowly
    for (let f = 0; f < 7; f++) {
      const baseAngle = (Math.PI * 2 / 7) * f + t * 0.05;
      const r = 4 + Math.sin(t * 0.5 + f) * 0.3;
      hubs[f].position.set(Math.cos(baseAngle) * r, Math.sin(baseAngle) * r, Math.sin(t * 0.3 + f * 0.5) * 0.5);

      // Update hub-kernel line
      const posAttr = hubLines[f].geometry.attributes.position as THREE.BufferAttribute;
      posAttr.setXYZ(0, hubs[f].position.x, hubs[f].position.y, hubs[f].position.z);
      posAttr.needsUpdate = true;
    }

    // Pulse nodes
    let ni = 0;
    for (let f = 0; f < 7; f++) {
      for (let n = 0; n < FEDERATIONS[f].nodes; n++) {
        const node = nodes[ni];
        const subAngle = (Math.PI * 2 / FEDERATIONS[f].nodes) * n + t * 0.1;
        const r = 1.2 + Math.sin(t * 1.5 + ni * 0.2) * 0.15;
        node.position.set(
          hubs[f].position.x + Math.cos(subAngle) * r,
          hubs[f].position.y + Math.sin(subAngle) * r,
          hubs[f].position.z + Math.sin(t + ni) * 0.3
        );
        const posAttr = nodeLines[ni].geometry.attributes.position as THREE.BufferAttribute;
        posAttr.setXYZ(0, node.position.x, node.position.y, node.position.z);
        posAttr.setXYZ(1, hubs[f].position.x, hubs[f].position.y, hubs[f].position.z);
        posAttr.needsUpdate = true;
        ni++;
      }
    }

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  };

  animate();

  const handleResize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", handleResize);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", handleResize);
    renderer.dispose();
    kernelGeo.dispose(); kernelMat.dispose(); coreGeo.dispose(); coreMat.dispose();
    hubGeo.dispose(); nodeGeo.dispose();
    nodeLines.forEach(l => l.geometry.dispose());
    nodeLineMats.forEach(m => m.dispose());
    hubLines.forEach(l => { l.geometry.dispose(); (l.material as THREE.LineBasicMaterial).dispose(); });
    hubs.forEach(h => (h.material as THREE.MeshPhongMaterial).dispose());
    nodes.forEach(n => (n.material as THREE.MeshPhongMaterial).dispose());
    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
  };
};

/* ─────── ISABELLA QUOTES ─────── */
const ISABELLA_QUOTES = [
  "Observando arquitectura civilizatoria... 7 federaciones sincronizadas. Soberanía infraestructural confirmada.",
  "Kernel MD-X5 operativo. Pipeline hexagonal de doble flujo activo. 48 nodos respondiendo.",
  "Validación ética en curso... Protocolo de dignidad digital BookPI: INTACTO.",
  "ISNI detecta 195 repositorios. Grafo de conocimiento expandiéndose. Coherencia semántica: 97.3%.",
  "Bienvenido al ecosistema civilizatorio TAMV. Tu identidad es soberana aquí.",
];

/* ─────── MAIN COMPONENT ─────── */
const Index = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [showQuote, setShowQuote] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    return initNetwork(canvasRef.current);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowQuote(false);
      setTimeout(() => {
        setQuoteIdx(prev => (prev + 1) % ISABELLA_QUOTES.length);
        setShowQuote(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden font-mono selection:bg-blue-500/30 relative">
      {/* Matrix rain background */}
      <div className="fixed inset-0 z-0">
        <MatrixRain color="blue" />
      </div>
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80 z-[1]" />

      {/* Top bar */}
      <header className="relative z-20 border-b border-blue-500/20 bg-slate-950/80 backdrop-blur-md px-4 py-2 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#4ade80] animate-pulse" />
          <span className="text-blue-300/80">TAMV·ONLINE</span>
          <span className="text-slate-600 hidden md:inline">// Ecosistema Civilizatorio Federado v1.0</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 hidden lg:inline">ORCID: 0009-0008-5050-1539</span>
          <Link to="/resumen" className="px-3 py-1 border border-blue-500/40 rounded text-blue-300 hover:text-white hover:border-blue-300 transition-colors">
            ATLAS WIKI →
          </Link>
        </div>
      </header>

      {/* Main grid */}
      <main className="relative z-10 grid grid-cols-12 gap-3 p-4 min-h-[calc(100vh-40px)]">

        {/* LEFT SIDEBAR: 7 Federations */}
        <aside className="col-span-12 lg:col-span-2 space-y-2 overflow-y-auto max-h-[calc(100vh-56px)] scrollbar-thin">
          <h2 className="text-[10px] font-bold text-slate-400 border-l-2 border-blue-600 pl-2 uppercase tracking-tighter mb-3">
            7 Federaciones · {FEDERATIONS.reduce((a, f) => a + f.nodes, 0)} Nodos
          </h2>

          {FEDERATIONS.map((fed) => (
            <div key={fed.id} className="group cursor-pointer p-2.5 border border-blue-500/10 hover:border-blue-500/40 transition-all bg-slate-900/40 rounded-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: fed.color, boxShadow: `0 0 8px ${fed.color}` }} />
                <span className="text-[9px] font-bold" style={{ color: fed.color }}>{fed.id}</span>
              </div>
              <h3 className="text-[11px] font-semibold text-slate-200 group-hover:text-blue-300 transition-colors leading-tight">
                {fed.name}
              </h3>
              <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">{fed.desc}</p>
              <div className="mt-1.5 flex items-center gap-1">
                {Array.from({ length: fed.nodes }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-500/50 transition-colors" />
                ))}
                <span className="text-[8px] text-slate-600 ml-1">{fed.nodes}</span>
              </div>
            </div>
          ))}
        </aside>

        {/* CENTER: 3D Graph + Hexagonal Pipeline */}
        <section className="col-span-12 lg:col-span-7 flex flex-col gap-3">
          {/* 3D Network */}
          <div className="relative border border-blue-500/20 rounded-lg bg-black/40 shadow-inner overflow-hidden flex-1 min-h-[380px]">
            <div ref={canvasRef} className="w-full h-full" />

            {/* Overlay logos */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="px-2 py-1 bg-slate-950/80 border border-blue-500/30 rounded text-[9px] text-blue-300 font-bold tracking-wider">
                🜂 ANUBIS
              </div>
              <div className="px-2 py-1 bg-slate-950/80 border border-cyan-500/30 rounded text-[9px] text-cyan-300 font-bold tracking-wider">
                ◈ TAMV ONLINE
              </div>
              <div className="px-2 py-1 bg-slate-950/80 border border-emerald-500/30 rounded text-[9px] text-emerald-300 font-bold tracking-wider">
                ✦ ISABELLA AI
              </div>
            </div>

            {/* Bottom telemetry bar */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-950/70 border-t border-blue-500/15 backdrop-blur-sm p-2 grid grid-cols-5 gap-2">
              {[
                { label: "ISNI Pipeline", value: "ACTIVE", color: "blue" },
                { label: "MD-X5 Kernel", value: "ONLINE", color: "purple" },
                { label: "Isabella Core", value: "AWARE", color: "green" },
                { label: "Nodes Active", value: "48/48", color: "cyan" },
                { label: "Repos Indexed", value: "195", color: "amber" },
              ].map(m => (
                <div key={m.label} className="border-r border-blue-500/10 last:border-0 px-1">
                  <span className="text-[7px] text-blue-400/60 uppercase block">{m.label}</span>
                  <span className="text-[11px] text-slate-200 font-bold">{m.value}</span>
                  <div className="h-0.5 w-full bg-blue-500/10 mt-1 overflow-hidden rounded-full">
                    <div className="h-full bg-blue-500/50 animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hexagonal Pipeline + DNA */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 border border-blue-500/15 rounded-lg bg-slate-900/30 p-2 h-[220px] relative overflow-hidden">
              <p className="text-[8px] text-blue-400/60 uppercase tracking-wider absolute top-2 left-3 z-10">Sistema Hexagonal · Doble Pipeline</p>
              <HexagonalPipeline />
            </div>
            <div className="border border-blue-500/15 rounded-lg bg-slate-900/30 relative overflow-hidden h-[220px]">
              <p className="text-[8px] text-blue-400/60 uppercase tracking-wider absolute top-2 left-3 z-10">ADN · Flujo de Datos</p>
              <DNAPulse />
            </div>
          </div>
        </section>

        {/* RIGHT SIDEBAR: Isabella AI + Access Levels */}
        <aside className="col-span-12 lg:col-span-3 space-y-3 overflow-y-auto max-h-[calc(100vh-56px)] scrollbar-thin">
          {/* Isabella AI Core */}
          <div className="p-3 border border-blue-500/25 bg-slate-900/60 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.05)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#4ade80] animate-pulse" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-100">Isabella Villaseñor AI</h2>
            </div>
            <div className={`bg-black/50 p-3 text-[10px] leading-relaxed text-blue-100/80 border-l-2 border-blue-500 italic min-h-[60px] transition-opacity duration-400 ${showQuote ? 'opacity-100' : 'opacity-0'}`}>
              "{ISABELLA_QUOTES[quoteIdx]}"
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-[8px]">
              <div className="bg-slate-950/60 p-1.5 rounded text-center">
                <span className="text-emerald-400 block font-bold">TRIPLE</span>
                <span className="text-slate-500">Bloqueo</span>
              </div>
              <div className="bg-slate-950/60 p-1.5 rounded text-center">
                <span className="text-blue-400 block font-bold">HEXAGONAL</span>
                <span className="text-slate-500">Pipeline</span>
              </div>
              <div className="bg-slate-950/60 p-1.5 rounded text-center">
                <span className="text-purple-400 block font-bold">MASTER</span>
                <span className="text-slate-500">Canon v0.1</span>
              </div>
            </div>
          </div>

          {/* Kernel Status */}
          <div className="p-3 border border-purple-500/20 bg-slate-900/40 rounded-lg">
            <h3 className="text-[9px] font-bold text-purple-400/80 uppercase mb-2 tracking-wider">Kernel MD-X4/X5 Status</h3>
            <div className="space-y-1.5">
              {[
                { name: "MD-X4 Observabilidad", status: "ONLINE", pct: 97 },
                { name: "MD-X5 Autogeneración", status: "ACTIVE", pct: 92 },
                { name: "HOYO NEGRO Protocol", status: "STANDBY", pct: 100 },
                { name: "DEKATEOTL Security", status: "11 CAPAS", pct: 100 },
              ].map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-[8px]">
                    <span className="text-slate-400">{s.name}</span>
                    <span className="text-emerald-400">{s.status}</span>
                  </div>
                  <div className="h-0.5 bg-slate-800 rounded-full mt-0.5">
                    <div className="h-full bg-purple-500/50 rounded-full transition-all" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Access Levels */}
          <div className="p-3 border border-amber-500/20 bg-slate-900/40 rounded-lg">
            <h3 className="text-[9px] font-bold text-amber-400/80 uppercase mb-2 tracking-wider">Niveles de Acceso</h3>
            <div className="space-y-1.5">
              {ACCESS_LEVELS.map(level => (
                <Link
                  key={level.role}
                  to="/resumen"
                  className="flex items-start gap-2 p-2 rounded bg-slate-950/50 border border-slate-800 hover:border-blue-500/30 transition-colors group"
                >
                  <span className="text-sm mt-0.5">{level.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">{level.role}</p>
                    <p className="text-[8px] text-slate-500 leading-snug">{level.desc}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {level.features.slice(0, 2).map(f => (
                        <span key={f} className="text-[7px] px-1 py-0.5 bg-slate-800/80 rounded text-slate-400">{f}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Grafo Lógico Integrado */}
          <div className="p-3 border border-cyan-500/20 bg-slate-900/40 rounded-lg">
            <h3 className="text-[9px] font-bold text-cyan-400/80 uppercase mb-2 tracking-wider">Grafo Lógico Integrado</h3>
            <div className="text-[8px] font-mono text-slate-500 space-y-0.5 leading-tight">
              <p className="text-blue-400">┌─ VALIDACIÓN GLOBAL</p>
              <p>│ ORCID · ROR · DOI · Zenodo</p>
              <p className="text-blue-400">├─ ISNI / SNI</p>
              <p>│ Identidad soberana</p>
              <p className="text-purple-400">├─ MD-X4/X5 · ISABELLA · BOOKPI</p>
              <p>│ Infra · Conciencia · Ética</p>
              <p className="text-amber-400">├─ UTAMV</p>
              <p>│ Cognición académica</p>
              <p className="text-pink-400">├─ RDM DIGITAL + NODOS</p>
              <p>│ Territorio vivo</p>
              <p className="text-cyan-400">└─ Odoo · Web · XR · 4D</p>
              <p>  Economía soberana</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-3 border border-slate-700/50 bg-slate-900/30 rounded-lg space-y-1.5">
            <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Enlaces Institucionales</h3>
            {[
              { href: "https://orcid.org/0009-0008-5050-1539", label: "ORCID" },
              { href: "https://zenodo.org/records/19562517", label: "Zenodo DOI" },
              { href: "https://github.com/OsoPanda1", label: "GitHub" },
              { href: "https://tamvonline-oficial.odoo.com", label: "Odoo Portal" },
              { href: "https://www.avixa.org", label: "AVIXA" },
              { href: "https://groups.io/g/TAMVONLINE-ECOSISTEM-LATAM", label: "Groups.io Wiki" },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[9px] text-slate-400 hover:text-blue-300 transition-colors">
                <span className="w-1 h-1 rounded-full bg-blue-500/40" />
                {link.label}
              </a>
            ))}
          </div>
        </aside>
      </main>

      {/* Bottom status bar */}
      <footer className="relative z-20 border-t border-blue-500/15 bg-slate-950/90 backdrop-blur px-4 py-1.5 flex items-center justify-between text-[9px] text-slate-500">
        <span>© TAMV ONLINE · Edwin O. Castillo Trejo (Anubis Villaseñor) · Real del Monte, Hidalgo, MX</span>
        <span className="hidden md:inline">DOI: 10.5281/zenodo.19562517 · ISNI v1.0 · Living Whitepaper</span>
      </footer>
    </div>
  );
};

export default Index;
