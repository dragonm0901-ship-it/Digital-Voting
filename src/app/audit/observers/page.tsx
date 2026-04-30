'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe2, 
  Cpu, 
  Link as LinkIcon, 
  ShieldCheck, 
  Search,
  Eye,
  FileJson,
  RefreshCw,
  Hash
} from 'lucide-react';

export default function ObserverPortal() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Generate mock real-time block stream
  useEffect(() => {
    const initialBlocks = Array.from({ length: 5 }, (_, i) => generateBlock(i));
    setBlocks(initialBlocks);

    const interval = setInterval(() => {
      setBlocks(prev => [generateBlock(prev.length), ...prev.slice(0, 4)]);
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function generateBlock(index: number) {
    return {
      id: 842000 + index,
      timestamp: new Date().toLocaleTimeString(),
      merkleRoot: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      votes: Math.floor(Math.random() * 500) + 100,
      validator: `Node-${Math.floor(Math.random() * 7) + 1}`,
      hash: `0x${Math.random().toString(16).slice(2, 40)}`
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      
      {/* Network Ribbon */}
      <div className="bg-navy border-b border-navy-light py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <Globe2 className="text-blue-300 animate-pulse" size={18} />
            <h1 className="text-xs font-bold uppercase tracking-widest">Global Observer Transparency Portal</h1>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold opacity-70">
            <span className="flex items-center gap-1.5"><RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} /> NETWORK SYNCED</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-success" /> E2E VERIFIABLE</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Metadata Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-border p-6 rounded-md">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Cpu size={16} className="text-navy" />
                Network Specs
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-text-muted">Consensus Protocol</label>
                  <p className="font-bold">Proof of Authority (PoA-V2)</p>
                </div>
                <div>
                  <label className="text-text-muted">Avg Block Time</label>
                  <p className="font-bold">5.0 seconds</p>
                </div>
                <div>
                  <label className="text-text-muted">Encryption Standard</label>
                  <p className="font-bold">AES-GCM 256 + RSA-4096</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="bg-navy/5 p-3 rounded-md">
                    <p className="text-[10px] text-navy font-bold flex items-center gap-1.5 uppercase tracking-tighter">
                      <Hash size={12} /> Public Audit Node ID
                    </p>
                    <code className="text-[10px] block mt-1 break-all bg-white p-2 border border-navy/10">
                      ECN-GLOBAL-NOD-842-X91
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-md">
              <h3 className="text-amber-800 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                <Search size={14} /> Auditor's Note
              </h3>
              <p className="text-xs text-amber-700 leading-relaxed">
                All blocks visualised here represent <b>aggregated Merkle trees</b>. Individual vote choices are permanently hidden via Zero-Knowledge Proofs (ZKP), ensuring total voter privacy while allowing public verification of the total count.
              </p>
            </div>
          </aside>

          {/* Block Visualizer */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Live Ledger Activity</h2>
                <p className="text-sm text-text-secondary">Cryptographic stream of verified election blocks.</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-border text-text-muted hover:text-navy hover:bg-white rounded-md"><FileJson size={18} /></button>
                <button className="p-2 border border-border text-text-muted hover:text-navy hover:bg-white rounded-md"><RefreshCw size={18} /></button>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {blocks.map((block, i) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`bg-white border-l-4 p-5 rounded-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      i === 0 ? 'border-l-navy bg-navy/5 shadow-md relative overflow-hidden' : 'border-l-success'
                    }`}
                  >
                    {i === 0 && (
                      <div className="absolute top-0 right-0 py-1 px-3 bg-navy text-white text-[9px] font-bold uppercase">
                        New Block
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-surface border border-border flex items-center justify-center shrink-0">
                        <LinkIcon size={18} className="text-navy" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm">Block #{block.id}</span>
                          <span className="text-[10px] text-text-muted flex items-center gap-1">
                            <Clock size={10} /> {block.timestamp}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-text-muted truncate max-w-[200px] md:max-w-md">
                          ROOT: {block.merkleRoot}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 justify-between md:justify-end">
                      <div className="text-right">
                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Votes Batched</p>
                        <p className="text-sm font-extrabold text-navy">{block.votes}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Validator</p>
                        <p className="text-sm font-extrabold text-text-primary">{block.validator}</p>
                      </div>
                      <button className="p-2 text-navy hover:bg-navy/10 rounded-full transition-colors">
                        <Eye size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 p-6 bg-white border border-border border-dashed rounded-md text-center">
              <button className="text-sm font-bold text-text-muted hover:text-navy uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto">
                <Search size={14} /> Load Historical Data
              </button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-xs py-2 border-b border-border last:border-0">
      <span className="text-text-secondary">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function Clock({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
