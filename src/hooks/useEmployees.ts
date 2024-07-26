import { useState, useEffect, useCallback } from "react";
import { Employee } from "../types/employee";
import { employees } from "../data/employees";
import { getAllEmployees, getSelectedEmployees } from "../utils/employeeUtils";

export const useEmployees = () => {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [tempSelectedIds, setTempSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setAllEmployees(getAllEmployees(employees));
    const storedIds = localStorage.getItem("selectedEmployees");
    if (storedIds) {
      const parsedIds = JSON.parse(storedIds);
      setSelectedIds(parsedIds);
      setTempSelectedIds(parsedIds);
      setSelectedEmployees(
        getSelectedEmployees(getAllEmployees(employees), parsedIds)
      );
    }
  }, []);

  const toggleEmployee = useCallback((id: string) => {
    setTempSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  }, []);

  const saveSelectedEmployees = useCallback(() => {
    setSelectedIds(tempSelectedIds);
    localStorage.setItem("selectedEmployees", JSON.stringify(tempSelectedIds));
    setSelectedEmployees(getSelectedEmployees(allEmployees, tempSelectedIds));
  }, [allEmployees, tempSelectedIds]);

  const clearSelectedEmployees = useCallback(() => {
    setSelectedIds([]);
    setTempSelectedIds([]);
    setSelectedEmployees([]);
    localStorage.removeItem("selectedEmployees");
  }, []);

  const hasChanges = useCallback(() => {
    return (
      JSON.stringify(selectedIds.sort()) !==
      JSON.stringify(tempSelectedIds.sort())
    );
  }, [selectedIds, tempSelectedIds]);

  const resetTempSelection = useCallback(() => {
    setTempSelectedIds(selectedIds);
  }, [selectedIds]);

  return {
    allEmployees,
    selectedEmployees,
    selectedIds: tempSelectedIds,
    toggleEmployee,
    saveSelectedEmployees,
    clearSelectedEmployees,
    hasChanges,
    resetTempSelection,
  };
};
