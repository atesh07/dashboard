'use client';

import React, { useState, useEffect } from 'react';
import { Headset, BookOpen, Clock, Bell, ArrowRight, CheckCircle2, Search } from 'lucide-react';

export default function SupportComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
    }, 1500);
  };

  const upcomingFeatures = [
    { icon: Clock, text: "24/7 Live Chat" },
    { icon: BookOpen, text: "AI Knowledge Base" },
    { icon: Search, text: "Smart Ticket Tracking" },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden text-gray-900 dark:text-slate-300 transition-colors duration-300">
      
      {/* --- Animated Background Glows (Emerald/Teal hue for Support) --- */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-emerald-500/20 dark:bg-emerald-600/10 rounded-full blur-[80px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-500/20 dark:bg-teal-600/10 rounded-full blur-[80px] animate-pulse delay-500"></div>

      <div className={`max-w-2xl w-full z-10 transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs md:text-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Arriving Soon
          </div>

          {/* Animated Support Icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-slate-800 dark:to-slate-800 border border-emerald-200 dark:border-slate-700 rounded-[2rem] flex items-center justify-center mb-8 shadow-lg transition-transform hover:scale-110 duration-300 relative group">
            <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-[2rem] blur-xl group-hover:bg-emerald-500/30 transition-colors"></div>
            {/* Soft pulsing scale animation for the headset */}
            <Headset size={40} className="text-emerald-600 dark:text-emerald-400 relative z-10 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            A New Support Experience
          </h1>
          <p className="text-gray-500 dark:text-slate-400 max-w-md mx-auto mb-10 leading-relaxed text-sm md:text-base">
            We're upgrading our help center. Soon, you'll have access to 24/7 dedicated agents and a lightning-fast AI knowledge base to solve any issue instantly.
          </p>

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

          <div className="max-w-md mx-auto bg-gray-50 dark:bg-slate-950 p-2 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-inner">
            {isSuccess ? (
              <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 py-3 animate-in zoom-in font-medium">
                <CheckCircle2 size={20} />
                You're on the priority notification list!
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex items-center relative">
                <div className="pl-4 pr-2 text-gray-400">
                  <Bell size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="Get notified when Support goes live..." 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center gap-2 group shrink-0"
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