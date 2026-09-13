// src/App.tsx(置き換え)
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./lib/supabase";

const BUCKET = "practice-uploads";

// 表示する1件の形(ファイル名 + 公開URL)
type FileItem = {
  name: string;
  url: string;
};

// 1件のファイル名から、表示用の形(名前 + 公開URL)を作る
function toFileItem(name: string): FileItem {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(name);
  return { name, url: data.publicUrl };
}

// 【一覧 / list】バケットの中にあるファイルを列挙する
async function fetchFiles(): Promise<FileItem[]> {
  const { data, error } = await supabase.storage.from(BUCKET).list();
  if (error) throw error;
  return data.map((item) => toFileItem(item.name));
}

// 【アップロード / upload】選んだファイルをバケットへ置く
async function uploadFile(file: File): Promise<void> {
  const path = `${crypto.randomUUID()}-${file.name}`;   // 同じ名前でも衝突しないキーにする
  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;
}

export default function App() {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  // 一覧(list)を useQuery で
  const { data: files = [], isPending, isError, error } = useQuery({
    queryKey: ["files"],     // このデータの名前(キャッシュのキー)
    queryFn: fetchFiles,     // 取りに行く方法
  });

  // アップロード(upload)を useMutation で
  const upload = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] }); // アップロード後に一覧を取得し直す
      setFile(null);
    },
  });

  // アップロードボタンが押されたとき、ファイルが選ばれていれば実行する
  function handleUpload() {
    if (file) {
      upload.mutate(file);
    }
  }

  return (
    <div className="app">
      <h1>Storage アップロードの確認</h1>

      {/* アップロード(upload) */}
      <div className="add">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button onClick={handleUpload} disabled={upload.isPending || !file}>
          アップロードする
        </button>
      </div>

      {/* 一覧(list)した結果の表示 */}
      {isPending ? (
        <p>読み込み中...</p>
      ) : isError ? (
        <p className="error">エラー: {error.message}</p>
      ) : (
        <ul className="files">
          {files.map((f) => (
            <li key={f.name}>
              <a href={f.url} target="_blank" rel="noreferrer">{f.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}