export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  startDate: Date;
  email: string | null;
  subordinates: Employee[] | null;
}
