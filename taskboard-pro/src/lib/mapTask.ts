// src/lib/mapTask.ts(新規作成)
import type { Database } from "./database.types";
import type { Task } from "../schemas/task";
import type { TaskInput } from "../schemas/task";

// DBの tasks テーブル1行ぶんの型 ― 長いので別名にしておく
type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];

// DBの行 → フロントのTask型
export function rowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status as Task["status"],     // CHECK制約があるのでキャストしてOK
    priority: row.priority as Task["priority"], // as は 「この値の型は X です、と TypeScript に断言する」 構文です。
    assignee: row.assignee,
    dueDate: row.due_date ?? undefined,        // row.due_date が null だったら undefined に変換する
    // DB側がnullの場合、JavaScriptではnullではなく、undefinedで表現することが多いため 
    createdAt: row.created_at,
  };
}


type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"];
// フロントのTaskInput → DBのInsert型
export function taskInputToInsert(
  input: TaskInput,
  projectId: string
): TaskInsert {
  return {
    project_id: projectId,
    title: input.title,
    description: input.description,
    assignee: input.assignee,
    priority: input.priority,
    due_date: input.dueDate ?? null,  // undefined → null に正規化
    // id, status, created_at は default 値があるので省略可
  };
}