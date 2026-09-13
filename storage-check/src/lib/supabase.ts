// src/lib/supabase.ts(新規作成)
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

// これ以降 supabase.storage.from("practice-uploads")... でバケットを操作できる
export const supabase = createClient(url, key);