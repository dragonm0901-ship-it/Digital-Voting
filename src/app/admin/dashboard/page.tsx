'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  Users, 
  Database, 
  Activity, 
  ShieldCheck, 
  BarChart3, 
  AlertCircle,
  Clock,
  MapPin,
  Lock
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '2025') {
      setIsAuthorized(true);
    } else {
      setError('Invalid EC Authorization Code');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-border p-8 rounded-md shadow-sm max-w-md w-full"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-navy/10 text-navy rounded-full flex items-center justify-center mb-4">
                <Lock size={32} />
              </div>
              <h1 className="text-xl font-bold text-text-primary">EC Dashboard Authorization</h1>
              <p className="text-sm text-text-secondary text-center mt-2">
                Restricted access. This portal is for Election Commission of Nepal officials only.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1.5">
                  Official Passcode
                </label>
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-navy text-center tracking-[0.5em] font-bold"
                  placeholder="••••"
                  autoFocus
                />
                {error && <p className="text-xs text-crimson mt-2 font-bold">{error}</p>}
              </div>
              <button className="w-full py-3 bg-navy text-white font-bold rounded-md hover:bg-navy-dark transition-colors">
                Authorize Access
              </button>
            </form>
            <p className="text-[10px] text-text-muted text-center mt-6 uppercase font-bold tracking-tighter">
              All access attempts are logged on the private ledger.
            </p>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <div className="bg-navy py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-white">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-success" />
            <h1 className="text-sm font-bold tracking-wider uppercase">EC National Monitoring Portal — SECURE</h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold opacity-80">
            <span className="flex items-center gap-1.5"><Clock size={14} /> LIVE: APR 07, 2026</span>
            <span className="flex items-center gap-1.5"><Activity size={14} className="text-success" /> NODES: 84/84</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Registered" value="17,842,401" change="+1.2%" icon={<Users size={20} />} />
          <StatCard title="Votes Commited" value="4,210,892" change="Live Casting" icon={<Database size={20} />} />
          <StatCard title="Avg Latency" value="234ms" change="Optimal" icon={<Activity size={20} />} />
          <StatCard title="Inclusion Proofs" value="100%" change="Verified" icon={<BarChart3 size={20} />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Monitor */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white border border-border p-6 rounded-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <BarChart3 size={18} className="text-navy" />
                  Provincial Real-time Turnout
                </h3>
                <button className="text-xs font-bold text-navy hover:underline uppercase tracking-wider">Export Report</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Koshi', val: 42 },
                  { name: 'Madhesh', val: 56 },
                  { name: 'Bagmati', val: 38 },
                  { name: 'Gandaki', val: 45 },
                  { name: 'Lumbini', val: 41 },
                  { name: 'Karnali', val: 32 },
                  { name: 'Sudurpashchim', val: 29 },
                ].map(p => (
                  <div key={p.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="uppercase tracking-wide">{p.name} Province</span>
                      <span>{p.val}%</span>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${p.val}%` }}
                        className="h-full bg-navy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Notifications */}
          <section className="space-y-6">
            <div className="bg-white border border-border p-6 rounded-md">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertCircle size={16} className="text-warning" />
                System Health
              </h3>
              <div className="space-y-4">
                <HealthItem label="Merkle Batcher" status="Active" color="bg-success" />
                <HealthItem label="ZKP Prover Node" status="Optimized" color="bg-success" />
                <HealthItem label="Kafka Buffer" status="3.2k pkts/s" color="bg-success" />
                <HealthItem label="Offline Sync (Remote)" status="Delayed" color="bg-warning" />
              </div>
            </div>

            <div className="bg-white border border-border p-6 rounded-md">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Regional Backends</h3>
              <div className="space-y-3">
                {['Biratnagar', 'Janakpur', 'Hetauda', 'Pokhara', 'Butwal', 'Birendranagar', 'Dhangadhi'].map(city => (
                  <div key={city} className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-text-muted" /> {city} Center
                    </span>
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-border p-6 rounded-md shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-surface text-navy rounded-md">{icon}</div>
        <span className="text-[10px] font-bold text-navy uppercase bg-navy/5 px-2 py-0.5 rounded-full">{change}</span>
      </div>
      <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">{title}</p>
      <h4 className="text-2xl font-extrabold text-text-primary">{value}</h4>
    </div>
  );
}

function HealthItem({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-text-secondary">{label}</span>
      <div className="flex items-center gap-2 font-bold">
        <span>{status}</span>
        <span className={`w-2 h-2 rounded-full ${color}`}></span>
      </div>
    </div>
  );
}
