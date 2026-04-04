'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ArrowUpRight, ArrowDownLeft, Plus, Copy, Calendar, Download, Sparkles, UserCircle2 } from 'lucide-react';

import { cashflowData, initialTransactions, initialSavingsGoals, PIE_COLORS } from '../src/app/data/mockData';
import { MetricCard } from '../src/app/components/ui/MetricCard';
import { TransactionModal } from '../src/app/components/models/TransactionModal';
import { GoalModal } from '../src/app/components/models/GoalModal';
import { RecentActivity } from '../src/app/components/dashboard/RecentActivity';
import { CashflowChart } from '../src/app/components/dashboard/CashflowChart';
import { CategoryBreakdown } from '../src/app/components/dashboard/CategoryBreakdown';
import { SavingsGoalsPanel } from '../src/app/components/dashboard/SavingsGoalsPanel';

export default function Dashboard() {
  const [role, setRole] = useState<'admin' | 'viewer'>('admin');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLines, setVisibleLines] = useState({ income: true, expense: true });
  const [animateProgress, setAnimateProgress] = useState(false);

  const [transactions, setTransactions] = useState(initialTransactions);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({ name: '', amount: '', type: 'expense', category: '' });

  const [savingsGoals, setSavingsGoals] = useState(initialSavingsGoals);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', current: '' });

  useEffect(() => {
    const savedTxs = localStorage.getItem('zorvyn_txs');
    const savedGoals = localStorage.getItem('zorvyn_goals');
    if (savedTxs) try { setTransactions(JSON.parse(savedTxs)); } catch (e) {}
    if (savedGoals) try { setSavingsGoals(JSON.parse(savedGoals)); } catch (e) {}
    
    const timer = setTimeout(() => setAnimateProgress(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('zorvyn_txs', JSON.stringify(transactions));
    localStorage.setItem('zorvyn_goals', JSON.stringify(savingsGoals));
  }, [transactions, savingsGoals]);

  const filteredTransactions = useMemo(() => {
    let result = transactions.filter(tx => {
      const matchesFilter = filterType === 'all' || tx.type === filterType;
      const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    result.sort((a, b) => sortOrder === 'newest' ? b.id - a.id : a.id - b.id);
    return result;
  }, [transactions, filterType, searchQuery, sortOrder]);

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return { message: "Great job! You have no expenses recorded." };
    const topCategory = expenses.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))[0];
    return { message: `Highest expense recently was ${topCategory?.category} (${topCategory?.name}) at $${Math.abs(topCategory?.amount || 0).toFixed(2)}.` };
  }, [transactions]);

  const dynamicBalance = useMemo(() => {
    const baseBalance = 24847.84;
    const addedIncome = transactions.filter(t => t.id > 20 && t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const addedExpense = transactions.filter(t => t.id > 20 && t.type === 'expense').reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
    return baseBalance + addedIncome - addedExpense;
  }, [transactions]);

  const expensesByCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
      return acc;
    }, {} as Record<string, number>);
    
    return Object.keys(grouped)
      .map((key, index) => ({ name: key, value: grouped[key], fill: PIE_COLORS[index % PIE_COLORS.length] }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const handleActionClick = (actionType: 'transfer' | 'receive' | 'quick') => {
    if (role !== 'admin') return alert("Viewer Mode: Action restricted.");
    if (actionType === 'transfer') setNewTx({ name: '', amount: '', type: 'expense', category: 'Transfer' });
    if (actionType === 'receive') setNewTx({ name: '', amount: '', type: 'income', category: 'Deposit' });
    if (actionType === 'quick') setNewTx({ name: 'Quick Contact', amount: '', type: 'expense', category: 'Transfer' });
    setIsTxModalOpen(true);
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.name || !newTx.amount || !newTx.category) return;
    const amountNum = parseFloat(newTx.amount);
    const finalAmount = newTx.type === 'expense' ? -Math.abs(amountNum) : Math.abs(amountNum);
    
    const transaction = {
      id: Date.now(), name: newTx.name, category: newTx.category,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      amount: finalAmount, type: newTx.type, icon: newTx.name.charAt(0).toUpperCase(),
      color: newTx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
    };
    
    setTransactions([transaction, ...transactions]);
    setIsTxModalOpen(false);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target || !newGoal.current) return;
    const goal = {
      id: Date.now(), name: newGoal.name, target: parseFloat(newGoal.target),
      current: parseFloat(newGoal.current), color: 'bg-emerald-500', iconName: 'Target', timeLeft: 'Ongoing'
    };
    setSavingsGoals([...savingsGoals, goal]);
    setIsGoalModalOpen(false);
  };

  const handleExportCSV = () => {
    const csvContent = ["ID,Name,Category,Date,Amount,Type", ...transactions.map(t => `${t.id},"${t.name}","${t.category}","${t.date}",${t.amount},${t.type}`)].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }));
    link.download = "zorvyn_transactions_export.csv";
    link.click();
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans p-4 sm:p-6 lg:p-8 transition-colors duration-300 relative min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-8 gap-4 w-full">
        <div className="w-full md:w-auto flex flex-col sm:flex-row sm:items-center justify-between md:justify-start gap-4">
          <h2 className="text-xl font-medium text-gray-500 dark:text-slate-400">Welcome back, <span className="font-bold  text-gray-900 dark:text-white">Ehtesham </span></h2>
          <div className="flex items-center space-x-2 bg-gray-200/50 dark:bg-slate-800 p-1 rounded-lg w-fit">
            <button onClick={() => setRole('admin')} className={`px-3 py-1.5 text-xs font-medium rounded-md ${role === 'admin' ? 'dark:bg-slate-800 shadow-sm' : 'text-gray-500 '}`}>Admin</button>
            <button onClick={() => setRole('viewer')} className={`px-3 py-1.5 text-xs font-medium rounded-md ${role === 'viewer' ? 'dark:bg-slate-800 shadow-sm' : 'text-gray-500 '}`}>Viewer</button>
          </div>
        </div>

        <div className="flex w-full md:w-auto space-x-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-white dark:bg-slate-800 border rounded-xl text-sm font-medium"><Calendar className="w-4 h-4 mr-2" /> Today</button>
          <button onClick={handleExportCSV} className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-sm"><Download className="w-4 h-4 mr-2" /> Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4"><h3 className="text-sm font-medium text-gray-500">Zorvyn Balance</h3></div>
            <div className="flex items-baseline space-x-3 mb-6"><h1 className="text-3xl sm:text-4xl font-extrabold">${dynamicBalance.toLocaleString()}</h1></div>
            <div className="flex items-center text-sm text-gray-500 mb-6 bg-white dark:bg-slate-900/50 w-fit px-3 py-1.5 rounded-lg border font-mono">7484 7475 8383 9384 <Copy onClick={() => navigator.clipboard.writeText('7484747583839384')} className="w-4 h-4 ml-3 cursor-pointer hover:text-blue-500" /></div>
            <div className="flex space-x-3 mt-4">
              <button onClick={() => handleActionClick('transfer')} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center"><ArrowUpRight className="w-4 h-4 mr-2" /> Transfer</button>
              <button onClick={() => handleActionClick('receive')} className="flex-1 bg-white border dark:bg-slate-800 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center"><ArrowDownLeft className="w-4 h-4 mr-2" /> Receive</button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-gray-100">
             <h3 className="text-sm font-bold mb-4">Quick Transfer</h3>
             <div className="flex items-center space-x-3 overflow-x-auto hide-scrollbar">
               <button onClick={() => handleActionClick('quick')} className="w-10 h-10 rounded-full border border-dashed flex items-center justify-center text-gray-400 shrink-0"><Plus className="w-5 h-5" /></button>
               {[1, 2, 3, 4].map(i => <UserCircle2 key={i} className="w-10 h-10 text-gray-300 shrink-0 cursor-pointer hover:ring-2 ring-blue-500 rounded-full" />)}
             </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-3xl border flex space-x-4 items-start">
              <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 shrink-0"><Sparkles className="w-5 h-5" /></div>
              <div><h3 className="text-sm font-bold text-indigo-900 mb-1">Smart Insight</h3><p className="text-xs text-indigo-700">{insights.message}</p></div>
          </div>

          <RecentActivity 
            filteredTransactions={filteredTransactions} searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
            filterType={filterType} setFilterType={setFilterType} sortOrder={sortOrder} setSortOrder={setSortOrder} 
            role={role} onAdd={() => { setNewTx({ name: '', amount: '', type: 'expense', category: '' }); setIsTxModalOpen(true); }} 
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            <MetricCard title="Monthly Spent" amount="$45,623.48" trend="↑ 16.5%" trendColor="dark:bg-slate-800 dark:border text-red-500 bg-red-50" />
            <MetricCard title="Monthly Income" amount="$84,884.80" trend="↑ 12.8%" trendColor="dark:bg-slate-800 dark:border text-green-600 bg-green-50" />
          </div>

          <CashflowChart data={cashflowData} visibleLines={visibleLines} onToggleLine={(l) => setVisibleLines(p => ({...p, [l]: !p[l]}))} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full flex-1">
            <CategoryBreakdown expensesByCategory={expensesByCategory} />
            <SavingsGoalsPanel savingsGoals={savingsGoals} role={role} onAddGoal={() => setIsGoalModalOpen(true)} animateProgress={animateProgress} />
          </div>
        </div>
      </div>

      <TransactionModal isOpen={isTxModalOpen} onClose={() => setIsTxModalOpen(false)} onSubmit={handleAddTransaction} newTx={newTx} setNewTx={setNewTx} />
      <GoalModal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} onSubmit={handleAddGoal} newGoal={newGoal} setNewGoal={setNewGoal} />

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}