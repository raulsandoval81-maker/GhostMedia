const winnerSelect =
  document.getElementById("winnerSelect");

const winners =
  gmGetIdeas().filter((idea) =>
    idea.status === "WINNER"
  );

winnerSelect.innerHTML =
  winners.map((w, i) =>
    `<option value="${i}">
      ${w.title} — ${w.page}
    </option>`
  ).join("");

winnerSelect.addEventListener(
  "change",
  renderBrief
);

renderBrief();

function renderBrief() {

  const winner =
    winners[winnerSelect.value] || winners[0];

  if (!winner) return;

  document.getElementById("briefTitle").textContent =
    winner.title;

  document.getElementById("briefCategory").textContent =
    winner.page;

  document.getElementById("briefPattern").textContent =
    detectPattern(winner.page);

  document.getElementById("briefHook").textContent =
    `Everybody relates to ${winner.title.toLowerCase()}.`;

  document.getElementById("briefAngle").textContent =
    `Take the core idea and tell the story differently.`;

  document.getElementById("briefEmotion").textContent =
    `Relatable + Curiosity`;

  document.getElementById("briefGoal").textContent =
    `Comments and shares`;

  document.getElementById("briefCTA").textContent =
    `What do you think?`;

}

function detectPattern(page) {

  const patterns = {
    "Youth Sports Parents": "Parenting + Humor",
    "Gym Humor": "Humor",
    "Strength Motivation": "Motivation",
    "Wrestling Highlights": "Highlights",
    "Wrestling Technique": "Instruction",
    "Wrestling History": "Nostalgia",
    "MMA Moments": "Moments",
    "MMA Drama": "Drama",
    "Combat Sports News": "News",
    "Underdog Stories": "Underdog"
  };

  return patterns[page] || "General";

}