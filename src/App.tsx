import { useEffect, useState } from "react";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { AdditionalOptions } from "./components/AdditionalOptions/AdditionalOptions";
import { FilterGroup } from "./components/FilterGroup/FilterGroup";
import { Header } from "./components/Header/Header";
import { Todolists } from "./components/Todolists/Todolists";
import { getData } from "./helpers";
import { type TodoType } from "./todoData";

export type FilterType = "all" | "completed" | "active";

function App() {
  const [todolist, setTodolist] = useState<TodoType[]>(getData);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    localStorage.setItem("todolists-data", JSON.stringify(todolist));
  }, [todolist]);

  const addTodolist = (title: string) => {
    setTodolist([...todolist, { id: Date.now(), title: title, isDone: false }]);
  };

  const changeStatus = (id: number, isDone: boolean) => {
    setTodolist(
      todolist.map((t) =>
        t.id === id ? { id: t.id, title: t.title, isDone: isDone } : t,
      ),
    );
  };

  const deleteTodolist = (id: number) => {
    setTodolist(todolist.filter((t) => t.id !== id));
  };

  const updateTitle = (id: number, newTitle: string) => {
    setTodolist(
      todolist.map((t) =>
        t.id === id ? { id: t.id, title: newTitle, isDone: t.isDone } : t,
      ),
    );
  };

  const filteredToDo = todolist.filter((t) => {
    if (filter === "completed") return t.isDone;
    if (filter === "active") return !t.isDone;
    return true;
  });

  const activeTasks = todolist.filter((t) => !t.isDone).length;

  const deleteCompletedTodo = () => {
    setTodolist(todolist.filter((t) => !t.isDone));
  };

  return (
    <div className="appContainer">
      <div className="content">
        <Header title="My To-Do List" />
        <AddItemForm addTodolist={addTodolist} />
        <Todolists
          data={filteredToDo}
          changeStatus={changeStatus}
          deleteTodolist={deleteTodolist}
          updateTitle={updateTitle}
        />
        <FilterGroup currentFilter={filter} onChangeFilter={setFilter} />
        <AdditionalOptions
          countTasks={activeTasks}
          deleteCompletedTodo={deleteCompletedTodo}
        />
      </div>
    </div>
  );
}

export default App;
