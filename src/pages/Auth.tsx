import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AuthPage() {
  const { user, loading, signIn, signUp, signInWithGoogle } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to={from} replace />;

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) toast.error(error);
    else toast.success("Sesión iniciada");
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await signUp(email, password, displayName || undefined);
    setBusy(false);
    if (error) toast.error(error);
    else toast.success("Cuenta creada. Revisa tu correo si se requiere verificación.");
  };

  return (
    <div className="min-h-[calc(100vh-40px)] flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Atlas TAMV · Acceso</CardTitle>
          <CardDescription>
            Inicia sesión o crea tu cuenta. Al registrarte se te asigna automáticamente el rol{" "}
            <span className="font-mono text-primary">ciudadano</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Iniciar sesión</TabsTrigger>
              <TabsTrigger value="signup">Crear cuenta</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="email-in">Correo</Label>
                  <Input
                    id="email-in"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pass-in">Contraseña</Label>
                  <Input
                    id="pass-in"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy ? "Entrando…" : "Iniciar sesión"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name-up">Nombre visible</Label>
                  <Input
                    id="name-up"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email-up">Correo</Label>
                  <Input
                    id="email-up"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pass-up">Contraseña</Label>
                  <Input
                    id="pass-up"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy ? "Creando…" : "Crear cuenta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
              Continuar con Google
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Al continuar aceptas la política de privacidad y el blindaje ético TAMV.{" "}
            <Link to="/" className="text-primary hover:underline">
              Volver
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
