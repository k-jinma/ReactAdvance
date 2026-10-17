// src/hooks/useAttachments.ts(新規作成)
import { useQuery } from "@tanstack/react-query";
import { fetchAttachments } from "../lib/attachmentsApi";

// タスクごとにキャッシュを分けるため、queryKey にタスクIDを含める
export function useAttachments(taskId: string) {
  return useQuery({
    queryKey: ["attachments", taskId],
    queryFn: () => fetchAttachments(taskId),
  });
}