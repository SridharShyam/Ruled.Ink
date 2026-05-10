import React from 'react';
import { Plus, Clock, FileText, Layout, Video, Camera, MessageSquare, X } from 'lucide-react';
import ContentForm from './ContentForm';

const platformIcons = {
  YouTube: <Video size={12} className="text-red-soft" />,
  LinkedIn: <MessageSquare size={12} className="text-blue-soft" />,
  Instagram: <Camera size={12} className="text-accent2" />,
};


const statusColors = {
  Idea: 'bg-surface2 text-muted',
  Scripting: 'bg-accent/10 text-accent',
  Recording: 'bg-accent3/10 text-accent3',
  Editing: 'bg-accent4/10 text-accent4',
  Scheduled: 'bg-blue-soft/10 text-blue-soft',
  Published: 'bg-accent2/10 text-accent2',
};


export default function WeekView({ currentDate, content, onAddPiece, showForm, setShowForm }) {
  const getWeekDays = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(d.setDate(diff));
    
    return Array.from({ length: 7 }, (_, i) => {
      const dayDate = new Date(start);
      dayDate.setDate(start.getDate() + i);
      return dayDate;
    });
  };

  const weekDays = getWeekDays(currentDate);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="relative">
      <div className="grid grid-cols-7 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {weekDays.map((date, i) => {
          const dateStr = date.toISOString().split('T')[0];
          const dayContent = content.filter(c => c.scheduledDate === dateStr);
          const isToday = dateStr === today;
          const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={i} className={`bg-surface min-h-[500px] p-4 transition-colors flex flex-col gap-4 border-l border-border first:border-l-0 ${isToday ? 'bg-surface2/40' : ''}`}>
              <div className="flex flex-col mb-2">
                <span className={`text-[11px] font-medium tracking-[0.1em] font-mono uppercase ${isToday ? 'text-accent' : 'text-muted'}`}>{dayLabel}</span>
                <span className={`text-xl font-medium font-mono ${isToday ? 'text-ink' : 'text-faint'}`}>{date.getDate()}</span>
              </div>

              <div className="flex flex-col gap-3">
                {dayContent.map((item, idx) => (
                  <div key={idx} className="notebook-card p-3 flex flex-col gap-2 relative group hover:border-accent">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1.5">
                        {platformIcons[item.platform]}
                        <span className="text-[11px] font-medium leading-tight">{item.title}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      <span className="px-1.5 py-0.5 bg-surface2 rounded-sm text-[9px] font-medium text-muted uppercase">{item.format}</span>
                      <span className={`px-1.5 py-0.5 rounded-sm text-[9px] font-medium uppercase ${statusColors[item.status]}`}>{item.status}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-muted/60 font-mono mt-1">
                      <Clock size={10} />
                      <span>{item.estimatedHours}H EST</span>
                    </div>

                    {item.notes && (
                      <p className="text-[10px] text-muted italic line-clamp-2 border-t border-border pt-2 mt-1">{item.notes}</p>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowForm(dateStr)}
                className="mt-auto flex items-center justify-center gap-2 p-2 border border-dashed border-border rounded-md text-muted hover:text-accent hover:border-accent hover:bg-accent/5 transition-all"
              >
                <Plus size={14} />
                <span className="text-[10px] font-medium uppercase tracking-widest">ADD PIECE</span>
              </button>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-ink/20 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center bg-surface border-b border-border p-4 rounded-t-lg">
              <h3 className="font-display italic text-lg text-ink">Schedule Content</h3>
              <button onClick={() => setShowForm(null)} className="text-muted hover:text-ink transition-colors">
                <X size={20} />
              </button>
            </div>
            <ContentForm 
              initialDate={showForm}
              onSave={(piece) => { onAddPiece(piece); setShowForm(null); }}
              onCancel={() => setShowForm(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

