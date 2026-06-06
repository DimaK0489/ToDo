export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  user_id: number;
}

export type FilterType = "all" | "completed" | "active";

export type LoginResponse = {
  access_token: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type RegistrationDataType = {
  email: string;
  password: string;
  userName: string;
};

export interface GetTodosResponse {
  data: TodoType[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
