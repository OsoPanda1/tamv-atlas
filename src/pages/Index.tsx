import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const initTAMVNetwork = (container: HTMLDivElement) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#020617");

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0x60a5fa, 0.7);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x93c5fd, 1.5, 50);
  pointLight.position.set(3, 6, 5);
  scene.add(pointLight);

  const kernelGeometry = new THREE.IcosahedronGeometry(0.5, 1);
  const kernelMaterial = new THREE.MeshPhongMaterial({
    color: 0xe2e8f0,
    emissive: 0x1e293b,
    shininess: 200,
    transparent: true,
    opacity: 0.9,
  });
  const kernel = new THREE.Mesh(kernelGeometry, kernelMaterial);
  scene.add(kernel);

  const nodes: THREE.Mesh[] = [];
  const lines: THREE.Line[] = [];
  const lineMaterials: THREE.LineBasicMaterial[] = [];
  const nodeCount = 195;

  const nodeGeometry = new THREE.IcosahedronGeometry(0.12, 0);
  const nodeMaterial = new THREE.MeshPhongMaterial({
    color: 0x60a5fa,
    emissive: 0x1e3a8a,
    shininess: 100,
  });

  for (let i = 0; i < nodeCount; i++) {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

    node.position.setFromSphericalCoords(
      5,
      Math.acos(1 - (2 * i) / nodeCount),
      Math.sqrt(nodeCount * Math.PI) * i
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x475569,
      transparent: true,
      opacity: 0.18,
    });

    const points = [node.position.clone(), new THREE.Vector3(0, 0, 0)];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);

    scene.add(node);
    scene.add(line);
    nodes.push(node);
    lines.push(line);
    lineMaterials.push(lineMaterial);
  }

  const clock = new THREE.Clock();
  let rafId = 0;

  const animate = () => {
    const t = clock.getElapsedTime();

    kernel.rotation.x = t * 0.12;
    kernel.rotation.y = t * 0.18;

    nodes.forEach((node, i) => {
      const baseRadius = 5;
      const pulse = 0.15 * Math.sin(t * 1.2 + i * 0.3);
      const r = baseRadius + pulse;

      const theta = Math.acos(1 - (2 * i) / nodeCount);
      const phi = Math.sqrt(nodeCount * Math.PI) * i + t * 0.08;

      const newPos = new THREE.Vector3();
      newPos.setFromSphericalCoords(r, theta, phi);
      node.position.copy(newPos);

      const line = lines[i];
      const posAttr = line.geometry.attributes.position as THREE.BufferAttribute;
      posAttr.setXYZ(0, newPos.x, newPos.y, newPos.z);
      posAttr.setXYZ(1, 0, 0, 0);
      posAttr.needsUpdate = true;
    });

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

    scene.remove(kernel);
    kernelGeometry.dispose();
    kernelMaterial.dispose();
    nodeGeometry.dispose();
    nodeMaterial.dispose();

    lines.forEach((l) => l.geometry.dispose());
    lineMaterials.forEach((m) => m.dispose());

    renderer.dispose();
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
};

const Index = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = initTAMVNetwork(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <div className="h-full bg-slate-950 text-slate-200 overflow-hidden font-mono selection:bg-blue-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-black pointer-events-none" />

      <div className="absolute top-4 right-4 z-20">
        <Link to="/resumen" className="text-[11px] font-mono px-3 py-1 border border-blue-500/40 rounded text-blue-300 hover:text-white hover:border-blue-300 transition-colors">
          Ver wiki completa →
        </Link>
      </div>

      <main className="relative z-10 grid grid-cols-12 gap-4 p-6 h-full">
        <aside className="col-span-12 lg:col-span-2 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          <h2 className="text-xs font-bold text-slate-400 mb-4 border-l-2 border-blue-600 pl-2 uppercase tracking-tighter">
            7 Federaciones
          </h2>

          <div className="group cursor-pointer p-3 border border-blue-500/10 hover:border-blue-500/50 transition-all bg-slate-900/40 rounded-sm">
            <span className="text-[10px] text-blue-500 font-bold">FED-01</span>
            <h3 className="text-sm font-semibold group-hover:text-blue-400 transition-colors uppercase">
              Identidad ISNI
            </h3>
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-7 relative group border border-blue-500/20 rounded-lg bg-black/40 shadow-inner overflow-hidden min-h-[420px]">
          <div id="canvas-3d-system" ref={canvasRef} className="w-full h-full relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center opacity-20">
                <p className="text-[8px] animate-pulse">CARGANDO REPOSITORIOS (195/195)...</p>
                <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 h-24 bg-blue-900/5 border-t border-blue-500/20 backdrop-blur-sm p-3 grid grid-cols-4 gap-4">
            <div className="border-r border-blue-500/10 px-2">
              <span className="text-[8px] text-blue-400 uppercase">Input Stream</span>
              <div className="h-1 w-full bg-blue-500/20 mt-2 overflow-hidden">
                <div className="h-full bg-blue-500 animate-slide" />
              </div>
            </div>
            <div className="border-r border-blue-500/10 px-2">
              <span className="text-[8px] text-blue-400 uppercase">MD-X5 Filtering</span>
              <div className="grid grid-cols-3 gap-1 mt-1 italic text-[9px] text-slate-500">
                <span>HEX_01</span>
                <span>HEX_02</span>
                <span>HEX_03</span>
              </div>
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <div className="p-4 border border-blue-500/30 bg-slate-900/60 rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.05)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-ping" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-100">Isabella AI Core</h2>
            </div>
            <div className="bg-black/50 p-3 text-[11px] leading-relaxed text-blue-100/80 border-l-2 border-blue-500 italic">
              "Observando arquitectura... Soberanía infraestructural detectada. Pipelines de doble función operativos."
            </div>
          </div>

          <div className="p-4 border border-slate-500/20 bg-slate-950 rounded-sm">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-4">Filtración Hexagonal MD-X5</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <svg className="w-12 h-12 text-blue-500/40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
              </svg>
              <svg
                className="w-12 h-12 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
              </svg>
            </div>
          </div>
        </aside>
      </main>

      <style>{`
        @keyframes slide {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        .animate-slide {
          animation: slide 2s infinite linear;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Index;
