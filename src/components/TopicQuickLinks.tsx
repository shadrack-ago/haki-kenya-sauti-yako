
import React from "react";
import { Scale, Shield, AlertTriangle } from "lucide-react";

const topics = [
  {
    en: "Your rights when stopped by police",
    sw: "Haki zako ukisimamishwa na polisi",
    key: "stopped-by-police",
    icon: Shield,
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
  },
  {
    en: "What is unlawful detention?",
    sw: "Kushikiliwa bila sababu ni nini?",
    key: "unlawful-detention", 
    icon: Scale,
    color: "bg-green-50 border-green-200 hover:bg-green-100"
  },
  {
    en: "How to file a police misconduct report",
    sw: "Namna ya kuripoti ukiukaji wa polisi",
    key: "report-misconduct",
    icon: AlertTriangle,
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
  }
];

interface Props {
  language: "en" | "sw";
  onTopic: (topicKey: string) => void;
}

const TopicQuickLinks: React.FC<Props> = ({ language, onTopic }) => (
  <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
    {topics.map(t => {
      const Icon = t.icon;
      return (
        <button
          key={t.key}
          className={`${t.color} border-2 p-6 rounded-xl text-left transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md`}
          onClick={() => onTopic(t.key)}
        >
          <div className="flex items-start gap-3">
            <Icon className="w-6 h-6 mt-1 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {t[language]}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "sw" ? "Bonyeza kujua zaidi" : "Click to learn more"}
              </p>
            </div>
          </div>
        </button>
      );
    })}
  </div>
);

export default TopicQuickLinks;
