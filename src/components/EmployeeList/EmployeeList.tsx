import React from "react";
import { Employee } from "../../types/employee";
import styles from "./Employee-list.module.css";

interface EmployeeListProps {
  employees: Employee[];
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <>
      <h2 className={styles.listTitle}>
        {employees.length
          ? "Выбранные сотрудники"
          : "Нет выбранных сотрудников"}
      </h2>
      {employees.length > 0 && (
        <ol className={styles.employeeList}>
          {employees.map((employee, index) => (
            <li key={employee.id} className={styles.employeeItem}>
              <span className={styles.employeeNumber}>{index + 1}.</span>
              {employee.lastName} {employee.firstName} - {employee.position}
              {employee.email && (
                <>
                  {" "}
                  (<a href={`mailto:${employee.email}`}>{employee.email}</a>)
                </>
              )}
            </li>
          ))}
        </ol>
      )}
    </>
  );
};
