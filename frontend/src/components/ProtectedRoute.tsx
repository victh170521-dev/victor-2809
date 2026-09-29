import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getCurrentUser } from "../services/auth.service";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {

  const user = getCurrentUser();

    if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}