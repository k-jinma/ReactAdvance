import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../lib/tasksApi";

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
