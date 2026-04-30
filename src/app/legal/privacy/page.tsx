'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Globe, 
  Scale, 
  FileText,
  UserCheck
} from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <EyeOff size={24} className="text-navy" />,
      title: "Anonymity through ZKP",
      desc: "Our platform utilizes Zero-Knowledge Proofs (ZKP). This means the system can verify that you are a legitimate voter and have cast exactly one vote, without ever knowing or recording *who* you voted for."
    },
    {
      icon: <Lock size={24} className="text-navy" />,
      title: "E2E Encryption",
      desc: "From the moment you select your candidate to the final tally, your ballot is encrypted with AES-256 and RSA-4096 standards, verified by the National Security Agency of Nepal."
    },
    {
      icon: <UserCheck size={24} className="text-navy" />,
      title: "Identity Data Protection",
      desc: "Personal identification data (Citizenship No, Biometric Hash) is used only for session authentication and is never stored alongside the vote. All authentication logs are purged 7 days post-election."
    },
    {
      icon: <Globe size={24} className="text-navy" />,
      title: "Distributed Sovereignty",
      desc: "Data is not stored in a single centralized server. It is distributed across 84 secure government nodes across all provinces, preventing single points of failure or unauthorized manipulation."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white border-b border-border py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-navy/5 text-navy px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            >
              <ShieldCheck size={14} /> National Data Security Standard
            </motion.div>
            <h1 className="text-4xl font-extrabold text-text-primary mb-6">Legal & Privacy Framework</h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              The 2025 Digital Voting initiative is governed by the <b>Electronic Transactions Act 2063</b> and the <b>National Privacy Policy 2075</b> of Nepal. We ensure the highest level of constitutional protection for your democratic right.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {sections.map((s, idx) => (
              <motion.div 
                key={s.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                <div className="w-12 h-12 bg-white border border-border flex items-center justify-center shrink-0 rounded-md shadow-sm">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-navy p-12 rounded-md text-white overflow-hidden relative">
            <div className="relative z-100">
              <div className="flex items-center gap-3 mb-6">
                <Scale size={32} className="text-blue-300" />
                <h2 className="text-2xl font-bold">Constitutional Guarantee</h2>
              </div>
              <p className="text-blue-100 mb-8 max-w-2xl leading-relaxed">
                "The secrecy of the ballot is a fundamental right guaranteed by Article 32 of the Constitution of Nepal. Any attempt to breach this secrecy, whether through technical exploitation or administrative overreach, constitutes a high crime against the state."
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-navy px-6 py-3 font-bold text-sm rounded-md hover:bg-blue-50 transition-colors flex items-center gap-2">
                  <FileText size={16} /> Download Full Legal PDF
                </button>
                <button className="bg-navy-light text-white border border-white/20 px-6 py-3 font-bold text-sm rounded-md hover:bg-white/10 transition-colors">
                  Contact Legal Department
                </button>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
          </div>
        </section>

        {/* Audit Disclaimer */}
        <section className="pb-20 max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-text-muted uppercase tracking-[0.2em] font-bold mb-4">Last Updated: April 02, 2026</p>
          <p className="text-xs text-text-muted leading-loose">
            By using the Matdaan digital voting portal, you consent to the collection of session data for security purposes only. The Election Commission of Nepal reserves the right to suspend any session exhibiting suspicious node-behavior. Your identity data is encrypted at rest and in transit.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
