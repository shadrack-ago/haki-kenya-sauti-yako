
import React, { useState } from "react";
import HakiAIHeader from "@/components/HakiAIHeader";
import LanguageSelector from "@/components/LanguageSelector";
import EmergencyAlert from "@/components/EmergencyAlert";
import TopicQuickLinks from "@/components/TopicQuickLinks";
import DailyLesson from "@/components/DailyLesson";
import HakiAIChat from "@/components/HakiAIChat";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "sw">("en");
  const [urgent, setUrgent] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const handleUrgent = () => setUrgent(true);
  const handleEscalate = () => {
    // Future: initiate API call or show modal for hotline
    alert(language === "sw"
      ? "Pigia simu nambari ya msaada wa kisheria: 1559 au tembelea tovuti ya IPOA."
      : "Call the legal support hotline: 1559 or visit the IPOA website.");
    setUrgent(false);
  };
  const handleTopic = (topicKey: string) => {
    setActiveTopic(topicKey);
    setUrgent(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-background py-4">
      <HakiAIHeader />
      <LanguageSelector value={language} onChange={setLanguage} />
      <EmergencyAlert urgent={urgent} onEscalate={handleEscalate} />
      <TopicQuickLinks language={language} onTopic={handleTopic} />
      <DailyLesson language={language} />
      <HakiAIChat
        language={language}
        onUrgentDetected={handleUrgent}
        activeTopic={activeTopic}
      />
      <footer className="mt-auto py-3 text-xs text-muted-foreground">
        Powered by HakiAI | Kenyan Law Reference Only | © {new Date().getFullYear()}
      </footer>
    </main>
  );
};

export default Index;
