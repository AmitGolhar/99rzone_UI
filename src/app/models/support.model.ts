export interface SupportTask {
  id?: number;
  taskType: string;
  clientName: string;
  propertyName: string;
  assignedTo: string;
  status: string;
  dueDate: string;
  notes?: string;
}
