import styles from "./Button-group.module.css";

interface ButtonGroupProps {
  onOpenModal: () => void;
  onPrint: () => void;
  onClear: () => void;
  onSave: () => void;
  isDisabled: boolean;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  onOpenModal,
  onPrint,
  onClear,
  onSave,
  isDisabled,
}) => {
  return (
    <div className={styles.btnGroup}>
      <button className={styles.btn} onClick={onOpenModal}>
        Выбрать сотрудников
      </button>
      <button className={styles.btn} onClick={onPrint} disabled={isDisabled}>
        Печать списка
      </button>
      <button className={styles.btn} onClick={onClear} disabled={isDisabled}>
        Очистить список
      </button>
      <button className={styles.btn} onClick={onSave} disabled={isDisabled}>
        Сохранить файл
      </button>
    </div>
  );
};
