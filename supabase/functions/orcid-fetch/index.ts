// supabase/functions/orcid-fetch/index.ts
// TAMV Atlas · Identity Federation Resolver
// Resolves public ORCID profile and upserts into identity_profiles

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const DEFAULT_ORCID = "0009-0008-5050-1539";

const ORCID_REGEX =
  /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders,
  });
}

function validateOrcid(orcid: string) {
  return ORCID_REGEX.test(orcid);
}

async function fetchOrcidProfile(orcid: string) {
  const res = await fetch(
    `https://pub.orcid.org/v3.0/${orcid}/person`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`ORCID API error (${res.status})`);
  }

  return await res.json();
}

function extractDisplayName(person: any, fallback: string) {
  const given =
    person?.name?.["given-names"]?.value?.trim() ?? "";

  const family =
    person?.name?.["family-name"]?.value?.trim() ?? "";

  const display = `${given} ${family}`.trim();

  return display || fallback;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const orcid =
      url.searchParams.get("orcid")?.trim() || DEFAULT_ORCID;

    if (!validateOrcid(orcid)) {
      return jsonResponse(
        {
          ok: false,
          error: "Invalid ORCID format",
          orcid,
        },
        400
      );
    }

    const person = await fetchOrcidProfile(orcid);
    const displayName = extractDisplayName(person, orcid);

    const authHeader =
      req.headers.get("Authorization") ?? "";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    const { data: existing, error: selectError } =
      await supabase
        .from("identity_profiles")
        .select("id")
        .eq("orcid", orcid)
        .maybeSingle();

    if (selectError) {
      throw new Error(
        `DB select failed: ${selectError.message}`
      );
    }

    const payload = {
      orcid,
      display_name: displayName,
      type: "person",
      jsonld: person,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      const { error: updateError } = await supabase
        .from("identity_profiles")
        .update(payload)
        .eq("id", existing.id);

      if (updateError) {
        throw new Error(
          `DB update failed: ${updateError.message}`
        );
      }
    } else {
      const { error: insertError } = await supabase
        .from("identity_profiles")
        .insert(payload);

      if (insertError) {
        throw new Error(
          `DB insert failed: ${insertError.message}`
        );
      }
    }

    return jsonResponse({
      ok: true,
      operation: existing ? "updated" : "inserted",
      orcid,
      display_name: displayName,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[ORCID-FETCH]", error);

    return jsonResponse(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});
