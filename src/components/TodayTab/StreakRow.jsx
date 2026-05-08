import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_STREAK } from '../../data/defaults';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function StreakRow() {
  const [streakData] = useLocalStorage('ruled_streak', DEFAULT_STREAK);
  
  // Current day: Monday = 0, ..., Sunday = 6
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7;
  const todayIndex = 7 + dayOfWeek; // Today is the index in the 14-day array (second week)

  return (
    <div className="mt-10 pt-8 border-t border-border px-4">
      <h3 className="font-body text-[11px] text-muted uppercase tracking-[0.2em] font-medium mb-4">14-Day Streak Consistency</h3>
      <div className="flex gap-2.5 flex-wrap">
        {days.map((day, i) => {
          const isDone = streakData[i];
          const isToday = i === todayIndex;
          const isPast = i < todayIndex;

          let styles = "border-border2 text-muted";
          if (isDone && isPast) styles = "bg-accent border-accent text-surface";
          if (isToday) styles = "border-[2px] border-accent text-accent font-bold ring-2 ring-accent/20 ring-offset-2 ring-offset-bg";
          if (!isDone && isPast) styles = "border-border text-faint";

          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className={`w-[24px] h-[24px] rounded-full border flex items-center justify-center font-mono text-[9px] transition-all
                  ${styles}`}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
