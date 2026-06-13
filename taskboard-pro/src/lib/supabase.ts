import { createClient } from '@supabase/supabase-js';
import type { Database } from "./database.types";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    "Supabaseの環境変数が設定されていません。.env.localを確認してください。"
  );
}

export const supabase = createClient<Database>(url, publishableKey);
