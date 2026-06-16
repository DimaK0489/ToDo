export const endpoints = {
  AUTH_ME: "/auth/me",
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTRATION: "/auth/register",
  TODOLISTS: "/todos",
  DELETE_TODOLIST: (id: number | string) => `/todos/${id}`,
  CHANGE_STATUS_TODOLIST: (id: string | number) => `/todos/${id}/toggle`,
  UPDATE_TODOLIST: (id: string | number) => `/todos/${id}`,
};
