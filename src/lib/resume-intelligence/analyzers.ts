import { ResumeData } from '@/types/resume';
import { ACTION_VERBS, SOFT_SKILLS, STOP_WORDS, TECH_SKILLS } from './dictionaries';
import { cleanText, generateNGrams, removeStopwords, tokenize } from './text-utils';

export interface ScoredKeyword {
    keyword: string;
    count: number;
    category: 'technical' | 'soft' | 'general';
}

export interface MatchResult {
    matchPercentage: number;
    missingKeywords: string[];
    presentKeywords: string[];
    keywordDensity: number;
}

export interface AtsIssue {
    id: string;
    severity: 'high' | 'medium' | 'low';
    title: string;
    description: string;
}

export interface ScoreBreakdown {
    keywordMatch: number;      // 25
    actionVerbs: number;       // 15
    quantifiedResults: number; // 20
    skillsCoverage: number;    // 15
    formatting: number;        // 15
    completeness: number;      // 10
    total: number;
}

const SKILL_SET = new Set([...TECH_SKILLS.map(s => s.toLowerCase()), ...SOFT_SKILLS.map(s => s.toLowerCase())]);

/**
 * Extracts top keywords from a job description.
 * It looks for unigram words and bigram phrases that match known skills,
 * or frequent terms that are not stopwords.
 */
export function extractKeywords(jobDescription: string): ScoredKeyword[] {
    const tokens = tokenize(jobDescription);
    const filteredTokens = removeStopwords(tokens);

    const frequencyMap = new Map<string, number>();

    // Count unigrams
    filteredTokens.forEach(token => {
        frequencyMap.set(token, (frequencyMap.get(token) || 0) + 1);
    });

    // Check bigrams for skills (e.g., "project management", "machine learning")
    const bigrams = generateNGrams(tokens, 2);
    bigrams.forEach(bigram => {
        if (SKILL_SET.has(bigram)) {
            frequencyMap.set(bigram, (frequencyMap.get(bigram) || 0) + 2); // Boost skills
        }
    });

    const keywords: ScoredKeyword[] = [];

    frequencyMap.forEach((count, keyword) => {
        let category: ScoredKeyword['category'] = 'general';
        if (TECH_SKILLS.some(s => s.toLowerCase() === keyword)) category = 'technical';
        else if (SOFT_SKILLS.some(s => s.toLowerCase() === keyword)) category = 'soft';

        // Only include if it appears more than once OR is a known skill
        if (count > 1 || category !== 'general') {
            keywords.push({ keyword, count, category });
        }
    });

    return keywords
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);
}

/**
 * Compares resume content against job description keywords.
 */
export function calculateMatch(resumeText: string, jobKeywords: ScoredKeyword[]): MatchResult {
    const resumeTokens = new Set(tokenize(resumeText));
    const resumeBigrams = new Set(generateNGrams(tokenize(resumeText), 2));

    const presentKeywords: string[] = [];
    const missingKeywords: string[] = [];
    let matchCount = 0;

    jobKeywords.forEach(k => {
        const key = k.keyword.toLowerCase();
        if (resumeTokens.has(key) || resumeBigrams.has(key)) {
            presentKeywords.push(k.keyword);
            matchCount += 1; // Weighted by importance? For now 1:1
        } else {
            missingKeywords.push(k.keyword);
        }
    });

    const matchPercentage = jobKeywords.length > 0
        ? Math.round((matchCount / jobKeywords.length) * 100)
        : 0;

    return {
        matchPercentage,
        missingKeywords,
        presentKeywords,
        keywordDensity: Math.round((presentKeywords.length / (tokenize(resumeText).length || 1)) * 100),
    };
}

/**
 * Checks for ATS best practices.
 */
export function checkAtsCompatibility(resumeData: ResumeData): AtsIssue[] {
    const issues: AtsIssue[] = [];

    // Check for completeness
    if (!resumeData.personalInfo.summary) {
        issues.push({
            id: 'missing_summary',
            severity: 'medium',
            title: 'Missing Summary',
            description: 'A professional summary helps ATS parse your role quickly.',
        });
    }

    // Check bullet point formatting (simple heuristic: look for very long paragraphs)
    resumeData.experiences.forEach(exp => {
        if (exp.description && exp.description.length > 400 && !exp.description.includes('\n')) {
            issues.push({
                id: 'long_description',
                severity: 'high',
                title: 'Avoid Long Paragraphs',
                description: `Experience at ${exp.company} seems to use large text blocks. Use standard bullet points.`,
            });
        }
    });

    // Check for tables/columns? (Hard to do on raw data, but we enforce standard templates)
    // Check contact info
    if (!resumeData.personalInfo.email || !resumeData.personalInfo.phone) {
        issues.push({
            id: 'missing_contact',
            severity: 'high',
            title: 'Missing Contact Info',
            description: 'Email and phone interactions are critical.',
        });
    }

    return issues;
}

/**
 * Main Scoring Algorithm (0-100)
 */
export function calculateScore(resume: ResumeData, jobDescription?: string): ScoreBreakdown {
    const resumeText = JSON.stringify(resume); // Naive text extraction

    // 1. Keyword Match (25 pts)
    let keywordScore = 0;
    if (jobDescription) {
        const keywords = extractKeywords(jobDescription);
        const { matchPercentage } = calculateMatch(resumeText, keywords);
        keywordScore = (matchPercentage / 100) * 25;
    } else {
        keywordScore = 25; // Default full points if no JD provided to be nice
    }

    // 2. Action Verbs (15 pts)
    const actionVerbCount = resume.experiences.reduce((acc, exp) => {
        // Check start of highlights
        const highlights = exp.highlights || [];
        const strongBullets = highlights.filter(h => {
            const firstWord = h.trim().split(' ')[0].toLowerCase();
            return ACTION_VERBS.some(v => v.toLowerCase() === firstWord);
        }).length;
        return acc + strongBullets;
    }, 0);
    // Cap at 15 points (2 pts per strong bullet, max 15)
    const actionDiff = Math.min(actionVerbCount * 2, 15);
    const actionVerbScore = actionDiff;

    // 3. Quantified Results (20 pts)
    // Look for numbers/percent in experience
    const quantifyRegex = /\d+%|\$\d+|\d+ (years|users|clients|projects)/gi; // global flag to find all matches
    const quantCount = resume.experiences.reduce((acc, exp) => {
        const text = (exp.description || '') + (exp.highlights || []).join(' ');
        const matches = text.match(quantifyRegex);
        return acc + (matches ? matches.length * 4 : 0); // 4 points per quantified result found
    }, 0);
    const quantifiedScore = Math.min(quantCount, 20);

    // 4. Skills Coverage (15 pts)
    const skillsScore = Math.min(resume.skills.length * 1.5, 15);

    // 5. Formatting Compliance (15 pts)
    // We deduct for issues
    const atsIssues = checkAtsCompatibility(resume);
    const formattingScore = Math.max(0, 15 - atsIssues.length * 3);

    // 6. Completeness (10 pts)
    let completeness = 0;
    if (resume.personalInfo.fullName) completeness += 2;
    if (resume.personalInfo.email) completeness += 2;
    if (resume.experiences.length > 0) completeness += 3;
    if (resume.education.length > 0) completeness += 3;

    return {
        keywordMatch: Math.round(keywordScore),
        actionVerbs: Math.round(actionVerbScore),
        quantifiedResults: Math.round(quantifiedScore),
        skillsCoverage: Math.round(skillsScore),
        formatting: Math.round(formattingScore),
        completeness: Math.round(completeness),
        total: Math.round(keywordScore + actionVerbScore + quantifiedScore + skillsScore + formattingScore + completeness)
    };
}
