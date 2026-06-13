// src/components/Board.tsx(更新)
import type { TaskInput } from "../schemas/task";       // ← 追加
import { Column } from "./Column";
import { TaskForm } from "./TaskForm";
import { useTasks } from "../hooks/useTasks";
import { useCreateTask } from "../hooks/useCreateTask";   // ← 追加

export function Board() {

  const { data: tasks = [], isPending, isError, error } = useTasks();
  
  const createTask = useCreateTask();                      // ← 追加

  const handleAdd = async (input: TaskInput) => {
    
    createTask.mutate(input);                               // ← 変更

  };

  if (isPending) return <div className="board__loading">読み込み中...</div>;
  if (isError) return <div className="board__error">エラー: {error.message}</div>;
    
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