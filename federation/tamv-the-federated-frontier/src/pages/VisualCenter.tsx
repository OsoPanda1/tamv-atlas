import { Card } from "@/components/ui/card";
import heroBg from "@/assets/hero-bg.jpg";
import logoTamv from "@/assets/logo-tamv.jpg";
import ecosistemaBg from "@/assets/ecosistema-bg.jpg";
import citemesh from "@/assets/citemesh.png";
import arquitectura from "@/assets/tamv-architecture.png";
import nexoAgua from "@/assets/nexo-agua.png";
import metaverso from "@/assets/metaverso-latam.png";
import isabellaPhoto from "@/assets/isabella-ai.jpg";
import eoct from "@/assets/visuals/eoct-nodo-cero.svg";
import gemet from "@/assets/visuals/gemet-protocol.svg";
import isabellaKernel from "@/assets/visuals/isabella-kernel.svg";
import federados7 from "@/assets/visuals/utamv-7-federados.svg";
import facultad from "@/assets/visuals/utamv-facultad-sistemico.svg";
import d1 from "@/assets/visuals/diagram-1.svg";
import d2 from "@/assets/visuals/diagram-2.svg";
import d3 from "@/assets/visuals/diagram-3.svg";
import d4 from "@/assets/visuals/diagram-4.svg";
import d5 from "@/assets/visuals/diagram-5.svg";
import d6 from "@/assets/visuals/diagram-6.svg";
import d7 from "@/assets/visuals/diagram-7.svg";
import d8 from "@/assets/visuals/diagram-8.svg";
import d9 from "@/assets/visuals/diagram-9.svg";
import d10 from "@/assets/visuals/diagram-10.svg";

const extraDiagrams = [d1,d2,d3,d4,d5,d6,d7,d8,d9,d10];

const mermaids = [
`graph TD\nA[Usuario] --> B[EOCT]\nB --> C[GEMET]\nC --> D[MSR]\nD --> E[BookPI]`,
`flowchart LR\nL0[Ética] --> L1[Memoria]\nL1 --> L2[Protocolos]\nL2 --> L3[Guardianía]\nL3 --> L4[XR]\nL4 --> L5[Dominio]\nL5 --> L6[UX]`,
`sequenceDiagram\nparticipant U as Usuario\nparticipant P as Protocolo\nparticipant M as MSR\nU->>P: Acción\nP->>M: Registrar evento\nM-->>U: Confirmación`
];

export default function VisualCenter() {
  const base = [heroBg, logoTamv, ecosistemaBg, citemesh, arquitectura, nexoAgua, metaverso, isabellaPhoto, eoct, gemet, isabellaKernel, federados7, facultad];
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl mb-6">Centro Visual TAMV</h1>
        <p className="text-muted-foreground mb-10">Integración completa de assets + nuevas visualizaciones operativas (EOCT, GEMET, Isabella, UTAMV y diagramas).</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {base.map((img) => (
            <Card key={img} className="p-3">
              <img src={img} alt={img} className="w-full h-44 object-cover rounded" />
              <p className="text-xs mt-2 text-muted-foreground break-all">{img}</p>
            </Card>
          ))}
          {extraDiagrams.map((img) => (
            <Card key={img} className="p-3">
              <img src={img} alt={img} className="w-full h-44 object-cover rounded" />
              <p className="text-xs mt-2 text-muted-foreground">{img.replace('/src/assets/visuals/', '')}</p>
            </Card>
          ))}
        </div>

        <h2 className="font-display text-2xl mb-4">Diagramas Mermaid</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mermaids.map((m, i) => (
            <Card key={i} className="p-4">
              <pre className="text-xs whitespace-pre-wrap">{m}</pre>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
