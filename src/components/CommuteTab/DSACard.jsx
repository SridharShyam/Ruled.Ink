import React from 'react';
import { Code2, ExternalLink, Zap } from 'lucide-react';
import { leetcodeProblems } from '../../data/leetcode';

const difficultyColors = {
  Easy: 'text-accent2 bg-accent2/10',
  Medium: 'text-accent4 bg-accent4/10',
  Hard: 'text-accent3 bg-accent3/10',
};

export default function DSACard() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const problem = leetcodeProblems && leetcodeProblems.length > 0 
    ? leetcodeProblems[dayOfYear % leetcodeProblems.length] 
    : null;

  if (!problem) return (
    <div className="notebook-card p-6 text-center text-muted text-xs italic">
      No algorithms scheduled today.
    </div>
  );

  return (
    <div className="notebook-card p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <Code2 size={16} className="text-accent2" />
        <h3 className="text-xs font-medium tracking-[0.1em] uppercase text-muted">DSA Focus</h3>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <span className={`px-2 py-0.5 rounded-sm text-[10px] font-medium uppercase ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          <span className="px-2 py-0.5 bg-surface2 text-muted rounded-sm text-[10px] font-medium uppercase tracking-widest font-mono">
            {problem.topic}
          </span>
        </div>
        <h4 className="font-display text-lg font-medium leading-tight">{problem.name}</h4>
      </div>

      <a 
        href={problem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full bg-surface2 border border-border3 hover:border-accent2 py-3 rounded-md text-accent2 font-medium text-[14px] tracking-widest flex items-center justify-center gap-3 transition-all"
      >
        SOLVE ON LEETCODE <ExternalLink size={14} />
      </a>
    </div>

  );
}

