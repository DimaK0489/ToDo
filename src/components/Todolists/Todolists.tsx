import type { TodoType } from "../../types/types";
import { EditField } from "../EditField/EditField";
import s from "./Todolists.module.css";

interface Props {
  data: TodoType[];
  changeStatus: (id: number) => void;
  deleteTodolist: (id: number) => void;
  updateTitle: (id: number, newTitle: string) => void;
  onTodoClick: (todo: TodoType) => void;
}

export const Todolists = ({
  data,
  changeStatus,
  deleteTodolist,
  updateTitle,
  onTodoClick,
}: Props) => {
  return (
    <section className={s.section}>
      <div className={s.card}>
        <h3 className={s.title}>My ToDo</h3>

        <ul className={s.list}>
          {data.map((el) => (
            <li key={el.id} className={s.item}>
              <input
                type="checkbox"
                checked={el.completed}
                onChange={() => changeStatus(el.id)}
                className={s.checkbox}
              />
              <span className={el.completed ? s.doneText : s.text}>
                <EditField
                  title={el.title}
                  changeItem={(newTitle) => updateTitle(el.id, newTitle)}
                />
              </span>

              <button className={s.infoBtn} onClick={() => onTodoClick(el)}>
                ℹ️
              </button>
              <button
                className={s.deleteBtn}
                onClick={() => deleteTodolist(el.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
