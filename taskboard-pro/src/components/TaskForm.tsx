// src/components/TaskForm.tsx(新規作成)
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskInputSchema, type TaskInput } from "../schemas/task";

type Props = {
  onSubmit: (input: TaskInput) => void;
};

export function TaskForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskInput>({
    resolver: zodResolver(TaskInputSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      priority: "medium",
      dueDate: "",
    },
  });

  const submit = (data: TaskInput) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(submit)}>
      <div className="task-form__row">
        <label className="task-form__field">
          <span className="task-form__label">タイトル *</span>
          <input className="task-form__input" {...register("title")} />
          {errors.title && (
            <span className="task-form__error">{errors.title.message}</span>
          )}
        </label>
      </div>

      <div className="task-form__row">
        <label className="task-form__field">
          <span className="task-form__label">説明</span>
          <textarea className="task-form__textarea" rows={2} {...register("description")} />
          {errors.description && (
            <span className="task-form__error">{errors.description.message}</span>
          )}
        </label>
      </div>

      <div className="task-form__row task-form__row--inline">
        <label className="task-form__field">
          <span className="task-form__label">担当者 *</span>
          <input className="task-form__input" {...register("assignee")} />
          {errors.assignee && (
            <span className="task-form__error">{errors.assignee.message}</span>
          )}
        </label>

        <label className="task-form__field">
          <span className="task-form__label">優先度</span>
          <select className="task-form__input" {...register("priority")}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>

        <label className="task-form__field">
          <span className="task-form__label">期限</span>
          <input type="date" className="task-form__input" {...register("dueDate")} />
          {errors.dueDate && (
            <span className="task-form__error">{errors.dueDate.message}</span>
          )}
        </label>
      </div>

      <div className="task-form__actions">
        <button type="submit" className="task-form__submit" disabled={isSubmitting}>
          + ToDoに追加
        </button>
      </div>
    </form>
  );
}