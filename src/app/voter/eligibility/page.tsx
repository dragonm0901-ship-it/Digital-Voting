'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  MapPin,
  Calendar
} from 'lucide-react';

export default function VoterEligibility() {
  const [voterId, setVoterId] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'eligible' | 'not-found'>('idle');

  const checkEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('searching');
    
    // Simulate API delay
    setTimeout(() => {
      if (voterId === '1234567890') {
        setStatus('eligible');
      } else {
        setStatus('not-found');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-navy/10 text-navy rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <UserCheck size={32} />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-4">Voter Eligibility Search</h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Verify your registration status in the National Election Database. You must be 18 years of age or older by election day to be eligible.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={checkEligibility} className="relative mb-8">
            <input 
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-border shadow-sm rounded-md focus:outline-none focus:border-navy text-lg font-bold tracking-widest placeholder:tracking-normal placeholder:font-normal"
              placeholder="Enter 10-digit Voter ID"
              disabled={status === 'searching'}
              maxLength={10}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <button 
              type="submit"
              disabled={status === 'searching' || voterId.length < 10}
              className="mt-4 w-full py-4 bg-navy text-white font-bold rounded-md hover:bg-navy-dark transition-colors disabled:bg-text-muted"
            >
              {status === 'searching' ? 'Checking Database...' : 'Verify My Eligibility'}
            </button>
          </form>

          {status === 'eligible' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-success/5 border border-success/20 p-8 rounded-md"
            >
              <div className="flex items-center gap-4 mb-6">
                <CheckCircle2 className="text-success" size={28} />
                <h3 className="text-xl font-bold text-text-primary">You are Eligible to Vote</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-success/10">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> Province
                  </span>
                  <span className="font-bold">Bagmati Province (3)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-success/10">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} /> Election Date
                  </span>
                  <span className="font-bold">April 12, 2026</span>
                </div>
              </div>
              
              <p className="mt-6 text-xs text-text-secondary italic">
                * Please ensure you have your physical or digital citizenship card for secondary biometric verification on election day.
              </p>
            </motion.div>
          )}

          {status === 'not-found' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-crimson/5 border border-crimson/20 p-8 rounded-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <XCircle className="text-crimson" size={28} />
                <h3 className="text-xl font-bold text-text-primary">Record Not Found</h3>
              </div>
              <p className="text-sm text-text-secondary mb-6">
                The Voter ID entered does not match our verified national database. If you believe this is an error, please visit your local District Election Office.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-xs font-bold text-navy uppercase tracking-widest hover:underline"
              >
                Try Search Again
              </button>
            </motion.div>
          )}

          {status === 'idle' && (
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-md flex gap-4">
              <AlertCircle className="text-amber-600 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-amber-900 uppercase tracking-widest mb-1">Demo Credentials</p>
                <p className="text-xs text-amber-800">Use Voter ID <b>1234567890</b> to test successful verification.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
