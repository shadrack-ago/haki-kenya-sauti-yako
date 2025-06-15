
export interface ConstitutionArticle {
  article: string;
  title: { en: string; sw: string };
  text: { en: string; sw: string };
  summary: { en: string; sw: string };
  keywords: string[];
}

export const constitutionArticles: ConstitutionArticle[] = [
  {
    article: "49",
    title: {
      en: "Rights of arrested persons",
      sw: "Haki za watu waliokamatwa"
    },
    text: {
      en: `Article 49:
(1) An arrested person has the right—
  (a) to be informed promptly, in language that the person understands, of—
     (i) the reason for the arrest;
     (ii) the right to remain silent; and
     (iii) the consequences of not remaining silent;
  (b) to remain silent;
  (c) to communicate with an advocate;
  (f) to be brought before a court as soon as reasonably possible, but not later than twenty-four hours after being arrested.`,
      sw: `Kifungu cha 49:
(1) Mtu aliyekamatwa ana haki—
  (a) kupewa habari mara moja, kwa lugha anayoelewa, juu ya—
     (i) sababu ya kukamatwa;
     (ii) haki ya kunyamaza;
     (iii) madhara ya kutonyamaza;
  (b) kunyamaza;
  (c) kuwasiliana na wakili;
  (f) kupelekwa mahakamani haraka iwezekanavyo, lakini si zaidi ya saa ishirini na nne baada ya kukamatwa.`,
    },
    summary: {
      en: "If arrested, you have the right to remain silent, see a lawyer, and be taken to court within 24 hours.",
      sw: "Ukipigwa na polisi, una haki ya kunyamaza, kuonana na wakili, na kupelekwa mahakamani ndani ya saa 24."
    },
    keywords: ["arrest", "police", "silent", "lawyer", "mahakama", "kamatwa"]
  },
  {
    article: "43",
    title: {
      en: "Economic and social rights",
      sw: "Haki za kiuchumi na kijamii"
    },
    text: {
      en: `Every person has the right—
(a) to the highest attainable standard of health;
(b) to accessible and adequate housing;
(c) to reasonable standards of sanitation;
(d) to be free from hunger, and to have adequate food;
(e) to clean and safe water;
(f) to social security; and
(g) to education.`,
      sw: `Kila mtu ana haki—
(a) kupata kiwango bora cha afya;
(b) kupata makazi bora;
(c) kupata usafi bora wa mazingira;
(d) kutoishi na njaa, na kupata chakula cha kutosha;
(e) kupata maji safi na salama;
(f) kupata hifadhi ya jamii; na
(g) kupata elimu.`,
    },
    summary: {
      en: "You have rights to healthcare, housing, food, water, social security, and education.",
      sw: "Una haki za afya, makazi, chakula, maji, hifadhi ya jamii, na elimu."
    },
    keywords: [
      "health",
      "housing",
      "food",
      "education",
      "maji",
      "afya",
      "elimu",
      "chakula",
      "makazi",
      "social",
      "economic"
    ]
  },
  {
    article: "35",
    title: {
      en: "Access to information",
      sw: "Haki ya kupata habari"
    },
    text: {
      en: `Every citizen has the right of access to—
(a) information held by the State; and
(b) information held by another person and required for the exercise or protection of any right or fundamental freedom.`,
      sw: `Kila raia ana haki ya—
(a) kupata habari inayoshikiliwa na Serikali; na
(b) kupata habari inayoshikiliwa na mtu mwingine inayohitajika kwa utekelezaji au ulinzi wa haki au uhuru wa kimsingi.`
    },
    summary: {
      en: "Every Kenyan citizen has the right to access information from the State or anyone if needed to protect a right.",
      sw: "Kila Mkenya ana haki ya kupata habari kutoka kwa Serikali au kwa mtu kama ni muhimu kulinda haki."
    },
    keywords: [
      "information",
      "access",
      "news",
      "habari",
      "data"
    ]
  }
  // Easily add more articles here!
];
