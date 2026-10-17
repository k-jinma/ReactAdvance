import type { Task } from "./types/task"
import { Column } from "./components/Column"

const dummyTasks: Task[] = [
  { id: "1", title: "要件定義", status: "done" },
  { id: "2", title: "画面設計", status: "doing" },
  { id: "3", title: "API実装", status: "doing" },
  { id: "4", title: "テスト", status: "todo" },
  { id: "5", title: "リリース", status: "todo" },
  
  { id: "6", title: "保守", status: "other" },
  
]

function App() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>mini-board</h1>
      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>

        <Column status="todo" title="ToDo" tasks={dummyTasks} />
        <Column status="doing" title="Doing" tasks={dummyTasks} />
        <Column status="done" title="Done" tasks={dummyTasks} />
        <Column status="other" title="Other" tasks={dummyTasks} />

        <Column status="all" title="ALL" tasks={dummyTasks} />

      </div>
    </div>
  );
}

export default App;