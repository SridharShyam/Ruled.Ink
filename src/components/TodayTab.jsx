import React, { useState, useEffect } from 'react';
import Timeline from './TodayTab/Timeline';
import NowBanner from './TodayTab/NowBanner';
import StatsRow from './TodayTab/StatsRow';
import TaskList from './TodayTab/TaskList';
import StreakRow from './TodayTab/StreakRow';
import { X } from 'lucide-react';

import { USER } from '../data/user-config';

export default function TodayTab({ tasks, setTasks, addLog }) {
  return (
    <div className="flex flex-col gap-8 md:gap-12 animate-in fade-in duration-150">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="text-[12px] font-medium text-muted uppercase tracking-[0.2em] mb-2 px-4">
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

