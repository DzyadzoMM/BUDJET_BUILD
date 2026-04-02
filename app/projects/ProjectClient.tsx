"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, TrendingUp } from "lucide-react";
import Modal from "./Modal";
import ProjectForm from "@/src/components/Forms/ProjectForm/ProjectForm";
import { useRouter } from "next/navigation";

export default function ProjectClient({ allProjects }: { allProjects: any[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const progress = 65;
  const totalSpent = 650000;
  const totalBudget = 1000000;

  return (
    <div className="min-h-screen bg-slate-900">
      <main className="px-4 py-8 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold text-slate-100">My Projects</h2>
          <p className="text-slate-400">Manage and track all your construction sites</p>
        </div>

        {/* Cards */}
       {/* Project Cards Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <button
               onClick={() => router.push(`/projects/${project.id}`)}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all group text-left"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-100 mb-1 group-hover:text-emerald-500 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-400">{project.description}</p>
                  </div>
                  <TrendingUp className={`w-5 h-5 flex-shrink-0 ml-2 ${
                    progress > 50 ? 'text-emerald-500' : 'text-amber-500'
                  }`} />
                </div>

                {/* Budget Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">Total Spent</span>
                    <span className="text-xl font-bold text-slate-100">
                      ${ (totalSpent / 1000).toFixed(1) }k
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">Budget</span>
                    <span className="text-sm text-slate-400">
                      ${(totalBudget / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Progress</span>
                    <span className="text-sm font-semibold text-emerald-500">
                      {progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    />
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    progress > 70
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : progress > 30
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {progress > 70 ? 'Near Completion' : progress > 30 ? 'In Progress' : 'Starting'}
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </section>

        {/* Add New Project */}
        <motion.button
          onClick={() => setOpen(true)}
          className="min-h-[280px] bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-4 group"
        >
          <Plus className="w-8 h-8 text-slate-400 group-hover:text-emerald-500" />
          <h3 className="text-lg font-semibold text-slate-100">Новий проект</h3>
          <p className="text-sm text-slate-400">Створити новий проект</p>
        </motion.button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <h2 className="text-xl font-semibold text-slate-100 mb-4">New Project</h2>
          <ProjectForm onClose={() => setOpen(false)} />
        </Modal>
      </main>
    </div>
  );
}
