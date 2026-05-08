import { useState, useEffect } from 'react';
import { scheduleData } from '../data/schedule';

export function useSchedule() {
  const [currentBlock, setCurrentBlock] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateSchedule = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      let activeIndex = -1;
      for (let i = 0; i < scheduleData.length; i++) {
        const [hours, minutes] = scheduleData[i].time.split(':').map(Number);
        const blockTime = hours * 60 + minutes;
        
        if (currentTime >= blockTime) {
          activeIndex = i;
        } else {
          break;
        }
      }

      if (activeIndex !== -1) {
        const active = scheduleData[activeIndex];
        setCurrentBlock(active);

        // Calculate progress
        const [startH, startM] = active.time.split(':').map(Number);
        const startTime = startH * 60 + startM;
        
        let endTime;
        if (activeIndex < scheduleData.length - 1) {
          const [endH, endM] = scheduleData[activeIndex + 1].time.split(':').map(Number);
          endTime = endH * 60 + endM;
        } else {
          endTime = 24 * 60; // End of day
        }

        const totalDuration = endTime - startTime;
        const elapsed = currentTime - startTime;
        setProgress(Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)));
      }
    };

    updateSchedule();
    const interval = setInterval(updateSchedule, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return { currentBlock, progress };
}
