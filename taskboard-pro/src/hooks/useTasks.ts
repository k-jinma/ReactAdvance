// src/hooks/useTasks.ts(新規作成)
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../lib/tasksApi";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],   // このデータの「住所」。キャッシュの目印になる
    queryFn: fetchTasks,   // 実際にデータを取ってくる関数(ステップ2で作成)
  });
}