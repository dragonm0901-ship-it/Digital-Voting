'use client';

import React from 'react';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { Check } from 'lucide-react';
import type { VotingStep } from '@/types';

const STEPS: { key: VotingStep; labelKey: Parameters<typeof t>[1] }[] = [
  { key: 'identify', labelKey: 'step1Title' },
  { key: 'authenticate', labelKey: 'step2Title' },
  { key: 'ballot-direct', labelKey: 'step3DirectTitle' },
  { key: 'ballot-pr', labelKey: 'step3PRTitle' },
  { key: 'confirm', labelKey: 'step4Title' },
];

const STEP_ORDER: VotingStep[] = ['identify', 'authenticate', 'ballot-direct', 'ballot-pr', 'confirm', 'success'];

export default function StepIndicator() {
  const { language, currentStep } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);

  const currentIdx = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4 print:hidden" role="navigation" aria-label="Voting progress">
      <ol className="flex items-center w-full list-none p-0 m-0">
        {STEPS.map((step, i) => {
          const isCompleted = currentIdx > i;
          const isCurrent = currentIdx === i;
          const isUpcoming = currentIdx < i;

          return (
            <React.Fragment key={step.key}>
              <li className="flex flex-col items-center gap-2 relative">
                {/* Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                    isCompleted
                      ? 'bg-navy border-navy text-white'
                      : isCurrent
                        ? 'bg-white border-crimson text-crimson'
                        : 'bg-white border-border text-text-muted'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${
                    isCompleted
                      ? 'text-navy'
                      : isCurrent
                        ? 'text-crimson'
                        : 'text-text-muted'
                  }`}
                >
                  {tr(step.labelKey)}
                </span>
              </li>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className={`step-connector mb-6 ${
                    currentIdx > i ? 'step-connector--active' : ''
                  }`}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
}
