export const cashflowData = [
  { name: 'Dec', income: 4200, expense: 2400 },
  { name: 'Jan', income: 3800, expense: 1800 },
  { name: 'Feb', income: 5200, expense: 3200 },
  { name: 'Mar', income: 4500, expense: 2900 },
  { name: 'Apr', income: 6100, expense: 4100 },
  { name: 'May', income: 5800, expense: 3800 },
  { name: 'Jun', income: 7200, expense: 4300 },
];

export const initialTransactions = [
  { id: 16, name: 'PayPal', category: 'Freelance', date: '16 Jul 2024', amount: 848.84, type: 'income', icon: 'P', color: 'bg-blue-100 text-blue-600' },
  { id: 15, name: 'Wise', category: 'Transfer', date: '15 Jul 2024', amount: -665.56, type: 'expense', icon: 'W', color: 'bg-teal-100 text-teal-600' },
  { id: 14, name: 'Atlassian', category: 'Software', date: '14 Jul 2024', amount: -46.84, type: 'expense', icon: 'A', color: 'bg-indigo-100 text-indigo-600' },
  { id: 13, name: 'Dropbox', category: 'Cloud', date: '13 Jul 2024', amount: -38.59, type: 'expense', icon: 'D', color: 'bg-blue-100 text-blue-600' },
  { id: 12, name: 'Upwork', category: 'Freelance', date: '12 Jul 2024', amount: 1250.00, type: 'income', icon: 'U', color: 'bg-green-100 text-green-600' },
];

export const initialSavingsGoals = [
  { id: 1, name: 'Emergency Fund', target: 20000, current: 14400, color: 'bg-blue-500', iconName: 'ShieldCheck', timeLeft: '3 months left' },
  { id: 2, name: 'New Car', target: 15000, current: 12600, color: 'bg-yellow-500', iconName: 'Car', timeLeft: '1 month left' },
  { id: 3, name: 'Dream House', target: 75000, current: 32000, color: 'bg-purple-500', iconName: 'Home', timeLeft: '2 years left' }
];

export const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ec4899'];