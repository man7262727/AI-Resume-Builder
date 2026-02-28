import { useResumeStore } from '@/hooks/useResumeStore';
import { generateKeywordsFromJD } from '@/services/local-ai';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

interface KeywordGeneratorProps {
  onInsertKeyword?: (keyword: string) => void;
}

export function KeywordGenerator() {
  const { jobDescription, setJobDescription, addSkill, resumeData } = useResumeStore();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const extract = async () => {
      if (!jobDescription) {
        setKeywords([]);
        return;
      }
      setIsGenerating(true);
      const result = await generateKeywordsFromJD(jobDescription);
      if (result.success && result.data) {
        setKeywords(result.data);
      }
      setIsGenerating(false);
    };
    // Debouce slightly to avoid spamming on every keystroke
    const timer = setTimeout(extract, 500);
    return () => clearTimeout(timer);
  }, [jobDescription]);

  const handleAddSkill = (keyword: string) => {
    // Check if skill already exists
    if (resumeData.skills.some(s => s.name.toLowerCase() === keyword.toLowerCase())) {
      return;
    }

    addSkill({
      id: Date.now().toString(),
      name: keyword,
      level: 'intermediate' // Default level
    });
  };

  const isSkillAdded = (keyword: string) => {
    return resumeData.skills.some(s => s.name.toLowerCase() === keyword.toLowerCase());
  };

  return (
    <div className="space-y-6">
      {/* Job Description Input Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>
          <p className="text-sm text-gray-500">Paste the job description here to extract keywords.</p>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          className="min-h-[150px] w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Keyword Results Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">High Impact Keywords</h3>
            <p className="text-sm text-gray-500">Extracted from your Job Description</p>
          </div>
        </div>

        {!jobDescription ? (
          <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
            Keywords will appear here once you paste a job description above.
          </div>
        ) : (
          <div>
            {isGenerating ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Extracting keywords...
              </div>
            ) : (
              <>
                {keywords.length > 0 ? (
                  <div>
                    <p className="mb-3 text-sm font-medium text-gray-700">Analyzed Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword, idx) => {
                        const added = isSkillAdded(keyword);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleAddSkill(keyword)}
                            disabled={added}
                            className={cn(
                              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                              added
                                ? "bg-green-100 text-green-700 cursor-default"
                                : "bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 hover:from-amber-200 hover:to-orange-200 shadow-sm"
                            )}
                            title={added ? "Already added to skills" : "Click to add to skills"}
                          >
                            {keyword}
                            {added && (
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {!added && (
                              <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs text-gray-500">
                      Click <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700">+</span> to add a keyword to your Skills section.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No strong keywords found in the description.</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

