import type { Task, TaskStatus } from "../schemas/task";
import { TaskCard } from "./TaskCard";

type Props = {
  status: TaskStatus;
  title: string;
  tasks: Task[];
};

export function Column({ status, title, tasks }: Props) {
  const filtered = tasks.filter((t) => t.status === status);

  return (
    <div className="column">
      <div className="column__header">
        <h2 className="column__title">{title}</h2>
        <span className="column__count">{filtered.length}</span>
      </div>
      <div className="column__body">
        {filtered.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}