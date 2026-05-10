import React from 'react';

export default function LogTab({ logs }) {
  return (
    <div className="animate-in fade-in">
      <div className="flex flex-col border-t border-border">
        {logs.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center px-4 border-b border-border">
            <span className="text-2xl mb-3 opacity-30">📜</span>
            <p className="text-[14px] text-muted font-body">
              No activity recorded yet. Your actions will appear here.
            </p>
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex items-start gap-4 py-3 border-b border-border hover:bg-surface2 transition-colors px-4 group">
              <span className="font-mono text-[11px] text-faint w-[42px] shrink-0 uppercase tracking-wider">
                {log.time}
              </span>
              <span className="font-body text-[14px] text-text">
                {log.text}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="mt-12 flex flex-col md:flex-row gap-6 md:justify-between md:items-center bg-surface2/40 p-6 rounded-lg border border-border">
        <div className="flex flex-col gap-1">
          <h4 className="font-display text-[16px] font-medium text-ink">Intelligence Analysis</h4>
          <p className="font-body text-[13px] text-muted">Review today's activity patterns using AI.</p>
        </div>
        <button 
          onClick={() => alert("AI Analysis:\n- Productivity Peak: 10:00 AM - 12:00 PM\n- Focus sessions: 3 completed\n- Recommendation: Your energy levels are high, tackle complex coding tasks now.")}
          className="bg-ink text-surface px-6 py-2 rounded-md text-[14px] font-medium hover:bg-ink/80 transition-all"
        >
          GENERATE INSIGHTS
        </button>
      </div>

      <div className="mt-16 flex justify-center pb-8">
        <button 
          onClick={() => {
            if (window.confirm("Reset Ruled.Ink? This will clear all your data and restart the setup. This cannot be undone.")) {
              // Clear all ruled_* keys
              Object.keys(localStorage).forEach(key => {
                if (key.startsWith('ruled_')) {
                  localStorage.removeItem(key);
                }
              });
              
              window.location.reload();
            }
          }}
          className="text-[12px] font-body text-faint hover:text-muted transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
        >
          Reset all data ↺
        </button>
      </div>

    </div>
  );
}

