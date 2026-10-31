import { useState, useEffect } from "react"
import type { Task, TaskStatus } from "./types/task"
import { Column } from "./components/Column"
import { fetchTasks } from "./lib/fetchTasks"

function App() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState(""); // ← 追加
  const [status, setStatus] = useState<TaskStatus>("todo") // ← 追加
  const [loading, setLoading] = useState(true); // ← 追加:読み込み中かどうか

  // ← 追加:最初の描画のあとに1回だけ、タスクを取ってくる
  useEffect(() => {
    try{

      fetchTasks().then((data) => { 
        setTasks(data) 
        setLoading(false) 
      })

    }catch(e){
      console.error(e)

    }finally{
      setLoading(false)
      
    }

  }, [])

  const handleAdd = () => {
    if (!title) return;
    setTasks((prev) => [...prev, { id: `task-${Date.now()}`, title, status }])
    setTitle("")
  };

  const hadleDelete = ( id: string ) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // ← 追加:読み込み中は、ほかの表示の代わりにこれだけを返す
  if (loading) {
    return <p style={{ padding: 24 }}>読み込み中...</p>
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