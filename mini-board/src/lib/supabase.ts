// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// .env.local に書いた値を読み込む
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Supabase とやりとりするための窓口を作り、ほかのファイルから使えるようにする
export const supabase = createClient(supabaseUrl, supabaseKey);