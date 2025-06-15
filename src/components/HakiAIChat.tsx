import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { matchConstitutionArticle } from "@/utils/constitutionSearch";

interface Message {
  sender: "user" | "ai";
  text: string;
}

interface Props {
  language: "en" | "sw";
  onUrgentDetected: () => void;
  activeTopic?: string | null;
}

const urgentKeywords = ["arrested", "bribe", "beating", "arrest", "police wamekushika", "polisi", "dhuluma", "imefungwa"];

const defaultGreetings = {
  en: "Hi! Ask me anything about your rights or type your concern below.",
  sw: "Habari! Uliza chochote kuhusu haki zako au andika swali lako hapa chini.",
};

const cannedResponses = {
  // Basic demo responses for now; will expand for full legal matching
  "stopped-by-police": {
    en: "If police stop you, stay calm. You have the right to ask for identification and to remain silent (Constitution Art. 49).",
    sw: "Ukipigwa na polisi, tulia. Una haki ya kuuliza utambulisho na kunyamaza (Katiba Kifungu 49).",
  },
  "unlawful-detention": {
    en: "You should not be held for more than 24 hours without being presented in court (Constitution Art. 49(f)).",
    sw: "Huwezi kushikiliwa zaidi ya saa 24 bila kupelekwa mahakamani (Katiba Kifungu 49(f)).",
  },
  "report-misconduct": {
    en: "To report police misconduct, contact IPOA at 1559 or file a complaint on their website.",
    sw: "Kuripoti unyanyasaji wa polisi, wasiliana na IPOA kwa 1559 au tembelea tovuti yao.",
  },
};

const HakiAIChat: React.FC<Props> = ({ language, onUrgentDetected, activeTopic }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: defaultGreetings[language] }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Daily tip or topic shortcut should trigger canned response
  useEffect(() => {
    if (activeTopic && cannedResponses[activeTopic]) {
      setMessages([
        { sender: "ai", text: cannedResponses[activeTopic][language] }
      ]);
    }
  }, [activeTopic, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text }]);

    // URGENCY detection (simple keyword match)
    if (urgentKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
      onUrgentDetected();
      toast("Emergency detected", {
        description: language === "sw"
          ? "Inaonekana kuna hali ya dharura. Tafadhali bonyeza 'Escalate'."
          : "It seems urgent. Please use the emergency options.",
        duration: 5000,
      });
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            language === "sw"
              ? "Inaonekana unahitaji msaada wa dharura. Ungependa kuwasiliana na nambari ya msaada wa kisheria?"
              : "It appears you may need urgent legal help. Would you like to contact a legal support hotline?"
        }
      ]);
    } else {
      // ### NEW: Match knowledge base
      const article = matchConstitutionArticle(text, language);
      if (article) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text:
              language === "sw"
                ? `Kifungu cha ${article.article}: ${article.title.sw}\n\n${article.summary.sw}\n\n${article.text.sw}`
                : `Article ${article.article}: ${article.title.en}\n\n${article.summary.en}\n\n${article.text.en}`
          }
        ]);
      } else {
        // Fallback answer
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text:
              language === "sw"
                ? "Samahani, sikuweza kupata jibu la moja kwa moja kwenye katiba. Tafadhali jaribu kuuliza kwa njia nyingine au uliza kuhusu haki zako."
                : "Sorry, I couldn't find a direct answer in the Constitution. Please rephrase or ask about your rights."
          }
        ]);
      }
    }
    setInput("");
  };

  return (
    <section className="max-w-2xl mx-auto mb-8">
      <div className="bg-card rounded border p-4 max-h-[50vh] overflow-y-auto flex flex-col gap-2 shadow-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.sender === "user"
                ? "text-right ml-10"
                : "text-left mr-10 text-primary"
            }
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              } whitespace-pre-line`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="flex mt-2 gap-2"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={
            language === "sw"
              ? "Andika swali lako hapa..."
              : "Type your question here..."
          }
          autoFocus
        />
        <Button type="submit" disabled={!input.trim()}>
          {language === "sw" ? "Tuma" : "Send"}
        </Button>
      </form>
    </section>
  );
};

export default HakiAIChat;
