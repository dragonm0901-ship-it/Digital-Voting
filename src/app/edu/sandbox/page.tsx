'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Lightbulb, 
  CheckCircle2, 
  RotateCcw, 
  Loader2, 
  Fingerprint, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle,
  Info,
  Lock,
  Wifi,
  Eye,
  EyeOff,
  Cpu,
  Shield
} from 'lucide-react';
import { FingerprintIcon, BallotBoxIcon, ShieldVerifiedIcon, EncryptedLockIcon, SwostikIcon, ElectionSymbol } from '@/components/icons/CustomIcons';
import { PARTIES } from '@/lib/constants';
import { useVotingStore } from '@/store/voting-store';
import { toLocaleNumber } from '@/lib/numbers';

type SandboxStep = 'intro' | 'env-check' | 'identify' | 'authenticate' | 'ballot-direct' | 'ballot-pr' | 'processing' | 'success';

export default function VoterEducationSandbox() {
  const { language } = useVotingStore();
  const n = (val: string | number) => toLocaleNumber(val, language);
  const [step, setStep] = useState<SandboxStep>('intro');
  const [selectionDirect, setSelectionDirect] = useState<string | null>(null);
  const [selectionPR, setSelectionPR] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [voterId, setVoterId] = useState('');
  const [voterIdVisible, setVoterIdVisible] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [progress, setProgress] = useState(0);

  // Simulation controls
  const runEnvCheck = () => {
    setStep('env-check');
    setTimeout(() => setStep('identify'), 2500);
  };

  const handleIdentify = (e: React.FormEvent) => {
    e.preventDefault();
    if (voterId.length !== 10) return;
    setIsLoading(true);
    setLoadingText('Searching National Database...');
    setTimeout(() => {
      setLoadingText('Verifying Biometric Hash...');
      setTimeout(() => {
        setIsLoading(false);
        setStep('authenticate');
      }, 1500);
    }, 1000);
  };

  const handleAuthenticate = () => {
    if (otp.join('').length !== 6) return;
    setIsLoading(true);
    setLoadingText('Decrypting Practice Key...');
    setTimeout(() => {
      setIsLoading(false);
      setStep('ballot-direct');
    }, 1500);
  };

  const startProcessing = () => {
    setStep('processing');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep('success'), 800);
          return 100;
        }
        return p + 2;
      });
    }, 50);
  };

  const reset = () => {
    setStep('intro');
    setSelectionDirect(null);
    setSelectionPR(null);
    setVoterId('');
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      
      {/* Sandbox Header */}
      <div className="bg-navy py-3 px-4 sm:px-6 lg:px-8 border-b border-navy-light flex justify-between items-center">
        <div className="flex items-center gap-2 text-white">
          <BookOpen size={16} className="text-blue-300" />
          <h1 className="text-xs font-bold uppercase tracking-[0.2em]">PRACTICE SESSION — EDUCATION MODE</h1>
        </div>
        <div className="hidden sm:block">
           <span className="text-[10px] font-bold text-blue-200 bg-white/10 px-2 py-0.5 rounded-full uppercase">No real data is recorded</span>
        </div>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          
          {/* STEP: INTRO */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-border rounded-md p-6 sm:p-12 shadow-sm"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-navy/5 text-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <LibraryIcon size={32} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary uppercase tracking-wide">Matdaan Training Platform</h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-2 px-2">
                  Learn exactly how to use the national digital voting system. This simulation covers all security, authentication, and ballot steps.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <EducationalNote icon={<Wifi size={16} />} title="Network Resiliency" text="Learn how the system behaves when the network is unstable." />
                <EducationalNote icon={<Lock size={16} />} title="End-to-End Encryption" text="Understand how your selections are hidden from officials." />
                <EducationalNote icon={<CheckCircle2 size={16} />} title="Receipt Verification" text="Learn to verify your vote on the public ledger." />
              </div>

              <button
                onClick={runEnvCheck}
                className="active-scale w-full py-4 bg-navy text-white font-bold rounded-md hover:bg-navy-dark transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-widest text-xs"
              >
                Start Guided Practice <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {/* STEP: ENV CHECK */}
          {step === 'env-check' && (
            <motion.div
              key="env-check"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white border border-border rounded-md"
            >
              <Loader2 className="mx-auto text-navy animate-spin mb-6" size={48} />
              <h3 className="text-lg font-bold text-navy uppercase tracking-widest mb-2">Simulating System Diagnostic</h3>
              <p className="text-xs text-text-muted mb-8">Testing browser security, network latency, and enclave integrity...</p>
              <div className="max-w-xs mx-auto space-y-2">
                <DiagnosticLine label="Secure Enclave State" active />
                <DiagnosticLine label="SSL/TLS 1.3 Path" active />
                <DiagnosticLine label="Province Node Latency" active />
              </div>
            </motion.div>
          )}

          {/* STEP: IDENTIFY */}
          {step === 'identify' && (
            <motion.div
              key="identify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <PracticeTip title={`Step ${n(1)}: Your Identity`} text={`In a real election, you would use the ${n(10)}-digit ID from your physical voter card. In this sandbox, just enter any ${n(10)}-digit number.`} />
              
              <div className="bg-white border border-border rounded-md p-8 shadow-sm">
                <div className="text-center mb-8">
                  <FingerprintIcon size={32} color="#003893" className="mx-auto mb-4" />
                  <h3 className="text-xl font-bold">Voter Identification</h3>
                  <p className="text-sm text-text-secondary">Enter your Voter ID Number</p>
                </div>

                {isLoading ? (
                  <div className="py-12 text-center space-y-4">
                    <Loader2 className="mx-auto text-navy animate-spin" size={32} />
                    <p className="text-[10px] font-mono text-navy font-bold uppercase tracking-widest">{loadingText}</p>
                  </div>
                ) : (
                  <form onSubmit={handleIdentify} className="space-y-6">
                    <div className="relative">
                      <input 
                        type={voterIdVisible ? 'text' : 'password'}
                        value={voterId}
                        onChange={(e) => setVoterId(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-4 pr-12 py-3.5 bg-surface border-2 border-border focus:border-navy focus:outline-none rounded-md text-lg sm:text-xl tracking-widest font-mono"
                        placeholder="0000000000"
                        maxLength={10}
                        autoFocus
                      />
                      <button 
                        type="button"
                        onClick={() => setVoterIdVisible(!voterIdVisible)}
                        className="active-scale absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                      >
                        {voterIdVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <button 
                      disabled={voterId.length !== 10}
                      className="active-scale w-full py-4 bg-navy text-white font-bold rounded-md hover:bg-navy-dark transition-all disabled:opacity-50 shadow-md uppercase tracking-wider text-xs"
                    >
                      Authenticate with National Database
                    </button>
                  </form>
                )}
              </div>

              <div className="bg-white border border-border p-5 rounded-md">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Security Diagnostic Trace</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-text-muted">
                   <div className="bg-surface p-2 rounded-md">IP: 103.45.XX.XX (KTM)</div>
                   <div className="bg-surface p-2 rounded-md">ENV: SECURE_SANDBOX</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP: AUTHENTICATE */}
          {step === 'authenticate' && (
            <motion.div
              key="authenticate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <PracticeTip title={`Step ${n(2)}: Two-Factor Verification`} text={`Authentication ensures only YOU can vote. Our system sends an OTP to your registered phone or uses biometric data (typically a ${n(6)}-digit code).`} />
              
              <div className="bg-white border border-border rounded-md p-8 shadow-sm">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 border-2 border-crimson rounded-md flex items-center justify-center mx-auto mb-4">
                    <Smartphone size={28} className="text-crimson" />
                  </div>
                  <h3 className="text-xl font-bold">2FA Authentication</h3>
                  <p className="text-sm text-text-secondary">Verification code sent via SMS</p>
                </div>

                {isLoading ? (
                  <div className="py-12 text-center space-y-4">
                    <Loader2 className="mx-auto text-crimson animate-spin" size={32} />
                    <p className="text-xs font-mono text-crimson font-bold uppercase tracking-widest">{loadingText}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-center gap-2">
                      {otp.map((d, i) => (
                        <input 
                          key={i}
                          maxLength={1}
                          value={d}
                          onChange={(e) => {
                            const newOtp = [...otp];
                            newOtp[i] = e.target.value.replace(/\D/g, '');
                            setOtp(newOtp);
                            if (e.target.value && i < 5) {
                               const next = e.target.nextElementSibling as HTMLInputElement;
                               next?.focus();
                            }
                          }}
                          className="w-9 h-12 sm:w-10 sm:h-14 border-2 border-border focus:border-crimson focus:outline-none rounded-md text-center text-lg sm:text-xl font-bold font-mono"
                        />
                      ))}
                    </div>
                    <button 
                      onClick={handleAuthenticate}
                      disabled={otp.join('').length !== 6}
                      className="active-scale w-full py-4 bg-crimson text-white font-bold rounded-md hover:bg-crimson-dark transition-all disabled:opacity-50 shadow-md uppercase tracking-wider text-xs"
                    >
                      Decrypt Private Enclave
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP: BALLOT DIRECT */}
          {step === 'ballot-direct' && (
            <motion.div
              key="ballot-direct"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Step {n(3)}: Direct Representative</h3>
                <span className="text-[10px] font-bold bg-navy text-white px-2 py-1 rounded-full uppercase">Ballot {n(1)} of {n(2)}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PARTIES.map(party => (
                  <button 
                    key={party.id}
                    onClick={() => setSelectionDirect(party.id)}
                    className={`active-scale relative p-2 sm:p-3 border-2 rounded-md aspect-square flex flex-col items-center justify-center text-center transition-all ${
                      selectionDirect === party.id ? 'border-crimson bg-crimson-light shadow-inner ring-2 ring-crimson/10' : 'border-border bg-white hover:border-navy/30'
                    }`}
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md mb-2 transition-colors ${selectionDirect === party.id ? 'bg-white shadow-sm' : 'bg-surface'}`}>
                      <ElectionSymbol symbol={party.symbol} size={selectionDirect === party.id ? 20 : 18} color={selectionDirect === party.id ? '#DC143C' : '#1A202C'} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-bold leading-tight line-clamp-2 uppercase">{party.nameEn}</p>
                    </div>
                    {selectionDirect === party.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white border border-crimson flex items-center justify-center shadow-md animate-fade-in">
                        <SwostikIcon size={10} aria-hidden="true" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button 
                disabled={!selectionDirect}
                onClick={() => setStep('ballot-pr')}
                className="active-scale w-full py-4 bg-navy text-white font-bold rounded-md flex items-center justify-center gap-2 disabled:opacity-50 shadow-md uppercase tracking-wider text-xs"
              >
                Continue to Proportional <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {/* STEP: BALLOT PR */}
          {step === 'ballot-pr' && (
            <motion.div
              key="ballot-pr"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Step {n(4)}: Proportional Party</h3>
                <span className="text-[10px] font-bold bg-navy text-white px-2 py-1 rounded-full uppercase">Ballot {n(2)} of {n(2)}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PARTIES.map(party => (
                  <button 
                    key={party.id}
                    onClick={() => setSelectionPR(party.id)}
                    className={`active-scale relative p-2 sm:p-3 border-2 rounded-md aspect-square flex flex-col items-center justify-center text-center transition-all ${
                      selectionPR === party.id ? 'border-crimson bg-crimson-light shadow-inner ring-2 ring-crimson/10' : 'border-border bg-white hover:border-navy/30'
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md mb-2 transition-colors ${selectionPR === party.id ? 'bg-white shadow-sm' : 'bg-surface'}`}>
                      <ElectionSymbol symbol={party.symbol} size={selectionPR === party.id ? 18 : 16} color={selectionPR === party.id ? '#DC143C' : '#1A202C'} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-bold leading-tight line-clamp-2 uppercase">{party.nameEn}</p>
                    </div>
                    {selectionPR === party.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white border border-crimson flex items-center justify-center shadow-md animate-fade-in">
                        <SwostikIcon size={10} aria-hidden="true" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button 
                disabled={!selectionPR}
                onClick={startProcessing}
                className="active-scale w-full py-4 bg-crimson text-white font-bold rounded-md flex items-center justify-center gap-2 disabled:opacity-50 shadow-md uppercase tracking-wider text-xs"
              >
                Submit Practice Ballots <ShieldCheck size={18} />
              </button>
            </motion.div>
          )}

          {/* STEP: PROCESSING */}
          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8 py-8"
            >
              <div className="bg-white border border-border rounded-md p-10 shadow-lg">
                <div className="w-16 h-16 border-2 border-navy rounded-md flex items-center justify-center mx-auto mb-6">
                  {progress < 50 ? <Shield size={32} className="text-navy animate-pulse" /> : <EncryptedLockIcon size={32} color="#003893" />}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-6">
                  {progress < 50 ? 'Generating ZK-SNARK Proof (Encrypted Boundary)...' : 'Committing to National Ledger Cluster...'}
                </h3>

                <div className="space-y-3 text-sm text-text-secondary font-mono">
                  <div className={`flex items-center justify-center gap-2 ${progress >= 50 ? 'text-success' : 'text-navy font-bold'}`}>
                    <Lock size={14} /> {progress >= 50 ? 'Choices Successfully Hidden' : 'Executing Enclave Cipher'}
                  </div>
                  <div className={`flex items-center justify-center gap-2 ${progress >= 100 ? 'text-success' : progress >= 50 ? 'text-navy font-bold' : 'opacity-30'}`}>
                    <Wifi size={14} /> {progress >= 100 ? `Anchored to ${n(84)} Ledger Nodes` : 'Broadcasting Ledger Batch'}
                  </div>
                </div>

                <div className="mt-8 w-full bg-surface h-2 rounded-full overflow-hidden border border-border">
                  <motion.div 
                    className="h-full bg-navy"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 font-mono text-[10px] text-text-muted italic">
                  <span>AES-GCM_V{n(4)}_SECURE</span>
                  <span>{n(progress)}% SECURED</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP: SUCCESS */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-white border border-border rounded-md p-10 text-center shadow-sm">
                <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-2xl font-bold">Practice Submission Successful</h2>
                <p className="text-sm text-text-secondary mt-2 mb-8 uppercase tracking-widest font-bold">Private Ledger Synchronized</p>

                <div className="bg-surface border-2 border-dashed border-border p-6 rounded-md text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-navy/5">
                    <ShieldVerifiedIcon size={64} className="text-navy opacity-5" />
                  </div>
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">Sample Practice Receipt</h4>
                  <div className="space-y-3 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-text-muted">TX_HASH</span>
                      <span className="font-bold text-navy">0x{Math.random().toString(16).slice(2, 18)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">PROVINCE</span>
                      <span className="font-bold">SANDBOX_VIRTUAL_01</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">TIMESTAMP</span>
                      <span className="font-bold">{new Date().toISOString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button onClick={reset} className="py-3 border border-border rounded-md font-bold text-sm flex items-center justify-center gap-2 hover:bg-surface">
                    <RotateCcw size={16} /> Repeat Practice
                  </button>
                  <button onClick={() => window.location.href = '/'} className="py-3 bg-navy text-white rounded-md font-bold text-sm shadow-md hover:bg-navy-dark">
                    Finish Session
                  </button>
                </div>
              </div>

              <div className="bg-navy p-6 rounded-md text-white shadow-xl">
                 <h4 className="flex items-center gap-2 font-bold mb-3 text-blue-300">
                    <Info size={16} /> How to verify on election day?
                 </h4>
                 <p className="text-xs text-blue-100 leading-relaxed">
                    Every digital receipt contains a **Transaction Hash**. You can paste this hash into our public Auditor Portal to verify that your vote was included in the final batch without ever revealing who you voted for.
                 </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

// Sub-components
function EducationalNote({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="flex gap-4 p-4 bg-surface border border-border rounded-md hover:bg-white transition-colors">
      <div className="w-10 h-10 bg-white border border-border flex items-center justify-center rounded-md text-navy shadow-sm shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-text-primary">{title}</h4>
        <p className="text-xs text-text-secondary mt-0.5">{text}</p>
      </div>
    </div>
  );
}

function PracticeTip({ title, text }: { title: string, text: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-navy text-white p-5 rounded-md shadow-lg flex gap-4 border border-navy-light"
    >
      <div className="p-2 bg-blue-500/20 rounded-md shrink-0">
        <Lightbulb className="text-blue-300" size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold">{title}</h4>
        <p className="text-xs text-blue-100 mt-1 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

function DiagnosticLine({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="flex justify-between items-center text-[10px] font-mono border-b border-border py-2 last:border-0">
      <span className="text-text-muted">{label}</span>
      <span className="text-success font-bold uppercase tracking-wider">OK / VERIFIED</span>
    </div>
  );
}

function LibraryIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/><path d="M12 2v2"/><path d="M16 2v2"/><path d="M20 2v2"/>
    </svg>
  );
}
