import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }
    navigate("/");
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
