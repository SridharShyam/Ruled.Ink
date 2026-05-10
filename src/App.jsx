import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.jsx';
import NavTabs from './components/NavTabs.jsx';
import TodayTab from './components/TodayTab.jsx';
import SkillTab from './components/SkillTab.jsx';
import ContentTab from './components/ContentTab.jsx';
import FocusTab from './components/FocusTab.jsx';
import LogTab from './components/LogTab.jsx';
import WeeklyPlanner from './components/WeeklyTab/WeeklyPlanner.jsx';
import ProjectBoard from './components/ProjectsTab/ProjectBoard.jsx';
import ContentCalendar from './components/ContentCalTab/ContentCalendar.jsx';
import CommuteMode from './components/CommuteTab/CommuteMode.jsx';
import Onboarding from './components/Onboarding.jsx';
import Toast from './components/Toast.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import useLocalStorage from './hooks/useLocalStorage.js';
import { 
  DEFAULT_TASKS, 
  DEFAULT_IDEAS, 
  DEFAULT_STUDY_LOG, 
  DEFAULT_ACTIVITY_LOG,
  DEFAULT_SESSIONS
} from './data/defaults.js';

// Constants
// Constants removed as they are now in defaults.js

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [tasks, setTasks] = useLocalStorage('ruled_tasks', DEFAULT_TASKS);
  const [ideas, setIdeas] = useLocalStorage('ruled_ideas', DEFAULT_IDEAS);
  const [studyLogs, setStudyLogs] = useLocalStorage('ruled_study_log', DEFAULT_STUDY_LOG);
  const [activityLogs, setActivityLogs] = useLocalStorage('ruled_activity_log', DEFAULT_ACTIVITY_LOG);
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [toast, setToast] = useState(null);
  
  const todayDateStr = new Date().toISOString().split('T')[0];
  const [sessions, setSessions] = useLocalStorage(`ruled_sessions_${todayDateStr}`, DEFAULT_SESSIONS);
  const [isInitialized, setIsInitialized] = useState(!!localStorage.getItem('ruled_initialized'));
  const [showWelcome, setShowWelcome] = useState(false);

  const user = JSON.parse(localStorage.getItem('ruled_user') || '{"name": "User", "commuteMinutes": 0, "collegeStart": "09:00", "collegeEnd": "17:00"}');

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleOnboardingComplete = () => {
    setIsInitialized(true);
    setShowWelcome(true);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const addLog = useCallback((text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActivityLogs(prev => [{ time, text }, ...prev.slice(0, 49)]);
  }, [setActivityLogs]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      const key = e.key.toLowerCase();
      if (key === 't') setActiveTab('today');
      if (key === 's') setActiveTab('skill');
      if (key === 'c') setActiveTab('content');
      if (key === 'f') setActiveTab('focus');
      if (key === 'l') setActiveTab('log');
      if (key === 'w') setActiveTab('weekly');
      if (key === 'p') setActiveTab('projects');
      if (key === 'x') setActiveTab('contentcal');
      if (key === 'b') setActiveTab('commute');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Storage Quota Error Listener
  useEffect(() => {
    const handleStorageError = (e) => {
      showToast(e.detail.message, 'error');
    };
    window.addEventListener('ruled_storage_error', handleStorageError);
    return () => window.removeEventListener('ruled_storage_error', handleStorageError);
  }, [showToast]);

  // Commute Auto-activation (session-based)
  useEffect(() => {
    const isAutoSwitched = sessionStorage.getItem('ruled_commute_autoswitched');
    if (isAutoSwitched) return;

    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const isCommuteTime = (hour === 7 && min >= 30) || (hour === 8 && min <= 30) || (hour === 17);
    
    if (isCommuteTime) {
      setActiveTab('commute');
      sessionStorage.setItem('ruled_commute_autoswitched', 'true');
      setTimeout(() => {
        showToast('🚌 Commute time detected — switching to Commute Mode');
      }, 100);
    }
  }, [showToast]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return <TodayTab tasks={tasks} setTasks={setTasks} addLog={addLog} />;
      case 'skill':
        return <SkillTab studyLogs={studyLogs} setStudyLogs={setStudyLogs} addLog={addLog} />;
      case 'content':
        return <ContentTab ideas={ideas} setIdeas={setIdeas} addLog={addLog} />;
      case 'focus':
        return <FocusTab sessions={sessions} setSessions={setSessions} addLog={addLog} setIsFocusActive={setIsFocusActive} />;
      case 'log':
        return <LogTab logs={activityLogs} />;
      case 'weekly':
        return <WeeklyPlanner addLog={addLog} showToast={showToast} />;
      case 'projects':
        return <ProjectBoard addLog={addLog} showToast={showToast} />;
      case 'contentcal':
        return <ContentCalendar addLog={addLog} showToast={showToast} />;
      case 'commute':
        return <CommuteMode ideas={ideas} setIdeas={setIdeas} addLog={addLog} showToast={showToast} />;
      default:
        return <TodayTab tasks={tasks} setTasks={setTasks} addLog={addLog} />;
    }
  };

  if (!isInitialized) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className={`min-h-screen bg-bg text-text selection:bg-accent/30 flex flex-col transition-all duration-700`}>
      {!isFocusActive && <Header />}
      {!isFocusActive && <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />}
      
      <main className={`flex-1 overflow-auto transition-all duration-700`}>
        <div className="max-w-[1100px] mx-auto py-8 md:py-14 px-4 md:px-10">
          {showWelcome && (
            <div className="mb-8 p-4 bg-accent/5 border border-accent/20 rounded-lg flex justify-between items-center animate-in">
              <p className="text-sm font-medium text-ink">
                {getGreeting()}, {user.name}. Your system is ready.
              </p>
              <button onClick={() => setShowWelcome(false)} className="text-muted hover:text-text text-lg leading-none">×</button>
            </div>
          )}

          <ErrorBoundary key={activeTab}>
            {renderTabContent()}
          </ErrorBoundary>
        </div>
      </main>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default App;
