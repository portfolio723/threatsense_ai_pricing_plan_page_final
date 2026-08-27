export type PlanId =
  | 'tads-registration'
  | 'endpoint-security'
  | 'endpoint-browser'
  | 'complete-data-protection';

export interface DeviceTier {
  devices: number;
  price: number; // annual price in INR
}

export interface PlanFeature {
  label: string;
  description?: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  description: string;
  recommended?: boolean;
  trialAvailable: boolean;
  purchaseAvailable: boolean;
  salesOnly: boolean;
  deviceTiers: DeviceTier[];
  features: PlanFeature[];
  highlightCount: number;
  accent: 'neutral' | 'orange' | 'purple';
}

export const DEVICE_OPTIONS = [5, 10, 25, 50, 100, 250] as const;
export const SALES_THRESHOLD = 250;

export const PLANS: Plan[] = [
  {
    id: 'tads-registration',
    name: 'TADS Registration',
    tagline: 'Start with essential protection',
    description:
      'For organizations beginning their ThreatSenseAI security journey.',
    trialAvailable: true,
    purchaseAvailable: true,
    salesOnly: false,
    accent: 'neutral',
    deviceTiers: [
      { devices: 5, price: 18000 },
      { devices: 10, price: 32000 },
      { devices: 25, price: 72000 },
      { devices: 50, price: 135000 },
      { devices: 100, price: 250000 },
    ],
    highlightCount: 5,
    features: [
      { label: 'TADS account registration', description: 'Provision your ThreatSenseAI account and initial tenant.' },
      { label: 'Security policy setup', description: 'Configure baseline policies for your organization.' },
      { label: 'Basic protection controls', description: 'Enable foundational device-level controls.' },
      { label: 'ThreatSenseAI management access', description: 'Access the admin management console.' },
      { label: 'Product onboarding', description: 'Guided onboarding for your first deployment.' },
    ],
  },
  {
    id: 'endpoint-security',
    name: 'Endpoint Security',
    tagline: 'Protect every endpoint',
    description:
      'Essential endpoint controls to prevent unauthorized access, copying, and data leakage.',
    trialAvailable: true,
    purchaseAvailable: true,
    salesOnly: false,
    accent: 'neutral',
    deviceTiers: [
      { devices: 5, price: 36000 },
      { devices: 10, price: 64000 },
      { devices: 25, price: 144000 },
      { devices: 50, price: 270000 },
      { devices: 100, price: 500000 },
    ],
    highlightCount: 6,
    features: [
      { label: 'Everything in TADS Registration' },
      { label: 'Screenshot protection', description: 'Block unauthorized screen captures across managed apps.' },
      { label: 'USB control', description: 'Restrict and audit removable storage devices.' },
      { label: 'Print & export control', description: 'Prevent unauthorized printing and data export.' },
      { label: 'Watermarking', description: 'Apply user-identifiable watermarks to screen and documents.' },
      { label: 'Anti-tampering protection', description: 'Detect and block attempts to disable the agent.' },
      { label: 'Endpoint policy enforcement', description: 'Centrally enforce policies across all endpoints.' },
    ],
  },
  {
    id: 'endpoint-browser',
    name: 'Endpoint + Browser Security',
    tagline: 'Protect endpoints and modern web workflows',
    description:
      'Extend protection from employee devices into browser-based applications, AI tools, email, and cloud services.',
    recommended: true,
    trialAvailable: true,
    purchaseAvailable: true,
    salesOnly: false,
    accent: 'purple',
    deviceTiers: [
      { devices: 5, price: 54000 },
      { devices: 10, price: 96000 },
      { devices: 25, price: 216000 },
      { devices: 50, price: 405000 },
      { devices: 100, price: 750000 },
    ],
    highlightCount: 6,
    features: [
      { label: 'Everything in Endpoint Security' },
      { label: 'Browser data protection', description: 'Safeguard sensitive data within managed browser sessions.' },
      { label: 'AI tool controls', description: 'Govern which AI assistants and tools may access company data.' },
      { label: 'Clipboard protection', description: 'Restrict copy/paste between protected and unprotected apps.' },
      { label: 'File upload controls', description: 'Block unauthorized uploads to external web services.' },
      { label: 'Personal email protection', description: 'Prevent data exfiltration through personal webmail.' },
      { label: 'Cloud application controls', description: 'Apply policies to sanctioned and unsanctioned cloud apps.' },
    ],
  },
  {
    id: 'complete-data-protection',
    name: 'Complete Data Protection',
    tagline: 'Endpoint + Browser + SAP Data Leak Prevention',
    description:
      'For organizations that need comprehensive protection across endpoints, browsers, and SAP environments.',
    trialAvailable: false,
    purchaseAvailable: false,
    salesOnly: true,
    accent: 'purple',
    deviceTiers: [],
    highlightCount: 6,
    features: [
      { label: 'Everything in Endpoint + Browser' },
      { label: 'SAP data leak prevention', description: 'Detect and block leakage of sensitive SAP data.' },
      { label: 'SAP-aware policies', description: 'Apply policies that understand SAP transaction context.' },
      { label: 'Sensitive data controls', description: 'Classify and protect sensitive SAP data at rest and in transit.' },
      { label: 'SAP export restrictions', description: 'Restrict exports from SAP to unauthorized channels.' },
      { label: 'Role-based data protection', description: 'Enforce protection based on SAP user roles.' },
      { label: 'Advanced data protection controls', description: 'Granular controls for complex SAP landscapes.' },
    ],
  },
];

export interface ComparisonRow {
  category: string;
  label: string;
  description?: string;
  values: [boolean, boolean, boolean, boolean];
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    category: 'Foundation',
    label: 'TADS Registration',
    description: 'Provision your ThreatSenseAI account and tenant.',
    values: [true, true, true, true],
  },
  {
    category: 'Endpoint',
    label: 'Endpoint Protection',
    description: 'Core device-level threat prevention.',
    values: [false, true, true, true],
  },
  {
    category: 'Endpoint',
    label: 'Screenshot Protection',
    description: 'Block unauthorized screen captures.',
    values: [false, true, true, true],
  },
  {
    category: 'Endpoint',
    label: 'USB Control',
    description: 'Restrict and audit removable storage.',
    values: [false, true, true, true],
  },
  {
    category: 'Endpoint',
    label: 'Print & Export Control',
    description: 'Prevent unauthorized printing and export.',
    values: [false, true, true, true],
  },
  {
    category: 'Endpoint',
    label: 'Watermarking',
    description: 'User-identifiable watermarks on screen and documents.',
    values: [false, true, true, true],
  },
  {
    category: 'Endpoint',
    label: 'Anti-Tampering',
    description: 'Detect and block agent disable attempts.',
    values: [false, true, true, true],
  },
  {
    category: 'Browser',
    label: 'Browser Protection',
    description: 'Safeguard data in managed browser sessions.',
    values: [false, false, true, true],
  },
  {
    category: 'Browser',
    label: 'AI Tool Protection',
    description: 'Govern AI assistants accessing company data.',
    values: [false, false, true, true],
  },
  {
    category: 'Browser',
    label: 'Clipboard Protection',
    description: 'Restrict copy/paste across trust boundaries.',
    values: [false, false, true, true],
  },
  {
    category: 'Browser',
    label: 'File Upload Protection',
    description: 'Block unauthorized uploads to web services.',
    values: [false, false, true, true],
  },
  {
    category: 'SAP',
    label: 'SAP Data Protection',
    description: 'Detect and block leakage of sensitive SAP data.',
    values: [false, false, false, true],
  },
  {
    category: 'SAP',
    label: 'SAP DLP Controls',
    description: 'Data loss prevention controls for SAP environments.',
    values: [false, false, false, true],
  },
  {
    category: 'SAP',
    label: 'Advanced SAP Policies',
    description: 'Role-based and context-aware SAP policies.',
    values: [false, false, false, true],
  },
];

export const FAQS = [
  {
    q: 'Is there a monthly plan?',
    a: 'No. ThreatSenseAI pricing is offered on annual plans only.',
  },
  {
    q: 'Can I try a plan before purchasing?',
    a: 'Yes. Eligible plans include a free-trial option so you can evaluate protection before committing.',
  },
  {
    q: 'How is pricing calculated?',
    a: 'Pricing is based on the selected protection tier and the number of devices you need to protect.',
  },
  {
    q: 'Can I increase the number of devices later?',
    a: 'Yes. Device capacity can be increased as your organization grows, subject to the applicable pricing tier.',
  },
  {
    q: 'What happens when I need more than the available self-service device limit?',
    a: 'Contact our sales team for a tailored deployment and pricing designed for your scale.',
  },
  {
    q: 'Does the fourth plan support SAP-specific data protection?',
    a: 'Yes. The Complete Data Protection tier adds SAP data leak prevention controls and role-based policies.',
  },
  {
    q: 'Are taxes included?',
    a: 'Taxes are calculated dynamically based on your billing country and state during checkout.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'Supported payment methods are determined by the active payment gateway and shown at checkout.',
  },
];

export const COMPANY_SIZES = [
  '1-10',
  '11-50',
  '51-250',
  '251-500',
  '501-1,000',
  '1,000+',
];

export const SAP_ENVIRONMENTS = [
  'SAP ECC',
  'SAP S/4HANA',
  'RISE with SAP',
  'Hybrid',
  'Other',
];

export const INDUSTRIES = [
  'Technology',
  'Finance & Banking',
  'Manufacturing',
  'Healthcare',
  'Retail',
  'Government',
  'Education',
  'Other',
];

export function getPlan(id: PlanId): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function getPriceForDevices(plan: Plan, devices: number): number | null {
  if (plan.salesOnly) return null;
  const exact = plan.deviceTiers.find((t) => t.devices === devices);
  if (exact) return exact.price;
  const sorted = [...plan.deviceTiers].sort((a, b) => a.devices - b.devices);
  const last = sorted[sorted.length - 1];
  if (devices > last.devices) return null;
  const lower = sorted.filter((t) => t.devices <= devices).pop();
  const upper = sorted.find((t) => t.devices >= devices);
  if (lower && upper && lower !== upper) {
    const ratio = (devices - lower.devices) / (upper.devices - lower.devices);
    return Math.round(lower.price + ratio * (upper.price - lower.price));
  }
  return lower ? lower.price : null;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
