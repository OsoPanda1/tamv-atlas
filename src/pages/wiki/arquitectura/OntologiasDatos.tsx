import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function OntologiasDatos() {
  return (
    <div>
      <WikiBreadcrumb section="arquitectura" page="ontologias-datos" />
      <WikiH1>Ontologías y Modelos de Datos</WikiH1>
      <WikiP>
        TAMV utiliza modelos de datos semánticos basados en estándares abiertos para garantizar interoperabilidad y reutilización del conocimiento generado dentro del ecosistema.
      </WikiP>

      <WikiH2>JSON-LD y Schema.org</WikiH2>
      <WikiP>
        Todas las entidades del ecosistema (personas, organizaciones, territorios, proyectos, documentos) se representan como objetos JSON-LD con tipos de Schema.org, permitiendo que motores de búsqueda, grafos de conocimiento y sistemas externos comprendan la estructura sin adaptadores.
      </WikiP>
      <WikiCode>{`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TAMV Online Network",
  "founder": {
    "@type": "Person",
    "name": "Edwin Oswaldo Castillo Trejo",
    "alternateName": "Anubis Villaseñor",
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "ORCID",
      "value": "0009-0008-5050-1539"
    }
  },
  "location": {
    "@type": "Place",
    "name": "Real del Monte, Hidalgo, México"
  }
}`}</WikiCode>

      <WikiH2>PIDs como anclas semánticas</WikiH2>
      <WikiP>
        Los Persistent Identifiers (ORCID, DOI, ISNI, ROR) actúan como anclas que conectan entidades del ecosistema TAMV con el grafo global de conocimiento académico y científico. Cada publicación, persona u organización tiene un identificador resoluble y permanente.
      </WikiP>

      <WikiCard title="Modelo de entidades TAMV" accent="cyan">
        <ul className="space-y-1">
          <li><strong>Persona:</strong> Vinculada a ORCID, con roles, credenciales y actividades</li>
          <li><strong>Organización:</strong> Vinculada a ISNI/ROR, con estructura y gobernanza</li>
          <li><strong>Territorio:</strong> Modelado como sistema operativo con gemelo digital</li>
          <li><strong>Proyecto:</strong> Con DOI, versionado y trazabilidad completa</li>
          <li><strong>Documento:</strong> Registrado con DOI y licencia CC BY 4.0</li>
        </ul>
      </WikiCard>
    </div>
  );
}
