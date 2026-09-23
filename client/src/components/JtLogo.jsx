import React from 'react';

const JtLogo = ({ className = "h-10", dark = false }) => {
    return (
        <div className={`inline-flex items-center gap-3 select-none ${className}`}>
            <img
                src="/logo.png"
                alt="Jaza Trading W.L.L Logo"
                className={`h-9 sm:h-11 w-auto object-contain transition-all ${dark ? "brightness-0 invert" : ""}`}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
            />
            <div className="hidden flex-col justify-center text-left">
                <div className={`font-serif font-bold text-lg sm:text-xl tracking-tight leading-tight flex items-center gap-1.5 ${dark ? "text-white" : "text-[#1C1B17]"}`}>
                    <span>JAZA TRADING</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B15E2B] text-white uppercase tracking-wider">
                        W.L.L
                    </span>
                </div>
                <div className={`text-[10px] font-medium tracking-wide ${dark ? "text-slate-300" : "text-slate-600"}`}>
                    Division Of Sana Group
                </div>
            </div>
        </div>
    );
};

export default JtLogo;
