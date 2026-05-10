import React from 'react';

export default function SkillCard({ skill }) {
  return (
    <button 
      onClick={() => alert(`AI Study Plan for ${skill.name}:\n1. Review ${skill.topic} fundamentals\n2. Solve 2 practice problems\n3. Document key takeaways in Log.`)}
      className="notebook-card flex flex-col text-left gap-4 group cursor-pointer hover:border-accent/30 transition-all focus:outline-none focus:ring-1 focus:ring-accent/20"
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{skill.icon}</span>
        <span className="font-mono text-[11px] text-faint uppercase">{skill.level}</span>
      </div>
      
      <div className="flex flex-col w-full">
        <h3 className="font-display text-[15px] font-medium text-ink leading-tight">
          {skill.name}
        </h3>

        <span className="font-body text-[12px] text-muted italic">
          {skill.topic}
        </span>
      </div>

      <div className="mt-2 space-y-1.5 w-full">
        <div className="flex justify-between items-center font-mono text-[10px] text-faint uppercase tracking-widest">
          <span>Progress</span>
          <span>{skill.pct}%</span>
        </div>
        <div className="h-[2px] w-full bg-bar-bg overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-1000" 
            style={{ width: `${skill.pct}%` }} 
          />
        </div>
      </div>
    </button>
  );
}

