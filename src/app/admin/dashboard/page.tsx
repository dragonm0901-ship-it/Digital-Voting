'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Lock,
  Loader2
} from 'lucide-react';
import { getAdminSessionAction, logoutAdminAction, getPendingVotesCountAction, runMerkleBatcherAction } from '@/app/actions/admin';

export default function AdminDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<{
    id: string;
    username: string;
    fullName: string;
    role: string;
    province?: number | null;
    district?: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [isBatching, setIsBatching] = useState(false);
  const [batchResult, setBatchResult] = useState<string | null>(null);

  const fetchPendingCount = async () => {
    const res = await getPendingVotesCountAction();
    if (res.success && res.data) {
      setPendingCount(res.data.count);
    }
  };

  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true);
      const res = await getAdminSessionAction();
      if (res.success && res.data) {
        setSession(res.data);
        // Fetch pending votes initially
        const countRes = await getPendingVotesCountAction();
        if (countRes.success && countRes.data) {
          setPendingCount(countRes.data.count);
        }
      } else {
        router.replace('/admin/login');
      }
      setIsLoading(false);
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await logoutAdminAction();
    router.replace('/admin/login');
  };

  const handleBatchCommit = async () => {
    setIsBatching(true);
    setBatchResult(null);
    const res = await runMerkleBatcherAction();
    setIsBatching(false);
    if (res.success && res.data) {
      if (res.data.committedCount > 0) {
        setBatchResult(`Successfully batched and committed ${res.data.committedCount} votes in Block #${res.data.blockNumber}!`);
      } else {
        setBatchResult("No votes were queued for batching.");
      }
      fetchPendingCount();
    } else {
      setBatchResult("Error executing Merkle Batcher on node.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-navy uppercase tracking-widest animate-pulse">Verifying Security Session...</p>
          </div>
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
            <h1 className="text-sm font-bold tracking-wider uppercase">
              EC Monitoring — Welcome, {session?.fullName} ({session?.role.toUpperCase()})
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 opacity-80"><Clock size={14} /> LIVE: APR 07, 2026</span>
            <span className="flex items-center gap-1.5 opacity-80"><Activity size={14} className="text-success" /> NODES: 84/84</span>
            <button 
              onClick={handleLogout}
              className="px-3 py-1 bg-crimson hover:bg-crimson-dark text-white rounded text-xs font-bold uppercase transition-colors cursor-pointer border-none"
            >
              Logout
            </button>
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
            {/* Merkle Batcher Panel */}
            <section className="bg-white border border-border p-6 rounded-md border-l-4 border-l-crimson shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Database size={18} className="text-crimson" />
                  Ledger Merkle Batcher Console
                </h3>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest font-mono">Status: ONLINE</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                Votes cast by citizens are immediately written to a secure queue. The Merkle Batcher collects these queued votes, constructs a cryptographic Merkle Tree, publishes the Merkle Root to the ledger, and generates Individual Inclusion Proofs for voters.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-surface rounded-md border border-border">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Queued Votes Buffer</p>
                  <p className="text-2xl font-extrabold text-navy">{pendingCount} Votes Pending</p>
                </div>
                <button
                  onClick={handleBatchCommit}
                  disabled={pendingCount === 0 || isBatching}
                  className="w-full sm:w-auto px-6 py-3 bg-navy hover:bg-navy-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-md transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider border-none cursor-pointer"
                >
                  {isBatching ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Batching Votes...
                    </>
                  ) : (
                    <>
                      <Database size={14} />
                      Commit Merkle Batch
                    </>
                  )}
                </button>
              </div>
              {batchResult && (
                <div className="mt-4 p-3 bg-success-light border border-success/20 text-success text-xs font-bold rounded-md flex items-center gap-2">
                  <ShieldCheck size={16} className="text-success" />
                  {batchResult}
                </div>
              )}
            </section>

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
