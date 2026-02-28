'use client';

import { useEffect, useState } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHiding(true);
            setTimeout(onComplete, 500);
        }, 1100);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 transition-opacity duration-500 ${hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            {/* Ambient background glows */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center gap-6">
                {/* Logo */}
                <div
                    className="animate-scale-in flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 shadow-2xl shadow-pink-500/40"
                    style={{ animationDelay: '0ms' }}
                >
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </div>

                {/* Title */}
                <div className="animate-slide-up text-center" style={{ animationDelay: '120ms' }}>
                    <h1 className="text-3xl font-bold text-white tracking-tight">AI Resume Builder</h1>
                    <p className="mt-1.5 text-sm text-pink-200/80 font-medium tracking-wide">Craft your story, land your dream job</p>
                </div>

                {/* Spinner */}
                <div className="animate-fade-in mt-2" style={{ animationDelay: '300ms' }}>
                    <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400"
                            style={{
                                width: '100%',
                                animation: 'shimmer 1.2s ease-in-out infinite',
                                backgroundSize: '200% 100%',
                                backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
