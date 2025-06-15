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

const IPOA_HELP_INFO = {
  en: `Sorry, I couldn't find a direct answer in the Constitution.

If you need urgent help or want to report police misconduct or abuse, contact:
• Legal Support Hotline: 1559
• IPOA Emergency Lines:
  +254 792 532 626/627
  +254 773 999 000
  +254 772 333 000
  +254 780 490 600/601

Or visit the IPOA website for more ways to get support.`,
  sw: `Samahani, sikuweza kupata jibu la moja kwa moja kwenye katiba.

Ikiwa unahitaji msaada wa haraka au kuripoti unyanyasaji wa polisi, wasiliana na:
• Nambari ya Msaada wa Kisheria: 1559
• Nambari za Dharura za IPOA:
  +254 792 532 626/627
  +254 773 999 000
  +254 772 333 000
  +254 780 490 600/601

Au tembelea tovuti ya IPOA kwa usaidizi zaidi.`,
};

// Add the FAQ knowledge base (English + Swahili for extensibility)
const FAQ_KNOWLEDGE_BASE = [
  {
    q_en: "am i under arrest",
    q_sw: "je, nimekamatwa",
    keywords: ["under arrest", "nimekamatwa"],
    en: "Under Kenyan law, an officer must clearly inform you that you’re under arrest and state the reason—either verbally or in writing—before you can be legally detained (Criminal Procedure Code, Section 50).",
    sw: "Sheria ya Kenya inahitaji polisi akujulishe wazi kama umekamatwa na aseme sababu, kwa maneno au maandishi, kabla ya kukushikilia kisheria (Sheria ya Mwenendo wa Jinai, Sehemu ya 50)."
  },
  {
    q_en: "what are my rights now that i'm arrested",
    q_sw: "haki zangu ni zipi nikiwa nimekamatwa",
    keywords: ["rights now that i’m arrested", "nimekamatwa", "aki zangu"],
    en: `You have the right to:
• Be informed promptly of the reason for your arrest (Constitution, Art. 49(1)(a));
• Remain silent—anything you say may be used in evidence (Art. 49(1)(b));
• Consult and be represented by a lawyer of your choice (Art. 50(2));
• Be produced before a court within 24 hours (Art. 50(2)).`,
    sw: `Una haki ya:
• Kupewa taarifa mara moja juu ya sababu ya kukamatwa (Katiba, Kifungu 49(1)(a));
• Kunayamaza—chochote utakachosema kinaweza kutumika kama ushahidi (49(1)(b));
• Kuwasiliana na kuwakilishwa na wakili wa chaguo lako (50(2));
• Kupelekwa mahakamani ndani ya saa 24 (50(2)).`
  },
  {
    q_en: "can i call someone",
    q_sw: "naweza kumpigia mtu simu",
    keywords: ["call someone", "piga simu", "nipigie simu"],
    en: "Yes—you have the right to at least one phone call to inform a family member or lawyer of your arrest without delay (Criminal Procedure Code, Section 54). If you’re denied, it’s unlawful.",
    sw: "Ndiyo—una haki ya kupiga simu angalau mara moja kuwaarifu ndugu au wakili wako kuhusu kukamatwa kwako mara moja (Sheria ya Mwenendo wa Jinai, Sehemu ya 54). Ukinyimwa ni kinyume na sheria."
  },
  {
    q_en: "how long can they hold me without charging",
    q_sw: "wanaweza kunishikilia kwa muda gani bila mashtaka",
    keywords: ["hold me without charging", "bila mashtaka"],
    en: "Police can hold you for up to 24 hours from the time of arrest (extendable by a court for up to 24 more hours in serious cases), but not beyond that without being charged or produced in court (Art. 50(2)).",
    sw: "Polisi wanaweza kukushikilia hadi saa 24 tangu kukamatwa (inaweza kuongezwa na mahakama kwa saa zingine 24 kwenye kesi nzito), lakini si zaidi ya hapo bila kukushtaki au kukupeleka mahakamani (50(2))."
  },
  {
    q_en: "what if they're demanding a bribe",
    q_sw: "kama polisi wanadai rushwa nifanye nini",
    keywords: ["bribe", "rushwa"],
    en: "Refuse—asking or accepting a bribe is a criminal offense for the officer (Penal Code, Section 10). You can report the misconduct to IPOA (tel. 1559) or use HakiAI’s ‘Report Misconduct’ workflow.",
    sw: "Kataa—kuomba au kupokea rushwa ni kosa la jinai kwa polisi (Kanuni ya Adhabu, Sehemu ya 10). Unaweza kuripoti kwa IPOA (simu 1559) au tumia utaratibu wa ‘Kuripoti Ukiukaji’ wa HakiAI."
  },
  {
    q_en: "can they search me or my belongings",
    q_sw: "wanaweza kunikagua au vitu vyangu",
    keywords: ["search me", "search belongings", "kunikagua", "vitu vyangu"],
    en: "They can only search you or your immediate surroundings if they have a valid warrant, or if it’s necessary to prevent evidence destruction—otherwise, it’s unlawful (Constitution, Art. 31).",
    sw: "Polisi wanaweza kukukagua au mazingira yako tu ikiwa wana hati halali ya ukaguzi, au kama inahitajika kuzuia ushahidi kuharibiwa—vinginevyo ni kinyume cha sheria (Katiba, Kif. 31)."
  },
  {
    q_en: "what if they won't let me see a lawyer",
    q_sw: "wanikataa kumwona wakili",
    keywords: ["see a lawyer", "wakili"],
    en: "That’s a breach of your rights. Demand to see your lawyer. If denied, record the refusal—HakiAI can help escalate to a legal support hotline.",
    sw: "Hiyo ni kuvunja haki zako. Dai kumuona wakili. Iwapo utanyimwa, dhibitisha hilo—HakiAI inaweza kusaidia kutoa taarifa kwa msaada wa kisheria wa dharura."
  },
  {
    q_en: "do i have the right to medical attention",
    q_sw: "haki ya kupata matibabu",
    keywords: ["medical attention", "matibabu"],
    en: "Yes. If you’re unwell or injured, you have a right to prompt medical treatment under police supervision (Criminal Procedure Code, Section 61).",
    sw: "Ndiyo. Kama umeumia au hujisikii vizuri, una haki ya kupata matibabu ya haraka ukiwa chini ya usimamizi wa polisi (Sheria ya Mwenendo wa Jinai, Sehemu ya 61)."
  },
  {
    q_en: "can i record or film the arrest",
    q_sw: "naweza kurekodi au kupiga picha kukamatwa",
    keywords: ["record", "film", "kurekodi", "kupiga picha"],
    en: "Yes—Kenyan citizens have a right to record interactions with state officers in public spaces, provided it doesn’t obstruct their duties (Art. 31).",
    sw: "Ndiyo—Mkenya ana haki ya kurekodi matukio na polisi hadharani, mradi haitatiza kazi zao (Kif. 31)."
  },
  {
    q_en: "how do i file a complaint about police brutality",
    q_sw: "namna ya kuripoti polisi waliokiuka",
    keywords: ["complaint about police brutality", "police brutality", "ukuripoti polisi", "ripoti polisi"],
    en: "Contact the Independent Policing Oversight Authority (IPOA) on 1559 or online. Fill out their form, supply any evidence (photos, recordings), and they must investigate (IPOA Act, 2011).",
    sw: "Wasiliana na IPOA (1559) au mtandaoni. Jaza fomu yao, toa ushahidi (picha, video), na wanapaswa kufanya uchunguzi (Sheria ya IPOA, 2011)."
  },
  {
    q_en: "what happens if my rights are violated",
    q_sw: "ikitokea haki zangu zimekiukwa",
    keywords: ["rights are violated", "haki zimekiukwa"],
    en: "You can sue the State for unlawful arrest, assault, or denial of rights—and seek compensation. Article 24 allows anyone to go to court if their rights are infringed.",
    sw: "Unaweza kushtaki Serikali kwa kukamatwa bila sababu, kushambuliwa, au kunyimwa haki—na kudai fidia. Kif. 24 kinakupa uwezo wa kwenda mahakamani ukiathiriwa."
  },
  {
    q_en: "can they detain me for questioning without arresting me",
    q_sw: "wanaweza kunishikilia bila kukamatwa rasmi",
    keywords: ["detain me for questioning", "shikilia bila kukamatwa"],
    en: "Police cannot detain you for questioning without formally arresting you. If you haven’t been told you’re under arrest, you should be free to leave—otherwise, ask if you are being detained or are free to go.",
    sw: "Polisi hawawezi kukushikilia kwa mahojiano bila kukukamata rasmi. Kama hujaambiwa umewekwa chini ya ulinzi, unaweza kuondoka—uliza: 'Ninaweza kwenda au nimekamatwa?'"
  }
];

// Utility: try to match user input to FAQ item (returns answer or null)
function matchFAQ(question: string, lang: "en" | "sw") {
  const qLow = question.trim().toLowerCase();
  // Keyword-based matching (at least one keyword match)
  for (const item of FAQ_KNOWLEDGE_BASE) {
    for (const keyword of item.keywords) {
      if (qLow.includes(keyword)) {
        return lang === "sw" ? item.sw : item.en;
      }
    }
    // Soft phrasing match
    if (
      (lang === "en" && qLow.includes(item.q_en)) ||
      (lang === "sw" && qLow.includes(item.q_sw))
    ) {
      return lang === "sw" ? item.sw : item.en;
    }
  }
  return null;
}

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

    // 1. URGENCY detection (simple keyword match)
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
      // 2. MATCH FAQ (your new knowledge base) – FAST match for fast help!
      const faqAnswer = matchFAQ(text, language);
      if (faqAnswer) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: faqAnswer
          }
        ]);
      } else {
        // 3. Previous logic – try constitution/search response
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
          // 4. Fallback to IPOA info as before
          setMessages((prev) => [
            ...prev,
            {
              sender: "ai",
              text: IPOA_HELP_INFO[language]
            }
          ]);
        }
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
