import type { FC } from "react";

export const ArchitectureMiniMap: FC = () => {
  return (
    <div className="border border-slate-800/80 rounded-2xl bg-slate-950/80 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-mono text-slate-300">MAPA MINIMAL · NÚCLEO TAMV</h3>
        <span className="text-[10px] font-mono text-slate-500">ISNI · MD-X · UTAMV · RDM · XR</span>
      </div>
      <div className="font-mono text-[10px] leading-[1.2rem] text-slate-400 whitespace-pre overflow-x-auto">
{`       VALIDACIÓN GLOBAL
  ORCID · ROR · DOI · Zenodo

          ▲
          │
  ISNI / SNI  ←  Identidad soberana
          │
   ┌──────┼───────────────┐
   │      │               │
 MD-X4   ISABELLA       BOOKPI
 Infra   Conciencia      Ética
   │         │             │
   └─────────┼─────────────┘
             │
           UTAMV
   Cognición académica
             │
      ┌──────┴────────────┐
      │                   │
   RDM DIGITAL        OTROS NODOS
 Territorio           Pueblos digitales
             │
     Odoo · Web · XR · 4D
       Economía soberana`}
      </div>
    </div>
  );
};
