const GM_PATTERNS_KEY = "ghostmedia-patterns";

function getIdeas() {
  return JSON.parse(localStorage.getItem("ghostmedia-ideas") || "[]");
}

function getPatterns() {
  return JSON.parse(localStorage.getItem(GM_PATTERNS_KEY) || "[]");
}

function savePatterns(patterns) {
  localStorage.setItem(GM_PATTERNS_KEY, JSON.stringify(patterns));
}

function createPatternFromWinner(winner) {
  return {
    id: crypto.randomUUID(),
    ideaId: winner.id,
    title: winner.title || "Untitled Winner",

    hook: winner.hook || "",
    topic: winner.topic || "",
    format: winner.format || "",
    platform: winner.platform || "",
    emotion: winner.emotion || "",
    cta: winner.cta || "",

    views: Number(winner.views || 0),
    likes: Number(winner.likes || 0),
    comments: Number(winner.comments || 0),
    shares: Number(winner.shares || 0),

    createdAt: new Date().toISOString()
  };
}

function rebuildPatternEngine() {
  const ideas = getIdeas();

  const winners = ideas.filter(item =>
    item.status === "WINNER"
  );

  const patterns = winners.map(createPatternFromWinner);

  savePatterns(patterns);

  return patterns;
}

function getBestPattern() {
  const patterns = getPatterns();

  if (!patterns.length) return null;

  const count = {};

  patterns.forEach(pattern => {
    const key = [
      pattern.topic,
      pattern.format,
      pattern.hook
    ].filter(Boolean).join(" | ");

    if (!key) return;

    count[key] = (count[key] || 0) + 1;
  });

  const best = Object.entries(count)
    .sort((a, b) => b[1] - a[1])[0];

  if (!best) return null;

  return {
    label: best[0],
    count: best[1]
  };
}