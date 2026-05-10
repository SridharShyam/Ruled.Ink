import React from 'react';
import BlockForm from './BlockForm';

const typeColors = {
  college: 'bg-blue-soft/10 text-blue-soft border-blue-soft/20',
  travel: 'bg-muted/10 text-muted border-muted/20',
  sleep: 'bg-faint/10 text-faint border-faint/20',
  skill: 'bg-accent/10 text-accent border-accent/20',
  content: 'bg-accent2/10 text-accent2 border-accent2/20',
  assign: 'bg-accent3/10 text-accent3 border-accent3/20',
};

export default function DayColumn({ day, date, blocks, onAddBlock, isToday }) {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className={`min-h-[600px] border-r border-border last:border-r-0 flex flex-col ${isToday ? 'bg-surface2/30' : ''}`}>
      <div className="p-4 border-b border-border flex flex-col gap-1 items-center">
        <span className={`font-body text-xs font-medium uppercase tracking-[0.1em] ${isToday ? 'text-accent' : 'text-muted'}`}>
          {day}
        </span>
        <span className={`font-mono text-xl ${isToday ? 'text-ink' : 'text-faint'}`}>
          {date.slice(-2)}
        </span>
      </div>

      <div className="flex-1 p-3 flex flex-col gap-3">
        {blocks.sort((a, b) => a.time.localeCompare(b.time)).map((block, i) => (
          <div 
            key={i} 
            className={`p-3 border-l-2 text-xs font-body leading-tight group relative
              ${typeColors[block.type] || 'bg-surface2 text-muted'}`}
          >
            <div className="font-mono text-[10px] opacity-60 mb-1">{block.time}</div>
            <div className="font-medium text-text">{block.title}</div>
          </div>
        ))}


        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="mt-2 py-3 border border-dashed border-border rounded-md text-faint hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all flex items-center justify-center"
          >
            <span className="text-[11px] font-medium uppercase tracking-widest">+</span>
          </button>
        ) : (
          <BlockForm onSave={(block) => { onAddBlock(block); setShowForm(false); }} onCancel={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
}

