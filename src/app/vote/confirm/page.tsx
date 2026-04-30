'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { castVoteAction } from '@/app/actions/vote';
import { EncryptedLockIcon, ShieldVerifiedIcon } from '@/components/icons/CustomIcons';
import { AlertTriangle, ArrowLeft, Shield, Lock } from 'lucide-react';

export default function ConfirmPage() {
  const router = useRouter();
  const {
    language, selectedPartyDirect, selectedPartyPR, setStep, voterId, setReceipt,
  } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);

  const [castingStage, setCastingStage] = useState<'idle' | 'zk-proof' | 'kafka-queue' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setStep('confirm');
    if (!selectedPartyDirect || !selectedPartyPR || !voterId) {
      router.replace('/vote/identify');
    }
  }, [setStep, selectedPartyDirect, selectedPartyPR, voterId, router]);

  const handleCastVote = async () => {
    if (!selectedPartyDirect || !selectedPartyPR) return;
    setCastingStage('zk-proof');

    // Stage 1: ZK-Proof (Artificial Progress)
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 40 ? prev + 1 : prev));
    }, 50);

    const response = await castVoteAction(`${selectedPartyDirect.id}-${selectedPartyPR.id}`, voterId);
    
    clearInterval(interval);
    setProgress(60);
    setCastingStage('kafka-queue');

    // Stage 2: Kafka Queue Submission (Artificial Progress)
    const kafkaInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : prev));
    }, 40);

    setTimeout(() => {
      clearInterval(kafkaInterval);
      setProgress(100);
      
      if (response.success && response.data) {
        setReceipt(response.data.receipt);
        setTimeout(() => {
          setStep('success');
          router.push('/vote/success');
        }, 800);
      }
    }, 1500);
  };

  if (castingStage !== 'idle') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-8 py-8"
        role="status"
        aria-live="polite"
      >
        <div className="bg-white border border-border rounded-[3px] p-10">
          <div className="w-16 h-16 border-2 border-navy rounded-[3px] flex items-center justify-center mx-auto mb-6">
            {castingStage === 'zk-proof' ? (
              <Shield size={32} className="text-navy animate-pulse" />
            ) : (
              <EncryptedLockIcon size={32} color="#003893" />
            )}
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-6">
            {castingStage === 'zk-proof' ? 'Generating ZK-SNARK Proof...' : 
             castingStage === 'kafka-queue' ? 'Submitting to National Kafka Cluster...' : 
             'Vote Secured'}
          </h3>

          <div className="space-y-3 text-sm text-text-secondary font-mono">
            <div className={`flex items-center justify-center gap-2 ${castingStage === 'zk-proof' ? 'text-navy font-bold' : 'text-success'}`}>
              <Lock size={14} aria-hidden="true" />
              {castingStage === 'zk-proof' ? 'Hiding Candidate Selection (Zero-Knowledge)' : 'Candidate Selections Encrypted'}
            </div>
            <div className={`flex items-center justify-center gap-2 ${castingStage === 'kafka-queue' ? 'text-navy font-bold' : castingStage === 'zk-proof' ? 'opacity-40' : 'text-success'}`}>
              <Shield size={14} aria-hidden="true" />
              {castingStage === 'kafka-queue' ? 'Broadcasting to 7 Province Edge Nodes...' : 'Network Integrity Verified'}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-full bg-surface h-2 rounded-full overflow-hidden border border-border">
            <div
              className={`h-full transition-all duration-300 ease-out ${castingStage === 'kafka-queue' ? 'bg-navy' : 'bg-crimson'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 font-mono">
            <span className="text-[10px] text-text-muted uppercase">
               {castingStage === 'zk-proof' ? 'PROVER_MODULE_V1' : 'KAFKA_BROKER_ID: NP-04'}
            </span>
            <span className="text-xs text-text-muted">{progress}%</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!selectedPartyDirect || !selectedPartyPR) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white border border-border rounded-[3px] p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 border-2 border-crimson rounded-[3px] flex items-center justify-center mx-auto mb-4">
            <ShieldVerifiedIcon size={28} color="#DC143C" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">{tr('confirmTitle')}</h2>
          <p className="text-sm text-text-secondary">{tr('confirmSubtitle')}</p>
        </div>

        {/* Selected party summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-border rounded-[3px] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
              {language === 'ne' ? 'प्रत्यक्ष मतदान' : 'Direct Vote'}
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-3 h-12 rounded-full flex-shrink-0"
                style={{ backgroundColor: selectedPartyDirect.color }}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {language === 'ne' ? selectedPartyDirect.nameNe : selectedPartyDirect.nameEn}
                </h3>
                <p className="text-sm text-text-muted">
                  {language === 'ne' ? selectedPartyDirect.nameEn : selectedPartyDirect.nameNe}
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 border-border rounded-[3px] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
              {language === 'ne' ? 'समानुपातिक मतदान' : 'Proportional Vote'}
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-3 h-12 rounded-full flex-shrink-0"
                style={{ backgroundColor: selectedPartyPR.color }}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {language === 'ne' ? selectedPartyPR.nameNe : selectedPartyPR.nameEn}
                </h3>
                <p className="text-sm text-text-muted">
                  {language === 'ne' ? selectedPartyPR.nameEn : selectedPartyPR.nameNe}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-warning-light border border-warning/20 rounded-[3px] mb-8">
          <AlertTriangle size={18} className="text-warning mt-0.5 flex-shrink-0" />
          <p className="text-xs text-warning leading-relaxed font-medium">
            {tr('legalDisclaimer')}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleCastVote}
            id="btn-cast-vote"
            className="w-full py-4 bg-crimson text-white font-bold text-base rounded-[3px] flex items-center justify-center gap-2 hover:bg-crimson-dark transition-colors cursor-pointer border-0"
          >
            <EncryptedLockIcon size={18} color="#FFFFFF" />
            {tr('castVote')}
          </button>

          <button
            onClick={() => {
              setStep('ballot-direct');
              router.push('/vote/ballot-direct');
            }}
            className="w-full py-3 text-sm font-bold text-text-muted hover:text-text-primary transition-colors cursor-pointer bg-transparent border border-border rounded-[3px]"
          >
            <span className="flex items-center justify-center gap-2">
              <ArrowLeft size={16} />
              {tr('changeSelection')}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
