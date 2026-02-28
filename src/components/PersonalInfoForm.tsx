'use client';

import { useState } from 'react';
import { PersonalInfo } from '@/types/resume';
import { generateSummaryLocal } from '@/services/local-ai';
import { cn } from '@/utils/cn';
import { useResumeStore } from '@/hooks/useResumeStore';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: Partial<PersonalInfo>) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { resumeData } = useResumeStore(); // Needed for context in summary generation

  const handleEnhanceSummary = async () => {
    // Generate summary based on currently entered data + other sections from store
    setIsEnhancing(true);
    // Combine current form data with store data to get full picture
    const fullData = { ...resumeData, personalInfo: { ...resumeData.personalInfo, ...data } };

    const result = await generateSummaryLocal(fullData);
    if (result.success && result.data) {
      onChange({ summary: result.data });
    }
    setIsEnhancing(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="John Doe"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="john@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="San Francisco, CA"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            type="url"
            value={data.linkedin}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/johndoe"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="johndoe.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
          <button
            onClick={handleEnhanceSummary}
            disabled={isEnhancing}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              isEnhancing
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 text-white hover:from-fuchsia-600 hover:via-pink-600 hover:to-orange-500"
            )}
          >
            {isEnhancing ? (
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
                Auto-Generate
              </>
            )}
          </button>
        </div>
        <textarea
          value={data.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          placeholder="Write a brief professional summary highlighting your key skills and experience..."
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>
    </div>
  );
}

