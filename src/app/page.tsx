'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  ShieldVerifiedIcon,
  FingerprintIcon,
  BallotBoxIcon,
  EncryptedLockIcon,
  NepalMapIcon,
  CitizenshipCardIcon,
} from '@/components/icons/CustomIcons';
import {
  ArrowRight,
  BarChart3,
  Smartphone,
  Users,
  Zap,
  Award,
  Monitor,
  Shield,
} from 'lucide-react';
import { toLocaleNumber } from '@/lib/numbers';

export default function LandingPage() {
  const { language } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);
  const n = (val: string | number) => toLocaleNumber(val, language);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* ════════ HERO ════════ */}
        <section className="relative border-b border-border overflow-hidden bg-white">
          {/* Background Image Overlay */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: "url('/images/hero-bg.png')" }}
            aria-hidden="true"
          />
          {/* Opacity Wash */}
          <div className="absolute inset-0 z-0 bg-white/85" aria-hidden="true" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {/* Election badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy rounded-md text-white text-xs font-bold uppercase tracking-wider"
                >
                  <ShieldVerifiedIcon size={14} />
                  <span>General Election {n('2025')}</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-text-primary"
                >
                  {tr('heroTitle')}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-text-secondary max-w-lg leading-relaxed"
                >
                  {tr('heroSubtitle')}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                  className="flex flex-col sm:grid sm:grid-cols-2 gap-4"
                >
                  <Link
                    href="/vote/identify"
                    id="cta-start-voting"
                    className="active-scale group w-full flex justify-center items-center gap-2 px-8 py-4 bg-crimson border-2 border-transparent text-white font-bold text-base rounded-md no-underline hover:brightness-110 hover:border-navy transition-all"
                  >
                    {tr('startVoting')}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    href="/results"
                    id="cta-view-results"
                    className="active-scale w-full flex justify-center items-center gap-2 px-8 py-4 border-2 border-navy text-navy font-bold text-base rounded-md no-underline hover:bg-navy hover:text-white transition-all"
                  >
                    <BarChart3 size={18} aria-hidden="true" />
                    {tr('viewResults')}
                  </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
                >
                  <div className="bg-white p-4 border border-border rounded-md border-l-4 border-l-crimson">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldVerifiedIcon size={18} color="#DC143C" />
                      <span className="text-xs font-bold uppercase tracking-wider text-crimson">
                        {tr('certifiedSecure')}
                      </span>
                    </div>
                    <p className="text-xs text-crimson/80 leading-relaxed">
                      {tr('certifiedSecureDesc')}
                    </p>
                  </div>
                  <div className="bg-white p-4 border border-border rounded-md border-l-4 border-l-navy">
                    <div className="flex items-center gap-2 mb-2">
                      <NepalMapIcon size={18} color="#003893" />
                      <span className="text-xs font-bold uppercase tracking-wider text-navy">
                        {tr('universalAccess')}
                      </span>
                    </div>
                    <p className="text-xs text-navy/80 leading-relaxed">
                      {tr('universalAccessDesc')}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right side — Stats panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Live stats card */}
                <div className="bg-white border border-border rounded-md overflow-hidden flex flex-col items-center">
                  <div className="bg-white px-6 py-3 border-b border-border w-full flex flex-col items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                      {tr('liveSessionTraffic')}
                    </span>
                    <div className="w-24 h-0.5 bg-crimson rounded-full" aria-hidden="true" />
                  </div>
                  <div className="px-6 py-4 bg-white flex flex-col items-center text-center w-full">
                    <p className="text-sm text-text-muted mb-1 font-semibold">
                      {n('14,204')} {tr('votersInSession')}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-2 text-text-faint">
                      <Monitor size={16} />
                      <Smartphone size={16} />
                    </div>
                  </div>
                </div>

                {/* Stat numbers */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-navy rounded-md p-4 text-center">
                    <p className="text-2xl font-extrabold text-white">{n('84%')}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mt-1">
                      {tr('digitalParticipation')}
                    </p>
                  </div>
                  <div className="bg-navy rounded-md p-4 text-center">
                    <p className="text-2xl font-extrabold text-white">{n('12.8M')}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mt-1">
                      {tr('verifiedIdentities')}
                    </p>
                  </div>
                  <div className="bg-navy rounded-md p-4 text-center">
                    <p className="text-2xl font-extrabold text-white">{n('0s')}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mt-1">
                      {tr('transactionDelay')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════ CAPABILITIES ════════ */}
        <section className="bg-surface border-b border-border" aria-labelledby="cap-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-10 flex flex-col items-center">
              <h2 id="cap-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-4">
                {tr('capTitle')}
              </h2>
              <div className="w-48 h-0.5 bg-crimson rounded-full mb-4" aria-hidden="true" />
              <p className="text-text-secondary text-sm sm:text-base px-4">{tr('capSubtitle')}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Users size={28} />, titleKey: 'cap1Title' as const, descKey: 'cap1Desc' as const, image: '/images/Identity Sovereignty.png' },
                { icon: <Zap size={28} />, titleKey: 'cap2Title' as const, descKey: 'cap2Desc' as const, image: '/images/National Resilience.png' },
                { icon: <Award size={28} />, titleKey: 'cap3Title' as const, descKey: 'cap3Desc' as const, image: '/images/Total Transparency.png' },
              ].map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="active-scale relative overflow-hidden group bg-white p-6 sm:p-8 border border-border rounded-md border-l-4 border-l-crimson border-r-4 border-r-navy"
                >
                  {/* Hover background image - always on mobile, dual-state on desktop */}
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-300 opacity-50 lg:opacity-30 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:opacity-40"
                    style={{ backgroundImage: `url('${cap.image}')` }}
                    aria-hidden="true"
                  />
                  
                  <div className="relative z-10">
                    <div className="text-text-primary mb-4">{cap.icon}</div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{tr(cap.titleKey)}</h3>
                    <p className="text-sm text-black font-medium leading-relaxed">{tr(cap.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ HOW IT WORKS ════════ */}
        <section className="bg-white border-b border-border" aria-labelledby="how-it-works-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-10 flex flex-col items-center">
              <h2 id="how-it-works-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-4">
                {tr('howItWorks')}
              </h2>
              <div className="w-48 h-0.5 bg-crimson rounded-full" aria-hidden="true" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: (props: any) => <FingerprintIcon {...props} />, titleKey: 'step1Title' as const, descKey: 'step1Desc' as const, num: '01' },
                { icon: (props: any) => <Smartphone {...props} />, titleKey: 'step2Title' as const, descKey: 'step2Desc' as const, num: '02' },
                { icon: (props: any) => <BallotBoxIcon {...props} />, titleKey: 'step3Title' as const, descKey: 'step3Desc' as const, num: '03' },
                { icon: (props: any) => <EncryptedLockIcon {...props} />, titleKey: 'step4Title' as const, descKey: 'step4Desc' as const, num: '04' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="active-scale border border-border rounded-md p-6 text-center bg-white hover:border-border-strong transition-colors"
                >
                  <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-4">
                    Step {n(step.num)}
                  </div>
                  <div className="w-12 h-12 bg-navy rounded-md flex items-center justify-center mx-auto mb-4 shadow-sm">
                    {step.icon({ size: 28, color: '#FFFFFF' })}
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-base font-bold text-text-primary mb-2 uppercase tracking-wide">{tr(step.titleKey)}</h3>
                    <div className="w-12 h-0.5 bg-crimson rounded-full mb-3" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{tr(step.descKey)}</p>
                  {step.num === '03' && (
                    <Link 
                      href="/edu/sandbox" 
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-crimson hover:underline"
                    >
                      {tr('votingPractice')}
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ STATUS BAR ════════ */}
        <section className="bg-surface" aria-label="Election Statistics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="border border-border rounded-md bg-white">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border text-center">
                <div className="p-6">
                  <p className="text-3xl font-extrabold text-text-primary">{n('84%')}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">
                    {tr('digitalParticipation')}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-3xl font-extrabold text-text-primary">{n('12.8M')}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">
                    {tr('verifiedIdentities')}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-3xl font-extrabold text-crimson">{n('0s')}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">
                    {tr('transactionDelay')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
