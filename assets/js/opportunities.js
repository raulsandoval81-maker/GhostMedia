const opportunityList =
  document.getElementById("opportunityList");

function renderOpportunities() {
  const patterns =
    JSON.parse(
      localStorage.getItem(
        "ghostmedia-patterns"
      ) || "[]"
    );

  const totals = {};

  patterns.forEach((pattern) => {
    const key =
      pattern.topic ||
      "General";

    totals[key] =
      (totals[key] || 0) + 1;
  });

  const opportunities =
    Object.entries(totals)
      .map(([name, count]) => ({
        name,
        score: Math.min(count * 20, 100),
        winners: count
      }))
      .sort((a, b) => b.score - a.score);

  opportunityList.innerHTML = "";

  opportunities.forEach((opportunity) => {
    const row =
      document.createElement("div");

    row.className = "page";

    row.innerHTML = `
      <div>
        <strong>${opportunity.name}</strong>

        <div class="idea-note">
          Opportunity Score: ${opportunity.score}
        </div>

        <div class="idea-note">
          Winners: ${opportunity.winners}
        </div>

        <button
          class="action-btn generate-opportunity-btn"
          data-topic="${opportunity.name}"
        >
          Generate Ideas
        </button>
      </div>
    `;

    const btn =
      row.querySelector(
        ".generate-opportunity-btn"
      );

    btn.addEventListener("click", () => {
      localStorage.setItem(
        "ghost-opportunity",
        opportunity.name
      );

      window.location.href =
        "/dashboard/factory.html";
    });

    opportunityList.appendChild(row);
  });

  if (!opportunities.length) {
    opportunityList.innerHTML = `
      <div class="page">
        <strong>No opportunities yet.</strong>
        <span>Mark winners first.</span>
      </div>
    `;
  }
}

renderOpportunities();