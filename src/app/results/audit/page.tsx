'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { AUDIT_ENTRIES } from '@/lib/constants';
import { ArrowLeft, Search, Server, Cpu } from 'lucide-react';

export default function AuditPage() {
  const { language } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);
  const [searchTerm, setSearchTerm] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const filteredEntries = AUDIT_ENTRIES.filter(
    (entry) =>
      entry.eventId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back link */}
      <Link
        href="/results"
        className="inline-flex items-center gap-2 text-navy hover:text-navy-dark transition-colors text-sm font-bold no-underline group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {tr('backToResults')}
      </Link>

      <div className="bg-white border border-border rounded-[3px] p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-1">{tr('auditTitle')}</h2>
            <p className="text-sm text-text-secondary">{tr('auditSubtitle')}</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={tr('searchTxHash')}
              className="border border-border rounded-[3px] pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:border-navy transition-colors w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>{tr('timestamp')}</th>
                <th>{tr('eventId')}</th>
                <th>{tr('action')}</th>
                <th>{tr('status')}</th>
                <th>{tr('nodeSignature')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((log, i) => (
                <tr key={i}>
                  <td className="font-mono text-xs text-text-muted whitespace-nowrap">
                    {today} {log.timestamp}
                  </td>
                  <td className="font-mono text-xs text-navy font-medium">{log.eventId}</td>
                  <td className="text-xs text-text-primary font-semibold">{log.action}</td>
                  <td>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-[2px] ${
                        log.status === 'Verified' || log.status === 'Finalized'
                          ? 'badge-verified'
                          : log.status === 'Healthy' || log.status === 'Success'
                            ? 'badge-info'
                            : 'badge-pending'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="font-mono text-xs text-text-faint">{log.nodeSignature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer stats */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Server size={14} />
              {tr('activeNodes')}: 77/77
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu size={14} />
              {tr('latency')}: 4ms
            </span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-navy rounded-[3px] text-white hover:bg-navy-dark transition-colors cursor-pointer text-xs font-medium border-none">
              {tr('exportCsv')}
            </button>
            <button className="px-3 py-1.5 bg-navy rounded-[3px] text-white hover:bg-navy-dark transition-colors cursor-pointer text-xs font-medium border-none">
              {tr('viewRawJson')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
