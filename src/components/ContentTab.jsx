import React from 'react';
import IdeaCard from './ContentTab/IdeaCard';
import IdeaBank from './ContentTab/IdeaBank';

const columns = [
  { id: 'Ideas', label: 'Ideas' },
  { id: 'In Progress', label: 'In Progress' },
  { id: 'Published', label: 'Published' },
];

export default function ContentTab({ ideas, setIdeas, addLog }) {
  // Separate Kanban items from Idea Bank items
  const kanbanPieces = [
    { id: 'p1', text: 'GNN Explained for Beginners', platform: 'YouTube', status: 'Ideas' },
    { id: 'p2', text: 'Why MLOps is the new DevOps', platform: 'LinkedIn', status: 'In Progress' },
  ];

  return (
    <div className="animate-in fade-in duration-150 flex flex-col gap-8 md:gap-12">
      
      {/* Top Header with AI Button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-[11px] font-medium text-muted uppercase tracking-[0.2em]">
          Production Pipeline
        </h2>
        <button 
          onClick={() => alert("AI: Generating new content ideas based on your skill tree...\n1. 'Mastering Backpropagation' - Visual Guide\n2. 'Day in life of an AI student'\n3. 'FastAPI vs Flask for ML'") }
          className="bg-accent/10 text-accent border border-accent/20 px-4 py-2 rounded-md text-[11px] font-medium hover:bg-accent hover:text-surface transition-all uppercase"
        >
          Generate content ideas
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-8 overflow-x-auto pb-8">
        {columns.map((col) => {
          const colIdeas = kanbanPieces.filter(i => i.status === col.id);
          return (
            <div key={col.id} className="flex-1 min-w-[280px] flex flex-col gap-6 border-r border-border last:border-r-0 pr-8">
              <div className="flex items-center justify-between">
                <h3 className="font-body text-[11px] font-medium text-muted uppercase tracking-[0.1em]">
                  {col.label} ({colIdeas.length})
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {colIdeas.map(idea => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
                {colIdeas.length === 0 && (
                  <div className="py-10 border border-dashed border-border rounded-lg flex items-center justify-center">
                    <span className="font-body text-[11px] text-faint italic">Empty</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Idea Bank */}
      <div className="mt-8">
        <h2 className="text-[11px] font-medium text-muted uppercase tracking-[0.2em] mb-6">
          Idea Bank
        </h2>
        <IdeaBank ideas={ideas} setIdeas={setIdeas} addLog={addLog} />
      </div>
    </div>
  );
}
