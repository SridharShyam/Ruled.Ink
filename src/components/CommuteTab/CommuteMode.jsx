import React from 'react';
import CommuteTimer from './CommuteTimer';
import LearnCard from './LearnCard';
import DSACard from './DSACard';
import IdeaCapture from './IdeaCapture';

import { commuteQuotes } from '../../data/commuteQuotes';

export default function CommuteMode({ ideas, setIdeas, addLog, showToast }) {
  const quoteIndex = new Date().getDate() % commuteQuotes.length;
  const quote = commuteQuotes[quoteIndex];

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-10 py-6 animate-in">
      <header className="flex flex-col items-center gap-2 mb-8 text-center">
        <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-2">
          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] font-bold">Travel Mode Active</span>
        </div>
        <h2 className="font-display text-2xl italic text-ink">In-Transit Focus</h2>
      </header>


      <CommuteTimer />

      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h3 className="font-body text-[11px] font-medium text-muted uppercase tracking-widest pl-2">Daily Algorithms</h3>
          <DSACard />
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-body text-[11px] font-medium text-muted uppercase tracking-widest pl-2">Capture Intelligence</h3>
          <IdeaCapture ideas={ideas} setIdeas={setIdeas} addLog={addLog} showToast={showToast} />
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-body text-[11px] font-medium text-muted uppercase tracking-widest pl-2">Accelerated Learning</h3>
          <LearnCard />
        </section>
      </div>

      <footer className="mt-12 text-center pb-20 pt-8 border-t border-border/50">
        <p className="font-display italic text-sm text-muted">"{quote}"</p>
      </footer>
    </div>
  );
}
