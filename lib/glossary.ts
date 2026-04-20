export type SupportedLang = 'hi' | 'bho' | 'mai' | 'en';

interface GlossaryEntry {
  term: string;
  explanation: Record<SupportedLang, string>;
  analogy: Record<SupportedLang, string>;
}

const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'tenor',
    explanation: {
      hi: 'अवधि — वह समय जितने के लिए आप पैसा बैंक में जमा करते हैं',
      bho: 'समय — जेतना दिन खातिर पैसा बैंक में राखीं',
      mai: 'अवधि — ओ समय जखन पैसा बैंक मे राखल जाइत छै',
      en: 'Tenor — the duration for which you lock your money in the bank',
    },
    analogy: {
      hi: 'जैसे आप किसान को 12 महीने के लिए ज़मीन किराए पर देते हैं',
      bho: 'उहे तरे जइसे 12 महिना खातिर जमीन किराया पर देईं',
      mai: 'जेना किसानकेँ 12 मासक लेल खेत किराया पर दैत छी',
      en: 'Like renting out your land to a farmer for a fixed period',
    },
  },
  {
    term: 'interest',
    explanation: {
      hi: 'ब्याज — बैंक आपके पैसे का उपयोग करता है, इसलिए आपको किराया देता है',
      bho: 'ब्याज — बैंक रउरा पइसा इस्तेमाल करेला, त एकरा किराया देला',
      mai: 'ब्याज — बैंक अहाँक पैसा उपयोग करैत अछि, तेँ किराया दैत अछि',
      en: 'Interest — the rent the bank pays you for using your money',
    },
    analogy: {
      hi: 'जैसे आप मकान किराए पर देते हैं — बैंक आपके पैसे पर किराया देता है',
      bho: 'जइसे मकान किराया पर देईं — बैंक रउरा पइसा पर किराया देला',
      mai: 'जेना घर किराया पर दैत छी — बैंक अहाँक पैसा पर किराया दैत अछि',
      en: 'Just like you earn rent on a house, the bank pays you rent on your money',
    },
  },
  {
    term: 'cumulative',
    explanation: {
      hi: 'संचयी — ब्याज मिलता रहता है और मूलधन में जुड़ता रहता है, मैच्योरिटी पर एकसाथ मिलता है',
      bho: 'संचयी — ब्याज जुड़त रहेला, अंत में एक साथ मिलेला',
      mai: 'संचयी — ब्याज जुड़ैत रहैत छै, अंत मे एकसँग भेटैत छै',
      en: 'Cumulative — interest keeps adding to your principal, you get everything at the end',
    },
    analogy: {
      hi: 'जैसे गुल्लक — रोज़ एक रुपया डालो, एक साल बाद खोलो',
      bho: 'गुल्लक जइसन — रोज डालो, बाद में एक साथ लो',
      mai: 'गुल्लक जेकाँ — रोज राखू, बादमे एकठाम नेउ',
      en: 'Like a piggy bank that also earns money on its own',
    },
  },
  {
    term: 'maturity',
    explanation: {
      hi: 'परिपक्वता — वह तारीख जब आपका FD "पूरा" हो जाता है और आप पैसा वापस ले सकते हैं',
      bho: 'परिपक्वता — ऊ दिन जब FD "पूरा" हो जाई अउर पइसा वापस मिली',
      mai: 'परिपक्वता — ओ तारीख जखन FD "पूर्ण" भए जाइत छै',
      en: 'Maturity — the date your FD completes and you can withdraw your money + interest',
    },
    analogy: {
      hi: 'जैसे अचार — 6 महीने में तैयार, पहले खोला तो स्वाद नहीं',
      bho: 'अचार जइसन — 6 महिना में तैयार, पहिले खोलब त नुकसान',
      mai: 'आचारक जेकाँ — 6 मास मे तैयार, पहिने खोललहुँ त नुकसान',
      en: 'Like pickles — needs time to mature, breaking it early reduces the benefit',
    },
  },
  {
    term: 'tds',
    explanation: {
      hi: 'TDS (Tax Deducted at Source) — बैंक ब्याज का कुछ हिस्सा सरकार को पहले दे देता है आपकी तरफ से',
      bho: 'TDS — बैंक ब्याज के कुछ हिस्सा सरकार खातिर काट लेला',
      mai: 'TDS — बैंक ब्याजक किछु हिस्सा सरकारकेँ पहिने दए दैत अछि',
      en: 'TDS — Tax Deducted at Source. The bank pays a portion of your interest to the government on your behalf',
    },
    analogy: {
      hi: 'जैसे मंडी में दलाल अपना कमीशन पहले काट लेता है',
      bho: 'मंडी में दलाल जइसन — पहिले अपना हिस्सा काट लेला',
      mai: 'मंडीक दलाल जेकाँ — पहिने अपन हिस्सा काटि लैत अछि',
      en: 'Like a market middleman who takes his cut before handing you the payment',
    },
  },
  {
    term: 'dicgc',
    explanation: {
      hi: 'DICGC — RBI की एक संस्था जो आपके ₹5 लाख तक के जमा की गारंटी देती है, अगर बैंक डूब भी जाए',
      bho: 'DICGC — RBI के संस्था जे ₹5 लाख तक के पइसा के गारंटी देला',
      mai: 'DICGC — RBI के संस्था जे ₹5 लाख धरिक जमाक गारंटी दैत अछि',
      en: "DICGC — RBI's deposit insurance. Even if a bank fails, your deposits up to ₹5 lakh are fully protected",
    },
    analogy: {
      hi: 'जैसे फसल बीमा — फसल बर्बाद हो तो सरकार देती है',
      bho: 'फसल बीमा जइसन — फसल बर्बाद हो जाई त सरकार देई',
      mai: 'फसल बीमा जेकाँ — फसल बर्बाद भए जाए त सरकार दैत अछि',
      en: "Like crop insurance — even if the harvest fails, you're protected",
    },
  },
  {
    term: 'principal',
    explanation: {
      hi: 'मूलधन — वह पैसा जो आप शुरुआत में जमा करते हैं',
      bho: 'मूलधन — ऊ पइसा जे रउर शुरू में जमा करीलें',
      mai: 'मूलधन — ओ पैसा जे अहाँ शुरू मे जमा करैत छी',
      en: 'Principal — the amount you initially deposit',
    },
    analogy: {
      hi: 'जैसे बीज — आप जो बोते हैं वो मूलधन, जो फसल आती है वो ब्याज',
      bho: 'बीज जइसन — जे बोईं ऊ मूलधन, जे फसल आई ऊ ब्याज',
      mai: 'बीज जेकाँ — जे बोनैत छी से मूलधन, जे फसल अबैत अछि से ब्याज',
      en: 'Like a seed — what you plant is the principal, the crop that grows is the interest',
    },
  },
  {
    term: 'premature',
    explanation: {
      hi: 'समय से पहले निकासी — FD पूरा होने से पहले पैसा निकालना, जिसमें penalty लगती है',
      bho: 'समय से पहिले निकासी — FD पूरा होखे से पहिले पइसा निकालब, जेमा penalty लागेला',
      mai: 'समयसँ पहिने निकासी — FD पूर्ण होयबासँ पहिने पैसा निकालब, जाहि मे penalty लागैत अछि',
      en: 'Premature withdrawal — taking out money before FD completes; bank charges a penalty (usually 0.5-1%)',
    },
    analogy: {
      hi: 'जैसे अचार जल्दी खोला तो खट्टा — FD जल्दी तोड़ा तो कम ब्याज',
      bho: 'अचार जल्दी खोलब त खट्टा — FD जल्दी तोड़ब त कम ब्याज',
      mai: 'आचार जल्दी खोललहुँ त खट्टा — FD जल्दी तोड़लहुँ त कम ब्याज',
      en: 'Like opening pickles too early — not as good, and you lose some benefit',
    },
  },
  {
    term: 'compound',
    explanation: {
      hi: 'चक्रवृद्धि ब्याज — ब्याज पर भी ब्याज मिलता है',
      bho: 'चक्रवृद्धि ब्याज — ब्याज पर भी ब्याज मिलेला',
      mai: 'चक्रवृद्धि ब्याज — ब्याज पर सेहो ब्याज भेटैत अछि',
      en: 'Compound interest — you earn interest on your interest too',
    },
    analogy: {
      hi: 'जैसे गाय दूध देती है, दूध से दही, दही से घी — पैसा भी ऐसे बढ़ता है',
      bho: 'गाय दूध देला, दूध से दही, दही से घी — पइसा भी अइसहीं बढ़ेला',
      mai: 'गाय दूध दैत अछि, दूधसँ दही, दहीसँ घी — पैसा सेहो एहिना बढ़ैत अछि',
      en: 'Like a cow gives milk, milk makes yogurt, yogurt makes ghee — your money grows on itself',
    },
  },
  {
    term: 'nominee',
    explanation: {
      hi: 'नॉमिनी — अगर कुछ हो जाए तो पैसा किसे मिलेगा',
      bho: 'नॉमिनी — अगर कुछ हो जाई त पइसा केकरा मिली',
      mai: 'नॉमिनी — अगर किछु भए जाए त पैसा ककरा भेटत',
      en: 'Nominee — the person who receives your FD money if something happens to you',
    },
    analogy: {
      hi: 'जैसे वसीयत में लिखते हैं "मेरा घर बेटे को" — नॉमिनी भी ऐसा ही है',
      bho: 'जइसे वसीयत में लिखल जाला "हमर घर बेटा के" — नॉमिनी भी उहे बा',
      mai: 'जेना वसीयत मे लिखैत छी "हमर घर बेटाकेँ" — नॉमिनी सेहो तेहने अछि',
      en: 'Like writing in a will "my house goes to my son" — a nominee ensures your money reaches the right person',
    },
  },
];

export function getGlossaryTerm(term: string, language: SupportedLang) {
  const normalizedTerm = term.toLowerCase().replace(/[^a-z]/g, '');
  const entry = GLOSSARY.find(
    g =>
      g.term.toLowerCase().includes(normalizedTerm) ||
      normalizedTerm.includes(g.term.toLowerCase())
  );

  if (!entry) {
    return {
      term,
      explanation: `No specific explanation found for "${term}". Please ask in context.`,
      analogy: null,
    };
  }

  return {
    term: entry.term,
    explanation: entry.explanation[language],
    analogy: entry.analogy[language],
  };
}

export function getAllTerms(language: SupportedLang) {
  return GLOSSARY.map(g => ({
    term: g.term,
    explanation: g.explanation[language],
    analogy: g.analogy[language],
  }));
}
