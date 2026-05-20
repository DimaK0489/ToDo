import { useEffect, useState } from "react";
import { todosAPI } from "./api/instance";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { AdditionalOptions } from "./components/AdditionalOptions/AdditionalOptions";
import { FilterGroup } from "./components/FilterGroup/FilterGroup";
import { Header } from "./components/Header/Header";
import { Todolists } from "./components/Todolists/Todolists";
import { type TodoType } from "./types";
import { Loading } from "./components/Loading/Loading";
import { showAlertError } from "./helpers";

export type FilterType = "all" | "completed" | "active";

function App() {
  const [todolist, setTodolist] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await todosAPI.getTodos();
        setTodolist(response.data);
      } catch (error) {
        showAlertError(error, "Failed to retrieve data from the server");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const addTodolist = async (title: string) => {
    setIsLoading(true);
    try {
      const response = await todosAPI.createTodo(title);
      setTodolist([response.data, ...todolist]);
    } catch (error) {
      console.error(error);
      showAlertError(error, "Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodolist = async (id: number) => {
    setIsLoading(true);
    try {
      await todosAPI.deleteTodo(id);
      setTodolist(todolist.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
      showAlertError(error, "Failed to delete task on server");
    } finally {
      setIsLoading(false);
    }
  };

  const changeStatus = async (id: number, isCompleted: boolean) => {
    setIsLoading(true);
    try {
      await todosAPI.changeStatus(id);
      setTodolist(
        todolist.map((t) =>
          t.id === id
            ? {
                id: t.id,
                title: t.title,
                isCompleted: isCompleted,
                user_id: t.user_id,
              }
            : t,
        ),
      );
    } catch (error) {
      console.error(error);
      showAlertError(error, "Failed to update task status");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTitle = async (id: number, newTitle: string) => {
    setIsLoading(true);
    try {
      await todosAPI.updateTitle(id, newTitle);
      setTodolist(
        todolist.map((t) => (t.id === id ? { ...t, title: newTitle } : t)),
      );
    } catch (error) {
      console.error(error);
      showAlertError(error, "Failed to update task title");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredToDo = todolist.filter((t) => {
    if (filter === "completed") return t.isCompleted;
    if (filter === "active") return !t.isCompleted;
    return true;
  });

  const activeTasks = todolist.filter((t) => !t.isCompleted).length;

  const deleteCompletedTodo = async () => {
    const completedTodo = todolist.filter((t) => t.isCompleted);
    setIsLoading(true);
    try {
      await Promise.all(completedTodo.map((t) => todosAPI.deleteTodo(t.id)));
      setTodolist(todolist.filter((t) => !t.isCompleted));
    } catch (error) {
      console.error(error);
      showAlertError(error, "Failed delete all completed tasks");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appContainer">
      <div className="content">
        <Header title="My To-Do List" />
        <AddItemForm addTodolist={addTodolist} />
        {isLoading ? (
          <Loading />
        ) : (
          <Todolists
            data={filteredToDo}
            changeStatus={changeStatus}
            deleteTodolist={deleteTodolist}
            updateTitle={updateTitle}
          />
        )}
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
