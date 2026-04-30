'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { PARTIES } from '@/lib/constants';
import { BallotBoxIcon, SwostikIcon, ElectionSymbol } from '@/components/icons/CustomIcons';
import { ArrowRight } from 'lucide-react';

export default function BallotPage() {
  const router = useRouter();
  const {
    language, selectedPartyPR, setSelectedPartyPR, setStep, voterId,
  } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);

  useEffect(() => {
    setStep('ballot-pr');
    if (!voterId) {
      router.replace('/vote/identify');
    }
  }, [setStep, voterId, router]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 px-4 md:px-0"
    >
      {/* Header */}
      <div className="text-center">
        <div className="w-14 h-14 border-2 border-navy rounded-[3px] flex items-center justify-center mx-auto mb-4">
          <BallotBoxIcon size={28} color="#003893" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 uppercase tracking-wide">
          {language === 'ne' ? 'समानुपातिक मतपत्र' : 'Proportional Representation Ballot'}
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary px-6">{tr('ballotSubtitle')}</p>
      </div>

      {/* Ballot cards - High Density Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
        role="radiogroup"
        aria-label="Candidate Selection"
      >
        {PARTIES.map((party) => {
          const isSelected = selectedPartyPR?.id === party.id;
          return (
            <motion.div
              key={party.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && setSelectedPartyPR(party)
              }
              onClick={() => setSelectedPartyPR(party)}
              className={`active-scale relative cursor-pointer border-2 rounded-[3px] p-2 sm:p-3 aspect-square flex flex-col items-center justify-center text-center transition-all duration-200 ${
                isSelected
                  ? 'border-crimson bg-crimson-light ring-2 ring-crimson/20'
                  : 'border-border bg-white hover:border-border-strong'
              }`}
            >
              {/* Symbol Container */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md mb-2 transition-colors ${
                  isSelected ? 'bg-white shadow-sm' : 'bg-surface'
                }`}
              >
                <ElectionSymbol 
                  symbol={party.symbol} 
                  size={isSelected ? 20 : 18} 
                  color={isSelected ? '#DC143C' : '#1A202C'} 
                />
              </div>

              {/* Party Name */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <h3 className="text-[10px] sm:text-[11px] font-bold text-text-primary leading-[1.1] mb-0.5 line-clamp-2 uppercase tracking-tight">
                  {language === 'ne' ? party.nameNe : party.nameEn}
                </h3>
                <p className="text-[8px] sm:text-[9px] text-text-muted truncate">
                  {language === 'ne' ? party.nameEn : party.nameNe}
                </p>
              </div>

              {/* Selection indicator - Overlay */}
              {isSelected && (
                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white border border-crimson flex items-center justify-center shadow-md animate-fade-in">
                  <SwostikIcon size={12} aria-hidden="true" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Confirm button */}
      {selectedPartyPR && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => {
              setStep('confirm');
              router.push('/vote/confirm');
            }}
            id="btn-proceed-confirm"
            className="active-scale w-full py-4 bg-crimson text-white font-bold text-base rounded-[3px] flex items-center justify-center gap-2 hover:bg-crimson-dark transition-all cursor-pointer border-0 shadow-lg"
          >
            {tr('confirmVote')}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
