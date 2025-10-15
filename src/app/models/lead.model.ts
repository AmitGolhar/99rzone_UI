export interface LeadTask {
  id?: number;
  taskType: string;
  leadName: string;
  contactNumber: string;
  propertyName: string;
  assignedTo: string;
  status: string;
  dueDate: string;
  notes?: string;
}
