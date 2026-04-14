import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiLink } from "@/components/WikiComponents";

export default function ProyectosPrincipales() {
  return (
    <div>
      <WikiBreadcrumb section="ecosistema-codigo" page="proyectos-principales" />
      <WikiH1>Proyecto Único TAMV: mapa de frentes activos</WikiH1>
      <WikiP>
        A partir del perfil de <WikiLink href="https://github.com/OsoPanda1">OsoPanda1</WikiLink>, los repositorios se pueden leer como
        frentes de ejecución de un solo programa: <strong>TAMV ONLINE como sistema operativo territorial</strong>.
      </WikiP>

      <WikiH2>Modelo de alineación</WikiH2>
      <WikiTable
        headers={["Frente", "Objetivo", "Repositorios representativos"]}
        rows={[
          ["Núcleo", "Definir arquitectura y principios del sistema", "OsoPanda1, civilizational-core"],
          ["Territorio", "Operar Real del Monte como nodo vivo", "real-del-monte-explorer, real-del-monte-twin, rdm-digital-2dbd42b0"],
          ["Integración", "Unificar experiencias y servicios", "ecosistema-nextgen-tamv, tamv-nexus-verse, RDM-Digital-X"],
          ["Plantillas/arranque", "Replicabilidad y despliegue", "ECOSISTEMA-TAMVONLINE, TAMV-ONLINE-NEXTGEN-1.0"],
          ["Canales experimentales", "Prueba de interfaces y alcance", "new-beginnings, real-del-monte-elevated"],
        ]}
      />

      <WikiH2>Conclusión de arquitectura</WikiH2>
      <WikiCard title="No es fragmentación: es partición funcional" accent="cyan">
        El valor estratégico está en que cada repo aborda una parte específica del mismo objetivo civilizatorio. La arquitectura gana
        claridad cuando se gestiona como <strong>programa multiproyecto con dirección única</strong>.
      </WikiCard>

      <WikiH2>Siguiente paso de gobernanza técnica</WikiH2>
      <WikiP>
        Para facilitar colaboración externa, se recomienda mantener un <strong>índice canónico</strong> en esta wiki con: estado por repositorio
        (idea, activo, consolidación), relación con módulos ISNI/TAMV y criterio de continuidad o fusión.
      </WikiP>
    </div>
  );
}
