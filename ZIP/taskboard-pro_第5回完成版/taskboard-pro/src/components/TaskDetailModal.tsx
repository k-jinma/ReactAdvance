// src/components/TaskDetailModal.tsx(更新 ― ダミーを本物に置き換え)
import type { Task } from "../schemas/task";
import { useAttachments } from "../hooks/useAttachments";               // ← 追加
import { useUploadAttachments } from "../hooks/useUploadAttachments";   // ← 追加
import { FileDropzone } from "./FileDropzone";

type Props = {
  task: Task;
  onClose: () => void;
};

// ← 削除:dummyAttachments はもう使わない

export function TaskDetailModal({ task, onClose }: Props) {
  // ← 追加:このタスクの添付一覧と、アップロード
  const { data: attachments = [], isPending, isError, error } = useAttachments(task.id);
  const upload = useUploadAttachments(task.id);

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* ...(header / meta は変更なし) */}

        <h3 className="modal__section">添付ファイル</h3>

        <FileDropzone
          onFiles={(files) => upload.mutate(files)}   // ← 変更:console.log → アップロード
          disabled={upload.isPending}                 // ← 追加:アップロード中は受け付けない
        />
        {upload.isError && (                          // ← 追加
          <p className="modal__error">アップロードに失敗しました: {upload.error.message}</p>
        )}

        {/* ← 追加:読み込み中・エラー・0件の表示 */}
        {isPending && <p className="modal__note">読み込み中...</p>}
        {isError && <p className="modal__error">エラー: {error.message}</p>}
        {!isPending && !isError && attachments.length === 0 && (
          <p className="modal__note">まだ添付はありません</p>
        )}

        <ul className="attachment-list">
          {attachments.map((a) => (                   // ← 変更:dummyAttachments → attachments
            <li key={a.id} className="attachment">{a.fileName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}