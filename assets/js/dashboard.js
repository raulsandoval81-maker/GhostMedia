const ideas =
  JSON.parse(
    localStorage.getItem("ideas") || "[]"
  );

const queued =
  JSON.parse(
    localStorage.getItem("queued") || "[]"
  );

const winners =
  JSON.parse(
    localStorage.getItem("winners") || "[]"
  );

const patterns =
  JSON.parse(
    localStorage.getItem("patterns") || "[]"
  );

const opportunities =
  JSON.parse(
    localStorage.getItem("opportunities") || "[]"
  );

document.getElementById("ideaCount").textContent =
  ideas.length;

document.getElementById("queueCount").textContent =
  queued.length;

document.getElementById("winnerCount").textContent =
  winners.length;

document.getElementById("patternCount").textContent =
  patterns.length;

if (winners.length) {

  document.getElementById("topWinner").textContent =
    winners[0].title || "Winner Found";

}

if (patterns.length) {

  document.getElementById("topPattern").textContent =
    patterns[0].pattern || patterns[0].name;

}

if (opportunities.length) {

  document.getElementById("topOpportunity").textContent =
    opportunities[0].name ||
    opportunities[0].pattern;

}