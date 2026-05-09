// タスクの状態 ― 不正な文字列をコンパイル時に弾く
export type TaskStatus = "todo" | "doing" | "review" | "done";

// 優先度
export type Priority = "low" | "medium" | "high";

// タスク本体
export type Task = {
  id: string;            // タスク固有のID(一意に定まる文字列)
  title: string;         // タスクのタイトル
  description: string;   // タスクの詳細説明
  status: TaskStatus;    // 現在のステータス(todo / doing / review / done)
  priority: Priority;    // 優先度(low / medium / high)
  assignee: string;      // 担当者名
  createdAt: string;     // 作成日(例: "2026-04-18")
};