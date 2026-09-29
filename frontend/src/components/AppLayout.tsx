import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { Sidebar } from "./Sidebar";

import { MobileHeader } from "./MobileHeader";

export function AppLayout() {
  const user = getCurrentUser();

  if (!user) return null;

  return (
    <div className="app-layout">
      <Sidebar />
      <MobileHeader />

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}