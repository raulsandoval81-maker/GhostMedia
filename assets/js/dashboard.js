const ideas = gmGetIdeas();
const patterns = gmRebuildPatterns();
const bestPattern = gmBestPattern();

const normalizeStatus = value =>
  String(value || "NEW").toUpperCase();

const winners = ideas.filter(
  idea => normalizeStatus(idea.status) === "WINNER"
);

const queued = ideas.filter(
  idea => normalizeStatus(idea.status) === "QUEUED"
);

const posted = ideas.filter(
  idea => normalizeStatus(idea.status) === "POSTED"
);

const newIdeas = ideas.filter(idea => {
  const status = normalizeStatus(idea.status);

  return ![
    "CONTENT",
    "QUEUED",
    "POSTED",
    "WINNER"
  ].includes(status);
});

document.getElementById("ideaCount").textContent =
  newIdeas.length;

document.getElementById("queueCount").textContent =
  queued.length;

document.getElementById("winnerCount").textContent =
  winners.length;

document.getElementById("patternCount").textContent =
  patterns.length;

function getTopWinner() {
  if (!winners.length) return null;

  return [...winners].sort(
    (a, b) =>
      Number(b.views || 0) -
      Number(a.views || 0)
  )[0];
}

const topWinner = getTopWinner();

document.getElementById("topWinner").textContent =
  topWinner
    ? topWinner.title || "Winner Found"
    : "No winner selected";

document.getElementById("topPattern").textContent =
  bestPattern
    ? `${bestPattern.label} (${bestPattern.count}x)`
    : "No pattern detected";

function getTopOpportunity() {
  const totals = {};

  patterns.forEach(pattern => {
    const key =
      pattern.topic ||
      pattern.label ||
      "General";

    totals[key] =
      (totals[key] || 0) + 1;
  });

  return Object.entries(totals)
    .map(([name, winnerCount]) => ({
      name,
      winners: winnerCount,
      score: Math.min(winnerCount * 20, 100)
    }))
    .sort((a, b) => b.score - a.score)[0] || null;
}

const topOpportunity = getTopOpportunity();

document.getElementById("topOpportunity").textContent =
  topOpportunity
    ? `${topOpportunity.name} — Score ${topOpportunity.score} (${topOpportunity.winners} winner${topOpportunity.winners === 1 ? "" : "s"})`
    : "No opportunity detected";

document.getElementById("weekPlan").textContent =
  posted.length
    ? `${posted.length} post${posted.length === 1 ? "" : "s"} awaiting results`
    : "No active posts awaiting results";