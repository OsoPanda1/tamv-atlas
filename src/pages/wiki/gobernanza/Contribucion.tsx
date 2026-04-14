import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiLink } from "@/components/WikiComponents";

export default function Contribucion() {
  return (
    <div>
      <WikiBreadcrumb section="gobernanza" page="contribucion" />
      <WikiH1>Contribución y Roadmap Comunitario</WikiH1>

      <WikiH2>Cómo contribuir</WikiH2>
      <WikiP>TAMV busca colaboradores que compartan su visión de tecnología ética y soberana. Las contribuciones pueden ser técnicas (código, documentación, testing) o estratégicas (alianzas, difusión, validación).</WikiP>

      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Código:</strong> Contribuciones via pull requests en <WikiLink href="https://github.com/OsoPanda1">github.com/OsoPanda1</WikiLink></li>
          <li><strong>Documentación:</strong> Mejoras a esta wiki, traducciones, tutoriales</li>
          <li><strong>Comunidad:</strong> Participación en <WikiLink href="https://groups.io/g/TAMVONLINE-ECOSISTEM-LATAM/topics">groups.io/TAMVONLINE</WikiLink></li>
          <li><strong>Investigación:</strong> Publicaciones académicas, validación técnica, peer review</li>
          <li><strong>Alianzas:</strong> Instituciones, empresas y organizaciones interesadas en el modelo</li>
        </ul>
      </WikiCard>

      <WikiH2>Condiciones de colaboración</WikiH2>
      <WikiP>
        Toda colaboración debe respetar el ADN ético del ecosistema definido en el Estatuto TAMV. No se aceptan contribuciones que comprometan la soberanía de datos, la privacidad de usuarios o los principios de Dignity-by-Design.
      </WikiP>

      <WikiH2>Roadmap comunitario</WikiH2>
      <WikiP>
        El roadmap del ecosistema es público y abierto a propuestas. Los issues y pull requests se gestionan en GitHub siguiendo estándares de código abierto. Las decisiones de gobernanza siguen el principio Human-in-the-Loop: siempre hay un responsable humano identificado.
      </WikiP>
    </div>
  );
}
