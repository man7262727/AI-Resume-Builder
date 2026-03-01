'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useResumeStore } from '@/hooks/useResumeStore';
import { cn } from '@/utils/cn';
import { dummyResumes } from '@/data/dummyResumes';

export function DummyDataSelector() {
    const { setResumeData, setJobDescription } = useResumeStore();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const openDropdown = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom + 8,
                right: window.innerWidth - rect.right,
            });
        }
        setIsOpen(o => !o);
    };

    useEffect(() => {
        if (!isOpen) return;
        const close = () => setIsOpen(false);
        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);
        return () => {
            window.removeEventListener('scroll', close, true);
            window.removeEventListener('resize', close);
        };
    }, [isOpen]);

    const handleSelect = (key: string) => {
        const entry = dummyResumes[key];
        if (entry) {
            if (window.confirm('This will replace your current resume data. Continue?')) {
                setResumeData(entry.resume);
                setJobDescription(entry.jobDescription);
                setIsOpen(false);
            }
        }
    };

    const options = Object.entries(dummyResumes).map(([key, value]) => ({
        key,
        label: value.label,
    }));

    const dropdown = isOpen && mounted ? createPortal(
        <>
            {/* Invisible full-screen click-away */}
            <div
                onClick={() => setIsOpen(false)}
                style={{
                    position: 'fixed', inset: 0,
                    zIndex: 99998,
                    background: 'transparent',
                }}
            />
            {/* The actual dropdown — rendered on body, completely outside any stacking context */}
            <div
                style={{
                    position: 'fixed',
                    top: dropdownPos.top,
                    right: dropdownPos.right,
                    zIndex: 99999,
                    minWidth: '220px',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid rgba(0,0,0,0.10)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)',
                    padding: '6px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                }}
            >
                <p style={{
                    margin: '0 0 4px 0',
                    padding: '6px 10px 4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9CA3AF',
                }}>
                    Sample Profiles
                </p>
                {options.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => handleSelect(option.key)}
                        style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'transparent',
                            color: '#111827',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = '#EEF2FF';
                            e.currentTarget.style.color = '#4338CA';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#111827';
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </>,
        document.body
    ) : null;

    return (
        <>
            <button
                ref={buttonRef}
                onClick={openDropdown}
                className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl border border-black/10 bg-white/90 text-[#374151] text-sm font-medium cursor-pointer shadow-sm hover:bg-white transition-colors"
                title="Load Sample Profile"
            >
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className="hidden md:inline">Load Sample Profile</span>
                <svg
                    width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={2}
                    className={cn("hidden sm:block transition-transform duration-200", isOpen && "rotate-180")}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {dropdown}
        </>
    );
}
