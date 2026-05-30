const patternList = document.getElementById("patternList");

const PATTERN_MAP = {
  Parenting: ["Parent", "Parents", "Kid", "Youth", "Coach From The Stands"],
  Humor: ["Funny", "Humor", "Gym", "Stands", "Group Chat"],
  Underdog: ["Underdog", "Nobody Picked", "Comeback", "Cut From The Team"],
  Motivation: ["Motivation", "Discipline", "Train", "Earn"],
  Drama: ["Drama", "Beef", "Rivalry", "Callout", "War"],
  Technique: ["Technique", "Sprawl", "Double Leg", "Setup", "Finish"],
  History: ["History", "Legend", "Old School", "Forgotten"],
  News: ["News", "Announcement", "Ranking", "Prospect", "Injury"]
};

function detectPatterns(title, page) {
  const found = [];

  Object.keys(PATTERN_MAP).forEach((pattern) => {
    const words = PATTERN_MAP[pattern];

    const match = words.some((word) =>
      title.toLowerCase().includes(word.toLowerCase()) ||
      page.toLowerCase().includes(word.toLowerCase())
    );

    if (match) found.push(pattern);
  });

  return found;
}

function renderPatterns() {
  const ideas = gmGetIdeas();
  const winners = ideas.filter((idea) => idea.status === "WINNER");

  const totals = {};

  winners.forEach((idea) => {
    const patterns = detectPatterns(idea.title, idea.page);

    patterns.forEach((pattern) => {
      totals[pattern] = (totals[pattern] || 0) + 1;
    });
  });

  patternList.innerHTML = "";

  Object.keys(totals)
    .sort((a, b) => totals[b] - totals[a])
    .forEach((pattern) => {
      const row = document.createElement("div");
      row.className = "page";

      row.innerHTML = `
        <strong>${pattern}</strong>
        <span>${totals[pattern]} winner(s)</span>
      `;

      patternList.appendChild(row);
    });

  if (!Object.keys(totals).length) {
    patternList.innerHTML = `
      <div class="page">
        <strong>No winning patterns yet.</strong>
        <span>Mark winners first</span>
      </div>
    `;
  }
}

renderPatterns();