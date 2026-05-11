import React, { useRef } from 'react';
import { Download, Upload, Database } from 'lucide-react';

export default function DataManagement({ showToast }) {
  const fileInputRef = useRef(null);

  const handleExport = () => {
    try {
      const data = {};
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('ruled_') || key.startsWith('weekly_planner_')) {
          data[key] = localStorage.getItem(key);
        }
      });
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ruled-ink-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast('Data exported successfully');
    } catch (err) {
      console.error('Export failed:', err);
      showToast('Export failed', 'error');
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        // Basic validation
        if (typeof data !== 'object') throw new Error('Invalid format');
        
        // Clear current ruled_ data
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('ruled_')) {
            localStorage.removeItem(key);
          }
        });

        // Restore from backup
        Object.entries(data).forEach(([key, value]) => {
          if (key.startsWith('ruled_') || key.startsWith('weekly_planner_')) {
            localStorage.setItem(key, value);
          }
        });

        showToast('Data imported! Reloading...');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        console.error('Import failed:', err);
        showToast('Import failed: Invalid backup file', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mt-12 pt-8 border-t border-accent/10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-muted">
          <Database size={14} />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">
            System Backup & Portability
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleExport}
            className="flex items-center justify-between p-4 bg-paper border border-accent/10 rounded-sm hover:border-accent/30 transition-all group"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold text-ink">Export System</span>
              <span className="text-[10px] text-muted">Download all data as JSON</span>
            </div>
            <Download size={16} className="text-accent group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-between p-4 bg-paper border border-accent/10 rounded-sm hover:border-accent/30 transition-all group"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold text-ink">Import Backup</span>
              <span className="text-[10px] text-muted">Restore system from file</span>
            </div>
            <Upload size={16} className="text-accent group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden"
        />
        
        <p className="text-[10px] text-muted italic text-center">
          Note: Importing data will overwrite your current settings and logs.
        </p>
      </div>
    </div>
  );
}
