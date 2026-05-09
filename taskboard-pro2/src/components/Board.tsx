import { useState } from "react";
import type { Task, TaskStatus } from "../types/task";
import { dummyTasks } from "../data/dummyTasks";
import { Column } from "./Column";

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks); // 注意★ 後で解説
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = (status: TaskStatus) => {
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `t-${Date.now()}`,
      title: newTitle,
      description: "",
      status,
      priority: "medium",
      assignee: "未割り当て",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTitle("");
  };

  return (
    <div className="board">
      <div className="board__toolbar">
        <input
          className="board__input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="新しいタスクのタイトル"
        />
        <button onClick={() => handleAdd("todo")}>+ ToDoに追加</button>
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