'use client';

import { useResumeStore } from '@/hooks/useResumeStore';
import { cn } from '@/utils/cn';

export function ScoreDashboard() {
    const { resumeScore, refreshScore } = useResumeStore();

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600 bg-green-50";
        if (score >= 60) return "text-amber-600 bg-amber-50";
        return "text-red-600 bg-red-50";
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Resume Score</h3>
                    <p className="text-sm text-gray-500">Based on ATS best practices</p>
                </div>
                <div className={cn("text-3xl font-black", getScoreColor(resumeScore.total).split(' ')[0])}>
                    {resumeScore.total}
                </div>
            </div>

            <div className="space-y-4">
                <ScoreItem label="Keywords Match" score={resumeScore.keywordMatch} max={25} />
                <ScoreItem label="Action Verbs" score={resumeScore.actionVerbs} max={15} />
                <ScoreItem label="Quantified Results" score={resumeScore.quantifiedResults} max={20} />
                <ScoreItem label="Skills Coverage" score={resumeScore.skillsCoverage} max={15} />
                <ScoreItem label="Formatting" score={resumeScore.formatting} max={15} />
                <ScoreItem label="Completeness" score={resumeScore.completeness} max={10} />
            </div>

            <button
                onClick={refreshScore}
                className="mt-6 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
                Update Score
            </button>
        </div>
    );
}

function ScoreItem({ label, score, max }: { label: string; score: number; max: number }) {
    const percentage = Math.round((score / max) * 100);

    return (
        <div>
            <div className="mb-1 flex justify-between text-xs font-medium">
                <span className="text-gray-700">{label}</span>
                <span className="text-gray-500">{score}/{max}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-500",
                        percentage >= 80 ? "bg-green-500" : percentage >= 50 ? "bg-amber-500" : "bg-red-500"
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
