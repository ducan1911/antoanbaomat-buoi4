/**
 * Type definitions for CyberSec Lesson 4: URL Scanning & Malware File Analysis
 */

export type ThreatLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AttackVector = 
  | 'EMAIL_INVOICE'
  | 'JOB_CV'
  | 'PIRATED_SOFTWARE'
  | 'CLOUD_DRIVE_PHISHING'
  | 'ZALO_TELEGRAM_QR';

export type DeceptionTechnique =
  | 'DOUBLE_EXTENSION'
  | 'MACRO_OFFICE'
  | 'ARCHIVE_SCRIPT'
  | 'MALICIOUS_LNK'
  | 'PDF_EMBEDDED'
  | 'FAKE_INSTALLER'
  | 'TYPOSQUATTING'
  | 'HOMOGRAPH'
  | 'SUBDOMAIN_TRAP'
  | 'SHORTLINK'
  | 'SUSPICIOUS_TLD';

export interface ThreatItem {
  id: string;
  name: string;
  category: 'URL' | 'FILE';
  vector: AttackVector;
  technique: DeceptionTechnique;
  level: ThreatLevel;
  vietnamPrevalence: number; // percentage in Vietnam landscape
  sampleName: string;
  realDisguise: string;
  actualPayload: string;
  description: string;
  vietnamRealCase: string;
  defenseRecommendation: string;
}

export interface UrlBreakdown {
  raw: string;
  protocol: string;
  subdomain: string;
  primaryDomain: string;
  tld: string;
  path: string;
  query: string;
  isPhishing: boolean;
  tricksDetected: string[];
  explanation: string;
  riskScore: number; // 0 - 100
}

export interface SandboxStep {
  timeOffset: string;
  process: string;
  parentProcess: string;
  action: string;
  type: 'PROCESS' | 'NETWORK' | 'REGISTRY' | 'FILESYSTEM';
  detail: string;
  isMalicious: boolean;
}

export interface VirusTotalSample {
  id: string;
  name: string;
  type: 'URL' | 'FILE';
  detectionRatio: { detected: number; total: number };
  sampleHash?: string;
  fileSignatureMismatch?: { displayed: string; actual: string };
  threatClass: string;
  behaviorTags: string[];
  topEngines: { name: string; result: 'Malicious' | 'Phishing' | 'Clean' | 'Suspicious' }[];
  didYouKnow: string;
}

export interface GameQuestion {
  id: number;
  title: string;
  scenario: string;
  subject: string;
  type: 'URL' | 'FILE';
  isThreat: boolean;
  technique: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  tacticalTip: string;
}
