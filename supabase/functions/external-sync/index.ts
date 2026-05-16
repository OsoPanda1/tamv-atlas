// External Sync — fetches public metadata from Zenodo, OpenAIRE, Figshare,
// ORCID and GitHub (OsoPanda1) for the canonical TAMV ONLINE ecosystem.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ZENODO_RECORDS = [
  { id: "19436662", label: "Diseño del ecosistema TAMV" },
  { id: "19562517", label: "Arquitectura del ecosistema TAMV" },
  { id: "19564367", label: "Casos de uso del ecosistema TAMV" },
  { id: "19411506", label: "Gobernanza y principios" },
  { id: "19997063", label: "Actualizaciones de diseño y arquitectura" },
  { id: "20071454", label: "Documento unificado TAMV ONLINE / ISNI" },
];

const FIGSHARE_RECORDS = [
  { id: "32135389", label: "Dataset principal" },
  { id: "32098846", label: "Dataset complementario" },
];

const ORCID = "0009-0008-5050-1539";
const GH_USER = "OsoPanda1";

async function safeJson(url: string, headers: Record<string, string> = {}) {
  try {
    const r = await fetch(url, { headers: { Accept: "application/json", ...headers }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) return { ok: false, status: r.status, error: await r.text().catch(() => "") };
    return { ok: true, status: r.status, data: await r.json() };
  } catch (e) {
    return { ok: false, status: 0, error: String(e) };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const zenodoToken = Deno.env.get("ZENODO_CLIENT_SECRET");
  const figshareToken = Deno.env.get("FIGSHARE_TOKEN");
  const openaireToken = Deno.env.get("OPENAire_TOKEN");

  const zHeaders = zenodoToken ? { Authorization: `Bearer ${zenodoToken}` } : {};
  const fHeaders = figshareToken ? { Authorization: `token ${figshareToken}` } : {};
  const oHeaders = openaireToken ? { Authorization: `Bearer ${openaireToken}` } : {};

  const [zenodo, figshare, orcid, openaire, github] = await Promise.all([
    Promise.all(
      ZENODO_RECORDS.map(async (r) => {
        const res = await safeJson(`https://zenodo.org/api/records/${r.id}`, zHeaders);
        return {
          id: r.id,
          label: r.label,
          ok: res.ok,
          doi: res.ok ? res.data?.doi : null,
          title: res.ok ? res.data?.metadata?.title : null,
          published: res.ok ? res.data?.metadata?.publication_date : null,
          views: res.ok ? res.data?.stats?.views ?? 0 : 0,
          downloads: res.ok ? res.data?.stats?.downloads ?? 0 : 0,
          html: res.ok ? res.data?.links?.html : `https://zenodo.org/records/${r.id}`,
        };
      })
    ),
    Promise.all(
      FIGSHARE_RECORDS.map(async (r) => {
        const res = await safeJson(`https://api.figshare.com/v2/articles/${r.id}`, fHeaders);
        return {
          id: r.id,
          label: r.label,
          ok: res.ok,
          doi: res.ok ? res.data?.doi : null,
          title: res.ok ? res.data?.title : null,
          published: res.ok ? res.data?.published_date : null,
          url: res.ok ? res.data?.url_public_html : `https://doi.org/10.6084/m9.figshare.${r.id}`,
        };
      })
    ),
    safeJson(`https://pub.orcid.org/v3.0/${ORCID}/record`),
    safeJson(`https://api.openaire.eu/search/publications?orcid=${ORCID}&format=json&size=20`, oHeaders),
    safeJson(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`),
  ]);

  const orcidProfile = orcid.ok
    ? {
        ok: true,
        orcid: ORCID,
        name: [
          orcid.data?.person?.name?.["given-names"]?.value,
          orcid.data?.person?.name?.["family-name"]?.value,
        ].filter(Boolean).join(" "),
        works: orcid.data?.["activities-summary"]?.works?.group?.length ?? 0,
        url: `https://orcid.org/${ORCID}`,
      }
    : { ok: false, error: orcid.error };

  const openaireSummary = openaire.ok
    ? {
        ok: true,
        total: openaire.data?.response?.header?.total?.$ ?? openaire.data?.response?.header?.total ?? null,
      }
    : { ok: false, error: openaire.error };

  const ghRepos = github.ok && Array.isArray(github.data)
    ? github.data.map((r: Record<string, unknown>) => ({
        name: r.name as string,
        full_name: r.full_name as string,
        description: (r.description as string) ?? null,
        html_url: r.html_url as string,
        language: (r.language as string) ?? null,
        stars: r.stargazers_count as number,
        forks: r.forks_count as number,
        updated_at: r.updated_at as string,
        topics: (r.topics as string[]) ?? [],
      }))
    : [];

  const ghTotals = {
    total: ghRepos.length,
    stars: ghRepos.reduce((s, r) => s + (r.stars ?? 0), 0),
    forks: ghRepos.reduce((s, r) => s + (r.forks ?? 0), 0),
    languages: Array.from(new Set(ghRepos.map((r) => r.language).filter(Boolean))) as string[],
  };

  const totals = {
    zenodo_views: zenodo.reduce((s, r) => s + (r.views ?? 0), 0),
    zenodo_downloads: zenodo.reduce((s, r) => s + (r.downloads ?? 0), 0),
    zenodo_ok: zenodo.filter((r) => r.ok).length,
    figshare_ok: figshare.filter((r) => r.ok).length,
    github_repos: ghTotals.total,
    github_stars: ghTotals.stars,
  };

  return new Response(
    JSON.stringify({
      checked_at: new Date().toISOString(),
      orcid: orcidProfile,
      openaire: openaireSummary,
      zenodo,
      figshare,
      github: { repos: ghRepos, totals: ghTotals },
      totals,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
