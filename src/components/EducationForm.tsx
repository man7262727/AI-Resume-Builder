'use client';

import { useState } from 'react';
import { Education } from '@/types/resume';

interface EducationFormProps {
  education: Education[];
  onAdd: (edu: Education) => void;
  onUpdate: (id: string, edu: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

export function EducationForm({ education, onAdd, onRemove }: EducationFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEdu, setNewEdu] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
  });

  const handleAdd = () => {
    if (!newEdu.institution || !newEdu.degree) return;
    
    onAdd({
      id: Date.now().toString(),
      institution: newEdu.institution || '',
      degree: newEdu.degree || '',
      field: newEdu.field || '',
      startDate: newEdu.startDate || '',
      endDate: newEdu.endDate || '',
      gpa: newEdu.gpa || '',
    });
    
    setNewEdu({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    });
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div key={edu.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-xs text-gray-500">
                {edu.startDate} - {edu.endDate}
                {edu.gpa && <span className="ml-2">• GPA: {edu.gpa}</span>}
              </p>
            </div>
            <button
              onClick={() => onRemove(edu.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={newEdu.institution}
              onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
              placeholder="Institution *"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="text"
              value={newEdu.degree}
              onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
              placeholder="Degree *"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="text"
              value={newEdu.field}
              onChange={(e) => setNewEdu({ ...newEdu, field: e.target.value })}
              placeholder="Field of Study"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="text"
              value={newEdu.gpa}
              onChange={(e) => setNewEdu({ ...newEdu, gpa: e.target.value })}
              placeholder="GPA (optional)"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="text"
              value={newEdu.startDate}
              onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })}
              placeholder="Start Year"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="text"
              value={newEdu.endDate}
              onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })}
              placeholder="End Year"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleAdd}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Add Education
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
          Add Education
        </button>
      )}
    </div>
  );
}

