import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import s from "./AddItemForm.module.css";

interface Props {
  addTodolist: (data: { title: string; description: string }) => void;
}

export const AddItemForm = ({ addTodolist }: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
    if (error !== null) {
      setError(null);
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addItemHandler();
  };

  const addItemHandler = () => {
    const trimmedTitle = newTaskTitle.trim();
    if (trimmedTitle !== "") {
      addTodolist({ title: trimmedTitle, description: "" });
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  return (
    <div className={s.formContainer}>
      <div className={s.content}>
        <input
          className={s.formInput}
          type="text"
          placeholder="Enter title"
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />

        <button className={s.btn} onClick={addItemHandler}>
          Add
        </button>
      </div>
      {error && <p className={s.error}>{`Error: ${error}`}</p>}
    </div>
  );
};
