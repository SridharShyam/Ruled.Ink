import { useState, useEffect } from 'react';

export function useStreak() {
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('ruled_streak');
    if (saved) {
      const { count } = JSON.parse(saved);
      return count;
    }
    return 0; // Starting streak fresh
  });

  useEffect(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('ruled_streak');
    
    if (saved) {
      const { count, lastDate } = JSON.parse(saved);
      
      if (lastDate === today) {
        // Already logged today
        setStreak(count);
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate === yesterday.toDateString()) {
          // Increment streak
          const newCount = count + 1;
          setStreak(newCount);
          localStorage.setItem('ruled_streak', JSON.stringify({ count: newCount, lastDate: today }));
        } else {
          // Reset streak
          setStreak(1);
          localStorage.setItem('ruled_streak', JSON.stringify({ count: 1, lastDate: today }));
        }
      }
    } else {
      // First time
      localStorage.setItem('ruled_streak', JSON.stringify({ count: 0, lastDate: today }));
    }
  }, []);

  return streak;
}
