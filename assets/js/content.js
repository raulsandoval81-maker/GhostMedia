const ideaSelect = document.getElementById("ideaSelect");
const generateContentBtn = document.getElementById("generateContentBtn");
const queueContentBtn = document.getElementById("queueContentBtn");

const hookOutput = document.getElementById("hookOutput");
const captionOutput = document.getElementById("captionOutput");
const hashtagsOutput = document.getElementById("hashtagsOutput");

let currentContent = null;

function loadIdeasIntoSelect() {
  const ideas = gmGetIdeas();

  ideaSelect.innerHTML = "";

  const promotedIdeas = ideas.filter((idea) => idea.status === "PROMOTED");
  const selectableIdeas = promotedIdeas.length ? promotedIdeas : ideas;

  selectableIdeas.forEach((idea) => {
    const option = document.createElement("option");

    option.value = idea.id;
    option.textContent =
      `${idea.title} — ${idea.page || idea.category || "Uncategorized"}`;

    ideaSelect.appendChild(option);
  });
}

function buildContent(idea) {
  return {
    ideaId: idea.id,
    title: idea.title,
    page: idea.page || idea.category || "Uncategorized",
    hook: `This one gets people talking: ${idea.title}`,
    caption: `${idea.title}

${idea.notes || "A simple post built from a strong idea."}

What do you think?`,
    hashtags: getHashtags(idea.page || idea.category),
    status: "ready",
    createdAt: new Date().toISOString()
  };
}

function getHashtags(page) {
  const tags = {
    "Wrestling Highlights": "#wrestling #wrestlinglife #ncaawrestling #combatsports",
    "Wrestling History": "#wrestlinghistory #wrestlinglife #combatsports",
    "MMA Moments": "#mma #ufc #combatsports #fightlife",
    "MMA Drama": "#mma #ufc #fightnews #combatsports",
    "Gym Humor": "#gymhumor #fitnesslife #gymmemes #workout",
    "Strength Motivation": "#strengthtraining #motivation #discipline #fitness",
    "Youth Sports Parents": "#youthsports #sportsparents #coaching #parentlife",
    "Combat Sports News": "#combatsports #mma #wrestling #fightnews",
    "Wrestling Technique": "#wrestlingtechnique #wrestlingcoach #wrestlinglife",
    "Underdog Stories": "#underdog #sportsstory #comeback #motivation"
  };

  return tags[page] || "#content #media #viral";
}

generateContentBtn.addEventListener("click", () => {
  const ideas = gmGetIdeas();
  const selectedId = ideaSelect.value;

  const idea = ideas.find(
    (item) => String(item.id) === String(selectedId)
  );

  if (!idea) return;

  currentContent = buildContent(idea);

  hookOutput.textContent = currentContent.hook;
  captionOutput.textContent = currentContent.caption;
  hashtagsOutput.textContent = currentContent.hashtags;
});

queueContentBtn.addEventListener("click", () => {
  if (!currentContent) {
    alert("Generate content first.");
    return;
  }

  gmUpdateIdeaStatus(
    currentContent.ideaId,
    "QUEUED"
  );

  window.location.href = "/dashboard/queue.html";
});

loadIdeasIntoSelect();