import { Employee } from "../types/employee";

export const getAllEmployees = (employeeList: Employee[]): Employee[] =>
  employeeList.flatMap((employee) => {
    const result = [employee];
    if (employee.subordinates) {
      result.push(...getAllEmployees(employee.subordinates));
    }
    return result;
  });

export const getSelectedEmployees = (
  allEmployees: Employee[],
  selectedIds: string[]
): Employee[] => allEmployees.filter((emp) => selectedIds.includes(emp.id));
