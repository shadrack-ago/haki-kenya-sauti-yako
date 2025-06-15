
import React from "react";
import { Globe } from "lucide-react";

type Language = "en" | "sw";
interface Props {
  value: Language;
  onChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-1 shadow-sm">
    <Globe className="w-4 h-4 text-muted-foreground ml-2" />
    <div className="flex gap-1">
      <button
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          value === "en" 
            ? "bg-primary text-primary-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
        onClick={() => onChange("en")}
        aria-pressed={value === "en"}
      >
        English
      </button>
      <button
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          value === "sw" 
            ? "bg-primary text-primary-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
        onClick={() => onChange("sw")}
        aria-pressed={value === "sw"}
      >
        Kiswahili
      </button>
    </div>
  </div>
);

export default LanguageSelector;
