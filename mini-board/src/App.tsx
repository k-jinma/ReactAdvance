// src/App.tsx(ステップE)
import { useState, useEffect } from "react";
import type { Task, TaskStatus } from "./types/task";
import { Column } from "./components/Column";
import { fetchTasks, createTask, deleteTask } from "./lib/tasksApi";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [loading, setLoading] = useState(true); // ← 追加:読み込み中かどうか
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    fetchTasks().then((data) => {
      setTasks(data);
    }).catch((error: unknown) => {
      setError(error instanceof Error ? error.message : "タスクの取得に失敗しました");
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleAdd = async() => {
    if (!title) return;
    await createTask({ title, status }); // DB に1件追加する
    const data = await fetchTasks(); // 一覧を取り直す
    setTasks(data);
    setTitle("");
  };

   // ← 変更:DB から削除してから、一覧を取り直す
  const handleDelete = async (id: string) => {
    await deleteTask(id); // DB から1件削除する
    const data = await fetchTasks(); // 一覧を取り直す
    setTasks(data);
  };

  // ← 追加:読み込み中は、ほかの表示の代わりにこれだけを返す
  if (loading) return <p style={{ padding: 24 }}>読み込み中...</p>;
  if (error) return <p role="alert" style={{ padding: 24 }}>{error}</p>;

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>mini-board</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="新しいタスク" />
      <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
        <option value="todo">ToDo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <button onClick={handleAdd}>+ 追加</button>

      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
        <Column status="todo" title="ToDo" tasks={tasks} onDelete={handleDelete} />
        <Column status="doing" title="Doing" tasks={tasks} onDelete={handleDelete} />
        <Column status="done" title="Done" tasks={tasks} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;