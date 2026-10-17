// src/hooks/useDeleteAttachment.ts(新規作成)
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAttachment } from "../lib/attachmentsApi";

export function useDeleteAttachment(taskId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAttachment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["attachments", taskId] }),
  });
}