import type { Database } from "./database.types";
import type { Task, TaskInput, TaskStatus, TaskPriority } from "../schemas/task";

type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];
type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"];

// 【読み込みの出口】DBの行(スネークケース) → フロントの Task(キャメルケース)
export function rowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    assignee: row.assignee,
    priority: row.priority as TaskPriority,
    status: row.status as TaskStatus,
    dueDate: row.due_date ?? undefined,
    createdAt: row.created_at,
  };
}

// 【書き込みの入口】フロントの入力 → DBの INSERT 形式(スネークケース)
// id / status / created_at は DB が自動で埋めるので渡さない
export function taskInputToInsert(input: TaskInput, projectId: string): TaskInsert {
  return {
    project_id: projectId,
    title: input.title,
    assignee: input.assignee,
    priority: input.priority,
    due_date: input.dueDate ?? null,
  };
}
