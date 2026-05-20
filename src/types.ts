export interface TodoType {
  id: number;
  title: string;
  isCompleted: boolean;
  user_id: number;
}

export type FilterType = "all" | "completed" | "active";

export type LoginResponse = {
  token: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};
