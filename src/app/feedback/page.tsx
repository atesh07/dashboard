'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquareHeart, Star, Send, CheckCircle2, 
  Lightbulb, Bug, Layout, Zap 
} from 'lucide-react';

export default function FeedbackPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !category || !message) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setRating(0);
    setCategory('');
    setMessage('');
  };

  const categories = [
    { id: 'idea', label: 'Feature Idea', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
    { id: 'bug', label: 'Report a Bug', icon: Bug, color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/20' },
    { id: 'design', label: 'Design & UI', icon: Layout, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20' },
    { id: 'performance', label: 'Performance', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  ];

  return (
    <div className="min-h-[85vh] p-4 md:p-8 text-gray-900 dark:text-slate-300 transition-colors duration-300 relative overflow-hidden flex items-center justify-center">
      
      {/* --- Animated Background Glows --- */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-center z-10">
        
        {/* --- LEFT SIDE: Animated Illustration & Text --- */}
        <div className={`lg:col-span-2 space-y-6 text-center lg:text-left transition-all duration-1000 ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="mx-auto lg:mx-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-50 dark:from-slate-800 dark:to-slate-800 border border-blue-200 dark:border-slate-700 rounded-[1.5rem] flex items-center justify-center shadow-lg relative group">
            <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 rounded-[1.5rem] blur-xl group-hover:bg-blue-500/30 transition-colors"></div>
            <MessageSquareHeart size={36} className="text-blue-600 dark:text-blue-400 relative z-10 animate-[bounce_3s_infinite]" />
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              Your voice shapes Zorvyn.
            </h1>
            <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              Whether you found a bug, have a brilliant idea, or just want to tell us how much you love the dashboard, we read every single submission. 
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: Interactive Form Card --- */}
        <div className={`lg:col-span-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {isSuccess ? (
            // Success State Animation
            <div className="h-[400px] flex flex-col items-center justify-center text-center animate-in zoom-in fade-in duration-500">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="animate-[scale-in_0.5s_ease-out]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Feedback Received!</h2>
              <p className="text-gray-500 dark:text-slate-400 mb-8 max-w-xs">
                Thank you for taking the time to help us improve. We're on it!
              </p>
              <button 
                onClick={handleReset}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all hover:scale-105"
              >
                Send another response
              </button>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
              
              {/* Interactive Star Rating */}
              <div className="space-y-3 text-center sm:text-left">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  How would you rate your experience?
                </label>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-all duration-200 hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        size={32} 
                        className={`transition-all duration-300 ${
                          (hoverRating || rating) >= star 
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' 
                            : 'text-gray-300 dark:text-slate-700'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Animated Category Pills */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  What is this regarding?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all duration-300 ${
                        category === cat.id
                          ? `bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20 scale-[1.02]`
                          : `bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800`
                      }`}
                    >
                      <cat.icon size={18} className={category === cat.id ? 'text-white' : cat.color} />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Tell us more
                </label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4} 
                  placeholder="What's on your mind?"
                  className="w-full p-4 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white resize-none transition-all placeholder-gray-400"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={!rating || !category || !message || isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white py-4 rounded-2xl font-semibold text-sm transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-lg flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  <>
                    Send Feedback
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}