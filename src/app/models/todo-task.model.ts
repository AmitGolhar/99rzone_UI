// todo-task.model.ts

export type ModuleType =
  | 'RENT'
  | 'RESELL'
  | 'PAYMENT'
  | 'LEGAL'
  | 'MARKETING'
  | 'CLIENT_INTERACTION'
  | 'ADMIN'
  | 'AFTER_SALES'
  | 'SMART'
  | 'OTHER'
  'GENERAL';

export type Status =
  | 'Pending'
  | 'In Progress'
  | 'On Hold'
  | 'Completed'
  | 'Cancelled';

export interface TodoTask {
  id?: number;
  title: string;
  description?: string;
  moduleType: ModuleType;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: Status;

  category?: string;

  assignedTo?: string;     // employee ID
  assignedToName?: string; // UI-only
  assignedEmail?: string | null; // ⭐ ADD THIS
 
  createdBy?: string;

  dueDate?: string;
  reminderDate?: string;

  notes?: string;
  attachments?: any[];

  createdAt?: string;
  updatedAt?: string;

  // Backend-only fields (UI must NOT send them)
  lastStatus?: string;
  statusChanged?: boolean;
}
