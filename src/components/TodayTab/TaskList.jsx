import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const tagStyles = {
  skill: 'bg-[#e8f0e8] text-[#4a6648]',
  assign: 'bg-[#f5ebe3] text-[#a0562a]',
  content: 'bg-[#ece8f5] text-[#6455a0]',
  college: 'bg-[#e3ecf5] text-[#3a6080]',
};

export default function TaskList({ tasks, setTasks, addLog }) {
  const [newTask, setNewTask] = useState('');

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const newState = !task.completed;
        if (newState) addLog(`✓ Task completed: ${task.text}`);
        return { ...task, completed: newState };
      }
      return task;
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask, completed: false, type: 'skill' };
    setTasks([task, ...tasks]);
    setNewTask('');
    addLog(`+ New task added: ${newTask}`);
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 px-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a mission..."
          className="notebook-input flex-1"
        />
        <button type="submit" className="bg-accent text-surface px-6 py-2 rounded-md text-[13px] font-medium hover:bg-accent/90 transition-all sm:w-auto w-full">
          ADD MISSION
        </button>
      </form>

      <div className="flex flex-col">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-4 py-2.5 border-b border-border group px-4 hover:bg-surface2 transition-colors">
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-[15px] h-[15px] border-[1.5px] rounded-[3px] transition-all flex items-center justify-center
                ${task.completed ? 'bg-accent border-accent text-surface' : 'border-border3 hover:border-accent'}`}
            >
              {task.completed && <span className="text-[10px] leading-none">✓</span>}
            </button>
            
            <span className={`flex-1 text-base transition-all ${task.completed ? 'text-faint line-through' : 'text-text'}`}>
              {task.text}
            </span>


            {task.type && (
              <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-mono font-medium uppercase tracking-wider ${tagStyles[task.type] || 'bg-surface2 text-muted'}`}>
                {task.type}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
