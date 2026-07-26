import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase"; 

// 共有する中身の型:いまのユーザー・セッション・確認中かどうか
type AuthContextValue = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
};

// Context を作る。この AuthContext を、あとで「その2」(提供する側)と「その3」(受け取る側)の両方から使う
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// src/contexts/AuthContext.tsx(第1段階 その2 ― 提供する係)
export function AuthProvider({ children }: { children: ReactNode }) {

  // ← 追加:共有する中身を state で持つ(変われば、受け取っている側も再描画される)
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);   // 復元が終わるまで true

  useEffect(() => {
    // ← 定型:ブラウザに保存されたセッションを復元する(リロードしてもログイン状態を保つ)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    // ← 定型:ログイン/ログアウトなどの変化を監視し、そのたびに session を更新する
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    // ← 定型:このコンポーネントが不要になったら監視をやめる(後片付け)
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, session, isLoading }}    // まだ仮の値(常に未ログイン扱い)
    >
      {children}
    </AuthContext.Provider>
  );
}

// src/contexts/AuthContext.tsx(第1段階 その3 ― 受け取り口)
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth は AuthProvider の中で使ってください");
  return ctx;
}