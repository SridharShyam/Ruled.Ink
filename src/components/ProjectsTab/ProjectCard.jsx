import React from 'react';
import { Code, Globe, Calendar, Edit2, Archive, Trash2 } from 'lucide-react';

const statusColors = {
  Idea: 'bg-surface2 text-muted border-border',
  Building: 'bg-accent2/10 text-accent2 border-accent2/20', // purple
  Deployed: 'bg-blue-soft/10 text-blue-soft border-blue-soft/20', // teal/blue
  Published: 'bg-accent/10 text-accent border-accent/20', // green
  Submitted: 'bg-accent4/10 text-accent4 border-accent4/20',
  'On Hold': 'bg-red-soft/10 text-red-soft border-red-soft/20', // red
};

export default function ProjectCard({ project, onEdit, onArchive, onUpdateProgress, onDelete }) {
  const isOverdue = project.deadline && new Date(project.deadline) < new Date();

  return (
    <div className={`notebook-card p-6 flex flex-col gap-5 group ${project.archived ? 'opacity-60 grayscale' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg font-medium text-ink leading-tight">{project.name}</h3>
          <p className="font-body text-xs text-muted leading-relaxed line-clamp-2">{project.description}</p>
        </div>
        <div className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-medium uppercase tracking-wider border ${statusColors[project.status] || statusColors.Idea}`}>
          {project.status}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((tag, i) => (
          <span key={i} className="px-2 py-0.5 bg-surface2 border border-border rounded-sm text-[10px] font-mono text-muted">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
            <Code size={14} />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent2 transition-colors">
              <Globe size={14} />
            </a>
          )}
        </div>

        {project.deadline && (
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
            <Calendar size={11} className={isOverdue ? 'text-red-soft font-bold' : 'text-faint'} />
            <span className={isOverdue ? 'text-red-soft font-bold' : ''}>
              {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2 pt-2 border-t border-border">
        <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-faint">
          <span>Completion</span>
          <span className="text-accent font-bold">{project.progress}%</span>
        </div>
        <input 
          type="range"
          min="0"
          max="100"
          value={project.progress}
          onChange={(e) => onUpdateProgress(project.id, parseInt(e.target.value))}
          className="w-full h-1 bg-bar-bg rounded-lg appearance-none cursor-pointer accent-accent"
        />
      </div>

      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(project)} className="text-muted hover:text-accent p-1"><Edit2 size={12} /></button>
        <button onClick={() => onArchive(project.id)} className="text-muted hover:text-accent3 p-1"><Archive size={12} /></button>
        <button onClick={() => onDelete(project.id)} className="text-muted hover:text-red-soft p-1"><Trash2 size={12} /></button>
      </div>

    </div>
  );
}

