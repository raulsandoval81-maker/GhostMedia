const ideas = gmGetIdeas();
const patterns = gmRebuildPatterns();
const bestPattern = gmBestPattern();

const winners = ideas.filter(i => i.status === "WINNER");
const queued = ideas.filter(i => i.status === "QUEUED");
const posted = ideas.filter(i => i.status === "POSTED");
const newIdeas = ideas.filter(i => i.status === "NEW" || i.status === "idea");

document.getElementById("ideaCount").textContent = newIdeas.length;
document.getElementById("queueCount").textContent = queued.length;
document.getElementById("winnerCount").textContent = winners.length;
document.getElementById("patternCount").textContent = patterns.length;

if (winners.length) {
  const topWinner = [...winners].sort(
    (a, b) =>
      Number(b.views || 0) -
      Number(a.views || 0)
  )[0];

  document.getElementById("topWinner").textContent =
    topWinner.title || "Winner Found";
} else {
  document.getElementById("topWinner").textContent =
    "No winner selected";
}

document.getElementById("topPattern").textContent =
  bestPattern
    ? `${bestPattern.label} (${bestPattern.count}x)`
    : "No pattern detected";

function getTopOpportunity() {
  const totals = {};

  patterns.forEach(pattern => {
    const key = pattern.topic || "General";
    totals[key] = (totals[key] || 0) + 1;
  });

  const top = Object.entries(totals)
    .map(([name, winners]) => ({
      name,
      winners,
      score: Math.min(winners * 20, 100)
    }))
    .sort((a, b) => b.score - a.score)[0];

  return top || null;
}

const topOpportunity = getTopOpportunity();

document.getElementById("topOpportunity").textContent =
  topOpportunity
    ? `${topOpportunity.name} — Score ${topOpportunity.score} (${topOpportunity.winners} winners)`
    : "No opportunity detected";

document.getElementById("weekPlan").textContent =
  posted.length
    ? `${posted.length} posted item(s) ready for results.`
    : "Planner not built yet";