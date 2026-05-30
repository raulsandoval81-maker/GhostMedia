const GM_KEYS = {
  ideas: "ghostmedia-ideas",
  patterns: "ghostmedia-patterns"
};

function gmGetIdeas() {
  return JSON.parse(localStorage.getItem(GM_KEYS.ideas) || "[]");
}

function gmSaveIdeas(ideas) {
  localStorage.setItem(GM_KEYS.ideas, JSON.stringify(ideas));
}

function gmGetByStatus(status) {
  return gmGetIdeas().filter(
    idea => idea.status === status
  );
}

function gmUpdateIdeaStatus(id, status, extra = {}) {
  const ideas = gmGetIdeas();

  const updated = ideas.map(idea => {
    if (String(idea.id) === String(id)) {
      return {
        ...idea,
        ...extra,
        status,
        updatedAt: new Date().toISOString()
      };
    }

    return idea;
  });

  gmSaveIdeas(updated);
  gmRebuildPatterns();
}

function gmRebuildPatterns() {
  const winners = gmGetByStatus("WINNER");

  const patterns = winners.map(winner => ({
    id: winner.id,
    ideaId: winner.id,
    title: winner.title || "Untitled Winner",
    topic: winner.topic || "General",
    platform: winner.platform || "General",
    hook: winner.hook || "",
    format: winner.format || "",
    emotion: winner.emotion || "",
    cta: winner.cta || "",
    views: Number(winner.views || 0),
    likes: Number(winner.likes || 0),
    comments: Number(winner.comments || 0),
    shares: Number(winner.shares || 0),
    createdAt: new Date().toISOString()
  }));

  localStorage.setItem(
    GM_KEYS.patterns,
    JSON.stringify(patterns)
  );

  return patterns;
}

function gmGetPatterns() {
  return JSON.parse(localStorage.getItem(GM_KEYS.patterns) || "[]");
}

function gmBestPattern() {
  const counts = {};

  gmGetPatterns().forEach(pattern => {
    const key = [
      pattern.topic,
      pattern.format,
      pattern.hook
    ].filter(Boolean).join(" | ");

    if (!key) return;

    counts[key] = (counts[key] || 0) + 1;
  });

  const best = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])[0];

  return best
    ? { label: best[0], count: best[1] }
    : null;
}