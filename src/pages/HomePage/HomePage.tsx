import { useEffect, useState } from "react";
import { todosAPI } from "../../api/instance";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { AdditionalOptions } from "../../components/AdditionalOptions/AdditionalOptions";
import { FilterGroup } from "../../components/FilterGroup/FilterGroup";
import { Header } from "../../components/Header/Header";
import { Loading } from "../../components/Loading/Loading";
import { Todolists } from "../../components/Todolists/Todolists";
import { showAlertError } from "../../common/helpers";
import type { FilterType, TodoType } from "../../types/types";
import s from "./HomePage.module.css";
import { ROUTES } from "../../common/routes";
import { useNavigate } from "react-router-dom";

interface Props {
  onLogOut: () => void;
}

export const HomePage = ({ onLogOut }: Props) => {
  const navigate = useNavigate();
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
          t.id === id ? { ...t, isCompleted: isCompleted } : t,
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

  const handleLogOut = () => {
    onLogOut();
    navigate(ROUTES.login);
  };

  return (
    <div className={s.homeContainer}>
      <div className={s.homeContent}>
        <Header
          title="My To-Do List"
          btnName="LogOut"
          onBtnClick={handleLogOut}
        />
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
};
