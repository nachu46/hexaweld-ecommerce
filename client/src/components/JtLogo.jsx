import React from 'react';

const JtLogo = ({ className = "h-10", dark = false }) => {
    return (
        <div className={`inline-flex items-center gap-3 font-sans select-none ${className}`}>
            {/* JT Emblem SVG - Monochrome Minimalist Design */}
            <div className="relative shrink-0 flex items-center justify-center">
                <svg
                    width="44"
                    height="44"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-sm"
                >
                    {/* Background badge */}
                    <rect width="100" height="100" rx="20" fill={dark ? "#0F172A" : "#FFFFFF"} />
                    
                    {/* JT Monogram Mark */}
                    {/* J Hook */}
                    <path
                        d="M 32 25 L 50 25 L 50 62 C 50 72 42 78 32 78 C 24 78 18 73 18 64 L 28 64 C 28 68 30 70 34 70 C 38 70 40 67 40 62 L 40 35 L 32 35 Z"
                        fill={dark ? "#FFFFFF" : "#0F172A"}
                    />
                    {/* T Bar */}
                    <path
                        d="M 44 25 L 82 25 L 82 35 L 68 35 L 68 76 L 56 76 L 56 35 L 44 35 Z"
                        fill={dark ? "#E2E8F0" : "#334155"}
                    />
                </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col justify-center text-left">
                <div className={`font-black text-lg sm:text-xl tracking-tight leading-tight flex items-center gap-1.5 ${dark ? "text-white" : "text-[#0F172A]"}`}>
                    <span>JAZA TRADING</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${dark ? "bg-white/10 text-white border-white/20" : "bg-slate-100 text-slate-800 border-slate-300"}`}>
                        WLL
                    </span>
                </div>
                <div className={`text-[10px] sm:text-[11px] font-semibold tracking-wide ${dark ? "text-slate-400" : "text-slate-500"}`}>
                    Division Of Sana Group
                </div>
            </div>
        </div>
    );
};

export default JtLogo;
