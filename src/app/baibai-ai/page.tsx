'use client';

import { useState } from 'react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string; // Optional: could be derived or manually set
}

export default function BaiBaiAiPage() {
  const [newEntry, setNewEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    // Mock data for now
    {
      id: '1',
      date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
      content: 'Feeling a bit overwhelmed today with all the to-dos. Took a few deep breaths.',
      mood: 'Overwhelmed',
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      content: 'Had a good chat with a friend, feeling more positive. The AI prompt about gratitude was helpful.',
      mood: 'Positive',
    },
  ]);
  const [aiPrompt, setAiPrompt] = useState('What are you grateful for today?'); // Mock AI Prompt

  const handleSaveEntry = () => {
    if (!newEntry.trim()) return; // Prevent saving empty entries

    const entry: JournalEntry = {
      id: Date.now().toString(), // Simple ID generation for now
      date: new Date().toISOString().split('T')[0],
      content: newEntry,
    };
    setJournalEntries([entry, ...journalEntries]);
    setNewEntry('');
    // In a real app, you would save this to a secure backend/local storage
    // and potentially trigger a token reward.
    console.log('Journal entry saved:', entry);
    // Mock a new prompt after saving
    setAiPrompt('What is one small act of self-kindness you can do today?');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">BaiBai AI Digital Doula</h1>
        <p className="text-xl mt-2 text-neutral-content">Your safe space to reflect, process, and grow.</p>
      </header>

      <section className="mb-8 p-6 bg-base-200 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-3 text-secondary">Today's Reflection Prompt:</h2>
        <p className="italic text-lg">{aiPrompt}</p>
      </section>

      <section className="mb-8">
        <textarea
          className="textarea textarea-bordered textarea-lg w-full h-48 p-4 focus:border-primary transition-all"
          placeholder="Share your thoughts and feelings here... Your words are safe and encrypted."
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        ></textarea>
        <button 
          className="btn btn-primary mt-4 w-full lg:w-auto"
          onClick={handleSaveEntry}
          disabled={!newEntry.trim()}
        >
          Save Journal Entry
        </button>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center lg:text-left">Your Journal</h2>
        {journalEntries.length === 0 ? (
          <p className="text-center text-neutral-content italic">Your journal is empty. Start by writing your first entry above.</p>
        ) : (
          <div className="space-y-6">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  <p className="text-xs text-neutral-content mb-1">{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  {entry.mood && <span className="badge badge-accent mb-2">Mood: {entry.mood}</span>}
                  <p className="whitespace-pre-wrap">{entry.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 