'use client';

import { useState } from 'react';
import { useResumeStore } from '@/hooks/useResumeStore';
import { cn } from '@/utils/cn';

export function JobDescriptionInput() {
    const { jobDescription, setJobDescription, refreshScore } = useResumeStore();
    const [isExpanded, setIsExpanded] = useState(true);

    const handleUpdate = (value: string) => {
        setJobDescription(value);
        // Debounce this in a real app, but for now direct update is fine
        // The store's refreshScore will be called by the user or useEffect? 
        // Actually store has a refreshScore but we might want to trigger it here.
        // Let's rely on the useEffect in the store or a button. 
        // For now, let's just set it. The score update typically happens when data changes.
    };

    const handleAnalyze = () => {
        refreshScore();
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Job Description Match</h3>
                        <p className="text-sm text-gray-500">Paste the job description to optimize your resume</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <svg
                        className={cn("h-5 w-5 transition-transform", isExpanded ? "rotate-180" : "")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div className={cn("transition-all duration-300 ease-in-out", isExpanded ? "block" : "hidden")}>
                <textarea
                    value={jobDescription}
                    onChange={(e) => handleUpdate(e.target.value)}
                    placeholder="Paste the full job description here..."
                    className="min-h-[150px] w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <div className="mt-3 flex justify-end">
                    <button
                        onClick={handleAnalyze}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Analyze Match
                    </button>
                </div>
            </div>
        </div>
    );
}
