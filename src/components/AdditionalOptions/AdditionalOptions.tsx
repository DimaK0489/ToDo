import s from "./AdditionalOptions.module.css";

interface Props {
  countTasks: number;
  deleteCompletedTodo: () => void;
}

export const AdditionalOptions = ({
  countTasks,
  deleteCompletedTodo,
}: Props) => {
  return (
    <div className={s.optionsContainer}>
      <div className={s.optionsContent}>
        <p className={s.optionsText}>
          Uncompleted tasks: <span className={s.count}>{countTasks}</span>
        </p>
        <button className={s.delBtn} onClick={deleteCompletedTodo}>
          Delete Completed Tasks
        </button>
      </div>
    </div>
  );
};
