import axios from "axios";
import type {
  GetTodosResponse,
  LoginDataType,
  LoginResponse,
  RegistrationDataType,
  TodoType,
} from "../types/types";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  getTodos(completed?: boolean) {
    return api.get<GetTodosResponse>("/todos", {
      params: {
        completed,
        page: 1,
        limit: 10,
      },
    });
  },
  createTodo(data: { title: string; description: string }) {
    return api.post("/todos", data);
  },
  deleteTodo(id: number) {
    return api.delete<TodoType>(`/todos/${id}`);
  },
  changeStatus(id: number) {
    return api.patch<TodoType>(`/todos/${id}/toggle`);
  },
  updateTitle(id: number, newTitle: string) {
    return api.patch<TodoType>(`/todos/${id}`, { title: newTitle });
  },
};

export const AuthAPI = {
  login(data: LoginDataType) {
    return api.post<LoginResponse>("/auth/login", data);
  },
  registration(data: RegistrationDataType) {
    return api.post<LoginResponse>("/auth/register", data);
  },
  authMe() {
    return api.get("/auth/me");
  },
};
