import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../common/routes";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { AdditionalOptions } from "../../components/AdditionalOptions/AdditionalOptions";
import { FilterGroup } from "../../components/FilterGroup/FilterGroup";
import { Header } from "../../components/Header/Header";
import { Loading } from "../../components/Loading/Loading";
import { Todolists } from "../../components/Todolists/Todolists";
import { useTodos } from "../../hooks/useTodos";
import type { FilterType } from "../../types/types";
import s from "./HomePage.module.css";
import { showAlertError } from "../../common/helpers";

interface Props {
  onLogOut: () => void;
}

export const HomePage = ({ onLogOut }: Props) => {
  const {
    todos,
    isLoading,
    isError,
    createTodo,
    deleteTodo,
    changeStatus,
    updateTitle,
    deleteCompleted,
    isCreating,
    deletingId,
  } = useTodos();

  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredToDo = todos.filter((t) => {
    if (filter === "completed") return t.isCompleted;
    if (filter === "active") return !t.isCompleted;
    return true;
  });

  const activeTasks = todos.filter((t) => !t.isCompleted).length;

  const deleteCompletedTodo = () => {
    const countCompletedTodo = todos.filter((t) => t.isCompleted);
    if (countCompletedTodo.length === 0) {
      alert("There are no completed tasks to delete.");
    } else {
      deleteCompleted(todos.filter((t) => t.isCompleted));
    }
  };

  const handleLogOut = () => {
    onLogOut();
    navigate(ROUTES.login);
  };
  if (isLoading || isCreating || deletingId) {
    return <Loading />;
  }
  if (isError) {
    showAlertError(isError, "Error");
  }
  return (
    <div className={s.homeContainer}>
      <div className={s.homeContent}>
        <Header
          title="My To-Do List"
          btnName="LogOut"
          onBtnClick={handleLogOut}
        />
        <AddItemForm addTodolist={createTodo} />
        {isLoading ? (
          <Loading />
        ) : (
          <Todolists
            data={filteredToDo}
            changeStatus={changeStatus}
            deleteTodolist={deleteTodo}
            updateTitle={(id, newTitle) => updateTitle({ id, newTitle })}
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
