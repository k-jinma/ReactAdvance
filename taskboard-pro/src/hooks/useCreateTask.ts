// src/hooks/useCreateTask.ts(新規作成)
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../lib/tasksApi";

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,                  // 実際に書き込む関数
    onSuccess: () => {
      // 成功したら「tasks」のキャッシュを無効化 → 自動で取り直してくれる
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}