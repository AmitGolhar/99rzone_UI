import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MarketingTask } from '@app/models/marketing.model';
 

@Injectable({
  providedIn: 'root'
})
export class MarketingService {
  private marketingTasks: MarketingTask[] = [
  {
    id: 1,
    taskType: 'Campaign Follow-Up',
    campaignName: 'Diwali Offer Campaign',
    platform: 'Facebook Ads',
    assignedTo: 'Vijay',
    status: 'In Progress',
    dueDate: '2025-10-14',
    notes: 'Monitor engagement and leads for 3 days'
  },
  {
    id: 2,
    taskType: 'Campaign Performance Review',
    campaignName: 'Festive Home Loan Week',
    platform: 'Google Ads',
    assignedTo: 'Mauli',
    status: 'Pending',
    dueDate: '2025-10-15',
    notes: 'Analyze conversion data and CPC trends'
  },
  {
    id: 3,
    taskType: 'Social Media Post Boost',
    campaignName: 'Luxury Property Showcase',
    platform: 'Instagram',
    assignedTo: 'Sachin',
    status: 'Completed',
    dueDate: '2025-10-10',
    notes: 'Boosted top 3 carousel posts with ₹2,000 budget'
  },
  {
    id: 4,
    taskType: 'Lead Nurture Sequence Setup',
    campaignName: 'Pre-Diwali Lead Funnel',
    platform: 'Mailchimp',
    assignedTo: 'Vijay',
    status: 'In Progress',
    dueDate: '2025-10-13',
    notes: 'Schedule 3-step email sequence for new leads'
  },
  {
    id: 5,
    taskType: 'Influencer Collaboration',
    campaignName: 'Real Estate Expert Q&A',
    platform: 'Instagram Live',
    assignedTo: 'Mauli',
    status: 'Pending',
    dueDate: '2025-10-16',
    notes: 'Confirm date and script for influencer session'
  },
  {
    id: 6,
    taskType: 'Ad Creative Review',
    campaignName: 'Home Buyers Weekend',
    platform: 'YouTube Ads',
    assignedTo: 'Sachin',
    status: 'In Progress',
    dueDate: '2025-10-12',
    notes: 'Review thumbnails and captions before launch'
  },
  {
    id: 7,
    taskType: 'Campaign Follow-Up',
    campaignName: 'Refer & Earn Program',
    platform: 'Facebook Ads',
    assignedTo: 'Vijay',
    status: 'Completed',
    dueDate: '2025-10-09',
    notes: 'Tracked referral leads and sent report to manager'
  },
  {
    id: 8,
    taskType: 'Ad Budget Optimization',
    campaignName: 'Navratri Property Sale',
    platform: 'Google Ads',
    assignedTo: 'Mauli',
    status: 'Pending',
    dueDate: '2025-10-15',
    notes: 'Reduce CPC and shift 20% budget to best keywords'
  },
  {
    id: 9,
    taskType: 'Campaign Performance Tracking',
    campaignName: 'First-Time Home Buyers Drive',
    platform: 'LinkedIn Sponsored Posts',
    assignedTo: 'Sachin',
    status: 'In Progress',
    dueDate: '2025-10-13',
    notes: 'Monitor CTR and impressions daily for 5 days'
  },
  {
    id: 10,
    taskType: 'Email Campaign Reporting',
    campaignName: 'October Newsletter',
    platform: 'Mailchimp',
    assignedTo: 'Vijay',
    status: 'Completed',
    dueDate: '2025-10-10',
    notes: 'Shared open rate and link click summary with marketing head'
  }
]


  getAll(): Observable<MarketingTask[]> {
    return of(this.marketingTasks);
  }

  add(task: MarketingTask): Observable<MarketingTask> {
    task.id = this.marketingTasks.length + 1;
    this.marketingTasks.push(task);
    return of(task);
  }

  update(task: MarketingTask): Observable<MarketingTask> {
    const idx = this.marketingTasks.findIndex(t => t.id === task.id);
    if (idx !== -1) this.marketingTasks[idx] = task;
    return of(task);
  }

  delete(id: number): Observable<boolean> {
    this.marketingTasks = this.marketingTasks.filter(t => t.id !== id);
    return of(true);
  }
}
