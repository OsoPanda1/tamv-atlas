// ORCID Fetch — resolves a public ORCID profile and upserts identity_profiles.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const url = new URL(req.url);
    const orcid = url.searchParams.get("orcid") ?? "0009-0008-5050-1539";

    const orcidRes = await fetch(`https://pub.orcid.org/v3.0/${orcid}/person`, { headers: { Accept: "application/json" } });
    if (!orcidRes.ok) {
      return new Response(JSON.stringify({ error: "orcid error", status: orcidRes.status }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const person = await orcidRes.json();
    const given = person?.name?.["given-names"]?.value ?? "";
    const family = person?.name?.["family-name"]?.value ?? "";
    const display = `${given} ${family}`.trim() || orcid;

    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: existing } = await supabase.from("identity_profiles").select("id").eq("orcid", orcid).maybeSingle();
    const payload = {
      orcid,
      display_name: display,
      type: "person",
      jsonld: person,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      await supabase.from("identity_profiles").update(payload).eq("id", existing.id);
    } else {
      await supabase.from("identity_profiles").insert(payload);
    }

    return new Response(JSON.stringify({ ok: true, orcid, display_name: display }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
