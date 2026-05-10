import React from 'react';
import IdeaCard from './ContentTab/IdeaCard';
import IdeaBank from './ContentTab/IdeaBank';

const columns = [
  { id: 'Ideas', label: 'Ideas' },
  { id: 'In Progress', label: 'In Progress' },
  { id: 'Published', label: 'Published' },
];

import useLocalStorage from '../hooks/useLocalStorage';

export default function ContentTab({ ideas, setIdeas, addLog }) {
  const [kanbanPieces, setKanbanPieces] = useLocalStorage('ruled_kanban', []);

  return (
    <div className="animate-in fade-in duration-150 flex flex-col gap-8 md:gap-12">
      
      {/* Top Header with AI Button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-[12px] font-medium text-muted uppercase tracking-[0.2em]">
          Production Pipeline
        </h2>
        <div className="flex gap-3">
          <button 
            onClick={() => {
              const text = prompt("Content title:");
              if (text) {
                setKanbanPieces([...kanbanPieces, { id: Date.now(), text, platform: 'YouTube', status: 'Ideas' }]);
                addLog(`🎬 New content piece: ${text}`);
              }
            }}
            className="bg-accent text-surface px-4 py-2 rounded-md text-[12px] font-medium hover:bg-accent/90 transition-all uppercase"
          >
            + ADD PIECE
          </button>
          <button 
            onClick={() => alert("AI: Generating new content ideas based on your skill tree...\n1. 'Mastering Backpropagation' - Visual Guide\n2. 'Day in life of an AI student'") }
            className="bg-accent/10 text-accent border border-accent/20 px-4 py-2 rounded-md text-[12px] font-medium hover:bg-accent hover:text-surface transition-all uppercase"
          >
            Generate ideas
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-8 overflow-x-auto pb-8">
        {kanbanPieces.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center px-4 border border-dashed border-border rounded-lg">
            <span className="text-2xl mb-3 opacity-30">🎬</span>
            <p className="text-[14px] text-muted font-body">
              No content pieces yet. Add your first piece to get started.
            </p>
          </div>
        ) : (
          columns.map((col) => {
            const colIdeas = kanbanPieces.filter(i => i.status === col.id);
            return (
              <div key={col.id} className="flex-1 min-w-[280px] flex flex-col gap-6 border-r border-border last:border-r-0 pr-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-body text-[12px] font-medium text-muted uppercase tracking-[0.1em]">
                    {col.label} ({colIdeas.length})
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  {colIdeas.map(idea => (
                    <IdeaCard key={idea.id} idea={idea} />
                  ))}
                  {colIdeas.length === 0 && (
                    <div className="py-10 border border-dashed border-border rounded-lg flex items-center justify-center">
                      <span className="font-body text-[12px] text-faint italic">Empty</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Idea Bank */}
      <div className="mt-8">
        <h2 className="text-[12px] font-medium text-muted uppercase tracking-[0.2em] mb-6">
          Idea Bank
        </h2>
        <IdeaBank ideas={ideas} setIdeas={setIdeas} addLog={addLog} />
      </div>
    </div>
  );
}

