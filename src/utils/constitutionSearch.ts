
import { constitutionArticles } from "@/data/constitution";

/**
 * Finds the constitution articles most relevant to a given question.
 * Returns the best match, or null if no relevant article found.
 */
export function matchConstitutionArticle(question: string, lang: "en" | "sw" = "en") {
  const q = question.toLowerCase();
  // Try exact keyword match first
  for (const article of constitutionArticles) {
    for (const keyword of article.keywords) {
      if (q.includes(keyword)) {
        return article;
      }
    }
  }

  // Try match in title or summary
  for (const article of constitutionArticles) {
    if (
      article.title[lang].toLowerCase().includes(q) ||
      article.summary[lang].toLowerCase().includes(q)
    ) {
      return article;
    }
  }
  return null;
}
