'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Lock, Bell, Globe, Camera, Save, 
  CheckCircle2, ShieldAlert, Smartphone
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Form States (Pre-filled for Atesh)
  const [profile, setProfile] = useState({
    firstName: 'Atesh',
    lastName: 'Tech',
    email: 'atesh@example.com',
    role: 'Content Creator & Developer',
    bio: 'Building awesome tech content and coding functional UIs.'
  });

  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailAlerts: true,
    pushNotifications: false,
    monthlyDigest: true,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'profile', label: 'Edit Profile', icon: User, desc: 'Personal info and avatar' },
    { id: 'security', label: 'Security', icon: Lock, desc: 'Passwords and 2FA' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Manage your alerts' },
    { id: 'preferences', label: 'Preferences', icon: Globe, desc: 'Language and region' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 text-gray-900 dark:text-slate-300 transition-colors duration-300 overflow-x-hidden relative">
      
      {/* --- Success Toast --- */}
      <div className={`fixed top-8 right-8 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <CheckCircle2 size={20} />
        <span className="font-semibold text-sm">Settings saved successfully!</span>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className={`transition-all flex items-center gap-2 duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Settings
          </h1>
          <p className="text-gray-500 dark:text-slate-400">Manage your account settings and preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* --- LEFT SIDEBAR: Vertical Tabs --- */}
          <div className={`md:w-1/3 lg:w-1/4 flex flex-col gap-2 transition-all duration-700 delay-100 ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-start p-4 rounded-[1.5rem] transition-all duration-300 border text-left ${
                    isActive 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20 scale-[1.02]' 
                      : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-gray-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <tab.icon size={18} className={isActive ? 'text-white' : 'text-gray-400 dark:text-slate-500'} />
                    <span className="font-bold text-sm">{tab.label}</span>
                  </div>
                  <span className={`text-xs pl-7 ${isActive ? 'text-blue-100' : 'text-gray-400 dark:text-slate-500'}`}>
                    {tab.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* --- RIGHT CONTENT AREA --- */}
          <div className={`md:w-2/3 lg:w-3/4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-sm dark:shadow-xl transition-all duration-700 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            <form onSubmit={handleSave} className="h-full flex flex-col">
              
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Public Profile</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">This is how others will see you on the platform.</p>
                  </div>

                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6">
                    <div className="relative group cursor-pointer">
                      <img 
                        src="https://pbs.twimg.com/profile_images/1335140657736847362/_QfZWzUv_400x400.jpg" 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white w-8 h-8" />
                      </div>
                    </div>
                    <div>
                      <button type="button" className="px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white rounded-xl text-sm font-semibold transition-colors mb-2">
                        Change Avatar
                      </button>
                      <p className="text-xs text-gray-400 dark:text-slate-500">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">First Name</label>
                      <input type="text" value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">Last Name</label>
                      <input type="text" value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">Role / Headline</label>
                    <input type="text" value={profile.role} onChange={(e) => setProfile({...profile, role: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">Bio</label>
                    <textarea rows={3} value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white resize-none transition-colors"></textarea>
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Password & Security</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Keep your account safe and secure.</p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-lg shrink-0">
                        <ShieldAlert size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 max-w-sm">Add an extra layer of security to your account by requiring a code from your mobile device.</p>
                      </div>
                    </div>
                    {/* Custom Toggle Switch */}
                    <button 
                      type="button" 
                      onClick={() => handleToggle('twoFactor')}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggles.twoFactor ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${toggles.twoFactor ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Change Password</h3>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Notification Preferences</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Choose what updates you want to receive.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-6">
                      <div className="pr-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Email Alerts</h3>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Receive emails about account activity and security.</p>
                      </div>
                      <button type="button" onClick={() => handleToggle('emailAlerts')} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggles.emailAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}>
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${toggles.emailAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-6">
                      <div className="pr-4 flex items-center gap-2">
                        <Smartphone size={16} className="text-gray-400" />
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Push Notifications</h3>
                          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Get pinged on your browser when transfers complete.</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => handleToggle('pushNotifications')} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggles.pushNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}>
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${toggles.pushNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-6">
                      <div className="pr-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Monthly Digest</h3>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">A monthly email summarizing your cashflow and savings.</p>
                      </div>
                      <button type="button" onClick={() => handleToggle('monthlyDigest')} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggles.monthlyDigest ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}>
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${toggles.monthlyDigest ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PREFERENCES TAB */}
              {activeTab === 'preferences' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Global Preferences</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Customize how Zorvyn looks and feels.</p>
                  </div>
                  
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl">
                    <p className="text-sm text-amber-800 dark:text-amber-500"><strong>Note:</strong> Dark Mode toggling is managed directly from the sun/moon icon in the top header menu.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">Display Language</label>
                      <select className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white transition-colors appearance-none">
                        <option>English (US)</option>
                        <option>Spanish (ES)</option>
                        <option>French (FR)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">Default Currency</label>
                      <select className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white transition-colors appearance-none">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>INR (₹)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* SAVE BUTTON (Always fixed at bottom) */}
              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 active:scale-95 shadow-md flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Save Changes <Save size={16} /></>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}