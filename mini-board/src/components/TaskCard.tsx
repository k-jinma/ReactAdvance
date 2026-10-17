import type { Task } from "../types/task";

type Props = {
    task: Task
};

export function TaskCard( { task } : Props) {
  return <div className="task-card">{task.title}</div>;
}