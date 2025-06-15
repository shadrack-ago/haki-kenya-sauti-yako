
import React from "react";
import { BookOpen, Clock } from "lucide-react";

const lessons = {
  en: [
    {
      title: "Rights When Stopped by Police",
      summary: "You have the right to remain silent and to ask for a lawyer (Constitution Art. 49).",
      readTime: "2 min read"
    },
    {
      title: "Unlawful Detention",
      summary: "No person can be held for more than 24 hours without a court order (Constitution Art. 49(f)).",
      readTime: "3 min read"
    },
    {
      title: "Reporting Police Misconduct", 
      summary: "You can report abuse to the Independent Policing Oversight Authority (IPOA) or seek legal help.",
      readTime: "2 min read"
    }
  ],
  sw: [
    {
      title: "Haki Ukisimamishwa na Polisi",
      summary: "Una haki ya kunyamaza na kuomba wakili (Katiba Kifungu 49).",
      readTime: "dakika 2"
    },
    {
      title: "Kushikiliwa Bila Sababu",
      summary: "Huwezi kushikiliwa zaidi ya saa 24 bila amri ya mahakama (Katiba Kifungu 49(f)).",
      readTime: "dakika 3"
    },
    {
      title: "Kuripoti Ukiukaji wa Polisi",
      summary: "Ripoti unyanyasaji kwa IPOA au pata msaada wa kisheria.",
      readTime: "dakika 2"
    }
  ]
};

interface Props {
  language: "en" | "sw";
}

const DailyLesson: React.FC<Props> = ({ language }) => {
  const daily = lessons[language][0];
  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/20 border border-primary/20 p-6 rounded-xl shadow-sm max-w-2xl mx-auto">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-foreground">
              {language === "sw" ? "Somo la Leo" : "Today's Lesson"}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{daily.readTime}</span>
            </div>
          </div>
          <h4 className="font-semibold text-primary mb-2">{daily.title}</h4>
          <p className="text-foreground leading-relaxed">{daily.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyLesson;
