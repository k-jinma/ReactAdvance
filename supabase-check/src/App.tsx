// src/App.tsx(置き換え)
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./lib/supabase";

// 第3回と同じ固定の project_id
const PROJECT_ID = "00000000-0000-0000-0000-000000000001";

// 取得して表示するときの1行の形(必要な列だけ)
type Row = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

// 【取得 / select】テーブルから行を読む
async function fetchRows(): Promise<Row[]> {
  const { data, error } = await supabase
    .from("tasks")                              // ① どのテーブルか
    .select("id, title, status, created_at")    // ② どの列を取るか
    .eq("project_id", PROJECT_ID)               // ③ 絞り込み条件(WHERE)
    .order("created_at", { ascending: true });  // ④ 並び順
  if (error) throw error;                        // 失敗は throw → useQuery が拾う
  return data as Row[];
}

// 【追加 / insert】テーブルに1行入れる
async function addRow(title: string): Promise<void> {
  const { error } = await supabase.from("tasks").insert({
    title,                       // 画面で入力する唯一の値
    status: "todo",              // 以下はNOT NULL列を満たすための固定値
    priority: "medium",          // 正しい値: low / medium / high
    assignee: "未割当",
    project_id: PROJECT_ID,
  });
  if (error) throw error;
}

export default function App() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  // 取得(select)を useQuery で
  const { data: rows = [], isPending, isError, error } = useQuery({
    queryKey: ["rows"],   // このデータの名前(キャッシュのキー)
    queryFn: fetchRows,   // 取りに行く方法
  });

  // 追加(insert)を useMutation で
  const add = useMutation({
    mutationFn: addRow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rows"] }); // 追加後に取得し直す
      setTitle("");
    },
  });

  return (
    <div className="app">
      <h1>Supabase テーブル操作の確認</h1>

      {/* 追加(insert) */}
      <div className="add">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title を入力"
        />
        <button onClick={() => add.mutate(title)} disabled={add.isPending || title === ""}>
          追加する
        </button>
        {add.isError && (
          <p className="error">追加エラー: {(add.error as Error).message}</p>
        )}
      </div>

      {/* 取得(select)した行の表示 */}
      {isPending ? (
        <p>読み込み中...</p>
      ) : isError ? (
        <p className="error">エラー: {error.message}</p>
      ) : (
        <table className="rows">
          <thead>
            <tr><th>id</th><th>title</th><th>status</th><th>created_at</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.id.slice(0, 8)}…</td>
                <td>{r.title}</td>
                <td>{r.status}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}