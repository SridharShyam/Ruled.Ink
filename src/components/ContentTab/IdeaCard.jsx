import React from 'react';

const platformStyles = {
  YouTube: 'border-l-2 border-red-soft text-red-soft',
  LinkedIn: 'border-l-2 border-blue-soft text-blue-soft',
  Instagram: 'border-l-2 border-accent2 text-accent2',
};

export default function IdeaCard({ idea }) {
  return (
    <div className="bg-surface border border-border p-5 rounded-lg hover:border-border2 transition-all group">

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className={`pl-2 font-mono text-[9px] font-medium uppercase tracking-wider ${platformStyles[idea.platform] || 'border-l-2 border-faint text-faint'}`}>
            {idea.platform || 'General'}
          </span>
          <span className="font-mono text-[9px] text-faint">{idea.type}</span>
        </div>
        
        <p className="font-body text-[14px] text-text leading-snug group-hover:text-ink transition-colors">
          {idea.text}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-border mt-1">
          <span className="font-mono text-[9px] text-faint uppercase">
            {new Date(idea.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-muted hover:text-accent text-[10px] font-medium">EDIT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
