import React from 'react';
import { scheduleData } from '../../data/schedule';

const blockColors = {
  sleep: '#d0cabc',
  college: '#8aab9e',
  travel: '#c8c0b0',
  lunch: '#d4b87a',
  assign: '#c47c4a',
  skill: '#5c7a5c',
  content: '#7a6c9e',
  free: '#c0b8a8',
};

export default function Timeline() {
  return (
    <div className="flex flex-col border-t border-border">
      {scheduleData.length > 0 ? (
        scheduleData.map((block, index) => (
          <div key={index} className="flex items-center gap-6 py-4 border-b border-border hover:bg-surface2 transition-colors px-4 group">
            <span className="font-mono text-[10px] text-faint w-12 shrink-0">
              {block.time}
            </span>
            
            <div className="flex-1 flex items-center gap-4 border-l-[3px] pl-4" style={{ borderColor: blockColors[block.type] || '#c0b8a8' }}>
              <div className="flex flex-col">
                <span className="font-body text-[13px] font-medium text-text">
                  {block.name}
                </span>
                {block.desc && (
                  <span className="font-body text-[11px] text-muted">
                    {block.desc}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted text-xs italic font-body">No schedule set for today. Plan your day to stay focused.</p>
        </div>
      )}
    </div>
  );
}
