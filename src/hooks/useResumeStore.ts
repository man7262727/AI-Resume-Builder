import { useContext } from 'react';
import { ResumeContext, ResumeContextType } from '@/context/ResumeContext';

export function useResumeStore(): ResumeContextType {
  const context = useContext(ResumeContext);

  if (context === undefined) {
    throw new Error('useResumeStore must be used within a ResumeProvider');
  }

  return context;
}
