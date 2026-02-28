'use client';

import { useState } from 'react';
import { Project } from '@/types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onAdd: (project: Project) => void;
  onUpdate: (id: string, project: Partial<Project>) => void;
  onRemove: (id: string) => void;
}

export function ProjectsForm({ projects, onAdd, onRemove }: ProjectsFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    description: '',
    technologies: [],
    link: '',
  });
  const [techInput, setTechInput] = useState('');

  const handleAdd = () => {
    if (!newProject.name) return;
    
    onAdd({
      id: Date.now().toString(),
      name: newProject.name || '',
      description: newProject.description || '',
      technologies: newProject.technologies || [],
      link: newProject.link || '',
    });
    
    setNewProject({
      name: '',
      description: '',
      technologies: [],
      link: '',
    });
    setTechInput('');
    setIsAdding(false);
  };

  const addTech = () => {
    if (!techInput.trim()) return;
    setNewProject({
      ...newProject,
      technologies: [...(newProject.technologies || []), techInput.trim()],
    });
    setTechInput('');
  };

  const removeTech = (idx: number) => {
    setNewProject({
      ...newProject,
      technologies: (newProject.technologies || []).filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{project.name}</h4>
              <p className="mt-1 text-sm text-gray-600">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <p className="mt-1 text-sm text-indigo-600">{project.link}</p>
              )}
            </div>
            <button
              onClick={() => onRemove(project.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-4">
          <div className="space-y-3">
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              placeholder="Project Name *"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Project Description"
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="url"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              placeholder="Project Link (optional)"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  placeholder="Add technology"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  onClick={addTech}
                  className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
              {(newProject.technologies?.length ?? 0) > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {newProject.technologies?.map((tech, idx) => (
                    <span key={idx} className="flex items-center gap-1 rounded bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
                      {tech}
                      <button onClick={() => removeTech(idx)} className="hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleAdd}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Add Project
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-4 text-sm font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Project
        </button>
      )}
    </div>
  );
}

