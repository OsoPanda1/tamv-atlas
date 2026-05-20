import { tamvOpenWebCatalog } from "@/data/tamv-open-web-catalog";
import { Card } from "@/components/ui/card";

export default function IntegracionTamv() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="font-display text-3xl mb-4">Integración TAMV (Web Abierta)</h1>
        <p className="text-muted-foreground mb-8">
          Catálogo técnico de fuentes públicas usadas para alinear módulos TAMV (MD-X4, MD-X5, UTAMV y RDM Digital).
        </p>
        <div className="grid gap-4">
          {tamvOpenWebCatalog.map((s) => (
            <Card key={s.id} className="p-4">
              <p className="font-semibold">{s.title}</p>
              <a className="text-primary text-sm" href={s.url} target="_blank" rel="noreferrer">{s.url}</a>
              <p className="text-xs text-muted-foreground mt-2">{s.notes}</p>
              <p className="text-xs text-muted-foreground">Verificado: {s.lastCheckedUtc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
