import { ACTION_VERBS, WEAK_WORDS_MAP } from './dictionaries';
import { ResumeData } from '@/types/resume';

/**
 * Heuristically improves a bullet point by:
 * 1. Detecting weak starting words and suggesting strong action verbs.
 * 2. converting "passive voice" constructions (simple regex).
 * 3. Encouraging quantification.
 */
export function improveBulletPoint(text: string): string {
    let improved = text.trim();

    // 1. Check for weak words
    for (const [weak, strongOptions] of Object.entries(WEAK_WORDS_MAP)) {
        const regex = new RegExp(`\\b${weak}\\b`, 'gi');
        if (regex.test(improved)) {
            // Pick the first strong option for now, or randomize?
            const replacement = strongOptions[Math.floor(Math.random() * strongOptions.length)];
            improved = improved.replace(regex, replacement);
        }
    }

    // 2. Check for passive start (e.g. "Was responsible for...")
    if (/^was responsible for/i.test(improved)) {
        improved = improved.replace(/^was responsible for/i, "Spearheaded");
    } else if (/^responsible for/i.test(improved)) {
        improved = improved.replace(/^responsible for/i, "Managed");
    } else if (/^helped with/i.test(improved)) {
        improved = improved.replace(/^helped with/i, "Collaborated on");
    }

    // 3. Ensure it starts with a capital letter
    improved = improved.charAt(0).toUpperCase() + improved.slice(1);

    // 4. If no number is present, add a placeholder for quantification (optional, might be annoying if overused)
    // strict check: if it's very short, maybe prompt user?
    if (!/\d/.test(improved) && improved.length > 20) {
        // improved += " [Add metric: increased by % or saved $]"; 
        // Let's not modify user text *too* aggressively with placeholders, just enhance wording.
    }

    return improved;
}

/**
 * Generates a professional summary based on a template.
 */
export function generateSummary(data: ResumeData): string {
    const { personalInfo, experiences, skills } = data;
    const role = experiences[0]?.position || "Professional";
    const years = experiences.length > 0
        ? calculateFilesYears(experiences)
        : "several";

    const topSkills = skills.slice(0, 3).map(s => s.name).join(", ");
    const achievement = experiences[0]?.highlights?.[0] || "delivering high-quality solutions";

    // Template:
    // "Results-driven {role} with {X}+ years experience in {skills}. Proven ability to {achievement}. Skilled in {tools}. Seeking to contribute to {target role}."

    return `Results-driven ${role} with ${years}+ years of experience in ${topSkills || 'various technologies'}. Proven ability to ${cleanAchievement(achievement)}. Skilled in driving projects from conception to deployment. Seeking to leverage expertise to contribute to innovative teams.`;
}

function calculateFilesYears(experiences: any[]): number {
    // sophisticated date math
    // for now return approximate count based on number of roles * 1.5? 
    // real implementation: parse start/end dates.
    return experiences.length * 2; // rough estimate
}

function cleanAchievement(text: string): string {
    return text.replace(/^Managed |^Led /i, "").toLowerCase();
}
