import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}