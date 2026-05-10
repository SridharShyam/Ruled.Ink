import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


// One-time cleanup: remove old shyam_* keys and legacy hardcoded data
if (localStorage.getItem('ruled_migrated') !== 'v2') {
  const OLD_KEYS = [
    'shyam_tasks', 'shyam_ideas', 'shyam_study_log',
    'shyam_activity_log', 'shyam_streak', 'shyam_projects',
    'shyam_content_cal', 'shyam_sessions', 'shyam_initialized',
    'shyam_weekly', 'shyam_user'
  ];
  OLD_KEYS.forEach(key => localStorage.removeItem(key));

  // Also remove any shyam_weekly_* or shyam_sessions_* pattern keys
  Object.keys(localStorage)
    .filter(k => k.startsWith('shyam_'))
    .forEach(k => localStorage.removeItem(k));

  // Purge specific hardcoded data if it exists in the new keys
  const studyLogs = JSON.parse(localStorage.getItem('ruled_study_log') || '[]');
  const hasLegacyData = studyLogs.some(log => 
    log.skill === 'GNN Mastery' || 
    log.skill === 'MLOps' || 
    log.skill === 'Distributed Systems'
  );
  if (hasLegacyData) {
    localStorage.removeItem('ruled_study_log');
    localStorage.removeItem('ruled_skills');
  }

  localStorage.setItem('ruled_migrated', 'v2');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
