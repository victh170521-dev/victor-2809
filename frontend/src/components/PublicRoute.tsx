import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getCurrentUser } from "../services/auth.service";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const user = getCurrentUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}