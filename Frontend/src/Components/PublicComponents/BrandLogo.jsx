import React from "react";

/**
 * 🎨 "Funky & Busy" BrandMark
 * Added more micro-details, gradients, and animated tech-elements.
 */
const BrandMark = ({ size = 42 }) => (
    <div className="relative group flex items-center justify-center shrink-0">
        {/* Multi-layered glow for that "Funky" look */}
        <div className="absolute inset-0 bg-bright-sun-400/20 blur-xl rounded-full group-hover:bg-bright-sun-400/50 transition-all duration-700 animate-pulse"></div>

        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
        >
            {/* Base with high-end gradient */}
            <rect width="100" height="100" rx="20" fill="url(#funkyGrad)" />

            {/* "Busy" Micro-accents */}
            <rect x="10" y="10" width="80" height="4" rx="2" fill="#0D0D0D" fillOpacity="0.05" />
            <circle cx="85" cy="15" r="3" fill="#0D0D0D" fillOpacity="0.2" />
            <path d="M15 85L25 75M25 85L15 75" stroke="#0D0D0D" strokeOpacity="0.1" strokeWidth="2" />

            {/* Impactful 'B' */}
            <path
                d="M32 25H55C65 25 72 32 72 42C72 52 65 59 55 59H32V25Z"
                fill="#0D0D0D"
            />
            <path
                d="M32 50H58C68 50 75 57 75 67C75 77 68 84 58 84H32V50Z"
                fill="#0D0D0D"
            />

            {/* Floating Arrow - Moves on hover */}
            <path
                d="M48 43L55 36L62 43"
                stroke="#FAE62D"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-y-[-4px] transition-transform duration-300"
            />

            {/* Corner Tech Detail */}
            <rect x="75" y="75" width="15" height="15" rx="4" fill="#0D0D0D" fillOpacity="0.15" />
            <circle cx="82.5" cy="82.5" r="3" fill="#FAE62D" fillOpacity="0.8" />

            <defs>
                <linearGradient id="funkyGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FAE62D" />
                    <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
            </defs>
        </svg>
    </div>
);

/**
 * ✍️ Uppercase Impactful Wordmark 
 * Bold "BE ON BOARD" with restored "Work. Live. Grow." tagline.
 */
const BrandWordmark = ({ size = "default" }) => {
    const isSmall = size === "small";

    return (
        <div className="flex flex-col select-none leading-[0.8] ml-1">
            <div className={`flex items-center gap-1 ${isSmall ? "text-lg" : "text-xl lg:text-3xl"}`}>
                <span className="font-black text-white tracking-tighter uppercase italic">
                    Be
                </span>
                <span className="font-black text-bright-sun-400 tracking-tighter uppercase italic">
                    On
                </span>
                <span className="font-black text-white tracking-tighter uppercase italic">
                    Board
                </span>
            </div>

            {/* Tagline - Compact for Header but clearly present */}
            <div className={`flex items-center gap-1.5 transition-all ${isSmall ? "mt-0.5" : "mt-1 pt-0.5"}`}>
                <div className={`h-px bg-mine-shaft-700 ${isSmall ? "w-2.5" : "w-4"}`}></div>
                <span className={`${isSmall ? "text-[7px]" : "text-[9px]"} font-black uppercase tracking-[0.3em] text-mine-shaft-500 whitespace-nowrap`}>
                    Work. Live. Grow.
                </span>
                <span className={`${isSmall ? "text-[9px]" : "text-[11px]"} text-bright-sun-400 font-bold ml-[-2px]`}>™</span>
            </div>
        </div>
    );
};

// Combined Component - Specifically tuned for Nav Header
const BrandLogo = ({ compact = false }) => (
    <a
        href="/"
        className="flex items-center gap-3 cursor-pointer shrink-0 group no-underline hover:no-underline"
    >
        <BrandMark size={compact ? 40 : 48} />
        <div className="flex flex-col">
            <BrandWordmark size={compact ? "small" : "default"} />
        </div>
    </a>
);

export { BrandMark, BrandWordmark, BrandLogo };
export default BrandLogo;
