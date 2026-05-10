import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Bus } from 'lucide-react';

export default function CommuteTimer() {
  const user = JSON.parse(localStorage.getItem('ruled_user') || '{"commuteMinutes": 45, "collegeStart": "09:00", "collegeEnd": "17:00"}');
  const [timeLeft, setTimeLeft] = useState(parseInt(user.commuteMinutes || 0) * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsActive(prev => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCommuteTimes = () => {
    const commute = parseInt(user.commuteMinutes || 0);
    const collegeStart = user.collegeStart || "09:00";
    const collegeEnd = user.collegeEnd || "17:00";

    const parse = (t) => {
      if (!t || typeof t !== 'string') return 0;
      const [h, m] = t.split(':').map(Number);
      return (h || 0) * 60 + (m || 0);
    };

    const format = (min) => {
      const h = Math.floor(min / 60) % 24;
      const m = min % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    const morningStart = parse(collegeStart) - commute;
    const eveningEnd = parse(collegeEnd) + commute;

    return {
      morning: `${format(morningStart)} - ${collegeStart}`,
      evening: `${collegeEnd} - ${format(eveningEnd)}`
    };
  };

  const times = getCommuteTimes();

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="font-mono text-[57px] text-ink tabular-nums leading-none">
        {formatTime(timeLeft)}
      </div>

      {isActive && (
        <div className="flex items-center gap-2 text-accent2">
          <Bus size={18} />
          <span className="text-xs font-medium tracking-[0.1em] font-mono uppercase">TRAVEL MODE ACTIVE</span>
        </div>
      )}

      <div className="flex gap-4 w-full">
        {!isActive ? (
          <>
            <button 
              onClick={startTimer}
              className="flex-1 bg-accent hover:bg-accent/90 text-surface py-6 rounded-md font-medium text-sm tracking-widest transition-all flex flex-col items-center gap-2"
            >
              <span className="opacity-50 text-[11px]">{times.morning}</span>
              MORNING COMMUTE
            </button>
            <button 
              onClick={startTimer}
              className="flex-1 bg-surface2 border border-border hover:border-accent/30 text-text py-6 rounded-md font-medium text-sm tracking-widest transition-all flex flex-col items-center gap-2"
            >
              <span className="opacity-50 text-[11px]">{times.evening}</span>
              EVENING COMMUTE
            </button>
          </>
        ) : (
          <button 
            onClick={stopTimer}
            className="flex-1 border border-accent3 text-accent3 py-6 rounded-md font-medium text-sm tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <Square size={20} fill="currentColor" /> END COMMUTE
          </button>
        )}
      </div>
    </div>

  );
}

