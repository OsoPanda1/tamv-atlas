export interface TamvOpenWebSource {
  id: string;
  title: string;
  url: string;
  lastCheckedUtc: string;
  notes: string;
}

export const tamvOpenWebCatalog: TamvOpenWebSource[] = [
  {
    id: "tamv_official_home",
    title: "TAMV Online (sitio oficial)",
    url: "https://tamvonline-oficial.odoo.com/",
    lastCheckedUtc: "2026-05-20",
    notes: "Describe TAMV Online, MD-X4/MD-X5, UTAMV, RDM Digital e identidad/guardianía como componentes del ecosistema.",
  },
  {
    id: "tamv_about",
    title: "Sobre Nosotros TAMV",
    url: "https://tamvonline-oficial.odoo.com/about-us",
    lastCheckedUtc: "2026-05-20",
    notes: "Reporta estado de avance y menciona módulos funcionales y prototipos comprobables.",
  },
  {
    id: "rdm_digital_blog",
    title: "RDM Digital 21,600 horas",
    url: "https://tamvonline-oficial.odoo.com/en/blog/noticias-2/rdm-digital-21600-horas-de-investigacion-ignoradas-por-el-sistema-seran-puestas-al-servicio-de-un-pueblo-magico-en-hidalgo-6",
    lastCheckedUtc: "2026-05-20",
    notes: "Documento narrativo sobre despliegue RDM Smart City OS en Real del Monte.",
  },
  {
    id: "tamv_founding_post",
    title: "TAMV Online: sueño escrito en código",
    url: "https://tamvonline-oficial.odoo.com/en/blog/noticias-2/tamv-online-un-sueno-escrito-en-codigo-desde-lo-mas-humilde-de-real-del-monte-hidalgo-mexico-1",
    lastCheckedUtc: "2026-05-20",
    notes: "Contexto fundacional y enfoque de infraestructura digital regional.",
  },
  {
    id: "tamv_web40_web50",
    title: "Infraestructura civilizatoria para web 4.0/5.0",
    url: "https://tamvonline-oficial.odoo.com/en/blog/1/infraestructura-civilizatoria-para-la-web-40-y-web-50-2",
    lastCheckedUtc: "2026-05-20",
    notes: "Marco conceptual público del ecosistema TAMV.",
  },
];
