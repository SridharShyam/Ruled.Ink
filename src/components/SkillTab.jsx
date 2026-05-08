import React from 'react';
import { skillsData } from '../data/skills';
import SkillCard from './SkillTab/SkillCard';
import StudyLog from './SkillTab/StudyLog';

export default function SkillTab({ studyLogs, setStudyLogs, addLog }) {
  return (
    <div className="animate-in fade-in duration-150">
      <div className="mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start lg:items-center gap-4 mb-8">
        <h2 className="text-[11px] font-medium text-muted uppercase tracking-[0.2em]">
          Active Skill Tree
        </h2>
        <button 
          onClick={() => alert("AI Recommendation: Based on your current activity, focus on the skill with the lowest progress today to maintain balance.")}
          className="bg-accent/10 text-accent border border-accent/20 px-4 py-2 rounded-md text-[11px] font-medium hover:bg-accent hover:text-surface transition-all"
        >
          GET TODAY'S STUDY TOPIC RECOMMENDATION
        </button>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {skillsData.length > 0 ? (
            skillsData.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center border border-dashed border-border rounded-lg">
              <p className="text-muted text-xs italic font-body">No active skills in your tree. Add skills in the data files or via the UI if supported.</p>
            </div>
          )}
        </div>
      </div>

      <StudyLog logs={studyLogs} setLogs={setStudyLogs} addLog={addLog} />
    </div>
  );
}
