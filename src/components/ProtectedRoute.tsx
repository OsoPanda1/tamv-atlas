import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type AppRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  minRole?: AppRole;
}

export function ProtectedRoute({ children, minRole = "ciudadano" }: ProtectedRouteProps) {
  const { user, hasMinRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm font-mono">Cargando sesión…</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (minRole !== "ciudadano" && !hasMinRole(minRole)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Acceso restringido</h1>
        <p className="text-muted-foreground max-w-md">
          Esta sección requiere el rol mínimo <span className="text-primary font-mono">{minRole}</span>. Solicita
          elevación a un administrador.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
