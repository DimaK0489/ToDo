import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import s from "./AddItemForm.module.css";

interface Props {
  addTodolist: (data: { title: string; description: string }) => void;
}

export const AddItemForm = ({ addTodolist }: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        if (newTaskTitle.trim() === "" && description.trim() === "") {
          setIsExpanded(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [newTaskTitle, description]);

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
    const trimmedDesc = description.trim();
    if (trimmedTitle !== "") {
      addTodolist({ title: trimmedTitle, description: trimmedDesc });
      setNewTaskTitle("");
      setDescription("");
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
          onFocus={() => setIsExpanded(true)}
        />

        <button className={s.btn} onClick={addItemHandler}>
          Add
        </button>
      </div>
      {error && <p className={s.error}>{`Error: ${error}`}</p>}
      <div
        ref={formRef}
        className={`${s.descriptionWrapper} ${isExpanded ? s.expanded : ""}`}
      >
        <textarea
          placeholder="Enter description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
};
