import { extractKeywords, calculateScore, ScoreBreakdown } from '@/lib/resume-intelligence/analyzers';
import { improveBulletPoint, generateSummary } from '@/lib/resume-intelligence/generators';
import { ResumeData } from '@/types/resume';

export interface LocalAIResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Generates ATS-friendly keywords based on a job description text.
 */
export async function generateKeywordsFromJD(jobDescription: string): Promise<LocalAIResponse<string[]>> {
    try {
        const scoredKeywords = extractKeywords(jobDescription);
        const keywords = scoredKeywords.map(k => k.keyword);
        return { success: true, data: keywords };
    } catch (error) {
        return { success: false, error: 'Failed to extract keywords locally.' };
    }
}

/**
 * Improves a single bullet point using rule-based logic.
 */
export async function improveBulletPointLocal(text: string): Promise<LocalAIResponse<string>> {
    try {
        const improved = improveBulletPoint(text);
        return { success: true, data: improved };
    } catch (error) {
        return { success: false, error: 'Failed to improve text.' };
    }
}

/**
 * Generates a professional summary.
 */
export async function generateSummaryLocal(data: ResumeData): Promise<LocalAIResponse<string>> {
    try {
        const summary = generateSummary(data);
        return { success: true, data: summary };
    } catch (error) {
        return { success: false, error: 'Failed to generate summary.' };
    }
}

/**
 * Suggests skills based on job title (simple dictionary lookup/random for now).
 */
export async function suggestSkillsLocal(jobTitle: string, currentSkills: string[]): Promise<LocalAIResponse<string[]>> {
    try {
        // In a real local logic, we might map job titles to skill categories.
        // For now, return a mix of Tech and Soft skills that are NOT in currentSkills.
        const { TECH_SKILLS, SOFT_SKILLS } = await import('@/lib/resume-intelligence/dictionaries');
        const allSkills = [...TECH_SKILLS, ...SOFT_SKILLS];
        const suggestions = allSkills
            .filter(s => !currentSkills.includes(s))
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);

        return { success: true, data: suggestions };
    } catch (error) {
        return { success: false, error: 'Failed to suggest skills.' };
    }
}

/**
 * Calculates the resume score based on 6 key factors.
 */
export function getResumeScore(data: ResumeData, jobDescription?: string): ScoreBreakdown {
    const result = calculateScore(data, jobDescription);
    return result; // Synchronous function, but keeping structure consistent
}
