const ideaTitle = document.getElementById("ideaTitle");
const ideaPage = document.getElementById("ideaPage");
const ideaNotes = document.getElementById("ideaNotes");
const saveIdeaBtn = document.getElementById("saveIdeaBtn");
const ideasList = document.getElementById("ideasList");

function renderIdeas() {
  const ideas = gmGetIdeas();

  ideasList.innerHTML = "";

  ideas.forEach((idea) => {
    const row = document.createElement("div");
    row.className = "page";

    row.innerHTML = `
      <div>
        <strong>${idea.title}</strong>
        <div class="idea-note">${idea.page}</div>
        <div class="idea-note">${idea.notes || ""}</div>
      </div>
      <span>${idea.status}</span>
    `;

    ideasList.appendChild(row);
  });
}

saveIdeaBtn.addEventListener("click", () => {
  const title = ideaTitle.value.trim();

  if (!title) return;

  const ideas = gmGetIdeas();

  ideas.unshift({
    id: Date.now(),
    title,
    page: ideaPage.value,
    notes: ideaNotes.value.trim(),
    status: "idea",
    createdAt: new Date().toISOString()
  });

  gmSaveIdeas(ideas);

  ideaTitle.value = "";
  ideaNotes.value = "";

  renderIdeas();

  window.location.href = "/dashboard/content.html";
});

renderIdeas();