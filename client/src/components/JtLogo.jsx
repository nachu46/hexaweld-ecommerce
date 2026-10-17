import React from 'react';

const JtLogo = ({ className = "h-11 sm:h-12", dark = false }) => {
    return (
        <div className={`inline-flex items-center select-none ${className}`}>
            <img
                src="/logo.png"
                alt="Jaza Trading W.L.L"
                className={`h-full w-auto max-w-[220px] sm:max-w-[260px] object-contain transition-all duration-200 ${dark ? "brightness-0 invert" : ""}`}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
            />
            <div className="hidden flex-col justify-center text-left">
                <div className={`font-serif font-bold text-lg sm:text-xl tracking-tight leading-tight flex items-center gap-1.5 ${dark ? "text-white" : "text-[#111111]"}`}>
                    <span>JAZA TRADING</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#111111] text-white">
                        W.L.L
                    </span>
                </div>
                <div className={`text-[10px] font-medium tracking-wide ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
                    Division Of Sana Group
                </div>
            </div>
        </div>
    );
};

export default JtLogo;
