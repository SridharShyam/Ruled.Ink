import { useStreak } from '../../hooks/useStreak';

export default function StatsRow({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const streak = useStreak();

  return (
    <div className="flex items-center flex-wrap gap-6 md:gap-10 py-6 mb-8 border-b border-border px-4">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[22px] text-ink">{completed}</span>
        <span className="font-body text-[11px] text-muted uppercase tracking-widest font-medium">Completed</span>
      </div>
      
      <div className="w-[1px] h-6 bg-border2" />

      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[22px] text-ink">{total}</span>
        <span className="font-body text-[11px] text-muted uppercase tracking-widest font-medium">Missions</span>
      </div>

      <div className="w-[1px] h-6 bg-border2" />

      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[22px] text-ink">{streak}</span>
        <span className="font-body text-[11px] text-muted uppercase tracking-widest font-medium">Day Streak</span>
      </div>
    </div>

  );
}
