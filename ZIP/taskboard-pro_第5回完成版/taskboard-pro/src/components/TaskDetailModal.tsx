// src/components/TaskDetailModal.tsx(新規作成 ― まずは見た目だけ)
import type { Task } from "../schemas/task";
import { FileDropzone } from "./FileDropzone";   // ← 追加

type Props = {
  task: Task;
  onClose: () => void;
};

// ダミーデータ(表示の確認用。ステップ4で本物に置き換える)
const dummyAttachments = [
  { id: "1", fileName: "画面設計書.pdf", size: 240_000 },
  { id: "2", fileName: "スクリーンショット.png", size: 80_000 },
];

export function TaskDetailModal({ task, onClose }: Props) {
  return (
    // 背景(暗幕)をクリックしたら閉じる
    <div className="modal__backdrop" onClick={onClose}>
      {/* 本体のクリックは背景へ伝えない(伝わると閉じてしまう) */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{task.title}</h2>
          <button type="button" className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal__meta">
          <span className={`task-card__priority task-card__priority--${task.priority}`}>
            {task.priority}
          </span>
          <span>担当:{task.assignee}</span>
          <span>状態:{task.status}</span>
        </div>

        <h3 className="modal__section">添付ファイル</h3>

        <FileDropzone
          onFiles={(files) => console.log(files.map((f) => f.name))}   // ← 追加:まずは名前を出すだけ
        />
        
        <ul className="attachment-list">
          {dummyAttachments.map((a) => (
            <li key={a.id} className="attachment">{a.fileName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}