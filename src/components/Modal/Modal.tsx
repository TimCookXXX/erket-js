import { Employee } from "../../types/employee";
import { formatDate, calculateExperience } from "../../utils/dateUtils";
import styles from "./Modal.module.css";

interface ModalProps {
  employees: Employee[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  hasChanges: () => boolean;
  resetTempSelection: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  employees,
  selectedIds,
  onToggle,
  onClose,
  onSubmit,
  hasChanges,
  resetTempSelection,
}) => {
  const handleClose = () => {
    resetTempSelection();
    onClose();
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={handleClose}>
          &times;
        </span>
        <h2>Выберите сотрудников</h2>
        <table className={styles.employeeTable}>
          <thead>
            <tr>
              <th>ФИО сотрудника</th>
              <th>Должность</th>
              <th>Дата приема</th>
              <th>Стаж работы</th>
              <th>Выбрать</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className={
                  selectedIds.includes(employee.id) ? styles.selected : ""
                }
                onClick={() => onToggle(employee.id)}
              >
                <td>
                  {employee.lastName} {employee.firstName}
                </td>
                <td>{employee.position}</td>
                <td>{formatDate(employee.startDate)}</td>
                <td>{calculateExperience(employee.startDate)}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(employee.id)}
                    onChange={() => onToggle(employee.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className={styles.submitBtn}
          onClick={onSubmit}
          disabled={!hasChanges()}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};
