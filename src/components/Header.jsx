import React, { useState, useEffect } from 'react';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('ruled_user') || '{"collegeStart": "09:00", "collegeEnd": "17:00"}');
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const isCollegeMode = () => {
    const timeStr = dateTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    return timeStr >= user.collegeStart && timeStr < user.collegeEnd;
  };

  return (
    <header className="border-b border-border2 bg-surface">
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-6 md:py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-xl font-medium text-ink">
            Ruled.Ink
          </h1>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-[12px] text-muted tracking-wide">
            {formatDate(dateTime)}
          </span>
          <span className="font-mono text-[12px] text-muted uppercase tracking-[0.1em]">
            {isCollegeMode() ? 'college hours' : 'home hours'}
          </span>
        </div>
      </div>
    </header>
  );
}

