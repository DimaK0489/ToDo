import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todosAPI } from "./../api/instance";
import type { TodoType } from "../types/types";
import { showAlertError } from "../common/helpers";

const TODOS_KEY = ["todos"];

export const useTodos = () => {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: TODOS_KEY,
    queryFn: async () => {
      const response = await todosAPI.getTodos();
      return response.data.data;
    },
  });

  const createTodoMutation = useMutation({
    mutationFn: async (newData: { title: string; description: string }) => {
      const response = await todosAPI.createTodo(newData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await todosAPI.deleteTodo(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await todosAPI.changeStatus(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTitleMutation = useMutation({
    mutationFn: async ({ id, newTitle }: { id: number; newTitle: string }) => {
      const response = await todosAPI.updateTitle(id, newTitle);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
  });

  const deleteCompletedMutation = useMutation({
    mutationFn: async (completedTodos: TodoType[]) => {
      return Promise.all(completedTodos.map((t) => todosAPI.deleteTodo(t.id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error(error);
      showAlertError(error, "Failed delete all completed tasks");
    },
  });

  return {
    todos,
    isLoading,
    isError,
    error,
    createTodo: createTodoMutation.mutate,
    isCreating: createTodoMutation.isPending,
    deleteTodo: deleteTodoMutation.mutate,
    deletingId: deleteTodoMutation.isPending,
    changeStatus: changeStatusMutation.mutate,
    updateTitle: updateTitleMutation.mutate,
    deleteCompleted: deleteCompletedMutation.mutate,
  };
};
