import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

const CANONICAL_PREFIX = "/articulo";

function normalizeTarget(target: string) {
  if (!target.startsWith("/")) return "/resumen";
  if (target.startsWith("/wiki/")) {
    const parts = target.split("/").filter(Boolean);
    const slug = parts[parts.length - 1];
    return `${CANONICAL_PREFIX}/${slug}`;
  }
  return target;
}

export default function WikiBridge() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const source = params.get("source") ?? "app";
  const target = params.get("target") ?? "/resumen";

  const to = useMemo(() => {
    const canonical = normalizeTarget(target);
    const withSource = new URLSearchParams({ source });
    return `${canonical}?${withSource.toString()}`;
  }, [source, target]);

  return <Navigate to={to} replace />;
}
