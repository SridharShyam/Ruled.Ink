import React, { useState, useEffect } from 'react';
import Timeline from './TodayTab/Timeline';
import NowBanner from './TodayTab/NowBanner';
import StatsRow from './TodayTab/StatsRow';
import TaskList from './TodayTab/TaskList';
import StreakRow from './TodayTab/StreakRow';
import { X } from 'lucide-react';

import { USER } from '../data/user-config';

export default function TodayTab({ tasks, setTasks, addLog }) {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const initialized = localStorage.getItem('ruled_initialized');
    if (!initialized) {
      setShowWelcome(true);
    }
  }, []);

  const dismissWelcome = () => {
    localStorage.setItem('ruled_initialized', 'true');
    setShowWelcome(false);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12 animate-in fade-in duration-150">
      {showWelcome && (
        <div className="w-full bg-[#E8F3E8] border border-[#D0E2D0] p-4 flex justify-between items-center animate-in slide-in-from-top-4">
          <span className="font-display text-[15px] text-[#2D4A2D] italic">
            Welcome to Ruled.Ink, {USER.name}. Your system is ready.
          </span>
          <button 
            onClick={dismissWelcome}
            className="text-[#2D4A2D] hover:bg-[#D0E2D0] p-1 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="text-[11px] font-medium text-muted uppercase tracking-[0.2em] mb-2 px-4">
            Daily Timeline
          </h2>
          <Timeline />
        </div>

        {/* Right Column: Stats & Tasks */}
        <div className="lg:col-span-7">
          <NowBanner />
          <StatsRow tasks={tasks} />
          <TaskList tasks={tasks} setTasks={setTasks} addLog={addLog} />
          <StreakRow />
        </div>
      </div>
    </div>
  );
}
