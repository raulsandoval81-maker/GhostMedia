const titleInput = document.getElementById("ideaTitle");
const pageInput = document.getElementById("ideaPage");
const notesInput = document.getElementById("ideaNotes");
const saveIdeaBtn = document.getElementById("saveIdeaBtn");
const ideasList = document.getElementById("ideasList");

function ideaMatchesPage(idea, selectedPage) {
  return (
    idea.page === selectedPage ||
    idea.category === selectedPage ||
    idea.genre === selectedPage ||
    idea.topic === selectedPage
  );
}

function renderIdeas() {
  const ideas = gmGetIdeas();
  const selectedPage = pageInput.value;

  ideasList.innerHTML = "";

  const activeIdeas = ideas.filter((idea) => {
    const isActive =
      idea.status === "NEW" ||
      idea.status === "idea" ||
      !idea.status;

    return isActive && ideaMatchesPage(idea, selectedPage);
  });

  const promotedIdeas = ideas.filter((idea) =>
    idea.status === "PROMOTED" &&
    ideaMatchesPage(idea, selectedPage)
  );

  if (!activeIdeas.length) {
    const empty = document.createElement("div");
    empty.className = "page-card faded";
    empty.innerHTML = `
      <h3>No ideas for ${selectedPage}</h3>
      <p>Add one above, then it will show here.</p>
    `;
    ideasList.appendChild(empty);
  }

  activeIdeas.forEach((idea) => {
    const row = document.createElement("div");
    row.className = "page-card";
    row.innerHTML = `
      <h3>${idea.title}</h3>
      <p>${idea.page || idea.category || idea.genre || "Uncategorized"}</p>
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
      <h3>Promoted ${selectedPage} Ideas</h3>
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

pageInput.addEventListener("change", renderIdeas);

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