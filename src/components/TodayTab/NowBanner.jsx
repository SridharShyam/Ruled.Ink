import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_SCHEDULE } from '../../data/user-config';

export default function NowBanner() {
  const [scheduleData] = useLocalStorage('ruled_schedule', DEFAULT_SCHEDULE);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentActivity = () => {
    if (!scheduleData || scheduleData.length === 0) return null;
    
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const sorted = [...scheduleData].sort((a, b) => b.time.localeCompare(a.time));
    return sorted.find(item => timeStr >= item.time) || sorted[sorted.length - 1];
  };

  const activity = getCurrentActivity();

  if (!activity) {
    return (
      <div className="mb-10 py-2 border-l-[3px] border-border px-4 bg-transparent">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] text-muted uppercase tracking-[0.1em] font-medium">▸ status</span>
          <h2 className="font-display text-lg text-faint italic font-medium">No activity scheduled</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 py-2 border-l-[3px] border-accent px-4 bg-transparent">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] text-muted uppercase tracking-[0.1em] font-medium">
          ▸ now
        </span>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg text-ink font-medium">
            {activity.name}
          </h2>
          <span className="font-mono text-[12px] text-muted">
            {activity.time}
          </span>
        </div>
      </div>
      
      <div className="mt-4 h-[2px] w-full bg-bar-bg overflow-hidden">
        <div className="h-full bg-accent w-1/3 transition-all duration-1000" />
      </div>
    </div>
  );
}

