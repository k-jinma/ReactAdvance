// src/schemas/task.ts(新規作成)
import { z } from "zod";

// タスクの状態 ― 不正な文字列を実行時にも弾く exportはこの変数を外部公開する意味（importして使ってもらう）
export const TaskStatusSchema = z.enum(["todo", "doing", "review", "done"]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

// 優先度
export const PrioritySchema = z.enum(["low", "medium", "high"]);
export type Priority = z.infer<typeof PrioritySchema>;

// タスク本体
export const TaskSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: "タイトルは必須です" })
    .max(80, { message: "タイトルは80文字以内で入力してください" }),
  description: z
    .string()
    .max(500, { message: "説明は500文字以内で入力してください" }),
  status: TaskStatusSchema,
  priority: PrioritySchema,
  assignee: z
    .string()
    .min(1, { message: "担当者は必須です" })
    .max(40, { message: "担当者名は40文字以内で入力してください" }),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "期限はYYYY-MM-DD形式で入力してください" })
    .optional(),  // ← 第1回の Task に無かった、今回拡張したフィールド
  createdAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;

// src/schemas/task.ts の末尾に追記
export const TaskInputSchema = TaskSchema.omit({
  id: true,
  status: true,
  createdAt: true,
});

export type TaskInput = z.infer<typeof TaskInputSchema>;