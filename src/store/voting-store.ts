'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import type { Language, PoliticalParty, VotingStep, VoterProfile, VoteReceipt } from '@/types';

/**
 * National Election Security Module (Simulated TEE)
 * Using AES-GCM 256-bit encryption for local state protection.
 * In a real deployment, keys would be handled by a Hardware Security Module (HSM).
 */
const MASTER_KEY_SALT = 'nepal-election-2025-secure-salt';

async function getEncryptionKey() {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode('matdaan-national-security-key-2025'),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(MASTER_KEY_SALT),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(name);
    if (!stored) return null;

    try {
      const { ciphertext, iv } = JSON.parse(stored);
      const key = await getEncryptionKey();
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(iv) },
        key,
        new Uint8Array(ciphertext)
      );
      return new TextDecoder().decode(decrypted);
    } catch (e) {
      console.error('SECURE_STORAGE_ERROR: Decryption failed. Possible tampering detected.', e);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (typeof window === 'undefined') return;
    
    const key = await getEncryptionKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(value);
    
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );

    localStorage.setItem(name, JSON.stringify({
      ciphertext: Array.from(new Uint8Array(ciphertext)),
      iv: Array.from(iv)
    }));
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};

interface VotingState {
  // UI Preferences
  isHighContrast: boolean;
  setHighContrast: (val: boolean) => void;
  textSize: 'normal' | 'lg' | 'xl';
  setTextSize: (size: 'normal' | 'lg' | 'xl') => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  // Flow control
  currentStep: VotingStep;
  setStep: (step: VotingStep) => void;

  // Voter data
  voterId: string;
  setVoterId: (id: string) => void;
  voterProfile: VoterProfile | null;
  setVoterProfile: (profile: VoterProfile | null) => void;
  maskedPhone: string;
  setMaskedPhone: (phone: string) => void;

  // OTP
  otp: string[];
  setOtp: (otp: string[]) => void;
  resendTimer: number;
  setResendTimer: (timer: number) => void;

  // Ballot Selections
  selectedPartyDirect: PoliticalParty | null;
  setSelectedPartyDirect: (party: PoliticalParty | null) => void;
  selectedPartyPR: PoliticalParty | null;
  setSelectedPartyPR: (party: PoliticalParty | null) => void;

  // Processing
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingText: string;
  setLoadingText: (text: string) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Receipt
  receipt: VoteReceipt | null;
  setReceipt: (receipt: VoteReceipt | null) => void;

  // Full reset
  resetVotingFlow: () => void;
}

export const useVotingStore = create<VotingState>()(
  persist(
    (set) => ({
      // UI Preferences
      isHighContrast: false,
      setHighContrast: (isHighContrast) => set({ isHighContrast }),
      textSize: 'normal',
      setTextSize: (textSize) => set({ textSize }),

      // Language
      language: 'en',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'ne' : 'en' })),


      // Flow control
      currentStep: 'identify',
      setStep: (currentStep) => set({ currentStep }),

      // Voter data
      voterId: '',
      setVoterId: (voterId) => set({ voterId }),
      voterProfile: null,
      setVoterProfile: (voterProfile) => set({ voterProfile }),
      maskedPhone: '',
      setMaskedPhone: (maskedPhone) => set({ maskedPhone }),

      // OTP
      otp: ['', '', '', '', '', ''],
      setOtp: (otp) => set({ otp }),
      resendTimer: 0,
      setResendTimer: (resendTimer) => set({ resendTimer }),

      // Ballot Selections
      selectedPartyDirect: null,
      setSelectedPartyDirect: (selectedPartyDirect) => set({ selectedPartyDirect }),
      selectedPartyPR: null,
      setSelectedPartyPR: (selectedPartyPR) => set({ selectedPartyPR }),

      // Processing
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
      loadingText: '',
      setLoadingText: (loadingText) => set({ loadingText }),
      error: null,
      setError: (error) => set({ error }),

      // Receipt
      receipt: null,
      setReceipt: (receipt) => set({ receipt }),

      // Full reset
      resetVotingFlow: () =>
        set({
          currentStep: 'identify',
          voterId: '',
          voterProfile: null,
          maskedPhone: '',
          otp: ['', '', '', '', '', ''],
          resendTimer: 0,
          selectedPartyDirect: null,
          selectedPartyPR: null,
          isLoading: false,
          loadingText: '',
          error: null,
          receipt: null,
        }),
    }),
    {
      name: 'matdaan-secure-session-v2', // Version bump for block encryption
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        language: state.language,
        isHighContrast: state.isHighContrast,
        textSize: state.textSize,
        currentStep: state.currentStep,
        voterId: state.voterId,
        voterProfile: state.voterProfile,
        maskedPhone: state.maskedPhone,
        selectedPartyDirect: state.selectedPartyDirect,
        selectedPartyPR: state.selectedPartyPR,
        receipt: state.receipt, // Persist receipt for audit trail
      }),
    }
  )
);
