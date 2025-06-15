
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
  const [showChat, setShowChat] = useState(false);

  const handleUrgent = () => setUrgent(true);
  const handleEscalate = () => {
    alert(language === "sw"
      ? "Pigia simu nambari ya msaada wa kisheria: 1559 au tembelea tovuti ya IPOA."
      : "Call the legal support hotline: 1559 or visit the IPOA website.");
    setUrgent(false);
  };
  const handleTopic = (topicKey: string) => {
    setActiveTopic(topicKey);
    setUrgent(false);
    setShowChat(true);
  };
  const handleTalkClick = () => setShowChat(true);
  const handleEmergencyClick = () => setUrgent(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <HakiAIHeader 
          onTalkClick={handleTalkClick}
          onEmergencyClick={handleEmergencyClick}
        />
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>
          
          <EmergencyAlert urgent={urgent} onEscalate={handleEscalate} />
          
          {!showChat && (
            <>
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {language === "sw" ? "Mada za Haraka" : "Quick Topics"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {language === "sw" 
                    ? "Chagua moja ya mada hizi ili kupata majibu ya haraka kuhusu haki zako"
                    : "Choose one of these topics to get quick answers about your rights"
                  }
                </p>
              </div>
              <TopicQuickLinks language={language} onTopic={handleTopic} />
              
              <DailyLesson language={language} />
              
              <div className="text-center pt-4">
                <button
                  onClick={handleTalkClick}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  {language === "sw" ? "Anza Mazungumzo" : "Start Conversation"}
                </button>
              </div>
            </>
          )}
          
          {showChat && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {language === "sw" ? "Mazungumzo na HakiAI" : "Chat with HakiAI"}
                </h2>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {language === "sw" ? "← Rudi Nyumbani" : "← Back to Home"}
                </button>
              </div>
              <HakiAIChat
                language={language}
                onUrgentDetected={handleUrgent}
                activeTopic={activeTopic}
              />
            </div>
          )}
        </div>
        
        <footer className="mt-16 py-8 border-t border-border">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2 text-lg font-semibold">
              <span>🇰🇪</span>
              <span>HakiAI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {language === "sw"
                ? "HakiAI ni msaidizi wa kisheria unaotumia akili bandia kuwasaidia raia wa Kenya kujua haki zao. Taarifa hizi ni za kirejeleo tu na hazipaswi kuchukuliwa kama ushauri wa kisheria wa binafsi."
                : "HakiAI is an AI-powered legal assistant helping Kenyan citizens understand their rights. This information is for reference only and should not be considered personal legal advice."
              }
            </p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>Powered by HakiAI</span>
              <span>•</span>
              <span>Kenyan Law Reference Only</span>
              <span>•</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Index;
