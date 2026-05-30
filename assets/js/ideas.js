const titleInput = document.getElementById("ideaTitle");
const pageInput = document.getElementById("ideaPage");
const notesInput = document.getElementById("ideaNotes");
const saveIdeaBtn = document.getElementById("saveIdeaBtn");
const ideasList = document.getElementById("ideasList");

function renderIdeas() {
  const ideas = gmGetIdeas();

  ideasList.innerHTML = "";

  const activeIdeas = ideas.filter((idea) =>
    idea.status === "NEW" ||
    idea.status === "idea" ||
    !idea.status
  );

  const promotedIdeas = ideas.filter((idea) =>
    idea.status === "PROMOTED"
  );

  activeIdeas.forEach((idea) => {
    const row = document.createElement("div");
    row.className = "page-card";
    row.innerHTML = `
      <h3>${idea.title}</h3>
      <p>${idea.page || idea.category || "Uncategorized"}</p>
      <button class="btn promote-btn" data-id="${idea.id}">
        Promote → Content
      </button>
    `;
    ideasList.appendChild(row);
  });

  if (promotedIdeas.length) {
    const archive = document.createElement("div");
    archive.className = "page-card faded";
    archive.innerHTML = `
      <h3>Promoted Ideas</h3>
      <p>${promotedIdeas.length} moved to Content.</p>
    `;
    ideasList.appendChild(archive);
  }

  document.querySelectorAll(".promote-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      const updated = gmGetIdeas().map((idea) => {
        if (String(idea.id) === String(id)) {
          return {
            ...idea,
            status: "PROMOTED",
            promotedAt: new Date().toISOString()
          };
        }

        return idea;
      });

      gmSaveIdeas(updated);

      window.location.href = "/dashboard/content.html";
    });
  });
}

saveIdeaBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();

  if (!title) {
    alert("Add an idea title first.");
    return;
  }

  const ideas = gmGetIdeas();

  ideas.unshift({
    id: crypto.randomUUID(),
    title,
    page: pageInput.value,
    notes: notesInput.value.trim(),
    status: "NEW",
    createdAt: new Date().toISOString()
  });

  gmSaveIdeas(ideas);

  titleInput.value = "";
  notesInput.value = "";

  renderIdeas();
});

renderIdeas();