export interface WikiSection {
  id: string;
  title: string;
  icon: string;
  children: WikiPage[];
}

export interface WikiPage {
  slug: string;
  title: string;
  shortTitle?: string;
}

export const wikiStructure: WikiSection[] = [
  {
    id: "modulo-cero",
    title: "Módulo Cero · TAMV ONLINE",
    icon: "🔷",
    children: [
      { slug: "introduccion", title: "Introducción conceptual" },
      { slug: "diferenciadores", title: "Por qué TAMV y qué nos diferencia" },
      { slug: "origen-proposito", title: "Origen, propósito y misión" },
      { slug: "biografia-ceo", title: "Biografía del CEO" },
      { slug: "humanismo-en-codigo", title: "Humanismo en código" },
    ],
  },
  {
    id: "fundamentos",
    title: "Fundamentos del Ecosistema",
    icon: "⚙️",
    children: [
      { slug: "vision-general", title: "Visión general del ecosistema" },
      { slug: "principios-diseno", title: "Principios de diseño" },
      { slug: "conceptos-clave", title: "Conceptos clave" },
      { slug: "smart-destinations", title: "Smart Cities y Smart Destinations" },
    ],
  },
  {
    id: "arquitectura",
    title: "Arquitectura TAMV / ISNI",
    icon: "🏗️",
    children: [
      { slug: "capas-arquitectonicas", title: "Capas arquitectónicas" },
      { slug: "ontologias-datos", title: "Ontologías y modelos de datos" },
      { slug: "grafo-conocimiento", title: "Grafo de conocimiento" },
      { slug: "interoperabilidad", title: "Arquitectura interoperable" },
    ],
  },
  {
    id: "ecosistema-codigo",
    title: "Ecosistema de Código",
    icon: "💻",
    children: [
      { slug: "github-repos", title: "Mapa de repositorios" },
      { slug: "proyectos-principales", title: "Proyectos principales" },
      { slug: "stack-tecnologico", title: "Stack tecnológico y patrones" },
      { slug: "roadmap-tecnico", title: "Roadmap técnico" },
    ],
  },
  {
    id: "identidad",
    title: "Identidad, PIDs y SSI",
    icon: "🔐",
    children: [
      { slug: "orcid-doi-isni", title: "ORCID, DOI, ISNI, ROR" },
      { slug: "dids-ssi", title: "DIDs y Self-Sovereign Identity" },
      { slug: "perfiles", title: "Perfiles y entidades" },
      { slug: "credenciales-vc", title: "Credenciales verificables" },
    ],
  },
  {
    id: "casos-de-uso",
    title: "Casos de Uso",
    icon: "🗺️",
    children: [
      { slug: "territoriales", title: "Casos territoriales" },
      { slug: "turismo-cultura", title: "Turismo, cultura y economía creativa" },
      { slug: "journeys-usuario", title: "Journeys de usuario" },
      { slug: "proyectos-piloto", title: "Proyectos piloto" },
    ],
  },
  {
    id: "gobernanza",
    title: "Gobernanza y Comunidad",
    icon: "🤝",
    children: [
      { slug: "gobernanza-datos", title: "Gobernanza documental" },
      { slug: "roles", title: "Roles y estructura" },
      { slug: "etica-privacidad", title: "Ética, privacidad y soberanía" },
      { slug: "contribucion", title: "Contribución y roadmap" },
    ],
  },
  {
    id: "referencias",
    title: "Referencias y Recursos",
    icon: "📚",
    children: [
      { slug: "referencias-academicas", title: "Referencias académicas" },
      { slug: "documentacion-estandares", title: "Documentación de estándares" },
      { slug: "recursos-smart-cities", title: "Recursos sobre Smart Cities" },
      { slug: "creditos", title: "Créditos y agradecimientos" },
    ],
  },
];
