// src/components/Board.tsx(第1回の内容を全置換)
import { useState } from "react";
import type { Task, TaskInput } from "../schemas/task";
import { dummyTasks } from "../data/dummyTasks";
import { Column } from "./Column";
import { TaskForm } from "./TaskForm";

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);

  const handleAdd = (input: TaskInput) => {
    const newTask: Task = {
      id: `t-${Date.now()}`,
      status: "todo",
      createdAt: new Date().toISOString().slice(0, 10),
      ...input,
    };
    setTasks((prev) => [...prev, newTask]);
  };

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