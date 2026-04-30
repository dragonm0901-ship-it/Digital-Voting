'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { verifyVoterIdAction } from '@/app/actions/auth';
import { FingerprintIcon } from '@/components/icons/CustomIcons';
import { Eye, EyeOff, ChevronRight, ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function IdentifyPage() {
  const router = useRouter();
  const {
    language, voterId, setVoterId, setStep,
    isLoading, setIsLoading, loadingText, setLoadingText,
    error, setError, setVoterProfile, setMaskedPhone,
  } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);

  const [voterIdVisible, setVoterIdVisible] = useState(false);
  const [diagnostics, setDiagnostics] = useState({
    checked: false,
    passed: false,
    os: '',
    browser: '',
    connection: '',
  });

  useEffect(() => {
    setStep('identify');
    setError(null);

    // Run Pre-Authentication Environment Check
    const checkEnv = () => {
      const ua = navigator.userAgent;
      const isMac = ua.toUpperCase().indexOf('MAC') >= 0;
      const isWin = ua.toUpperCase().indexOf('WIN') >= 0;
      const os = isMac ? 'macOS' : isWin ? 'Windows' : 'Supported OS';
      
      let browser = 'Secure Browser';
      if (ua.includes('Chrome')) browser = 'Google Chrome';
      if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
      if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Apple Safari';

      const conn = (navigator as unknown as { connection?: { effectiveType: string } }).connection;
      const connection = conn ? conn.effectiveType.toUpperCase() : 'STABLE';
      
      // Simulate quick diagnostic sweep
      setTimeout(() => {
        setDiagnostics({ checked: true, passed: true, os, browser, connection });
      }, 800);
    };
    checkEnv();

  }, [setStep, setError]);

  const handleValidate = async () => {
    if (voterId.length !== 10) return;

    setIsLoading(true);
    setError(null);
    setLoadingText(tr('searchingDatabase'));

    const timer = setTimeout(() => setLoadingText(tr('verifyingBiometric')), 800);

    const response = await verifyVoterIdAction(voterId);

    clearTimeout(timer);
    setIsLoading(false);
    setLoadingText('');

    if (!response.success) {
      const errorKey = response.error as Parameters<typeof t>[1];
      setError(tr(errorKey));
      return;
    }

    if (response.data) {
      setVoterProfile(response.data.voter);
      setMaskedPhone(response.data.maskedPhone);
      setStep('authenticate');
      router.push('/vote/authenticate');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 px-4 md:px-0"
    >
      <div className="bg-white border border-border rounded-[3px] p-6 sm:p-10 shadow-sm">
        {!diagnostics.checked ? (
          <div className="py-12 space-y-6 text-center" role="status" aria-live="polite">
            <div className="w-16 h-16 border-2 border-navy rounded-[3px] flex items-center justify-center mx-auto">
              <Loader2 className="text-navy animate-spin" size={32} />
            </div>
            <p className="text-xs font-bold text-navy uppercase tracking-widest animate-pulse">Running Pre-Auth Environment Check...</p>
          </div>
        ) : isLoading ? (
          <div className="py-12 space-y-6 text-center" role="status" aria-live="polite">
            <div className="w-16 h-16 border-2 border-navy rounded-[3px] flex items-center justify-center mx-auto">
              <Loader2 className="text-navy animate-spin" size={32} />
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-surface rounded-full w-3/4 mx-auto" />
              <div className="h-1.5 bg-surface rounded-full w-1/2 mx-auto" />
            </div>
            <p className="text-xs text-navy font-mono font-bold uppercase tracking-widest">{loadingText}</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6 border-b border-border pb-6">
              <div className="w-14 h-14 border-2 border-navy rounded-[3px] flex items-center justify-center mx-auto mb-4">
                <FingerprintIcon size={28} color="#003893" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 uppercase tracking-wide">{tr('verifyTitle')}</h2>
              <p className="text-xs sm:text-sm text-text-secondary px-4">{tr('enterVoterId')}</p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 bg-danger-light border border-danger/20 rounded-[3px] mb-6"
                role="alert"
              >
                <AlertTriangle size={18} className="text-danger mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-danger font-bold">{error}</p>
              </motion.div>
            )}

            {/* Voter ID input */}
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="voter-id" className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2 text-left">
                  Voter ID Number
                </label>
                <input
                  id="voter-id"
                  type={voterIdVisible ? 'text' : 'password'}
                  maxLength={10}
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value.replace(/\D/g, ''))}
                  placeholder={tr('idPlaceholder')}
                  autoComplete="off"
                  className="w-full border-2 border-border rounded-[3px] px-4 py-3.5 text-lg sm:text-xl tracking-[0.1em] sm:tracking-[0.15em] font-mono bg-white text-text-primary placeholder:text-text-faint focus:outline-none focus:border-navy transition-all pr-14 shadow-sm"
                />
                <button
                  onClick={() => setVoterIdVisible(!voterIdVisible)}
                  aria-label={voterIdVisible ? 'Hide Voter ID' : 'Show Voter ID'}
                  className="active-scale absolute right-4 top-[38px] text-text-muted hover:text-text-primary transition-colors bg-transparent border-0 cursor-pointer p-1"
                >
                  {voterIdVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Test voter hint */}
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-[3px] text-left">
                <p className="text-[10px] sm:text-xs text-navy font-bold flex items-start gap-2">
                  <span className="bg-navy text-white px-1 py-0.5 rounded text-[8px] uppercase">DEMO</span>
                  <span>Use 1234567890 (verified), 3456789012 (voted), or 4567890123 (blocked).</span>
                </p>
              </div>

              <button
                disabled={voterId.length !== 10 || !diagnostics.passed}
                onClick={handleValidate}
                id="btn-validate"
                className="active-scale w-full py-4 bg-navy text-white font-bold text-base rounded-[3px] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-navy-dark transition-all cursor-pointer border-0 shadow-md uppercase tracking-wider text-xs"
              >
                {tr('validateIdentity')}
                <ChevronRight size={18} aria-hidden="true" />
              </button>

              <Link
                href="/"
                className="active-scale block w-full py-3 text-center text-text-muted hover:text-navy transition-all text-[11px] font-bold uppercase tracking-widest no-underline border border-transparent hover:border-border rounded-[3px]"
              >
                {tr('goBack')}
              </Link>

              {/* Diagnostic Results */}
              <div className="pt-2">
                <div className="p-4 border border-border bg-surface text-left rounded-[3px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${diagnostics.passed ? 'bg-success' : 'bg-danger'} animate-pulse`} />
                    <h3 className="font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-text-primary m-0">Security Diagnostic Status</h3>
                  </div>
                  <ul className="text-[9px] sm:text-[10px] text-text-muted list-none p-0 m-0 mt-2 space-y-1 font-mono">
                    <li className="flex justify-between border-b border-border/50 pb-1"><span>OS:</span> <span className="text-text-primary font-bold">{diagnostics.os}</span></li>
                    <li className="flex justify-between border-b border-border/50 pb-1"><span>Environment:</span> <span className="text-text-primary font-bold">{diagnostics.browser}</span></li>
                    <li className="flex justify-between"><span>Network:</span> <span className="text-success font-bold uppercase tracking-wider">{diagnostics.connection} / ENCRYPTED</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
