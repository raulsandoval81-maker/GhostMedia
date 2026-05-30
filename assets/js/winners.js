const postedList = document.getElementById("postedList");
const winnerList = document.getElementById("winnerList");

function renderWinners() {
  const ideas = gmGetIdeas();

  postedList.innerHTML = "";
  winnerList.innerHTML = "";

  ideas.forEach((idea) => {
    if (idea.status === "POSTED") {
      const row = document.createElement("div");
      row.className = "page";

      row.innerHTML = `
        <div>
          <strong>${idea.title}</strong>
          <div class="idea-note">${idea.page || "General"}</div>

          <div class="results-grid">
            <input id="views-${idea.id}" type="number" placeholder="Views" value="${idea.views || ""}">
            <input id="likes-${idea.id}" type="number" placeholder="Likes" value="${idea.likes || ""}">
            <input id="comments-${idea.id}" type="number" placeholder="Comments" value="${idea.comments || ""}">
            <input id="shares-${idea.id}" type="number" placeholder="Shares" value="${idea.shares || ""}">
          </div>
        </div>

        <button onclick="markWinner('${idea.id}')">
          Mark Winner
        </button>
      `;

      postedList.appendChild(row);
    }

    if (idea.status === "WINNER") {
      const row = document.createElement("div");
      row.className = "page";

      row.innerHTML = `
        <div>
          <strong>🏆 ${idea.title}</strong>
          <div class="idea-note">${idea.page || "General"}</div>
          <div class="idea-note">
            Views: ${idea.views || 0} ·
            Likes: ${idea.likes || 0} ·
            Comments: ${idea.comments || 0} ·
            Shares: ${idea.shares || 0}
          </div>
        </div>
        <span>WINNER</span>
      `;

      winnerList.appendChild(row);
    }
  });
}

function getMetric(id, metric) {
  const el = document.getElementById(`${metric}-${id}`);
  return Number(el?.value || 0);
}

function markWinner(id) {
  const metrics = {
    views: getMetric(id, "views"),
    likes: getMetric(id, "likes"),
    comments: getMetric(id, "comments"),
    shares: getMetric(id, "shares"),
    resultLoggedAt: new Date().toISOString()
  };

  gmUpdateIdeaStatus(id, "WINNER", metrics);

  renderWinners();

  window.location.href = "/dashboard/patterns.html";
}

renderWinners();