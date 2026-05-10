import React, { useState, useEffect, useMemo } from 'react';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [fade, setFade] = useState(true);
  
  // State for all onboarding data
  const [userName, setUserName] = useState('');
  const [dayConfig, setDayConfig] = useState({
    wakeTime: '05:00',
    sleepTime: '22:00',
    collegeStart: '09:00',
    collegeEnd: '17:00',
    commuteMinutes: 45,
    fieldOfStudy: ''
  });
  const [skills, setSkills] = useState([{ id: Date.now(), name: '', topic: '', pct: 0 }]);
  const [firstTask, setFirstTask] = useState({ text: '', type: 'skill' });

  const handleNext = () => {
    if (step < 4) {
      setFade(false);
      setTimeout(() => {
        setStep(step + 1);
        setFade(true);
      }, 150);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setFade(false);
      setTimeout(() => {
        setStep(step - 1);
        setFade(true);
      }, 150);
    }
  };

  const addSkill = () => {
    if (skills.length < 6) {
      setSkills([...skills, { id: Date.now(), name: '', topic: '', pct: 0 }]);
    }
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const updateSkill = (id, field, value) => {
    setSkills(skills.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const finishOnboarding = () => {
    // Generate schedule
    const schedule = generateSchedule(dayConfig);
    
    // Final data structure
    const onboardingData = {
      ruled_user: { name: userName, fieldOfStudy: dayConfig.fieldOfStudy },
      ruled_schedule: schedule,
      ruled_skills: skills.filter(s => s.name.trim() !== ''),
      ruled_tasks: firstTask.text.trim() ? [{ id: Date.now(), text: firstTask.text, completed: false, type: firstTask.type }] : [],
      ruled_projects: [],
      ruled_ideas: [],
      ruled_activity_log: [{ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: 'System initialized.' }],
      ruled_initialized: 'true'
    };

    // Store in localStorage
    Object.entries(onboardingData).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });

    onComplete();
  };

  const generateSchedule = (config) => {
    const { wakeTime, sleepTime, collegeStart, collegeEnd, commuteMinutes } = config;
    
    const parseTime = (t) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    const formatTime = (totalMin) => {
      const h = Math.floor(totalMin / 60) % 24;
      const m = totalMin % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    const wakeMin = parseTime(wakeTime);
    const sleepMin = parseTime(sleepTime);
    const collStartMin = parseTime(collegeStart);
    const collEndMin = parseTime(collegeEnd);
    const commute = Number(commuteMinutes);

    const blocks = [];

    // Wake up block
    blocks.push({ 
      time: formatTime(wakeMin), 
      end: formatTime(collStartMin - commute), 
      name: "Wake up", 
      sub: "Morning prep · Light study", 
      type: "free" 
    });

    // Morning commute
    blocks.push({ 
      time: formatTime(collStartMin - commute), 
      end: formatTime(collStartMin), 
      name: "Travel → College/Work", 
      sub: "Commute · Listen · Read", 
      type: "travel" 
    });

    // College Morning
    blocks.push({ 
      time: formatTime(collStartMin), 
      end: "13:00", 
      name: "College/Work", 
      sub: "Focus on sessions", 
      type: "college" 
    });

    // Lunch
    blocks.push({ 
      time: "13:00", 
      end: "14:00", 
      name: "Lunch break", 
      sub: "Rest · Recharge", 
      type: "lunch" 
    });

    // College Afternoon
    blocks.push({ 
      time: "14:00", 
      end: formatTime(collEndMin), 
      name: "College/Work", 
      sub: "Afternoon sessions", 
      type: "college" 
    });

    // Evening commute
    blocks.push({ 
      time: formatTime(collEndMin), 
      end: formatTime(collEndMin + commute), 
      name: "Travel home", 
      sub: "Wind down", 
      type: "travel" 
    });

    // Free / Skill / Content time
    blocks.push({ 
      time: formatTime(collEndMin + commute), 
      end: formatTime(sleepMin), 
      name: "Free time", 
      sub: "Skills · Projects · Personal", 
      type: "skill" 
    });

    // Sleep
    blocks.push({ 
      time: formatTime(sleepMin), 
      end: formatTime(wakeMin), 
      name: "Sleep", 
      sub: "Rest · Recovery", 
      type: "sleep" 
    });

    return blocks;
  };

  const schedulePreview = useMemo(() => {
    const { wakeTime, collegeStart, collegeEnd, commuteMinutes } = dayConfig;
    const commute = Number(commuteMinutes);
    const parseTime = (t) => t.split(':').map(Number);
    const formatTime = (h, m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    
    const [csH, csM] = parseTime(collegeStart);
    let totalM = csH * 60 + csM - commute;
    const morningCommute = formatTime(Math.floor(totalM / 60), totalM % 60);
    
    const [ceH, ceM] = parseTime(collegeEnd);
    totalM = ceH * 60 + ceM + commute;
    const eveningFree = formatTime(Math.floor(totalM / 60), totalM % 60);

    return [
      `${wakeTime}  Wake up`,
      `${morningCommute}  Travel → College/Work`,
      `${collegeStart}  College/Work`,
      `${collegeEnd}  Travel home → ${eveningFree} Free time`
    ];
  }, [dayConfig]);

  return (
    <div className="fixed inset-0 bg-bg z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-[520px] bg-surface border border-border rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[480px]">
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-center">
          <span className="font-mono text-[12px] uppercase tracking-widest text-faint">Ruled.Ink Setup</span>
          <span className="font-mono text-[12px] text-muted">Step {step} of 4</span>
        </div>

        {/* Content */}
        <div className={`flex-1 p-8 transition-opacity duration-150 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-[27px] text-ink leading-tight mb-2">Welcome to Ruled.Ink</h1>
                <p className="text-sm text-muted">Your personal productivity system. Let's set it up in 2 minutes.</p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-medium text-muted uppercase tracking-wider">What's your name?</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Priya"
                  className="w-full bg-surface2 border border-border2 rounded-md px-4 py-3 text-base text-text focus:outline-none focus:border-accent transition-colors"
                />
                <p className="text-[12px] text-faint italic">This stays on your device. Ruled.Ink stores nothing online.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-[27px] text-ink leading-tight mb-2">When does your day run?</h1>
                <p className="text-sm text-muted">This builds your daily timeline automatically.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[12px] text-muted uppercase tracking-wider">Wake up time</label>
                  <input type="time" value={dayConfig.wakeTime} onChange={(e) => setDayConfig({...dayConfig, wakeTime: e.target.value})} className="onboarding-input" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[12px] text-muted uppercase tracking-wider">Sleep time</label>
                  <input type="time" value={dayConfig.sleepTime} onChange={(e) => setDayConfig({...dayConfig, sleepTime: e.target.value})} className="onboarding-input" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[12px] text-muted uppercase tracking-wider">College/Work start</label>
                  <input type="time" value={dayConfig.collegeStart} onChange={(e) => setDayConfig({...dayConfig, collegeStart: e.target.value})} className="onboarding-input" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[12px] text-muted uppercase tracking-wider">College/Work end</label>
                  <input type="time" value={dayConfig.collegeEnd} onChange={(e) => setDayConfig({...dayConfig, collegeEnd: e.target.value})} className="onboarding-input" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[12px] text-muted uppercase tracking-wider">One-way commute (min)</label>
                  <input type="number" min="0" max="180" value={dayConfig.commuteMinutes} onChange={(e) => setDayConfig({...dayConfig, commuteMinutes: e.target.value})} className="onboarding-input" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[12px] text-muted uppercase tracking-wider">What do you study/work?</label>
                  <input type="text" placeholder="e.g. Computer Science" value={dayConfig.fieldOfStudy} onChange={(e) => setDayConfig({...dayConfig, fieldOfStudy: e.target.value})} className="onboarding-input" />
                </div>
              </div>

              <div className="bg-surface2 border border-border rounded-lg p-3 space-y-1">
                {schedulePreview.map((line, i) => (
                  <div key={i} className="font-mono text-[12px] text-muted">{line}</div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h1 className="font-display text-[27px] text-ink leading-tight mb-1">What are you building skills in?</h1>
                <p className="text-sm text-muted">Add up to 6 areas you're actively learning.</p>
              </div>

              <div className="space-y-3 max-h-[240px] overflow-auto pr-2">
                {skills.map((skill, index) => (
                  <div key={skill.id} className="p-3 bg-surface2 border border-border2 rounded-lg space-y-3 relative group">
                    <button onClick={() => removeSkill(skill.id)} className="absolute top-2 right-2 text-faint hover:text-red-soft transition-colors text-lg leading-none">×</button>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Skill name (e.g. ML)" 
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        className="bg-transparent border-b border-border3 text-xs py-1 focus:outline-none" 
                      />
                      <input 
                        type="text" 
                        placeholder="Current topic" 
                        value={skill.topic}
                        onChange={(e) => updateSkill(skill.id, 'topic', e.target.value)}
                        className="bg-transparent border-b border-border3 text-xs py-1 focus:outline-none" 
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={skill.pct}
                        onChange={(e) => updateSkill(skill.id, 'pct', parseInt(e.target.value))}
                        className="flex-1 accent-accent h-1" 
                      />
                      <span className="text-[11px] font-mono text-muted w-8 text-right">{skill.pct}%</span>
                    </div>
                  </div>
                ))}
                {skills.length < 6 && (
                  <button onClick={addSkill} className="w-full py-2 border border-dashed border-border2 rounded-lg text-xs text-faint hover:text-muted hover:border-muted transition-all uppercase tracking-widest font-medium">
                    + Add Skill
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-[27px] text-ink leading-tight mb-2">What's one thing you want to do today?</h1>
                <p className="text-sm text-muted">Add your first task to get started.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-muted uppercase tracking-wider">Today's first mission</label>
                  <input 
                    type="text" 
                    value={firstTask.text}
                    onChange={(e) => setFirstTask({...firstTask, text: e.target.value})}
                    placeholder="e.g. Study Chapter 3 of ML course"
                    className="w-full bg-surface2 border border-border2 rounded-md px-4 py-3 text-base text-text focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex gap-2">
                  {['skill', 'assign', 'content', 'other'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setFirstTask({...firstTask, type: tag})}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider transition-all border ${
                        firstTask.type === tag 
                          ? 'bg-accent text-white border-accent' 
                          : 'bg-transparent text-muted border-border2'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <p className="text-sm text-muted italic font-display mt-8 text-center">
                  "Every system starts with a single task."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-between gap-4">
          {step > 1 ? (
            <button 
              onClick={handleBack}
              className="px-6 py-2.5 text-sm font-medium text-muted hover:text-text transition-colors"
            >
              ← Back
            </button>
          ) : <div></div>}
          
          <button 
            onClick={handleNext}
            className={`px-8 py-2.5 rounded-md text-sm font-medium transition-all ${
              step === 4 
                ? 'bg-accent text-white hover:bg-accent/90 shadow-sm' 
                : 'bg-ink text-surface hover:bg-ink/90'
            }`}
          >
            {step === 4 ? 'Start using Ruled.Ink →' : 'Next →'}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .onboarding-input {
          width: 100%;
          background: var(--surface2);
          border: 1px solid var(--color-border2);
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 13px;
          color: var(--color-text);
          transition: all 0.2s;
        }
        .onboarding-input:focus {
          outline: none;
          border-color: var(--color-accent);
          background: var(--color-surface);
        }
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: sepia(20%) saturate(100%) hue-rotate(30deg) brightness(80%);
          cursor: pointer;
        }
      `}} />
    </div>
  );
};

export default Onboarding;

