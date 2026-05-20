import axios from "axios";
import type { TodoType } from "../types";

export const api = axios.create({
  baseURL: "https://todo-redev.herokuapp.com/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWQ4QG1haWwucnUiLCJpZCI6MjMyOCwiaWF0IjoxNzc5MTkyNjg0fQ.H2olsEb9DGYZRVMquAgJVuQYcFkTPq4gKrk8CH3txSs",
  },
});

export const todosAPI = {
  getTodos() {
    return api.get<TodoType[]>("/todos");
  },
  createTodo(title: string) {
    return api.post("/todos", { title });
  },
  deleteTodo(id: number) {
    return api.delete(`/todos/${id}`);
  },
  changeStatus(id: number) {
    return api.patch(`/todos/${id}/isCompleted`);
  },
  updateTitle(id: number, newTitle: string) {
    return api.patch<TodoType>(`/todos/${id}`, { title: newTitle });
  },
};
