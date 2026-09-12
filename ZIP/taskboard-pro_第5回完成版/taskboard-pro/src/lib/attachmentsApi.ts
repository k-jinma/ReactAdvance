// src/lib/attachmentsApi.ts(新規作成)
import { supabase } from "./supabase";
import { rowToAttachment } from "./mapAttachment";
import type { Attachment } from "../schemas/attachment";

const BUCKET = "attachments";   // ステップ1で作ったバケット名

// 一覧:このタスクに付いている添付を、台帳から取る
export async function fetchAttachments(taskId: string): Promise<Attachment[]> {
  const { data: rows, error } = await supabase
    .from("task_attachments")
    .select("*")
    .eq("task_id", taskId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return rows.map(rowToAttachment);
}

// 追加:①Storage へファイル本体を置く → ②DB に「どこに置いたか」の行を残す
export async function uploadAttachment(
  taskId: string,
  userId: string,
  file: File
): Promise<void> {
  // Storage 上のキーは自分で決める。先頭フォルダを「自分のユーザーID」にするのがポイント
  // (ポリシーで「先頭フォルダが自分のIDのファイルだけ触れる」と縛るため)
  // 日本語や空白を含む元のファイル名はキーに使わず、拡張子だけ引き継ぐ
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${userId}/${taskId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file);
  if (uploadError) throw uploadError;

  const { error } = await supabase.from("task_attachments").insert({
    task_id: taskId,
    file_name: file.name,
    storage_path: path,
    mime_type: file.type,
    size: file.size,
  });
  if (error) throw error;
}