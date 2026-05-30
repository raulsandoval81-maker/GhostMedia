const ideas = gmIdeas();
const patterns = gmRebuildPatterns();
const bestPattern = gmBestPattern();

const winners = ideas.filter(i => i.status === "winner");

document.getElementById("ideaCount").textContent =
  ideas.filter(i => i.status === "idea").length;

document.getElementById("queueCount").textContent =
  ideas.filter(i => i.status === "queued").length;

document.getElementById("winnerCount").textContent =
  winners.length;

document.getElementById("patternCount").textContent =
  patterns.length;

if (winners.length) {
  const topWinner = [...winners].sort(
    (a, b) => Number(b.views || 0) - Number(a.views || 0)
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

document.getElementById("topOpportunity").textContent =
  "No opportunity detected";

document.getElementById("weekPlan").textContent =
  "Planner not built yet";