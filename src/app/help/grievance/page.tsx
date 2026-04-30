'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Send, 
  AlertTriangle, 
  CheckCircle2,
  Phone,
  Mail,
  Scale
} from 'lucide-react';

export default function GrievanceRedressal() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketId(`ECN-GRV-${Math.floor(Math.random() * 90000) + 10000}`);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="bg-navy text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Scale size={32} className="text-blue-300" />
            <h1 className="text-3xl font-bold tracking-tight">Citizen Grievance Redressal</h1>
          </div>
          <p className="text-lg text-blue-100 max-w-2xl">
            The Election Commission of Nepal provides this formal channel for reporting election irregularities, technical issues, or voter intimidation. Every report is investigated under judicial oversight.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        {!submitted ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-white border border-border p-8 rounded-md shadow-sm space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                    <input required className="w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:border-navy" placeholder="e.g. Rajesh Hamal" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Voter ID (Optional)</label>
                    <input className="w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:border-navy" placeholder="10-digit ID" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Grievance Category</label>
                  <select required className="w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:border-navy">
                    <option value="">Select Category</option>
                    <option value="technical">Technical Error during Voting</option>
                    <option value="accessibility">Accessibility Barrier</option>
                    <option value="integrity">Unfair Election Practices</option>
                    <option value="intimidation">Voter Intimidation</option>
                    <option value="other">Other Concerns</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Description</label>
                  <textarea 
                    required 
                    rows={5} 
                    className="w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:border-navy" 
                    placeholder="Provide specific details, including time, location, or transaction hash if applicable..."
                  />
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 flex gap-3 rounded-md">
                  <AlertTriangle className="text-amber-600 shrink-0" size={18} />
                  <p className="text-[11px] text-amber-800 leading-normal">
                    <b>False Reporting Notice:</b> Providing intentionally false or misleading information to the Election Commission is a punishable offense under the Election Offenses and Punishment Act, 2073.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-navy text-white font-bold rounded-md flex items-center justify-center gap-2 hover:bg-navy-dark transition-colors"
                >
                  <Send size={18} /> Submit Formal Grievance
                </button>
              </motion.form>
            </div>

            <aside className="space-y-6">
              <div className="bg-white border border-border p-6 rounded-md">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Urgent Support</h3>
                <div className="space-y-4">
                  <a href="tel:1102" className="flex items-center gap-3 p-3 bg-white hover:bg-border transition-colors rounded-md text-navy">
                    <Phone size={18} />
                    <div>
                      <p className="text-xs font-bold">Election Hotline</p>
                      <p className="text-xs opacity-80">Dial 1102 (Toll Free)</p>
                    </div>
                  </a>
                  <a href="mailto:grievance@election.gov.np" className="flex items-center gap-3 p-3 bg-white hover:bg-border transition-colors rounded-md text-navy">
                    <Mail size={18} />
                    <div>
                      <p className="text-xs font-bold">Email Support</p>
                      <p className="text-[10px] opacity-80">grievance@election.gov.np</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white border border-border p-6 rounded-md">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Judicial Timeline</h3>
                <ol className="text-xs text-text-secondary space-y-4">
                  <li className="flex gap-3">
                    <span className="w-5 h-5 bg-navy text-white flex items-center justify-center rounded-full shrink-0 font-bold">1</span>
                    <span>Report submitted and ticket ID generated instantly.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-5 h-5 bg-navy text-white flex items-center justify-center rounded-full shrink-0 font-bold">2</span>
                    <span>Evaluation by District Redressal Officer (24-48 hours).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-5 h-5 bg-navy text-white flex items-center justify-center rounded-full shrink-0 font-bold">3</span>
                    <span>Judicial resolution or escalate to Election Court.</span>
                  </li>
                </ol>
              </div>
            </aside>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white border border-border p-12 rounded-md text-center shadow-lg"
          >
            <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Grievance Filed</h2>
            <p className="text-text-secondary mb-8">
              Your report has been securely registered on the Election Ledger. A representative will contact you if further testimony is required.
            </p>
            
            <div className="bg-white p-6 border border-border rounded-md mb-8">
              <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Ticket Reference No.</p>
              <p className="text-2xl font-mono font-bold text-navy">{ticketId}</p>
            </div>

            <button 
              onClick={() => setSubmitted(false)}
              className="text-navy font-bold text-sm uppercase tracking-widest hover:underline"
            >
              Submit another report
            </button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
