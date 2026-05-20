import axios from "axios";
import type { LoginDataType, LoginResponse, TodoType } from "../types";

export const api = axios.create({
  baseURL: "https://todo-redev.herokuapp.com/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

export const AuthAPI = {
  login(data: LoginDataType) {
    return api.post<LoginResponse>("/auth/login", data);
  },
  registration() {
    return api.post("/users/register");
  },
};
