import { Outlet } from "react-router-dom";
import WikiSidebar from "./WikiSidebar";

export default function WikiLayout() {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <WikiSidebar />
      <main className="lg:ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
