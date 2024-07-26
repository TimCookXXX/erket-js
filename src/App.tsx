import { useState } from "react";
import { ButtonGroup } from "./components/ButtonGroup/ButtonGroup";
import { EmployeeList } from "./components/EmployeeList/EmployeeList";
import { Modal } from "./components/Modal/Modal";
import { useEmployees } from "./hooks/useEmployees";
import styles from "./App.module.css";

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    allEmployees,
    selectedEmployees,
    selectedIds,
    toggleEmployee,
    saveSelectedEmployees,
    clearSelectedEmployees,
    hasChanges,
    resetTempSelection,
  } = useEmployees();

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Список сотрудников</title>
            <style>
              body { font-family: Arial, sans-serif; }
              ol { padding-left: 20px; }
              li { margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <h1>Выбранные сотрудники</h1>
            <ol>
              ${selectedEmployees
                .map(
                  (employee) =>
                    `<li>${employee.lastName} ${employee.firstName} - ${employee.position}</li>`
                )
                .join("")}
            </ol>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleSave = () => {
    const content = `
      <html>
        <head>
          <title>Список сотрудников</title>
          <style>
            body { font-family: Arial, sans-serif; }
            ol { padding-left: 20px; }
            li { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Выбранные сотрудники</h1>
          <ol>
            ${selectedEmployees
              .map(
                (emp) =>
                  `<li>${emp.lastName} ${emp.firstName} - ${emp.position}</li>`
              )
              .join("")}
          </ol>
        </body>
      </html>
    `;
    const blob = new Blob([content], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "employees.htm";
    a.click();
  };

  const handleModalSubmit = () => {
    saveSelectedEmployees();
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <ButtonGroup
        onOpenModal={() => setIsModalOpen(true)}
        onPrint={handlePrint}
        onClear={clearSelectedEmployees}
        onSave={handleSave}
        isDisabled={selectedEmployees.length === 0}
      />
      <EmployeeList employees={selectedEmployees} />
      {isModalOpen && (
        <Modal
          employees={allEmployees}
          selectedIds={selectedIds}
          onToggle={toggleEmployee}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          hasChanges={hasChanges}
          resetTempSelection={resetTempSelection}
        />
      )}
    </div>
  );
};
