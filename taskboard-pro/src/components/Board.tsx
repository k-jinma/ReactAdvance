// src/components/Board.tsx(更新)
import { useEffect, useState } from "react";
import type { Task, TaskInput } from "../schemas/task";
import { supabase } from "../lib/supabase";          // ← 追加
import { rowToTask, taskInputToInsert } from "../lib/mapTask";          // ← 追加
import { Column } from "./Column";
import { TaskForm } from "./TaskForm";


// 今回はとりあえずダミーで1件入れたプロジェクトのIDを使う
const PROJECT_ID = "00000000-0000-0000-0000-000000000001";

export function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);     // 初期値は空配列
  const [isLoading, setIsLoading] = useState(true);   // ← 追加
  const [error, setError] = useState<string | null>(null);

  // 初回マウント時にDBから読み込む
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", PROJECT_ID)
        .order("created_at", { ascending: true });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }
      setTasks(data.map(rowToTask));
      setIsLoading(false);
    };
    load();
  }, []);

const handleAdd = async (input: TaskInput) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert(taskInputToInsert(input, PROJECT_ID))
    .select("*")
    .single();

  if (error) {
    setError(error.message);
    return;
  }
  setTasks((prev) => [...prev, rowToTask(data)]);
};

  if (isLoading) return <div className="board__loading">読み込み中...</div>;
  if (error) return <div className="board__error">エラー: {error}</div>;

  return (
    <div className="board">
      <div className="board__toolbar">
        <TaskForm onSubmit={handleAdd} />
      </div>
      <div className="board__columns">
        <Column status="todo" title="ToDo" tasks={tasks} />
        <Column status="doing" title="Doing" tasks={tasks} />
        <Column status="review" title="Review" tasks={tasks} />
        <Column status="done" title="Done" tasks={tasks} />
      </div>
    </div>
  );
}