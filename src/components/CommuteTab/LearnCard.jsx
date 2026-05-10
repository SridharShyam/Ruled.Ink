import React from 'react';
import { BookOpen, ExternalLink, PlayCircle, FileText } from 'lucide-react';
import { resources } from '../../data/resources';

export default function LearnCard() {
  // Rotate based on day of year
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const resource = resources[dayOfYear % resources.length];

  if (!resource) return (
    <div className="notebook-card p-6 text-center text-muted text-xs italic">
      No resources scheduled. Add some to get started.
    </div>
  );

  return (
    <div className="notebook-card p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen size={16} className="text-accent" />
        <h3 className="text-xs font-medium tracking-[0.1em] uppercase text-muted">Daily Learn</h3>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {resource.type === 'Video' ? <PlayCircle size={14} className="text-accent3" /> : <FileText size={14} className="text-blue-soft" />}
          <span className={`text-[11px] font-medium uppercase tracking-widest ${resource.type === 'Video' ? 'text-accent3' : 'text-blue-soft'}`}>{resource.type}</span>
        </div>
        <h4 className="font-display text-lg font-medium leading-tight">{resource.title}</h4>
        <p className="text-xs text-muted font-mono">{resource.source}</p>
      </div>

      <a 
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full bg-surface2 border border-border3 hover:border-accent py-3 rounded-md text-accent font-medium text-[14px] tracking-widest flex items-center justify-center gap-3 transition-all"
      >
        OPEN RESOURCE <ExternalLink size={14} />
      </a>
    </div>
  );
}

