import React, { useState, useEffect } from 'react';

export default function FocusTab({ sessions, setSessions, addLog, setIsFocusActive }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const durations = [25, 45, 90, 5];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          toggleTimer();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      setIsFocusActive(false);
      if (mode === 'pomodoro') {
        setSessions(s => s + 1);
        addLog("⚡ Pomodoro session complete. Take a break.");
        alert("Session complete! Time to take a break.");
      } else {
        addLog("☕ Break complete. Ready to focus?");
        alert("Break complete! Ready to focus?");
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, setSessions, addLog, setIsFocusActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    setIsFocusActive(!isActive);
    if (!isActive) {
      addLog(`▶ Focus session started (${formatTime(timeLeft)})`);
    } else {
      addLog(`⏸ Focus session paused (${formatTime(timeLeft)})`);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsFocusActive(false);
    const baseTime = mode === 'pomodoro' ? 25 : 5;
    setTimeLeft(baseTime * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 md:py-12 animate-in fade-in">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-8">
        <div className="flex gap-6">
          <button 
            onClick={() => { setMode('pomodoro'); setTimeLeft(25 * 60); setIsActive(false); setIsFocusActive(false); }}
            className={`font-body text-[13px] tracking-widest uppercase transition-all pb-1
              ${mode === 'pomodoro' ? 'text-ink font-medium border-b border-ink' : 'text-faint hover:text-muted'}`}
          >
            focus
          </button>
          <button 
            onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); setIsFocusActive(false); }}
            className={`font-body text-[13px] tracking-widest uppercase transition-all pb-1
              ${mode === 'break' ? 'text-ink font-medium border-b border-ink' : 'text-faint hover:text-muted'}`}
          >
            break
          </button>
        </div>

        <div className="h-6 w-[1px] bg-border3 hidden md:block" />

        <div className="flex gap-4">
          {durations.map(d => (
            <button
              key={d}
              onClick={() => { setTimeLeft(d * 60); setIsActive(false); setIsFocusActive(false); }}
              className={`font-mono text-[11px] px-2 py-0.5 rounded transition-all
                ${timeLeft === d * 60 ? 'bg-accent/10 text-accent font-bold' : 'text-faint hover:text-muted'}`}
            >
              {d}m
            </button>
          ))}
        </div>
      </div>

      <div className="font-display text-[64px] md:text-[84px] text-ink italic font-normal tracking-tighter mb-4 tabular-nums">
        {formatTime(timeLeft)}
      </div>

      <div className="mb-12 font-mono text-[10px] text-faint uppercase tracking-[0.2em]">
        {sessions} SESSIONS COMPLETED TODAY
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-20 w-full max-w-[320px] md:max-w-none px-6 md:px-0">
        <button 
          onClick={toggleTimer}
          className="bg-accent text-surface w-full md:min-w-[160px] py-3.5 rounded-md font-body text-sm font-medium hover:bg-accent/90 transition-all shadow-xl shadow-accent/10"
        >
          {isActive ? 'PAUSE' : (timeLeft < (mode === 'pomodoro' ? 25 * 60 : 5 * 60) ? 'RESUME' : 'START SESSION')}
        </button>
        <button 
          onClick={resetTimer}
          className="border border-border3 text-muted w-full md:px-8 py-3.5 rounded-md font-body text-sm font-medium hover:bg-surface2 transition-all"
        >
          RESET
        </button>
      </div>

      <div className="max-w-md border-l-2 border-border3 pl-8 py-2">
        <p className="font-display text-[15px] italic text-muted leading-[1.8]">
          "Deep work is the ability to focus without distraction on a cognitively demanding task. It’s a skill that allows you to quickly master complicated information and produce better results in less time."
        </p>
        <span className="block mt-4 font-mono text-[10px] text-faint uppercase tracking-widest">— cal newport</span>
      </div>
    </div>
  );
}
