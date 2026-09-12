// src/schemas/attachment.ts(新規作成)
// アプリ内で扱う添付ファイル(DBの行を変換した後の形・キャメルケース)
export type Attachment = {
  id: string;
  taskId: string;
  fileName: string;     // 表示用の元のファイル名(例: "設計書 v2.pdf")
  storagePath: string;  // Storage 上の置き場所(例: "<userId>/<taskId>/xxxx.pdf")
  mimeType: string;     // "image/png" / "application/pdf" など
  size: number;         // バイト数
  createdAt: string;
};