export interface PropertyTask {
  id?: number;
  taskType: string;
  propertyName: string;
  propertyCode?: string;
  location: string;
  assignedTo: string;
  status: string;
  dueDate: string;
  notes?: string;
}
