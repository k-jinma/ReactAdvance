import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskInputSchema, type TaskInput, TASK_PRIORITIES } from "../schemas/task";

type Props = {
  onSubmit: (input: TaskInput) => void;
};

export function TaskForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskInputSchema),
    defaultValues: { title: "", assignee: "", priority: "mid" },
  });

  const submit = (data: TaskInput) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(submit)}>
      <div className="task-form__row">
        <input
          className="task-form__input"
          placeholder="タイトル"
          {...register("title")}
        />
        <input
          className="task-form__input"
          placeholder="担当者"
          {...register("assignee")}
        />
        <select className="task-form__select" {...register("priority")}>
          {TASK_PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button className="task-form__submit" type="submit">
          追加
        </button>
      </div>
      {(errors.title || errors.assignee) && (
        <p className="task-form__error">
          {errors.title?.message ?? errors.assignee?.message}
        </p>
      )}
    </form>
  );
}
