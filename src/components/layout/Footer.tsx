'use client';

import React from 'react';
import Link from 'next/link';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { BallotBoxIcon } from '@/components/icons/CustomIcons';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

import { toLocaleNumber } from '@/lib/numbers';

export default function Footer() {
  const { language } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);
  const n = (val: string | number) => toLocaleNumber(val, language);

  return (
    <footer
      className="border-t border-border bg-surface py-12 px-4 sm:px-6 lg:px-8 no-print mt-auto"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-border/50">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-navy text-white rounded-md flex items-center justify-center shadow-lg">
              <BallotBoxIcon size={20} color="#FFFFFF" />
            </div>
            <div>
              <span className="block font-bold tracking-tight text-text-primary text-lg leading-tight">
                {tr('siteTitle')} {n('2025')}
              </span>
              <div className="w-24 h-0.5 bg-crimson rounded-full my-1" aria-hidden="true" />
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Official Digital Voting Infrastructure
              </span>
            </div>
          </div>

          {/* Secure badge */}
          <div className="flex items-center gap-3 px-4 py-2 bg-white border border-border rounded-md shadow-sm">
            <ShieldCheck size={16} className="text-navy" aria-hidden="true" />
            <div className="text-left leading-tight">
              <p className="text-[10px] font-bold text-text-primary uppercase tracking-tight">
                {tr('secureGovDomain')}
              </p>
              <p className="text-[9px] font-medium text-text-muted">GOV.NP VERIFIED NODE</p>
            </div>
          </div>
        </div>

        {/* Legal copy */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-medium text-text-muted text-center sm:text-left leading-relaxed max-w-md">
            The MATDAAN platform is governed by the Digital Election Act {n('2082')}. All interactions are cryptographically recorded and subject to public audit. 
          </p>
          <div className="flex gap-6 uppercase text-[10px] font-bold tracking-widest text-text-faint">
             <span>Terms of Service</span>
             <span>Ledger Privacy</span>
             <span>WCAG {n('2.1')} AAA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
