// src/pages/LoginPage.tsx(新規作成)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function LoginPage() {
  const navigate = useNavigate();   // ← 定型:画面遷移するための関数を受け取る(React Router)

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    // モードに応じて、ログイン or 新規登録を呼び分ける
    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);   // 失敗:メッセージを表示して留まる
      return;
    }
    navigate("/");                      // 成功:ボードへ移動
  };

  return (
    <div className="login">
      <h1 className="login__title">TaskBoard Pro</h1>
      <p className="login__subtitle">
        {mode === "login" ? "ログイン" : "アカウントを新規登録"}
      </p>

      <div className="login__form">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード(6文字以上)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className="login__error">{errorMessage}</p>}

        <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
          {mode === "login" ? "ログイン" : "登録する"}
        </button>
      </div>

      <button
        type="button"
        className="login__switch"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
      >
        {mode === "login"
          ? "アカウントがない方はこちら(新規登録)"
          : "アカウントがある方はこちら(ログイン)"}
      </button>
    </div>
  );
}