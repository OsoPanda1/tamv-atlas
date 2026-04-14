import { Link, Navigate, useParams } from "react-router-dom";
import { wikiStructure } from "@/data/wikiStructure";

export default function ModuleOverview() {
  const { id } = useParams();
  const moduleIndex = Number(id);
  if (moduleIndex === 0) {
    return <Navigate to="/" replace />;
  }

  const section = Number.isInteger(moduleIndex) ? wikiStructure[moduleIndex] : undefined;

  if (!section) {
    return (
      <div className="pt-8 lg:pt-0">
        <h1 className="text-2xl font-bold text-foreground mb-3">Módulo no encontrado</h1>
        <p className="text-muted-foreground mb-6">Selecciona un módulo válido entre 0 y 12.</p>
        <Link to="/" className="text-primary hover:underline">Volver al resumen</Link>
      </div>
    );
  }

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8">
        <p className="text-xs font-mono text-primary mb-2">Módulo {moduleIndex} de 12</p>
        <h1 className="text-3xl font-bold text-foreground text-glow-cyan">{section.title}</h1>
      </div>

      <div className="grid gap-3">
        {section.children.map((article, idx) => (
          <Link
            key={article.slug}
            to={`/articulo/${article.slug}`}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-colors"
          >
            <p className="text-xs font-mono text-muted-foreground mb-1">Artículo {idx + 1}</p>
            <h2 className="font-medium text-foreground">{article.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
