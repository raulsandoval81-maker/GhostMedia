document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("ghostNav");
  if (!nav) return;

  nav.innerHTML = `
    <section class="ghost-flow">

      <h3>🚀 Ghost Loop</h3>
      <div class="ghost-row">
        <a href="/dashboard/ideas.html">💡 Ideas</a>
        <a href="/dashboard/content.html">✍️ Content</a>
        <a href="/dashboard/queue.html">📦 Queue</a>
        <a href="/dashboard/winners.html">🏆 Winners</a>
      </div>

      <h3>🧠 Analysis</h3>
      <div class="ghost-row">
        <a href="/dashboard/patterns.html">🧠 Patterns</a>
        <a href="/dashboard/opportunities.html">🔥 Opportunities</a>
        <a href="/dashboard/briefs.html">📄 Briefs</a>
        <a href="/dashboard/factory.html">🏭 Factory</a>
      </div>

      <h3>🛠 Tools</h3>
      <div class="ghost-row">
        <a href="/dashboard/index.html">🏠 Dashboard</a>
        <a href="/dashboard/lab.html">🧪 Winner Lab</a>
        <a href="/dashboard/planner.html">📅 Planner</a>
          <a href="/dashboard/image-generator.html">🎨 Image Generator</a>
      </div>

    </section>
  `;
});