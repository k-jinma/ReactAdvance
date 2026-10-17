// src/components/AttachmentItem.tsx(新規作成)
import type { Attachment } from "../schemas/attachment";

type Props = {
  attachment: Attachment;
  onDelete: () => void;
};

// バイト数を "123 KB" / "1.5 MB" のように読みやすくする
function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    const kilobytes = Math.round(bytes / 1024);
    const displayValue = Math.max(1, kilobytes);
    return `${displayValue} KB`;
  }
  const megabytes = (bytes / 1024 / 1024).toFixed(1);
  return `${megabytes} MB`;
}

export function AttachmentItem({ attachment, onDelete }: Props) {
  // MIME タイプで「画像か・PDFか・それ以外か」を判定する
  const isImage = attachment.mimeType.startsWith("image/");
  const isPdf = attachment.mimeType === "application/pdf";

  return (
    <li className="attachment">
      <div className="attachment__preview">
        {isImage ? (
          <img src={attachment.signedUrl} alt={attachment.fileName} />
        ) : (
          <span className="attachment__icon">{isPdf ? "📄" : "📎"}</span>
        )}
      </div>
      <div className="attachment__body">
        {/* Signed URL なので、ログインしていない人がこのURLを知っていても期限が切れれば開けない */}
        <a
          className="attachment__name"
          href={attachment.signedUrl}
          target="_blank"
          rel="noreferrer"
        >
          {attachment.fileName}
        </a>
        <span className="attachment__size">{formatSize(attachment.size)}</span>
      </div>
      <button
        type="button"
        className="attachment__delete"
        onClick={onDelete}
        aria-label="添付を削除"
      >
        ×
      </button>
    </li>
  );
}