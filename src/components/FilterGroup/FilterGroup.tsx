import type { FilterType } from "../../types/types";
import s from "./FilterGroup.module.css";

interface Props {
  currentFilter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
}

export const FilterGroup = ({ currentFilter, onChangeFilter }: Props) => {
  return (
    <div className={s.groupContainer}>
      <div className={s.groupBtns}>
        <button
          className={`${s.btn} ${currentFilter === "all" ? s.btnActive : ""}`}
          onClick={() => onChangeFilter("all")}
        >
          All
        </button>
        <button
          className={`${s.btn} ${currentFilter === "completed" ? s.btnActive : ""}`}
          onClick={() => onChangeFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`${s.btn} ${currentFilter === "active" ? s.btnActive : ""}`}
          onClick={() => onChangeFilter("active")}
        >
          Active
        </button>
      </div>
    </div>
  );
};
