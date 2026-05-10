import React from 'react';

const platformBadges = {
  YT: 'bg-red-soft/10 text-red-soft border-red-soft/20',
  LI: 'bg-blue-soft/10 text-blue-soft border-blue-soft/20',
  IG: 'bg-accent2/10 text-accent2 border-accent2/20',
};


const columns = [
  { id: 'ideas', title: 'Ideas', color: 'bg-accent', accent: 'border-accent' },
  { id: 'progress', title: 'In Progress', color: 'bg-orange', accent: 'border-orange' },
  { id: 'published', title: 'Published', color: 'bg-accent2', accent: 'border-accent2' },
];

export default function KanbanBoard({ kanbanData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {columns.map((col) => (
        <div key={col.id} className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border pb-3 px-1">
            <h3 className="font-body text-xs font-medium text-muted uppercase tracking-[0.1em]">{col.title} ({kanbanData[col.id]?.length || 0})</h3>
          </div>

          <div className="flex-1 min-h-[300px] flex flex-col gap-4">
            {kanbanData[col.id]?.map((card, idx) => (
              <div key={idx} className="notebook-card p-4 transition-all">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-sm text-[9px] font-medium border ${platformBadges[card.platform] || 'bg-surface2 text-muted border-border'}`}>
                    {card.platform}
                  </span>
                  <span className="px-2 py-0.5 bg-surface2 border border-border rounded-sm text-[9px] font-medium text-muted">
                    {card.duration}
                  </span>
                </div>
                <h4 className="font-display text-[16px] font-medium text-ink leading-tight">{card.title}</h4>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

  );
}

