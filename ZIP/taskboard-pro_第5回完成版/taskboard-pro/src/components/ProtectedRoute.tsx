import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="board__loading">確認中...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
