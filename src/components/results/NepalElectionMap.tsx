'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { NEPAL_PROVINCES, ProvinceMapData } from '@/lib/nepal-map-data';
import { MapPin, Users, Vote, TrendingUp, ChevronRight, X } from 'lucide-react';

export default function NepalElectionMap() {
  const { language } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);

  const [selectedProvince, setSelectedProvince] = useState<ProvinceMapData | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const formatNumber = (n: number): string => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toString();
  };

  const getTurnoutColor = (turnout: number): string => {
    if (turnout >= 75) return '#16A34A';
    if (turnout >= 65) return '#003893';
    if (turnout >= 55) return '#D97706';
    return '#DC143C';
  };

  return (
    <div className="bg-white border border-border rounded-[3px] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <MapPin size={18} className="text-crimson" />
            {tr('mapTitle')}
          </h3>
          <p className="text-xs text-text-muted mt-1">{tr('mapSubtitle')}</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" /> {'>'}75%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#003893]" /> 65-75%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" /> 55-65%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC143C]" /> {'<'}55%
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Map Area */}
        <div className="flex-1 p-4 sm:p-6 flex items-center justify-center relative min-h-[400px]">
          {/* Displaying provided map image */}
          <img
            src="/nepal-map-external.webp"
            alt="Nepal Provinces Map"
            className="w-full max-w-[700px] h-auto object-contain"
          />
          
          {/* Overlaying clickable regions over the image for functions */}
          <div className="absolute inset-0 w-full h-full max-w-[700px] mx-auto flex">
             {/* We will add click handlers for the 7 provinces here using roughly positioned divs for now */}
             <div onClick={() => setSelectedProvince(NEPAL_PROVINCES.find(p => p.id === '7') || null)} className="absolute w-[20%] h-[35%] left-[5%] top-[15%] cursor-pointer hover:bg-white/30 transition-colors rounded-full" title="Sudurpashchim" />
             <div onClick={() => setSelectedProvince(NEPAL_PROVINCES.find(p => p.id === '6') || null)} className="absolute w-[25%] h-[40%] left-[20%] top-[10%] cursor-pointer hover:bg-white/30 transition-colors rounded-full" title="Karnali" />
             <div onClick={() => setSelectedProvince(NEPAL_PROVINCES.find(p => p.id === '5') || null)} className="absolute w-[20%] h-[25%] left-[30%] top-[45%] cursor-pointer hover:bg-white/30 transition-colors rounded-full" title="Lumbini" />
             <div onClick={() => setSelectedProvince(NEPAL_PROVINCES.find(p => p.id === '4') || null)} className="absolute w-[20%] h-[35%] left-[45%] top-[30%] cursor-pointer hover:bg-white/30 transition-colors rounded-full" title="Gandaki" />
             <div onClick={() => setSelectedProvince(NEPAL_PROVINCES.find(p => p.id === '3') || null)} className="absolute w-[20%] h-[30%] left-[55%] top-[55%] cursor-pointer hover:bg-white/30 transition-colors rounded-full" title="Bagmati" />
             <div onClick={() => setSelectedProvince(NEPAL_PROVINCES.find(p => p.id === '2') || null)} className="absolute w-[20%] h-[15%] left-[55%] top-[80%] cursor-pointer hover:bg-white/30 transition-colors rounded-full" title="Madhesh" />
             <div onClick={() => setSelectedProvince(NEPAL_PROVINCES.find(p => p.id === '1') || null)} className="absolute w-[25%] h-[35%] left-[70%] top-[60%] cursor-pointer hover:bg-white/30 transition-colors rounded-full" title="Koshi" />
          </div>
        </div>

        {/* Info panel */}
        <AnimatePresence mode="wait">
          {selectedProvince ? (
            <motion.div
              key={selectedProvince.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l border-border bg-surface overflow-y-auto max-h-[500px]"
            >
              {/* Province header */}
              <div className="px-5 py-4 bg-navy text-white flex justify-between items-center sticky top-0 z-10">
                <div>
                  <h4 className="text-sm font-bold">
                    {language === 'ne' ? selectedProvince.nameNe : selectedProvince.name}
                  </h4>
                  <p className="text-[10px] text-white/70 mt-0.5">
                    {tr('capital')}: {language === 'ne' ? selectedProvince.capitalNe : selectedProvince.capital}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProvince(null)}
                  className="w-7 h-7 bg-white/10 hover:bg-white/20 rounded-[2px] flex items-center justify-center transition-colors cursor-pointer border-none"
                  aria-label="Close panel"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>

              {/* Province stats */}
              <div className="grid grid-cols-3 gap-px bg-border">
                <div className="bg-white px-3 py-3 text-center">
                  <p className="text-lg font-extrabold text-navy">{selectedProvince.turnout}%</p>
                  <p className="text-[9px] text-text-muted uppercase font-bold tracking-wider">{tr('turnout')}</p>
                </div>
                <div className="bg-white px-3 py-3 text-center">
                  <p className="text-lg font-extrabold text-text-primary">{formatNumber(selectedProvince.totalVoters)}</p>
                  <p className="text-[9px] text-text-muted uppercase font-bold tracking-wider">{tr('registered')}</p>
                </div>
                <div className="bg-white px-3 py-3 text-center">
                  <p className="text-lg font-extrabold text-crimson">{formatNumber(selectedProvince.votesCast)}</p>
                  <p className="text-[9px] text-text-muted uppercase font-bold tracking-wider">{tr('cast')}</p>
                </div>
              </div>

              {/* Districts list */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    {tr('districts')} ({selectedProvince.districts.length})
                  </p>
                </div>
                <div className="space-y-1.5">
                  {selectedProvince.districts.map((district, idx) => (
                    <motion.div
                      key={district.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="bg-white border border-border rounded-[2px] px-3 py-2.5 hover:border-navy/30 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-text-primary">
                          {language === 'ne' ? district.nameNe : district.name}
                        </span>
                        <span
                          className="text-[10px] font-extrabold"
                          style={{ color: getTurnoutColor(district.turnout) }}
                        >
                          {district.turnout}%
                        </span>
                      </div>
                      {/* Turnout bar */}
                      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden mb-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${district.turnout}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.03 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: getTurnoutColor(district.turnout) }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-text-muted">
                          {formatNumber(district.votesCast)} / {formatNumber(district.totalVoters)}
                        </span>
                        <span className="flex items-center gap-1 text-[9px] font-semibold" style={{ color: district.leadingPartyColor }}>
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{ backgroundColor: district.leadingPartyColor }}
                          />
                          {district.leadingParty}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l border-border bg-surface flex flex-col items-center justify-center p-8 text-center min-h-[300px]"
            >
              <div className="w-14 h-14 bg-navy rounded-[3px] flex items-center justify-center mb-4">
                <MapPin className="text-white" size={24} />
              </div>
              <p className="text-sm font-bold text-text-primary mb-1">{tr('selectProvince')}</p>
              <p className="text-xs text-text-muted max-w-[250px] leading-relaxed">{tr('selectProvinceDesc')}</p>
              {/* Quick overview */}
              <div className="mt-6 w-full space-y-2">
                {NEPAL_PROVINCES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProvince(p)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-white border border-border rounded-[2px] text-xs hover:border-navy/30 transition-colors cursor-pointer group"
                  >
                    <span className="font-semibold text-text-primary">
                      {language === 'ne' ? p.nameNe : p.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <span
                        className="font-bold"
                        style={{ color: getTurnoutColor(p.turnout) }}
                      >
                        {p.turnout}%
                      </span>
                      <ChevronRight size={12} className="text-text-faint group-hover:text-navy transition-colors" />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
