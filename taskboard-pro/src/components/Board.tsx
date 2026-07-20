import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import type { Task, TaskInput, TaskStatus } from "../schemas/task";
import { useTasks } from "../hooks/useTasks";
import { useCreateTask } from "../hooks/useCreateTask";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { Column } from "./Column";
import { TaskForm } from "./TaskForm";

export function Board() {
  const { data: tasks = [], isPending, isError, error } = useTasks();
  const createTask = useCreateTask();
  const updateStatus = useUpdateTaskStatus();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleAdd = (input: TaskInput) => {
    createTask.mutate(input);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const task = active.data.current?.task as Task | undefined;
    const newStatus = over.id as TaskStatus;

    if (task && task.status !== newStatus) {
      updateStatus.mutate({ id: task.id, status: newStatus });
    }
  };

  if (isPending) return <div className="board__loading">読み込み中...</div>;
  if (isError) return <div className="board__error">エラー: {error.message}</div>;

  return (
    <div className="board">
      <div className="board__toolbar">
        <TaskForm onSubmit={handleAdd} />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="board__columns">
          <Column status="todo" title="ToDo" tasks={tasks} />
          <Column status="doing" title="Doing" tasks={tasks} />
          <Column status="review" title="Review" tasks={tasks} />
          <Column status="done" title="Done" tasks={tasks} />
        </div>
      </DndContext>
    </div>
  );
}
