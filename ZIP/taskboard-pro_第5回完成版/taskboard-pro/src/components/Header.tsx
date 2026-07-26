import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export function Header() {
  const { user } = useAuth();

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
