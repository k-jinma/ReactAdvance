// src/lib/tasksApi.ts(課題2)
import { supabase } from "./supabase";
import type { Task, TaskStatus } from "../types/task";

// タスクの一覧を取ってくる関数
// SQL の select id, title, status from review_tasks order by id; と同じ
export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("review_tasks")
    .select("id, title, status")
    .order("id");

  if (error) throw error; // 失敗したらエラーを投げる

  // DB の id は数値なので、アプリの Task に合わせて文字列に変える
  return data.map((row) => ({
    id: String(row.id),
    title: row.title,
    status: row.status,
  }));
}

// ← 追加:タスクを1件追加する関数
// SQL の insert into review_tasks (title, status) values ('タイトル', 'todo'); と同じ
export async function createTask(newTask: { title: string; status: TaskStatus }): Promise<void> {
  const { error } = await supabase.from("review_tasks").insert(newTask);
  if (error) throw error;
}

// ← 追加:タスクを1件削除する関数
// SQL の delete from review_tasks where id = 番号; と同じ
export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from("review_tasks").delete().eq("id", id);
  if (error) throw error;
}

