export type ModuleType =
  | 'RENT'
  | 'RESELL'
  | 'PAYMENT'
  | 'LEGAL'
  | 'MARKETING'
  | 'CLIENT_INTERACTION'
  | 'ADMIN'
  | 'AFTER_SALES'
  | 'OTHER'
  | 'GENERAL'; 

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'Pending' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';

export interface TodoTask {
  id?: number;
  title: string;
  description?: string;
  moduleType: ModuleType;
  priority: Priority;
  status: Status;
  category?: string;
  assignedTo?: string;
  createdBy?: string;
  dueDate?: string;
  reminderDate?: string;
  notes?: string;
  attachments?: { name: string; dataUrl?: string }[];
  createdAt?: string;
  updatedAt?: string;
}
