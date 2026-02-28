'use client';

import { createContext, useState, useCallback, ReactNode } from 'react';
import { ResumeData, Experience, Education, Skill, Project, PersonalInfo } from '@/types/resume';
import { ScoreBreakdown, calculateScore } from '@/lib/resume-intelligence/analyzers';

const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: '',
        summary: '',
    },
    experiences: [],
    education: [],
    skills: [],
    projects: [],
};

const initialScore: ScoreBreakdown = {
    keywordMatch: 0,
    actionVerbs: 0,
    quantifiedResults: 0,
    skillsCoverage: 0,
    formatting: 0,
    completeness: 0,
    total: 0
};

export interface ResumeContextType {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
    addExperience: (experience: Experience) => void;
    updateExperience: (id: string, experience: Partial<Experience>) => void;
    removeExperience: (id: string) => void;
    addEducation: (edu: Education) => void;
    updateEducation: (id: string, edu: Partial<Education>) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill: Skill) => void;
    removeSkill: (id: string) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    removeProject: (id: string) => void;
    jobDescription: string;
    setJobDescription: React.Dispatch<React.SetStateAction<string>>;
    resumeScore: ScoreBreakdown;
    refreshScore: () => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
    const [jobDescription, setJobDescription] = useState('');
    const [resumeScore, setResumeScore] = useState<ScoreBreakdown>(initialScore);

    const refreshScore = useCallback(() => {
        const score = calculateScore(resumeData, jobDescription);
        setResumeScore(score);
    }, [resumeData, jobDescription]);

    const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...info },
        }));
    }, []);

    const addExperience = useCallback((experience: Experience) => {
        setResumeData(prev => ({
            ...prev,
            experiences: [...prev.experiences, experience],
        }));
    }, []);

    const updateExperience = useCallback((id: string, experience: Partial<Experience>) => {
        setResumeData(prev => ({
            ...prev,
            experiences: prev.experiences.map(exp =>
                exp.id === id ? { ...exp, ...experience } : exp
            ),
        }));
    }, []);

    const removeExperience = useCallback((id: string) => {
        setResumeData(prev => ({
            ...prev,
            experiences: prev.experiences.filter(exp => exp.id !== id),
        }));
    }, []);

    const addEducation = useCallback((edu: Education) => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, edu],
        }));
    }, []);

    const updateEducation = useCallback((id: string, edu: Partial<Education>) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(e =>
                e.id === id ? { ...e, ...edu } : e
            ),
        }));
    }, []);

    const removeEducation = useCallback((id: string) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(e => e.id !== id),
        }));
    }, []);

    const addSkill = useCallback((skill: Skill) => {
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, skill],
        }));
    }, []);

    const removeSkill = useCallback((id: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s.id !== id),
        }));
    }, []);

    const addProject = useCallback((project: Project) => {
        setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, project],
        }));
    }, []);

    const updateProject = useCallback((id: string, project: Partial<Project>) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.map(p =>
                p.id === id ? { ...p, ...project } : p
            ),
        }));
    }, []);

    const removeProject = useCallback((id: string) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.id !== id),
        }));
    }, []);

    return (
        <ResumeContext.Provider value={{
            resumeData,
            setResumeData,
            updatePersonalInfo,
            addExperience,
            updateExperience,
            removeExperience,
            addEducation,
            updateEducation,
            removeEducation,
            addSkill,
            removeSkill,
            addProject,
            updateProject,
            removeProject,
            jobDescription,
            setJobDescription,
            resumeScore,
            refreshScore
        }}>
            {children}
        </ResumeContext.Provider>
    );
}
