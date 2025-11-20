import { Component, EventEmitter } from '@angular/core';

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  usersIncluded?: number | null;
  features: string[];
  ctaText?: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.css'],
})
export class PricingPlansComponent {
  currency = '₹';
  billingCycle: 'monthly' | 'yearly' = 'monthly';

  selectPlan = new EventEmitter<string>();

  /** ✅ Add your data here */
  plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      priceMonthly: 999,
      usersIncluded: 5,
      features: [
        'Dashboard Overview',
        'Add Employee (Basic)',
        'List of Employee',
        'Lead Management',
        'Housing Leads',
        '99 Acres Leads',
        'Property Listing (Basic)',
        'Client Interaction (Notes Only)',
        'Task Management',
        'Followups',
        'Aging',
        'Basic Reports',
        'Attendance Tracking (Basic)',
        'Payments – Add Only',
        'Expenses – Basic',
        'Mobile Access',
      ],
      ctaText: 'Start Free',
    },
    {
      id: 'growth',
      name: 'Growth',
      priceMonthly: 2499,
      usersIncluded: 25,
      highlight: true,
      features: [
        'Everything in Starter',
        'Advanced Lead Management',
        'Multiple Source Leads (Housing, 99 Acres, MagicBricks)',
        'Property Listing – Advanced',
        'Client Interaction Timeline',
        'Marketing & Outreach Tools',
        'Legal & Documentation Workflow',
        'Client Support & After Sales',
        'Admin & Internal Controls',
        'Smart / Custom Tasks Automation',
        'Attendance with Geo-Tracking',
        'Incentives Module',
        'Payments + Revenue Dashboard',
        'Advanced Expenses Tracking',
        'Revenue Insights & Graphs',
        'Role-Based Access Control',
        'Team Collaboration Tools',
        'Priority Email Support',
      ],
      ctaText: 'Try Growth',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      priceMonthly: 9999,
      usersIncluded: null,
      features: [
        'Everything in Growth',
        'Full Workflow Automation',
        'Custom Dashboard & Reports',
        'White-Label Branding',
        'Unlimited Lead Sources Integration',
        'Smart AI Lead Scoring',
        'Custom Roles & Permissions',
        'Dedicated Account Manager',
        '24/7 Priority Support',
        'Advanced Legal Document Builder',
        'Bulk Employee Upload',
        'Bulk Property Upload',
        'Unlimited Automations',
        'Company-Wide Attendance & Incentives',
        'Unlimited Payments & Revenue Tracking',
        'Advanced Marketing Campaigns',
        'Data Export / Import (Full)',
        'SSO + Enterprise Login',
        'Custom Integrations (API)',
      ],
      ctaText: 'Contact Sales',
    },
  ];

  getPrice(plan: PricingPlan) {
    return this.billingCycle === 'monthly'
      ? plan.priceMonthly
      : Math.round(plan.priceMonthly * 10);
  }

  onSelect(plan: PricingPlan) {
    console.log('Selected: ', plan.id);
  }

  onBillingToggle(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.billingCycle = checked ? 'yearly' : 'monthly';
  }
}
