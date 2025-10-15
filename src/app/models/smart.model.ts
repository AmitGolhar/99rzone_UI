export interface SmartTask {
  id?: number;
  taskType: string;
  triggerSource: string;
  automationType: string;
  assignedTo: string;
  status: string;
  dueDate: string;
  notes?: string;
}
