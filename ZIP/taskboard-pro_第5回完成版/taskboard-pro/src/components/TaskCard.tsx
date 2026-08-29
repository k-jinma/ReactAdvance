import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../schemas/task";
import { useDeleteTask } from "../hooks/useDeleteTask";

type Props = {
  task: Task;
  onOpen: () => void;   // ← 追加
};

export function TaskCard({ task, onOpen }: Props) {
  const deleteTask = useDeleteTask();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id, data: { task } });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task-card"
      onClick={onOpen}   // ← 追加
      {...attributes}
      {...listeners}
    >
      <div className="task-card__top">
        <div className="task-card__title">{task.title}</div>
        <button
          type="button"
          className="task-card__delete"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();   // ← 追加:削除ボタンのクリックで詳細が開かないようにする
            if (confirm(`「${task.title}」を削除しますか?`)) {
              deleteTask.mutate(task.id);
            }
          }}
        >
          ×
        </button>
      </div>
      <div className="task-card__meta">
        <span className={`task-card__priority task-card__priority--${task.priority}`}>
          {task.priority}
        </span>
        <span className="task-card__assignee">{task.assignee}</span>
      </div>
    </div>
  );
}
