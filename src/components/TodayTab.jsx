import React, { useState, useEffect } from 'react';
import Timeline from './TodayTab/Timeline';
import NowBanner from './TodayTab/NowBanner';
import StatsRow from './TodayTab/StatsRow';
import TaskList from './TodayTab/TaskList';
import StreakRow from './TodayTab/StreakRow';
import { X } from 'lucide-react';
import DataManagement from './DataManagement';

import { USER } from '../data/user-config';

export default function TodayTab({ tasks, setTasks, addLog, showToast }) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      if (!localStorage.getItem('ruled_install_dismissed')) {
        setShowInstallBanner(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setInstallPrompt(null);
      setShowInstallBanner(false);
    });
  };

  const handleDismiss = () => {
    localStorage.setItem('ruled_install_dismissed', 'true');
    setShowInstallBanner(false);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12 animate-in fade-in duration-150">
      {showInstallBanner && (
        <div className="bg-paper border-l-4 border-accent p-6 rounded-sm shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
              <span className="font-serif font-bold italic">R.</span>
            </div>
            <p className="text-display text-sm font-medium">
              Install Ruled.Ink on your phone for quick access
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleInstall}
              className="px-5 py-2 bg-accent text-paper text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-colors rounded-sm"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="text-muted text-xs font-medium hover:text-foreground transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
      )}

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

      <DataManagement showToast={showToast} />
    </div>
  );
}

