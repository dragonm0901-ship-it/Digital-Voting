'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StepIndicator from '@/components/layout/StepIndicator';
import ContextualSidebar from '@/components/layout/ContextualSidebar';

export default function VoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StepIndicator />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-8 text-left">
          {/* Strict 12-column grid compartmentalization with solid 1px borders */}
          <div className="grid grid-cols-12 gap-0 border border-border bg-white min-h-[500px]">
            <div className="col-span-12 lg:col-span-8 p-6 sm:p-10 relative">
              {children}
            </div>
            <div className="col-span-12 lg:col-span-4 bg-surface flex flex-col">
              <ContextualSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
