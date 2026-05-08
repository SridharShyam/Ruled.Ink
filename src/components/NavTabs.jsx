import React from 'react';

const tabs = [
  { id: 'today', label: 'Today', icon: '📅' },
  { id: 'skill', label: 'Skill Track', icon: '🧠' },
  { id: 'content', label: 'Content Pipeline', icon: '🎬' },
  { id: 'focus', label: 'Focus Mode', icon: '⚡' },
  { id: 'log', label: 'Activity Log', icon: '📜' },
  { id: 'weekly', label: 'Weekly', icon: '🗓️' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'contentcal', label: 'Content Cal', icon: '📸' },
  { id: 'commute', label: 'Commute', icon: '🚌' },
];

export default function NavTabs({ activeTab, setActiveTab }) {
  return (
    <nav className="border-b border-border2 bg-bg sticky top-0 z-20">
      <div className="max-w-[1100px] mx-auto overflow-x-auto no-scrollbar">
        <div className="flex gap-6 md:gap-[36px] px-4 md:px-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-underline whitespace-nowrap py-5 group transition-colors
                ${activeTab === tab.id ? 'active' : 'text-muted hover:text-text'}`}
            >
              <span className={`text-[13px] ${activeTab === tab.id ? 'font-medium' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>

  );
}
