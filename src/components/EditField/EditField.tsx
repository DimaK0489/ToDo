import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import s from "./EditField.module.css";

interface Props {
  title: string;
  changeItem: (newTitle: string) => void;
}

export const EditField = ({ title, changeItem }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const offEditMode = () => {
    setEditMode(false);
    if (newTitle.trim() !== "") {
      changeItem(newTitle.trim());
    } else {
      setNewTitle(title);
      alert("Empty title is not saved. Saved previous title.");
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      offEditMode();
    }
  };

  return editMode ? (
    <div className={s.editContainer}>
      <input
        className={s.editField}
        type="text"
        value={newTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onBlur={offEditMode}
        autoFocus
      />
      <button
        className={s.btnSave}
        onClick={offEditMode}
        disabled={newTitle.trim() === ""}
      >
        Save
      </button>
    </div>
  ) : (
    <>
      <span onDoubleClick={() => setEditMode(true)}>{title}</span>
      <button className={s.editBtn} onClick={() => setEditMode(true)}>
        Edit
      </button>
    </>
  );
};
