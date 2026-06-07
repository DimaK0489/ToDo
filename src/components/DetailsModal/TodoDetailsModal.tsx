import type { TodoType } from "../../types/types";
import s from "./TodoDetailsModal.module.css";

interface ModalProps {
  todo: TodoType;
  onClose: () => void;
}

export const TodoDetailsModal = ({ todo, onClose }: ModalProps) => {
  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <h2>Details Task</h2>
          <button className={s.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <p>
            <strong>Name:</strong> {todo.title}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {todo.description || "Description missing"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {todo.completed ? "✅ Done" : "⏳ In progress"}
          </p>
        </div>
      </div>
    </div>
  );
};
