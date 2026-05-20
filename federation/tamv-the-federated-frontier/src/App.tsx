import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Ecosistema from "./pages/Ecosistema";
import IsabellaAI from "./pages/IsabellaAI";
import CEO from "./pages/CEO";
import Tecnologia from "./pages/Tecnologia";
import Comunidad from "./pages/Comunidad";
import Blueprint from "./pages/Blueprint";
import Certificaciones from "./pages/Certificaciones";
import Publicaciones from "./pages/Publicaciones";
import Registros from "./pages/Registros";
import UTAMV from "./pages/UTAMV";
import ManifestoHumano from "./pages/ManifestoHumano";
import NotFound from "./pages/NotFound";
import IntegracionTamv from "./pages/IntegracionTamv";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ecosistema" element={<Ecosistema />} />
            <Route path="/isabella-ai" element={<IsabellaAI />} />
            <Route path="/ceo" element={<CEO />} />
            <Route path="/tecnologia" element={<Tecnologia />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/blueprint" element={<Blueprint />} />
            <Route path="/certificaciones" element={<Certificaciones />} />
            <Route path="/publicaciones" element={<Publicaciones />} />
            <Route path="/registros" element={<Registros />} />
            <Route path="/utamv" element={<UTAMV />} />
            <Route path="/manifiesto-humano" element={<ManifestoHumano />} />
            <Route path="/integracion-tamv" element={<IntegracionTamv />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
