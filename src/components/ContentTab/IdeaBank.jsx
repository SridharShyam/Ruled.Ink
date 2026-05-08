import React, { useState } from 'react';
import { Lightbulb, Send } from 'lucide-react';

export default function IdeaBank({ ideas, setIdeas, addLog }) {
  const [newIdea, setNewIdea] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newIdea.trim()) return;

    setIdeas([{ id: Date.now(), text: newIdea }, ...ideas]);
    addLog(`💡 Saved idea: ${newIdea}`);
    setNewIdea('');
  };

  return (
    <div className="notebook-card p-6">
      <h3 className="font-display text-[15px] font-medium text-ink italic mb-6 flex items-center gap-2">
        <Lightbulb size={18} className="text-accent3" />
        Fleeting Thoughts
      </h3>

      <form onSubmit={handleAdd} className="flex gap-2 mb-8">
        <input
          type="text"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder="New spark of genius..."
          className="notebook-input flex-1"
        />
        <button type="submit" className="bg-ink text-surface px-4 py-2 rounded-md hover:bg-ink/90 transition-all">
          <Send size={16} />
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div key={idea.id} className="p-4 rounded-md border border-border bg-surface2/30 flex gap-3 group">
            <Lightbulb size={16} className="text-accent3 shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity" />
            <p className="font-body text-[13px] leading-relaxed text-muted">{idea.text}</p>
          </div>
        ))}
      </div>
    </div>

  );
}
