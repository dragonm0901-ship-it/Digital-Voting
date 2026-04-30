'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { PROVINCES, PARTY_RESULTS, PARTIES } from '@/lib/constants';
import { ElectionSymbol } from '@/components/icons/CustomIcons';
import NepalElectionMap from '@/components/results/NepalElectionMap';
import { ShieldCheck, Users, Activity, History, ArrowRight, TrendingUp, List, ChevronDown, ChevronUp } from 'lucide-react';
import { toLocaleNumber } from '@/lib/numbers';
import { PoliticalParty } from '@/types';

export default function ResultsPage() {
  const { language } = useVotingStore();
  const [showDetailed, setShowDetailed] = useState(false);
  
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);
  const n = (val: string | number) => toLocaleNumber(val, language);

  // ── Data Aggregation ──
  const aggregatedData = useMemo(() => {
    const threshold = 3;
    const leaders = PARTY_RESULTS.filter(p => p.percentage >= threshold);
    const others = PARTY_RESULTS.filter(p => p.percentage < threshold);
    
    if (others.length === 0) return PARTY_RESULTS.map(p => ({
      name: language === 'ne' ? p.nameNe : p.nameEn,
      value: p.percentage,
      color: p.color
    }));

    const othersTotal = others.reduce((acc, p) => acc + p.percentage, 0);
    
    const data = leaders.map(p => ({
      name: language === 'ne' ? p.nameNe : p.nameEn,
      value: p.percentage,
      color: p.color
    }));

    data.push({
      name: tr('others'),
      value: othersTotal,
      color: '#A0AEC0'
    });

    return data;
  }, [language]);

  const topLeaders = useMemo(() => {
    return PARTY_RESULTS.slice(0, 5).map(p => ({
      name: language === 'ne' ? p.nameNe : p.nameEn,
      value: p.percentage,
      color: p.color
    }));
  }, [language]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{tr('resultsTitle')}</h2>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-success rounded-md text-white border-none transition-transform active:scale-95 duration-100">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              {tr('secureNetwork')}
            </span>
          </div>
        </div>
        <div className="flex flex-row md:flex-row gap-4 justify-center md:justify-end">
          <div className="border border-border rounded-md bg-white px-4 py-3 text-center flex-1 md:flex-initial min-w-[100px] sm:min-w-[120px]">
            <p className="text-[9px] sm:text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">
              {tr('totalVotes')}
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-text-primary">{n('12.8 करोड')}</p>
          </div>
          <div className="rounded-md bg-crimson px-4 py-3 text-center text-white border-none flex-1 md:flex-initial min-w-[100px] sm:min-w-[120px] active:brightness-110 transition-all">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest mb-1 text-white/80">
              {tr('liveTurnout')}
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-white">{n('71.2%')}</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-md p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-navy rounded-md flex items-center justify-center border-none">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <div>
            <p className="text-xs text-text-muted">{tr('networkIntegrity')}</p>
            <p className="text-base font-bold text-text-primary uppercase">{n('100%')} Secure</p>
          </div>
        </div>
        <div className="bg-white border border-border rounded-md p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-navy rounded-md flex items-center justify-center border-none">
            <Users className="text-white" size={20} />
          </div>
          <div>
            <p className="text-xs text-text-muted">{tr('activeVoters')}</p>
            <p className="text-base font-bold text-text-primary">{n('6,471,023')}</p>
          </div>
        </div>
        <div className="bg-white border border-border rounded-md p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-navy rounded-md flex items-center justify-center border-none">
            <Activity className="text-white" size={20} />
          </div>
          <div>
            <p className="text-xs text-text-muted">{tr('serverLatency')}</p>
            <p className="text-base font-bold text-text-primary">{n('14ms')}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horizontal Bar Chart for Leaders */}
        <div className="bg-white border border-border rounded-md p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-2">
              <TrendingUp size={18} className="text-crimson" />
              {language === 'ne' ? 'प्रमुख दलहरूको अडान' : 'Competitive Standing'}
            </h3>
          </div>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topLeaders} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#EDF2F7" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={80} 
                  fontSize={9} 
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#F7FAFC' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-border rounded shadow-sm">
                          <p className="text-xs font-bold text-text-primary">{payload[0].payload.name}</p>
                          <p className="text-sm font-extrabold text-crimson">{n(payload[0].value as number)}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {topLeaders.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aggregated Pie Chart */}
        <div className="bg-white border border-border rounded-md p-4 sm:p-6">
          <h3 className="text-sm sm:text-base font-bold text-text-primary mb-6 flex items-center gap-2">
            <List size={18} className="text-navy" />
            {tr('partyDistribution')}
          </h3>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aggregatedData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ percent }) => `${n(((percent || 0) * 100).toFixed(1))}%`}
                  labelLine={false}
                >
                  {aggregatedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => n(val ?? 0) + '%'} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '10px', fontSize: '9px', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown Toggle */}
      <div className="bg-white border border-border rounded-md overflow-hidden transition-all duration-200">
        <button 
          onClick={() => setShowDetailed(!showDetailed)}
          className="active-scale w-full flex items-center justify-between p-4 sm:p-5 hover:bg-surface transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-navy/10 flex items-center justify-center">
              <List size={16} className="text-navy" />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-bold text-text-primary">
                {language === 'ne' ? 'सबै ६८ दलहरूको विस्तृत विवरण' : 'Full 68-Party Detailed Breakdown'}
              </h4>
              <p className="text-[9px] sm:text-[10px] text-text-muted uppercase tracking-wider">
                {language === 'ne' ? 'प्रत्येक दर्ता गरिएको संस्थाको मत संख्या' : 'Vote counts for every registered entity'}
              </p>
            </div>
          </div>
          {showDetailed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <AnimatePresence>
          {showDetailed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border"
            >
              <div className="p-4 sm:p-5 max-h-[500px] overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {PARTY_RESULTS.map((p, i) => (
                    <div key={p.partyId} className="active-scale flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-3 border border-border rounded hover:border-border-strong transition-colors bg-white">
                      <div className="w-8 h-8 flex items-center justify-center bg-surface rounded shrink-0">
                        <ElectionSymbol symbol={PARTIES.find((p2: PoliticalParty) => p2.id === p.partyId)?.symbol || 'generic'} size={16} />
                      </div>
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <p className="text-[10px] sm:text-xs font-bold text-text-primary truncate">
                          {language === 'ne' ? p.nameNe : p.nameEn}
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-text-muted truncate">
                          {language === 'ne' ? p.nameEn : p.nameNe}
                        </p>
                      </div>
                      <div className="text-center sm:text-right w-full sm:w-auto mt-1 sm:mt-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-border/50">
                        <p className="text-xs font-extrabold text-navy">{n(p.percentage)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ════════ INTERACTIVE MAP ════════ */}
      <NepalElectionMap />

      {/* Audit Link Section */}
      <div className="bg-white border border-border rounded-md p-5 sm:p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-14 h-14 bg-navy rounded-md flex items-center justify-center shrink-0 border-none">
          <History className="text-white" size={28} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-sm sm:text-base font-bold text-text-primary italic mb-1">
            {tr('modernElections')}
          </h4>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto md:mx-0">
            {tr('modernElectionsDesc')}
          </p>
        </div>
        <Link
          href="/results/audit"
          className="active-scale shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white rounded-md text-sm font-bold hover:bg-navy-dark transition-colors no-underline border-none"
        >
          {tr('viewAuditLog')}
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
