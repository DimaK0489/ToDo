import { initialTodolists } from "./todoData";

export const getData = () => {
  const savedData = localStorage.getItem("todolists-data");
  return savedData ? JSON.parse(savedData) : initialTodolists;
};
