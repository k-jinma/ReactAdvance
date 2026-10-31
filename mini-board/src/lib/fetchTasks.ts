// src/lib/fetchTasks.ts
import type { Task } from "../types/task";

const dummyTasks: Task[] = [
  { id: "1", title: "要件定義", status: "done" },
  { id: "2", title: "画面設計", status: "doing" },
  { id: "3", title: "API実装", status: "doing" },
  { id: "4", title: "テスト", status: "todo" },
  { id: "5", title: "リリース", status: "todo" },
];

// 指定したミリ秒だけ待つ関数
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

// タスクの一覧を返す関数(サーバーとの通信の代わり)
export async function fetchTasks(): Promise<Task[]> {
  console.log("fetchTasks が呼ばれました");
  await wait(500); // 0.5秒待つ
  return [...dummyTasks]; // コピーした新しい配列を返す
}