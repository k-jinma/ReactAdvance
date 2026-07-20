// このファイルは本来 `npm run gen:db`(supabase gen types typescript)で自動生成します。
// ここでは tasks テーブルに対応する最小構成を手書きで用意しています。
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          assignee: string;
          priority: string;
          status: string;
          due_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          assignee: string;
          priority?: string;
          status?: string;
          due_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          assignee?: string;
          priority?: string;
          status?: string;
          due_date?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
