'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, User, AlertTriangle, Loader2 } from 'lucide-react';
import { loginAdminAction } from '@/app/actions/admin';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    setError(null);

    const res = await loginAdminAction(username, password);
    
    setIsLoading(false);
    
    if (!res.success) {
      setError(res.message || 'Authentication failed');
      return;
    }

    if (res.data?.redirectUrl) {
      router.push(res.data.redirectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      {/* Background Decorator */}
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#003893_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-navy/20">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary uppercase">Staff Portal</h1>
          <p className="text-sm text-text-muted font-mono mt-2 tracking-widest">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl border border-border p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="flex items-start gap-3 p-4 bg-danger-light border border-danger/20 rounded text-danger text-sm font-bold">
                <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                  Officer ID / Username
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border-2 border-border rounded pl-11 pr-4 py-3 text-sm font-mono text-text-primary focus:outline-none focus:border-navy transition-colors bg-surface"
                    placeholder="E.g. admin"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                  Access Code
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-border rounded pl-11 pr-4 py-3 text-sm font-mono text-text-primary focus:outline-none focus:border-navy transition-colors bg-surface"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full py-4 bg-navy text-white font-bold text-sm rounded shadow-md hover:bg-navy-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 uppercase tracking-widest"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Secure Login'
              )}
            </button>
          </form>

          {/* Helper hint for demo */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-[10px] text-center font-mono text-text-muted uppercase">
              Demo Credentials:<br/>
              User: <strong className="text-navy">admin</strong> | Pass: <strong className="text-navy">password</strong>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
            <Link href="/" className="text-xs font-bold text-text-muted hover:text-navy uppercase tracking-widest transition-colors font-mono">&larr; Return to Public Portal</Link>
        </div>
      </motion.div>
    </div>
  );
}
