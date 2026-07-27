import React from 'react';

export const TypewriterIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Paper sticking out top */}
      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
      <line x1="9" y1="5" x2="15" y2="5" />
      <line x1="9" y1="7" x2="13" y2="7" />
      {/* Roller / Carriage */}
      <rect x="2" y="9" width="20" height="4" rx="1" />
      {/* Typewriter Body */}
      <path d="M3 13h18l-1.5 8H4.5L3 13z" />
      {/* Keys */}
      <line x1="7" y1="16" x2="8" y2="16" />
      <line x1="11" y1="16" x2="13" y2="16" />
      <line x1="16" y1="16" x2="17" y2="16" />
      <line x1="8" y1="18.5" x2="16" y2="18.5" />
    </svg>
  );
};
