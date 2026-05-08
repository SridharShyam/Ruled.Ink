import React from 'react';

export default function StudyLog({ logs }) {
  return (
    <div className="mt-12">
      <h3 className="font-body text-[11px] text-muted uppercase tracking-[0.2em] font-medium mb-6">Recent Sessions</h3>
      <div className="flex flex-col border-t border-border">
        {logs.length > 0 ? (
          logs.map((log, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-border hover:bg-surface2 transition-colors px-4 group">
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-base text-text leading-tight">{log.skill}</span>
                <span className="font-body text-[11px] text-muted">{log.lastActive}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-xl text-ink">{log.hours}</span>
                <span className="font-body text-[10px] text-faint uppercase tracking-widest">Hours</span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted text-xs italic font-body">No study sessions logged yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
