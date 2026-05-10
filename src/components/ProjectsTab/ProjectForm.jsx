import React, { useState } from 'react';
import { Save, X, Plus } from 'lucide-react';

export default function ProjectForm({ onSave, onCancel, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    status: 'Idea',
    stack: '',
    github: '',
    live: '',
    deadline: '',
    target: '',
    progress: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    const project = {
      ...formData,
      id: initialData?.id || Date.now(),
      stack: typeof formData.stack === 'string' ? formData.stack.split(',').map(s => s.trim()).filter(s => s) : formData.stack,
      archived: initialData?.archived || false
    };
    onSave(project);
  };

  return (
    <form onSubmit={handleSubmit} className="notebook-card p-6 bg-surface animate-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-[0.1em]">Project Name*</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="notebook-input w-full"
              placeholder="e.g. Personal Website"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-[0.1em]">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="notebook-input w-full"
              placeholder="Short elevator pitch..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-[0.1em]">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="notebook-input w-full"
              >
                <option>Idea</option>
                <option>Building</option>
                <option>Deployed</option>
                <option>Published</option>
                <option>Submitted</option>
                <option>On Hold</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-[0.1em]">Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                className="notebook-input w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-[0.1em]">Tech Stack</label>
            <input
              type="text"
              value={formData.stack}
              onChange={(e) => setFormData({...formData, stack: e.target.value})}
              className="notebook-input w-full"
              placeholder="Python, PyTorch, React..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-[0.1em]">GitHub URL</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({...formData, github: e.target.value})}
                className="notebook-input w-full"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-[0.1em]">Live URL</label>
              <input
                type="url"
                value={formData.live}
                onChange={(e) => setFormData({...formData, live: e.target.value})}
                className="notebook-input w-full"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-[0.1em]">Competition/Target</label>
            <input
              type="text"
              value={formData.target}
              onChange={(e) => setFormData({...formData, target: e.target.value})}
              className="notebook-input w-full"
              placeholder="e.g. IEEE BIBM 2026"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <div className="flex-1 max-w-xs">
          <div className="flex justify-between items-center text-[11px] font-mono mb-2">
            <span className="text-muted uppercase">Initial Progress</span>
            <span className="text-accent">{formData.progress}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={formData.progress} 
            onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
            className="w-full h-1 bg-surface2 rounded-full appearance-none cursor-pointer accent-accent"
          />
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 border border-border rounded-md text-[14px] font-medium text-muted hover:bg-surface2 transition-all">
            CANCEL
          </button>
          <button type="submit" className="px-8 py-2 bg-accent text-surface rounded-md text-[14px] font-medium hover:bg-accent/90 transition-all flex items-center gap-2">
            <Save size={14} /> SAVE PROJECT
          </button>
        </div>
      </div>
    </form>

  );
}

