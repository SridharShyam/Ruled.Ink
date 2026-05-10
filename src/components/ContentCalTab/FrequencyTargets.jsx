import React from 'react';

const targets = [
  { platform: 'LinkedIn', target: 3, period: 'week', color: 'bg-blue-soft' },
  { platform: 'Instagram', target: 2, period: 'week', color: 'bg-accent2' },
  { platform: 'YouTube', target: 0.5, period: 'week', color: 'bg-red-soft' }, // 1 per 2 weeks
];


export default function FrequencyTargets({ content }) {
  // Calculate actuals for the current week
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff)).toISOString().split('T')[0];
  };

  const weekStart = getWeekStart(new Date());
  
  const getActual = (platform) => {
    return content.filter(c => {
      if (c.platform !== platform) return false;
      if (c.status !== 'Published' && c.status !== 'Scheduled') return false;
      return c.scheduledDate >= weekStart;
    }).length;
  };

  return (
    <div className="flex gap-8 py-4 px-6 bg-surface border-b border-border mb-6 overflow-x-auto">
      {targets.map((t) => {
        const actual = getActual(t.platform);
        const progress = Math.min((actual / t.target) * 100, 100);
        const barColor = actual >= t.target ? 'bg-accent2' : actual > 0 ? 'bg-accent' : 'bg-accent3';
        
        return (
          <div key={t.platform} className="flex flex-col gap-2 min-w-[150px] flex-1">
            <div className="flex justify-between items-end">
              <span className="text-[11px] font-medium tracking-[0.1em] text-muted uppercase">{t.platform}</span>
              <span className="text-[12px] font-mono">
                <span className={actual >= t.target ? 'text-accent2' : 'text-text'}>{actual}</span>
                <span className="text-muted/40 mx-1">/</span>
                <span className="text-muted">{t.platform === 'YouTube' ? '0.5' : t.target}</span>
              </span>
            </div>
            <div className="h-[2px] w-full bg-bar-bg overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${barColor}`} 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        );
      })}
    </div>

  );
}

