'use client';

import { useState } from 'react';
import { Skill } from '@/types/resume';
import { suggestSkillsLocal } from '@/services/local-ai';
import { cn } from '@/utils/cn';

interface SkillsFormProps {
  skills: Skill[];
  onAdd: (skill: Skill) => void;
  onRemove: (id: string) => void;
  jobTitle: string;
}

export function SkillsForm({ skills, onAdd, onRemove, jobTitle }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState<Skill['level']>('intermediate');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAdd = () => {
    if (!newSkill.trim()) return;

    onAdd({
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: newLevel,
    });

    setNewSkill('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleSuggestSkills = async () => {
    setIsGenerating(true);
    const result = await suggestSkillsLocal(
      jobTitle || 'professional',
      skills.map(s => s.name)
    );

    if (result.success && result.data) {
      setSuggestions(result.data);
    }
    setIsGenerating(false);
  };

  const addSuggestedSkill = (skill: string) => {
    onAdd({
      id: Date.now().toString(),
      name: skill,
      level: 'intermediate',
    });
    setSuggestions(suggestions.filter(s => s !== skill));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={cn(
              "group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all",
              skill.level === 'expert' && "bg-gradient-to-r from-violet-500 to-indigo-500 text-white",
              skill.level === 'advanced' && "bg-indigo-100 text-indigo-700",
              skill.level === 'intermediate' && "bg-blue-100 text-blue-700",
              skill.level === 'beginner' && "bg-gray-100 text-gray-700"
            )}
          >
            {skill.name}
            <button
              onClick={() => onRemove(skill.id)}
              className="opacity-60 hover:opacity-100"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <select
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value as Skill['level'])}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
        <button
          onClick={handleAdd}
          disabled={!newSkill.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </div>

      <div>
        <button
          onClick={handleSuggestSkills}
          disabled={isGenerating}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all",
            isGenerating
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
          )}
        >
          {isGenerating ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Suggest Skills
            </>
          )}
        </button>

        {suggestions.length > 0 && (
          <div className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50 p-3">
            <p className="mb-2 text-xs font-medium text-indigo-700">Suggested skills (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => addSuggestedSkill(skill)}
                  className="rounded-full border border-indigo-300 bg-white px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

