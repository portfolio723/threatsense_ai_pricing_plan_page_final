export type PlanId =
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
    id: 'endpoint-security',
    name: 'Endpoint Security',
    tagline: 'Protect every endpoint',
    description:
      'Essential endpoint controls to prevent unauthorized access, copying, and data leakage.',
    trialAvailable: false,
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
      { label: 'TADS account registration & onboarding', description: 'Provision your ThreatSenseAI tenant and admin account.' },
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
    trialAvailable: false,
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

export type ComparisonValue = boolean | string;

export interface ComparisonRow {
  category: string;
  label: string;
  description?: string;
  values: [ComparisonValue, ComparisonValue, ComparisonValue];
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  // Platform & Management
  {
    category: 'Platform & Management',
    label: 'Unified console',
    description: 'Single centralized dashboard for all security policies and telemetry.',
    values: [true, true, true],
  },
  {
    category: 'Platform & Management',
    label: 'Policy groups by user, device & department',
    description: 'Granular policy assignment based on AD groups, organizational units, and device profiles.',
    values: [true, true, true],
  },
  {
    category: 'Platform & Management',
    label: 'Real-time alerts & incident feed',
    description: 'Instant notification stream with actionable risk scoring on exfiltration attempts.',
    values: [true, true, true],
  },
  {
    category: 'Platform & Management',
    label: 'Audit-ready evidence & reports',
    description: 'Forensic-grade audit logs and executive compliance reporting.',
    values: [true, true, true],
  },
  {
    category: 'Platform & Management',
    label: 'On-prem, private cloud or SaaS deployment',
    description: 'Flexible deployment topology tailored to your enterprise hosting requirements.',
    values: [true, true, true],
  },

  // Endpoint Data Protection
  {
    category: 'Endpoint Data Protection',
    label: 'Screenshot & snipping tool blocking',
    description: 'Proactively block screen captures and snipping utilities across protected apps.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Application blocking & allowlisting',
    description: 'Control process executions and prevent unapproved software from running.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Camera & microphone blocking',
    description: 'Restrict unauthorized peripheral recording hardware in sensitive workspaces.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Screen & window sharing blocking',
    description: 'Prevent leakage during Zoom, Teams, Google Meet, and Webex sessions.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'USB & removable media control',
    description: 'Full read/write permissions, encryption enforcement, and activity auditing for USB drives.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Portable device control (MTP, phones, external drives)',
    description: 'Block or restrict smartphone media transfers, cameras, and external drives.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Dynamic watermark on applications',
    description: 'Overlay custom user-identifiable watermarks across sensitive application windows.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'File sharing & transfer blocking',
    description: 'Intercept and block unauthorized lateral file transfers over local and remote channels.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Copy, paste & clipboard control',
    description: 'Prevent data copy from enterprise apps into personal or unmonitored contexts.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Print & virtual printer control',
    description: 'Restrict physical printing, PDF export printers, and unauthorized print jobs.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Sensitive download monitoring',
    description: 'Track and evaluate inbound files and local downloads for proprietary content.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'URL & website restrictions',
    description: 'Enforce domain categories, block phishing domains, and restrict high-risk websites.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Remote lock & wipe',
    description: 'Remotely isolate compromised devices and wipe enterprise caches upon incident trigger.',
    values: [true, true, true],
  },
  {
    category: 'Endpoint Data Protection',
    label: 'Offline policy enforcement',
    description: 'Continuous local enforcement when devices are disconnected from the network.',
    values: [true, true, true],
  },

  // Browser Data Protection
  {
    category: 'Browser Data Protection',
    label: 'Agentless browser protection',
    description: 'Seamless in-browser session isolation and zero-install policy enforcement.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'PII detection in browser sessions',
    description: 'Real-time contextual inspection for SSNs, credit cards, credentials, and custom regex.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'Masking in files, images & ZIP archives',
    description: 'Automated obfuscation and redaction of sensitive identifiers in transit.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'GenAI prompt & upload controls',
    description: 'Filter prompts and block file uploads into ChatGPT, Claude, Copilot, and Gemini.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'Webmail controls (Gmail, Outlook Web)',
    description: 'Inspect attachments, recipient domains, and body text on webmail interfaces.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'Personal cloud upload controls',
    description: 'Prevent data exfiltration to personal Google Drive, Dropbox, Box, and OneDrive.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'Browser screenshot activity detection',
    description: 'Detect extension-based and in-page screenshot capture tools in browser tabs.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'Browser copy, paste & print control',
    description: 'Block web clipboard transfers and disable browser print dialogs on SaaS pages.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'URL Blocking',
    description: 'Proactively deny access to unauthorized or untrusted web destinations.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'URL Redirect',
    description: 'Safely steer users away from risky pages to company-approved alternatives.',
    values: [false, true, true],
  },
  {
    category: 'Browser Data Protection',
    label: 'Shadow SaaS visibility',
    description: 'Identify unsanctioned cloud services and shadow IT tools in use across the team.',
    values: [false, true, true],
  },

  // SAP Data Leak Prevention
  {
    category: 'SAP Data Leak Prevention',
    label: 'SAP transaction & table context awareness',
    description: 'Deep visibility into SAP GUI, Fiori, and web transactions with T-code awareness.',
    values: [false, false, true],
  },
  {
    category: 'SAP Data Leak Prevention',
    label: 'Sensitive table & field classification',
    description: 'Fine-grained policy classification for confidential tables, fields, and queries.',
    values: [false, false, true],
  },
  {
    category: 'SAP Data Leak Prevention',
    label: 'Screenshot & snipping block by table sensitivity',
    description: 'Dynamic screen capture blocking triggered on confidential SAP table views.',
    values: [false, false, true],
  },
  {
    category: 'SAP Data Leak Prevention',
    label: 'Print blocking on sensitive SAP data',
    description: 'Block SAP spooling and local printing for classified reports and ledgers.',
    values: [false, false, true],
  },
  {
    category: 'SAP Data Leak Prevention',
    label: 'Download & export blocking',
    description: 'Prevent export of SAP data to Excel, CSV, local text files, and clipboards.',
    values: [false, false, true],
  },
  {
    category: 'SAP Data Leak Prevention',
    label: 'Screen sharing blocked on sensitive SAP screens',
    description: 'Automatically black out SAP windows during video calls and collaborative sessions.',
    values: [false, false, true],
  },
  {
    category: 'SAP Data Leak Prevention',
    label: 'Copy & paste blocked on sensitive SAP screens',
    description: 'Disable copying sensitive SAP values into external applications or text editors.',
    values: [false, false, true],
  },
  {
    category: 'SAP Data Leak Prevention',
    label: 'Dynamic moving watermark on SAP screens',
    description: 'Real-time floating watermark displaying user identity and timestamp on SAP interfaces.',
    values: [false, false, true],
  },
  {
    category: 'SAP Data Leak Prevention',
    label: 'SAP access & violation audit trail',
    description: 'Comprehensive forensic record of SAP data access events and violation attempts.',
    values: [false, false, true],
  },

  // Extend the Platform (Add-ons)
  {
    category: 'Extend the Platform (Add-ons)',
    label: 'ThreatOps SIEM & SOAR',
    description: 'Enterprise SIEM ingestion, automated response playbooks, and security orchestration.',
    values: ['Add-on', 'Add-on', 'Add-on'],
  },
  {
    category: 'Extend the Platform (Add-ons)',
    label: 'Audit Trail Enforcer',
    description: 'Immutable ledger logging for regulatory compliance and non-repudiation.',
    values: ['Add-on', 'Add-on', 'Add-on'],
  },
  {
    category: 'Extend the Platform (Add-ons)',
    label: 'DPRM privacy compliance',
    description: 'Automated data protection and privacy compliance reporting and mapping.',
    values: ['Add-on', 'Add-on', 'Add-on'],
  },
  {
    category: 'Extend the Platform (Add-ons)',
    label: 'Managed detection & response',
    description: '24/7 SOC monitoring and proactive incident response by ThreatSenseAI analysts.',
    values: ['Add-on', 'Add-on', 'Add-on'],
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
    q: 'Does the Complete Data Protection plan support SAP-specific data protection?',
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
