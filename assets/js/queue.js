const queueReady = document.getElementById("queueReady");
const queueQueued = document.getElementById("queueQueued");
const queuePosted = document.getElementById("queuePosted");

function renderQueue() {
  const ideas = gmGetIdeas();

  queueReady.innerHTML = "";
  queueQueued.innerHTML = "";
  queuePosted.innerHTML = "";

  ideas.forEach((idea) => {
    const row = document.createElement("div");
    row.className = "page";

    if (idea.status === "NEW") {
      row.innerHTML = `
        <div>
          <strong>${idea.title}</strong>
          <div class="idea-note">${idea.page}</div>
        </div>
        <button onclick="moveIdea('${idea.id}', 'QUEUED')">Queue</button>
      `;

      queueReady.appendChild(row);
    }

    if (idea.status === "QUEUED") {
      row.innerHTML = `
        <div>
          <strong>${idea.title}</strong>
          <div class="idea-note">${idea.page}</div>
        </div>
        <button onclick="moveIdea('${idea.id}', 'POSTED')">Posted</button>
      `;

      queueQueued.appendChild(row);
    }

    if (idea.status === "POSTED") {
      row.innerHTML = `
        <div>
          <strong>${idea.title}</strong>
          <div class="idea-note">${idea.page}</div>
        </div>
        <span>POSTED</span>
      `;

      queuePosted.appendChild(row);
    }
  });
}

function moveIdea(id, status) {
  gmUpdateIdeaStatus(id, status);

  if (status === "POSTED") {
    window.location.href = "/dashboard/winners.html";
    return;
  }

  renderQueue();
}

renderQueue();