import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    "Supabaseの環境変数が設定されていません。.env.local に VITE_SUPABASE_URL と VITE_SUPABASE_PUBLISHABLE_KEY を設定してください。"
  );
}

// アプリ全体で使い回す接続口(クライアント)を1つだけ作る
export const supabase = createClient<Database>(url, publishableKey);
