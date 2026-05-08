import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { DEFAULT_PROJECTS } from '../../data/defaults';

const COLUMNS = ['Idea', 'Building', 'Deployed', 'Published', 'Submitted', 'On Hold'];

export default function ProjectBoard({ addLog, showToast }) {
  const [projects, setProjects] = useLocalStorage('ruled_projects', DEFAULT_PROJECTS);
  const [showForm, setShowForm] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleSave = (project) => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...project, id: p.id } : p));
      showToast('Project updated');
    } else {
      setProjects([...projects, { ...project, id: Date.now() }]);
      addLog(`🚀 New project initiated: ${project.name}`);
      showToast('Project added');
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const updateProgress = (id, progress) => {
    setProjects(projects.map(p => p.id === id ? { ...p, progress } : p));
  };

  const archiveProject = (id) => {
    setProjects(projects.map(p => p.id === id ? { ...p, archived: !p.archived } : p));
  };

  const deleteProject = (id) => {
    if (window.confirm('Delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
      showToast('Project deleted', 'error');
    }
  };

  return (
    <div className="animate-in">
      <header className="flex justify-between items-center mb-12">
        <h2 className="font-display text-2xl italic text-ink">Project Missions</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowArchived(!showArchived)}
            className="text-[11px] font-mono text-muted uppercase tracking-wider hover:text-accent transition-all"
          >
            {showArchived ? 'Hide Archived' : `Show Archived (${projects.filter(p => p.archived).length})`}
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-accent text-surface px-8 py-2.5 rounded-md text-[13px] font-medium hover:bg-accent/90 transition-all flex items-center gap-2"
          >
            <Plus size={16} /> NEW MISSION
          </button>
        </div>
      </header>

      <div className="flex gap-10 overflow-x-auto pb-10 min-h-[700px]">
        {COLUMNS.map(col => {
          const colProjects = projects.filter(p => p.status === col && (showArchived ? p.archived : !p.archived));
          return (
            <div key={col} className="flex-1 min-w-[280px] flex flex-col gap-8 border-r border-border last:border-r-0 pr-10">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-body text-xs font-medium text-muted uppercase tracking-[0.1em]">{col} ({colProjects.length})</h3>
              </div>

              <div className="flex flex-col gap-6">

                {colProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                    onEdit={(p) => { setEditingProject(p); setShowForm(true); }}
                    onArchive={archiveProject}
                    onUpdateProgress={updateProgress}
                    onDelete={deleteProject}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <ProjectForm 
          project={editingProject} 
          onSave={handleSave} 
          onCancel={() => { setShowForm(false); setEditingProject(null); }} 
        />
      )}
    </div>
  );
}
