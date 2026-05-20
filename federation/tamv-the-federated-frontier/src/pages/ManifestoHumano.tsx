import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const contrasts = [
  { oldWay: "Retención adictiva", tamvWay: "Uso consciente" },
  { oldWay: "Extracción de datos", tamvWay: "Soberanía y trazabilidad" },
  { oldWay: "Complejidad confusa", tamvWay: "Lenguaje simple" },
  { oldWay: "Dependencia", tamvWay: "Transferencia de conocimiento" },
];

export default function ManifestoHumano() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs tracking-[0.35em] text-accent mb-3">MANIFIESTO DE CLARIDAD</p>
          <h1 className="font-display text-3xl md:text-5xl font-black mb-6">
            TAMV Online: infraestructura humana desde Latinoamérica
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            TAMV no busca hacer internet más adictivo. Busca hacerlo más entendible, útil y humano.
            La meta no es manipular atención: es construir sistemas que sí ayuden a personas reales.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            RDM Digital — Nodo Cero es la primera validación práctica. No es promesa vacía: es prueba
            operativa para demostrar coherencia entre visión, arquitectura y uso cotidiano.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {contrasts.map((item) => (
            <Card key={item.oldWay} className="p-5 card-premium">
              <p className="text-sm text-muted-foreground mb-1">Modelo tradicional</p>
              <p className="font-semibold text-destructive mb-3">{item.oldWay}</p>
              <p className="text-sm text-muted-foreground mb-1">Ruta TAMV</p>
              <p className="font-semibold text-primary">{item.tamvWay}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="font-display text-xl mb-3">Principio central</h2>
          <blockquote className="border-l-2 border-primary pl-4 text-muted-foreground">
            La complejidad real no está en sonar difícil.
            Está en diseñar sistemas potentes que la gente pueda comprender y adoptar naturalmente.
          </blockquote>
        </Card>
      </div>
    </div>
  );
}
