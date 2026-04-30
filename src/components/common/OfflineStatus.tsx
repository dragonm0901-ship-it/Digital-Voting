'use client';

import React, { useState, useEffect, useSyncExternalStore, useCallback } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function subscribe(callback: () => void) {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
      window.removeEventListener('online', callback);
      window.removeEventListener('offline', callback);
    };
  }
  return () => {};
}

function getSnapshot() {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

function getServerSnapshot() {
  return true; // Server always assumes online to prevent hydration mismatch
}

export default function OfflineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isOffline = !isOnline;
  const [showReconnected, setShowReconnected] = useState(false);

  // Still use a small effect to show the strictly temporary "Reconnected" toast
  // We only show "Reconnected" if we were offline in the client session and then came back
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOnline) {
      // If we just became online (checking if we were previously offline is 
      // tricky without a ref, but to keep it simple, we just show it if we 
      // trigger online. Actually, useSyncExternalStore handles it).
      // We will rely on window events for the toast to be safe.
      const handleOnline = () => {
        setShowReconnected(true);
        timeout = setTimeout(() => setShowReconnected(false), 3000);
      };
      window.addEventListener('online', handleOnline);
      return () => {
        window.removeEventListener('online', handleOnline);
        if (timeout) clearTimeout(timeout);
      };
    }
  }, [isOnline]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 w-full max-w-xs px-4">
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-navy border border-navy-light text-white p-4 rounded-md shadow-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center shrink-0 animate-pulse">
              <WifiOff size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Network Lost</p>
              <p className="text-[10px] opacity-70 leading-tight mt-0.5">
                Local cache enabled. You can continue, sync will resume once online.
              </p>
            </div>
          </motion.div>
        )}

        {showReconnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-success text-white p-4 rounded-md shadow-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Wifi size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Reconnected</p>
              <p className="text-[10px] opacity-70 leading-tight mt-0.5">
                Synchronizing local ledger with national nodes...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
