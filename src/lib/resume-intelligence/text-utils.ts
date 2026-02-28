import { STOP_WORDS } from './dictionaries';

/**
 * Normalizes text by converting to lowercase and removing special characters.
 */
export function cleanText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, ' ') // Replace special chars (except hyphen) with space
        .replace(/\s+/g, ' ')      // Collapse multiple spaces
        .trim();
}

/**
 * Splits text into an array of meaningful tokens (words).
 */
export function tokenize(text: string): string[] {
    const cleaned = cleanText(text);
    return cleaned.split(' ').filter(token => token.length > 2); // Ignore very short processing artifacts
}

/**
 * Filters out common English stopwords from a list of tokens.
 */
export function removeStopwords(tokens: string[]): string[] {
    return tokens.filter(token => !STOP_WORDS.has(token));
}

/**
 * Extracts potential n-grams (phrases of n words)
 * useful for skills like "machine learning" or "project management".
 */
export function generateNGrams(tokens: string[], n: number): string[] {
    if (tokens.length < n) return [];
    const ngrams: string[] = [];
    for (let i = 0; i <= tokens.length - n; i++) {
        ngrams.push(tokens.slice(i, i + n).join(' '));
    }
    return ngrams;
}
