
import React from "react";

const lessons = {
  en: [
    {
      title: "Rights When Stopped by Police",
      summary: "You have the right to remain silent and to ask for a lawyer (Constitution Art. 49)."
    },
    {
      title: "Unlawful Detention",
      summary: "No person can be held for more than 24 hours without a court order (Constitution Art. 49(f))."
    },
    {
      title: "Reporting Police Misconduct",
      summary: "You can report abuse to the Independent Policing Oversight Authority (IPOA) or seek legal help."
    }
  ],
  sw: [
    {
      title: "Haki Ukisimamishwa na Polisi",
      summary: "Una haki ya kunyamaza na kuomba wakili (Katiba Kifungu 49)."
    },
    {
      title: "Kushikiliwa Bila Sababu",
      summary: "Huwezi kushikiliwa zaidi ya saa 24 bila amri ya mahakama (Katiba Kifungu 49(f))."
    },
    {
      title: "Kuripoti Ukiukaji wa Polisi",
      summary: "Ripoti unyanyasaji kwa IPOA au pata msaada wa kisheria."
    }
  ]
};

interface Props {
  language: "en" | "sw";
}

const DailyLesson: React.FC<Props> = ({ language }) => {
  const daily = lessons[language][0]; // Will use the first as today's tip for now
  return (
    <div className="bg-muted/40 p-4 my-4 rounded shadow max-w-xl mx-auto">
      <strong className="block text-lg mb-1">{daily.title}</strong>
      <span className="block">{daily.summary}</span>
    </div>
  );
};

export default DailyLesson;
