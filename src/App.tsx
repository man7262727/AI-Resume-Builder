'use client';

import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useResumeStore } from '@/hooks/useResumeStore';
import { ResumeTemplate } from '@/types/resume';
import { PersonalInfoForm } from '@/components/PersonalInfoForm';
import { ExperienceForm } from '@/components/ExperienceForm';
import { EducationForm } from '@/components/EducationForm';
import { SkillsForm } from '@/components/SkillsForm';
import { ProjectsForm } from '@/components/ProjectsForm';
import { KeywordGenerator } from '@/components/KeywordGenerator';
import { ResumePreview } from '@/components/ResumePreview';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { ScoreDashboard } from '@/components/ScoreDashboard';
import { DummyDataSelector } from '@/components/DummyDataSelector';
import { LoadingScreen } from '@/components/LoadingScreen';
import { cn } from '@/utils/cn';

type TabType = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'keywords';

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  {
    id: 'personal',
    label: 'Personal',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    id: 'education',
    label: 'Education',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: 'keywords',
    label: 'AI Keywords',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

const templates: { id: ResumeTemplate; name: string; gradient: string; accent: string; desc: string }[] = [
  { id: 'modern', name: 'Modern', gradient: 'from-fuchsia-500 via-pink-500 to-orange-400', accent: 'bg-pink-500', desc: 'Bold & vibrant' },
  { id: 'classic', name: 'Classic', gradient: 'from-gray-600 to-gray-900', accent: 'bg-gray-700', desc: 'Timeless & formal' },
  { id: 'minimal', name: 'Minimal', gradient: 'from-slate-400 to-slate-600', accent: 'bg-slate-500', desc: 'Clean & simple' },
  { id: 'creative', name: 'Creative', gradient: 'from-pink-500 to-purple-600', accent: 'bg-purple-500', desc: 'Unique & bold' },
];

const tabLabels: Record<TabType, string> = {
  personal: 'Personal Information',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  keywords: 'AI Keyword Generator',
};

export function App() {
  const [appReady, setAppReady] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [template, setTemplate] = useState<ResumeTemplate>('modern');
  const [showPreview, setShowPreview] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [tabKey, setTabKey] = useState(0); // force re-mount for animation
  const printRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  // iOS indicator positioning
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateIndicator = useCallback(() => {
    const idx = tabs.findIndex(t => t.id === activeTab);
    const btn = tabRefs.current[idx];
    const bar = tabBarRef.current;
    if (!btn || !bar) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicatorStyle({
      left: btnRect.left - barRect.left,
      width: btnRect.width,
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [activeTab, updateIndicator]);

  const {
    resumeData,
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
  } = useResumeStore();

  const handleTabChange = (id: TabType) => {
    setActiveTab(id);
    setTabKey(k => k + 1);
  };

  const handlePrint = async () => {
    const printContent = printRef.current;
    if (!printContent || exporting) return;
    setExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 0,
        filename: `${resumeData.personalInfo.fullName || 'Resume'}.pdf`,
        image: { type: 'jpeg' as const, quality: 1 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const },
      };
      await html2pdf().set(opt).from(printContent).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      {!appReady && <LoadingScreen onComplete={() => setAppReady(true)} />}

      <div
        className={cn(
          'min-h-screen transition-opacity duration-500',
          appReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'linear-gradient(135deg, #f0f0f7 0%, #f8f8fc 50%, #eef0ff 100%)' }}
      >
        {/* ===== HEADER ===== */}
        <header className="sticky top-0 z-40 glass border-b border-white/60 shadow-sm">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
            {/* Logo */}
            <div className="flex items-center gap-3 animate-slide-down">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 shadow-lg shadow-pink-300/40">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                {/* glow */}
                <div className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-fuchsia-400 via-pink-400 to-orange-300 opacity-0 blur-md transition-opacity hover:opacity-40" />
              </div>
              <div>
                <h1 className="text-[15px] font-bold text-gray-900 tracking-tight">AI Resume Builder</h1>
                <p className="text-[11px] text-gray-400 font-medium tracking-wide">Powered by AI · Free forever</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 animate-slide-down" style={{ animationDelay: '60ms' }}>
              <DummyDataSelector />

              {/* Mobile toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-apple btn-secondary lg:hidden"
                aria-label="Toggle preview"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">{showPreview ? 'Edit' : 'Preview'}</span>
              </button>

              {/* Export button */}
              <button
                onClick={handlePrint}
                disabled={exporting}
                className={cn(
                  'btn-apple btn-primary animate-pulse-shadow',
                  exporting && 'opacity-75 cursor-not-allowed'
                )}
              >
                {exporting ? (
                  <svg className="h-4 w-4 animate-spin-smooth" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                )}
                <span>{exporting ? 'Generating...' : 'Export PDF'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-6">
            {/* ===== LEFT PANEL - Editor ===== */}
            <div className={cn('flex-1 min-w-0 lg:block', showPreview ? 'hidden' : 'block')}>

              {/* iOS-style segmented tab control */}
              <div
                ref={tabBarRef}
                className="segmented-control mb-5 overflow-x-auto animate-slide-up"
                style={{ animationDelay: '80ms' }}
              >
                {/* Sliding white indicator */}
                <div
                  className="segmented-indicator"
                  style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                  }}
                />
                {tabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    ref={el => { tabRefs.current[idx] = el; }}
                    onClick={() => handleTabChange(tab.id)}
                    className={cn('segmented-tab', activeTab === tab.id && 'active')}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Form card */}
              <div
                key={tabKey}
                className="card-surface p-6 animate-slide-up"
                style={{ animationDelay: '30ms' }}
              >
                <h2 className="mb-5 text-base font-semibold text-gray-900 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
                    {tabs.find(t => t.id === activeTab)?.icon}
                  </span>
                  {tabLabels[activeTab]}
                </h2>

                {activeTab === 'personal' && (
                  <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />
                )}
                {activeTab === 'experience' && (
                  <ExperienceForm
                    experiences={resumeData.experiences}
                    onAdd={addExperience}
                    onUpdate={updateExperience}
                    onRemove={removeExperience}
                  />
                )}
                {activeTab === 'education' && (
                  <EducationForm
                    education={resumeData.education}
                    onAdd={addEducation}
                    onUpdate={updateEducation}
                    onRemove={removeEducation}
                  />
                )}
                {activeTab === 'skills' && (
                  <SkillsForm
                    skills={resumeData.skills}
                    onAdd={addSkill}
                    onRemove={removeSkill}
                    jobTitle={resumeData.experiences[0]?.position || ''}
                  />
                )}
                {activeTab === 'projects' && (
                  <ProjectsForm
                    projects={resumeData.projects}
                    onAdd={addProject}
                    onUpdate={updateProject}
                    onRemove={removeProject}
                  />
                )}
                {activeTab === 'keywords' && <KeywordGenerator />}
              </div>

              {/* Template selector */}
              <div className="mt-5 card-surface p-5 animate-slide-up" style={{ animationDelay: '120ms' }}>
                <h3 className="mb-4 text-sm font-semibold text-gray-800 tracking-tight">Resume Template</h3>
                <div className="grid grid-cols-4 gap-3">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={cn(
                        'btn-apple relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all flex flex-col gap-2',
                        template === t.id
                          ? 'border-pink-400 bg-pink-50/60 ring-2 ring-pink-300/30'
                          : 'border-transparent bg-gray-50 hover:bg-white hover:border-gray-200'
                      )}
                    >
                      {/* Mini resume preview swatch */}
                      <div className={cn('h-2 w-full rounded-full bg-gradient-to-r', t.gradient)} />
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-10 rounded-full bg-gray-200" />
                        <div className="h-1.5 w-14 rounded-full bg-gray-200" />
                        <div className="h-1.5 w-8 rounded-full bg-gray-200" />
                      </div>
                      <div className="mt-1">
                        <p className="text-xs font-semibold text-gray-800">{t.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{t.desc}</p>
                      </div>
                      {template === t.id && (
                        <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 animate-scale-in">
                          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== RIGHT PANEL - Score + Preview ===== */}
            <div className={cn('flex w-full flex-col gap-5 lg:w-[520px] flex-shrink-0', showPreview ? 'flex' : 'hidden lg:flex')}>
              <div className="animate-slide-up" style={{ animationDelay: '40ms' }}>
                <ScoreDashboard />
              </div>
              {(activeTab !== 'keywords' || showPreview) && (
                <div className="animate-slide-up" style={{ animationDelay: '80ms' }}>
                  <JobDescriptionInput />
                </div>
              )}

              {/* Live Preview panel */}
              <div className="sticky top-24 animate-slide-up" style={{ animationDelay: '120ms' }}>
                <div className="mb-3 flex items-center justify-between px-1">
                  <h3 className="text-sm font-semibold text-gray-700">Live Preview</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-medium text-gray-400">Auto-updating</span>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/70 bg-gray-100 shadow-xl shadow-gray-200/60">
                  <div className="transform scale-[0.58] origin-top-left" style={{ width: '172.4%' }}>
                    <ResumePreview ref={printRef} data={resumeData} template={template} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
