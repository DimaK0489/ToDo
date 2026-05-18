import type { TodoType } from "../../todoData";
import { EditField } from "../EditField/EditField";
import s from "./Todolists.module.css";

interface Props {
  data: TodoType[];
  changeStatus: (id: number, isDone: boolean) => void;
  deleteTodolist: (id: number) => void;
  updateTitle: (id: number, newTitle: string) => void;
}

export const Todolists = ({
  data,
  changeStatus,
  deleteTodolist,
  updateTitle,
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
                checked={el.isDone}
                onChange={(e) => changeStatus(el.id, e.currentTarget.checked)}
                className={s.checkbox}
              />
              <span className={el.isDone ? s.doneText : s.text}>
                <EditField
                  title={el.title}
                  changeItem={(newTitle) => updateTitle(el.id, newTitle)}
                />
              </span>
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
