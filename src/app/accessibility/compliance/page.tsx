'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useVotingStore } from '@/store/voting-store';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Keyboard, MousePointerClick, MessageSquare } from 'lucide-react';

export default function AccessibilityPage() {
  const { language } = useVotingStore();

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-border rounded-md p-8 md:p-12 shadow-sm"
        >
          <div className="border-b border-border pb-8 mb-8">
            <h1 className="text-3xl font-extrabold text-text-primary mb-4">Accessibility Compliance (WCAG 2.1)</h1>
            <p className="text-text-secondary leading-relaxed">
              The Digital Nepal 2025 initiative is committed to ensuring that every citizen, regardless of physical or cognitive ability, can exercise their right to vote with dignity and independence.
            </p>
          </div>

          <div className="grid gap-8">
            <section>
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <ShieldCheck className="text-success" size={24} />
                Compliance Status
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                This platform is engineered to meet <b>WCAG 2.1 Level AAA</b> standards. Our development cycle includes regular audits using automated tools (Lighthouse, Axe) and manual testing with screen reader software (NVDA, VoiceOver).
              </p>
            </section>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 border border-border rounded-md hover:border-navy/30 transition-colors">
                <Eye className="text-navy mb-4" size={24} />
                <h3 className="font-bold mb-2">Visual Accessibility</h3>
                <ul className="text-xs text-text-secondary space-y-2 list-disc pl-4">
                  <li>High-contrast theme (4.5:1 contrast ratio minimum)</li>
                  <li>Scalable typography up to 200% without loss of content</li>
                  <li>Support for dark mode and reduced motion preferences</li>
                </ul>
              </div>

              <div className="p-6 border border-border rounded-md hover:border-navy/30 transition-colors">
                <Keyboard className="text-navy mb-4" size={24} />
                <h3 className="font-bold mb-2">Keyboard Navigation</h3>
                <ul className="text-xs text-text-secondary space-y-2 list-disc pl-4">
                  <li>Full keyboard operability for all interactive elements</li>
                  <li>Visible focus indicators for all buttons and links</li>
                  <li>"Skip to Main Content" bypass links on every page</li>
                </ul>
              </div>

              <div className="p-6 border border-border rounded-md hover:border-navy/30 transition-colors">
                <MousePointerClick className="text-navy mb-4" size={24} />
                <h3 className="font-bold mb-2">Cognitive Clarity</h3>
                <ul className="text-xs text-text-secondary space-y-2 list-disc pl-4">
                  <li>Simple, unambiguous language and iconography</li>
                  <li>Predictable navigation and consistent layout</li>
                  <li>No time-limited interactions during the ballot casting</li>
                </ul>
              </div>

              <div className="p-6 border border-border rounded-md hover:border-navy/30 transition-colors">
                <MessageSquare className="text-navy mb-4" size={24} />
                <h3 className="font-bold mb-2">Screen Reader Optimization</h3>
                <ul className="text-xs text-text-secondary space-y-2 list-disc pl-4">
                  <li>Semantic HTML5 structure and ARIA landmarks</li>
                  <li>Descriptive alt text for all symbols and icons</li>
                  <li>Live regions for dynamic status updates (e.g. "Casting Vote")</li>
                </ul>
              </div>
            </div>

            <section className="bg-navy/5 p-8 rounded-md mt-4">
              <h2 className="text-lg font-bold mb-3">Accessibility Help & Feedback</h2>
              <p className="text-sm text-text-secondary mb-4">
                If you encounter any barriers while using this platform, please reach out to our dedicated accessibility desk. We prioritize all accessibility-related bug reports.
              </p>
              <button className="px-6 py-3 bg-navy text-white font-bold text-sm rounded-md hover:bg-navy-dark">
                Report Accessibility Issue
              </button>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
