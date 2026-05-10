import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import SkillCard from './SkillTab/SkillCard';
import StudyLog from './SkillTab/StudyLog';

export default function SkillTab({ studyLogs, setStudyLogs, addLog }) {
  const [skills, setSkills] = useLocalStorage('ruled_skills', []);

  return (
    <div className="animate-in fade-in duration-150">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start lg:items-center gap-4 mb-8">
          <h2 className="text-[12px] font-medium text-muted uppercase tracking-[0.2em]">
            Active Skill Tree
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                const name = prompt("Enter skill name:");
                if (name) {
                  const newSkill = { id: Date.now(), name, topic: "Starting...", pct: 0, color: "#5c7a5c", icon: "📘" };
                  setSkills([...skills, newSkill]);
                  addLog(`+ New skill added: ${name}`);
                }
              }}
              className="bg-accent text-surface px-4 py-2 rounded-md text-[12px] font-medium hover:bg-accent/90 transition-all"
            >
              + ADD SKILL
            </button>
            <button 
              onClick={() => alert("AI Recommendation: Focus on your lowest progress skill to maintain balance.")}
              className="bg-accent/10 text-accent border border-accent/20 px-4 py-2 rounded-md text-[12px] font-medium hover:bg-accent hover:text-surface transition-all"
            >
              RECOMMENDATION
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center px-4 border border-dashed border-border rounded-lg">
              <span className="text-2xl mb-3 opacity-30">📘</span>
              <p className="text-[14px] text-muted font-body">
                No skills added yet. Click "+ Add Skill" to start tracking your progress.
              </p>
            </div>
          )}
        </div>
      </div>

      <StudyLog logs={studyLogs} setLogs={setStudyLogs} addLog={addLog} />
    </div>
  );
}

