import { useState } from "react"
import type { Task, TaskStatus } from "./types/task"
import { Column } from "./components/Column"

const dummyTasks: Task[] = [
  { id: "1", title: "要件定義", status: "done" },
  { id: "2", title: "画面設計", status: "doing" },
  { id: "3", title: "API実装", status: "doing" },
  { id: "4", title: "テスト", status: "todo" },
  { id: "5", title: "リリース", status: "todo" },
  { id: "6", title: "保守", status: "todo" },
]


function App() {

  const [tasks, setTasks] = useState<Task[]>(dummyTasks)
  const [title, setTitle] = useState(""); // ← 追加
  const [status, setStatus] = useState<TaskStatus>("todo"); // ← 追加

  const handleAdd = () => {
    if(!title) return

    tasks.push({ id: `task-${Date.now()}`, title, status: status })
    setTasks(tasks)

    setTitle("") // ← 追加
  }

  const hadleDelete = ( id: string ) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }


  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>mini-board</h1>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="新しいタスク" />
      
      {/* ← 追加:追加先のレーンを選ぶセレクト */}
      <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
        <option value="todo">ToDo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      
      <button onClick={handleAdd}>+ 追加</button>

      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>

        <Column status="todo" title="ToDo" tasks={tasks} onDelete={hadleDelete} />
        <Column status="doing" title="Doing" tasks={tasks} onDelete={hadleDelete} />
        <Column status="done" title="Done" tasks={tasks} onDelete={hadleDelete} />
        <Column status="other" title="Other" tasks={tasks} onDelete={hadleDelete} />

        <Column status="all" title="ALL" tasks={tasks} onDelete={hadleDelete} />

      </div>
    </div>
  );
}

export default App;