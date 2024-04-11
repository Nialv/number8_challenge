import { Department } from "./departments";

export interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: EmployeeResponse | null;
  departments: Department[];
  updateEmployee: (updatedEmployee: EmployeeResponse) => Promise<void>;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
