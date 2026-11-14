// src/lib/tasksApi.ts(課題2)
import { supabase } from "./supabase";
import type { Task } from "../types/task";

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