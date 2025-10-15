export interface ClientTask {
  id?: number;
  taskType: string;
  clientName: string;
  contactNumber: string;
  propertyName: string;
  assignedTo: string;
  status: string;
  dueDate: string;
  notes?: string;
}
