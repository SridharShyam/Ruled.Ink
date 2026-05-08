import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

export default function BlockForm({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Study');
  const [time, setTime] = useState('19:00');
  const [duration, setDuration] = useState(60);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, type, time, duration: parseInt(duration) });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface2/80 p-3 rounded-md border border-border mt-2 flex flex-col gap-2 animate-in">
      <input
        autoFocus
        type="text"
        placeholder="Block Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="notebook-input text-xs py-1.5"
      />
      <div className="grid grid-cols-2 gap-2">
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          className="notebook-input text-[10px] py-1 px-2"
        >
          <option>Study</option>
          <option>Project Work</option>
          <option>Content</option>
          <option>Assignment</option>
          <option>Revision</option>
          <option>Break</option>
          <option>Other</option>
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="notebook-input text-[10px] py-1 px-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="notebook-input text-[10px] py-1 px-2 w-16"
        />
        <span className="text-[9px] text-muted uppercase font-medium">MINUTES</span>
      </div>
      <div className="flex gap-2 mt-1">
        <button type="submit" className="flex-1 bg-accent/20 hover:bg-accent/30 text-accent text-[10px] font-medium py-1.5 rounded-md transition-colors flex items-center justify-center gap-1">
          <Save size={12} /> SAVE
        </button>
        <button type="button" onClick={onCancel} className="bg-surface border border-border text-muted text-[10px] font-medium py-1.5 px-3 rounded-md transition-colors">
          <X size={12} />
        </button>
      </div>
    </form>

  );
}
