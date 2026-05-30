document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("ghostCounts");
  if (!el) return;

  const ideas = gmGetIdeas();

  const ideaCount = ideas.filter(i => i.status === "NEW" || i.status === "idea").length;
  const queueCount = ideas.filter(i => i.status === "QUEUED").length;
  const postedCount = ideas.filter(i => i.status === "POSTED").length;
  const winnerCount = ideas.filter(i => i.status === "WINNER").length;

  const patternCount = new Set(
    ideas
      .filter(i => i.status === "WINNER")
      .map(i => i.page || i.category || "General")
  ).size;

  el.innerHTML = `
    <div class="ghost-counts">
      <span>💡 Ideas: ${ideaCount}</span>
      <span>📦 Queue: ${queueCount}</span>
      <span>📣 Posted: ${postedCount}</span>
      <span>🏆 Winners: ${winnerCount}</span>
      <span>🧠 Patterns: ${patternCount}</span>
    </div>
  `;
});