export interface MarketingTask {
  id?: number;
  taskType: string;
  campaignName: string;
  platform: string; // e.g., Facebook, Google Ads, Instagram
  assignedTo: string;
  status: string;
  dueDate: string;
  notes?: string;
}
