'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { OfficialStampIcon } from '@/components/icons/CustomIcons';
import { CheckCircle2, Download, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();
  const { language, receipt, resetVotingFlow, setStep } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);

  useEffect(() => {
    setStep('success');
    if (!receipt) {
      router.replace('/vote/identify');
    }
  }, [setStep, receipt, router]);

  if (!receipt) return null;

  const formattedTimestamp = new Date(receipt.timestamp).toLocaleString(
    language === 'ne' ? 'ne-NP' : 'en-US'
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="bg-white border border-border rounded-[3px] p-8 sm:p-10 text-left print-receipt print:p-0 print:border-none">
        
        {/* Print-Only Official Header */}
        <div className="hidden print:block text-center mt-0 mb-4 pb-4 border-b-2 border-black">
          <div className="flex justify-center mb-2">
            <OfficialStampIcon size={48} className="text-black" />
          </div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black m-0">Election Commission of Nepal</h1>
          <p className="text-xs font-bold uppercase mt-1 text-black">Digital Voting Receipt</p>
        </div>

        {/* Success icon */}
        <div className="w-16 h-16 bg-success-light border-2 border-success rounded-[3px] flex items-center justify-center mb-6 print:hidden">
          <CheckCircle2 size={32} className="text-success" />
        </div>

        <h2 className="text-2xl font-bold text-text-primary mb-2 print:text-black print:text-xl">Vote Cryptographically Secured</h2>
        <p className="text-sm text-text-secondary mb-8 print:mb-4 print:text-black">
          Your ballot has been successfully encrypted and committed to the National Election Ledger.
        </p>

        {/* Receipt details */}
        <div className="border border-border rounded-[3px] text-left divide-y divide-border mb-8 print:mb-4 print:border-2 print:border-black print:divide-black">
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {tr('receiptId')}
            </span>
            <span className="text-xs text-navy font-mono font-medium">
              {receipt.transactionHash}
            </span>
          </div>
          {receipt.zkProof && (
            <div className="flex justify-between items-center px-4 py-3 bg-surface/50">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                ZK-Proof Hash
              </span>
              <span className="text-xs text-text-primary font-mono truncate max-w-[200px]" title={receipt.zkProof}>
                {receipt.zkProof.substring(0, 32)}...
              </span>
            </div>
          )}
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {tr('certifiedTimestamp')}
            </span>
            <span className="text-xs text-text-primary font-mono">
              {formattedTimestamp}
            </span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Block #
            </span>
            <span className="text-xs text-text-primary font-mono">
              {receipt.blockNumber.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {tr('networkVerification')}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-[2px] ${receipt.verificationStatus === 'queued' ? 'bg-warning-light text-warning border border-warning/20' : 'badge-verified'}`}>
              {receipt.verificationStatus === 'queued' ? 'Queued (Pending Batch)' : tr('immutable')}
            </span>
          </div>
        </div>

        {/* Public Ledger Verification Instructions */}
        <div className="border border-border bg-surface p-6 mb-8 text-left print:hidden">
          <h3 className="font-bold text-sm text-text-primary mb-2 flex items-center gap-2">
            <BarChart3 size={16} className="text-navy" />
            End-to-End Verifiability (E2EV)
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed mb-4">
            {receipt.verificationStatus === 'queued' 
              ? "Your vote is currently encrypted and held in the National Kafka cluster. It will be batched into the immutable ledger and assigned a Merkle proof within 60 seconds."
              : "Your vote has been merged into a Merkle batch. You can query the international auditor nodes independently to verify this root hash."}
          </p>
          <div className="bg-white border border-border p-3 text-xs text-text-muted font-mono mb-0">
            <strong>Blockchain Query:</strong> {`get_block_proof --root ${receipt.merkleRoot || 'PENDING'} --vote ${receipt.transactionHash}`}
          </div>
        </div>

        {/* Stamp */}
        <div className="flex justify-end mb-8 print:mb-2">
          <OfficialStampIcon size={48} color="#2F855A" className="opacity-60" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 bg-text-primary text-white font-bold text-sm rounded-[3px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer border-0"
          >
            <Download size={16} aria-hidden="true" />
            {tr('downloadReceipt')}
          </button>
          <Link
            href="/results"
            onClick={() => resetVotingFlow()}
            className="flex-1 py-3 border border-border text-text-primary font-bold text-sm rounded-[3px] flex items-center justify-center gap-2 hover:bg-surface transition-colors no-underline"
          >
            <BarChart3 size={16} aria-hidden="true" />
            {tr('viewResults')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
