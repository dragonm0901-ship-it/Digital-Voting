'use client';

import React from 'react';
import { useVotingStore } from '@/store/voting-store';
import { Info, ShieldAlert, BadgeCheck, LockKeyhole } from 'lucide-react';

export default function ContextualSidebar() {
  const { currentStep } = useVotingStore();

  if (currentStep === 'success') {
    return (
      <aside className="h-full p-6 bg-surface border-l border-border flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <BadgeCheck className="text-success" size={24} />
          <h3 className="font-bold text-text-primary m-0">Process Complete</h3>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 text-left">
          Your vote has been cryptographically secured. You may now close this window or return home.
        </p>
      </aside>
    );
  }

  const getContextContent = () => {
    switch (currentStep) {
      case 'identify':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-navy" size={24} />
              <h3 className="font-bold text-text-primary m-0">Identification Phase</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 text-left">
              Please enter your official Voter ID exactly as it appears on your Citizenship or Voter Card.
            </p>
            <div className="bg-white border border-border p-3 text-xs text-text-muted mt-2 text-left">
              Ensure you have your registered mobile device nearby to receive the required OTP via the Nagarik App or SMS.
            </div>
          </>
        );
      case 'authenticate':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="text-navy" size={24} />
              <h3 className="font-bold text-text-primary m-0">Secure Verification</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 text-left">
              This verification step ensures your identity and prevents unauthorized access to your ballot.
            </p>
            <div className="bg-white border border-border p-3 text-xs text-text-muted mt-2 text-left">
              <strong>How to use Nagarik App OTP:</strong> Open the Nagarik App, tap on Government Services, and locate your Voting OTP code.
            </div>
          </>
        );
      case 'ballot-direct':
      case 'ballot-pr':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <BadgeCheck className="text-navy" size={24} />
              <h3 className="font-bold text-text-primary m-0">Candidate Selection</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 text-left">
              Select one political party from the encrypted electronic ballot.
            </p>
            <div className="bg-white border border-border p-3 text-xs text-text-muted mt-2 text-left">
              Your selection is securely cached locally to handle network drops. If disconnected, simply refresh the page.
            </div>
          </>
        );
      case 'confirm':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <LockKeyhole className="text-crimson" size={24} />
              <h3 className="font-bold text-text-primary m-0">Final Confirmation</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 text-left">
              Review your selection carefully. Once cast, this action cannot be undone.
            </p>
            <div className="bg-crimson-light border border-crimson p-3 text-xs text-crimson-dark mt-2 text-left font-bold">
              Warning: Modification after submission is cryptographically impossible.
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-navy" size={24} />
              <h3 className="font-bold text-text-primary m-0">System Guidance</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 text-left">
              Follow the instructions provided on the main screen.
            </p>
          </>
        );
    }
  };

  return (
    <aside className="h-full p-6 bg-surface border-l border-border flex flex-col print:hidden">
      {getContextContent()}
    </aside>
  );
}
