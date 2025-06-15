
import React from "react";

// Justice-themed illustration with scales of justice
const HeroIllustration = () => (
  <div className="flex items-center justify-center w-full h-40 md:h-56 mb-4">
    <div className="bg-accent rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-lg relative">
      {/* Scales of Justice SVG */}
      <svg 
        width="80" 
        height="80" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        {/* Base */}
        <rect x="45" y="85" width="10" height="8" fill="currentColor" rx="2"/>
        <rect x="35" y="93" width="30" height="4" fill="currentColor" rx="2"/>
        
        {/* Main pole */}
        <rect x="48" y="15" width="4" height="70" fill="currentColor"/>
        
        {/* Cross beam */}
        <rect x="25" y="25" width="50" height="3" fill="currentColor" rx="1.5"/>
        
        {/* Left scale */}
        <circle cx="30" cy="35" r="2" fill="currentColor"/>
        <path d="M20 40 L40 40 L38 50 L22 50 Z" fill="currentColor" opacity="0.8"/>
        <line x1="28" y1="27" x2="28" y2="38" stroke="currentColor" strokeWidth="1"/>
        <line x1="32" y1="27" x2="32" y2="38" stroke="currentColor" strokeWidth="1"/>
        
        {/* Right scale */}
        <circle cx="70" cy="35" r="2" fill="currentColor"/>
        <path d="M60 40 L80 40 L78 50 L62 50 Z" fill="currentColor" opacity="0.8"/>
        <line x1="68" y1="27" x2="68" y2="38" stroke="currentColor" strokeWidth="1"/>
        <line x1="72" y1="27" x2="72" y2="38" stroke="currentColor" strokeWidth="1"/>
        
        {/* Blindfold/ribbon at top */}
        <ellipse cx="50" cy="12" rx="8" ry="3" fill="currentColor" opacity="0.6"/>
      </svg>
    </div>
  </div>
);

export default HeroIllustration;
