'use client';

import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { verifyOtpAction } from '@/app/actions/auth';
import { Smartphone, Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AuthenticatePage() {
  const router = useRouter();
  const {
    language, voterId, maskedPhone, otp, setOtp, setStep,
    isLoading, setIsLoading, loadingText, setLoadingText,
    error, setError, resendTimer, setResendTimer,
  } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);

  useEffect(() => {
    setStep('authenticate');
    setError(null);
    if (!voterId) {
      router.replace('/vote/identify');
    }
    setResendTimer(30);
  }, [setStep, setError, voterId, router, setResendTimer]);

  // Resend timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer(resendTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer, setResendTimer]);

  const handleOtpChange = useCallback((index: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  }, [otp, setOtp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  }, [otp]);

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return;

    setIsLoading(true);
    setError(null);
    setLoadingText(tr('decryptingKey'));

    const response = await verifyOtpAction(voterId, otpCode);

    setIsLoading(false);
    setLoadingText('');

    if (!response.success) {
      setError(tr('invalidOtp'));
      setOtp(['', '', '', '', '', '']);
      const first = document.getElementById('otp-0');
      first?.focus();
      return;
    }

    setStep('ballot-direct');
    router.push('/vote/ballot-direct');
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white border border-border rounded-[3px] p-8 sm:p-10">
        {isLoading ? (
          <div className="py-12 space-y-6 text-center" role="status" aria-live="polite">
            <Loader2 className="mx-auto text-crimson animate-spin" size={40} />
            <p className="text-sm text-crimson font-mono font-medium">{loadingText}</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 border-2 border-crimson rounded-[3px] flex items-center justify-center mx-auto mb-4">
                <Smartphone size={28} className="text-crimson" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">{tr('otpTitle')}</h2>
              <p className="text-sm text-text-secondary">
                {tr('otpSubtitle')} <strong>{maskedPhone}</strong>
              </p>
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
                <p className="text-sm text-danger font-medium">{error}</p>
              </motion.div>
            )}

            {/* OTP hint */}
            <div className="p-3 bg-info-light border border-info/20 rounded-[3px] mb-6">
              <p className="text-xs text-info font-medium">
                <strong>Demo:</strong> Enter <code className="bg-white px-1 py-0.5 rounded-[2px] font-mono text-[11px]">123456</code> to proceed.
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-between gap-2 sm:gap-3 mb-8" aria-label="Enter 6-digit OTP code">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  aria-label={`OTP Digit ${i + 1}`}
                  className="w-11 h-14 sm:w-14 sm:h-16 border-2 border-border rounded-[3px] text-center text-2xl font-bold font-mono bg-white text-text-primary focus:outline-none focus:border-crimson transition-colors"
                />
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                disabled={otp.some((v) => v === '')}
                onClick={handleVerifyOtp}
                id="btn-verify-otp"
                className="w-full py-4 bg-crimson text-white font-bold text-base rounded-[3px] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-crimson-dark transition-colors cursor-pointer border-0"
              >
                {tr('verifyOtp')}
              </button>

              <button
                onClick={handleResend}
                disabled={resendTimer > 0}
                className="w-full py-3 text-sm font-bold text-navy disabled:text-text-faint transition-colors cursor-pointer bg-transparent border-0 flex items-center justify-center gap-1"
              >
                {resendTimer > 0
                  ? `${tr('wait')} (${resendTimer}s)`
                  : tr('resendOtp')}
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
