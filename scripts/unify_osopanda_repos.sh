#!/usr/bin/env bash
set -euo pipefail

OWNER="OsoPanda1"
TARGET_REPO="tamv-digital-nexus"
PREFIX_ROOT="federation"
MANIFEST_PATH="docs/repo-unification-manifest.json"
IMPORT_MODE="none"
PER_PAGE=100
API_URL="https://api.github.com"

usage() {
  cat <<USAGE
Uso:
  $(basename "$0") [opciones]

Opciones:
  --owner <github-owner>          Dueño de repos (default: ${OWNER})
  --target-repo <name>            Repo destino a excluir del listado (default: ${TARGET_REPO})
  --prefix-root <path>            Carpeta raíz de importación en este repo (default: ${PREFIX_ROOT})
  --manifest <path>               Ruta de salida del manifiesto JSON (default: ${MANIFEST_PATH})
  --import-mode <none|squash>     none: solo manifiesto, squash: importa con git subtree --squash
  --github-token <token>          Token GitHub opcional (mejora rate limits)
  --help                          Muestra esta ayuda

Ejemplos:
  # Solo descubrir y generar manifiesto
  $(basename "$0") --import-mode none

  # Descubrir e importar todos los repos con historial compactado
  $(basename "$0") --import-mode squash --prefix-root federation
USAGE
}

GITHUB_TOKEN="${GITHUB_TOKEN:-}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --owner) OWNER="$2"; shift 2 ;;
    --target-repo) TARGET_REPO="$2"; shift 2 ;;
    --prefix-root) PREFIX_ROOT="$2"; shift 2 ;;
    --manifest) MANIFEST_PATH="$2"; shift 2 ;;
    --import-mode)
      IMPORT_MODE="$2"; shift 2
      if [[ "$IMPORT_MODE" != "none" && "$IMPORT_MODE" != "squash" ]]; then
        echo "ERROR: --import-mode debe ser none o squash" >&2
        exit 1
      fi
      ;;
    --github-token) GITHUB_TOKEN="$2"; shift 2 ;;
    --help|-h) usage; exit 0 ;;
    *)
      echo "ERROR: opción no reconocida: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if ! command -v curl >/dev/null 2>&1; then
  echo "ERROR: curl no está instalado" >&2
  exit 1
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "ERROR: jq no está instalado" >&2
  exit 1
fi
if [[ "$IMPORT_MODE" == "squash" ]] && ! command -v git >/dev/null 2>&1; then
  echo "ERROR: git no está instalado" >&2
  exit 1
fi

mkdir -p "$(dirname "$MANIFEST_PATH")"

headers=("-H" "Accept: application/vnd.github+json")
if [[ -n "$GITHUB_TOKEN" ]]; then
  headers+=("-H" "Authorization: Bearer ${GITHUB_TOKEN}")
fi

fetch_page() {
  local page="$1"
  local url="${API_URL}/users/${OWNER}/repos?type=owner&sort=updated&per_page=${PER_PAGE}&page=${page}"
  local response
  if ! response="$(curl -sSL -w '\n%{http_code}' "${headers[@]}" "$url")"; then
    echo "ERROR: fallo de red consultando GitHub API (${url})" >&2
    exit 1
  fi

  local body http_code
  body="$(sed '$d' <<<"$response")"
  http_code="$(tail -n1 <<<"$response")"

  if [[ "$http_code" != "200" ]]; then
    echo "ERROR: GitHub API devolvió HTTP ${http_code} para ${url}" >&2
    if [[ "$http_code" == "403" ]]; then
      echo "Sugerencia: usa --github-token o variable GITHUB_TOKEN para elevar rate limits/permisos." >&2
    fi
    if jq -e . >/dev/null 2>&1 <<<"$body"; then
      jq -r '.message // empty' <<<"$body" >&2 || true
    fi
    exit 1
  fi

  printf '%s' "$body"
}

all_repos='[]'
page=1
while :; do
  payload="$(fetch_page "$page")"
  count="$(jq 'length' <<<"$payload")"
  if [[ "$count" -eq 0 ]]; then
    break
  fi
  all_repos="$(jq -s 'add' <(printf '%s' "$all_repos") <(printf '%s' "$payload"))"
  ((page+=1))
done

filtered="$(jq --arg target "$TARGET_REPO" '[.[] | select(.name != $target and .fork == false)]' <<<"$all_repos")"

manifest="$(jq --arg owner "$OWNER" --arg target "$TARGET_REPO" --arg prefix "$PREFIX_ROOT" '
{
  generated_at_utc: (now | todate),
  owner: $owner,
  target_repo_excluded: $target,
  prefix_root: $prefix,
  repo_count: (length),
  repos: [ .[] | {
    name,
    default_branch,
    private,
    archived,
    pushed_at,
    clone_url,
    ssh_url,
    html_url,
    import_prefix: ($prefix + "/" + .name)
  }]
}
' <<<"$filtered")"

printf '%s\n' "$manifest" > "$MANIFEST_PATH"
echo "Manifiesto generado en ${MANIFEST_PATH}"

if [[ "$IMPORT_MODE" == "none" ]]; then
  echo "Modo descubrimiento completado. No se importaron repositorios."
  exit 0
fi

repo_count="$(jq -r '.repo_count' "$MANIFEST_PATH")"
echo "Iniciando importación squash de ${repo_count} repositorios en ${PREFIX_ROOT}/..."

while IFS= read -r row; do
  name="$(jq -r '.name' <<<"$row")"
  default_branch="$(jq -r '.default_branch' <<<"$row")"
  clone_url="$(jq -r '.clone_url' <<<"$row")"
  prefix="$(jq -r '.import_prefix' <<<"$row")"

  if git ls-tree -d --name-only HEAD "$prefix" | grep -q "^${prefix}$"; then
    echo "[SKIP] ${name} ya existe en ${prefix}"
    continue
  fi

  tmp_remote="tmp-${name}-$(date +%s)"
  echo "[ADD] ${name} -> ${prefix} (branch ${default_branch})"
  git remote add "$tmp_remote" "$clone_url"
  git fetch "$tmp_remote" "$default_branch"
  git subtree add --prefix "$prefix" "$tmp_remote" "$default_branch" --squash -m "chore(unify): importar ${name} en ${prefix}"
  git remote remove "$tmp_remote"
done < <(jq -c '.repos[]' "$MANIFEST_PATH")

echo "Importación finalizada. Revisa git status y ejecuta pruebas antes de commit."
