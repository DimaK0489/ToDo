import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showAlertError } from "../../common/helpers";
import { ROUTES } from "../../common/routes";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { AdditionalOptions } from "../../components/AdditionalOptions/AdditionalOptions";
import { TodoDetailsModal } from "../../components/DetailsModal/TodoDetailsModal";
import { FilterGroup } from "../../components/FilterGroup/FilterGroup";
import { Header } from "../../components/Header/Header";
import { Loading } from "../../components/Loading/Loading";
import { Todolists } from "../../components/Todolists/Todolists";
import type { FilterType, TodoType } from "../../types/types";
import s from "./HomePage.module.css";
import {
  useChangeTodoStatusMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoTitleMutation,
} from "../../services/todoApi";

interface Props {
  onLogOut: () => void;
}

export const HomePage = ({ onLogOut }: Props) => {
  const navigate = useNavigate();
  const { data: todos = [], isLoading, isError } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [changeTodoStatus] = useChangeTodoStatusMutation();
  const [updateTodoTitle] = useUpdateTodoTitleMutation();

  const [filter, setFilter] = useState<FilterType>("all");
  const [selectTodo, setSelectTodo] = useState<TodoType | null>(null);

  const filteredToDo = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });

  const activeTasks = todos.filter((t) => !t.completed).length;

  const deleteCompletedTodo = async () => {
    const countCompletedTodo = todos.filter((t) => t.completed);
    if (countCompletedTodo.length === 0) {
      alert("There are no completed tasks to delete.");
      return;
    }
    try {
      await Promise.all(countCompletedTodo.map((t) => deleteTodo(t.id)));
    } catch (error) {
      showAlertError(error, "Error deleting completed tasks");
    }
  };

  const handleLogOut = () => {
    onLogOut();
    navigate(ROUTES.login);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    showAlertError(isError, "Error loading Todolists");
  }

  return (
    <div className={s.homeContainer}>
      <div className={s.homeContent}>
        <Header
          title="My To-Do List"
          btnName="LogOut"
          onBtnClick={handleLogOut}
        />
        <AddItemForm addTodolist={(data) => createTodo(data).unwrap()} />
        {isLoading ? (
          <Loading />
        ) : (
          <Todolists
            data={filteredToDo}
            changeStatus={(id: number) => {
              const currentTodo = todos.find((t) => t.id === id);
              if (!currentTodo) return;

              changeTodoStatus({ id, completed: !currentTodo.completed });
            }}
            deleteTodolist={(id) => deleteTodo(id).unwrap()}
            updateTitle={(id, newTitle) =>
              updateTodoTitle({ id, newTitle }).unwrap()
            }
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
