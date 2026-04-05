'use client';

import React, { useState, useEffect } from 'react';
import { Rocket, Bell, ShieldCheck, Zap, Percent, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoansPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
    }, 1500);
  };

  const upcomingFeatures = [
    { icon: Zap, text: "Instant Approvals" },
    { icon: Percent, text: "Rates starting at 4.5%" },
    { icon: ShieldCheck, text: "No Hidden Fees" },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden text-gray-900 dark:text-slate-300 transition-colors duration-300">
      
      {/* --- Animated Background Glows --- */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[80px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 dark:bg-indigo-600/10 rounded-full blur-[80px] animate-pulse delay-700"></div>

      <div className={`max-w-2xl w-full z-10 transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* Main Card */}
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
          
          {/* Top Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold text-xs md:text-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Coming Q4 2026
          </div>

          {/* Animated Icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-slate-800 dark:to-slate-800 border border-blue-200 dark:border-slate-700 rounded-3xl flex items-center justify-center mb-8 shadow-lg transition-transform hover:scale-110 duration-300 relative group">
            <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 rounded-3xl blur-xl group-hover:bg-blue-500/30 transition-colors"></div>
            <Rocket size={40} className="text-blue-600 dark:text-blue-400 animate-bounce relative z-10" style={{ animationDuration: '3s' }} />
          </div>

          {/* Headings */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Zorvyn Loans are launching soon.
          </h1>
          <p className="text-gray-500 dark:text-slate-400 max-w-md mx-auto mb-10 leading-relaxed text-sm md:text-base">
            We're building a smarter way to borrow. Get ready for frictionless financing designed to fuel your next big move.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {upcomingFeatures.map((feature, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 px-4 py-2 rounded-xl text-xs md:text-sm font-medium text-gray-600 dark:text-slate-300 shadow-sm animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}
              >
                <feature.icon size={16} className="text-emerald-500" />
                {feature.text}
              </div>
            ))}
          </div>

          {/* Notification Form */}
          <div className="max-w-md mx-auto bg-gray-50 dark:bg-slate-950 p-2 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-inner">
            {isSuccess ? (
              <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 py-3 animate-in zoom-in font-medium">
                <CheckCircle2 size={20} />
                You're on the early access list!
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex items-center relative">
                <div className="pl-4 pr-2 text-gray-400">
                  <Bell size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="Enter email for early access..." 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 group shrink-0"
                >
                  {isSubmitting ? 'Joining...' : 'Notify Me'}
                  {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}