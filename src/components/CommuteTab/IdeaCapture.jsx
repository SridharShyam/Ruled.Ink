import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function IdeaCapture({ ideas, setIdeas, addLog, showToast }) {
  const [text, setText] = React.useState('');

  const handleSave = () => {
    if (!text.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const prefixedText = `[Commute ${time}] ${text}`;
    
    setIdeas([{ id: Date.now(), text: prefixedText, type: 'commute' }, ...ideas]);
    addLog(`💡 Commute idea captured: ${text.slice(0, 30)}...`);
    showToast('Idea saved to backlog');
    setText('');
  };

  const commuteIdeas = (ideas || []).filter(i => i.text && i.text.startsWith('[Commute')).slice(0, 3);

  return (
    <div className="bg-surface border border-border p-6 rounded-lg flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-2">
        <Lightbulb size={18} className="text-accent4" />
        <span className="font-display text-[16px] font-medium text-ink italic">Fleeting Thought</span>
      </div>
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Capture a spark before it fades..."
        className="notebook-input min-h-[100px] resize-none"
      />
      <button 
        onClick={handleSave}
        className="w-full bg-ink text-surface py-3 rounded-md font-body text-[14px] font-medium hover:bg-ink/90 transition-all"
      >
        SAVE TO BACKLOG
      </button>

      {commuteIdeas.length > 0 && (
        <div className="flex flex-col gap-2 mt-2 border-t border-border pt-4">
          <h4 className="text-[11px] font-mono text-faint uppercase tracking-wider">Recent Commute Ideas</h4>
          <div className="flex flex-col gap-2">
            {commuteIdeas.map(i => (
              <p key={i.id} className="text-[13px] text-muted italic leading-relaxed border-l border-border pl-3">
                {i.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

