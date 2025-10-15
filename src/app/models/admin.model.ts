export interface AdminTask {
  id?: number;
  taskType: string;
  department: string;
  assignedTo: string;
  priority: string;
  status: string;
  dueDate: string;
  notes?: string;
}
