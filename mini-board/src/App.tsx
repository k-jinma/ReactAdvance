// src/App.tsx(ステップE)
import { useState, useEffect } from "react";
import type { Task, TaskStatus } from "./types/task";
import { Column } from "./components/Column";
import { fetchTasks } from "./lib/fetchTasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [loading, setLoading] = useState(true); // ← 追加:読み込み中かどうか

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
      setLoading(false); // ← 追加:読み込みが終わった
    });
  }, []);

  const handleAdd = () => {
    if (!title) return;
    setTasks((prev) => [...prev, { id: `task-${Date.now()}`, title, status }]);
    setTitle("");
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ← 追加:読み込み中は、ほかの表示の代わりにこれだけを返す
  if (loading) return <p style={{ padding: 24 }}>読み込み中...</p>;

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