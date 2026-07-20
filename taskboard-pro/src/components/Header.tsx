// src/components/Header.tsx(新規作成)
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export function Header() {
  const { user } = useAuth();   // 共有されているログイン状態から、いまのユーザーを受け取る

  return (
    <header className="app-header">
      <h1 className="app-header__title">TaskBoard Pro</h1>
      <div className="app-header__user">
        <span>{user?.email}</span>
        <button type="button" onClick={() => supabase.auth.signOut()}>
          ログアウト
        </button>
      </div>
    </header>
  );
}