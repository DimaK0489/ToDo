export interface TodoType {
  id: number;
  title: string;
  isDone: boolean;
}

export const initialTodolists: TodoType[] = [
  { id: 1, title: "Read book", isDone: false },
  { id: 2, title: "Buy bread", isDone: true },
  { id: 3, title: "Go to the gym", isDone: false },
];
