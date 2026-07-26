import { z } from "zod";

// タスクの状態(レーン)
export const TASK_STATUSES = ["todo", "doing", "review", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

// 優先度
export const TASK_PRIORITIES = ["low", "mid", "high"] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

// フォーム入力(作成時にユーザーが入力する項目)
export const taskInputSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  assignee: z.string().min(1, "担当者を入力してください"),
  priority: z.enum(TASK_PRIORITIES),
  dueDate: z.string().optional(),
});
export type TaskInput = z.infer<typeof taskInputSchema>;

// アプリ内で扱うタスク(DBから取得して変換した後の形・キャメルケース)
export type Task = {
  id: string;
  projectId: string;
  title: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
};
