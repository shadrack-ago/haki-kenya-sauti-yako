
import React from "react";
import { Shield } from "lucide-react";
import HeroIllustration from "./HeroIllustration";

interface HakiAIHeaderProps {
  onTalkClick?: () => void;
  onEmergencyClick?: () => void;
}

const HakiAIHeader: React.FC<HakiAIHeaderProps> = ({
  onTalkClick,
  onEmergencyClick,
}) => (
  <header className="py-8 flex flex-col items-center gap-2 bg-gradient-to-br from-primary/70 to-background rounded-b-2xl shadow-lg mb-4 relative">
    <span className="flex items-center gap-2 text-3xl md:text-4xl font-bold mt-2 mb-2">
      <span className="rounded-full bg-white/90 shadow-sm px-2 py-1 mr-1 text-2xl">🇰🇪</span>
      <span>HakiAI: Kenya's Legal Rights Assistant</span>
      <Shield className="inline ml-2 text-primary w-8 h-8" aria-label="Justice shield" />
    </span>
    <p className="text-muted-foreground text-center max-w-lg mb-2 font-medium">
      Empowerment for all. <br className="hidden md:block" />
      Learn your rights under the Kenyan Constitution – especially when interacting with police or in emergencies.
    </p>
    {/* Illustration or animation */}
    <HeroIllustration />
    {/* CTA Buttons */}
    <div className="flex flex-col md:flex-row gap-3 mt-2 w-full max-w-xs md:max-w-md">
      <button
        className="flex-1 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow hover:scale-105 transition-transform duration-200 animate-pulse outline-none"
        onClick={onTalkClick}
        tabIndex={0}
      >
        💬 Talk to HakiAI Now
      </button>
      <button
        className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-transform duration-200"
        onClick={onEmergencyClick}
        tabIndex={0}
      >
        🚨 Emergency? Know What to Do
      </button>
    </div>
  </header>
);

export default HakiAIHeader;
