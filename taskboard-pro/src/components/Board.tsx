import type { TaskInput } from "../schemas/task";  // ← Task を外し TaskInput だけに
import { Column } from "./Column";
import { TaskForm } from "./TaskForm";
import { useTasks } from "../hooks/useTasks";          // ← 追加(useQuery と fetchTasks の import は不要に)
import { useCreateTask } from "../hooks/useCreateTask";   // ← 追加


export function Board() {
  const { data: tasks = [], isPending, isError, error } = useTasks();
  const createTask = useCreateTask();                      // ← 追加

  const handleAdd = (input: TaskInput) => {
    createTask.mutate(input);                               // ← 変更
  };

  // 第3回:if (isLoading) ... / if (error) ... {error}
  // ↓ 置き換え
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