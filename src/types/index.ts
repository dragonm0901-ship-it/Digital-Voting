// ── Voter Types ──
export interface VoterProfile {
  id: string;
  fullNameEn: string;
  fullNameNe: string;
  district: string;
  province: string;
  registeredPhone: string;
  status: VoterStatus;
}

export type VoterStatus = 'verified' | 'already_voted' | 'blocked' | 'not_found' | 'expired';

// ── Election Types ──
export interface Election {
  id: string;
  titleEn: string;
  titleNe: string;
  year: number;
  type: 'general' | 'local' | 'provincial';
  isActive: boolean;
}

export interface PoliticalParty {
  id: string;
  nameEn: string;
  nameNe: string;
  symbol: string;
  color: string;
  descriptionEn: string;
  descriptionNe: string;
}

// ── Vote Types ──
export interface VoteReceipt {
  transactionHash: string;
  merkleRoot?: string;
  merkleProof?: { position: 'left' | 'right', data: string }[];
  zkProof?: string; // Encoded ZK-Proof payload
  timestamp: string;
  electionId: string;
  verificationStatus: 'immutable' | 'pending' | 'queued';
  blockNumber: number;
}

// ── Results Types ──
export interface ProvinceData {
  name: string;
  nameNe: string;
  turnout: number;
  votes: number;
}

export interface PartyResult {
  partyId: string;
  nameEn: string;
  percentage: number;
  color: string;
}

// ── Audit Types ──
export interface AuditEntry {
  timestamp: string;
  eventId: string;
  action: string;
  status: 'Verified' | 'Success' | 'Healthy' | 'Finalized' | 'Active';
  nodeSignature: string;
}

// ── Voting Flow ──
export type VotingStep = 'identify' | 'authenticate' | 'ballot-direct' | 'ballot-pr' | 'confirm' | 'success';

export type Language = 'en' | 'ne' | 'ma' | 'bh';

// ── API Response Types ──
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface VoterVerificationResponse {
  voter: VoterProfile;
  otpSent: boolean;
  maskedPhone: string;
}

export interface OtpVerificationResponse {
  verified: boolean;
  sessionToken: string;
}

export interface CastVoteResponse {
  receipt: VoteReceipt;
}
