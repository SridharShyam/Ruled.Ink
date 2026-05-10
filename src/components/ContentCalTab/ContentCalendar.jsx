import React, { useState } from 'react';
import { Calendar as CalendarIcon, List, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';
import MonthView from './MonthView';
import WeekView from './WeekView';
import FrequencyTargets from './FrequencyTargets';
import { DEFAULT_CONTENT_CAL } from '../../data/defaults';

export default function ContentCalendar({ addLog, showToast }) {
  const [view, setView] = useState('month');
  const [content, setContent] = useLocalStorage('ruled_content_cal', DEFAULT_CONTENT_CAL);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(null);

  const addPiece = (piece) => {
    setContent([...content, { ...piece, id: Date.now() }]);
    addLog(`🎬 Content scheduled: ${piece.title} on ${piece.scheduledDate}`);
    showToast('Content piece scheduled');
  };

  const navigateMonth = (dir) => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + dir);
    setCurrentDate(d);
  };

  const getNextPost = () => {
    const now = new Date();
    const upcoming = content
      .filter(c => new Date(c.scheduledDate) >= now)
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))[0];
    
    if (!upcoming) return null;

    const diff = Math.ceil((new Date(upcoming.scheduledDate) - now) / (1000 * 60 * 60 * 24));
    let color = 'bg-accent/10 border-accent/20 text-accent';
    if (diff <= 2) color = 'bg-accent3/10 border-accent3/20 text-accent3'; // orange
    else if (diff <= 5) color = 'bg-accent4/10 border-accent4/20 text-accent4'; // yellow

    return { ...upcoming, diff, color };
  };

  const nextPost = getNextPost();

  return (
    <div className="animate-in relative">
      {nextPost ? (
        <div className={`mb-8 p-4 rounded-lg border flex items-center justify-between ${nextPost.color}`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span className="font-body text-xs font-medium uppercase tracking-wider">
              Next post due: <span className="font-bold">{nextPost.title}</span> in {nextPost.diff} days ({nextPost.scheduledDate})
            </span>
          </div>
        </div>
      ) : content.length === 0 && (
        <div className="mb-8 p-6 bg-surface2/30 border border-border rounded-lg flex flex-col items-center justify-center text-center animate-in">
          <span className="text-xl mb-2 opacity-30">📅</span>
          <p className="text-[14px] text-muted font-body">
            No content scheduled yet. Click any date to add a piece.
          </p>
        </div>
      )}

      <header className="flex justify-between items-center mb-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-2xl italic text-ink">Content Strategy</h2>
            <div className="flex items-center gap-2 ml-4">
              <button onClick={() => navigateMonth(-1)} className="p-1.5 hover:bg-surface2 rounded-full transition-colors text-muted"><ChevronLeft size={16} /></button>
              <span className="font-mono text-sm font-medium text-ink min-w-[120px] text-center">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={() => navigateMonth(1)} className="p-1.5 hover:bg-surface2 rounded-full transition-colors text-muted"><ChevronRight size={16} /></button>
            </div>
          </div>
          <p className="font-body text-xs text-muted">Orchestrating multi-platform narrative arcs.</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex bg-surface2 p-1 rounded-md border border-border">
            <button 
              onClick={() => setView('month')}
              className={`px-4 py-1.5 rounded-sm text-[12px] font-medium uppercase tracking-[0.1em] transition-all
                ${view === 'month' ? 'bg-surface text-ink border border-border' : 'text-muted hover:text-ink'}`}
            >
              Month
            </button>
            <button 
              onClick={() => setView('week')}
              className={`px-4 py-1.5 rounded-sm text-[12px] font-medium uppercase tracking-[0.1em] transition-all
                ${view === 'week' ? 'bg-surface text-ink border border-border' : 'text-muted hover:text-ink'}`}
            >
              Week
            </button>
          </div>
        </div>
      </header>

      <FrequencyTargets content={content} />

      <div className="mt-12 bg-surface border border-border overflow-x-auto no-scrollbar">
        <div className="min-w-[800px]">

        {view === 'month' ? (
          <MonthView 
            currentDate={currentDate} 
            content={content} 
            onAddPiece={addPiece} 
            showForm={showForm}
            setShowForm={setShowForm}
          />
        ) : (
          <WeekView 
            currentDate={currentDate} 
            content={content} 
            onAddPiece={addPiece}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  </div>
);
}

