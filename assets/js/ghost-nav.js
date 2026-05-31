document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("ghostNav");
  if (!nav) return;

  nav.innerHTML = `
    <section class="command-columns ghost-shared-command">

      <div class="command-column card">
        <h2>🚀 Ghost Loop</h2>
        <a href="/dashboard/ideas.html">💡 Ideas</a>
        <a href="/dashboard/content.html">✍️ Content</a>
        <a href="/dashboard/queue.html">📦 Queue</a>
        <a href="/dashboard/winners.html">🏆 Winners</a>
      </div>

      <div class="command-column card">
        <h2>🧠 Intelligence</h2>
        <a href="/dashboard/patterns.html">🧠 Patterns</a>
        <a href="/dashboard/opportunities.html">🔥 Opportunities</a>
        <a href="/dashboard/briefs.html">📄 Briefs</a>
        <a href="/dashboard/factory.html">🏭 Factory</a>
      </div>

      <div class="command-column card">
        <h2>🛠 Operations</h2>
        <a href="/dashboard/index.html">🏠 Dashboard</a>
        <a href="/dashboard/lab.html">🧪 Winner Lab</a>
        <a href="/dashboard/planner.html">📅 Planner</a>
        <a href="/image-generator/">🎨 Images</a>
      </div>

    </section>
  `;
});