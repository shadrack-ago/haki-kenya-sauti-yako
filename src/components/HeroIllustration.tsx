
import React from "react";

// Justice-themed illustration using uploaded scales of justice image
const HeroIllustration = () => (
  <div className="flex items-center justify-center w-full h-40 md:h-56 mb-4">
    <div className="bg-accent rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-lg relative overflow-hidden">
      <img
        src="/lovable-uploads/78c02d6c-1a7d-417b-8353-49dfbffd5180.png"
        alt="Scales of justice and gavel representing legal rights"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

export default HeroIllustration;
