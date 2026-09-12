// src/hooks/useUploadAttachments.ts(新規作成)
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAttachment } from "../lib/attachmentsApi";
import { useAuth } from "../contexts/AuthContext";

export function useUploadAttachments(taskId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();   // ログイン中のユーザーを受け取る

  return useMutation({
    mutationFn: (files: File[]) => {
      if (!user) throw new Error("ログインが必要です");
      return Promise.all(files.map((file) => uploadAttachment(taskId, user.id, file)));
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["attachments", taskId] }),
  });
}