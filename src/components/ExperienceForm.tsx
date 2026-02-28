'use client';

import { useState } from 'react';
import { Experience } from '@/types/resume';
import { improveBulletPointLocal } from '@/services/local-ai';
import { cn } from '@/utils/cn';

interface ExperienceFormProps {
  experiences: Experience[];
  onAdd: (exp: Experience) => void;
  onUpdate: (id: string, exp: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}

export function ExperienceForm({ experiences, onAdd, onUpdate, onRemove }: ExperienceFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [newExp, setNewExp] = useState<Partial<Experience>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    highlights: [],
  });

  const handleAdd = () => {
    if (!newExp.company || !newExp.position) return;

    onAdd({
      id: Date.now().toString(),
      company: newExp.company || '',
      position: newExp.position || '',
      startDate: newExp.startDate || '',
      endDate: newExp.endDate || '',
      current: newExp.current || false,
      description: newExp.description || '',
      highlights: newExp.highlights || [],
    });

    setNewExp({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: [],
    });
    setIsAdding(false);
  };

  const handleGenerateBullets = async (exp: Experience) => {
    setGeneratingFor(exp.id);
    // Logic: Split description by newlines, then improve each line.
    // If description is empty, maybe we can't do much (local AI doesn't hallucinate well).
    // But let's assume user wrote *something*.

    const lines = exp.description
      ? exp.description.split('\n').filter(line => line.trim().length > 0)
      : [];

    if (lines.length === 0) {
      // Fallback or alert? "Please add a description to extract bullets"
      // For now, duplicate existing bullets if any, or just stop
      if (exp.highlights.length > 0) {
        // Improve existing highlights
        const improvedHighlights = await Promise.all(exp.highlights.map(async h => {
          const res = await improveBulletPointLocal(h);
          return res.data || h;
        }));
        onUpdate(exp.id, { highlights: improvedHighlights });
      }
      setGeneratingFor(null);
      return;
    }

    const improvedBullets: string[] = [];
    for (const line of lines) {
      const result = await improveBulletPointLocal(line);
      if (result.success && result.data) {
        improvedBullets.push(result.data);
      } else {
        improvedBullets.push(line);
      }
    }

    onUpdate(exp.id, { highlights: improvedBullets });
    setGeneratingFor(null);
  };

  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <div key={exp.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{exp.position}</h4>
              <p className="text-sm text-gray-600">{exp.company}</p>
              <p className="text-xs text-gray-500">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
            </div>
            <button
              onClick={() => onRemove(exp.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="mb-3">
            <textarea
              value={exp.description}
              onChange={(e) => onUpdate(exp.id, { description: e.target.value })}
              placeholder="Describe your role and responsibilities..."
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <button
            onClick={() => handleGenerateBullets(exp)}
            disabled={generatingFor === exp.id}
            className={cn(
              "mb-3 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              generatingFor === exp.id
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
            )}
          >
            {generatingFor === exp.id ? (
              <>
                <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Auto-Convert to Bullets
              </>
            )}
          </button>

          {exp.highlights.length > 0 && (
            <ul className="space-y-1.5">
              {exp.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => {
                      const newHighlights = [...exp.highlights];
                      newHighlights[idx] = e.target.value;
                      onUpdate(exp.id, { highlights: newHighlights });
                    }}
                    className="flex-1 bg-transparent focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const newHighlights = exp.highlights.filter((_, i) => i !== idx);
                      onUpdate(exp.id, { highlights: newHighlights });
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {isAdding ? (
        <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={newExp.position}
              onChange={(e) => setNewExp({ ...newExp, position: e.target.value })}
              placeholder="Job Title *"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="text"
              value={newExp.company}
              onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
              placeholder="Company *"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="text"
              value={newExp.startDate}
              onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
              placeholder="Start Date (e.g., Jan 2022)"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="text"
              value={newExp.endDate}
              onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
              placeholder="End Date (e.g., Dec 2023)"
              disabled={newExp.current}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:bg-gray-100"
            />
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={newExp.current}
              onChange={(e) => setNewExp({ ...newExp, current: e.target.checked, endDate: '' })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            Currently working here
          </label>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleAdd}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Add Experience
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-4 text-sm font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Experience
        </button>
      )}
    </div>
  );
}

