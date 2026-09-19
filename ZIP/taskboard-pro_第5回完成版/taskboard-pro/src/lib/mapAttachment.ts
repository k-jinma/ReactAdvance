import type { Database } from './database.types';
import type { Attachment } from '../schemas/attachment';

type AttachmentRow = Database['public']['Tables']['task_attachments']['Row'];

export function rowToAttachment(row: AttachmentRow, signedUrl: string): Attachment {
      return {
    id: row.id,
    taskId: row.task_id,
    fileName: row.file_name,
    storagePath: row.storage_path,
    mimeType: row.mime_type,
    size: row.size,
    createdAt: row.created_at,
    signedUrl,   // ← 追加:これを入れ忘れると画面まで値が届かない
  };
}