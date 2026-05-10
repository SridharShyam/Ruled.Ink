import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import DayColumn from './DayColumn';
import { generateICS } from './icsExport';
import { DEFAULT_WEEKLY } from '../../data/defaults';
import { DEFAULT_SCHEDULE } from '../../data/user-config';

export default function WeeklyPlanner({ addLog, showToast }) {
  const scheduleJson = localStorage.getItem('ruled_schedule');
  const FIXED_BLOCKS = scheduleJson ? JSON.parse(scheduleJson) : DEFAULT_SCHEDULE;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeklyData, setWeeklyData] = useState({});

  const getWeekKey = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const year = d.getFullYear();
    const week = Math.ceil((((d - new Date(year, 0, 1)) / 86400000) + 1) / 7);
    return `ruled_weekly_${year}-${week.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const key = getWeekKey(currentDate);
    const saved = localStorage.getItem(key);
    if (saved) {
      setWeeklyData(JSON.parse(saved));
    } else {
      localStorage.setItem(key, JSON.stringify(DEFAULT_WEEKLY));
      setWeeklyData(DEFAULT_WEEKLY);
    }
  }, [currentDate]);

  const saveWeeklyData = (data) => {
    const key = getWeekKey(currentDate);
    localStorage.setItem(key, JSON.stringify(data));
    setWeeklyData(data);
  };

  const addBlock = (dayIndex, block) => {
    const key = `day_${dayIndex}`;
    const newBlocks = [...(weeklyData[key] || []), { ...block, date: getDayDate(dayIndex) }];
    const newData = { ...weeklyData, [key]: newBlocks };
    saveWeeklyData(newData);
    addLog(`📅 Weekly block added: ${block.title} on ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex]}`);
    showToast('Weekly block added');
  };

  const getDayDate = (dayIdxInWeek) => { // 0=Mon, 6=Sun
    const d = new Date(currentDate);
    const day = d.getDay(); // 0=Sun, 1=Mon
    const diffToMon = day === 0 ? -6 : 1 - day;
    const monday = new Date(d.setDate(d.getDate() + diffToMon));
    const target = new Date(monday.setDate(monday.getDate() + dayIdxInWeek));
    return target.toISOString().split('T')[0];
  };

  const navigateWeek = (dir) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + dir * 7);
    setCurrentDate(d);
  };

  const handleExport = () => {
    const allBlocks = Object.values(weeklyData).flat();
    if (allBlocks.length === 0) {
      showToast('No blocks to export', 'error');
      return;
    }
    const key = getWeekKey(currentDate);
    const weekNum = key.split('_').pop();
    generateICS(allBlocks, weekNum);
    showToast('📅 Calendar file downloaded');
  };

  const getWeekRange = () => {
    const monStr = getDayDate(0);
    const sunStr = getDayDate(6);
    const mon = new Date(monStr);
    const sun = new Date(sunStr);
    const options = { month: 'short', day: '2-digit' };
    return `${mon.toLocaleDateString('en-US', options)} – ${sun.toLocaleDateString('en-US', options)}, ${sun.getFullYear()}`;
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Today's index (0-6 for Mon-Sun)
  const now = new Date();
  const todayIdx = (now.getDay() + 6) % 7;
  const isCurrentWeek = getWeekKey(now) === getWeekKey(currentDate);

  return (
    <div className="animate-in">
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigateWeek(-1)} className="p-2 hover:bg-surface2 rounded-full transition-colors"><ChevronLeft size={18} /></button>
            <span className="font-display text-lg font-medium text-ink italic">{getWeekRange()}</span>
            <button onClick={() => navigateWeek(1)} className="p-2 hover:bg-surface2 rounded-full transition-colors"><ChevronRight size={18} /></button>
          </div>
        </div>

        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-2 border border-border3 rounded-md text-muted text-[14px] font-medium hover:bg-surface2 transition-all"
        >
          <Download size={14} /> EXPORT CALENDAR
        </button>
      </header>

      <div className="overflow-x-auto pb-4 no-scrollbar border border-border">
        <div className="grid grid-cols-7 min-w-[900px] bg-surface">

        {days.map((day, i) => {
          const userBlocks = weeklyData[`day_${i}`] || [];
          const allBlocks = i < 5 ? [...FIXED_BLOCKS, ...userBlocks] : [...FIXED_BLOCKS.filter(b => b.type === 'sleep'), ...userBlocks];

          return (
            <DayColumn 
              key={day}
              day={day}
              date={getDayDate(i)}
              blocks={allBlocks}
              onAddBlock={(block) => addBlock(i, block)}
              isToday={isCurrentWeek && todayIdx === i}
            />
          );
        })}
      </div>
    </div>
  </div>
);
}

