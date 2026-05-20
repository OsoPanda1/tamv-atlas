#!/usr/bin/env bash
set -euo pipefail

MANIFEST_PATH="docs/repo-unification-manifest.json"
OUT_PATH="docs/repo-federation-classification.json"
FREEZE_INDEX_PATH="docs/module-freeze-index.json"

usage() {
  cat <<USAGE
Uso:
  $(basename "$0") [opciones]

Opciones:
  --manifest <path>        Manifiesto fuente (default: ${MANIFEST_PATH})
  --out <path>             Salida clasificación (default: ${OUT_PATH})
  --freeze-index <path>    Salida índice freeze (default: ${FREEZE_INDEX_PATH})
  --help                   Muestra esta ayuda
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --manifest) MANIFEST_PATH="$2"; shift 2 ;;
    --out) OUT_PATH="$2"; shift 2 ;;
    --freeze-index) FREEZE_INDEX_PATH="$2"; shift 2 ;;
    --help|-h) usage; exit 0 ;;
    *) echo "ERROR: opción no reconocida: $1" >&2; usage; exit 1 ;;
  esac
done

if [[ ! -f "$MANIFEST_PATH" ]]; then
  echo "ERROR: no existe el manifiesto ${MANIFEST_PATH}" >&2
  exit 1
fi

for cmd in jq git date; do
  command -v "$cmd" >/dev/null 2>&1 || { echo "ERROR: falta comando ${cmd}" >&2; exit 1; }
done

mkdir -p "$(dirname "$OUT_PATH")" "$(dirname "$FREEZE_INDEX_PATH")"

TAMV_SHA="$(git rev-parse HEAD)"
NOW_UTC="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
RUN_ID="run-$(date -u +%Y%m%dT%H%M%SZ)"

jq \
  --arg now "$NOW_UTC" \
  --arg run_id "$RUN_ID" \
  --arg tamv_sha "$TAMV_SHA" \
  --arg manifest_path "$MANIFEST_PATH" '
  def infer_federation($name):
    if ($name | test("ident|id|did|orcid|isni"; "i")) then "identity"
    elif ($name | test("atlas|map|geo|kernel"; "i")) then "atlas"
    elif ($name | test("protocol|thcf|engine|orchestr"; "i")) then "protocol"
    elif ($name | test("econom|ledger|market|token|finance"; "i")) then "economy"
    elif ($name | test("xr|vr|ar|dream"; "i")) then "xr"
    elif ($name | test("infra|k8s|terraform|deploy|ops|devops"; "i")) then "infra"
    elif ($name | test("doc|wiki|guide|readme"; "i")) then "docs"
    else "misc" end;

  (if type == "array" then {repos: .} else . end) as $m |
  {
    run_id: $run_id,
    generated_at_utc: $now,
    source_manifest_path: $manifest_path,
    tamv_internal_sha: $tamv_sha,
    reviews: [
      $m.repos[] | {
        repo: .name,
        default_branch,
        clone_url,
        html_url,
        federation: infer_federation(.name),
        r1_structural: {
          repo_type_guess:
            (if (.name | test("api|server|backend"; "i")) then "service"
             elif (.name | test("app|web|frontend|ui"; "i")) then "app"
             elif (.name | test("infra|k8s|terraform"; "i")) then "infra"
             elif (.name | test("lib|sdk|core|package"; "i")) then "library"
             else "unknown" end),
          archived,
          private
        },
        r2_domain_semantics: {
          domain_guess: infer_federation(.name),
          collision_risk: "medium"
        },
        r3_operational_security: {
          build_status: "unknown",
          test_status: "unknown",
          security_status: "pending_review"
        },
        module_state: "open"
      }
    ]
  }
' "$MANIFEST_PATH" > "$OUT_PATH"

jq '{
  run_id,
  generated_at_utc,
  tamv_internal_sha,
  modules: [
    .reviews[] | {
      repo,
      federation,
      module_state,
      freeze_criteria: {
        classified: true,
        integration_contract_defined: false,
        tests_documented: false,
        critical_blockers_closed: false,
        closure_review_approved: false
      }
    }
  ]
}' "$OUT_PATH" > "$FREEZE_INDEX_PATH"

echo "Clasificación creada en ${OUT_PATH}"
echo "Índice de freeze creado en ${FREEZE_INDEX_PATH}"
