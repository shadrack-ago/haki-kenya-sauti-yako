
import React from "react";

// Placeholder illustration: can be replaced with SVG, Lottie, or your own asset
const HeroIllustration = () => (
  <div className="flex items-center justify-center w-full h-40 md:h-56 mb-4">
    {/* Example: circle with bot and police station, or replace src */}
    <div className="bg-accent rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-lg relative">
      <img
        src="https://aafef93b-18c2-4b50-a593-0d73ffd46183.lovableproject.com/placeholder.svg"
        alt="Chatting with HakiAI at police station"
        className="w-3/4 h-3/4 object-contain"
      />
    </div>
  </div>
);

export default HeroIllustration;
