// GitHub Sync — pulls public repos for an owner and upserts into github_repos.
// Public read of github_repos; only admins can trigger sync (auth required).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const owner = url.searchParams.get("owner") ?? "OsoPanda1";

    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify caller is admin
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const { data: roles } = await userClient.from("user_roles").select("role").eq("user_id", user.id);
    const isAdmin = (roles ?? []).some((r: { role: string }) => r.role === "admin");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "admin role required" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const ghToken = Deno.env.get("GITHUB_TOKEN");
    const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "tamv-atlas" };
    if (ghToken) headers.Authorization = `Bearer ${ghToken}`;

    const ghRes = await fetch(`https://api.github.com/users/${owner}/repos?per_page=100&sort=pushed`, { headers });
    if (!ghRes.ok) {
      const txt = await ghRes.text();
      return new Response(JSON.stringify({ error: "github error", status: ghRes.status, body: txt }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const repos = await ghRes.json() as Array<Record<string, unknown>>;

    const rows = repos.map((r) => ({
      full_name: r.full_name,
      owner: (r.owner as { login: string }).login,
      name: r.name,
      description: r.description ?? null,
      language: r.language ?? null,
      stars: r.stargazers_count ?? 0,
      forks: r.forks_count ?? 0,
      open_issues: r.open_issues_count ?? 0,
      pushed_at: r.pushed_at ?? null,
      synced_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("github_repos").upsert(rows, { onConflict: "full_name" });
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ ok: true, owner, count: rows.length }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
