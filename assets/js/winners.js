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
          <div class="idea-note">${idea.page}</div>
        </div>
        <button onclick="markWinner('${idea.id}')">Winner</button>
      `;

      postedList.appendChild(row);
    }

    if (idea.status === "WINNER") {
      const row = document.createElement("div");
      row.className = "page";

      row.innerHTML = `
        <div>
          <strong>🏆 ${idea.title}</strong>
          <div class="idea-note">${idea.page}</div>
        </div>
        <span>WINNER</span>
      `;

      winnerList.appendChild(row);
    }
  });
}

function markWinner(id) {
  gmUpdateIdeaStatus(id, "WINNER");

  renderWinners();

  window.location.href = "/dashboard/patterns.html";
}

renderWinners();