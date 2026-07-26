import { supabase } from "./supabase";
import { rowToTask, taskInputToInsert } from "./mapTask";
import type { Task, TaskInput, TaskStatus } from "../schemas/task";

const PROJECT_ID = "00000000-0000-0000-0000-000000000001";

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", PROJECT_ID)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data.map(rowToTask);
}

export async function createTask(input: TaskInput): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert(taskInputToInsert(input, PROJECT_ID))
    .select("*")
    .single();
  if (error) throw error;
  return rowToTask(data);
}

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

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}
