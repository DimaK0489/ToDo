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
import type { FilterType, TodoType } from "../../types/types";
import s from "./HomePage.module.css";
import { showAlertError } from "../../common/helpers";
import { TodoDetailsModal } from "../../components/DetailsModal/TodoDetailsModal";

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
  const [selectTodo, setSelectTodo] = useState<TodoType | null>(null);

  const filteredToDo = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });

  const activeTasks = todos.filter((t) => !t.completed).length;

  const deleteCompletedTodo = () => {
    const countCompletedTodo = todos.filter((t) => t.completed);
    if (countCompletedTodo.length === 0) {
      alert("There are no completed tasks to delete.");
    } else {
      deleteCompleted(todos.filter((t) => t.completed));
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
            onTodoClick={(todo) => setSelectTodo(todo)}
          />
        )}
        <FilterGroup currentFilter={filter} onChangeFilter={setFilter} />
        <AdditionalOptions
          countTasks={activeTasks}
          deleteCompletedTodo={deleteCompletedTodo}
        />
        {selectTodo && (
          <TodoDetailsModal
            todo={selectTodo}
            onClose={() => setSelectTodo(null)}
          />
        )}
      </div>
    </div>
  );
};
