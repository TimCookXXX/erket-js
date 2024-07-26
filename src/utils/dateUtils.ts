/**
 * Форматирует дату в российский формат (DD.MM.YYYY)
 * @param date - Дата для форматирования
 * @returns Отформатированная строка даты
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Вычисляет стаж работы в годах на основе даты начала работы
 * @param startDate - Дата начала работы
 * @returns Строка с количеством лет стажа (с одним знаком после запятой)
 */
export const calculateExperience = (startDate: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears.toFixed(1);
};

/**
 * Проверяет, является ли дата корректной
 * @param date - Дата для проверки
 * @returns true, если дата корректна, иначе false
 */
export const isValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime());
};

/**
 * Возвращает текущую дату
 * @returns Текущая дата
 */
export const getCurrentDate = (): Date => {
  return new Date();
};
