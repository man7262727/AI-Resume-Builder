'use client';

import { forwardRef } from 'react';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import { cn } from '@/utils/cn';

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, template }, ref) => {
    const { personalInfo, experiences, education, skills, projects } = data;

    const templateStyles = {
      modern: {
        accent: 'from-violet-600 to-indigo-600',
        heading: 'text-indigo-600',
        border: 'border-indigo-200',
      },
      classic: {
        accent: 'from-gray-700 to-gray-900',
        heading: 'text-gray-800',
        border: 'border-gray-300',
      },
      minimal: {
        accent: 'from-gray-500 to-gray-600',
        heading: 'text-gray-700',
        border: 'border-gray-200',
      },
      creative: {
        accent: 'from-pink-500 to-purple-600',
        heading: 'text-purple-600',
        border: 'border-purple-200',
      },
    };

    const style = templateStyles[template];

    return (
      <div
        ref={ref}
        className="bg-white shadow-lg mx-auto"
        style={{ width: '8.5in', minHeight: '11in', padding: '0.75in', boxSizing: 'border-box' }}
      >
        {/* Header */}
        <div className={cn("mb-6 border-b-2 pb-4", style.border)}>
          <h1 className={cn("text-3xl font-bold", style.heading)}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                {personalInfo.linkedin}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className={cn("mb-2 text-lg font-semibold uppercase tracking-wide", style.heading)}>
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className={cn("mb-3 text-lg font-semibold uppercase tracking-wide", style.heading)}>
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className={cn("mb-3 text-lg font-semibold uppercase tracking-wide", style.heading)}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </span>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className={cn("mb-3 text-lg font-semibold uppercase tracking-wide", style.heading)}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm",
                    template === 'modern' && "bg-indigo-100 text-indigo-700",
                    template === 'classic' && "bg-gray-100 text-gray-700",
                    template === 'minimal' && "border border-gray-300 text-gray-700",
                    template === 'creative' && "bg-purple-100 text-purple-700"
                  )}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className={cn("mb-3 text-lg font-semibold uppercase tracking-wide", style.heading)}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <span className="text-sm text-indigo-600">{project.link}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs text-gray-500">
                          {tech}{idx < project.technologies.length - 1 && ' •'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!personalInfo.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="flex h-64 items-center justify-center text-gray-400">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-sm">Start filling in your details to see the preview</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

