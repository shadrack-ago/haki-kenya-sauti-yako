
import React from "react";

const topics = [
  {
    en: "Your rights when stopped by police",
    sw: "Haki zako ukisimamishwa na polisi",
    key: "stopped-by-police"
  },
  {
    en: "What is unlawful detention?",
    sw: "Kushikiliwa bila sababu ni nini?",
    key: "unlawful-detention"
  },
  {
    en: "How to file a police misconduct report",
    sw: "Namna ya kuripoti ukiukaji wa polisi",
    key: "report-misconduct"
  }
];

interface Props {
  language: "en" | "sw";
  onTopic: (topicKey: string) => void;
}

const TopicQuickLinks: React.FC<Props> = ({ language, onTopic }) => (
  <div className="flex flex-wrap gap-2 justify-center mb-4">
    {topics.map(t => (
      <button
        key={t.key}
        className="bg-accent text-accent-foreground px-3 py-1 rounded hover:bg-primary hover:text-primary-foreground transition"
        onClick={() => onTopic(t.key)}
      >
        {t[language]}
      </button>
    ))}
  </div>
);

export default TopicQuickLinks;
