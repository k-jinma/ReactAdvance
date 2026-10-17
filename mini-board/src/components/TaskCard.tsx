import type { Task } from "../types/task";

type Props = {
    task: Task
    onDelete: (id: string) => void;
};

export function TaskCard( { task, onDelete } : Props) {
  return(
    <div className="task-card">
      {task.title}
      <button onClick={() => onDelete(task.id)}>削除</button>
    </div>
  )
}