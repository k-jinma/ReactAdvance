// src/hooks/useTasks.ts(新規作成)
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../lib/tasksApi";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],   // このデータの名前(キャッシュのキー)
    queryFn: fetchTasks,   // 取りに行く方法(ステップ2で作成した関数)
  });
}