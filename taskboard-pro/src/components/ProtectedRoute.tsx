// src/components/ProtectedRoute.tsx(新規作成)
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();   // ステップ2で共有したログイン状態を受け取る

  // セッションの復元が終わるまでは、判定を保留する(誤リダイレクト防止)
  if (isLoading) return <div className="board__loading">確認中...</div>;

  // 未ログインなら、ログイン画面へ移動させる
  if (!user) return <Navigate to="/login" replace />;

  // ログイン済みなら、包んでいた中身をそのまま表示する
  return <>{children}</>;
}