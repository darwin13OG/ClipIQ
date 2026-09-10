import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Dynamic Modern Squircle Icon */}
      <div
        className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 p-[1.5px] shadow-lg shadow-violet-600/30 flex items-center justify-center shrink-0 group`}
      >
        <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Inner ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20" />

          {/* Futuristic Audio/Play IQ Glyph */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white relative z-10 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
          >
            <path
              d="M4 10V14M7 7V17M10 4V20"
              stroke="url(#iqLogoGrad1)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M13 7.5L20 12L13 16.5V7.5Z"
              fill="url(#iqLogoGrad2)"
              stroke="url(#iqLogoGrad2)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="iqLogoGrad1" x1="4" y1="4" x2="10" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#818cf8" />
              </linearGradient>
              <linearGradient id="iqLogoGrad2" x1="13" y1="7.5" x2="20" y2="16.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight text-white ${textSizes[size]}`}>
              Clip<span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">IQ</span>
            </span>
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 tracking-wider">
              Studio
            </span>
          </div>
          <span className="text-[10px] text-neutral-400 tracking-tight font-medium mt-0.5 truncate max-w-[175px] sm:max-w-none">
            Video Retention & Safe Zone AI
          </span>
        </div>
      )}
    </div>
  );
};
