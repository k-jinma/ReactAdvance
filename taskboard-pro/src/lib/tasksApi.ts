// src/lib/tasksApi.ts(新規作成)
import { supabase } from "./supabase";
import { rowToTask, taskInputToInsert } from "./mapTask";
import type { Task, TaskInput, TaskStatus } from "../schemas/task";

// 第3回まで Board.tsx にあった PROJECT_ID をここに移動
const PROJECT_ID = "00000000-0000-0000-0000-000000000001";

// 【Read】一覧取得
export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", PROJECT_ID)
    .order("created_at", { ascending: true });
  if (error) throw error;            // ★ throw する(理由は下で解説)
  return data.map(rowToTask);
}

// 【Create】新規作成
export async function createTask(input: TaskInput): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert(taskInputToInsert(input, PROJECT_ID))
    .select("*")
    .single();
  if (error) throw error;
  return rowToTask(data);
}

// 【Update】ステータス更新(ステータス変更のセレクトで使う)
export async function updateTaskStatus(
  id: string,
  status: TaskStatus
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return rowToTask(data);
}

// 【Delete】削除
export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}