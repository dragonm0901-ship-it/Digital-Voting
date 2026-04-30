'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useVotingStore } from '@/store/voting-store';
import { t } from '@/lib/i18n';
import { Globe, Type, SunMoon, Menu, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { toLocaleNumber } from '@/lib/numbers';

export default function Header() {
  const { language, toggleLanguage, isHighContrast, setHighContrast, textSize, setTextSize } = useVotingStore();
  const tr = (key: Parameters<typeof t>[1]) => t(language, key);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync state to HTML document classes
  useEffect(() => {
    const html = document.documentElement;
    if (isHighContrast) html.classList.add('high-contrast');
    else html.classList.remove('high-contrast');

    html.classList.remove('text-size-lg', 'text-size-xl');
    if (textSize !== 'normal') {
      html.classList.add(`text-size-${textSize}`);
    }
  }, [isHighContrast, textSize]);

  const navLinks = [
    { key: 'votingPractice', href: '/edu/sandbox' },
    { key: 'privacy', href: '/legal/privacy' },
    { key: 'commission', href: '/admin/dashboard' },
    { key: 'security', href: '/accessibility/compliance' },
    { key: 'help', href: '/help/grievance' },
  ];

  return (
    <>
      {/* Government color band */}
      <div className="gov-band no-print" />

      {/* Accessibility Header Bar */}
      <div className="bg-navy py-2 px-4 sm:px-6 lg:px-8 text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-[0.1em] flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 no-print border-b border-white/10 shadow-sm">
        {/* Contrast Toggle */}
        <button
          onClick={() => setHighContrast(!isHighContrast)}
          className="active-scale flex items-center gap-2 px-3 py-1 bg-white/10 rounded-md hover:bg-white/20 hover:text-white transition-all focus:outline-none border border-white/5"
          aria-label="Toggle High Contrast"
        >
          <SunMoon size={12} className={isHighContrast ? 'text-crimson' : 'text-white'} />
          <span className="whitespace-nowrap">{isHighContrast ? 'Normal Contrast' : 'High Contrast'}</span>
        </button>

        {/* Text Size Controls */}
        <div className="flex items-center gap-2 sm:gap-3 sm:border-l border-white/20 sm:pl-8">
          <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
            <Type size={12} className="text-white" />
            <span className="opacity-100 whitespace-nowrap">Text Size:</span>
          </div>
          <div className="flex bg-black/20 p-0.5 rounded-md border border-white/5">
            {[
              { id: 'normal', label: 'Normal' },
              { id: 'lg', label: 'Large' },
              { id: 'xl', label: 'Max' }
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setTextSize(size.id as "normal" | "lg" | "xl")}
                className={`active-scale px-2.5 sm:px-3 py-0.5 rounded-md transition-all text-[8px] sm:text-[9px] ${
                  textSize === size.id 
                    ? 'bg-crimson text-white shadow-md' 
                    : 'text-white hover:bg-white/5'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skip to content */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <nav
        className="sticky top-0 z-50 bg-white border-b border-border no-print shadow-sm overflow-hidden"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.18]" 
          style={{ 
            backgroundImage: "url('/images/header%20background%202.jpeg')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline group"
            aria-label="MATDAAN — Go to home"
          >
            <Image 
              src="/images/Nepal%20flag.png" 
              alt="Nepal Flag" 
              width={40}
              height={40}
              className="object-contain shrink-0 transition-transform group-hover:scale-110" 
            />
            <div>
              <h1 className="text-lg font-bold tracking-tight text-text-primary leading-tight m-0">
                {tr('siteTitle')}
              </h1>
              <div className="w-16 h-0.5 bg-crimson rounded-full my-1" aria-hidden="true" />
              <p className="text-[10px] uppercase tracking-[0.15em] text-navy font-semibold m-0">
                {tr('siteSubtitle')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 px-8 self-stretch">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="active-scale text-xs font-bold uppercase tracking-widest text-black hover:text-navy transition-colors no-underline relative group"
              >
                {tr(link.key as Parameters<typeof t>[1])}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-navy transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              aria-label={tr('switchLanguage')}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-border rounded-md bg-white text-sm font-semibold text-text-secondary hover:bg-surface hover:border-border-strong transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Globe size={16} className="text-navy" aria-hidden="true" />
              <span className="hidden sm:inline">{tr('switchLanguage')}</span>
              <span className="sm:hidden">{language === 'en' ? 'ने' : 'EN'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-text-primary hover:bg-surface rounded-md transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border bg-white overflow-hidden shadow-xl"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="active-scale flex justify-between items-center px-4 py-3 bg-surface rounded-md text-xs font-bold uppercase tracking-widest text-text-primary no-underline hover:bg-navy/5 transition-colors border border-border/50"
                  >
                    {tr(link.key as Parameters<typeof t>[1])}
                    <ExternalLink size={14} className="text-text-muted" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
