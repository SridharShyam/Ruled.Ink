import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

export default function ContentForm({ onSave, onCancel, initialDate }) {
  const [formData, setFormData] = useState({
    title: '',
    platform: 'LinkedIn',
    format: 'Article',
    status: 'Idea',
    scheduledDate: initialDate || new Date().toISOString().split('T')[0],
    notes: '',
    estimatedHours: 2
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    onSave({ ...formData, id: Date.now() });
  };

  return (
    <form onSubmit={handleSubmit} className="notebook-card p-4 bg-surface border-accent mt-2 space-y-3 relative z-30">
      <input
        autoFocus
        required
        type="text"
        placeholder="Content Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        className="notebook-input w-full text-xs"
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[9px] font-medium text-muted uppercase tracking-[0.1em]">Platform</label>
          <select 
            value={formData.platform} 
            onChange={(e) => setFormData({...formData, platform: e.target.value})}
            className="notebook-input w-full text-[10px]"
          >
            <option>YouTube</option>
            <option>LinkedIn</option>
            <option>Instagram</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-medium text-muted uppercase tracking-[0.1em]">Format</label>
          <select 
            value={formData.format} 
            onChange={(e) => setFormData({...formData, format: e.target.value})}
            className="notebook-input w-full text-[10px]"
          >
            <option>Video</option>
            <option>Short</option>
            <option>Article</option>
            <option>Carousel</option>
            <option>Reel</option>
            <option>Thread</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[9px] font-medium text-muted uppercase tracking-[0.1em]">Status</label>
          <select 
            value={formData.status} 
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="notebook-input w-full text-[10px]"
          >
            <option>Idea</option>
            <option>Scripting</option>
            <option>Recording</option>
            <option>Editing</option>
            <option>Scheduled</option>
            <option>Published</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-medium text-muted uppercase tracking-[0.1em]">Hours</label>
          <input
            type="number"
            value={formData.estimatedHours}
            onChange={(e) => setFormData({...formData, estimatedHours: e.target.value})}
            className="notebook-input w-full text-[10px]"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-medium text-muted uppercase tracking-[0.1em]">Scheduled Date</label>
        <input
          type="date"
          value={formData.scheduledDate}
          onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
          className="notebook-input w-full text-[10px]"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 bg-accent text-surface text-[10px] font-medium py-2 rounded-md hover:bg-accent/90 transition-all flex items-center justify-center gap-1">
          <Save size={12} /> SAVE PIECE
        </button>
        <button type="button" onClick={onCancel} className="px-3 py-2 border border-border text-muted text-[10px] font-medium rounded-md hover:bg-surface2 transition-colors">
          <X size={12} />
        </button>
      </div>
    </form>

  );
}
