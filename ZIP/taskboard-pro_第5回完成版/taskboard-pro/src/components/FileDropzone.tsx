// src/components/FileDropzone.tsx(新規作成)
import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";

type Props = {
  onFiles: (files: File[]) => void;   // 受け取ったファイルを親へ渡す
  disabled?: boolean;                  // アップロード中は受け付けない
};

export function FileDropzone({ onFiles, disabled = false }: Props) {
  const [isOver, setIsOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ブラウザ標準のドラッグ&ドロップ。dataTransfer.files にドロップされたファイルが入っている
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();           // 既定の動作(ブラウザがファイルを開いてしまう)を止める
    setIsOver(false);
    if (disabled) return;
    onFiles(Array.from(e.dataTransfer.files));
  };

  // クリックで開いた「ファイルを選択」ダイアログから選ばれたとき
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFiles(Array.from(e.target.files ?? []));
    e.target.value = "";          // 同じファイルをもう一度選べるようにリセット
  };

  return (
    <div
      className={`dropzone ${isOver ? "dropzone--over" : ""} ${disabled ? "dropzone--disabled" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();       // これがないと onDrop が発火しない
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <p className="dropzone__text">
        {disabled
          ? "アップロード中..."
          : "ここに画像やPDFをドロップ(またはクリックして選択)"}
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,application/pdf"
        hidden
        onChange={handleChange}
      />
    </div>
  );
}