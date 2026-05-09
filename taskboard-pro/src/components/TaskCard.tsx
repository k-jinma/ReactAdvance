import type { Task } from "../schemas/task";

type Props = {
  task: Task;
};

export function TaskCard({ task }: Props) {
  return (
    <div className="task-card">
      <div className="task-card__title">{task.title}</div>
      <div className="task-card__meta">
        <span className={`task-card__priority task-card__priority--${task.priority}`}>
          {task.priority}
        </span>
        <span className="task-card__assignee">{task.assignee}</span>
      </div>
    </div>
  );
}