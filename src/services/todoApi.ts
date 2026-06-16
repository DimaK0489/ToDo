import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../common/endpoints";
import type {
  LoginDataType,
  LoginResponse,
  MetaType,
  RegistrationDataType,
  TodoType,
} from "../types/types";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Todo"],
  endpoints: (builder) => ({
    authMe: builder.query({
      query: () => endpoints.AUTH_ME,
      providesTags: ["Auth"],
    }),
    login: builder.mutation<LoginResponse, LoginDataType>({
      query: (data) => ({
        url: endpoints.AUTH_LOGIN,
        method: "POST",
        body: data,
      }),
    }),
    registration: builder.mutation<LoginResponse, RegistrationDataType>({
      query: (data) => ({
        url: endpoints.AUTH_REGISTRATION,
        method: "POST",
        body: data,
      }),
    }),
    getTodos: builder.query<TodoType[], void>({
      query: () => endpoints.TODOLISTS,
      providesTags: ["Todo"],
      transformResponse: (response: { data: TodoType[]; meta: MetaType }) =>
        response.data,
    }),
    createTodo: builder.mutation<
      TodoType,
      { title: string; description: string }
    >({
      query: (newTodo) => ({
        url: endpoints.TODOLISTS,
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<{ success: boolean }, string | number>({
      query: (id: string) => ({
        url: endpoints.DELETE_TODOLIST(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    changeTodoStatus: builder.mutation<
      TodoType,
      { id: number; completed: boolean }
    >({
      query: ({ id, completed }) => ({
        url: endpoints.UPDATE_TODOLIST(id),
        method: "PATCH",
        body: { completed },
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTodoTitle: builder.mutation<
      TodoType,
      { id: number; newTitle: string }
    >({
      query: ({ id, newTitle }) => ({
        url: endpoints.UPDATE_TODOLIST(id),
        method: "PATCH",
        body: { title: newTitle },
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useAuthMeQuery,
  useLoginMutation,
  useRegistrationMutation,
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useChangeTodoStatusMutation,
  useUpdateTodoTitleMutation,
} = todoApi;
