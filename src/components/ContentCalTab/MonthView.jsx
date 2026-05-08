import React from 'react';
import { X } from 'lucide-react';
import ContentForm from './ContentForm';

const platformColors = {
  YouTube: 'bg-red-soft text-surface',
  LinkedIn: 'bg-blue-soft text-surface',
  Instagram: 'bg-accent2 text-surface',
};

export default function MonthView({ currentDate, content, onAddPiece, showForm, setShowForm }) {
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    return { firstDay: firstDay === 0 ? 6 : firstDay - 1, days };
  };

  const { firstDay, days } = getDaysInMonth(currentDate);
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    return day > 0 && day <= days ? day : null;
  });

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="relative">
      <div className="grid grid-cols-7 gap-px bg-border">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="bg-surface2 p-3 text-center">
            <span className="font-body text-xs font-medium text-muted uppercase tracking-[0.1em]">{day}</span>
          </div>
        ))}
        
        {calendarDays.map((day, i) => {
          const dateStr = day ? `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` : null;
          const dayContent = content.filter(c => c.scheduledDate === dateStr);
          const isToday = dateStr === today;

          return (
            <div key={i} className={`bg-surface min-h-[120px] p-2 flex flex-col gap-1 transition-colors hover:bg-surface2/50 ${!day ? 'bg-bg/50' : ''} group`}>
              {day && (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-mono text-sm ${isToday ? 'text-accent underline' : 'text-faint'}`}>{day}</span>
                    <button 
                      onClick={() => setShowForm(dateStr)}
                      className="opacity-0 group-hover:opacity-100 text-[10px] text-accent hover:underline"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    {dayContent.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`px-1.5 py-0.5 rounded-sm text-[8px] font-medium truncate ${platformColors[item.platform] || 'bg-muted text-surface'}`}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
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
