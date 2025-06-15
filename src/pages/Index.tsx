
import React, { useState } from "react";
// Removed the Flag icon import since we use an image now
import HakiAIHeader from "@/components/HakiAIHeader";
import LanguageSelector from "@/components/LanguageSelector";
import EmergencyAlert from "@/components/EmergencyAlert";
import TopicQuickLinks from "@/components/TopicQuickLinks";
import DailyLesson from "@/components/DailyLesson";
import HakiAIChat from "@/components/HakiAIChat";
import HeroIllustration from "@/components/HeroIllustration";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "sw">("en");
  const [urgent, setUrgent] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleUrgent = () => setUrgent(true);
  const handleEscalate = () => {
    const englishNumbers =
      "Call the legal support hotline: 1559\nOr directly contact IPOA at:\n+254 792 532 626/627\n+254 773 999 000\n+254 772 333 000\n+254 780 490 600/601";
    const swahiliNumbers =
      "Pigia simu nambari ya msaada wa kisheria: 1559\nAu wasiliana moja kwa moja na IPOA:\n+254 792 532 626/627\n+254 773 999 000\n+254 772 333 000\n+254 780 490 600/601";
    alert(language === "sw" ? swahiliNumbers : englishNumbers);
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
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-accent/40 to-background animate-fade-in">
      {/* Kenyan flag at top right - now with an actual image */}
      <div className="fixed top-4 right-4 z-50 flex items-center">
        <img
          src="/lovable-uploads/ff77ba92-cb89-47cc-9999-90ec1ce365b0.png"
          alt="Kenyan Flag"
          className="w-14 h-auto md:w-20 drop-shadow-md rounded"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero & Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-10">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 animate-fade-in">
            <span className="inline-flex items-center gap-2 text-3xl md:text-4xl font-extrabold font-serif text-primary drop-shadow-md">
              <span className="rounded-full bg-white/85 shadow px-2 py-1 mr-1 text-2xl">🇰🇪</span>
              <span>
                {language === "sw"
                  ? <>Msaada wa Kisheria kwa Wakenya</>
                  : <>Kenya's Legal Rights Chatbot</>
                }
              </span>
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 mt-2 leading-tight">
              {language === "sw"
                ? "Jifunze haki zako. Uliza maswali. Pata msaada papo hapo."
                : "Know your rights. Ask any question. Get instant Kenyan legal guidance."
              }
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl font-medium">
              {language === "sw"
                ? "HakiAI ni msaidizi anayekupa taarifa za msingi kuhusu katiba ya Kenya – hasa ukiwa na matatizo na polisi au ukiwa kwenye dharura."
                : "HakiAI helps you understand your rights under the Kenyan Constitution, especially if you’re facing police or emergency situations."
              }
            </p>
            <div className="flex gap-2 pt-2 md:pt-4">
              <button
                onClick={handleTalkClick}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform duration-200 text-lg animate-pulse"
              >
                {language === "sw" ? "Anza Mazungumzo" : "Start Conversation"}
              </button>
              <button
                onClick={handleEmergencyClick}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 hover:scale-105 transition-transform duration-200 text-lg"
              >
                {language === "sw" ? "Msamaha wa Dharura" : "Emergency Help"}
              </button>
            </div>
            <div className="pt-3">
              <LanguageSelector value={language} onChange={setLanguage} />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <HeroIllustration />
          </div>
        </section>

        {/* Emergency Alert */}
        <EmergencyAlert urgent={urgent} onEscalate={handleEscalate} />

        {/* Main Panel */}
        <div className="space-y-6">
          {/* Quick Links & Lessons */}
          {!showChat && (
            <>
              <section className="mb-6">
                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">
                    {language === "sw" ? "Mada za Haraka" : "Quick Topics"}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    {language === "sw"
                      ? "Chagua moja ya mada hizi ili kupata majibu ya haraka kuhusu haki zako"
                      : "Choose a topic to get quick, reliable answers about your rights."
                    }
                  </p>
                </div>
                <div className="mt-4">
                  <TopicQuickLinks language={language} onTopic={handleTopic} />
                </div>
              </section>
              <section className="mb-4">
                <DailyLesson language={language} />
              </section>
            </>
          )}

          {/* Chat Area */}
          {showChat && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {language === "sw" ? "Mazungumzo na HakiAI" : "Chat with HakiAI"}
                </h2>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-semibold"
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

        {/* Footer */}
        <footer className="mt-20 py-10 border-t border-border bg-accent/10 rounded-xl animate-fade-in">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2 text-lg font-semibold">
              <span>🇰🇪</span>
              <span>HakiAI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {language === "sw"
                ? "HakiAI ni msaidizi wa kisheria unaotumia AI kuwasaidia raia wa Kenya kuelewa haki zao. Taarifa hizi ni kwa marejeo tu na hazipaswi kutumika kama ushauri wa kisheria wa kibinafsi."
                : "HakiAI is an AI assistant that helps Kenyan citizens understand their rights. This is reference information only, not personal legal advice."
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
