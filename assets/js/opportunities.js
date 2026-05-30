const opportunityList =
  document.getElementById("opportunityList");

function renderOpportunities() {

  const patterns =
    getPatterns();

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
        score: Math.min(
          count * 20,
          100
        ),
        winners: count
      }))
      .sort(
        (a, b) =>
          b.score - a.score
      );

  opportunityList.innerHTML = "";

  opportunities.forEach((opportunity) => {

    const row =
      document.createElement("div");

    row.className = "page";

    row.innerHTML = `
      <div>
        <strong>
          ${opportunity.name}
        </strong>

        <div class="idea-note">
          Opportunity Score:
          ${opportunity.score}
        </div>

        <div class="idea-note">
          Winners:
          ${opportunity.winners}
        </div>
      </div>
    `;

    opportunityList.appendChild(row);

  });

  if (!opportunities.length) {

    opportunityList.innerHTML = `
      <div class="page">
        <strong>
          No opportunities yet.
        </strong>

        <span>
          Mark winners first.
        </span>
      </div>
    `;

  }

}

renderOpportunities();