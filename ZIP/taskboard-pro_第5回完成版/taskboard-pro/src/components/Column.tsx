import { useDroppable } from "@dnd-kit/core";
import type { Task, TaskStatus } from "../schemas/task";
import { TaskCard } from "./TaskCard";

type Props = {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onOpenTask: (id: string) => void;   // ← 追加
};

export function Column({ status, title, tasks, onOpenTask  }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const items = tasks.filter((task) => task.status === status);

  return (
    <div ref={setNodeRef} className={`column ${isOver ? "column--over" : ""}`}>
      <h2 className="column__title">
        {title}({items.length})
      </h2>
      <div className="column__cards">
        {items.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={() => onOpenTask(task.id)} />
        ))}
      </div>
    </div>
  );
}
