
import React from "react";

type Language = "en" | "sw";
interface Props {
  value: Language;
  onChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex gap-2 items-center mb-4">
    <span className="font-medium">Language:</span>
    <button
      className={`px-3 py-1 rounded border focus:outline-none ${value === "en" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
      onClick={() => onChange("en")}
      aria-pressed={value === "en"}
    >
      English
    </button>
    <button
      className={`px-3 py-1 rounded border focus:outline-none ${value === "sw" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
      onClick={() => onChange("sw")}
      aria-pressed={value === "sw"}
    >
      Kiswahili
    </button>
  </div>
);

export default LanguageSelector;
