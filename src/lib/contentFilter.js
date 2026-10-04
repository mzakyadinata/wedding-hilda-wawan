const BLOCKED_WORDS = [
  // =========================
  // MAKIAN / PENGHINAAN
  // =========================
  "anjing",
  "anjir",
  "asw",
  "asu",
  "su",
  "bangsat",
  "bajingan",
  "jingan",
  "brengsek",
  "kampret",
  "keparat",
  "sialan",
  "tai",
  "taik",
  "tahi",
  "taek",
  "goblok",
  "guoblok",
  "tolol",
  "bego",
  "dongo",
  "idiot",
  "bodoh",

  // =========================
  // MAKIAN JAWA / INDONESIA
  // =========================
  "jancok",
  "jancuk",
  "dancok",
  "cok",
  "cuk",

  // =========================
  // KATA VULGAR / SEKSUAL
  // =========================
  "kontol",
  "memek",
  "ngentot",
  "entot",
  "ngewe",
  "bokep",
  "porno",
  "pornografi",
  "pelacur",
  "lonte",
  "perek",
  "sundal",
  "cabul",
  "coli",
  "colmek",
  "pelakor",

  // =========================
  // VULGAR INGGRIS
  // =========================
  "fuck",
  "fucking",
  "shit",
  "bitch",
  "asshole",
  "dick",
  "pussy",
  "cunt",
  "motherfucker",
];

export function containsBlockedWord(text) {
  const normalized = text
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  return BLOCKED_WORDS.some((word) => {
    const pattern = new RegExp(
      `(^|\\s)${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=\\s|$)`,
      "i"
    );

    return pattern.test(normalized);
  });
}
