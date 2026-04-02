export interface Project {
  id: string;
  name: string;
  description: string;
  totalBudget: number;
  totalSpent: number;
  progress: number;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  budget: number;
  spent: number;
  icon: string;
}

export interface Transaction {
  id: string;
  projectId: string;
  categoryId: string;
  type: 'material' | 'labor' | 'logistics';
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
  receipt?: string;
}

export interface MonthlyData {
  month: string;
  planned: number;
  actual: number;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'City House',
    description: 'Downtown renovation project',
    totalBudget: 250000,
    totalSpent: 187500,
    progress: 75,
  },
  {
    id: '2',
    name: 'Summer Cottage',
    description: 'Lakeside cabin construction',
    totalBudget: 180000,
    totalSpent: 72000,
    progress: 40,
  },
  {
    id: '3',
    name: 'Commercial Plaza',
    description: 'Office building refurbishment',
    totalBudget: 450000,
    totalSpent: 112500,
    progress: 25,
  },
];

export const categories: Record<string, Category[]> = {
  '1': [
    { id: 'c1', name: 'Foundation', budget: 50000, spent: 45000, icon: 'foundation' },
    { id: 'c2', name: 'Walls', budget: 80000, spent: 72000, icon: 'walls' },
    { id: 'c3', name: 'Roof', budget: 45000, spent: 38500, icon: 'roof' },
    { id: 'c4', name: 'Electrical', budget: 35000, spent: 18000, icon: 'electrical' },
    { id: 'c5', name: 'Plumbing', budget: 25000, spent: 10000, icon: 'plumbing' },
    { id: 'c6', name: 'Interior', budget: 15000, spent: 4000, icon: 'interior' },
  ],
  '2': [
    { id: 'c7', name: 'Foundation', budget: 35000, spent: 28000, icon: 'foundation' },
    { id: 'c8', name: 'Framing', budget: 55000, spent: 24000, icon: 'walls' },
    { id: 'c9', name: 'Roof', budget: 32000, spent: 12000, icon: 'roof' },
    { id: 'c10', name: 'Windows', budget: 18000, spent: 8000, icon: 'windows' },
    { id: 'c11', name: 'Interior', budget: 40000, spent: 0, icon: 'interior' },
  ],
  '3': [
    { id: 'c12', name: 'Demolition', budget: 60000, spent: 60000, icon: 'demolition' },
    { id: 'c13', name: 'Structural', budget: 120000, spent: 48000, icon: 'foundation' },
    { id: 'c14', name: 'HVAC', budget: 85000, spent: 4500, icon: 'hvac' },
    { id: 'c15', name: 'Electrical', budget: 70000, spent: 0, icon: 'electrical' },
    { id: 'c16', name: 'Flooring', budget: 55000, spent: 0, icon: 'flooring' },
    { id: 'c17', name: 'Finishing', budget: 60000, spent: 0, icon: 'interior' },
  ],
};

export const transactions: Transaction[] = [
  {
    id: 't1',
    projectId: '1',
    categoryId: 'c1',
    type: 'material',
    description: 'Concrete delivery - 40 cubic meters',
    amount: 8500,
    date: '2026-03-25',
    status: 'paid',
  },
  {
    id: 't2',
    projectId: '1',
    categoryId: 'c2',
    type: 'labor',
    description: 'Masonry crew - Week 12',
    amount: 12000,
    date: '2026-03-24',
    status: 'paid',
  },
  {
    id: 't3',
    projectId: '1',
    categoryId: 'c3',
    type: 'material',
    description: 'Roofing tiles and materials',
    amount: 15500,
    date: '2026-03-22',
    status: 'pending',
  },
  {
    id: 't4',
    projectId: '1',
    categoryId: 'c4',
    type: 'logistics',
    description: 'Equipment rental - Crane',
    amount: 3200,
    date: '2026-03-20',
    status: 'paid',
  },
  {
    id: 't5',
    projectId: '1',
    categoryId: 'c2',
    type: 'material',
    description: 'Bricks - 10,000 units',
    amount: 6800,
    date: '2026-03-18',
    status: 'paid',
  },
  {
    id: 't6',
    projectId: '1',
    categoryId: 'c5',
    type: 'labor',
    description: 'Plumbing installation',
    amount: 4500,
    date: '2026-03-15',
    status: 'pending',
  },
];

export const monthlyData: Record<string, MonthlyData[]> = {
  '1': [
    { month: 'Oct', planned: 25000, actual: 28000 },
    { month: 'Nov', planned: 30000, actual: 32500 },
    { month: 'Dec', planned: 28000, actual: 26000 },
    { month: 'Jan', planned: 35000, actual: 38000 },
    { month: 'Feb', planned: 32000, actual: 31000 },
    { month: 'Mar', planned: 30000, actual: 32000 },
  ],
  '2': [
    { month: 'Jan', planned: 15000, actual: 18000 },
    { month: 'Feb', planned: 20000, actual: 22000 },
    { month: 'Mar', planned: 18000, actual: 32000 },
  ],
  '3': [
    { month: 'Feb', planned: 50000, actual: 60000 },
    { month: 'Mar', planned: 45000, actual: 52500 },
  ],
};

// Forecast AI prediction
export const getForecast = (projectId: string) => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  const variance = (project.totalSpent / project.progress * 100) - project.totalBudget;
  const projectedTotal = project.totalBudget + variance;
  const remainingBudget = project.totalBudget - project.totalSpent;
  const estimatedCompletion = new Date();
  estimatedCompletion.setMonth(estimatedCompletion.getMonth() + Math.ceil((100 - project.progress) / 10));

  return {
    projectedTotal,
    variance,
    remainingBudget,
    estimatedCompletion: estimatedCompletion.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    confidence: 0.87,
  };
};
